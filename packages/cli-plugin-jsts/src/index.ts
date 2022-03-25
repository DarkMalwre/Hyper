import {HyperPlugin, HyperPluginClient} from '@hyper-stack/cli';
import Settings from './Settings';
import {PartialDeep} from 'type-fest';
import mergeDeep from '@hyper-stack/merge-deep';
import type {BuildOptions, BuildResult} from 'esbuild';
import Terminal from '@hyper-stack/terminal';
import * as path from 'path';

/**
 * A plugin that allows HyperJS to compile JavaScript and TypeScript to a compiled file.
 */
export default class CLIPluginJSTS extends HyperPlugin {
	/**
	 * Settings for the source code compiler.
	 * @private
	 */
	readonly #settings: Settings;

	/**
	 * The HyperJS plugin client.
	 */
	#client!: HyperPluginClient;

	/**
	 * Create a new JSTS plugin instance.
	 * @param settings Settings for the source code compiler.
	 */
	public constructor(settings: PartialDeep<Settings> = {}) {
		super('@hyper-stack/cli-plugin-jsts');

		this.#settings = mergeDeep<Settings, PartialDeep<Settings>>({
			projects: [],
			performance: {
				parallelCompile: true
			}
		}, settings);

		const reg = this.registry;

		reg.set('type', ':compiler');
	}

	/**
	 * The plugin load method.
	 * @param client The HyperJS plugin client.
	 */
	public async initialize(client: HyperPluginClient) {
		this.#client = client;

		if (this.registry.get('loaderEnvMode') === 'dev') {
			const esBuilders = await this.#startWatchCompiler();
		} else if (this.registry.get('loaderEnvMode') === 'build') {
			await this.#compileProjects();
		}
	}

	/**
	 * Start the watch compiler.
	 * @returns The watch compiler instance.
	 */
	async #startWatchCompiler() {
		let buildResult: BuildResult[] = [];

		const esBuild = (
			await import(['es', 'build'].join('')) as
				/**
				 * ESBuild loaded dynamically.
				 */
				typeof import('esbuild')
		);

		try {
			const generalBuildConfig: BuildOptions = {
				bundle: true,
				target: 'ESNext',
				logLevel: 'silent',
				allowOverwrite: true
			};

			/**
			 * All the build configurations.
			 */
			const buildConfigs: {
				/**
				 * The build platform based configs.
				 */
				[type: string]: BuildOptions
			} = {
				esm: {
					platform: 'node',
					format: 'esm',
					banner: {
						js: 'import "source-map-support/register";'
					}
				},
				cjs: {
					platform: 'node',
					format: 'cjs',
					banner: {
						js: 'require("source-map-support/register");'
					}
				},
				browser: {
					platform: 'browser',
					format: 'esm'
				}
			};

			if (this.#settings.performance.parallelCompile) {
				Terminal.debug('Compiling projects in parallel.');

				let readyCompilers = 0;
				let startingIndex = 0;
				const maxStartingIndex = this.#settings.projects.length - 1;
				const maxReadyCompilers = this.#settings.projects.length;

				const compileAll = () => {
					return new Promise<void>((resolve, reject) => {
						const startNext = () => {
							const project = this.#settings.projects[startingIndex];

							const checkDone = () => {
								if (readyCompilers === maxReadyCompilers) {
									resolve();
								}
							};

							const joinExact = (relativeRootPath: string) => path.join(this.#client.cliCWDTrue, project.path ?? './', relativeRootPath);

							if (project.distroTypes?.esm)
								esBuild.build({
									...generalBuildConfig,
									...buildConfigs.esm,
									entryPoints: [joinExact(project.entry || 'src/index.ts')],
									outfile: joinExact(project.distroTypes?.esm),
									sourceRoot: path.join(this.#client.cliCWDTrue, project.path || '')
								}).then((currentBuildResult) => {
									buildResult.push(currentBuildResult);

									readyCompilers++;
									checkDone();
								}).catch((error) => reject(error));

							if (project.distroTypes?.cjs)
								esBuild.build({
									...generalBuildConfig,
									...buildConfigs.cjs,
									entryPoints: [joinExact(project.entry || 'src/index.ts')],
									outfile: joinExact(project.distroTypes?.cjs),
									sourceRoot: path.join(this.#client.cliCWDTrue, project.path || '')
								}).then((currentBuildResult) => {
									buildResult.push(currentBuildResult);

									readyCompilers++;
									checkDone();
								}).catch((error) => reject(error));

							if (project.distroTypes?.browser)
								esBuild.build({
									...generalBuildConfig,
									...buildConfigs.browser,
									entryPoints: [joinExact(project.entry || 'src/index.ts')],
									outfile: joinExact(project.distroTypes?.browser),
									sourceRoot: path.join(this.#client.cliCWDTrue, project.path || '')
								}).then((currentBuildResult) => {
									buildResult.push(currentBuildResult);

									readyCompilers++;
									checkDone();
								}).catch((error) => reject(error));

							if (startingIndex + 1 < maxStartingIndex) {
								startingIndex++;
								startNext();
							}
						};

						startNext();
					});
				};

				await compileAll();
			} else {
				let compileIndex = 0;
				const maxCompileIndex = this.#settings.projects.length - 1;

				const compileNext = async () => {
					const project = this.#settings.projects[compileIndex];
					const joinExact = (relativeRootPath: string) => path.join(this.#client.cliCWDTrue, project.path ?? './', relativeRootPath);

					if (project.distroTypes?.esm)
						buildResult.push(await esBuild.build({
							...generalBuildConfig,
							...buildConfigs.esm,
							entryPoints: [joinExact(project.entry || 'src/index.ts')],
							outfile: joinExact(project.distroTypes?.esm),
							sourceRoot: path.join(this.#client.cliCWDTrue, project.path || '')
						}));

					if (project.distroTypes?.cjs)
						buildResult.push(await esBuild.build({
							...generalBuildConfig,
							...buildConfigs.esm,
							entryPoints: [joinExact(project.entry || 'src/index.ts')],
							outfile: joinExact(project.distroTypes?.cjs),
							sourceRoot: path.join(this.#client.cliCWDTrue, project.path || '')
						}));

					if (project.distroTypes?.browser)
						buildResult.push(await esBuild.build({
							...generalBuildConfig,
							...buildConfigs.esm,
							entryPoints: [joinExact(project.entry || 'src/index.ts')],
							outfile: joinExact(project.distroTypes?.browser),
							sourceRoot: path.join(this.#client.cliCWDTrue, project.path || '')
						}));
				};

				await compileNext();
			}
		} catch (error) {
			// TODO: Handle error
		}

		return buildResult;
	}

	#compileProjects() {

	}
}

export {Settings};

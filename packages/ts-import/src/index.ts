import type ESBuild from 'esbuild';
import Errors from './Errors';
import {Settings} from './Settings';
import mergeDeep from '@hyper-stack/merge-deep';
import {PartialDeep} from 'type-fest';
import {HyperError} from '@hyper-stack/internal';
import fsSync from 'fs';

/**
 * A class used for importing TypeScript files into NodeJS without the need for pre-compiling.@throws {HyperError<Errors>}.
 */
export default class TSImport {
	/**
	 * Compile an entry file.
	 * @param inputSourcePath The TypeScript input source.
	 * @param outputSourcePath The output source path.
	 * @param settings Settings for the import.
	 * @throws {HyperError<Errors>}
	 */
	public static async compile(inputSourcePath: string, outputSourcePath: string, settings: PartialDeep<Settings> = {}) {
		const esBuild = await import(['es', 'build'].join('')) as typeof ESBuild;

		const settingsFull = mergeDeep<Settings, PartialDeep<Settings>>({
			externals: [],
			format: 'esm',
			target: 'ESNext'
		}, settings);

		let buildResult: ESBuild.BuildResult;

		if (!fsSync.existsSync(inputSourcePath)) {
			throw new HyperError(Errors.INVALID_INPUT_LOCATION, 'The input source location is invalid.');
		}

		try {
			buildResult = await esBuild.build({
				entryPoints: [inputSourcePath],
				outfile: outputSourcePath,
				format: settingsFull.format,
				target: settingsFull.target,
				bundle: true,
				logLevel: 'silent',
				allowOverwrite: true,
				platform: 'node',
				external: settingsFull.externals,
				treeShaking: true
			});
		} catch (error) {
			throw new HyperError(Errors.ESBUILD_BUILD_FAILED, `ESBuild failed to compile the source file, the following error message was returned: ${(error as Error).message}`);
		}
	}

	/**
	 * Import a compiled TypeScript file.
	 * @param compiledSourcePath The path to the compiled source.
	 * @throws {HyperError<Errors>}
	 */
	public static async importCompiled<ExportsType>(compiledSourcePath: string) {
		if (!fsSync.existsSync(compiledSourcePath)) {
			throw new HyperError(Errors.COMPILED_CACHE_NOT_FOUND, 'The input source location is invalid.');
		}

		let importedModule: ExportsType;

		try {
			importedModule = await import(`file://${compiledSourcePath}`);
		} catch (error) {
			throw new HyperError(Errors.COMPILED_CACHE_FAILED_IMPORT, `We tried to import the module, but failed with the following error message: ${(error as Error).message}`);
		}

		return importedModule;
	}
}

export {Errors, Settings};

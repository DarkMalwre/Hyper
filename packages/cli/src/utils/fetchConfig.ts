import Terminal from '@hyper-stack/terminal';
import TSImport from '@hyper-stack/ts-import';
import path from 'path';
import {getAppPackage, getIni, HyperConfig} from '..';
import renderError from './renderError';
import {PackageJson, PartialDeep} from 'type-fest';
import mergeDeep from '@hyper-stack/merge-deep';

let ramCachedConfig: HyperConfig | null = null;

/**
 * Fetch the current app config.
 * @param relativeCWDPath The app root relative to the CWD.
 */
export default async function fetchConfig(relativeCWDPath: string) {
	if (ramCachedConfig) {
		return ramCachedConfig;
	}

	const iniConfig = getIni(relativeCWDPath);
	const configPath = path.join(process.cwd(), relativeCWDPath, 'hyperjs.ts');
	const configCacheOut = path.join(process.cwd(), relativeCWDPath, (iniConfig as any).cacheFolder ?? '.hyperjs', 'daemon/config.');
	let appModuleType: 'module' | 'commonjs';
	let packageApp: PackageJson;

	Terminal.debug('[i] Fetching the app package file');

	try {
		Terminal.debug('[i] Reading package');
		packageApp = await getAppPackage(relativeCWDPath);
		appModuleType = packageApp.type === 'module' ? 'module' : 'commonjs';

		Terminal.debug(`[i] Detected app type to be ${appModuleType}`);
	} catch (error) {
		Terminal.debug(`[E] Failed to fetch the app package file, error message: ${(error as Error).message}`);
		Terminal.error('Failed to fetch the package file, the following error was thrown:');

		renderError(error);
		process.exit(1);
	}

	const cacheOutPath = configCacheOut + (appModuleType === 'module' ? 'mjs' : 'cjs');

	try {
		Terminal.debug(`[i] Compiling the config file to '${cacheOutPath}'`);

		await TSImport.compile(configPath, cacheOutPath, {
			format: appModuleType === 'module' ? 'esm' : 'cjs',
			target: 'ESNext',
			externals: [...Object.keys(packageApp.dependencies || {}), ...Object.keys(packageApp.devDependencies || {})]
		});
	} catch (error) {
		Terminal.debug(`[E] Failed to compile the config file, error message: ${(error as Error).message}`);
		Terminal.error('Failed to compile the config file, the following error was thrown:');

		renderError(error);
		process.exit(1);
	}

	try {
		Terminal.debug(`[i] Importing the config file from '${cacheOutPath}'`);
		const moduleRaw = await TSImport.importCompiled(cacheOutPath) as any;
		let partialConfig: PartialDeep<HyperConfig>;

		if (typeof moduleRaw.default === 'object') {
			if (typeof moduleRaw.default.default === 'object') {
				partialConfig = moduleRaw.default.default;
			} else {
				partialConfig = moduleRaw.default;
			}
		} else {
			partialConfig = moduleRaw;
		}

		const finalConfig = mergeDeep<HyperConfig, PartialDeep<HyperConfig>>({
			plugins: []
		}, partialConfig);

		ramCachedConfig = finalConfig;
		return finalConfig;
	} catch (error) {
		Terminal.debug(`[E] Failed to import the config file, error message: ${(error as Error).message}`);
		Terminal.error('Failed to import the config file, the following error was thrown:');

		renderError(error);
		process.exit(1);
	}
}

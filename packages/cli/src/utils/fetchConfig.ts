import Terminal from '@hyper-stack/terminal';
import TSImport from '@hyper-stack/ts-import';
import path from 'path';
import { getAppPackage, GetAppPackageErrors, getIni } from '..';
import renderError from './renderError';

/**
 * Fetch the current app config.
 * @param relativeCWDPath The app root relative to the CWD.
 */
export default async function fetchConfig(relativeCWDPath: string) {
	const iniConfig = getIni(relativeCWDPath);
	const configPath = path.join(process.cwd(), relativeCWDPath, 'hyperjs.ts');
	const configCacheOut = path.join(process.cwd(), relativeCWDPath, (iniConfig as any).cacheFolder ?? '.hyperjs', 'daemon/config.');
	let appModuleType: 'module' | 'commonjs';

	Terminal.debug('[i] Fetching the app package file');

	try {
		const packageApp = await getAppPackage(relativeCWDPath);
		appModuleType = packageApp.module === 'module' ? 'module' : 'commonjs';
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
            target: 'ESNext'
        });
	} catch (error) {
		Terminal.debug(`[E] Failed to compile the config file, error message: ${(error as Error).message}`);
		Terminal.error('Failed to compile the config file, the following error was thrown:');

		renderError(error);
		process.exit(1);
	}

	try {
        Terminal.debug(`[i] Importing the config file from '${cacheOutPath}'`);
		return await TSImport.importCompiled(cacheOutPath);
	} catch (error) {
		Terminal.debug(`[E] Failed to import the config file, error message: ${(error as Error).message}`);
		Terminal.error('Failed to import the config file, the following error was thrown:');

		renderError(error);
		process.exit(1);
	}
}
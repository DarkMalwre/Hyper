import * as path from 'path';
import {getIni, GetIniConfig} from '../../index';

/**
 * Get the exact folder path of the cache folder.
 * @param relativeCWDPath The relative path from the CWD to the project root.
 * @returns The absolute path to the cache folder.
 */
export default async function getCachePath(relativeCWDPath: string) {
	let cachePath = './.hyperjs/';
	let iniConfig: GetIniConfig | any = {};

	try {
		iniConfig = await getIni(relativeCWDPath);
	} catch (error) {
		// ...
	}

	if (typeof iniConfig.cacheFolder === 'string') {
		cachePath = iniConfig.cacheFolder;
	}

	return path.join(process.cwd(), relativeCWDPath, cachePath);
}

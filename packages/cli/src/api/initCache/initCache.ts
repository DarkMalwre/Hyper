import {GetIniConfig} from '../..';
import fs from 'fs/promises';
import {HyperError} from '@hyper-stack/internal';
import Errors from './Errors';
import getCachePath from '../getCachePath/getCachePath';

/**
 * Initialize the initCache folder.
 * @param relativeCWDPath The relative path to the project root.
 */
export default async function initCache(relativeCWDPath: string) {
	let iniConfig: GetIniConfig | any = {};
	let cacheLocation = await getCachePath(relativeCWDPath);

	if (iniConfig.clean !== false) {
		try {
			await fs.rm(cacheLocation, {
				recursive: true
			});
		} catch {
			// ...
		}
	}

	try {
		await fs.mkdir(cacheLocation, {
			recursive: true
		});
	} catch (error) {
		throw new HyperError(Errors.FS_ERROR, `An error occurred when we tried to generate the cache folder, the following error was thrown: ${(error as Error).message}`);
	}
}

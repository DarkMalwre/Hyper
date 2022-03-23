import fs from 'fs';
import Config from './Config';
import path from 'path';
import ini from 'ini';
import {HyperError} from '@hyper-stack/internal';
import Errors from './Errors';
import {PartialDeep} from 'type-fest';

/**
 * Get the CLI getIni file.
 * @param relativeCWDPath The path to the project root relative to the current working directory.
 * @throws {HyperError<Errors>}
 */
export default async function getIni(relativeCWDPath: string) {
	let result: PartialDeep<Config> = {};
	const iniPath = path.join(process.cwd(), relativeCWDPath, 'hyperjs.ini');

	if (!fs.existsSync(iniPath)) {
		throw new HyperError(Errors.INI_NOT_FOUND, `The ini file could not be found at '${iniPath}'`);
	}

	try {
		result = ini.parse(fs.readFileSync(iniPath, 'utf-8'));
	} catch (error) {
		throw new HyperError(Errors.FAILED_TO_PARSE_INI, `Failed to parse the ini file at '${iniPath}', the following error was thrown: ${(error as Error).message}`);
	}

	return result;
}

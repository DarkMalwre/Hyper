import path from 'path';
import {PackageJson as PackageJSON} from 'type-fest';
import fs from 'fs';
import { HyperError } from '@hyper-stack/internal';
import Errors from './Errors';

/**
 * Get the app package.json.
 * @param relativeCWDPath Relative path to root from CWD>.
 */
export default async function getAppPackage(relativeCWDPath: string) {
	const pathToPackageJSON = path.join(process.cwd(), relativeCWDPath, 'package.json');
	let appPackage: PackageJSON;
	let fsContents = '';

	try {
		fsContents = fs.readFileSync(pathToPackageJSON, 'utf8');
	} catch (error) {
		throw new HyperError(Errors.FAILED_TO_READ_PACKAGE, `We tried to import the app package, but we got the following error instead: ${(error as Error).message}`);
	}

	try {
		appPackage = JSON.parse(fsContents);
		return appPackage;
	} catch (error) {
		throw new HyperError(Errors.INVALID_PACKAGE_JSON_CONTENT, `We tried to parse the app package, but we got the following error instead: ${(error as Error).message}`);
	}
}
import path from 'path';
import fs from 'fs';
import {fileURLToPath} from 'url';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

/**
 * Get all the packages from the HyperJS library.
 * @returns {Array<string>>} The path to each package.
 */
export default async function getAllPackages() {
	const packages = [];
	const fsDirs = fs.readdirSync(path.join(dirname, '../../packages/'));

	fsDirs.forEach((dir) => {
		packages.push(path.join(dirname, '../../packages/', dir));
	});

	return packages;
}

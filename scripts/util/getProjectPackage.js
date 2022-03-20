import fs from 'fs';
import path from 'path';

/**
 * Get the package.json file for a project.
 * @param projectPath
 */
export default function getProjectPackage(projectPath) {
	const packagePath = path.join(projectPath, 'package.json');
	const packageContents = fs.readFileSync(packagePath, 'utf8');

	return JSON.parse(packageContents);
}
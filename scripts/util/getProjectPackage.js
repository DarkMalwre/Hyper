import fs from 'fs';
import path from 'path';

/**
 * Get the package.json file for a project.
 * @param projectPath Path to the project.
 * @returns The project package file.
 */
export default function getProjectPackage(projectPath) {
	const packagePath = path.join(projectPath, 'package.json');
	const packageContents = fs.readFileSync(packagePath, 'utf8');

	return JSON.parse(packageContents);
}

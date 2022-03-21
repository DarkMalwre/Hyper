import getAllPackages from './util/getAllPackages.js';
import log from './util/log.js';
import chalk from 'chalk';
import {build} from 'esbuild';
import path from 'path';
import getProjectPackage from './util/getProjectPackage.js';
import {spawn} from 'child_process';

log('i', 'Starting watch compiler');

const packages = await getAllPackages();

packages.forEach((pkg, index) => {
	const pkgFile = getProjectPackage(pkg);
	log('i', `Detected package { name = '${chalk.green(pkgFile.name)}', id = ${chalk.green(index + 1)} }`);
});

packages.forEach(async (pkg, index) => {
	const pkgPackage = getProjectPackage(pkg);

	const baseConfig = {
		watch: true,
		logLevel: 'silent',
		bundle: true,
		target: 'ESNext',
		entryPoints: [path.join(pkg, 'src/index.js')],
		external: Object.keys((pkgPackage.dependencies ?? {}))
	};

	await build({
		...baseConfig,
		format: 'esm',
		outfile: path.join(pkg, pkgPackage.exports.import),
	});

	await build({
		...baseConfig,
		format: 'cjs',
		outfile: path.join(pkg, pkgPackage.exports.require),
	});

	spawn(`npx${  process.platform === 'win32' ? '.cmd' : ''}`, ['tsc', '--watch' ], {
		cwd: pkg,
	});

	log('s', `Watching package { name = '${chalk.green(pkgPackage.name)}', id = ${chalk.green(index + 1)} }`);
});

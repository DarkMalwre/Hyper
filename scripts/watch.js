import getAllPackages from './util/getAllPackages.js';
import log from './util/log.js';
import chalk from 'chalk';
import {build} from 'esbuild';
import path from 'path';
import getProjectPackage from './util/getProjectPackage.js';
import {spawn} from 'child_process';
import notifierCJS from 'node-notifier';

const {notify} = notifierCJS;
log('i', 'Starting watch compiler');

const packages = await getAllPackages();

packages.forEach((pkg, index) => {
	const pkgFile = getProjectPackage(pkg);
	log('i', `Detected package { name = '${chalk.green(pkgFile.name)}', id = ${chalk.green(index + 1)} }`);
});

packages.forEach(async (pkg, index, arr) => {
	const pkgPackage = getProjectPackage(pkg);

	const renderUnNamedImportStatement = (from, isESM = false) => {
		if (isESM) return `import '${from}';`;
		return `require('${from}');`;
	};

	const baseConfig = {
		watch: true,
		logLevel: 'silent',
		bundle: true,
		target: 'ESNext',
		entryPoints: [path.join(pkg, 'src/index.js')],
		external: Object.keys((pkgPackage.dependencies ?? {})),
		sourcemap: true,
		platform: 'node'
	};

	await build({
		...baseConfig,
		format: 'esm',
		outfile: path.join(pkg, pkgPackage.exports.import),
		banner: {
			js: renderUnNamedImportStatement('source-map-support/register.js', true)
		}
	});

	await build({
		...baseConfig,
		format: 'cjs',
		outfile: path.join(pkg, pkgPackage.exports.require),
		banner:{
			js: renderUnNamedImportStatement('source-map-support/register.js')
		}
	});

	if (pkgPackage.hyperjs && pkgPackage.hyperjs.compileList && Array.isArray(pkgPackage.hyperjs.compileList)) {
		const files = pkgPackage.hyperjs.compileList;

		for await (const file of pkgPackage.hyperjs.compileList) {
			if (typeof file.in !== 'string') return;
			if (typeof file.out !== 'string') return;

			const format = file.out.endsWith('.cjs') ? 'cjs' : 'esm';
			const platform = file.out.endsWith('.browser.cjs') || file.out.endsWith('.browser.mjs') ? 'browser' : 'node';

			const br = await build({
				...baseConfig,
				format: format,
				outfile: path.join(pkg, file.out),
				entryPoints: [path.join(pkg, file.in)],
				platform: platform,
				banner:{
					js: renderUnNamedImportStatement('source-map-support/register.js', format === 'esm')
				}
			});
		}
	}

	spawn(`npx${process.platform === 'win32' ? '.cmd' : ''}`, ['tsc', '--watch' ], {
		cwd: pkg
	});

	log('s', `Watching package { name = '${chalk.green(pkgPackage.name)}', id = ${chalk.green(index + 1)} }`);

	if (arr.length - 1 === index) {
		log('s', `Watch compiler ready { packages = ${chalk.green(arr.length)} }`);

		notify({
			title: 'Watch compiler ready',
			message: 'Hey HypeJS developer ;D The dev server is ready to go!'
		});
	}
});

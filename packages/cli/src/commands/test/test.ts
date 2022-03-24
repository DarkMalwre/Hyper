// import Terminal, {Anime} from '@hyper-stack/terminal';
// import {Argv} from 'yargs';
// import {HyperServer, initCache} from '../..';
// import fetchConfig from '../../utils/fetchConfig';

// /**
//  * Register the dev command.
//  * @param yargs The yargs program.
//  */
// export default function (yargs: Argv) {
// 	yargs.command('dev', 'Start the current HyperJS app in developer mode', {
// 		watch: {
// 			describe: 'Watch for changes and rebuild the app when files are updated',
// 			alias: 'w',
// 			type: 'boolean',
// 			default: false
// 		}
// 	}, async (argv) => {
// 		await initCache('./');
// 		const config = await fetchConfig('./');
// 		const timeStarted = performance.now();

// 		const devServer = new HyperServer({
// 			type: 'dev',
// 			plugins: config.plugins
// 		});

// 		Anime.play('Starting development server');

// 		try {
// 			await devServer.run();

// 			const timeTakenMS = Math.round(performance.now() - timeStarted);
// 			Anime.stop('success', `The development server is running successfully after ${timeTakenMS}ms`);
// 		} catch (error) {
// 			Anime.stop('error', `Failed to start the development server, the following error was thrown`);

// 			(error as Error).stack?.split('\n').forEach((line) => {
// 				Terminal.error(line);
// 			});
// 		}
// 	});
// }

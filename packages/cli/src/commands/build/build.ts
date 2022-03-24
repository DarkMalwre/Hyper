import Terminal, {Anime} from '@hyper-stack/terminal';
import {Argv} from 'yargs';
import {HyperServer, initCache} from '../..';
import fetchConfig from '../../utils/fetchConfig';

/**
 * Register the dev command.
 * @param yargs The yargs program.
 */
export default function (yargs: Argv) {
	yargs.command('build', 'Build the current project', {}, async (argv) => {
		Anime.play('Compiling this current project');
		
		await initCache('./');
		const config = await fetchConfig('./');
		const timeStarted = performance.now();

		const buildServer = new HyperServer({
			type: 'build',
			plugins: config.plugins
		});

		try {
			await buildServer.run();

			const timeTakenMS = Math.round(performance.now() - timeStarted);
			Anime.stop('success', `The project was compiled successfully after ${timeTakenMS}ms`);
		} catch (error) {
			Anime.stop('error', `Failed to start the build the project, the following error was thrown`);

			(error as Error).stack?.split('\n').forEach((line) => {
				Terminal.error(line);
			});
		}
	});
}

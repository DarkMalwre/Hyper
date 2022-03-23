import Terminal, { Anime } from '@hyper-stack/terminal';
import {Argv} from 'yargs';
import { HyperServer, initCache } from '../..';
import fetchConfig from '../../utils/fetchConfig';

/**
 * Register the dev command.
 * @param yargs The yargs program.
 */
export default function (yargs: Argv) {
	yargs.command('dev', 'Start the current HyperJS app in developer mode', {
		watch: {
			describe: 'Watch for changes and rebuild the app when files are updated',
			alias: 'w',
			type: 'boolean',
			default: false
		}
	}, async (argv) => {
		await initCache('./');
		const config = await fetchConfig('./');
		console.log(config);

		const devServer = new HyperServer({
			type: 'dev'
		});

		Anime.play('Starting development server');

		try {
			await devServer.run();
		} catch (error) {
			Anime.stop('error', `Failed to start the development server, the following error was thrown`);
			
			(error as Error).stack?.split('\n').forEach((line) => {
				Terminal.error(line);
			});
		}
	});
}

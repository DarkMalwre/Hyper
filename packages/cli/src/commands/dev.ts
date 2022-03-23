import {Argv} from 'yargs';

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

	});
}

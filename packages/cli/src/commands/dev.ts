import Terminal from "@hyper-stack/terminal";
import { Argv } from "yargs";

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
		Terminal.log('Starting HyperJS in developer mode');
		Terminal.error('Something something');
		Terminal.success('Success!');
		Terminal.warning('Info');
	});
}

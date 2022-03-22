import { Widget, Anime } from "@hyper-stack/terminal";
import yargs from 'yargs';
import {hideBin} from 'yargs/helpers';
import readline from 'readline';
import dev from "./commands/dev";

/**
 * Start the CLI service.
 */
export async function service() {
	const yp = yargs(hideBin(process.argv));
	dev(yp);

	yp.parse();
	enterToRestart();
}

/**
 * Prompt the user to press enter and restart.
 */
export function enterToRestart() {
	readline.emitKeypressEvents(process.stdin);
	process.stdin.setRawMode(true);
	process.stdin.resume();

	console.log(' [...] Press ENTER to restart.');

	process.stdin.on('keypress', (value, event) => {
		if (event.ctrl && event.name === 'c') {
			process.exit(0);
		}

		if (event.name === 'return') {
			console.log(' [...] Restarting');
			restart();
			process.exit(0);
		}
	});
}

/**
 * Restart the CLI.
 */
export function restart() {
	process.send!(JSON.stringify({
		type: 'restart'
	}));
}

service();

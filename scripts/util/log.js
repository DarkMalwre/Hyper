import chalk from 'chalk';

/**
 * Log a message into the console.
 * @param level The log level (e, w, i, d, s)
 * @param args The message to log
 */
export default function log(level, ...args) {
	if (level === 'e') {
		console.error(`${chalk.red('Error')} ${args.join(' ')}`);
	} else if (level === 'w') {
		console.warn(`${chalk.yellow('Warning')} ${args.join(' ')}`);
	} else if (level === 'd') {
		console.log(`${chalk.blue('Debug')} ${args.join(' ')}`);
	} else if (level === 's') {
		console.log(`${chalk.green('Success')} ${args.join(' ')}`);
	} else {
		console.info(`${chalk.gray('Info')} ${args.join(' ')}`);
	}
}

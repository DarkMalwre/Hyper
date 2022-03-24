import WidgetBooleanSettings from './widget/settings/BooleanSettings';
import WidgetSelectListSettings from './widget/settings/SelectListSettings';
import AnimePlaySettings from './anime/PlaySettings';
import PrinterErrors from './printer/Errors';
import WidgetErrors from './widget/Errors';
import AnimeErrors from './anime/Errors';
import Printer from './printer/Printer';
import Widget from './widget/Widget';
import Anime from './anime/Anime';
import chalk from 'chalk';
import figureSet from 'figures';

/**
 * The terminal module which contains the terminal interface.
 */
export default class Terminal {
	/**
	 * This property indicates if the command line support TTY.
	 */
	public static readonly ttySupported = !!(process.stdout.isTTY as boolean | undefined);

	/**
	 * Log a formatted message with a prefix.
	 * @param tag The tag prefix.
	 * @param message The message.
	 * @param std The standard channel.
	 */
	static #logViaTag(tag: string, message: any, std: 'stdout' | 'stderr') {
		let print = (text: string) => {};

		Printer.clear();
		Printer.reset();
		Printer.pause(true);

		if (std === 'stderr') {
			print = (text) => {
				process.stderr.write(text);
			};
		} else {
			print = (text) => {
				process.stdout.write(text);
			};
		}

		if (typeof message === 'object') {
			const data = { ...message };

			const replaceFunctionsWithString = (obj: any) => {
				for (const key in obj) {
					if (typeof obj[key] === 'function') {
						obj[key] = `[Function ${obj[key].name}]`;
					} else if (typeof obj[key] === 'object') {
						replaceFunctionsWithString(obj[key]);
					}
				}
			};

			replaceFunctionsWithString(data);

			const dataString = JSON.stringify(data, null, '\t');
			const lines = dataString.split('\n');

			lines.forEach((line) => {
				print(` ${tag}  ${line}\n`);
			});

			return;
		}

		print(` ${tag}  ${message}\n`);
		Printer.pause(false);
	}

	/**
	 * Log an info message.
	 * @param message The message to log.
	 */
	public static log(message: any) {
		this.#logViaTag(chalk.hex('#999')(`ℹ  Info`), message, 'stdout');
	}

	/**
	 * Log an error message.
	 * @param message The message to log.
	 */
	public static error(message: any) {
		this.#logViaTag(chalk.hex('#ff5555')(`${figureSet.cross}  Err`), message, 'stderr');
	}

	/**
	 * Log a success message.
	 * @param message The message to log.
	 */
	public static success(message: any) {
		this.#logViaTag(chalk.hex('#50ffab')(`${figureSet.tick}  Ok`), message, 'stdout');
	}

	/**
	 * Log an error message.
	 * @param message The message to log.
	 */
	public static warning(message: any) {
		this.#logViaTag(chalk.hex('#ffff55')(`${figureSet.triangleUp}  Error`), message, 'stderr');
	}

	/**
	 * Log to debug.
	 * @param data The data to log.
	 */
	public static debug(data: any) {
		if (!process.env.DEBUG) return;

		const stackError = new Error('This should not have been thrown');
		this.#logViaTag(
			chalk.hex('#FFC0CB')(`${figureSet.triangleUp}  Debug`),
			(`${data}\n`)
				.replace(new RegExp(/^\[E] (.+?)\n/), chalk.underline.hex('#FFC0CB')('[E] $1'))
				.replace(new RegExp(/^\[W]/), chalk.hex('#ffff55')('[W]'))
				.replace(new RegExp(/^\[i]/), chalk.hex('#999')('[i]'))
				.replace(new RegExp(/\n/), ''),
			'stdout'
		);

		const stackLines = stackError.stack?.split('\n').splice(2);
		const maxStackSize = 0; // TODO: Make this configurable

		stackLines?.forEach((line, index) => {
			if (index + 1 > maxStackSize) return;
			if (line.startsWith('    at file:///')) return;

			this.#logViaTag(
				chalk.hex('#999')(`${figureSet.triangleUp}  Debug`),
				line.replace(
					new RegExp(/at (.*?) \((.*?)\)/),
					`${chalk.hex('#999')('$1 at')} ${chalk.hex('FFC0CB')('$2')}`
				),
				'stdout'
			);
		});
	}
}

export {Widget, WidgetErrors, WidgetBooleanSettings, WidgetSelectListSettings};
export {Anime, AnimeErrors, AnimePlaySettings};
export {Printer, PrinterErrors};

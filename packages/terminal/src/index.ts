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
	static #logViaTag(tag: string, message: string, std: 'stdout' | 'stderr') {
		let print = (text: string) => {};
		
		if (std === 'stderr') {
			print = (text) => {
				process.stderr.write(text);
			};
		} else {
			print = (text) => {
				process.stdout.write(text);
			};
		}

		print(` ${tag}  ${message}\n`);
	}

	/**
	 * Log an info message.
	 * @param message The message to log.
	 */
	public static log(message: string) {
		this.#logViaTag(chalk.hex('#999')(`ℹ  Info`), message, 'stdout');
	}

	/**
	 * Log an error message.
	 * @param message The message to log.
	 */
	public static error(message: string) {
		this.#logViaTag(chalk.hex('#ff5555')(`${figureSet.cross}  Err`), message, 'stderr');
	}

	/**
	 * Log a success message.
	 * @param message The message to log.
	 */
	public static success(message: string) {
		this.#logViaTag(chalk.hex('#50ffab')(`${figureSet.tick}  Ok`), message, 'stdout');
	}

	/**
	 * Log an error message.
	 * @param message The message to log.
	 */
	public static warning(message: string) {
		this.#logViaTag(chalk.hex('#ffff55')(`${figureSet.triangleUp}  Error`), message, 'stderr');
	}
}

export {Widget, WidgetErrors, WidgetBooleanSettings, WidgetSelectListSettings};
export {Anime, AnimeErrors, AnimePlaySettings};
export {Printer, PrinterErrors};

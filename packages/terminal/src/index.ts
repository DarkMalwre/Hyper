import Anime from './anime/Anime';
import Printer from './printer/Printer';
import PrinterErrors from './printer/Errors';

export default class Terminal {
	/**
	 * This property indicates if the command line support TTY.
	 */
	public static readonly ttySupported = !!(process.stdout.isTTY as boolean | undefined);
}

export {Anime};
export {Printer, PrinterErrors};

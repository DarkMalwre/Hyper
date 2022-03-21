import Anime from './anime/Anime';
import AnimeErrors from './anime/Errors';
import AnimePlaySettings from './anime/PlaySettings';
import Printer from './printer/Printer';
import PrinterErrors from './printer/Errors';

/**
 * The terminal module which contains the terminal interface.
 */
export default class Terminal {
	/**
	 * This property indicates if the command line support TTY.
	 */
	public static readonly ttySupported = !!(process.stdout.isTTY as boolean | undefined);
}

export {Anime, AnimeErrors, AnimePlaySettings};
export {Printer, PrinterErrors};

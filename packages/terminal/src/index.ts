import WidgetBooleanSettings from './widget/settings/BooleanSettings';
import WidgetSelectListSettings from './widget/settings/SelectListSettings';
import AnimePlaySettings from './anime/PlaySettings';
import PrinterErrors from './printer/Errors';
import WidgetErrors from './widget/Errors';
import AnimeErrors from './anime/Errors';
import Printer from './printer/Printer';
import Widget from './widget/Widget';
import Anime from './anime/Anime';

/**
 * The terminal module which contains the terminal interface.
 */
export default class Terminal {
	/**
	 * This property indicates if the command line support TTY.
	 */
	public static readonly ttySupported = !!(process.stdout.isTTY as boolean | undefined);
}

export {Widget, WidgetErrors, WidgetBooleanSettings, WidgetSelectListSettings};
export {Anime, AnimeErrors, AnimePlaySettings};
export {Printer, PrinterErrors};

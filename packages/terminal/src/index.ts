import Anime from './anime/Anime';

export default class Terminal {
	/**
	 * This property indicates if the command line support TTY.
	 */
	public static readonly ttySupported = !!(process.stdout.isTTY as boolean | undefined);
}

export {Anime};

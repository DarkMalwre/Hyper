/**
 * The terminal state store.
 */
export default class State {
	/**
	 * If a CLI widget is running.
	 */
	public static widgetRunning: boolean = false;

	/**
	 * If a CLI spinner anime is running.
	 */
	public static animeRunning: boolean = false;
}
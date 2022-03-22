/**
 * Error that can be thrown when starting a widget.
 */
enum Errors {
	/**
	 * An anime widget is already running.
	 */
	ANIME_WIDGET_RUNNING = 'ANIME_WIDGET_RUNNING',

	/**
	 * You tried to stop a widget but nothing is running.
	 */
	WIDGET_NOT_RUNNING = 'WIDGET_NOT_RUNNING'
}

export default Errors;

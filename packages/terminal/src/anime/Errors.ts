/**
 * Errors for when starting/stopping an animation for the terminal.
 */
enum Errors {
	/**
	 * Another CLI widget is already rendering.
	 */
	EXTERNAL_WIDGET_RUNNING = 'EXTERNAL_WIDGET_RUNNING',

	/**
	 * An animation is already running.
	 */
	ANIMATION_ALREADY_RUNNING = 'ANIMATION_ALREADY_RUNNING',

	/**
	 * The animation is not running.
	 */
	ANIMATION_NOT_RUNNING = 'ANIMATION_NOT_RUNNING'
}

export default Errors;

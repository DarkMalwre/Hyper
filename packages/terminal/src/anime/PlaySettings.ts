/**
 * Settings for when playing an animation.
 */
export default interface PlaySettings {
	/**
	 * The frames of the animation.
	 */
	frames: [string, ...string[]];

	/**
	 * The speed of the animation loop.
	 */
	fps: {
		/**
		 * The value of the animation speed.
		 */
		value: number;

		/**
		 * The method of which the speed is determined.
		 */
		type: 'interval' | 'fps';
	}

	/**
	 * The colors for the spinners.
	 */
	colors: {
		/**
		 * The success color.
		 */
		success: string;

		/**
		 * The error color.
		 */
		error: string;

		/**
		 * The warning color.
		 */
		warning: string;

		/**
		 * The stateless spinner color.
		 */
		stateless: string;
	};

	/**
	 * Symbols for the spinner end states.
	 */
	symbols: {
		/**
		 * The success symbol.
		 */
		success: string;

		/**
		 * The error symbol.
		 */
		error: string;

		/**
		 * The warning symbol.
		 */
		warning: string;
	}
}

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
}

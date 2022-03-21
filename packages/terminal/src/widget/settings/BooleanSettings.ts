/**
 * Settings for a boolean prompt.
 */
export default interface BooleanSettings {
	/**
	 * The prompt message.
	 */
	label: string;

	/**
	 * The default boolean value.
	 */
	defaultValue: boolean;

	/**
	 * The text for the options.
	 */
	text: {
		/**
		 * The text for the true option.
		 */
		true: string;

		/**
		 * The text for the false option.
		 */
		false: string;
	}

	/**
	 * Symbols for the icons.
	 */
	symbols: {
		/**
		 * The done icon.
		 */
		done: string;

		/**
		 * The waiting for input icon.
		 */
		waiting: string;

		/**
		 * The process halted icon.
		 */
		halted: string;
	}

	/**
	 * Colors for the icons.
	 */
	colors: {
		/**
		 * The done color.
		 */
		done: string;

		/**
		 * The waiting for input color.
		 */
		waiting: string;

		/**
		 * The process halted color.
		 */
		halted: string;

		/**
		 * The active selected item color.
		 */
		active: string;
	}
}

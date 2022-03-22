/**
 * Settings for the select list widget.
 */
export default interface SelectListSettings {
	/**
	 * The select list label.
	 */
	label: string;

	/**
	 * Items of the select list.
	 */
	items: [string, string, ...string[]];

	/**
	 * The default index of the selected item.
	 */
	defaultValue: number;

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

		/**
		 * The select error icon.
		 */
		arrow: string
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

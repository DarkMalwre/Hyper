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
}

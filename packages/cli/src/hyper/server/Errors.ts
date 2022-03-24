/**
 * Errors for the HyperJS server.
 */
enum Errors {
	/**
	 * No plugins were found.
	 */
	NO_PLUGINS_FOUND = 'NO_PLUGINS_FOUND',

	/**
	 * An error was thrown inside one of the plugins.
	 */
	ERROR_IN_PLUGIN = 'ERROR_IN_PLUGIN',

	/**
	 * The plugin's name property was not assigned.
	 */
	PLUGIN_NAME_MISSING = 'PLUGIN_NAME_MISSING',

	/**
	 * A plugin with the same name is already loaded.
	 */
	PLUGIN_NAME_DUPLICATE = 'PLUGIN_NAME_DUPLICATE'
}

export default Errors;

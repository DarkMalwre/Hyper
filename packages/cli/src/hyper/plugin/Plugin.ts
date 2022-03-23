import Registry from './Registry';

/**
 * A single plugin that can be extended by plugin developers.
 */
export default class Plugin {
	/**
	 * The plugin's main registry.
	 */
	readonly #registry = new Registry();
}

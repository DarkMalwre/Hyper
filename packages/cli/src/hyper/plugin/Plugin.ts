import { HyperPluginClient } from '../..';
import Registry from './Registry';

/**
 * A single plugin that can be extended by plugin developers.
 */
export default class Plugin {
	/**
	 * The plugin's main registry.
	 */
	public readonly registry = new Registry();

	/**
	 * The name of the plugin.
	 */
	public readonly name: string;

	/**
	 * The HyperJS plugin constructor.
	 * @param name The name of the plugin.
	 */
	public constructor(name: string) {
		this.name = name;
	}

	/**
	 * Initialize the plugin.
	 * @param client The HyperJS plugin client.
	 */
	public async initialize(client: HyperPluginClient) {
		// ...
	}
}

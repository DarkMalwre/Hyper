import {HyperPlugin} from '../..';
import {HyperError} from '@hyper-stack/internal';
import Errors from './Errors';
import Client from '../plugin/Client';

/**
 * The plugin loader service.
 */
export default class PluginHost {
	/**
	 * All the plugins.
	 */
	public readonly plugins: HyperPlugin[] = [];

	/**
	 * All the ready plugins.
	 */
	public readonly loadedPlugins: HyperPlugin[] = [];

	/**
	 * Load all the plugins.
	 * @param plugins The plugins.
	 * @param loaderEnvMode The loader environment mode.
	 */
	public async load(plugins: HyperPlugin[], loaderEnvMode: 'dev' | 'build' | 'test') {
		this.plugins.push(...plugins);

		let pluginIndex = 0;
		const maxPluginIndex = plugins.length - 1;

		const iterate = async () => {
			const plugin = plugins[pluginIndex];

			if (typeof plugin.name as any !== 'string') {
				throw new HyperError(Errors.PLUGIN_NAME_MISSING, `Plugin ${pluginIndex} does not have a name.`);
			}

			const pluginsWithDuplicateNames = plugins.filter(p => p.name === plugin.name);
			if (pluginsWithDuplicateNames.length > 1) {
				throw new HyperError(Errors.PLUGIN_NAME_DUPLICATE, `Plugin '${plugin.name}' at index ${pluginIndex} has a duplicate name.`);
			}

			plugin.registry.set('loaderEnvMode', loaderEnvMode);

			try {
				await plugin.initialize(new Client(this));
				this.loadedPlugins.push(plugin);
			} catch (error) {
				throw new HyperError(Errors.ERROR_IN_PLUGIN, `Error thrown by plugin '${plugin.name}', ${(error as Error).message}`);
			}

			pluginIndex++;
			if (pluginIndex > maxPluginIndex) {
				return;
			}

			await iterate();
		};

		await iterate();
	}
}

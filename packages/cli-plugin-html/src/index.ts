import {HyperPlugin, HyperPluginClient} from '@hyper-stack/cli';
import {PartialDeep} from 'type-fest';
import Settings from './Settings';
import mergeDeep from '@hyper-stack/merge-deep';
import Terminal from '@hyper-stack/terminal';

/**
 * A HyperJS plugin used for loading HTML into an application type plugin.
 */
export default class CLIPluginHTML extends HyperPlugin {
	/**
	 * The HTML plugin settings.
	 */
	readonly #settings: Settings;

	/**
	 * The plugin constructor.
	 * @param settings The plugin settings.
	 */
	public constructor(settings: PartialDeep<Settings> = {}) {
		super('@hyper-stack/cli-plugin-html');

		const reg = this.registry;

		reg.set('type', ':renderer');

		this.#settings = mergeDeep<Settings, PartialDeep<Settings>>({
			log: false
		}, settings);
	}

	/**
	 * The plugin initialization method.
	 * @param client The HyperJS plugin client.
	 */
	public async initialize(client: HyperPluginClient) {
		const reg = this.registry;

		if (reg.get('loaderEnvMode') === 'dev' || reg.get('loaderEnvMode') === 'test') {
			client.loadedPlugins.forEach((l) => {
				if (this.#settings.log) Terminal.log(`[http] Detected loaded plugin: '${l.name}', env = ${l.registry.get('loaderEnvMode')}`);
			});
		} else {
			throw new Error('The HTML plugin is only available in development mode.');
		}
	}
}

import {HyperPlugin} from '@hyper-stack/cli';
import {PartialDeep} from 'type-fest';
import Settings from './Settings';
import mergeDeep from '@hyper-stack/merge-deep';

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
	 */
	public async initialize() {
		const reg = this.registry;

		if (reg.get('loaderEnvMode') == 'dev') {

		} else {
			throw new Error('The HTML plugin is only available in development mode.');
		}
	}
}

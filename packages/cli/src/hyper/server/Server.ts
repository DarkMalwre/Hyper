import mergeDeep from '@hyper-stack/merge-deep';
import Terminal from '@hyper-stack/terminal';
import {PartialDeep} from 'type-fest';
import Settings from './Settings';
import Errors from './Errors';
import {HyperError} from '@hyper-stack/internal';
import PluginHost from './PluginHost';

/**
 * A HyperJS server host.
 */
export default class Server {
	/**
	 * The full settings.
	 */
	readonly #settings: Settings;

	/**
	 * The path to the root of the project relative to the current working directory.
	 */
	readonly #relativeCWDPath: string;

	/**
	 * Create a new HyperJS server instance.
	 * @param settings The settings for the server.
	 * @param relativeCWDPath The path to the root of the project relative to the current working directory.
	 */
	public constructor(settings: PartialDeep<Settings>, relativeCWDPath: string) {
		this.#relativeCWDPath = relativeCWDPath;

		this.#settings = mergeDeep<Settings, PartialDeep<Settings>>({
			plugins: [],
			type: 'dev'
		}, settings);
	}

	/**
	 * Run the HyperJS server.
	 */
	public async run() {
		Terminal.debug('[i] Checking environment for plugins support.');

		if (this.#settings.plugins.length === 0) {
			Terminal.debug('[E] No plugins could be loaded, crashing HyperJS server.');
			throw new HyperError(Errors.NO_PLUGINS_FOUND, '0 plugins were detected, the HyperJS server doesn\'t know what to do.');
		} else {
			Terminal.debug(`[i] ${this.#settings.plugins.length} plugins were queued to be loaded, the plugin loader will start momentarily.`);
		}

		const pluginLoader = new PluginHost();

		try {
			await pluginLoader.load(this.#settings.plugins, this.#settings.type, this.#relativeCWDPath);
		} catch (error) {
			Terminal.debug('[E] An error occurred while loading plugins, crashing HyperJS server.');
			throw error;
		}
	}
}

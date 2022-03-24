import PluginHost from "../server/PluginHost";

/**
 * A plugin client.
 */
export default class Client {
    /**
     * The plugin loader.
     */
    readonly #pluginLoader: PluginHost;

    /**
     * Create a new plugin client.
     * @param pluginLoader The plugin loader.
     */
    public constructor(pluginLoader: PluginHost) {
        this.#pluginLoader = pluginLoader;
    }

    /**
     * Get all the plugins that are loaded and queued to be loaded
     * @returns All the plugins from the settings.  
     */
    public get plugins() {
        return [ ...this.#pluginLoader.plugins ];
    }

    /**
     * Get all the plugins that are ready.
     * @returns All the ready plugins.
     */
    public get loadedPlugins() {
        return [ ...this.#pluginLoader.loadedPlugins ];
    }
}
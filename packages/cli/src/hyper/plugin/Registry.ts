/**
 * The default keys that are pre-assigned to the registry by the plugin loader.
 */
type DefaultKeys = 'loaderEnvMode' | 'type';

/**
 * A registry store for your HyperJS plugins.
 */
export default class Registry {
	/**
	 * The true registry store.
	 */
	readonly #store: Map<DefaultKeys | string, any> = new Map();

	/**
	 * Clear the registry.
	 */
	public clear() {
		this.#store.clear();
	}

	/**
	 * Check if a registry key exists.
	 * @param key The registry key.
	 * @returns If the registry key exists.
	 */
	public has(key: string | DefaultKeys) {
		return this.#store.has(key);
	}

	/**
	 * Update or set the value of a registry key.
	 * @param key The registry key.
	 * @param value Set a value in the registry.
	 */
	public set<Type>(key: string | DefaultKeys, value: Type) {
		this.#store.set(key, value);
	}

	/**
	 * Get a registry key value.
	 * @param key The registry key.
	 * @returns The registry key value.
	 */
	public get<Type>(key: string | DefaultKeys) {
		let result: Type | undefined;

		if (this.#store.has(key)) {
			result = this.#store.get(key);
		}

		return result;
	}

	/**
	 * Delete a registry key.
	 * @param key The registry key.
	 */
	public unset<Type>(key: string | DefaultKeys) {
		this.#store.delete(key);
	}

	/**
	 * All the registry values.
	 * @returns The registry values.
	 */
	public get values() {
		return this.#store.values();
	}

	/**
	 * Get all the registry entries.
	 * @returns The registry entries.
	 */
	public get keyValuePairs() {
		let result: {
			/**
			 * The registry key.
			 */
			key: string | DefaultKeys;

			/**
			 * The registry key value.
			 */
			value: any;
		}[] = [];

		for (const [key, value] of this.#store) {
			result.push({
				key,
				value
			});
		}

		return result;
	}
}

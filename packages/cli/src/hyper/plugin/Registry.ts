/**
 * A registry store for your HyperJS plugins.
 */
export default class Registry {
	/**
	 * The true registry store.
	 */
	readonly #store: Map<string, any> = new Map();

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
	public has(key: string) {
		return this.#store.has(key);
	}

	/**
	 * Update or set the value of a registry key.
	 * @param key The registry key.
	 * @param value Set a value in the registry.
	 */
	public set<Type>(key: string, value: Type) {
		this.#store.set(key, value);
	}

	/**
	 * Delete a registry key.
	 * @param key The registry key.
	 */
	public unset<Type>(key: string) {
		this.#store.delete(key);
	}

	/**
	 * Get the value of a registry key.
	 * @param key The registry key.
	 * @returns The value of the registry key.
	 */
	public get<Type>(key: string) {
		return this.#store.get(key) as Type;
	}
}

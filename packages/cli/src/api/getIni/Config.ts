/**
 * The getIni configuration for the CLI service.
 */
export default interface Config {
	/**
	 * The location to the initCache folder.
	 */
	cacheFolder: string;

	/**
	 * Whether to clean the cache before execution.
	 */
	clean: boolean;
}

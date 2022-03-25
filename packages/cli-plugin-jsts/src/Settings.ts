/**
 * Settings for the JavaScript and TypeScript compiler.
 */
export default interface Settings {
	/**
	 * All the projects to compile.
	 */
	projects: {
		/**
		 * The path to the project.
		 */
		path?: string;

		/**
		 * Path to the entry script relative to the path.
		 */
		entry?: string;

		/**
		 * All the supported distro types.
		 */
		distroTypes?: {
			/**
			 * The path to the ESM build output path relative to the root project path.
			 */
			esm?: false | string;

			/**
			 * The path to the CJS build output path relative to the root project path.
			 */
			cjs?: false | string;

			/**
			 * The path to the browser based build output path relative to the root project path.
			 */
			browser?: false | string;
		}
	}[];

	/**
	 * Performance settings for compilation.
	 */
	performance: {
		/**
		 * Whether to compile all projects and distro types in parallel, this may use more memory and CPU.
		 */
		parallelCompile: boolean;
	}
}

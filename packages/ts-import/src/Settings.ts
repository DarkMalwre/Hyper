import type {BuildOptions} from 'esbuild';

/**
 * Settings for importing TypeScript files.
 */
export interface Settings {
	/**
	 * The TypeScript compile target.
	 */
	target: BuildOptions['target'];

	/**
	 * The format in which the TypeScript files should be compiled.
	 */
	format: 'esm' | 'cjs';

	/**
	 * Any external dependencies that should not be bundled in the output.
	 */
	externals: string[];
}

/**
 * Error for when using this module.
 */
enum Errors {
	/**
	 * The output source provided is not accessible.
	 */
	INACCESSIBLE_OUTPUT_LOCATION = 'INACCESSIBLE_OUTPUT_LOCATION',

	/**
	 * The input source provided is not accessible or invalid.
	 */
	INVALID_INPUT_LOCATION = 'INVALID_INPUT_LOCATION',

	/**
	 * ESBuild tried to compile the file but failed with an error.
	 */
	ESBUILD_BUILD_FAILED = 'ESBUILD_BUILD_FAILED',

	/**
	 * The compiled file was not found or isn't accessible.
	 */
	COMPILED_CACHE_NOT_FOUND = 'COMPILED_CACHE_NOT_FOUND',

	/**
	 * Failed to import the compiled initCache, are you sure it was compiled by us or is it accessible?
	 */
	COMPILED_CACHE_FAILED_IMPORT = 'COMPILED_CACHE_FAILED_IMPORT',

	/**
	 * The compiled file is using an invalid extension, the following extensions are supported: `.js`, `.mjs`, `.cjs`.
	 */
	COMPILED_CACHE_INVALID_EXTENSION = 'COMPILED_CACHE_INVALID_EXTENSION'
}

export default Errors;

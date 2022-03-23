/**
 * Error for when fetching the CLI getIni.
 */
enum Errors {
	/**
	 * Could not find hyperjs.getIni.
	 */
	INI_NOT_FOUND = 'INI_NOT_FOUND',

	/**
	 * Something is wrong with the getIni file, please check the syntax.
	 */
	FAILED_TO_PARSE_INI = 'FAILED_TO_PARSE_INI'
}

export default Errors;

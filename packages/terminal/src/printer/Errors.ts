/**
 * Errors for when the printer performs an invalid operation.
 */
enum Errors {
	/**
	 * The printer ran a job that required TTY in the terminal, but it was not available.
	 */
	TTY_NOT_AVAILABLE = 'TTY_NOT_AVAILABLE',
}

export default Errors;

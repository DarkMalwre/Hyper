/**
 * An error that should be used by Hyper monorepo packages internally.
 */
export default class HyperError<ErrorCode = never> extends Error {
	/**
	 * Create a new HyperJS error to be used internally.
	 * @param code The error code.
	 * @param message The error message.
	 */
	public constructor(code: ErrorCode, message: string) {
		super(message);

		if (typeof code !== 'string') {
			throw new TypeError('The error code must be a string.');
		}

		this.name = code.toString();
		this.message = message;
	}

	/**
	 * Update the error reason code.
	 * @param code The error code.
	 * @throws {TypeError} A type error if the code is not a string.
	 */
	public updateErrorCode(code: ErrorCode): void {
		if (typeof code !== 'string') {
			throw new TypeError('The error code must be a string.');
		}

		this.name = code.toString();
	}
}

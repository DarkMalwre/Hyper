import Terminal from "@hyper-stack/terminal";

/**
 * Render an error in the CLI.
 * @param error The error encountered.
 */
export default function renderError(error: any) {
	if (typeof error.stack === 'string') {
		error.stack.split('\n').forEach((line: string) => {
			Terminal.error(line);
		});
	}
}

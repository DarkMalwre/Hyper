import Terminal from '../index';
import {HyperError} from '@hyper-stack/internal';
import Errors from './Errors';

/**
 * The CLI printer API which can help with printing multiple lines of text, and modifications of them and even more.
 */
export default class Printer {
	/**
	 * The amount of lines that were rendered previously.
	 */
	static #lastLinesRendered: number | null = null;

	/**
	 * Render a group or chunk of lines.
	 * @param lines The lines that should be rendered in a cluster.
	 * @throws {HyperError<Errors>}
	 */
	public static renderLines(lines: string[]) {
		if (!Terminal.ttySupported) {
			throw new HyperError(Errors.TTY_NOT_AVAILABLE, 'Dynamic line rendering is not supported in environments that don\'t have TTY enabled.');
		}

		this.clear();
		let totalLinesToBeRendered = 0;

		lines.forEach(line => {
			totalLinesToBeRendered += Math.ceil(line.length / process.stdout.columns);
			process.stdout.write(`${line}\n`);
		});

		this.#lastLinesRendered = totalLinesToBeRendered;
	}

	/**
	 * Clear any lines that were rendered previously.
	 * @throws {HyperError<Errors>}
	 */
	public static clear() {
		if (!Terminal.ttySupported) {
			throw new HyperError(Errors.TTY_NOT_AVAILABLE, 'Dynamic line rendering is not supported in environments that don\'t have TTY enabled.');
		}

		if (this.#lastLinesRendered !== null) {
			process.stdout.moveCursor(-process.stdout.columns, -this.#lastLinesRendered);
			process.stdout.clearScreenDown();

			this.reset();
		}
	}

	/**
	 * Render an overlay on a direction of the CLI.
	 * NOTE: This is not supposed to be used for anything in production, it's just for debugging purposes.
	 * @param float The float direction of the overlay.
	 * @param lines The lines that should be rendered in a cluster.
	 * @throws {HyperError<Errors>}
	 */
	public static renderForcedOverlay(float: 'right' | 'left', lines: string[]) {
		if (!Terminal.ttySupported) {
			throw new HyperError(Errors.TTY_NOT_AVAILABLE, 'Dynamic line rendering is not supported in environments that don\'t have TTY enabled.');
		}

		if (float === 'left') {
			lines.forEach((line) => {
				process.stdout.write(`${line}\n`);
			});
		} else {
			lines.forEach((line) => {
				process.stdout.moveCursor(process.stdout.columns - line.length, 0);
				process.stdout.write(`${line}\n`);
			});
		}

		process.stdout.moveCursor(0, -lines.length);
	}

	/**
	 * Reset the line renderer, now when you render another line, it will not overwrite the previous lines that were rendered before resetting this.
	 */
	public static reset() {
		this.#lastLinesRendered = null;
	}

	/**
	 * Hide the cursor in the command line.
	 */
	public static hideCursor() {
		process.stdout.write('\x1b[?25l');
	}

	/**
	 * Show the cursor in the command line.
	 */
	public static showCursor() {
		process.stdout.write('\x1b[?25h');
	}
}

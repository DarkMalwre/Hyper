import {HyperError} from '@hyper-stack/internal';
import Errors from './Errors';
import Terminal from '../index';
import mergeDeep from '@hyper-stack/merge-deep';
import {PartialDeep} from 'type-fest';
import PlaySettings from './PlaySettings';
import Printer from '../printer/Printer';
import chalk from 'chalk';

/**
 * A class used for playing animations in the command line.
 */
export default class Anime {
	/**
	 * The animation rendering loop.
	 */
	static #animationLoop: NodeJS.Timer;

	/**
	 * If the animation is in its playing state.
	 */
	static #animationRunning = false;

	/**
	 * Whether the animation render statement is paused.
	 * NOTE: The animation is still playing, it just won't render or update its frames.
	 */
	static #renderingPaused = false;

	/**
	 * The current spinner message.
	 */
	static #currentMessage: string;

	/**
	 * The current play settings.
	 */
	static #currentSettings: PlaySettings;

	/**
	 * Play an animation in the command line interface.
	 * @param text The text to render with the animation.
	 * @param settings The settings for the animation.
	 * @throws {HyperError<Errors>}
	 */
	public static play(text: string, settings: PartialDeep<PlaySettings> = {}) {
		if (!Terminal.ttySupported) {
			throw new HyperError(Errors.TTY_NOT_AVAILABLE, 'Running animations in the CLI is not supported without TTY');
		}

		if (this.#animationRunning) {
			throw new HyperError(Errors.ANIMATION_ALREADY_RUNNING, 'You are trying to start an animation, but one is already running.');
		}

		this.#animationRunning = true;
		this.#renderingPaused = false;

		const settingsFull: PlaySettings = mergeDeep<PlaySettings, typeof settings>({
			fps: {
				type: 'interval',
				value: 100
			},
			frames: ['|', '/', '-', '\\'],
			colors: {
				success: '#50ffab',
				warning: '#ffff55',
				error: '#ff5555',
				stateless: '#999'
			},
			symbols: {
				success: '✔',
				warning: '△',
				error: '✖'
			}
		}, settings);

		this.#currentMessage = text;
		this.#currentSettings = settingsFull;

		let currentFrame = 0;
		let frameInterval = 0;

		if (settingsFull.fps.type === 'fps') {
			frameInterval = 1000 / settingsFull.fps.value;
		} else {
			frameInterval = settingsFull.fps.value;
		}

		Printer.hideCursor();
		Printer.reset();

		this.#animationLoop = setInterval(() => {
			if (this.#renderingPaused) {
				return;
			}

			currentFrame++;
			if (currentFrame >= settingsFull.frames.length) {
				currentFrame = 0;
			}

			const spinner = chalk.hex(settingsFull.colors.stateless)(settingsFull.frames[currentFrame]);

			Printer.renderLines([
				` ${spinner} ${text}`
			]);
		}, frameInterval);
	}

	/**
	 * Stop the currently running animation in the command line interface.
	 * @param state The state of the animation.
	 * @param newMessage The new text.
	 * @throws {HyperError<Errors>}
	 */
	public static stop(state: 'error' | 'warning' | 'success', newMessage?: string) {
		if (!this.#animationRunning) {
			throw new HyperError(Errors.ANIMATION_NOT_RUNNING, 'You are trying to stop an animation, but one is not running.');
		}

		this.#renderingPaused = true;
		clearInterval(this.#animationLoop);

		const prefix = chalk.hex(this.#currentSettings.colors[state])(this.#currentSettings.symbols[state]);
		const message = newMessage ? newMessage : this.#currentMessage;

		Printer.renderLines([
			` ${prefix} ${message}`
		]);

		this.#animationRunning = false;

		Printer.showCursor();
		Printer.reset();
	}
}

import {HyperError} from '@hyper-stack/internal';
import Errors from './Errors';
import Terminal from '../index';
import mergeDeep from 'merge-deep';
import {PartialDeep} from 'type-fest';
import PlaySettings from './PlaySettings';
import Printer from '../printer/Printer';

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
	 * Play an animation in the command line interface.
	 * @param text The text to render with the animation.
	 * @param settings The settings for the animation.
	 * @throws {HyperError<Errors>}
	 */
	public static play(text: string, settings: PartialDeep<PlaySettings>) {
		if (!Terminal.ttySupported) {
			throw new HyperError(Errors.TTY_NOT_AVAILABLE, 'Running animations in the CLI is not supported without TTY');
		}

		if (this.#animationRunning) {
			throw new HyperError(Errors.ANIMATION_ALREADY_RUNNING, 'You are trying to start an animation, but one is already running.');
		}

		this.#animationRunning = true;
		this.#renderingPaused = false;

		const settingsFull = mergeDeep<PlaySettings, PartialDeep<PlaySettings>>({
			fps: {
				type: 'interval',
				value: 100
			},
			frames: ['|', '/', '-', '\\']
		}, settings);

		let currentFrame = 0;
		Printer.reset();

		this.#animationLoop = setInterval(() => {
			if (this.#renderingPaused) {
				return;
			}

			currentFrame++;
			if (currentFrame >= settingsFull.frames.length) {
				currentFrame = 0;
			}

			Printer.renderLines([
				` ${settingsFull.frames[currentFrame]} ${text}`
			]);
		}, 100);
	}

	/**
	 * Stop the currently running animation in the command line interface.
	 * @throws {HyperError<Errors>}
	 */
	public static stop() {
		if (!this.#animationRunning) {
			throw new HyperError(Errors.ANIMATION_NOT_RUNNING, 'You are trying to stop an animation, but one is not running.');
		}
	}
}

/**
 * A class used for running animations in the command line.
 */
import {HyperError} from '@hyper-stack/internal';
import Errors from './Errors';
import Terminal from '../index';

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
	 * Play an animation in the command line interface.
	 * @throws {HyperError<Errors>}
	 */
	public static play() {
		if (!Terminal.ttySupported) {
			throw new HyperError(Errors.TTY_NOT_AVAILABLE, 'Running animations in the CLI');
		}

		if (this.#animationRunning) {
			throw new HyperError(Errors.ANIMATION_ALREADY_RUNNING, 'You are trying to start an animation, but one is already running.');
		}
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

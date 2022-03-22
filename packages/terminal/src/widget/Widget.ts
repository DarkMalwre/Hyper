import State from '../State';
import mergeDeep from '@hyper-stack/merge-deep';
import BooleanSettings from './settings/BooleanSettings';
import {HyperError} from '@hyper-stack/internal';
import Errors from './Errors';
import {PartialDeep} from 'type-fest';
import readline from 'readline';
import {Printer} from '..';
import chalk from 'chalk';

/**
 * The type of widget.
 */
type WidgetType = 'boolean' | 'progress';

/**
 * A widget manager host that can be used to render widgets in the CLI.
 */
export default class Widget {
	/**
	 * The widget type.
	 */
	static #type: WidgetType;

	/**
	 * If a widget of any type is running.
	 */
	static #running = false;

	/**
	 * The widget end command.
	 */
	static #finishCallback: () => void = () => {};

	/**
	 * The STDIN keypress listener.
	 */
	static #keyPressListener: (value: string | undefined, event: any) => void = () => {};

	/**
	 * Start a new boolean widget.
	 * @param type The type of prompt.
	 * @param settings The boolean prompt settings.
	 */
	public static start(type: 'boolean', settings: BooleanSettings): void;

	/**
	 * Start a widget.
	 * @param type The widget type.
	 * @param settings The settings for the widget.
	 * @throws {HyperError<Errors>}
	 */
	public static async start(type: WidgetType, settings: any) {
		if (State.animeRunning) {
			throw new HyperError(Errors.ANIME_WIDGET_RUNNING, 'An anime widget is currently running.');
		}

		if (type === 'boolean') {
			this.#type = 'boolean';
			this.#running = true;

			return await this.#startBoolean(mergeDeep<BooleanSettings, PartialDeep<BooleanSettings>>({
				label: '...',
				defaultValue: false,
				text: {
					true: 'Yes',
					false: 'No'
				},
				symbols: {
					done: '✔',
					halted: '✖',
					waiting: '?'
				},
				colors: {
					done: '#50ffab',
					halted: '#ff5555',
					waiting: '#999',
					active: '#fff'
				}
			}, settings));
		}
	}

	/**
	 * Start the boolean prompt widget.
	 * @param settings Settings for the widget.
	 */
	static #startBoolean(settings: BooleanSettings) {
		return new Promise<boolean>((resolve) => {
			let currentValue = settings.defaultValue;
			let halt = false;
			let done = false;
			process.stdin.resume();

			this.#finishCallback = () => {
				done = true;
				render();

				process.stdin.removeListener('keypress', this.#keyPressListener);
				process.stdin.pause();

				Printer.reset();
				Printer.showCursor();

				State.widgetRunning = false;
				this.#running = false;

				resolve(currentValue);
			};

			this.#keyPressListener = (value, event) => {
				if (done) return;

				if (event.ctrl && event.name === 'c') {
					halt = true;
					render();

					process.exit(0);
				}

				if (event.name === 'right') {
					currentValue = false;
				}

				if (event.name === 'left') {
					currentValue = true;
				}

				if (event.name === 'return') {
					this.#finishCallback();
					return;
				}

				render();
			};

			Printer.reset();
			Printer.hideCursor();

			readline.emitKeypressEvents(process.stdin);
			process.stdin.setRawMode(true);

			process.stdin.on('keypress', this.#keyPressListener);

			const render = () => {
				const activeChalk = chalk.underline.hex(settings.colors.active);
				const inactiveChalk = chalk.hex(settings.colors.waiting);

				const prefixIcon = halt ? chalk.hex(settings.colors.halted)(settings.symbols.halted) : (
					done ? chalk.hex(settings.colors.done)(settings.symbols.done) : inactiveChalk(settings.symbols.waiting)
				);

				const promptValue = done ? chalk.underline.hex(settings.colors.active)(currentValue ? settings.text.true : settings.text.false) : `${(currentValue ? activeChalk : inactiveChalk)(settings.text.true)} / ${(!currentValue ? activeChalk : inactiveChalk)(settings.text.false)}`;

				Printer.renderLines([
					` ${prefixIcon}  ${settings.label}: ${promptValue}`
				]);
			};

			render();
		});
	}

	/**
	 * Stop a widget.
	 * @param type The widget type.
	 * @throws {HyperError<Errors>}
	 */
	public static stop(type: WidgetType) {
		if (!this.#running || type !== this.#type) {
			throw new HyperError(Errors.WIDGET_NOT_RUNNING, 'No widget that matched the type is currently running.');
		}

		if (type === 'boolean') {
			this.#finishCallback();
		}
	}
}

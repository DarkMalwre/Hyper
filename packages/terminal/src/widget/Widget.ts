import State from '../State';
import mergeDeep from '@hyper-stack/merge-deep';
import BooleanSettings from './settings/BooleanSettings';
import {HyperError} from '@hyper-stack/internal';
import Errors from './Errors';
import {PartialDeep} from 'type-fest';
import readline from 'readline';
import Terminal, {Printer} from '..';
import chalk from 'chalk';
import SelectListSettings from './settings/SelectListSettings';

/**
 * The type of widget.
 */
type WidgetType = 'boolean' | 'selectList';

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
	public static async start(type: 'boolean', settings: BooleanSettings): Promise<boolean>;

	/**
	 * Start a new select list widget.
	 * @param type The type of prompt.
	 * @param settings The select list settings.
	 */
	public static async start(type: 'selectList', settings: SelectListSettings): Promise<number>;

	/**
	 * Start a widget.
	 * @param type The widget type.
	 * @param settings The settings for the widget.
	 * @throws {HyperError<Errors>}
	 */
	public static async start(type: WidgetType, settings: any) {
		if (!Terminal.ttySupported) {
			throw new HyperError(Errors.TTY_NOT_AVAILABLE, 'Widgets can not be used in environments that do not support TTY.');
		}

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
		} else if (type === 'selectList') {
			this.#type = 'selectList';
			this.#running = true;

			return await this.#startSelectList(mergeDeep<SelectListSettings, PartialDeep<SelectListSettings>>({
				label: '...',
				items: ['1', '2'],
				defaultValue: 0,
				symbols: {
					done: '✔',
					halted: '✖',
					waiting: '?',
					arrow: '→'
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
	 * Start a select list widget.
	 * @param settings Settings for the widget.
	 * @returns Promise for when the select list is done.
	 */
	static #startSelectList(settings: SelectListSettings) {
		return new Promise<number>((resolve) => {
			let currentValue = settings.defaultValue;
			let done = false;
			let halt = false;

			if (currentValue > settings.items.length - 1) {
				currentValue = settings.items.length - 1;
			}

			this.#finishCallback = () => {
				process.stdin.removeListener('keypress', this.#keyPressListener);
				process.stdin.pause();

				done = true;
				render();

				Printer.reset();
				Printer.showCursor();

				resolve(currentValue);
			};

			this.#keyPressListener = (value, event) => {
				if (event.ctrl && event.name === 'c') {
					halt = true;
					render();

					process.exit(0);
				}

				if (event.name === 'return') {
					this.#finishCallback();
					return;
				}

				if (event.name === 'up') {
					currentValue--;

					if (currentValue < 0) {
						currentValue = 0;
					}
				}

				if (event.name === 'down') {
					currentValue++;

					if (currentValue > settings.items.length - 1) {
						currentValue = settings.items.length - 1;
					}
				}

				render();
			};

			Printer.reset();
			Printer.hideCursor();

			process.stdin.setRawMode(true);
			process.stdin.resume();
			readline.emitKeypressEvents(process.stdin);

			process.stdin.on('keypress', this.#keyPressListener);

			const render = () => {
				const isOverflowing = (settings.items.length + 2) > process.stdout.rows;

				const prefixIcon = done ? chalk.hex(settings.colors.done)(settings.symbols.done)
					: (
						halt ? chalk.hex(settings.colors.halted)(settings.symbols.halted)
							: chalk.hex(settings.colors.waiting)(settings.symbols.waiting)
					);

				const linesToRender = [
					` ${prefixIcon}  ${settings.label}${!done && !halt ? chalk.hex(settings.colors.waiting)(` (${currentValue + 1}/${settings.items.length})`) : ''}: ${chalk.underline.hex(done ? settings.colors.done : settings.colors.active)(settings.items[currentValue])}`
				] as string[];

				const optionsToRender = [] as string[];

				if (!isOverflowing && !halt && !done) {
					settings.items.forEach((item, index) => {
						optionsToRender.push(`   ${index === currentValue ? chalk.hex(settings.colors.active)(settings.symbols.arrow) : ' '}  ${index === currentValue ? chalk.underline.hex(settings.colors.active)(item) : chalk.hex(settings.colors.waiting)(item)}`);
					});
				} else if (!halt && !done) {
					const topItem = settings.items[currentValue - 1];
					const bottomItem = settings.items[currentValue + 1];
					const item = settings.items[currentValue];

					optionsToRender.push(`   ${' '}  ${chalk.hex(settings.colors.waiting)(topItem ?? '')}`);
					optionsToRender.push(`   ${chalk.hex(settings.colors.active)(settings.symbols.arrow)}  ${chalk.underline.hex(settings.colors.active)(item)}`);
					optionsToRender.push(`   ${' '}  ${chalk.hex(settings.colors.waiting)(bottomItem ?? '')}`);
				}

				optionsToRender.forEach((opt) => linesToRender.push(opt));
				Printer.renderLines(linesToRender.filter(value => !!value));
			};

			render();
		});
	}

	/**
	 * Start the boolean prompt widget.
	 * @param settings Settings for the widget.
	 * @returns Promise for when the prompt ends.
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

				const promptValue = done ? chalk.underline.hex(settings.colors.done)(currentValue ? settings.text.true : settings.text.false) : `${(currentValue ? activeChalk : inactiveChalk)(settings.text.true)} / ${(!currentValue ? activeChalk : inactiveChalk)(settings.text.false)}`;

				Printer.renderLines([
					` ${prefixIcon}  ${settings.label}: ${promptValue}`
				]);
			};

			render();
		});
	}

	/**
	 * Stop a widget.
	 * @throws {HyperError<Errors>}
	 */
	public static stop() {
		if (!this.#running) {
			throw new HyperError(Errors.WIDGET_NOT_RUNNING, 'No widget that matched the type is currently running.');
		}

		this.#finishCallback();
	}
}

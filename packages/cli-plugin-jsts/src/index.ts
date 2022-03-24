import {HyperPlugin} from '@hyper-stack/cli';

/**
 * A plugin that allows HyperJS to compile JavaScript and TypeScript to a compiled file.
 */
export default class CLIPluginJSTS extends HyperPlugin {
	/**
	 * Create a new JSTS plugin instance.
	 */
	public constructor() {
		super();
	}

	/**
	 * The plugin load method.
	 */
	public initialize() {
		console.log('Plugin loader is working');
	}
}

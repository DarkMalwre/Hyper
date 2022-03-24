import {HyperPlugin} from '@hyper-stack/cli';

/**
 * A plugin that allows HyperJS to compile JavaScript and TypeScript to a compiled file.
 */
export default class CLIPluginJSTS extends HyperPlugin {
	/**
	 * Create a new JSTS plugin instance.
	 */
	public constructor() {
		super('@hyper-stack/cli-plugin-jsts');

		const reg = this.registry;

		reg.set('type', ':compiler');
	}

	/**
	 * The plugin load method.
	 */
	public async initialize() {
		// throw new Error('Plugin loader is working');
	}
}

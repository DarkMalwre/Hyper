import {HyperPlugin} from '@hyper-stack/cli';

/**
 * A plugin for generating TypeScript definitions.
 */
export default class CLIPluginDTS extends HyperPlugin {
	/**
	 * Create a new instance of the TypeScript declarations plugin.
	 */
	public constructor() {
		super('@hyper-stack/cli-plugin-dts');

		const reg = this.registry;

		reg.set('type', ':compiler');
	}

	/**
	 * The plugin's initialization method.
	 */
	public initialize() {
		return new Promise<void>((res) => {
			res();
		});
	}
}

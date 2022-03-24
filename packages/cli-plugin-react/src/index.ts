import {HyperPlugin} from '@hyper-stack/cli';

/**
 * A HyperJS plugin used for loading ReactJS into an application type plugin.
 */
export default class CLIPluginReact extends HyperPlugin {
	/**
	 * The plugin constructor.
	 */
	public constructor() {
		super('@hyper-stack/cli-plugin-react');

		const reg = this.registry;

		reg.set('type', ':renderer');
	}

	/**
	 * The plugin initialization method.
	 */
	public async initialize() {

	}
}

import {HyperPlugin} from '@hyper-stack/cli';
import * as http from 'http';

/**
 * A HyperJS plugin used for loading HTML into an application type plugin.
 */
export default class CLIPluginHTML extends HyperPlugin {
	/**
	 * The plugin constructor.
	 */
	public constructor() {
		super('@hyper-stack/cli-plugin-html');

		const reg = this.registry;

		reg.set('type', ':renderer');
	}

	/**
	 * The plugin initialization method.
	 */
	public async initialize() {
		const reg = this.registry;

		if (reg.get('loaderEnvMode') == 'dev') {
			http.createServer((req, res) => {
				res.writeHead(200, {'Content-Type': 'text/html'});
				res.end('Renderer... Failed to load HTML');
			}).listen(process.env.PORT || 17649);
		} else {
			throw new Error('The HTML plugin is only available in development mode.');
		}
	}
}

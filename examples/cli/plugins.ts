import CLIPluginJSTS from '@hyper-stack/cli-plugin-jsts';
import CLIPluginDTS from '@hyper-stack/cli-plugin-dts';
import CLIPluginHTML from '@hyper-stack/cli-plugin-html';
import {HyperPlugin, HyperPluginClient} from '@hyper-stack/cli';
import Terminal from '@hyper-stack/terminal';

class MyPlugins extends HyperPlugin  {
	public async checkOtherRenderers() {
		Terminal.log('Checking other renderers...');
	}

	public constructor() {
		super('uwudude');
	}

	public async initialize(client: HyperPluginClient) {
		Terminal.log(client);
		Terminal.log(client.loadedPlugins);

		await this.checkOtherRenderers();
	}
}

const plugins: HyperPlugin[] = [
	new MyPlugins(),
	new CLIPluginDTS(),
	new CLIPluginJSTS(),
	new CLIPluginHTML({
		log: true
	})
];

export default plugins;

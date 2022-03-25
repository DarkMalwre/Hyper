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
		await this.checkOtherRenderers();
	}
}

const plugins: HyperPlugin[] = [
	new MyPlugins()
];

export default plugins;

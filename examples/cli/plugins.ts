import CLIPluginJSTS from '@hyper-stack/cli-plugin-jsts';
import CLIPluginDTS from '@hyper-stack/cli-plugin-dts';
import CLIPluginHTML from '@hyper-stack/cli-plugin-html';

const plugins = [
	new CLIPluginDTS(),
	new CLIPluginJSTS(),
	new CLIPluginHTML()
];

export default plugins;

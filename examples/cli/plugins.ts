import CLIPluginJSTS from '@hyper-stack/cli-plugin-jsts';
import CLIPluginDTS from '@hyper-stack/cli-plugin-dts';

const plugins = [
	new CLIPluginDTS(),
	new CLIPluginJSTS()
];

export default plugins;

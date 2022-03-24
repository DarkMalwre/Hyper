import {config} from '@hyper-stack/cli';
import CLIPluginJSTS from '@hyper-stack/cli-plugin-jsts';

export default config({
	plugins: [new CLIPluginJSTS()]
}) as any;

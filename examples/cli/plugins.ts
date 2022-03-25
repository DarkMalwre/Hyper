import {HyperPlugin} from '@hyper-stack/cli';
import CLIPluginJSTS from '@hyper-stack/cli-plugin-jsts';
import path from 'path';
import {fileURLToPath} from 'url';

const fileName = fileURLToPath(import.meta.url);
const dirName = path.dirname(fileName);

const plugins: HyperPlugin[] = [
	new CLIPluginJSTS({
		projects: [
			{
				path: './packages/hello-printer',
				entry: 'index.ts',
				distroTypes: {
					esm: 'dist.mjs'
				}
			}
		],
		performance: {
			parallelCompile: true
		}
	})
];

export default plugins;


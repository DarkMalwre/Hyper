import yargs from 'yargs';
import {hideBin} from 'yargs/helpers';
import dev from './commands/dev/dev';
import build from './commands/build/build';
import getIni from './api/getIni/getIni';
import GetIniErrors from './api/getIni/Errors';
import GetIniConfig from './api/getIni/Config';
import initCache from './api/initCache/initCache';
import InitCacheErrors from './api/initCache/Errors';
import HyperPlugin from './hyper/plugin/Plugin';
import HyperPluginRegistry from './hyper/plugin/Registry';
import HyperPluginClient from './hyper/plugin/Client';
import HyperServer from './hyper/server/Server';
import HyperServerSettings from './hyper/server/Settings';
import getAppPackage from './api/getAppPackage/getAppPackage';
import GetAppPackageErrors from './api/getAppPackage/Errors';
import HyperConfig from './hyper/config/Config';
import {PartialDeep} from 'type-fest';

const debug = true;

/**
 * Start the CLI service.
 */
export function service() {
	const yp = yargs(hideBin(process.argv));
	
	dev(yp);
	build(yp);

	yp.parse();
}

export {getIni, GetIniErrors, GetIniConfig};
export {initCache, InitCacheErrors};
export {HyperPlugin, HyperPluginRegistry, HyperPluginClient};
export {HyperServer, HyperServerSettings};
export {getAppPackage, GetAppPackageErrors};
export {HyperConfig};

/**
 * Add type declarations to your config, so you can make it type-safe.
 * @param hyperConfig The config to add the types to.
 * @returns The config with the types added.
 */
export function config(hyperConfig: PartialDeep<HyperConfig>): PartialDeep<HyperConfig> {
	return hyperConfig as any;
}

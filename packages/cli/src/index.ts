import yargs from 'yargs';
import {hideBin} from 'yargs/helpers';
import dev from './commands/dev/dev';
import getIni from './api/getIni/getIni';
import GetIniErrors from './api/getIni/Errors';
import GetIniConfig from './api/getIni/Config';
import initCache from './api/initCache/initCache';
import InitCacheErrors from './api/initCache/Errors';
import HyperPlugin from './hyper/plugin/Plugin';
import HyperPluginRegistry from './hyper/plugin/Registry';
import HyperServer from './hyper/server/Server';
import HyperServerSettings from './hyper/server/Settings';
import getAppPackage from './api/getAppPackage/getAppPackage';
import GetAppPackageErrors from './api/getAppPackage/Errors';

const debug = true;

/**
 * Start the CLI service.
 */
export function service() {
	const yp = yargs(hideBin(process.argv));
	dev(yp);

	yp.parse();
}

export {getIni, GetIniErrors, GetIniConfig};
export {initCache, InitCacheErrors};
export {HyperPlugin, HyperPluginRegistry};
export {HyperServer, HyperServerSettings};
export {getAppPackage, GetAppPackageErrors};

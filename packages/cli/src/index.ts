import yargs from 'yargs';
import {hideBin} from 'yargs/helpers';
import dev from './commands/dev';
import getIni from './api/getIni/getIni';
import GetIniErrors from './api/getIni/Errors';
import GetIniConfig from './api/getIni/Config';
import initCache from './api/initCache/initCache';
import InitCacheErrors from './api/initCache/Errors';

const debug = true;

/**
 * Start the CLI service.
 */
export function service() {
	const yp = yargs(hideBin(process.argv));
	dev(yp);

	yp.parse();
}

initCache('./').then(() => {
	console.log('[debug] Generated cache dir');
});

export {getIni, GetIniErrors, GetIniConfig};
export {initCache, InitCacheErrors};

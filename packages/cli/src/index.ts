#!/usr/bin/env node

import yargs from 'yargs';
import {hideBin} from 'yargs/helpers';
import dev from './commands/dev';

/**
 * Start the CLI service.
 */
export function service() {
	const yp = yargs(hideBin(process.argv));
	dev(yp);

	yp.parse();
}

service();

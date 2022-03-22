#!/usr/bin/env node

import path from "path";
import {ChildProcess, spawn} from "child_process";
import {fileURLToPath} from "url";

let cli: ChildProcess | undefined;
let restarting = false;

const fileName = fileURLToPath(import.meta.url);
const dirName = path.dirname(fileName);
const argv = process.argv.splice(2);

const startCLI = () => {
	restarting = false;

	// File path relative to ./build/
	cli = spawn('node', ['./esm.mjs', ...argv], {
		stdio: ['inherit', 'inherit', 'inherit', 'ipc'],
		cwd: dirName
	});

	cli.on('message', (message) => {
		const data = JSON.parse(message as any);

		if (data.type === 'restart') {
			restarting = true;

			stopCLI();
		}
	});

	cli.on('exit', (code) => {
		if (!restarting) {
			process.exit(code ?? 0);
		} else {
			startCLI();
		}
	});
};

const stopCLI = () => {
	if (cli) {
		cli.kill();
	}
};

startCLI();

import {spawn} from 'child_process';

const _ = spawn('node', ['./basic.js'], {
});

_.stdout.on('data', (data) => {
	process.stdout.write(data.toString());
});

_.stderr.on('data', (data) => {
	process.stderr.write(data.toString());
});

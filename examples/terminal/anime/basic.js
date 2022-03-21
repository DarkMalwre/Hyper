import {Anime} from '@hyper-stack/terminal';
import spinners from 'cli-spinners';

Anime.play('Hello CLI with TTY support :0', {
	fps: {
		type: 'interval',
		value: spinners['dots'].interval
	},
	frames: spinners['dots'].frames,
	symbols: {
		error: '✖ Error'
	}
});

setTimeout(() => {
	Anime.stop('success');
}, 2000);

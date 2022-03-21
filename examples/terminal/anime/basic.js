import {Anime} from '@hyper-stack/terminal';
import {wait} from '@hyper-stack/timer';

Anime.play('Hello CLI with TTY support :0');

await wait(2000);

Anime.stop('success');

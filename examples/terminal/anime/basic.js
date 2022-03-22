import {Anime, Widget} from '@hyper-stack/terminal';
import {wait} from '@hyper-stack/timer';

Anime.play('Processing form renderer');
await wait(1000);

Anime.stop('success', 'Form renderer processed');

const isDev = await Widget.start('boolean', {
	label: 'Are you a developer?'
});

const likesHyperJS = await Widget.start('boolean', {
	label: 'Do you like HyperJS?'
});

Anime.play('Processing form data');
await wait(1000);

Anime.stop('success', 'Form data processed');
console.log(` - Is Developer: ${isDev}`);
console.log(` - Likes HyperJS: ${likesHyperJS}`);

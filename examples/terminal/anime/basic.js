import {Widget} from '@hyper-stack/terminal';

const val = await Widget.start('selectList', {
	label: 'My Select List',
	items: [
		'I love ReactJS',
		'I love HyperJS',
		'I love GitSCM',
		'I hate Discord',
		'I love NodeJS',
		'I love HyperJS',
		'I love GitSCM',
		'I hate Discord',
		'I love NodeJS',
		'I love HyperJS',
		'I love GitSCM',
		'I hate Discord',
		...('-'.repeat(1000).split('').map((i, ii) => ii))
	]
});

console.log(val);

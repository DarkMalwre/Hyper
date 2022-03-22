import {Widget} from '@hyper-stack/terminal';

const val = await Widget.start('selectList', {
	label: 'My Select List',
	items: [
		'I love ReactJS',
		'I love HyperJS',
		'I love GitSCM',
		'I hate Discord',
		'I love NodeJS'
	]
});

console.log(val);

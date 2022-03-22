import {Widget} from '@hyper-stack/terminal';

setTimeout(() => {
	// Widget.stop('boolean');
}, 1000);

await Widget.start('boolean', {
	label: 'Are you a programmer?'
});

import {Printer} from '@hyper-stack/terminal';

// Widget.start('boolean', {
// 	label: 'Are you a programmer?'
// });

setInterval(() => {
	Printer.clear();
	Printer.hideCursor();

	Printer.renderForcedOverlay('left', [
		`The time is: ${  new Date().toLocaleTimeString()}`,
		`---> ${  Math.random() * 100  }%`
	]);

	Printer.renderForcedOverlay('right', [
		`The time is: ${  new Date().toLocaleTimeString()}`,
		`---> ${  Math.random() * 100  }%`
	]);
}, 0);

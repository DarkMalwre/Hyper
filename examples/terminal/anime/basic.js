import Terminal, {Printer} from '@hyper-stack/terminal';

console.log(` Has TTY: ${Terminal.ttySupported}`)
let reRenders = 0;
let bytesTotal = 0;

Printer.hideCursor();

setInterval(() => {
	const linesToRender = [
		` - Time: ${new Date().toLocaleTimeString()}`,
		` - ReRenders: ${++reRenders}`,
		` - Memory: ${process.memoryUsage().rss / 1024 / 1024} MB`,
		` - CPU: ${process.cpuUsage().user / 1000 / 10}%`
	];

	let bytesToRender = (new TextEncoder().encode(linesToRender.join('\n'))).length
	const bytesCurrentMessage = ` - Bytes Current: ${bytesToRender}`;
	const bytesTotalMessage = ` - Bytes Total: ${bytesTotal += bytesToRender}`;

	Printer.renderLines([
		...linesToRender,
		bytesCurrentMessage,
		bytesTotalMessage
	]);
}, )

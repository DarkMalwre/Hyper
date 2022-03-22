/**
 * Start the CLI service.
 */
export function service() {
	console.log('Skylix HyperJS CLI');

    setTimeout(() => {
        restart();
    }, 1000)
}

/**
 * Restart the CLI.
 */
export function restart() {
	process.send!(JSON.stringify({
		type: 'restart'
	}));
}

service();

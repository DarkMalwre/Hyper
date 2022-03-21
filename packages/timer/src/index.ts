/**
 * Wait for a certain amount of time before resolving.
 * @param ms The amount of time to wait in milliseconds.
 */
export function wait(ms: number) {
	return new Promise<void>((resolve) => {
		const maxQueueMS = 1000;

		let msLeft = ms;
		let currentWaitMS = msLeft > maxQueueMS ? maxQueueMS : msLeft;

		const recurse = () => {
			setTimeout(() => {
				msLeft -= currentWaitMS;
				currentWaitMS = msLeft > maxQueueMS ? maxQueueMS : msLeft;

				if (msLeft > 0) {
					recurse();
				} else {
					resolve();
				}
			}, currentWaitMS);
		};

		recurse();
	});
}

/**
 * Repeat a certain amount of times.
 */
export function repeat() {
}

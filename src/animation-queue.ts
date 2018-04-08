export type Action = {
	time: number;
	onactionstart: any;
	onactionend: any;
	onactiontick: any;
};

export class AnimationQueue {
	private queue: Action[];

	public constructor() {
		this.queue = [];
	}

	public push(action: Action) {
		this.queue.push(action);
		// console.log(this.queue);
	}

	public pop(): Action {
		if (this.queue.length > 0) {
			return this.queue.shift();
		} else {
			return null;
		}
	}

	public length(): number {
		return this.queue.length;
	}

	public clear() {
		this.queue = [];
	}
}

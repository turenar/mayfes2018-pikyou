export type ActionParams = {
	time: number;
	onactionstart?: () => void;
	onactionend?: () => void;
	onactiontick?: () => void;
};

export type AnimationTarget = {
	action: (action: ActionParams) => void;
	then: (callback: () => void) => void;
};

export type QueuedAction = ActionParams & {
	target: AnimationTarget;
};

export class AnimationQueue {
	private queue: QueuedAction[];
	public running: boolean;

	public constructor() {
		this.queue = [];
		this.running = false;
	}

	public push(action: QueuedAction) {
		this.queue.push(action);
		// console.log(this.queue);
	}

	public run(): void {
		if (!this.running) {
			const action = this.pop();
			console.log({ runAction: action });
			if (action) {
				this.running = true;
				action.target.action(action);
				action.target.then(() => {
					console.log('animation end');
					this.running = false;
					this.run();
				});
				console.log(action.target);
			}
		}
	}

	public pop(): QueuedAction {
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
		this.running = false;
	}
}

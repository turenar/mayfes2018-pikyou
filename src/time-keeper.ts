import TimeKeeperApi, { TimeKeeperState } from './api/time-keeper-api';
import { SceneManager } from './scene-manager';

export default class TimeKeeper {
	private sceneManager: SceneManager;
	private timeKeeperApi: TimeKeeperApi;
	private state: TimeKeeperState;
	private lock: boolean;

	public constructor(sceneManager: SceneManager) {
		this.sceneManager = sceneManager;
		this.timeKeeperApi = TimeKeeperApi.tryCreateInstance();
		this.state = TimeKeeperState.NONE;
		this.lock = false;
		if (this.timeKeeperApi) {
			setInterval(this.ping.bind(this), 3000);
			this.ping();
		}
	}

	public ping() {
		if (!this.lock) {
			this.lock = true;
			const unlocker = () => {
				this.lock = false;
			};

			this.timeKeeperApi
				.ping()
				.then(state => {
					console.log({ timeKeeperPing: state });
					if (state != null) {
						this.updateState(state);
					}
				})
				.then(unlocker, unlocker);
		}
	}

	public getState() {
		return this.state;
	}

	private updateState(state: TimeKeeperState) {
		if (state === TimeKeeperState.FORCED) {
			this.sceneManager.changeScene('StopGame');
		}
		this.state = state;
	}
}

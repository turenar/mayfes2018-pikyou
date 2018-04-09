import core from '../enchant/core';
import { Scene, SceneKind } from './scenes';
import { SceneManager } from '../scene-manager';
import StartStopButton from '../buttons/start-stop-button';
import { World } from '../world';

export default class PlayingScene extends Scene {
	public isRunning: boolean;
	public world: World;
	public button: StartStopButton;

	public constructor(manager: SceneManager) {
		super('Playing', manager);
		this.isRunning = false;

		this.world = new World(this, 0);
		this.button = new StartStopButton(this);

		this.initScene();

		this.reset();
	}

	public reset() {
		core.pause();
		this.isRunning = false;
		this.world.reset();
		this.button.reset();
	}

	public resetWorld() {
		this.world.reset();
	}

	public moveNextScene(nextkind: SceneKind) {
		this.reset();
		super.moveNextScene(nextkind);
	}

	private initScene() {
		this.addChild(this.button);
	}
}

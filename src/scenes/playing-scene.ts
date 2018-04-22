import core from '../enchant/core';
import { Scene, SceneKind } from './scenes';
import { SceneManager } from '../scene-manager';
import StartStopButton from '../buttons/start-stop-button';
import { World } from '../world';

export default class PlayingScene extends Scene {
	private stageNum: number;
	public isRunning: boolean;
	public world: World;
	public button: StartStopButton;

	public constructor(manager: SceneManager, stageNum: number) {
		super('Playing', manager);
		this.isRunning = false;

		this.world = new World(this, stageNum);
		this.button = new StartStopButton(this);
		this.stageNum = stageNum;

		this.initScene();

		this.reset();
	}

	public reset() {
		this.isRunning = false;
		this.world.reset();
		this.button.reset();
	}

	public resetWorld() {
		this.world.reset();
	}

	public moveNextScene(nextkind: SceneKind) {
		this.reset();
		super.moveNextScene(nextkind, this.stageNum);
	}

	private initScene() {
		this.addChild(this.button);
	}
}

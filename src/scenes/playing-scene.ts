import core from '../enchant/core';
import { Scene, SceneKind } from './scenes';
import { SceneManager } from '../scene-manager';
import StartStopButton from '../buttons/start-stop-button';
import { World } from '../world';
import { code } from '../blockly-main';
import CodeRunner from '../code-runner';

export default class PlayingScene extends Scene {
	private stageNum: number;
	private codeRunner: CodeRunner;
	public isRunning: boolean;
	public world: World;
	public button: StartStopButton;

	public constructor(manager: SceneManager, stageNum: number) {
		super('Playing', manager);
		this.isRunning = false;

		this.world = new World(this, stageNum);
		this.button = new StartStopButton(this);
		this.stageNum = stageNum;
		this.codeRunner = new CodeRunner(this.world);

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

	public goal() {
		console.log('goal');
		this.moveNextScene('Result');
	}

	public die() {
		console.log('died');
		this.moveNextScene('GameOver');
	}

	private initScene() {
		this.addChild(this.button);

		const { world } = this;
		this.on('enterframe', () => {
			console.log(world);
			if (world.isDead && !world.animationQueue.running) {
				this.die();
			}
			if (world.isGoal && !world.animationQueue.running) {
				this.goal();
			}

			if (!world.isGoal && !world.isDead && this.isRunning && !world.animationQueue.running) {
				try {
					this.codeRunner.run(code);
				} catch (e) {
					console.error(e);
					if (e === 'goal') {
						world.goal();
					} else if (e === 'die') {
						world.die();
					}
				}
				world.animationQueue.run();
			}
		});
	}
}

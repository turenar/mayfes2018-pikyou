import core from '../enchant/core';
import { Scene, SceneKind } from './scenes';
import { SceneManager } from '../scene-manager';
import StartStopButton from '../buttons/start-stop-button';
import { World } from '../world';
import { code } from '../blockly-main';
import CodeRunner from '../code-runner';
import BackToStageSelectingButton from '../buttons/back-to-stageselecting-button';

export default class PlayingScene extends Scene {
	private stageNum: number;
	private codeRunner: CodeRunner;
	public isRunning: boolean;
	public world: World;
	public startStopButton: StartStopButton;
	public backToStageSelectingButton: BackToStageSelectingButton;

	public constructor(manager: SceneManager, stageNum: number) {
		super('Playing', manager);
		this.isRunning = false;

		this.world = new World(this, stageNum);
		this.stageNum = stageNum;
		this.codeRunner = new CodeRunner(this.world);
		this.startStopButton = new StartStopButton(this, 30, 330);
		this.startStopButton = new StartStopButton(this, 42, 400);
		this.backToStageSelectingButton = new BackToStageSelectingButton(
			10,
			510,
			300,
			60,
			'img/back_to_stage_selecting_from_playing_button.png',
			'img/back_to_stage_selecting_from_playing_button_hover.png',
			this
		);

		this.initScene();

		this.reset();
	}

	public reset() {
		this.isRunning = false;
		this.world.reset();
		this.startStopButton.reset();
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
		const { world } = this;
		this.on('enterframe', () => {
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
		this.addChild(this.startStopButton);
		this.addChild(this.backToStageSelectingButton);
	}
}

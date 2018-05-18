import core from '../enchant/core';
import { Scene, SceneKind } from './scenes';
import { SceneManager } from '../scene-manager';
import StartStopButton from '../buttons/start-stop-button';
import { World } from '../world';
import { code, blockCost } from '../blockly-main';
import CodeRunner from '../code-runner';
import BackToStageSelectingButton from '../buttons/back-to-stageselecting-button';
import stages from '../stages';
import { MAXTURN } from './gameover-scene';

export default class PlayingScene extends Scene {
	private codeRunner: CodeRunner;
	public stageNum: number;
	public isRunning: boolean;
	public world: World;
	public startStopButton: StartStopButton;
	public backToStageSelectingButton: BackToStageSelectingButton;
	public attentionLabel: enchant.Label;
	public leftTurnLabel: enchant.Label;

	public constructor(manager: SceneManager, stageNum: number) {
		super('Playing', manager);
		this.isRunning = false;

		this.world = new World(this, stageNum);
		this.stageNum = stageNum;
		this.codeRunner = new CodeRunner(this.world);
		this.startStopButton = new StartStopButton(this);
		this.backToStageSelectingButton = new BackToStageSelectingButton(this, this.stageNum);
		this.attentionLabel = new enchant.Label('所持ゴールドが足りません！');
		this.attentionLabel.width = core.width;
		this.attentionLabel.font = '25px PixelMplus10';
		this.attentionLabel.color = 'red';
		this.attentionLabel.x = 40;
		this.attentionLabel.y = 200;
		this.attentionLabel.opacity = 0;
		this.leftTurnLabel = new enchant.Label(`のこり移動回数：${MAXTURN}`);
		this.leftTurnLabel.font = '20px PixelMplus10';
		this.leftTurnLabel.x = 5;
		this.leftTurnLabel.y = 385;

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
		const endStatus = this.world.getEndStatus();
		super.moveNextScene(nextkind, this.stageNum, endStatus);
		this.reset();
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
			this.updateExecuteBlock(`${stages[this.stageNum].clearPoint - blockCost}`);
			this.leftTurnLabel.text = `のこり移動回数：${MAXTURN - this.world.actionNum}`;

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
				}
				world.animationQueue.run();
			}
		});
		this.addChild(this.attentionLabel);
		this.addChild(this.leftTurnLabel);
		this.addChild(this.backToStageSelectingButton);
		this.addChild(this.startStopButton);
	}
}

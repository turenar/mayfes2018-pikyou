import { Scene } from './scenes';
import core from '../enchant/core';
import { SceneManager } from '../scene-manager';
import stages from '../stages';
import StageLabels from '../enchant/stage-labels';
import ArrowButton from '../buttons/arrow_button';
import StartToPlaySceneButton from '../buttons/start-to-playscene-button';
import BackToTopButton from '../buttons/back-to-top-button';
import { Event } from 'node-enchantjs';
import { Sprite } from 'node-enchantjs';
import { Label } from 'node-enchantjs';

export default class StageSelectingScene extends Scene {
	private stageNum: number;
	private maxStageNum: number;
	private stageLabels: StageLabels;
	public upButton: ArrowButton;
	public downButton: ArrowButton;
	public startButton: StartToPlaySceneButton;
	public backButton: BackToTopButton;

	public constructor(manager: SceneManager) {
		super('StageSelecting', manager);

		this.initScene();
	}

	private initScene() {
		var sky = new Sprite(320, 640);
		sky.image = core.assets['img/haikei.png'];
		sky.x = 0;
		sky.y = 0;
		this.addChild(sky);

		this.upButton = new ArrowButton(130, 10, 'up', this);
		this.addChild(this.upButton);
		this.downButton = new ArrowButton(130, 400, 'down', this);
		this.addChild(this.downButton);
		this.startButton = new StartToPlaySceneButton(180, 400);
		this.addChild(this.startButton);
		this.backButton = new BackToTopButton(0, 0);
		this.addChild(this.backButton);

		this.maxStageNum = stages.length - 1;
		this.stageNum = 0;

		this.stageLabels = new StageLabels();
		this.addChild(this.stageLabels);

		this.upButton.addEventListener('touchstart', () => {
			this.upNumber();
		});
		this.downButton.addEventListener('touchstart', () => {
			this.downNumber();
		});
		this.startButton.addEventListener('touchstart', () => {
			this.moveNextScene('Playing', this.stageNum);
		});
		this.backButton.addEventListener('touchstart', () => {
			this.moveNextScene('Top');
		});

		console.log(`stageNum: ${this.stageNum}`);
	}

	private upNumber() {
		if (this.stageNum == this.maxStageNum) {
			this.stageNum = 0;
		} else {
			this.stageNum += 1;
		}
		console.log(`stageNum: ${this.stageNum}`);
		this.stageLabels.update(this.stageNum);
	}

	private downNumber() {
		if (this.stageNum == 0) {
			this.stageNum = this.maxStageNum;
		} else {
			this.stageNum -= 1;
		}
		console.log(`stagenum: ${this.stageNum}`);
		this.stageLabels.update(this.stageNum);
	}
}

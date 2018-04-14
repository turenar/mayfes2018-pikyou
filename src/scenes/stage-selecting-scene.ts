import { Scene } from './scenes';
import core from '../enchant/core';
import { SceneManager } from '../scene-manager';
import stages from '../stages';
import ArrowButton from '../buttons/arrow_button';
import StartToPlaySceneButton from '../buttons/start-to-playscene-button';
import { Event } from 'node-enchantjs';
import { Sprite } from 'node-enchantjs';

export default class StageSelectingScene extends Scene {
	private stageNum: number;
	private maxStageNum: number;
	public upButton: ArrowButton;
	public downButton: ArrowButton;
	public startButton: StartToPlaySceneButton;

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

		this.upButton = new ArrowButton(120, 10, 'up', this);
		this.addChild(this.upButton);
		this.downButton = new ArrowButton(120, 330, 'down', this);
		this.addChild(this.downButton);
		this.startButton = new StartToPlaySceneButton(80, 400);
		this.addChild(this.startButton);

		this.maxStageNum = stages.length - 1;
		this.stageNum = 0;

		this.upButton.addEventListener('touchstart', () => {
			this.upNumber();
		});
		this.downButton.addEventListener('touchstart', () => {
			this.downNumber();
		});
		this.startButton.addEventListener('touchstart', () => {
			this.moveNextScene('Playing', this.stageNum);
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
	}

	private downNumber() {
		if (this.stageNum == 0) {
			this.stageNum = this.maxStageNum;
		} else {
			this.stageNum -= 1;
		}
		console.log(`stagenum: ${this.stageNum}`);
	}
}

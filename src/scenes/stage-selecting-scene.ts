import { Scene } from './scenes';
import core from '../enchant/core';
import { SceneManager } from '../scene-manager';
import stages from '../stages';
import ArrowButton from '../buttons/arrow_button';
import StartToPlaySceneButton from '../buttons/start-to-playscene-button';
import BackToTopButton from '../buttons/back-to-top-button';
import { Event } from 'node-enchantjs';
import { Sprite } from 'node-enchantjs';
import { Label } from 'node-enchantjs';

export default class StageSelectingScene extends Scene {
	private stageNum: number;
	private maxStageNum: number;
	private stageNumLabel: Label;
	private stageNameLabel: Label;
	private descriptionLabel: Label;
	private scoreLabel: Label;
	private clearMark: Sprite;
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

		this.initLabels();

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

	private initLabels(){
		this.stageNumLabel = new Label(" ");
		this.stageNumLabel.font = "30px Palatino";
		this.stageNumLabel.x = 30;
		this.stageNumLabel.y = 140;
		this.addChild(this.stageNumLabel);

		this.stageNameLabel = new Label(" ");
		this.stageNameLabel.font = "30px Palatino";
		this.stageNameLabel.x = 30;
		this.stageNameLabel.y = 190;
		this.addChild(this.stageNameLabel);

		this.descriptionLabel = new Label(" ");
		this.descriptionLabel.font = "15px Palatino";
		this.descriptionLabel.x = 30;
		this.descriptionLabel.y = 230;
		this.addChild(this.descriptionLabel);

		this.scoreLabel = new Label(" ");
		this.scoreLabel.font = "25px Palatino";
		this.scoreLabel.x = 30;
		this.scoreLabel.y = 270;
		this.addChild(this.scoreLabel);

		this.clearMark = new Sprite(70, 50);
		this.clearMark.image = core.assets["img/clear_mark.png"];
		this.clearMark.x = 200;
		this.clearMark.y = 250;
		this.addChild(this.clearMark);

		this.updateLabels()
	}

	private updateLabels(){
		this.stageNumLabel.text = "ステージ" + this.stageNum.toString();
		this.stageNameLabel.text = stages[this.stageNum].name;
		this.descriptionLabel.text = stages[this.stageNum].description;
		this.scoreLabel.text = "score: " + "1200" //todo
	}


	private upNumber() {
		if (this.stageNum == this.maxStageNum) {
			this.stageNum = 0;
		} else {
			this.stageNum += 1;
		}
		console.log(`stageNum: ${this.stageNum}`);
		this.updateLabels();
	}

	private downNumber() {
		if (this.stageNum == 0) {
			this.stageNum = this.maxStageNum;
		} else {
			this.stageNum -= 1;
		}
		console.log(`stagenum: ${this.stageNum}`);
		this.updateLabels();
	}
}

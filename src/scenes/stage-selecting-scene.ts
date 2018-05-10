import { Scene } from './scenes';
import core from '../enchant/core';
import { SceneManager } from '../scene-manager';
import stages from '../stages';
import StageLabels from '../enchant/stage-labels';
import ArrowButton from '../buttons/arrow-button';
import StartPlayingButton from '../buttons/start-playing-button';
import BackToTopButton from '../buttons/back-to-top-button';
import { Event } from 'node-enchantjs';
import { Sprite } from 'node-enchantjs';
import { Label } from 'node-enchantjs';

export default class StageSelectingScene extends Scene {
	private maxStageNum: number;
	private stageLabels: StageLabels;
	public stageNum: number;
	public upButton: ArrowButton;
	public downButton: ArrowButton;
	public startButton: StartPlayingButton;
	public backButton: BackToTopButton;

	public constructor(manager: SceneManager) {
		super('StageSelecting', manager);

		this.initScene();
	}

	private initScene() {
		const background = new Sprite(core.width, core.height);
		background.image = core.assets['img/background.png'];

		this.upButton = new ArrowButton(330, 270, 'right', this);
		this.downButton = new ArrowButton(5, 270, 'left', this);
		this.startButton = new StartPlayingButton((core.width - 290) / 2 + 3, 480, this);
		this.backButton = new BackToTopButton(this);

		this.maxStageNum = stages.length - 1;
		this.stageNum = 0;

		this.stageLabels = new StageLabels(this.manager.getClearSituation(0));

		this.upButton.addEventListener('touchstart', () => {
			this.upNumber();
		});
		this.downButton.addEventListener('touchstart', () => {
			this.downNumber();
		});

		this.addChild(background);
		this.addChild(this.upButton);
		this.addChild(this.downButton);
		this.addChild(this.startButton);
		this.addChild(this.backButton);
		this.addChild(this.stageLabels);

		console.log(`stageNum: ${this.stageNum}`);
	}

	private upNumber() {
		if (this.stageNum < this.manager.getMaxOfSelectableStageNumber()) {
			this.stageNum += 1;
		} else {
			this.stageNum = 0;
		}
		console.log(`stageNum: ${this.stageNum}`);
		this.stageLabels.update(this.stageNum, this.manager.getClearSituation(this.stageNum));
	}

	private downNumber() {
		if (this.stageNum == 0) {
			this.stageNum = this.manager.getMaxOfSelectableStageNumber();
		} else {
			this.stageNum -= 1;
		}
		console.log(`stagenum: ${this.stageNum}`);
		this.stageLabels.update(this.stageNum, this.manager.getClearSituation(this.stageNum));
	}
}

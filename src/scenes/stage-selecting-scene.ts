import { Scene } from '../scenes';
import core from '../enchant/core';
import { SceneManager } from '../scene-manager';
import stages from '../stages';
import { Event } from 'node-enchantjs';
import { Sprite } from 'node-enchantjs';

export default class StageSelectingScene extends Scene {
	private stageNum: number;
	private maxStageNum: number;

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

		this.maxStageNum = stages.length - 1;

		this.stageNum = 0;
		console.log(`stageNum: ${this.stageNum}`);
		this.addEventListener(Event.UP_BUTTON_DOWN, () => {
			this.upNumber();
			console.log(`stageNum: ${this.stageNum}`);
		});
		this.addEventListener(Event.DOWN_BUTTON_DOWN, () => {
			this.downNumber();
			console.log(`stagenum: ${this.stageNum}`);
		});
		this.addEventListener(Event.A_BUTTON_DOWN, () => {
			console.log('enter pressed');
			this.manager.changeScene('Playing', this.stageNum);
		});
	}

	private upNumber(){
		if (this.stageNum == this.maxStageNum){
			this.stageNum = 0;
		}else{
			this.stageNum += 1;
		}
	}

	private downNumber(){
		if(this.stageNum == 0){
			this.stageNum = this.maxStageNum;
		}else{
			this.stageNum -= 1;
		}
	}
}

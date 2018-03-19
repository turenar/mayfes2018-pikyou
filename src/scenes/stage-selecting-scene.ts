import { Scene } from '../scenes';
import core from '../enchant/core';
import { SceneManager } from '../scene-manager';
import { Event } from 'node-enchantjs';
import { Sprite } from 'node-enchantjs';

export default class StageSelectingScene extends Scene {
	private stageNum: number;

	public constructor(manager: SceneManager) {
		super('StageSelecting', manager);

		this.initScene();
	}

	private initScene() {
		var sky = new Sprite(320,640);
		sky.image = core.assets['img/haikei.png'];
		sky.x = 0;
		sky.y = 0;
		this.addChild(sky);

		this.stageNum = 0;
		console.log(`stageNum: ${this.stageNum}`);
		this.addEventListener(Event.UP_BUTTON_DOWN, () => {
            this.stageNum += 1;
			console.log(`stageNum: ${this.stageNum}`);
        });
		this.addEventListener(Event.DOWN_BUTTON_DOWN, () => {
			this.stageNum -= 1;
			console.log(`stagenum: ${this.stageNum}`);
		});
		this.addEventListener(Event.A_BUTTON_DOWN, () => {
			console.log("enter pressed");
			this.manager.changeScene('Playing', this.stageNum);
		});
    }
}

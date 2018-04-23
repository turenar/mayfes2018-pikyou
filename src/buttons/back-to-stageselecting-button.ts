import { Scene } from '../scenes/scenes';
import core from '../enchant/core';

export default class BackToStageSelectingButton extends enchant.Sprite {
	public constructor(x: number, y: number, scene: Scene) {
		super(200, 50);
		this.image = core.assets['img/back_to_stage_selecting_button.png'];
		this.x = x;
		this.y = y;

		this.listenButton(scene);
	}

	private listenButton(scene: Scene) {
		this.addEventListener('touchstart', () => {
			console.log('BackToStageSelecting button is pushed!');
			scene.moveNextScene('StageSelecting');
		});
	}
}

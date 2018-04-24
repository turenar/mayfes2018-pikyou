import { Scene } from '../scenes/scenes';
import core from '../enchant/core';

export default class BackToStageSelectingButton extends enchant.Sprite {
	public constructor(x: number, y: number, width: number, height: number, imagePath: string, scene: Scene) {
		super(width, height);
		this.image = core.assets[imagePath];
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

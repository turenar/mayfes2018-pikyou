import { Scene } from '../scenes/scenes';
import core from '../enchant/core';

export default class BackToStageSelectingButton extends enchant.Sprite {
	private scene: Scene;

	public constructor(
		x: number,
		y: number,
		width: number,
		height: number,
		imagePath: string,
		imageHoverPath: string,
		scene: Scene
	) {
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

		this.addEventListener('enterframe', () => {
			const { x, y } = this.scene.manager.mouseController.getPoint();
			const isInside = x > this.x && x < this.x + this.width && y > this.y && y < this.y + this.height;
			if (isInside) {
				this.image = core.assets['img/back_to_stage_selecting_from_playing_button_hover.png'];
			} else {
				this.image = core.assets['img/back_to_stage_selecting_from_playing_button.png'];
			}
		});
	}
}

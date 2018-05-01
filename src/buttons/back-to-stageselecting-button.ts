import { Scene } from '../scenes/scenes';
import core from '../enchant/core';
import Button from './button';

export default class BackToStageSelectingButton extends Button {
	private scene: Scene;

	public constructor(
		scene: Scene
	) {
		super(300, 60, scene, 'img/back_to_stage_selecting_button.png', 'img/back_to_stage_selecting_button_hover.png');
		this.x = 10;
		this.y = 510;

		this.initButton(scene);
	}

	private initButton(scene: Scene) {
		this.addEventListener('touchstart', () => {
			console.log('BackToStageSelecting button is pushed!');
			scene.moveNextScene('StageSelecting');
		});
	}
}

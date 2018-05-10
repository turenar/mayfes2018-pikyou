import { Scene } from '../scenes/scenes';
import core from '../enchant/core';
import Button from './button';

export default class BackToStageSelectingButton extends Button {
	private scene: Scene;

	public constructor(scene: Scene) {
		super(180, 89, scene, 'img/back_button.png', 'img/back_button_hover.png');
		this.x = 5;
		this.y = 500;

		this.initButton(scene);
	}

	private initButton(scene: Scene) {
		this.addEventListener('touchstart', () => {
			console.log('BackToStageSelecting button is pushed!');
			scene.moveNextScene('StageSelecting');
		});
	}
}

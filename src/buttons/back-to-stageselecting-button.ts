import { Scene } from '../scenes/scenes';
import core from '../enchant/core';
import Button from './button';

export default class BackToStageSelectingButton extends Button {
	private scene: Scene;

	public constructor(scene: Scene) {
		super(164, 66, scene, 'img/back_button.png', 'img/back_button_hover.png');
		this.x = 0;
		this.y = 510;

		this.initButton(scene);
	}

	private initButton(scene: Scene) {
		this.addEventListener('touchstart', () => {
			console.log('BackToStageSelecting button is pushed!');
			scene.moveNextScene('StageSelecting');
			scene.updateExecuteBlock(`${0}`);
		});
	}
}

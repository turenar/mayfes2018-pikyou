import core from '../enchant/core';
import Button from './button';
import StageSelectingScene from '../scenes/stage-selecting-scene';

export default class BackToTopButton extends Button {
	public constructor(scene: StageSelectingScene) {
		super(180, 89, scene, 'img/back_button.png', 'img/back_button_hover.png');
		this.x = 0;
		this.y = 0;

		this.initButton(scene);
	}

	private initButton(scene: StageSelectingScene) {
		this.addEventListener('touchstart', () => {
			scene.moveNextScene('Top');
		});
	}
}

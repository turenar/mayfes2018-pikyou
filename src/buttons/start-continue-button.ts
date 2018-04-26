import TopScene from '../scenes/top-scene';
import core from '../enchant/core';
import Button from './button';

export default class StartContinueButton extends Button {
	public constructor(y: number, scene: TopScene) {
		super(320, 140, scene, 'img/top_continue_button.png', 'img/top_continue_button_hover.png');
		this.x = (core.width - this.width) / 2;
		this.y = y;
		this.initButton(scene);
	}

	private initButton(scene: TopScene) {
		this.addEventListener('touchstart', () => {
			console.log('StageSelecting');
			scene.moveNextScene('StageSelecting');
		});
	}
}

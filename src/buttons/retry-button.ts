import { Scene } from '../scenes/scenes';
import core from '../enchant/core';
import Button from './button';

export default class RetryButton extends Button {
	public constructor(x: number, y: number, scene: Scene) {
		super(300, 92, scene, 'img/retry_button.png', 'img/retry_button_hover.png');
		this.x = x;
		this.y = y;

		this.initButton(scene);
	}

	private initButton(scene: Scene) {
		this.addEventListener('touchstart', () => {
			console.log('retry button is pushed!');
			scene.moveNextScene('Playing');
		});
	}
}

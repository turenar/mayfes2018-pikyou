import { Scene } from '../scenes/scenes';
import core from '../enchant/core';

export default class RetryButton extends enchant.Sprite {
	public constructor(x: number, y: number, scene: Scene) {
		super(200, 50);
		this.image = core.assets['img/retry_button.png'];
		this.x = x;
		this.y = y;

		this.listenButton(scene);
	}

	private listenButton(scene: Scene) {
		this.addEventListener('touchstart', () => {
			console.log('retry button is pushed!');
			scene.moveNextScene('Playing');
		});
	}
}

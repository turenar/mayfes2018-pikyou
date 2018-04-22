import { Scene } from '../scenes/scenes';

export default class RetryButton extends enchant.Sprite {
	public constructor(x: number, y: number, scene: Scene) {
		super(200, 40);
		this.backgroundColor = 'green';
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

import { Scene } from '../scenes/scenes';

export default class BackToStageSelectingButton extends enchant.Sprite {
	public constructor(x: number, y: number, scene: Scene) {
		super(200, 40);
		this.backgroundColor = 'blue';
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

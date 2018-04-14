import GameOverScene from '../scenes/gameover-scene';
import ResultScene from '../scenes/result-scene';

export default class BackToStageSelectingButton extends enchant.Sprite {
	public constructor(x: number, y: number, scene: GameOverScene | ResultScene) {
		super(200, 40);
		this.backgroundColor = 'blue';
		this.x = x;
		this.y = y;

		this.listenButton(scene);
	}

	private listenButton(scene: GameOverScene | ResultScene) {
		this.addEventListener('touchstart', () => {
			console.log('BackToStageSelecting button is pushed!');
			scene.moveNextScene('StageSelecting');
		});
	}
}

import StageSelectingScene from '../scenes/stage-selecting-scene';
import core from '../enchant/core';

export default class ArrowButton extends enchant.Sprite {
	public constructor(x: number, y: number, type: string, scene: StageSelectingScene) {
		super(50, 40); // 画像サイズに応じて決める
		this.x = x;
		this.y = y;
		if (type === 'left') {
			this.image = core.assets['img/stageselecting_left_arrow.png'];
			this.addEventListener('touchstart', () => {
				scene.downNumber();
			});
		} else if (type === 'right') {
			this.image = core.assets['img/stageselecting_right_arrow.png'];
			this.addEventListener('touchstart', () => {
				scene.upNumber();
			});
		}
	}
}

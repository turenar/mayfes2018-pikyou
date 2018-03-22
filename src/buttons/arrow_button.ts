import StageSelectingScene from '../scenes/stage-selecting-scene';
import core from '../enchant/core';

export default class ArrowButton extends enchant.Sprite {
	public constructor(x: number, y: number, type: string, scene: StageSelectingScene) {
		super(40, 50); // 画像サイズに応じて決める
		this.x = x;
		this.y = y;
		if (type === 'up'){
			this.image = core.assets['img/up_arrow.png'];
		}else if (type === 'down'){
			this.image = core.assets['img/down_arrow.png'];
		}
	}
}

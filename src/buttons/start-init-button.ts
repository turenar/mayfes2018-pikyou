import core from '../enchant/core';
import TopScene from '../scenes/top-scene';

export default class StartInitButton extends enchant.Sprite {
	public constructor(x: number, y: number, scene: TopScene) {
		super(280, 120); // 画像サイズに応じて決める
		this.x = x;
		this.y = y;
		this.image = core.assets['img/top_init_button.png'];
	}
}

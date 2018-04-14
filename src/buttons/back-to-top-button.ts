import core from '../enchant/core';

export default class BackToTopButton extends enchant.Sprite {
	public constructor(x: number, y: number) {
		super(90, 90); // 画像サイズに応じて決める
		this.x = x;
		this.y = y;
		this.image = core.assets['img/back_to_top_button.png'];
	}
}

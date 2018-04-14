import core from '../enchant/core';

export default class StartToPlaysceneButton extends enchant.Sprite {
	public constructor(x: number, y: number) {
		super(130, 60); // 画像サイズに応じて決める
		this.x = x;
		this.y = y;
		this.image = core.assets['img/start_to_playscene.png'];
	}
}

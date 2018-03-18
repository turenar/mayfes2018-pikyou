import TopScene from '../scenes/top-scene';
import core from '../enchant/core';

export default class StartContinueButton extends enchant.Sprite {
	public constructor(x: number, y: number, scene: TopScene) {
		super(320, 140); // 画像サイズに応じて決める
		this.x = x;
		this.y = y;
		this.image = core.assets['img/startcontinue.png'];
	}
}

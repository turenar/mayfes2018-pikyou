import { Scene } from './scenes';
import { SceneManager } from '../scene-manager';
import core from '../enchant/core';

export default class StopGameScene extends Scene {
	public constructor(manager: SceneManager) {
		super('StopGame', manager);

		const background = new enchant.Sprite(core.width, core.height);
		background.image = core.assets['img/background.png'];

		const thankLabel = new enchant.Label('遊んでくれてありがとう！');
		thankLabel.color = 'black';
		thankLabel.backgroundColor = 'blue';
		thankLabel.font = '30px PixelMplus10';
		thankLabel.width = core.width;
		thankLabel.x = 20;
		thankLabel.y = 220;

		const leaveLabel = new enchant.Label('次の人がまってるから、かわってあげてね！');
		leaveLabel.color = 'black';
		leaveLabel.font = '18px PixelMplus10';
		leaveLabel.width = core.width;
		leaveLabel.x = 15;
		leaveLabel.y = 290;

		this.addChild(background);
		this.addChild(thankLabel);
		this.addChild(leaveLabel);
	}
}

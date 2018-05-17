import { Scene } from './scenes';
import { SceneManager } from '../scene-manager';

export default class StopGameScene extends Scene {
	public constructor(manager: SceneManager) {
		super('StopGame', manager);

		this.addChild(StopGameScene.createThankYouLabel());
		this.addChild(StopGameScene.createLeaveLabel());
	}

	private static createThankYouLabel() {
		const thankLabel = new enchant.Label('遊んでくれてありがとう！');
		thankLabel.color = 'black';
		thankLabel.font = '30px PixelMplus10';
		thankLabel.x = 20;
		thankLabel.y = 90;
		return thankLabel;
	}

	private static createLeaveLabel() {
		const leaveLabel = new enchant.Label('次の人がまってるから、かわってあげてね！');
		leaveLabel.color = 'black';
		leaveLabel.font = '18px PixelMplus10';
		leaveLabel.x = 0;
		leaveLabel.y = 200;
		return leaveLabel;
	}
}

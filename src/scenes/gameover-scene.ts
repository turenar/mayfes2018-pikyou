import core from '../enchant/core';
import { Scene } from './scenes';
import { SceneManager } from '../scene-manager';
import RetryButton from '../buttons/retry-button';
import BackToStageSelectingButton from '../buttons/back-to-stageselecting-button';

export default class GameOverScene extends Scene {
	private retryButton: RetryButton;
	private backToStageSelectingButton: BackToStageSelectingButton;

	public constructor(manager: SceneManager) {
		super('GameOver', manager);

		const offset_x = 40;
		const offset_y = 10;

		const background = new enchant.Sprite(240, 300);
		background.backgroundColor = 'yellow';
		background.x = offset_x;
		background.y = offset_y;

		const gameOverLabel = new enchant.Label('GameOver');
		gameOverLabel.color = 'red';
		gameOverLabel.x = offset_x + 200;
		gameOverLabel.y = offset_y + 30;
		gameOverLabel.scale(2, 2);

		this.retryButton = new RetryButton(offset_x + 20, offset_y + 180, this);

		this.backToStageSelectingButton = new BackToStageSelectingButton(offset_x + 20, offset_y + 240, this);

		this.addChild(background);
		this.addChild(gameOverLabel);
		this.addChild(this.retryButton);
		this.addChild(this.backToStageSelectingButton);
	}
}

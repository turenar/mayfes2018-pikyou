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
		background.image = core.assets['img/result_gameover_background.png'];
		background.x = offset_x;
		background.y = offset_y;

		const gameOverLabel = new enchant.Sprite(210, 50);
		gameOverLabel.image = core.assets['img/gameover_text.png'];
		gameOverLabel.x = offset_x + 15;
		gameOverLabel.y = offset_y + 20;

		this.retryButton = new RetryButton(offset_x + 20, offset_y + 180, this);

		this.backToStageSelectingButton = new BackToStageSelectingButton(
			offset_x + 20,
			offset_y + 240,
			200,
			50,
			'img/back_to_stage_selecting_button.png',
			this
		);

		this.addChild(background);
		this.addChild(gameOverLabel);
		this.addChild(this.retryButton);
		this.addChild(this.backToStageSelectingButton);
	}
}

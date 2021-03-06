import core from '../enchant/core';
import { Scene } from './scenes';
import { SceneManager } from '../scene-manager';
import RetryButton from '../buttons/retry-button';
import BackToStageSelectingButton from '../buttons/back-to-stageselecting-button';
import { EndStatus } from '../world';

export type GameOverReason = 'maxturn' | 'pitfall';

export const MAXTURN = 50;

export class GameOverScene extends Scene {
	private retryButton: RetryButton;
	private backToStageSelectingButton: BackToStageSelectingButton;

	public constructor(manager: SceneManager, stageNum: number, endStatus: EndStatus) {
		super('GameOver', manager);

		const gameOverLabel = new enchant.Sprite(300, 80);
		gameOverLabel.image = core.assets['img/gameover_text.png'];
		gameOverLabel.x = (core.width - 300) / 2;
		gameOverLabel.y = (32 * 12 - 80) / 2 + 20;

		const gameOverReasonLabel = new enchant.Sprite(300, 50);
		gameOverReasonLabel.image = core.assets[`img/gameover_reason_text_${endStatus.gameOverReason}.png`];
		gameOverReasonLabel.x = (core.width - 300) / 2;
		gameOverReasonLabel.y = 100;

		this.retryButton = new RetryButton(this);

		this.backToStageSelectingButton = new BackToStageSelectingButton(this, stageNum);

		this.addChild(gameOverLabel);
		this.addChild(gameOverReasonLabel);
		this.addChild(this.retryButton);
		this.addChild(this.backToStageSelectingButton);
	}
}

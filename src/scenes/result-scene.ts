import core from '../enchant/core';
import { Scene } from './scenes';
import { SceneManager } from '../scene-manager';
import RetryButton from '../buttons/retry-button';
import BackToStageSelectingButton from '../buttons/back-to-stageselecting-button';
import { ScoreManager, Score } from '../score-manager';
import { ClearStatus } from '../world';

export default class ResultScene extends Scene {
	private retryButton: RetryButton;
	private backToStageSelectingButton: BackToStageSelectingButton;

	public constructor(manager: SceneManager, stageNum: number, clearStatus: ClearStatus) {
		super('Result', manager);

		const offset_x = 40;
		const offset_y = 10;

		const background = new enchant.Sprite(300, 360);
		background.image = core.assets['img/result_background.png'];
		background.x = offset_x;
		background.y = offset_y;

		const gameOverLabel = new enchant.Sprite(260, 60);
		gameOverLabel.image = core.assets['img/result_gameclear_text.png'];
		gameOverLabel.x = offset_x + 20;
		gameOverLabel.y = offset_y + 20;

		// blocklyからそれぞれの値を取得する todo
		const score = {
			actionNum: clearStatus.actionNum,
			gotChestNum: clearStatus.gotChestNum,
			blockCostSum: ScoreManager.getBlockCostSum(),
			clearPoint: ScoreManager.getStageClearPoint(stageNum),
		};

		const scoreValue = ScoreManager.calcScoreValue(score);

		const scoreLabel = new enchant.Label(`スコア：${scoreValue}`);
		scoreLabel.color = 'black';
		scoreLabel.scale(2.0, 2.0);
		scoreLabel.x = offset_x + 170;
		scoreLabel.y = offset_y + 100;

		const gotChestNumLabel = new enchant.Label(`てにいれたチェストのかず: ${score.gotChestNum}`);
		gotChestNumLabel.color = 'black';
		gotChestNumLabel.scale(1.2, 1.2);
		gotChestNumLabel.x = offset_x + 45;
		gotChestNumLabel.y = offset_y + 110;

		const actionNumLabel = new enchant.Label(`いどうしたマスのかず: ${score.actionNum}`);
		actionNumLabel.color = 'black';
		actionNumLabel.scale(1.2, 1.2);
		actionNumLabel.x = offset_x + 45;
		actionNumLabel.y = offset_y + 140;

		const blockCostSumLabel = new enchant.Label(`つかったブロックのコスト: ${score.blockCostSum}`);
		blockCostSumLabel.color = 'black';
		blockCostSumLabel.scale(1.2, 1.2);
		blockCostSumLabel.x = offset_x + 45;
		blockCostSumLabel.y = offset_y + 170;

		const trunNumLabel = new enchant.Label(`- クリアにかかったターンすう：${0}`);
		trunNumLabel.color = 'black';
		trunNumLabel.scale(1.2, 1.2);
		trunNumLabel.x = offset_x + 55;
		trunNumLabel.y = offset_y + 215;

		const retryButton = new RetryButton(42, 400, this);

		const backToStageSelectingButton = new BackToStageSelectingButton(this);

		this.addChild(background);
		this.addChild(gameOverLabel);
		this.addChild(scoreLabel);
		this.addChild(gotChestNumLabel);
		this.addChild(actionNumLabel);
		this.addChild(blockCostSumLabel);
		this.addChild(retryButton);
		this.addChild(backToStageSelectingButton);

		this.manager.updateScore(stageNum, scoreValue);
	}
}

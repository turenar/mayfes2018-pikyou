import core from '../enchant/core';
import { Scene } from './scenes';
import { SceneManager } from '../scene-manager';
import RetryButton from '../buttons/retry-button';
import BackToStageSelectingButton from '../buttons/back-to-stageselecting-button';
import { ScoreManager, Score } from '../score-manager';
import { ClearStatus } from '../world';
import stages from '../stages';

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

		const gameClearLabel = new enchant.Sprite(260, 60);
		gameClearLabel.image = core.assets['img/result_gameclear_text.png'];
		gameClearLabel.x = offset_x + 20;
		gameClearLabel.y = offset_y + 20;

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
		scoreLabel.font = '30px PixelMplus10';
		scoreLabel.x = offset_x + 20;
		scoreLabel.y = offset_y + 90;

		const stageClearPointLabel = new enchant.Label(`ステージクリアボーナス: ${stages[stageNum].clearPoint}`)
		stageClearPointLabel.color = 'black';
		stageClearPointLabel.font = '18px PixelMplus10';
		stageClearPointLabel.x = offset_x + 35;
		stageClearPointLabel.y = offset_y + 140;

		const gotChestNumLabel = new enchant.Label(`てにいれたチェストのかず: ${score.gotChestNum}`);
		gotChestNumLabel.color = 'black';
		gotChestNumLabel.font = '18px PixelMplus10';
		gotChestNumLabel.x = offset_x + 35;
		gotChestNumLabel.y = offset_y + 175;

		const actionNumLabel = new enchant.Label(`いどうしたマスのかず: ${score.actionNum}`);
		actionNumLabel.color = 'black';
		actionNumLabel.font = '18px PixelMplus10';
		actionNumLabel.x = offset_x + 35;
		actionNumLabel.y = offset_y + 210;

		const blockCostSumLabel = new enchant.Label(`つかったブロックのコスト: ${score.blockCostSum}`);
		blockCostSumLabel.color = 'black';
		blockCostSumLabel.font = '18px PixelMplus10';
		blockCostSumLabel.x = offset_x + 35;
		blockCostSumLabel.y = offset_y + 245;

		const retryButton = new RetryButton(42, 400, this);

		const backToStageSelectingButton = new BackToStageSelectingButton(this);

		this.addChild(background);
		this.addChild(gameClearLabel);
		this.addChild(scoreLabel);
		this.addChild(stageClearPointLabel);
		this.addChild(gotChestNumLabel);
		this.addChild(actionNumLabel);
		this.addChild(blockCostSumLabel);
		this.addChild(retryButton);
		this.addChild(backToStageSelectingButton);

		this.manager.updateScore(stageNum, scoreValue);
	}
}

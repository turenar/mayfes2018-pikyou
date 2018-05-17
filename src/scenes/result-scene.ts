import core from '../enchant/core';
import { Scene } from './scenes';
import { SceneManager } from '../scene-manager';
import RetryButton from '../buttons/retry-button';
import BackToStageSelectingButton from '../buttons/back-to-stageselecting-button';
import { ScoreManager, Score } from '../score-manager';
import { EndStatus } from '../world';
import stages from '../stages';

export default class ResultScene extends Scene {
	private retryButton: RetryButton;
	private backToStageSelectingButton: BackToStageSelectingButton;

	public constructor(manager: SceneManager, stageNum: number, endStatus: EndStatus) {
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
			actionNum: endStatus.actionNum,
			gotChestNum: endStatus.gotChestNum,
			blockCostSum: ScoreManager.getBlockCostSum(),
			clearPoint: ScoreManager.getStageClearPoint(stageNum),
		};

		const scoreValue = ScoreManager.calcScoreValue(score);

		const scoreLabel = new enchant.Label('スコア ：' + ('   ' + scoreValue).slice(-3));
		scoreLabel.color = 'black';
		scoreLabel.font = '28px PixelMplus10';
		scoreLabel.x = offset_x + 100;
		scoreLabel.y = offset_y + 280;

		const stageClearPointLabel = new enchant.Label(
			'所持ゴールド     + ' + ('   ' + (stages[stageNum].clearPoint - score.blockCostSum)).slice(-3)
		);
		stageClearPointLabel.color = 'black';
		stageClearPointLabel.font = '22px PixelMplus10';
		stageClearPointLabel.x = offset_x + 30;
		stageClearPointLabel.y = offset_y + 110;

		const gotChestNumLabel = new enchant.Label('残りターン数     + ' + ('   ' + (50 - score.actionNum)).slice(-3));
		gotChestNumLabel.color = 'black';
		gotChestNumLabel.font = '22px PixelMplus10';
		gotChestNumLabel.x = offset_x + 30;
		gotChestNumLabel.y = offset_y + 160;

		const actionNumLabel = new enchant.Label('オタカラボーナス + ' + ('   ' + score.gotChestNum * 100).slice(-3));
		actionNumLabel.color = 'black';
		actionNumLabel.font = '22px PixelMplus10';
		actionNumLabel.x = offset_x + 30;
		actionNumLabel.y = offset_y + 210;
		/*
		const blockCostSumLabel = new enchant.Label(`つかったブロックのコスト: ${score.blockCostSum}`);
		blockCostSumLabel.color = 'black';
		blockCostSumLabel.font = '18px PixelMplus10';
		blockCostSumLabel.x = offset_x + 35;
		blockCostSumLabel.y = offset_y + 245;
*/
		const retryButton = new RetryButton(42, 400, this);

		let nextStageLabel = Math.min(stageNum + 1, stages.length - 1);
		const backToStageSelectingButton = new BackToStageSelectingButton(this, nextStageLabel);

		this.addChild(background);
		this.addChild(gameClearLabel);
		this.addChild(scoreLabel);
		this.addChild(stageClearPointLabel);
		this.addChild(gotChestNumLabel);
		this.addChild(actionNumLabel);
		//this.addChild(blockCostSumLabel);
		this.addChild(retryButton);
		this.addChild(backToStageSelectingButton);

		this.manager.updateScore(stageNum, scoreValue);
	}
}

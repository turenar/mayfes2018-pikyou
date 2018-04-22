import core from '../enchant/core';
import { Scene } from './scenes';
import { SceneManager } from '../scene-manager';
import RetryButton from '../buttons/retry-button';
import BackToStageSelectingButton from '../buttons/back-to-stageselecting-button';
import { Score, calcScore } from '../score';
import { blockNum } from '../blockly-main';

export default class ResultScene extends Scene {
	private retryButton: RetryButton;
	private backToStageSelectingButton: BackToStageSelectingButton;

	public constructor(manager: SceneManager, stageNum: number) {
		super('Result', manager);

		const offset_x = 40;
		const offset_y = 10;

		const background = new enchant.Sprite(240, 300);
		background.backgroundColor = 'yellow';
		background.x = offset_x;
		background.y = offset_y;

		const gameOverLabel = new enchant.Label('Game Clear!');
		gameOverLabel.color = 'red';
		gameOverLabel.x = offset_x + 185;
		gameOverLabel.y = offset_y + 30;
		gameOverLabel.scale(2, 2);

		const score = { score: 0, usingBlockNum: blockNum, gotJwellBoxNum: 0 };
		score.score = calcScore(score.usingBlockNum, score.gotJwellBoxNum);

		const scoreLabel = new enchant.Label(`スコア：${score.score}`);
		scoreLabel.color = 'black';
		scoreLabel.scale(1.2, 1.2);
		scoreLabel.x = offset_x + 50;
		scoreLabel.y = offset_y + 80;

		const blockNumberLabel = new enchant.Label(`つかったブロックのかず：${score.usingBlockNum}`);
		blockNumberLabel.color = 'black';
		blockNumberLabel.scale(1.2, 1.2);
		blockNumberLabel.x = offset_x + 50;
		blockNumberLabel.y = offset_y + 110;

		const gotJwellBoxLabel = new enchant.Label('てにいれたアイテム：');
		gotJwellBoxLabel.color = 'black';
		gotJwellBoxLabel.scale(1.2, 1.2);
		gotJwellBoxLabel.x = offset_x + 50;
		gotJwellBoxLabel.y = offset_y + 140;

		const gotJwellBoxIcon = new enchant.Sprite(32, 32);
		//ここはあとでアイテム実装後にアイテムを取得したかどうかで変化させる。
		gotJwellBoxIcon.image = core.assets['img/chest.png'];
		gotJwellBoxIcon.x = offset_x + 190;
		gotJwellBoxIcon.y = offset_y + 130;

		const retryButton = new RetryButton(offset_x + 20, offset_y + 180, this);

		const backToStageSelectingButton = new BackToStageSelectingButton(offset_x + 20, offset_y + 240, this);

		this.addChild(background);
		this.addChild(gameOverLabel);
		this.addChild(scoreLabel);
		this.addChild(blockNumberLabel);
		this.addChild(gotJwellBoxLabel);
		this.addChild(gotJwellBoxIcon);
		this.addChild(retryButton);
		this.addChild(backToStageSelectingButton);
	}
}

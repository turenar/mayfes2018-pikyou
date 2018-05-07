import core from '../enchant/core';
import stages from '../stages';
import { Label } from 'node-enchantjs';
import { Sprite } from 'node-enchantjs';
import { ScoreManager } from '../score-manager';
import { ClearSituation } from '../score-manager';

export default class StageLabels extends enchant.Group {
	private stageNumLabel: Label;
	private stageNameLabel: Label;
	private descriptionLabel: Label;
	private normaLabel: Label;
	private scoreLabel: Label;
	private clearMark: enchant.Sprite;
	private excellentClearMark: enchant.Sprite;

	public constructor(clearSituationOfStageZero: ClearSituation) {
		super();

		const width = 270;
		const heigt = 380;
		const offset_x = (core.width - width) / 2;
		const offset_y = 85;

		const background = new enchant.Sprite(width, heigt);
		background.image = core.assets['img/result_background.png'];
		background.x = offset_x;
		background.y = offset_y;
		this.addChild(background);

		this.stageNumLabel = new Label(' ');
		this.stageNumLabel.font = '40px PixelMplus10';
		this.stageNumLabel.x = offset_x + 35;
		this.stageNumLabel.y = offset_y + 20;
		this.addChild(this.stageNumLabel);

		this.stageNameLabel = new Label(' ');
		this.stageNameLabel.font = '30px PixelMplus10';
		this.stageNameLabel.x = offset_x + 20;
		this.stageNameLabel.y = offset_y + 80;
		this.addChild(this.stageNameLabel);

		this.descriptionLabel = new Label(' ');
		this.descriptionLabel.font = '15px PixelMplus10';
		this.descriptionLabel.x = offset_x + 20;
		this.descriptionLabel.y = offset_y + 130;
		this.addChild(this.descriptionLabel);

		this.normaLabel = new Label('');
		this.normaLabel.font = '15px PixelMplus10';
		this.normaLabel.x = offset_x + 20;
		this.normaLabel.y = offset_y + 160;
		this.addChild(this.normaLabel);

		this.scoreLabel = new Label(' ');
		this.scoreLabel.font = '25px PixelMplus10';
		this.scoreLabel.x = offset_x + 20;
		this.scoreLabel.y = offset_y + 300;
		this.addChild(this.scoreLabel);

		this.clearMark = new Sprite(70, 50);
		this.clearMark.image = core.assets['img/clear_mark.png'];
		this.clearMark.x = offset_x + 30;
		this.clearMark.y = offset_y + 200;
		this.addChild(this.clearMark);

		this.excellentClearMark = new Sprite(70, 50);
		this.excellentClearMark.image = core.assets['img/clear_mark.png'];
		this.excellentClearMark.x = offset_x + 170;
		this.excellentClearMark.y = offset_y + 200;
		this.addChild(this.excellentClearMark);

		this.update(0, clearSituationOfStageZero);
	}

	public update(stageNum: number, clearSituation: ClearSituation) {
		this.stageNumLabel.text = `ステージ ${stageNum + 1}`;
		this.stageNameLabel.text = stages[stageNum].name;
		this.descriptionLabel.text = stages[stageNum].description;
		this.normaLabel.text = `エクセレントクリアノルマ：${stages[stageNum].excellentClearNroma}`;
		this.scoreLabel.text = `ハイスコア: ${clearSituation.score}`;

		if (clearSituation.isCleared) {
			this.clearMark.opacity = 100;
		} else {
			this.clearMark.opacity = 100;
		}
		if (clearSituation.isExcellentCleared) {
			this.excellentClearMark.opacity = 100;
		} else {
			this.excellentClearMark.opacity = 0;
		}
	}
}

import stages from './stages';
import { allBlocks } from './blockly-main';
import { ClearStatus } from './world';

export type ClearSituation = { isCleared: boolean; isExcellentCleared: boolean; score: number };

export class ScoreManager {
	private clearSituations: Array<ClearSituation>;

	public constructor() {
		this.clearSituations = [];
		for (var i: number = 0; i < stages.length; i++) {
			this.clearSituations.push({ isCleared: false, isExcellentCleared: false, score: 0 });
		}
	}

	public getClearSituation(stageNum: number) {
		return this.clearSituations[stageNum];
	}

	public updateScore(stageNum: number, score: number) {
		this.clearSituations[stageNum].isCleared = true;
		if (score >= stages[stageNum].excellentClearNorma) {
			this.clearSituations[stageNum].isExcellentCleared = true;
		}
		this.clearSituations[stageNum].score = Math.max(score, this.clearSituations[stageNum].score);
	}

	public static getBlockCostSum(): number {
		let blockCostSum = 0;

		allBlocks.forEach(block => {
			if (block.getRootBlock().id === 'initialBlock') {
				if (block.type === 'controls_if') {
					blockCostSum += block.costIf + block.costElseIf * block.elseifCount_ + block.costElse * block.elseCount_;
				} else {
					blockCostSum += block.cost;
				}
			}
		});

		return blockCostSum;
	}

	public static calcScoreValue(score: Score) {
		return score.clearPoint + score.gotChestNum * 100 + (50 - score.actionNum) - score.blockCostSum;
	}

	public static getStageClearPoint(stageNum) {
		return stages[stageNum].clearPoint;
	}
}

export type Score = {
	gotChestNum: number;
	actionNum: number;
	blockCostSum: number;
	clearPoint: number;
};

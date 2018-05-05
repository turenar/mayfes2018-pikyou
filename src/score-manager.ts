import stages from './stages';
import { allBlocks } from './blockly-main';
import { ClearStatus } from './world';


export type ClearSituation = { isCleared: boolean; score: number };

export class ScoreManager {
	private clearSituations: Array<ClearSituation>;

	public constructor() {
		this.clearSituations = [];
		for (var i: number = 0; i < stages.length; i++) {
			this.clearSituations.push({ isCleared: false, score: 0 });
		}
	}

	public getClearSituation(stageNum: number) {
		return this.clearSituations[stageNum];
	}

	public updateScore(stageNum: number, score: number) {
		this.clearSituations[stageNum].isCleared = true;
		this.clearSituations[stageNum].score = Math.max(score, this.clearSituations[stageNum].score);
	}

	public static getScore(clearStatus: ClearStatus): Score {
		const { gotChestNum, actionNum }  = clearStatus;
		let blockCostSum = 0;

		allBlocks.forEach(block => {
			if(block.getRootBlock().id === 'initialBlock') {
				blockCostSum += block.cost;
			}
		});

		return { gotChestNum, actionNum, blockCostSum };
	}

	public static calcScore(score: Score) {
		return 100 + score.gotChestNum * 100 + (50 - score.actionNum) - score.blockCostSum;
	}
}

export type Score = {
	gotChestNum: number;
	actionNum: number;
	blockCostSum: number;
};

import stages from './stages';

export type ClearSituation = { isCleared: boolean; score: number };

export default class ScoreManager {
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
		this.clearSituations[stageNum].score = score;
	}
}

import { ScoreManager } from './score-manager';
import stages from './stages';

export default class DebugTool {
	private scoreManager: ScoreManager;

	public constructor(scoreManager: ScoreManager) {
		this.scoreManager = scoreManager;
	}

	public clearAllStages() {
		stages.forEach((_, idx) => this.scoreManager.updateClearSituations(idx, 1));
	}
}

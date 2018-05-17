import core from './enchant/core';
import { SceneKind } from './scenes/scenes';
import TopScene from './scenes/top-scene';
import PlayingScene from './scenes/playing-scene';
import StageSelectingScene from './scenes/stage-selecting-scene';
import GameOverScene from './scenes/gameover-scene';
import ResultScene from './scenes/result-scene';
import stages from './stages';
import { ScoreManager } from './score-manager';
import { code } from './blockly-main';
import MouseController from './mouse-controller';
import { ClearStatus } from './world';

export class SceneManager {
	public scoreManager: ScoreManager;
	public currentScene: SceneKind;
	public mouseController: MouseController;

	public constructor() {
		this.initScene();
		this.scoreManager = new ScoreManager();
		this.mouseController = new MouseController();
	}

	/**
	 * Scene 遷移を行う。適切な遷移でないと死ぬ。
	 * @return {void}
	 * @param {SceneKind} sceneKind - 遷移先のシーン種類。
	 * @param {number} stageNum - 繊維先がPlayingの時のステージ番号
	 * @param {ClearStatus} clearStatus - {actionNum, gotChestNum}
	 */
	public changeScene(sceneKind: SceneKind, stageNum?: number, clearStatus?: ClearStatus) {
		if (this.currentScene === 'Top') {
			if (sceneKind === 'StageSelecting') {
				this.currentScene = 'StageSelecting';
				core.replaceScene(new StageSelectingScene(this, 0));
				return;
			}
		}

		if (this.currentScene === 'StageSelecting') {
			if (sceneKind === 'Top') {
				this.currentScene = 'Top';
				core.replaceScene(new TopScene(this));
				return;
			}
			if (sceneKind === 'Playing') {
				this.currentScene = 'Playing';
				core.replaceScene(new PlayingScene(this, stageNum));
				return;
			}
		}

		if (this.currentScene === 'Playing') {
			if (sceneKind === 'Top') {
				this.currentScene = 'Top';
				core.replaceScene(new TopScene(this));
				return;
			}

			if (sceneKind == 'StageSelecting') {
				this.currentScene = 'StageSelecting';
				core.replaceScene(new StageSelectingScene(this, stageNum));
				return;
			}

			if (sceneKind === 'GameOver') {
				this.currentScene = 'GameOver';
				core.pushScene(new GameOverScene(this, stageNum));
				return;
			}
			if (sceneKind === 'Result') {
				this.currentScene = 'Result';
				core.pushScene(new ResultScene(this, stageNum, clearStatus));
				return;
			}
		}

		if (this.currentScene === 'GameOver' || this.currentScene === 'Result') {
			if (sceneKind === 'Playing') {
				this.currentScene = 'Playing';
				core.popScene();
				return;
			}
			if (sceneKind === 'StageSelecting') {
				this.currentScene = 'StageSelecting';
				core.popScene();
				console.log(stageNum);
				core.replaceScene(new StageSelectingScene(this, stageNum));
				return;
			}
		}

		console.log('Error! Transition of scenes is invalid!');
	}

	public updateScore(stageNum: number, score: number) {
		this.scoreManager.updateScore(stageNum, score);
	}

	public getClearSituation(stageNum: number) {
		return this.scoreManager.getClearSituation(stageNum);
	}

	public getMaxOfSelectableStageNumber() {
		var maxClearedStageNum = -1;
		for (var i: number = 0; i < stages.length; i++) {
			if (this.scoreManager.getClearSituation(i).isCleared) {
				maxClearedStageNum = i;
			}
		}
		if (maxClearedStageNum == stages.length - 1) {
			return stages.length - 1;
		} else {
			return maxClearedStageNum + 1;
		}
	}

	private initScene() {
		this.currentScene = 'Top';
		core.pushScene(new TopScene(this));
	}
}

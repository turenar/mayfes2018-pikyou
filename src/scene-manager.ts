import core from './enchant/core';
import { SceneKind } from './scenes/scenes';
import TopScene from './scenes/top-scene';
import PlayingScene from './scenes/playing-scene';
import StageSelectingScene from './scenes/stage-selecting-scene';
import GameOverScene from './scenes/gameover-scene';
import ResultScene from './scenes/result-scene';
import stages from './stages';
import clearSituationClass from './score-manager';
import { code } from './blockly-main';

export class SceneManager {
	private clearSituations: clearSituationClass[];
	public currentScene: SceneKind;

	public constructor() {
		this.initScene();
		this.initClearSituations();
	}

	/**
	 * Scene 遷移を行う。適切な遷移でないと死ぬ。
	 * @return {void}
	 * @param {SceneKind} sceneKind - 遷移先のシーン種類。
	 * @param {number} stageNum - 繊維先がPlayingの時のステージ番号
	 */
	public changeScene(sceneKind: SceneKind, stageNum?: number) {
		if (this.currentScene === 'Top') {
			if (sceneKind === 'StageSelecting') {
				this.currentScene = 'StageSelecting';
				core.replaceScene(new StageSelectingScene(this));
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
				core.replaceScene(new StageSelectingScene(this));
				return;
			}

			if (sceneKind === 'GameOver') {
				this.currentScene = 'GameOver';
				core.pushScene(new GameOverScene(this));
				return;
			}
			if (sceneKind === 'Result') {
				this.currentScene = 'Result';
				core.pushScene(new ResultScene(this, stageNum));
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
				core.replaceScene(new StageSelectingScene(this));
				return;
			}
		}

		console.log('Error! Transition of scenes is invalid!');
	}

	public updateScore(stageNum: number, score: number) {
		this.clearSituations[stageNum].isCleared = true;
		this.clearSituations[stageNum].score = score;
	}

	public getClearSituation(stageNum: number) {
		return this.clearSituations[stageNum];
	}

	private initScene() {
		this.currentScene = 'Top';
		core.pushScene(new TopScene(this));
	}

	private initClearSituations() {
		this.clearSituations = [];
		for (var i: number = 0; i < stages.length; i++) {
			this.clearSituations.push(new clearSituationClass());
		}
	}
}

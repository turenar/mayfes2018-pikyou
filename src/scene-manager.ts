import core from './enchant/core';
import { Scenes, Scene, SceneKind } from './scenes';
import TopScene from './scenes/top-scene';
import PlayingScene from './scenes/playing-scene';
import StageSelectingScene from "./scenes/stage-selecting-scene";
import { code } from './blockly-main';

export class SceneManager {
	public currentScene: SceneKind;

	public constructor() {
		this.initScene();
	}

	/**
	 * Scene 遷移を行う。適切な遷移でないと死ぬ。
	 * @return {void}
	 * @param {SceneKind} sceneKind - 遷移先のシーン種類。
	 * @param {stageNum} number - 繊維先がPlayingの時のステージ番号
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

			if (sceneKind == 'StageSelecting'){
				this.currentScene = 'StageSelecting';
				core.replaceScene(new StageSelectingScene(this));
				return;
			}

			if (sceneKind === 'GameOver') {
				this.currentScene = 'GameOver';
				core.pushScene(new Scene('GameOver', this));
				return;
			}
			if (sceneKind === 'Result') {
				this.currentScene = 'Result';
				core.pushScene(new Scene('Result', this));
				return;
			}
		}

		if (
			this.currentScene === 'GameOver' ||
			this.currentScene === 'Result'
		) {
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

	private initScene() {
		this.currentScene = 'Top';
		core.pushScene(new TopScene(this));

		// this.changeScene('StageSelecting');
		// this.changeScene('Playing');
	}
}

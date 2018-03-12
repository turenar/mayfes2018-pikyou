import core from './enchant/core';
import { Scenes, Scene, SceneKind } from './scenes';
import { Character } from './character';
import StartStopButton from './button';
import EnchantMap from './enchant/map';
import stages from './stages';

export class SceneManager {
	public scenes: Scenes;
	public isRunning: boolean;

	public constructor() {
		this.scenes = {
			Top: new Scene('Top'),
			StageSelecting: new Scene('StageSelecting'),
			Playing: new Scene('Playing'),
			GameOver: new Scene('GameOver'),
			Result: new Scene('Result'),
		};

		this.isRunning = false;
	}

	public initScene(character: Character, button: StartStopButton) {
		const map = new EnchantMap(stages[0].map);
		map.addInto(this.scenes.Playing);
		this.scenes.Playing.addChild(character);
		this.scenes.Playing.addChild(button);

		core.pushScene(this.scenes.Top);
		this.changeScene('StageSelecting');
		this.changeScene('Playing');

		core.pause();
	}

	/**
	 * Scene 遷移を行う。適切な遷移でないと死ぬ。
	 * @return {void}
	 * @param {SceneKind} sceneKind - 遷移先のシーン種類。
	 */
	public changeScene(sceneKind: SceneKind) {
		if (core.currentScene === this.scenes.Top) {
			if (sceneKind === 'StageSelecting') {
				core.replaceScene(this.scenes.StageSelecting);
				return;
			}
		}

		if (core.currentScene === this.scenes.StageSelecting) {
			if (sceneKind === 'Top') {
				core.replaceScene(this.scenes.Top);
				return;
			}
			if (sceneKind === 'Playing') {
				core.replaceScene(this.scenes.Playing);
				return;
			}
		}

		if (core.currentScene === this.scenes.Playing) {
			if (sceneKind === 'Top' || sceneKind === 'StageSelecting') {
				core.replaceScene(this.scenes[sceneKind]);
				return;
			}
			if (sceneKind === 'GameOver') {
				core.pushScene(this.scenes.GameOver);
				return;
			}
			if (sceneKind === 'Result') {
				core.pushScene(this.scenes.Result);
				return;
			}
		}

		if (
			core.currentScene === this.scenes.GameOver ||
			core.currentScene === this.scenes.Result
		) {
			if (sceneKind === 'Playing') {
				core.popScene();
				return;
			}
			if (sceneKind === 'StageSelecting') {
				core.popScene();
				core.replaceScene(this.scenes.StageSelecting);
				return;
			}
		}

		console.log('Error! Transition of scenes is invalid!');
	}
}

import * as enchant from 'node-enchantjs';
import core from './enchant/core';
import EnchantMap from './enchant/map';
import stages from './stages';
import { Character } from './character';

export type SceneKind =
	| 'Top'
	| 'StageSelecting'
	| 'Playing'
	| 'GameOver'
	| 'Result';

export class Scene extends enchant.Scene {
	public kind: SceneKind;

	public constructor(kind: SceneKind) {
		super();
		this.kind = kind;
	}
}

const scenes = {
	Top: new Scene('Top'),
	StageSelecting: new Scene('StageSelecting'),
	Playing: new Scene('Playing'),
	GameOver: new Scene('GameOver'),
	Result: new Scene('Result'),
};

/**
 * Scene に関する初期化を行う（仮置き）
 * @return {void}
 * @param {Character} character - キャラクターを渡す。
 */
export function initScene(character: Character) {
	const map = new EnchantMap(stages[0].map);
	map.addInto(scenes.Playing);
	scenes.Playing.addChild(character);
	core.pushScene(scenes.Top);
}

/**
 * Scene 遷移を行う。適切な遷移でないと死ぬ。
 * @return {void}
 * @param {SceneKind} sceneKind - 遷移先のシーン種類。
 */
export function changeScene(sceneKind: SceneKind) {
	if (core.currentScene === scenes.Top) {
		if (sceneKind === 'StageSelecting') {
			core.replaceScene(scenes.StageSelecting);
			return;
		}
	}

	if (core.currentScene === scenes.StageSelecting) {
		if (sceneKind === 'Top') {
			core.replaceScene(scenes.Top);
			return;
		}
		if (sceneKind === 'Playing') {
			core.replaceScene(scenes.Playing);
			return;
		}
	}

	if (core.currentScene === scenes.Playing) {
		if (sceneKind === 'Top' || sceneKind === 'StageSelecting') {
			core.replaceScene(scenes[sceneKind]);
			return;
		}
		if (sceneKind === 'GameOver') {
			core.pushScene(scenes.GameOver);
			return;
		}
		if (sceneKind === 'Result') {
			core.pushScene(scenes.Result);
			return;
		}
	}

	if (
		core.currentScene === scenes.GameOver ||
		core.currentScene === scenes.Result
	) {
		if (sceneKind === 'Playing') {
			core.popScene();
			return;
		}
		if (sceneKind === 'StageSelecting') {
			core.popScene();
			core.replaceScene(scenes.StageSelecting);
			return;
		}
	}

	console.log('Error! Transition of scenes is invalid!');
}

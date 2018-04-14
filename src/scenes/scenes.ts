import * as enchant from 'node-enchantjs';
import core from '../enchant/core';
import { Map as EnchantMap } from '../enchant/map';
import stages from '../stages';
import { Character } from '../character';
import { SceneManager } from '../scene-manager';
import PlayingScene from './playing-scene';
import TopScene from './top-scene';

export type SceneKind =
	| 'Top'
	| 'StageSelecting'
	| 'Playing'
	| 'GameOver'
	| 'Result';

export class Scene extends enchant.Scene {
	public manager: SceneManager;
	public kind: SceneKind;

	public constructor(kind: SceneKind, manager: SceneManager) {
		super();
		this.kind = kind;
		this.manager = manager;
	}

	public moveNextScene(nextkind: SceneKind) {
		this.manager.changeScene(nextkind);
	}
}

export type Scenes = {
	Top: TopScene;
	StageSelecting: Scene;
	Playing: PlayingScene;
	GameOver: Scene;
	Result: Scene;
};

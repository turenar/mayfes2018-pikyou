import * as enchant from 'node-enchantjs';
import core from './enchant/core';
import EnchantMap from './enchant/map';
import stages from './stages';
import { Character } from './character';
import StartButton from './button';

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

export type Scenes = {
	Top: Scene;
	StageSelecting: Scene;
	Playing: Scene;
	GameOver: Scene;
	Result: Scene;
};

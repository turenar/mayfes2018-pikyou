import * as enchant from 'node-enchantjs';
import core from './enchant/core';
import EnchantMap from './enchant/map';
import stages from './stages';
import { Character } from './character';
import { SceneManager } from './scene-manager';

export type SceneKind =
	| 'Top'
	| 'StageSelecting'
	| 'Playing'
	| 'GameOver'
	| 'Result';

export class Scene extends enchant.Scene {
	private manager: SceneManager;
	public kind: SceneKind;

	public constructor(kind: SceneKind, manager: SceneManager) {
		super();
		this.kind = kind;
		this.manager = manager;
	}

	public canMoveCharacterNext() {
		var next_x: number = this.character.x;
		var next_y: number = this.character.y;
		if (this.character.direction === 'north') next_y -= 32;
		if (this.character.direction === 'east') next_x += 32;
		if (this.character.direction === 'south') next_y += 32;
		if (this.character.direction === 'west') next_x -= 32;

		return this.map.canEnter(next_x, next_y);
	}

	public moveNextScene(nextkind: SceneKind) {
		this.manager.changeScene(nextkind);
	}
  
	private initScene() {
		this.map = new EnchantMap(stages[0].map);
		this.map.addInto(this);
		this.addChild(this.character);
		this.addChild(this.button);
  }
}

export type Scenes = {
	Top: Scene;
	StageSelecting: Scene;
	Playing: Scene;
	GameOver: Scene;
	Result: Scene;
};

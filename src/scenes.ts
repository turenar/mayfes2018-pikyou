import * as enchant from 'node-enchantjs';
import core from './enchant/core';
import EnchantMap from './enchant/map';
import stages from './stages';
import { Character } from './character';
import { StartStopButton } from './button';

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

export class PlayingScene extends Scene {
	public isRunning: boolean;
	public character: Character;
	public button: StartStopButton;
	public map: EnchantMap;

	public constructor() {
		super('Playing');
		this.isRunning = false;

		this.character = new Character(32, 32);
		this.button = new StartStopButton(320, 140, this);

		this.initScene();

		core.pause();
	}

	public resetScene() {
		this.character.reset();
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

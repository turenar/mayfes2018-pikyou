import core from './enchant/core';
import PlayingScene from './scenes/playing-scene';
import { code } from './blockly-main';
import { Character, CharacterPosition } from './character';
import { Map, getCoordinateFromPoint } from './enchant/map';
import stages from './stages';

export class World {
	public scene: PlayingScene;
	public character: Character;
	public map: Map;

	public constructor(scene: PlayingScene, stageNumber: number) {
		this.scene = scene;
		this.character = new Character();
		this.map = new Map(stages[0].map);

		this.map.addInto(this.scene);
		this.scene.addChild(this.character);
	}

	public reset() {
		this.character.reset();
		this.map.reset();
	}

	public canMoveCharacterNext(position: CharacterPosition) {
		let next_x;
		let next_y;

		if (position.direction === 'north')
			next_y = getCoordinateFromPoint(position.point_y - 1);
		if (position.direction === 'east')
			next_x = getCoordinateFromPoint(position.point_x + 1);
		if (position.direction === 'south')
			next_y = getCoordinateFromPoint(position.point_y + 1);
		if (position.direction === 'west')
			next_x = getCoordinateFromPoint(position.point_x - 1);

		return this.map.canEnter(next_x, next_y);
	}
}

import core from './enchant/core';
import PlayingScene from './scenes/playing-scene';
import { code } from './blockly-main';
import { Character, CharacterPosition } from './character';
import { Map } from './enchant/map';
import stages from './stages';

export class World {
	public scene: PlayingScene;
	public character: Character;
	public map: Map;

	public constructor(scene: PlayingScene, stageNumber: number) {
		this.scene = scene;
		this.character = new Character(this);
		this.map = new Map(stages[stageNumber].map);

		this.map.addInto(this.scene);
		this.scene.addChild(this.character);
	}

	public reset() {
		this.character.reset();
		this.map.reset();
	}
	
    /**
	 * マップ座標をわたすとcharacterの足元のマップチップを返す。
	 * @param mapPoint_x 
	 * @param mapPoint_y 
	 */
    public checkCharacterFeetTile(mapPoint_x: number, mapPoint_y: number) {
		const x = Map.getCoordinateFromMapPoint(mapPoint_x);
		const y = Map.getCoordinateFromMapPoint(mapPoint_y);
        return this.map.checkTile(x, y);
    }

	/**
	 * CharacterPositionを渡すとキャラクターが目の前のマスに進めるかを返す。
	 * @param position 
	 */
	public canMoveCharacterNext(position: CharacterPosition) {
		let next_x;
		let next_y;

		if (position.direction === 'north')
			next_y = Map.getCoordinateFromMapPoint(position.point_y - 1);
		if (position.direction === 'east')
			next_x = Map.getCoordinateFromMapPoint(position.point_x + 1);
		if (position.direction === 'south')
			next_y = Map.getCoordinateFromMapPoint(position.point_y + 1);
		if (position.direction === 'west')
			next_x = Map.getCoordinateFromMapPoint(position.point_x - 1);

		return this.map.canEnter(next_x, next_y);
    }
}

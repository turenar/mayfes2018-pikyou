import core from './enchant/core';
import PlayingScene from './scenes/playing-scene';
import { code } from './blockly-main';
import { Character, CharacterPosition, ItemKind } from './character';
import { AnimationQueue } from './animation-queue';
import { Map, MapPoint } from './enchant/map';
import stages from './stages';
import MapChip from './enchant/mapchip';

export class World {
	public scene: PlayingScene;
	public character: Character;
	public map: Map;
	public animationQueue: AnimationQueue;
	public isAnimating: boolean;

	public constructor(scene: PlayingScene, stageNumber: number) {
		this.scene = scene;
		this.character = new Character(this, stages[stageNumber].characterInitialPosition);
		this.map = new Map(stages[stageNumber].map);
		this.animationQueue = new AnimationQueue();

		this.map.addInto(this.scene);
		this.scene.addChild(this.character);

		this.isAnimating = this.character.isAnimating;
	}

	public reset() {
		this.character.reset();
		this.map.reset();
		this.animationQueue.clear();
	}

	/**
	 * マップ座標をわたすとそこのマップチップを返す。
	 * @param {MapPoint} x -mapPoint_x
	 * @param {MapPoint} y -mapPoint_y
	 * @returns {number} -タイル番号
	 */
	public checkTile(x: MapPoint, y: MapPoint): number {
		return this.map.checkTile(x, y);
	}

	/**
	 * CharacterPositionを渡すとキャラクターが目の前のマスに進めるかを返す。
	 * @param {CharacterPosition} position -CharacterPosition
	 * @returns {boolean} -進めるならtrue
	 */
	public canMoveCharacterNext(position: CharacterPosition): boolean {
		let next_x = position.mapPoint_x;
		let next_y = position.mapPoint_y;

		if (position.direction === 'north') {
			next_y -= 1;
		}
		if (position.direction === 'east') {
			next_x += 1;
		}
		if (position.direction === 'south') {
			next_y += 1;
		}
		if (position.direction === 'west') {
			next_x -= 1;
		}

		return this.map.canEnter(next_x, next_y);
	}

	public goal() {
		this.scene.moveNextScene('Result');
	}

	public die() {
		this.scene.moveNextScene('GameOver');
	}

	public changeMapChipIntoFloor(x: MapPoint, y: MapPoint) {
		const mapchip = MapChip.Floor;
		this.map.updateMap(x, y, mapchip);
	}
}

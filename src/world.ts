import core from './enchant/core';
import PlayingScene from './scenes/playing-scene';
import { code } from './blockly-main';
import { Character, CharacterPosition } from './character';
import { AnimationQueue } from './animation-queue';
import { Map, MapPoint } from './enchant/map';
import stages from './stages';
import MapChip from './enchant/map-chip';

export class World {
	public readonly scene: PlayingScene;
	public readonly character: Character;
	public readonly map: Map;
	public readonly animationQueue: AnimationQueue;
	public readonly stageNumber: number;
	public isAnimating: boolean;

	public constructor(scene: PlayingScene, stageNumber: number) {
		this.scene = scene;
		this.character = new Character(this, stages[stageNumber].characterInitialPosition);
		this.map = new Map(stages[stageNumber].map);
		this.animationQueue = new AnimationQueue();
		this.stageNumber = stageNumber;

		this.map.addInto(this.scene);
		this.scene.addChild(this.character);

		this.isAnimating = this.character.isAnimating;
	}

	public reset() {
		this.character.reset();
		this.map.reset(stages[this.stageNumber].map);
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

	public setTile(mapPoint_x: number, mapPoint_y: number, tile: MapChip) {
		const x = Map.getCoordinateFromMapPoint(mapPoint_x);
		const y = Map.getCoordinateFromMapPoint(mapPoint_y);
		this.map.setTile(x, y, tile);
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
}

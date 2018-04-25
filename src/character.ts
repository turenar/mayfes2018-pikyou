import * as enchant from 'node-enchantjs';
import core from './enchant/core';
import { code } from './blockly-main';
import { mapchipSize, Map, MapPoint } from './enchant/map';
import { World } from './world';
import MapChip from './enchant/map-chip';
import { QueuedAction } from './animation-queue';
import { MapChipDefinition } from './enchant/map-chip-definitions';

export type Direction = 'north' | 'east' | 'south' | 'west';

export type CharacterPosition = {
	mapPoint_x: MapPoint;
	mapPoint_y: MapPoint;
	direction: Direction;
};

export class Character extends enchant.Sprite {
	//mapPoint_*, init_* はマス目の座標を入れる。
	//実際のピクセル座標は、getCoordinateで得る。
	private world: World;
	private mapPoint_x: MapPoint;
	private mapPoint_y: MapPoint;
	private initialPosition: CharacterPosition;
	private animationRate: number;
	private defaultVelocity: number;
	private velocity: number;
	private direction: Direction;
	private isDead: boolean;
	private isGoal: boolean;
	public isAnimating: boolean;

	public constructor(world: World, initialPosition: CharacterPosition) {
		const width = 32;
		const height = 32;
		super(width, height);
		this.image = core.assets['img/chara1.png'];
		this.initialPosition = initialPosition;
		this.animationRate = 4;
		this.defaultVelocity = mapchipSize / this.animationRate;
		this.world = world;

		this.reset();
	}

	//初期位置に戻す
	public reset() {
		this.mapPoint_x = this.initialPosition.mapPoint_x;
		this.mapPoint_y = this.initialPosition.mapPoint_y;
		this.direction = this.initialPosition.direction;
		this.velocity = this.defaultVelocity;
		this.x = Map.getCoordinateFromMapPoint(this.mapPoint_x);
		this.y = Map.getCoordinateFromMapPoint(this.mapPoint_y);
		this.isDead = false;
		this.isGoal = false;
		this.isAnimating = false;
		this.tl.clear();
	}

	//向いている方向に進む
	public moveForward() {
		if (this.canMoveNext(this.direction) && !this.isGoal && !this.isDead) {
			this.velocity = this.defaultVelocity;

			if (this.direction === 'north') {
				this.mapPoint_y -= 1;
			}

			if (this.direction === 'east') {
				this.mapPoint_x += 1;
			}

			if (this.direction === 'south') {
				this.mapPoint_y += 1;
			}

			if (this.direction === 'west') {
				this.mapPoint_x -= 1;
			}

			console.log({
				x: this.mapPoint_x,
				y: this.mapPoint_y,
				tile: this.getFeetTile(),
				direction: this.direction,
			});

			this.world.animationQueue.push(this.mkMovingAction(this.direction));

			const def = this.getFeetTileDef();
			if (def && def.onEnter) {
				def.onEnter(this.world, this.mapPoint_x, this.mapPoint_y);
			}
		}
	}

	//方向転換
	public setDirection(direction: Direction) {
		this.direction = direction;
	}

	//ストップ
	public stop() {
		if (!this.isAnimating) {
			this.velocity = 0;
		}
	}

	/**
	 * CharacterPositionをマップ座標で返す
	 * @returns {CharacterPosition} -charcaterのマップ座標と向きを返す。
	 */
	public getMapPointAndDirection(): CharacterPosition {
		const mapPoint_x = this.mapPoint_x;
		const mapPoint_y = this.mapPoint_y;
		const direction = this.direction;

		return {
			mapPoint_x,
			mapPoint_y,
			direction,
		};
	}

	/**
	 * 足元のマップチップの種類を取得する。
	 * @returns {number} -足元のマップチップの種類
	 */
	public getFeetTile(): number {
		return this.world.checkTile(this.mapPoint_x, this.mapPoint_y);
	}

	public getFeetTileDef(): MapChipDefinition {
		return this.world.map.getMapChipDef(this.mapPoint_x, this.mapPoint_y);
	}

	/**
	 * 目の前のマップチップの種類を取得する。
	 * @returns {number} -目の前のマップチップの種類
	 */
	public getFrontTile(): number {
		let next_x = this.mapPoint_x;
		let next_y = this.mapPoint_y;

		if (this.direction === 'north') {
			next_y -= 1;
		}
		if (this.direction === 'east') {
			next_x += 1;
		}
		if (this.direction === 'south') {
			next_y += 1;
		}
		if (this.direction === 'west') {
			next_x -= 1;
		}

		return this.world.checkTile(next_x, next_y);
	}

	/**
	 * 目の前のマスに進めるかどうか。
	 * @returns {boolean} -進めればtrue
	 * @param {Direction} direction  -方向
	 */
	public canMoveNext(direction: Direction): boolean {
		const mapPoint_x = this.mapPoint_x;
		const mapPoint_y = this.mapPoint_y;

		return this.world.canMoveCharacterNext({
			mapPoint_x,
			mapPoint_y,
			direction,
		});
	}

	public kill() {
		this.isDead = true;
	}

	private mkMovingAction(direction: Direction): QueuedAction {
		const velocity = this.velocity;
		let actiontick;

		if (direction === 'north') {
			actiontick = function() {
				this.moveBy(0, -velocity);
			};
		}

		if (direction === 'east') {
			actiontick = function() {
				this.moveBy(velocity, 0);
			};
		}

		if (direction === 'south') {
			actiontick = function() {
				this.moveBy(0, velocity);
			};
		}

		if (direction === 'west') {
			actiontick = function() {
				this.moveBy(-velocity, 0);
			};
		}

		const action: QueuedAction = {
			target: this.tl,
			time: this.animationRate,
			onactionstart: function() {
				this.isAnimating = true;
				console.log('action start');
			},
			onactionend: function() {
				this.isAnimating = false;
				console.log('action end');
			},
			onactiontick: actiontick,
		};

		return action;
	}
}

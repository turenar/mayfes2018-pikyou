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
	private nextjump: boolean;
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
		this.nextjump = false;
		this.isAnimating = false;
		this.tl.clear();
	}

	//向いている方向に進む
	public moveForward() {
		if (this.canMoveNext(this.direction) && !this.isGoal && !this.isDead) {
			this.velocity = this.defaultVelocity;
			let distance = 1;
			let isjump = this.nextjump && this.canJumpNext(this.direction);
			if (isjump) {
				distance = 2;
			}

			if (this.direction === 'north') {
				this.mapPoint_y -= distance;
			}

			if (this.direction === 'east') {
				this.mapPoint_x += distance;
			}

			if (this.direction === 'south') {
				this.mapPoint_y += distance;
			}

			if (this.direction === 'west') {
				this.mapPoint_x -= distance;
			}

			console.log({
				x: this.mapPoint_x,
				y: this.mapPoint_y,
				tile: this.getFeetTile(),
				direction: this.direction,
			});

			if (isjump) {
				this.world.animationQueue.push(this.mkJumpingAction(this.direction));
			} else {
				this.world.animationQueue.push(this.mkMovingAction(this.direction));
			}
			this.nextjump = false;

			const feetDef = this.getFeetTileDef();
			const frontDef = this.getFrontTileDef();

			if (feetDef && feetDef.onEnter) {
				feetDef.onEnter(this.world, this.mapPoint_x, this.mapPoint_y);
			}
			if (frontDef && frontDef.onAction) {
				const { mapPoint_x, mapPoint_y } = this.getNextMapPointAndDirection();
				frontDef.onAction(this.world, mapPoint_x, mapPoint_y);
			}
		}
	}

	//方向転換
	public setDirection(direction: Direction) {
		this.direction = direction;
	}

	//ジャンプ
	public setJump() {
		this.nextjump = true;
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
	 * 自分の目の前のCharacterPositionを返す。
	 * @returns {CharacterPosition} -characterの目の前の座標を返す。
	 */
	public getNextMapPointAndDirection(): CharacterPosition {
		const mapPoint_x = this.mapPoint_x;
		const mapPoint_y = this.mapPoint_y;
		const direction = this.direction;

		let next_x = mapPoint_x;
		let next_y = mapPoint_y;

		if (direction === 'north') {
			next_y -= 1;
		}
		if (direction === 'east') {
			next_x += 1;
		}
		if (direction === 'south') {
			next_y += 1;
		}
		if (direction === 'west') {
			next_x -= 1;
		}

		return {
			mapPoint_x: next_x,
			mapPoint_y: next_y,
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

	public getFrontTileDef(): MapChipDefinition {
		const { mapPoint_x, mapPoint_y } = this.getNextMapPointAndDirection();
		return this.world.map.getMapChipDef(mapPoint_x, mapPoint_y);
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

	public canJumpNext(direction: Direction): boolean {
		const mapPoint_x = this.mapPoint_x;
		const mapPoint_y = this.mapPoint_y;

		return this.world.canMoveCharacterNext(
			{
				mapPoint_x,
				mapPoint_y,
				direction,
			},
			2
		);
	}

	public goal() {
		this.isGoal = true;
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
	private mkJumpingAction(direction: Direction): QueuedAction {
		const velocity = this.velocity * 2;
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

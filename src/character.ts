import * as enchant from 'node-enchantjs';
import core from './enchant/core';
import { code } from './blockly-main';
import { mapchipSize, Map } from './enchant/map';
import { World } from './world';
import MapChip from './enchant/mapchip';

export type Direction = 'north' | 'east' | 'south' | 'west';

export type CharacterPosition = {
	mapPoint_x: number;
	mapPoint_y: number;
	direction: Direction;
};

export class Character extends enchant.Sprite {
	//mapPoint_*, init_* はマス目の座標を入れる。
	//実際のピクセル座標は、getCoordinateで得る。
	private world: World;
	private mapPoint_x: number;
	private mapPoint_y: number;
	private initMapPoint_x: number;
	private initMapPoint_y: number;
	private animationRate: number;
	private defaultVelocity: number;
	private velocity: number;
	private direction: Direction;
	public isAnimating: boolean;

	public constructor(world: World) {
		const width = 32;
		const height = 32;
		super(width, height);
		this.image = core.assets['img/chara1.png'];
		this.initMapPoint_x = 5;
		this.initMapPoint_y = 5;
		this.animationRate = 4;
		this.defaultVelocity = mapchipSize / this.animationRate;
		this.world = world;

		this.reset();
		this.initCharacter();
	}

	//初期位置に戻す
	public reset() {
		this.mapPoint_x = this.initMapPoint_x;
		this.mapPoint_y = this.initMapPoint_y;
		this.velocity = this.defaultVelocity;
		this.direction = 'south';
		this.x = Map.getCoordinateFromMapPoint(this.mapPoint_x);
		this.y = Map.getCoordinateFromMapPoint(this.mapPoint_y);
		this.isAnimating = false;
		this.tl.clear();
	}

	//向いている方向に進む
	public moveForward() {
		if (this.canMoveNext(this.direction)) {
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
	private getFeetTile(): number {
		return this.world.checkTile(this.mapPoint_x, this.mapPoint_y);
	}

	/**
	 * 目の前のマップチップの種類を取得する。
	 * @returns {number} -目の前のマップチップの種類
	 */
	private getFrontTile(): number {
		let next_x = this.mapPoint_x;
		let next_y = this.mapPoint_y;

		if (this.direction === 'north') next_y -= 1;
		if (this.direction === 'east') next_x += 1;
		if (this.direction === 'south') next_y += 1;
		if (this.direction === 'west') next_x -= 1;

		return this.world.checkTile(next_x, next_y);
	}

	/**
	 * 目の前のマスに進めるかどうか。
	 * @returns {boolean} -進めればtrue
	 * @param {Direction} direction  -方向
	 */
	private canMoveNext(direction: Direction): boolean {
		const mapPoint_x = this.mapPoint_x;
		const mapPoint_y = this.mapPoint_y;

		return this.world.canMoveCharacterNext({
			mapPoint_x,
			mapPoint_y,
			direction,
		});
	}

	private mkMovingAction(direction: Direction) {
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

		const action = {
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

	private initCharacter() {
		this.on('enterframe', function() {
			if (
				this.getFeetTile() === MapChip.Goal &&
				!this.isAnimating &&
				this.world.animationQueue.length() === 0
			) {
				this.world.goal();
			} else {
				eval(code);
			}

			if (!this.isAnimating) {
				this.isAnimating = true;
				this.tl.action(this.world.animationQueue.pop());
			}

			//debug用コード
			if (
				this.mapPoint_x < 2 ||
				this.mapPoint_x > 9 ||
				this.mapPoint_y < 2 ||
				this.mapPoint_y > 9
			) {
				this.world.reset();
			}
		});
	}
}

import * as enchant from 'node-enchantjs';
import core from './enchant/core';
import { code } from './blockly-main';
import { mapchipSize, Map, MapPoint } from './enchant/map';
import { World } from './world';
import MapChip from './enchant/mapchip';

export type Direction = 'north' | 'east' | 'south' | 'west';

export type CharacterPosition = {
	mapPoint_x: MapPoint;
	mapPoint_y: MapPoint;
	direction: Direction;
};

export type ItemKind = 'key' | 'chest';

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
	private isHavingKey: boolean;
	private isHavingChest: boolean;
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
		this.initCharacter();
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
		this.isHavingKey = false;
		this.isHavingChest = false;
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
		}
		if (this.getFeetTile() === MapChip.Goal) {
			this.isGoal = true;
			throw 'goal';
		}

		if (this.getFeetTile() === MapChip.Pitfall) {
			this.isDead = true;
			throw 'die';
		}

		if (this.getFeetTile() === MapChip.Key) {
			this.isHavingKey = true;
			this.getItem('key');
		}

		if (this.getFrontTile() === MapChip.Door && this.isHavingKey) {
			console.log('hoge');
			this.isHavingKey = false;
			this.openDoor();
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
	 * @returns {MapChip} -足元のマップチップの種類
	 */
	private getFeetTile(): MapChip {
		return this.world.checkTile(this.mapPoint_x, this.mapPoint_y);
	}

	/**
	 * 目の前のマップチップの種類を取得する。
	 * @returns {MapChip} -目の前のマップチップの種類
	 */
	private getFrontTile(): MapChip {
		const { mapPoint_x, mapPoint_y } = this.getNextMapPointAndDirection();
		return this.world.checkTile(mapPoint_x, mapPoint_y);
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

	private die() {
		this.world.die();
	}

	private getItem(item: ItemKind) {
		const characterPosition = this.getMapPointAndDirection();
		this.world.animationQueue.push({
			time: 1,
			onactionstart: function() {
				this.isAnimating = true;
				console.log(`get ${item}!`);
			},
			onactionend: function() {
				this.world.changeMapChipIntoFloor(characterPosition.mapPoint_x, characterPosition.mapPoint_y);
				this.isAnimating = false;
				console.log(`map ${characterPosition.mapPoint_x}, ${characterPosition.mapPoint_y} update finished`);
			},
			onactiontick: function() {},
		});
	}

	private openDoor() {
		const nextPosition = this.getNextMapPointAndDirection();
		this.world.animationQueue.push({
			time: 1,
			onactionstart: function() {
				this.isAnimating = true;
				console.log('open door!');
			},
			onactionend: function() {
				this.world.changeMapChipIntoFloor(nextPosition.mapPoint_x, nextPosition.mapPoint_y);
				this.isAnimating = false;
				console.log(`map ${nextPosition.mapPoint_x}, ${nextPosition.mapPoint_y} update finished`);
			},
			onactiontick: function() {},
		});
	}

	private initCharacter() {
		this.on('enterframe', function() {
			if (this.isDead && !this.isAnimating && this.world.animationQueue.length() === 0) {
				this.die();
			}
			if (this.isGoal && !this.isAnimating && this.world.animationQueue.length() === 0) {
				this.world.goal();
			}

			if (!this.isGoal && !this.isDead && this.world.scene.isRunning) {
				try {
					eval(code);
				} catch (e) {
					console.error(e);
				}
			}

			if (!this.isAnimating) {
				this.isAnimating = true;
				this.tl.action(this.world.animationQueue.pop());
			}

			//debug用コード
			if (this.mapPoint_x < 2 || this.mapPoint_x > 9 || this.mapPoint_y < 2 || this.mapPoint_y > 9) {
				this.world.reset();
			}
		});
	}
}

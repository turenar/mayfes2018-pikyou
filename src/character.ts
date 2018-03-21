import * as enchant from 'node-enchantjs';
import core from './enchant/core';
import { code } from './blockly-main';
import { mapchipSize, getCoordinateFromPoint } from './enchant/map';

export type Direction = 'north' | 'east' | 'south' | 'west';

export type Position = {
	point_x: number;
	point_y: number;
	direction: Direction;
};

export class Character extends enchant.Sprite {
	//point_*, init_* はマス目の座標を入れる。
	//実際のピクセル座標は、getCoordinateで得る。
	private point_x: number;
	private point_y: number;
	private init_x: number;
	private init_y: number;
	private countRate: number;
	private defaultVelocity: number;
	private velocity: number;
	private direction: Direction;
	private count: number;

	public constructor() {
		const width = 32;
		const height = 32;
		super(width, height);
		this.image = core.assets['img/chara1.png'];
		this.init_x = 5;
		this.init_y = 5;
		this.countRate = 4;
		this.defaultVelocity = mapchipSize / this.countRate;

		this.reset();
		this.initCharacter();
	}

	//初期位置に戻す
	public reset() {
		this.point_x = this.init_x;
		this.point_y = this.init_y;
		this.velocity = this.defaultVelocity;
		this.direction = 'east';
		this.x = getCoordinateFromPoint(this.point_x);
		this.y = getCoordinateFromPoint(this.point_y);
		this.count = 0;
	}

	//向いている方向に進む
	public moveForward() {
		if (this.count < this.countRate) {
			this.velocity = this.defaultVelocity;

			if (this.direction === 'north') {
				this.moveBy(0, -this.velocity);
			}

			if (this.direction === 'east') {
				this.moveBy(this.velocity, 0);
			}

			if (this.direction === 'south') {
				this.moveBy(0, this.velocity);
			}

			if (this.direction === 'west') {
				this.moveBy(-this.velocity, 0);
			}

			this.count += 1;
		} else if (this.count === this.countRate) {
			if (this.direction === 'north') {
				this.point_y -= 1;
			}

			if (this.direction === 'east') {
				this.point_x += 1;
			}

			if (this.direction === 'south') {
				this.point_y += 1;
			}

			if (this.direction === 'west') {
				this.point_x -= 1;
			}

			this.count = 0;

			console.log(this.point_x, this.point_y);
		} else {
			this.count += 1;
		}
	}

	//方向転換
	public setDirection(direction: Direction) {
		this.direction = direction;
	}

	//停止
	public stop() {
		this.velocity = 0;
		this.count = 0;

		this.x = getCoordinateFromPoint(this.point_x);
		this.y = getCoordinateFromPoint(this.point_y);
	}

	public getPointAndDirection(): Position {
		const point_x = this.point_x;
		const point_y = this.point_y;
		const direction = this.direction;

		return {
			point_x,
			point_y,
			direction,
		};
	}

	public getCoordinateAndDirection(): Position {
		const point_x = getCoordinateFromPoint(this.point_x);
		const point_y = getCoordinateFromPoint(this.point_y);
		const direction = this.direction;

		return {
			point_x,
			point_y,
			direction,
		};
	}

	private initCharacter() {
		this.on('enterframe', function() {
			eval(code);
			if (
				this.point_x < 2 ||
				this.point_x > 9 ||
				this.point_y < 2 ||
				this.point_y > 9
			) {
				this.reset();
			}
		});
	}
}

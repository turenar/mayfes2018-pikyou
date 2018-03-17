import * as enchant from 'node-enchantjs';
import core from './enchant/core';
import { code } from './blockly-main';
import { mapchipSize } from './enchant/map';

export type Direction = 'north' | 'east' | 'south' | 'west';

export class Character extends enchant.Sprite {
	//point_*, init_* はマス目の座標を入れる。
	//実際のピクセル座標は、getCoordinateで得る。
	private point_x: number;
	private point_y: number;
	private init_x: number = 5;
	private init_y: number = 5;
	private defaultVelocity: number = mapchipSize;
	private direction: Direction;
	private velocity: number;
	private count: number;

	public constructor(width: number, height: number) {
		super(width, height);
		this.image = core.assets['img/chara1.png'];
		this.reset();
		this.initCharacter();
	}

	//初期位置に戻す
	public reset() {
		this.point_x = this.init_x;
		this.point_y = this.init_y;
		this.direction = 'east';
		this.x = this.getCoordinate(this.point_x);
		this.y = this.getCoordinate(this.point_y);
		this.velocity = this.defaultVelocity;
		this.count = 0;
	}

	//向いている方向に進む
	public moveForward() {
		if (this.count > 5) {
			this.velocity = this.defaultVelocity;

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

			this.x = this.getCoordinate(this.point_x);
			this.y = this.getCoordinate(this.point_y);

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
	}

	private initCharacter() {
		this.on('enterframe', function() {
			eval(code);
			if (
				this.point_x < 0 ||
				this.point_x > 9 ||
				this.point_y < 0 ||
				this.point_y > 9
			) {
				this.reset();
			}
		});
	}

	private getCoordinate(point: number): number {
		return (point - 1) * mapchipSize;
	}
}

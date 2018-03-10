import * as enchant from 'node-enchantjs';
import core from './enchant/core';

export type Direction = 'north' | 'east' | 'south' | 'west';

export class Character extends enchant.Sprite {
	private init_x: number = 128;
	private init_y: number = 128;
	private defaultVelocity: number = 10;
	private direction: Direction;
	private velocity: number;

	public constructor(size_x: number, size_y: number) {
		super(size_x, size_y);
		this.direction = 'east';
		this.x = this.init_x;
		this.y = this.init_y;
		this.velocity = this.defaultVelocity;
		this.image = core.assets['img/chara1.png'];
	}

	//初期位置に戻す
	public Initialization() {
		this.direction = 'east';
		this.x = this.init_x;
		this.y = this.init_y;
	}

	//向いている方向に進む
	public moveForward() {
		this.velocity = this.defaultVelocity;

		if (this.direction === 'north') this.moveBy(0, -this.velocity);
		if (this.direction === 'east') this.moveBy(this.velocity, 0);
		if (this.direction === 'south') this.moveBy(0, this.velocity);
		if (this.direction === 'west') this.moveBy(-this.velocity, 0);
	}

	//方向転換
	public setDirection(direction: Direction) {
		this.direction = direction;
	}

	//停止
	public stop() {
		this.velocity = 0;
	}
}

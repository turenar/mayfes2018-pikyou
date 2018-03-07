import * as enchant from 'node-enchantjs';

export type Direction = 'north' | 'east' | 'south' | 'west';

export class Character extends enchant.Sprite {
	private defaultVelocity: number = 10;
	private direction: Direction = 'east';
	private velocity: number = this.defaultVelocity;

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

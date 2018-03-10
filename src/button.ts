import core from './enchant/core';
import * as enchant from 'node-enchantjs';

export class Button extends enchant.Sprite {
	public constructor(width: number, height: number) {
		super(width, height);
		this.x = 20;
		this.y = 320;
		this.image = core.assets['img/startbutton.png'];
	}

	public reloadButton(isRunning: boolean): boolean {
		if (isRunning) {
			console.log('stop game');
			this.image = core.assets['img/startbutton.png'];
			core.pause();
		} else {
			console.log('start game');
			this.image = core.assets['img/stopbutton.png'];
			core.resume();
		}

		return !isRunning;
	}
}

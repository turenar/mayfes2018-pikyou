import core from './enchant/core';
import * as enchant from 'node-enchantjs';
import { Character } from './character';
import { PlayingScene } from './scenes';

export class StartStopButton extends enchant.Sprite {
	public constructor(width: number, height: number, scene: PlayingScene) {
		super(width, height);
		this.x = 20;
		this.y = 320;
		this.image = core.assets['img/startbutton.png'];

		this.initButton(scene);
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

	private initButton(scene: PlayingScene) {
		this.addEventListener('touchstart', function() {
			scene.isRunning = this.reloadButton(scene.isRunning);
			scene.resetScene();
		});
	}
}

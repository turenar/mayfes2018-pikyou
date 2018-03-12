import core from './enchant/core';
import * as enchant from 'node-enchantjs';
import { Character } from './character';
import { SceneManager } from './scene-manager';

export class StartStopButton extends enchant.Sprite {
	public constructor(
		width: number,
		height: number,
		character: Character,
		sceneManager: SceneManager
	) {
		super(width, height);
		this.x = 20;
		this.y = 320;
		this.image = core.assets['img/startbutton.png'];
	}

	public listenButton(sceneManager: SceneManager, character: Character) {
		this.addEventListener('touchstart', function() {
			sceneManager.isRunning = this.reloadButton(sceneManager.isRunning);
			character.reset();
		});
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

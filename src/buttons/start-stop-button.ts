import core from '../enchant/core';
import * as enchant from 'node-enchantjs';
import PlayingScene from '../scenes/playing-scene';

export default class StartStopButton extends enchant.Sprite {
	public scene: PlayingScene;

	public constructor(scene: PlayingScene) {
		const width = 320;
		const height = 140;
		super(width, height);
		this.scene = scene;
		this.x = 20;
		this.y = 320;
		this.image = core.assets['img/startbutton.png'];

		this.initButton();
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

	public reset() {
		console.log('stop game');
		this.image = core.assets['img/startbutton.png'];
	}

	private initButton() {
		this.addEventListener('touchstart', () => {
			this.scene.isRunning = this.reloadButton(this.scene.isRunning);
			this.scene.reset();
		});
	}
}

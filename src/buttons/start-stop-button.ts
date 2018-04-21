import core from '../enchant/core';
import * as enchant from 'node-enchantjs';
import PlayingScene from '../scenes/playing-scene';

export default class StartStopButton extends enchant.Sprite {
	public scene: PlayingScene;

	public constructor(scene: PlayingScene, x: number, y: number) {
		const width = 260;
		const height = 80;
		super(width, height);
		this.scene = scene;
		this.x = x;
		this.y = y;
		this.image = core.assets['img/start_button.png'];

		this.initButton();
	}

	public reloadButton(isRunning: boolean): boolean {
		if (isRunning) {
			console.log('stop game');
			this.image = core.assets['img/start_button.png'];
			core.pause();
		} else {
			console.log('start game');
			this.image = core.assets['img/stop_button.png'];
			core.resume();
		}
		return !isRunning;
	}

	public reset() {
		console.log('stop game');
		this.image = core.assets['img/start_button.png'];
	}

	private initButton() {
		this.addEventListener('touchstart', () => {
			this.scene.isRunning = this.reloadButton(this.scene.isRunning);
			this.scene.resetWorld();
		});
	}
}

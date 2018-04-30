import core from '../enchant/core';
import * as enchant from 'node-enchantjs';
import PlayingScene from '../scenes/playing-scene';
import Button from './button';

export default class StartStopButton extends Button {
	public constructor(scene: PlayingScene, x: number, y: number) {
		const width = 300;
		const height = 92;
		super(width, height, scene);
		this.x = x;
		this.y = y;

		this.initButton(scene);
	}

	public reloadButton(isRunning: boolean): boolean {
		if (isRunning) {
			console.log('stop game');
			this.image = core.assets['img/start_button.png'];
		} else {
			console.log('start game');
			this.image = core.assets['img/stop_button.png'];
		}
		return !isRunning;
	}

	public reset() {
		console.log('stop game');
		this.image = core.assets['img/start_button.png'];
	}

	private initButton(scene: PlayingScene) {
		this.addEventListener('touchend', () => {
			scene.isRunning = this.reloadButton(scene.isRunning);
			scene.resetWorld();
		});

		this.addEventListener('enterframe', () => {
			const { x, y } = scene.manager.mouseController.getPoint();
			const isInside = x > this.x && x < this.x + this.width && y > this.y && y < this.y + this.height;
			// console.log(x, y, this.scene.isRunning);
			if (!scene.isRunning) {
				if (isInside) {
					this.image = core.assets['img/start_button_hover.png'];
				} else {
					this.image = core.assets['img/start_button.png'];
				}
			} else {
				if (isInside) {
					this.image = core.assets['img/stop_button_hover.png'];
				} else {
					this.image = core.assets['img/stop_button.png'];
				}
			}
		});
	}
}

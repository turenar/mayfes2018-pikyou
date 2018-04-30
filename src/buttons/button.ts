import { Scene } from '../scenes/scenes';
import PlayingScene from '../scenes/playing-scene';
import core from '../enchant/core';
import StartStopButton from './start-stop-button';

export default class Button extends enchant.Sprite {
	public constructor(width: number, height: number, scene: Scene, imagePath?: string, imageHoverPath?: string) {
		super(width, height);

		if (!(this instanceof StartStopButton)) {
			this.addEventListener('enterframe', () => {
				const { x, y } = scene.manager.mouseController.getPoint();
				const isInside = x > this.x && x < this.x + this.width && y > this.y && y < this.y + this.height;

				if (isInside) {
					this.image = core.assets[imageHoverPath];
				} else {
					this.image = core.assets[imagePath];
				}
			});
		}
	}
}

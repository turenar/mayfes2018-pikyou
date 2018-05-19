import { Scene } from '../scenes/scenes';
import PlayingScene from '../scenes/playing-scene';
import core from '../enchant/core';
import StartStopButton from './start-stop-button';

export default class Button extends enchant.Sprite {
	protected imagePath: string;
	protected imageHoverPath: string;

	public constructor(width: number, height: number, scene: Scene, imagePath: string, imageHoverPath?: string) {
		super(width, height);

		this.imagePath = imagePath;

		if (imageHoverPath) {
			this.imageHoverPath = imageHoverPath;
			this.addEventListener('enterframe', () => {
				const { x, y } = scene.manager.mouseController.getPoint();
				const isInside = x > this.x && x < this.x + this.width && y > this.y && y < this.y + this.height;

				if (isInside) {
					this.onMouseEnter();
				} else {
					this.onMouseExit();
				}
			});
		} else {
			this.image = core.assets[this.imagePath];
		}
		this.addEventListener('touchend', () => {
			this.onClick();
		});
	}

	public onMouseEnter() {
		this.image = core.assets[this.imageHoverPath];
	}

	public onMouseExit() {
		this.image = core.assets[this.imagePath];
	}

	public onClick() {}
}

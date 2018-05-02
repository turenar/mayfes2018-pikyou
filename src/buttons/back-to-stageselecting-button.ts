import { Scene } from '../scenes/scenes';
import core from '../enchant/core';
import Button from './button';

export default class BackToStageSelectingButton extends Button {
	private scene: Scene;

	public constructor(
		x: number,
		y: number,
		width: number,
		height: number,
		imagePath: string,
		imageHoverPath: string,
		scene: Scene
	) {
		super(width, height, scene, imagePath, imageHoverPath);
		this.x = x;
		this.y = y;

		this.listenButton(scene);
	}

	private listenButton(scene: Scene) {
		this.addEventListener('touchstart', () => {
			console.log('BackToStageSelecting button is pushed!');
			scene.moveNextScene('StageSelecting');
		});
	}
}

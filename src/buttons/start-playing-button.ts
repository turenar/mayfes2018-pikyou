import core from '../enchant/core';
import Button from './button';
import StageSelectingScene from '../scenes/stage-selecting-scene';

export default class StartPlayingButton extends Button {
	public constructor(x: number, y: number, scene: StageSelectingScene) {
		super(290, 90, scene, 'img/start_playing_button.png', 'img/start_playing_button_hover.png');
		this.x = x;
		this.y = y;

		this.initButton(scene);
	}

	private initButton(scene: StageSelectingScene) {
		this.addEventListener('touchstart', () => {
			scene.moveNextScene('Playing', scene.stageNum);
		});
	}
}

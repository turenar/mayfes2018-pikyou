import { Scene } from '../scenes';
import core from '../enchant/core';
import { SceneManager } from '../scene-manager';
import StartInitButton from '../buttons/start-init-button';
import StartContinueButton from '../buttons/start-continue-button';

export default class TopScene extends Scene {
	public startInitButton: StartInitButton;
	public startContinueButton: StartContinueButton;

	public constructor(manager: SceneManager) {
		super('Top', manager);

		this.startInitButton = new StartInitButton(20, 130, this);
		this.startContinueButton = new StartContinueButton(20, 320, this);
		this.initScene();
		core.pause();
	}

	private initScene() {
		this.startInitButton.addEventListener('touchstart', () => {
			console.log('StageSelecting');
			this.moveNextScene('StageSelecting');
		});

		this.addChild(this.startInitButton);
		this.addChild(this.startContinueButton);
	}
}

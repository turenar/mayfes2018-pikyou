import { Scene } from './scenes';
import core from '../enchant/core';
import { SceneManager } from '../scene-manager';
import StartInitButton from '../buttons/start-init-button';
import StartContinueButton from '../buttons/start-continue-button';

export default class TopScene extends Scene {
	public startInitButton: StartInitButton;
	public startContinueButton: StartContinueButton;

	public constructor(manager: SceneManager) {
		super('Top', manager);

		const background = new enchant.Sprite(320, 640);
		background.image = core.assets['img/background.png'];

		const titleBackGround = new enchant.Sprite(320, 100);
		titleBackGround.backgroundColor = 'skyblue';

		const title = new enchant.Sprite(320, 43);
		title.image = core.assets['img/titletext.png'];
		title.moveTo(0, 30);

		this.startInitButton = new StartInitButton(20, 180, this);
		this.startContinueButton = new StartContinueButton(20, 320, this);

		this.addChild(background);
		this.addChild(titleBackGround);
		this.addChild(title);
		this.addChild(this.startInitButton);
		this.addChild(this.startContinueButton);

		this.initScene();
		core.resume();
	}

	private initScene() {
		this.startInitButton.addEventListener('touchstart', () => {
			console.log('StageSelecting');
			this.moveNextScene('StageSelecting');
		});
	}
}

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

		const background = new enchant.Sprite(core.width, core.height);
		background.image = core.assets['img/background.png'];

		const titleBackGround = new enchant.Sprite(core.width, 120);
		titleBackGround.backgroundColor = 'skyblue';

		const title = new enchant.Sprite(core.width, 52);
		title.image = core.assets['img/titletext.png'];
		title.moveTo(0, 35);

		this.startInitButton = new StartInitButton(260, this);
		this.startContinueButton = new StartContinueButton(420, this);

		this.addChild(background);
		this.addChild(titleBackGround);
		this.addChild(title);
		this.addChild(this.startInitButton);
		this.addChild(this.startContinueButton);

		core.resume();
	}
}

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

		const fontSize = 20;
		const versionLabel = new enchant.Label('Version 1.2');
		versionLabel.color = 'black';
		versionLabel.font = `${fontSize}px PixelMplus10`;
		versionLabel.x = 4;
		versionLabel.y = core.height - fontSize - 4;

		const creditLabel = new enchant.Label('Credit');
		creditLabel.color = 'black';
		creditLabel.font = `${fontSize}px PixelMplus10`;
		creditLabel.x = 4;
		creditLabel.width = core.width - 8;
		creditLabel.y = core.height - fontSize - 4;
		creditLabel.textAlign = 'right';
		creditLabel.on('touchend', () => {
			this.moveNextScene('Credit');
		});

		this.startInitButton = new StartInitButton(190, this);
		this.startContinueButton = new StartContinueButton(370, this);

		this.addChild(background);
		this.addChild(titleBackGround);
		this.addChild(title);
		this.addChild(versionLabel);
		this.addChild(creditLabel);
		this.addChild(this.startInitButton);
		this.addChild(this.startContinueButton);

		core.resume();
	}
}

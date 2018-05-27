import { Scene } from './scenes';
import { SceneManager } from '../scene-manager';
import core from '../enchant/core';
import DottedLabel from '../dotted-label';

export default class CreditScene extends Scene {
	public constructor(manager: SceneManager) {
		super('Credit', manager);

		const background = new enchant.Sprite(core.width, core.height);
		background.image = core.assets['img/background.png'];

		const creditLabel = new DottedLabel(36, 'クレジット');
		creditLabel.width = core.width;
		creditLabel.x = 0;
		creditLabel.y = 35;
		creditLabel.textAlign = 'center';

		let offsetX = 0;
		let offsetY = 100;

		this.addChild(background);
		this.addChild(creditLabel);

		const addLabel = (fontSize: number, height: number, indent: boolean, text: string) => {
			const label = new DottedLabel(fontSize, text);
			label.x = offsetX + (indent ? 30 : 10);
			label.y = offsetY;
			offsetY += height;
			this.addChild(label);
		};

		addLabel(22, 30, false, 'コード');
		addLabel(18, 24, true, '@aqla114');
		addLabel(18, 24, true, '@azoson');
		addLabel(18, 24, true, '@eeic19');
		addLabel(18, 24, true, '@reito48916');
		addLabel(18, 24, true, '@tkygtr6');
		addLabel(18, 24, true, '@turenar');

		offsetY += 24;
		addLabel(22, 30, false, 'グラフィック');
		addLabel(18, 24, true, '@eeic19');

		offsetX = core.width / 2;
		offsetY = 100;
		addLabel(22, 30, false, 'レベルデザイン');
		addLabel(18, 24, true, '@eeic19');
		addLabel(18, 24, true, '@reito48916');

		offsetY += 24;
		addLabel(22, 30, false, 'ウェブ・ポスター');
		addLabel(18, 24, true, '@AkariAsai');
		addLabel(18, 24, true, '@miya789');
		addLabel(18, 24, true, '@utsubuki');

		offsetY += 24;
		addLabel(22, 30, false, '雑用');
		addLabel(18, 24, true, '@iinuma0710');

		offsetY = 400;
		const licenseLabel = new DottedLabel(16, 'This software is licensed under MIT license.<br>Copyright 2018 EEIC 五月祭2018ピ教制作チーム');
		licenseLabel.width = core.width;
		licenseLabel.x = 10;
		licenseLabel.y = offsetY;
		this.addChild(licenseLabel);

		offsetY += 44;
		const apacheLabel = new DottedLabel(16, 'This software includes the work that is<br>distributed in the Apache License 2.0.');
		apacheLabel.width = core.width;
		apacheLabel.x = 10;
		apacheLabel.y = offsetY;
		this.addChild(apacheLabel);

		offsetY += 44;
		const repoLabel = new DottedLabel(16, 'More information:<br>https://github.com/turenar/mayfes2018-pikyou');
		repoLabel.width = core.width;
		repoLabel.x = 10;
		repoLabel.y = offsetY;
		this.addChild(repoLabel);

		const closeLabel = new DottedLabel(20, 'Close');
		closeLabel.x = 4;
		closeLabel.width = core.width - 8;
		closeLabel.y = core.height - 20 - 4;
		closeLabel.textAlign = 'right';
		closeLabel.on('touchend', () => {
			this.moveNextScene('Top');
		});
		this.addChild(closeLabel);
	}
}

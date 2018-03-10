import core from './enchant/core';
import * as enchant from 'node-enchantjs';
import { Character } from './character';
import { changeScene, initScene } from './scenes';
import { code } from './blockly-main';
import { Button } from './button';

/**
 * enchant関連初期化
 * @return {void}
 */
export function init() {
	core.preload('img/mapchip.png');
	core.preload('img/chara1.png');
	core.preload('img/startbutton.png');
	core.preload('img/stopbutton.png');

	core.onload = () => {
		let isRunning = false;
		const character = new Character(32, 32);
		const button = new Button(320, 140);
		initScene(character, button);
		changeScene('StageSelecting');
		changeScene('Playing');

		core.pause();

		button.addEventListener('touchstart', function() {
			isRunning = button.reloadButton(isRunning);
			character.reset();
		});

		character.on('enterframe', function() {
			eval(code);
			if (
				character.x < 0 ||
				character.x > 256 ||
				character.y < 0 ||
				character.y > 256
			) {
				character.reset();
			}
		});
	};
}

/**
 * start()
 * @returns {void}
 */
export function start() {
	core.start();
}

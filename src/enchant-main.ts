import core from './enchant/core';
import * as enchant from 'node-enchantjs';
import { Character } from './character';
import { changeScene, initScene } from './scenes';
import { code } from './blockly-main';
import StartButton from './button';

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
		const startButton = new StartButton(320, 140);
		initScene(character, startButton);
		changeScene('StageSelecting');
		changeScene('Playing');

		core.pause();

		startButton.addEventListener('touchstart', function() {
			isRunning = startButton.reloadButton(isRunning);
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

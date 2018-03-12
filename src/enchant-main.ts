import core from './enchant/core';
import * as enchant from 'node-enchantjs';
import { Character } from './character';
import { code } from './blockly-main';
import StartButton from './button';
import { SceneManager } from './scene-manager';

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
		const sceneManager = new SceneManager();
		const character = new Character(32, 32);
		const button = new StartButton(320, 140, character, sceneManager);

		sceneManager.initScene(character, button);

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

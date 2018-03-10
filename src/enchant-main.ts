import core from './enchant/core';
import * as enchant from 'node-enchantjs';
import { Character } from './character';
import { changeScene, sceneInit } from './scenes';
import { code } from './blockly-main';

/**
 * enchant関連初期化
 * @return {void}
 */
export function init() {
	core.preload('img/mapchip.png');
	core.preload('img/chara1.png');

	core.onload = () => {
		sceneInit();
		const character = new Character(32, 32);

		core.currentScene.addChild(character);

		character.on('enterframe', function() {
			eval(code);
			if (
				character.x < 0 ||
				character.x > 256 ||
				character.y < 0 ||
				character.y > 256
			) {
				character.Initialization();
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

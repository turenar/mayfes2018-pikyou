import core from './enchant/core';
import * as enchant from 'node-enchantjs';
import { Character } from './character';
import { changeScene, sceneInit } from './scenes';
import { code } from './blockly-main';

const init_x: number = 128;
const init_y: number = 128;

/**
 * enchant関連初期化
 * @return {void}
 */
export function init() {
	core.preload('img/mapchip.png');
	core.preload('img/chara1.png');

	core.onload = () => {
		sceneInit();

		var character = new Character(32, 32);
		character.image = core.assets['img/chara1.png'];
		character.x = init_x;
		character.y = init_y;
		core.currentScene.addChild(character);

		character.on('enterframe', function() {
			eval(code);
			if (
				character.x < 0 ||
				character.x > 256 ||
				character.y < 0 ||
				character.y > 256
			) {
				character.x = init_x;
				character.y = init_y;
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

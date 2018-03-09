import core from './enchant/core';
import * as enchant from 'node-enchantjs';
import { Direction, Character } from './character';
import { Scene, SceneKind } from './scene';
import { code } from './blockly-main';
import stages from './stages';
import EnchantMap from './enchant/map';

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
		const map = new EnchantMap(stages[0].map);
		map.addInto(core.rootScene);

		var character = new Character(32, 32);
		character.image = core.assets['img/chara1.png'];
		character.x = init_x;
		character.y = init_y;
		core.rootScene.addChild(character);

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

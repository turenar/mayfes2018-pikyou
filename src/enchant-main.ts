import * as enchant from 'node-enchantjs';
import core from './enchant/core';
import { Direction, Character } from './character';
import { code } from './blockly-main';

const init_x: number = 100;
const init_y: number = 100;

export function init() {
	core.preload('img/mapchip.png');
	core.preload('../node_modules/enchantjs/images/chara1.png');

	core.onload = () => {
		const map = new enchant.Map(32, 32);
		map.image = core.assets['img/mapchip.png'];

		const baseMap = [
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
			[0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
			[0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
			[0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
			[0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
			[0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
			[0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
			[0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
		];
		map.loadData(baseMap);

		core.rootScene.addChild(map);

		var character = new Character(32, 32);
		character.image =
			core.assets['../node_modules/enchantjs/images/chara1.png'];
		character.x = init_x;
		character.y = init_y;
		core.rootScene.addChild(character);

		character.on('enterframe', function() {
			eval(code);
			if (
				character.x < 0 ||
				character.x > 200 ||
				character.y < 0 ||
				character.y > 200
			) {
				character.x = init_x;
				character.y = init_y;
			}
		});
	};
}

export function start() {
	core.start();
}

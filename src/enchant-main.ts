import * as enchant from 'node-enchantjs';
import { Direction, Character } from './character';
import { code } from './blockly-main';

enchant();

const init_x: number = 100;
const init_y: number = 100;

var core = new enchant.Core(320, 320);
core.preload('../node_modules/enchantjs/images/chara1.png');
core.fps = 15;

core.onload = function() {
	var character = new Character(32, 32);
	character.image = core.assets['../node_modules/enchantjs/images/chara1.png'];
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

core.start();

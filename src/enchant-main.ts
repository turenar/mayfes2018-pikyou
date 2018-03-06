import * as enchant from 'node-enchantjs';
import {Direction, Character} from './character';

enchant();

const init_x: number = 0;
const init_y: number = 0; 

var core = new enchant.Core(320, 320);
core.preload('../node_modules/enchantjs/images/chara1.png');
core.fps = 15;

core.onload = function() {
	var bear = new Character(32, 32);
	bear.image = core.assets['../node_modules/enchantjs/images/chara1.png'];
	bear.x = init_x;
	bear.y = init_y;
	core.rootScene.addChild(bear);
	
	bear.on('enterframe', function(){
		bear.trunDirection('east');
		bear.moveForward();
		bear.Stop();
		bear.rotate(2);
		if (bear.x > 200) bear.x = 0;
	})
};

core.start();

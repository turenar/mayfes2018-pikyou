import core from './enchant/core';
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
	core.preload('img/startinit.png');
	core.preload('img/startcontinue.png');
	core.preload('img/haikei.png');
	core.preload('img/up_arrow.png');
	core.preload('img/down_arrow.png');
	core.preload('img/start_to_playscene.png');
	core.preload('img/back_to_top_button.png');
	core.preload('img/clear_mark.png');

	core.onload = () => {
		const sceneManager = new SceneManager();
	};
}

/**
 * start()
 * @returns {void}
 */
export function start() {
	core.start();
}

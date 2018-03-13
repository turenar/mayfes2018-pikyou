import core from './enchant/core';
import { SceneManager } from './scene-manager';
import { Character } from './character';
import { StartStopButton } from './button';

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
	};
}

/**
 * start()
 * @returns {void}
 */
export function start() {
	core.start();
}

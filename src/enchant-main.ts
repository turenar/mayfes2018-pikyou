import core from './enchant/core';
import { SceneManager } from './scene-manager';

/**
 * enchant関連初期化
 * @return {void}
 */
export function init() {
	core.preload('img/mapchip.png');
	core.preload('img/chara1.png');

	core.preload('img/top_init_button.png');
	core.preload('img/top_continue_button.png');
	core.preload('img/titletext.png');

	core.preload('img/start_button.png');
	core.preload('img/start_button_pushed.png');
	core.preload('img/stop_button.png');
	core.preload('img/back_to_stage_selecting_from_playing_button.png');

	core.preload('img/haikei.png');
	core.preload('img/background.png');

	core.preload('img/up_arrow.png');
	core.preload('img/down_arrow.png');
	core.preload('img/start_to_playscene.png');
	core.preload('img/back_to_top_button.png');
	core.preload('img/clear_mark.png');

	core.preload('img/result_gameover_background.png');
	core.preload('img/result_gameclear_text.png');
	core.preload('img/gameover_text.png');
	core.preload('img/chest.png');
	core.preload('img/retry_button.png');
	core.preload('img/back_to_stage_selecting_button.png');

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

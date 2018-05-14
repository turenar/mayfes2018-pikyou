import core from './enchant/core';
import { SceneManager } from './scene-manager';
import DebugTool from './debug-tool';

/**
 * enchant関連初期化
 * @return {void}
 */
export function init() {
	//Common
	core.preload('img/background.png');
	core.preload('img/back_button.png');
	core.preload('img/back_button_hover.png');
	core.preload('img/back_to_stage_selecting_button.png');
	core.preload('img/back_to_stage_selecting_button_hover.png');

	//TopScene
	core.preload('img/top_init_button.png');
	core.preload('img/top_init_button_hover.png');
	core.preload('img/top_continue_button.png');
	core.preload('img/top_continue_button_hover.png');
	core.preload('img/titletext.png');

	//PlayingScene
	core.preload('img/mapchip.png');
	core.preload('img/character.png');
	core.preload('img/start_button.png');
	core.preload('img/start_button_hover.png');
	core.preload('img/stop_button.png');
	core.preload('img/stop_button_hover.png');

	//StageSelecting
	core.preload('img/stageselecting_right_arrow.png');
	core.preload('img/stageselecting_left_arrow.png');
	core.preload('img/start_playing_button.png');
	core.preload('img/start_playing_button_hover.png');
	core.preload('img/back_to_top_button.png');
	core.preload('img/back_to_top_button_hover.png');
	core.preload('img/clear_mark.png');

	//Result, GameOver
	core.preload('img/retry_button.png');
	core.preload('img/retry_button_hover.png');
	core.preload('img/result_background.png');
	core.preload('img/result_gameclear_text.png');
	core.preload('img/result_chest.png');
	core.preload('img/gameover_text.png');
	core.preload('img/gameover_reason_text.png');

	core.onload = () => {
		const sceneManager = new SceneManager();
		(window as any).debugTool = new DebugTool(sceneManager.scoreManager);
	};
}

/**
 * start()
 * @returns {void}
 */
export function start() {
	core.start();
}

import * as enchant from 'node-enchantjs';
import core from '../enchant/core';
import { Map as EnchantMap } from '../enchant/map';
import stages from '../stages';
import { Character } from '../character';
import { SceneManager } from '../scene-manager';
import PlayingScene from './playing-scene';
import TopScene from './top-scene';
import { ClearStatus } from '../world';
import { initBlock } from '../blockly-main';

export type SceneKind = 'Top' | 'StageSelecting' | 'Playing' | 'GameOver' | 'Result' | 'StopGame';

export class Scene extends enchant.Scene {
	public manager: SceneManager;
	public kind: SceneKind;

	public constructor(kind: SceneKind, manager: SceneManager) {
		super();
		this.kind = kind;
		this.manager = manager;
	}

	public moveNextScene(nextkind: SceneKind, stageNum?: number, clearStatus?: ClearStatus) {
		this.manager.changeScene(nextkind, stageNum, clearStatus);
	}

	public updateExecuteBlock(fieldValue: string) {
		// initBlock（executeBlock）に表示されている総コストを更新する
		// ex. `この下につながっている処理を実行します。現在の総コスト: ${cost}`
		initBlock.setFieldValue(fieldValue, 'balance');
	}
}

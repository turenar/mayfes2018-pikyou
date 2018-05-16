import * as Blockly from 'node-blockly/browser';
import * as Ja from 'node-blockly/lib/i18n/ja';
import './block-definitions';
import './code-generators';
import { blockset0 } from './blocks';
import { ScoreManager } from './score-manager';

Blockly.setLocale(Ja);

const toolbox = blockset0;

const workspacePlayground = Blockly.inject('blocklyDiv', {
	toolbox: toolbox,
	scrollbars: true,
	trashcan: true,
});

const initBlock = workspacePlayground.newBlock('execute', 'initialBlock');
(initBlock as Blockly.BlockSvg).initSvg();
(workspacePlayground as Blockly.WorkspaceSvg).render();

export var code: string = '';
export var allBlocks;

Blockly.addChangeListener(function(event) {
	Blockly.Events.disableOrphans(event);
	allBlocks = workspacePlayground.getAllBlocks().filter(block => block.type !== 'execute');

	code = Blockly.JavaScript.blockToCode(workspacePlayground.getBlockById('initialBlock')) as string;
	console.log(code);

	// initBlock（executeBlock）に表示されている総コストを更新する
	// ex. `この下につながっている処理を実行します。現在の総コスト: ${cost}`
	initBlock.setFieldValue(`${ScoreManager.getBlockCostSum()}`, 'blockCost');
});

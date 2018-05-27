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
	media: './blockly-media/',
});

export const initBlock = workspacePlayground.newBlock('execute', 'initialBlock');
(initBlock as Blockly.BlockSvg).initSvg();
(workspacePlayground as Blockly.WorkspaceSvg).render();
export var blockCost = 0;
export var allBlocks;
export var code: string = '';

Blockly.addChangeListener(function(event) {
	Blockly.Events.disableOrphans(event);
	allBlocks = workspacePlayground.getAllBlocks().filter(block => block.type !== 'execute');

	code = Blockly.JavaScript.blockToCode(workspacePlayground.getBlockById('initialBlock')) as string;
	console.log(code);

	blockCost = ScoreManager.getBlockCostSum();
});

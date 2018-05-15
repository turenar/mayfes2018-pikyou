import * as Blockly from 'node-blockly/browser';
import * as Ja from 'node-blockly/lib/i18n/ja';
import './block-definitions';
import './code-generators';
import { blockset0 } from './blocks';

Blockly.setLocale(Ja);

const toolbox = blockset0;

const workspacePlayground = Blockly.inject('blocklyDiv', {
	toolbox: toolbox,
	scrollbars: true,
});

const initBlock = workspacePlayground.newBlock('execute', 'initialBlock');
(initBlock as Blockly.BlockSvg).initSvg();
(workspacePlayground as Blockly.WorkspaceSvg).render();

export var code: string = '';
export var allBlocks;

Blockly.addChangeListener(function(event) {
	Blockly.Events.disableOrphans(event);
	allBlocks = workspacePlayground.getAllBlocks();

	code = Blockly.JavaScript.blockToCode(workspacePlayground.getBlockById('initialBlock')) as string;
	console.log(code);
});

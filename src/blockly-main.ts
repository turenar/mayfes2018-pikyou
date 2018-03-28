import * as Blockly from 'node-blockly/browser';
import * as Ja from 'node-blockly/lib/i18n/ja';
import './block-definitions';
import './code-generators';
import { blockset0 } from './blocks';

Blockly.setLocale(Ja);

const toolbox = blockset0;

const workspacePlayground = Blockly.inject('blocklyDiv', {
	toolbox: toolbox,
});

const initBlock = workspacePlayground.newBlock('execute', 'initialBlock');
(initBlock as Blockly.BlockSvg).initSvg();
(workspacePlayground as Blockly.WorkspaceSvg).render();

export var code: string = '';

Blockly.addChangeListener(function(event) {
	let allBlocks = workspacePlayground.getAllBlocks();

	allBlocks.map(block => {
		if (block !== null && block.id !== 'initialBlock') {
			if (block.getRootBlock().id !== 'initialBlock') {
				block.setColour('#646665');
			} else {
				block.setColour(Blockly.Blocks[block.type].color);
			}
		}
	});

	code = Blockly.JavaScript.blockToCode(
		workspacePlayground.getBlockById('initialBlock')
	) as string;
	console.log(code);
});

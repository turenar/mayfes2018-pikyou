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

export var code = '';

Blockly.addChangeListener(function(event) {
	code = Blockly.JavaScript.workspaceToCode(workspacePlayground);
	console.log(code);
});

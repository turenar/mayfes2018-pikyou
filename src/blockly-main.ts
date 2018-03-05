import * as Blockly from 'node-blockly/browser';
import * as Ja from 'node-blockly/lib/i18n/ja';
import './block-definitions';
import { blockset0 } from './blocks';

Blockly.setLocale(Ja);

var toolbox = blockset0;

var workspacePlayground = Blockly.inject('blocklyDiv', {
	toolbox: toolbox
});

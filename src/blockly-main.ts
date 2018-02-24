import * as Blockly from 'node-blockly/browser';
import * as Ja from 'node-blockly/lib/i18n/ja';

Blockly.setLocale(Ja);

var workspacePlayground = Blockly.inject('blocklyDiv', {
	toolbox: document.getElementById('toolbox')
});

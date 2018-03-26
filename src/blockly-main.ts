import * as Blockly from 'node-blockly/browser';
import * as Ja from 'node-blockly/lib/i18n/ja';
import './block-definitions';
import './code-generators';
import { blockset0 } from './blocks';

Blockly.setLocale(Ja);

const toolbox = blockset0;

const xml = document.createElement('xml');
xml.id = 'startBlock';
const block = document.createElement('block');
block.setAttribute('type', 'execute');
xml.appendChild(block);

const element = document.getElementsByTagName('body')[0];
element.insertBefore(xml, element.firstChild);

const workspacePlayground = Blockly.inject('blocklyDiv', {
	toolbox: toolbox,
});

Blockly.Xml.domToWorkspace(document.getElementById('startBlock'), workspacePlayground);

export var code = '';


Blockly.addChangeListener(function(event) {
	code = Blockly.JavaScript.workspaceToCode(workspacePlayground);
	console.log(code);
});

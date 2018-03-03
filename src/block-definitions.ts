import * as Blockly from 'node-blockly/browser';

//move_forward
Blockly.Blocks['move_forward'] = {
	init: function() {
		this.appendDummyInput().appendField('前に進む');
		this.setNextStatement(true);
		this.setPreviousStatement(true);
		this.setOutput(false);
		this.setColour(160);
		this.setTooltip('キャラクターが前に進みます。');
	}
};

//move_back

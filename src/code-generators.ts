import * as Blockly from 'node-blockly/browser';

Blockly.JavaScript['move_forward'] = function(block: Blockly.Block) {
	const code = 'character.moveForward();';
	return code;
};

Blockly.JavaScript['set_direction'] = function(block: Blockly.Block) {
	const direction = block.getFieldValue('DIRECTION');
	const code = `character.setDirection('${direction}');`;
	return code;
};

Blockly.JavaScript['stop'] = function(block: Blockly.Block) {
	const code = 'character.stop()';
	return code;
};

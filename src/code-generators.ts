import * as Blockly from 'node-blockly/browser';

Blockly.JavaScript['execute'] = function(block: Blockly.Block) {
	const code = '"以下のコードを実行します";\n';
	return code;
};

Blockly.JavaScript['move_forward'] = function(block: Blockly.Block) {
	const code = 'this.moveForward();\n';
	return code;
};

Blockly.JavaScript['set_direction'] = function(block: Blockly.Block) {
	const direction = block.getFieldValue('DIRECTION');
	const code = `this.setDirection('${direction}');\n`;
	return code;
};

Blockly.JavaScript['stop'] = function(block: Blockly.Block) {
	const code = 'this.stop();\n';
	return code;
};

Blockly.JavaScript['check_movable'] = function(block: Blockly.Block) {
	const direction = block.getFieldValue('DIRECTION');
	const code = `this.canMoveNext('${direction}')`;
	return [code, (Blockly.JavaScript as any).ORDER_MEMBER];
};

Blockly.JavaScript['check_wall_front'] = function(block: Blockly.Block) {
	const code = '!this.canMoveNext(this.direction)';
	return [code, (Blockly.JavaScript as any).ORDER_MEMBER];
}
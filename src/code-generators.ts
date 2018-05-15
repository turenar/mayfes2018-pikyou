import * as Blockly from 'node-blockly/browser';
import MapChip from './enchant/map-chip';

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

Blockly.JavaScript['set_jump'] = function(block: Blockly.Block) {
	const code = 'this.setJump();\n';
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
	const code = '!this.canMoveNext(this.world.character.direction)';
	return [code, (Blockly.JavaScript as any).ORDER_MEMBER];
};

Blockly.JavaScript['check_obstacle'] = function(block: Blockly.Block) {
	const code = `(this.getFrontTile() === ${MapChip.Pitfall})`;
	return [code, (Blockly.JavaScript as any).ORDER_MEMBER];
};

Blockly.JavaScript['check_item'] = function(block: Blockly.Block) {
	const itemKind = block.getFieldValue('ITEMKIND');
	const mapchip = itemKind === 'KEY' ? MapChip.Key : MapChip.Chest;
	const code = `(this.getFeetTile() === ${mapchip})`;
	return [code, (Blockly.JavaScript as any).ORDER_MEMBER];
};

Blockly.JavaScript['check_possession'] = function(block: Blockly.Block) {
	const itemKind = block.getFieldValue('ITEMKIND').toLowerCase();
	const code = `this.isHavingItem('${itemKind}')`;
	return [code, (Blockly.JavaScript as any).ORDER_MEMBER];
};

Blockly.JavaScript['check_mark'] = function(block: Blockly.Block) {
	const markColor = block.getFieldValue('MARKCOLOR');
	let mark;
	if (markColor === 'RED') {
		mark = MapChip.MarkRed;
	}
	if (markColor === 'BLUE') {
		mark = MapChip.MarkBlue;
	}
	if (markColor === 'GREEN') {
		mark = MapChip.MarkGreen;
	}
	if (markColor === 'YELLOW') {
		mark = MapChip.MarkYellow;
	}

	const code = `(this.getFeetTile() === ${mark})`;
	return [code, (Blockly.JavaScript as any).ORDER_MEMBER];
};

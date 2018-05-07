import * as Blockly from 'node-blockly/browser';

//execute:最初から置いておくブロック
Blockly.Blocks['execute'] = {
	init: function() {
		this.jsonInit({
			type: 'Execution',
			message0: 'この下につながっている処理を実行します',
		});
		this.setNextStatement(true);
		this.moveBy(20, 20);
		this.setMovable(false);
		this.setColour(this.color);
		this.setTooltip('この下に連なる処理が実行されます');
	},
	color: 300,
	cost: 0,
};

//controls_if
Blockly.Blocks['controls_if'] = {
	...Blockly.Blocks['controls_if'],
	color: '#5b80a5',
	cost: 5,
};

//logic_operation
Blockly.Blocks['logic_operation'] = {
	...Blockly.Blocks['logic_operation'],
	color: '#5b80a5',
	cost: 0,
};

//move forward
Blockly.Blocks['move_forward'] = {
	init: function() {
		this.jsonInit({
			type: 'Move',
			message0: '進む',
		});
		this.setNextStatement(true);
		this.setPreviousStatement(true);
		this.setOutput(false);
		this.setColour(this.color);
		this.setTooltip('キャラクターが移動を始めます');
	},
	color: 180,
	cost: 50,
};

//set direction
Blockly.Blocks['set_direction'] = {
	init: function() {
		this.setOutput(false);
		this.jsonInit({
			type: 'Move',
			message0: '%1 を 向く',
			args0: [
				{
					type: 'field_dropdown',
					name: 'DIRECTION',
					options: [['東', 'east'], ['西', 'west'], ['南', 'south'], ['北', 'north']],
				},
			],
		});
		this.setNextStatement(true);
		this.setPreviousStatement(true);
		this.setOutput(false);
		this.setColour(this.color);
		this.setTooltip('キャラクターの向きを変更します');
	},
	color: 180,
	cost: 0,
};

//set jump
Blockly.Blocks['set_jump'] = {
	init: function() {
		this.jsonInit({
			type: 'Act',
			message0: 'ジャンプする',
		});
		this.setNextStatement(true);
		this.setPreviousStatement(true);
		this.setOutput(false);
		this.setColour(this.color);
		this.setTooltip('進むときにジャンプして1マス飛び越えます');
	},
	color: 180,
	cost: 10,
};

//check movable
Blockly.Blocks['check_movable'] = {
	init: function() {
		this.jsonInit({
			type: 'Check',
			message0: '%1 に 進める',
			args0: [
				{
					type: 'field_dropdown',
					name: 'DIRECTION',
					options: [['東', 'east'], ['西', 'west'], ['南', 'south'], ['北', 'north']],
				},
			],
		});
		this.setNextStatement(false);
		this.setPreviousStatement(false);
		this.setOutput(true);
		this.setColour(this.color);
		this.setTooltip('特定の方向に進むことができるかを返します');
	},
	color: 80,
	cost: 1,
};

//check wall
Blockly.Blocks['check_wall_front'] = {
	init: function() {
		this.jsonInit({
			type: 'Check',
			message0: '壁にぶつかる',
		});
		this.setNextStatement(false);
		this.setPreviousStatement(false);
		this.setOutput(true);
		this.setColour(this.color);
		this.setTooltip('正面に壁があるかを返します');
	},
	color: 80,
	cost: 1,
};

//check obstacle
Blockly.Blocks['check_obstacle'] = {
	init: function() {
		this.jsonInit({
			type: 'Check',
			message0: '正面に落とし穴がある',
		});
		this.setNextStatement(false);
		this.setPreviousStatement(false);
		this.setOutput(true);
		this.setColour(this.color);
		this.setTooltip('正面に落とし穴があるかを返します');
	},
	color: 80,
	cost: 1,
};

//check item
Blockly.Blocks['check_item'] = {
	init: function() {
		this.jsonInit({
			type: 'Check',
			message0: '%1 がある',
			args0: [
				{
					type: 'field_dropdown',
					name: 'ITEMKIND',
					options: [['鍵', 'KEY'], ['宝箱', 'CHEST']],
				},
			],
		});
		this.setNextStatement(false);
		this.setPreviousStatement(false);
		this.setOutput(true);
		this.setColour(this.color);
		this.setTooltip('足元にアイテムがあるかを返します');
	},
	color: 80,
	cost: 1,
};

//check possession
Blockly.Blocks['check_possession'] = {
	init: function() {
		this.jsonInit({
			type: 'Check',
			message0: '%1 を持っている',
			args0: [
				{
					type: 'field_dropdown',
					name: 'ITEMKIND',
					options: [['鍵', 'KEY'], ['宝箱', 'CHEST']],
				},
			],
		});
		this.setNextStatement(false);
		this.setPreviousStatement(false);
		this.setOutput(true);
		this.setColour(this.color);
		this.setTooltip('アイテムを持っているかを返します');
	},
	color: 80,
	cost: 1,
};

//check mark
Blockly.Blocks['check_mark'] = {
	init: function() {
		this.jsonInit({
			type: 'Check',
			message0: 'マーカー %1 にいる',
			args0: [
				{
					type: 'field_dropdown',
					name: 'MARKCOLOR',
					options: [['赤', 'RED'], ['青', 'BLUE'], ['緑', 'GREEN'], ['黄', 'YELLOW']],
				},
			],
		});
		this.setNextStatement(false);
		this.setPreviousStatement(false);
		this.setOutput(true);
		this.setColour(this.color);
		this.setTooltip('足元に特定のマーカーがあるかを返します');
	},
	color: 80,
	cost: 1,
};

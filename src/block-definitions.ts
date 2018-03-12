import * as Blockly from 'node-blockly/browser';

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
		this.setColour(180);
		this.setTooltip('キャラクターが移動を始めます');
	},
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
					options: [
						['東', 'east'],
						['西', 'west'],
						['南', 'south'],
						['北', 'north'],
					],
				},
			],
		});
		this.setNextStatement(true);
		this.setPreviousStatement(true);
		this.setOutput(false);
		this.setColour(180);
		this.setTooltip('キャラクターの向きを変更します');
	},
};

//move stop
Blockly.Blocks['stop'] = {
	init: function() {
		this.jsonInit({
			type: 'Move',
			message0: '止まる',
		});
		this.setNextStatement(true);
		this.setPreviousStatement(true);
		this.setOutput(false);
		this.setColour(180);
		this.setTooltip('キャラクターが停止します');
	},
};

//act pick
Blockly.Blocks['act_pick'] = {
	init: function() {
		this.jsonInit({
			type: 'Act',
			message0: '拾う',
		});
		this.setNextStatement(true);
		this.setPreviousStatement(true);
		this.setOutput(false);
		this.setColour(120);
		this.setTooltip('足元にあるアイテムを拾います');
	},
};

//act use
Blockly.Blocks['act_use'] = {
	init: function() {
		this.jsonInit({
			type: 'Act',
			message0: 'アイテムを使う',
		});
		this.setNextStatement(true);
		this.setPreviousStatement(true);
		this.setOutput(false);
		this.setColour(120);
		this.setTooltip('所持しているアイテムを使います');
	},
};

//act jump
Blockly.Blocks['act_jump'] = {
	init: function() {
		this.jsonInit({
			type: 'Act',
			message0: 'ジャンプする',
		});
		this.setNextStatement(true);
		this.setPreviousStatement(true);
		this.setOutput(false);
		this.setColour(120);
		this.setTooltip('ジャンプして1マス飛び越えます');
	},
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
					options: [
						['東', 'EAST'],
						['西', 'WEST'],
						['南', 'SOUTH'],
						['北', 'NORTH'],
					],
				},
			],
		});
		this.setNextStatement(false);
		this.setPreviousStatement(false);
		this.setOutput(true);
		this.setColour(80);
		this.setTooltip('特定の方向に進むことができるかを返します');
	},
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
		this.setColour(80);
		this.setTooltip('正面に壁があるかを返します');
	},
};

//check obstacle
Blockly.Blocks['check_obstacle'] = {
	init: function() {
		this.jsonInit({
			type: 'Check',
			message0: '正面に %1',
			args0: [
				{
					type: 'field_dropdown',
					name: 'OBSTACLE',
					options: [['落とし穴', 'PITFALL'], ['その他', 'OTHER']],
				},
			],
		});
		this.setNextStatement(false);
		this.setPreviousStatement(false);
		this.setOutput(true);
		this.setColour(80);
		this.setTooltip('正面に障害物があるかを返します');
	},
};

//check item
Blockly.Blocks['check_item'] = {
	init: function() {
		this.jsonInit({
			type: 'Check',
			message0: 'アイテムがある',
		});
		this.setNextStatement(false);
		this.setPreviousStatement(false);
		this.setOutput(true);
		this.setColour(80);
		this.setTooltip('足元にアイテムがあるかを返します');
	},
};

//check possession
Blockly.Blocks['check_possession'] = {
	init: function() {
		this.jsonInit({
			type: 'Check',
			message0: 'アイテムを持っている',
		});
		this.setNextStatement(false);
		this.setPreviousStatement(false);
		this.setOutput(true);
		this.setColour(80);
		this.setTooltip('アイテムを持っているかを返します');
	},
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
					options: [
						['赤', 'RED'],
						['青', 'BLUE'],
						['緑', 'GREEN'],
						['黄', 'YELLOW'],
					],
				},
			],
		});
		this.setNextStatement(false);
		this.setPreviousStatement(false);
		this.setOutput(true);
		this.setColour(80);
		this.setTooltip('足元に特定のマーカーがあるかを返します');
	},
};

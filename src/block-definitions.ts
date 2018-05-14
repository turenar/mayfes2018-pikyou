import * as Blockly from 'node-blockly/browser';

//execute:最初から置いておくブロック
Blockly.Blocks['execute'] = {
	init: function() {
		this.jsonInit({
			type: 'Execution',
			message0: '少年がこの下につながった動きをくりかえします',
		});
		this.setNextStatement(true);
		this.moveBy(20, 20);
		this.setMovable(false);
		this.setDeletable(false);
		this.setColour(this.color);
		this.setTooltip('少年はこの下につながった動きをくりかえします');
	},
	color: 300,
	cost: 0,
};

//controls_if
Blockly.Blocks['controls_if'] = {
	init: function () {
		this.jsonInit({
			type: "controls_if",
			message0: "もしも %1",
			args0: [
				{
					"type": "input_value",
					"name": "IF0",
					"check": "Boolean"
				}
			],
			message1: "ならば %1",
			args1: [
				{
					"type": "input_statement",
					"name": "DO0"
				}
			],
			previousStatement: null,
			nextStatement: null,
			colour: "%{BKY_LOGIC_HUE}",
			helpUrl: "%{BKY_CONTROLS_IF_HELPURL}",
			mutator: "controls_if_mutator",
			extensions: ["controls_if_tooltip"]
		});
		this.setTooltip('「もしも」のチェックが正しければ、「ならば」の行動をします');
	},
	color: '#5b80a5',
	costIf: 5,
	costElseIf: 3,
	costElse: 3,
};

//controls_if mutator1
Blockly.Blocks['controls_if_if'] = {
	init: function () {
		this.jsonInit({
			type: "controls_if_if",
			message0: "もしも",
			nextStatement: null,
			enableContextMenu: false,
			colour: "%{BKY_LOGIC_HUE}",
			tooltip: "この下に左のブロックを加えて、いろんなチェックを作ろう"
		});
	},
};

//controls_if mutator2
Blockly.Blocks['controls_if_elseif'] = {
	init: function () {
		this.jsonInit({
			type: "controls_if_elseif",
			message0: "それ以外でもしも",
			previousStatement: null,
			nextStatement: null,
			enableContextMenu: false,
			colour: "%{BKY_LOGIC_HUE}",
			tooltip: "１つ前のチェックではもれたけれど、もしも…"
		});
	},
};

//controls_if mutator3
Blockly.Blocks['controls_if_else'] = {
	init: function () {
		this.jsonInit({
			type: "controls_if_else",
			message0: "その他",
			previousStatement: null,
			enableContextMenu: false,
			colour: "%{BKY_LOGIC_HUE}",
			tooltip: "ここまでの「もしも」が全部当てはまらない時"
		});
	},
};

//logic_operation
Blockly.Blocks['logic_operation'] = {
	...Blockly.Blocks['logic_operation'],
	init: function(){
		this.jsonInit({
			type: "logic_operation",
			message0: "%1 %2 %3",
			args0: [
			  {
				"type": "input_value",
				"name": "A",
				"check": "Boolean"
			  },
			  {
				"type": "field_dropdown",
				"name": "OP",
				"options": [
				  ["%{BKY_LOGIC_OPERATION_AND}", "AND"],
						["%{BKY_LOGIC_OPERATION_OR}", "OR"]
					]
				},
				{
					"type": "input_value",
					"name": "B",
					"check": "Boolean"
				}
			],
			inputsInline: true,
			output: "Boolean",
			colour: "%{BKY_LOGIC_HUE}",
			helpUrl: "%{BKY_LOGIC_OPERATION_HELPURL}",
			extensions: ["logic_op_tooltip"]
		});
		this.setTooltip('２つのチェックを同時に考えることができます');
	},
	color: '#5b80a5',
	cost: 2,
};

//logic_negate
Blockly.Blocks['logic_negate'] = {
	...Blockly.Blocks['logic_negate'],
	color: '#5b80a5',
	cost: 0,
};

//move forward
Blockly.Blocks['move_forward'] = {
	init: function() {
		this.jsonInit({
			type: 'Move',
			message0: '１マスすすむ',
		});
		this.setNextStatement(true);
		this.setPreviousStatement(true);
		this.setOutput(false);
		this.setColour(this.color);
		this.setTooltip('少年が向いている方向に１マスすすみます');
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
					options: [['→', 'east'], ['←', 'west'], ['↓', 'south'], ['↑', 'north']],
				},
			],
		});
		this.setNextStatement(true);
		this.setPreviousStatement(true);
		this.setOutput(false);
		this.setColour(this.color);
		this.setTooltip('少年が矢印の方向を向きます');
	},
	color: 180,
	cost: 0,
};

//set jump
Blockly.Blocks['set_jump'] = {
	init: function() {
		this.jsonInit({
			type: 'Act',
			message0: 'ジャンプ',
		});
		this.setNextStatement(true);
		this.setPreviousStatement(true);
		this.setOutput(false);
		this.setColour(this.color);
		this.setTooltip('次の「すすむ」で少年がジャンプします');
	},
	color: 180,
	cost: 10,
};

//check movable
Blockly.Blocks['check_movable'] = {
	init: function() {
		this.jsonInit({
			type: 'Check',
			message0: '%1 に カベ、トビラがない',
			args0: [
				{
					type: 'field_dropdown',
					name: 'DIRECTION',
					options: [['→', 'east'], ['←', 'west'], ['↓', 'south'], ['↑', 'north']],
				},
			],
		});
		this.setNextStatement(false);
		this.setPreviousStatement(false);
		this.setOutput(true);
		this.setColour(this.color);
		this.setTooltip('決めた方向の１マス先にすすめるかチェックします');
	},
	color: 80,
	cost: 1,
};

//check wall
Blockly.Blocks['check_wall_front'] = {
	init: function() {
		this.jsonInit({
			type: 'Check',
			message0: '目の前にカベやトビラがある',
		});
		this.setNextStatement(false);
		this.setPreviousStatement(false);
		this.setOutput(true);
		this.setColour(this.color);
		this.setTooltip('少年が向いている方向の１マス先にカベがあるかチェックします');
	},
	color: 80,
	cost: 1,
};

//check obstacle
Blockly.Blocks['check_obstacle'] = {
	init: function() {
		this.jsonInit({
			type: 'Check',
			message0: '目の前に落とし穴がある',
		});
		this.setNextStatement(false);
		this.setPreviousStatement(false);
		this.setOutput(true);
		this.setColour(this.color);
		this.setTooltip('少年が向いている方向の１マス先に落とし穴があるかチェックします');
	},
	color: 80,
	cost: 1,
};

//check item
Blockly.Blocks['check_item'] = {
	init: function() {
		this.jsonInit({
			type: 'Check',
			message0: '%1 を見つけた',
			args0: [
				{
					type: 'field_dropdown',
					name: 'ITEMKIND',
					options: [['カギ', 'KEY'], ['オタカラ', 'CHEST']],
				},
			],
		});
		this.setNextStatement(false);
		this.setPreviousStatement(false);
		this.setOutput(true);
		this.setColour(this.color);
		this.setTooltip('少年がアイテムのあるマスに入っているかチェックします');
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
					options: [['カギ', 'KEY'], ['オタカラ', 'CHEST']],
				},
			],
		});
		this.setNextStatement(false);
		this.setPreviousStatement(false);
		this.setOutput(true);
		this.setColour(this.color);
		this.setTooltip('少年がアイテムを持っているかチェックします');
	},
	color: 80,
	cost: 1,
};

//check mark
Blockly.Blocks['check_mark'] = {
	init: function() {
		this.jsonInit({
			type: 'Check',
			message0: '%1 マーカーにいる',
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
		this.setTooltip('少年がある色のマーカーの上にいるかチェックします');
	},
	color: 80,
	cost: 1,
};

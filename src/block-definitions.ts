import * as Blockly from 'node-blockly/browser';

//execute:最初から置いておくブロック
Blockly.Blocks['execute'] = {
	init: function() {
		this.jsonInit({
			type: 'Execution',
			message0: 'この中につなげた動きがくり返されます。現在の総コスト: %1',
			message1: '%1',
			args0: [
				{
					type: "field_label",
					name: "blockCost",
					text: '0',
				}
			],
			args1: [
				{
					type: 'input_statement',
					name: 'DO0',
				},
			],
		});
		this.setNextStatement(false);
		this.moveBy(20, 20);
		this.setMovable(false);
		this.setDeletable(false);
		this.setColour(this.color);
		this.setTooltip('この中につなげた動きがくり返されます');
	},
	color: 300,
	cost: 0,
};

var CONTROLS_IF_MUTATOR_MIXIN_AFTER;
CONTROLS_IF_MUTATOR_MIXIN_AFTER = {
	elseifCount_: 0,
	elseCount_: 0,

	mutationToDom: function() {
		if (!this.elseifCount_ && !this.elseCount_) {
			return null;
		}
		var container = document.createElement('mutation');
		if (this.elseifCount_) {
			container.setAttribute('elseif', this.elseifCount_);
		}
		if (this.elseCount_) {
			container.setAttribute('else', '1');
		}
		return container;
	},

	domToMutation: function(xmlElement) {
		this.elseifCount_ = parseInt(xmlElement.getAttribute('elseif'), 10) || 0;
		this.elseCount_ = parseInt(xmlElement.getAttribute('else'), 10) || 0;
		this.updateShape_();
	},

	decompose: function(workspace) {
		var containerBlock = workspace.newBlock('controls_if_if');
		containerBlock.initSvg();
		var connection = containerBlock.nextConnection;
		for (var i = 1; i <= this.elseifCount_; i++) {
			var elseifBlock = workspace.newBlock('controls_if_elseif');
			elseifBlock.initSvg();
			connection.connect(elseifBlock.previousConnection);
			connection = elseifBlock.nextConnection;
		}
		if (this.elseCount_) {
			var elseBlock = workspace.newBlock('controls_if_else');
			elseBlock.initSvg();
			connection.connect(elseBlock.previousConnection);
		}
		return containerBlock;
	},

	compose: function(containerBlock) {
		var clauseBlock = containerBlock.nextConnection.targetBlock();
		// Count number of inputs.
		this.elseifCount_ = 0;
		this.elseCount_ = 0;
		var valueConnections = [null];
		var statementConnections = [null];
		var elseStatementConnection = null;
		while (clauseBlock) {
			switch (clauseBlock.type) {
			case 'controls_if_elseif':
				this.elseifCount_++;
				valueConnections.push(clauseBlock.valueConnection_);
				statementConnections.push(clauseBlock.statementConnection_);
				break;
			case 'controls_if_else':
				this.elseCount_++;
				elseStatementConnection = clauseBlock.statementConnection_;
				break;
			default:
				throw 'Unknown block type.';
			}
			clauseBlock = clauseBlock.nextConnection && clauseBlock.nextConnection.targetBlock();
		}
		this.updateShape_();
		// Reconnect any child blocks.
		for (var i = 1; i <= this.elseifCount_; i++) {
			Blockly.Mutator.reconnect(valueConnections[i], this, 'IF' + i);
			Blockly.Mutator.reconnect(statementConnections[i], this, 'DO' + i);
		}
		Blockly.Mutator.reconnect(elseStatementConnection, this, 'ELSE');
	},

	saveConnections: function(containerBlock) {
		var clauseBlock = containerBlock.nextConnection.targetBlock();
		var i = 1;
		while (clauseBlock) {
			var inputDo;
			switch (clauseBlock.type) {
			case 'controls_if_elseif':
				var inputIf = this.getInput('IF' + i);
				inputDo = this.getInput('DO' + i);
				clauseBlock.valueConnection_ = inputIf && inputIf.connection.targetConnection;
				clauseBlock.statementConnection_ = inputDo && inputDo.connection.targetConnection;
				i++;
				break;
			case 'controls_if_else':
				inputDo = this.getInput('ELSE');
				clauseBlock.statementConnection_ = inputDo && inputDo.connection.targetConnection;
				break;
			default:
				throw 'Unknown block type.';
			}
			clauseBlock = clauseBlock.nextConnection && clauseBlock.nextConnection.targetBlock();
		}
	},

	updateShape_: function() {
		// Delete everything.
		if (this.getInput('ELSE')) {
			this.removeInput('ELSE');
		}
		var i = 1;
		while (this.getInput('IF' + i)) {
			this.removeInput('IF' + i);
			this.removeInput('DO' + i);
			i++;
		}
		// Rebuild block.
		for (i = 1; i <= this.elseifCount_; i++) {
			this.appendValueInput('IF' + i)
				.setCheck('Boolean')
				.appendField('その他でもしも');
			this.appendStatementInput('DO' + i).appendField('ならば');
		}
		if (this.elseCount_) {
			this.appendStatementInput('ELSE').appendField('その他ならば');
		}
	},
};
Blockly.Extensions.registerMutator('controls_if_mutator_after', CONTROLS_IF_MUTATOR_MIXIN_AFTER, null, [
	'controls_if_elseif',
	'controls_if_else',
]);

//controls_if
Blockly.Blocks['controls_if'] = {
	init: function() {
		this.jsonInit({
			type: 'controls_if',
			message0: 'もしも %1',
			args0: [
				{
					type: 'input_value',
					name: 'IF0',
					check: 'Boolean',
				},
			],
			message1: 'ならば %1',
			args1: [
				{
					type: 'input_statement',
					name: 'DO0',
				},
			],
			previousStatement: null,
			nextStatement: null,
			colour: '%{BKY_LOGIC_HUE}',
			helpUrl: '%{BKY_CONTROLS_IF_HELPURL}',
			mutator: 'controls_if_mutator_after',
			extensions: ['controls_if_tooltip'],
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
	init: function() {
		this.jsonInit({
			type: 'controls_if_if',
			message0: 'もしも',
			nextStatement: null,
			enableContextMenu: false,
			colour: '%{BKY_LOGIC_HUE}',
			tooltip: 'この下に左のブロックを加えて、ふくざつなチェックができます',
		});
	},
};

//controls_if mutator2
Blockly.Blocks['controls_if_elseif'] = {
	init: function() {
		this.jsonInit({
			type: 'controls_if_elseif',
			message0: 'それ以外でもしも',
			previousStatement: null,
			nextStatement: null,
			enableContextMenu: false,
			colour: '%{BKY_LOGIC_HUE}',
			tooltip: '１つ前の「もしも」に当てはらない場合に、他の「もしも」をチェックします',
		});
	},
};

//controls_if mutator3
Blockly.Blocks['controls_if_else'] = {
	init: function() {
		this.jsonInit({
			type: 'controls_if_else',
			message0: 'その他',
			previousStatement: null,
			enableContextMenu: false,
			colour: '%{BKY_LOGIC_HUE}',
			tooltip: 'ここまでの「もしも」が全て当てはまらない場合を考えます',
		});
	},
};

//logic_operation
Blockly.Blocks['logic_operation'] = {
	...Blockly.Blocks['logic_operation'],
	init: function() {
		this.jsonInit({
			type: 'logic_operation',
			message0: '%1 %2 %3',
			args0: [
				{
					type: 'input_value',
					name: 'A',
					check: 'Boolean',
				},
				{
					type: 'field_dropdown',
					name: 'OP',
					options: [['%{BKY_LOGIC_OPERATION_AND}', 'AND'], ['%{BKY_LOGIC_OPERATION_OR}', 'OR']],
				},
				{
					type: 'input_value',
					name: 'B',
					check: 'Boolean',
				},
			],
			inputsInline: true,
			output: 'Boolean',
			colour: '%{BKY_LOGIC_HUE}',
			helpUrl: '%{BKY_LOGIC_OPERATION_HELPURL}',
			extensions: ['logic_op_tooltip'],
		});
		this.setTooltip('２つのチェックを同時に考えることができます');
	},
	color: '#5b80a5',
	cost: 2,
};

//logic_negate
Blockly.Blocks['logic_negate'] = {
	...Blockly.Blocks['logic_negate'],
	init: function() {
		this.jsonInit({
			type: 'logic_negate',
			message0: '%{BKY_LOGIC_NEGATE_TITLE}',
			args0: [
				{
					type: 'input_value',
					name: 'BOOL',
					check: 'Boolean',
				},
			],
			output: 'Boolean',
			colour: '%{BKY_LOGIC_HUE}',
			tooltip: '%{BKY_LOGIC_NEGATE_TOOLTIP}',
			helpUrl: '%{BKY_LOGIC_NEGATE_HELPURL}',
		});
		this.setTooltip('チェックの成功と失敗を入れかえることができます');
	},
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
		this.setTooltip('１マスすすみます');
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
		this.setTooltip('矢印の方向を向きます');
	},
	color: 180,
	cost: 0,
};

//set jump
Blockly.Blocks['set_jump'] = {
	init: function() {
		this.jsonInit({
			type: 'Act',
			message0: '次にすすむ時ジャンプする',
		});
		this.setNextStatement(true);
		this.setPreviousStatement(true);
		this.setOutput(false);
		this.setColour(this.color);
		this.setTooltip('次の「１マスすすむ」で落とし穴などをとびこえます');
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
		this.setTooltip('矢印の向きの１マス先にすすめるかチェックします');
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
		this.setTooltip('正面の１マス先にカベ、トビラがあるかチェックします');
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
		this.setTooltip('正面の１マス先に落とし穴があるかチェックします');
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
		this.setTooltip('今アイテムを取ったところかどうかチェックします');
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
		this.setTooltip('アイテムを持っているかチェックします');
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
		this.setTooltip('選んだ色のマーカーの上にいるかチェックします');
	},
	color: 80,
	cost: 1,
};

import * as Blockly from 'node-blockly/browser';

//execute:最初から置いておくブロック
Blockly.Blocks['execute'] = {
	init: function() {
		this.jsonInit({
			type: 'Execution',
			message0: 'この中につなげた動きがくり返されます。所持ゴールド: %1',
			message1: '%1',
			args0: [
				{
					type: 'field_label',
					name: 'balance',
					text: '0',
				},
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

const CONTROLS_IF_MUTATOR_MIXIN_AFTER = {
	elseifCount_: 0,
	elseCount_: 0,

	mutationToDom: function() {
		if (!this.elseifCount_ && !this.elseCount_) {
			return null;
		}
		const container = document.createElement('mutation');
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
		const containerBlock = workspace.newBlock('controls_if_if');
		containerBlock.initSvg();
		let connection = containerBlock.nextConnection;
		for (let i = 1; i <= this.elseifCount_; i++) {
			const elseifBlock = workspace.newBlock('controls_if_elseif');
			elseifBlock.initSvg();
			connection.connect(elseifBlock.previousConnection);
			connection = elseifBlock.nextConnection;
		}
		if (this.elseCount_) {
			const elseBlock = workspace.newBlock('controls_if_else');
			elseBlock.initSvg();
			connection.connect(elseBlock.previousConnection);
		}
		return containerBlock;
	},

	compose: function(containerBlock) {
		let clauseBlock = containerBlock.nextConnection.targetBlock();
		// Count number of inputs.
		this.elseifCount_ = 0;
		this.elseCount_ = 0;
		const valueConnections = [null];
		const statementConnections = [null];
		let elseStatementConnection = null;
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
		for (let i = 1; i <= this.elseifCount_; i++) {
			Blockly.Mutator.reconnect(valueConnections[i], this, 'IF' + i);
			Blockly.Mutator.reconnect(statementConnections[i], this, 'DO' + i);
		}
		Blockly.Mutator.reconnect(elseStatementConnection, this, 'ELSE');
	},

	saveConnections: function(containerBlock) {
		let clauseBlock = containerBlock.nextConnection.targetBlock();
		let i = 1;
		let inputIf;
		while (clauseBlock) {
			let inputDo;
			switch (clauseBlock.type) {
			case 'controls_if_elseif':
				inputIf = this.getInput('IF' + i);
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
		let i = 1;
		while (this.getInput('IF' + i)) {
			this.removeInput('IF' + i);
			this.removeInput('DO' + i);
			i++;
		}
		// Rebuild block.
		let mutatorCount = 0;
		for (i = 1; i <= this.elseifCount_; i++) {
			this.appendValueInput('IF' + i)
				.setCheck('Boolean')
				.appendField('その他でもしも');
			this.appendStatementInput('DO' + i).appendField('ならば');
			mutatorCount++;
		}
		if (this.elseCount_) {
			this.appendStatementInput('ELSE').appendField('その他ならば');
			mutatorCount++;
		}
		this.setTooltip(
			`自分で決めたチェックのうち、当てはまっている行動をします\nねだん：${5 + mutatorCount * 3}ゴールド`
		);
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
		this.setTooltip('「もしも」のチェックが正しければ、「ならば」の行動をします\nねだん：5ゴールド');
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
			message0: 'その他でもしも',
			previousStatement: null,
			nextStatement: null,
			enableContextMenu: false,
			colour: '%{BKY_LOGIC_HUE}',
			tooltip:
				'１つ前の「もしも」に当てはらない場合に、他の「もしも」をチェックします\n「もしも」ブロックのねだんがプラス3されます',
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
			tooltip: 'ここまでの「もしも」が全て当てはまらない場合を考えます\n「もしも」ブロックのねだんがプラス3されます',
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
		this.setTooltip('２つのチェックを同時に考えることができます\nねだん：2ゴールド');
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
		this.setTooltip('チェックの成功と失敗を入れかえることができます\nねだん：0ゴールド');
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
		this.setTooltip('１マスすすみます\nねだん：50ゴールド');
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
		this.setTooltip('矢印の方向を向きます\nねだん：0ゴールド');
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
		this.setTooltip('次の「１マスすすむ」で落とし穴などをとびこえます\nねだん：10ゴールド');
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
		this.setTooltip('矢印の向きの１マス先にすすめるかチェックします\nねだん：1ゴールド');
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
		this.setTooltip('正面の１マス先にカベ、トビラがあるかチェックします\nねだん：1ゴールド');
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
		this.setTooltip('正面の１マス先に落とし穴があるかチェックします\nねだん：1ゴールド');
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
		this.setTooltip('今アイテムを取ったところかどうかチェックします\nねだん：1ゴールド');
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
		this.setTooltip('アイテムを持っているかチェックします\nねだん：1ゴールド');
	},
	color: 80,
	cost: 1,
};

//check mark
Blockly.Blocks['check_mark'] = {
	init: function() {
		this.jsonInit({
			type: 'Check',
			message0: '%1 にいる',
			args0: [
				{
					type: 'field_dropdown',
					name: 'MARKCOLOR',
					options: [
						[{ src: 'blockly-img/mark_red.png', width: 12, height: 12, alt: '赤マーカー' }, 'RED'],
						[{ src: 'blockly-img/mark_blue.png', width: 12, height: 12, alt: '青マーカー' }, 'BLUE'],
						[{ src: 'blockly-img/mark_green.png', width: 12, height: 12, alt: '緑マーカー' }, 'GREEN'],
						[{ src: 'blockly-img/mark_yellow.png', width: 12, height: 12, alt: '黄マーカー' }, 'YELLOW'],
					],
				},
			],
		});
		this.setNextStatement(false);
		this.setPreviousStatement(false);
		this.setOutput(true);
		this.setColour(this.color);
		this.setTooltip('選んだ色のマーカーの上にいるかチェックします\nねだん：1ゴールド');
	},
	color: 80,
	cost: 1,
};

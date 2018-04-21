import MapChip from './enchant/mapchip';
import { CharacterPosition } from './character';

export type Stage = {
	map: MapChip[][];
	name: string;
	description: string;
	characterInitialPosition: CharacterPosition;
};

const stages: Stage[] = [
	{
		map: [
			[1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
			[1, 7, 2, 2, 2, 2, 6, 2, 11, 1],
			[1, 2, 1, 1, 1, 1, 2, 1, 1, 1],
			[1, 2, 1, 1, 1, 1, 2, 1, 1, 1],
			[1, 2, 1, 1, 2, 1, 2, 1, 1, 1],
			[1, 8, 1, 1, 2, 1, 2, 1, 1, 1],
			[1, 2, 1, 1, 2, 1, 2, 1, 1, 1],
			[1, 2, 1, 1, 2, 1, 2, 1, 1, 1],
			[1, 3, 10, 2, 2, 2, 5, 2, 9, 1],
			[1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
		],
		name: 'まっすぐ進む',
		description: '基本的な操作に慣れよう',
		characterInitialPosition: {
			mapPoint_x: 5,
			mapPoint_y: 5,
			direction: 'south',
		},
	},
	{
		map: [
			[1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
			[1, 7, 2, 2, 2, 2, 6, 2, 11, 1],
			[1, 2, 1, 1, 1, 1, 2, 1, 1, 1],
			[1, 2, 1, 1, 1, 1, 2, 1, 1, 1],
			[1, 2, 1, 1, 2, 1, 2, 1, 1, 1],
			[1, 8, 1, 1, 1, 1, 2, 1, 1, 1],
			[1, 2, 1, 1, 2, 1, 2, 1, 1, 1],
			[1, 2, 1, 1, 2, 1, 2, 1, 1, 1],
			[1, 3, 10, 2, 4, 2, 5, 2, 9, 1],
			[1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
		],
		name: '曲がる',
		description: '曲がるという操作を覚えよう',
		characterInitialPosition: {
			mapPoint_x: 5,
			mapPoint_y: 5,
			direction: 'south',
		},
	},
];

export default stages;

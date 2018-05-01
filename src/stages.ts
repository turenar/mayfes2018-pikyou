import MapChip from './enchant/map-chip';
import { CharacterPosition } from './character';

export type Stage = {
	map: MapChip[][];
	name: string;
	description: string;
	characterInitialPosition: CharacterPosition;
	clearPoint: number;
};

const stages: Stage[] = [
	{
		map: [
			[1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1, 1],
			[1, 21, 22, 22, 22, 22, 22, 22, 22, 22, 23, 1],
			[1, 24,  7,  2,  2,  2,  2,  6,  2, 11, 26, 1],
			[1, 24,  2, 30, 28, 28, 31,  2, 30, 28, 29, 1],
			[1, 24,  2, 26, 21, 22, 44,  2, 26, 25, 25, 1],
			[1, 24,  2, 26, 24,  2, 42,  2, 26, 25, 25, 1],
			[1, 24,  8, 26, 24,  2, 42,  2, 26, 25, 25, 1],
			[1, 24,  2, 26, 24,  2, 42,  2, 26, 25, 25, 1],
			[1, 24,  2, 32, 33,  8, 43,  2, 32, 22, 23, 1],
			[1, 24,  3, 10,  2,  2,  2,  5,  2,  9, 26, 1],
			[1, 27, 28, 28, 28, 28, 28, 28, 28, 28, 29, 1],
			[1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1, 1],
		],
		name: 'まっすぐ進む',
		description: '基本的な操作に慣れよう',
		characterInitialPosition: {
			mapPoint_x: 6,
			mapPoint_y: 6,
			direction: 'south',
		},
		clearPoint: 200,
	},
	{
		map: [
			[1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1, 1],
			[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
			[1, 1, 7, 2, 2, 2, 2, 6, 2, 11, 1, 1],
			[1, 1, 2, 1, 1, 1, 1, 2, 1, 1, 1, 1],
			[1, 1, 2, 1, 1, 1, 1, 2, 1, 1, 1, 1],
			[1, 1, 2, 1, 1, 2, 1, 2, 1, 1, 1, 1],
			[1, 1, 8, 1, 1, 1, 1, 2, 1, 1, 1, 1],
			[1, 1, 2, 1, 1, 2, 1, 2, 1, 1, 1, 1],
			[1, 1, 2, 1, 1, 2, 1, 2, 1, 1, 1, 1],
			[1, 1, 3, 10, 2, 4, 2, 5, 2, 9, 1, 1],
			[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
			[1, 1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1, 1],
		],
		name: '曲がる',
		description: '曲がるという操作を覚えよう',
		characterInitialPosition: {
			mapPoint_x: 6,
			mapPoint_y: 6,
			direction: 'south',
		},
		clearPoint: 100,
	},
];

export default stages;

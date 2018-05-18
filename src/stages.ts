import MapChip from './enchant/map-chip';
import { CharacterPosition } from './character';

export type Stage = {
	map: MapChip[][];
	name: string;
	description: string;
	characterInitialPosition: CharacterPosition;
	clearPoint: number;
	excellentClearNorma: number;
};

const stages: Stage[] = [
	{
		map: [
			[25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25],
			[25, 25, 25, 21, 22, 23, 25, 25, 25, 25, 25, 25],
			[25, 25, 25, 24,  8, 26, 25, 25, 25, 25, 25, 25],
			[25, 25, 25, 24,  2, 26, 25, 25, 25, 25, 25, 25],
			[25, 21, 22, 33,  2, 32, 22, 22, 22, 22, 23, 25],
			[25, 24,  2,  2,  2,  2,  2,  2,  2,  3, 26, 25],
			[25, 27, 28, 28, 28, 31,  2, 30, 28, 28, 29, 25],
			[25, 25, 25, 25, 25, 24,  2, 26, 25, 25, 25, 25],
			[25, 25, 25, 25, 25, 24,  2, 26, 25, 25, 25, 25],
			[25, 25, 25, 25, 25, 24,  8, 26, 25, 25, 25, 25],
			[25, 25, 25, 25, 25, 27, 28, 29, 25, 25, 25, 25],
			[25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25],
		],
		name: 'チュートリアル',
		description: 'キャラクターを動かそう',
		characterInitialPosition: {
			mapPoint_x: 3,
			mapPoint_y: 6,
			direction: 'east',
		},
		clearPoint: 100,
		excellentClearNorma: 90,
	},

	{
		map: [
			[25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25],
			[25, 25, 25, 25, 21, 22, 23, 25, 25, 25, 25, 25],
			[25, 21, 22, 22, 33,  8, 26, 25, 25, 25, 25, 25],
			[25, 24,  8,  2,  2,  2, 32, 22, 22, 22, 23, 25],
			[25, 27, 28, 28, 31,  4,  2,  2,  2,  3, 26, 25],
			[25, 25, 25, 25, 24,  2, 30, 28, 28, 28, 29, 25],
			[25, 25, 25, 25, 24,  2, 32, 22, 22, 23, 25, 25],
			[25, 25, 21, 22, 33,  2,  2,  2,  8, 26, 25, 25],
			[25, 25, 24,  8,  2,  2, 30, 28, 28, 29, 25, 25],
			[25, 25, 27, 28, 31,  2, 26, 25, 25, 25, 25, 25],
			[25, 25, 25, 25, 27, 28, 29, 25, 25, 25, 25, 25],
			[25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25],
		],
		name: '4つの分かれ道',
		description: '進む向きを変えよう',
		characterInitialPosition: {
			mapPoint_x: 6,
			mapPoint_y: 10,
			direction: 'north',
		},
		clearPoint: 120,
		excellentClearNorma: 100,
	},

	{
		map: [
			[21, 22, 22, 22, 22, 22, 22, 22, 22, 22, 23, 25],
			[24,  3,  2,  2,  2,  2,  2,  2,  2,  6, 26, 25],
			[24,  2, 30, 28, 31,  2, 30, 28, 31,  2, 26, 25],
			[24,  2, 26, 25, 24,  2, 26, 25, 24,  2, 26, 25],
			[24,  2, 32, 22, 33,  2, 32, 22, 33,  2, 26, 25],
			[24,  2,  2,  2,  2, 11,  2,  2,  2,  5, 26, 25],
			[27, 28, 28, 28, 28, 28, 28, 28, 31,  2, 26, 25],
			[25, 25, 25, 25, 25, 25, 25, 25, 24,  2, 26, 25],
			[25, 25, 25, 25, 25, 25, 25, 25, 24,  2, 26, 25],
			[21, 22, 22, 22, 22, 22, 22, 22, 33,  2, 32, 23],
			[24,  2,  2,  2,  2,  2,  2,  2,  2,  4,  8, 26],
			[27, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 29],
		],
		name: 'オタカラの発見',
		description: '向きを何度も変えてみよう',
		characterInitialPosition: {
			mapPoint_x: 2,
			mapPoint_y: 11,
			direction: 'east',
		},
		clearPoint: 150,
		excellentClearNorma: 200,
	},

	{
		map: [
			[25, 21, 22, 23, 25, 25, 25, 25, 21, 22, 23, 25],
			[25, 24,  8, 32, 22, 22, 22, 22, 33,  8, 26, 25],
			[25, 24,  5,  2,  8,  2,  8,  2,  8,  6, 26, 25],
			[25, 24,  2, 30, 28, 28, 28, 28, 31,  2, 26, 25],
			[25, 24,  2, 32, 22, 22, 22, 22, 33,  2, 26, 25],
			[25, 24,  2,  8,  2,  8, 11,  8,  2,  2, 26, 25],
			[25, 24,  2, 30, 28, 28, 28, 28, 31,  2, 26, 25],
			[25, 24,  9, 26, 25, 25, 25, 25, 24, 10, 26, 25],
			[25, 24,  2, 26, 25, 25, 25, 25, 24,  2, 26, 25],
			[25, 24,  2, 26, 25, 25, 25, 25, 24,  3, 26, 25],
			[25, 27, 28, 29, 25, 25, 25, 25, 27, 28, 29, 25],
			[25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25],
		],
		name: 'トビラと落とし穴',
		description: '仕掛けに対応しよう',
		characterInitialPosition: {
			mapPoint_x: 3,
			mapPoint_y: 10,
			direction: 'north',
		},
		clearPoint: 160,
		excellentClearNorma: 220,
	},

	{
		map: [
			[21, 22, 23, 21, 22, 23, 25, 21, 22, 50, 22, 23],
			[24,  2, 26, 24,  8, 26, 25, 24,  8, 42,  8, 26],
			[24,  2, 26, 24,  2, 32, 22, 33,  2, 43,  2, 26],
			[24,  2, 26, 24,  2,  2, 11,  2,  2,  2,  2, 26],
			[24,  2, 26, 24,  2, 30, 28, 31,  2, 41,  2, 26],
			[24,  2, 26, 24,  2, 26, 25, 24,  2, 42,  3, 26],
			[24,  2, 26, 24,  2, 26, 25, 24,  2, 42,  2, 26],
			[24,  2, 32, 33,  2, 32, 22, 33,  2, 43,  2, 26],
			[24,  2,  2,  2,  2,  8,  2,  8,  2,  2,  2, 26],
			[24,  2, 30, 31,  2, 30, 28, 31,  2, 41,  2, 26],
			[24,  8, 26, 24,  8, 26, 25, 24,  8, 42,  8, 26],
			[27, 28, 29, 27, 28, 29, 25, 27, 28, 48, 28, 29],
		],
		name: '目印のない道',
		description: 'いろいろな条件を使いこなそう',
		characterInitialPosition: {
			mapPoint_x: 2,
			mapPoint_y: 2,
			direction: 'south',
		},
		clearPoint: 170,
		excellentClearNorma: 225,
	},

	{
		map: [
			[21, 22, 23, 25, 25, 25, 25, 25, 25, 21, 22, 23],
			[24,  8, 26, 25, 25, 25, 25, 25, 25, 24, 11, 26],
			[24,  2, 32, 22, 22, 22, 22, 22, 22, 33,  2, 26],
			[24,  5,  2,  2,  2,  2,  2,  2,  2,  2,  7, 26],
			[24,  2, 30, 31,  2, 30, 39, 35, 35, 36,  2, 26],
			[24,  5, 26, 24,  2, 26, 24,  8,  2,  2,  2, 26],
			[24,  2, 32, 33,  2, 26, 24,  2, 30, 31,  6, 26],
			[24,  2,  2,  2,  8, 26, 24,  2, 32, 33,  2, 26],
			[24,  2, 34, 35, 40, 29, 24,  3,  2,  2,  6, 26],
			[24,  2,  2,  8, 26, 25, 27, 28, 28, 31,  2, 26],
			[24,  2, 30, 28, 29, 25, 25, 25, 25, 24,  8, 26],
			[27, 28, 29, 25, 25, 25, 25, 25, 25, 27, 28, 29],
		],
		name: 'マーカーの選択',
		description: '「かつ」を使ってみよう',
		characterInitialPosition: {
			mapPoint_x: 2,
			mapPoint_y: 11,
			direction: 'north',
		},
		clearPoint: 190,
		excellentClearNorma: 230,
	},

	{
		map: [
			[25, 25, 25, 25, 25, 25, 25, 21, 22, 23, 25, 25],
			[25, 25, 21, 22, 50, 22, 22, 33, 11, 26, 25, 25],
			[25, 25, 24,  2, 42,  3, 10,  2,  6, 26, 25, 25],
			[21, 22, 33,  2, 59, 35, 35, 60,  2, 32, 22, 23],
			[24,  8,  2,  4,  2,  2,  8, 42,  6,  2,  8, 26],
			[49, 35, 36,  2, 34, 35, 35, 58,  2, 34, 35, 51],
			[24,  8,  2,  4,  2,  2,  8,  2,  6,  2,  8, 26],
			[27, 28, 31,  2, 34, 35, 35, 36,  2, 30, 28, 29],
			[25, 25, 24,  4,  2,  2,  2,  2,  9, 26, 25, 25],
			[25, 25, 24,  2, 30, 28, 28, 28, 28, 29, 25, 25],
			[25, 25, 24,  8, 26, 25, 25, 25, 25, 25, 25, 25],
			[25, 25, 27, 28, 29, 25, 25, 25, 25, 25, 25, 25],
		],
		name: '2本の通路',
		description: '「ではない」を使ってみよう',
		characterInitialPosition: {
			mapPoint_x: 4,
			mapPoint_y: 3,
			direction: 'south',
		},
		clearPoint: 190,
		excellentClearNorma: 235,
	},

	{
		map: [
			[25, 25, 25, 25, 25, 25, 25, 21, 22, 23, 25, 25],
			[25, 25, 25, 25, 25, 25, 25, 24,  8, 26, 25, 25],
			[25, 25, 21, 22, 22, 22, 22, 33,  2, 26, 25, 25],
			[25, 25, 24,  4,  2,  2,  2,  2,  4, 26, 25, 25],
			[25, 25, 24,  2, 57,  2, 30, 31,  2, 32, 22, 23],
			[25, 25, 24,  2,  2,  8, 32, 33,  4,  2,  8, 26],
			[25, 25, 24,  2, 30, 31,  8,  2,  2, 30, 28, 29],
			[21, 22, 33,  2, 32, 33,  2, 57,  2, 32, 22, 23],
			[24,  3,  2,  8,  2,  2,  2,  2,  4,  2, 11, 26],
			[27, 28, 31,  2, 30, 28, 28, 31,  2, 30, 28, 29],
			[25, 25, 24,  2, 26, 25, 25, 24,  8, 26, 25, 25],
			[25, 25, 27, 28, 29, 25, 25, 27, 28, 29, 25, 25],
		],
		name: '赤い迷路',
		description: '「もし〜それ以外」を使ってみよう',
		characterInitialPosition: {
			mapPoint_x: 4,
			mapPoint_y: 11,
			direction: 'north',
		},
		clearPoint: 230,
		excellentClearNorma: 240,
	},

	{
		map: [
			[21, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 23],
			[24,  5,  2,  4,  2,  5,  2,  4,  2, 10,  3, 26],
			[24,  2, 41,  2, 41,  2, 41,  2, 30, 31, 10, 26],
			[24,  2, 43,  2, 43,  2, 43,  2, 32, 33, 11, 26],
			[24,  4,  2,  8,  8,  8,  2,  5,  8,  8,  8, 26],
			[24,  2, 57,  2, 57,  2, 57,  2, 34, 36,  2, 26],
			[24,  8,  2,  4,  2,  5,  2,  9,  2,  2,  8, 26],
			[24,  2, 57,  2, 57,  2, 57,  2, 34, 36,  2, 26],
			[24,  8,  2,  5,  2,  4,  2,  8,  2,  2,  5, 26],
			[24,  2, 57,  2, 57,  2, 57,  2, 34, 36,  2, 26],
			[24,  2,  2,  4,  8,  8,  2,  5,  2,  2,  8, 26],
			[27, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 29],
		],
		name: '洞窟探検',
		description: 'ゴールへの行き方を考えよう',
		characterInitialPosition: {
			mapPoint_x: 2,
			mapPoint_y: 11,
			direction: 'north',
		},
		clearPoint: 250,
		excellentClearNorma: 250,
	},

	{
		map: [
			[25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25,25],
			[25, 25, 25, 25, 25, 21, 22, 23, 25, 25, 25,25],
			[25, 25, 25, 21, 22, 33,  8, 26, 25, 25, 25,25],
			[25, 25, 25, 24,  3,  8,  5, 26, 25, 25, 25,25],
			[25, 25, 25, 27, 28, 31,  8, 26, 25, 25, 25,25],
			[25, 25, 25, 25, 25, 24,  2, 32, 23, 25, 25,25],
			[25, 25, 25, 25, 21, 33,  5,  2, 32, 23, 25,25],
			[25, 25, 25, 25, 24,  2,  4,  2, 11, 26, 25,25],
			[25, 25, 25, 21, 33,  2,  2, 34, 35, 51, 25,25],
			[25, 25, 21, 33,  8,  2,  4,  2,  8, 26, 25,25],
			[25, 25, 24,  2,  2,  2,  5,  2,  8, 26, 25,25],
			[25, 25, 27, 28, 28, 28, 28, 28, 28, 29, 25,25],
		],
		name: 'マーカーの道',
		description: 'オタカラをどうやって取るか考えよう',
		characterInitialPosition: {
			mapPoint_x: 4,
			mapPoint_y: 11,
			direction: 'east',
		},
		clearPoint: 260,
		excellentClearNorma: 270,
	},

	{
		map: [
			[25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25,25],
			[25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25,25],
			[25, 21, 22, 22, 22, 22, 50, 22, 22, 22, 22,23],
			[25, 24, 11,  2,  2,  2, 43,  2,  2,  2,  3,26],
			[25, 24,  2,  2,  2,  8,  8,  8,  2,  2,  2,26],
			[25, 27, 31,  2,  8,  4,  2,  6,  8, 34, 40,29],
			[25, 21, 37, 36,  8,  7,  2,  5,  8,  2, 32,23],
			[25, 24,  2,  2,  2,  8,  8,  8,  2,  2,  2,26],
			[25, 24,  2,  2,  2,  2, 41,  2,  2,  2, 11,26],
			[25, 27, 28, 28, 28, 28, 48, 28, 28, 28, 28,29],
			[25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25,25],
			[25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25,25],
		],
		name: '穴の交差点',
		description: '穴はジャンプで飛びこえよう',
		characterInitialPosition: {
			mapPoint_x: 3,
			mapPoint_y: 9,
			direction: 'east',
		},
		clearPoint: 220,
		excellentClearNorma: 280,
	},

	{
		map: [
			[21, 22, 22, 22, 23, 21, 22, 22, 22, 23, 25,25],
			[24,  9,  2,  2, 26, 24,  2,  2,  2, 26, 25,25],
			[24,  2, 41,  2, 32, 33,  2, 57,  2, 26, 25,25],
			[24,  2, 43,  2,  2,  2,  2,  8,  2, 32, 22,23],
			[24,  2,  2,  2, 30, 31,  2,  2,  2,  2,  2,26],
			[27, 31,  2, 30, 29, 27, 31, 11, 41,  2,  2,26],
			[25, 24,  2, 32, 23, 21, 33,  8, 42,  2,  2,26],
			[25, 24,  2,  2, 32, 33,  2,  3, 43,  2,  2,26],
			[21, 37, 36,  2,  2,  2, 10, 41,  2,  2,  2,26],
			[24,  2,  2,  2, 30, 31,  2, 43,  2, 30, 28,29],
			[24,  4,  2,  2, 26, 24,  2,  2,  2, 26, 25,25],
			[27, 28, 28, 28, 29, 27, 28, 28, 28, 29, 25,25],
		],
		name: '果てのオタカラ',
		description: 'カギのつかいみちがポイント！',
		characterInitialPosition: {
			mapPoint_x: 2,
			mapPoint_y: 10,
			direction: 'south',
		},
		clearPoint: 320,
		excellentClearNorma: 300,
	},

	{
		map: [
			[25, 21, 22, 22, 22, 23, 25, 25, 25, 25, 25,25],
			[21, 33,  2,  6,  2, 32, 22, 22, 22, 22, 23,25],
			[24,  7,  2,  2,  2,  5,  2, 10,  2,  3, 32,23],
			[24,  9,  2,  2,  2,  2, 61, 35, 35, 36,  8,26],
			[24,  6,  2,  5,  2,  2, 42,  2,  2,  2,  4,26],
			[24,  2,  2,  2,  2,  4, 43,  6,  7,  2,  2,26],
			[27, 28, 31,  2, 41,  2,  2,  2,  2,  2,  2,26],
			[21, 22, 33,  2, 42,  4,  2,  7,  2,  5, 11,26],
			[24,  2,  2,  4, 42,  7,  2,  2,  2,  6,  2,26],
			[27, 28, 28, 28, 46,  6,  2,  2,  4,  2,  5,26],
			[25, 25, 25, 25, 27, 31,  2,  2,  2,  2, 30,29],
			[25, 25, 25, 25, 25, 27, 28, 28, 28, 28, 29,25],
		],
		name: 'マーカーてんごく',
		description: 'マーカーの色がポイント！',
		characterInitialPosition: {
			mapPoint_x: 2,
			mapPoint_y: 9,
			direction: 'east',
		},
		clearPoint: 320,
		excellentClearNorma: 300,
	},

];

export default stages;

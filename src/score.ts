export type Score = {
	score: number;
	usingBlockNum: number;
	gotJwellBox: number;
};

/**
 * @param {number} usingBlockNum - 使用しているブロック数
 * @param {number} gotJwellBox - 宝箱を取得したかどうか
 * @return {number} - 引数をもとにスコアを計算
 */
export function calcScore(usingBlockNum: number, gotJwellBox: number): number {
	return 100 - usingBlockNum * 5 + gotJwellBox * 20;
}

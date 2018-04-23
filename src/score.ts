export type Score = {
	score: number;
	usingBlockNum: number;
	gotJwellBox: number;
};

/**
 * @param {number} usingBlockNum - 使用ブロック数
 * @param {number} gotJwellBox - アイテムを取ったか
 * @returns {Score} - スコアを計算する
 */
export function calcScore(usingBlockNum: number, gotJwellBox: number) {
	return 100 - 20 * usingBlockNum + gotJwellBox * 100;
}

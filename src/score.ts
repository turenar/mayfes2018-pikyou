export type Score = {
	gotChestNum: number;
	actionNum: number;
	blockCostSum: number;
};

/**
 * @param {number} gotChestNum - 取得したチェストの数
 * @param {number} actionNum - ゴールに到るまでに移動したマス目の個数
 * @param {number} blockCostSum - 使用したブロックのコストの合計
 * @returns {Score} - スコアを計算する
 */
export function calcScore(score: Score) {
	return 100 + score.gotChestNum * 100 + (50 - score.actionNum) - score.blockCostSum;
}

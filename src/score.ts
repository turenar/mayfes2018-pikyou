export type Score = {
    score: number,
    usingBlockNum: number,
    gotJwellBoxNum: number
}

export function calcScore(usingBlockNum: number, gotJwellBoxNum: number): number {
    return 100 - usingBlockNum * 5 + gotJwellBoxNum * 20;
}
/* 1079. Letter Tile Possibilities
Medium

You have n  tiles, where each tile has one letter tiles[i] printed on it.

Return the number of possible non-empty sequences of letters you can make using the letters printed on those tiles. 

Example 1:

Input: tiles = "AAB"
Output: 8
Explanation: The possible sequences are "A", "B", "AA", "AB", "BA", "AAB", "ABA", "BAA".

Example 2:

Input: tiles = "AAABBC"
Output: 188

Example 3:

Input: tiles = "V"
Output: 1

Constraints:

    1 <= tiles.length <= 7
    tiles consists of uppercase English letters.

 */

function numTilePossibilities(tiles: string): number {
    const charAr: string[] = [];
    const charCnt: number[] = [];
    for (const char of tiles) {
        const iChar = charAr.indexOf(char);
        if (iChar === -1) {
            charAr.push(char);
            charCnt.push(1);
        } else {
            charCnt[iChar]++;
        }
    }

    return getSeqCnt(charCnt);
}

function getSeqCnt(charCnt: number[]): number {
    let seqCnt = 0;
    for (let iChar = 0; iChar < charCnt.length; iChar++) {
        const cnt = charCnt[iChar];
        if (cnt === 0) continue;

        seqCnt++;
        const newCharCnt = [...charCnt];
        newCharCnt[iChar]--;
        seqCnt += getSeqCnt(newCharCnt);
    }

    return seqCnt;
}

/* function test() {
    let tiles;
    tiles = "AAB"
    console.log(numTilePossibilities(tiles)); // 8
    tiles = "AAABBC"
    console.log(numTilePossibilities(tiles)); // 188
    tiles = "V"
    console.log(numTilePossibilities(tiles)); // 1
}
 */

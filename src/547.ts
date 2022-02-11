// 547. Number of Provinces
// DP Solution

/**
 *
 * @param isConnected Given graph matrix
 * @returns the num of provinces
 */
 function findCircleNum(isConnected: number[][]): number {
    // 0    Init checkedIndices.
    const N = isConnected.length;
    const checkedIndices: Array<boolean> = new Array(N).fill(false);
    let nProvince = 0;
    // 1    for (0 <= i < n)
    for (let i = 0; i < N; i++) {
        if (checkedIndices[i] === true) continue;
        // Found new province.
        nProvince++;
        checkedIndices[i] = true;
        const row = isConnected[i];
        propagate(row, checkedIndices, isConnected);
    }
    return nProvince;
}

function propagate(
    row: number[],
    checkedIndices: boolean[],
    isConnected: number[][]
) {
    for (let j = 0; j < row.length; j++) {
        if (checkedIndices[j] === true) continue;

        const val = row[j];
        if (row[j] === 0) continue;
        checkedIndices[j] = true;
        propagate(isConnected[j], checkedIndices, isConnected);
    }
}

// function test() {
//     // const isConnected = [
//     //     [1, 1, 0],
//     //     [1, 1, 0],
//     //     [0, 0, 1],
//     // ];
//     const isConnected = [[1,0,0],[0,1,0],[0,0,1]];
//     console.log(findCircleNum(isConnected));
// }

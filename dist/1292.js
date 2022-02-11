"use strict";
function maxSideLength(mat, threshold) {
    //  Square expands in right&down direction.
    const newMat = mat;
    const m = newMat.length;
    const n = newMat[0].length;
    // 1. Find all starting points and set L = 1;
    const startingPoints = new Map();
    newMat.forEach((row, i) => {
        row.forEach((val, j) => {
            if (val <= threshold) {
                const ys = startingPoints.get(i);
                if (ys === undefined) {
                    startingPoints.set(i, [j]);
                }
                else {
                    ys.push(j);
                }
            }
        });
    });
    if (startingPoints.size === 0)
        return 0;
    let L = 1;
    // 2. For each starting point,
    for (const entry of startingPoints.entries()) {
        const iStart = entry[0];
        if (iStart.valueOf() + L > m)
            break;
        for (const jStart of entry[1]) {
            if (jStart.valueOf() + L > n)
                break;
            // 2.1 Start with L+1 x L+1 square.
            // 2.2-1 If square consists of starting points and sum <= t,
            while (!sumOverThreshold(newMat, iStart, jStart, L + 1, threshold)) {
                L++;
            }
            // 2.2-2 If not, go to 2.
        }
    }
    // 3. return L
    return L;
}
function sumOverThreshold(newMat, iStart, jStart, side, threshold) {
    let sum = 0;
    for (let i = 0; i < side; i++) {
        const row = newMat[iStart.valueOf() + i];
        if (row === undefined)
            return true;
        for (let j = 0; j < side; j++) {
            const val = row[jStart.valueOf() + j];
            if (val === undefined)
                return true;
            sum += val.valueOf();
            if (sum > threshold)
                return true;
        }
    }
    return false;
}
/* function test() {
    let mat = [
        [28, 39, 98, 91, 7, 99],
        [79, 3, 17, 83, 9, 92],
        [81, 73, 42, 27, 67, 70],
        [88, 30, 73, 99, 96, 89],
        [27, 59, 0, 1, 65, 79],
        [42, 55, 48, 29, 86, 96],
    ];
    let threshold = 24829;

    (mat = [
        [2, 2, 2, 2, 2],
        [2, 2, 2, 2, 2],
        [2, 2, 2, 2, 2],
        [2, 2, 2, 2, 2],
        [2, 2, 2, 2, 2],
    ]),
        (threshold = 1);
    console.log(maxSideLength(mat, threshold));
}
 */ 
//# sourceMappingURL=1292.js.map
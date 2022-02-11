function maxAlternatingSum(nums: number[]): number {
    let result: number = 0;
    // 1. Find max and set it as a "node". If there are multiple max, you should consider each case and choose the optimal solution.
    const [initMaxIndices, max] = indicesOfMax(nums);
    result += max;

    let balanceCandidates: number[] = [];
    for (const maxIdx of initMaxIndices) {
        // Repeat below until every subarray is done.
        // 2. Split the array at the node and assign index to each.
        // const subArL = ArNums.slice(0, maxIdx);
        // const subArR = nums.slice(maxIdx + 1);
        // 3-1. For even-indexed array, find a pair of nodes where the first minus the second makes maximum positive value (ar[0] > ar[1], ignore equality.) If none, now the subarray is off the table.
        const balL = findBalanceNonSlice(nums, OddEven.EVEN, 0, maxIdx);
        // 3-2. For odd-indexed array, vice-versa.
        const balR = findBalanceNonSlice(nums, OddEven.ODD, maxIdx + 1);
        balanceCandidates.push(balL + balR);

        break;
    }
    result += Math.max(...balanceCandidates);
    return result;
}
function findBalanceNonSlice(
    ar: number[],
    oddOrEven: OddEven,
    startIdx: number,
    endIdx?: number
): number {
    const targetLength = endIdx === undefined ? ar.length - startIdx : endIdx - startIdx;
    if (targetLength < 2) return 0;

    let idxPairs: [number, number][] = [];
    let ptr = startIdx;

    if (oddOrEven === OddEven.EVEN) {
        while (ptr < startIdx + targetLength) {
            let iMin = ptr,
                iMax = ptr,
                min = ar[ptr],
                max = ar[ptr];
            while (ptr++ < startIdx + targetLength) {
                if (ptr === startIdx + targetLength || ar[ptr] > max) {
                    if (iMin !== iMax) {
                        idxPairs.push([iMax, iMin]);
                        // Stop iteration.
                        ptr = startIdx + targetLength;
                    }
                    // Next subarray
                    break;
                } else if (ar[ptr] < min) {
                    iMin = ptr;
                    min = ar[ptr];
                }
            }
        }
    } else {
        while (ptr < startIdx + targetLength) {
            let iMin = ptr,
                iMax = ptr,
                min = ar[ptr],
                max = ar[ptr];
            while (ptr++ < startIdx + targetLength) {
                if (ptr === startIdx + targetLength || ar[ptr] < min) {
                    if (iMin !== iMax) {
                        idxPairs.push([iMin, iMax]);
                        // Stop iteration.
                        ptr = startIdx + targetLength;
                    }
                    // Next subarray
                    break;
                } else if (ar[ptr] > max) {
                    iMax = ptr;
                    max = ar[ptr];
                }
            }
        }
    }

    if (idxPairs.length === 0) {
        return 0;
    } else if (idxPairs.length === 1) {
        return splitArWithIdxPair(ar, idxPairs[0], oddOrEven, startIdx, endIdx);
    } else {
        let balanceCandidates: number[] = [];
        for (let subArIdx = 0; subArIdx < idxPairs.length; subArIdx++) {
            const idxPair = idxPairs[subArIdx];
            balanceCandidates.push(splitArWithIdxPair(ar, idxPair, oddOrEven, startIdx, endIdx));
        }
        return Math.max(...balanceCandidates);
    }
}

// function findBalance(ar: number[], oddOrEven: OddEven): number {
//     if (ar.length < 2) return 0;

//     let idxPairs: [number, number][] = [];
//     let ptr = 0;

//     if (oddOrEven === OddEven.EVEN) {
//         while (ptr < ar.length) {
//             let iMin = ptr,
//                 iMax = ptr,
//                 min = ar[ptr],
//                 max = ar[ptr];
//             while (ptr++ < ar.length) {
//                 if (ptr === ar.length || ar[ptr] > max) {
//                     if (iMin !== iMax) {
//                         idxPairs.push([iMax, iMin]);
//                         // Stop iteration.
//                         ptr = ar.length;
//                     }
//                     // Next subarray
//                     break;
//                 } else if (ar[ptr] < min) {
//                     iMin = ptr;
//                     min = ar[ptr];
//                 }
//             }
//         }
//     } else {
//         while (ptr < ar.length) {
//             let iMin = ptr,
//                 iMax = ptr,
//                 min = ar[ptr],
//                 max = ar[ptr];
//             while (ptr++ < ar.length) {
//                 if (ptr === ar.length || ar[ptr] < min) {
//                     if (iMin !== iMax) {
//                         idxPairs.push([iMin, iMax]);
//                         // Stop iteration.
//                         ptr = ar.length;
//                     }
//                     // Next subarray
//                     break;
//                 } else if (ar[ptr] > max) {
//                     iMax = ptr;
//                     max = ar[ptr];
//                 }
//             }
//         }
//     }

//     if (idxPairs.length === 0) {
//         return 0;
//     } else if (idxPairs.length === 1) {
//         return splitArWithIdxPair(ar, idxPairs[0], oddOrEven);
//     } else {
//         let balanceCandidates: number[] = [];
//         for (let subArIdx = 0; subArIdx < idxPairs.length; subArIdx++) {
//             const idxPair = idxPairs[subArIdx];
//             balanceCandidates.push(splitArWithIdxPair(ar, idxPair, oddOrEven));
//         }
//         return Math.max(...balanceCandidates);
//     }
// }

enum OddEven {
    ODD,
    EVEN,
}

function splitArWithIdxPair(
    ar: number[],
    idxPair: [number, number],
    oddOrEven: OddEven,
    startIdx: number,
    endIdx?: number
): number {
    const bal = Math.abs(ar[idxPair[0]] - ar[idxPair[1]]);

    // const subArL = ar.slice(0, idxPair[0]);
    // const subArM = ar.slice(idxPair[0], idxPair[1]);
    // const subArR = ar.slice(idxPair[1]);
    // const subBal =
    //     oddOrEven === OddEven.ODD
    //         ? findBalance(subArL, OddEven.ODD) +
    //           findBalance(subArM, OddEven.EVEN) +
    //           findBalance(subArR, OddEven.ODD)
    //         : findBalance(subArL, OddEven.EVEN) +
    //           findBalance(subArM, OddEven.ODD) +
    //           findBalance(subArR, OddEven.EVEN);
    const subBal =
        oddOrEven === OddEven.ODD
            ? findBalanceNonSlice(ar, OddEven.ODD, startIdx, idxPair[0]) +
              findBalanceNonSlice(ar, OddEven.EVEN, idxPair[0], idxPair[1]) +
              findBalanceNonSlice(ar, OddEven.ODD, idxPair[1], endIdx)
            : findBalanceNonSlice(ar, OddEven.EVEN, startIdx, idxPair[0]) +
              findBalanceNonSlice(ar, OddEven.ODD, idxPair[0], idxPair[1]) +
              findBalanceNonSlice(ar, OddEven.EVEN, idxPair[1], endIdx);

    return bal + subBal;
}

function indicesOfMax(ar: number[]): [number[], number] {
    if (ar.length === 0) {
        throw new Error("Argument array empty.");
    }
    let maxIndices: number[] = [];
    let max: number = 0;
    let idx;
    for (idx = 0; idx < ar.length; idx++) {
        const element = ar[idx];
        if (element > max) {
            maxIndices = [idx];
            max = element;
        } else if (element === max) {
            maxIndices.push(idx);
        } else {
            continue;
        }
    }
    return [maxIndices, max];
}
"use strict";
/* 775. Global and Local Inversions
Medium

You are given an integer array nums of length n which represents a permutation of all the integers in the range [0, n - 1].

The number of global inversions is the number of the different pairs (i, j) where:

    0 <= i < j < n
    nums[i] > nums[j]

The number of local inversions is the number of indices i where:

    0 <= i < n - 1
    nums[i] > nums[i + 1]

Return true if the number of global inversions is equal to the number of local inversions.

Example 1:

Input: nums = [1,0,2]
Output: true
Explanation: There is 1 global inversion and 1 local inversion.

Example 2:

Input: nums = [1,2,0]
Output: false
Explanation: There are 2 global inversions and 1 local inversion.

Constraints:

    n == nums.length
    1 <= n <= 105
    0 <= nums[i] < n
    All the integers of nums are unique.
    nums is a permutation of all the numbers in the range [0, n - 1].

 */
/*
Iterate:
1. Move ptr backward.
2. Check if new LOCAL inversion appeared.
    2-1. If so, check if it also makes any GLOBAL inversions.
        2-1-1 If so, return false.
        2-1-2 If not, continue.
    2-2 If not, continue.
When iterator has been consumed, return true.
 */
function isIdealPermutation(nums) {
    const n = nums.length;
    if (n === 1)
        return true;
    let prevNum, globalMin, globalSecondMin;
    prevNum = globalMin = nums[n - 1];
    let globalMinIdx = n - 1;
    // Iterate:
    // 1. Move ptr backward.
    for (let ptr = n - 2; -1 < ptr; ptr--) {
        const curNum = nums[ptr];
        if (curNum < globalMin) {
            globalMin = curNum;
            globalMinIdx = ptr;
            continue;
        }
        // 2. Check if new LOCAL inversion appeared.
        if (curNum > prevNum) {
            //     2-1. If so, check if it also makes any GLOBAL, NON-LOCAL inversions.
            //         2-1-1 If so, return false.
            if (curNum > globalMin && globalMinIdx !== ptr + 1)
                return false;
            //         2-1-2 If not, continue.
            continue;
        }
        //     2-2 If not, continue.
        continue;
    }
    // When iterator has been consumed, return true.
    return true;
}
// function test() {
//     let nums:number[];
//     // nums = [1,0,2] // true
//     // nums = [1,2,0] // false
//     nums = [1,0]; // true
//     console.log(isIdealPermutation(nums));
// }
//# sourceMappingURL=app.js.map
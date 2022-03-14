/* 1567. Maximum Length of Subarray With Positive Product
Medium

Given an array of integers nums, find the maximum length of a subarray where the product of all its elements is positive.
A subarray of an array is a consecutive sequence of zero or more values taken out of that array.
Return the maximum length of a subarray with positive product.

Example 1:

Input: nums = [1,-2,-3,4]
Output: 4
Explanation: The array nums already has a positive product of 24.

Example 2:

Input: nums = [0,1,-2,-3,-4]
Output: 3
Explanation: The longest subarray with positive product is [1,-2,-3] which has a product of 6.
Notice that we cannot include 0 in the subarray since that'll make the product 0 which is not positive.

Example 3:

Input: nums = [-1,-2,-3,0,1]
Output: 2
Explanation: The longest subarray with positive product is [-1,-2] or [-2,-3].

Constraints:

    1 <= nums.length <= 105
    -109 <= nums[i] <= 109

 */

function getMaxLen(nums: number[]): number {
    let maxLen = 0;
    while (nums.length !== 0) {
        // 1. Split with 0
        // 2. foreach subarray
        const nextZero = nums.indexOf(0);
        let nextSubar: number[];
        if (nextZero === -1) {
            nextSubar = nums.splice(0);
        } else {
            nextSubar = nums.splice(0, nextZero);
            nums.shift();
        };
        // 2.1. Count negatives
        // let negCnt = 0;
        // let firstNeg = 0, lastNeg = 0;
        // nextSubar.forEach((num, i) => {
        //     if (num < 0) {
        //         if (negCnt === 0) firstNeg = i;
        //         lastNeg = i;
        //         negCnt++;
        //     };
        // })
        const negCnt = nextSubar.filter(v => v < 0).length;
        const firstNeg = nextSubar.findIndex(v => v < 0);
        const lastNeg = nextSubar.length - nextSubar.reverse().findIndex(v => v < 0) - 1;

        let len: number;
        if (negCnt % 2 === 1) {
            // 2.1-1 if odd negatives => Exclude most remote negative and get length
            const headClr = firstNeg;
            const tailClr = nextSubar.length - lastNeg - 1;
            len = headClr > tailClr ? nextSubar.length - tailClr - 1 : nextSubar.length - headClr - 1;
        } else {
            // 2.1-2 if even negatives => get length
            len = nextSubar.length;
        }
        // 2.2. Compare with current maxLen and update it.
        maxLen = maxLen > len ? maxLen : len;
    }
    // 3. return maxLen.
    return maxLen;
};

// function test() {
//     const nums = [1, -2, -3, 4]; // 4
//     // const nums = [0, 1, -2, -3, -4]; // 3
//     // const nums = [-1, -2, -3, 0, 1]; // 2
//     console.log(getMaxLen(nums));
// }
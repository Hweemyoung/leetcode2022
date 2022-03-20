/* 1131. Maximum of Absolute Value Expression
Medium

Given two arrays of integers with equal lengths, return the maximum value of:

|arr1[i] - arr1[j]| + |arr2[i] - arr2[j]| + |i - j|

where the maximum is taken over all 0 <= i, j < arr1.length. 

Example 1:

Input: arr1 = [1,2,3,4], arr2 = [-1,4,5,6]
Output: 13

Example 2:

Input: arr1 = [1,-2,-5,0,10], arr2 = [0,-2,-1,-7,-4]
Output: 20

Constraints:

    2 <= arr1.length == arr2.length <= 40000
    -10^6 <= arr1[i], arr2[i] <= 10^6

 */

function maxAbsValExpr(arr1: number[], arr2: number[]): number {
    const len = arr1.length;
    let max = 0;
    for (let i = 0; i < len; i++) {
        for (let j = 0; j <= i; j++) {
            const val = Math.abs(arr1[i] - arr1[j]) + Math.abs(arr2[i] - arr2[j]) + i - j;
            if (val > max) max = val;
        }
    }
    return max;
};

// function test() {
//     // const arr1 = [1, 2, 3, 4], arr2 = [-1, 4, 5, 6]; // 13
//     const arr1 = [1, -2, -5, 0, 10], arr2 = [0, -2, -1, -7, -4]; // 20

//     console.log(maxAbsValExpr(arr1, arr2));
// }
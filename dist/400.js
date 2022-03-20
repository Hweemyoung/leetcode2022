"use strict";
/* 400. Nth Digit
Medium

Given an integer n, return the nth digit of the infinite integer sequence [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, ...].

 

Example 1:

Input: n = 3
Output: 3

Example 2:

Input: n = 11
Output: 0
Explanation: The 11th digit of the sequence 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, ... is a 0, which is part of the number 10.

 

Constraints:

    1 <= n <= 231 - 1

 */
function findNthDigit(n) {
    // 1 * 9 = 1 * (10 ** 1 - 10 ** 0) // 1~9
    // 2 * 90 = 2 * (10 ** 2 - 10 ** 1) // 10~99
    // 3 * 900 = 3 * (10 ** 3 - 10 ** 2) // 100~999
    // nDigit * (10 ** nDigit - 10 ** (nDigit - 1)) = nDigit * 9 * 10 ** (nDigit - 1)
    let nDigit = 0;
    while (true) {
        nDigit++;
        n = n - nDigit * 9 * Math.pow(10, (nDigit - 1));
        if (n < 0) {
            n = -n;
            const ceil = Math.pow(10, nDigit);
            const quotient = Math.floor(n / nDigit);
            const remainder = n % nDigit;
            const target = ceil - quotient - 1;
            const targetStr = target.toString();
            return parseInt(targetStr[targetStr.length - 1 - remainder]);
        }
    }
}
;
// function test() {
//     let n;
//     // n = 11; // 0
//     n = 190; // 1
//     console.log(findNthDigit(n));
// }
//# sourceMappingURL=400.js.map
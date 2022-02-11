"use strict";
// 7. Reverse Integer
/**
 *
 * @param x
 */
function reverse_7(x) {
    const strX = x.toString(10);
    const revStrX = strX.split("").reverse().join("");
    function range(int) {
        return int < -(Math.pow(2, 31)) || Math.pow(2, 31) - 1 < int ? 0 : int;
    }
    const revX = parseInt(revStrX);
    return x < 0 ? -range(revX) : range(revX);
}
// function test() {
//     // const x = 123;
//     // const x = -123;
//     // const x = 120;
//     const x = 1534236469;
//     console.log(reverse_7(x));
// }
//# sourceMappingURL=7.js.map
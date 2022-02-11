// 7. Reverse Integer

/**
 *
 * @param x
 */
 function reverse_7(x: number): number {
    const strX = x.toString(10);
    const revStrX = strX.split("").reverse().join("");
    function range(int: number) {
        return int < -(2 ** 31) || 2 ** 31 - 1 < int ? 0 : int;
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

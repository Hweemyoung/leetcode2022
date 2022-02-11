"use strict";
function subsets(nums) {
    const curNum = nums.shift();
    if (curNum === undefined)
        return [[]];
    const nextSubsets = subsets(nums); // could be []
    const newComb = clone(nextSubsets);
    newComb.forEach((subset) => subset.push(curNum)); // [curNum]
    return nextSubsets.concat(newComb); // [[] , [curNum]]
}
const clone = (items) => items.map((item) => (Array.isArray(item) ? clone(item) : item));
//# sourceMappingURL=78.js.map
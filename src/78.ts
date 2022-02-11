function subsets(nums: number[]): number[][] {
    const curNum = nums.shift();
    if (curNum === undefined) return [[]];
    const nextSubsets = subsets(nums); // could be []
    const newComb = clone(nextSubsets);
    newComb.forEach((subset) => subset.push(curNum)); // [curNum]
    return nextSubsets.concat(newComb); // [[] , [curNum]]
}

const clone = (items: any[]): any[] =>
    items.map((item) => (Array.isArray(item) ? clone(item) : item));
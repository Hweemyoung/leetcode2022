"use strict";
function frequencySort(s) {
    const charFreqMap = new Map();
    for (const char of s) {
        const freq = charFreqMap.get(char);
        if (freq !== undefined) {
            freq.add(char);
        }
        else {
            charFreqMap.set(char, new CharWithFreq(char));
        }
    }
    const ar = Array.from(charFreqMap.values());
    ar.sort((a, b) => b.intValue() - a.intValue());
    return ar.map(val => val.str).join("");
}
class CharWithFreq {
    constructor(char) {
        // freq: number = 1;
        this.str = "";
        this.char = char;
        this.str += char;
    }
    add(char) {
        // this.freq++;
        this.str += char;
    }
    intValue() {
        return this.str.length;
    }
}
// function mergeSort(ar: CustomIF[]) {
//     if (ar.length < 2) return ar;
//     const mid = Math.ceil(ar.length / 2);
//     mergeSort(ar.splice(0, mid));
// }
// function conquer(ar1: CustomIF[], ar2: CustomIF[]): CustomIF[] {
//     const newAr: CustomIF[] = [];
//     let ptr1 = 0,
//         ptr2 = 0;
//     let e1 = ar1[ptr1],
//         e2 = ar2[ptr2];
//     let int1 = e1.intValue(),
//         int2 = e2.intValue();
//     while (true) {
//         if (int1 < int2) {
//             newAr.push(e1);
//             ptr1++;
//             e1 = ar1[ptr1];
//             int1 = e1.intValue();
//         } else {
//             newAr.push(e2);
//             ptr2++;
//             e2 = ar2[ptr2];
//             int2 = e2.intValue();
//         }
//     }
// }
//# sourceMappingURL=451.js.map
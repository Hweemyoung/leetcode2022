// import * as Util from "./util.js";
/* 1631. Path With Minimum Effort
Medium

You are a hiker preparing for an upcoming hike. You are given heights, a 2D array of size rows x columns, where heights[row][col] represents the height of cell (row, col). You are situated in the top-left cell, (0, 0), and you hope to travel to the bottom-right cell, (rows-1, columns-1) (i.e., 0-indexed). You can move up, down, left, or right, and you wish to find a route that requires the minimum effort.

A route's effort is the maximum absolute difference in heights between two consecutive cells of the route.

Return the minimum effort required to travel from the top-left cell to the bottom-right cell.

Example 1:

Input: heights = [[1,2,2],[3,8,2],[5,3,5]]
Output: 2
Explanation: The route of [1,3,5,3,5] has a maximum absolute difference of 2 in consecutive cells.
This is better than the route of [1,2,2,2,5], where the maximum absolute difference is 3.

Example 2:

Input: heights = [[1,2,3],[3,8,4],[5,3,5]]
Output: 1
Explanation: The route of [1,2,3,4,5] has a maximum absolute difference of 1 in consecutive cells, which is better than route [1,3,5,3,5].

Example 3:

Input: heights = [[1,2,1,1,1],[1,2,1,2,1],[1,2,1,2,1],[1,2,1,2,1],[1,1,1,2,1]]
Output: 0
Explanation: This route does not require any effort.


Constraints:

    rows == heights.length
    columns == heights[i].length
    1 <= rows, columns <= 100
    1 <= heights[i][j] <= 106
 */

function minimumEffortPath(heights: number[][]): number {
    const nrow = heights.length;
    const ncol = heights[0].length;

    // 1. Init effortMap.
    const effortMap: Array<Array<number>> = new Array(nrow);
    for (let index = 0; index < effortMap.length; index++) {
        effortMap[index] = new Array<number>(ncol).fill(-1);
    }
    effortMap[0][0] = 0;

    const outMap: Array<Array<boolean>> = new Array(nrow);
    for (let index = 0; index < outMap.length; index++) {
        outMap[index] = new Array<boolean>(ncol).fill(false);
    }

    // 2. Loop
    let candidates: CoordSet = new CoordSet();

    while (true) {
        // 2.1. Find a coord with minimum effort.
        const [x, y] = nextCoord(candidates, effortMap);
        candidates.remove([x, y]);
        const newCandidates = propagateEffort(x, y, heights, effortMap, outMap);
        for (const newCandidate of newCandidates) {
            candidates.add(newCandidate);
        }
        if (outMap[nrow - 1][ncol - 1] || !candidates.size)
            return effortMap[nrow - 1][ncol - 1];
    }
}

function propagateEffort(
    x: number,
    y: number,
    heights: number[][],
    effortMap: number[][],
    outMap: boolean[][]
): CoordSet {
    /*
    obj.arr = obj.arr.filter((value, index, self) =>
        index === self.findIndex((t) => 
            (t.place === value.place && t.name === value.name)
        )
    )
    */
    let candidates: CoordSet = new CoordSet();
    let coordTgt: [number, number];

    // [x - 1, y]
    if (0 < x) {
        // for (const coord of tryUpdateEffort(
        //     x,
        //     y,
        //     x - 1,
        //     y,
        //     heights,
        //     effortMap
        // )) {
        //     candidates.add(coord);
        // }
        coordTgt = [x - 1, y];
        if (!outMap[coordTgt[0]][coordTgt[1]]) {
            tryUpdateEffort(x, y, coordTgt[0], coordTgt[1], heights, effortMap);
            candidates.add(coordTgt);
        }
        // candidates = new Set([
        //     ...candidates,
        //     ...tryUpdateEffort(x, y, x - 1, y, heights, effortMap),
        // ]);
    }
    // [x + 1, y]
    if (x < heights.length - 1) {
        // for (const coord of tryUpdateEffort(
        //     x,
        //     y,
        //     x + 1,
        //     y,
        //     heights,
        //     effortMap
        // )) {
        //     candidates.add(coord);
        // }
        coordTgt = [x + 1, y];
        if (!outMap[coordTgt[0]][coordTgt[1]]) {
            tryUpdateEffort(x, y, coordTgt[0], coordTgt[1], heights, effortMap);
            candidates.add(coordTgt);
        }
        // candidates = new Set([
        //     ...candidates,
        //     ...tryUpdateEffort(x, y, x + 1, y, heights, effortMap),
        // ]);
    }
    // [x, y - 1]
    if (0 < y) {
        // for (const coord of tryUpdateEffort(
        //     x,
        //     y,
        //     x,
        //     y - 1,
        //     heights,
        //     effortMap
        // )) {
        //     candidates.add(coord);
        // }
        coordTgt = [x, y - 1];
        if (!outMap[coordTgt[0]][coordTgt[1]]) {
            tryUpdateEffort(x, y, coordTgt[0], coordTgt[1], heights, effortMap);
            candidates.add(coordTgt);
        }
        // candidates = new Set([
        //     ...candidates,
        //     ...tryUpdateEffort(x, y, x, y - 1, heights, effortMap),
        // ]);
    }
    // [x, y + 1]
    if (y < heights[0].length - 1) {
        // for (const coord of tryUpdateEffort(
        //     x,
        //     y,
        //     x,
        //     y + 1,
        //     heights,
        //     effortMap
        // )) {
        //     candidates.add(coord);
        // }
        coordTgt = [x, y + 1];
        if (!outMap[coordTgt[0]][coordTgt[1]]) {
            tryUpdateEffort(x, y, coordTgt[0], coordTgt[1], heights, effortMap);
            candidates.add(coordTgt);
        }
        // candidates = new Set([
        //     ...candidates,
        //     ...tryUpdateEffort(x, y, x, y + 1, heights, effortMap),
        // ]);
    }

    outMap[x][y] = true;
    return candidates;
}

function tryUpdateEffort(
    x: number,
    y: number,
    xTgt: number,
    yTgt: number,
    heights: number[][],
    effortMap: number[][]
): CoordSet {
    const candidates: CoordSet = new CoordSet();

    const curEffort = effortMap[x][y];
    const targetEffort = effortMap[xTgt][yTgt];
    const possibleEffort = Math.max(
        curEffort,
        Math.abs(heights[xTgt][yTgt] - heights[x][y])
    );

    // if (targetEffort === -1) {
    //     effortMap[xTgt][yTgt] = possibleEffort;
    // } else {
    //     if (possibleEffort < targetEffort) {
    //         effortMap[xTgt][yTgt] = possibleEffort;
    //     }
    // }
    if (targetEffort === -1 || possibleEffort < targetEffort) {
        effortMap[xTgt][yTgt] = possibleEffort;
    }

    // Add unvisited adjacent coords to candidate set.
    // [xTgt - 1, yTgt]
    if (0 < xTgt && effortMap[xTgt - 1][yTgt] === -1) {
        candidates.add([xTgt - 1, yTgt]);
    }
    // [xTgt + 1, yTgt]
    if (xTgt < heights.length - 1 && effortMap[xTgt + 1][yTgt] === -1) {
        candidates.add([xTgt + 1, yTgt]);
    }
    // [xTgt, yTgt - 1]
    if (0 < yTgt && effortMap[xTgt][yTgt - 1] === -1) {
        candidates.add([xTgt, yTgt - 1]);
    }
    // [xTgt, yTgt + 1]
    if (yTgt < heights[0].length - 1 && effortMap[xTgt][yTgt + 1]) {
        candidates.add([xTgt, yTgt + 1]);
    }

    return candidates;
}

function nextCoord(
    candidates: CoordSet,
    effortMap: number[][]
): [number, number] {
    let localMinEffort = -1;
    let x: number, y: number;

    // If any candidate exists, find the coord with min effort.
    if (!!candidates.size) {
        // If the only candidate is destination, return the destination.
        if (
            candidates.size === 1 &&
            candidates.has([effortMap.length - 1, effortMap[0].length - 1])
        ) {
            return [effortMap.length - 1, effortMap[0].length - 1];
        }

        for (const candidate of candidates) {
            const curEffort = effortMap[candidate[0]][candidate[1]];
            if (localMinEffort === -1 || localMinEffort > curEffort) {
                localMinEffort = curEffort;
                [x, y] = candidate;
            }
        }

        return [x!, y!];
    }

    // First coord - Origin
    return [0, 0];
}

class CoordSet implements Iterable<[number, number]> {
    [Symbol.iterator](): Iterator<[number, number], any, undefined> {
        return this._set.values();
    }

    private _set: Set<[number, number]> = new Set();
    public get size(): number {
        return this._set.size;
    }

    add(coord: [number, number]): boolean {
        for (const elem of this._set) {
            if (elem[0] === coord[0] && elem[1] === coord[1]) return false;
        }
        this._set.add(coord);
        return true;
    }

    has(coord: [number, number]): boolean {
        // return this._set.has(value);
        for (const elem of this._set) {
            if (elem[0] === coord[0] && elem[1] === coord[1]) return true;
        }
        return false;
    }

    join(separator: string | undefined): string {
        return [...this._set.values()].join(separator);
    }

    remove(coord: [number, number]): boolean {
        // return this._set.delete(value);
        for (const elem of this._set) {
            if (elem[0] === coord[0] && elem[1] === coord[1])
                return this._set.delete(elem);
        }
        return false;
    }
}

// function test() {
//     let heights: number[][];
//     // heights = [
//     //     [1, 2, 2],
//     //     [3, 8, 2],
//     //     [5, 3, 5],
//     // ]; // 2
//     // heights = [
//     //     [1, 2, 3],
//     //     [3, 8, 4],
//     //     [5, 3, 5],
//     // ]; // 1
//     // heights = [
//     //     [1, 2, 1, 1, 1],
//     //     [1, 2, 1, 2, 1],
//     //     [1, 2, 1, 2, 1],
//     //     [1, 2, 1, 2, 1],
//     //     [1, 1, 1, 2, 1],
//     // ]; // 0
//     // heights = [
//     //     [8, 3, 2, 5, 2, 10, 7, 1, 8, 9],
//     //     [1, 4, 9, 1, 10, 2, 4, 10, 3, 5],
//     //     [4, 10, 10, 3, 6, 1, 3, 9, 8, 8],
//     //     [4, 4, 6, 10, 10, 10, 2, 10, 8, 8],
//     //     [9, 10, 2, 4, 1, 2, 2, 6, 5, 7],
//     //     [2, 9, 2, 6, 1, 4, 7, 6, 10, 9],
//     //     [8, 8, 2, 10, 8, 2, 3, 9, 5, 3],
//     //     [2, 10, 9, 3, 5, 1, 7, 4, 5, 6],
//     //     [2, 3, 9, 2, 5, 10, 2, 7, 1, 8],
//     //     [9, 10, 4, 10, 7, 4, 9, 3, 1, 6],
//     // ];
//     heights = [
//         [10, 8],
//         [10, 8],
//         [1, 2],
//         [10, 3],
//         [1, 3],
//         [6, 3],
//         [5, 2],
//     ];
//     console.log(minimumEffortPath(heights));
// }

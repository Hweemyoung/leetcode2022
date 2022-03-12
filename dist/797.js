"use strict";
/* 797. All Paths From Source to Target
Medium

Given a directed acyclic graph (DAG) of n nodes labeled from 0 to n - 1, find all possible paths from node 0 to node n - 1 and return them in any order.

The graph is given as follows: graph[i] is a list of all nodes you can visit from node i (i.e., there is a directed edge from node i to node graph[i][j]).

 

Example 1:

Input: graph = [[1,2],[3],[3],[]]
Output: [[0,1,3],[0,2,3]]
Explanation: There are two paths: 0 -> 1 -> 3 and 0 -> 2 -> 3.

Example 2:

Input: graph = [[4,3,1],[3,2,4],[3],[4],[]]
Output: [[0,4],[0,3,4],[0,1,3,4],[0,1,2,3,4],[0,1,4]]

 */
function allPathsSourceTarget(graph) {
    const sourceGraph = new Array(graph.length);
    const target = graph.length - 1;
    const curPath = [target];
    return extendPath(curPath, graph, sourceGraph);
}
;
function extendPath(curPath, graph, sourceGraph) {
    const origin = curPath[0];
    if (origin === 0)
        return [curPath];
    if (sourceGraph[origin] === undefined) {
        sourceGraph[origin] = [];
        const srcs = sourceGraph[origin];
        graph.forEach((directions, i) => {
            const hasOrigin = directions.indexOf(origin) !== -1;
            if (!hasOrigin)
                return;
            srcs.push(i);
        });
    }
    const extPaths = [];
    const srcs = sourceGraph[origin];
    for (const src of srcs) {
        extPaths.push(...extendPath([src, ...curPath], graph, sourceGraph));
    }
    return extPaths;
}
// function test() {
//     // const graph = [[1, 2], [3], [3], []];
//     const graph = [[4,3,1],[3,2,4],[3],[4],[]];
//     console.log(allPathsSourceTarget(graph));
// }
//# sourceMappingURL=797.js.map
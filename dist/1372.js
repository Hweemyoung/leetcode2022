"use strict";
class TreeNode {
    constructor(val, left, right) {
        this.val = val === undefined ? 0 : val;
        this.left = left === undefined ? null : left;
        this.right = right === undefined ? null : right;
    }
}
class Const {
}
function longestZigZag(root) {
    if (root === null)
        return 0;
    Const.GLOBAL_MAX = 0;
    zigZagLengthFromThisNode(root, 0);
    zigZagLengthFromThisNode(root, 1);
    return Const.GLOBAL_MAX;
}
function zigZagLengthFromThisNode(thisNode, dir) {
    let length = 0;
    let lenLeft = 0, lenRight = 0;
    switch (dir % 2) {
        case 0 /* LEFT */:
            if (thisNode.left !== null)
                length = lenLeft =
                    1 + zigZagLengthFromThisNode(thisNode.left, dir + 1);
            if (thisNode.right !== null)
                lenRight = 1 + zigZagLengthFromThisNode(thisNode.right, dir);
            break;
        case 1 /* RIGHT */:
            if (thisNode.right !== null) {
                length = lenRight =
                    1 + zigZagLengthFromThisNode(thisNode.right, dir + 1);
            }
            if (thisNode.left !== null)
                lenLeft = 1 + zigZagLengthFromThisNode(thisNode.left, dir);
            break;
        default:
            throw new Error(`Invalid dir: ${dir % 2}`);
    }
    Const.GLOBAL_MAX = Math.max(Const.GLOBAL_MAX, lenLeft, lenRight);
    return length;
}
/* function test() {
    const root = new TreeNode(1);
    console.log(longestZigZag(root));
}
 */ 
//# sourceMappingURL=1372.js.map
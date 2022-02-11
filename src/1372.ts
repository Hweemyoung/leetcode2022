class TreeNode {
    val: number;
    left: TreeNode | null;
    right: TreeNode | null;
    constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
        this.val = val === undefined ? 0 : val;
        this.left = left === undefined ? null : left;
        this.right = right === undefined ? null : right;
    }
}

class Const {
    static GLOBAL_MAX: number;
}

function longestZigZag(root: TreeNode | null): number {
    if (root === null) return 0;
    Const.GLOBAL_MAX = 0;

    zigZagLengthFromThisNode(root, 0);
    zigZagLengthFromThisNode(root, 1);

    return Const.GLOBAL_MAX;
}

const enum Dir {
    LEFT = 0,
    RIGHT = 1,
}

function zigZagLengthFromThisNode(thisNode: TreeNode, dir: number): number {
    let length: number = 0;
    let lenLeft: number = 0,
        lenRight: number = 0;
    switch (dir % 2) {
        case Dir.LEFT:
            if (thisNode.left !== null)
                length = lenLeft =
                    1 + zigZagLengthFromThisNode(thisNode.left, dir + 1);
            if (thisNode.right !== null)
                lenRight = 1 + zigZagLengthFromThisNode(thisNode.right, dir);
            break;
        case Dir.RIGHT:
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
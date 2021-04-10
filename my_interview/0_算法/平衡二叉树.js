// 二叉搜索树是二叉树特里 
// 平衡二叉树是二叉搜索树特例

// 平衡二叉树
// 任意结点的左右子树高度差绝对值不大于1的二叉搜索树
// 出现降低二叉搜索树查找时间复杂度

// 二叉搜索树妙处在于它把二分这种思想以数据结构形式表达出来
// 平衡二叉树利用了二分思想 查找操作的时间复杂度仅为O(logN)

// 对特性的考察
// 对操作的考察

// 平衡二叉树的判定

// 思路
// 从下往上递归遍历树种每一个结点
// 计算其左右子树的高度并进行对比
// 主要有一个高度差绝对值大于1
// 那么整棵树都会被判为不平衡

const isBalanced = function(root){
    let flag = true;
    function dfs(root){
        if(!root||!flag){
            return 0
        }
        const left = dfs(root.left);
        const reght = dfs(root.right);
        if(Math.abs(left-right)>1){
            flag = false;
            return 0;
        }
        return Math.max(left,right)+1;
    }
    dfs(root);
    return flag;
}

// 平衡二叉树的构造
// 二叉搜索树的中序遍历序列是有序的
// 有序数组可以理解为二叉搜索树中序遍历

// 思路
// 1.中序遍历求出有序数组
// 2.逐个将二分出来的数组子序列提起来变成二叉搜索树

// ......s








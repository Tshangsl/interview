/*
二叉树编码实现
    JS中 二叉树使用对象定义
    结构分三块
        1.数据域
        2.左侧子节点(左子树根节点)的引用
        3.右侧子节点(右子树根节点)的引用
    定义二叉树构造函数时 需把左右侧子节点都预置为空
深度：从根节点到该节点的最长简单路径边的条数
高度: 从该节点到叶子结点的最长简单路径边的条数
*/
// 二叉树节点的构造函数
function TreeNode(val){
    // 设置数据域值
    this.val =val;
    // 设置左右子节点值
    this.left = this.right = null;
}
// 新建二叉树结点 调用构造函数 传入数据域的值
const node = new TreeNode(1);

function TreeNode(val){
    this.val = val;
    this.left = this.right = null;
}

// 一颗二叉树结构的递归实现
const root = {
    val:'A',
    left:{
        val:'B',
        left:{
            val:'D'
        },
        right:{
            val:'E'
        }
    },
    right:{
        val:'C',
        right:{
            val:'F'
        }
    }
}
// 1.递归迭代实现二叉树的先、中、后序遍历 
function TreeNode(val){
    this.val = val;
    this.left = this.right = null;
}
// 递归实现先序遍历
function preOrder(root){
    if(!root){
        return;
    }
    console.log('当前遍历的结点值是',root.val);
    preOrder(root.left);
    preOrder(root.right);
}
// 迭代实现先序遍历
const preOrderTraversal = function(root){
    if(!root){
        return
    }
    const stack = [];
    const res = [];
    stack.push(root);
    while(stack.length){
        let cur = stack.pop();
        res.push(cur.val);
        if(cur.right){
            stack.push(cur.right);
        }
        if(cur.left){
            stack.push(cur.left);
        }
    }
    return res;
}
console.log(preOrderTraversal(root));
// 递归实现后序遍历
function postOrder(root){
    if(!root){
        return ;
    }
    postOrder(root.left);
    postOrder(root.right);
    console.log('当前遍历的结点值是',root.val);
}
// 迭代实现后序遍历
const postOrderTraversal = function(root){
    if(!root){
        return
    }
    const stack = [];
    const res = [];
    stack.push(root);
    while(stack.length){
        let cur = stack.pop();
        res.unshift(cur.val);
        if(cur.left){
            stack.push(cur.left);
        }
        if(cur.right){
            stack.push(cur.right);
        }
    }
    return res;
}
console.log(postOrderTraversal(root));
// 递归实现中序遍历
function inOrder(root){
    if(!root){
        return;
    }
    inOrder(root.left);
    console.log('当前遍历的结点值是',root.val);
    inOrder(root.right);
}
// 迭代实现中序遍历
const inorderTraversal = function(root){
    const res = [];
    const stack = [];
    let cur = root;
    while(cur||stack.length){
        while(cur){
            stack.push(cur);
            cur = cur.left;
        }
        cur = stack.pop();
        res.push(cur.val);
        cur = cur.right;
    }
    return res;
}
// 2.判断对称二叉树
/*
首先判断根节点是否相同
    左子树的右节点和右子树的左节点是否相同
    右子树的左节点和左子树的右节点是否相同
*/
function isSymmetrical(root){
    return isSymmetrical(root,root);
}
function isSymmetricalTree(node1,node2){
    // 判断两个节点都是否为空
    if(!node1&&!node2){
        return true;
    }
    // 判断两个节点是否存在一个为空
    if(!node1||!node2){
        return false;
    }
    // 判断两个节点是否相同
    if(node1.val!=node2.val){
        return false;
    }
    return isSymmetricalTree(node1.left, node2.right) && isSymmetricalTree(node1.right, node2.left);
}

// 3.翻转二叉树 
var invertTree = function(root) {
    if(root == null){return root};
    if(root.left){invertTree(root.left)};
    if(root.right){invertTree(root.right)};
    [root.left,root.right] = [root.right,root.left];
    return root;
};
// 4. 判断是否平衡二叉树
/*
1. 树为null时 是平衡二叉树
2. 利用树的最大深度来确定左右子树的高度差
3. 保证所有的左右子树是平衡二叉树
*/
// 自顶向下
// 自顶而下比较每个节点的左右子树的最大高度差 如果二叉树中每个节点的左右子树最大高度差小于等于1 即每个子树都平衡 此时二叉树才是平衡二叉树
var isBalanced = function(root){
    if(!root){
        return true;
    }
    let left = maxDepth(root.left);
    let right = maxDepth(root.right);
    return Math.abs(right-left)<=1&&isBalanced(root.left)&&isBalanced(root.right);   
}
var maxDepth = function(root){
    if(!root){
        return 0
    }
    let left = maxDepth(root.left);
    let right = maxDepth(root.right);
    return 1 + Math.max(left,right);
}
// 自下而上
/*
利用后序遍历二叉树 从底至顶返回子树最大高度 
判断每个子树是不是平衡树 
如果平衡 则使用它们的高度判断父节点是否平衡 并计算父节点的高度 
如果不平衡返回-1

遍历比较二叉树每个节点的左右子树深度
1. 比较左右子树的深度 若差值大于1 返回一个标记-1 表示当前子树不平衡
2. 左右子树有一个是不平衡的 或左右子树差值大于 1 ，则二叉树不平衡
3. 若左右子树平衡，返回当前树的深度（左右子树的深度最大值 +1 ）
*/
var isBalanced = function (root) {
    return balanced(root) !== -1
};
var balanced = function (node) {
    if (!node) return 0
    const left = balanced(node.left)
    const right = balanced(node.right)
    if (left === -1 || right === -1 || Math.abs(left - right) > 1) {
        return -1
    }
    return Math.max(left, right) + 1
}





















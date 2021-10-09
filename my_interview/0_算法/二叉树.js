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
// 二叉搜索树(Binary Search Tree)简称BTS/排序二叉树/二叉查找树 
// 二叉树的一种特殊形式
// 左孩子<=根节点<=右孩子


let root = {
    val:5,
    left:{
        val:3,
        left:2,
        right:4
    },
    right:{
        val:7,
        left:6,
        right:8
    }
}

// 查找数据域为某一特定值的结点
function search(root,n){
    if(!root){
        return
    }
    if(root.val === n){
        console.log('目标节点是'+root);
    }else if(root.val>n){
        search(root.left,n);
    }else{
        search(root.right,n);
    }
}

search(root,3);

function TreeNode(){
    
}

// 插入新节点
function insertIntoBfs(root,n){
    if(!root){
        root = new TreeNode(n);
        return root
    }
    if(root.val>n){
        root.left = insertIntoBfs(root.left);
    }else{
        root.right = insertIntoBfs(root.right);
    }
    return root;
}
// console.log(insertIntoBfs(root,7));
// console.log(root);

// 删除指定结点

// 定位结点 根据情况进行删除
// 结点不存在 叶子节点 左子树 右子树 左右子树

function delNode(root,n){
    if(!root){
        return
    }
    if(root.val === n){
        if(!root.left&&!root.right){
            root = null;
        }else if(root.left){
            const maxLeft = getMax(root.left);
            root.val = maxLeft.val;
            root.left = delNode(root.left,maxLeft.val);
        }else{
            const minRight = getMin(root.right);
            root.val = minRight.val;
            root.right = delNode(root.right,minRight,val);
        }
    }else if(root.val>n){
        root.left = delNode(root.left,n);
    }else{
        root.right = delNode(root.right,n);
    }
    return root;
}

function getMax(root){
    while(root.right){
        root = root.right;
    }
    return root;
}

function getMin(root){
    while(root.left){
        root = root.left;
    }
    return root;
}

console.log(delNode(root,3));

// 二叉搜索树特性
// 二叉搜索树的中序遍历序列是有序的

// 二叉搜索树验证


// 思路
// 非空树 需要递归对非空树种左右子树进行遍历
// 左《根《右 题种声明不需要考虑相等情况
const isValid = function(root){
    function dfs(root,minValue,maxValue){
        if(!root){
            return 
        }
        if(root.val<=minValue||root.val>=maxValue) return false;
        return dfs(root.left,minValue,root.val)&&dfs(root.right,root.val,maxValue);
    }
    return dfs(root,-Infinity,Infinity);
}

// 将排序数组转化为二叉搜索树
// 将一个按照升序排列的有序数组 转换为一棵高度平衡的二叉搜索树

// 提起来实现数组到目标二叉树的转换
// 二叉搜索树的中序遍历是有序的
// 题种所给的数组也是有序的
// 题中给出的数组就是目标二叉树的中序遍历序列
// 中序 左 根 右 数组中间位置元素一i的那个对应目标二叉树根节点
// 对有序数组每一个对半分出的子序列都递归执行这个操作

// Math.floor()返回小于或等于一个给定数字的最大整数
// 向下取整


const sortedArrayToBSF = function(nums){
    if(!nums.length){
        return null
    }   
    const root = buildBSF(0,nums.length-1);
    function buildBSF(low,high){
        if(low>high){
            return null
        }
        const mid = Math.floor(low+(high-low)/2);
        const cur = new TreeNode(nums[mid]);
        cur.left = buildBSF(low,mid-1);
        cur.right = buildBSF(mid+1,high);
        return cur;
    }
    return root;
}

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































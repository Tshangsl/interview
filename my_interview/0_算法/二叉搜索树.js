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





/*
二叉树编码实现
    JS中 二叉树使用对象定义
    结构分三块
        1.数据域
        2.左侧子节点(左子树根节点)的引用
        3.右侧子节点(右子树根节点)的引用
    定义二叉树构造函数时 需把左右侧子节点都预置为空
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

// 先序遍历一棵二叉树 根左右

// 所有遍历函数的入参都是树的根节点对象
// function preOrder(root){
//     // 递归边界 root为空
//     if(!root){
//         return
//     }
//     // 输出当前遍历的结点值
//     console.log('当前遍历的结点值是:',root.val);
//     // 递归遍历左子树
//     preOrder(root.left);
//     // 递归遍历右子树
//     preOrder(root.right);
// }


function preOrder(root){
    if(!root){
        return;
    }
    console.log('当前遍历的结点值是',root.val);
    preOrder(root.left);
    preOrder(root.right);
}

// 中序遍历 左根右
function inOrder(root){
    if(!root){
        return;
    }
    inOrder(root.left);
    console.log('当前遍历的结点值是',root.val);
    inOrder(root.right);
}
// 后序遍历 左右根
function postOrder(root){
    if(!root){
        return ;
    }
    postOrder(root.left);
    postOrder(root.right);
    console.log('当前遍历的结点值是',root.val);
}

// 判断对称二叉树
/*
首先判断根节点是否相同
    左子树的右节点和右子树的左节点是否相同
    右子树的左节点和左子树的右节点是否相同
*/
// 递归实现对称二叉树判断
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





















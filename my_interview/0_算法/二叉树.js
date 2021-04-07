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











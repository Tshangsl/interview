// 二叉树结点的构造函数
function TreeNode(val){
    this.val = val;
    this.left = this.right = null;
}
// 新建一个二叉树结点
const node = new TreeNode(1);
// 树
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
// 递归实现先序遍历
function preorder(root){
    if(!root){
        return;
    }
    console.log('当前遍历的结点是:',val.root);
    preorder(root.left);
    preorder(root.right);
}
// 递归实现中序遍历
function inorder(root){
    if(!root){
        return;
    }
    inorder(root.left);
    console.log('当前遍历的节点是:',root.val);
    inorder(root.right);
}
// 递归实现后序遍历
function postorder(root){
    if(!root){
        return;
    }
    postorder(root.left);
    postorder(root.right);
}
// 迭代实现先序遍历
// 合适安排出栈入栈时机 使出栈序列符合二叉树的前序遍历
const preorderTraversal = function(root){
    if(!root){
        return;
    }
    let stack = [];
    let res = [];
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
// 迭代实现后序遍历
// 相对于迭代实现前序遍历 根节点位置从第一个变成最后一
// 对比于从stack结构入手 从res结果数组上入手 把pop出来的当前节点unshift进res的头部
const postorderTraversal = function(root){
    if(!root){
        return;
    }
    const res = [];
    const stack = [];
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
// 迭代实现中序遍历 
// 途径每一个结点 都要及时入栈
const inorderTraversal = function(root){
    const res = [];
    const stack = [];
    // 用一个cur1结点充当游标
    let cur = root;
    // 当cur不为空/stack不为空时 重复以下逻辑
    while(cur||stack.length){
        // 把寻找最左叶子节点过程中 途径所有节点都记录下来
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

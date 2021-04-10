/*
    层次:根节点 第一层 子节点 第二层 以此类推
    高度：叶子结点高度1 每上一层高度加1
    度:一个结点开车出去多少子树 被记为结点的度
    叶子结点：度为0的结点
*/
/*
    二叉树
        1.可以没有根结点 作为一棵空树存在
        2.如果它不是空树 
            必须由跟结点 左子树 右子树组成 且左右子树都是二叉树
    JS中二叉树使用对象定义
        结构分三块
            数据域
            左侧子结点(左子树根节点)的引用
            右侧子节点(右子树根节点)的引用
*/
/*
    定义二叉树构造函数时
        需要把左侧子节点和右侧子节点都预置为空
*/

// 二叉树结点的构造函数
function TreeNode(val){
    this.val = val;
    this.left = this.right = null;
}
// 新建一个二叉树结点
const node = new TreeNode(1);

// 二叉树各种姿势遍历 
/*
顺序规则不同
遍历方式四种:
    先序遍历
    中序遍历
    后序遍历
    层次遍历
实现方式不同
    递归遍历(先中后序遍历)
    迭代遍历(层次遍历)
*/

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

// 递归实现
// 最关键的就是这一句console.log()位置不同
// 先序递归 
function preorder(root){
    if(!root){
        return
    }
    console.log('当前遍历的结点是:',root.val);
    preorder(root.left);
    preorder(root.right);
}
console.log('递归先序遍历');
console.log(preorder(root));

// 中序遍历 
function inorder(root){
    if(!root){
        return
    }
    inorder(root.left);
    console.log('当前遍历的结点是:',root.val);
    inorder(root.right);
}
console.log('递归实现中序遍历');
console.log(inorder(root));

// 后序遍历
// 编码实现时 递归边界照旧
// 唯一发生变化的仍然是递归式里调用递归函数的顺序
function postorder(root){
    if(!root){
        return 
    }
    postorder(root.left);
    postorder(root.right);
    console.log('当前遍历的结点是',root.val);
}
console.log('递归实现后序遍历');
console.log(postorder(root));

// 迭代实现
// 先序遍历
const preorderTraversal = function(root){
    if(!root){
        return
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
console.log('迭代实现先序遍历');
console.log(preorderTraversal(root));



const preorderTraversal1 = function(root){
    if(!root){
        return
    }
    let res = [];
    let stack = [];
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
console.log('迭代实现先序遍历');
console.log(preorderTraversal1(root));


























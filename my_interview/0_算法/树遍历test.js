function TreeNode(val){
    this.val = val;
    this.left = this.right = null;
}

// 递归先序遍历
function preOrder(root){
    if(!root){
        return
    }
    console.log('当前遍历的结点是',root.val);
    preOrder(root.left);
    preOrder(root.right);
}

// 递归中序遍历
function inOrder(root){
    if(!root){
        return
    }
    inOrder(root.left);
    console.log('当前遍历的结点值是',root.val);
    inOrder(root.right);
}

// 递归后序遍历
function postOrder(root){
    if(!root){
        return
    }
    postOrder(root.left);    
    postOrder(root.right);
    console.log('当前遍历的节点是',root.val);    
}

// 迭代实现先序遍历
// 合理安排入栈出栈时机 使栈的出栈序列符合二叉树前序遍历规则
// 根 左 右
// 根 入栈出栈 右入栈左入栈 左出栈右出栈
const preorderTraversal = function(root){
    if(!root){
        return
    }
    const stack = [];
    const res = [];
    stack.push(root);
    while(stack.length){
        const cur = stack.pop();
        res.push(cur.val);
        if(cur.right){
            stack.push(cur.right);
        }
        if(cur.left){
            stack.push(cur.left);s
        }
    }
    return res;
}

// 迭代实现后序遍历
















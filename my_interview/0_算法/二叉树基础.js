
//  迭代法实现二叉树先中后序遍历
// 二叉树层序遍历衍生问题
// 翻转二叉树

// 遍历三兄弟编码
// 彼此只有代码顺序上的不同 整体内容基本一致

// 二叉树题目的输入只要没有额外强调 
// 一般来说都是基于一个对象结构嵌套而来

function TreeNode(val){
    this.val = val;
    this.left = this.right = null;
}

// 迭代先序遍历二叉树
// 合理安排入栈出栈时机 
// 使出栈序列符合二叉树的前序遍历规则
// 前序遍历规则 根左右 =>期待的出栈序列
// 出栈顺序和入栈顺序相反 右左根

// 出入栈顺序
/*
    1.将根结点入栈 
    2.取出栈顶结点，将结点值 push 进结果数组 
    3.若栈顶结点有右孩子，则将右孩子入栈
    4.若栈顶结点有左孩子，则将左孩子入栈
*/

// 即本质上将当前子树的根结点入栈、出栈，随后再将其对应左右子树入栈、出栈的过程。

// 重复 2 3 4步骤 直到栈空 得到一个先序遍历序列
function TreeNode(val){
    this.val = val;
    this.left = this.right = null;
}
const root = {
    val: "A",
    left: {
      val: "B",
      left: {
        val: "D"
      },
      right: {
        val: "E"
      }
    },
    right: {
      val: "C",
      right: {
        val: "F"
      }
    }
  };
// const preOrderTraversal = function(root){
//     const res = []
//     if(!root){
//         return
//     }
//     const stack = [];
//     stack.push(root);
//     while(stack.length){
//         const cur = stack.pop();
//         res.push(cur.val);
//         if(cur.right){
//             stack.push(cur.right);
//         }
//         if(cur.left){
//             stack.push(cur.left);
//         }
//     }
//     return res;
// }
// console.log(preOrderTraversal(root));

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


// 迭代实现后续遍历
// 左 右 根
// 把pop出来的当前结点unshift进res的头部 数组的顺序是从后往前填充
// 调整左右结点入栈顺序
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

// 中序迭代遍历
// 左根右
// 必须先定位到最左的叶子结点
// 定位过程中 必然会途径目标结点的父结点、爷爷结点和各种辈分的祖宗结点：
// 途径过的每一个结点，我们都要及时地把它入栈。这样当最左的叶子结点出栈时，第一个回溯到的就是它的父结点：












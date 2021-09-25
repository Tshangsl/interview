// 迭代法实现二叉树先中后序遍历
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


// 迭代实现后序遍历
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

const inorderTraversal = function(root) {
    // 定义结果数组
    const res = []  
    // 初始化栈结构
    const stack = []   
    // 用一个 cur 结点充当游标
    let cur = root  
    // 当 cur 不为空、或者 stack 不为空时，重复以下逻辑
    // stack.length stack存储的是没有被推入结果数组res的待遍历元素
    // 只要stack不空 就意味着遍历没有结束 遍历动作需要继续重复
    while(cur || stack.length) {
        // 这个 while 的作用是把寻找最左叶子结点的过程中，途径的所有结点都记录下来 
        // 寻找最左子节点过程中 把沿途所有结点记录到stack中
        // 记录工作完成后 才会走到外层while的剩余逻辑中
        // 这部分逻辑 从最左叶子结点开始
        // 一层层回溯遍历左孩子的父节点和右侧兄弟结点 
        while(cur) {
            // 将途径的结点入栈
            stack.push(cur)  
            // 继续搜索当前结点的左孩子
            cur = cur.left  
        }
        // 取出栈顶元素
        cur = stack.pop()  
        // 将栈顶元素入栈
        res.push(cur.val)  
        // 尝试读取 cur 结点的右孩子
        cur = cur.right
    }
    // 返回结果数组
    return res
  };

// 层序遍历衍生问题
// BFS+队列
// 变体 BFS过程中围绕结果数组内容

// 对二叉树进行层序遍历时
// 每一次while循环都对应着二叉树的某一层

// ...

// 翻转二叉树
// 每一棵子树 重复 递归

// 思路
// 以递归的方式 遍历树种每一个结点 
// 并将每一个结点的左右孩子进行交换


const invertTree = function(root){
    if(!root){
        return
    }
    let left = invertTree(root.left);
    let right = invertTree(root.right);
    root.left = right;
    root.right = left;
    return root;
}

const invertTree = function(root){
    if(!root){
        return
    }
    let left = invertTree(root.left);
    let right = invertTree(root.right);
    root.left = right;
    root.right = left;
    return root;
}








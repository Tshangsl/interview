// 深度优先搜索 栈
// 核心思想
// 试图穷举所有的完整路径
// 递归式 选择道路的过程 递归边界是死胡同
// 二叉树的先序遍历正是深度优先搜索思想的递归实现

// 深度优先搜索的本质 是栈结构

// 广度优先搜索 队列
// 眼下自己能够到达的所有坐标 其动作有点类似扫描

// 二叉树的层序遍历
// 思维
// 层次 扫描 BFS

function BFS(root) {
    const queue = [] // 初始化队列queue
    // 根结点首先入队
    queue.push(root)
    // 队列不为空，说明没有遍历完全
    while(queue.length) {
        const top = queue[0] // 取出队头元素  
        // 访问 top
        console.log(top.val)
        // 如果左子树存在，左子树入队
        if(top.left) {
            queue.push(top.left)
        }
        // 如果右子树存在，右子树入队
        if(top.right) {
            queue.push(top.right)
        }
        queue.shift() // 访问完毕，队头元素出队
    }
}
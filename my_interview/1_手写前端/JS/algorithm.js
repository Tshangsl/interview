// 1. 最长回文子串问题
var getLongestStr = function(s){
    let len = s.length;
    if(len == 1){return s}
    let res = ''
    for(let i = 0;i<len;i++){
        helper(i,i);
        helper(i,i+1);
    }
    function helper(l,r){
        while(l>=0&&r<len&&s[l]==s[r]){
            l--;
            r++;
        }
        if(r-l-1>res.length){
            res = s.slice(l+1,r);
        }
    }
    return res;
}
// 2. 从前序遍历序列和中序遍历序列构建二叉树&从中序和后序构建二叉树
function TreeNode(val,left,right){
    this.val = val;
    this.left = left;
    this.right = right;
}
// 从前序遍历序列和中序遍历序列构建二叉树
/*
1. 在一开始前序遍历preorder数组的首位对应树的根结点的值
2. 中序遍历inorder中 以根结点所在数组inorder中的位置为分界点 左侧子数组对应根节点的左子树 右侧同理
- 把每个preorder中的节点依次当作根节点 将其对应的子树丛inorder中分离出来 递归解决该问题
*/
let buildTree = function(preorder,inorder){
    if(!preorder.length||!inorder.length){
        return null;
    }
    let node  = new TreeNode(preorder[0]);
    let index = inorder.indexOf(preorder.shift());
    node.left = buildTree(preorder,inorder.slice(0,index));
    node.right = buildTree(preorder,inorder(index+1));
    return node;
}
// 从中序和后序构建二叉树
var buildTree = function(inorder,postorder){
    if(!inorder.length||!postorder.length){
        return null;
    }
    let node = new TreeNode(postorder.pop());
    let p = inorder.indexOf(node.val);
    node.left = buildTree(inorder.slice(0,p),postorder.slice(0,p));
    node.right = buildTree(inorder.slice(p+1),postorder(p))
}
// 3. 复制带随机指针的链表
/*
- 解题思路
1. 遍历两次 先复制各个节点值
2. 再复制各个节点的连接关系
*/
const copyRandomList = head => {
    if (!head) return null;
    const m = new Map();
    let node = head;
    // 遍历旧节点，复制各节点值
    while (node) {
        m.set(node, new Node(node.val));
        node = node.next;
    }
    node = head;
    // 遍历旧节点，复制连接关系
    while (node) {
        m.get(node).next = node.next ? m.get(node.next) : null;
        m.get(node).random = node.random ? m.get(node.random) : null;
        node = node.next;
    }
    return m.get(head);
};
// 4. 岛屿数量问题
// 岛屿数量问题
/*
连续大陆就是一个岛屿
遍历二维数组 每当遇到1开启搜索模式 从当前节点向左/右/上/下 每次分别移动一步 如果是1则替换成0
*/
var numIsLands = function(grid){
    function dfs(grid,i,j){
        // 递归终止条件
        if(i<0||i>grid.length||j<0||j>grid[0].length||grid[i][j] ==='0'){
            return
        }
        // 走过的标记为0
        grid[i][j] = '0';
        dfs(grid, i + 1, j)
        dfs(grid, i, j + 1)
        dfs(grid, i - 1, j)
        dfs(grid, i, j - 1)
    }
    let count = 0;
    for(let i = 0;i<grid.length;i++){
        for(let j = 0;j<grid[0].length;j++){
            if(grid[i][j] === '1'){
                dfs(grid,i,j);
                count++;
            }
        }
    }
    return count;
}
// 5. “扫地机器人”问题
// 6. “合并区间”问题
var merge = function (intervals) {
  let res = [];
  intervals.sort((a, b) => a[0] - b[0]);

  let prev = intervals[0];

  for (let i = 1; i < intervals.length; i++) {
    let cur = intervals[i];
    if (prev[1] >= cur[0]) { // 有重合
      prev[1] = Math.max(cur[1], prev[1]); 
    } else {       // 不重合，prev推入res数组 
      res.push(prev);
      prev = cur;  // 更新 prev
    }
  }

  res.push(prev);
  return res;
};
// 7.寻找二叉树的最近公共祖先
/*
对根结点root p q的分布 有两种可能
1. p q分居root的左右子树 则LCA为root
2. p q存在于root的同一侧子树中 就变成规模小一点的相同问题
- 递归函数 返回当前子树中p和q的LCA 如果没有LCA 就返回null
*/
const lowestCommonAncestor = (root, p, q) => {
    if (root == null) { // 遇到null，返回null 没有LCA
        return null;
    }
    if (root == q || root == p) { // 遇到p或q，直接返回当前节点
        return root;
    }
    // 非null 非q 非p，则递归左右子树
    const left = lowestCommonAncestor(root.left, p, q);
    const right = lowestCommonAncestor(root.right, p, q);
    // 根据递归的结果，决定谁是LCA
    if (left && right) {
        return root;
    }
    if (left == null) {
        return right;
    }
    return left;
};
// 8. 粉刷房子
/*
- 一共有n个房子 三种涂料 以及花费信息
1. 从一座房子开始粉刷 使用颜料1,2,3的花费分别是[17,2,17]
2. 粉刷第二座房子 使用颜料1的花费是16 总花费(1+2座房子)是16+Math.min(2,17)
3. 得到粉刷第二座房子的总花费[16+Math.min(2,17),16+Math.min(17,17),5+Math.min(17,2)]
4. 依次类推，刷完最后一座房子的总花费存储在dp中
5. 返回dp的最小值即可
*/
/**
 * @param {number[][]} costs
 * @return {number}
 */
 var minCost = function (costs) {
    let dp = new Array(3).fill(0)
    for (let i = 0; i < costs.length; i++) {
        let p1 = costs[i][0] + Math.min(dp[1], dp[2])
        let p2 = costs[i][1] + Math.min(dp[0], dp[2])
        let p3 = costs[i][2] + Math.min(dp[0], dp[1])
        dp = [p1, p2, p3]
    }
    return Math.min(...dp)
};

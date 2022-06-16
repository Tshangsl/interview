// N皇后问题 回溯算法
/*
回溯套路
1. 遍历枚举所有可能的选择
2. 依次尝试这些选择 做出一种选择 并往下递归
3. 如果这个选择产生不出正确的解 要撤销这个选择(将当前的Q恢复为.) 回到之前的状态 并作出下一个可用的选择
- 选择 探索 撤销选择 识别出死胡同 则回溯 尝试下一个点 不做无效的搜索
*/
/*
回溯的三要点
1. 选择 决定了搜索空间 决定了搜索空间有哪些节点
2. 约束 用来剪枝 避免进入无效分支
3. 目标 决定什么时候捕获有效的解 提前结束递归开始回溯
*/
const solveNQueens = (n)=>{
    const board = new Array(n);
    for(let i = 0;i<n;i++){
        board[i] = new Array(n).fill('.');
    }
    // 列集 记录出现过皇后的列
    const cols = new Set();
    // 正对角线集
    const diag1 = new Set();
    // 反对角线集
    const diag2 = new Set();
    const helper = (row)=>{
        if(row == n){
            const stringsBoard = board.slice();
            for(let i = 0;i<n;i++){
                stringsBoard[i] = stringsBoard[i].join('');
            }
            res.push(stringsBoard);
            return;
        }
        for(let col = 0;col<n;col++){
            // 如果当前点所在的列 所在的对角线都没有皇后 即可选择 否则跳过
            if(!cols.has(col)&&!diag1.has(row+col)&&!diag2.has(row-col)){
                // 放置皇后
                board[row][col] = 'Q';
                // 记录放了皇后的列
                cols.add(col);
                // 记录放了皇后的正对角线
                diag2.add(row-col)
                // 记录放了皇后的负对角线
                diag1.add(row+col);
                helper(row+1);
                // 撤销该点的皇后
                board[row][col] = '.'
                // 对应记录删除
                cols.delete(col);
                diag2.delete(row-col);
                diag1.delete(row+col);
            }
        }
    }
    helper(0);
    return res;
}
// 全排列问题 回溯算法
/*
1. 每一位都有3种选择 1 2 3
2. 每一次都做选择 展开一棵空间树
3. 利用约束条件[不能重复选] 做剪纸 减去不会产生正确解的选项 
    - 用一个hashMap 记录选过的数 下次遇到相同的数 跳过
    - 这样就不会进入[不会得出解的分支] 做无效的搜索
*/
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
 var permute = function(nums) {
    let res = [];
    let used = {};
    const helper = function(cur){
        if(cur.length === nums.length){
            res.push(cur.slice());
            return;
        }
        for(let a of nums){
            if(used[a]){
                continue;
            }
            cur.push(a);
            used[a] = true;
            helper(cur);
            cur.pop();
            used[a] = false;
        }
    }
    helper([]);
    return res;
};
console.log(permute([1,2,3]));


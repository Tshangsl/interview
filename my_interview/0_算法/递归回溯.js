// 全排列问题

// 思维
// 穷举 DFS 深度优先遍历(用递归实现)
// 重复逻辑(排除掉类似数组遍历这种简单粗暴的重复) 递归

// 重复的内容 递归式
// 1.检查手里剩下的数字有哪些
// 2.选取其中一个填进当前的坑里     
// 重复的重点 递归边界

// 全排列
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
const permute = function (nums) {
    const len = nums.length
    const curr = []
    const res = []
    const visited = {}
    function dfs(nth) {
        if (nth === len) {
            res.push(curr.slice())
            return
        }
        for (let i = 0; i < len; i++) {
            if (!visited[nums[i]]) {
                visited[nums[i]] = 1
                curr.push(nums[i])
                dfs(nth + 1)
                curr.pop()
                visited[nums[i]] = 0
            }
        }
    }
    dfs(0)
    return res
};
console.log(permute([2,5,6,7]));
// 时间复杂度 O(n!)
// 空间复杂度 O(n)


//括号栈问题
const leftToRight = {
    "(": ")",
    "[": "]",
    "{": "}"
};

/**
 * @param {string} s
 * @return {boolean}
 */
const isValid = function (s) {
    if (!s) {
        return true;
    }
    const stack = [];
    const len = s.length;
    for (let i = 0; i < len; i++) {
        const ch = s[i];
        if (ch === "(" || ch === "{" || ch === "[") stack.push(leftToRight[ch]);
        else {
            if (!stack.length || stack.pop() !== ch) {
                return false;
            }
        }
    }
    return !stack.length;
};
console.log(isValid('[({})]'));
// 时间复杂度 O(n)
// 空间复杂度 O(n)

const find = function(arr,target){
    let flatArr = [];
    for(let i = 0;i<arr.length;i++){
        flatArr.push(...arr[i]);
    }
    flatArr.sort();
    let i = 0;
    while(i<flatArr.length){
        if(flatArr[i] === target){
            return true;
        }
    }
    return false;
}

function BinarySearch(arr,item) {
    var left = 0,
        right = arr.length-1
    while(left<=right){
        var mid = Math.floor((left+right)/2)
        if(arr[mid] == item){
            return mid
        }
        else if(arr[mid]>item){
            right = mid-1
        }
        else{
            left = mid+1
        }
    }
    return false
}
let arr1 = [[1,2,3],[4,5,6],[7,8,9]];
let arr2 = [[9,8,7],[6,5,4],[3,2,1]]
console.log(find(arr1,12));
console.log(find(arr2,9));

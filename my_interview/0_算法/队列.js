/**
 队列
    1.栈向队列转化 
        考察的是数据结构中的经典内容
        覆盖了两个大的知识点
    2.双端队列
    3.优先队列
        属于高级数据结构 本质是二叉堆结构
 */

// 如何用栈实现一个队列
// 使用栈实现队列下列操作
/*
    push(x) -- 将一个元素放入队列的尾部。
    pop() -- 从队列首部移除元素。
    peek() -- 返回队列首部的元素。
    empty() -- 返回队列是否为空。
*/


// 让栈底的元素首先被取出 让出栈序列被逆序
// 两个栈实现队列数据结构 
// 所有的出队操作都只能依赖stack2完成
// 确保stack1里的元素都能按照正确的顺序(逆序)出栈

const MyQueue = function () {
    this.stack1 = [];
    this.stack2 = [];
}

MyQueue.prototype.push = function (x) {
    this.stack1.push(x);
}

MyQueue.prototype.pop = function () {
    // 假如stack2不为空呢
    if (this.stack2.length <= 0) {
        while (this.stack1.length !== 0) {
            this.stack2.push(this.stack1.pop());
        }
    }
    return this.stack2.pop();
}

MyQueue.prototype.peek = function () {
    if (this.stack2.length <= 0) {
        while (this.stack1.length != 0) {
            this.stack2.push(this.stack1.pop());
        }
    }
    let len = this.stack2.length;
    return this.stack2[len - 1];
}

MyQueue.prototype.empty = function () {
    // stack1和stack2都为空队列为空
    return !this.stack1.length && this.stack2.length;
}

// 双端队列 衍生 滑动窗口文图
// 就是允许在队列两端进行插入和删除的队列
// 体现在编码上 
// 最常见的载体是即允许使用pop push同时又允许使用shift unshift的数组

// 滑动窗口问题

// 双指针+遍历

// 思路
// 遍历素组过程中 约束一个窗口 窗口本质一个范围
// 约束范围 可以双指针 分别指向窗口两端
const maxSlidingWindow = function (nums, k) {
    let res = [];
    let len = nums.length;
    let left = 0;
    let right = k - 1;
    while (right < len) {
        const max = calMax(nums, left, right);
        res.push[max];
        left++;
        right++;
    }
    return res;
}
function calMax(arr, left, right) {
    if (!arr || !arr.length) {
        return
    }
    let maxVal = arr[left];
    for (let i = left; i <= right; i++) {
        if (maxVal < arr[i]) {
            maxVal = arr[i];
        }
    }
    return maxVal;
}

console.log(maxSlidingWindow([1, 3, -1, -3, 5, 3, 6, 7], 3));


// 双端队列法
// 变O(kn)=>O(n) 要丢掉k
// 窗口滑动
// 窗口发生移动时 只根据发生变化的元素对最大值进行更新
// 使用双端队列法 核心思想 维护一个有效递减队列
// 维持递减队列目的 确保队头元素始终是当前窗口最大值
// 遍历到的元素达到k个 意味着滑动窗口第一个最大值已经产生 把其push进结果数组
// 为确保队列的有效性 需即使检查队列中1是否在
// 在的话要及时踢出去 因为队列本身只维护当前滑动窗口内的元素

// 1.检查队尾元素       维持队列递减性
// 2.将当前元素入队
// 3.检查队头元素       位置队列有效性
// 4.判断滑动窗口状态
// const maxSlidingWindow2 = function(nums,k){
//     const len = nums.length;
//     const res = [];
//     const deque = [];
//     for(let i = 0;i<len;i++){
//         // 当队尾元素小于当前元素
//         while(deque.length&&nums[deque[deque.length-1]]<nums[i]){
//             deque.pop();
//         }
//         // 入队当前元素索引
//         deque.push(i);
//         // 当队头元素的索引已经被排除在滑动窗口之外
//         while(deque.length&&deque[0]<i-k){
//             deque.shift();
//         }
//         // 判断滑动窗口状态 只有在被遍历元素个数大于k时 更新结果数组
//         if(i>=k-1){
//             res.push(nums[deque[0]])
//         }
//     }
//     return res;
// }
// console.log(maxSlidingWindow2([1, 3, -1, -3, 5, 3, 6, 7],3));

const sidLingWindow = function (nums, k) {
    const len = nums.length;
    const res = [];
    // 双端队列中存储的仅是索引
    const deque = [];
    for (let i = 0; i < len; i++) {
        // 当队尾元素小于当前元素
        while (deque.length && nums[deque[deque.length - 1]]) {
            deque.pop()
        }
        // 入队当前索引
        deque.push(i);
        // 队头元素索引被排除在滑动窗口之外
        while (deque.length && deque[0] < i - k) {
            deque.shift()
        }
        // 判断滑动窗口状态
        if (i > k - 1) {
            res.push(nums[deque[0]]);
        }
    }
    return res;
}
console.log(sidLingWindow([1, 3, -1, -3, 5, 3, 6, 7],3));


const maxSlidingWindow2 = function (nums, k) {
    const len = nums.length;
    const res = [];
    const deque = [];
    for (let i = 0; i < len; i++) {
        // 前三个都是对双端队列操作
        // 队尾
        while (deque.length && nums[i] > nums[deque[deque.length - 1]]) {
            deque.pop();
        }
        deque.push(i);
        // 队头
        while (deque.length && deque[0] <= i - k) {
            deque.shift();
        }
        // 对结果数组进行操作
        if(i>=k-1){
            res.push(deque[0]);
        }
    }
    return res;
}
console.log(maxSlidingWindow2([1, 3, -1, -3, 5, 3, 6, 7],3));













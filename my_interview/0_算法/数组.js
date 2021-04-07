/*
真题描述： 、
给定一个整数数组 nums 和一个目标值 target，
请你在该数组中找出和为目标值的那 两个 整数，
并返回他们的数组下标。
*/

// 思维
// Map解决  两数求和问题
// 两层循环(很多时候意味着O(n^2)的时间复杂度) 空间换时间 优化成一层循环 
// 空间换时间 Map
// 几乎所有求和问题 都可以转化为求差问题

// 解题思路
// 遍历数组过程中 增加一个Map来记录已经遍历过的数字及其对应索引
// 每遍历到一个新数字 都会Map里面查询targetNum与该数的差值
// 是否已经在前面的数字中出现过
// 键值对存储可以用ES6里的Map来做 也可以使用对象直接量定义

// const twoSum = function(nums,target){
//     // 用对象来模拟Map
//     const diffs = {};
//     // 缓存数组长度
//     const len = nums.length;
//     // 遍历数组
//     for(let i = 0;i<len;i++){
//         // 判断当前值对应的target差值是否存在(是否已经遍历过)
//         if(diffs[target-nums[i]!=undefined]){
//             // 若有对应值 则get答案
//             return [diffs[target-nums[i]],i]
//         }
//         // 若没有对应值 则记录当前值
//         diffs[nums[i]] = i;        
//     }
// }

const twoSum = function (nums, target) {
    let diffs = {};
    let len = nums.length;
    for (let i = 0; i < len; i++) {
        if (diffs[target - nums[i]] != undefined) {
            return [diffs[target - nums[i]], i]
        }
        diffs[nums[i]] = i;
    }
}

// 思维
// 遇到有序数组 优先想到双指针解决问题
// 两个指针同时遍历会减少空间复杂度和时间复杂度
const merge = function (nums1, m, nums2, n) {
    // 初始化两个指针的指向 初始化nums1尾部索引k
    let i = m - 1, j = n - 1, k = m + n - 1;
    // 当两个数组都没遍历完时 指针同步移动
    while (i >= 0 && j >= 0) {
        // 取较大的值从末尾向前填补
        // 从两个有序数组末尾比 第一次比较更大的就是 整个合并完数组最大的
        // 假如第一次操作
        if (nums1[i] >= nums2[j]) {
            nums1[k] = nums1[i];
            i--
            k--
        } else {
            nums1[k] = nums2[j];
            j--
            k--
        }
    }
    // nums2留下来的情况 特殊处理一下
    while (j >= 0) {
        nums1[k] = nums2[j];
        k--
        j--
    }
}

// 用这种方法
const merge = function (nums1, m, nums2, n) {
    let right1 = m - 1;
    let right2 = n - 1;
    let len = m + n - 1;
    while (right1 >= 0 && right2 >= 0) {
        if (nums1[right1] >= nums2[right2]) {
            nums1[len--] = nums1[right1--];
        } else {
            nums1[len--] = nums2[right2--];
        }
    }
    while (right2 >= 0) {
        nums1[len--] = nums2[right2--];
    }
    return nums1;
}

//双指针法 两有序数组合并成一个有序数组
const merge = function (nums1, m, nums2, n) {
    let right1 = m - 1, right2 = n - 1, len = m + n - 1;
    while (right1 >= 0 && right2 >= 0) {
        if (nums1[right1] > nums2[right2]) {
            nums1[len--] = nums1[right1--];
        } else {
            nums1[len--] = nums2[right2--];
        }
    }
    while (right2 >= 0) {
        nums1[len--] = nums2[right2--];
    }
    return nums1;
}

// 三数求和问题 双指针法

// 思维
// 把求和问题变成求差问题 

// 双指针方法优点
// 空间换时间
// 降低问题复杂度
// 涉及求和、比大小类的数组题目里时，
// 大前提往往是：该数组必须有序。
// 否则双指针根本无法帮助我们缩小定位的范围，压根没有意义。

// 思路
// 固定其中一个数 在剩下的数中寻找是否右两个数和这个固定数相加等于0
// 首先将数组排序(双指针法的前提)

// nums = nums.sort((a,b)=>{
//     return a-b;
// })

const threeSum = function(nums){
    // 用于存放结果数组
    let res = []
    // 给nums排序
    nums = nums.sort((a,b)=>{
        return a-b
    })
    // 缓存数组长度
    const len = nums.length;
    //  遍历到倒数第三个足够 左右指针会遍历后面两个数
    
}






















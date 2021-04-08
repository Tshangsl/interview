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
// const merge = function (nums1, m, nums2, n) {
//     let right1 = m - 1;
//     let right2 = n - 1;
//     let len = m + n - 1;
//     while (right1 >= 0 && right2 >= 0) {
//         if (nums1[right1] >= nums2[right2]) {
//             nums1[len--] = nums1[right1--];
//         } else {
//             nums1[len--] = nums2[right2--];
//         }
//     }
//     while (right2 >= 0) {
//         nums1[len--] = nums2[right2--];
//     }
//     return nums1;
// }

// //双指针法 两有序数组合并成一个有序数组
// const merge = function (nums1, m, nums2, n) {
//     let right1 = m - 1, right2 = n - 1, len = m + n - 1;
//     while (right1 >= 0 && right2 >= 0) {
//         if (nums1[right1] > nums2[right2]) {
//             nums1[len--] = nums1[right1--];
//         } else {
//             nums1[len--] = nums2[right2--];
//         }
//     }
//     while (right2 >= 0) {
//         nums1[len--] = nums2[right2--];
//     }
//     return nums1;
// }

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
// 对数组进行遍历 每次遍历到哪个数字 就固定哪个数字
// 把左指针指向该数字后面一个坑里的是数字 把右指针指向数组末尾 让左右指针从起点开始 向中间前进
// 不重复的三元组 需要做一个重复元素的跳过处理


// sort方法 对原数组进行排序 不生成副本
// nums = nums.sort((a,b)=>{
//     return a-b;
// })

// const threeSum = function(nums){
//     // 用于存放结果数组
//     let res = []
//     // 给nums排序
//     // 为什么要用sort给nums排序
//     nums = nums.sort((a,b)=>{
//         return a-b
//     })
//     // 缓存数组长度
//     const len = nums.length;
//     //  遍历到倒数第三个足够 左右指针会遍历后面两个数
//     for(let i = 0;i<len-2;i++){
//         // 从数组第一个元素依次固定 
//         // 左指针j
//         let j = i+1;
//         // 右指针k
//         let k = len-1;
//         // 如果遇到重复的数字 则跳过
//         // 新指向的元素和原来的元素比
//         if(i>0&&nums[i] === nums[i-1]){
//             continue
//         }
//         while(j<k){
//             // 三数之和小于0 左指针前进
//             if(nums[i]+nums[j]+nums[k]<0){
//                 j++;
//                 // 处理左指针元素重复问题
//                 while(j<k&&nums[j] === nums[j-1]){
//                     j++;
//                 }
//             }else if(nums[i]+nums[j]+nums[k]>0){
//                 // 三数之和大于0 右指针后退
//                 k--;
//                 // 处理右指针元素重复问题
//                 while(j<k&&nums[k] === nums[k+1]){
//                     k--;
//                 }
//             }else{
//                 // 得到目标数字组合 推入结果数组
//                 res.push([nums[i],nums[j],nums[k]]);
//                 // 左右指针一起前进
//                 j++;
//                 k--;
//                 // 左右都是新指向的元素和原指向的元素比
//                 // 若左指针元素重复 跳过
//                 while(j<k&&nums[j]===nums[j-1]){
//                     j++;
//                 }
//                 // 若右指针元素重复 跳过
//                 while(j<k&&nums[k] === nums[k+1]){
//                     k--;
//                 } 
//             }
//         }
//     }
//     // 返回结果数组
//     return res;
// }



const threeSum = function(nums){
    let res = [],len = nums.length;
    nums.sort((a,b)=>{
        return a-b
    })
    for(let i = 0;i<len-2;i++){
        let j = i+1;
        let k = len-1;
        while(j<k&&nums[i+1]==nums[i]){
            continue;
        }
        if(nums[i]+nums[j]+nums[k]<0){
            j++;
            while(j<k&&nums[j]===nums[j-1]){
                j++;
            }
        }else if(nums[i]+nums[j]+nums[k]>0){
            k--;
            while(j<k&&nums[k] === nums[k+1]){
                k--;
            }
        }else{
            res.push([nums[i],nums[j],nums[k]]);
            j++;
            k--;
            // 每一次指针改变都要判断一下是否和原有重复
            while(j<k&&nums[j] === nums[j-1]){
                j++;
            }
            while(j<k&&nums[k] === nums[k+1]){
                k--;
            }
        }
    }
    return res;
}

console.log(threeSum([-1, 0, 1, 2, -1, -4]));
console.log('///');













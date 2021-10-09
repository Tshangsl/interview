/*
基础排序算法：
    1.冒泡排序 最好O(n) 最坏O(n^2) 平均(n^2)
    2.插入排序 最好O(n) 最坏O(n^2) 平均(n^2)
    3.选择排序 都是O(n^2)
进阶排序算法(分治)
    4.归并排序 O(nlog(n))
    5.快速排序 最好O(nlog(n)) 最坏O(n^2) 平均(nlog(n))

1.冒泡排序
时间复杂度
    1.最好时间复杂度：它对应的是数组本身有序这种情况。在这种情况下，我们只需要作比较（n-1 次），而不需要做交换。时间复杂度为 O(n)
    2.最坏时间复杂度： 它对应的是数组完全逆序这种情况。在这种情况下，每一轮内层循环都要执行，重复的总次数是 n(n-1)/2 次，因此时间复杂度是 O(n^2)
    3.平均时间复杂度：这个东西比较难搞，它涉及到一些概率论的知识。实际面试的时候也不会有面试官摁着你让你算这个，这里记住平均时间复杂度是 O(n^2) 即可。

基本思路分析
冒泡排序的过程，就是从第一个元素开始，重复比较相邻的两个项，若第一项比第二项更大，则交换两者的位置；反之不动。
每一轮操作，都会将这一轮中最大的元素放置到数组的末尾。假如数组的长度是 n，那么当我们重复完 n 轮的时候，整个数组就有序了。
*/


// 基本冒泡排序
// 重复比较相邻的两个项
function bubbleSort(arr) {
    const len = arr.length;
    for (let i = 0; i < len; i++) {
        for (let j = 0; j < len - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
            }
        }
    }
    return arr;
}


// 基本冒泡排序改进
function betterBubbleSort(arr) {
    const len = arr.length;
    for (let i = 0; i < len; i++) {
        for (let j = 0; j < len - 1 - i; j++) {
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
            }
        }
    }
    return arr;
}


let arr = [1, 4, 23, 2, 67, -12];

// O(n)时间复杂度
// 冒泡排序进一步改进
// 标志位 
// 可以帮助第一次冒泡时定位到数组是否完全有序
// 将最好情况下的时间复杂度定向优化为O(n)

function betterBubbleSort2(arr) {
    const len = arr.length;
    for (let i = 0; i < len; i++) {
        let flag = false;
        for (let j = 0; j < len - 1 - i; j++) {
            if (arr[j] > arr[j + 1]) {
                flag = true;
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
            }
        }
        // 若一次交换也没有发生过 说明
        if (flag === false) return arr;
    }
    return arr;
}

console.log(betterBubbleSort2(arr));

// 时间复杂度
// 最好 数组本身有序 只需要作比较（n-1 次），而不需要做交换。时间复杂度为 O(n)
// 最坏 数组完全逆序
// 平均


// 选择排序
// 最小值

function selectSort(arr){
    let len = arr.length;
    for(let i = 0;i<len;i++){
        let minIndex = i;
        for(let j = i;j<len;j++){
            if(arr[j]<arr[minIndex]){
                minIndex = j;
            }
        }
        if(minIndex!=i){
            [arr[i],arr[minIndex]] = [arr[minIndex],arr[i]];
        }
    }
    return arr;
}
console.log(selectSort(arr));

// 时间复杂度
// 最好情况最坏情况 两者区别仅在元素交换次数不同
// 但是都要走内层循环作比较
// 三个时间复杂度都对应两层循环消耗的时间量级： O(n^2)。



// 插入排序
// 核心思想
// 找到元素在它前面那个序列中的正确位置
// 所有操作基于一个前提
// 当前元素前面的序列是有序的
// 从后往前寻找当前元素在前面序列中正确位置

// 插入排序原则
// 靠前的较大数字要为靠后的较小数字腾出位置
// 通过正确地定位当前元素在有序序列里的位置 不断扩大有序数组地范围
// 最终达到完全排序的目的



// 分治
// 分而治之
// 将一个大问题分解为若干子问题
// 针对子问题分别求解后 再将子问题的解整合成大问题的解

// 分治思想解决问题一般三步走
/*
    1.分解子问题
    2.求解每个子问题
    3.合并子问题的解 得出大问题的解
*/

// 归并排序
// 对分治思想典型应用

/*
    1.分解子问题 将需要被排序的数组从中间分割成两半 重复 单个子数组只有一个元素
    2.求解每个子问题 从粒度最小子数组开始 两两合并
    3.合并子问题的解 得出大问题的解
*/

// 思路 
// 分割 合并
// 重复(递归/回溯) 有去有回(回溯)

// 归并排序实现上依托的就是递归思想
function mergeSort(arr){
    const len = arr.length;
    if(len<=1){
        return arr;
    }
    const mid = Math.floor(len/2);
    const leftArr = mergeSort(arr.slice(mid,len));
    arr = mergeArr(leftArr,rightArr)
    return arr;
}


// 归并排序时间复杂度O(nlog(n))


























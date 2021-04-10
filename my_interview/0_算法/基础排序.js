/*
基础排序算法：
    1.冒泡排序 最好O(n) 最坏O(n^2) 平均(n^2)
    2.插入排序 最好O(n) 最坏O(n^2) 平均(n^2)
    3.选择排序 都是O(n^2)
进阶排序算法(分治)
    4.归并排序 O(nlog(n))
    5.快速排序 最好O(nlog(n)) 最坏O(n^2) 平均(nlog(n))
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


















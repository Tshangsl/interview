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












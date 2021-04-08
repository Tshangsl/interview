// // 三数求和 双指针法 求和化求差
const threeSum = function(nums){
    let res =[],len = nums.length;
    // 按照升序排列
    // sort函数没有使用参数时 将按字母顺序对数组中元素进行排序
    // 如果想按照其他标准进行排序就需要提供比较函数
    // 该函数要比较两个值 然后返回一个用于说明这两个值的相对顺序的数字
    // 比较函数应该具有两个参数 a b 其返回值如下
    // a<b 在排序后的数组中a应该出现在b之前俺 则返回一个小于0的值
    // a==b 则返回0
    // a>b 则返回一个大于0的值
    nums = nums.sort((a,b)=>{
        return a-b;
    })
    for(let i = 0;i<len-2;i++){
        let j = i+1;
        let k = len-1;
        if(i>0&&nums[i] == nums[i-1]){
            continue;
        }
        while(j<k){
            if(nums[i]+nums[j]+nums[k]<0){
                j++;
                while(j<k&&nums[j] === nums[j-1]){
                    j++
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
                while(j<k&&nums[j] == nums[j-1]){
                    j++;                
                }
                while(j<k&&nums[k] == nums[k+1]){
                    k--;
                }
            }
        }
    }
    return res;
}
console.log('三数求和');
console.log(threeSum([-1, 0, 1, 2, -1, -4]));
// 双指针法合并两个有序数组

const mergeArray = function(nums1,m,nums2,n){
    let right1 = m-1;
    let right2 = n-1;
    let k = m+n-1;
    while(right1>=0&&right2>=0){
        if(nums1[right1]>nums2[right2]){
            nums1[k--] = nums1[right1--];
        }else{
            nums1[k--] = nums2[right2--];
        }
    }            
    if(right2>=0){
        nums1[k--] = nums2[right2--];
    }
    return nums1;
}
console.log('合并两个有序数组');
console.log(mergeArray([1,2,3],3,[4,5,6],3));


// let obj1 = {
//     name:'lisi',
//     age:'zhangsan'
// }
// console.log(obj1['name']);
// 两数求和 **
// 求和问题 转化为求差问题
const twoSum = function(nums,target){
    let res={},len = nums.length;
    for(let i = 0;i<len;i++){
        if(res[target-nums[i]]!=undefined){
            return [res[target-nums[i]],i]   
        }
        res[nums[i]] = i;
    }
}
console.log('两数求和');
console.log(twoSum([2, 7, 11, 15],9));

// 1.反转字符串
const str = 'hello';
const res = str.split('').reverse().join('');
console.log(res);
// 2.判断一个字符串是否是回文字符串
function isPalindrome(str){
    const reverseStr = str.split('').reverse().join('');
    if(str === reverseStr){
        return true;
    }
    return false;
}
console.log(isPalindrome('hello'));
console.log(isPalindrome('heh'));
// 3.判断一个字符串是否是回文字符串
function isPalindrome2(str){
    let len = str.length;
    for(let i = 0;i<len/2;i++){
        if(str[i]!=str[len-i-1]){
            return false;
        }
    }
    return true;
}
console.log(isPalindrome2('world'));
console.log(isPalindrome2('wow'));
// 4.给定一个字符串 最多只能删除一个字符 判断是否能成为回文字符串
const validPalindrome = function(str){
    let len = str.length;
    let i = 0,j = len-1;
    while(i<j){
        if(str[i]==str[j]){
            return true;
        }
        i++;
        j--;
    }
    // 跳过左指针情况
    if(isPalindrome(
        i+1,j)){
        return true;
    }
    // 跳过右指针情况
    if(isPalindrome(i,j+1)){
        return true;
    }
    function isPalindrome(st,ed){
        while(st<ed){
            if(str[st] != str[ed]){
                return false;
            }
            st++;
            ed--;
        }
        return true;
    }
}

console.log(validPalindrome('strtss'));
// 5.字符串匹配问题 正则表达式
// 要求字符串可以被添加&搜索 字符串添加时一定要被存在某处 键值对存储 Map对象字面直接量模拟Map
// 降低查找复杂度 字符串长度为key 
// Search这个API 可搜索文字 可搜索正则表达式
//判断传入的是普通字符串还是正则表达式 
// 普通字符串 Map中查找是否有这个key
// 正则表达式 创建一个正则表达式对象 判断Map中相同长度字符串中
// 是否存在一个能够与这个正则相匹配
const WordDictionary = function(){
    
}








// 6.字符串数字之间转换问题 正则表达式
// 实现一个atoi函数 使其能将字符串转换成整数


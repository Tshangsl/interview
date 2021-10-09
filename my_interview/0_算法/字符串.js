// 反转字符串
let str = 'hello world';
str = str.split('').reverse().join('');
console.log('反转字符串');
console.log(str);
// 判断回文1
function isPalindrome(str) {
    reverseStr = str.split('').reverse().join('');
    return reverseStr === str;
}
console.log('回文字符串1');
console.log(isPalindrome('1112'));
// 判断回文2
function isPalindrome2(str) {
    let len = str.length;
    for (let i = 0; i < len / 2; i++) {
        if (str[i] !== str[len - i - 1]) {
            return false;
        }
    }
    return true;
}
console.log('回文字符串2');
console.log(isPalindrome2('111'));
// 回文衍生1
// 思维 对称性 双指针
const validPalindrome = function (s) {
    let len = s.length;
    let i = 0, j = len - 1;
    while (i < j && s[i] == s[j]) {
        i++;
        j--;
    }
    if (isPalindrome1(++i, j)) {
        return true;
    }
    if (isPalindrome1(i, --j)) {
        return true;
    }
    function isPalindrome1(st, ed) {
        while (st < ed) {
            if (s[st] != s[ed]) {
                return false;
            }
            st++;
            ed--;
        }
        return true;
    }
    return false;
}
console.log('回文字符串衍生');
console.log(validPalindrome('deddg'));
// 字符串匹配问题 正则表达式

// 思路
// 要求字符串既可以被添加又可以被搜索
// 字符串在添加时一定要被存在某处
// 键值对存储 我们用Map(或对象字面量来模拟Map)

// 为了降低查找时复杂度 可以考虑以字符串长度为key1
// 相同长度的字符串存在一个数组中 
// 这样可以提高后续定位的效率

// search这个API
// 既可以搜索文字 又可以搜索正则表达式
// 搜索前额外判断 
// 普通字符串   去Map中查找是否有这个key
// 正则表达式   创建一个正则表达式对象
// 判断Map中相同长度的字符串里 是否存在一个能够与这个正则相匹配

const WordDictionary = function () {
    // 初始化一个对象直接量 承担Map角色
    this.words = {}
}
// 添加字符串方法
WordDictionary.prototype.addWord = function (word) {
    if (this.words[word.length]) {
        this.words[word.length].push(word)
    } else {
        this.words[word.length] = [word];
    }
}

WordDictionary.prototype.search = function (word) {
    if (!this.words[word.length]) {
        return false;
    }
    const len = word.length;
    if (!word.includes('.')) {
        return this.words[len].includes(word)
    }
    const reg = new RegExp(word)
    return this.words[len].some((item) => {
        return reg.test(item);
    })
}


let w1 = new WordDictionary();
w1.addWord('hello');
w1.addWord('world');
console.log('正则表达式初步');
console.log(w1.search('hel..'));
console.log(w1.search('world'));


// 字符串与数字之间转换问题 正则表达式

// 思路
// 拿到字符串先去空格
// 识别开头+ - 号
// 非整数字符不识别
// 把两个边界值计算出来 做卡口

// 计算卡口 计算某个数的n次方
// 要用到Math.pow方法

// 1.计算最大值
const max = Math.pow(2, 31) - 1;
const min = -max - 1;

// 2.解析字符串 正则
// 摘除空格两个方法
// 1.string里的trim方法
// 2.匹配的时候 匹配空格 \s*匹配0个或多个空格 不把它放在捕获组中
// 正则表达式匹配过程中 所有的摘除动作 都可以通过将匹配到的结果排除在捕获组之外实现
// 捕获组 正则表达式中被小括号括住的部分

// 3.获取捕获结果
// JS正则相关方法中 test方法返回一个布尔值
// 单纯判断是都匹配
// 想要获取匹配结果 需要调度match()方法
const reg = /\s*([-\+]?[0-9]*).*/
const groups = str.match(reg);
// match方法 一个在字符串中执行查找匹配的String方法 它返回一个数组 在未匹配时会返回null
// ...

// 4.判断卡口
// 把捕获的结果转换成数字 查看是否超出题目要求范围
// 入参是一个字符串
const myAtoi = function(str) {
    // 编写正则表达式
    const reg = /\s*([-\+]?[0-9]*).*/
    // 得到捕获组
    const groups = str.match(reg)
    // 计算最大值
    const max = Math.pow(2,31) - 1
    // 计算最小值
    const min = -max - 1
    // targetNum 用于存储转化出来的数字
    let targetNum = 0
    // 如果匹配成功
    if(groups) {
        // 尝试转化捕获到的结构
        targetNum = +groups[1]
        // 注意，即便成功，也可能出现非数字的情况，比如单一个'+'
        if(isNaN(targetNum)) {
            // 不能进行有效的转换时，请返回 0
            targetNum = 0
        }
    }
    // 卡口判断
    if(targetNum > max) {
        return max
    } else if( targetNum < min) {
        return min
    }
    // 返回转换结果
    return targetNum
};
// 3.给定一个非空字符串 s，最多删除一个字符。判断是否能成为回文字符串。











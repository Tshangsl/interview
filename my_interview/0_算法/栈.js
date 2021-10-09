// 很多时候相关题目中压根不会出现“栈”、“队列”这样的关键字
// 思维
// 算法题除了理解还要靠练习，就像高考数学题，要锻炼出解题常规思维。任重道远

// 有效括号问题

// 思路
// 括号问题一般首选用栈来做
// 括号 对称性
// 根据栈后进先出规则 一组数据入栈和出栈顺序刚好是对称的
// 规律：题目中若涉及括号问题，则很有可能和栈相关。

// 遍历字符串过程中 往栈里push括号对应的配对字符
// 假如字符串中所有的括号都成立，那么前期我们 push 进去的一定全都是左括号、后期 push 进去的一定全都是右括号。而且左括号的入栈顺序，和其对应的右括号的入栈顺序应该是相反的
// 左括号全部入栈结束时，栈顶的那个左括号，就是第一个需要被配对的左括号。此时我们需要判断的是接下来入栈的第一个右括号是否和此时栈顶的左括号配对。如果配对成功，那么这一对括号就是有效的，否则直接 return false。
// 判断出一对有效的括号之后，我们需要及时地丢掉它，去判断其它括号是否有效。这里这个“丢掉”的动作，就对应着两个括号一起出栈的过程。
// 每配对成功一对括号，我们都将这对括号出栈。这样一来，我们就可以确保栈顶的括号总是下一个需要被匹配的左括号。
// 出栈到最后，栈不为空，那么意味着一部分没有被匹配上的括号被剩下来了，说明字符串中并非所有的括号都有效，判断 false；反之，则说明所有的括号都配对成功了，判断为 true。

let obj1 = {
    name: 'lisi',
    age: 23
}
console.log(obj1['name']);

// map结构维护左括号右括号关系
// const leftToRight = {
//     '(':')',
//     '[':']',
//     '{':'}'
// }
// JS中栈数据结构是用数组实现的
// const isValid = function(s){
//     if(!s) return false;
//     let len = s.length;
//     const stack = [];
//     for(let i = 0;i<len;i++){
//         let ch = s[i];
//         if(ch === '('||ch ==='{'||ch === '['){
//             stack.push(leftToRight[ch]);
//         }else{
//             if(!stack.length&&stack.pop()!==ch){
//                 return false;
//             }
//         }
//     }
//     return !stack.length;
// }


const leftToRight = {
    '(': ')',
    '[': ']',
    '{': '}'
}
const isValid = function (s) {
    if (!s) return false;
    // JS中的栈和队列都是用数组实现的
    let stack = [];
    let len = s.length;
    for (let i = 0; i < len; i++) {
        let ch = s[i];
        if (ch === '(' || ch === '[' || ch === '{') {
            stack.push(leftToRight[ch]);
        } else {
            if (stack.length && ch !== stack.pop()) {
                return false;
            }
        }
    }
    return !stack.length;
}

let s1 = '([])';
console.log(isValid(s1));

// 栈问题进阶 每日温度问题

// 思维
// 一个数组两层遍历 属于比较少见且高危操作
// 栈结构可以帮我们避免重复操作
// 避免重复操作：及时将不必要数据出栈

// 思路
// 尝试维持一个递减栈
// 这个过程中 仅对每一个温度执行最多一次入栈操作 一次出栈操作
// 整个数组只会被遍历一次 时间复杂度O(n)

// const dailyTemperature = function(T){
//     const len = T.length;
//     // 用一个栈结构做中间商处理
//     const stack = [];
//     const res = (new Array(len)).fill(0);
//     for(let i = 0;i<len;i++){
//         while(stack.length&&T[i]>T[stack[stack.length-1]]){
//             // 将栈顶温度值对应的索引出栈
//             const top = stack.pop();
//             // 计算当前栈顶我呢度值与第一个高于它的温度值的索引差值
//             res[top] = i - top;
//         }
//         // 栈里存放不是温度值而是索引值 
//         stack.push(i);
//     }
//     return res;
// }

const dailyTemperature = function(T){
    let len = T.length;
    let stack = [];
    let res = (new Array(10)).fill(0);
    for(let i = 0;i<len;i++){
        while(stack.length&&T[i]>T[stack[stack.length-1]]){
            let top = stack.pop();
            res[top] = i-top;
        }
        stack.push(i);
    }
    return res;
}
let arr1 = [73, 74, 75, 71, 69, 72, 76, 73];
console.log(dailyTemperature(arr1));

// 最小栈问题
// push() pop() top() getMin()
// 相对全面考察 对栈结构 栈操作理解掌握

// getMin方法第一种实现 

// 初始化自定义栈结构
// const MinStack = function(){
//     this.stack = [];
// }
// // 栈的入栈操作(数组的push方法)
// MinStack.prototype.push = function(x){
//     this.stack.push(x);
// }
// // 栈的出栈操作(数组的pop方法)
// MinStack.prototype.pop = function(){
//     this.stack.pop()
// }
// // 取栈顶元素 
// MinStack.prototype.top = function(){
//     // 边界条件判断
//     if(!this.stack||!this.stack.length){
//         return
//     }
//     return this.stack[this.stack.length-1];
// }
// // 一次遍历思路取最小值
// MinStack.prototype.getMin = function(){
//     let minStack = Infinity;
//     const {stack} = this;
//     for(let i = 0 ;i<stack.length;i++){
//         if(stack[i]<minStack){
//             minStack = stack[i]
//         }
//     }
//     return minStack;
// }

// let m1 = new MinStack();
// m1.push('1');
// m1.push('2');
// m1.push('3');
// m1.pop();
// console.log(m1.top());
// console.log(m1.getMin());


const MinStack = function(){
    this.stack = [];
}

MinStack.prototype.push = function(x){
    this.stack.push(x);
}

MinStack.prototype.pop = function(){
    this.stack.pop();
}

MinStack.prototype.top = function(){
    // 边界值判断
    if(!this.stack||!this.stack.length){
        return
    }
    return this.stack[this.stack.length-1];
}


MinStack.prototype.minValue = function(){
    let minStack = Infinity;
    const {stack} = this;
    for(let i =0;i<stack.length;i++){
        if(stack[i]<minStack){
            minStack = stack[i];
        }
    }
    return minStack;
}

let m1 = new MinStack();
m1.push(1);
m1.push(333);
m1.push(-23);
m1.push(23);
console.log(m1.top());
console.log(m1.minValue());

// 思维 时间效率的提升意味着更多的空间占有为代价

// 思路
// stack2做辅助 让这个栈容纳当前最小值
//递减栈 实现的是一个从栈底到栈顶呈递减趋势的栈
// 取最小值 由于整个栈从栈底到栈顶递减 栈顶元素就是最小元素
// 若有新元素入栈 判断是不是比栈顶元素小 否则不准进栈
// 若有元素出栈：判断是不是和栈顶元素相等，如果是的话，stack2 也要出栈。

const MinStack2 = function(){
    this.stack = [];
    this.stack2 = [];
}

MinStack2.prototype.push = function(x){
    if(this.stack2.length===0||x<=this.stack2[this.stack2.length-1]){
        this.stack2.push(x);
    }
    this.stack.push(x);
}

MinStack2.prototype.pop = function(){
    if(this.stack.pop() == this.stack2[this.stack2.length-1]){
        this.stack2.pop();
    }
}

MinStack2.prototype.top = function(){
    return this.stack[this.stack.length-1];
}

MinStack2.prototype.getMin = function(){
    return this.stack2[this.stack2.length-1];    
}
let m2 =new MinStack2();
m2.push(1); 
m2.push(-56); 
m2.push(43); 
m2.push(-25);
console.log('方法二');
console.log(m2.top()); 
console.log(m2.getMin());

// 单调栈思路
/*
1. 用一个栈保存每天的温度在数组中的下标
2. 每次从数组中读取一个温度 然后将其与栈中保存的温度(根据下标可以得到温度)进行比较
3. 如果当前温度比位于栈顶的温度高 那么就能知道位于栈顶那一天需要等待几天才会出现更高的温度
4. 然后出栈一次 将当前温度和下一个位于栈顶的温度进行比较
5. 如果栈中已经没有比当前温度低的温度 则将当前温度在数组中的下标入栈
保存在栈中的温度(通过数组下标可以得到温度)是递减排序的 这是因为如果当前温度比位于栈顶的温度高
位于栈顶的温度将出栈 所以每次入栈时当前温度一定比位于栈顶的温度低或相同
*/
var dailyTemperature = function(temperatures){
    let result = new Array(temperatures.length).fill(0);
    let stack = [];
    for(let i =0;i<temperatures.length;i++){
        while(
            stack.length&&
            temperatures[i]>temperatures[stack[stack.length-1]]
        ){
            let prev = stack.pop();
            result[prev] = i-prev;
        }
        stack.push(i);
    }
    return result;
}

// 1.“有效括号”问题
// 2.栈问题进阶-每日温度问题
// 3.栈的设计——“最小栈”问题
// 4.栈向队列的转化
// 5.双端队列
// 6.优先队列


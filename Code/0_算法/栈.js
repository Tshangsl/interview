//1. 有效括号问题
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

// 2.每日温度问题

// 思路
// 尝试维持一个递减栈
// 这个过程中 仅对每一个温度执行最多一次入栈操作 一次出栈操作
// 整个数组只会被遍历一次 时间复杂度O(n)

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

// 3. 最小栈问题
// push() pop() top() getMin()
// 相对全面考察 对栈结构 栈操作理解掌握

// getMin方法第一种实现 

// 初始化自定义栈结构
const MinStack = function(){
    this.stack = [];
}
// 栈的入栈操作(数组的push方法)
MinStack.prototype.push = function(x){
    this.stack.push(x);
}
// 栈的出栈操作(数组的pop方法)
MinStack.prototype.pop = function(){
    this.stack.pop()
}
// 取栈顶元素 
MinStack.prototype.top = function(){
    // 边界条件判断
    if(!this.stack||!this.stack.length){
        return
    }
    return this.stack[this.stack.length-1];
}
// 一次遍历思路取最小值
MinStack.prototype.getMin = function(){
    let minStack = Infinity;
    const {stack} = this;
    for(let i = 0 ;i<stack.length;i++){
        if(stack[i]<minStack){
            minStack = stack[i]
        }
    }
    return minStack;
}

let m1 = new MinStack();
m1.push('1');
m1.push('2');
m1.push('3');
m1.pop();
console.log(m1.top());
console.log(m1.getMin());
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
// 4.栈向队列的转化

// 5.双端队列
// 6.优先队列


/*
    JS中 栈和队列实现一般都要依赖于数组
    栈和队列
        特殊的数组
        两种运算受限的线性表
        两者区别在于各自对数组增删操作有不一样的限制
*/
/*
    数组添加元素三种方法：
        首unshift
        尾push
        任意splice
    数组删除元素三种方法
        首shift
        尾pop
        任意splice
*/

/*
    栈LIFO：只用pop和push完成增删的数组
*/
/*
    队列:只用push和shift完成增删的数组
*/
/*
    链表:(JS中的链表 是以嵌套的对象的形式来实现的)
        和数组相似 都是有序的列表 都是线性结构(有且仅有一个前驱/后继)
        不同：
            链表中数据单位的名称叫结点
            结点和结点的分布 在内存中可以是离散的
        数组：元素是连续的 每个元素内存地址可以根据其索引距离数组头部距离计算出来
            对数组来说 每一个元素都可以通过数组的索引下标直接定位      
        链表:每一个结点的结构都包含两部分内容
            数据域 存储当前结点所存储的数据值
            指针域 代表下一个结点(后续结点)的引用
            设定一个head指针来专门指向链表的开始位置
*/
// 链表结点的创建
function ListNode(val){
    this.val = val;
    this.next = null;
}
// 使用构造函数创建结点时
// 传入val 数据域对应的值内容
// 指定next 下一个链表结点
const node = new ListNode(1);
node.next = new ListNode(2);
// 以上创建出一个数据域值为1 next结点数据域值为2的链表节点

/*
链表的结点间关系是通过next指针来维系的
    链表元素的添加和删除操作 本质上都是在围绕next指针做文章
    任意两节点间插入一个新节点
        需要变更前驱节点和目标节点的next指向
*/

// 链表元素添加

const node1 = new ListNode(1);
const node2 = new ListNode(2);
node1.next = node2;

const node3 = new ListNode(3);
node1.next = node3;
node3.next = node2;

console.log(node1);

// 链表元素删除
// 删除操作重点不是定位目标节点 而是定位目标结点的前驱结点
// 删除 在链表的遍历过程中 无法再遍历到某个节点的存在

node1.next = node3.next;
console.log(node1);


/*
    数组增加/删除操作对应的复杂度是O(n)
    JS中不一定是(JS数组未必是真正的数组)
        只定义一种类型的元素 对应的是连续内存
        定义不同类型元素    对应的是非连续内存
            此时JS数组不再具有数组特征
            其底层使用哈希映射分配内存空间
            是由对象链表实现的
    链表添加删除元素：
        都不需要挪动多余元素
        链表中添加和删除操作复杂度固定O(n)
*/
// 访问
// 数组 O[1]
// 链表 O[n]

// 链表访问 试图读取某一个特定的链表结点时 必须遍历整个链表来查找它
const index = 10;
let node = head;
for(let i = 0 ;i<index&&node;i++){
    node = node.next;
}

/*
结论
    链表插入/删除效率较高 访问效率较低
    数组访问效率较高 插入/删除效率较低
*/







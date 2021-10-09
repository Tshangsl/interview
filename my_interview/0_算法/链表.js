// 思维
// 环形链表和链表反转一样 有着相对恒定的解题思路和适当变体
// 1.如何判断链表是否成环
// 一个环形链表 能够让遍历它的游标回到原点
// 从flag出发 回到flag 说明正在遍历一个环形链表

function ListNode(val){
    this.val = val;
    this.next = null;
}


// 入参是头结点
const hasCycle = function(head){
    while(head){
        if(head.flag){
            return true
        }else{
            // 如果flag没立过 就立一个flag再走
            head.flag = true;
            head = head.next;
        }
    }    
    return false;
}


// 环形链表衍生问题 定位环的起点
// 思路
// 如果一个结点是环形链表成环的起点
// 它一定是第一个被发现flag标志已存在的结点
// 只需要在第一次发现flag已存在时 将对应的结点返回即可
const detectCycle = function(head){
    while(head){
        if(head.flag){
            return head;
        }else{
            head.flag = true;
            head = head.next
        }
    }
    return null;
}

// 快慢指针方法定位环的起点
// slow 一次走一步
// fast 一次走两步 
// 如果它们在一个有环的链表里移动 一定有相遇时
// 移动的次数是t slow移动路程t fast移动路程2t 环长度s
// 2t-t=s t=s 时slow fast会相遇
// 两者没有相遇 fast遍历到链表末尾 
// 发现next指针指向null 则链表中不存在环

// 立flag法 理解难度和编码程度上更优化

// 快慢指针法
const decCycle = function(head){
    if(!head||!head.next){
        return 
    }
    let fast = head;
    let slow = head;
    while(fast&&fast.next){
        fast = fast.next.next
        slow = slow.next;
        if(slow == fast){
            return slow;
        }
    }
    return null;
}

const decCycle = function(head){
    if(!head||!head.next){
        return null;
    }
    let slow = head;
    let fast = head;
    while(fast&&fast.next.next){
        fast = fast.next.next;
        slow = slow.next;
        if(slow == fast){
            return slow;
        }
    }
    return null;
}

// 思维
// 环形链表系列题目
// 在于想明白这个成环过程 把握成环后特性
// 真正编码实现 寥寥数行就可以搞定

// 做算法题时，不要急于下手写代码，而应该先静下心来，稳住神、一步一步捋清楚你自己的思路。


/*
链表题目分类
    链表的处理 合并 删除！
    链表的反转及其衍生
    链表成环及其衍生
*/

// 单向链表特点
/*
    1.用一组任意的内存空间去存储数据元素
        这里的内存空间可以是连续/不连续
    2.每个节点(node)都由数据本身和一个指向后续节点的指针组成
    3.整个链表的存取都必须从头指针开始 头指针指向第一个节点
    4.最后一个节点的指针指向空NULL
*/

// 链表中几个主要操作
/*
    创建节点
    插入节点
    搜索/遍历节点
    删除节点
    合并
*/

// 初始化节点
/*
    指针指向空
    存储数据
*/
class Node{
    constructor(key){
        this.next = null;
        this.key = key;
    }
}

// 初始化单向链表
// 每个链表都有一个头指针 指向第一个节点 没节点则指向null
class List{
    constructor(){
        this.head = null;
    }
}


// 链表的合并
// 将两个有序链表合并为一个新的有序链表并返回。新链表是通过拼接给定的两个链表的所有结点组成的。 

// 思维
// 处理链表的本质 是处理链表结点之间的指针关系

// 思路
// 考虑 l1 和 l2 两个链表长度不等的情况：若其中一个链表已经完全被串进新链表里了，而另一个链表还有剩余结点，考虑到该链表本身就是有序的，我们可以直接把它整个拼到目标链表的尾部。

// params对函数参数进行解释
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */

function ListNode(val, next) {
    this.val = (val === undefined ? 0 : val);
    this.next = (next === undefined ? null : next);
}

// const mergeTwoLists = function (l1, l2) {
//     // 定义头结点 确保链表可以被访问到
//     let head = new ListNode();
//     // cur头指针
//     let cur = head;
//     // 这里的l1和l2是两个结点
//     while (l1 && l2) {
//         //l1的结点值较小   
//         if (l1.val <= l2.val) {
//             //先串起l1的结点
//             cur.next = l1
//             l1 = l1.next
//         } else {
//             // ls较小时
//             cur.next = l2
//             l2 = l2.next
//         }
//         // 针在串起一个结点后，也会往前一步
//         cur = cur.next;
//     }
//     // 处理链表不等长情况
//     cur.next = l1 == null ? l2 : l1
//     // 返回起始节点
//     return head.next
// }

const mergeTwoLists = function(l1, l2) {
    // 定义头结点，确保链表可以被访问到
    let head = new ListNode()
    // cur 这里就是咱们那根“针”
    let cur = head
    // “针”开始在 l1 和 l2 间穿梭了
    while(l1 && l2) {
        // 如果 l1 的结点值较小
        if(l1.val<=l2.val) {
            // 先串起 l1 的结点
            cur.next = l1
            // l1 指针向前一步
            l1 = l1.next
        } else {
            // l2 较小时，串起 l2 结点
            cur.next = l2
            // l2 向前一步
            l2 = l2.next
        }
        
        // “针”在串起一个结点后，也会往前一步
        cur = cur.next 
  
    }
    
    // 处理链表不等长的情况
    cur.next = l1!==null?l1:l2
    // 返回起始结点
    return head.next
  };

let f2 = new ListNode(2, 3);
let f1 = new ListNode(1, f2);
// console.log(f1);
// console.log(f2);

let f6 = new ListNode(3, 5);
let f5 = new ListNode(2, f6);
let f4 = new ListNode(2, f5);
let f3 = new ListNode(1, f4);

console.log(mergeTwoLists(f1, f3));

// 删除排序链表重复元素
const deleteDuplicates = function(head){
    let cur = head;
    while(cur!=null&&cur.next!=null){
        if(cur.val == cur.next.val){
            cur.next = cur.next.next;
        }else{
            cur = cur.next;
        }
    }
    return head;
}

console.log(deleteDuplicates(f3));

// 删除问题延申dummy节点
// 链表的第一个结点 因为没有前驱结点 导致无从下手
// dummy结点解决该问题
// 人为制造出来的第一个结点的前驱结点，
// 这样链表中所有的结点都能确保有一个前驱结点，也就都能够用同样的逻辑来处理了。

// 思路
// 定义一个dummy结点 指向链表起始位置
// 重复的结点 while循环
// const dulDelete = function(head){
//     if(!head||!head.next){
//         return head
//     }
//     let dummy = new ListNode();
//     dummy.next = head;
//     let cur = dummy;
//     while(cur.next&&cur.next.next){
//         if(cur.next.val == cur.next.next.val){
//             let val = ctx.next.val;
//             while(cur.next&&cur.next.val === val){
//                 cur.next = cur.next.next;
//             }
//         }else{
//             cur = cur.next;
//         }
//     }
//     return dummy.next;
// }

const delDuplicates = function(head) {
    // 极端情况：0个或1个结点，则不会重复，直接返回
    if(!head || !head.next) {
        return head
    }
    // dummy 登场
    let dummy = new ListNode() 
    // dummy 永远指向头结点
    dummy.next = head   
    // cur 从 dummy 开始遍历
    let cur = dummy 
    // 当 cur 的后面有至少两个结点时
    while(cur.next && cur.next.next) {
        // 对 cur 后面的两个结点进行比较
        if(cur.next.val === cur.next.next.val) {
            // 若值重复，则记下这个值
            let val = cur.next.val
            // 反复地排查后面的元素是否存在多次重复该值的情况
            while(cur.next && cur.next.val===val) {
                // 若有，则删除
                cur.next = cur.next.next 
            }
        } else {
            // 若不重复，则正常遍历
            cur = cur.next
        }
    }
    // 返回链表的起始结点
    return dummy.next;
};
console.log(delDuplicates(f3));
// 快慢指针 多指针
// 反复的遍历 相对复杂的链表操作(如反转 指定位置的删除)
// 两个一前一后地指针 两个指针往一个方向走
// 一个块 一个慢 
// 快慢指针严格来说只能有俩，不过实际做题中，可能会出现一前、一中、一后的三个指针，这种超过两个指针的解题方法也叫“多指针法”。

// 快慢指针+多指针 解决链表中大部分复杂操作
// dummy结点 处理头结点为空边界问题
// 链表操作 涉及结点删除(对前去结点存在性要求比较高)

// const dummy = new ListNode();
// dummy.next = head;

// 删除倒数第n个节点
const removeNthFromEnd = function(head,n){
    let slow = fast = head;
    while(n--){
        fast = fast.next;
    }
    if(!fast){
        return slow.next;
    }
    while(fast.next){
        fast = fast.next;
        slow = slow.next;
    }
    slow.next = slow.next.next;
    return head;
}
// 快慢指针 删除链表地倒是第N个结点
// 思路
// 倒数第N个 正数第len-n+1

/*
方法一
    两次遍历
    1.求长度
    2.做减法 找定位
*/

/*
方法二
    快慢指针
        把做减法和找定位过程融合
        通过快指针先行一步、接着快慢指针一起前进这个操作，巧妙地把两个指针之间的差值保持在了“n”上
        用空间换时间，本质上其实就是对关键信息进行提前记忆，这里咱们相当于用两个指针对差值实现了记忆
        这样当快指针走到链表末尾（第 len 个）时，慢指针刚好就在 len - n 这个地方稳稳落地
*/
function ListNode(val = 0, next = null) {
    this.val = val;
    this.next = next;
}
function ListNode(val, next) {
    this.val = (val === undefined ? 0 : val);
    // 肯定指向的是下一个next
    this.next = (next === undefined ? null : next);
}
/**
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
const removeFromEnd = function (head, n) {
    let dummy = new ListNode();
    dummy.next = head;
    let fast = dummy;
    let slow = dummy;
    while (n) {
        fast = fast.next;
        n--;
    }
    while (fast.next) {
        fast = fast.next;
        slow = slow.next;
    }
    slow.next = slow.next.next;
    return dummy.next;
}

let f4 = new ListNode(4, 5);
let f3 = new ListNode(3, f4);
let f2 = new ListNode(2, f3);
let f1 = new ListNode(1, f2);
// // let head = new ListNode(null,f1);
console.log(removeFromEnd(f1, 2));



// 多指针法 链表反转
// 定义一个函数，输入一个链表的头结点，反转该链表并输出反转后链表的头结点。

// 思维
// 处理链表的本质是处理链表结点之间的指针关系

// 思路
// 如何反转指针的指向
// 需要用到三个指针
// 目标结点cur 目标结点前驱节点pre 目标结点的后继结点（next）
// cur.next = pre 做到next指针反转
// 从第一个结点开始 
// 每个结点都给它进行一次 next 指针的反转。到最后一个结点时，整个链表就已经被我们彻底反转掉了。
// const reverseList = function (head) {
//     let pre = null;
//     let cur = head;
//     while (cur !== null) {
//         // 此处记录next是为下面cur=next
//         let next = cur.next;
//         cur.next = pre;
//         pre = cur
//         cur = next;
//     }
//     return pre;
// }
// console.log(reverseList(f1));

// 局部反转一个列表
// 思路
// 单纯重复逆序这个动作外 需要对被逆序的区间前后两个结点做额外处理
// 从前往后遍历
// 避免结点1和结点2随着遍历向后推进被遗失
// 需要提前把1结点缓存下来
// 结点5就没有这么麻烦了：随着遍历的进行，当我们完成了结点4的指针反转后，此时 cur 指针就恰好指在结点5上：
// 此时我们直接将结点2的 next 指针指向 cur、将结点1的 next 指针指向 pre 即可。

// dummy.next永远指向链表头结点

const reverseBetween = function(head,m,n){
    let pre,cur,leftHead;
    let dummy = new ListNode();
    dummy.next = head;
    let p = dummy;
    for(let i = 0;i<m-1;i++){
        p = p.next;
    }
    leftHead = p;

}

// ...未完成
// 反转链表 迭代
var reverseList = function(head) {
    let prev = null, curr = head
    while (curr) {
        const next = curr.next
        curr.next = prev
        prev = curr
        curr = next
    }
    return prev
};

// 反转链表 递归
var reverseList = function(head) {
    if (head == null || head.next == null) return head
    const p = reverseList(head.next)
    head.next.next = head
    head.next = null
    return p
};











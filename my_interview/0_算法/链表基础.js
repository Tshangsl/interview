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



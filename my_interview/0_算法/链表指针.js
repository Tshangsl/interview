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







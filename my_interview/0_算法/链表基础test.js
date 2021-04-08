function ListNode(val, next) {
    this.val = (val === undefined ? 0 : val);
    // 肯定指向的是下一个next
    this.next = (next === undefined ? null : next);
}
const mergeTwoLists = function (l1, l2) {
    let head = new ListNode();
    let cur = head;
    while (l1 && l2) {
        if (l1.val <= l2.val) {
            // cur.next指向的是下一个结点 不是结点的数值
            cur.next = l1;
            l1 = l1.next;
        } else {
            cur.next = l2;
            l2 = l2.next;
        }
        cur = cur.next;
    }
    // 处理链表不等长s
    cur.next = l1 == null ? l2 : l1;
    return head.next;
}
let f1 = new ListNode(1, 2);
let f2 = new ListNode(5, f1);

let f3 = new ListNode(3, 5);
let f4 = new ListNode(2, f3);

console.log(mergeTwoLists(f2, f4));
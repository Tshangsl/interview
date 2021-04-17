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


// 思维
// 环形链表系列题目
// 在于想明白这个成环过程 把握成环后特性
// 真正编码实现 寥寥数行就可以搞定

// 做算法题时，不要急于下手写代码，而应该先静下心来，稳住神、一步一步捋清楚你自己的思路。










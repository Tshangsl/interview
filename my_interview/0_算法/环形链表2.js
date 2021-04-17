function ListNode(val){
    this.val = val;
    this.next = null;
}

// const hasCycle = function(head){
//     while(head){
//         if(head.flag){
//             return true;
//         }else{
//             head.flag = true;
//             head = head.next;
//         }
//     }
//     return false;
// }

const hasCycle = function(head){
    while(head){
        if(head.flag){
            return true;
        }else{
            head.flag = true;
            head = head.next;
        }
    }
    return false;
}

// 环形链表衍生问题 定位环的起点
const detectCycle = function(head){
    while(head){
        if(head.flag){
            return head;
        }else{
            head.flag = true;
            head = head.next;
        }
    }
    return null;
}

// 快慢指针
// 2t-t = s t= s 满足时一定相遇
const decCycle = function(head){
    if(!head||!head.next){
        return
    }
    let fast = head;
    let slow = head;
    while(fast&&fast.next){
        fast = fast.next.next;
        slow = slow.next;
        if(slow == fast){
            return slow
        }
    }
    return null;
}














// 1.实现36进制转换
function getNums36() {
    var nums36 = [];
    for (var i = 0; i < 36; i++) {
        if (i >= 0 && i <= 9) {
            nums36.push(i);
        } else {
            nums36.push(String.fromCharCode(i + 87));
        }
    }
}
// 十进制转为36进制
function scale36(n) {
    var arr = [];
    var nums36 = getNums36();
    while (n) {
        var res = n % 36;
        //作为下标 对应的36进制 转换成
        arr.unshift(nums36[res]);
        // 去掉个位
        n = parseInt(n / 36);
    }
    return arr.join("");
}
// 2.前序遍历判断对称二叉树
var isSymmetric = function (root) {
    if (root == null) {
        return true;
    }
    return isSym(root.left, root.right);
}
function isSym(left, right) {
    if (left == null && right == null) {
        return true;
    }
    if(left == null||right == null){
        return false;
    }
    if(left.val != right.val){
        return false;
    }
    return arguments.callee(left.left,right.right)&&arguments.callee(left.right,right.left);
}












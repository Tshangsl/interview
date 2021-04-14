// this指针指向的题目 Promise同步异步 需要练习
// 算法 需要复习 扩展
// 前端手写函数复习

var length = 10;
function fn(){
    return this.length+1;
}
var obj = {
    length:5,
    test1:function(){
        return fn()
    }
}
obj.test2 = fn;
console.log(obj.test1());//6
console.log(fn()===obj.test2())//false


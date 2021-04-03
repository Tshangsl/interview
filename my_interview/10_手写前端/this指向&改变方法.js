// 1.
/*
this永远指向最后调用它的那个对象
本例中 
非严格模式 a() => window.a()
严格模式   全局对象undefined 报错 
Uncaught TypeError: Cannot read property 'name' of undefined
*/
"use strict"
var name = "windowsName";
function a() {
    var name = "Cherry";

    console.log(this.name);          // windowsName

    console.log("inner:" + this);    // inner: Window
}
a();
console.log("outer:" + this)         // outer: Window
// 2 对象a调用函数fn
var name = "windowsName";
var a = {
    name: "Cherry",
    fn : function () {
        console.log(this.name);      // Cherry
    }
}
a.fn();
// 3.this永远指向最后调用它那个对象 最后调用它的对象仍是对象a
var name = "windowsName";
    var a = {
        name: "Cherry",
        fn : function () {
            console.log(this.name);      // Cherry
        }
    }
    window.a.fn();
// 4.this永远指向最后调用它的那个对象 
// 最后调用fn的对象是a 即使a中没有name这个属性
// 也不会向上一个对象寻找this.name 而是直接输出undefined
var name = "windowsName";
var a = {
    // name: "Cherry",
    fn : function () {
        console.log(this.name);      // undefined
    }
}
window.a.fn();
// 5.this永远指向最后调用它的那个对象
// 由于刚刚的f并没有被调用 
// fn()最后仍然是被window调用
// 所以this指向也就是window
var name = "windowsName";
var a = {
    name : null,
    // name: "Cherry",
    fn : function () {
        console.log(this.name);      // windowsName
    }
}

var f = a.fn;
f();
// 6，
var name = "windowsName";

function fn() {
    var name = 'Cherry';
    innerFunction();
    function innerFunction() {
        console.log(this.name);      // windowsName
    }
}

fn()

/*
改变this指向几种方法
    1.使用ES6的箭头函数
    2.在函数内部使用_this = this
        先将调用这个函数的对象保存在变量_this中
        然后在函数中都使用这个_this
        这样_this不会改变
    3.使用apply call bind
        apply()方法调用一个函数 其具有一个指定的this值
        以及作为一个数组(或类似数组的对象)提供的参数
        fun.apply(thisArg,[argsArray])
            thisArg:fun函数运行时指定的this值
                    指定的this值并不一定是该函数执行时真正的this值
                    如果该函数处于非严格模式下 
                    则指定为null/undefined时会自动指向全局对象
                    (浏览器中就是window对象)
                    值为原始值(数值/字符串/布尔)的this会指向该原始值的自动包装对象
            argsArray：一个数组或类数组对象 
                    其中数组对象将作为单独的参数传给fun函数
                    如果该参数的值为null/undefined
                    则表示不需要传入任何参数
                    从ECMAScript5开始可以使用类数组对象
    4.new一个实例化对象
*/

/*
apply与call基本类似 只是传入的参数不同
apply语法    fun.apply(thisArg,[argsArray])
call语法     fun.call(thisArg[, arg1[, arg2[, ...]]])
call方法接受的时若干参数列表
apply方法接收一个包含多个参数的数组
*/

var a ={
    name : "Cherry",
    fn : function (a,b) {
        console.log( a + b)
    }
}

var b = a.fn;
b.apply(a,[1,2])     // 3

var a ={
    name : "Cherry",
    fn : function (a,b) {
        console.log( a + b)
    }
}

var b = a.fn;
b.call(a,1,2)       // 3


/*
bind()方法创建一个新的函数
当被调用时
将其this关键字设置为提供的值
在调用新函数时 在任何提供之前提供一个给定的参数序列
*/

// bind是创建一个新的函数 需要手动调用
var a ={
    name : "Cherry",
    fn : function (a,b) {
        console.log( a + b)
    }
}

var b = a.fn;
b.bind(a,1,2)()           // 3


















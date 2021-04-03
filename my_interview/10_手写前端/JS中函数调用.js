/*
函数调用的方法一共有4种
    1.作为一个函数调用
    2.函数作为方法调用
    3.使用构造函数调用函数
    4.作为函数方法调用函数(call/apply)
*/
// 1.作为一个函数调用
var name = "windowsName";
    function a() {
        var name = "Cherry";

        console.log(this.name);          // windowsName

        console.log("inner:" + this);    // inner: Window
    }
    a();
    console.log("outer:" + this)         // outer: Window
/*
    最简单一个函数
    不属于任何一个对象 就是一个函数
    非严格模式指向window
    严格模式指向undefined
    全局函数 容易产生命名冲突 不建议这样使用s
*/

// 2.函数作为方法调用
var name = "windowsName";
var a = {
    name: "Cherry",
    fn : function () {
        console.log(this.name);      // Cherry
    }
}
a.fn();
/*
this永远指向最后调用它的那个对象
在fn中this指向a
*/

// 3.使用构造函数调用函数
/*
如果函数调用前使用了new关键字 则是调用了构造函数
这看起来像创建了新的函数 实际上JavaScript函数是重新创建的对象
*/
// 构造函数:
function myFunction(arg1, arg2) {
    this.firstName = arg1;
    this.lastName  = arg2;
}

// This    creates a new object
var a = new myFunction("Li","Cherry");
a.lastName;                             // 返回 "Cherry"

// 。。。。

// 4.作为函数方法调用函数























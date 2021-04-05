// 1.数据类型判断
function typeOf(obj){
    // let res = Object.prototype.toString.call(obj);
    let res = Object.prototype.toString.call(obj).split(' ')[1];
    // res = res.substring(0,res.length-1).toLowerCase()
    res = res.substring(0,res.length-1)
    return res;
}
console.log(typeOf([]));        // 'array'
console.log(typeOf({}));        // 'object'
console.log(typeOf(new Date))   // 'date'
// 2.原型链继承
/*
存在问题
1.原型中包含的引用类型属性将被所有实例共享
2.子类在实例化时不能给父类构造函数传参
*/
function Animal(){
    this.colors = ['black','white']
}
Animal.prototype.getColor = function(){
    return this.colors;
}
function Dog(){

}
Dog.prototype = new Animal();

let dog1 = new Dog();
dog1.colors.push('yellow');
let dog2 = new Dog();
console.log(dog2.colors);
// 3.借用构造函数实现继承
// 解决了原型链继承两个问题 引用类型共享和传参
// 由于方法必须定义在构造函数中 导致每次创建子类实例都会擦黄健一遍方法
function Animal(name){
    this.name = name;
    this.getName = ()=>{
        return this.name;
    }
}
function Dog(name){
    Animal.call(this,name);
}
Dog.prototype = new Animal();
// 4.组合继承
/*
结合原型链和盗用构造函数
使用原型链继承原型上属性和方法
通过盗用构造函数继承属性
把方法定义在原型上得以实现重用 让每个实例都有自己的属性
*/
function Animal(name) {
    this.name = name
    this.colors = ['black', 'white']
}
Animal.prototype.getName = function() {
    return this.name
}
function Dog(name, age) {
    Animal.call(this, name)
    this.age = age
}
Dog.prototype =  new Animal()
Dog.prototype.constructor = Dog

// let dog1 = new Dog('奶昔', 2)
// dog1.colors.push('brown')
// let dog2 = new Dog('哈赤', 1)
// console.log(dog2) 
// { name: "哈赤", colors: ["black", "white"], age: 1 }
// 5.寄生式组合继承
function object(o) {
    function F() {}
    F.prototype = o
    return new F()
}
function inheritPrototype(child, parent) {
    let prototype = object(parent.prototype)
    prototype.constructor = child
    child.prototype = prototype
}
inheritPrototype(Dog, Animal)
// 6.class实现继承
// class Animal {
//     constructor(name) {
//         this.name = name
//     } 
//     getName() {
//         return this.name
//     }
// }
// class Dog extends Animal {
//     constructor(name, age) {
//         super(name)
//         this.age = age
//     }
// }
// 7.数组去重 ES5实现
function unique(arr){
    var res = arr.filter((item,index,array)=>{
        return arr.indexOf(item) === index;
    })
    return res;
}
console.log(unique([1,22,22,1,34,54,56,67,78,66,88]));
// 7.数组去重 ES6实现
function unique1(arr){
    return [...new Set(arr)];
}
console.log(unique1([1,22,22,1,34,54,56,67,78,66,88]));
// 8.数组扁平化 ES5实现 递归
// 将将 [1, [2, [3]]] 这种多层的数组拍平成一层 [1, 2, 3]。
// 使用 Array.prototype.flat 可以直接将多层数组拍平成一层：
function flatten(arr){
    let result = [];
    for(let i =0,len = arr.length;i<len;i++){
        if(Array.isArray(arr[i])){
            result = result.concat(flatten(arr[i]));
        }else{
            result.push(arr[i]);
        }
    }
    return result;
}
console.log(flatten([1,[1,2,[1,2,3]]]));
// 8.数组扁平化 ES6实现 ??
function flatten1(arr) {
    while (arr.some(item => Array.isArray(item))) {
        arr = [].concat(...arr);
    }
    return arr;
}
console.log(flatten1([1,[1,2,[1,2,3]]]));
// 9.函数防抖 
// 短时间大量触发同一事件 只会执行一次
// setTimeOut方法返回值唯一确定该setTimeOut
function debounce(fn,delay){
    let timer = null;
    return function(){
        if(timer){
            clearInterval(timer);
        }
        timer = setTimeout(fn,delay);
    }
}
// 10.节流
function throttle(fn,delay){
    let valid = true;
    return function(){
        if(!valid){
            return false;
        }
        valid = false;
        setTimeout(()=>{
            fn()
            valid=true;
        },delay)
    }
}
// 11.图片懒加载
// 没进入可视区域时 不给<img>标签赋src属性 浏览器不发送请求
// 可视区域的判断 元素到各个边距的距离
// document.documentElement.clientHeight 屏幕可视区域高度
// element.offsetTop 元素相对于文档顶部高度
// document.documentElement.scrollTop   滚动条滚动的距离
// offsetTop-scrollTop<clientHeight 图片进入可视区域 被请求
function lazyLoad(){
    const imgs = document.getElementsByTagName('img');
    const viewHeight = document.documentElement.clientHeight;
    const scrollTop = document.documentElement.scrollTop;
    for(let i =0;i<imgs.length;i++){
        const offsetTop = imgs[i].offsetTop;
        if(offsetTop-scrollTop<viewHeight){
            imgs[i].src = imgs[i].dataset.src;
        }
    }
}
// 12.深度优先实现深拷贝 待完善几种方式
function clone(obj){
    if(typeOf(obj)!='Object') return;
    var o = obj.constructor==Array?[]:{}
    for(let p in obj){
        if(typeof obj[p] === 'object'){
            o[p] = clone(o[p]);
        }else{
            o[p] =obj[p];
        }
    }
    return o
}
// call不固定参数 apply数组 bind
// 13.call 使用一个指定的this值和一个/多个参数来调用一个函数
/*
实现要点
    this可能传入null
    传入不固定个数的参数
    函数可能有返回值
*/
// JS中执行上下文 context
// this 函数的上下文对象
/*
实现步骤
    1.将函数设为对象的属性
    2.执行该函数
    3.删除该函数
*/
// Function.prototype.call = function(context){
//     if(typeof this!=='function'){
//         throw new TypeError('error');
//     }
//     // this参数可以传null 传null时默认指向window
//     context = context||window;
//     // 将函数设为对象的属性 
//     // 用this获取调用call的函数 this永远指向最后调用它的对象
//     context.fn = this;
//     // 可传参
//     let args = [...arguments].slice(1);
//     // 带参执行fn获得返回值
//     let res = context.fn(...args);
//     // 删除作为对象属性的该函数
//     delete context.fn;
//     // call函数具有返回值 
//     return res;
// }
Function.prototype.call = function(context){
    // this是执行上下文的一部分 
    if(typeof this !=='Function'){
        throw new TypeError('error');
    }
    context = context||window;
    context.fn = this;
    let args = [...arguments].slice(1);
    let res = context.fn(...args);
    delete context.fn;
    return res;
}
// apply
Function.prototype.apply = function(context){
    if(typeof this !=='function'){
        return new TypeError('error');
    }
    context = context||window;
    context.fn = this;
    let res;
    let args = arguments[1];
    if(args){
        res = context.fn(...args);
    }else{
        res = context.fn();
    }
    delete context.fn;
    return res;
}
// bind
Function.prototype.bind = function(context){
    if(typeof this !== 'function'){
        throw new TypeError('error');
    }
    // 获取调用bind函数的函数
    let that = this;
    // 获取除obj外bind函数中传过来的其他参数
    let args = [...arguments].slice(1);
    // bind不会立即执行会返回一个函数 调用该函数执行
    return function F(){
        // bind函数会创建一个新绑定函数(bound function BF)
        // 绑定函数也可以使用new运算符构造 提供的this值会被忽略
        // 前置参数仍会提供给模拟函数
        if(this instanceof F){
            // ???
            return new that(...args,...arguments);
        }
        // 这里使用context是可以的吗 不取出arguments[0]
        return that.apply(context,args.concat([...arguments]));
    }
}
// 函数柯里化 currying 减少代码冗余 增加代码可读性
/* 将使用多个参数的函数转换成一系列使用一个参数的函数
 使函数从一次调用传入多个参数编程多次调用每次传一个参数
 只传递给函数一部分参数来调用它 让它返回一个函数去处理剩下的参数
    优点
        1.参数复用 
            如让第一个参数复用
        2.提前确认
        3.延迟运行
            JS中经常使用的bind 实现机制就是Currying
 */
function curry(fn,curryArgs){
    return function(){
        let args = [].slice.call(arguments);
        // 首次调用时 若未提供最后一个参数currArgs 则不用进行args拼接
        if(currArgs!==undefined){
            args = args.concat(curryArgs);
        }
        // 递归调用
        if(args.length<fn.length){
            return curry(fn,args);
        }
        // 递归出口
        return fn.apply(null,args);
    }
}

let currying = function (fun, arr = []) {
	// 取出执行时参数，首次执行截掉function
	let args = Array.prototype.slice.call(arguments,1) || arr
	// 闭包 保存结果
	return function () {
		// 再次调用时的参数
		let _args = Array.prototype.slice.call(arguments)
		// 如果参数不存在，执行函数，反之继续递归执行
		if (_args.length == 0){
			return fun.apply(this,args.concat(_args))
		}else {
			return currying.call(this,fun,...args.concat(_args))
		}
	}
}
function curry(fn) {
    let judge = (...args) => {
        if (args.length == fn.length) return fn(...args)
        return (...arg) => judge(...args, ...arg)
    }
    return judge
}

// 偏函数
// 将一个n参的函数转换成固定x参的函数 剩余参数(n-x)将在下次调用全部转入
function partial(fn,...args){
    return(...arg)=>{
        return fn(...args,arg);
    }
}

// JSONP
// AJAX





















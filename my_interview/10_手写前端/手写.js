// 1.数据类型判断
function typeOf(obj) {
    // let res = Object.prototype.toString.call(obj);
    let res = Object.prototype.toString.call(obj).split(' ')[1];
    // res = res.substring(0,res.length-1).toLowerCase()
    res = res.substring(0, res.length - 1)
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
function Animal() {
    this.colors = ['black', 'white']
}
Animal.prototype.getColor = function () {
    return this.colors;
}
function Dog() {

}
Dog.prototype = new Animal();

let dog1 = new Dog();
dog1.colors.push('yellow');
let dog2 = new Dog();
console.log(dog2.colors);
// 3.借用构造函数实现继承
// 解决了原型链继承两个问题 引用类型共享和传参
// 由于方法必须定义在构造函数中 导致每次创建子类实例都会擦黄健一遍方法
function Animal(name) {
    this.name = name;
    this.getName = () => {
        return this.name;
    }
}
function Dog(name) {
    Animal.call(this, name);
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
Animal.prototype.getName = function () {
    return this.name
}
function Dog(name, age) {
    Animal.call(this, name)
    this.age = age
}
Dog.prototype = new Animal()
Dog.prototype.constructor = Dog

// let dog1 = new Dog('奶昔', 2)
// dog1.colors.push('brown')
// let dog2 = new Dog('哈赤', 1)
// console.log(dog2) 
// { name: "哈赤", colors: ["black", "white"], age: 1 }
// 5.寄生式组合继承
function object(o) {
    function F() { }
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
function unique(arr) {
    var res = arr.filter((item, index, array) => {
        return arr.indexOf(item) === index;
    })
    return res;
}
console.log(unique([1, 22, 22, 1, 34, 54, 56, 67, 78, 66, 88]));
// 7.数组去重 ES6实现
function unique1(arr) {
    return [...new Set(arr)];
}
console.log(unique1([1, 22, 22, 1, 34, 54, 56, 67, 78, 66, 88]));
// 8.数组扁平化 ES5实现 递归
// 将将 [1, [2, [3]]] 这种多层的数组拍平成一层 [1, 2, 3]。
// 使用 Array.prototype.flat 可以直接将多层数组拍平成一层：
function flatten(arr) {
    let result = [];
    for (let i = 0, len = arr.length; i < len; i++) {
        if (Array.isArray(arr[i])) {
            result = result.concat(flatten(arr[i]));
        } else {
            result.push(arr[i]);
        }
    }
    return result;
}
console.log(flatten([1, [1, 2, [1, 2, 3]]]));
// 8.数组扁平化 ES6实现 ??
function flatten1(arr) {
    while (arr.some(item => Array.isArray(item))) {
        arr = [].concat(...arr);
    }
    return arr;
}
console.log(flatten1([1, [1, 2, [1, 2, 3]]]));
// 9.函数防抖 
// 短时间大量触发同一事件 只会执行最后一次
// setTimeOut方法返回值唯一确定该setTimeOut
function debounce(fn, delay) {
    let timer = null;
    return function () {
        if (timer) {
            clearInterval(timer);
        }
        timer = setTimeout(fn, delay);
    }
}
// 10.节流
// 每执行一次会冷却一段时间
function throttle(fn, delay) {
    let valid = true;
    return function () {
        if (!valid) {
            return false;
        }
        valid = false;
        setTimeout(() => {
            fn()
            valid = true;
        }, delay)
    }
}
// 11.图片懒加载
// 没进入可视区域时 不给<img>标签赋src属性 浏览器不发送请求
// 可视区域的判断 元素到各个边距的距离
// document.documentElement.clientHeight 屏幕可视区域高度
// element.offsetTop 元素相对于文档顶部高度
// document.documentElement.scrollTop   滚动条滚动的距离
// offsetTop-scrollTop<clientHeight 图片进入可视区域 被请求
function lazyLoad() {
    const imgs = document.getElementsByTagName('img');
    const viewHeight = document.documentElement.clientHeight;
    const scrollTop = document.documentElement.scrollTop;
    for (let i = 0; i < imgs.length; i++) {
        const offsetTop = imgs[i].offsetTop;
        if (offsetTop - scrollTop < viewHeight) {
            imgs[i].src = imgs[i].dataset.src;
        }
    }
}
// 12.深度优先实现深拷贝 待完善几种方式
function clone(obj) {
    if (typeof(obj) != 'Object') return;
    var o = obj.constructor == Array ? [] : {}
    for (let p in obj) {
        if (typeof obj[p] === 'object') {
            o[p] = clone(o[p]);
        } else {
            o[p] = obj[p];
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
Function.prototype.call = function (context) {
    // this是执行上下文的一部分 
    if (typeof this !== 'Function') {
        throw new TypeError('error');
    }
    context = context || window;
    context.fn = this;
    let args = [...arguments].slice(1);
    let res = context.fn(...args);
    delete context.fn;
    return res;
}
// apply
Function.prototype.apply = function (context) {
    if (typeof this !== 'function') {
        return new TypeError('error');
    }
    context = context || window;
    context.fn = this;
    let res;
    let args = arguments[1];
    if (args) {
        res = context.fn(...args);
    } else {
        res = context.fn();
    }
    delete context.fn;
    return res;
}
// bind
Function.prototype.bind = function (context) {
    if (typeof this !== 'function') {
        throw new TypeError('error');
    }
    // 获取调用bind函数的函数
    let that = this;
    // 获取除obj外bind函数中传过来的其他参数
    let args = [...arguments].slice(1);
    // bind不会立即执行会返回一个函数 调用该函数执行
    return function F() {
        // bind函数会创建一个新绑定函数(bound function BF)
        // 绑定函数也可以使用new运算符构造 提供的this值会被忽略
        // 前置参数仍会提供给模拟函数
        if (this instanceof F) {
            // ???
            return new that(...args, ...arguments);
        }
        // 这里使用context是可以的吗 不取出arguments[0]
        return that.apply(context, args.concat([...arguments]));
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
// Array.prototype.slice.call(arguments)
//类数组 转化为真实数组 可以理解为让arguments转换成一个数组对象 让arguments具有slice方法
function curry(fn, curryArgs) {
    return function () {
        let args = [].slice.call(arguments);
        // 首次调用时 若未提供最后一个参数currArgs 则不用进行args拼接
        if (currArgs !== undefined) {
            args = args.concat(curryArgs);
        }
        // 递归调用
        if (args.length < fn.length) {
            return curry(fn, args);
        }
        // 递归出口
        return fn.apply(null, args);
    }
}

let currying = function (fun, arr = []) {
    // 取出执行时参数，首次执行截掉function
    let args = Array.prototype.slice.call(arguments, 1) || arr
    // 闭包 保存结果
    return function () {
        // 再次调用时的参数
        let _args = Array.prototype.slice.call(arguments)
        // 如果参数不存在，执行函数，反之继续递归执行
        if (_args.length == 0) {
            return fun.apply(this, args.concat(_args))
        } else {
            return currying.call(this, fun, ...args.concat(_args))
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
function partial(fn, ...args) {
    return (...arg) => {
        return fn(...args, arg);
    }
}

// JSONP
// AJAX

// 实现new关键字
// new运算符用来创建用户自定义的对象类型的实例或者具有构造函数的内置对象的实例
/*
    new会产生一个新对象
    新对象需要能够访问到构造函数的属性 需要重新指定它的原型
    构造函数可能会显示返回
*/
// Object.create()方法提供一个新对象 
// 使用现有对象来提供新创建的对象的_proto_
// function _new(){
//     // 拿到第一个参数 构造函数名Func
//     var Func = [].shift.call(arguments);
//     // 创建一个空对象 并让其继承Func.prototype
//     var obj = Object.create(Func.prototype);
//     // 执行构造函数 并将this指向创建的空对象obj
//     Func.apply(obj,arguments);
//     // 返回对象
//     return obj;
// }

function _new() {
    // 拿到fn
    let fn = [].slice.call(arguments);
    //创建一个空对象 让其继承fn.prototype  
    let obj = Object.create(fn.prototype);
    fn.apply(obj, arguments);
    return obj;
}

Object.create = function(o){
    function F(){}
    F.prototype = o;
    return new F();
}

// 实现instanceof关键字
// instanceof就是判断构造函数的prototype属性是否出现在实例的原型链上
// function instance_of(L,R){
//     let O = L.__proto__;
//     const P = R.prototype;
//     while(O){
//         if(O===P) return true;
//         O = O.__proto__;
//     }
// }

function instance_of(L, R) {
    let O = L.__proto__;
    let P = R.prototype;
    while (O) {
        if (O === P) return true;
        O = O.__proto__;
    }
}

// 实现Object.create()
//创建一个新对象 使用现有对象提供新创建的对象的__proto__
/*
1.Object.create()方法创建一个新的对象 
并以方法的第一个参数作为新对象的__proto__属性的值
(以第一个参数作为新对象的构造函数的原型对象)
2.Object.create()方法还有第二个可选参数 是一个对象
对象的每个属性都会作为新对象的自身属性
对象的属性值以descriptor(Object.getOwnPropertyDescriptor(ovj,'key'))
的形式出现 且enumerable默认为false
*/
/*
定义一个空的构造函数
然后指定构造函数的原型对象
通过new运算符创建一个空对象
如果发现传递了第二个参数
通过Object.defineProperties
为创建的对象设置key value
最后返回创建的对象
*/
// Object.create = function (proto,propertyObject = undefined){
//     if(typeof proto !== 'object' && typeof proto !== 'function'){
//         throw new TypeError('Object prototype may only be an Object or null')
//     }
//     if(propertyObject === null){
//         new TypeError('Cannot convert undefined or null to object')
//     }
//     // 定义一个空的构造函数
//     function Fn(){}
//     // 指定构造函数原型对象
//     Fn.prototype = proto;
//     // 通过new关键字创建一个空对象
//     const obj = new Fn();
//     // 如果发现传递第二个参数
//     // 通过Object.defineProperties
//     // 为创建的对象设置key value 
//     if(propertyObject != undefined){
//         Object.defineProperties(obj,propertyObject);
//     }
//     if(proto === null){
//         //创建一个没有原型对象的对象 object.creat(null)
//         obj.__proto__ = null; 
//     }
//     // 返回创建的对象
//     return obj;
// }

Object.create = function (proto, propertyObject = undefined) {
    if (typeof proto !== 'object' && typeof proto !== 'function') {
        throw new TypeError('error1');
    }
    if (typeof propertyObject === null) {
        throw new TypeError('error2');
    }
    function Fn() { };
    Fn.prototype = proto;
    const obj = new Fn();
    if (propertyObject !== undefined) {
        Object.defineProperty(obj, propertyObject);
    }
    if (proto === null) {
        // 创建一个没有原型对象的对象
        obj.__proto__ = null;
    }
    return obj;
}

// 实现Object.assign
// 用于对象的合并 将源对象(source)所有可枚举属性复制到目标对象target
// Object.assign方法第一个参数是目标对象 后面的参数都是源对象
// 如果目标对象和源对象有同名属性 后面的属性会覆盖前面的属性。
// 如果只有一个参数，Object.assign会直接返回该参数。
// 如果该参数不是对象，则会先转成对象，然后返回。
// 由于undefined和null无法转成对象，所以如果它们作为参数，就会报错。
// 如果非对象参数出现在源对象的位置（即非首参数），那么处理规则有所不同。首先，这些参数都会转成对象，如果无法转成对象，就会跳过。这意味着，如果undefined和null不在首参数，就不会报错
// Object.assign可以用来处理数组，但是会把数组视为对象。
// hasOwnProperty()方法返回一个布尔值 指示对象自身属性中是否具有指定属性(也就是 是否有指定的键)
Object.assign = function(target,...source){
    if(target === null||target === undefined){
        throw new TypeError('target is null or undefined');
    }
    // 将target转化为对象
    let ret = Object(target);
    source.forEach(obj=>{
        if(obj!=null){
            for(let key in obj){
                // 为什么要在此处进行判断 已经是key in obj
                if(obj.hasOwnProperty(key)){
                    ret[key] = obj[key];
                }
            }
        }
    })
    return ret;
}


// 数组原型方法

// 实现数组原型方法forEach
// forEach是ES5中操作数组的一种方法 主要功能遍历数组
// forEach方法对数组的每个元素执行一次给定的函数
// forEach方法中的function回调callback有三个参数
// 第一个参数 currentValue   遍历的数组内容
// 第二个参数 index   对应的数组索引
// 第三个参数 array   数组本身
// thisArg 当执行回调函数callback时 用作this的值
// 如果 thisArg 参数有值，则每次 callback 函数被调用时，this 都会指向 thisArg 参数。如果省略了 thisArg 参数，或者其值为 null 或 undefined，this 则指向全局对象。
// 方法执行没有返回值 对原来数组没有影响
// map 用法和forEach相似
// map的回调函数中支持return返回值
// 不影响原来的数组
// 只是相当于把原数组克隆一份
// 把克隆的这一份数组中的对应项改变

// 如果提供一个thisArg参数给forEach函数
// 参数将会作为回调函数中的this值
// 否则this值为undefined
// 回调函数中this的绑定时根据函数被调用时通用的this绑定规则来决定的

// MDN >>有符号右移 >>>无符号右移
// x >>> 0 本质上就是保证x有意义(为数字类型)
// 且为正整数 在有效的数组范围内(0-0xFFFFFFFF)
// 且在无意义的情况下缺省值为0

Array.prototype.forEach = function (callback, thisArg) {
    // this当前数组
    if (this == null) {
        throw new TypeError('this is null or undefined');
    }
    if (typeof callback !== 'function') {
        throw new TypeError('callback is not a function');
    }
    // this是当前数组
    let O = Object(this);
    let len = O.length >>> 0;
    let k = 0;
    while (k < 0) {
        if (k in O) {
            callback.call(thisArg, O[k], k, O);
        }
        k++;
    }
}

// map
Array.prototype.map = function (callback, thisArg) {
    if (this === null || this === undefined) {
        throw new TypeError('this is null or undefined');
    }
    if (typeof callback !== 'function') {
        throw new TypeError('callback is not a function')
    }
    const O = Object(this);
    const len = O.length>>>0;
    let k =0,res=[];
    while(k<len){
        if(k in O){
            res[k] = callback.call(thisArg,O[k],k,O)
        }
        k++;
    }
    return res;
}

// filter
// some
// reduce







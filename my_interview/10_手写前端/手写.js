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
// 7.数组乱序 sort实现
/*
    Math.random()-0.5随机得到一个正数 负数 0
    正数按降序排列
    负数按升序排列
    0不变
    由此得到一个乱序数组
*/
var values = [1, 2, 3, 4, 5];
values.sort(
    //正数按降序排列
    //负数按升序排列 
    function () {
        return Math.random() - 0.5;
    })
console.log(values);
// 7.数组乱序 Fisher-Yates洗牌算法实现
/*
    该算法由Ronald Fisher和Frank Yates首次提出
    原理
        遍历数组元素 
        将当前元素与以后随机位置的元素进行交换
    Math.floor()
        返回小于或等于一个给定数字的最大整数
        可以理解为向下取整
*/
function shuffle(a) {
    var j, x, i;
    for (i = a.length; i; i--) {
        j = Math.floor(Math.random() * i);
        x = a[i - 1];
        a[i - 1] = a[j];
        a[j] = x;
    }
    return a;
}
// 7.数组乱序 Fisher-Yates洗牌算法(shuffle)ES6实现
/*
    使用ES6解构赋值新特性
    shuffle洗牌 
*/
function shuffle(a) {
    for (let i = a.length; i; i--) {
        let j = Math.floor(Math.random() * i);
        [a[i - 1], a[j]] = [a[j], a[i - 1]];
    }
}

// 8.数组扁平化 ES5实现 递归
// 将将 [1, [2, [3]]] 这种多层的数组拍平成一层 [1, 2, 3]。
// 使用 Array.prototype.flat 可以直接将多层数组拍平成一层：

function flatten(arr) {
    while (arr.some(item => Array.isArray(item))) {
        arr = [].concat(...arr);
    }
    return arr;
}

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
// 8.数组扁平化 ES6实现
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
    if (typeof (obj) != 'Object') return;
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

// call 不定长参数
Function.prototype.call = function (context) {
    // this是执行上下文的一部分 
    if (typeof this !== 'Function') {
        throw new TypeError('error');
    }
    // 非严格模式下会做此转换
    context = context || window;
    context.fn = this;
    let args = [...arguments].slice(1);
    let res = context.fn(...args);
    delete context.fn;
    return res;
}

// apply 参数数组
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
// JS中bind函数和数组的reduce方法用到了函数柯里化
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


Object.create = function (o) {
    function F() { }
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
Object.assign = function (target, ...source) {
    if (target === null || target === undefined) {
        throw new TypeError('target is null or undefined');
    }
    // 将target转化为对象
    let ret = Object(target);
    source.forEach(obj => {
        if (obj != null) {
            for (let key in obj) {
                // 为什么要在此处进行判断 已经是key in obj
                if (obj.hasOwnProperty(key)) {
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

// map 返回一个新数组 数组中元素为原始数组调用函数处理后值
Array.prototype.map = function (callback, thisArg) {
    if (this === null || this === undefined) {
        throw new TypeError('this is null or undefined');
    }
    if (typeof callback !== 'function') {
        throw new TypeError('callback is not a function')
    }
    const O = Object(this);
    const len = O.length >>> 0;
    let k = 0, res = [];
    while (k < len) {
        if (k in O) {
            res[k] = callback.call(thisArg, O[k], k, O)
        }
        k++;
    }
    return res;
}

const { rejects } = require('assert');
// filter 返回一个新数组 符合既定条件的元素
Array.prototype.filter = function (arr, callback) {
    let flag = !Array.isArray(arr) || !arr.length || typeof callback !== 'function'
    if (flag) {
        return [];
    } else {
        let newArr = [];
        for (let index = 0; index < arr.length; index++) {
            if (callback(arr[index], index, arr)) {
                newArr.push(arr[index]);
            }
        }
        return newArr;
    }
}

// some

// reduce
// reduce方法接收一个函数作为累加器 数组中每个值(从左到右)开始缩减 最终计算为一个值

//按顺序执行 最后结果汇总为一个值返回 需要判断有无初始值
function reduce(arr, callback, initValue) {
    let flag = !Array.isArray(arr) || !arr.length || typeof callback !== 'function';
    if (flag) {
        return []
    } else {
        // 判断有没有初始值
        let isValue = initValue === 0 ? (!initValue) : (!!initValue);
        let reduceValue = isValue ? initValue : arr[0];
        // 判断相加的值
        for (let index = isValue ? 0 : 1; index < arr.length; index++) {
            reduceValue = callback(reduceValue, arr[index], index, arr)
        }
        return reduceValue;
    }
}

// JS手写callback封装成promise实现方法
// 封装fs异常回调为测试对象
const fs = require('fs');
const { resolve } = require('path');
const promisify = function (fn, receiver) {
    return function () {
        let _len = arguments.length,
            args = Array(_len),
            _key = 0;
        for (_key; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }
        return new Promise((resolve, rejects) => {
            //PS:以下数组内的function执行的是fn的最后一个参数 示例里就是fs,re    
            fn.apply(receiver, [].concat(args, [function (er, res) {
                return err ? rejects(err) : resolve(res);
            }]))
        })
    }
}
const readFilePromise = promisify(fs.readFile, fs);
readFilePromise('./test.html', 'utf-8').then(res => {
    console.log(res);
}).catch(err => {
    console.log(err);
})

// 写一个函数可以控制最大并发数
function concurrentPoll() {
    this.tasks = [];
    this.max = 10;
    setTimeout(() => {
        this.run();
    }, 0)
}
concurrentPoll.prototype.addTask = function (task) {
    this.tasks.push(task);
}
concurrentPoll.prototype.run = function () {
    if (this.tasks.length == 0) {
        return
    }
    var min = Math.min(this.tasks.length, max);
    for (var i = 0; i < min; i++) {
        this.max--;
        var task = this.tasks.shift();
        task().then((res) => {
            console.log(res);
        }).catch((err) => {
            console.log(err);
        }).finally(() => {
            this.max++;
            this.run();
        })
    }
}

// JSONP
/*
    AJAX请求有跨域限制

    远程服务器上设法把数据装进JS格式文件中
    供客户端调用和进一步处理

    JSON纯字符数据格式 可简洁描述复杂数据
    JSON被JS原生支持

    web客户端通过与调用脚本相同的方式
    调用跨域服务器上动态生成的JS格式文件
    服务器之所以要动态生成JSON文件
    目的就在于把客户端需要的数据装进去

    为便于客户端使用数据
    逐渐形成一种非正式传输协议 称为JSONP
    该协议一个要点 允许用户传递一个callback参数给服务端
    服务端返回数据时将这个callback参数作为函数名来包裹住JSON数据
    这样客户端可随意定制自己的函数自动处理返回数据
*/
const jsonP = ({ url, params, callbackName }) => {
    // 提供JSONP服务的URL地址
    // 不管是什么类型的地址 最后生成的返回值都是一段JS代码
    /*不把远程JS文件写死 在调用的URL中传递一个code参数
     告诉服务器参数信息
     callback参数告诉服务器 本地回调函数叫xxxHandler
     把查询结果传入这个函数中进行调用
     */
    const geturl = () => {
        let dataSrc = ''
        for (let key in params) {
            dataSrc += `${key}=${params[key]}&`
        }
        dataSrc += `callback=${callbackName}`
        return `${url}?${dataSrc}`
    }
    return new Promise((resolve, reject) => {
        // 创建script标签 设置其属性
        const script_ = document.createElement('script');
        script_.src = geturl();
        // 把script标签加入head 此时调用开始
        document.body.appendChild(script_)
        window[callbackName] = data => {
            resolve(data)
            document.body.removeChild(script_)
        }
    })
}

// 实现一个异步队列Queue 要求按时间依次执行callback
/*
    new Queue().task(1000,function(){
        console.log(1);
    }).task(2000,function(){
        console.log(2);
    }).start()
*/
function Queue2() {
    this.queue = [];
    this.task = (time, fn) => {
        this.queue.push(resolve => {
            setTimeout(() => {
                resolve(fn());
            }, time)
        })
    }
    this.start = async () => {
        for (let item of this.queue) {
            await new Promise(item);
        }
    }
}

// JS实现一个异步队列来按顺序执行函数 Promise实现
var funcs = [func1, func2, func3];
var funPromise = funcs.map(function (func, i) {
    return new Promise(function (resolve) {
        func();
        console.log('func' + (i + 1) + 'well done');
        // 如果func是异步方法 需要把resolve定义到方法的callback中
        resolve();
    })
})
Promise.all(funcPromise).then(function () {
    console.log('all well done');
})

// JS实现一个异步队列来顺序执行函数 async/await实现
var funcs = [func1, func2, func3];
(async () => {
    for (let i = 0; i < focus.length; i++) {
        await funcs[i]();
        console.log('func' + (i + 1) + 'well done');
    }
    console.log('all well done');

})

// 类型封装函数
function getType(value) {
    // 判断数据是null的情况
    if (value === null) {
        return value + "";
    }
    // 判断数据是引用数据类型的情况
    if (typeof value === "object") {
        let valueClass = Object.prototype.toString.call(value).split(' ')[1];
        let type = valueClass.substring(0, valueClass.length - 1);
        return type.toLowerCase();
        // 判断数据是基本数据类型的情况
    } else {
        return typeof value;
    }
}

// generator自动执行函数
// 做什么用的
// Promise封装读取文件方法
function readFile(fileName) {
    return new Promise((resolve, reject) => {
        fs.readFile(fileName, function (err, data) {
            if (err) reject(err);
            resolve(data.toString());
        })
    })
}
// generator函数
function* gentT2() {
    var f1 = yield readFile('ip.txt');
    var f2 = yield readFile('ip1.txt');
    console.log(f1, f2);
}
// 自动执行方法
function run(gen) {
    var g = gen();
    function next(data) {
        var res = g.next(data);
        if (res.done) return res.value;
        res.value.then((data) => {
            next(data);
        })
    }
    next();
}


// 发布订阅者模式
/*
    EventEmitter是Node.js内置模块events提供的一个类
    它是Node事件流的核心 是服务端的东西
    on(event,listener)
        为指定事件注册一个监听器 接收一个字符串event和一个回调函数
    off/removeAllListner(event,listener)
        移除指定事件的所有监听回调    
    emit(event,[arg1],[arg2])
        按监听器顺序执行执行每个监听器
    once(event,listner)
        和on类似 但只触发一次 随后便解除事件监听
*/
class EventEmitter {
    constructor() {
        // 初始化events事件对象
        this._events = {}
    }
    /*
        触发事件
        原理:将该事件添加到该事件类型的队列中
        状态:未执行
    */
    on(event, cb) {
        // 获取原队列
        const query = this._events[event] || {};
        // 队列中追加cb
        query.push(cb);
        // 重新赋值事件队列
        this._events[event] = query;
    }
    /*
        取消事件
        原理:将所有该事件类型的事件从队列中删除
        状态:取消执行
    */
    off(event, cb) {
        // 获取原队列
        const query = this._events[event];
        // 取消事件
        this._events[event] = query && query.filter(fn => fn !== cb)
        return this;
    }
    /*
        触发事件
        原理:执行该事件类型的所有事件 按照队列顺序执行
        状态:准备执行|执行中
        使用方式:xx.emit(eventName,args)
    */
    emit(...args) {
        // 获取事件队列
        const query = this._events[args[0]];
        // 获取事件触发的参数
        const params = Array.prototype.slice.call(args, 1);
        // 执行事件队列中的回调函数数组
        query.forEach(fn => {
            fn.call(params);
        })
        return this
    }
    /*
        单次触发事件
        原理:执行一次该事件
    */
    once(event, cb) {
        // 封装一个单次执行函数
        const wrapperFun = (...args) => {
            // 执行回调函数
            cb.apply(this, args);
            // 移除事件队列中所有该类型的回调函数
            this.off(event, cb)
        }
        // 将单次执行函数添加到事件队列
        this.on(event, wrapperFun);
        return this;
    }
}

// 实现sleep Promise+setTimeout
function sleep(time) {
    return new Promise(resolve => {
        console.log(resolve);
        setTimeout(resolve, time)
    })
}
sleep(10000).then(res => {
    console.log('sleep exe ending');
})

// 实现sleep callback回调
function sleep(time, callback) {
    return new Promise(resolve => {
        setTimeout(callback, time)
    })
}
sleep(3000, () => {
    console.log('sleep exe ending');
})

// 实现sleep data+循环
function sleep(time) {
    const startDate = new Date().getTime();
    while (new Date().getTime() - startDate < time) { };
}
sleep(3000);
console.log('sleep exe ending');

// 实现promise.all
// Array.from()方法从一个类数组/可迭代对象创建一个新的 浅拷贝的数组
Promise.prototype.all = function (iterators) {
    const promises = Array.from(iterators);
    const promiseList = [],
        len = promises.length;
    let count = 0;
    return new Promise((resolve, reject) => {
        promises.forEach((promise, index) => {
            Promise.resolve(promise).then(res => {
                count++;
                promiseList[index] = res;
                if (count === len) {
                    resolve(promiseList);
                }
            }).catch(e => {
                reject(e);
            })
        })
    })
}

// 实现Promise.retry 重试
/*
目的：
    为解决同步调用失败重新尝试问题
代码实现原理：
    手写一个随机数生成函数 
    判断结果是否大于或小于某个阈值
    如在判断次数以内
    依据返回结果
    否则重新尝试执行随机数生成函数
    超过判断次数则抛出异常
*/


// lazyMan
/*
    需求分析
    1.需要封装一个对象 且这个对象提供不同的方法 如eat
    2.能进行链式调用 则每个调用方法都必须返回当前对
    3.sleep sleepFirst 方法需要异步
*/
/*
    解题思路
    1.采用ES6的class 实现封装对象_LazyMan
    2.提供一系列方法 如eat sleep sleepFirst异步方法 采用Promise和setTimeout实现
    3.链式调用 考虑到其中含异步方法 采用任务队列及ES6的async wait实现 每次调用都往队列中加入方法
        然后循环调用任务队列 循环中通过异步实现异步的方法 保证正确
*/
class _LazyMan {
    constructor(name) {
        this.taskQueue = [];
        this.runTimer = null;
        this.sayHi(name);
    }
    run() {
        if (this.runTimer) {
            clearTimeout(this.runTimer);
        }
        this.runTimer = setTimeout(async () => {
            for (let asyncFun of this.taskQueue) {
                await asyncFun();
            }
            this.taskQueue.length = 0;
            this.runTimer = null;
        })
        return this;
    }
    sayHi(name) {
        this.taskQueue.push(async () => console.log(`Hi this is ${name}`));
    }
    eat(food) {
        this.taskQueue.push(async () => console.log(`Eat ${food}`));
    }
    sleep(second) {
        this.taskQueue.push(async () => {
            console.log(`Sleep ${second} s`);
            return this._timeout(second);
        })
        return this.run();
    }
    sleepFirst(second) {
        this.taskQueue.unshift(async () => {
            this.taskQueue.unshift(async () => {
                console.log(`Sleep first ${second} s`)
                return this._timeout(second);
            });
            return this.run();
        })
    }
    async _timeout(second) {
        await new Promise(resolve => {
            setTimeout(resolve, second * 1e3);
        })
    }
}

let lazyMan = name => new _LazyMan(name);
lazyMan('Hank').sleep(10).eat('dinner');


// parseInt 解析一个字符串 返回一个整数
// string 必需 被解析字符串 
// radix 可选 要解析的数字的基数 该值介于2-36之间
//  如果省略该参数或其值为0 则数字将以10为基础来解析 
// 如果它以0x/0X开头将以16作为基数
// 如果该参数小于2或者大于36 则parseInt将返回NaN

// 要求简单一些 把字符串型的数字转化为真正的数字即可 但不能使用JS原生的字符串转数字的API 如Number()
function _parseInt(str, radix) {
    let str_type = typeof str;
    let res = 0;
    if (str_type !== 'string' && str_type !== 'number') {
        return NaN;
    }
    // 字符串处理
    // trim 去除字符串的头尾空格
    str = String(str).trim().split('.')[0];
    let len = str.length;
    if (!len) {
        return NaN;
    }
    if (!radix) {
        // 如果radix为0 null undefined
        // 则转化为10
        radix = 10;
    }
    if (typeof radix !== 'number' || radix < 2 || radix > 36) {
        return NaN;
    }
    return res;
}

// 实现完整parseInt函数
function l(obj) {
    return console.log(obj);
}
function parse_Int(str, radix) {
    let res = 0;
    if (typeof str != 'string' && typeof str != 'number') {
        return NaN;
    }
    str = String(str).trim().split('.')[0];
    if (!len) {
        return NaN;
    }
    if (!radix) {
        radix = 10;
    }
    if (typeof radix != 'number' || radix < 2 || radix > 36) {
        return NaN;
    }
    for (let i = 0; i < len; i++) {
        let arr = str.split('');
        l(arr instanceof Array)
        l(typeof arr)
        // Math.floor 返回小于或等于一个给定数字的最大整数
        // Math.pow(x,y) 返回x的y次幂的值
        res += Math.floor(arr[i]) * Math.pow(radix, i);
    }
    l(res);
}

// JS实现extend函数
/*
extend 为了简化类的声明 
可以把派生子类的整个过程包装在一个extend函数 
和其他语言的extend关键字类似
基于一个给定的类结构创建一个新的类
*/
function extend(subClass, superClass) {
    var F = function () { };
    F.prototype = superClass.prototype;
    subClass.prototype = new F();
    subClass.prototype.constructor = subClass;
}
/*
extend实现 寄生继承的封装

与原型链继承中直接使用subClass.prototype = new superClass()区别
作为一项改进 它添加了一个空函数F 并将它创建的对象添加到原型链中 
*/

// extend函数使用场景
function Person(name) {
    this.name = name;
}
Person.prototype.getName = function () {
    return this.name;
}
function Author(name, books) {
    // 执行Person构造函数 获得Person对象中属性
    Person.call(this, name);
    this.books = books;
}
// 获取Person原型上的方法 实现原型继承
extend(Author, Person);
// 在Author原型上继续添加我们需要的方法
Author.prototype.getBooks = function () {
    return this.books;
}









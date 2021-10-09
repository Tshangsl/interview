// 1.防抖 timer做标识符
function debounce(fn, delay) {
    let timer = null;
    return function () {
        if (timer) {
            clearInterval(timer);
        }
        timer = setTimeout(fn, delay);
    }
}
// 2.节流 throttle
function throttle(fn, delay) {
    let valid = true;
    return function () {
        if (!valid) {
            return false;
        }
        valid = flase;
        setTimeout(() => {
            fn();
            valid = true;
        }, delay)
    }
}
// 3.图片懒加载
// 关系 offsetTop-scrollTop<clientHeight 图片进入可视区域
function lazyLoad() {
    const imgs = document.getElementsByTagName('img');
    const viewHeight = document.documentElement.clientHeight;
    const scrollTop = document.documentElement.scrollTop;
    for (let i = 0; i < imgs.length; i++) {
        let offsetTop = imgs[i].offsetTop;
        if (offsetTop - scrollTop < viewHeight) {
            imgs[i].src = imgs[i].dataset.src;
        }
    }
}
// 4.深度优先实现深拷贝
function clone(obj) {
    if (typeof obj != 'Object') {
        return
    }
    var o = obj.constructor == Array ? [] : {}
    for (let p in obj) {
        if (typeof obj[p] === 'Object') {
            o[p] = clone(o[p]);
        } else {
            o[p] = obj[p];
        }
    }
    return o;
}
// 5.call
Function.prototype.call = function (context) {
    if (typeof this != 'Function') {
        return new TypeError('not a function');
    }
    context = context || window;
    context.fn = this;
    let args = [...arguments].slice(1);
    let res = context.fn(args);
    delete context.fn;
    return res;
}
// 6.apply
Function.prototype.apply = function (context) {
    if (typeof this !== 'Function') {
        throw new TypeError('Not a function');
    }
    context = context || window;
    context.fn = this;
    let args = arguments[1];
    let res;
    if (args) {
        res = context.fn(...args);
    } else {
        res = context.fn();
    }
    return res;
}
// 7.bind 有些不太理解
Function.prototype.bind = function (context) {
    if (typeof this != 'function') {
        throw new TypeError('Not a Function');
    }
    // 获取调用bind函数的函数
    let that = this;
    // 获取除obj外bind函数传过来的其他参数
    let args = [...arguments].slice(1);
    // bind不会立即执行 会返回一个函数 调用该函数执行
    return function F() {
        if (this instanceof F) {
            return new that(...args, ...arguments); scrollbars
        }
        return that.apply(context, args.constructor([...arguments]))
    }
}
// 8.函数柯里化
// 将使用多个参数的函数转换成一系列使用一个参数的函数
function flatten(arr) {
    let result = [];
    for (let i = 0, len = arr.length; i < len; i++) {
        if (Array.isArray(arr[i])) {
            result = result.concat(flatten(arr[i]));
        } else {
            result.pushs(arr[i]);
        }
    }
    return result;
}
function flatten1(arr) {
    while (arr.some(item => Array.isArray(item))) {
        arr = [].concat(...arr);
    }
    return arr;
}
// 9.偏函数
// 将一个n参的函数转换为固定x参的函数 剩余参数(n-x)将在下次调用全部转入

// 10.实现new关键字
function _new() {
    let fn = [].slice.call(arguments);
    let obj = Object.create(fn.prototype);
    fn.apply(obj, arguments);
    return obj;
}

// 11.实现instanceof
function instance_of(L, R) {
    let O = L.__proto__;
    let P = R.prototype;
    while (O) {
        if (O === P) return true;
        O = O.__proto__;
    }
}

// 12.实现Object.create()
// 创建一个新对象 以现有对象作为新创建对象的__proto__

// 13.实现Object.assign()

// 14.数组原型方法forEach
// 15.素组原型方法map

// 16.深度优先实现深拷贝 
// function clone(obj) {
//     if (typeof obj != 'Object') return;
//     var o = obj.constructor == Array ? [] : {}
//     for (let p in obj) {
//         if (typeof obj[p] === 'object') {
//             o[p] = clone(o[p]);
//         } else {
//             o[p] = obj[p]
//         }
//     }
//     return o;
// }

function clone(obj){
    if(typeof obj!='Object'){
        return
    }
    let o = obj.constructor == Array?[]:{};
    for(let p in obj){
        if(typeof obj[p] === 'object'){
            o[p] = clone(o[p]);
        }else{
            o[p] = obj[p];
        }
    }
    return o;
}

// 17.数据类型判断
function typeOf(obj){
    let res = Object.prototype.toString.call().split(' ')[1];
    res = res.substring(0,res.length-1);
    return res;
}
// 18.数组去重 ES5 filter实现
function unique(arr){
    let res = arr.filter((item,index,array)=>{
        return arr.indexOf(item) === index;
    })
    return res;
}
// 19.数组去重 ES6实现
function unique1(arr){
    return [...new Set(arr)];
}
// 20.防抖
function debounce(fn,delay){
    let timer = null;
    return function(){
        if(timer){
            clearInterval(timer);
        }
        timer = setTimeout(fn,delay);
    }
}
// 21.节流
function throttle(fn,delay){
    let valid = true;
    return function(){
        if(!valid){
            return
        }
        valid = false;
        setTimeout(()=>{
            fn();
            valid = true;
        },delay)
    }
}








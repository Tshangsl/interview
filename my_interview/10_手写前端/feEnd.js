//1. 节流 冷却一段时间
function throttle(fn,delay){
    var startTime = 0
    return function(){
        var nowTime = Date.now();
        if(nowTime - startTime > delay){
            fn.call(this)
            // 普通函数中的this被那个函数调用指向哪个函数
        }
        startTime = nowTime;
    }
}
//2. 防抖 只执行最后一次
function debounce(fn,delay){
    var timer = null;
    return function(){
        if(timer){
            clearTimeout(timer);
        }
        timer = setTimeout(()=>{
            fn.call(this)
        },delay)
    }
}
//3.图片懒加载
function lazyload(){
    const imgs = document.getElementsByTagName('img');
    const len = imgs.length;
    const viewHeight = document.documentElement.clientHeight;
    const scrollHeight = document.documentElement.scrollTop||document.body.scrollTop
    for(let i =0 ;i<len;i++){
        var offsetHeight = imgs[i].offsetTop;
        if(offsetHeight<viewHeight+scrollHeight){
            const src = imgs[i].dataset.src
            imgs[i].src = srcs
        }
    }
}
// 4.深度优先实现深拷贝
function clone(obj){
    var o = obj.constructor == Array?[]:{}
    for(var p in obj){
        if(typeof obj[p] === 'object'){
            o[p] = clone(obj[p]);
        }else{
            o[p] = obj[p]
        }
    }
    return o
}
// 5.广度优先实现深拷贝
    // 1.实现一个getType函数对元素进行类型判断 此处元素类型判断 使用Object.prototype.toString()
    function getType(obj){
        // toString会返回对应不同的标签的构造函数
        var toString = Object.prototype.toString;
        var map = {
            '[object Boolean]'  : 'boolean', 
            '[object Number]'   : 'number', 
            '[object String]'   : 'string', 
            '[object Function]' : 'function', 
            '[object Array]'    : 'array', 
            '[object Date]'     : 'date', 
            '[object RegExp]'   : 'regExp', 
            '[object Undefined]': 'undefined',
            '[object Null]'     : 'null', 
            '[object Object]'   : 'object'
        };
        if(obj instanceof Element){
            return 'element';
        }
        return map[toString.call(obj)];
    }
    // 2.此处只深拷贝对象，关于数组的判断参照上面的例子
    function deepClone(data){
        var obj = {};
        var originQueue = [data];
        var copyQueue = [obj];
        //以下两个队列用来保存复制过程中访问过的对象 以此来避免对象环的问题(对象的某个属性值是对象本身)
        var visitQueue = [];
        var copyVisitQueue = [];
        while(originQueue.length>0){
            var _data = originQueue.shift();
           var _obj = copyQueue.shift();
           visitQueue.push(_data);
           copyVisitQueue.push(_obj);
           for(var key in _data){
               var _value = _data[key]
               if(typeof _value !== 'object'){
                   _obj[key] = _value;
               } else {
                   //使用indexOf可以发现数组中是否存在相同的对象(实现indexOf的难点就在于对象比较)
                   var index = visitQueue.indexOf(_value);
                   if(index >= 0){
                       // 出现环的情况不需要再取出遍历
                       _obj[key] = copyVisitQueue[index];
                   } else {
                       originQueue.push(_value);
                       _obj[key] = {};
                       copyQueue.push(_obj[key]);
                   }
               }
           }
        }
        return obj;
    }
//6.封装栈
class Stack{
    constructor(){
        this.items = [];
    }
    push(element){
        this.items.push(element);
    }
    pop(){
        return this.items.pop();
    }
    peek(){
        return this.items[this.items.length-1];
    }
    isEmpty(){
        return !this.items.length;
    }
    clear(){
        this.items = [];
    }
    size(){
        return this.items.length;
    }
}











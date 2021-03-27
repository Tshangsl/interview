/*
1.节流
2.防抖
3.图片懒加载
4.深度优先实现深拷贝
5.广度优先实现深拷贝
6.封装栈
7.new
8.instanceof
9.数组扁平化
10.手写Promise
11.call apply bind
13.手写一个filter
14.手动实现reduce
*/
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
 //7.new
 function CreateNew(){
    var obj = new Object()
    var con = [].shift.call(arguments)
    obj.__proto__ = con.prototype
    var res = con.apply(obj,arguments)
    return res instanceof Object ? res : obj
}
//8.instaceof
function createInstanceof(left,right){
    if(typeof(left)!=="object"||!left) return false
    let left = left.__proto__
    while(true){
        if(!left){
            return false
        }
        if(left === right.prototype) return true
        left = left.__proto__
    }
}
//9.数组扁平化
function flat(arr){
    const res_ = []
    const fn = arr =>{
    for(let i= 0 ; i<arr.length ; i++){
            Array.isArray(arr[i]) ? fn(arr[i]) : res.push(arr[i])
        }
       
    }
    fn(arr)
    return res_
}
//迭代方式实现数组扁平化
function flat(arr){
    var arrs = [...arr]
    var res = []
    while(arrs.length){
        let item = arrs.shift()
        if(Array.isArray(item)){
            arrs.unshift(...item)
        }else{
            res.push(item)
        }
    }
    return res
}

//10.手写Promise
const PENDING = "pengding"
const RESOLVED =  "resolved"
const REJECTED = "rejected"

function Mypromise(fn){

    var self = this
    //初始换状态
    this.state = PENGDING
    //用于保存resolve或者rejected传入的值
    this.value = null
    //用于保存resolve的回调函数
    this.resolvedCallbacks = []
    //用于保存reject的回调函数
    this.rejectedCallbacks = []
    //状态转为resolved方法
    function resolve(value){
        //判断传入元素是否为Promise值，如果是，则状态必须等待前一个状态改变后再改变
        if(value instanceof Mypromise){
            return value.then(resolve,reject)
        }

        //摆正代码的执行顺序为本轮事件循环的末尾
        setTimeout(() => {
            if (self.state === PENDING) {
                self.state = RESOLVED
                self.value = value
                self.resolvedCallbacks.forEach(callBack => {
                    callBack(value)
                })
            }
        },0)
    }
    function reject(value){
        setTimeout(() => {
            if (sef.state === PENGDING) {
                self.state = REJECTED
                self.value = value
                self.resolvedCallbacks.forEach(callBack => {
                    callBack(value)
                })
            }
        },0)
    }
    //将两个方法传入函数执行
    try{
        fn(resolve,reject)
    }catch(e){
        //遇到错误 ， 捕获错误 ， 执行jeject函数
        reject(e)
    }
}

Mypromise.prototype.then = function(onResolved,onRejected){
    //首先判断两个参数是否为函数类型,因为这两个参数是可可选参数
    onResolved = 
        typeof onResolved === "function" ? onResolved : function(value){return value}
    onRejected = 
        typeof onRejected === "function" ? onRejected : function(error){throw error}
    //如果是等待状态 ,则将执行函数加入对应的列表中
    if(this.state === PENGDING){
        this.resolvedCallbacks.push(onResolved)
        this.rejectedCallbacks.push(onRejected)
    }
    if(this.state === RESOLVED){
        onResolved(this.value)
    }
    if(this.state === REJECTED){
        onRejected(this.value)
    }
}
//
Promise.myAll = function(promiseArr){
    let ans = []
    let index = 0
    return new Promise((resolve , reject) => {
        for(var i=0 ; i<promiseArr.length ; i++){
            promiseArr.then(res => {
                ans[i] = res
                index++
                if(index === promiseArr.length){
                    resolve(ans)
                }
            })
            .catch(err => {
                reject(err)
            })
        }
    })
} 
Promise.race = function(promiseArr) {
    return new Promise((resolve , reject) => {
        promiseArr.forEach( p => {
            Promise.resolve(p).then( res=> resolve(res) , err =>reject(err) )
        })
    })
}
//11. apply call bind
Function.prototype.apply = (context = window , args)=>{
    if(typeof context !== "function"){
        throw new TypeError("Type error")
    }
    const fn = Symbol('fn')
    context[fn] = this
    const res = context[fn](...args)
    delete context[fn]
    return res 
}

Function.prototype.call = (context = window ,...args) => {
    if(typeof context !== "function"){
        throw new TypeError("Type error")
    }
    const fn = Symbol("fn")
    context[fn] = this
    const res = context[fn](...args)
    delete context[fn]
    return res
}

Function.prototype.bind = (context , ...args)=>{
    if(typeof context !== "function"){
        throw new TypeError("Type error")
    }

    var self = this

    return function F(){
        if(this instanceof F){
            return new self(...args,...arguments)
        }
        return self.apply(context,[...args,...arguments])
    }
}
// 12.jsonP
const jsonP= ({url,params,callbackName}) =>{
    const geturl=()=>{
        let dataSrc = ''
        for(let key in params){
            dataSrc+=`${key}=${params[key]}&`
        }
        dataSrc +=`callback=${callbackName}`
        return `${url}?${dataSrc}`
    }
    return new Promise((resolve,reject) =>{
        const script_=document.createElement('script')
        script_.src = geturl()
        document.body.appendChild(script_)
        window[callbackName] = data => {
            resolve(data)
            document.body.removeChild(script_)
        }
    })
}
//ajax
//  0 － （未初始化）还没有调用send()方法
//  1 － （载入）已调用send()方法，正在发送请求
//  2 － （载入完成）send()方法执行完成，已经接收到全部响应内容
//  3 － （交互）正在解析响应内容
//  4 － （完成）响应内容解析完成，可以在客户端调用了
const getJson = (url) => {
    return new Promise((resolve,reject) => {
        const xhr =new XMLHttpRequest()
        xhr.open('GET',url,false)
        xhr.setRequestHeader('Accept','application/json');
        xhr.onreadystatechange=function(){
            if(xhr.readyState !==4) return
            if(xhr.status === 200 ||xhr.status===304){
                resolve(xhr.responseText)
            }else{
                reject(xhr.responseText)
            }
        }
        xhr.send()
    })
}
//13.手写一个filter
function filter(arr,filterCallback){
    if(!Array.isArray(arr) || !arr.length|| typeof filterCallback !== "function"){
        return []
    }else{
        let result = []
        for(let i=0,len=arr.length; i<len ; i++){
            if(filterCallback(arr[i])){
                result.push(arr[i])
            }
        }
        return result
    }
}
//14.手动实现reduce
function reduce(arr,callBack,initialValue){
    if(!Array.isArray(arr) || !arr.length || typeof callBack !== 'function'){
        return []
    }else{
        let hasInitialValue = initialValue ? true : false
        let value = hasInitialValue ? initialValue : arr[0]
        for(let i = hasInitialValue ? 0 : 1 ,len=arr.length ; i<len ; i++ ){
            value = callBack(arr[i],i,value,arr)
        }
        return value
    }

}




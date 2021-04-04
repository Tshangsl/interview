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








/*
Function.prototype.call
    call方法使用一个指定this值和单独给出的一个或多个参数来调用一个函数

*/

// 通过call方法实现继承
// 这种继承只能继承父类上的属性和方法 不能继承父类原型上的
function Father(){
    this.books = ['js','vue'];
    this.name = 'yhq';
}
Father.prototype.sayBooks = function(){
    console.log(this.books);
}
function Son(){
    Father.call(this);
}
var son = new Son();
son.books   //['js','vue']
son.sayBooks //Uncaught TypeError son.sayBooks is not a function

// 通过call方法调用匿名函数
var animals = [
    {species:'Lion',name:'King'},
    {species:'Whale',name:'Fail'}
];
for(var i =0 ;i<animals.length;i++){
    (function(i){
        this.print = function(){
            console.log('#'+i+''+this.species+':'+this.name);            
        }        
        this.print();
    }).call(animals[i],i) 
}

// 实现一个call fn.call(obj,args1,args2,...)
// 括号里原本的对象改成call()前面的对象
/*
call方法接收一个参数是obj
让this指向这个obj
把fn用属性方式加入这个obj中
执行call操作之后delete这个新增属性
*/
Function.prototype.myCallOne = function(ctx){
    ctx = ctx||window;
    // Symbol属性确定fn唯一 
    var fn = Symbol();
    var args = [...arguments].slice(1);
    ctx[fn] = this;
    var result = ctx[fn](...args);
    delete ctx[fn];
    return result;
}
















s


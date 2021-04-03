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
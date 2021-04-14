// 1.通过Object构造函数/对象字面量创建单个对象
// 缺点 
// 使用同一个接口创建很多对象
// 会产生大量重复的代码
// 为解决这个问题 出现了工厂模式

// 2.工厂模式
// ES6之前ES中无法创建类
// 开发人员发明了一种函数
// 用函数来封装以以特定接口创建对象的细节
// 实现起来是
// 在一个函数内部创建好对象 然后把对象返回

function createPerson(name,age){
    let obj = new Object();
    obj.name = name;
    obj.age = age;
    obj.sayHello = function(){
        console.log('Hello'+obj.name);
    }
    return obj;
}
let p1 =new createPerson('lisi',23);
console.log(p1.name);
console.log(p1.age);
p1.sayHello();

// 3.构造函数模式
// 像Object和Array这样的原生构造函数
// 在运行时会自动出现在执行环境
// 此外也可以创建自定义的构造函数
// 从而定义自定义对象类型的属性和方法
/*
    与工厂模式相比特点：
        1.没有显式地创建对象
        2.直接将属性和方法赋给了this对象
        3.没有return语句
        4.要创建实例 必须使用new操作符
        (否则属性和方法将会被添加到window对象)
        5.可以使用instanceof操作符检测对象类型
        (instanceof运算符用于测试构造函数的prototype属性
        是否出现在对象的原型链中的任何位置)
    存在问题:
        构造函数内部的方法会被重复创建
        不同实例内的同名函数是不相等的
        可通过将方法移到函数外部解决这一问题
        但面临新问题 封装性不好
*/

function Person(name,age){
    this.name = name;
    this.age = age;
    this.sayHello = function(){
        console.log('Hello'+this.name);
    }
}
let p2 = new Person('wangwu',26);
console.log(p2.name);
console.log(p2.age);
p2.sayHello();

// 4.原型模式
/*
    1.创建每个函数都有一个prototype属性
    这个属性是一个指针 指向一个对象
    2.这个对象的用途是包含可以由特定类型的所有实例共享的属性和方法
    (prototype就是通过调用构造函数而创建的那个对象实例的原型对象)
    3.使用原型对象的好处是 可以让所有对象实例共享它所包含的属性和方法
    即不必在构造函数中定义对象实例的信息 而是可以将这些信息直接添加到原型对象中
*/
// 更常见的做法是用一个包含所有属性和方法的对象直接量来重写整个原型对象
/*
    问题:
        1.他省略了为构造函数传递初始化参数这一环节，
        结果所有实例在默认情况下都将取得相同的属性值，
        虽然这会在一定程度带来一定的不便，
        但不是最大的问题，
        最大的问题是由其共享的本性所决定的。
        2.对于包含基本值的属性
        可以通过在实例上添加一个同名属性隐藏原型中的属性。
        然后，
        对于包含引用数据类型的值来说，会导致问题。

*/
function PersonPro(){

}
PersonPro.prototype={
    name:'lisi',
    age:'zhangsan',
    sayHello:function(){
        console.log('Hello'+this.name);
    } 
}
Object.defineProperty(PersonPro.prototype,"constructor",{
    enumerable:false,
    value:Person
})


let p3 = new PersonPro();
console.log(p3.__proto__);
p3.sayHello();

// 5.组合使用构造函数和原型模式
/*
    创建自定义类型的最常见的方式
    构造函数模式用于定义实例属性，
    而原型模式用于定义方法和共享的属性。
    所以每个实例都会有自己的一份实例属性的副本，
    但同时共享着对方法的引用，
    最大限度的节省了内存。
    同时支持向构造函数传递参数。    
*/

function Person4(name,age){
    this.name = name;
    this.age = age;
}
Person4.prototype={
    constructor:Person,
    sayHello :function(){
        console.log('Hello '+this.name);
    }
}

let p4 =new Person4('zhaoliu',26)
console.log(p4.name);
console.log(p4.age);
p4.sayHello();

// 6.动态原型模式
/*
    只有sayName（）不存在的情况下，
    才会将它添加到原型中，
    这段代码只会在初次调用构造函数时才执行。
    这里对原型所做的修改，能够立刻在所有实例中得到反映。  
*/
function Person5(name,age){
    this.name = name;
    this.age = age;
    if(typeof this.sayHello!="function"){
        Person5.prototype.sayHello = function(){
            console.log('Hello '+this.name);
        }
    }
}

let p5 = new Person5('xiaoming',13);
console.log(p5.name);
console.log(p5.age);
p5.sayHello();

// 7.Object.create()
// ES5定义了一个名为Object.create()的方法
// 创建一个新对象 第一个参数是这个对象的原型
// 第二个参数对对象的属性进一步描述

var o = Object.create(Object.prototype, {
    // foo会成为所创建对象的数据属性
    foo: { 
      writable:true,
      configurable:true,
      value: "hello" 
    },
    // bar会成为所创建对象的访问器属性
    bar: {
      configurable: false,
      get: function() { return 10 },
      set: function(value) {
        console.log("Setting `o.bar` to", value);
      }
    }
  });




/*
  1.JS基于原型链的继承 访问一个对象的属性时 
  如果找不到 则会顺着原型链向上层查找 以此类推
  2.每个构造函数都有一个prototype属性 
  代表该构造函数的原型对象
  3.prototype有一个constructor属性 指向它的构造函数
  构造函数的constructor只想自身


*/

/*
  继承主要做两件事
    1.把父类的属性和方法想办法绑定到子类上
    2.把父类添加到子类的原型链上
*/

// 1.构造函数实现继承
/*
  1.只能继承构造函数的属性 无法继承原型方法
  2.每个新实例都有父类构造函数的副本
  3.每个实例都是重新实例化构造函数 不存在共享属性
  4.可以通过Parent.call(this,params)传递参数到父类构造函数
*/
function Person(){
  this.name = 'lisi';
  this.age = 23;
}
Person.prototype.sayHello = function(){
  console.log('Hello '+this.name);
}

function Child(){
  Person.call(this);
}

let p1 = new Person();
console.log(p1.name);
console.log(p1.age);
p1.sayHello();
let c1 = new Child();
console.log(c1.name);
console.log(c1.age);

//2.原型链实现继承
/*
  1.所有实例共享父类实例属性 引用属性被修改时 
  所有都会被修改
  2.可以获取父构造函数以及原型属性
  3.无法向父类传参
  4.原型链继承时 原型链属性修改 其他实例化对象也会修改
*/
function Person2(){
   this.name = 'wangwu',
   this.age = 23; 
}
Person2.prototype.sayHello = function(){
  console.log('Hello '+this.name);
}
function Child2(){
  this.sex = 'male';
}
Child2.prototype = new Person2();

let p2 = new Person2();
console.log(p2.name);
console.log(p2.age);
p2.sayHello();
let c2 = new Child2();
console.log(c2.name);
console.log(c2.age);
c2.sayHello();

// 3.组合继承
/*
  1.构造函数继承+prototype实例对象继承组合继承
  2.构造函数继承可传参
  3.实例对下个原型链继承 保证每个属性是每个对象独有的
  4.会造成两次调用父类构造函数
*/
/*
  1.原型继承做不到属性独立
   构造函数做不到原型链处理 进行融合处理
  2.用原型链继承的思路 把父类实例作为子类的prototype
  3.用构造函数继承的思路 用call调用一次父类构造函数把属性创建在子对象上
  4.存在的问题 父类构造函数执行两次
      处理原型链一次
      绑定属性一次 
      有些浪费
*/
function Person3(name){
  this.name = name;
  this.colors = ['red'];
}
Person3.prototype.sex = 'male';

function Child3(name){
  Person3.call(this,name);
}
Child3.prototype = new Person3();

// 4.寄生继承
/*
  1.可以将最开始的对象扩展后 返回被继承
  2.同原型链继承一样 此时无法获取构造函数属性
  3.寄生继承直接指向父类的prototype 所以不会重复调用父类
*/
/*
  寄生继承可以说是对组合继承的改进
    继承要做的事情
      1.把父类的属性和方法想办法绑定到子类上
      2.把父类添加到子类的原型链上
    组合继承在每一件事上用了一次构造函数
    
    期望得到的结果是 能让子类的原型间接和父类联系起来
    解决方法
      能有一个原型 prototype是父类的
      让子类的prototype指向这个原型
      obj.prototype = Parent.prototype
      Child.prototype = new Obj()
      prototype被添加到原型链 并且没有调用构造函数
    寄生继承的核心是
      构造一个instance 让instance的prototype代理父类的prototype
*/
function Person4 (name) {
  this.name = name;
  this.colors = ['red', 'blue', 'green'];
}

Person4.prototype.getName = function () {
  console.log(this.name)
}

function Child4 (name, age) {
  Person4.call(this, name);
  this.age = age;
}

// 关键的三步
var F = function () {};

F.prototype = Person4.prototype;

Child4.prototype = new F();

/*
  有个问题 一定需要中间变量吗
  直接把Child的prototype指向Person不可以吗
  Child.prototype = Parent.prototype

  其实这样是能有效果的 
  但是两个prototype指向了同一个对象的引用
  子类独立性就没了
  这就是为什么处理原型链必须new一次
*/


// 5.寄生组合继承
/*
  1.构造函数继承+寄生继承
  2.构造函数继承调用父类一次
   寄生继承不再调用父类
   通过直接委托prototype
   解决组合继承两次调用父类情况
*/
/*
  寄生组合继承
    1.通过构造函数继承属性
    2.通过原型继承方法
    背后基本思路:
      不必为了指定子类的原型而调用超累的构造函数
      我们所需是超类原型的一个副本
*/





/*
  曾经一段时间 因为JS关于类实现继承不规范 
  导致了各种各样实现继承的代码 
  实际上不管代码怎么变 继承都基于两种方式
  1.通过原型链
        子类的原型指向父类的实例从而实现原型共享
        可以实现所有属性方法共享
        但无法做到属性方法独享
        (例如Sub1修改了父类的函数
        其他所有的子类Sub2 Sub3想要调用旧的函数就无法实现了)
  2.借用构造函数
        通过JS的apply call实现子类调用父类的属性 方法
        可以实现所有属性方法独享
        但无法做到属性方法共享
        可以在子类构造函数中传递参数
        (例如Sub1新增一个函数 
        然后想让Sub2/Suv3都可以用就无法实现
        只能Sub2 Sub3各自在构造函数中新增
        )
  组合继承：
        就是把以上两种继承方法一起使用 
        把共享的属性/方法用原型链继承实现
        独享的属性/方法借用构造函数实现
        所以 组合继承几乎完美实现了JS继承
        缺点：
          实现的时候调用了两次超类(父类)
          1.一次是在创建子类原型时
          2.另一次是在子类构造函数内部
          性能上不合格
  寄生继承
        思路跟工厂模式差不多 调用一个仅用于封装继承过程的函数
        简单而言
          寄生继承就是不用实例化父类
          直接实例化一个临时副本实现相同的原型继承
          (即子类的原型指向父类副本的实例从而实现原型共享)
        */
// 6.class实现继承
class Person6{
  constructor(name){
    this.name = name;
  }
  getName(){
    return this.name;
  }
}
class Child extends Person6{
  constructor(name,age){
    super(name);
    this.age = age;
  }
}





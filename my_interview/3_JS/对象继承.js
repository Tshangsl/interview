/*
    1.JavaScript基于原型链的继承,访问一个对象的属性时,如果找不到,则会顺着原型链向上层查找,以此类推,直到找不到为止
    2.每个构造器都有一个prototype属性,代表该构造函数的原型对象
    3.prototype有个constructor属性,指向它的构造函数,构造函数的constructor指向自身
    4.实例化对象有个__proto__,指向它的原型prototype
    5.不管哪种继承方式,prototype上的属性都是共享的,所以原型链上最好是增加的是方法,基本属性放到构造函数中,除非你确定你的基本属性是需要共享所有实例对象的
*/

// 1.构造函数实现继承
/*
    1.只能继承构造函数的属性,无法继承原型属性
    2.每个新实例都有父类构造函数的副本
    3.每个实例都是重新实例化构造函数,不存在共享属性
    4.可以通过Parent.call(this,params)传递参数到父类构造函数
*/
function Person() {
    this.name = "live";
    this.friends = ["hello"];
  }
  Person.prototype.sex = "男";
  
  function Child() {
    Person.call(this);
    this.age = 12;
  }

// 2.原型链实现继承
/*
    1.所有实例共享父类实例属性,引用属性被修改时,所有都会被改
    2.可以获得父构造函数以及原型属性
    3.无法像父类传参
    4.原型链继承时,当原型链属性修改,其他实例化的对象也会修改
*/

function Person() {
    this.name = "live";
    this.friends = ["hello"];
}
Person.prototype.sex = "男";

function Child() {
    this.age = 12;
}
Child.prototype = new Person();

// 3.组合继承(构造函数+prototype实例对象)
/*
    1.构造函数继承+prototype实例对象继承组合继承
    2.构造函数继承可传参
    3.实例对象原型链继承,保证属性是每个对象独有的
    4.但是会造成两次调用父类构造函数
*/
function Person(name) {
    this.name = name;
    this.colors = ["red"];
}
Person.prototype.sex = "男";

function Child(name) {
    Person.call(this,name); //构造函数继承,传入参数 该出会调用一次父类构造函数
}
Child.prototype = new Person(); //实例化原型链继承 避免共享属性

// 4.寄生继承
/*
    1.可以将最开始的对象扩展后,返回被继承
    2.通原型链继承一样,此时无法获取到构造函数属性
    3.寄生继承直接指向父类的prototype,所以不会重复调用父类的情况
*/
function Person() {
    this.name = "live";
}
Person.prototype.sex = "nan"; //原型链的属性
Person.prototype.friends = ["hello"];

function Child() {
    this.age = 12;
}
//寄生继承的关键点
let fn  = function() {}; //创建一个空构造函数
fn.prototype = Person.prototype; //继承Person的原型链
//扩展
fn.prototype.sayName = function() {
    return "name";
}
//原型链继承寄生对象fn
Child.prototype = new fn();

//上面的步骤等价于
//Child.prototype = Object.create(Person.prototye);

// 5.寄生组合继承
/*
构造函数继承+寄生继承
构造函数继承调用父类一次,寄生继承不在调用父类,通过直接委托prototype,所以解决了组合继承两次调用父类的情况
*/
function Person() {
    this.name = "live";
  }
  Person.prototype.sex = "nan";
  Person.prototype.friends = ["hello"];
  
  function Child() {
    this.age = 12;
  }
  let f = function () {};
  f.prototype = Person.prototype;
  f.prototype.sayName = function () {
    return "name";
  };
  Child.prototype = new f();
  
  function Person() {
    this.name = "live";
  }
  Person.prototype.sex = "nan"; //原型链的属性
  Person.prototype.friends = ["hello"];
  
  function Child() {
    Person.call(this); //构造函数继承
    this.age = 12;
  }
  //寄生继承的关键点
  let fn = function () {}; //创建一个空构造函数
  fn.prototype = Person.prototype; //继承Person的原型链
  //扩展
  fn.prototype.sayName = function () {
    return "name";
  };
  //原型链继承寄生对象fn
  Child.prototype = new fn();
  
  //上面的步骤等价于
  //Child.prototype = Object.create(Person.prototye);
  
  const child = new Child();
  child.friends.push("world"); //因为friends是原型链的属性,原型链的属性都是共享的
  console.log(child.friends, "child");
  console.log(child.name, "child"); //可以获取到构造函数上的属性
  console.log(child.age, "child");
  console.log(child.sex, "child");
  console.log(child.sayName());
  
  const child2 = new Child();
  console.log(child2.friends, "child2"); //返回[ 'hello', 'world' ] child2




function Person(name,age){
    // 属性
    this.name = name;
    this.age = age;
}
// 方法
Person.prototype.eat = function(){
    console.log(this.name+' is eating');
}
let p1 = new Person('lisi',23);
console.log(p1);
p1.eat();

// 继承
function Student(name,age,school){
    // 属性
    Person.call(this,name,age);
    this.school = school;
}
// 原型链函数
Student.prototype = new Person();
// 构造函数
Student.prototype.constructor = Student;

Student.prototype.code = function(){
    console.log(this.name+' is codeing');
}

let a1 = new Student('wangwu',23,'农大')
console.log(a1);
a1.code();
class Person{
    constructor(name,age){
        this.name = name;
        this.age = age;
    }
    eat(){
        console.log(this.name+' is eating');
    }
}
let p1 = new Person('lisi',23);
console.log(p1);
p1.eat();
// 继承
class Student extends Person{
    constructor(...param){
        super(...param);
        this.school = param[2];
    }
    code(){
        console.log(this.name+' is codeing');
    }
}
let s1 = new Student('wangwu',22,'工大');
console.log(s1);
s1.code()
s1.eat();
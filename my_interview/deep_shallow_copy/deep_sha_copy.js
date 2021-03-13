/*
    深拷贝浅拷贝最根本的区别在于
    是否真正获取一个对象的复制实体 而不是引用
    浅拷贝
        修改堆内存中的同一个值
        增加了一个指针指向已存在的内存地址
    深拷贝
        修改推内存中不同的值
        增加了一个指针并且申请了一个新的内存-该新增指针指向新增内存
*/

var obj1 = {
    name:'lisi',
    age:23,
    brother:{
        name:'wanhwu',
        age:33
    }
}
// 浅拷贝
var obj2 = obj1;
var obj3 = {
    ...obj1
}
obj2.name='wangwu';
console.log(obj1);//wangwu
console.log(obj2);//wangwu
console.log(obj3);//lisi

// 深克隆
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

var obj4 = clone(obj1);
obj4.brother.age = 99;
console.log(obj1);
console.log(obj4);

var arr1 = [1,2,3];
var arr2 = clone(arr1);
arr2[1] = 333;
console.log(arr1,arr2);





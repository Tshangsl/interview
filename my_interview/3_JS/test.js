console.log(typeof(NaN));
var str = 'string';
str.pro = 'hello';
console.log(str.pro); //undefined
// 当执行 str.pro = 'hello' 时，实际上内部创建了一个基本包装类型的实例，然后给这个实例的 pro 属性赋值为 hello，实例创建后马上销毁了，当下一次试图获取 str.pro 的值时，又会创建一个基本包装类型的实例，显然新创建的实例时没有 pro 属性的，为 undefined，所以最后输出 undefined 。
const promise1 = new Promise((resolve, reject) => {
    console.log('promise1')
    resolve('resolve1')
})
const promise2 = promise1.then(res => {
    console.log(res)
})
console.log('1', promise1);
console.log('2', promise2);
var p1 = new Object;
p1.name = 'lisi';
p1.age = 23;
console.log(Object.prototype.toString.call(p1));
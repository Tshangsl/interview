/*==与===的区别
    1.== 相等 值相等
    2.=== 恒相等 类型和值都相等
    3.js在比较时 
        ==会先做类型转换 再判断值的大小
        === 类型和值都必须相等
*/
/*
对象的扩展
    1.简写
        let name = 'lisi';
        let age = 89;
        let obj1 = {
            name: name,
            age: age,
            eat: function () {
                console.log('eat');
            }
        }
        console.log(obj1);

        let obj2 = {
            name,
            age,
            eat() {
                console.log('eating');
            }
        }
        console.log(obj2);
    2.属性表达式
        let xx = 'sex111';
        let obj3 = {
            [xx + 99999]: '女'
        }
        console.log(obj3);
    3.object.is()  , 返回的结果基本和===相同
        请使用 isNaN() 来判断一个值是否是数字 原因是 NaN 与所有值都不相等，包括它自己
        console.log('11' === 11); //false
        console.log(Object.is('11', 11)); //false

        console.log(+0 === -0);//true
        console.log(Object.is(+0, -0));//false

        console.log(NaN === NaN); //false
        console.log(Object.is(NaN, NaN)); //true
    4.对象的合并(浅拷贝)
        Object.assign方法实行的是浅拷贝而非深拷贝
        Object.assign方法用于对象的合并
        将源对象所有可枚举属性 复制到目标对象
        Object.assign方法的第一个参数是目标对象，后面的参数都是源对象。
        如果目标对象与源对象有同名属性，或多个源对象有同名属性，则后面的属性会覆盖前面的属性。
        如果只有一个参数，Object.assign会直接返回该参数。
        如果该参数不是对象，则会先转成对象，然后返回。
        由于undefined和null无法转成对象，所以如果它们作为参数，就会报错。
        let obj4 = { ...obj1, ...obj3 }
        console.log(obj4);

        let obj5 = Object.assign({}, obj1, obj3);
        console.log(obj5);
        console.log(obj1);
    5.对象的遍历 
        for in    
        for (let p in obj5) {
            console.log(p);
            console.log(obj5[p]);
        }
        Object.keys(obj5)//["name", "age", "eat", "sex11199999"]
        Object.values(obj5)//["lisi", 89, ƒ, "女"]
        Object.entries(obj5)      
        /*
          0: (2)["name", "lisi"]
          1: (2)["age", 89]
          2: (2)["eat", ƒ]
          3: (2)["sex11199999", "女"]
         */
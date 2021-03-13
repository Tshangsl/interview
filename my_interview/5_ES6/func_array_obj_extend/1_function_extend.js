/* 
普通函数的 this 指向问题（ 谁调用的这个方法或谁调用了事件，this 指向的就是谁 ）
        1、事件处理函数中 this => 绑定事件的那个 dom元素
        2、在定时器中  this => window
        3、在自定义函数中  this => window
        4、在自定义对象中 this => 该对象
        5、在类中  this =>  new 出来的实例化对象
*/
/* 
箭头函数的 this 指向：
        1、this 指向的是定义时所在的对象，而不是使用时所在的对象
        2、箭头函数没有 this， 他的父作用域中的 this 是谁，那箭头函数中的 this 就是谁
        3、如果箭头函数被非箭头函数包含，那它的 this 指向的就是他最近那层非箭头函数中的 this ，否则就是 window           
*/
 /* 
改变 this 的指向有几种方式？
        1、call   (this,arg1,arg2,arg3)
        2、apply  (this,[arg1,arg2,arg3])
        3、bind  (this,arg1,arg2,arg3)   需要手动调用
*/
/*
函数的扩展
        1.函数默认值
        2.rest
        3.新增属性
            length(获取到没有设置默认值得参数的个数)
            name
*/
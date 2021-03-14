1.ES6有什么新特性
    1.声明let/const
    2.解构赋值
    3.class/extend类声明与继承
    4.Set/Map:新的数据结构
    5.箭头函数
    6.promise
    7.async/await
    8，数组对象函数的扩展
2.let const var 的区别
    let const var 都是声明函数和变量的关键字
    。。。
3.如何理解同步和异步，async和await的用途
     同步：按照代码书写顺序一一执行处理指令的一种模式，上一段代码执行完才能执行下一段代码。
     异步：可以理解为一种并行处理的方式，不必等待一个程序执行完，可以执行其它的任务。
     JS之所以需要异步的原因在于JS是单线程运行的。常用的异步场景有：定时器、ajax请求、事件绑定。
     async函数是generator函数的语法糖 ，async函数始终返回一个Promise，await可以实现一个"等待"的功能，async/await被称为异步编程的终极解决方案，即用同步的形式书写异步代码，并且能够更优雅的实现异步代码顺序执行以及在发生异步的错误时提供更精准的错误信息
4.JS是如何实现异步的
    JS引擎是单线程的，但又能实现异步的原因在于事件循环和任务队列体系。
    事件循环:..
    任务队列
    主线程
5.实现异步的方式有哪些？
6.怎么理解Promise对象，手写promise，或者问何如解决回调地域
    所谓Promise，简单说就是一个容器，里面保存着某个未来才会结束的事件（通常是一个异步操作）的结果。从语法上说，Promise 是一个对象，从它可以获取异步操作的消息。Promise提供统一的API，各种异步操作都可以用同样的方法进行处理。
    三个状态：
        等待中（pending）
        完成了（resolved）
        拒绝了（rejected）
    Promise缺点：
        首先，无法取消Promise，一旦新建它就会立即执行，无法中途取消。
        其次，如果不设置回调函数，Promise内部抛出的错误，不会反应到外部。
        第三，当处于pending状态时，无法得知目前进展到哪一个阶段（刚刚开始还是即将完成）。
    解决问题：
        Promise 的出现解决了 之前的回调地狱问题,并且Promise 实现了链式调用，也就是说每次调用 then 之后返回的都是一个 Promise ， 并且是一个全新的Promise 。是因为Promise 的状态不可变。如果你在then中使用了return ，那么 return 的值会被 Promise .resolve 包装。


7.require/import的区别
    1.require是CommonJS语法，import是ES6语法
    2.require只在后端服务器支持，import在高版本浏览器及Node中都可以支持
    3.require引入的是原始导出值的复制，import是导出值的引用
    4.require是运行时动态加载，import是静态编译
    5.require调用时默认不是严格模式，import则默认调用严格模式
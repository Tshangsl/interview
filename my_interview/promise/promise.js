/*
    promise 用同步的形式处理异步的问题
    1.主要用于异步计算
    2.可以将异步操作序列化 按照预期的顺序执行 返回符合预期的结果
    3.可以在对象之间传递和操作promise 帮助我们处理队列
    4.有nodejs之后 对于异步的依赖进一步加剧了
        nodejs特点：无阻塞 高并发
    
    promise
    1.promise是一个对象，对象和函数的区别就是对象可以保存状态，函数不可以(闭包除外)
    2.并未剥夺函数return的能力 因此无需层层传递callback 进行回调获取数据
    3.代码风格 容易理解 便于维护
    4.多个异步等待合并便于解决
*/
/*
    resolve作用：
    将Promise对象的状态从未完成变成成功
    即pending=>resolve
    在异步操作成功时调用，
    并将异步操作的结果，作为参数，传递出去
*/
/**
    reject作用：
    将Promise对象的转台从未完成变成失败
    即pending=>reject
    在异步操作失败时调用
    并将异步操作的结果，作为参数，传递出去
 */
/*
    promise有三个状态
    1.pending[待定]初始状态
    2.fulfilled[实现]操作成功
    3.reject[被否决]操作失败
    
    当promise状态发生改变 
    就会触发then()里的响应函数处理后续步骤
    promise状态一经改变 不会再变
*/
/*
    promise对象状态改变 只有两种可能
    从pending变成fulfilled
    从pending变成rejected
    这两种情况只要发生，状态就凝固了，不会再变了
*/
/*
    .then
        1.接收两个函数作为参数 分别代表fulfilled(成功) rejeted(失败)
        2. .then()返回一个新的Promise实例，所以它可以链式调用
        3.当前面的Promise状态改变时
        。。。。。
*/
/**
 *  then()中有then()
 *      1.因为.then返回的还是Promise实例
 *      2.会等里面的then执行完，再执行外面的
 */

/*
    错误处理的两种做法
*/

/*
    catch也会返回一个promise实例 并且是resolved状态
*/

/*
    Promise.all([p1,p2,p3])
    用于将多个promise实例 包装成一个新的promsie实例
    返回的实例就是普通的promise
    。。。
*/
/*
    Promise.race()类似于Promsie.all()
    区别在于它有任何一个完成就算完成
*/
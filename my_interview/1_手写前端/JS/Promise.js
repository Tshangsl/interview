/*
1.Promise声明
2.解决基本状态
3.then方法
4.解决异步实现
    当resolve在setTimeout内执行then时
    state还是pending等待状态 我们就需要在then调用的时候
    将成功和失败存到各自的数组
    一旦reject/resolve就调用它们

    类似发布订阅
    先将then里面的两个函数储存起来
    由于一个Promise可以有多个then 
    所以存在同一个数组内

5.解决链式调用
    默认在第一个then里返回一个新的promise 称为promise2
    promise2 = new Promise((resolve,reject)=>{})
        将这个promise2返回的值传递到下一个then中
        如果返回一个普通的值 则将普通的值传递给下一个then中
    当我们在第一个then中return一个参数(参数未知 需判断)这个return出来的新的promsie
    就是onFulfilled()或onRejected()的值
     规定onFulfilled()或onRejected()的值 即第一个then返回的值 叫做x 判断x的函数叫做resolvePromise
        1.首先 要看x是不是promise
        2.如果是promise 则取它的结果 作为新的promise2成功的结果
        3.如果是普通值 直接作为promise2成功的结果
        4.所以要比较x和promise2
        5.resolvePromise的参数有promise2(默认返回的promise) x(我们自己return的对象)resolve reject
        6.resolve和reject是promise2的
6.完成resolvePromise函数
    resolvePromise：
    让不同的promise代码互相套用
7.解决其他的问题
    解释
    executor 实例Promise对象在构造器中传入的参数 一般是一个function(sresolve,reject){}
    status  Promise状态 一开始是默认的pending状态 每当调用到resolve reject方法时 就会改变其值 在后面的then方法中会用到
    value   resolve回调成功后 调用resolve方法里面的参数
    reason  reject回调成功后 调用reject方法里面的参数值
    resolve 声明resolve方法在构造器内 通过传入的executor方法传入其中 用以给使用者回调
    reject  声明reject方法在构造器中 通过传入的executor方法传入其中 用以给使用者会回调
    then    里面有两个参数 onFulfilled onRejected
            成功有成功的回调 失败有失败的回调    
                当状态state为fulfilled 则执行onFulfilled 传入this.value 
                当状态state为rejected  则执行onRejected  传入this.reason
                onFulfilled/onRejected如果它们是函数
                则必须分别在fulfilled rejected后被调用
                value/reason依次作为他们的第一个参数
            */
class Promise {
    // 构造器
    constructor(executor) {
        // 初始化state为等待态
        this.state = 'pending';
        // 成功的值
        this.value = undefined;
        // 失败的原因
        this.reason = undefined;
        // 成功存放的数组
        this.onResolvedCallbacks = [];
        // 失败存放的数组
        this.onRejectedCallbacks = [];
        // 失败存放的数组
        //成功
        let resolve = value => {
            // state改变 resolve调用就会失败
            if (this.state === 'pending') {
                // resolve调用后 state转化为成功态
                this.state = 'fulfilled';
                // 存储成功的值
                this.value = value;
                // 一旦resolve执行 调用成功数组的函数
                this.onResolvedCallbacks.forEach(fn => fn());
            }
        };
        // 失败
        let reject = reason => {
            //state改变 reject调用就会失败
            if (this.state === 'pending') {
                // reject调用后 state转化为失败态
                this.state = 'rejectd';
                // 存储失败的原因
                this.reason = reason;
                //一旦reject执行 调用失败数组的函数
                this.onRejectedCallbacks.forEach(fn => fn())
            }
        };
        // 如果executor执行报错 直接执行reject
        try {
            exectutor(resolve, reject);
        } catch (err) {
            reject(err);
        }
    }
    // then方法 有两个参数onFulfilled onRejected
    then(onFulfilled, onRejected) {
        // 声明返回的promise2
        let promise2 = new Promise((resolve, reject) => {
            //状态为fulfilled 执行onFulfilled 传入成功的值 
            if (this.state === 'fulfilled') {
                let x = onFulfilled(this.value);
                // resolvePromise函数 处理自己return的Promise和默认的Promise2的关系
                resolvePromise(promise2,x,resolve,reject);
            }
            // 状态为rejected 执行onRejected 传入失败的值
            if (this.state === 'rejected') {
                let x = onRejected(this.reason);
                resolvePromise(promise2,x,resolve,reject);
            }
            // 当状态state为pending时
            if (this.state === 'pending') {
                //onFulfilled传入成功数组
                this.onResolvedCallbacks.push(() => {
                    let x = onFulfilled(this.value);
                    resolvePromise(promise2,x,resolve,reject);
                })
                // onRejeced传入失败数组
                this.onRejectedCallbacks.push(() => {
                    let x = onRejected(this.reason);
                    resolvePromise(promise2,x,resolve,reject);s
                })
            }
        })
        //返回promise完成链式
        return promise2; 
    }
}
// resolve方法
Promise.resolve = function(val){
    return new Promise((resolve,reject)=>{
        resolve(val);
    })
}
// reject方法
Promise.reject = function(val){
    return new Promise((resolve,reject)=>{
        reject(val);        
    })
}
// race方法
Promise.race = function(promises){
    return new Promise((resolve,reject)=>{
        for(let i =0 ;i<promises.length;i++){
            promises[i].then(resolve,reject);
        }
    })
}
// all方法
Promise.all = (promises)=>{
    let arr = [];
    let i = 0;
    function processData(index,data){
        arr[index] = data;
        i++;
        if(i == promises.length){
            resolve(arr);
        }
    }
    return new Promise((resolve,reject)=>{
        for(let i = 0 ;i<promises.length;i++){
            promises[i].then(data=>{
                processData(i,data);
            },reject)
        }
    })
}












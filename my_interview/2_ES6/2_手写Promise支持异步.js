//发布订阅者模式支持异步
const PENDING = 'PENDING';
const RESOLVED = 'RESOLVED';
const REJECTED = 'REJECTED';

class Promise {
    constructor(executor) {
        this.status = PENDING; //宏变量 默认是等待态
        this.value = undefined; //then方法要访问所以放到this上
        this.reason = undefined; //then方法要访问所以放到this上
        this.onResolvedCallbacks = []; //专门存放成功的回调函数
        this.onRejectedCallbacks = []; //专门存放失败的回调函数
        let resolve = value => {
            if (this.status === PENDING) { //保证只有状态是等待态的时候才能更改状态
                this.value = value;
                this.status = RESOLVED;
                //需要让成功的方法依次执行
                this.onResolvedCallbacks.forEach(fn => fn())
            }
        };
        let reject = reason => {
            if (this.status === PENDING) {
                this.reason = reason;
                this.status = REJECTED;
                //需要让失败的方法依次执行
                this.onRejectedCallbacks.forEach(fn => fn())
            }
        };
        //执行executor传入我们定义的成功和失败函数 
        // 把内部的resolve和reject传入executor中用户写的resolve，reject           
        try {
            executor(resolve, reject);
        } catch (e) {
            console.log('catch错误', e);
            reject(e); //如果内部出错误 直接将error手动调用reject向下传递
        }
    }
    then(onfulfilled, onrejected) {
        if (this.status === RESOLVED) {
            onfulfilled(this.value);
        }
        if (this.status === REJECTED) {
            onrejected(this.reason);
        }
        // 处理异步情况
        if (this.status === PENDING) {
            //this.onResolvedCallbacks.push(onfulfilled) 
            // 这种写法可以换成下面的写法 多包了一层 这叫面向切片编程 可以加上自己的逻辑
            this.onResolvedCallbacks.push(() => {
                // TODO 自己的逻辑
                onfulfilled(this.value);
            });
            this.onRejectedCallbacks.push(() => {
                // TODO 自己的逻辑
                onrejected(this.reason);
            })
        }
    }
}
module.exports = Promise;
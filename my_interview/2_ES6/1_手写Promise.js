const PENDING = 'PENDING';
const RESOLVED = 'RESOLVED';
const REJECTED = 'REJECTED';

class Promsie {
    constructor(executor) {
        this.status = PENDING; //宏变量 默认是等待态
        this.value = undefined; //then方法要访问所以放在this上
        this.reason = undefined; //then方法要访问所以放在this上
        let resolve = (value) => {
            if (this.status === PENDING) {
                //保证只有状态时等待态的时候才能更改状态
                this.value = value;
                this.status = RESOLVED;
            }
        }
        let reject = (reason) => {
                if (this.status === PENDING) {
                    this.reason = reason;
                    this.status = REJECTED;
                }
            }
            // 执行executor传入我们定义的成功和失败函数 
            // 把内部的resolve和reject传入executor中用户写的resolve,reject
        try {
            executor(resolve, reject);
        } catch (e) {
            console.log('catch错误', e);
            reject(e); //如果内部出错 直接将error手动调用reject向下传递
        }
    }
    then(onfulfilled, onrejected) {
        if (this.status === RESOLVEC) {
            onfulfilled(this.value);
        }
        if (this.status === REJECTED) {
            onrejected(this.reason);
        }
    }
}
module.exports = Promise;
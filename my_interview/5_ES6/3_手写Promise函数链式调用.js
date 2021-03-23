const PENDING = 'PENDING';
const RESOLVED = 'RESOLVED';
const REJECTED = 'REJECTED';

/*
    主要就是多了resolvePromise这么一个函数 用来递归处理then内部回调函数执行后的结果
    它有4个参数
    1.promise2: 就是新生成的promise 为了符合promisea+规范
    2.x: 我们要处理的目标
    3.resolve: promise2的resolve, 执行之后promise2的状态就变为成功了，就可以在它的then方法的成功回调中拿到最终结果。
    4.reject: promise2的reject, 执行之后promise2的状态就变为失败，在它的then方法的失败回调中拿到失败原因。
*/
/*
    catch方法其实就是没有成功回调的then方法
    一旦失败之后就会调用reject 最终都会走到then方法的失败回调中 
    只是见到那把then方法换个名字
*/
function resolvePromise(promise2, x, resolve, reject) {
    if (typeof x === 'object' && x != null || typeof x === 'function') {
        // 有可能是promise 如果是promise就要有then方法
        let then = x.then;
        if (typeof then === 'function') {
            // 到这里只能认为它是promise了
            // 如果x是一个promise那么在new的时候executor就立即执行
            // 就会执行它的resolved 那么数据就会传递到它的then中
            then.call(x, y => {
                // 当前promise解析出来的结果还可能是一个promise
                // 直到解析到它是一个普通值
                resolvePromise(promise2, y, resolve, reject);
                // resolve reject都是promise2的
            }, r => {
                reject(r);
            })
        } else {
            // 出现像这种结果 {a:1,then:1}
            resolve(x);
        }
    } else {
        resolve(x);
    }
}

class Promise {
    constructor(executor) {
        this.status = PENDING; //宏变量 默认是等待态
        this.value = undefined; //then方法要访问所以放到this上
        this.reason = undefined; //then方法要访问所以放到this上
        // 专门存放成功的回调函数
        this.onResolvedCallbacks = [];
        // 专门存放失败的回调函数
        this.onRejectedCallbacks = [];
        let resolve = value => {
            if (this.status === PENDING) {
                // 保证只有状态是等待态的时候才能改变状态
                this.value = value;
                this.status = RESOLVED;
                // 需要让成功的方法一次执行
                this.onResolvedCallbacks.forEach(fn => fn())
            }
        };
        let reject = reason => {
                if (this.status === PENDING) {
                    this.reason = reason;
                    this.status = REJECTED;
                    // 需要让失败的方法一次执行
                    this.onRejectedCallbacks.forEach(fn => fn())
                }
            }
            // 执行executor传入成功和失败参数
            // 把内部的resolve和reject传入executor中用户写的resolve reject
        try {
            executor(resolve, reject); //立即执行
        } catch (e) {
            console.log('catch错误', e);
            reject(e); //如果内部出现错误 直接将error手动调用reject向下传递
        }
    }
    then(onfulfilled, onrejected) {
        // 为了实现链式调用 创建一个新的promise 
        let promise2 = new Promise((resolve, reject) => {
            if (this.status === RESOLVED) {
                // 执行then中的方法 可能返回一个普通值 
                // 可能是一个promise 如果是promise 需要让这个promsie执行
                // 使用宏任务把代码放在下一次执行 这样就可以取到promise2
                setTimeout(() => {
                    try {
                        let x = onfulfilled(this.value);
                        resolvePromise(promise2, x, resolve, reject);
                    } catch (e) {
                        // 一旦执行then方法报错 就走到下一个then是啊比方法中
                        console.log(e);
                        reject(e);
                    }
                }, 0)
            }
            if (this.status === PENDING) {
                setTimeout(() => {
                    try {
                        let x = onrejected(this.reason);
                        resolvePromise(promise2, x, resolve, reject);
                    } catch (e) {
                        reject(e);
                    }
                }, 0)
            }
            // 处理异步的情况
            if (this.status === PENDING) {
                // 这时候executor肯定是有异步逻辑
                this.onResolvedCallbacks.push(() => {
                    setTimeout(() => {
                        try {
                            let x = onfulfilled(this.value);
                            // 注意这里传入的是promise2的resolve和reject
                            resolvePromise(promise2, x, resolve, reject);
                        } catch (e) {
                            reject(e);
                        }
                    }, 0)
                })
                this.onRejectedCallbacks.push(() => {
                    setTimeout(() => {
                        try {
                            let x = onrejected(this.reason);
                            resolvePromise(promise2, x, resolve, reject);
                        } catch (e) {
                            reject(e);
                        }
                    }, 0)
                })
            }
        });
        return promise2;
    }
}
module.exports = Promsie;
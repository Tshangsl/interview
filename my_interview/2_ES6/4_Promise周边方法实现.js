// Promise.resolve() 创建一个成功的Promise
Promise.resolve = function(value) {
    return new Promise((resolve, reject) => {
        resolve(value);
    })
};
// Promsie.reject() 创建一个失败的Promise
Promise.reject = function(value) {
    return new Promise((resolve, reject) => {
        reject(value);
    })
};
// Ppromise.all 参数是一个数组 数组内是一个一个的promise
// 最终返回一个新的Promise
/*这些数组内的promise会并行执行,
当所有的promise都变为fulfilled，
最终返回的这个新的promise的状态才会变为fulfilled,
 只要有一个promise状态变为rejected，
那么最终返回的这个新的pomise的状态就是rejected。
 */
Promise.all = function(promises) {
    return new Promise((resolve, reject) => {
        let result = [];
        let len = Promise.length;
        if (len === 0) {
            resolve(result);
            return;
        }
        const handleData = (data, index) => {
            result[index] = data;
            // 最后一个Promise执行完
            if (index == len - 1)
                resolve(result);
        }
        for (let i = 0; i < len; i++) {
            // 为什么不直接promise[i].then 因为promise[i]可能不是一个promise
            Promise.resolve(promise[i]).then(data => {
                handleData(data, i);
            }).catch(err => {
                reject(err);
            })
        }
    })
}
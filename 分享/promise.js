// promise是一个类
// 当resolve在setTimeout内执行 then时state还是pending状态 
// 需要在then调用时 将成功和失败存到各自的数组 一旦reject或resolve 就调用
// 类似于发布订阅 先将then中的两个函数存储起来 由于一个promise可以有多个then 所以存在一个数组中
// 成功或失败时 forEach调用它们
class Promise{
    constructor(executor){
        // 初始化state为等待态
        this.state = 'pending'
        // 成功的值
        this.value = undefined
        // 失败的原因
        this.reason = undefined
        // 成功存放的数组
        this.onResolvedCallbacks = []
        // 失败存放的数组
        this.onRejectedCallbacks = []
        let resolve = value=>{
            if(this.state === 'pending'){
                this.state = 'fulfilled'
                this.value = value
                // 一旦resolve执行 调用成功数组的函数
                this.onResolvedCallbacks.forEach(fn=>fn())
            }
        }
        let reject = reason =>{
            if(this.state === 'pending'){
                this.state = 'rejected'
                this.reason = reason
                // 一旦reject执行 调用失败数组的函数
                this.onRejectedCallbacks.forEach(fn=>fn())
            }
        }
        try{
            executor(resolve,reject)
        }catch(err){
            reject(err)
        }
    }
    then(onFulfilled,onRejected){
        let promise2 = new Promise((resolve,reject)=>{
            if(this.state === 'fulfilled'){
                onFulfilled(this.value)
            }
            if(this.state === 'rejected'){
                onRejected(this.reason)
            }
            // 当状态state为pending时
            if(this.state = 'pending'){
                // onFulfilled传入到成功数组
                this.onResolvedCallbacks.push(()=>{
                    onFulfilled(this.value)
                })
                // onRejected传入到失败数组
                this.onRejectedCallbacks.push(()=>{
                    onRejected(this.reason)
                })
            }  
        })
    }
}
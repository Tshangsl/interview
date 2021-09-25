// promise基础题
// 1
const promise1 = new Promise((resolve,reject)=>{
    console.log('promise1');
})
console.log('1',promise1);
// 2
const promise2 = new Promise((resolve,reject)=>{
    console.log(1);
    resolve('success');
    console.log(2);
})
promise2.then(()=>{
    console.log(3);
})
console.log(4);
// 3
// promise中没有resolve或reject 因此promise.then不会执行 它只有在状态改变后才会执行
const promise3 = new Promise((resolve,reject)=>{
    console.log(1);
    console.log(2);
})
promise3.then(()=>{
    console.log(3);
})
console.log(4);
// 4
const promise4 = new Promise((resolve,reject)=>{
    console.log('promise1');
    resolve('resolve1');
})
const promise42 = promise4.then(res=>{
    console.log(res);
})
console.log('1',promise4);
console.log('2',promise42);
// 5
// fn函数直接返回一个new Promise 且fn函数的调用在start之前 里面的内容会先执行
const fn = (new Promise((resolve,reject)=>{
    console.log(1);
    resolve('success');
}))
fn().then(res=>{
    console.log(res);
})
console.log(start);
// 6
// new Promise()不是就执行第一个参数 需要注意其是否被包裹在函数中 如果是 只有在函数调用时才会执行
const fn = ()=>{
    new Promise((resolve,reject)=>{
        console.log(1);
        resolve('success');
    })
}
console.log('start');
fn().then(res=>{
    console.log(res);
})
// promise结合setTimeout
// 1
console.log('start');
setTimeout(()=>{
    console.log('time');
})
Promise.resolve().then(()=>{
    console.log('resolve');
})
console.log('end');
// 2
const promise22 = new Promise((resolve,reject)=>{
    console.log(1);
    setTimeout(()=>{
        console.log('timerStart');
        resolve('success');
        console.log('timerend');
    })
    console.log(2);
})
promise22.then((res)=>{
    console.log(res);
})
console.log(4);
// 3 ***
setTimeout(()=>{
    console.log('timer1');
    setTimeout(()=>{
        console.log('timer3')
    },0)
},0)
setTimeout(()=>{
    console.log('timer2');
},0)
console.log('start');

setTimeout(()=>{
    console.log('timer1');
    Promise.resolve().then(()=>{
        console.log('promise');
    })
})
setTimeout(()=>{
    console.log('timer2');
},0)
console.log('start');

// 3 ***
// 在promise中执行定时器 在定时器中执行promise
Promise.resolve().then(()=>{
    console.log('promise1');
    const timer2 = setTimeout(()=>{
        console.log('timer2');
    },0)
})
const timer1 = setTimeout(()=>{
    console.log('timer1');
    Promise.resolve().then(()=>{
        console.log('promise2');
    })
},0)
console.log('start');

// 4
const promise1 = new Promise((resolve,reject)=>{
    setTimeout(()=>{
        resolve('suuccess');
    },1000)
})
const promise2 = promise1.then(()=>{
    throw new Error('error');
})
console.log('promise1',promise1);
console.log('promise2',promise2);
setTimeout(()=>{
    console.log('promis1',promise1);
    console.log('promise2',promise2);
},2000)

// 5
const promise = new Promise((resolve,reject)=>{
    setTimeout(()=>{
        console.log('timer');
        resolve('success')
    },1000)
})
const start = Date.now();
promise.then(res=>{
    console.log(res,Date.now()-start);
})
promise.then(res=>{
    console.log(res,Date.now - start);
})

// 6 抛出错误
return Promise.reject(new Error('error!!!'));
throw new Error('error!!!')

// 7 
// then或catch返回的值不能使promise本身 否则会造成死循环
const promise = Promise.resolve().then(()=>{
    return promise;
})
promise.catch(console.err);

// 8
// then或catch的参数期待是函数 传入非函数则会发生值透传
// 第一个then和第二个then中传入的都不是函数 一个是数字类型 一个是对象类型 因此发生了透传 将resolve(1)的值直接传到了最后一个then里
Promise.resolve(1)
    .then(2)
    .then(Promise.resolve(3))
    .then(console.log)

// 9
Promise.resolve()
    .then(function success(res){
        throw new Error('error!!!');
    },function fail1(err){
        console.log('fail1',err)
    }).catch(function fail2(err){
        console.log('fail2',err);
    })

// 10
// 链式调用后面的内容需要等前一个调用执行完才会执行
// 就像这里的finally()会等promise1().then()执行完才会将finally()加入微任务队列
function promise1 () {
    let p = new Promise((resolve) => {
      console.log('promise1');
      resolve('1')
    })
    return p;
  }
  function promise2 () {
    return new Promise((resolve, reject) => {
      reject('error')
    })
  }
  promise1()
    .then(res => console.log(res))
    .catch(err => console.log(err))
    .finally(() => console.log('finally1'))
  
  promise2()
    .then(res => console.log(res))
    .catch(err => console.log(err))
    .finally(() => console.log('finally2'))

// promise中的all和race
// 1
// 有了all 可以并行执行多个异步操作 并在一个回调处处理所有的返回数据
function runAsync (x){
    const p = new Promise(r=>setTimeout(()=>r(x,console.log(x),1000)))
    return p;
}
Promise.all([runAsync(1),runAsync(2),runAsync(3)])
    .then(res=>console.log(res));

// 2
function runAsync(x){
    const p = new Promise(r=>setTimeout(()=>r(x,console.log(x)),1000));
    return p;
}
function runReject(x){
    const p = new Promise((res,rej)=>setTimeout(()=>rej(`Error:${x}`,console.log(x))))
}
Promise.all([runAsync(1), runReject(4), runAsync(3), runReject(2)])
  .then(res => console.log(res))
  .catch(err => console.log(err))

// 3
// race 给某个异步请求设置超时时间 并在超时后执行相应的操作

// async&await
// 1
async function async1(){
    console.log('async1 start');
    await async2();
    console.log('async2 end');
}
async function async2(){
    console.log('async2');
}
async1();
console.log('start');

// 2 async结合定时器
async function async1(){
    console.log('async1 start');
    await async2();
    console.log('async1 end')
}
async function async2(){
    setTimeout(()=>{
        console.log('timer');
    },0)
    console.log('async2')
}
async1();
console.log('start');

// 3

// 4
// 正常情况下 async中的await命令是一个Promise对象 返回该对象的结果
// 如果不是Promise对象 就会直接返回对应的值 相当于Promise.resolve()
async function fn(){
    // return await 1234
    // 等同于
    return 123;
}
fn().then(res=>console.log(res));

// 5 
// async1中await后面的Promise是没有返回值的 也就是它的状态始终是pending状态 因此相当于一直在await 却没有响应

// 
// 7
// 
// script start-async1 start- async2- promise1-script end- async1 end- promise2-setTimeout


// async处理错误
// 1
// async中 如果await后面的内容是一个异常或错误 如果在async函数中抛出了错误 则终止错误结果 不会继续向下执行
async function async1(){
    await async2();
    console.log('async1');
    return 'async1 success'
}
async function async2(){
    return new Promise((resolve,reject)=>{
        console.log('async2')
        reject('error')
    })
}
async1().then(res=>console.log(res));

// 2  
// 如果想要使得错误的地方不影响async函数后续的执行 可以使用try catch
async function async1(){
    try{
        await Promise.reject('error!!!')
    }catch(e){
        console.log(e);
    }
    console.log('async1');
    return Promise.resolve('async1 success')
}
async1().then(res=>console.log(res));
console.log('script start');
// 或者可以直接在Promise.reject后面跟着一个catch方法 运行结果是一样的
async function async1(){
    // try{
    //     await Promise.reject('error!!!')
    // }catch(e){
    //     console.log(e);
    // }
    await Promise.reject('error!!!')
        .catch(e=>console.log(e));
    console.log('async1');
    return Promise.resolve('async1 success')
}
async1().then(res=>console.log(res));
console.log('script start');

// 综合
// 1


// 面试题
// 1. 使用Promise实现每隔1秒输出1 2 3
// 用Promise配合reduce不停的在promise后面叠加.then
const arr = [1,2,3];
arr.reduce((p,x)=>{
    return p.then(()=>{
        return new Promise(r=>{
            setTimeout(()=>r(console.log(x)),1000)
        })
    })
},Promise.resolve())
// 2. 使用Promise实现红绿灯交替重复亮
// 红灯3秒亮一次 黄灯2秒亮一次 绿灯1秒亮一次 如何让三个灯不断交替重复亮灯
function red(){
    console.log('red');
}
function green(){
    console.log('green');
}
function yellow(){
    console.log('yellow');
}
const light = function(timer,cb){
    return new Promise(resolve=>{
        setTimeout(()=>{
            cb();
            resolve()
        },timer)
    })
}
const step = function(){
    Promise.resolve().then(()=>{
        setTimeout(()=>{
            cb()
            resolve()
        },timer)
    })
}
const step = function(){
    Promise.resolve().then(()=>{
        return light(3000,red);
    }).then(()=>{
        return light(2000,green);
    }).then(()=>{
        return light(1000,yellow);
    }).then(()=>{
        return step();
    })
}
step();
// 3. 实现mergePromise函数
// 把传进去的数组按照顺序先后执行 并且把返回的数据先后放到数组data中

// 4. 根据Promise A+实现一个自己的promise

// 5. 封装一个异步加载图片的方法
// 在图片的onload函数中 使用resolve返回一下就可以了
function loadImg(url){
    return new Promise((resolve,reject)=>{
        const img = new Image();
        img.onload = function(){
            console.log('一张图片加载完成');
            resolve(img);
        }
        img.onerror = function(){
            reject(new Error('Could not load image at'+url));
        }
        img.src = url;
    })
}

// 6. 限制异步操作的并发个数并尽可能快的完成全部
function limitLoad(urls,handler,limit){
    let sequence = [].concat(urls);//复制urls
    // 这一步是为了初始化promises这个容器
    let promises = sequence.splice(0,limit).map((url,index)=>{
        return handler(url).then(()=>{
            // 返回下标是为了知道数组中是哪一项最先完成
            return index;
        })
    })
    // 这里要将整个变量过程返回 这样得到的就是一个promise 可以在外面链式调用
    return sequence
        .reduce((pCollect,url)=>{

        })
}
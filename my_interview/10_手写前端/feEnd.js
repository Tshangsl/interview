//1. 节流 冷却一段时间
function throttle(fn,delay){
    var startTime = 0
    return function(){
        var nowTime = Date.now();
        if(nowTime - startTime > delay){
            fn.call(this)
            // 普通函数中的this被那个函数调用指向哪个函数
        }
        startTime = nowTime;
    }
}
//2. 防抖 只执行最后一次
function debounce(fn,delay){
    var timer = null;
    return function(){
        if(timer){
            clearTimeout(timer);
        }
        timer = setTimeout(()=>{
            fn.call(this)
        },delay)
    }
}
//3.图片懒加载
function lazyload(){
    const imgs = document.getElementsByTagName('img');
    const len = imgs.length;
    const viewHeight = document.documentElement.clientHeight;
    const scrollHeight = document.documentElement.scrollTop||document.body.scrollTop
    for(let i =0 ;i<len;i++){
        var offsetHeight = imgs[i].offsetTop;
        if(offsetHeight<viewHeight+scrollHeight){
            const src = imgs[i].dataset.src
            imgs[i].src = srcs
        }
    }
}
//4.封装栈
class Stack{
    constructor(){
        this.items = [];
    }
    push(element){
        this.items.push(element);
    }
    pop(){
        return this.items.pop();
    }
    peek(){
        return this.items[this.items.length-1];
    }
    isEmpty(){
        return !this.items.length;
    }
    clear(){
        this.items = [];
    }
    size(){
        return this.items.length;
    }
}











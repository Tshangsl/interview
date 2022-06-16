//防抖函数
function debunce(fn, delay) {
    let flag = null;
    return function () {
        if (flag) clearTimeout(flag)
        //利用apply改变函数指向，使得封装后的函数可以接收event本身
        flag = setTimeout(() => fn.apply(this, arguments), delay)
    }
}

//节流函数
function throttle(fn, delay) {
    let flag = true;
    return function () {
        if (!flag) return false;
        flag = false;
        setTimeout(() => {
            fn.apply(this, arguments)
            flag = true
        }, delay)
    }
}
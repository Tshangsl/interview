// for循环中正确使用await
const fetch = require('node-fetch');
const bluebird = require('bluebird');

async function getZhihuColumn(id){
    await bluebird.delay(1000);
    const url = `https://zhuanlan.zhihu.com/api/columns/${id}`;
    const res = await fetch(url);
    return await res.json();
}

const showColumnInfo = async ()=>{
    console.time('showColumnInfo');
    const names = ['feweekly','toolingtips'];
    const promises = names.map(x=>getZhihuColumn(x));
    // 类似于之前串行的写法
    // 将循环中的串行改成并行
    // 类似之前的思路 触发所有的请求 拿到一个Promise数组
    // 遍历该数组 等待里面的结果resolve
    for(const name of names){
        const column = await promise;
        console.log(`NAME:${column.title}`);
        console.log(`INTRO:${column.intro}`);
    }
    console.timeEnd('showColumnInfo');
}

showColumnInfo();

// 下周六下午三点
// http html css es6 node.js 计算机网络 linux
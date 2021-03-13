// 所有的async函数都会返回一个promise
// 可以像使用promise一样
// 使用async的返回值
const fetch = require('node-fetch');

async function getZhihuColumn(id) {
    const url = `https://zhuanlan.zhihu.com/api/columns/${id}`;
    const res = await fetch(url);
    return await res.json();
}
// 可以利用promise chain 把多个async函数串起来
// 可以调用promise的catch方法
getZhihuColumn('feweekly').then(column=>{
    console.log(`TITLE:${column.title}`);
    console.log(`INTRO:${column.intro}`)
})
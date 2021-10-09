const fetch = require('node-fetch');
const { resolve } = require('path');

const sleep = (timeout = 2000) => new Promise(resolve=>{
    setTimeout(resolve,timeout);
})

async function getZhihuColumn(id){
    await sleep(2000);
    const url = `https://zhuanlan.zhihu.com/api/columns/${id}`;
    const res = await fetch(url);
    return await res.json();
}

const showColumnInfo = async () =>{
    console.time('showColumnInfo');
    // 串行 等待一个请求发生完成后 发生第二个请求
    const feweekly = await getZhihuColumn('feweekly');
    const toolingtips = await getZhihuColumn('toolingtips');
    // 并行(代码运行更快)
    // const feweeklyPromise = getZhihuColumn('feweekly');
    // const toolingtipsPromise = getZhihuColumn('toolingtips');
    // const feweekly = await feweeklyPromise;
    // const toolingtips = await toolingtipsPromise;    
    
    console.log(`TITLE:${feweekly.title}`);
    console.log(`INTRO:${feweekly.intro}`);
    
    console.log(`TITLE:${toolingtips.title}`);
    console.log(`INTRO:${toolingtips.intro}`);
    console.timeEnd('showColumnInfo');
}

showColumnInfo();
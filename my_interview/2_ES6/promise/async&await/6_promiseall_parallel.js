const fetch = require('node-fetch');

async function getZhihuColumn (id){
    const url = `https://zhuanlan.zhihu.com/api/columns/${id}`;
    const res = await fetch(url);
    return await res.json();
}

const showColumnInfo = async ()=>{
    //接受数组参数 每一个参数可以是一个Promise对象 返回值Promise
    const [feweekly,toolingtips] = await Promise.all([
        getZhihuColumn('feweekly'),
        getZhihuColumn('toolingtips')
    ])
    // const feweekly = await getZhihuColumn('feweekly');
    // const toolingtips = await getZhihuColumn('toolingtips');

    console.log(`NAME:${feweekly.title}`);
    console.log(`INTRO:${feweekly.intro}`);
    console.log(`NAME:${toolingtips.title}`);
    console.log(`INTRO:${toolingtips.intro}`);
}

showColumnInfo();
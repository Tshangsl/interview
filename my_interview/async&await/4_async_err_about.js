const fetch = require('node-fetch');

// async函数的错误处理

async function getZhihuColumn(id) {
    const url = `https://zhuanlan.zhihu.com/api/columns/${id}`;
    const res = await fetch(url);
    console.log({ status: res.status });
    if (res.status != 200) {
        throw new Error(res.statusText);
    }
    return await res.json();
}
const showColumnInfo = async id => {
    try {
        const column = await getZhihuColumn(id);
        console.log(`TITLE:${column.title}`);
        console.log(`INTRO:${column.intro}`)
    } catch(err) {
        console.error(err);
    }
}
showColumnInfo('feldn');
// async关键字理论上可以适用于JS中的所有函数形态
// 函数声明 函数表达式 箭头函数 方法
const fetch = require('node-fetch');

// Node.js和浏览器中 在全(顶)局作用域中 使用async关键字是非法的

// 函数表达式和箭头函数
const getZhihuColumn = async id => {
    const url = `https://zhuanlan.zhihu.com/api/columns/${id}`;
    const res = await fetch(url);
    return await res.json();
}


// 对象上声明async可以类似于在类上声明async方法
class APIClient {
    async getColumn(id) {
        const url = `https://zhuanlan.zhihu.com/api/columns/${id}`;
        const res = await fetch(url);
        return await res.json();
    }
}

// 声明一个匿名的函数表达式 并将其设置为async
// 代码风格 Immediately-Invoked Function Expression
// 一种比较常见的js编码风格 
(async () => {
    const client = new APIClient();
    const column = await client.getColumn('feweekly');
    // const column = await getZhihuColumn('feweekly');
    console.log(`TITLE:${column.title}`);
    console.log(`INTRO:${column.intro}`);
})();
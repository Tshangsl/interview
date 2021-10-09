// async&await是ES2017中引入的新特性
// 在最新版的Node.js和Chrome浏览器中都已经有支持
// 可以让我们把异步的代码写的更加简洁

// mixin的json()方法接收一个Response流，并将其读取完成
// 它返回一个Promise,Promise的解析resolve结果是将文本体解析为JSON
// 参数：没有 返回值：返回一个被解析为JSON格式的promise对象
// 这可以是任何可以由JSON表示的东西 
// 一个object 一个array 一个string 一个number 

// const fetch = require('node-fetch');

// function getZhihuColumn(id) {
//     const url = `https://zhuanlan.zhihu.com/api/columns/${id}`;
//     fetch(url)
//         .then(response => response.json())
//         .then(column => {
//             console.log(`TITLE：${column.title}`);
//             console.log(`INTRO:${column.intro}`)
//         })
// }

// getZhihuColumn('feweekly');

// async&await代码读起来更像是同步代码
// 顺序向下执行
// await关键字接受一个Promise 
// 在该Promise resolve的时候 可以把resolve的值赋值给赋值表达式左边的变量
// 在该Promise reject时 会抛出一个错误 throw一个err

const fetch = require('node-fetch');

async function getZhihuColumn(id) {
    const url = `https://zhuanlan.zhihu.com/api/columns/${id}`;
    const response = await fetch(url);
    const column = await response.json();
    console.log(`TITLE:${column.title}`);
    console.log(`INTRO:${column.intro}`)
}

getZhihuColumn('feweekly');
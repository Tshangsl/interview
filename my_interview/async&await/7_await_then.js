const bluebird = require('bluebird');
// 结合await和任意兼容.then()的代码
async function main(){
    // await操作符的特性 隐式的调用 如果传的是Promise就会用Promise
    // 如果不是 有一个Promise.resolve的隐式调用
    // await操作符可以和任何兼容Promise或带有then方法的库结合使用
    // bluebird常见的Promise库
    console.log('waiting...');
    await bluebird.delay(2000);
    console.log('done');
    // const number = await Promise.resolve(200);
    // console.log(number);

}
main();
### CommonJS规范
> 目的
- 是以在浏览器环境之外构建JS生态系统为目标而产生的项目 如服务器和桌面环境中
> 作用
- 为了解决JS的作用域问题而定义的模块形式 可以使每个模块在它自己的命名空间中执行
> 内容
- 模块必须通过module.exports导出对外的变量或借口
- 通过require()来导入其他模块的输入到当前模块作用域中
> 性质
- CommonJS是同步加载模块 但是也有浏览器端的实现 其原理是将所有模块都定义好并通过id索引 实现在浏览器环境中解析
### AMD(异步模块定义)规范与其的require.js实现
> 目的
- 是为了浏览器环境设计的 因为CommonJS模块系统是同步加载的 当前浏览器环境还没有准备好同步加载模块的条件
- AMD定义了一套JS模块依赖异步加载标准来解决同步加载的问题
- 模块通过define函数定义在闭包中
```
define(id?:String,dependencies?:String[],factory:Function|Object)
```
1. id 是模块的名字 是可选的参数
2. dependencies指定了所要依赖的模块列表 它是一个数组 也是可选的参数 每个依赖的模块的输出将作为参数一次传入factory中 如果没有指定dependencies 则它的默认值是['require','exports','module']
3. factory是最后一个参数 它包裹了模块的具体实现 它是一个函数或者对象 如果是函数 那么它的返回值就是模块的输出接口或值
> 例子
```
define('myModule',['jquery'],function($){
    //$是jquery模块的输出
    $('body').text('hello world');
})
require(['myModule'],function(myModule){})
```
> 定义一个没有id值的匿名模块 通常作为应用的启动函数
```
define(['jquery'],function($){
    $('body').text('hello world');
})
```
### CMD与sea.js
- require.js在申明依赖的模块时会第一时间加载并执行模块内的代码
```
define(['a','b'],function(a,b){
    // 等于在最前面声明并初始化了要用到的所有模块
    if(false){
        //即便没用到某个模块b 但b还是提前执行了
        b.foo()
    }
})
```
> 定义
- 另一种JS模块化方案 与AMD很类似
> 不同
- AMD推崇依赖前置 提前执行
- CMD推崇以来就近 延迟执行

### ES6计算属性名称
```
this.setState({
    [name]:value
})
```
```
var partialState = {};
partialState[name] = value;
this.setState(partialState)
```
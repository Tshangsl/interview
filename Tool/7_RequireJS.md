### requierjs定义
- 一个非常小巧的JS模块载入框架 AMD规范最好的实现者之一
- 最新版本Requirejs压缩后只有14k 十分轻量 可以同时和其他框架协同工作
### 优点
1. 防止JS加载阻塞页面渲染 实现JS文件的异步加载
2. 使用程序调用的方式加载JS 管理模块之间的依赖
### 原本的问题
1. 页面加载时从上往下开始加载和渲染 当页面有很多分散的JS文件时 页面会先加载和解析头部的JS文件(同步加载) 此时页面渲染就被堵塞了 如果这些JS文件请求数量较多 则网页失去响应的时间就会加长
2. js文件之间相互依赖 文件引入顺序 依赖性大的文件在最后引入
### 解决堵塞
1. 模块化组织JS
2. 异步加载JS文件
### 基本API
> require会定义三个变量 define require requirejs
- require === requirejs 一般使用require更简短
- define 从名字可以看出这个API是用来定义一个模块
- require 加载依赖模块 并执行加载完后的回调函数
```
a.js
define(function(){
    function fun1(){
        alert('it works');
    }
    fun1();
})
b.js
require(['js/a'])
```
- require中的依赖是一个数组 即使只有一个依赖 也必须使用数组定义
- require API第二个参数是callback 一个function 用来处理加载完毕后的逻辑
```
require(['js/a'],function(){
    alert('load finished');
})
```
> 加载文件
- 大部分情况下网站需要加载的JS kennel来自本地服务器 其他网站或CDN
```
require.config({
    paths:{
        'jquery':['http://libs.baidu.com/jquery/2.0.3/jquery','js/jquery']
        'a':'js/a'
    }
})
require(['jquery','a'],function($){
    $(function(){
        alert('load finished');
    })
})
```
> require.config
- 用来配置模块加载位置 其实就是给模块起一个更短更好记的名字
>paths
- 通过paths的配置会使模块名字更精炼 paths还有一个重要的功能 就是可以配置多个路径 如果远程cdn没有加载成功 可以加载本地的库
- 百度的jquery没有加载成功后 会加载本地js目录下的jquery
1. 在使用requirejs时 加载模块时不用写.js后缀 也不能写后缀
2. 上述代码中callback函数中有$参数 这个就是依赖的jquery模块的输出变量 如果依赖多个模块 可以依次写入多个参数使用
> data-main属性
- 该属性指定的js在加载完require.js后处理
- 把require.config的配置加入data-main后 就可以使每一个页面都使用这个配置
> 第三方模块
1. 非AMD模块输出 将非标准的AMD模块垫成可用的模块
```
require.config({
    shim:{
        'underscore':{
            exports:''
        }
    }
})
```
- 这样配置后 就可以在其他模块中引用underscore模块
```
require(['underscore'],function(_){
    _.each([1,2,3],alert);
})
```
2. 插件形式的非AMD模块 
- jquery插件基本都不符合AMD规范 如jquery.form插件
- 此时需要将form插件垫到jquery中
### requireJS启动加载脚本的初始化方式
- requirejs支持属性data-main这个属性来加载初始化的JS文件
- 其中app.js文件也是入口文件
- RequireJS编写模块不同于其他脚本文件 它良好的使用define来定义一个作用域避免全局空间污染
- 它可以显示出其依赖关系 并且以函数(定义此模块的那个函数)参数的形式将这些依赖进行诸如
### requireJS配置项
1. baseUrl:指定本地模块的基准目录 即本地模块的路径是相对于那个目录的 该属性通常有requireJS加载时的data-main属性指定
```
<script src="RequireJS/require.js" defer async='true' data-main="RequireJS/app.js">
```
- 如果未显示设置baseUrl则默认值是加载require.js的html所处的位置 如果使用了data-main属性 则该路径编程baseUrl
2. paths是映射那些不直接放在baseUrl指定的目录下的文件 设置paths的起始位置是相对于baseUrl的 除非该path的设置是以'/'开头或含有URL协议(http://或https://)
3. skim参数:理论上 require.js加载的模块 必须是按照AMD规范 用define()函数定义的模块 skim解决了使用非AMD方式定义的模块(如jquery插件)及其载入顺序 为那些没有使用define()来声明依赖关系 设置模块的浏览器全局变量 注入型脚本做依赖和导出配置
- require.config()接受一个配置对象 这个对象除了paths属性外 还有一个shim属性 专门用来配置不兼容的模块 每个模块要定义
    1. exports值(输出的变量名) 表明这个模块外部调用时的名称
    2. deps数组 表明该模块的依赖性
4. map参数:对于给定的模块前缀 使用一个不同的模块ID来加载该模块 当不同的模块需要加载不同版本的jquery文件 需要用到这个map来解决
5. config参数:一般将易变的或者application级别的信息配置在config中 基于requirejs.config()的config配置项实现 获取这些信息的模块可以加载特殊的依赖module 并调用module.config()s
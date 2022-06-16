> Koa是一种简单好用的Web框架 它的特点是优雅 简洁 表达力强 自由度高 本身代码只有1000多行 所有功能都通过插件实现 很符合Unix哲学
1. 架设HTTP服务
    ```
    const Koa = require('koa');
    const app = new Koa();
    app.listen(3000)
    ```
2. Context对象
    - Koa提供一个Context对象 表示一次对话的上下文(包括HTTP请求和HTTP回复)通过加工这个对象 可以控制返回给用户的内容
    ```
    const Koa = require('koa');
    const app = new Koa();

    const main = ctx=>{
        ctx.response.body = 'Hello World'
    }
    app.use(main);
    app.listen(3000)
    ```
3. HTTP Response类型
    - Koa默认的返回类型是text/plain 如果想返回其他类型的内容 可以先使用ctx.request.accepts判断一下 客户端希望接受什么数据(根据HTTP Request的Accept字段) 然后使用ctx.response.type指定返回类型
4. 路由
    1. 原生路由
        - 网站一般都有多个页面 通过ctx.request.path可以获取用户请求的路径 由此实现简单的路由
    2. koa-route模块
        ```
        const route = require('koa-route');

        const about = ctx=>{
            ctx.response.type = 'html';
            ctx.response.body = '<a href="/">Index Page</a>'
        }

        const main = ctx=>{
            ctx.response.body = 'Hello World'
        }
        app.use(route.get('/',main));
        app.use(route.get('/about',about))
        ```
    3. 静态资源
        - 如果网站提供静态资源 为它们一个个写路由 没有必要
        - koa-static封装了这部分请求
    4. 重定向
        - ctx.response.redirect()
5. 中间件
    1. Logger功能
        - 它处在HTTP Request 和HTTP Response中间 用来实现某种中间功能 app.use()用来加载中间件
        - 基本上Koa所有功能都通过中间件实现 每个中间件默认接受两个参数
        1. 第一个参数是Context对象
        2. 第二个参数是next函数 只要调用next函数 就可以把执行权转交给下一个中间件

    2. 中间件栈
        - 多个中间件会形成一个栈结构 以先进后厨顺序执行

    3. 异步中间件
        - 如果有异步操作(如读取数据库)中间件必须写成async函数
        ```
        const fs = require('fs.promised')
        const Koa = require('koa')
        const app = new Koa()

        const main = async function(ctx,next){

        }
        ```
        - 上面代码中 fs.readFile是一个异步操作 必须写成await fs.readFile() 中间件必须写成async
    4. 中间件的合成
        - koa-compose模块可以将多个中间件合成一个
6. 错误处理
    1. ctx.throw()
        2. 处理错误的中间件
        - 为了方便处理错误 最好使用try catch将其捕获
        3. error事件的监听
7. 常见中间件 
    1. koa-router
    2. koa-ctx
    3. koa-logger
    4. koa-compose
15. koa是一个精简的Node框架
    1. 它基于node原生的req和res 封装自定义的request和response对象 并基于他们封装成一个统一的context对象
    2. 它基于async/await(generator)的洋葱模型实现了中间件机制
    > Koa框架核心目录
    - lib
        - application.js
            - koa实例的初始化 组合中间件 启动服务器
            - application.js是koa的主入口 也是核心部分
            1. 完成koa实例初始化工作 启动服务器
            2. 实现洋葱模型的中间件机制
            3. 封装了高内聚的context对象
            4. 实现了异步函数的统一错误处理机制
        - request.js
            - 代理原生req请求对象 提供更加简便的方法和属性
            - request.header = >req.header
            - 当访问ctx.request.xxx时 实际上是在访问request对象上的setter和getter
        - response.js
            - 代理原生res响应对象 提供更加简便的方法和属性
            - response.status = >res.statusCode
            - 当访问ctx.response.xxx时 实际上是在访问response对象上的setter和getter
        - context.js
            - 上下文 同时代理request和response
            - ctx.header = >ctx.request.header=>req.header
            - ctx.status = >ctx.response.status=>res.statusCode
            1. 完成了错误事件处理
            2. 代理了response对象和request对象的部分属性和方法

    > koa工作流
    1. 初始化阶段
        1. new初始化一个实例 包括创建中间件数组 创建context/request/response对象 
        2. 再使用use(fn)添加中间件到middleware数组 最后使用listen合成中间件fnMiddleware 
        3. 按照洋葱模型依次执行中间件 返回一个callback函数给http.createServer 开启服务器 等待http请求
    2. 请求阶段
        - 每次请求 createContext生成一个新的ctx 传给fnMiddleware触发中间件的整个流程
    3. 响应阶段
        - 整个中间件完成之后 调用response方法 对请求做最后的处理 返回响应给客户端 

    > koa中间件机制
    - 采用koa-compose实现 
    - compose函数接收middleware数组作为参数 middleware中每个对象都是async函数 返回一个以context和next作为入参的函数
    - 我们和源码一样 称其为fnMiddleware在外部调用this.handleRequest的最后一行

    > 异步函数的统一错误处理机制
    - koa框架中有两种错误处理机制 分别为
    1. 中间件捕获(Promise catch)
    2. 框架捕获(Emitter error)
15. 中间件
    > 中间件
    - Koa中 中间件就是普通的函数 该函数接收两个参数 
    1. context 表示上下文对象
    2. next 表示一个调用后返回Promise对象的函数对象
    > Koa 中间件的核心 compose函数
    1. 任务注册 
    - Koa中 创建KOA应用程序对象之后 就可以通过调用该对象的use方法来注册中间件
    - use 方法内部会对 fn 参数进行类型校验，当校验通过时，会把 fn 指向的中间件保存到 middleware 数组中，同时还会返回 this 对象，从而支持链式调用。
    2. 任务编排
    3. 任务调度

    > 中间件
    1. 中间件执行类似洋葱 最早use的中间件放在最外层 处理顺序从左到右 左边接收一个request 右边输出返回response
    2. 一般的中间件都会执行两次 调用next之前为第一次 调用next把控制传递给下游的下一个中间件 当下游不再有中间件或没有执行next函数 就将依次恢复上游中间件的行为 让上游中间件执行next之后的代码
    > 洋葱模型应用
    1. 除了在KOA中应用了洋葱模型 该模型还被广泛应用在github上一些不错的项目中 如koa-router 

    - Koa中间件是以级联代码(Cascading)的方式来执行的 类似于回形针的方式
    - koa中使用中间件 用app.use()
    
    > app.use()
    - 函数作用在于将调用use(fn)方法中的参数(不管是普通函数或是中间件)都添加到this.middlware这个数组中
    - Koa2中 还对Generator语法的中间件做了兼容 使用isGeneratorFunction()这个方法来判断是否为Generator语法
    - 并通过convert(fn)这个方法进行了转换 转换成async/await语法 然后把所有的中间件都添加到了this.middleware 最后通过callback()这个方法执行
    - 源码中 通过compose()这个方法 可将传入的中间件数组转换级联执行 最后callback()返回this.handleRequest()的执行结果
    
    > compose()方法 
    - 能使得传入的中间件级联执行并返回Promise
    - compose()是Koa2实现中间件级联调用的一个库 叫做koa-compose 源码很简单 只有一个函数
    - compose()返回一个匿名函数的结果 该匿名函数自执行了 dispatch() 这个函数，并传入了0作为参数。

    - 只有执行了next函数 才能正确执行下一个中间件
    - 因此每个中间件只能执行一次next 如果在一个中间件内多次执行next就会出现问题

    > 常见中间件
    1. koa-router 路由中间件
        - 路由三个基本方法
        1. router.get(path,cb): 处理对应路径的get请求
        2. router.post(path,cb): 处理对应路径的post请求
        3. router.all(path,cb) : 处理对应路径的get和post请求
    2. 路由的方法都有两个参数
        1. 路径 '*' 代表所有路径
        2. 回调函数 用于处理请求 它是一个异步函数(要加async关键字)
    3. 回调函数的两个参数
        1. ctx
        - ctx是上下文对象 类似express中req和res的整合体 可以通过它得到用户上传的数据 请求方式等一系列信息 也可以使用它对客户端进行响应
        2. next
        - next是一个函数 执行它可以放行请求 使数据继续进入后面相匹配的路由
    4. 嵌套路由
        1. router.use('路径',路由.routes()) 和server.use()一样 添加子路由
        2. router.routes() 将自己加到其他路由上去
    
    > ctx上下文对象
    - server context: 相当于ctx原型 公共的东西可以往上加
    > 常用属性
    1. ctx.request Koa的request对象
    2. ctx.response
    3. ctx.method

    2. koa-static
    - koa静态文件中间件的使用
    ```
    server.use(static('静态文件位置',options))
    ```
    3. koa-better-body
    - 用于解析表单的中间件 即可以解析普通表单 也可以处理文件表单
    - 使用方法
    ```
    server.use(body(options))
    ```

    > cookie
    - koa自带cookie 直接使用ctx.cookie即可
16. koa2 koa1和express区别
    > koa1&koa2
    1. koa1:依赖co库并采用genertor函数 在函数内使用yield语句
    2. koa2:增加了箭头函数 移除了co依赖 使用Promise 因此可以结合async await使用 ES6书法 执行时间比Koa1更快
    > koa&express
    1. express大而全 koa小而精
    2. API 
        1. Koa模版引擎和路由方面没有express提供的API丰富 koa将req res都挂载在ctx上 通过ctx既可以访问req 也可以访问res
    3. 中间件加载和执行机制
        1. 中间件模式区别的核心是next的实现
        2. koa请求和响应是洋葱进出模型 使用最新的async代码 没有回调函数 代码运行非常清晰 
        - 当koa处理中间件遇到await next()时会暂停当前中间件进而处理下一个中间件 最后再回过头来继续处理剩下的任务(逻辑就是回调函数)
        - 递归存在栈溢出的问题 可能会把js引擎卡死 koa采用了尾调用的方式进行了性能优化
        3. express是直线型 只进不出 express本身是不支持洋葱模型的数据流入流出能力的 需要引入其他插件
    4. 编程体验
        1. express是回调函数
        2. koa2是基于新的语法特性 async function 实现了Promise链式传递 错误处理更友好
17. 开发框架
    1. ExpressJS
        > 优点
        1. 社区安装最多
        2. 生态中第三方库最完善
        > 缺点
        1. 不支持AOP
        2. 需要特殊配制支持TS
        3. 没有统一规范 大型项目不易管控
    2. KoaJS
        > 优点
        1. 基于洋葱模型 可以实现AOP
        2. 生态中第三方库非常完善
        > 缺点
        1. 需要特殊配置支持TS
        2. 没有统一规范 大型项目不易管控
    3. EggJS
        > 优点
        1. 基于Express实现
        2. 有统一规范
        > 缺点
        1. 对TS支持差
        2. 官方的规范覆盖场景不全
        3. 国内社区氛围差
    4. NextJS
        > 优点
        1. 基于Express实现 且底层支持切换成Fastify等其他NodeJS框架
        2. 基于控制反转和依赖注入进行开发
        3. 完美支持TS 基于最新的ES Class语法
        4. 官方提供完备的配套工具和文档
        5. 支持FP AOP Reactive等开发模式
        6. 有统一规范 并抽象出Controller Middleware Pipd Filter等概念
        > 缺点
        1. 上手成本高
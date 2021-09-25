1. Node
    > 是什么
    - Nodejs使用了一个事件驱动 非阻塞式I/O的模型 使其轻量而高效 避免由于等待输入或输出响应而造成的CPU时间损失 Nodejs适合运用在高并发 I/O密集 少量业务逻辑的场景
    - Nodejs是一个基于Chrome V8引擎的JS运行环境runtime Node不是一门语言 是让JS运行在后端的运行时 并且不包括JS全集 因为在服务端中不包含DOM和BOM
    - Node也提供了一些新的模块例如http fs模块等
    - Nodejs使用了事件驱动 非阻塞式I/O的模型 使其轻量又高效
    - 且Nodejs的包管理器npm 是全球最大的开源库生态系统

    > 核心结构
    1. 体系架构
    - Nodejs主要分为四大部分 
    1. Node Standard Library
        - 每天都在用的标准库 如Http Buffer模块
    2. Node Bindings 
        - 沟通JS和C++桥梁 封装V8和Libuv细节 向上层提供基础API服务
        - 这一层是支持Nodejs运行的关键 由C/C++实现
    3. V8
        - Google开发的JS引擎 提供JS运行环境 可以说是Nodejs发动机
    4. Libuv(提供跨平台的异步IO能力)
        - 专门为Nodejs开发的一个封装库 提供跨平台的异步I/0能力 Node中的事件循环
    - C-ares:提供异步处理DNS相关的能力
    - http_parser OpenSSL zlib等 提供包括http解析 SSL 数据压缩等其他能力
    > Node.js核心依赖六个第三方模块 

    > 解决问题
    - Node在处理高并发 I/O密集场景有明显的性能优势
    > 高并发
    - 同一时间并发访问服务器
    > IO密集
    - 文件操作 网络操作 数据库相对的有CPU密集 CPU密集指的是逻辑处理运算 压缩 解压 加密 解密
    - Web主要场景就是接受客户端的请求读取静态资源和渲染界面 所以Node非常适合Web应用的开发
2. Nodejs优缺点
    > 优点
    1. 处理高并发场景性能更高 适合IO密集型应用
    2. V8引擎速度快 执行速度快
    3. 单线程 异步处理机制事件驱动 不用担心多线程 锁 并行计算的问题 
    4. 事件驱动 通过闭包很容易实现客户端的生命活期

    > 缺点
    1. 不适合用CPU密集型 CPU使用率较重 IO使用率较轻 无法充分利用多核CPU性能
    2. 可靠性低 一旦代码某个环节崩溃 整个系统都崩溃
    3. nodejs更新很快 可能会出现版本兼容 

    > 解决方案
    1. Nginx反向代理 负载均衡 开多个进程绑定多个端口
    2. 单线程变多线程 开多个进程监听同一端口 使用cluster模块
3. Node中的事件循环
    > Node中的事件循环和浏览器中是完全不相同的东西 Node.js采用V8作为JS解析引擎 I/O处理方面使用自己设计的libuv 
    - Nodejs中 事件循环的模型和浏览器相比大致相同 最大的不同点在于Nodejs事件循环分不同的阶段
    - 两者最主要的区别在于浏览器的微任务是在每个相应的宏任务中执行的 nodejs的微任务是在不同阶段之间执行的

    > libuv是一个基于事件驱动的跨平台抽象层 提供跨平台的异步IO能力
    - 封装了不同操作系统一些底层特性 对外提供统一的API 事件循环机制也是它里面的实现
    
    > libuv 
    - 为Nodejs提供了跨平台 线程池 事件池 异步I/O等能力 是Nodejs如此强大的关键

    > Node.js运行机制
    1. V8引擎解析JS脚本
    2. 解析后的代码 调用Node API
    3. libuv库负责Node API执行 它将不同的任务分配给不同的线程 形成一个Event Loop事件循环 以异步的方式将任务的执行结果返回给V8引擎
    4. V8引擎再将结果返回给用户

    > 六个阶段 
    - libuv引擎中事件循环分为六个阶段 它们会按照顺序反复运行 每当进入某一个阶段时 都会从对应的回调队列中取出函数执行 当队列为空 或者执行的回调函数数量达到系统设置的阈值 就会进入下一阶段
    1. timers
        - 这个阶段执行timer(setTimeOut setInterval)中到期的回调 
    2. I/O callbacks
        - 上一轮循环中在poll阶段有少数的I/O callbacks 会被延迟到这一轮的这一阶段执行
        - 处理一些上一轮循环中少量为执行的I/O回调
    3. idle/闲置的,prepare/准备
        - 仅node内部使用
        - 尽管名字是空闲的 但是每个tick都运行 Prepare也在轮询阶段开始之前运行 不管怎样 这两个阶段是node主要做一些内部操作的阶段
    4. poll/投票
        - 最为重要的阶段 执行I/O callback 适当的条件下会阻塞在这个阶段
        - 获取新的I/O事件 适当条件下node将阻塞在这里
    5. check
        - 执行setImmediate()的回调
    6. close callbacks
        - 执行close时间的callback
        - 执行socket的close事件回调   
    - 每个阶段执行特定的任务 每个阶段都有一个队列
    - JS可以在任何一个阶段执行 除了(idle prepare)

    - PS：上述六个阶段都不包含process.nextTick
    1. timer poll check 日常开发中绝大部分异步任务都是在这个三个阶段处理的
        1. timer 
        - timer阶段会执行setTimeOut和setInterval回调 并且是由poll阶段控制的 同样在Node定时器指定的时间也不是准确时间 只能是尽快执行
        2. poll
            一个至关重要的阶段 该阶段中
            系统会做两件事
            1. 回到timer阶段执行回调
            2. 执行I/O回调
                - 进入该阶段时如没有设定了timer 会发生以下两件事情
                1. 如果poll队列不为空 会遍历回调队列并同步执行 直到队列为空或达到系统限制
                2. 如果poll队列为空 会有两件事发生
                    1. 如果有setImmediate回调需要执行 poll阶段会停止并进入check阶段执行回调
                    2. 如果没有setImmediate回调需要执行 会等待回调被加入到队列中并立即执行回调
                    这里同样会有个超时时间设置防止一直等待下去
            - 设定了 timer 的话且 poll 队列为空，则会判断是否有 timer 超时，如果有的话会回到 timer 阶段执行回调
        3. check阶段
            - setImmediate()的回调会被加入check队列中，从event loop的阶段图可以知道，check阶段的执行顺序在poll阶段之后
            1. 一开始执行栈的同步任务（这属于宏任务）执行完毕后（依次打印出start end，并将2个timer依次放入timer队列）,会先去执行微任务（这点跟浏览器端的一样），所以打印出promise3
            2. 然后进入timers阶段，执行timer1的回调函数，打印timer1，并将promise.then回调放入microtask队列，同样的步骤执行timer2，打印timer2；这点跟浏览器端相差比较大，timers阶段有几个setTimeout/setInterval都会依次执行，并不像浏览器端，每执行一个宏任务后就去执行一个微任务（关于Node与浏览器的 Event Loop 差异，下文还会详细介绍）
    > 一些常见的误解
    1. 在JS引擎内部的事件循环
    - 最常见的误解之一 事件循环是JS引擎的一部分 事实上事件循环主要利用JS引擎来执行代码
    2. 有一个栈或队列
    - 首先没有栈 其次这个过程是复杂的 有多个队列(像数据结构中的队列)参与 
    3. 事件循环运行在一个单独的线程中
    - 由于错误的nodejs事件循环图 有一部分认为有两个线程 一个执行JS 一个执行时间循环 事实上都在一个线程里面执行

    > Node中事件循环大致顺序
    1. 外部输入数据-->
    2. 轮询阶段(poll)-->
    3. 检查阶段(check)-->
    4. 关闭事件回调阶段(close callback)-->
    5. 定时器检测阶段(timer)-->
    6. I/O事件回调阶段(I/O callbacks)-->
    7. 闲置阶段(idle prepare)-->
    8. 轮询阶段(按照该顺序反复运行)        

    > Micro-Task和Macro-Task
    - Node端事件循环中的异步队列也是这两种
    1. 常见的宏任务
        1. setTimeout setInterval I/O 浏览器和Node
        2. setImmediate script整体代码 Node
        3. requestAnimationFrame 浏览器
        4. postMessage
    2. 常见的微任务
        1. process.nextTick Node
        2. new Promise().then() async await回调 浏览器 Node
        3. MutationObserver 浏览器

    > 注意
    1. setTimeout和setImmediate
        - 两者非常像 区别主要在于调用时机不同
        - setImmediate 设计在poll阶段完成时执行，即check阶段；
        - setTimeout 设计在poll阶段为空闲时，且设定时间到达后执行，但它在timer阶段执行
    2. process.nextTick
        - 该函数其实是独立于Event Loop之外 它有一个自己的队列 当每个阶段完成后 如果存在nextTick队列 就会清空队列中的所有回调函数 并且由于其他microtask执行
    
    > Node与浏览器的事件轮询差异
    - 浏览器环境下 microtask任务队列是每个macrotask执行完之后执行
    - Node.js中 microtask会在事件循环的各个阶段执行 也就是一个阶段执行完毕就会执行microtask队列的任务
    
    > 总结
    - 浏览器和Node环境下 microtask任务队列的执行时机不同
    1. Node端 microtask在事件循环的各个阶段之间执行
    2. 浏览器端 microtask在事件循环的macrotask执行完之后执行

    > setImmediate setTimeout区别
    - 在文件I/O 网络I/O中 setImmediate会先于setTimeout
    - 一般情况下 settimeout会先于setImmediate

    > 事件循环
    - Node采用的是单线程的处理机制(所有的I/O请求都采用非阻塞的工作方式) 至少从nodejs开发者的角度是这样的 
    - 而在底层 Nodejs借助libuv作为抽象封装层 从而屏蔽不同操作系统差异 Node可以借助libuv实现多线程 
    - libuv库负责Node API的执行 它将不同的任务分配给不同的线程 形成一个事件循环 以异步的方式将任务的执行结果返回给V8引擎 
    - 每一个I/O都需要一个回调函数 一旦执行完就堆到事件循环上用于执行

    > Nodejs中的事件循环
    - Node采用V8作为JS的执行引擎 同时使用libuv实现事件驱动式异步I/O 
    - 其事件循环就是采用libuv的默认事件循环

    1. 事件循环
    > 在Node中的表现
    1. Node也是单线程 但是处理Event Loop上与浏览器稍微有所不同
    - API层面上理解 Node新增了两个方法可以用来使用
    1. 微任务的process.nextTick
    2. 宏任务的setImmediate
    > setImmediate和setTimeout区别
    1. 官方文档中定义 setImmediate为一次Event loop执行完毕后调用 setTimeout通过计算一个延迟时间后进行
    2. 主线程直接执行这两个操作 很难保证那个会先触发
    > process.nextTick
    - 可以认为是一个类似于Promise和MutationObsercer的微任务实现 在代码执行的过程中可以随时插入nextTick 并且会保证在下一个宏任务开始之前执行

        - Nodejs是单进程单线程应用程序 但是通过事件和回调支持并发 所以性能非常高
    - Nodejs每一个API都是异步的 并作为一个独立线程运行 使用异步函数调用 并处理并发
    - Nodejs基本上所有事件机制都是用设计模式中观察者模式实现
    - Nodejs单线程类似进入一个while(true)的事件循环 直到没有事件观察者退出 每个异步事件都生成一个事件观察者 如果有事件发生就调用该回调函数

    > Node中的Event Loop
    1. 写的JS代码会交给V8引擎进行处理
    2. 代码中可能会调用nodeAPI node会交给libuv库处理
    3. libuv通过阻塞I/O和多线程实现了异步IO
    4. 通过事件驱动的方式 将结果放到事件队列中 最终交给我们的应用
    - 在libuv内部有这样一个事件环机制 在node启动时会初始化事件环
3. 事件驱动程序
    - Nodejs使用事件驱动模型 当web server接收到请求 就把它关闭然后进行处理 去服务下一个web请求
    - 当这个请求完成 它被放回处理队列 当到达队列开头 这个结果被返回给用户
    - 这个模型非常高效 可扩展性非常强 因为webserver一直接受请求而不等待任何读写操作-这也被称之为非阻塞式IO或事件驱动IO
    - 事件驱动模型中 会生成一个主循环来监听事件 当检测到事件时触发回调函数
    - 整个事件驱动的流程就是这么实现的 非常简洁 有点类似观察者模式 事件相当于一个主题(Subject)所有注册到这个事件上的处理函数相当于观察者(Observer)
    - Node.js有多个内置的事件 可以通过引入events模块 并通过实例化EventEmitter类来绑定和监听事件
    ```
    // 引入event模块
    const events = require('events');
    // 创建eventEmitter对象
    const eventEmitter = new events.EventEmitter();
    // 创建事件处理程序
    const connectHandler = function connected(){
        console.log('连接成功');
        // 触发data_received事件
        eventEmitter.emit('data_receievd');
    }
    // 绑定connection事件处理程序
    eventEmitter.on('connection',connecHandler)
    // 使用匿名函数绑定data_received事件
    eventEmitter.on('data_received',function(){
        console.log('数据接受成功');
    })
    // 触发connection事件
    eventEmitter.emit('connection')
    console.log('程序执行完毕');
    ```
    > Node采用了事件驱动机制 而EventEmitter就是Node实现事件驱动的基础 在EventEmitter的基础上 Node几乎所有的模块都继承了这个类 以实现异步事件驱动机构
    - 继承了EventEmitter的模块 拥有自己的事件 可以绑定/触发监听器 实现了异步操作
    - EventEmitter是Node事件模型的根基 由EventEmitter为基础构建的事件驱动架构处处体现着异步编程的思想 
    - 因此 在构建node程序时也要遵循这种思想 
    -EventEmitter实现的原理是观察者模式 这也是实现事件驱动的基本模式 

    > events模块的EventEmitter类
    - node的event模块只提供了一个EventEmitter类 这个类实现了Node异步事件驱动架构的基本模式 观察者模式 提供了绑定事件和出发事件等事件监听器模式一般都会提供的API
    - 只要继承EventEmitter类 就可以拥有事件 触发事件等 所有能触发事件的对象都是EventEmitter类的实例
    - 而观察者模式(事件发布/订阅模式)就是实现EventEmitter类的基本原理 也是事件驱动机制基本模式

    > 事件驱动原理 观察者模式
    - 在观察者模式中 注册的回调函数即事件监听器 触发事件调用各个回调函数即是发布消息
    - 事件如何产生和'自动'被调用 调用event.triggerEvent相当于调用了回调函数 是事件执行过程 事件产生过程则更多由底层来产生并通知给node 
    - 如node的全局变量process process是EventEmitter的实例
    - Node中众多模块都继承了EventEmitter 其他模块也是如此 它们一同组成了Node的异步事件驱动架构

    > 异步编程范式
    - 由于采用事件模型和异步I/O node中大量模块的API采用了异步回调函数的方式 底层也处处体现了异步编程的方式
    - 虽然异步也带来很多问题 理解困难 回调嵌套过深 错误难以捕获 多线程编程困难 不过相比于异步带来的高性能 加上这些问题都有比较好的解决方案 异步编程范式还是值得尝试的 尤其对于利用node构建应用程序时 

    > 大部分Node模块 如http和stream 都是基于EventEmitter模块实现的 所以他们拥有触发和监听事件的能力
    ```
    const EventEmitter = require('events');
    ```

    > EventEmitter模块
    - Node中 EventEmitter是一个可以加快对象之间通信的模块 也是Node异步事件驱动架构的核心 许多Node内建模块 也是继承于EventEmitter
    - 核心概念非常简单: Emitter对象触发具名事件 这会导致事先注册了监听器的具名事件被调用 所以一个Emitter对象拥有两个基本特性
    1. 触发事件
    2. 注册和取消注册监听函数
    - 只需要创建一个继承于EventEmitter的类 就可以让EventEmitter起作用了
    ```
    class MyEmitter extends EventEmitter{

    }
    ```
    - Emitter对象是基于EventEmitter类的实例化对象
    ```
    const myEmitter = new MyEmitter();
    ```
    - 在Emitter对象生命周期的任何时刻 都可以通过使用emit函数去出发我们想要的具名事件
    ```
    myEmitter.emit('something-happend')
    ```
    - 触发事件是某些条件发生了的标志 这个条件通常是Emitter对象中状态的变化产生的
    - 我们通过使用方法on添加监听事件 每当Emitter对象触发相关联的事件时 这些函数将会被调用
4. nodejs模块
    1. node中的模块是什么
        - node中 每个文件模块都是一个对象
        ```
        function Module(id,parent){
            this.id = id;
            this.exports = {};
        }
        module.exports = Module;
        var module = new Module(filename,parent)
        ```
        - 所有模块都是Module的实例
    2. require模块加载机制
        - (计算模块路径 - 取出缓存 - 加载模块 - 输出模块的exports属性)
        1. 先计算模块路径
        2. 如果模块在缓存中 取出缓存
        3. 加载模块
        4. 输出模块的exports属性
    3. 加载模块时 为何每个模块都有__dirname __filename new Module时 没有这两个属性
        - 每个module里面都会传入__filename __dirname 这两个参数不是module本身就有的 是外界传入的
    > 常见模块
    1. fs(文件系统)模块
        - 可以对文件或文件夹读写创建操作 权限控制
    2. node child_process(子进程)模块
        - Nodejs是一个单线程语言 不能像java那样创建多线程来并发执行 不能充分利用CPU多核机制 
        - 可通过child_process创建多个进程来充分利用CPU多核 完成多进程操作
    3. cluster(集群)模块
        - 单个Nodejs实例运行在单个线程中 为了充分利用多核系统 有时需要启用一组Nodejs进程去处理负载任务
        - cluster模块可以创建共享服务器端口的子进程 而这一组的服务进程的总称就叫做集群 
        - 服务集群通常运用在nginx大型服务部署上 为了保证服务的正常稳定运行 所以会启动多个服务(也就是一个服务集群)
    4. dgram(数据报)
        - dgram模块提供了UDP数据包socket的实现
    5. net(网络)
        - net模块用于创建基于流的TCB或IPC的服务器
4. 模块系统
    > Nodejs中的模块系统
    1. 模块化是一种将项目分解成独立功能部分的方法 在Node中 没有全局作用域 只有模块作用域
    2. 模块化的文件 具有模块作用域 外部访问不到内部变量 内部也访问不到外部变量 默认都是封闭的 每个文件的命名空间都是独立且封闭的 不同模块之间不会相互影响 不会有污染情况
    3. 只有通过export暴露出去 其他文件才能通过require拿到 

    > 模块化的优缺点
    > 优点
    1. 可维护性
    > 缺点
    1. 性能损耗

    > commonJS
    - JS天生不支持模块化(ES6才支持) Nodejs环境中对JS做了特殊的模块化支持 即为commonjs

    > exports和module.exports区别
    1. 在node中 每个模块内部都有一个自己的module对象
    2. module.exports也是一个对象(默认是空对象)
    3. 对外导出成员 只需要把导出的成员挂载到module.exports中

    > 模块加载规则
    1. 优先从缓存中夹在
        1. 如果已经require过 不会重复执行加载 直接可以拿到里面的接口对象
        2. 目的是避免重复加载 提高模块加载效率
    2. 判断模块标识符 require('模块标识符')
        1. 核心模块 fs http path os
        2. 自定义模块(路径形式的模块标识)
        - ./ ../ /xxx
        - 加载文件时相对路径一定要加./ 不然默认是加载核心模块
        3. 第三方模块
    
    > 核心模块
    - 核心模块是由Node提供的一个个具名的模块 它们都有自己特殊的名称标识
    1. fs 文件操作系统模块
    2. http http服务构建模块
    3. path 路径操作模块
    4. os 操作系统模块
    - 核心模块必须引入才能使用

    > 自定义模块
    1. 加载文件时相对路径一定要加./ 不然默认是加载核心模块
    
    > 第三方模块
    1. 凡是第三方模块都必须通过npm来下载
    2. 使用时可以通过require('包名')方式来进行加载才可以使用
    3. 不可能有任何第三方包名和核心模块重名 提交第三方包不会允许 不然加载会有冲突

    > 扩展
    1. require()中的路径 是从当前这个JS文件出发 找到目标文件
    2. fs是从命令提示符找到目标文件 fs等其他模块用到路径时 都是相对于cmd命令光标所在位置

    - 为了让Nodejs中的文件可以相互调用 Nodejs提供了一个简单的模块系统
    - 模块是Nodejs应用程序的基本组成部分 文件和模块是一一对应的 换言之 
    - 一个Nodejs文件就是一个模块 这个文件可能是JS代码 JSON 或者编译过的C/C++扩展
    > 模块CommonJS
    - 在Nodejs中创建一个模版非常简单 创建main.js
    ```
    const Hello = require('./hello');
    hello.world();
    ```
    - Nodejs提供了exports和require两个对象 其中exports是模块公开的接口 require用于从外部获取一个模块的接口 即所获取模块的exports对象
    。。。
    > 服务端的模块放在哪
    - Nodejs中有很多常用的内置模块
    - Nodejs的require方法中的文件查找策略如下
    - 由于Node.js中存在四类模块(原生模块和3种文件模块)尽管require方法及其简单 但是内部加载却十分复杂 其加载优先级也各不相同
    - (文件缓存模块中加载 -> 原生模块中加载 ->文件中加载)
    1. 从文件缓存模块中加载
        - 尽管原生模块与文件模块的优先级不同 但是都不会优先从文件模块的缓存中加载已经存在的模块
    2. 从原生模块中加载
        - 原生模块的优先级仅次于文件模块缓存的优先级 
        - require方法在解析文件名之后 优先检查模块是否在原生模块列表中
        - 以http模块为例 尽管在目录下存在一个http/http.js/http.node/http.json文件 require('http')都不会从这些文件中加载 而是从原生模块中加载
        - 原生模块也有一个缓存区 同样也是优先从缓存区加载 如果缓存区没有被加载过 则调用原生模块的加载方式进行加载和执行
    3. 从文件加载
        - 当文件模块缓存中不存在 且不是原生模块时 Nodejs会解析require方法传入的参数 并从文件系统中加载实际的文件
        - require方法接受以下几种参数的传递
        1. http fs path等 原生模块
        2. ./mod ../mod 相对路径的文件模块
        3. /pathmodule/mod 绝对路径的文件模块
        4. mod 非原生模块的文件模块
    > 常用内置模块
    - fs模块
        1. 异步和同步
        2. 打开文件
        ```
        fs.open(path,flag[,mode],calbback)
        ```
        - 参数
        - path 文件路径
        - flags 文件打开的行为
        - mode 设置文件模式(权限) 文件创建默认权限为0666 可读可写
        - callback 回调函数 带有两个参数如callback(err,fd)
        3. 写入文件
        ```
        fs.writeFile(filename,data[,options],callback)
        ```
        - 如果文件存在 该方法写入的内容会覆盖旧的文件内容
    - os模块
        ```
        const os = require('os');
        // 系统内存总量
        console.log(os.totalmem());
        // 操作系统空间内存量
        console.log(os.freemem);
        ```
    - http模块
        - Nodejs的本质就是为了做WEB服务器 如何让HTTP服务器开始工作
        - 简约而不简单的HTTP服务器
        ```
        const http = require('http');
        http.createServer((req,res)=>{
            res.end('响应完成')
        }).listen(3000)
        ```
    - 启动服务器
    - 浏览器访问 http://localhost:3000 就能看到响应完成了
    > 路由
    ```
    const http = require('http');
    const fs = require('fs');
    http.createServer((req,res)=>{
        const {url,method} = req;
        if(url === '/index' && method = 'GET'){
            // 读取首页
            fs.readFile('./index.html',(err,data)=>{
                if(err){
                    res.statusCode = 500;// 服务器内部错误
                }
                res.statusCode = 200;//设置状态码
                res.setHeader('Content-Type','text/html');
                res.end(data);
            })
        }else if(url === '/about' &&method === 'Get'){
            fs.readFile('./about.html',(err,data)=>{
                if(err){
                    res.statusCode = 500;//服务器内部错误
                    res.end('500-Interval Server Error')
                }
                res.statusCode = 200;//设置状态码
                res.setHeader('Content-Type','text/html');
                res.end(data)
            })
        }else if(url === '/user' &&method === 'GET'){
            res.statusCode = 200;//设置状态码
            res.setHeader('Content-Type','application/json');
            res.end(JSON.stringify([{name:'是'}]))
        }else{
            res.end();
        }
    }).listen(3000)
    ```

    > 网络编程
    - 利用Node可以十分方便地搭建网络服务器 不需要专门的Wbe服务器作为容器 仅仅需要几行代码就可以构建服务器
    - Node提供了net dgram http https四个模块 分别用于处理 TCP UDP HTTP HTTPS适用于服务端和客户端
5. libuv
    > libuv和linux
    1. 单以linux平台来看 linux主要工作可以简单划分为两部分
        1. 围绕epoll 处理哪些被epoll支持的IO操作
        2. 线程池(Thread pool) 处理那些不被epoll支持的IO操作
    > epoll简介
    - epoll是由Linux内核提供的一个系统调用(system call) 应用程序可以通过它
    1. 告诉系统帮助同时监控多个文件描述符
    2. 当这其中的一个或多个文件描述符的I/O可操作状态改变时 我们的应用程序会收到来自系统的事件提示(event notification)
    - 处于libuv底层的epoll也是有事件循环概念的 事件循环不是libuv独创的
    > epoll的两种触发模式
    1. 水平触发(Level-triggered)
    2. 边缘触发(Edge-triggered)

    2. 为啥是libuv
    1. 背景
        - Node.js始于2009年 是一个可以让JS代码离开浏览器执行环境也可以运行的项目 Node.js使用Google的V8解析引擎和Marc Lehmann的libev
        - Node.js将事件驱动的I/O模型和适合该模型的编程语言JS融合在一起
        - 随着Node.js日益流行 Node.js需要同时支持windows 但是libev只能在Unix环境下运行
        - Windows平台上与kqueue(FreeBSD)或(e)poll(Linux)等内核事件通知相应的机制是IOCP
        - libuv提供了一个跨平台的抽象 由平台决定使用libev或IOCP
        - node-v0.9.0版本中 libuv移除了libev的内容
    2. 为什么是异步
        - 即使是SSD的访问相较于高速的CPU 仍然是慢速设备 于是基于事件驱动的IO模型就应运而生
        - 解决了高速设备同步等待慢速设备或访问的问题 这不是libuv独创 linux kernel原生支持的NIO也是这个思路 但libuv统一了网络访问 文件访问 做到了跨平台
    3. libuv架构
        - 从左到右分为两部分 
        1. 一部分是与网络I/O相关的请求
        2. 另一部分是由文件I/O DNS Ops 以及User code组成的请求
        - 对于Network I/O 和以File I/O为代表的另一类请求 异步处理的底层支持机制完全不一样
        1. 对于Network I/O相关的请求 根据OS平台不同 分别使用Linux上的epoll OSX和BSD类OS上的kqueue SunOS上的event ports以及Windows上的IOCP机制
        2. 对于File I/O为代表的请求 则使用thread pool 利用thread pool 的方式实现异步请求处理 在各类OS上都能获得很好的支持

    > libuv
    1. libuv是一个跨平台的异步IO库 它结合Unix下的libev和windows下的IOCP的特性 最早由Node的作者开发 专门为Node提供多平台下的异步IO支持
    2. Libuv本身是由C++语言实现的 Node中的非阻塞异步IO以及事件循环的底层机制都是由libuv实现的
    3. Winodws环境下 libuv直接使用Windows的IOCP来实现异步IO 在非windows环境下 libuv使用多线程来模拟异步IO Node的异步调用是由libuv支持的 
    4. 以读取文件的例子 读文件实质的系统调用是由libuv实现的 Node只是负责调用libuv的接口 等数据返回后再执行对应的回调方法
6. Node的异步I/O
    1. 介绍Node事件循环的流程
        - 进程启动时 Node会创建一个类似while(true)的循环 每执行一次循环体的过程 我们称之为tick
        - 每个tick的过程就是查看是否有事件待处理 如果有就取出事件及其相关回调函数 然后进入下一个循环 如果不再有事件处理 就退出进程
    2. 每个tick中 如何判断是否有事件需要处理
        - 每个事件循环中有一个或多个观察者 判断是否有事件要处理的过程就是向这些观察者询问是否又要处理的事件
        - Node中事件主要来源于网络 文件的I/O等 这些事件对应的观察者有文件I/O观察者 网络I/O观察者
        - 事件循环是一个典型的生产者/消费者模型 异步I/O 网络请求等是事件的生产者 源源不断地为Node提供不同类型的事件 这些事件被传递到对应的观察者中 事件循环则从观察者哪里取出事件并处理
        - 在windows中 这个循环基于IOCP创建 在linux中 基于多线程创建
    > Node异步
    1. 非阻塞I/O
        - 阻塞IO和非阻塞IO区别就在于系统接收输入再到输出期间 能不能接收其他输入
    2. 事件循环
        - Nodejs启动时会初始化由libuv提供的事件循环 每次的事件循环都包含6个阶段 这个6个阶段会在每一次事件循环中按照下图当中顺序反复执行
        1. timers阶段: 这个阶段执行timer(setTimeout setInterval)的回调
        2. IO callbacks阶段: 处理一些上一轮循环中的少数未执行的I/O回调
        3. idle prepare阶段 仅Node内部使用
        4. poll阶段：获取新的I/O事件 适当的条件下Node阻塞在这里
        5. check阶段：执行setImmediate()的回调
        6. close callbacks阶段 执行socket的colse事件回调
        - 每个阶段都有一个先入先出(FIFO)的用于执行回调的队列 事件循环运行到每个阶段 都会从对应的回调队列中取出回调函数去执行 直到队列当中的内容耗尽 或者执行的回调数量达到了最大
    
    > 异步处理与domain
    > 异步异常捕获
    - 由于node的回调异步特性 无法通过try catch来捕获所有的异常
    - 如果

    > domain
    - node v0.8+版本时 发布了一个模块domain 这个模块做的就是try catch无法做到的 捕获异步回调中出现的异常
    - domain虽然捕获到了一场 但是还是由于一场儿导致的堆栈丢失会导致内存泄漏 所以出现这种情况还是要重启这个线程
    > domain解析
    - domain自身其实也是Event模块一个典型的应用 它通过事件的方式来传递捕获的错误
7. 进程通信
    > Node的多进程框架
    - 面对Node单线程对多核CPU使用不足的情况 Node提供了child_process模块 实现进程的复制 node的多进程架构是主从模式
    1. 创建子进程的方法有哪些 它们的区别
        1. spawn() 启动一个子进程来执行命令
        2. exec() 启动一个子进程来执行命令 与spawn()不同的是其接口不同 它有一个回调函数获知子进程的状态
        3. execFile() 启动一个子进程来执行可执行文件
        4. fork
        5. spawn
        6. 
    3. 实现一个node子进程被杀死 然后自动重启代码的思路
        - 创建子进程时 就让子进程监听exit事件 如果被杀死就重新fork一下
7. Nodejs单线程
    - 事件驱动/事件循环: 高效 处理数万级的并发而不会造成阻塞
    - 我们所看到的nodejs单线程只是一个js主线程 本质上的异步操作还是由线程池完成的 
    - node将所有的阻塞操作都交给了内部的线程池去实现
    - 本身只负责不断的往返调度 并没有进行真正的IO操作 从而实现异步非阻塞IO
    - 这是node单线程和事件驱动的精髓
7. Node.js多线程支持
    - nodejs在v10.5.0新增了多线程的支持 并且在v11中不需要再加实验特性后缀即可直接使用
    > 核心API
    ```
    isMainTread:true,
    MessageProt:[Function:MessageProt],
    MessageChannel:[Function:MessageChannel],
    threadId:0,
    Worker:[Function:Worker],
    parentPort:null
    ```
    > 使用流程
    (isMainTread判断是否主线程/提供的Worker构造函数启动 WorkerData传递数据/线程通信 worker_threads包括MessageChannel和MessagePort类)
    1. 类似cluster多进程模式需要判断当前是否主进程 这边也提供了类似的API 通过isMainThread即可
    2. 启动多线程 需要提供的Worker构造函数去启动 且主线程也可以通过WorkerData去传递数据给工作线程
    - Worker构造函数第一个参数默认是执行的js文件路径，或者当第二个可选参数eval为true时，可以行内执行。
    3. 线程通信 和进程通信类似
    - worker_threads模块还有MessageChannel和MessagePort类(继承于EventEmitter)
    - MessageChannel类(创建自定义通信频道)
        - 包含两个已经互相能够跨线程通信的Message类型对象 可用于创建自定义的通信频道 实例化后包含两个属性port1和port2 MessagePort类型对象 可将其一个发到工作线程后通过该对象实现自定义跨线程通信
    - MessagePort(跨线程通信的句柄)
        用于跨线程通信的句柄 继承了EventEmitter 包括close message事件用于接受对象关闭和发送的消息 以及close postMessage等操作
8. Global对象
    - 所有属性都可以在程序的任何地方被访问 即全局变量
    - JS中 通常Window是全局变量 而Node.js的全局变量是global 所有全局变量都是global对象的属性 如console processs等
    > 全局对象与全局变量
    - globa最根本的作用是作为全局变量的宿主 满足一下条件成为全局变量
    1. 在最外层定义的变量
    2. 全局对象的属性
    3. 隐式定义的变量(未定义直接赋值的变量)
    - Node.js中不可能在最外层定义变量 因为所有的用户代码都是属于当前模块的 而模块本身不是最外层上下文 Node.js中也不提倡自定义全局变量
    
    > Node.js提供以下几个全局变量 它们是所有模块都可以调用的
    1. global: 表示Node所在的全局变量 类似浏览器的window对象 
        - 如果在浏览器中声明了一个全局变量 实际上是声明了一个全局对象的属性 Node中不是这样 至少在模块中不是这样 REPL环境的行为和浏览器一致 
        - 在模块文件中 声明var x = 1 该变量不是global对象的属性 global.x等于undefined 这时因为模块的全局变量都是该模块私有的 其他模块无法取到
    2. process: 该对象表示Node所处的当前进程 允许开发者与该进程互动
    3. console: 指向Node内置的console模块 提供命令行环境中的标准输入 标准输出功能
    > Node提供一些全局函数
    1. setTimeout:
    2. clearTimeout
    3. setInterval
    4. clearInterval
    5. require()用于加载模块
    6. Buffer()用于操作二进制数据
    > 伪全局变量
    1. _filename: 指向当前运行的脚本文件名
    2. _dirname: 指向当前运行的脚本所在目录
8. Nodejs process模块解读
    - process存在于全局对象上 不需要使用require()加载即可使用 process模块主要做两方面的事情
    1. 获取进程信息(资源使用 运行环境 运行状态)
    2. 执行进程操作(监听事件 调度任务 发出警告)
    > 资源使用
    - 指运行此进程所消耗的机器资源 如内存 CPU
    > 内存
    ```
    process.memoryUsage()
    ```
    > 运行环境
    - 此进程运行的宿主环境包括运行目录 node环境 CPU架构 用户环境 系统平台
    > 用户环境
    - 除了启动时的自定义信息之外 process.env还可以获得其他的用户环境信息(如PATH SHELL HOME等)
    ```
    console.log(process.env.NODE.ENV)
    NODE_ENV = dev node b.js
    ```
    > 运行状态
    - 当前进程的运行相关的信息

    > 监听事件
    - process是EventEmitter的实例对象 因此可以使用process.on('eventName',()=>{})来监听事件
    - 常见的事件类型分两类
    1. 进程状态 beforeExit exit uncaughtException message
    2. 信号事件 SIGTERM SIGKILL SIGUSR1

    > 调度任务
    - process.nextTick(fn)
    - 通过process.nextTick调用的任务是异步任务 EventLoop是分阶段的 每个阶段执行特定的任务 而nextTick的任务在阶段切换时就会执行 因此nextTick会比setTimeout(fn,0)更快的执行
9. Buffer缓冲区
    - JS语言自身只有字符串数据类型 没有二进制数据类型
    - 但在处理TCP流或文件流时 必须使用到二进制数据 因此在Node.js中 定义了一个Buffer类 该类用来创建一个专门存放二进制数据的缓冲区
    > 在Nodejs中 Buffer类是随Node内核一起发布的核心库 Buffer库为Nodejs带来了一种存储原始数据的方法 可以让Node.js处理二进制数据 
    - 每当需要在Nodejs中处理I/O操作中移动的数据时 就有可能使用Buffer库 
    > 原始数据存储在Buffer类的实例中 一个Buffer类似于一个整数数组 但它对应于V8堆内存之外的一块原始内存
    ```
    // buffer: 八位字节组成数组 可以有效的在js中存储二进制数据
    //创建
    const buf1 = Buffer.alloc(10);
    console.log(buf1);
    // 通过数据创建
    const buf2 = Buffer.from('hello world');
    console.log(buf2);
    
    const buf3 = Buffer.from([1,2,3]);
    console.log(buf3)
    // 写入
    buf1.write('hello buffer');
    console.log(buf1)

    // 读取
    console.log(buf2.toString());
    console.log(buf2.toString('base64'))

    // 合并
    const buf4 = Buffer.concat([buf1,buf2]);
    console.log(buf4.toString());
    ```
    > Buffer
    - 在Nodejs中 Buffer类是随Node内核一起发布的核心库
    - Buffer库为Nodejs带来一种存储原始数据的方法 可以让Nodejs处理二进制数据
    > 小结
    1. Buffer是一个典型的JS和C++结合的模块 性能相关部分用C++实现 非性能相关部分用JS实现
    2. Node在进程启动时 Buffer就已经加装进了内存 并将其放入全局变量 因此无需require
    4. Buffer内存分配 Buffer对象的内存分配不是在V8的堆内存中 在Node的C++层面实现内存的申请

    > Buffer模块
    1. 新建Buffer会占用v8分配的内存吗
        - 不会 Buffer属于堆外内存 不是V8分配的
    2. Buffer.alloc和Buffer.allocUnsafe的区别
        - Buffer.allocUnsafe创建的Buffer实例的底层内存是未初始化的 新创建的Buffer的内容是未知的 可能包含敏感数据 
        - 使用Buffer.alloc是可以创建以0初始化的Buffer实例
    3. Buffer的内存分配机制
        - 为了高效使用申请来的内存 Node采用slab分配机制 slab是一种动态的内存管理机制 Node以8kb为界限来区分Buffer为大对象还是小对象
        - 如果超过8kb 直接用C++底层地宫的SlowBuffer来给Buffer对象提供空间
    4. Buffer乱码问题
        - rs.setEncoding('utf8')
10. Stream流
    - node中读取文件方式有两种
    1. 利用fs模块
        - 读取小文件 fs读取文件时 将文件一次性读取到本地内存
    2. 利用流来读取
        - 读取一个大文件 一次性读取会占用大量内存 效率很低 这个时候需要流来读取 流是将数据分割段 一段一段读取 可以控制速率 效率很高 不会占用太大内存
        - gulp的task任务 文件压缩 http中的请求和响应等功能的实现都是基于流来实现的
    > 可读流用法
    1. node中读是将内容读取到内存中 而内存就是Buffer对象
    2. 流都是基于原生的fs操作文件的方法来实现的 通过fs创建流 所有的Stream对象都是EventEmitter实例
    > 常用事件
    1. open 打开文件
    2. data 当有数据可读时触发
    3. error 读收和吸入过程中发生错误时触发
    4. close 关闭文件
    5. end 没有更多数据可读时触发
    > 管道流
    - 管道提供了一个输出流到输入流的机制 通常用于从一个流中获取数据并将数据传递到另外一个流中
    - 以下实例通过读取一个文件内容并将内容写入另外一个文件中
    ```
    const fs = require('fs');
    // 创建可读流
    const readerStream = fs.createReadStream('./package.json');
    // 创建可写流
    const writerStream = fs.createWriteStream('./test.txt')
    // 设置编码为utf-8
    renderStream.pipe(writeStream)
    ```
    > 链式流
    - 链式是通过连接输出流到另外一个流并创建多个流操作链机制 链式流一般用于管道操作
    - 以下实例为用管道和链式来压缩和解压文件
    ```
    const fs = require('fs');
    const zlib = require('zlib');
    //压缩test.txt为test.zip
    fs.createReadStream('./test.txt').pipe(zlib.createGzip()).pipe(fs.createWriteStream('test.zip'))
    ```
11. NPM
    > 简介
    - npm全称Node Package Manager 是一个基于Nodejs的包管理器 是整个Nodejs社区最流行 支持的第三方模块最多的包管理器
    > npm初衷
    - JS开发人员更容易分享和重用代码
    > npm使用场景
    1. 允许用户获取第三方包并使用
    2. 允许用户将自己编写的包货命令行程序进行发布分享
    > npm工作原理
    1. 包和模块
    > 包是描述一个文件或一个目录 一个包的配置通常由以下构成
12. node中cluster是怎么开启多线程的 并且一个端口可以被多个进程监听吗
    - nodejs是单线程的模式 不能充分利用服务器的多核资源
    - 使用node的cluster模块可以监听应用进程
    - 退出后重新启动node应用进程 并可以启动多个node应用进程
    - 做到负载均衡 充分利用资源
    > 主要考察服务器响应的5个状态
    0:请求未初始化(代理被创建 但未调用open()方法)
    1:服务器连接已建立(open方法已被调用)
    2:请求已接收(send方法已被调用 且头部和状态已可获得)
    3:请求处理中(下载中 responseText属性已包含部分数据)
    4:请求已完成 且响应已就绪(下载操作已完成)
13. Nodejs10的workder_threads
    - Nodejs从v10.5.0开始引入实验性的Worker_Threads概念 
    - 并将其体现在workder_threads模块 该模块从NodejsV12 LTS开始作为一个稳定功能模块提供出来
    > Nodejs的CPU密集型应用的历史
    - 在worker threads出现前 就已经有很多方案来完成基于Nodejs的CPU密集型应用 常见的有如下几种
    1. 使用child_process模块 在子进程中运行耗费CPU的代码操作
    2. 使用cluster模块 在多个进程中运行耗费CPU资源的代码操作
    3. 使用第三方模块 如Microsoft的Napa.js
    - 但是由于性能限制 额外的引入学习成本 接收度不足 不稳定性以及文档缺失等原因 这其中没有一个方案是能被广泛接受的
    
    > 使用worker threads 来执行CPU密集的代码操作
    - 尽管worker_threads对于JS的并发问题来说是一个优雅的解决方案 但是其实JS本身并没有引入多线程的语言特性
    - 实际上workder threads是通过允许应用可以运行多个独立的JS workers workers和其父worker可以通过Nodejs来通信
    - 在Nodejs中 每个worker有它自己的V8实例和事件循环机制(Event Loop) 但是和子进程不同 workers是可以共享内存的

    > workder threads如何工作的
    1. JS没有多线程的性质 所有Nodejs的Worker Threads和其他支持多线程的高级语言在处理上是不一样的
    2. 在Nodejs中 一个worker的职责就是执行parent worker提供给他的代码片段(worker script)
    3. 每一个worker都通过一个message channel来和其parent worker通信 child worker可以通过parentPort,postMessage将信息写入信道 而parent worker需要通过worker.postMessage()将信息写入信道

    > Nodejs workers如何并行运行
    - V8 Isolates
    - 一个独立的chrome V8运行实例 其有独立的JS堆和微任务队列
    - 这位每一个Nodejs worker独立运行提供了保障
    - 其缺陷就是 workers之间没法直接访问对方的堆 
    - 由于这个原因 每个worker都有其自己的libuv eventloop
14. Node进程线程
- 进程
    - 启动一个服务 运行一个实例 就是开一个服务进程 
    - 如JAVA中的JVM本身就是一个进程 
    - Nodejs中通过node app.js开启一个服务进程 
    - 多进程就是进程的复制(fork)fork出来的每个进程都拥有自己的独立空间地址 数据栈
    - 一个进程无法访问另一个进程里定义的变量 数据结构 只有建立了IPC通信 进程之间才可数据共享
- 单线程
    - 一个进程只开一个线程
- 单线程的一些说明
    1. Nodejs虽然是单线程模型 但是其基于事件驱动 异步非阻塞模式 可以应用于高并发场景 避免了线程创建 线程之间上下文切换所产生的资源开销
    2. 当你的项目中需要有大量计算 CPU耗时操作时 要注意开启多线程来完成
    3. Nodejs开发过程中 错误会引起整个应用推出 应用的健壮性值得考验 尤其是错误的异常抛出以及进程守护是必须要做的
    4. 单线程无法利用多核CPU 但后来的Nodejs提供的API以及一些第三方工具相应都得到了解决
- Nodejs中的进程和线程
    1. Nodejs是JS在服务器端的运行环境 构建在chrome的V8引擎之上 基于事件驱动 非阻塞I/O模型 充分利用操作系统提供的异步I/O进行多任务的执行 适合于I/O密集型应用场景
    2. 因为异步 程序无需阻塞等待结果返回 而是基于回调通知的机制 原本同步模式等待的时间可以用来处理其他任务
    - PS:在Web服务器方面 著名的Nginx也是采用此模式(事件驱动)避免多线程的线程创建 线程上下文切换的开销 Nginx采用C语言编写 主要用来做高性能的Web服务器 不适合做业务
    3. Web业务开发中 如果有高并发应用场景 Nodejs是好的选择
    4. 在单核CPU系统之上我们采用单进程+单线程的模式来开发 在多核CPU系统之上 可以通过child_process.fork开启多个进程(Nodejs在v0.8版本之后新增了Cluster来实现多进程架构)即多进程+单线程模式
    - PS:开启多进程不是为了解决高并发 主要是解决了单进程模式下Nodejs CPU利用率不足的情况 充分利用多核CPU的性能
- Nodejs中的进程
    - process模块 -EventEmitter的实例
    - Nodejs中的进程Process是一个全局对象 无需require直接使用 给我们提供了当前进程中的相关信息 官方文档提供了详细的说明
    1. process.env 环境变量 如通过process.env,NODE_ENV获取不同环境项目配置信息
    2. process.nextTick 在涉及Event Loop时会提到
    3. process.pid 获取当前进程id
    4. process.ppid 获取进程对应的父进程
    5. process.cwd() 获取当前进程工作目录
    6. process.platform 获取当前进程运行的操作系统平台
    7. process.uptime() 获取进程已运行事件 如pm2守护进程的uptime
    8. 进程事件 process.on('uncaughtException',cb)捕获异常信息 process.on('exit',cb)进程退出监听
    9. 三个标准流:process.stdout 标准输出 process.stdin标准输入 process.stderr标准错误输出
    10. process.title指定进程名称 有时需要给进程指定一个名称
    - 除了Process之外 Nodejs还提供了child_process模块用来对子进程进行操作 
- Nodejs进程创建
    - 进程创建有多种方式 下面是以child_process模块和cluster模块进行讲解
    
    > child_process模块
    - 是Nodejs的内置模块 几个常用函数 四种方式
    1. child_process.spawn():适用于返回大量数据 如图像处理 二进制数据处理
    2. child_process.exec():适用于小量数据 maxBuffer默认值为200*1024超过这个默认值将会导致程序崩溃 数据量过大可采用spawn
    3. child_process_execFile():类似child_process.exec() 区别是不同通过shell来执行 不支持像I/O重定向和文件查找这样的行为
    4. child_process.fork()

    - fork开启子进程解决文章起初的计算耗时造成线程阻塞
    - 在进行compute计算时创建子进程 子进程计算完成通过send方法将结果发送诶出线程
    - 主线程通过message监听到信息后处理并退出
    
    > cluster模块
    - cluster模块调用fork方法来创建子进程 该方法与child_proces中的fork是同一个方法 
    - 通过fork方式创建的子进程与父进程之间建立了IPC通道 支持双向通信 
    - cluster模块采用的是经典的主从模型 Cluster会创建一个master 然后根据指定的数量复制出多个子进程 可以使用cluster.isMaster属性判断 当前进程是master还是worker(工作进程)
    - 由master进程来管理所有的子进程 主进程不复杂具体的任务处理 主要工作是负责调度和管理
    - cluster模块使用内置的负载均衡来更好地处理线程之间的压力 该负载均衡使用了Round-robin算法(也被称为循环算法)
    - 当使用Round-robin调度策略时 master accepts所有传入的连接请求 然后将相应的TCP请求处理发送给选中的工作进程
    > 开启多进程时端口疑问
    - 如果多个Node进程监听同一个端口 会出现Error:listen EADDRIUNS的错误 
    - cluster模块之所以让多个子进程监听一个端口 是因为master进程内部启动了一个TCB服务器 
    - 真正监听端口的只有这服务器 当来自前端的请求触发服务器的connnection事件后 master会将对应的socket句柄发送给子进程
    
    > cluster如何实现多进程共享端口
    1. cluster创建的进程分两种 父进程和子进程 父进程只有一个 子进程有多个(一般根据cpu核数创建)
        - 父进程负责监听端口接受请求 然后分发请求
        - 子进程负责请求的处理
    2. 三个问题
        1. 子进程为何调用listen不会进行端口绑定
            - net.js源码中的listen方法通过listenInCluster方法来区分是父进程还是子进程 不同进程的差异在listenInCluster方法中体现
            - 子进程的server拿到的是伪造的TCPWrapper 当调用listen方法时并不会执行任何操作 所以在子进程中调用listen方法并不会绑定端口 因此也不会报错
        2. 父进程何时创建的TCP Server
            - 在自建成发送给父进程的queryServer message时 父进程会检测是否创建了TCP Server 如果没有就会创建TCP Server并绑定端口 然后再把子进程记录下来 方便后续的用户请求worker分发
        3. 父进程如何完成分发
            - 父进程由于绑定了端口号 所以可以捕获连接请求 父进程的onconnection方法会被触发 onconnection方法触发时会传递TCP对象参数
            - 由于父进程记录了所有的worker 所以父进程可以选择要处理请求的worker 然后通过向worker发送act为newconn的消息 并传递TCP对象 
            - 子进程监听到消息后 对传递过来的TCP对象进行封装 封装成socket 然后触发connection事件
            - 实现子进程不监听端口 但依然可以处理用户请求的目的
        4. cluster如何实现负载均衡
            - 负载均衡直接依赖cluster的请求调度策略 在v6.0版本之前 cluster的调度策略采用的是cluster.SCHED_NONE(依赖于操作系统)
            - SCHED_NODE理论上说性能最好 但是从实际角度发现 在请求调度方面会出现不太均匀的情况 
            - 因此6.0版本中Node.js增加了cluster.SCHED_RR(round-robin)
        5. Nodejs实现round-robin   
            - Nodejs内部维护了两个队列
            1. free队列记录当前可用的worker
            2. handles队列记录了需要处理的TCP请求
            - 当新请求到达时父进程将请求暂存handles队列 从free队列中出队一个worker 进入worker处理(handoff)阶段
        - PS:主进程和子进程建立了IPC 因此主进程与子进程之间可以通信 但是各个子进程之间是相互独立的 无法通信

    > child_process模块与cluster模块总结
    - 无论是child_process模块 还是cluster模块 都是为了解决Nodejs实例单线程运行 无法利用多核CPU的问题而出现的
    - 核心就是父进程(master进程)负责监听端口 节后到新的请求后将其分发给下面的worker进程

    > cluster模块的一个弊端
    - cluster模块一个主进程只能管理一组工作进程
    - cluster内部隐式构建TCP服务器的方式对使用者更简单和透明 但是这种方式 无法像使用child_process那样灵活 
    - 因为一主线程只能管理一组相同的工作进程 
    - 自行通过child_process来创建工作进程 一个主进程可以控制多组进程 原因是child_process操作子进程时 可以隐式创建多个TCP服务器

    > Node.js进程通信原理
    - 前面无论是child_process模块 还是cluster模块 都需要主进程和工作进程之间的通信 通过fork()或者其他API 创建了子进程之后 为了实现父子进程之间的通信 父子进程才能通过messgae和send()传递消息
    > IPC(Inter-Process Communication)进程间通信
    - 目的是让不同的进程能够互相访问资源并进行协调工作
    - 实现进程间通信的技术有很多 如命名管道 匿名管道 socket 信号量 共享内存 消息队列等
    - Node中实现IPC通道是依赖于libuv 
    - windows下由命名管道(name pipe)实现 
    - *nux系统则采用Unix Domain Socket实现
    - 表现在应用层上的进程间通信 只有简单的messgae事件和send()方法 接口十分简洁和消息化
    - 父进程在实际创建子进程之前 会创建IPC通道并监听它 然后才真正创建出子进程 这个过程中也会遇到环境变量 告诉子进程这个IPC通道的文件描述符 
    - 子进程在启动的过程中 根据文件描述符去连接这个已存在的IPC通道 从而完成父子进程之间的连接

- Nodejs句柄传递
- Nodejs多进程架构模型
- Nodejs进程守护
    - 每次启动Nodejs程序都需要在命令窗口输入命令node app.js才能启动 但如果把命令窗口关闭 则Nodejs程序服务就会立即断掉
    - 除此之外 当这个Node服务意外崩溃了就不能自动重启进程了 
    - 需要通过某些方式来守护这个开启的进程 执行node app.js开启一个服务进程之后 还可以在这个终端上做别的事情 且不会相互影响 当出现问题可以自动重启
    > 如何实现进程守护
    - 第三方的进程守护框架 pm2和forever 都可以实现进程守护 底层也都是通过上面讲的child_process模块和cluster模块实现

    > Nodejs线程
    > Nodejs关于单线程的误区
    - Node中最核心的是V8引擎 在Node启动后 会创建V8实例 这个实例是多线程的
        - 主线程：编译 执行代码
        - 编译/优化线程： 在主线程执行时 可以优化代码
        - 分析器线程：记录分析代码运行时间 为Crackshaft优化代码执行提供依据
        - 垃圾回收的几个线程
    - 大家常说的Node单线程是指 JS的执行是单线程的(开发者编写的代码运行在单线程环境中)
    - 但JS的宿主环境 无论是Node还是浏览器都是多线程的 因为libuv中有线程池的概念存在的 
    - libuv会通过类似线程池的实现来模拟不同操作系统的异步调用 这对开发者来说是不可见的
    > Nodejs线程创建
    - 直到Node10.5.0的发布 官方才给出一个实验性质的模块worker_threads给Node提供真正的多线程能力
14. Nodejs中间件模式
    - 中间件在Nodejs中被广泛使用 它泛指一种特定的设计模式 一系列的处理单元 过滤器和处理程序 以函数的形式存在 连接在一起 形成一个异步队列 来完成对任何数据的预处理和后处理
    - 它的优点在于灵活性 使用中间件用极少的操作就能得到一个插件 最简单的方法就能将新的过滤器和处理程序扩展到现有系统上
14. require
    1. require可加载.js .json .node后缀的文件
    2. require的过程是同步的 所以这样是错误的 require这个文件得到的是空对象{}
    ```
    setTimeout(()=>{
        module.exports = {a:'hello'}
    },0)
    ```
    3. require目录的机制是
        - 如果目录下有package.json并指定了main字段 则用之
        - 如果不存在package.json 则依次尝试加载目录下的index.js和index.node
    4. require过的文件会加载到缓存 所以多次require同一个文件(模块)不会重复加载
    5. 判断是否是程序的入口文件由两种方式
        - require.main === module(推荐)
        - module.parent === null
15. koa
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
2. koa常见中间件 
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
18. Yarn和NPM
    > Yarn
    - 由Facebook Googel Exponent和Tilde联合推出的一个新的JS包管理工具 Yarn是为了弥补npm的一些缺陷而出现的
    > npm缺陷
    1. 安装慢
    2. 同一个项目 安装时无法保持一致性 由于package.json文件中版本号的特点 
        1. "5.0.3" 安装指定的5.0.3版本
        2. "~5.0.3" 安装5.0.x中最新的版本
        3. "^5.0.3" 安装5.x.x中最新的版本
    3. 安装时 包会在同一时间下载和安装 中途某个时间 一个包抛出一个错误 但是npm会继续下载和安装包 因为npm会把所有的日志输出到终端 有关错误包的错误信息就会在一大堆npm打印的警告中丢失 甚至不会注意到实际发生的错误
    > Yarn优点
    1. 速度快
        1. 并行安装
        2. 离线安装 之前已经安装过一个软件包 用Yarn再次安装时会从缓存中获取 不用像npm再从网络中下载
    2. 安装版本统一
        1. 为了防止拉取到不同的版本 Yarn有一个锁定文件lock file 记录被确切安装上的模块的版本号 每次只要新增一个模块 yarn就会创建/更新 yarn.lock这个文件 每一次拉取同一个项目依赖时 使用的都是一样的模块版本
        - npm 可以通过开发者执行npm shrinkwrap命令生成一个锁定文件
        - yarn和npm的区别在于 yarn会默认生成这样的锁定文件 npm要通过shrinkwrap命令生成shrinkwrap.json文件 只有当这个文件存在时 packages版本信息才会被记录和更新
    3. 更简洁的输出
        - yarn默认情况下会结合emoji直观且直接打印出必要的信息 也提供一些供开发者查询额外的安装信息
    4. 多注册来源处理
    5. 更好的语义化
    > npm5.0
    - 在yarn之后 npm做了一些类似改进
    1. 默认新增类似yarn.lock的package-lock.json
    2. git依赖支持优化
    3. 文件依赖优化
1. eventloop 
    1. 概念
    2. Nodejs是如何实现event loop的(通过libuv)
    3. eventloop的延迟很大说明什么(主线程阻塞)
2. 多线程
    1. 进程和线程的区别
    2. Nodejs如何在单线程中实现异步回调
    3. child_process的概念和使用
    4. 一份代码 如何在单机上跑多个服务实例
    5. Nodejs10的worker_threads
3. stream
    1. 概念和使用
4. koa相关
    1. 中间件洋葱模型
    2. 使用过的中间件 自己写过的中间件
5. npm
    1. npm发过包吗
    2. semver语义化版本规范
    3. yarn比npm改进在哪里


8. timer解读
    - 主要分为JS层面的实现和libuv层面的实现
9. yield魔法
    - ES6中的Generator的引入 很大程度上改变了JS程序员对迭代器的看法 并为解决callback hell提供了新方法
    > Generators
    - 迭代器模式是很常见的设计模式 但是实现起来 很多东西是程序化的 当迭代规则比较复杂时 维护迭代器内的状态是比较麻烦的
    - Generators: a better way to build Iterators

11. Event
    - 这是Node.js官网对自身的介绍 明确强调了Nodejs使用额一个事件驱动 非阻塞式I/O的模型 使其轻量又高效
    - Node中大量核心模块都使用了Event的机制 
    - 观察者模式
    > Event.js实现
    1. EventEmitter允许注册一个或多个函数作为listener 在特定的事件触发时被调用
    > EventEmitter vs Callbacks
    1. EventEmitter
        - 可以通知多个listener
        - 一般被调用多次
    2. Callbak
        - 最多通知一个listener
        - 通常被调用一次 无论操作是成功还是失败
    > 小结
    1. Event模式是观察者设计模式的典型应用 同时也是Reactive Programming的精髓所在




1. 什么是stub
    - stub是用于模拟一个组件或模块的函数或程序 
    - 在测试用例中 可以用stub去模拟一个方法 从而避免调用真实的方法 使用stub还可以返回虚构的结果 可以配合断言使用sub
    - 在单元测试中 Stub是完全模拟一个外部依赖 Mock常用来判断测试通过还是失败


3. 如何用Node监听80端口
    - 陷阱 类Unix系统中不应该尝试去监听80端口 因为这需要超级用户权限 因此不推荐应用直接监听这个端口
    - 实现
    - 通过在Node应用前方再增加一层反向代理(如nginx)实现 否则建议直接监听大于1024的端口
    > 反向代理
    - 以代理服务器来接收Internet上的连接请求 然后将请求转发到内部网络上的服务器 并将服务器返回的结果发送给客户端

2. 同样是写JS Nodejs开发和页面开发有什么区别
    1. 浏览器端开发页面 是和用户打交道 重交互 浏览器还提供各种web api Nodejs主要面向数据 收到请求后 返回具体的数据 这时两者在业务路径上的区别 真正的区别是在业务模型上
    2. 开发页面时 每个用户浏览器上都有一份JS代码 如果代码崩了 只会对
3. Node.js开发注意事项
    1. 用户在访问Nodejs服务时 如果某一个请求卡住了 服务迟迟不能返回结果 或者说逻辑出错导致服务挂掉 都会带来大规模的体验问题 Server端的目的就是快速 可靠的返回数据
    > 缓存
    - 由于Nodejs不擅长处理复杂逻辑(JS本身执行效率较低) 如果要用Nodejs做接入层 应避免复杂的逻辑 想要快速处理数据并返回 一个至关重要的点: 使用缓存






2. 回调函数
    - Node.js异步编程的直接体现就是回调
    - 异步编程依托于回调来实现 但不能说使用回调后程序就异步化了
    - 回调函数在完成任务后就会被调用 Node使用了大量的回调函数 Node所有API都支持回调函数
    - 如 可以一边读取文件 一边执行其他命令 在文件读取完成后 将文件内容作为回调函数的参数返回 这样在执行代码时就没有阻塞或等待文件I/O操作 可大大提高Nodejs性能 处理大量并发请求
    > 阻塞式代码
    ```
    const fs = require('fs');
    const data = fs.readFileSync('1.js');
    console.log(data.toString())
    ```
    > 非阻塞代码
    ```
    const fs = require('fs');
    fs.readFile('01.js',function(err,data){
        if(err){
            console.log(err.stack);
            return;
        }
        console.log(data.toStrint());
    })
    ```
    1. 第一个实例在文件读取完后才执行完程序 第二个实例不需要等待文件读取玩 可在文件读取同时执行接下来的代码 提高代码性能
    2. 阻塞是按顺序执行 非阻塞不需要按顺序 如果需要处理回调函数的参数 就需要卸载回调函数内



1. Nodejs是单线程吗
2. Nodejs做耗时计算时 如何避免阻塞
3. Nodejs如何实现多线程的开启和关闭
4. Nodejs可以创建线程吗
5. 开发过程中如何实现进程守护
6. 除了使用第三方模块 是否自己封装过一个多线程架构

4. Node Koa 洋葱模型
    - Koa被认为是第二代Node Web framework
    - 它最大的特点是独特的中间件流程控制 是一个典型的洋葱模型
    - Koa和Koa2中间件的思路是一样的 但是实现方式有所区别
    - Koa2在Node7.6之后 可以使用async/await代替generator使用中间件 
    - Koa实现有几个最重要的点
        1. context的保存和传递
        2. 中间件的管理和next的实现
5. 如何保证Node高可用性
    把数据放到redis/数据库中
    再加一个可以优雅重启应用服务的HTTP前端


1. 中间件listen
    - listen中间件就是一个语法糖 其实它里面还是http的listen 只是包装的一层
    ```
    listen(...args){
        let server = http.createServer(this.handleRequest.bind(this));
        server.listen(...args)
    }
    ```
2. 中间件use    
    - 使用use时 会发现里面的函数会立即执行 说明use的源码中有一个回调函数 可以让他立即执行
    ```
    use(fn){
        //use里传入回调函数
        this.fn = fn;//执行回调函数 保证其在listen后面执行
    }
    ```
3. 中间件ctx
    - 在使用koa时 不论是请求操作还是响应操作都是使用ctx调用 这也是koa框架的优势 让代码更加简单

1. Node和apache等服务器软件的区别
    1. 没有自己的语法，使用V8引擎，所以就是JS。Node就是将V8中的一些功能自己没有重写，移植到了服务器上。V8引擎解析JS的，效率非常高，并且V8中很多东西都是异步的。
    2. Node.js没有根目录的概念，因为它根本没有任何的web容器，就是安装配置完成之后，没有一个根目录。让node.js提供一个静态服务，需要自己封装



1.Node中的事件循环
    Node中的事件循环和浏览器中是完全不相同的东西
    Node.js采用V8作为JS解析引擎
    I/O处理方面使用自己设计的libuv 
    libuv是一个基于事件驱动的跨平台抽象层
    封装了不同操作系统一些底层特性
    对外提供统一的API 事件循环机制也是它里面的实现
    Node.js运行机制
        1.V8引擎解析JS脚本
        2.解析后的代码 调用Node API
        3.libuv库负责Node API执行 它将不同的任务分配给不同的线程 形成一个Event Loop事件循环 以异步的方式将任务的执行结果返回给V8引擎
        4.V8引擎再将结果返回给用户
    六个阶段
        libuv引擎中的事件循环分为6个阶段 它们会按照顺序反复运行
        每当进入某一个阶段时 都会从对应的回调队列中取出函数执行
        当队列为空 或者执行的回调函数数量达到系统设置的阈值 就会进入下一阶段
        timers
            这个阶段执行timer(setTimeOut setInterval)回调 
        I/O callbacks
            处理一些上一轮循环中少量为执行的I/O回调
        idle,prepare
            仅node内部使用
        poll
            获取新的I/O事件 适当条件下node将阻塞在这里
        check
            执行setImmediate()的回调
        close callbacks
            执行socket的close事件回调   
        PS：上述六个阶段都不包含process.nextTick
        timer poll check 日常开发中绝大部分异步任务都是在这个三个阶段处理的
            1.timer 
            timer阶段会执行setTimeOut和setInterval回调 并且是由poll阶段控制的 同样在Node定时器指定的时间也不是准确时间 只能是尽快执行
            2.poll
                一个至关重要的阶段 该阶段中
                系统会做两件事
                1.回到timer阶段执行回调
                2.执行I/O回调
                    进入该阶段时如没有设定了timer 会发生以下两件事情
                    1.如果poll队列不为空 会遍历回调队列并同步执行 直到队列为空或达到系统限制
                    2.如果poll队列为空 会有两件事发生
                        1.如果有setImmediate回调需要执行 poll阶段会停止并进入check阶段执行回调
                        2.如果没有setImmediate回调需要执行 会等待回调被加入到队列中并立即执行回调
                        这里同样会有个超时时间设置防止一直等待下去
                设定了 timer 的话且 poll 队列为空，则会判断是否有 timer 超时，如果有的话会回到 timer 阶段执行回调
            3.check阶段
                setImmediate()的回调会被加入check队列中，从event loop的阶段图可以知道，check阶段的执行顺序在poll阶段之后
                    一开始执行栈的同步任务（这属于宏任务）执行完毕后（依次打印出start end，并将2个timer依次放入timer队列）,会先去执行微任务（这点跟浏览器端的一样），所以打印出promise3
                    然后进入timers阶段，执行timer1的回调函数，打印timer1，并将promise.then回调放入microtask队列，同样的步骤执行timer2，打印timer2；这点跟浏览器端相差比较大，timers阶段有几个setTimeout/setInterval都会依次执行，并不像浏览器端，每执行一个宏任务后就去执行一个微任务（关于Node与浏览器的 Event Loop 差异，下文还会详细介绍）。
    Node中事件循环大致顺序
        外部输入数据-->
        轮询阶段(poll)-->
        检查阶段(check)-->
        关闭事件回调阶段(close callback)-->
        定时器检测阶段(timer)-->
        I/O事件回调阶段(I/O callbacks)-->
        闲置阶段(idle prepare)-->
        轮询阶段(按照该顺序反复运行)        
    Micro-Task和Macro-Task
        Node端事件循环中的异步队列也是这两种
        常见的宏任务
            setTimeout setInterval setImmediate script整体代码 I/O
        常见的微任务
            process.nextTick new Promise().then()回调
    注意
        1.setTimeout和setImmediate
            两者非常像 区别主要在于调用时机不同
            setImmediate 设计在poll阶段完成时执行，即check阶段；
            setTimeout 设计在poll阶段为空闲时，且设定时间到达后执行，但它在timer阶段执行
            。。。
        2.process.nextTick
            该函数其实是独立于Event Loop之外 它有一个自己的队列 当每个阶段完成后 如果存在nextTick队列 就会清空队列中的所有回调函数 并且由于其他microtask执行
    Node与浏览器的事件轮询差异
        浏览器环境下
            microtask任务队列是每个macrotask执行完之后执行
            Node.js中 microtask会在事件循环的各个阶段执行 也就是一个阶段执行完毕就会执行microtask队列的任务
    总结
        浏览器和Node环境下 microtask任务队列的执行时机不同
        1.Node端 microtask在事件循环的各个阶段之间执行
        2.浏览器端 microtask在事件循环的macrotask执行完之后执行
2.Node.js多线程支持
    nodejs在v10.5.0新增了多线程的支持 并且在v11中不需要再加实验特性后缀即可直接使用
    核心API
        isMainTread:true,
        MessageProt:[Function:MessageProt],
        MessageChannel:[Function:MessageChannel],
        threadId:0,
        Worker:[Function:Worker],
        parentPort:null
    使用流程
    (isMainTread判断是否主线程/提供的Worker构造函数启动 WorkerData传递数据/线程通信 worker_threads包括MessageChannel和MessagePort类)
        1.类似cluster多进程模式需要判断当前是否主进程 这边也提供了类似的API 通过isMainThread即可
        2.启动多线程 需要提供的Worker构造函数去启动 且主线程也可以通过WorkerData去传递数据给工作线程
        Worker构造函数第一个参数默认是执行的js文件路径，或者当第二个可选参数eval为true时，可以行内执行。
        3.线程通信 和进程通信类似
            worker_threads模块还有MessageChannel和MessagePort类(继承于EventEmitter)
            MessageChannel类(创建自定义通信频道)
                包含两个已经互相能够跨线程通信的Message类型对象 可用于创建自定义的通信频道 实例化后包含两个属性port1和port2 MessagePort类型对象 可将其一个发到工作线程后通过该对象实现自定义跨线程通信
            MessagePort(跨线程通信的句柄)
                用于跨线程通信的句柄 继承了EventEmitter 包括close message事件用于接受对象关闭和发送的消息 以及close postMessage等操作
3.Node egg
    阿里开源的企业级Node.js框架egg
4.Node Koa 洋葱模型
    Koa被认为是第二代Node Web framework
    它最大的特点是独特的中间件流程控制 是一个典型的洋葱模型
    Koa和Koa2中间件的思路是一样的 但是实现方式有所区别
    Koa2在Node7.6之后 可以使用async/await代替generator使用中间件 
    Koa实现有几个最重要的点
        1.context的保存和传递
        2.中间件的管理和next的实现
5.如何保证Node高可用性
    把数据放到redis/数据库中
    再加一个可以优雅重启应用服务的HTTP前端
6.Node如何发布
    1.注册自己的npm账户
    2.添加用户名到npm环境中
    3.发布node项目
1. 什么是nodejs？我们在哪里使用它？
    Nodejs是服务器端的一门技术，而非语言，它是基于Google V8 JavaScrit引擎而开发的，用来开发可扩展的服务器端程序
    Google V8 JavaScrit引擎:
    是由谷歌开源的一个高性能 JavaScript 引擎。
    该引擎采用 C++ 编写，Google Chrome 浏览器用的就是这个引擎。
    V8 可以单独运行，也可以嵌入 C++ 应用当中。和其他的 JavaScript 引擎一样，
    V8 会编译、执行 JavaScript 代码，
    并一样会管理内存、垃圾回收等。
    就是因为 V8 的高性能以及跨平台等特性，所以它也是 Node.js 的 JavaScript 引擎。
2.什么是KOA
2.为什么要使用node js？
    nodejs会让我们的编程工作变得简单，它主要包含如下几点几个好处:
    1.执行快速。
    2.永远不会阻滞。
    3.JavaScript是通用的编程语言。
    4.异步处理机制。
    5.避免并行所带来的问题。
3.nodejs有哪些特点？
    是单线程的，但是有很高的可扩展性，使用JavaScript作为主流编程语言。使用的是异步处理机制和事件驱动。处理高效。
4.Set immediate和set time out 区别在哪里?
    Set immediate就是马上执行的意思。Set time out, 时间参数传为0，也想获得同样的功能。只不过前者要快一些。
5.如何更新nodejs的版本?
    npm install npm -g
6.为什么nodejs是单线程的
    Nodejs使用的是单线程没错，但是通过异步处理的方式，可以处理大量的数据吞吐量，从而有更好的性能和扩可扩展性。
7.什么是回调函数
    回调函数是指用一个函数作为参数传入另一个函数，这个函数会被在某个时机调用。
8.什么叫做回调地狱?
    回调地狱是由嵌套的回调函数导致的。这样的机制会导致有些函数无法到达，并且很难维护。
9.如何阻止回调地狱?
    有三种方法， 对每个错误都要处理到， 保证代码的贯通， 程序代码模块化。
10.解释一下repl的作用?
    Read evaluate print loop， 用于测试，调试和实验用。
11.API函数的类型有哪些?
    两种
    一种是阻滞型函数。阻滞型函数会等待操作完成以后再进行下一步。
    另外一种是非阻滞型函数。这种函数使用回调函数来处理当前函数获取的结果。
12.回调函数的第1个参数是什么?
    通常是错误对象。如果这个参数为空，表示没有错误。
13.NPM的作用是什么?
    Node package manager, 主要有两个功能。
        它是一个网端模块的存储介质。
        它的另一个作用是安装程序依赖和版本管理。
14.nodejs和ajax的区别是什么？
    Nodejs和ajax也就是asynchronous JavaScript and xml，都是通过JavaScript来表现的，但是他们的目的截然不同。
        Ajax是设计用来动态的更新页面的某个区域，从而不需要更新整个页面。
    Nodejs是用来开发客户服务器类型应用的。
15.解释一下nodejs中chaining.
    Chaining是指从一个数据流到另一个数据流的链接，从而实现多个流操作。
16.
        err ctx.status即是response.status
            ctx被翻译成上下文context 
        只是koa这个框架用到的一个名词 同时封装了request和response中这些属性
        express框架中没有ctx这个概念
           web开发中主要两个名词 request response
        request 客户端浏览器向服务器端发送的请求 Request Headers
        隐式 显式(传送的数据) 可以通过request.xxx 获得请求数据
        做了一个简化
        Response Body
        隐式 显式 数据
17.MVC设计模式
    M 就是 model，即数据模型，负责数据相关的任务，包括对数据的增删改查。
    V 就是 view，即视图层，即用户能看得到的界面。
    C 就是 Controller,即控制器，负责监听用户事件，然后调用 M 和 V 更新数据和视图。
    MVC 其实就是将代码变的结构化的一种抽象概念。

什么是MVC？（Model, View, Controller）
                一些建议：
                1. 所有业务代码放在controller中
                2. 所有的数据库操作的代码放在model中
                3. 所有用户可见的页面放在view中
                4. routes路由只是做简单的路由转发
                5. controller和model以及route都可以根据业务复杂度选择是否分拆多个，分拆的原则是数据库中有几张表，对应有几个controller和model
                6. controller中的方法命名规范要和业务相关，比如登录业务，就可以叫signin，注册业务，就可叫signup
                7. model中的方法命名规范就是CRUD，增删改查：查get*, 删除delete*, 改update*, 增save*
                8. mysql数据库操作完的结果results,一般会有以下几种情况
                    8.1 如果查询不到，results=[], 可以通过results.length是不是>0，来判断查没查到
                    8.2 如果查询多条，results=[{},{}...]，可以通过results.length是不是>0，来判断查没查到
                    8.3 如果查询到一条，results=[{}]，只有一个查询结果对象，仍然可以通过results.length是不是>0，来判断查没查到
                    8.4 如果是添加记录，results返回一个对象，其中有一个insertId属性，用来获取刚刚插入的这条记录的主键值，可以通过这个值是不是>0，来判断插入是否成功
                    8.5 如果是删除和修改记录，results返回一个对象，其中有一个affectedRows属性，可以通过这个值是不是>0，来判断删除或修改是否成功
18.node中cluster是怎么开启多线程的 并且一个端口可以被多个进程监听吗
    nodejs是单线程的模式 不能充分利用服务器的多核资源
    使用node的cluster模块可以监听应用进程
    退出后重新启动node应用进程 并可以启动多个node应用进程
    做到负载均衡 充分利用资源
    主要考察服务器响应的5个状态
        0:请求未初始化(代理被创建 但未调用open()方法)
        1:服务器连接已建立(open方法已被调用)
        2:请求已接收(send方法已被调用 且头部和状态已可获得)
        3:请求处理中(下载中 responseText属性已包含部分数据)
        4:请求已完成 且响应已就绪(下载操作已完成)
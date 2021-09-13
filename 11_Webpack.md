0. 概念
    1. module: 模块 在webpack中任何可以被导入导出的文件都是一个模块
    2. chunk: chunk是webpack拆分出来的
        1. 每个入口文件都是一个chunk
        2. 通过import require引入的代码也是
        3. 通过splitChunks拆分出来的代码也是
    3. bundle: webpack打包出来的文件 
        - 也可以理解为就是对chunk编译压缩打包等处理后的产出
1. Webpack作用
    > 定义
    - Webpack是一个现代JS应用程序的静态模块打包器 当webpack处理应用程序时 会递归构建一个依赖关系图 其中包含应用程序需要的每个模块 然后将这些模块打包成一个或多个bundle
    - 打包工具 把所有文件看作是资源 根据它们依赖关系打包成一个最终文件
    > 作用
    1. 模块打包 将不同模块的文件打包整合在一起 保证它们之间引用正确 执行有序 利用打包可以在开发时根据业务自由划分子模块 保证项目结构的清晰和可读性
    2. 编译兼容 通过webpack的loader机制 可以帮助对代码做pollfill 还可以变易转换诸如.less .vue .jsx这类浏览器无法识别的格式文件 
    3. 能力扩展 通过webpack的plugin机制 可以在实现模块化打包和编译兼容的基础上 进一步实现诸如按需加载 代码压缩等一系列功能 进一步提高自动化工程 工程效率 以及打包输出的质量
    > loader
    - 让Webpack拥有解析和加载非js文件的能力
    > plugin 
    - 扩展webpack功能
2. 模版打包运行原理
    1. webpack如何把这些模块合并到一起 并且保证其正常工作
    > Webpack打包流程
    1. 读取Webpack配置参数
    2. 启动Webpack 创建Compiler对象并开始解析项目
    3. 从入口文件(entry)开始解析 并找到其导入的依赖模块 递归遍历分析 形成依赖关系树
        - 文件的解析与构建是一个比较复杂的过程 在webpack源码中主要依赖compiler和complication(并发)两个核心对象实现
        1. compiler对象是一个全局单例 它负责把控整个webpack打包的构建流程
        2. compilation对象是每一次构建的上下文对象 它包含当次构建所需的所有信息 每次热更新和重新构建 compiler都会重新生成一个新的compilation对象 负责此次更新的构建过程
        3. 每个模块间的依赖关系 依赖于AST语法树 每个模块文件在通过loader解析完成之后 会通过acron库生成模块代码的AST语法书 通过语法书就可以分析这个模块是否还有依赖的模块 进而继续循环执行下一个模块的编译解析
        4. 最终webpack打包出来的bundle文件是一个IIFE的执行函数
    4. 对不同文件类型的依赖模块文件使用对应的Loader进行编译 最终转为JS文件
    5. 整个过程中webpack会通过发布订阅模式 向外抛出一些hooks webpack的插件plugin即可通过监听这些关键的事件节点 执行插件任务进而达到干预输出结果的目的

    1. Webpack启动后会在entry里配置的module开始递归解析entry所依赖的所有module
    2. 每找到一个module就会根据配置的loader去找相应的转换规则
    3. 对module进行转换后再解析当前module所依赖的module 这些模块会以entry为分组
    4. 一个entry和所有相依赖的module也就是一个chunk
    5. 最后webpack会把所有chunk转换成文件输出
    6. 在整个流程中webpack会在恰当时机执行plugin的逻辑

    (初始化Compiler-开始编译(调用compiler的run方法)-确定入口-编译模板-完成编译模板-输出资源-输出完成)
    1. 初始化compiler:new Compiler(config) config就是webpack.config.js文件
    2. 开始编译 调用compiler的run方法开始编译
    3. 确定入口 根据config的entry找到所有入口文件
    4. 编译模板 从入口文件触发，调用所有配置的loader对模块进行编译，并且还要收集模块依赖的模块，不断递归进行编译（这个过程会用到使用AST收集依赖，AST就是抽象语法树，像什么eslint, sass, typescript等等都会用到AST，AST可以用@babel/parser插件来生成）
    5. 完成模块编译：在经过第4步使用Loader编译完所有模块后，得到每个模块编译的内容和它们的依赖关系
    6. 输出资源：根据入口和模块之间的依赖关系，组装成一个个包含多个模块的Chunk，再把每个chunk转换成单独的文件加入到输出列表。（这步是可以修改输出内容的最后机会）。
    7. 输出完成：在确定好输出内容后，根据配置确定输出的路径和文件名，把文件内容写入到文件系统。

    Webpack 的运行流程是一个串行的过程，从启动到结束会依次执行以下流程：
    1. 初始化参数：从配置文件和 Shell 语句中读取与合并参数，得出最终的参数
    2. 开始编译：用上一步得到的参数初始化 Compiler 对象，加载所有配置的插件，执行对象的 run 方法开始执行编译
    3. 确定入口：根据配置中的 entry 找出所有的入口文件
    4. 编译模块：从入口文件出发，调用所有配置的 Loader 对模块进行翻译，再找出该模块依赖的模块，再递归本步骤直到所有入口依赖的文件都经过了本步骤的处理
    5. 完成模块编译：在经过第4步使用 Loader 翻译完所有模块后，得到了每个模块被翻译后的最终内容以及它们之间的依赖关系
    6. 输出资源：根据入口和模块之间的依赖关系，组装成一个个包含多个模块的 Chunk，再把每个 Chunk 转换成一个单独的文件加入到输出列表，这步是可以修改输出内容的最后机会
    7. 输出完成：在确定好输出内容后，根据配置确定输出的路径和文件名，把文件内容写入到文件系统

    在以上过程中，Webpack 会在特定的时间点广播出特定的事件，插件在监听到感兴趣的事件后会执行特定的逻辑，并且插件可以调用 Webpack 提供的 API 改变 Webpack 的运行结果。

    简单来说
    1. 初始化：启动构建，读取与合并配置参数，加载 Plugin，实例化 Compiler
    2. 编译：从 Entry 出发，针对每个 Module 串行调用对应的 Loader 去翻译文件的内容，再找到该 Module 依赖的 Module，递归地进行编译处理
    3. 输出：将编译后的 Module 组合成 Chunk，将 Chunk 转换成文件，输出到文件系统中

    1. 读取webpack的配置参数；
    2. 启动webpack，创建Compiler对象并开始解析项目；
    3. 从入口文件（entry）开始解析，并且找到其导入的依赖模块，递归遍历分析，形成依赖关系树；
        一个比较复杂的过程，在webpack源码中主要依赖于compiler和compilation两个核心对象实现。
        compiler:
            对象是一个全局单例，他负责把控整个webpack打包的构建流程。
        compilation:
            对象是每一次构建的上下文对象，它包含了当次构建所需要的所有信息，每次热更新和重新构建，compiler都会重新生成一个新的compilation对象，负责此次更新的构建过程。
        而每个模块间的依赖关系，则依赖于AST语法树。
        每个模块文件在通过Loader解析完成之后，会通过acorn库生成模块代码的AST语法树，通过语法树就可以分析这个模块是否还有依赖的模块，进而继续循环执行下一个模块的编译解析。
        最终Webpack打包出来的bundle文件是一个IIFE的执行函数。
    4. 对不同文件类型的依赖模块文件使用对应的Loader进行编译，最终转为Javascript文件；
    5. 整个过程中webpack会通过发布订阅模式，向外抛出一些hooks，而webpack的插件即可通过监听这些关键的事件节点，执行插件任务进而达到干预输出结果的目的。
3. loader的编写思路
    - Webpack最后打包出来的成果是一份JS代码
    - Webpack内部默认只能处理JS模块代码 
    - 打包过程中 会默认把遇到的所有文件都当作JS代码进行解析
    - 因此当项目存在非JS类型文件时 需要先对其进行必要的转换 才能继续执行打包任务 
    - 这也是loader机制存在的意义
    > Loader的配置使用
    ```
    //webpack.config.js
    module.exports = {
        module:{
            rule:[
                {
                    test:/^your-/,
                    use:[
                        {
                            loader:''
                        },
                        {

                        }
                    ]
                }
            ]
        }
    }
    ```
    - 针对每个文件类型 loader是支持以数组形式配置多个
    - 因此当Webpack转换该文件类型时 会按顺序链式调用每一个loader
    - 前一个loader返回的内容会作为下一个loader的入参
    - 因此loader开发需要遵循一些规范 比如返回值必须是标准的JS代码字符串
    - 以保证下一个loader能正常工作
    - 同时在开发上要严格遵循单一职责 只关心loader输出以及对应的输出

    - loader函数中的this上下文由webpack提供 可以通过this对象提供的相关属性 获取当前loader需要的各种信息数据 
    - 事实上这个this 指向一个叫loaderContext的loader runner特有对象
    
    > loader的执行顺序为什么是后写的先执行 即从右往左
    - webpack选择了compose方式 而不是pipe的方式
    > 函数组合 函数式编程中非常重要的思想
    - 两种形式
        1. pipe 从左向右组合函数 在Uninx有pipeline概念 ps aux|grep node 这些都是从左向右的
        2. compose 从右向左组合函数 函数式编程中有组合的概念 数学中常见的f(g(x))在函数式编程一般的实现方式是从右往左
    - 其实也可以实现从左往右 只不过webpack选择了函数式编程的方式 所以loader顺序从右往左
    - 如果webpack选择pipe方式 写loader顺序就是从左往右
4. plugin思路
    - loader负责文件转换 plugin负责功能扩展
    - loader和plugin作为webpack两个重要组成部分 承担两部分不同的指责

    - webpack基于发布订阅模式 在运行的生命周期会广播出许多事件 插件通过监听这些事件 可以在特定的阶段执行自己的插件任务 从而实现自己想要的功能

    > Webpack提供的事件钩子(compiler compilation汇编)
    1. compiler 暴露了和Webpack整个生命周期相关的钩子 compiler-hooks
    2. compilation 暴露了与模块和依赖有关的粒度更小的事件钩子 Compilation Hooks
    - Webpack的事件机制基于webpack自己实现的一套Tapable事件流方案

    > Plugin开发和Loader开发一样 需要遵循一些开发上的规范和原则
    1. 插件必须是一个函数或包含一个apply方法的对象 这样才能访问compiler实例
    2. 传给每个插件的compiler和complation对象都是同一个引用 若在一个插件中修改了他们身上的属性 会影响后面的插件
    3. 异步的事件需要在插件处理完任务时调用回调函数通知Webpack进入下一个流程 不然会卡住
4. Loader和Plugin区别
    > Loader：(本质函数 让webpack拥有加载和解析非JavaScript文件的能力)
    1. 本质是一个函数 在该函数中对接收到的内容进行转换 返回转换后的结果 因为Webpack只认识JavaScript 所以Loader就成了翻译官 对其他类型的资源进行转译的预处理工作
    - 直译为"加载器"。Webpack将一切文件视为模块，但是webpack原生是只能解析js文件，如果想将其他文件也打包的话，就会用到loader。 所以Loader的作用是让webpack拥有了加载和解析非JavaScript文件的能力。
    2. 在modules.rules中配置 作为模块的解析规则 类型为数组 每一项都是一个Object 里面描述了对于什么类型的文件（test），使用什么加载(loader)和使用的参数（options）
    
    > Plugin:(扩展Webpack功能)
    1. 插件 基于事件流框架Tapable Plugin可以扩展Webpack功能 在Webpack运行的生命周期中会广播出许多事件 Plugin可以监听这些事件 在合适的时机通过Webpack提供的API改变输出结果
    2. 在plugins中单独配置 类型为数组 每一项是一个plugin的实例 参数都通过构造函数传入
5. webpack核心配置
    1. entry
        - 入口 指示Webpack以哪个文件为入口起点开始打包 分析构建内部依赖图
        ```
        // string方式 单入口 打包形成一个trunk 输出一个bundle文件 trunk的名称默认是main.js
        entry:'./src/index.js'
        // array方式 多入口 所有入口文件最终只会形成一个trunk 输出出去只有一个bundle文件
        entry:['./src/index.js','./src/test.js']
        // object方式 多入口 有几个入口文件就形成几个trunk 输出几个bundle文件此时thrunk的名称就是对象key值
        entry:{
            index:'./src/index.js',
            test:'./src/test.js'
        }
        ```
    2. output
        - 输出 指示Webpack打包后的资源bundles输出到哪里以及如何命名
        raw-loader：加载文件原始内容（utf-8）
    3. loader
        - Webpack自身职能理解JS和JSON文件 loader让Webpack能处理其他文件
        ```
        rules:[
            // 
            test:/\.css$/
            // 使用哪些loader进行处理 执行顺序 从右至左 从下至上
            use:[
                // 创建style标签 将js中的样式资源(也就是css-loader转化成的字符串)拿过来 添加到页面header标签
                "style-loader"
                // 将css文件变成commonjs一个模块加载到js中 里面的内容是样式字符串
                "css-loader"
                // 兼容性问题
                "postcss-loader"
                // sass/less
                "sass-loader/less-loader"
                // 处理html中的本地文件
                "html-withimg-loader"
                // 把文件输出到一个文件夹中 在代码中通过相对URL去引用输出的文件(处理图片和字体)
                "file-loader"/
                // 与file-loader类似 区别是用户可以设置一个阀值 大于阀值会交给file-loader处理 小于返回文件base64形式编码(处理图片和字体)
                "url-loader"
                // ES6转成ES5
                "babel-loader"
                // 加载额外的 Source Map 文件，以方便断点调试
                "source-map-loader"
                // 加载json文件 默认包含
                "json-loader"
                // 加载并压缩图片文件
                "image-loader"
                // 把TS转换成JS
                "ts-loader"
                // 通过eslint检查js代码
                "eslint-loader"
                // 通过tslint检查ts代码
                "tslint-loader"
                // 国际化
                "i18n-loader"
            ]
        ]
        ```
        - loader有一个参数 可以修改优先级 enforce参数 其值可以为pre优先执行 post滞后执行
        - 建议给loader指定include或是exclude 指定其中一个即可 因为node_modules目录通常不需要编译 排除后 有效提升编译效率
        - PS:loader需要配置在module.rules中 rules是一个数组
    4. plugin
        - 插件(plugins): 可以用于执行范围更广的任务 从打包优化和压缩一直到重新定义环境中的变量等
        ```
        // cleanWebpackPlugin帮助在打包时自动清除dist文件 
        const {cleanWebpackPlugin} = require("clean-webpack-plugin");
        // HtmlWebpackPlugin帮助创建html文件 自动引入打包输出的bundles文件 支持html压缩
        const HtmlWebpackPlugin = require("html-wepack-plugin");
        // MiniCssExtractPlugin将css提取到单独的文件中 它为每个trunk创造一个css文件 需要配合loader一起使用
        const MiniCssExtractPlugin = require('mini-css-exact-plugin')
        // VueLoaderPlugin 插件 作用是将定义过的css js等规则应用到vue文件中
        const {VueLoaderPlugin} = require('vue-loader');
        ```
    5. mode
        - 指示Webpack使用相应模式的配置 默认为production
        1. development 会将DefinePlugin中process.env,NODE_ENV的值设置为development 为模块和chunk启用有效名
        2. production 会将DefinePlugin中process.env.NODE_ENV的值设置为production为模块和chunk启动确定性的混淆名称
        3. none 不使用任何默认优化项
    6. 其他常用配置
6. Webpack打包优化
    > 开发环境优化 
    1. 使用source-map
        > source-map
        - 一种提供源代码到构建后代码映射的技术 如果构建后代码出错 可以映射追踪源代码错误 优化代码调试
        - 开启source-map配置:devtool:"source-map" source-map值有很多类型
        1. inline: 内联 一个thrunk生成一个总的source-map
        2. eval: 内联 每一个文件生成一个source-map
        3. cheap:外部 报错位置只能精确到行
        4. cheap-module: 显示第三方库的source-map
        - 内联和外联的区别:内联不生成map.js文件 而是通过data-url的形式直接注入到chunk 内联构建速度更快
    2. HMR(模块热替换)
        - devServer启动一个代理服务器 启动过后修改代码就会自动刷新浏览器 但这个不是HMR
        - HMR:模块热替换 也可以理解为局部替换 替换 添加或删除模块 而无需重新加载整个页面
        ```
        devServer:{
            contentBase:path.resolve(__dirname,"dist");
            hot:true,//开启HMR肾功能
        }
        // webpack升级到5.0后 target默认值会根据package.json中的browswrslist改变 导致devserver的启动更新失效 所以development环境下直接配置成web
        target:"web"
        ```
        ....
    > 生产环境优化
    1. oneOf
        - 默认情况下 文件会去匹配rules下面的每一个规则 即使已经匹配到了某个规则也会继续向下匹配 如果将规则放在oneOf属性中 则一旦匹配到某个规则 就停止匹配了
        - 放在oneOf属性中的规则只会匹配成功一次 所以如果有一种类型的文件需要使用多个loader 使用use数组或放到oneOf外
    2. 缓存
        - 在编译打包时可对文件做缓存 有两种方式
        1. 解析文件的loader自身带有的缓存功能(如babel-loader vue-loader)
        2. 使用专门的loader(cache-loader)
        - 开启缓存后 对于未改动的文件 webpack直接从缓存中获取 而不用再次变异 大大加快构建速度
    3. 多进程打包(thread-loader)
        - 一般只有在编译花费时间较长时才需要使用thread-loader 
        - 因为这个loader启动和通信都是有开销的 如果时间较短 使用这个loader得不偿失
        - thread-loader放在babel-loader前 就会在babel-laoder工作时仅从多进程工作
    4. 外部扩展(externals)
        - 用来告诉Webpack要构建的代码中使用了哪些不用被打包的模块 这些模块可能是通过外部环境(CDN)引入的
        - 配置了externals后 即使代码引入到这个库 Webpack也不会将库打包进bundle 而是直接使用全局变量
    5. DLL动态链接库
        - 使用dll技术对公共库提前打包 可大大提升构建速度
        1. 抽取公共库 打包到一个或多个动态链接库
        2. 将打包好的动态链接库在页面中引入
        3. 主程序使用了动态连结库中的公共库 不能被打包入bundle 应该直接去动态链接库中获取
    6. Tree Shaking树摇
        - 移除JS上下文中未引用代码(dead-code)
        - 绿色的树叶表示实际用到的source code和library
        - Webpack4种做不到 Webpack4只会去除从未使用过的模块
        - 因为Wepack4默认所有文件的代码都是有副作用的
    7. Code Split代码分割
        - Webpack默认会将所有依赖的文件打包输出到一个bundle.js中(单入口时)
        - 当应用程序逐渐复杂 这个bundle.js文件也会越来越大 浏览器加载速度也会越来越慢 所以需要使用代码分割将不同代码单独打包成不同thrunk输出
        1. 通过optimization将公共代码单独打包成trunk
        2. import动态导入
            - 想要根据业务拆分bundle时 推荐用这种方式
            - import动态导入的模块Webpack会将其作为单独的thrunk打包
6. webpack打包优化
    (优化图片/分离第三方包/分离CSS文件压缩CSS文件/压缩JS文件/压缩HTML)
    1. 优化图片 使用url-loader优化 将小图片转化为base64压缩 防止小图片太多请求次数太多
    2. 分离第三方包
        - 打包后的bundle.js文件夹较大 所以每次加载时 请求比较慢 所以有必要 将第三方包分离出来
        - 使用CommonsChunkPlugin插件进行配置
    3. 分离CSS文件并压缩CSS文件(extract-text-webpack-plugin)
        - 使用extract-text-webpack-pulgin插件将CSS文件分离出来
        - 为了使项目加载时尽早优先加载CSS样式 也为了解决JS文件体积过大问题
    4. 压缩JS文件(uglifyjs-webpack-plugin)
        - 使用uglifyjs-webpack-plugin将JS压缩 减少打包后的vendor.js bundle.js等JS文件大小
    5. 压缩HTML(html-webpack-plugin)
        - 为减少打包后的文件体积 使性能更好 效率更高 提高加载速度 打包时有必要进行压缩
        - 使用html-webpack-plugin进行压缩
6. 代码分割 本质 意义
    > 打包问题
    1. 核心问题:多页应用打包后代码冗余 文件体积大
    2. 究其原因:相同模块在不同入口之间没有得到复用 bundle之间比较独立
    > 解决思路
    1. 解决代码冗余 
        - 打包时 把不同入口间 共同引用的模块抽离出来 放到一个公共模块中 这样不管这个模块被多少入口引入 都只会在最终打包结果中出现一次
    2. 减小文件体积
        - 当把这些共同引用的模块都堆在一个模块中 这个文件可能异常巨大1不利于网络请求和页面加载 所以需要把这个公共模块再按照一定规则进一步拆分成几个模块文件--减小文件体积
7. sourcemap
    > source map 是将编译、打包、压缩后的代码映射回源代码的过程。打包压缩后的代码不具备良好的可读性，想要调试源码就需要 soucre map。
7. Webpack热更新(HMR Hot Module Replacement)原理
    - Webpack 的热更新又称热替换（Hot Module Replacement），缩写为 HMR。 这个机制可以做到不用刷新浏览器而将新变更的模块替换掉旧的模块。

    - HMR的核心就是客户端从服务端拉去更新后的文件，准确的说是 chunk diff (chunk 需要更新的部分)，实际上 WDS 与浏览器之间维护了一个 Websocket，当本地资源发生变化时，WDS 会向浏览器推送更新，并带上构建时的 hash，让客户端与上一次资源进行对比。
    - 客户端对比出差异后会向 WDS 发起 Ajax 请求来获取更改内容(文件列表、hash)，这样客户端就可以再借助这些信息继续向 WDS 发起 jsonp 请求获取该chunk的增量更新。

    - 后续的部分(拿到增量更新之后如何处理？哪些状态该保留？哪些又需要更新？)由 HotModulePlugin 来完成，提供了相关 API 以供开发者针对自身场景进行处理，像react-hot-loader 和 vue-loader 都是借助这些 API 实现 HMR。
8. 文件指纹是什么？怎么用？(打包后输出文件的后缀)
    > 文件指纹是打包后输出的文件名的后缀
    1. Hash：和整个项目的构建相关，只要项目文件有修改，整个项目构建的 hash 值就会更改
    2. Chunkhash：和 Webpack 打包的 chunk 有关，不同的 entry 会生出不同的 chunkhash
    3. Contenthash：根据文件内容来定义 hash，文件内容不变，则 contenthash 不变
    > JS文件指纹设置
    - 设置 output 的 filename，用 chunkhash。
    > CSS的文件指纹设置
    - 设置 MiniCssExtractPlugin 的 filename，使用 contenthash。
    > 图片的文件指纹设置
    - 设置file-loader的name，使用hash。
        占位符名称及含义
        ext     资源后缀名
        name    文件名称
        path    文件的相对路径
        folder  文件所在的文件夹
        contenthash   文件的内容hash，默认是md5生成
        hash         文件内容的hash，默认是md5生成
        emoji        一个随机的指代文件内容的emoj
9. webpack异步加载原理以及分包策略
    > Webpack异步加载原理
    - webpack ensure有人称它为异步加载/代码切割
    - 将js模块独立到处一个.js文件 
    - 使用这个模块时 再创建一个script对象 加入到document.head对象中
    - 浏览器会自动帮助发起请求 去请求这个js文件
    - 然后写回调函数 让请求到的js文件做一些业务操作
    > 例子
    - 需求:main.js依赖两个js文件 A.js是点击aBtn按钮后 才执行的逻辑 B.js是点击bBtn按钮后才执行的逻辑
    - require.ensure 
    - 这个函数是一个代码分离的分割线 表示回调里面的require是我们要进行分割出去的 即require('./A.js')
    - 把A.js分割出去 形成一个webpack打包的单独js文件
    ```
    document.getElementById('aBtn').onclick = function () {
    //异步加载A
    require.ensure([], function () {
        let A = require('./A.js')
        alert(A)
    })
    }
    ```
    1. 异步加载的代码 会保存在一个全局的webpackJsonp中
    2. webpackJsonp.push的值 两个参数分别为异步加载的文件中存放的需要安装的模块对应的id和异步加载的文件中存放的需要安装的模块列表
    3. 在满足某种条件下 会执行具体模块中的代码
    > import 按需加载
    - Webpack4官方文档提供了模块按需切割加载 配合ES6的按需加载import()方法 可以做到减少首页包提及 加快首页请求速度 只有其他模块 只有当需要的时候才会加载对应js
    - import()语法十分简单 该函数只接受一个参数 就是引用包的地址 并使用promise式的回调 获取加载的包 在代码中所有被import()的模块 都将达成一个单独的包 放在chunk存储的目录下 在浏览器运行到这一行代码时 会自动请求这个资源实现异步加载
    - 此打包出来的文件和webpack.ensure方法一样
    ```
    document.getElementById('aBtn').onclick = function () {
    //异步加载A
    import('./A').then((data) => {
        alert(data.A)
    })
    }
    ```
    > 分包策略
    - webpack打包过程中 经常出现vendor.js app.js单个文件较大的情况 
    - 这偏偏优势网页最先加载的文件 会使得加载时间过长 使得白屏事件过长 影响用户体验 需要有合理的分包策略
    1. CommonsChunkPlugin 
        - Webpack4.x版本之前 都是用CommonsChunkPlugin做分离
        - 可以把以下文件单独处理出来打包
        1. node_modules 文件夹下的 模块
        2. 被3个入口chunk共享的模块
    2. optimization.splitChunks
        - Webpack4最大的改动就是废除了CommonChunkPlugin引入了optimization.splitChunks
        - 如果mode是production webpack4就会自动开启Code Splitting
        - 内部代码分割策略
9. 对bundle体积监控分析
    1. VSCode 中有一个插件 Import Cost 可以帮助我们对引入模块的大小进行实时监测，还可以使用 webpack-bundle-analyzer 生成 bundle 的模块组成图，显示所占体积。
    2. bundlesize 工具包可以进行自动化资源体积监控。
10. gulp和Webpack基本区别
    > gulp - 基于流 任务的自动化构建工具
    - 可以进行JS HTML CSS IMG 的压缩打包 是自动化构建工具
    - 可以将多个JS文件/CSS文件压缩成一个文件 并压缩成一行 以此来减少文件体积 加快请求速度和减少请求次数
    - gulp有task定义处理事务 从而构建整体流程 它是基于流的自动化构建工具

    > Webpack - 基于入口 模块的自动化构建工具
    - 前端构建工具 实现了模块化开发和文件处理
    - 思想就是万物皆为模块 它能够将各个模块进行按需加载 不会导致加载了无用或冗余的代码
    - 所以它还有个名字叫前端模块化打包工具
    
    > 使用
        gulp.config.js中gulp的代码更加简单易懂
        需要压缩合并谁就用哪个方法
        webpack样式合并需要在node环境下下载插件才能使用
        gulp是基于流的打包工具
        需要谁引用谁 并且他的压缩简单明了 后期维护起来方便
        webpack可以将具体的模块进行划分
        需要哪个模块就加载哪个模块
        实现按需加载 并且排除掉冗余代码 减少代码体积
    > 总结
    1. gulp是基于流的自动化构建工具 但不包括模块化的功能 如果要用到的话 就要引入外部文件 如require.js等
    2. webpack是自动化模块打包工具 本身就具有模块化 并且也具有压缩合并的功能
10. Webpack与grunt gulp的不同
    - 三者都是前端构建工具，grunt和gulp在早期比较流行，现在webpack相对来说比较主流，不过一些轻量化的任务还是会用gulp来处理，比如单独打包CSS文件等。

    - grunt和gulp是基于任务和流（Task、Stream）的。类似jQuery，找到一个（或一类）文件，对其做一系列链式操作，更新流上的数据， 整条链式操作构成了一个任务，多个任务就构成了整个web的构建流程。

    - webpack是基于入口的。webpack会自动地递归解析入口所需要加载的所有资源文件，然后用不同的Loader来处理不同的文件，用Plugin来扩展webpack功能。
    
    > 小总：
    1. 构建思路
        - gulp和grunt需要开发者将整个前端构建过程拆分成多个`Task`，并合理控制所有`Task`的调用关系
        - webpack需要开发者找到入口，并需要清楚对于不同的资源应该使用什么Loader做何种解析和加工
    2. 知识背景
        - gulp更像后端开发者的思路，需要对于整个流程了如指掌 webpack更倾向于前端开发者的思路
10. 与webpack类似的工具
    > 同样是基于入口的打包工具
    1. webpack
        - 大型复杂的前端站点构建
    2. rollup
        - 基础库的打包 如Vue React
    3. parcel
        - 简单的实验性项目
    > 应用场景：
    1. webpack适用于大型复杂的前端站点构建
    2. rollup适用于基础库的打包，如vue、react
    3. parcel适用于简单的实验性项目，他可以满足低门槛的快速看到效
        由于parcel在打包过程中给出的调试信息十分有限，所以一旦打包出错难以调试，所以不建议复杂的项目使用parcel
11. webpack3和webpack4区别
    1. mode
        - webpack增加了一个mode配置 
        - 只有两种值development|production 对不同的环境会启用不同的配置
    2. CommonsChunkPlugin
        - CommonsChunkPlugin已被从webpack4中移除
        - 可使用optimization.splitChunks进行模块划分(提取公用代码)
        - PS 默认配置只会对异步请求的模块进行提取拆分
        - 如果要对entry进行拆分 需要设置opmization.splitChunks.chunks = 'all'
    3. webpack4使用MiniCssExtractPlugin取代ExtractTextWebpackPlugin。
    4. 代码分割
        - 使用动态import 而不是用system.import/require.ensure
    5. vue-loader
        - 使用vue-loader插件为.vue文件中的各部分使用相对应的loader如css-loader
    6. UglifyJsPlugin
        现在也不需要使用这个plugin了，只需要使用optimization.minimize为true就行，production mode下面自动为true
        optimization.minimizer可以配置你自己的压缩程序
12. Webpack看法
    1. Webpack是一个模块打包工具，可以使用Webpack管理模块依赖，并编译输出模块们所需的静态文件，它能很好的管理，打包Web开发中所用到的HTML  JS CSS以及各种静态文件(图片 字体等) 让开发过程更加高效 对于不同类型的资源 Webpack有对应的模块加载器 Webpack模块打包器会分析模块间的依赖关系 最后生成优化且合并后的静态资源

    > Webpack两大特色
    1. code splitting(可以自动完成)
    2. loader可以处理各种类型的静态文件，并且支持串联操作
    
    > Webpack是以conmmonJS的形式来书写脚本的 但对AMD/CMD的支持也很全面 方便旧项目进行代码迁移
    > Webpack具有requirejs和browserify的功能 但仍有很多自己的新特性
    1. 对CommonJS AMD ES6的语法做了兼容
    2. 对JS CSS图片等资源文件都支持打包
    3. 串联式模块加载器以及插件机制，让其具有更高的灵活性和扩展性 如提供对CoffeeScript ES6的支持
    4. 有独立的配置文件webpack.config.js
    5. 可以将代码分割成不同的chunk 实现按需加载 降低初始化时间
    6. 支持SourceUrls和SourceMaps易于调试
    7. 具有强大的Plugin接口 大多是内部插件 使用起来比较灵活
    8. Webpack使用异步IO并具有多级缓存 使得Webpack在很快并在增量编译上更快

    - Webpack是一个庞大的Nodejs应用 
    - 对Webpack使用者来说 它是一个简单强大的工具 
    - 对Webpack开发者来说 它是一个扩展性高的系统
    - Webpack之所以能成功 是因为它把复杂的实现隐藏起来 给用户暴露出的指示一个简单的工具 让用户能快速达成目的
    - 同时整体架构设计合理 扩展性高 开发扩展难度不高 通过社区补足了大量缺失的功能 让Webpack几乎能胜任任何场景

1. 文件监听原理
    - 在发现源码发生变化时，自动重新构建出新的输出文件。
    - Webpack开启监听模式，有两种方式：
    1. 启动 webpack 命令时，带上 --watch 
    2. 参数在配置 webpack.config.js 中设置 watch:true
    > 缺点：每次需要手动刷新浏览器
    > 原理：轮询判断文件的最后编辑时间是否变化，如果某个文件发生了变化，并不会立刻告诉监听者，而是先缓存起来，等 aggregateTimeout 后再执行。
2. 怎么配置单页应用？怎么配置多页应用？
    - 单页应用可以理解为webpack的标准模式，直接在entry中指定单页应用的入口即可，这里不再赘述
    - 多页应用的话，可以使用webpack的 AutoWebPlugin来完成简单自动化的构建，但是前提是项目的目录结构必须遵守他预设的规范。 
    > 多页应用中要注意的是：
    1. 每个页面都有公共的代码，可以将这些代码抽离出来，避免重复的加载。比如，每个页面都引用了同一套css样式表
    2. 随着业务的不断扩展，页面可能会不断的追加，所以一定要让入口的配置足够灵活，避免每次添加新页面还需要修改构建配置
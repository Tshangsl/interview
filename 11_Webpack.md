(Loader让Webpack拥有加载和解析非JS文件的能力/
Plugin扩展Webpack功能)
(webpack.config.js配置文件
mode模式/入口entry/输出output/loader/plugin)
(mode development/production)
(loader
css-loader 匹配到CSS文件时 要用css-loader对css样式进行处理)
(plugin
html-webpack-plugin 打包HTML文件
clean-webpack-plugin 
mini-css-extract-plugin)
(webpack打包工具 把所有文件看作是资源
根据它们依赖关系打包成一个最终文件)
1.loader的执行顺序为什么是后写的先执行 即从右往左
    webpack选择了compose方式 而不是pipe的方式
    函数组合
        是函数式编程中非常重要的思想
    两种形式
        1.pipe 从左向右组合函数
            在Uninx有pipeline概念 ps aux|grep node 这些都是从左向右的
        2.compose 从右向左组合函数
            函数式编程中有组合的概念 
            数学中常见的f(g(x))在函数式编程一般的实现方式是从右往左
    其实也可以实现从左往右
    只不过webpack选择了函数式编程的方式 所以loader顺序从右往左
    如果webpack选择pipe方式 写loader顺序就是从左往右
2.webpack配置优化
    1.优化loader配置
        1.include&exclude
        2.resolve.modules
        3.resolve.mainFields
            mainFields用于配置第三方模块使用那个入口文件 isomorphic-fetch当target为web或webworker时，值是["browswer","module","main"]当target为其他情况时，值是["module","main"] ```js resolve: {mainFields:['main'] }, ```
        4.resolve.alias
            resolve.alias配置项通过别名来把原导入路径映射成一个新的导入路径 此优化方法会影响使用Tree-Shaking去除无效代码
        5.resolve.extensions
            在导入语句没带文件后缀时，Webpack会自动带上后缀后去尝试询问文件是否存在 默认后缀是 extensions: ['.js', '.json']
                后缀列表尽可能小
                频率最高的往前方
                导出语句里尽可能带上后缀
        6.module.noParse
            module.noParse 配置项可以让 Webpack 忽略对部分没采用模块化的文件的递归解析处理
            被忽略掉的文件里不应该包含 import 、 require 、 define 等模块化语句
    2.DLL
        .dll为后缀的文件称为动态链接库 一个动态链接库中可以包含给其他模块调用的函数和数据
            把基础模块独立出来打包到单独的动态链接库
            当需要导入的模块在动态链接库中 模块不能再次被打包 而是动态链接库中获取dll-plugin
    3.HappyPack
        能让Webpack把任务分解给多个子进程去并发执行
        子进程狐狸玩之后再把结果发送给主进程
    4.ParallelUglifyPlugin
        ParallelUglifyPlugin可以把对JS文件的船形压缩变为开启多个子进程并行执行
    5.服务器自动刷新
        可以监听到本地源码文件发生变化时，自动重新构建出可运行的代码后再刷新浏览器
    6.区分环境
        在开发网页的时候，一般都会有多套运行环境，例如：
        在开发过程中方便开发调试的环境。
        发布到线上给用户使用的运行环境。
        环境区别
            线上的代码被压缩
            开发环境可能会打印只有开发者才能看到的日志
            开发环境和线上环境后端数据接口可能不同
    7.CDN叫内容分发网络，通过把资源部署到世界各地，用户在访问时按照就近原则从离用户最近的服务器获取资源，从而加速资源的获取速度。
        HTML文件不缓存，放在自己的服务器上，关闭自己服务器的缓存，静态资源的URL变成指向CDN服务器的地址
        静态的JavaScript、CSS、图片等文件开启CDN和缓存，并且文件名带上HASH值
        为了并行加载不阻塞，把不同的静态资源分配到不同的CDN服务器上
3.webpack执行过程
(初始化Compiler-开始编译(调用compiler的run方法)-确定入口-编译模板-完成编译模板-输出资源-输出完成)
    1.初始化compiler:new Compiler(config) config就是webpack.config.js文件
    2.开始编译 调用compiler的run方法开始编译
    3.确定入口 根据config的entry找到所有入口文件
    4.编译模板 从入口文件触发，调用所有配置的loader对模块进行编译，并且还要收集模块依赖的模块，不断递归进行编译（这个过程会用到使用AST收集依赖，AST就是抽象语法树，像什么eslint, sass, typescript等等都会用到AST，AST可以用@babel/parser插件来生成）
    5.完成模块编译：在经过第4步使用Loader编译完所有模块后，得到每个模块编译的内容和它们的依赖关系
    6.输出资源：根据入口和模块之间的依赖关系，组装成一个个包含多个模块的Chunk，再把每个chunk转换成单独的文件加入到输出列表。（这步是可以修改输出内容的最后机会）。
    7.输出完成：在确定好输出内容后，根据配置确定输出的路径和文件名，把文件内容写入到文件系统。
4.webpack打包优化
(优化图片/分离第三方包/分离CSS文件压缩CSS文件/压缩JS文件/压缩HTML)
    1.优化图片 使用url-loader优化 将小图片转化为base64压缩 防止小图片太多请求次数太多
    2.分离第三方包
        打包后的bundle.js文件夹较大 所以每次加载时 请求比较慢 所以有必要 将第三方包分离出来
        使用CommonsChunkPlugin插件进行配置
    3.分离CSS文件并压缩CSS文件(extract-text-webpack-plugin)
        使用extract-text-webpack-pulgin插件将CSS文件分离出来
        为了使项目加载时尽早优先加载CSS样式 也为了解决JS文件体积过大问题
    4.压缩JS文件(uglifyjs-webpack-plugin)
        使用uglifyjs-webpack-plugin将JS压缩 减少打包后的vendor.js bundle.js等JS文件大小
    5.压缩HTML(html-webpack-plugin)
        为减少打包后的文件体积 使性能更好 效率更高 提高加载速度 打包时有必要进行压缩
        使用html-webpack-plugin进行压缩
5.webpack分包策略
webpack ensure 有人称它为异步加载，也有人称为代码切割，
他其实就是将 js 模块给独立导出一个.js 文件，然后使用这个模块的时候，再创建一个 script 对象，
加入到 document.head 对象中，浏览器会自动帮我们发起请求，去请求这个 js 文件，然后写个回调函数，让请求到的 js 文件做一些业务操作。
0.webpack.config.js
    模式 mode
        development production(上线 压缩) 默认production
    入口 entry
        entry: {
            index:'./src/index.js',
            main:'./src/main.js'
        }
    输出 output
        output: {
            path: path.resolve(__dirname,'dist'),
            filename: "[name].js",
            publicPath: "http://localhost:8081/"
        },
    loader(在module里面配置loader)
    插件plugin
        html-webpack-plugin插件
        clean-webpack-plugin插件 解构的方式引入该插件
        mini-css-extract-plugin插件
    浏览器兼容性 browser compatibility
    环境 environment   
6.require.js实现原理
7.gulp和Webpack基本区别
    gulp
        可以进行JS HTML CSS IMG 的压缩打包 是自动化构建工具
        可以将多个JS文件/CSS文件压缩成一个文件 并压缩成一行 
        以此来减少文件体积 加快请求速度和减少请求次数
        并且gulp有task定义处理事务 从而构建整体流程 
        它是基于流的自动化构建工具
    Webpack
        前端构建工具 实现了模块化开发和文件处理
        他的思想就是万物皆为模块
        它能够将各个模块进行按需加载
        不会导致加载了无用或冗余的代码
        所以它还有个名字叫前端模块化打包工具
    使用
        gulp.config.js中gulp的代码更加简单易懂
        需要压缩合并谁就用哪个方法
        webpack样式合并需要在node环境下下载插件才能使用
        gulp是基于流的打包工具
        需要谁引用谁 并且他的压缩简单明了 后期维护起来方便
        webpack可以将具体的模块进行划分
        需要哪个模块就加载哪个模块
        实现按需加载 并且排除掉冗余代码 减少代码体积
    总结
        gulp是基于流的自动化构建工具
        但不包括模块化的功能
        如果要用到的话 就要引入外部文件 如require.js等
        webpack是自动化模块打包工具
        本身就具有模块化
        并且也具有压缩合并的功能
1.Webpack作用(模块打包/编译兼容/能力扩展)
    (模块打包/编译兼容/能力扩展)
    1.模块打包。
        可以将不同模块的文件打包整合在一起，并且保证它们之间的引用正确，执行有序。利用打包我们就可以在开发的时候根据我们自己的业务自由划分文件模块，保证项目结构的清晰和可读性。
    2.编译兼容。Loader文件转换
        在前端的“上古时期”，手写一堆浏览器兼容代码一直是令前端工程师头皮发麻的事情，而在今天这个问题被大大的弱化了，通过webpack的Loader机制，不仅仅可以帮助我们对代码做polyfill，还可以编译转换诸如.less, .vue, .jsx这类在浏览器无法识别的格式文件，让我们在开发的时候可以使用新特性和新语法做开发，提高开发效率。
    3.能力扩展。Plugin功能扩展
        通过webpack的Plugin机制，我们在实现模块化打包和编译兼容的基础上，可以进一步实现诸如按需加载，代码压缩等一系列功能，帮助我们进一步提高自动化程度，工程效率以及打包输出的质量。
2.模块打包运行原理
    1.webpack的整个打包流程：
        1、读取webpack的配置参数；
        2、启动webpack，创建Compiler对象并开始解析项目；
        3、从入口文件（entry）开始解析，并且找到其导入的依赖模块，递归遍历分析，形成依赖关系树；
            一个比较复杂的过程，在webpack源码中主要依赖于compiler和compilation两个核心对象实现。
            compiler:
                对象是一个全局单例，他负责把控整个webpack打包的构建流程。
            compilation:
                对象是每一次构建的上下文对象，它包含了当次构建所需要的所有信息，每次热更新和重新构建，compiler都会重新生成一个新的compilation对象，负责此次更新的构建过程。
            而每个模块间的依赖关系，则依赖于AST语法树。
            每个模块文件在通过Loader解析完成之后，会通过acorn库生成模块代码的AST语法树，通过语法树就可以分析这个模块是否还有依赖的模块，进而继续循环执行下一个模块的编译解析。
            最终Webpack打包出来的bundle文件是一个IIFE的执行函数。
        4、对不同文件类型的依赖模块文件使用对应的Loader进行编译，最终转为Javascript文件；
        5、整个过程中webpack会通过发布订阅模式，向外抛出一些hooks，而webpack的插件即可通过监听这些关键的事件节点，执行插件任务进而达到干预输出结果的目的。
    2.webpack4相比，webpack5打包出来的bundle做了相当的精简
        在上面的打包demo中，整个立即执行函数里边只有三个变量和一个函数方法，__webpack_modules__存放了编译后的各个文件模块的JS内容，__webpack_module_cache__ 用来做模块缓存，__webpack_require__是Webpack内部实现的一套依赖引入函数。最后一句则是代码运行的起点，从入口文件开始，启动整个项目。
        其中值得一提的是__webpack_require__模块引入函数，我们在模块化开发的时候，通常会使用ES Module或者CommonJS规范导出/引入依赖模块，webpack打包编译的时候，会统一替换成自己的__webpack_require__来实现模块的引入和导出，从而实现模块缓存机制，以及抹平不同模块规范之间的一些差异性。
        AST(抽象语法树 Abstract Syntax Tree)
3.webpack3和webpack4区别
    1.mode
        webpack增加了一个mode配置 
        只有两种值development|production
        对不同的环境会启用不同的配置
    2.CommonsChunkPlugin
        CommonsChunkPlugin已被从webpack4中移除
        可使用optimization.splitChunks进行模块划分(提取公用代码)
        需注意一个问题 默认配置只会对异步请求的模块进行提取拆分
        如果要对entry进行拆分
        需要设置opmization.splitChunks.chunks = 'all'
    3.webpack4使用MiniCssExtractPlugin取代ExtractTextWebpackPlugin。
    4.代码分割
        使用动态import 而不是用system.import/require.ensure
    5.vue-loader
        使用vue-loader插件为.vue文件中的各部分使用相对应的loader如css-loader
    6.UglifyJsPlugin
        现在也不需要使用这个plugin了，只需要使用optimization.minimize为true就行，production mode下面自动为true
        optimization.minimizer可以配置你自己的压缩程序
1.Webpack原理 loader plugin做什么的
webpack是一个模块打包器（module bundler），提供了一个核心，核心提供了很多开箱即用的功能。
同时它可以用loader和plugin来扩展。webpack本身结构精巧，基于tapable的插件架构，扩展性强，众多的loader或者plugin让webpack稍显复杂。
webpack常用配置包括：devtool、entry、 output、module、resolve、plugins、externals等，本文主要介绍下webpack常用的loader和plugin
webpack允许我们使用loader来处理文件，loader是一个导出为function的node模块。可以将匹配到的文件进行一次转换，同时loader可以链式传递。
1.有哪些常见的Loader？你用过哪些Loader？
raw-loader：加载文件原始内容（utf-8）
file-loader：把文件输出到一个文件夹中，在代码中通过相对 URL 去引用输出的文件 (处理图片和字体)
url-loader：与 file-loader 类似，区别是用户可以设置一个阈值，大于阈值会交给 file-loader 处理，小于阈值时返回文件 base64 形式编码 (处理图片和字体)
        source-map-loader：加载额外的 Source Map 文件，以方便断点调试
        svg-inline-loader：将压缩后的 SVG 内容注入代码中
        image-loader：加载并且压缩图片文件
        json-loader 加载 JSON 文件（默认包含）
        handlebars-loader: 将 Handlebars 模版编译成函数并返回
        babel-loader：把 ES6 转换成 ES5
        ts-loader: 将 TypeScript 转换成 JavaScript
        awesome-typescript-loader：将 TypeScript 转换成 JavaScript，性能优于 ts-loader
        sass-loader：将SCSS/SASS代码转换成CSS
        css-loader：加载 CSS，支持模块化、压缩、文件导入等特性
        style-loader：把 CSS 代码注入到 JavaScript 中，通过 DOM 操作去加载 CSS
        postcss-loader：扩展 CSS 语法，使用下一代 CSS，可以配合 autoprefixer 插件自动补齐 CSS3 前缀
        eslint-loader：通过 ESLint 检查 JavaScript 代码
        tslint-loader：通过 TSLint检查 TypeScript 代码
        mocha-loader：加载 Mocha 测试用例的代码
        coverjs-loader：计算测试的覆盖率
        vue-loader：加载 Vue.js 单文件组件
        i18n-loader: 国际化
        cache-loader: 可以在一些性能开销较大的 Loader 之前添加，目的是将结果缓存到磁盘里
2.有哪些常见的Plugin？你用过哪些Plugin？
        define-plugin：定义环境变量 (Webpack4 之后指定 mode 会自动配置)
        ignore-plugin：忽略部分文件
        html-webpack-plugin：简化 HTML 文件创建 (依赖于 html-loader)
        web-webpack-plugin：可方便地为单页应用输出 HTML，比 html-webpack-plugin 好用
        uglifyjs-webpack-plugin：不支持 ES6 压缩 (Webpack4 以前)
        terser-webpack-plugin: 支持压缩 ES6 (Webpack4)
        webpack-parallel-uglify-plugin: 多进程执行代码压缩，提升构建速度
        mini-css-extract-plugin: 分离样式文件，CSS 提取为独立文件，支持按需加载 (替代extract-text-webpack-plugin)
        serviceworker-webpack-plugin：为网页应用增加离线缓存功能
        clean-webpack-plugin: 目录清理
        ModuleConcatenationPlugin: 开启 Scope Hoisting
        speed-measure-webpack-plugin: 可以看到每个 Loader 和 Plugin 执行耗时 (整个打包耗时、每个 Plugin 和 Loader 耗时)
        webpack-bundle-analyzer: 可视化 Webpack 输出文件的体积 (业务组件、依赖第三方模块)
3.Loader和Plugin的区别(Loader让Webpack拥有加载和解析非JS文件的能力/Plugin扩展Webpack功能)
        Loader：(本质函数 让webpack拥有加载和解析非JavaScript文件的能力)
            1.本质是一个函数 在该函数中对接收到的内容进行转换 返回转换后的结果 因为Webpack只认识JavaScript 所以Loader就成了翻译官 对其他类型的资源进行转译的预处理工作
            直译为"加载器"。Webpack将一切文件视为模块，但是webpack原生是只能解析js文件，如果想将其他文件也打包的话，就会用到loader。 所以Loader的作用是让webpack拥有了加载和解析非JavaScript文件的能力。
            2.在modules.rules中配置 作为模块的解析规则 类型为数组 每一项都是一个Object 里面描述了对于什么类型的文件（test），使用什么加载(loader)和使用的参数（options）
        Plugin:(扩展Webpack功能)
            1.插件 基于事件流框架Tapable Plugin可以扩展Webpack功能 在Webpack运行的生命周期中会广播出许多事件 Plugin可以监听这些事件 在合适的实际通过Webpack提供的API改变输出结果
            2.在plugins中单独配置 类型为数组 每一项是一个plugin的实例 参数都通过构造函数传入
4.Webpack构建流程
        Webpack 的运行流程是一个串行的过程，从启动到结束会依次执行以下流程：
            1.初始化参数：从配置文件和 Shell 语句中读取与合并参数，得出最终的参数
            2.开始编译：用上一步得到的参数初始化 Compiler 对象，加载所有配置的插件，执行对象的 run 方法开始执行编译
            3.确定入口：根据配置中的 entry 找出所有的入口文件
            4.编译模块：从入口文件出发，调用所有配置的 Loader 对模块进行翻译，再找出该模块依赖的模块，再递归本步骤直到所有入口依赖的文件都经过了本步骤的处理
            5.完成模块编译：在经过第4步使用 Loader 翻译完所有模块后，得到了每个模块被翻译后的最终内容以及它们之间的依赖关系
            6.输出资源：根据入口和模块之间的依赖关系，组装成一个个包含多个模块的 Chunk，再把每个 Chunk 转换成一个单独的文件加入到输出列表，这步是可以修改输出内容的最后机会
            7.输出完成：在确定好输出内容后，根据配置确定输出的路径和文件名，把文件内容写入到文件系统
        在以上过程中，Webpack 会在特定的时间点广播出特定的事件，插件在监听到感兴趣的事件后会执行特定的逻辑，并且插件可以调用 Webpack 提供的 API 改变 Webpack 的运行结果。
        
        简单来说
        1.初始化：启动构建，读取与合并配置参数，加载 Plugin，实例化 Compiler
        2.编译：从 Entry 出发，针对每个 Module 串行调用对应的 Loader 去翻译文件的内容，再找到该 Module 依赖的 Module，递归地进行编译处理
        3.输出：将编译后的 Module 组合成 Chunk，将 Chunk 转换成文件，输出到文件系统中
5.使用webpack开发时，你用过哪些可以提高效率的插件？
        1.webpack-dashboard：可以更友好的展示相关打包信息。
        2.webpack-merge：提取公共配置，减少重复配置代码
        3.speed-measure-webpack-plugin：简称 SMP，分析出 Webpack 打包过程中 Loader 和 Plugin 的耗时，有助于找到构建过程中的性能瓶颈。
        4.size-plugin：监控资源体积变化，尽早发现问题
        5.HotModuleReplacementPlugin：模块热替换
6.source map是什么 生产环境怎么用
        source map 是将编译、打包、压缩后的代码映射回源代码的过程。打包压缩后的代码不具备良好的可读性，想要调试源码就需要 soucre map。
        map文件只要不打开开发者工具，浏览器是不会加载的。
        线上环境一般有三种处理方案：
            hidden-source-map：借助第三方错误监控平台 Sentry 使用
            nosources-source-map：只会显示具体行数以及查看源代码的错误栈。安全性比 sourcemap 高
            sourcemap：通过 nginx 设置将 .map 文件只对白名单开放(公司内网)
        避免在生产中使用 inline- 和 eval-，因为它们会增加 bundle 体积大小，并降低整体性能。
7.模块打包原理
        Webpack 实际上为每个模块创造了一个可以导出和导入的环境，本质上并没有修改 代码的执行逻辑，代码执行顺序与模块加载顺序也完全一致。
8.文件监听原理
        在发现源码发生变化时，自动重新构建出新的输出文件。
            Webpack开启监听模式，有两种方式：

                启动 webpack 命令时，带上 --watch 
                参数在配置 webpack.config.js 中设置 watch:true

            缺点：每次需要手动刷新浏览器
            原理：轮询判断文件的最后编辑时间是否变化，如果某个文件发生了变化，并不会立刻告诉监听者，而是先缓存起来，等 aggregateTimeout 后再执行。
9.Webpack热更新(HMR Hot Module Replacement)原理
        Webpack 的热更新又称热替换（Hot Module Replacement），缩写为 HMR。 这个机制可以做到不用刷新浏览器而将新变更的模块替换掉旧的模块。

        HMR的核心就是客户端从服务端拉去更新后的文件，准确的说是 chunk diff (chunk 需要更新的部分)，实际上 WDS 与浏览器之间维护了一个 Websocket，当本地资源发生变化时，WDS 会向浏览器推送更新，并带上构建时的 hash，让客户端与上一次资源进行对比。客户端对比出差异后会向 WDS 发起 Ajax 请求来获取更改内容(文件列表、hash)，这样客户端就可以再借助这些信息继续向 WDS 发起 jsonp 请求获取该chunk的增量更新。

        后续的部分(拿到增量更新之后如何处理？哪些状态该保留？哪些又需要更新？)由 HotModulePlugin 来完成，提供了相关 API 以供开发者针对自身场景进行处理，像react-hot-loader 和 vue-loader 都是借助这些 API 实现 HMR。
10.如何对bundle体积进行监控和分析？
        1.VSCode 中有一个插件 Import Cost 可以帮助我们对引入模块的大小进行实时监测，还可以使用 webpack-bundle-analyzer 生成 bundle 的模块组成图，显示所占体积。
        2.bundlesize 工具包可以进行自动化资源体积监控。
11.文件指纹是什么？怎么用？(打包后输出文件的后缀)
        文件指纹是打包后输出的文件名的后缀
            1.Hash：和整个项目的构建相关，只要项目文件有修改，整个项目构建的 hash 值就会更改
            2.Chunkhash：和 Webpack 打包的 chunk 有关，不同的 entry 会生出不同的 chunkhash
            3.Contenthash：根据文件内容来定义 hash，文件内容不变，则 contenthash 不变
        JS文件指纹设置
            设置 output 的 filename，用 chunkhash。
        CSS的文件指纹设置
            设置 MiniCssExtractPlugin 的 filename，使用 contenthash。
        图片的文件指纹设置
            设置file-loader的name，使用hash。
                占位符名称及含义
                ext     资源后缀名
                name    文件名称
                path    文件的相对路径
                folder  文件所在的文件夹
                contenthash   文件的内容hash，默认是md5生成
                hash         文件内容的hash，默认是md5生成
                emoji        一个随机的指代文件内容的emoj
12.在实际工程中，配置文件上百行乃是常事，如何保证各个loader按照预想方式工作？
        可以使用 enforce 强制执行 loader 的作用顺序，pre 代表在所有正常 loader 之前执行，post 是所有 loader 之后执行。(inline 官方不推荐使用)
13.如何优化Webpack构建速度
        1.使用高版本的Webpack和Node.js
        2.多进程/多实例构建:HappyPack(不维护了)、thread-loader
        3.压缩代码
        4.图片压缩
        5.缩小打包作用域
        6.提取页面公共资源
        7.DLL
        8.充分利用缓存提升二次构建速度
        9.Tree shaking
        10.Scope hoisting
        11.动态Polyfill
14.代码分割，那代码分割的本质是什么？有什么意义呢？
        代码分割的本质其实就是在源代码直接上线和打包成唯一脚本
        main.bundle.js这两种极端方案之间的一种更适合实际场景的中间状态。
        「用可接受的服务器性能压力增加来换取更好的用户体验。」
            源代码直接上线：虽然过程可控，但是http请求多，性能开销大。
            打包成唯一脚本：一把梭完自己爽，服务器压力小，但是页面空白期长，用户体验不好。
15.Webpack与grunt gulp的不同
        三者都是前端构建工具，grunt和gulp在早期比较流行，现在webpack相对来说比较主流，不过一些轻量化的任务还是会用gulp来处理，比如单独打包CSS文件等。

        grunt和gulp是基于任务和流（Task、Stream）的。类似jQuery，找到一个（或一类）文件，对其做一系列链式操作，更新流上的数据， 整条链式操作构成了一个任务，多个任务就构成了整个web的构建流程。

        webpack是基于入口的。webpack会自动地递归解析入口所需要加载的所有资源文件，然后用不同的Loader来处理不同的文件，用Plugin来扩展webpack功能。
        总结：
            1.构建思路
                gulp和grunt需要开发者将整个前端构建过程拆分成多个`Task`，并合理控制所有`Task`的调用关系
                webpack需要开发者找到入口，并需要清楚对于不同的资源应该使用什么Loader做何种解析和加工
            2.对于知识背景来说
                gulp更像后端开发者的思路，需要对于整个流程了如指掌 webpack更倾向于前端开发者的思路
16.与webpack类似的工具还有哪些？谈谈你为什么最终选择（或放弃）使用webpack？
        同样是基于入口的打包工具
            1.webpack
            2.rollup
            3.parcel
        应用场景：
            1.webpack适用于大型复杂的前端站点构建
            2.rollup适用于基础库的打包，如vue、react
            3.parcel适用于简单的实验性项目，他可以满足低门槛的快速看到效
                由于parcel在打包过程中给出的调试信息十分有限，所以一旦打包出错难以调试，所以不建议复杂的项目使用parcel
17.是否写过Loader和Plugin？描述一下编写loader或plugin的思路？
        Loader像一个"翻译官"把读到的源文件内容转义成新的文件内容，并且每个Loader通过链式操作，将源文件一步步翻译成想要的样子。编写Loader时要遵循单一原则，每个Loader只做一种"转义"工作。 每个Loader的拿到的是源文件内容（source），可以通过返回值的方式将处理后的内容输出，也可以调用this.callback()方法，将内容返回给webpack。 还可以通过 this.async()生成一个callback函数，再用这个callback将处理后的内容输出出去。 此外webpack还为开发者准备了开发loader的工具函数集——loader-utils。相对于Loader而言，Plugin的编写就灵活了许多。 webpack在运行的生命周期中会广播出许多事件，Plugin 可以监听这些事件，在合适的时机通过 Webpack 提供的 API 改变输出结果。
18.怎么配置单页应用？怎么配置多页应用？
        单页应用可以理解为webpack的标准模式，直接在entry中指定单页应用的入口即可，这里不再赘述
        多页应用的话，可以使用webpack的 AutoWebPlugin来完成简单自动化的构建，但是前提是项目的目录结构必须遵守他预设的规范。 多页应用中要注意的是：
            1.每个页面都有公共的代码，可以将这些代码抽离出来，避免重复的加载。比如，每个页面都引用了同一套css样式表
            2.随着业务的不断扩展，页面可能会不断的追加，所以一定要让入口的配置足够灵活，避免每次添加新页面还需要修改构建配置
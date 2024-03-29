1. Babel(一个JS编辑器/一个工具链/将ECMAScript 2015+版本的代码转换为向后兼容的JavaScript语法)
    > Babel
    - 一个JS编译器 Babel是一个工具链 主要用于将ES2015+版本的代码转换为向后兼容的JS语法 以便能够运行在当前和旧版本的浏览器或其他环境中 通过语法转换器来支持新版本的JS
    - Babel原理 (解析 代码->AST抽象语法树/转换 AST->新的AST/生成 新的AST->代码)
    > 原理：
    - 大多数JavaScript Parser遵循estree规范 Babel最初基于acorn项目(轻量级现代JavaScript解析器)Babel大概分为三大部分
    1. 解析 将代码转换成AST
        - 将代码解析成抽象语法树AST 每个JS引擎(比如Chrome浏览器中的V8引擎) 都有自己的AST解析器
        - 而Babel是通过Babylon实现的 在解析过程中有两个阶段
        1. 词法分析 把字符串形式的代码转换为令牌(tokens)流 令牌类似于AST中节点 
        2. 语法分析 把一个令牌流转换成AST的形式 同时这个阶段会把令牌中的信息转换成AST的表述结构
    2. 转换 访问AST的节点进行变换操作生产新的AST
        - Babel接收得到的AST并通过babel-traverse对其进行深度优先遍历 在此过程中对节点进行添加 更新及移除操作 
        - 这也是babel插件介入工作的部分
        - Taro就是利用 babel 完成的小程序语法转换
    3. 生成 以新的AST为基础生成代码
        - 将经过转换的AST通过babel-gegerator再转换成JS代码 过程就是深度优先遍历整个AST 然后构建可以表示转换后代码的字符串
    > 扩展AST：抽象语法树(AST)->转换->编译
    - 抽象语法树中不同层级有相似的结构
    > 像这样的结构叫做节点(Node) 一个AST是由多个或单个这样的节点组成 节点内部可以有多个这样的子节点 构成一颗语法树 这样就可以描述用于静态分析的程序语法
    - 节点中的type字段表示节点的类型 每种节点类型会有一些附加的属性用于进一步描述该节点类型

    - 要了解Babel的工作原理 首先要了解抽象语法树 因为Babel插件就是作用于抽象语法树
    1. 编写的代码在编译阶段解析成抽象语法树AST
    2. 经过一系列的遍历和转换 然后再将转换后的抽象语法树生成为常规的js代码
2. Babel插件
    > 两种
    1. 语法插件 解析阶段辅助解析器Babylon工作
    2. 转译插件 转换阶段参与进行代码的转译工作 这是使用Babel最常见也是最本质的需求
3. Visitor
4. Path
5. State
6. Scope
7. Babel工作集
    - Babel实际上是一组模块的集合
    1. Babylon
    2. babel-traverse
    3. babel-types
2. Babel使用方式
    1. 使用单体文件
    2. 命令行(babel-cli)
    3. 构建工具如webpack中的babel-loader插件 -前端最常用

    1. @babel/core babel核心库
    2. @babel/present-env 取代了es2015 es2016 es2017 通过配置浏览器版本的形式 将编译的主动权交给插件
    3. babel-loader webpack的loader插件 用于编译代码 转化成浏览器读得懂的代码



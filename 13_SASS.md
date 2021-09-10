0. css预处理技术
    - 定义了一门新的语言 基本思想是 用一门专门的编程语言 为css增加一些编程的特性 将css作为目标生成文件 然后开发者就只要使用这种语言进行编码工作
    > css预处理技术的种类
    1. Sass(Scss)
    2. Less
    3. Stylus
    4. Turbine
    5. Switch CSS
    6. CSS Cacheer
    7. DT CSS
1. sass
    1. sass扩展了css3 增加了规则 变量 混入 选择器 继承等特性 sass生成良好的格式化的css代码 易于组件和维护
    2. sass是对css3(层叠样式表)地语法的一种扩充 它可以使用巢状 混入 选择子继承等功 可以更有效有弹性的写出stylesheet sass最后还是会编译出合法的css让浏览可以使用
    - 它本身的语法不能让浏览器识别 它不是标准的css格式 在他
2. Sass/Scss/Less区别
    1. 编译环境不一样
    - Sass的安装需要Ruby环境 是在服务端处理的
    - Less需要引入less.js来处理Less代码输出css到浏览器 也可以在开发环节使用Less 然后编译成css文件 直接放到项目中
    2. 变量符不同 Less是@ Scss是$ 且变量的作用域也不一样
    3. 输出设置 Less没有输出设置 Sass提供四种输出选项 
        1. nested 默认
            - 嵌套缩进的css代码
        2. compact 
            - 简介格式的css代码
        3. compressed 
            - 压缩后的css代码
        4. expanded
            - 展开的多行css代码
    4. Sass支持条件语句 可以使用if{}else{} for循环等 less不支持
    5. 引用外部CSS文件
        - Scss引用的外部文件命名必须以_开头
        - 文件名如果以下划线_开头 Sass会认为该文件是一个引用文件 不会将其编译成css文件
        - Less引用外部文件和css中的@import没什么差异
    6. Sass和Less工具库不同
        1. Sass有工具库Compass Sass和Compass关系有点像js和jquery关系 Compass是Sass工具库 在它基础上 封装了一系列有用的模块和模版 补充强化了Sass的功能
        2. Less有UI组件库Bootstrap Bootstrap是web前端开发中一个比较有名的前端UI组件库 Bootstrap样式文件部分源码就是采用Less语法编写
3. SCSS SASS
    > Sass是最早的CSS预处理器语言 采用Ruby语言编写
    - SCSS和SASS其实是一种东西 平时都称之为Sass 两者之间不同之处有以下两点
    1. 文件扩展名不同 sass以.sass后缀为扩展名 scss以.scss后缀为扩展名
    2. 语法书写方式不同 
        - Sass是以严格的缩进式语法规则来书写 不带大括号({})和分号(?)
            - Sass中变异出来的样式风格也可以按不同的样式风格显示
        - Scss语法与CSS语法书写方式非常类似 把.css文件直接改成.scss即可使用
4. Sass基本功能
    1. 文件的引入
    2. 变量的使用和选择器嵌套
    3. 输出格式
    4. 注释
        - css中只有/**/注释方式
        - sass中有//和/**/注释
        - sass中使用//注释 注释内容不会在css中显示
        - /**/注释内容会在css中显示
    5. &符号 对当前元素的引用
        - 引用父选择器
    6. 属性嵌套
    7. 特殊变量
        - 复杂的选择器定义成一个变量
        - 在三个地方都可以使用
        - 属性的值
        - 属性
        - 选择器
        - 注释中也可以使用
    8. 默认变量

    三种变量 普通变量 默认变量 特殊变量
    9. mixin混合 可传参 可设置默认值
    一旦变量设置默认值 则所有的变量都要设置默认值
    传实参的时候 参数不传完全 则参数需指定
    后面的的参数要指定
    定义
    @mixnin name($color:#ccc,$back){}
    引用
    Selector{
        @include name(#fff,#ccc);
    }
    10. 继承
    @extend #div1
    11. 数字
    + - *
    /：1.()2.除数不能有单位
    百分比：percentage
    12. 字符串运算
    拼字符串
    content下面的方法
    转换大小写 
    to-upper-case
    to-lower-case
    返回字符串长度
    str-length

    str-index
    13. 颜色
    color下面的方法
    14. 列表
    15. map键值对的方式
    16. 布尔
    17. interpolation
    18. Data_type
    sass -i
    type-of()
    数字 
    字符串 分有引号的字符串 和没有引号的字符串
    颜色 布尔值 空值 值列表 
    map +()
    19. 控制命令
    if else if else
    each用来循环列表
    while
    20. 函数
    @function
    @warn
    @error
    定义变量的方式都一样
    引用的方式不一样
    css中索引都是从1开始数的
    js中索引从0开始

sass编译成css
文件编译
sass<要编译的Sass文件路径>/style.scss:<要输出css文件路径>/style.css预处理器为css增加了一些编程的特性
实时
sass--watch<要编译的Sass文件路径>/style.scss:<要输出的css文件路径>/style.css预处理器为css增加了一些编程的特性
sass --watch style:css

编译
sass 文件目录


sass可以定义变量
$变量名:;(不用加"")
$color:#fff;
#container{
    background-color:$color;
}

-w是--watch的缩写


输出格式的转化
sass src:dist -w --style expanded
sass src:dist -w


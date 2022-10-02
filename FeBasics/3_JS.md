0. JS 
- 与大多数编程语言不同 JS没有输入或输出的概念 它是一个在宿主环境(host environment)下运行的脚本语言 任何与外界沟通的机制都是宿主环境提供的
- 浏览器是最常见的宿主环境 但在非常多的其他程序中也包含JS解释器 如Adobe Acrobat,Adobe Photoshop SVG图像 Yahoo!的Widget引擎 Node.js之类的服务端环境 NoSQL数据库(如开源的Apache CouchDB)嵌入式计算机 以及包括GNOME(GNU/Linux上最流行地GUI之一)在内的桌面环境等等
> 类型
1. 数字
    - 根据语言规范 JS采用遵循IEEE754标准的双精度64位格式(double-precision 64-bit format IEEE 754 values)表示数字 
    - 内置函数 
    1. parseInt() 
    - 将字符串转换为整型 该函数的第二个可选参数表示字符串所表示的数字的基(进制)
    2. parseFloat()
    - 解析浮点数字符串 与parseInt()不同的是 parseFloat()只应用于解析十进制数字
    - 一元运算符+也可以把数字字符串转换为数值
    - 两个特殊值
    1. Infinity(正无穷)
    2. -Infinity(负无穷)
2. 字符串
    - JS中的字符串是一串Unicode字符序列 它们是一串UTF-16编码单元的序列 每一个编码单元由一个16位二进制数表示 每一个Unicode字符由一个或两个编码单元来表示
3. 布尔类型
    - 根据具体需要 JS按照如下规则将变量转换成布尔类型
    1. false 0 空字符串"" NaN null undefined 被转换为false
    2. 所有其他值被转换为true
4. 对象
    - JS中的对象 Object 可以简单理解为“名称-值”对(而不是键值对：现在ES2015的映射表(Map)比对象更接近键值对)
    - JS中的一切(除了核心类型 core object)都是对象 所以JS程序必然与大量的散列表查找操作有着千丝万缕的联系 而散列表擅长的正是高速查找
    - "名称"部分是一个JS字符串 值部分可以是任何JS的数据类型-包括对象 这使得用户可以根据具体需求 创建出相当复杂的数据结构
5. 数组
    - JS中的数组是一种特殊的对象 它的工作原理与普通对象类似(以数字为属性名 但只能通过[]来访问) 但数组还有一个特殊的属性 length(长度)属性 这个属性的值通常比数组最大索引大1







0. JS
    1. JS是一种具有函数优先的轻量级 解释型 即时编译型的编译语言 
    2. 虽然它是作为Web页面的脚本语言而出名的 但是它也被用到很多非浏览器环境中 
    3. JavaScript基于原型编程多范式的动态脚本语言 并且支持面向对象命令式和声明式(如函数式编程)风格
    - JavaScript基本语法借鉴C
    - 数据类型内存管理借鉴Java
    - 函数式编程借鉴Scheme(函数是第一等公民)
    - 原型继承部分借鉴Self(基于原型prototype的继承机制)
        1. JS是一种直译式脚本语言 一种动态类型 弱类型 基于原型的语言 内置支持类型 
        2. 它的解释器被称为JS引擎 为浏览器的一部分 广泛用于客户端的脚本语言
        3. 最早是在HTML网页上使用 用来给HTML网页增加动态功能
        4. JS语言是弱语言类型 在项目开发中 当我们随意更改某个变量的数据类型后 有可能会导致其他引用这个变量的方法中报错等
1. JS有哪些数据类型，数据类型之间有哪些不同，判断数据类型的方法
    > 基本数据类型:String Number Boolean Undefined Null Symbol(ES6新增 表示独一无二的值) BigInt(ES2020即ES11新增)
    > BigInt
    1. BigInt使用数字字面量加n表示支持二进制八进制十六进制形式 对于八进制 只支持新写法0o064n 不支持旧写法0640 BigInt不支持科学记数法
    2. 转换为字符串
    3. 零值处理 因为BigInt表示的是整数 所以只存在一个0(无正0负0区分)
    4. 与Number比较 BigInt只是函数没有构造器 因此不能使用new来创建BigInt的实例
    5. 类型转换 BigInt不能隐式转换为Number 所以在接受Number为参数的运算中 将抛出TypeError异常
    > Symbol
    - Symbol函数的参数只是表示当前Symbol值的描述 
    - 相同参数的Symbol函数依然是不同的
    - 反复使用一个Symbol值 可以通过Symbol.for()方法来创建
        - Symbol.for() 返回给定的key找到的symbol 否则就是返回新创建的symbol
    - Symbol(符号)这是一个标准函数而不是一个对象构造器 标签并不能影响符号的值 只是便于调试
    - 作用:(创建独一无二的值 做唯一key用于缓存等场景/不能被枚举创建类对象的私有变量/Symbol.iterator普通对象变成可迭代对象/做对象属性 阻止对象名冲突/
            symbol属性不能被枚举 用于创建类对象的私有变量/
            实现Symbol.iterator迭代器 让普通对象变成可迭代对象)
            (Symbol.for('xx') 获取全局的Symbol值/
            Symbol.toStringTag() 重置对象属性)/
            Symbol诞生前 对象的键key只能是字符串)
        1. 用于创建独一无二的值 可做唯一key用于缓存等场景
        2. 用于创建类的私有变量 利用symbol属性不能被枚举的特性声明作为私有属性
            符号不会被for in枚举/会被Object.keys/Object.getOwnPropertNames()/JSON.stringfy()忽略
        3. 实现Symbol.iterator迭代器 让普通对象变为可迭代对象
            Symbol.iterator是一个有名的符号 被用来给对象添加一个特殊方法 使得对象可以被迭代
        4. 使用Symbol.for('xxx')获取全局的symbol值
        5. 用来重置对象的属性 比如Symbol.toStringTag
    > 定义：symbols 是一种无法被重建的基本类型。这时 symbols 有点类似与对象创建的实例互相不相等的情况，但同时 symbols 又是一种无法被改变的基本类型数据
    
    Symbol作为对象的属性：
    1. Object.keys() 并没有返回 symbols，这是为了向后兼容性的考虑。老代码不兼容 symbols，因此古老的 Object.keys() 不应该返回 symbols。
    2. 适合作为对象的私有属性
    3. 阻止对象属性名冲突 通过使用symbols 不同的库在初始化的时候生成其所需要的symbol 然后就可以在对象上任意赋值

    > 引用数据类型:Object(对象Object 数组Array 函数Function) 
    
    区别：
    1. 两者作为函数的参数进行传递时：
        - 基本数据类型传入的是数据的副本 原数据的更改不会影响传入后的数据。
        - 引用数据类型传入的是数据的引用地址 原数据的更改会影响传入后的数据。
    2. 两者在内存中的存储位置：
        - 基本数据类型存储在栈中。
        - 引用数据类型在栈中存储了指针，该指针指向的数据实体存储在堆中。
    
    > 判断一个变量是基本数据类型还是引用数据类型
    - (typeof/A instanceof B/B.constructor == A/Object.prototype.toString.call)
    1. typeof运算符判断类型(基本数据类型)
        > typeof(null) Object;
        typeof(NaN) Number
        null == undefined  返回true，因为undefined派生自null;
        null === undefined  返回false
        typeof方法判断null/array/object/函数实例(new+函数)时得到的都是object
    2. A instanceof B(引用数据类型) -  可以用来监测对象和数组 不能用来检测null和undefined
        > 判断一个对象是否为一个类的实例 用来判断对象 可以区分对象和数组 可以用来判断A是否为B的实例 它不能检测 null 和 undefined；
        obj2必须为对象 否则会报错 返回值是布尔值 可以对不同的对象实例进行判断 判断方法是根据对象的原型链依次向下查询
        如果B的原型属性存在在A的原型链上 值为true
    3. B.constructor == A(基本/引用数据类型)
        > 可以判断A是否为B的原型
        但constructor检测 
        可以区分对象和数组
        Object与instanceof不一样
        还可以处理基本数据类型的检测。
    4. Object.prototype.toString.call() 
        > 最准确最常用的方式
        原理
            当调用时 取值内部的[[Class]]属性值
            拼接成'[object'+[[Class]]+']'
            这样的字符串并返回
            使用call方法获取任何值的数据类型
    
    > 判断引用数据类型是数组还是对象
    (B.constructor == A/A instanceof B/Object.prototype.toString.call)
    typeOf无法判断 返回都是Object
    1. constructor(Array Object)
        - constructor属性返回对创建此对象的数组函数的引用 原本就是用来进行对象类型判断
        - 每一个对象实例都可以通过constructor对象访问它的构造函数 打印出来一个是Array()一个是Object()
    2. instanceof
        -  根据返回的boolean值判断 A原型链上有没有B原型
        - obj instanceOf Object =>true
        - obj instanceOf Array =>false
    3. toString()([Object Array][Object Object])
        > Object.prototype下的toString方法
        Object.prototype.toString.call([]) [Object Array]
        Object.prototype.toString.call({}) [Object Object]
    
    > JS底层如何存储数据的类型信息/
    - 在变量的机器码的低位1-3存储其类型信息
        - 000 对象
        - 010 浮点数
        - 100 字符串
        - 110 布尔
        - 1   整数 
    - null&undefined这两个值信息存储有点特殊
        - null 所有机器码均为0
        - undefined 用-2^30整数表示
    - typeof判断null时出现问题
        - 由于null的所有机器码均为0 因此被当作对象看待
    - instanceof判断null
        - null直接被判断为不是object 这也是JS历史遗留bug   
    > 使用typeof(bar) === object风险
    - PS：typeof主要用于检测基本数据类型 尽量不要用来检测复杂数据类型
    - typeof检测null和数组时结果也是object 所以使用typeof(bar) === 'object'来确定bar是否为对象是不准确的
    - 改进 (bar!==null)&&(typeof bar === 'object')&&(toString.call(bar)!==[Object Array])
2. 变量提升函数提升
    > (函数提升优先于变量提升) 函数提升只会提升函数声明 不会提升函数表达式
    > 引擎会在解释JS代码之前首先对其进行预编译 编译过程中的一部分工作就是找到所有声明 
    并用合适的作用域将他们关联起来 这也是词法作用域核心内容
    
    > 预编译
    - JS引擎会在正式执行代码之前进行一次”预编译“ 内存中开辟一些空间，存放一些变量和函数。
    
    > 提升规则
    1. 所有的声明都会提升到作用域的最顶上去。
    2. 函数声明的优先级高于变量声明的优先级，并且函数声明和函数定义的部分一起被提升。函数提升只会提升函数声明 不会提升函数表达式 如果在同一个作用域中存在多个同名函数声明 后面出现的将会覆盖前面的函数声明

    > JS并不存在真正的预编译 
    - var与function的提升实际是在语法分析阶段就处理好的 
    - JS预编译是以一个脚本文件为块的 
    - 一个脚本文件进行一次预编译 而不是全文编译完成再进行预编译

    > PS:开发过程中 不应使用这一特性 要规范代码 做到可维护性和可读性 
    无论是在变量还是函数 都必须先声明后使用 开发中应该使用let约束变量提升
3. JS基本包装类
    - (调用方法的过程是在后台偷偷进行的)
    - (引用数据类型/基本包装类型区别 生命周期不同)
    - (基本包装对象的原型下面添加，每个对象都有原型。)
    
    > 在基本数据类型中有3个特殊的存在：
        String Number Boolean
    - 这三个基本类型都有自己对应的包装对象。包装对象，其实就是对象，有相应的属性和方法。调用方法的过程，是在后台偷偷发生的，所以我们称作为基本包装类型。
    - 引用类型和基本包装对象区别：
        - 生存期
    - 引用类型所创建的对象，在执行的期间一直在内存中 基本包装对象只是存在了一瞬间。 我们无法直接给基本类型添加方法：
    - 给基本类型添加方法或者属性:
        - 在基本包装对象的原型下面添加，每个对象都有原型。
    
    > JS内部类
    - JS本身提供一些可以直接使用的类 这种类就是内部类
    
    > 主要有8个内部类
    - Object/Array/Math/RegExp/Date/Number/Boolean/String
    
    > 使用方式上把JS内部类分为两类
    1. 动态类  如Date/String/Array
        使用 var 对象 = new 动态类() 对象.属性|方法
    2. 静态类  如Math
        使用 类名.属性|方法 
    
    > JS内置对象
    - JS中内置了17个对象 常用的是Array对象 Date对象 正则表达式对象 String对象 Global对象
    
    > JS内置函数
    浏览器内核自带 不用任何函数库引入就可直接使用的函数
    JS内置函数一共可分为五类
    1. 常规函数
    2. 数组函数
    3. 日期函数
    4. 数学函数
    5. 字符串函数
4. JavaScript规范
    1. 不在同一行声明多个变量
    2. 使用===/!==比较
    3. 使用字面量的方式来创建对象 数组 替代new Array这种形式
    4. 不使用全局函数
    5. switch语句必须要带default分支
    6. 函数不应该有的时候有return，有的时候没有return
    7. fon-in循环中的变量 用var关键字说明作用域 防止变量污染
    8. 变量的声明遵循驼峰命名法 用let替代val 声明构造函数时首字母大写 定义常量的时候尽量用大写字母 用_分割
    9. 三元表达式可以替代if语句
    10. &&和||是可以短路的，使用&&时如果前面一个值是错的，那么后面的值不用判断，使用||时，如果前面一个值是对的，那么后面的值不用判断
    11. 比较数据类型以下6种类情况是false，其他都是true------false、""、0、null、undefined、NaN
    12. 数据类型检测用typeof，对象类型检测用instanceof
    13. 异步加载第三方的内容
    14. 单行注释//，多行注释/**/
    15. 使用命名空间解决变量名冲突
    16. 多人协作开发，新建一个js文件，const声明常量，在js文件中引用，用常量名替代方法名，这样做可以防止命名冲突
5. JS中arguments
    > 函数调用时 浏览器每次都会传递两个隐式参数
    1. 函数的上下文对象this
    2. 封装实参的类数组对象arguments
    
    > JS开发者定义的函数可以接受任意个数的参数 (Netscape的文档 最多可接收255个) 遗漏参数undefined 多余参数忽略
    
    > 数组特性
    - arguments存储实参 有序 具备与数组相同访问性质及方式且拥有数组长度length arguments[0] arguments.length 除此之外没有任何Array属性
    > 对象特性
    - 是特殊的对象 类数组对象 自己的callee属性 返回正在被执行的Function对象
    
    > 修改 正常模式下 arguments对象允许在运行时修改的
    
    > 应用(查看实参个数/匿名函数实现递归/遍历参数/模拟函数重载)
    1. 借用arguments.length查看实参和形参的个数是否一致
    2. 借用arguments.callee来让匿名函数实现递归:
    3. 遍历参数求和或者求最大值
    4. 模拟函数重载    
    
    > JS中的类数组对象：
    1. arguments
    2. NodeList
    3. HTMLCollection a._proto_
    4. jQuery

    > 转换成真实数组
    1. ES6 Array.from()
    2. ES6 ...扩展运算符 只作用于iterator对象 即拥有Symbol(Symbol.iterator)属性值 可以使用for of循环迭代
    3. ES5 Array.prototype.slice.call(arguments)/[].slice.call(Array)
        - 通过call方法使slice方法this指向arguments 使其拥有slice方法 slice不传参默认 0-length-1
        - Array.prototype.slice.call(arguments)能将具有length属性的对象转成数组
        - 除了IE下的节点集合 因IE下的DOM对象是以COM对象的形式实现的 JS对象与COM对象不能进行转换
        - 由于借用Array API 一切以数组为输入 以数组为输出的API都可以用来做数组转换
            1. Array (借用 arguments)
            2. Array.prototype.concat (借用 arguments)
            3. Array.prototype.slice (借用 this)
            4. Array.prototype.map (借用 this)
            5. Array.prototype.filter (借用 this)
    > 总结：
    1. arguments是一个类数组对象，用来存储实参；具有length、callee等属性；可以用arguments[0]这个形式访问实参；可以转换为真实数组。
    2. arguments和函数相关联，其只有在函数执行时可用，不能显式创建。
    3. arguments可以用来遍历参数；通过callee实现递归；也可以模拟函数重载。
6. JS中的iterator(迭代器)
    - (Array/Object/String/Set/Map 可迭代数据类型的迭代方法也是各式各样的)
    - (ES6所有可迭代对象的迭代器放在对象原型的Symbol.iterator属性下 拥有迭代器的对象都可以使用for of进行迭代)
    > 背景:
    - JavaScript中存在Array Object String以及ES6引入的Set和Map等可迭代的数据结构 这些可迭代的数据结构的迭代方法也是各式各样的
    - 随着ES6迭代器的推出 可以用一个方法来统一数据迭代的江湖 ECMAScript 2015的补充 不是新的内置实现或语法 而是协议 这些协议可以被任何遵守某些约定的对象来实现
    > 两个协议：
    1. 可迭代协议
    2. 迭代器协议
    - 使用方法：
        - ES6中所有可迭代对象的迭代器 存放在对象的Symbol.iterator属性下 拥有迭代器的对象都可以用for of进行迭代
    - 定义：
        - 迭代器是一种接口 为各种不同的数据结构提供统一的访问机制 任何数据结构只要部署iterator接口就可以完成遍历(迭代)操作
    - 简单实现：
        - 迭代器利用闭包保护保存的特性，实现一个封闭的作用域，并提供一个迭代方法通过修改索引的方式，来读取数据以及状态。
7. 如何理解JS中的this关键字，this的指向以及如何改变this的指向
    > this 函数上下文对象 表示当前对象 指向据调用上下文(context)决定 默认指向window对象即全局对象
    > 全局环境下this指向：无论严格模式或非严格模式下 this始终指向window对象
    
    > 普通函数this(调用时确定)的指向问题：
    - (this永远指向最后调用它的那个对象)
    1. this的指向不是在函数定义时确定的，而是在函数调用时确定
    2. this默认情况下指向window，严格模式下为undefined
    3. 上下文对象函数调用，那个对象调用就指向那个对象
    4. 使用 new 实例化对象，在构造函数中的this指向实例化对象。
    5. call/apply/bind方法显式调用函数时，函数内this 指向指定的对象（第一个参数）
    
    > (事件处理函数 绑定dom元素/定时器 window/自定义函数 window/自定义对象 该对象/自定义类new出来的实例化对象)

    > 箭头函数中this(定义时确定)指向问题：
    1. 箭头函数本身没有原型(prototype) 不存在this 箭头函数的this由它外层作用域的普通函数的this指向决定 否则就是window
    2. 所以箭头函数的this指向在定义时就已经确定了 并且之后永远都不会改变 但可以修改它要继承的对象的this
    3. 使用apply call bind都不能改变箭头函数中的this指向
    4. 通过rest参数获取函数的多余参数 这是ES6的API 用于获取函数不定数量的参数数组 这个API是用来代替arguments的
        - 除获取函数第一个确定的参数 以及用一个变量接收其他剩余参数的示例 也可直接接收函数的所有参数
        - 优点
        1. 箭头函数和普通函数都可以使用
        2. 更加灵活 接收参数的数量完全自定义
        3. 可读性更好 参数都是在函数括号中定义的 不会突然出现一个arguments
        4. rest是一个真正的数组 可以直接使用数组的API
    5. 使用new调用箭头函数会报错 无论箭头函数的this指向哪里 使用new调用箭头函数都会报错 因为箭头函数没有constructor
    6. 箭头函数不支持new.target
        - new.target是ES6新引入的属性 普通函数如果通过new调用 new.target会返回该函数的引用 此属性主要用于确定构造函数是否为new调用
    7. 箭头函数不支持重命名函数参数 普通函数的函数参数支持重命名
    8. 箭头函数相对于普通函数语法更加优雅

    > 箭头函数注意事项
    1. 一条语句返回对象字面量 需要加括号 或写成多条语句的return形式 
    2. 箭头函数在参数和箭头之间不能换行
    3. 箭头函数的解析顺序相对靠前

    > 箭头函数不适用场景
    1. 定义字面量方法 this的意外指向

    >改变this指向的几种方法：
    1. 使用箭头函数
    2. 在函数内部使用_this = this
    3. 用apply(参数数组) call(参数列表) bind 改变
        > apply&call
        - 作用：在函数调用时改变函数的执行上下文也就是this的值指向
        - 区别：apply使用一个参数数组 call使用不定长的参数列表
        > bind：
        - 设置this为给定的值 并返回一个新的函数 并且在调用新函数时 见给定参数列表作为原函数的参数序列的前若干项
        1. 创建一个新函数
        2. 新函数的this指向bind()的第一个参数
        3. bind的其余参数作为新函数的参数供调用时使用
        > 区别：
        - call()apply()方法会立即执行 bind()方法不会立即执行 它会返回一个函数 可以将函数存储在变量中 再通过变量获取函数的返回值
    4. new一个实例化对象
8. 什么是作用域(scope)和作用域链(scope chain)？
    > (函数被调用之前 作用域就已经存在 是JS中一种查找机制)
    
    > JS作用域scope分类
    - 全局作用域 window
    - 局部作用域
        - 函数作用域 function
        - 块级作用域 {} ES6新增 使用let ,const 定义的变量或常量。会形成块级作用域。
    
    > 作用域：    
    1. 作用域是可访问变量的集合
    2. 在JavaScript中，对象和函数同样也是变量
    3. 在JavaScript中，作用域为可访问变量，对象，函数的集合
    4. 分为全局作用域和局部作用域(函数作用域块级作用域)
    
    > 作用域
    - 一套规则 用于确定在何处以及如何查找变量(标识符)的规则

    > 全局作用域:
    - (JS默认拥有一个全局对象window 全局作用域页面关闭后被销毁) 贯穿整个javascript文档
    - 在所有函数声明或者大括号之外定义的变量，都在全局作用域里
    - 一旦声明一个全局变量，那么你可以在任何地方都使用它，包括函数内部
    - 事实上，javascript默认拥有一个全局对象window，声明一个全局变量就是为window对象的同名属性赋值
    - 注：若变量在函数内部没有声明(未使用var关键字) 该变量为全局变量 全局变量在页面关闭后销毁
    
    > 局部作用域:(函数作用域和块级作用域)
    - 在JavaScript中，任何定义在函数体内的变量或者函数都将处在函数作用域中，这些变量也无法在函数外部使用。(闭包除外)
    1. 变量在函数内声明，变量属于局部作用域
    2. 局部变量：只能在函数内部访问
    3. 局部变量只作用于函数内，所以不同的函数可以使用相同名称的变量
    4. 局部变量在函数开始执行时创建，函数执行后局部变量会自动销毁
    > 注：当函数体内局部变量和函数外局部变量重名时，函数内部优先使用自己的变量
    
    > 作用域链：
    1. 遍历嵌套作用链的规则很简单
        - 引擎从当前的执行作用域开始查找变量，如果找不到，就向上一级继续查找，当抵达最外层全局作用域时，无论找到还是没找到，查找过程都会停止
    2. 简单来说，局部作用域(如函数作用域)可以访问全局作用域中的变量和方法，而全局作用域不能访问局部作用域的变量和方法
    3. 函数被调用之前作用域已经存在
    4. 是js中的一种查找机制，从当前作用域查找，当前作用域没有往上一级作用域查找，一直到最外层，如果都找不到则是undefined
9. 什么是闭包(closure)(不在所在词法作用域执行作用),闭包的作用是什么(延长作用域的生命周期)(副作用：内存泄漏)
    > (闭包会在函数被创建时 自动根据其所在的词法作用域产生 主要是函数不在其所对应的词法作用域中执行的情况下作用的)
    
    > 词法作用域:
    - 作用域一种工作模式 作用域有两种工作模式 在JS中的词法作用域是比较主流的一种 另一种动态作用域(比较少的语言在用)
    - 写代码时将变量和块作用域写在哪里来决定 也就是词法作用域是静态的作用域 在书写代码时就确定了

    > MDN闭包概念：(不在所在词法作用域下执行作用的)
    1. 一个函数对其周围环境(词法环境)的引用捆绑在一起(或者说函数被引用包围)这样的组合就是闭包(closures)
    2. 闭包让你可以在一个内层函数中访问到其外层函数的作用链
    3. 在JavaScript中每当创建一个函数 闭包就会在函数创建的同时被创建出来
    
    > 闭包：(不在所在词法作用域中执行起作用)
    - JavaSscript中每创建一个函数 闭包也会随之产生 它是基于词法作用域书写代码自然产生的结果
    
    > 产生条件：(可以记住并访问它所在的词法作用域时)
        - 当函数可以记住并访问所在的词法作用域时就产生了闭包。即使函数是在当前词法作用域之外执行的

    > 概括：
    1. 闭包会在函数被创建时，自动根据器所在的词法作用域产生
    2. 闭包主要是在函数不在所在的词法作用域中执行的情况下作用的

    > 闭包：
        在外部函数的内部声明内部函数，在内部函数里引用了外部函数中的局部变量，当外部函数调用完毕后，局部变量不被释放
    - 闭包的最大作用：延长作用域的生命周期
        如常见的防抖(debounce)函数
    - 闭包的副作用：内存泄漏
10. JS的IIFE(作用域(scope)隔离 防止污染全局命名空间)
    - IIFE：(Immediately Invoked Function Expression),意为立即调用的函数表达式，即声明函数的同时立刻调用这个函数
    - 目的：
        - 弥补JS在scope(作用域)方面的缺陷，JS只有全局作用域(global scope)，函数作用域(function scope),从ES6开始才有块级作用域(block scope) 对比其他面向对象语言 JS在访问控制方面脆弱 为了实现作用域的隔离
    - 常见形式:
        ()();
        (())
    - IIFE可以带多个参数
    - 总结：IIFE的目的是隔离作用域，防止污染全局命名空间
11. 原型，原型链 prototype __proto__
    > 原型 原型链(由相互关联的原型组成的链状结构就是原型链)
    > 原型Person.prototype
    - 也是一个对象 也可以用_proto_获取它的原型(原型的原型)
    ```
        person._proto === Person.prototype
    ```
    - 原型(Person.prototype)中的constructor属性 指向构造函数
    ```
        Person === Person.prototype.constructor;
    ```
    - Object.prototype._proto_ 为 null 即Object.prototype没有原型
    > 原型链：
    - 由相互关联的原型组成的链状结构就是原型链

    - 当一个对象调用某个方法或者属性的时候，先在自身查找，如果找到就调用。
    - 如果没有就顺着__proto__到原型对象中查找.如果还没有就继续去原型的原型中查找，一直到null.这样形成一条链叫做原型链。如果还没有找到就返回undefined

    > prototype __proto__
    1. 子类的_proto_属性，表示构造函数的继承，总是指向父类
    2. 子类prototype属性的_proto_属性表示方法的继承 总是指向父类的prototype属性
    理解：
        1.作为一个对象 子类的原型是父类
            C._proto_ === F
        2.作为一个构造函数 子类的原型对象是父类的原型对象的实例
            C.prototype._proto_ === F.prototype
    __proto__(对象)：
        每个JS对象
        一定对应一个原型对象，并从原型对象继承属性和方法
        对象_proto_属性的值就是它所对应的原型对象
    prototype(对象)：
        1.只有函数才有prototype属性
        2.当你创建函数时，JS会为这个函数自动添加prototype属性，值是一个有constructor属性的对象
        3.而一旦你把这个函数当作构造函数(constructor)调用(即通过new关键字调用)
        4.那么JS就会帮你创建该构造函数的实例。
        5.实例继承构造函数prototype的所有属性和方法
        6.(实例通过设置自己的_proto_指向构造函数的prototype来实现这种继承)

    function a() {} //构造函数a可以通过prototype来存属性和方法
    var b = new a(); //b是实例对象
    b.__proto__ === a.prototype; //对象通过__proto__指向自己的构造函数的prototype

    > JS是单继承的
    - Object.prototype是原型链的顶端，所有对象从它继承了包括toString等等方法和属性

    > 一个ES5方法 可以获得对象原型
    - Object.getPrototypeOf(person) === Person.prototype
12. 执行上下文和this
    > 关系：
    > 执行上下文 代表函数调用方式 决定this的值
    - (this取决于函数的调用方式 跟函数声明以及声明位置无关)
    - this不能在函数执行期间被赋值 函数每次被调用时this的值不同    
    - this的绑定 由上至下优先级依次递增
    1. 默认绑定
        - 独立函数调用时， this 指向全局对象，如果使用严格模式，那么全局对象无法使用默认绑定， this 绑定至 undefined 并抛错（TypeError: this is undefined）
    2. 隐式绑定
        - this永远指向最后调用它的那个对象 当函数作为引用属性被添加到对象中，隐式绑定规则会把函数调用中的 this 绑定到这个上下文对象
    3. 显示绑定
        - call/apply
            - 需把自己的第一个参数作为执行上下文context
        - bind
            - bind方法创建一个新的函数 在bind被调用时 这个新函数的this被bind的第一个参数指定 其余参数将作为新函数参数供调用时使用
            - 调用该函数会创建一个与f具有相同函数体和作用域的函数 这个新函数中this被永久绑定到bind的第一个参数
    4. 固定绑定
        new关键字
    > this关键字绑定顺序
    1. 检查函数是否使用new关键字调用
    2. 检查函数是否使用call()或者apply()调用，因为这意味着显示绑定
    3. 检查函数是否通过上下文对象调用（隐式绑定）
    4. 默认全局对象（在严格模式下未定义）
13. 什么是执行上下文
    > (代表函数调用方式 决定this的值 决定了它们的行为 以及可以访问哪些变量) (this只是执行上下文的一部分)和执行栈
    > 执行上下文三个：
    1. 全局执行上下文
    - (只有一个 客户端一般由浏览器创建 即window对象 可以通过this直接访问
    任何不在函数内部的代码都在全局上下文中 浏览器被关闭时弹出栈)
    - (dom中全局上下文关联的就是window对象)
        - 它会执行两件事
        1. 创建一个全局Window对象(浏览器的情况下)。
        2. 并设置this的值等于这个全局对象，一个程序中只能有一个全局执行上下文
    2. 函数执行上下文
    - (没有数量限制 可以有多个 函数被调用时创建 每调用一次就会产生一个新的函数执行上下文)
        1. 每个函数都有它自己的执行上下文。
        2. 是在函数被调用时创建的。
        3. 函数执行上下文可以有多个
    3. Eval函数执行上下文(没有过多了解)
        - 执行在eval函数内部的代码也会有它属于自己的执行上下文
    
    > 特点：
    1. 单线程，在主线程上运行
    2. 同步执行，从上往下按顺序执行
    3. 全局上下文只有一个，在关闭浏览器时会被弹出栈
    4. 函数执行上下文没有数目限制
    5. 函数每被调用一次，都会产生一个新的执行上下文环境
    
    > 执行栈/调用栈
    - (用来存储代码运行时创建的所有执行上下文)
    - 也就是在其它编程语言中所说的“调用栈”，是一种拥有 LIFO（后进先出）数据结构的栈，被用来存储代码运行时创建的所有执行上下文。
    1. 当 JavaScript 引擎第一次遇到脚本时，它会创建一个全局的执行上下文并且压入当前执行栈。
    2. 每当引擎遇到一个函数被调用，它会该函数创建一个新的执行上下文并压入栈的顶部。
    3. 引擎会执行那些执行上下文位于栈顶的函数，当函数执行结束时，执行上下文会栈中弹出，控制流程到达当前栈中的下一个上下文。
    
    > 执行上下文和执行栈存在的意义：
    - (每个上下文都有一个关联的变量对象 这个上下文中定义的所有变量和函数都存在在这个对象上 DOM中全局上下文关联的就是window对象)
    - (JS的执行流就是通过这个执行栈进行控制的)
    1. 变量或函数的执行上下文，决定了它们的行为以及可以访问哪些数据。
    2. 每个上下文都有一个关联的变量对象，而这个上下文中定义的所有变量和函数都存在于这个对象上(如DOM中全局上下文关联的便是window对象)。
    3. 每个函数调用都有自己的上下文。
    4. 当代码执行流进入函数时，函数的上下文被推到一个执行栈中。在函数执行完之后，执行栈会弹出该函数上下文。
    5. 在其上的所有变量和函数都会被销毁，并将控制权返还给之前的执行上下文。 
    6. JS的执行流就是通过这个执行栈进行控制的。
    PS：this只是执行上下文的一部分
14. 作用域(函数定义时确定 静态观念)和执行上下文(函数调用时确定 动态观念)的区别是什么？
    - (作用域只是一个地盘 里面没有变量 变量是通过 作用域 对应的 执行上下文环境中的 变量对象来实现的)
    - (有闭包存在时 一个作用域存在两个上下文环境也是有的)
    - (同一个作用域下 对同一个函数的不同调用会产生不同的执行上下文环境 继而产生不同的变量的值)
    - (如果要查找一个作用域下某个变量的值 需要找到这个作用域对应的执行上下文环境 再在其中找到变量的值)
    - (作用域中变量的值是在执行过程中确定的 作用域是在函数创建时确定的)
    
    1. 作用域和每次函数调用时变量的访问有关，并且每次调用都是独立的
    2. 作用域是在函数定义时就已经确定了，不是在函数调用时确定
    3. 此处区别于执行上下文(this也是上下文环境里的成分)
    4. 作用域只是一个地盘，其中没有变量，变量是通过作用域对应的执行上下文环境中的变量对象来实现的
    5. 作用域是静态观念的 执行上下文环境是动态上的 两者并不一样
    6. 有闭包存在时，一个作用域存在两个上下文环境也是有的
    7. 作用域只是用于划分你在这个作用域里面定义的变量的有效范围，出了这个作用域就无效
    8. 同一个作用域下，对同一个函数的不同的调用会产生不同的执行上下文环境，继而产生不同的变量的值
    9. 作用域中变量的值是在执行过程中确定的，而作用域是在函数创建时就确定的。
    10. 如果要查找一个作用域下某个变量的值，就需要找到这个作用域对应的执行上下文环境，再在其中找到变量的值。
        1. 执行上下文总是关键字this的值 是调用当前可执行代码的对象的引用
        2. 作用域是函数定义的时候就确定好的 函数当中的变量适合函数所处的作用域有关，函数运行的作用域也是与该函数定义时的作用域有关
        3. 上下文，主要是关键字this的值，这个是由函数运行时决定的，简单来说就是谁调用此函数，this就指向谁。
15. 数组操作 字符串操作 Math操作
    > Set中的方法
    - 创建
    ```
    let i = new Set();
    let i = new Set([1,2])
    ```
    - 属性
    1. size 返回Set实例的成员总数
    - 方法 分为两大类 
    - 操作方法(用于数据操作) 
    1. set.add(5) 添加数据5
    2. set.delete(4) 删除数据4
    3. set.has(4) 查看是否存在数据4
    4. set.clear() 清除所有数据
    - 遍历方法(用于遍历数据)
    1. keys()
    2. values()
    3. entries()
    4. forEach()

    > Map中的方法
    1. get 获取某一个属性值
    2. has 判断是否有某一个属性值
    3. delete 删除某一个属性值
    4. clear 清除所有属性值
    5. size 获取属性个数
    > Date中的方法
    - 所有的get和set都必须初始化一个实例并以实例的属性方式调用
    - 创建日期的四种方法
    1. new Date()
    2. new Date(value);
    3. new Date(dateString);
    4. new Date(year, monthIndex [, day [, hours [, minutes [, seconds [, milliseconds]]]]])
    - 设置日期的两种方法
    1. 
    ```
    var myDate = new Date();
    myDate.setFullYear(2010,0,14)
    ```
    2. 
    ```
    var myDate = new Date();
    myDate.setDate(myDate.getDate())
    ```
    - get方法
    1. getDate() 返回一个月中的某天
    2. getDay() 返回一周中的某天
    3. getMonth() 返回月份
    4. getFullYear() 返回年份
    5. getHours() 返回小时数
    6. getMinutes() 返回对象的分钟数
    7. getSeconds() 返回秒数
    8. getMilliseconds() 返回毫秒数
    9. getTime() 返回1970年1月1日到至今的毫秒数
    - set方法 每个get方法都有对应的set方法
    - 其他方法
    1. valueOf()得到真实值 每个对象都有
    2. toString()得到字符串形式表示值 每个对象都有
    3. toTimeString() 将Date对象时间部分转化为字符串并返回 因此必须有时间参数 必须有实例
    4. toDateString() 将Date对象的日期部分转化为字符串并返回 必须有实例
    > Boolean中的方法
    1. booleanObject.toString() 把一个逻辑值转换为字符串并返回结果

    > Number中的方法
    1. parseFloat 将给定值解析为浮点数
    2. parseInt 将给定值解析成整数
    3. Number() 将给定对象转换为数字 JS隐式转换
    4. number.toFixed() 将number数换成一个十进制数形式的字符串 可选参数控制其小数点后的数字位数 它的值必须在0-20之间 默认为0
    5. number.toString(radix) 将numer转换成一个字符串 返回该数字的指定进制形式的字符串

    > Math中的方法
    1. Math.abs(10)
        - 取绝对值
    2. Math.ceil()/floor()/round()
        - 向上/下取整/附近
    3. Math.round()
        - 四舍五入
    4. Math.max()/min()
        - 取最大值/最小值
        - max方法严格认为负0小于正0
    5. Math.sqrt
        - 开平方
    6. Math.pow(底数,几次方)
        - 取幂(N的M次方)
    7. Math.PI
        - 获取圆周率
    8. Math.random()
        - 获取0-1之间的随机小数
        - Math.round(Math.random()*(m-n)+n)
        - 获取n-m之间的随机整数
    > 字符串操作
    1. length
    - 返回字符串的长度
    2. indexOf
    - 返回字符串中指定文本首次出现的索引 如果未找到返回-1
    3. lastIndexOf
    - 返回字符串中指定文本最后一次出现的索引 如果未找到返回-1
    4. search
    - 返回字符串中指定字符串首次出现的索引
        > search&indexOf
        1. search方法无法设置第二个开始位置的参数
        2. indexOf方法无法设置更强大的搜索值(正则表达式)
    5. slice
        - 如果是负数 该参数规定的是从字符串的尾部开始算起的位置 -1指字符串最后一个字符 -2指倒数第二个字符 以此类推
    6. substring
    - 类似 slice 区别是不能设置负数索引
    7. substr
    - 类似 slice 区别是第二个参数不同
    - substr(start,length);
    8. replace()
    - 字符串中即将被替换的文本 替换成的文本
    - 该方法对大小写敏感 因此不会匹配到大写的WORLD 大小写不敏感要使用正则表达式/i 全替换加/ig
    9. toUpperCace()/toLowerCase()
    - 把字符串转换成大写/小写
    10. concat()
    11. trim()
    - 去除字符串两端的空白字符
    - IE8及更低版本不支持trim方法 
    12. charAt(position)
    - 返回字符串中指定下标(位置)的字符串
    13. split(seperator,howmany)
        - seprator 必选 字符串或正则表达式 从该参数指定的地方分割stringObject
        - howmany 可选 该参数指定返回的数组的最大长度
        - 如果把空字符串用作separator 则每个字符之间都会被分割
    - 字符串转换为数组
    14. includes
    - 判断字符串是否包含指定的子字符串 如果找到匹配的字符串则返回true 否则返回false 区分大小写
    > 字符串扩展方法
    1. .startWith
    - 这个字符串是否以 开始
    2. .endsWith
    - 这个字符串是否以 结尾
    3. String.prototype.padStart
    4. String.prototype.padEnd

    > 数组遍历的一些方法
    1. 不会改变原数组
        1. map【常用】: 遍历数组，返回回调返回值组成的新数组
            - 不会改变原数组
        2. filter【常用】: 过滤 
            - 不会改变原数组
        3. some: 有一项返回true，则整体为true every: 有一项返回false，则整体为false
            - 不会改变原数组
        4. reduce / reduceRight(fn(prev, cur)， defaultPrev): 两两执行，prev 为上次化简函数的return值，cur 为当前值 当传入 defaultPrev 时，从第一项开始；当未传入时，则为第二项
    2. 会改变原数组
        1. forEach【常用】: 无法break，可以用try/catch中throw new Error来停止 没有返回值 本质上等同于for循环 对每一项执行function函数 即map是返回一个新数组 原数组不变 forEach会改变原数组
        - 会改变原数组
    > 对数组内容进行操作
    1. 不会改变原数组
        1. concat【常用】: 连接数组，浅拷贝
            - 不改变原数组 
        2. slice(start, end): 返回截断后的新数组，
            - 不改变原数组
            - 可以不传参 返回原数组
    2. 会改变原数组
        1. push / pop: 末尾推入和弹出，， push 返回数组长度, pop 返回原数组最后一项；
            - 改变原数组
        2. unshift / shift: 头部推入添加一个或更多元素和弹出头部第一个元素，unshift 返回数组长度，shift 返回原数组第一项 ；
            - 改变原数组
        3. splice(start, number, value...)【常用】: 返回删除元素组成的数组，value 为插入项，
        - 改变原数组
        4. sort(fn) / reverse【常用】: 排序与反转， 正数按降序排列 负数按升序排列 
        - sort方法可以传入一个函数作为参数 这个参数必须是函数 这个函数的返回值可以决定排列顺序 
        - 改变原数组
        - reverse方法用于颠倒数组中元素的顺序 该方法会改变原来的数组而不会创建新的数组

    1. join【常用】: 通过指定连接符生成字符串 把数组中所有元素放入一个字符串 返回一个字符串 把数组转换成字符串 然后给它规定个链接符号 默认是逗号

    1. indexOf / lastIndexOf(value, fromIndex): 查找数组项首次/最后出现位置，返回对应的下标

    1. fill(value,fromIndex,toIndex) 用从fromIndex到toIndex的值填充数组(不包括toIndex本身) fromIndex可选参数默认为0 toIndex可选参数默认为array.length
        - 会改变原数组

    1. array.flat(depth) 通过递归扁平属于数组的项知道一定的深度来创建新数组 depth可选参数默认为1

    1. array.includes(itemToSearchfromIndex) 返回一个布尔值 array是否包含itemToSearch 可选参数fromIndex 默认为0 表示开始搜索的索引

    1. Array.isArray() 确定传递的值是否是一个Array 如果是返回true否则返回false

    1. Array.of() 创建一个具有可变数量参数的新数组实例 不考虑参数的数量或类型

    1. Array.toString() 返回一个字符串 表示指定的数组及其元素 Array对象覆盖了Object的toString方法 对于数组对象 toString方法连接数组并返回一个字符串 其中包含用逗号分隔的每个数组对象
    
    > 和substr和slice区别
    > 数组没有substr和substring方法
    > 作用
    - 都是基于原字符串创建新字符串的方法 截取字符串
    > 相同点
    - 接收1-2个参数
    - 接收一个参数时 都表示截取从当前下标 截取字符串 直到字符串的最后一个字符串
    ```
    let str = 'hello'
    console.log(str.slice(3),str.substring(3),str.slice(3))
    ```
    > 不同点
    - 接收第二个参数时
    1. 第一个参数都表示当前的下标 slice和substring第二个参数表示截取的结束下标 substr表示需要截取的字符串的位数
    2. 传入是负数时 slice()会把当前的负值加上字符串的长度 slice(-3) slice(8) substring会把所有的负值转化为0 substr的第一个负值会把当前负值加上字符串的长度 第二个附属会转化为0

    > Slice&Splice
    1. Slice方法
        1. 可以用来从数组提取特定元素 该方法不会改变原数组 而是将截取到的元素封装到一个新的数组中返回
        2. 语法 arr.slice(start,end);
        3. 参数
            1. 截取开始的位置的索引 包含开始索引
            2. 截取结束的位置的索引 不包含结束索引
            (第二个参数可以省略不写 
            此时会截取从开始索引往后的所有元素)
        4. 索引可以传递一个负值 如果传递一个负值 则从后往前计算
        -1倒数第一个
        -2倒数第二个
    2. Splice()方法
        1. 可以用来删除数组中的指定元素
        2. 使用splice()会影响到原数组
        会将指定元素从原数组删除
        并将被删除的元素作为返回值返回
        3. 参数
        第一个 表示开始位置的索引
        第二个 表示删除的数量
        第三个及以后 传递一些新元素 这些元素会自动插入到开始位置索引前边
        4. splice()方法是一个多功能的方法
        可以删除/替换元素
        在数组指定位置插入元素
    > sort方法
    - sort方法在原数组上进行排序 不生成副本(会改变原数组)
        - 通过给sort()的参数返回一个负值可以实现数组reverse()效果
        - sort方法用于对数组的元素进行排序 并返回数组 默认排序顺序是根据字符串Unicode码点
        - 如果调用该方法时没有使用参数 将按字母数序对数组中的元素进行排序 更精确些是按照字符编码顺序进行排序
        - 如果想按照其他标准进行排序 就需要提供比较函数 该函数需要比较两个值 返回一个用于说明这两个值的相对顺序的数字
        1. a < b a在b之前 返回一个小于0的数
        2. a === b 返回0
        3. a > b a在b之后 返回一个大于0的数
    > 函数柯里化
    - 减少代码冗余 增加代码可读性
    - 将使用多个参数的函数转换成一系列使用一个参数的函数 使函数从一次调用传入的多个参数改为多次调用每次传入一个函数
    - 只传递给函数一部分参数去调用它 让它返回一个函数去处理剩下的参数
    - 优点
    1. 参数复用
    2. 提前确认
    3. 延迟执行 JS中常用的bind 实现机制就是curry 
16. JS中数组的几种创建方法
    (创建数组再赋值 new Array(); a[0]='a'
    /直接实例化 new Array('as')
    /字面隐式创建)  ['a']
    JS中数组 数组是一种特殊的对象 是对象的分类
    1. 常规模式 创建数组给数组赋值
        var myCars = new Array();
        myCars[0] = "Saab";
    2. 简洁模式 直接实例化
        var myCars = new Array("Saab","Volvo","BMW");
    3. 字面隐式创建
        var myCars = ["Saab","Volvo","BMW"];
18. 数组遍历方法和操作
    (
    forEach/while/for of(有iterator接口的数据都可以使用for of遍历)
    filter/reduce/some&every/map
    )
    (forEach filter reduce map every&some不改变原数组)
    效率
        for>for-of>forEach>filter>map>forin
        for in在遍历的过程中还会遍历继承链 导致效率慢
        every/some不完全属于数组操作的方法
            都是判断条件直接返回整个数组Boolean类型的方法
            every速度会比some快得多
    1. Object.keys
        成员是参数对象自身的（不含继承的）所有可遍历（ enumerable ）属性的键名。
        1. 传入对象，返回属性名
        2. 传入字符串/数组，返回索引
        3. 构造函数 返回空数组或者属性名
        4. 常用技巧
            Object.keys(person).map((key)=>{
                console.log(person[key]);  
                // 获取到属性对应的值，做一些处理
            })
    2. Object.values
        方法返回一个数组，成员是参数对象自身的（不含继承的）所有可遍历（ enumerable ）属性的键值。
        1. 返回数组的成员顺序，与属性的遍历部分介绍的排列规则一致
        2. 属性名为数值的属性，是按照数值大小，从小到大遍历的，因此返回的顺序是b、c、a。
        3. Object.values会过滤属性名为 Symbol 值的属性
        4. 如果参数不是对象，Object.values会先将其转为对象
    3. Object.entries
        Object.entries方法返回一个数组，成员是参数对象自身的（不含继承的）所有可遍历（ enumerable ）属性的键值对数组。
        1. 如果原对象的属性名是一个 Symbol 值，该属性会被省略
        2. 将对象转为真正的Map结构
    4. forEach(currentValue index arr) 当前元素 当前元素索引值 当前元素所属的数组对象
        (不改变原数组)
        遍历数组中的每一个元素，默认没有返回值 forEach方法不改变原数组
        forEach语法主要用于数组 但是它也可以应用于任何Collection对象
    5. filter (不改变原数组)
        对数组元素进行条件筛选 返回一个数组 将原数组符合条件的元素放入数组中 
        filter方法不改变原数组
    6. reduce (不改变原数组)
        reduce(callback(total,item,index,arr),initial)方法有两个参数 
        1.第一个参数是一个回调函数必须 
        2.第二个参数是初始值可选 
        数组将上一次的返回值作为下一次循环的初始值 最后将这个结果返回 
        如果没有初始值 则reduce会将数组的第一个元素作为循环开始的初始值
        常用于数组元素的累加累乘 
        reduce方法不改变原数组
    7. map (不改变原数组)
        返回一个数组 这个新数组的每一个元素都是原数组元素执行了回调函数之后的返回值 
        map方法不改变原数组
    8. some every(不改变原数组)
        (返回布尔值)：some和every的用法类似 数组的每一个元素都会执行回调函数 
            当返回值全为true时 every方法返回true 否则返回false 
            当返回值全为false时 some方法返回false 否则返回true
            some every 方法不改变原数组
    9. for of 具有interator(迭代器)接口的数据都可以使用for of 进行遍历
                常见的有数组 类数组 Set Map等 不包含对象
                如果想用for of的方法遍历数组并使用索引index 
                可以用for of遍历arr.entries()方法
    10. for in可以遍历数组 但是最好不要使用
        1.for in循环会遍历到数组中的原型链的属性
        只有具有Enumerable(可枚举)属性的属性才能被for in 遍历 例如constructor便是最常见的不可枚举的属性之一
        2.如果使用for in循环遍历数组 可以用hasOwnProperty来检测属性是否来自原型链
    11. while
17. 数组去重
    (indexOf()/indexOf()&splice/splice
    /ES6Set+Array.from/ES6Set+... )
    1. indexOf()
        1. 新建一个空数组
        2. 遍历原数组
        3. 用indexOf()判断循环出来的元素下标是否和元素在数组中的索引是否相等
        4. 如果相等则说明这是一个不重复的元素，则把数据推送至新数组中
    2. indexOf()/splice()
        1. 遍历数组
        2. 用indexOf()判断循环出来元素下标是否和元素在数组中的索引是否不相等
        3. 如果不相等（则说明这是一个 的元素），则把该元素从数组中删除
        4. 删除后数组长度变短，所以索引也要减一
    3. splice()
        1. 循环两次数组
        2. 判断每次循环的值是否一样并且下标不一样，找到后截去第二重数组所对应的下标位置的这个元素
        3. 原数组则会变成去重后的新数组
    4. ES6写法
        1. new Set() Set结构不会添加重复的值
        2. 扩展运算符...转成数组
    5. ES6写法
        1. new Set() Set结构不会添加重复的值
        2. Array.from()转成数组
    6. reduce方法
17. JS中数组和对象的关系
    >JS中所有的东西(除了undefined和null)都是对象(Object)。
    1. 包括字符串(String), 数值(Number), 数组(Array), 函数(function)等等.
    2. 数组(Array)是一种内建(built-in)的, 或者说是javascript自带的对象(Object). 
    3. 除此之外, 字符串(String), 数值(Number)等也是Javascript内建(built-in)的对象(Object).
    > 特殊情况: 
        
    - undefined和null不是对象  虽然typeof null的结果是'object', 但是null仍然不是一个对象. 
    - 任何变量可以被赋值为null, 但是用户不能给null添加任何property.
18. JS new一个实例对象会发生什么
    新建一个对象.
    可以访问构造器中的指向this属性，还可以访问原型的属性
    JS调用new的过程分四部分
    1. 新生成一个空对象
    2. 将空对象链接到原型中
    3. 绑定this
    4. 返回新对象
    ```
    var a = new myFunction("Li","Cherry");  
    new myFunction{
        var obj = {};
        obj.__proto__ = myFunction.prototype;
        var result = myFunction.call(obj,"Li","Cherry");
        return typeof result === 'obj'? result : obj;
    }
    ```
18. JS如何判断一个对象是否为空
    不能遍历到enurable为false
    (for-in+hasOwnProperty/
    Object.keys/
    JSON.stringfy()/
    能遍历到enurable为false
    getOwnPropertyNames/
    Reflet.ownKeys(object))
    > 不可获取对象enurable为false的属性
    1. for-in遍历+hasOwnProperty方法确认是否存在
        某个key这种方法不能够被遍历到enurable为false属性
    2. keys方法
      使用Object静态方法keys然后判断length即可 keys返回的是自身可枚举属性
      不可遍历到enurable为false的属性
    3. JSON方法
      使用JSON.stringfy()方法将对象转为字符串
      与字符串'{}'对比 该方法同样无法获取不可枚举属性enurable为false属性
    > 可以获取对象enurable为false的属性
    4. getOwnPropertyNames方法
       使用Object的getOwnPropertyNames方法 获取所有属性名
       不可枚举属性仍然能够获取到
    5. Reflect.ownKeys(object)方法
       返回对象自身所有属性 无论是否可枚举 无论是否包含Symbol 可获取不可枚举属性
18. 创建对象
    (new Object()/对象直接量/Object.create/
    构造函数/工厂模式/原型模式/组合使用构造函数模式和原型模式)
    1. new Object()
        创建一个Object实例
    2. {}对象直接量
        new Object() 对象直接量 两种方式是创建对象的两种基本方式 他们的原型就是Object
    3. Object.create(proto, [propertiesObject])
        (现有对象提供新建对象的proto)
        方法创建一个新对象，使用现有的对象来提供新创建的对象的proto。
        1. proto : 必须。表示新建对象的原型对象，即该参数会被赋值到目标对象(即新对象，或说是最后返回的对象)的原型上。该参数可以是null， 对象， 函数的prototype属性 （创建空的对象时需传null , 否则会抛出TypeError异常）。
        2. propertiesObject : 可选。 添加到新创建对象的可枚举属性（即其自身的属性，而不是原型链上的枚举属性）对象的属性描述符以及相应的属性名称。这些属性对应Object.defineProperties()的第二个参数。
        3. 返回值： 在指定原型对象上添加新属性后的对象。
        构造函数可以创建特定类型的对象，像Object,Array这样的原生构造函数，在运行时会自动出现在执行环境中。
        4. Object.create()方法创建的对象时，属性是在原型下面的，也可以直接访问 b.rep // {rep: "apple"} ,
        此时这个值不是吧b自身的，是它通过原型链proto来访问到b的值。
        5. Object.create() 用第二个参数来创建非空对象的属性描述符默认是为false的 所以属性p是不可写,不可枚举,不可配置的
        而构造函数或字面量方法创建的对象属性的描述符默认为true。
        6. (new Object())构造函数或对象字面量方法创建空对象时，对象时有原型属性 (Object.create())有_proto_ Object.create()方法创建空对象时，对象是没有原型属性的。
    4. new Constructor()构造函数模式
        function Person() {
            this.name = 'hanmeimei';
            this.say = function() {
                alert(this.name)
            }
            }
            var person1 = new Person();
        优点：
        1. 通过constructor或者instanceof可以识别对象实例的类别
        2. 可以通过new 关键字来创建对象实例，更像OO语言中创建对象实例
        缺点：
        1. 多个实例的say方法都是实现一样的效果，但是却存储了很多次（两个对象实例的say方法是不同的，因为存放的地址不同）
        > PS:
        1. 构造函数模式隐试的在最后返回return this 所以在缺少new的情况下，会将属性和方法添加给全局对象，浏览器端就会添加给window对象。
        2. 也可以根据return this 的特性调用call或者apply指定this。这一点在后面的继承有很大帮助。
    5. 工厂模式(定义一个用于创建产品的接口，由子类决定生产什么产品)
    (所有实例都指向一个原型 无法通过constructor识别对象 因为都是来自Object)
        function Person(name) {
            var o = new Object();
            o.name = name;
            o.say = function() {
                alert(this.name);
            }
            return o;
            }
            var person1 = Person("yawei");
    (工厂模式实际上就是借助函数，内部返回使用第一种方式（ new Object()）创建的对象。)
    缺点：
        1.对象无法识别，所有实例都指向一个原型；无法通过constructor识别对象，因为都是来自Object。
        2.每次通过Person创建对象的时候，所有的say方法都是一样的，但是却存储了多次，浪费资源。
    构造函数和工厂模式的不同之处
        1.没有显式地创建对象
        2.直接将属性和方法赋值给this对象
        3.没有return语句
    构造函数方式创建对象必须使用new操作符 会经历下面四个步骤
        1.创建对象
        2.this指向这个新创建的对象
        3.执行代码
        4.返回这个对象
    构造函数的优点:
        以构造函数创建的对象 在其原型上都会有一个constructor属性
        这个属性指向构造函数Person而这个属性最初是用来标识数据类型的
    6. 原型模式(将一个对象作为原型，通过对其进行复制而克隆出多个和原型类似的新实例。)
    (原型对象上的属性和方法属于公有属性和公有方法 其所有实例都可以访问到)
        function Person() {}
            Person.prototype.name = 'hanmeimei';
            Person.prototype.say = function() {
            alert(this.name);
            }
            Person.prototype.friends = ['lilei'];

            var person1 = new Person();
        在prototype上面定义的所有属性都是在其原型对象上的 
        在原型对象上的属性和方法属于公有属性和公有方法 其所有实例都可以访问到
    7. 组合使用构造函数模式和原型模式最常用
        对象在引用其属性时 会按照原型链去查找 直到查找到Object的原型
        function Person(name) {
            this.name = name
            this.friends = ['lilei']
            }
            Person.prototype.say = function() {
            console.log(this.name)
            }

            var person1 = new Person('hanmeimei')
            person1.say() //hanmeimei
19. 普通函数和构造函数区别
    > 构造函数也是一个普通函数 创建方式和普通函数一样 但构造函数习惯上首字母大写
    > 构造函数和普通函数的区别在于
    1. 调用方式不一样
        - 普通函数的调用方式 直接调用 person()
        - 构造函数的调用方式 需要使用new关键字调用 new Person()
    2. 作用不同
        - 构造函数用来新建实例对象
    3. 首字母大小
        - 一般构造函数名称会用大写
        - 普通函数用小写
    4. 函数中this指向不同
        - 普通函数中的this严格模式下指向undefined 非严格模式下指向window
        - 构造函数中的this 指向它创建的对象实力
20. ES5/ES6继承有什么区别
    - ES5 通过prototype/构造函数机制实现 先创建子类的实例对象 再将父类的方法添加到this上
    - ES6 先创建父类的实例对象this 所以必须先调用父类的super方法 再用 子类的构造函数 修改this)
    1. ES5继承通过prototype或构造函数机制实现
        实质上是先创建子类的实例对象 
        然后再将父类的方法添加到this上
    2. ES6的继承机制完全不同
        实质上是先创建父类的实例对象this
        (所以必须先调用父类的super()方法) 
        然后再用子类的构造函数 修改this
    > 具体：
    1. ES6通过class关键字定义类 
    里面有构造方法 类之间通过extends关键字实现继承 
    子类必须在constructor方法中调用super方法 否则新建实例报错
    2. 因为子类没有自己的this对象 
        而是继承了父类的this对象 然后对其进行加工 如果不调用super方法 子类得不到this对象
    3. super关键字指代父类的实例 
        即父类的this对象 在子类构造函数中 调用super后 才可使用this关键字 否则报错
    JS使用的是原型式继承 可以通过原型的特性实现类的继承
    ES6向我们提供了像面向对象继承一样的语法糖
21. JS中实现继承的方法有哪些(...)
    - 继承主要做两件事情
        1. 把父类的属性和方法绑定到子类上
        2. 把父类添加到子类的原型链上
    (class+extends/
    原型链/构造函数/
    组合继承(伪经典继承 原型链+构造函数)/
    寄生式/
    寄生组合式)
    1. class+extends继承(ES6)
    2. 原型链实现继承
        (可以继承属性 原型方法) 
        (共享属性)
        (无法向父类传参)
        实现
            Child.prototype = new Parent()
        1.所有实例共享父类实例属性 引用属性被修改时 所有都会被修改
        2.可以获取父类构造函数以及原型属性
        3.不能向父类传参
        4.原型链继承时 原型链属性修改 其他实例化对象也会修改
        (实际中很少用)
    3. 构造函数实现继承
        (只能继承属性 不能继承原型方法)
        (每个实例都是重新实例化的构造函数 不存在共享属性)
        (可利用call函数传参)
        实现
            子类的构造函数中 父类.call(this)
        1.只能继承构造函数的属性 无法继承原型方法
        2.每个新实例都有父类构造函数的副本
        3.每个实例都是重新实例化的构造函数 不存在共享属性
        4.可通过Parent.call(this,params)传递参数到父类构造函数
    4. 组合继承/伪经典继承 (原型链+构造函数)
        (父类构造函数执行两次 处理原型链一次 绑定属性一次)
        实现
            属性用构造函数继承实现 实现属性
            原型方法用原型链继承实现 实现prototype
        1.构造函数继承+prototype实例对象继承组合继承
        2.构造函数继承可传参
        3.实例对下个原型链继承 保证每个属性是每个对象独有的
        4.会造成两次调用父类构造函数

        1.原型继承做不到属性独立 构造函数做不到原型链处理
        2.用原型链继承思路 把父类实例作为子类prototype
        3.用构造函数继承思路 用call调用一次父类构造函数把属性创建在子对象上
        4.存在的问题 
            父类构造函数执行两次
                处理原型链一次
                绑定属性一次
    5. 寄生继承
        实现
            call
            中间构造函数F
            let F = function(){};
            F.prototype = Parent.prototype;
            Child.prototype = new F();
        1.可以将最开始的对象扩展后 返回被继承
        2.同原型链继承一样 此时无法获取构造函数属性
        3.寄生继承直接指向父类的prototype 所以不会重复调用父类
        对组合继承的改进
        要做的事情
            1.把父类的属性和方法想办法绑定到子类上
            2.把父类添加到子类的原型链上
             组合继承在每一件事上用了一次构造函数
        期望得到的结果是 能让子类的原型间接和父类联系起来
        解决方法
            能有一个原型 prototype是父类的
            让子类的prototype指向这个原型
            obj.prototype = Parent.prototype
            Child.prototype = new Obj()
            prototype被添加到原型链 并且没有调用构造函数
        寄生继承的核心是
            构造一个instance 让instance的prototype代理父类的prototype
    6. 寄生组合式继承(combination inheritance) 最理想
        1.构造函数继承+寄生继承
        2.构造函数继承调用父类一次
        寄生继承不再调用父类
        通过直接委托prototype
        解决组合继承两次调用父类情况

        寄生组合继承
            1.通过构造函数继承属性
            2.通过原型继承方法
            背后基本思路:
        不必为了指定子类的原型而调用超累的构造函数
        我们所需是超类原型的一个副本
    > JS多重继承怎么实现 可能会出现什么数据结构 从而导致什么问题
    - JS本身不提供多重继承 可以模拟多重继承 但它会大大增加代码复杂度和维护难度 
    - 可能会出现的数据结构 图
    - 导致问题 查找时出现循环 改成委托行为(数据结构变链表)        
21. 对象遍历方法
    (for in
    Object.keys()/values/entries 可枚举 不含Symbol和继承
    Object.getOwnPropertyNames   含可枚举 不含Symbol
    Object.getOwnPropertySymbols 不含可枚举 含Symbol
    Reflect.ownKeys(obj)         可枚举 Symbol 继承
    )
        对象不可以用for of方法遍历 对象的原型中没有Symbol.iterator方法
    1. for in(可枚举属性 不含Symbol)
        循环遍历对象自身的和继承的可枚举属性(不含Symbol属性)
    2. Object.keys(obj)/values/entries:
        (可枚举对象 不含Symbol 和继承)
        返回一个数组 包含对象自身的所有可枚举属性(不含继承和Symbol属性)
    3. Object.getOwnPropertyNames(obj):返回一个数组 包含对象自身的所有属性(不含Symbol属性 包含不可枚举属性)
    4. Object.getOwnPropertySymbols(obj)：返回一个数组，包含对象自身的所有 Symbol 属性。
    5. Reflect.ownKeys(obj)：返回一个数组，包含对象自身的所有属性（不含继承的）。
22. Object.assign
    常见用途
    1. 为对象添加属性
    2. 为对象添加方法
    3. 克隆对象
    4. 合并多个对象
    5. 为属性指定默认值
    > 将多个对象合并成一个对象
    - (Object.assgin()/.../手写函数(浅/深))
    1. 利用assign(浅拷贝)合并多个对象，第一个参数为目标对象，后面可以有多个源对象。
    2. 需要注意的是利用扩展运算符...合并对象 同样是进行浅拷贝
    3. 手写函数（浅拷贝实现）
    4. 手写函数（实现深拷贝）
    5. Lodash's中的merge( )方法
        Lodash's是node中的库。它也是一种深拷贝的办法。
23. 浅拷贝和深拷贝都是什么含义，有什么不同，如何实现
    > 浅拷贝
    - 只复制指向某个对象的指针，而不复制对象本身。
    实现方法
    1. Object.assign() 
        需注意的是目标对象只有一层的时候，是深拷贝；
        由于null undefined 无法转换成对象 它们作为首参数会报错 非首参数会跳过
    2. 扩展运算符；
    >深拷贝
    拷贝数据时 将数据的所有引用结构都拷贝一份
    实现方法
    1. 手写遍历递归赋值；
    2. 结合使用JSON.parse()和JSON.stringify()方法。
        - JSON.parse(JSON.stringfy)
        - JSON.parse()
            把JSON规则的字符串转换为JSONObject 兼容性好 并且几乎支持所有浏览器。
                JSON通常用于与服务端交换数据
                在接受服务器数据时一般是字符串
        - JSON.stringify()
            将JavaScript值转换为JSON字符串
24. JSON方法实现深拷贝有什么问题 
    (undefined/任意函数/symbol值 序列化过程中会被忽略)
    - (仅会序列化可枚举对象)
    (NaN和Infinity格式数据及null都会被当作null)
    (对包含循环引用的对象(对象相互引用 无限循环)抛出错误)
    json.parse(json.stringfy())
    json.stringfy()将javascript的值转换为json规则字符串
    json.parse()把json规则的字符串转换为jsonObject
    (JSON.stringfy()JS值转换为JSON规则字符串
    JSON.parse() JSON规格字符串转换为JSON对象)
    JS中的变量在内存中存储分为值类型和引用类型
    值类型：(保存和复制的是值本身)
        1.占用空间固定，保存在栈(stack)中
        2.保存和复制的是值本身
        3.基本类型数据是值类型(String Number Boolean Undefined Null Symbol bigInt)
    引用类型：(保存和复制的是指向对象的一个指针)
        1.占用空间不固定，保存在堆(heap)中
        2.保存和复制的是指向对象的一个指针
        3.使用new()方法构造出来的对象是引用型
    最简单的深拷贝方式:
        使用JSON.stringify()
        var obj1=JSON.parse(JSON.stringify(obj));
    - 问题：
        (undefined/任意函数/symbol值 序列化过程中会被忽略)
        (NaN和Infinity格式数据及null都会被当作null)
        (仅会序列化可枚举对象)
        (对包含循环引用的对象(对象相互引用 无限循环)抛出错误)

        1. undefined、任意的函数以及 symbol 值，在序列化过程中会被忽略
        2. Date 日期调用了 toJSON() 将其转换为了 string 字符串（Date.toISOString()），因此会被当做字符串处理。
        3. NaN 和 Infinity 格式的数值及 null 都会被当做 null。
        4. 其他类型的对象，包括 Map/Set/WeakMap/WeakSet，仅会序列化可枚举的属性。
        5. 对包含循环引用的对象（对象之间相互引用，形成无限循环）执行此方法，会抛出错误。
    当我们克隆的对象中还有引用类型时，我们只能采用递归的方法进行遍历
27. 
    > ==与===的区别
    1. == 相等 值相等
    2. === 恒相等 类型和值都相等
    3. js在比较时 
        ==会先做类型转换 再判断值的大小
        === 类型和值都必须相等
    > null 与undefined区别    
    - 已经声明但是尚未初始化：undefined；
    - 空对象的引用：null。
    
    > 模板字符串
    1. 模板字符串中，空格、缩进、换行都会被保留(可用trim函数消除)
    2. 支持嵌入变量和任意JS表达式 支持嵌套

    > {} === {}
    - false 对象是引用类型 存在堆里 每个对象都有自己的内存地址

29. use strict 严格模式 其与普通模式的区别
    > 严格模式概念
    - ES5引入 通过严格模式 可以在函数内部选择进行较为严格的全局或局部的错误条件检测 使用严格模式的好处是可以提早知道代码中中的错误 即时捕获一些可能导致编程错误的ES行为

    > 严格模式规则(apply&call&bind null/undefined/arguments.callee/全局作用域undefined/ES6模块化默认严格模式)
    1. 使用apply/call/bind，当传入参数是null/undefined时，this指向null/undefined，而不是全局对象。
    - 而在非严格模式下使用函数的 apply()或 call()方法时，null 或 undefined 值会被转换为全局对象。
    2. 严格模式下不再支持arguments.callee 非严格模式下，arguments.callee指向当前正在执行的函数。
    3. 严格模式下this 是undefined 非严格模式下 一般this指向window
    4. ES6 的模块化自动采用严格模式，不管你有没有在模块头部加上"use strict")COMMONJS模块化默认不是严格模式
    5. 可全局声明严格模式 可函数内部局部声明严格模式
    
    > 严格模式作用总概
    1. 通过抛出错误来消除一些原有的静默错误
    2. 修复了一些导致JavaScript引擎难以执行优化的缺陷 有时候相同的代码 严格模式可以比非严格模式下运行的更快
    3. 严格模式禁用了在ECMAScript的未来版本中可能会定义的一些语法
    - PS:支持严格模式的浏览器包括 IE10+ Firefox 4+ Safari 5.1+ Chrome
    
    > 如何使用严格模式
    - 使用严格模式的编译指示("use strict")
        - 支持严格模式的引擎会启动这种模式
        - 不支持严格模式的引擎就当遇到了一个未赋值的字符串字面量 会忽略这个编译指示
    
    1. 全局作用域中(函数外部)给出"use strict"则整个代码都将使用严格模式(如果将带有"use strict"的代码放到其他文件的全局中 则该文件中的JS代码也将处于严格模式下)
    2. 可以只在函数内打开严格模式 如果不想让整篇代码都处在严格模式下 建议只在需要测试的特定函数中开启严格模式
    (
    1. 变量 创建/删除/变量名(不能使用保留字 implements interface let等作变量名)
    2. 对象 严格模式下
            1.为只读属性赋值 抛出TypeError错
            2.对不可配置(nonconfigurable)的属性使用delete操作符会抛出TypeError
            3.为不可扩展的(nonextensible)对象添加属性会抛出TypeError
            4.使用对象字面量 属性名必须唯一
            非严格模式下
                静默失败
    3. 函数 严格模式下
            1.命名函数的参数必须唯一
            2.非严格模式下，修改命名参数的值也会反映到 arguments 对象中 严格模式下这两个值是完全独立的
            3.函数名不能使用package private protected static yield等保留字
            4.if语句中声明函数会导致语法错误
    4. eval函数 严格模式下
            1.包含上下文中不再创建变量或函数
    )
30. 防抖(最后一次) 节流(冷却一段时间) 如何实现
    - 防抖和节流  
        防止短时间内高频触发事件
    - 防抖(只执行最后一次)
        如果一定时间内多次执行了某事件，则只执行其中的最后一次。
    - 节流(冷却一段时间)
        要执行的事件每隔一段时间会被冷却，无法执行。
    - 应用场景
        搜索框实时搜索
        滚动改变相关的事件。
42. JS设置获取缓存区代码
    设置缓存 获取设置缓存的值 键值对形式 name value
    localStorage.getItem('key')    获取键的值
    localStorage.setItem('key',1)  设置键的值
44. 用class创建对象和用function构造函数创建对象有什么不同
    - Class是ES6之后推荐的为了更加体现面向对象思想的一种方式 本质上它还是原型链的关系 也就是语法糖
    - Function构造函数方法则是ES6之前常规的面向对象思想体现的一种方式
    1. 构造函数的prototype指向原型对象 原型对象的constructor又指向构造函数
    2. 对象zhangsan没有prototype属性 但有个__proto__属性指向原型对象 和构造函数的prototype指向的原型对象时相同的
    3. 原型对象添加的属性和方法 对象是可以访问的 前提是对象本身找不到 就会往原型中寻找
    4. 原型对象的constructor指向构造函数本身 这个play是构造函数身上的方法，
    而通过new出来的实例对象 zhangsan.home 其实是通过原型链的形式访问原型对象身上的home属性，所以说访问的是 undefined.
    这里的 constructor属性和 zhangsan 的 home属性都属于原型对象身上的属性，他俩是平级关系
    5. 用class创建对象和function构造函数创建对象有很多共同之处 可以说是基本一样 但是通过class创建对象看起来比较简洁 不用通过原型去实现继承
    只要是通过new出来的实例能访问到的方法(属性)叫实例方法 静态方法只存在构造函数内部
46. 新的fetch请求怎么实行
    - 传统AJAX时代 进行API等网络请求都是通过XMLHttpRequest或者封装后的框架进行网络请求 然而配置和调用方式混乱 对新手不友好
    Fetch优点
    1. 语法简介 更加语义化 业务逻辑更清晰
    2. 基于标准Promise实现 支持async/await
    3. 同构方便 使用isomorphic-fetch
    Promise简介
        Fetch API是基于Promise设计的
    fetch方法返回一个Promise对象 根据Promise API特性 
        Fetch可以方便地使用then方法将各个处理逻辑串起来
        使用Promise.resolve()/Promise.reject()方法
        将分别返回肯定结果的Promise或否定结果地Promise
        从而调用下一个then/catch 一旦then中的语句出现错误
        也将跳到catch中
    fetch请求常见数据格式
        1.fetch请求本地文本数据
        2.fetch请求本地JSON数据
        3.fetch请求网络接口
52. JS中浮点数精度问题
    - toFixed()方法可把Number四舍五入为指定小数位数的数字。
    - 浮点数的存储(Number IEEE745 64位固定长度 标准double双精度浮点数)
        和其它语言如Java和Python不同，JavaScript中所有数字包括整数和小数都只有一种类型 — Number。它的实现遵循 IEEE 754 标准，使用64位固定长度来表示，也就是标准的 double 双精度浮点数（相关的还有float 32位单精度）。
    - 优点：
        可以归一化处理整数和小数，节省存储空间。
    - 64位比特又可分为三个部分：
        符号位S：第 1 位是正负数符号位（sign），0代表正数，1代表负数
        指数位E：中间的 11 位存储指数（exponent），用来表示次方数
        尾数位M：最后的 52 位是尾数（mantissa），超出的部分自动进一舍零
    - 最大安全数字 Number.MAX_SAFE_INTEGER = Math.pow(2,53)-1 转换成整数就是16位 所以0.1 === 0.1 是因为toPrecision(16)去有效位之后 两者是相等的
    - 0.1+0.2 时会先转换成二进制 0.1和0.2转换成二进制时尾数会发生无限循环 然后进行对阶运算 JS引擎对二进制进行截断 所以造成精度丢失
    - 精度丢失有可能会出现在进制转换和对阶运算中
    - 浮点数计算
        1. 十进制的0.1和0.2会被转换成二进制的，但是由于浮点数用二进制表示时是无穷的：
        2. IEEE 754 标准的 64 位双精度浮点数的小数部分最多支持53位二进制位，所以两者相加之后得到二进制为：
        3. 因浮点数小数位的限制而截断的二进制数字，再转换为十进制，就成了0.30000000000000004。所以在进行算术计算时会产生误差。
    - 解决方法：
        1. toFixed 把toFixed重写一下
        2. 解决浮点数计算精度
            1. 可以把需要计算的数字升级（乘以10的n次幂）成计算机能够精确识别的整数，等计算完成后再进行降级（除以10的n次幂），这是大部分变成语言处理精度问题常用的方法。
            2. 将浮点数toString后indexOf('.')
53. script标签的defer和async属性
    > script标签
    - 用于加载脚本和执行脚本 直接使用script脚本 HTML会按照顺序加载并执行脚本 脚本加载&执行过程中 会阻塞后续的DOM渲染
    - script标签提供两个属性async&defer解决阻塞DOM渲染问题
    script标签存在两个属性 defer和async
    script标签的使用分为三种情况
    1. <script src="example.js"></script>
        没有defer/async属性 浏览器会立即加载并执行相关脚本
        在渲染script标签之后的文档之前
        不等待后续加载的文档元素 读到就开始加载和执行
        此举会阻塞后续文档的加载；
        普通script
            文档解析过程中 如果遇到script脚本 
            会停止页面解析进行下载
            (Chrome会做一个优化 如果遇到script脚本
            会快速查看后面有没有需要下载其他资源的
            如果有会先下载哪些资源 然后再下载script对应资源
            这样能省下一部分下载时间)
            资源的下载是在解析过程中进行的
            虽说script脚本会很快加载完毕
            但它前面script2并没有加载&执行
            它只能处于一个挂起状态
            等待script2执行完毕后再执行
            当这两个脚本都执行完毕后 才会继续解析页面
    2. <script async src="example.js"></script>
        有了async属性 
        表示后续文档的加载和渲染与JS脚本的加载和执行是并行进行的 即异步执行
        async 百度统计
            1.设置
                会使script脚本异步的加载并在允许的情况下执行
            2.执行
                不会按script在页面中的顺序来执行 而是谁先加载完 谁执行
            DOMConetntLoaded事件触发不会受async脚本加载影响
            脚本加载完之前 就已经触发DOMContentLoaded
            如果给async一定事件 有可能在DOMContentLoaded事件之前执行
        PS：async执行是加载完成后就会去执行
            不像defer要等待所有脚本加载完后 按顺序执行
    3. <script async src="example.js"></script>
        有了defer属性 评论框/代码语法高亮
        加载后续文档的过程和JS脚本的加载(此时仅加载不执行)是并行进行的(异步)
        JS脚本的执行需要等到文档所有元素解析完成之后
        DOMContentLoaded事件触发执行之前
        defer
            1.如果script标签设置该属性
                则该浏览器会异步下载该文件
                并不会影响到后续DOM的渲染
            2.如果有多个设置defer的script标签存在
                会按顺序执行所有的script
            3.defer脚本会在文档渲染完毕后
                DOMContentLoaded事件调用前执行
    推荐使用场景
    defer(评论框/代码语法高亮)
        脚本代码依赖于页面中的DOM元素(文档是否解析完毕)
        /被其他脚本文件依赖
            1.评论框
            2.代码语法高亮
            3.polyfill.js
    async(百度统计)
        脚本不关心页面中的DOM元素(文档是否解析完毕)
        并不会产生其他脚本需要的数据
            1.百度统计
    总结
    1. defer和async在网络加载过程是一致的，都是异步执行的；  
    2. 两者的区别在于脚本加载完成之后何时执行，可以看出defer更符合大多数场景对应用脚本加载和执行的要求；defer会在文档渲染后执行
    3. 如果存在多个有defer属性的脚本，那么它们是按照加载顺序执行脚本的；而对于async，它的加载和执行是紧紧挨着的，无论声明顺序如何，只要加载完成就立刻执行，它对于应用脚本用处不大，因为它完全不考虑依赖。
    > js为什么需要放在body末尾(避免影响前面HTML解析 DOM渲染)
    - 浏览器的渲染引擎和js解析引擎的冲突
    - 浏览器生成Dom树的时候是一行一行读HTML代码的
    - script标签放在最后面就不会影响前面的页面的渲染。
54. 同步/异步JS工作流程
    > 同步JS工作流程
    1. 函数代码在函数执行上下文中执行 
    2. 全局代码在全局执行上下文中执行 
    3. 每个函数都有自己的执行上下文
    > 调用栈
    - (一个具有LIFO结构的堆栈 用于存储在代码执行期间创建的所有执行上下文)
    - JS只有一个调用栈 因为它是一种单线程编程语言 调用栈具有LIFO结构 项目只能从堆栈顶部添加/删除
    
    > 异步JS工作流程
    - (单线程会造成阻塞 异步操作进行解决 JS要操作DOM所以是单线程的)
    - 异步操作解决
        - 异步回调
            setTimeOut方法模拟网络请求
            setTimeOut不是JS引擎一部分 它是Web Api的一部分
        - 事件轮询EventLoop/Web API/消息队列
            - 不是JS引擎一部分 是浏览器的JS运行时环境/ Nodejs JS运行时环境一部分(对于Node.js) 在Nodejs中 Web API 被c/c++ API所替代
        - 事件轮询
            - 监听调用堆栈 确定调用堆栈是否为空 如果调用堆栈为空 检查消息队列 是否有任何挂起的回调等待执行 对于DOM事件  事件侦听器位于Web API 环境中 等待某个事件(在本例中单击event)发生 当该事件发生时 回调函数被放置在等待执行的消息队列中 同样 事件轮询检查调用堆栈是否为空 并在调用堆栈为空并执行回调时将事件回调推送到堆栈
        - ES6任务队列(主线程执行完 从队列中调出来执行)
        > 异步回调/DOM事件执行
        - 使用消息队列存储等待执行所有回调

        > ES6引入任务队列概念
        - 任务队列是JS中的Promise所使用的 消息队列和任务队列的区别在于 任务队列优先级高于消息队列 即任务队列中的Promise作业将在消息队列中的回调之前执行
        - Promise在setTimeout之前执行 因为Promise响应存储在任务队列中 任务队列优先级高于消息队列
    > JS中实现异步的方法
    1. 回调函数(所有异步编程的根基)
        - 异步编程中最基础的方法
        1. 同步回调
        2. 异步回调
    2. 事件监听(addEventListener)
        - JS中可以通过DOM绑定事件 实现异步事件监听
    3. 发布 订阅/观察者模式(对象间一对多依赖关系/一个对象状态发生改变/所有依赖它的对象都将得到通知)
        - 它定义对象间的一对多依赖关系 当一个对象的状态发生改变时 所有依赖于它的对象都将得到通知
    4. Promise对象/Promise A+对象
        1. 对象 三种状态 状态不受外界影响 只受异步操作结果影响 Promise名字由来 Promise本质上是一个构造函数 使用new关键字创建
        2. Promise.all()/race()/resolve()/reject()/prototype.then()/prototype.catch())
        3. async表示函数有异步操作 /await等待后面表达式结果 后可跟Promise对象和原始类型值)
        4. Promise缺点/无法取消 一旦新建立即执行 无法中途取消/不设置回调函数 Promise内部抛出的错误不会反应到外部/pending状态无法得知阶段)
        5. 将Promise对象状态从pending变成resolved/rejected 异步操作成功/失败时调用 将异步操作的结果作为参数传递出去 且一旦状态改变就不会再变)
        6. 基于Promise实现 不能用于普通回调函数 与Promise一样是非阻塞的 使异步代码看起来像同步)
        7. 简洁/错误处理/async函数generator函数语法糖/async始终返回一个Promise/await实现一个等待功能)
        8. Promise常用方法：(2..Promise.all()/race()/resolve()/reject()/prototype.then()/prototype.catch())
        
        > 如何串行执行多个Promise
        1. Array.prototype.reduce
        ```
        arr.reduce((s,v)=>{
            return s.then(()=>delay(v))
        },Promise.resolve())
        ```
        2. async+循环+await
        ```
        (
            async function(){
                for (const v of arr){
                    await delay(v);
                }
            }
        )()
        ```
        3. 普通循环
        4. 递归
        5. for await of
        - for await of和for of规则类似 只需要实现一个内部[Symbol.asyncIterator]方法
        6. generator
    5. ES6中出现了Generator函数
        - 调用generator函数返回的是内部的指针对象，调用next方法就会移动内部指针。
        - Generator函数之所以能被用来处理异步操作，因为它可以暂停执行和恢复执行、函数体内外的数据交换和错误处理机制。
        - 所以使用起来我们常常需要额外需要写一个自动执行generator函数的执行器函数
    6. ES7中出现了async/await(3..async表示函数有异步操作 /await等待后面表达式结果 后可跟Promise对象和原始类型值)
        - async函数基于Generator又做了几点改进：
        - 内置执行器 语义清楚 适用性广泛
        1. 内置执行器，将Generator函数和自动执行器进一步包装。
        2. 语义更清楚，async表示函数中有异步操作，await表示等待着紧跟在后边的表达式的结果。
        3. 适用性更广泛，await后面可以跟promise对象和原始类型的值(Generator中不支持)
        - 它基于Promise使用async/await来优化then链的调用,其实也是Generator函数的语法糖。
        - async 会将其后的函数（函数表达式或 Lambda）的返回值封装成一个 Promise 对象，而 await 会等待这个 Promise 完成，并将其 resolve 的结果返回出来 await得到的就是返回值，其内部已经执行promise中resolve方法，然后将结果返回。
    > 为什么说async函数是generator的语法糖
    - async函数的实现 其实就是将generator函数和自动执行器 包装在一个函数里另外 它相对较新 属于ES8中的语法 转码器Babel已经支持 转码后就能使用
    > Promise 与 async/await对比
    1. Promise缺点
        1. (无法取消 一旦新建立即执行 无法中途取消/
        2. 不设置回调函数 Promise内部抛出的错误不会反应到外部/
        3. pending状态无法得知阶段) 
    
    - 解决问题：
        1. 解决JQuery的ajax回调地域(层层嵌套) 是异步编程的一种解决方案
        2. Promise 实现了链式调用 也就是说每次调用 then 之后返回的都是一个 Promise 并且是一个全新的Promise Promise 的状态不可变。如果你在then中使用了return 那么 return 的值会被 Promise .resolve 包装。
    - 拦截错误：
        .catch
        1. 使用catch方法捕捉错误，但是catch方法只能捕捉到同步错误，异步错误捕捉不到
        2. 使用reject抛出，错误会被不停地返回到下一个，必须在每一个then里面使用throw将错误派出去，不然不能被catch捕捉到，其实也可以不用再次throw错误，在promise正常catch就好，在异步中reject一下在最后就能catch到
        3. Promise中的错误不会影响到外层的运行，window.onerror也是无法检测道德
    resolve函数和reject函数作用：
55. eval函数
    > 全局对象上的一个函数 会把传入的字符串当作JS代码执行 如果传入的参数不是字符串 它会原封不动的将其返回
    - eval分为直接调用和间接调用两种 通常间接调用的性能会好于直接调用
    1. 直接调用时 eval运行于其调用函数的作用域下
    2. 间接调用时 eval运行于全局作用域 间接调用时 eval不会修改调用函数作用域内的任何东西 JS解释器有fast path和slowpath两种模式 当直接调用eval时 解释器处于slow path 因此此时作用域是不可控的 需要监听整个作用域 不能应用v8的一些编译优化 相应编译效率也会比fast path低
    > 为什么不用eval
    1. 降低性能
    2. 安全问题 动态执行特性 给被求值的字符串赋予了太大的权利 担心会因此导致XSS攻击
    3. 调试困难 eval就像是一个黑盒 其执行的代码很难进行断点调试
56. 为什么JavaScript是单线程的 什么是异/同步 JS为什么需要异步 JS中使用异步的场景 异步操作的方法 JS是如何实现异步的
    > JS引擎是单线程的，但又能实现异步的原因在于事件循环(EventLoop)和任务队列体系(Task Queue)。
    > JavaScript单线程
    - JavaScript语言的一大特点就是单线程，也就是说，同一个时间只能做一件事 JavaScript的单线程，与它的用途有关
    - 作为浏览器脚本语言，JavaScript的主要用途是与用户互动，以及操作DOM。这决定了它只能是单线程，否则会带来很复杂的同步问题。
    - 比如，假定JavaScript同时有两个线程，一个线程在某个DOM节点上添加内容，另一个线程删除了这个节点，这时浏览器应该以哪个线程为准？
    所以，
    - 为了避免复杂性，从一诞生，JavaScript就是单线程，这已经成了这门语言的核心特征，将来也不会改变。 
    - 为了利用多核CPU的计算能力，HTML5提出Web Worker标准，允许JavaScript脚本创建多个线程，但是子线程完全受主线程控制，且不得操作DOM。所以，这个新标准并没有改变JavaScript单线程的本质。

    > JS异步同步：
    - 同步： 按照代码书写顺序一一执行处理指令的一种模式，上一段代码执行完才能执行下一段代码。
    - 异步： 可以理解为一种并行处理的方式，不必等待一个程序执行完，可以执行其它的任务。
    
    > JS为什么需要异步：
    - JS之所以需要异步的原因在于JS是单线程运行的 实现并发
    
    > JS引擎作为一个单线程的存在依靠什么实现异步
    - JS引擎是单线程的，但又能实现异步的原因在于事件循环(EventLoop)和任务队列体系(Task Queue)。
    
    > JS目前有哪些语法实现异步：
    1. setTimeout 不属于 Javascript，它是由浏览器提供的 API（当然 Node.js 也有这个 API）。
    2. 回调函数
    3. Promise，
    4. 订阅观察者模式
    5. generator
    6. Async/Await
    7. 事件监听
    > JS异步的应用场景
    1. 定时器
    2. Ajax请求
    3. 事件绑定

    > 宏任务微任务与EventLoop(处理宏任务微任务事件判断)
    - 在当前的微任务没有执行完成时，是不会执行下一个宏任务的。
    - setTimeout就是作为宏任务来存在的，而Promise.then则是具有代表性的微任务，上述代码的执行顺序就是按照序号来输出的。
    - 所有会进入的异步都是指的事件回调中的那部分代码 new Promise在实例化的过程中所执行的代码都是同步进行的，而then中注册的回调才是异步执行的。
 
    > 宏任务：浏览器/Node 会在另一个线程执行
    1. I/O setTimeout setInterval 浏览器和Node中都是宏任务
    2. setImmediate 浏览器中不是宏任务 Node中是
    3. requestAnimationFrame 浏览器中是宏任务 Node中不是
    4. MessageChannel
    5. postMessage
    > 宏任务优先级
    - 主代码>setImmediate>MessageChannel>setTimeout/setInterval
    - 大部分浏览器会把DOM事件回调优先处理 因为要提升用户体验 给用户反馈 其次是network IO调用 再然后是UI render
    
    > 微任务：JS引擎 不会在另一个线程执行
    1. process.nextTick 浏览器中不是微任务 Node中是
    2. MutationObserver(H5新特性) 浏览器中是微任务 Node中不是
    3. Promise.then catch finally 浏览器和Node中都是微任务
    4. async await(实际Promise)
    - (async函数在await之前的代码都是同步执行的 可以理解为await之前的代码属于new Promise时传入的代码 await之后的代码都是在Promise.then中的回调)
    > 微任务优先级
    - process.nextTick>Promise = MutationObserver
    
    > 宏任务队列可以有多个 微任务队列只有一个
    > 每个macro task结束后 都要清空所有的micro task
    
    > 事件轮询 Event-Loop(处理微任务宏任务事件判断)
    - 决定如何执行宏任务微任务的机制 JavaScript是一个单进程的语言，同一时间不能处理多个任务，所以何时执行宏任务，何时执行微任务？我们需要有这样的一个判断逻辑存在。
    - 检查还有没有微任务需要处理）结束本次宏任务、检查还有没有宏任务需要处理 每完成一个任务都会进行一次，而这样的操作就被称为Event Loop。 Event Loop只是负责告诉你该执行那些任务，或者说哪些回调被触发了，真正的逻辑还是在进程中执行的。 宏任务必然是在微任务之后才执行的（因为微任务实际上是宏任务的其中一个步骤）
    - 宏任务微任务/EventLoop(事件循环机制)事件轮询和消息队列：(规定任务在浏览器中执行顺序)

    > JS如何实现异步编程(异步任务执行 运行机制)
    1. 所有同步任务都在主线程上执行 形成一个执行栈call stack
    2. 主线程之外 还存在一个任务队列/消息队列/回调队列 只要异步任务有了运行结果 就在任务队列中放置一个事件
    3. 一旦执行栈中所有同步任务执行完成 系统就会读取任务队列 对应的异步任务结束等待状态 进入执行栈开始执行

    - 这里主线程的执行过程就是一个tick 所有的异步任务都是通过任务队列来调度的 Eventloop(任务在浏览器的执行顺序)分为宏任务和微任务 执行宏/微任务 完成后都会进入到下一个tick 并在两个tick之间进行UI渲染

    > 运行机制
    1. 执行宏任务
    2. 执行该宏任务产生的微任务
    3. 如微任务在执行过程中产生了新的微任务 则继续执行微任务 微任务执行完毕再回到宏任务 进行下一轮循环 

    > 小结
    1. 微任务队列优先于宏任务队列执行
    2. 微任务队列上创建的宏任务会被后添加到当前宏任务队列的尾端
    3. 微任务队列中创建的微任务会被添加到微任务队列的尾端
    4. 只要微任务队列还有任务 宏任务队列就只会等待微任务队列执行完毕再执行

    1. 代码从上到下执行，如果遇到微任务就放到微任务队列中，遇到宏任务就放到宏任务队列中.
    2. 所有同步代码执行完成后，先去微任务队列里把所有的微任务都执行完，再去宏任务队列里按顺序执行宏任务. 
    3. 每执行完一个宏任务，就去微任务队列看看有没有产生新的微任务 
    4. 如果有就执行微任务，没有就执行下一个宏任务，直到所有任务都执行完。
57. Lodash
    > 是一个一致性 模块化 高性能的JS实用工具库
    - 内部封装了诸多对字符串 数组 对象等常见数据类型的处理函数 
    - lodash通过降低array number objects string等等的使用难度从而让js变得更简单 
    - 可以直接调用 比如数组去重 防抖函数等 可以简化很多代码
    > Lodash的模块化方法非常适用于
    1. 遍历array object string
    2. 对值进行操作和监测
    3. 创建符合功能的函数
    > Lodash比较常用的一些方法
    1. Array 适用于数组类型 比如填充数据 查找元素 数组分片等操作
    2. Collection 适用于数组和对象类型 部分适用于字符串 比如分组 查找 过滤等操作
    3. Function 适用于函数类型 比如节流 延迟 缓存 设置钩子等操作
    4. Lang 普遍适用于各种类型 常用于执行类型判断和类型转换
    5. Math 适用于数值类型 常用于执行数学运算
    6. Number 适用于生成随机数 比较数值和数值区间的关系
    7. Object 适用于对象类型 常用于对象的创建 扩展 类型转换 检索 集合等操作
    8. Seq 常用于创建链式调用 提高执行性能(惰性计算)
    9. String 适用于字符串类型

    1. _.get(object, path, [defaultValue])
    ```
    @description get方法，用于解决a.b.c.d出现undefined导致代码保存不继续向下执行
    @param {Object} [object] 目标对象
    @param {String} [path] 需要取值路径
    @param {*} [defaultVal] 值不存在时候的默认值
    ```
    2. _getObjArray
    @description 返回指定对象的 key 的值的数组，支持多层属性嵌套获取，如：obj.x.y.z，快速获取数组内需要的key值数组
    @param {Array} [objects] 目标对象
58. setInterval
    > 存在问题
    1. 推入任务队列后的时间不准确
    ```
    setInterval(fn(),N);
    ```
    - fn()在N秒之后被推入任务队列
    - 在setInterval被推入任务队列时 如果在它之前有很多任务或某个任务等待时间较长比如网络请求等 那这个定时器的执行时间和我们预定它执行的事件肯能不一致
    2. 函数操作耗时过长导致不准确
    - 考虑极端情况 如定时器中代码需要进行大量计算耗费时间较长 或是DOM操作 花的时间较长 有可能前一次代码没有执行完 后一次代码就被添加到队列中 会使得定时器不准确 甚至出现同一时间执行两次的情况
    - 最常出现的情况就是 当我们需要使用AJAX轮询服务器是否有新数据时 必定会有一些人使用setInterval 然而无论网络状态如何 它都会一遍遍发送请求 最后间隔时间可能和原定时间有很大的出入
    > setInterval 缺点与setTimeout不同
    - 定时器指定的时间间隔 表示的是何时将定时器的代码添加到消息队列 而不是何时执行代码 所以真正何时执行代码的时间是不能保证的 取决于何时被主线程的事件循环取到并执行
    > 缺点小结
    1. 使用setInterval时 某些间隔会被跳过
    2. 可能多个定时器会连续执行
    - 每个setTimeout产生的任务会直接push到任务队列中 而setInterval在每次把任务push到任务队列之前 都会进行一下判断(看上次的任务是否仍在队列中 如果有则不添加 没有则添加)
    - 一般用setTimeout模拟setInterval规避上面的缺点
    > setTimeout()代替setInterval()
    1. 在前一个定时器执行完前 不会向队列插入新的定时器(解决缺点1)
    2. 保证定时器间隔(解决缺点2)














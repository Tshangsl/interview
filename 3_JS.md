JS
    JS是一种具有函数优先的轻量级 解释性 即时编译型的编译语言 
    虽然它是作为Web页面的脚本语言而出名的 但是它也被用到很多非浏览器环境中 
    JavaScript基于原型编程多范式的动态脚本语言 并且支持面向对象命令式和声明式(如函数式编程)风格
    JavaScript基本语法借鉴C
    数据类型内存管理借鉴Java
    函数式编程借鉴Scheme(函数是第一等公民)
    原型继承部分借鉴Self(基于原型prototype的继承机制)
        JS是一种直译式脚本语言
        一种动态类型 弱类型 基于原型的语言
        内置支持类型
        它的解释器被称为JS引擎
        为浏览器的一部分
        广泛用于客户端的脚本语言
        最早是在HTML网页上使用
        用来给HTML网页增加动态功能
            JS语言是弱语言类型
            在项目开发中 当我们随意更改某个变量的数据类型后
            有可能会导致其他引用这个变量的方法中报错等
1.JS有哪些数据类型，数据类型之间有哪些不同，判断数据类型的方法
    基本数据类型:String Number Boolean Undefined Null Symbol(ES6新增 表示独一无二的值) BigInt(ES2020即ES11新增)
        Symbol函数的参数只是表示当前Symbol值的描述 
        相同参数的Symbol函数依然是不同的
        反复使用一个Symbol值 可以通过Symbol.for()方法来创建
        Symbol.for() 
            返回给定的key找到的symbol 否则就是返回新创建的symbol
        Symbol(符号)这是一个标准函数而不是一个对象构造器
            标签并不能影响符号的值 只是便于调试
        作用:(创建独一无二的值 做唯一key用于缓存等场景/
            symbol属性不能被枚举 用于创建类的私有变量/
            实现Symbol.iterator迭代器 让普通对象变成可迭代对象)
            (Symbol.for('xx') 获取全局的Symbol值/
            Symbol.toStringTag() 重置对象属性))
            1.用于创建独一无二的值 可做唯一key用于缓存等场景
            2.用于创建类的私有变量 利用symbol属性不能被枚举的特性声明作为私有属性
                符号不会被for in枚举/会被Object.keys/Object.getOwnPropertNames()/JSON.stringfy()忽略
            3.实现Symbol.iterator迭代器 让普通对象变为可迭代对象
                Symbol.iterator是一个有名的符号 被用来给对象添加一个特殊方法 使得对象可以被迭代
            4.使用Symbol.for('xxx')获取全局的symbol值
            5.用来重置对象的属性 比如Symbol.toStringTag
        symbol被当作对象属性
        symbol诞生之前 对象的键key只能是字符串
        定义：
            symbols 是一种无法被重建的基本类型。
            这时 symbols 有点类似与对象创建的实例互相不相等的情况，但同时 symbols 又是一种无法被改变的基本类型数据
        Symbol作为对象的属性：
            1.Object.keys() 并没有返回 symbols，这是为了向后兼容性的考虑。老代码不兼容 symbols，因此古老的 Object.keys() 不应该返回 symbols。
            2.适合作为对象的私有属性
            3.阻止对象属性名冲突
                通过使用symbols 不同的库在初始化的时候生成其所需要的symbol 然后就可以在对象上任意赋值
    引用数据类型:Object(对象Object 数组Array 函数Function) 
    区别：
        1.两者作为函数的参数进行传递时：
            基本数据类型传入的是数据的副本
                原数据的更改不会影响传入后的数据。
            引用数据类型传入的是数据的引用地址
                原数据的更改会影响传入后的数据。
        2.两者在内存中的存储位置：
            基本数据类型存储在栈中。
            引用数据类型在栈中存储了指针，该指针指向的数据实体存储在堆中。
    判断一个变量是基本数据类型还是引用数据类型
    (typeof/A instanceof B/B.constructor == A/Object.prototype.toString.call)
        1.typeof运算符判断类型(基本数据类型)
            typeof(null) Object;
            typeof(NaN) Number
            null == undefined  返回true，因为undefined派生自null;
            null === undefined  返回false
            typeof方法判断null/array/object/函数实例(new+函数)时得到的都是object
        2.A instanceof B(引用数据类型)
            判断一个对象是否为一个类的实例
            用来判断对象 可以区分对象和数组
            可以用来判断A是否为B的实例
            它不能检测 null 和 undefined；
            obj2必须为对象 否则会报错 返回值是布尔值
            可以对不同的对象实例进行判断
            判断方法是根据对象的原型链依次向下查询
            如果B的原型属性存在在A的原型链上
            值为true
        3.B.constructor == A(基本/引用数据类型)
            可以判断A是否为B的原型
            但constructor检测 
            可以区分对象和数组
            Object与instanceof不一样
            还可以处理基本数据类型的检测。
        4.Object.prototype.toString.call() 
            最准确最常用的方式
            原理
                当调用时 取值内部的[[Class]]属性值
                拼接成'[object'+[[Class]]+']'
                这样的字符串并返回
                使用call方法获取任何值的数据类型
    判断引用数据类型是数组还是对象
        (B.constructor == A/A instanceof B/Object.prototype.toString.call)
        typeOf无法判断 返回都是Object
        1.constructor
            constructor属性返回对创建此对象的数组函数的引用
            原本就是用来进行对象类型判断
            每一个对象实例都可以通过constructor对象访问它的构造函数
            打印出来一个是Array()一个是Object()
        2.instanceof
            根据返回的boolean值判断
            A原型链上有没有B原型
            obj instanceOf Object =>true
            obj instanceOf Array =>false
        3.toString()
            Object.prototype下的toString方法
            Object.prototype.toString.call([]) [Object Array]
            Object.prototype.toString.call({}) [ObjectObject]
    JS底层如何存储数据的类型信息/
        在变量的机器码的低位1-3存储其类型信息
            000 对象
            010 浮点数
            100 字符串
            110 布尔
            1   整数 
        null&undefined这两个值信息存储有点特殊
            null 所有机器码均为0
            undefined 用-2^30整数表示
        所以 typeof判断null时出现问题
            由于null的所有机器码均为0
            因此被当作对象看待
        instanceof判断null
            null直接被判断为不是object
            这也是JS历史遗留bug   
2.变量提升函数提升
    (函数提升优先于变量提升)
    引擎会在解释JS代码之前首先对其进行预编译 编译过程中的一部分工作就是找到所有声明 
    并用合适的作用域将他们关联起来 这也是词法作用域核心内容
    预编译
    JS引擎会在正式执行代码之前进行一次”预编译“
    内存中开辟一些空间，存放一些变量和函数。
    提升规则
        1.所有的声明都会提升到作用域的最顶上去。
        2.函数声明的优先级高于变量声明的优先级，并且函数声明和函数定义的部分一起被提升。
            函数提升只会提升函数声明 不会提升函数表达式
            如果在同一个作用域中存在多个同名函数声明 后面出现的将会覆盖前面的函数声明
    具体步骤如下（browser）：
        (GO对象->第一个脚本文件->语法分析->预编译->第二个脚本文件...)
        1.页面创建GO全局对象(Global Object)对象(window对象)
        2.加载第一个脚本文件
        3.脚本加载完毕后进行语法分析
        4.开始预编译
            查找函数声明 作为GO属性 值赋予函数体(函数声明优先)
            查找变量声明 作为GO属性 值赋予undefined
        5.解释执行代码(直到执行函数b 该部分也被叫做词法分析)
            创建AO活动对象(Active Object)
            查找形参和变量声明 值赋予undefined
            实参值赋给形参
            查找函数声明 值赋给函数体
            解释执行函数中的代码
        6.第一个脚本文件执行完毕 加载第二个脚本文件
        7.第二个文件加载完毕后 进行语法分析
        8.开始预编译
            重复预编译步骤
        预解析机制使得变量提升 字面上理解就是变量和函数的声明
        会移动到函数或全局代码的开头位置
    PS:
        JS并不存在真正的预编译 
        var与function的提升实际是在语法分析阶段就处理好的 
        JS预编译是以一个脚本文件为块的 
        一个脚本文件进行一次预编译 而不是全文编译完成再进行预编译
    PS:开发过程中 不应使用这一特性 要规范代码 做到可维护性和可读性 
    无论是在变量还是函数 都必须先声明后使用 开发中应该使用let约束变量提升
3.JS基本包装类
    (调用方法的过程是在后台偷偷进行的)
    (引用数据类型/基本包装类型区别 生命周期不同)
    (基本包装对象的原型下面添加，每个对象都有原型。)
    在基本数据类型中有3个特殊的存在：
        String Number Boolean
        这三个基本类型都有自己对应的包装对象。
        包装对象，其实就是对象，有相应的属性和方法。
        调用方法的过程，是在后台偷偷发生的，所以我们称作为基本包装类型。
        引用类型和基本包装对象区别：
            生存期
        引用类型所创建的对象，在执行的期间一直在内存中
        基本包装对象只是存在了一瞬间。
        我们无法直接给基本类型添加方法：
        给基本类型添加方法或者属性:
            在基本包装对象的原型下面添加，每个对象都有原型。
    JS内部类
    JS本身提供一些可以直接使用的类 这种类就是内部类
    主要有8个内部类
        Object/Array/Math/RegExp/Date/Number/Boolean/String
    使用方式上把JS内部类分为两类
        动态类  如Date/String/Array
            使用 var 对象 = new 动态类() 对象.属性|方法
        静态类  如Math
            使用 类名.属性|方法 
    JS内置对象
        JS中内置了17个对象 
        常用的是Array对象 Date对象 正则表达式对象 String对象 Global对象
    JS内置函数
        浏览器内核自带 不用任何函数库引入就可直接使用的函数
        JS内置函数一共可分为五类
            1.常规函数
            2.数组函数
            3.日期函数
            4.数学函数
            5.字符串函数
3.JavaScript规范
    1、不在同一行声明多个变量
    2、使用===/!==比较
    3、使用字面量的方式来创建对象 数组 替代new Array这种形式
    4、不使用全局函数
    5、switch语句必须要带default分支
    6、函数不应该有的时候有return，有的时候没有return
    7、fon-in循环中的变量 用var关键字说明作用域 防止变量污染
    8、变量的声明遵循驼峰命名法 用let替代val 声明构造函数时首字母大写 定义常量的时候尽量用大写字母 用_分割
    9、三元表达式可以替代if语句
    10、&&和||是可以短路的，使用&&时如果前面一个值是错的，那么后面的值不用判断，使用||时，如果前面一个值是对的，那么后面的值不用判断
    11、比较数据类型以下6种类情况是false，其他都是true------false、""、0、null、undefined、NaN
    12、数据类型检测用typeof，对象类型检测用instanceof
    13、异步加载第三方的内容
    14、单行注释//，多行注释/**/
    15、使用命名空间解决变量名冲突
    16、多人协作开发，新建一个js文件，const声明常量，在js文件中引用，用常量名替代方法名，这样做可以防止命名冲突
4.JS中arguments
    函数调用时 浏览器每次都会传递两个隐式参数
        函数的上下文对象this/封装实参的类数组对象arguments
        JS开发者定义的函数可以接受任意个数的参数
        (Netscape的文档 最多可接收255个) 
        遗漏参数undefined 多余参数忽略
    数组特性
        arguments存储实参 有序 
        具备与数组相同访问性质及方式且拥有数组长度length
        arguments[0] arguments.length
        除此之外没有任何Array属性
    对象特性
        是特殊的对象 类数组对象
        自己的callee属性 返回正在被执行的Function对象
    修改    
        正常模式下 arguments对象允许在运行时修改的
    应用(查看实参格式/匿名函数实现递归/遍历参数/模拟函数重载)
        1、借用arguments.length查看实参和形参的个数是否一致
        2、借用arguments.callee来让匿名函数实现递归:
        3、遍历参数求和或者求最大值
        4、模拟函数重载    
    JS中的类数组对象：
        1.arguments
        2.NodeList
        3.HTMLCollection a._proto_
        4.jQuery
    转换成真实数组
        (ES5
        Array.prototype.slice.call()/
        ES6
        Array.from()/
        扩展运算符)
        1.ES6 Array.from()
        2.ES6 ...扩展运算符 只作用于iterator对象 
            即拥有Symbol(Symbol.iterator)属性值 可以使用for of循环迭代
        3.ES5 
            Array.prototype.slice.call(arguments)/[].slice.call(Array)
             通过call方法使slice方法this指向arguments
                使其拥有slice方法 
                slice不传参默认 0-length-1
                Array.prototype.slice.call(arguments)能将具有length属性的对象转成数组
                除了IE下的节点集合 因IE下的DOM对象是以COM对象的形式实现的 JS对象与COM对象不能进行转换
            可以借用Array API通过call/apply改变this/arguments来完成转化
            最常见的转换是Array.prototype.slice
            Array.prototype.slice.call(arrayLike);
            由于借用Array API 一切以数组为输入 以数组为输出的API都可以用来做数组转换
                Array (借用 arguments)
                Array.prototype.concat (借用 arguments)
                Array.prototype.slice (借用 this)
                Array.prototype.map (借用 this)
                Array.prototype.filter (借用 this)
    总结：
        1、arguments是一个类数组对象，用来存储实参；具有length、callee等属性；可以用arguments[0]这个形式访问实参；可以转换为真实数组。
        2、arguments和函数相关联，其只有在函数执行时可用，不能显式创建。
        3、arguments可以用来遍历参数；通过callee实现递归；也可以模拟函数重载。
5.JS中的iterator(迭代器)
    (Array/Object/String/Set/Map 可迭代数据类型的迭代方法也是各式各样的)
    (ES6所有可迭代对象的迭代器放在对象原型的Symbol.iterator属性下 拥有迭代器的对象都可以使用for of进行迭代)
    背景:
        JavaScript中存在Array Object String以及ES6引入的Set和Map等可迭代的数据结构 
        这些可迭代的数据结构的迭代方法也是各式各样的
        随着ES6迭代器的推出 可以用一个方法来同意数据迭代的江湖
        ECMAScript 2015的补充 不是新的内置实现或语法 而是协议
        这些协议可以被任何遵守某些约定的对象来实现
        两个协议：
            1.可迭代协议
            2.迭代器协议
    使用方法：
        ES6中所有可迭代对象的迭代器
        存放在对象的Symbol.iterator属性下
        拥有迭代器的对象都可以用for of进行迭代
    定义：
        迭代器是一种接口 
        为各种不同的数据结构提供统一的访问机制 
        任何数据结构只要部署iterator接口就可以完成遍历(迭代)操作
    简单实现：
        迭代器利用闭包保护保存的特性，实现一个封闭的作用域，并提供一个迭代方法通过修改索引的方式，来读取数据以及状态。
5.如何理解JS中的this关键字，this的指向以及如何改变this的指向
    this 
        函数上下文对象
        表示当前对象 指向据调用上下文(context)决定
        默认指向window对象即全局对象
    全局环境下this指向：
        无论严格模式或非严格模式下 this始终指向window对象
    普通函数this(调用时确定)的指向问题：
        (this永远指向最后调用它的那个对象)
        1.this的指向不是在函数定义时确定的，而是在函数调用时确定
        2.this默认情况下指向window，严格模式下为undefined
        3.上下文对象函数调用，那个对象调用就指向那个对象
        4.使用 new 实例化对象，在构造函数中的this指向实例化对象。
        5.call/apply/bind方法显式调用函数时，函数内this 指向指定的对象（第一个参数）
        (事件处理函数 绑定dom元素/定时器 window/自定义函数 window/自定义对象 该对象/自定义类new出来的实例化对象)
    箭头函数中this(定义时确定)指向问题：
        1.箭头函数本身没有原型(prototype) 不存在this 
        箭头函数的this由它外层作用域的普通函数的this指向决定 否则就是window
        2.所以箭头函数的this指向在定义时就已经确定了
        并且之后永远都不会改变
        3.使用apply call bind都不能改变箭头函数中的this指向
    改变this指向的几种方法：
        1.使用箭头函数
        2.在函数内部使用_this = this
        3.用apply(参数数组) call(参数列表) bind 改变
            apply&call
            作用：在函数调用时改变函数的执行上下文也就是this的值指向
            区别：apply使用一个参数数组 call使用不定长的参数列表
            bind：
                设置this为给定的值 并返回一个新的函数 并且在调用新函数时 见给定参数列表作为原函数的参数序列的前若干项
                1.创建一个新函数
                2.新函数的this指向bind()的第一个参数
                3.bind的其余参数作为新函数的参数供调用时使用
            区别：
            call()apply()方法会立即执行 
            bind()方法不会立即执行 它会返回一个函数 可以将函数存储在变量中 再通过变量获取函数的返回值
        4.new一个实例化对象
6.什么是作用域(scope)和作用域链(scope chain)？
    (函数被调用之前 作用域就已经存在 是JS中一种查找机制)
    JS作用域scope分类
        全局作用域 window
        局部作用域
            函数作用域 function
            块级作用域 {} ES6新增
                使用let ,const 定义的变量或常量。会形成块级作用域。
    作用域：
        1.作用域是可访问变量的集合
        2.在JavaScript中，对象和函数同样也是变量
        3.在JavaScript中，作用域为可访问变量，对象，函数的集合
        4.分为全局作用域和局部作用域(函数作用域块级作用域)
    全局作用域:
        (JS默认拥有一个全局对象window 全局作用域页面关闭后被销毁)
        贯穿整个javascript文档
        在所有函数声明或者大括号之外定义的变量，都在全局作用域里
        一旦声明一个全局变量，那么你可以在任何地方都使用它，包括函数内部
        事实上，javascript默认拥有一个全局对象window，声明一个全局变量就是为window对象的同名属性赋值
        注：若变量在函数内部没有声明(未使用var关键字) 该变量为全局变量 全局变量在页面关闭后销毁
    局部作用域:(函数作用域和块级作用域)
        在JavaScript中，任何定义在函数体内的变量或者函数都将处在函数作用域中，这些变量也无法在函数外部使用。(闭包除外)
        1.变量在函数内声明，变量属于局部作用域
        2.局部变量：只能在函数内部访问
        3.局部变量只作用于函数内，所以不同的函数可以使用相同名称的变量
        4.局部变量在函数开始执行时创建，函数执行后局部变量会自动销毁
      注：当函数体内局部变量和函数外局部变量重名时，函数内部优先使用自己的变量
    作用域链：
        1.遍历嵌套作用链的规则很简单
            引擎从当前的执行作用域开始查找变量，如果找不到，就向上一级继续查找，当抵达最外层全局作用域时，无论找到还是没找到，查找过程都会停止
        2.简单来说，局部作用域(如函数作用域)可以访问全局作用域中的变量和方法，而全局作用域不能访问局部作用域的变量和方法
        3.函数被调用之前作用域已经存在
        4.是js中的一种查找机制，从当前作用域查找，当前作用域没有往上一级作用域查找，一直到最外层，如果都找不到则是undefined
7.什么是闭包(closure)(不在所在词法作用域执行作用),闭包的作用是什么(延长作用域的生命周期)(副作用：内存泄漏)
    (闭包会在函数被创建时 自动根据其所在的词法作用域产生 主要是函数不在其所对应的词法作用域中执行的情况下作用的)
    词法作用域:
        作用域一种工作模式
        作用域有两种工作模式
        在JS中的词法作用域是比较主流的一种
        另一种动态作用域(比较少的语言在用)
        
        词法作用域即
        在你写代码时 将变量和块作用域写在哪里来决定
        也就是词法作用域是静态的作用域 在你书写代码时就确定了

        词法作用域就是作用域是由书写代码时
        函数声明的位置来决定的
        编译阶段就能够知道全部标识符在哪以及是如何声明的
        所以词法作用域是静态的作用域
        即词法作用域能预测到在执行代码的过程中如何查找标识符
        PS:eval()和with可以通过器特殊性 欺骗词法作用域
        正常情况下都不建议使用 会产生性能问题
        
    词法作用域：
        函数在定义它的作用域scope内运行
        而不是在调用它的作用域scope内运行
    MDN闭包概念：(不在所在词法作用域下执行作用的)
        1.一个函数对其周围环境(词法环境)的引用捆绑在一起(或者说函数被引用包围)这样的组合就是闭包(closures)
        2.闭包让你可以在一个内层函数中访问到其外层函数的作用链
        3.在JavaScript中每当创建一个函数 闭包就会在函数创建的同时被创建出来
    闭包：(不在所在词法作用域中执行起作用)
        JavaSscript中每创建一个函数 闭包也会随之产生 
        它是基于词法作用域书写代码自然产生的结果
    产生条件：(可以记住并访问它所在的词法作用域时)
        当函数可以记住并访问所在的词法作用域时就产生了闭包。即使函数是在当前词法作用域之外执行的
    概括：
        1.闭包会在函数被创建时，自动根据器所在的词法作用域产生
        2.闭包主要是在函数不在所在的词法作用域中执行的情况下作用的
    闭包：
        在外部函数的内部声明内部函数，在内部函数里引用了外部函数中的局部变量，当外部函数调用完毕后，局部变量不被释放
    闭包的最大作用：延长作用域的生命周期
        如常见的防抖(debounce)函数
    闭包的副作用：内存泄漏
8.说一说JS的IIFE(作用域(scope)隔离 防止污染全局命名空间)，为什么要使用它
    IIFE：(Immediately Invoked Function Expression),意为立即调用的函数表达式，即声明函数的同时立刻调用这个函数
    目的：
        弥补JS在scope(作用域)方面的缺陷，JS只有全局作用域(global scope)，函数作用域(function scope),从ES6开始才有块级作用域(block scope) 对比其他面向对象语言 JS在访问控制方面脆弱 为了实现作用域的隔离
    常见形式:
        ()();
        (())
    IIFE可以带多个参数
    总结：IIFE的目的是隔离作用域，防止污染全局命名空间
9.什么是原型，原型链 prototype __proto__
    原型 原型链(由相互关联的原型组成的链状结构就是原型链)
        原型Person.prototype
            也是一个对象 也可以用_proto_获取它的原型(原型的原型)
                person._proto === Person.prototype
            原型(Person.prototype)中的constructor属性 指向构造函数
            Person === Person.prototype.constructor;
            Object.prototype._proto_ 为 null 即Object.prototype没有原型
        原型链：
            由相互关联的原型组成的链状结构
            创建一个函数就会为其创建一个prototype属性。
            指向这个函数的原型对象.
            原型对象会自动获得constructor属性，指向prototype属性所在函数。

            当一个对象调用某个方法或者属性的时候，先在自身查找，如果找到就调用。
            如果没有就顺着__proto__到原型对象中查找.
            如果还没有就继续去原型的原型中查找，一直到null.
            这样形成一条链叫做原型链。
            如果还没有找到就返回undefined
    prototype __proto__
        1.子类的_proto_属性，表示构造函数的继承，总是指向父类
        2.子类prototype属性的_proto_属性表示方法的继承 总是指向父类的prototype属性
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

    JS是单继承的
    Object.prototype是原型链的顶端，所有对象从它继承了包括toString等等方法和属性

    一个ES5方法 可以获得对象原型
    Object.getPrototypeOf(person) === Person.prototype
10.执行上下文和this
    关系：
        执行上下文 代表函数调用方式 决定this的值
        (this取决于函数的调用方式 跟函数声明以及声明位置无关)
        this不能在函数执行期间被赋值
        函数每次被调用时this的值不同    
    this的绑定 由上至下优先级依次递增
        1.默认绑定
            独立函数调用时， this 指向全局对象，如果使用严格模式，那么全局对象无法使用默认绑定， this 绑定至 undefined 并抛错（TypeError: this is undefined）
        2.隐式绑定
            this永远指向最后调用它的那个对象
            当函数作为引用属性被添加到对象中，隐式绑定规则会把函数调用中的 this 绑定到这个上下文对象
        3.显示绑定
            call/apply
                需把自己的第一个参数作为执行上下文context
            bind
                bind方法创建一个新的函数
                在bind被调用时 这个新函数的this被bind的第一个参数指定 其余参数将作为新函数参数供调用时使用
                调用该函数会创建一个与f具有相同函数体和作用域的函数
                这个新函数中this被永久绑定到bind的第一个参数
        4.固定绑定
            new关键字
    this关键字绑定顺序
        1.检查函数是否使用new关键字调用
        2.检查函数是否使用call()或者apply()调用，因为这意味着显示绑定
        3.检查函数是否通过上下文对象调用（隐式绑定）
        4.默认全局对象（在严格模式下未定义）
11.什么是执行上下文
    (决定了它们的行为 以及可以访问哪些变量)
    (this是其一部分)和执行栈
    执行上下文三个：
        全局执行上下文
        (只有一个 客户端一般由浏览器创建 即window对象 可以通过this直接访问
        任何不在函数内部的代码都在全局上下文中 浏览器被关闭时弹出栈)
        (dom中全局上下文关联的就是window对象)
            它会执行两件事
            1.创建一个全局Window对象(浏览器的情况下)。
            2.并设置this的值等于这个全局对象，一个程序中只能有一个全局执行上下文
        函数执行上下文
            (没有数量限制 可以有多个 
            函数被调用时创建 
            每调用一次就会产生一个新的函数执行上下文)
            每当一个函数被调用时
            都会为该函数创建一个新的上下文)
            1.每个函数都有它自己的执行上下文。
            2.是在函数被调用时创建的。
            3.函数执行上下文可以有多个
        Eval函数执行上下文(没有过多了解)
            执行在eval函数内部的代码也会有它属于自己的执行上下文
    特点：
        1.单线程，在主线程上运行
        2.同步执行，从上往下按顺序执行
        3.全局上下文只有一个，在关闭浏览器时会被弹出栈
        4.函数执行上下文没有数目限制
        5.函数每被调用一次，都会产生一个新的执行上下文环境
    执行栈/调用栈
        (用来存储代码运行时创建的所有执行上下文)
        也就是在其它编程语言中所说的“调用栈”，是一种拥有 LIFO（后进先出）数据结构的栈，被用来存储代码运行时创建的所有执行上下文。
        1.当 JavaScript 引擎第一次遇到脚本时，它会创建一个全局的执行上下文并且压入当前执行栈。
        2.每当引擎遇到一个函数被调用，它会该函数创建一个新的执行上下文并压入栈的顶部。
        2.引擎会执行那些执行上下文位于栈顶的函数，当函数执行结束时，执行上下文会栈中弹出，控制流程到达当前栈中的下一个上下文。
    执行上下文和执行栈存在的意义：
        (每个上下文都有一个关联的变量对象 
        这个上下文中定义的所有变量和函数都存在在这个对象上 
        DOM中全局上下文关联的就是window对象)
        (JS的执行流就是通过这个执行栈进行控制的)
        1.变量或函数的执行上下文，决定了它们的行为以及可以访问哪些数据。
        2.每个上下文都有一个关联的变量对象，而这个上下文中定义的所有变量和函数都存在于这个对象上(如DOM中全局上下文关联的便是window对象)。
        3.每个函数调用都有自己的上下文。
        4.当代码执行流进入函数时，函数的上下文被推到一个执行栈中。在函数执行完之后，执行栈会弹出该函数上下文。
        5.在其上的所有变量和函数都会被销毁，并将控制权返还给之前的执行上下文。 
        6.JS的执行流就是通过这个执行栈进行控制的。
    PS：this只是执行上下文的一部分
12.作用域(函数定义时确定 静态观念)和
执行上下文(函数调用时确定 动态观念)的区别是什么？
    (作用域只是一个地盘 里面没有变量 变量是通过 作用域 对应的 执行上下文环境中的 变量对象来实现的)
    (有闭包存在时 一个作用域存在两个上下文环境也是有的)
    (同一个作用域下 对同一个函数的不同调用会产生不同的执行上下文环境 继而产生不同的变量的值)
    (如果要查找一个作用域下某个变量的值 需要找到这个作用域对应的执行上下文环境 再在其中找到变量的值)
    (作用域中变量的值是在执行过程中确定的 作用域是在函数创建时确定的)
        1.作用域是和每次函数调用时变量的访问有关，并且每次调用都是独立的
        2.作用域是在函数定义时就已经确定了，不是在函数调用时确定
        3.此处区别于执行上下文(this也是上下文环境里的成分)
        4.作用域只是一个地盘，其中没有变量，变量是通过作用域对应的执行上下文环境中的变量对象来实现的
        5.作用域是静态观念的 执行上下文环境是动态上的 两者并不一样
        6.有闭包存在时，一个作用域存在两个上下文环境也是有的
        7.作用域只是用于划分你在这个作用域里面定义的变量的有效范围，出了这个作用域就无效
        8.同一个作用域下，对同一个函数的不同的调用会产生不同的执行上下文环境，继而产生不同的变量的值
        9.作用域中变量的值是在执行过程中确定的，而作用域是在函数创建时就确定的。
        10.如果要查找一个作用域下某个变量的值，就需要找到这个作用域对应的执行上下文环境，再在其中找到变量的值。
            1.执行上下文总是关键字this的值 是调用当前可执行代码的对象的引用
            2.作用域是函数定义的时候就确定好的 函数当中的变量适合函数所处的作用域有关，函数运行的作用域也是与该函数定义时的作用域有关
            3.上下文，主要是关键字this的值，这个是由函数运行时决定的，简单来说就是谁调用此函数，this就指向谁。
15.数组操作
    1.map【常用】: 遍历数组，返回回调返回值组成的新数组
    2.forEach【常用】: 无法break，可以用try/catch中throw new Error来停止
    3.filter【常用】: 过滤
    4.some: 有一项返回true，则整体为true
      every: 有一项返回false，则整体为false
    5.join【常用】: 通过指定连接符生成字符串
    6.push / pop: 末尾推入和弹出，改变原数组， push 返回数组长度, pop 返回原数组最后一项；
    7.unshift / shift: 头部推入添加一个或更多元素和弹出头部第一个元素，改变原数组，unshift 返回数组长度，shift 返回原数组第一项 ；
    8.sort(fn) / reverse【常用】: 排序与反转，改变原数组
    9.concat【常用】: 连接数组，不影响原数组， 浅拷贝
    10.slice(start, end): 返回截断后的新数组，不改变原数组
    11.splice(start, number, value...)【常用】: 返回删除元素组成的数组，value 为插入项，改变原数组
    Slice&Splice
    1.Slice方法
        1.可以用来从数组提取特定元素
        该方法不会改变元素数组
        而是将截取到的元素封装到一个新的数组中返回
        2.语法
        arr.slice(start,end);
        3.参数
        1.截取开始的位置的索引 包含开始索引
        2.截取结束的位置的索引 不包含结束索引
        (第二个参数可以省略不写 
        此时会截取从开始索引往后的所有元素)
        4.索引可以传递一个负值 如果传递一个负值 则从后往前计算
        -1倒数第一个
        -2倒数第二个
    2.Splice()方法
        1.可以用来删除数组中的指定元素
        2.使用splice()会影响到原数组
        会将指定元素从原数组删除
        并将被删除的元素作为返回值返回
        3.参数
        第一个 表示开始位置的索引
        第二个 表示删除的数量
        第三个及以后 传递一些新元素 这些元素会自动插入到开始位置索引前边
        4.splice()方法是一个多功能的方法
        可以删除/替换元素
        在数组指定位置插入元素
    12.indexOf / lastIndexOf(value, fromIndex): 查找数组项首次/最后出现位置，返回对应的下标
    13.reduce / reduceRight(fn(prev, cur)， defaultPrev): 两两执行，prev 为上次化简函数的return值，cur 为当前值
    当传入 defaultPrev 时，从第一项开始；
    当未传入时，则为第二项
    。。。。
16.JS中数组的几种创建方法
    (创建数组再赋值 new Array(); a[0]='a'
    /直接实例化 new Array('as')
    /字面隐式创建)  ['a']
    JS中数组 数组是一种特殊的对象 是对象的分类
    1.常规模式 创建数组给数组赋值
        var myCars = new Array();
        myCars[0] = "Saab";
    2.简洁模式 直接实例化
        var myCars = new Array("Saab","Volvo","BMW");
    3.字面隐式创建
        var myCars = ["Saab","Volvo","BMW"];
18.数组遍历方法和操作
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
    1.Object.keys
        成员是参数对象自身的（不含继承的）所有可遍历（ enumerable ）属性的键名。
        1.传入对象，返回属性名
        2.传入字符串/数组，返回索引
        3.构造函数 返回空数组或者属性名
        4.常用技巧
            Object.keys(person).map((key)=>{
                console.log(person[key]);  
                // 获取到属性对应的值，做一些处理
            })
    2.Object.values
        方法返回一个数组，成员是参数对象自身的（不含继承的）所有可遍历（ enumerable ）属性的键值。
        1.返回数组的成员顺序，与属性的遍历部分介绍的排列规则一致
        2.属性名为数值的属性，是按照数值大小，从小到大遍历的，因此返回的顺序是b、c、a。
        3.Object.values会过滤属性名为 Symbol 值的属性
        4.如果参数不是对象，Object.values会先将其转为对象
    3.Object.entries
        Object.entries方法返回一个数组，成员是参数对象自身的（不含继承的）所有可遍历（ enumerable ）属性的键值对数组。
        1.如果原对象的属性名是一个 Symbol 值，该属性会被省略
        2.将对象转为真正的Map结构
    4.forEach(currentValue index arr) 当前元素 当前元素索引值 当前元素所属的数组对象
        (不改变原数组)
        遍历数组中的每一个元素，默认没有返回值 forEach方法不改变原数组
        forEach语法主要用于数组 但是它也可以应用于任何Collection对象
    5.filter (不改变原数组)
        对数组元素进行条件筛选 返回一个数组 将原数组符合条件的元素放入数组中 
        filter方法不改变原数组
    6.reduce (不改变原数组)
        reduce(callback(total,item,index,arr),initial)方法有两个参数 
        1.第一个参数是一个回调函数必须 
        2.第二个参数是初始值可选 
        数组将上一次的返回值作为下一次循环的初始值 最后将这个结果返回 
        如果没有初始值 则reduce会将数组的第一个元素作为循环开始的初始值
        常用于数组元素的累加累乘 
        reduce方法不改变原数组
    7.map (不改变原数组)
        返回一个数组 这个新数组的每一个元素都是原数组元素执行了回调函数之后的返回值 
        map方法不改变原数组
    8.some every(不改变原数组)
        (返回布尔值)：some和every的用法类似 数组的每一个元素都会执行回调函数 
            当返回值全为true时 every方法返回true 否则返回false 
            当返回值全为false时 some方法返回false 否则返回true
            some every 方法不改变原数组
    9.for of 具有interator(迭代器)接口的数据都可以使用for of 进行遍历
                常见的有数组 类数组 Set Map等 不包含对象
                如果想用for of的方法遍历数组并使用索引index 
                可以用for of遍历arr.entries()方法
    10.for in可以遍历数组 但是最好不要使用
        1.for in循环会遍历到数组中的原型链的属性
        只有具有Enumerable(可枚举)属性的属性才能被for in 遍历 例如constructor便是最常见的不可枚举的属性之一
        2.如果使用for in循环遍历数组 可以用hasOwnProperty来检测属性是否来自原型链
    11.while
17.数组去重
    (indexOf()/indexOf()&splice/splice
    /ES6Set+Array.from/ES6Set+... )
    1.indexOf()
        1.新建一个空数组
        2.遍历原数组
        3.用indexOf()判断循环出来的元素下标是否和元素在数组中的索引是否相等
        4.如果相等则说明这是一个不重复的元素，则把数据推送至新数组中
    2.indexOf()/splice()
        1.遍历数组
        2.用indexOf()判断循环出来元素下标是否和元素在数组中的索引是否不相等
        3.如果不相等（则说明这是一个 的元素），则把该元素从数组中删除
        4.删除后数组长度变短，所以索引也要减一
    3.splice()
        1.循环两次数组
        2.判断每次循环的值是否一样并且下标不一样，找到后截去第二重数组所对应的下标位置的这个元素
        3.原数组则会变成去重后的新数组
    4.ES6写法
        1.new Set() Set结构不会添加重复的值
        2.扩展运算符...转成数组
    5.ES6写法
        1.new Set() Set结构不会添加重复的值
        2.Array.from()转成数组
    6.reduce方法
        .....
16.JS new一个实例对象会发生什么
    新建一个对象.
    可以访问构造器中的指向this属性，还可以访问原型的属性
    JS调用new的过程分四部分
    1.新生成一个空对象
    2.将空对象链接到原型中
    3.绑定this
    4.返回新对象
    var a = new myFunction("Li","Cherry");  
    new myFunction{
        var obj = {};
        obj.__proto__ = myFunction.prototype;
        var result = myFunction.call(obj,"Li","Cherry");
        return typeof result === 'obj'? result : obj;
    }
17.JS如何判断一个对象是否为空
(for-in+hasOwnProperty/Object.keys/JSON.stringfy()/
getOwnPropertyNames/Reflet.ownKeys(object))
    1.for-in遍历+hasOwnProperty方法确认是否存在
        某个key这种方法不能够被遍历到enurable为false属性
    2.keys方法
      使用Object静态方法keys然后判断length即可 keys返回的是自身可枚举属性
      不可遍历到enurable为false的属性
    3.JSON方法
      使用JSON.stringfy()方法将对象转为字符串
      与字符串'{}'对比 该方法同样无法获取不可遍历属性
    4.getOwnPropertyNames方法
       使用Object的getOwnPropertyNames方法 获取所有属性名
       不可枚举属性仍然能够获取到
    5.Reflect.ownKeys(object)方法
       返回对象自身所有属性 
       无论是否可枚举
       无论是否包含Symbol
       可获取不可枚举属性
18.创建对象
(new Object()/对象直接量/Object.create/
构造函数/工厂模式/原型模式/组合使用构造函数模式和原型模式)
    1.new Object()
        创建一个Object实例
    2.{}对象直接量
        new Object() 对象直接量 两种方式是创建对象的两种基本方式 他们的原型就是Object
    3.Object.create(proto, [propertiesObject])
        方法创建一个新对象，使用现有的对象来提供新创建的对象的proto。
        1.proto : 必须。表示新建对象的原型对象，即该参数会被赋值到目标对象(即新对象，或说是最后返回的对象)的原型上。该参数可以是null， 对象， 函数的prototype属性 （创建空的对象时需传null , 否则会抛出TypeError异常）。
        2.propertiesObject : 可选。 添加到新创建对象的可枚举属性（即其自身的属性，而不是原型链上的枚举属性）对象的属性描述符以及相应的属性名称。这些属性对应Object.defineProperties()的第二个参数。
        3.返回值： 在指定原型对象上添加新属性后的对象。
        构造函数可以创建特定类型的对象，像Object,Array这样的原生构造函数，在运行时会自动出现在执行环境中。
        4.Object.create()方法创建的对象时，属性是在原型下面的，也可以直接访问 b.rep // {rep: "apple"} ,
        此时这个值不是吧b自身的，是它通过原型链proto来访问到b的值。
        5.Object.create() 用第二个参数来创建非空对象的属性描述符默认是为false的 所以属性p是不可写,不可枚举,不可配置的
        而构造函数或字面量方法创建的对象属性的描述符默认为true。
        6.(new Object())构造函数或对象字面量方法创建空对象时，对象时有原型属性 (Object.create())有_proto_ Object.create()方法创建空对象时，对象是没有原型属性的。
    4.new Constructor()构造函数模式
        function Person() {
            this.name = 'hanmeimei';
            this.say = function() {
                alert(this.name)
            }
            }
            var person1 = new Person();
        优点：
        1.通过constructor或者instanceof可以识别对象实例的类别
        2.可以通过new 关键字来创建对象实例，更像OO语言中创建对象实例
        缺点：
        1.多个实例的say方法都是实现一样的效果，但是却存储了很多次（两个对象实例的say方法是不同的，因为存放的地址不同）
        PS:
            1.构造函数模式隐试的在最后返回return this 所以在缺少new的情况下，会将属性和方法添加给全局对象，浏览器端就会添加给window对象。
            2.也可以根据return this 的特性调用call或者apply指定this。这一点在后面的继承有很大帮助。
    5.工厂模式(定义一个用于创建产品的接口，由子类决定生产什么产品。)
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
    6.原型模式(将一个对象作为原型，通过对其进行复制而克隆出多个和原型类似的新实例。)
        function Person() {}
            Person.prototype.name = 'hanmeimei';
            Person.prototype.say = function() {
            alert(this.name);
            }
            Person.prototype.friends = ['lilei'];

            var person1 = new Person();
        在prototype上面定义的所有属性都是在其原型对象上的 
        在原型对象上的属性和方法属于公有属性和公有方法 其所有实例都可以访问到
    7.组合使用构造函数模式和原型模式最常用
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
20.ES5/ES6继承有什么区别
    (ES5通过prototype/构造函数机制实现 
        先创建子类的实例对象 
        再将父类的方法添加到this上)
    (ES6
        先创建父类的实例对象this
        (所以必须先调用父类的super方法)
        再用子类的构造函数修改this)
    1.ES5继承通过prototype或构造函数机制实现
        实质上是先创建子类的实例对象 
        然后再将父类的方法添加到this上
    2.ES6的继承机制完全不同
        实质上是先创建父类的实例对象this
        (所以必须先调用父类的super()方法) 
        然后再用子类的构造函数 修改this
    具体：
        1.ES6通过class关键字定义类 
        里面有构造方法 类之间通过extends关键字实现继承 
        子类必须在constructor方法中调用super方法 否则新建实例报错
        2.因为子类没有自己的this对象 
            而是继承了父类的this对象 然后对其进行加工 如果不调用super方法 子类得不到this对象
        3.super关键字指代父类的实例 
            即父类的this对象 在子类构造函数中 调用super后 才可使用this关键字 否则报错
    JS使用的是原型式继承 可以通过原型的特性实现类的继承
    ES6向我们提供了像面向对象继承一样的语法糖
21.JS中实现继承的方法有哪些(...)
    (class+extends/
    原型链/构造函数/
    组合继承(伪经典继承 原型链+构造函数)/
    寄生式/
    寄生组合式)
    1.class+extends继承(ES6)
    2.原型链实现继承 
        1.所有实例共享父类实例属性 引用属性被修改时 所有都会被修改
        2.可以获取父类构造函数以及原型属性
        3.不能向父类传参
        4.原型链继承时 原型链属性修改 其他实例化对象也会修改
        (实际中很少用)
    3.借用构造函数继承(可子类构造函数向超类构造函数传参)
        1.只能继承构造函数的属性 无法继承原型方法
        2.每个新实例都有父类构造函数的副本
        3.每个实例都是重新实例化的构造函数 不存在共享属性
        4.可通过Parent.call(this,params)传递参数到父类构造函数
    4.组合继承/伪经典继承 (原型链+构造函数)
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
    5.寄生继承
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
    6.寄生组合式继承(combination inheritance) 最理想
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
20.将多个对象合并成一个对象
    (Object.assgin()/.../手写函数(浅/深))
    1.利用assign(浅拷贝)合并多个对象，第一个参数为目标对象，后面可以有多个源对象。
    2.需要注意的是利用扩展运算符...合并对象 同样是进行浅拷贝
    3.手写函数（浅拷贝实现）
    4.手写函数（实现深拷贝）
    5.Lodash's中的merge( )方法
        Lodash's是node中的库。它也是一种深拷贝的办法。
19.对象遍历方法
(for in
Object.keys()/values/entries 可枚举 不含Symbol和继承
Object.getOwnPropertyNames   含可枚举 不含Symbol
Object.getOwnPropertySymbols 不含可枚举 含Symbol
Reflect.ownKeys(obj)         可枚举 Symbol 继承
)
        对象不可以用for of方法遍历 对象的原型中没有Symbol.iterator方法
    1.for in(可枚举属性 不含Symbol)
        循环遍历对象自身的和继承的可枚举属性(不含Symbol属性)
    2.Object.keys(obj)/values/entries:
        (可枚举对象 不含Symbol 和继承)
        返回一个数组 包含对象自身的所有可枚举属性(不含继承和Symbol属性)
    3.Object.getOwnPropertyNames(obj):返回一个数组 包含对象自身的所有属性(不含Symbol属性 包含不可枚举属性)
    4.Object.getOwnPropertySymbols(obj)：返回一个数组，包含对象自身的所有 Symbol 属性。
    5.Reflect.ownKeys(obj)：返回一个数组，包含对象自身的所有属性（不含继承的）。
19.Object.assign
    常见用途
        1.为对象添加属性
        2.为对象添加方法
        3.克隆对象
        4.合并多个对象
        5.为属性指定默认值
20.浅拷贝和深拷贝都是什么含义，有什么不同，如何实现
    浅拷贝
        只复制指向某个对象的指针，而不复制对象本身。
        实现方法
        1.Object.assign() 
            需注意的是目标对象只有一层的时候，是深拷贝；
            由于null undefined 无法转换成对象 它们作为首参数会报错 非首参数会跳过
        2.扩展运算符；
    深拷贝
        拷贝数据时 将数据的所有引用结构都拷贝一份
        实现方法
        1.手写遍历递归赋值；
        2.结合使用JSON.parse()和JSON.stringify()方法。
            JSON.parse(JSON.stringfy)
            JSON.parse()
                把JSON规则的字符串转换为JSONObject 兼容性好 并且几乎支持所有浏览器。
                    JSON通常用于与服务端交换数据
                    在接受服务器数据时一般是字符串
            JSON.stringify()
                将JavaScript值转换为JSON字符串
21.JSON方法实现拷贝有什么问题 
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
    问题：
        (undefined/任意函数/symbol值 序列化过程中会被忽略)
        (NaN和Infinity格式数据及null都会被当作null)
        (仅会序列化可枚举对象)
        (对包含循环引用的对象(对象相互引用 无限循环)抛出错误)

        1.undefined、任意的函数以及 symbol 值，在序列化过程中会被忽略
        2.Date 日期调用了 toJSON() 将其转换为了 string 字符串（Date.toISOString()），因此会被当做字符串处理。
        3.NaN 和 Infinity 格式的数值及 null 都会被当做 null。
        4.其他类型的对象，包括 Map/Set/WeakMap/WeakSet，仅会序列化可枚举的属性。
        5.对包含循环引用的对象（对象之间相互引用，形成无限循环）执行此方法，会抛出错误。
    当我们克隆的对象中还有引用类型时，我们只能采用递归的方法进行遍历
19.JS中数组和对象的关系
    JS中所有的东西(除了undefined和null)都是对象(Object)。
        1.包括字符串(String), 数值(Number), 数组(Array), 函数(function)等等.
        2.数组(Array)是一种内建(built-in)的, 或者说是javascript自带的对象(Object). 
        3.除此之外, 字符串(String), 数值(Number)等也是Javascript内建(built-in)的对象(Object).
    特殊情况: 
        undefined和null不是对象  虽然typeof null的结果是'object', 但是null仍然不是一个对象. 
        任何变量可以被赋值为null, 但是用户不能给null添加任何property.
20.JS哪些操作会造成内存泄露,以及避免内存泄漏
    内存泄漏是指一块被分配的内存既不能使用，也不能回收，直到浏览器进程结束。 
    GC(Garbage Collection System)垃圾回收系统算法
        引用计数
        标记清除(较常用)
        复制算法
    造成内存泄露的原因
        1.意外的全局变量
        2.没有清理的DOM元素引用
        3.被遗忘的定时器或回调
        4.闭包(存在堆内存中)

        5.子元素存在引起的内存泄漏
        6.IE7/8引用计数使用循环引用产生的问题
    避免内存泄漏
        1.减少不必要的全局变量，或者生命周期较长的对象，及时对无用的数据进行垃圾回收；
        2.注意程序逻辑，避免“死循环”之类的 ；
        3.避免创建过多的对象  原则：不用了的东西要及时归还。
24.==与===的区别
    1.== 相等 值相等
    2.=== 恒相等 类型和值都相等
    3.js在比较时 
        ==会先做类型转换 再判断值的大小
        === 类型和值都必须相等
25.null undefined
    已经声明但是尚未初始化：undefined；
    空对象的引用：null。
26.use strict 严格模式 其与普通模式的区别
    (1.全局作用域/函数内部 使用严格模式
     2.全局作用域下this指向
     3.变量 创建/删除变量/变量名
     4.对象 操作对象的属性 
        为只读属性赋值/
        为不可配置属性nonconfiguratle使用delete/
        为不可扩展对象nonextensible添加属性
     5.函数 arguments 保留字 if1语句声明函数 语法错误
     6.eval 包含上下文不再创建变量和对象
    )
    严格模式规则(apply&call&bind null/undefined/arguments.callee/全局作用域undefined/ES6模块化默认严格模式)
        1.使用apply/call/bind，当传入参数是null/undefined时，this指向null/undefined，而不是全局对象。
            而在非严格模式下使用函数的 apply()或 call()方法时，null 或 undefined 值会被转换为全局对象。
        2.不再支持arguments.callee。非严格模式下，arguments.callee指向当前正在执行的函数。
        3.严格模式下this 是undefined 非严格模式下 一般this指向window
        4.ES6 的模块化自动采用严格模式，不管你有没有在模块头部加上"use strict";)
            COMMONJS模块化默认不是严格模式
        4.用于标准化正常的JavaScript语义。
        5.可以嵌入到非严格模式中，关键字 ‘use strict’。
        6.代码应遵循JS严格的语法规则。例如，分号在每个语句声明之后使用。 
    严格模式概念
        ES5引入 
        通过严格模式 可以在函数内部选择进行较为严格的全局或局部的错误条件检测
        使用严格模式的好处是可以提早知道代码中中的错误 
        即时捕获一些可能导致编程错误的ES行为
    严格模式作用总概
        1.通过抛出错误来消除一些原有的静默错误
        2.修复了一些导致JavaScript引擎难以执行优化的缺陷
        有时候相同的代码 严格模式可以比非严格模式下运行的更快
        3.严格模式禁用了在ECMAScript的未来版本中可能会定义的一些语法
    PS:支持严格模式的浏览器包括 IE10+ Firefox 4+ Safari 5.1+ Chrome
    如何使用严格模式
        使用严格模式的编译指示("use strict")
            支持严格模式的引擎会启动这种模式
            不支持严格模式的引擎就当遇到了一个未赋值的字符串字面量 会忽略这个编译指示
    1.全局作用域中(函数外部)给出"use strict"则整个代码都将使用严格模式(如果将带有"use strict"的代码放到其他文件的全局中 则该文件中的JS代码也将处于严格模式下)
    2.可以只在函数内打开严格模式 如果不想让整篇代码都处在严格模式下 建议只在需要测试的特定函数中开启严格模式
    (
    1.变量 创建/删除/变量名(不能使用保留字 implements interface let等作变量名)
    2.对象 严格模式下
            1.为只读属性赋值 抛出TypeError错
            2.对不可配置(nonconfigurable)的属性使用delete操作符会抛出TypeError
            3.为不可扩展的(nonextensible)对象添加属性会抛出TypeError
            4.使用对象字面量 属性名必须唯一
            非严格模式下
                静默失败
    3.函数 严格模式下
            1.命名函数的参数必须唯一
            2.非严格模式下，修改命名参数的值也会反映到 arguments 对象中 严格模式下这两个值是完全独立的
            3.函数名不能使用package private protected static yield等保留字
            4.if语句中声明函数会导致语法错误
    4.eval函数 严格模式下
            1.包含上下文中不再创建变量或函数
    )
    严格模式限制:
        变量必须声明后再使用
        函数的参数不能有同名属性，否则报错
        不能使用with语句
        不能对只读属性赋值，否则报错
        不能使用前缀 0 表示八进制数，否则报错
        不能删除不可删除的属性，否则报错
        不能删除变量delete prop，会报错，只能删除属性delete global[prop]
        eval不会在它的外层作用域引入变量
        eval和arguments不能被重新赋值
        arguments不会自动反映函数参数的变化
        不能使用arguments.callee
        不能使用arguments.caller
        禁止this指向全局对象
        不能使用fn.caller和fn.arguments获取函数调用的堆栈
        增加了保留字（比如protected、static和interface）
27.什么是防抖(最后一次) 节流(冷却一段时间) 如何实现
    防抖和节流  
        防止短时间内高频触发事件
    防抖(只执行最后一次)
        如果一定时间内多次执行了某事件，则只执行其中的最后一次。
    节流(冷却一段时间)
        要执行的事件每隔一段时间会被冷却，无法执行。
    应用场景
        搜索框实时搜索
        滚动改变相关的事件。
28.定时器的分类，区别及作用
    Js中有两种定时器：
        setInterval：间歇执行，
        setTimeout：延迟执行  
33.事件绑定和普通事件有什么区别。
    标签.事件：如果给同一个元素添加同一个事件，后面的会覆盖前面
    事件绑定：可以给同一个元素添加同一个事件，不会被覆盖
35.拖拽效果中有几种事件？
    按下onmousedown，拖拽onmousemove，弹起onmouseup
38.js为什么需要放在body末尾(避免影响前面HTML解析 DOM渲染)
    浏览器的渲染引擎和js解析引擎的冲突
    浏览器生成Dom树的时候是一行一行读HTML代码的，script标签放在最后面就不会影响前面的页面的渲染。
39.可枚举属性 不可枚举属性
    可枚举属性
        1.是指那些内部 “可枚举” 标志设置为 true 的属性。
            对于通过直接的赋值和属性初始化的属性，该标识值默认为即为 true。但是对于通过 Object.defineProperty 等定义的属性，该标识值默认为 false。
        2.其中js中基本包装类型的原型属性是不可枚举的
            如Object, Array, Number等。
        3.可枚举的属性可以通过for...in循环进行遍历（除非该属性名是一个Symbol），或者通过Object.keys()方法返回一个可枚举属性的数组。
40.使用typeof(bar) === object风险
    PS：typeof主要用于检测基本数据类型
        尽量不要用来检测复杂数据类型
    typeof检测null和数组时结果也是object 所以使用typeof(bar) === 'object'来确定bar是否为对象是不准确的
    改进
        (bar!==null)&&(typeof bar === 'object')&&(toString.call(bar)!==[Object Array])
41.什么是回调函数
    MDN回调函数概念
        回调函数是作为参数传递给另一个函数的函数 
        然后通过在外部函数的内部调用该回调函数以完成某种操作
    1.在js里函数都是对象，这表示它们可以作为参数传递给其他的函数。
        举例：当函数b()作为参数传递给函数a()，那么在某一时刻函数a()可能会执行或者调用函数b()。这种情况下，函数b()就被称为回调函数，也可以简称叫做回调(下面是栗子)。
42.JS设置获取缓存区代码
    设置缓存 获取设置缓存的值 键值对形式 name value
    localStorage.getItem('key')    获取键的值
    localStorage.setItem('key',1)  设置键的值
44.用class创建对象和用function构造函数创建对象有什么不同
    Class是ES6之后推荐的为了更加体现面向对象思想的一种方式
    本质上它还是原型链的关系 
    也就是语法糖
    Function构造函数方法则是ES6之前常规的面向对象思想体现的一种方式
    1.构造函数的prototype指向原型对象 原型对象的constructor又指向构造函数
    2.对象zhangsan没有prototype属性 但有个__proto__属性指向原型对象 和构造函数的prototype指向的原型对象时相同的
    3.原型对象添加的属性和方法 对象是可以访问的 前提是对象本身找不到 就会往原型中寻找
    4.原型对象的constructor指向构造函数本身 这个play是构造函数身上的方法，
    而通过new出来的实例对象 zhangsan.home 其实是通过原型链的形式访问原型对象身上的home属性，所以说访问的是 undefined.
    这里的 constructor属性和 zhangsan 的 home属性都属于原型对象身上的属性，他俩是平级关系
    //5.结论
    // 在class内部通过static 修饰的属性叫做静态属性，只能被构造函数名或者类名读取，new出来的对象读不到, 相当于上面的Person.say()和 Person.home
    // 在class内部通过直接定义的方法是实例方法,相当于上文中的Person.prototype.say(),new出来的对象是可以访问到的,想反,Class类是访问不到的,与结论 4相同
    6.总结 用class创建对象和function构造函数创建对象有很多共同之处 可以说是基本一样 但是通过class创建对象看起来比较简洁 不用通过原型去实现继承
    只要是通过new出来的实例能访问到的方法(属性)叫实例方法 静态方法只存在构造函数内部
45.axios原理
    Vue自2.0开始 Vue-resource不再作为官方推荐的Ajax方案 
    转而推荐使用Axios
    优点：
        同时支持浏览器端和服务器端请求
46.新的fetch请求时怎么实行的
    传统AJAX时代 进行API等网络请求都是通过XMLHttpRequest或者封装后的框架进行网络请求 然而配置和调用方式混乱 对新手不友好
    Fetch优点
        1.语法简介 更加语义化 业务逻辑更清晰
        2.基于标准Promise实现 支持async/await
        3.同构方便 使用isomorphic-fetch
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
47.concurrency并发
    non-blocking 非阻塞
    event-loop 事件轮询
    callback 回调函数
    asynchronous 异步的
    single-threaded 单线程
    FPS(frames-per-second)
    JS有
        call stack
        event loop
        callback quene
        API
    V8有
        heap
        callstack(调用栈)
    web API
        DOM
        AJAX
        timeout(setTimeout setInterval)
    single threaded === single call stack === do one thing at a time
48.JS内存管理及3中常见的内存泄漏
    JS代码执行分三部分
        runtime
            运行时提供window dom 等API注入
        js engine
            JS引擎负责内存管理 代码编译执行
        event loop
            事件循环负责处理异步逻辑
    内存区域
        分为栈/堆两部分 
        内存静态分配(static allocation)
            对于可以确定大小的变量 它们会被存储在栈空间中
        动态分配(dynamic allocation)
            不能在编译阶段就确定其需要多大的存储空间 其占用内存大小是在运行时确定的
    内存生命周期
        不管什么程序语言，内存生命周期基本是一致的：
        1.分配你所需要的内存
            JS中通过做变量声明赋值自动完成
        2.使用分配到的内存（读、写）
        3.不需要时将其释放归还   
49.JS内存管理机制
    不管什么程序语言，内存生命周期基本是一致的：
        1.分配你所需要的内存
        2.使用分配到的内存（读、写）
        3.不需要时将其释放归还
    与其他需要手动管理内存的语言不通，在JavaScript中，当我们创建变量（对象，字符串等）的时候，系统会自动给对象分配对应的内存。
    当系统发现这些变量不再被使用的时候，会自动释放（垃圾回收）这些变量的内存，开发者不用过多的关心内存问题。

        在JavaScript中，数据类型分为两类，简单类型和引用类型，对于简单类型，内存是保存在栈（stack）空间中，复杂数据类型，内存是保存在堆（heap）空间中。
        基本类型：这些类型在内存中分别占有固定大小的空间，他们的值保存在栈空间，我们通过按值来访问的引用类型：
        引用类型，值大小不固定，栈内存中存放地址指向堆内存中的对象。是按引用访问的。
    栈的内存空间
        只保存简单数据类型的内存 由操作系统自动分配和自动释放
    堆的内存空间
        大小不固定 系统无法进行自动释放 此时需要JS引擎来手动释放这些内存
    为什么需要垃圾回收
        1.表层原因是，V8最初为浏览器而设计，不太可能遇到用大量内存的场景
        2.深层原因是，V8的垃圾回收机制的限制（如果清理大量的内存垃圾是很耗时间，这样回引起JavaScript线程暂停执行的时间，那么性能和应用直线下降）
    前面说到栈内的内存，操作系统会自动进行内存分配和内存释放，而堆中的内存，由JS引擎（如Chrome的V8）手动进行释放，当我们代码的按照正确的写法时，会使得JS引擎的垃圾回收机制无法正确的对内存进行释放（内存泄露），从而使得浏览器占用的内存不断增加，进而导致JavaScript和应用、操作系统性能下降。
50.JS垃圾回收机制
    问题引出
        使用不当的闭包将会在IE(IE9之前)造成内存泄漏
    IE9的JS引擎使用的垃圾回收算法是引用计数法 对于循环引用将会导致GC无法回收该回收的内存 造成无意义的内存占用 就是内存泄漏
    在变量进入执行环境时 会添加一个标记 当变量离开时 会添加一个离开标记 标记清除是GC在运行时会给所有变量加上标记 然后去掉那些还在环境中或还被环境中变量引用的变量 清除剩下还被标记的所有变量
    GC定义
        Garbage Collection缩写 意为垃圾回收
        垃圾:程序不用的内存空间(可能是之前用过了 以后不会再用)
        GC工作在JS引擎内部
    GC做了什么
        1.找到内存空间中的垃圾
        2.回收垃圾 让程序员能再次利用这部分空间
        PS:不是所有语言都有GC 
            Java JavaScript Python
            手动管理内存 C malloc/free C++ new/delete
    为什么要使用GC
        省去开发者手动管理内存的麻烦 从而减少Bug的产生 把精力留给更本质的编程工作
    必备的基础知识
        堆(HEAP) 关于动态存放对象的内存空间 对象在JS中是引用类型
        mutator GC中代表应用程序本身 暂且理解为mutator需要大量内存
        allocator mutator将需要内存的申请提交到此 allocator负责从推中调取足够内存空间供mutator使用
        活动对象/非活动对象
            代表通过mutator引用的对象   
    常见的几种GC算法
        引用计数法
            (该方法已经逐渐被标记-清除算法替代 V8引擎中使用最多的就是标记-清除算法)
            让所有对象实现记录下有多少程序在引用自己 让各对象都知道自己的被引用值
            优势:
                1.可即刻回收垃圾
                2.因为是即时回收 程序不会暂停去单独使用很长一段时间GC 最大暂停时间很短
                3.不用去遍历堆里面所有活动对象和非活动对象
            劣势:
                1.计数器需要占很大位置
                2.最大劣势无法解决循环引用无法回收问题
                (算法是将引用次数为0的对象销毁 此处都不为0 导致GC不会回收他们 这就是内存泄漏问题)
        标记清除法
            主要将GC的垃圾回收过程分为两个阶段
                标记阶段：把所有活动对象做上标记
                    根可以理解为我们的全局作用域 GC从全局作用域的变量 沿作用域逐层向里遍历(深层遍历)当遍历到堆中对象时 说明该对象被引用 则打上一个标记 继续递归遍历(因为肯定存在堆中对象引用另一个堆中对象)直到遍历到最后一个(
                        最深的一层作用域节点
                    )
                清除阶段: 把没有标记(也就是非活动对象)销毁
                    遍历整个堆 回收没有打上标记的对象
                    这种方法可以解决循环引用问题 因为两个对象从全局对象出发无法获取 因此他们无法被标记 他们会被垃圾回收机制回收
            优势:
                1.实现简单 打标记也就是打/不打两种可能 所以就一位二进制位就可以表示
                2.解决了循环引用问题
            缺点：
                1.造成碎片化(有点类似磁盘碎片化)
                2.再分配时遍次数多，如果一直没有找到合适的内存块大小，那么会遍历空闲链表(保存堆中所有空闲地址空间的地址形成的链表）一直遍历到尾端
        复制算法
            只把某个空间的活动对象复制到其他空间
            实现：
                将一个内存空间分为两部分
                一部分是From空间
                另一部分是To空间
                将From空间中的活动对象复制到To空间
                然后释放掉整个From空间
                然后此刻将From空间和To空间的身份互换
                完成一次GC
52.JS中浮点数精度问题
    toFixed()方法可把Number四舍五入为指定小数位数的数字。
    浮点数的存储(Number IEEE745 64位固定长度 标准double双精度浮点数)
        和其它语言如Java和Python不同，JavaScript中所有数字包括整数和小数都只有一种类型 — Number。它的实现遵循 IEEE 754 标准，使用64位固定长度来表示，也就是标准的 double 双精度浮点数（相关的还有float 32位单精度）。
    优点：
        可以归一化处理整数和小数，节省存储空间。
    64位比特又可分为三个部分：
        符号位S：第 1 位是正负数符号位（sign），0代表正数，1代表负数
        指数位E：中间的 11 位存储指数（exponent），用来表示次方数
        尾数位M：最后的 52 位是尾数（mantissa），超出的部分自动进一舍零
    浮点数计算
        1.十进制的0.1和0.2会被转换成二进制的，但是由于浮点数用二进制表示时是无穷的：
        2.IEEE 754 标准的 64 位双精度浮点数的小数部分最多支持53位二进制位，所以两者相加之后得到二进制为：
        3.因浮点数小数位的限制而截断的二进制数字，再转换为十进制，就成了0.30000000000000004。所以在进行算术计算时会产生误差。
    解决方法：
        1.toFixed 把toFixed重写一下
        2.解决浮点数计算精度
            1.可以把需要计算的数字升级（乘以10的n次幂）成计算机能够精确识别的整数，等计算完成后再进行降级（除以10的n次幂），这是大部分变成语言处理精度问题常用的方法。
            2.将浮点数toString后indexOf('.')
53.JSON(JavaScript Object Notation JS对象标记)
    背景介绍
    JSON(JavaScript Object Notation JS对象标记)
        是一种轻量级的数据交换格式 是基于ECMAScript(W3C制定JS规范)的一个子集
        在域后端的数据交互中有较为广泛的应用
        JSON出现之前 
        用XML传递数据 因为XML是一种纯文本格式
        它适合在网络上交换数据
        XML本身不算复杂
        但是加上DTD XSD XPath XSLT等一大推复杂的规范后
        发明JSON这种超轻量级的数据交换格式
        几乎所有语言都有解析JSON的库
        在JS中 我们可以直接使用JSON
        因为JS内置了JSON的解析
        把任何JavaScript对象变成JSON
        就是把这个对象序列化成一个JSON格式字符串
        这样才能通过网络传递给其他计算机
        如果我们受到一个JSON格式的字符串 
        只需要把它反序列化成一个JS对象
        就可以在JS中直接使用这个对象
    JSON对值的类型和格式有严格的规定
        复合类型的值
            只能是数组或对象不能是函数 正则表达式对象 日期对象
        简单类型的值
            只有四种 字符串 数值(必须以十进制表示) 布尔值 Null(不能使用NaN Infinity -Infinity undefined)
        字符串
            必须使用双引号表示 不能使用单引号
        对象
            键名必须放在双引号里面 数组或对象最后一个成员的后面 不能加逗号
        PS:空数组和空对象都是合格的JSON值 Null本身也是一个合格的JSON值
    JSON语法规则
        语法规则十分简单
            数组(Array)用方括号[]表示
            对象(Object){}
            名称/值对(name/value)组合成数组和对象
            名称(name)置于双引号中 值（value）有字符串、数值、布尔值、null、对象和数组。
            并列的数据之间用逗号（“,”）分隔
    实例
        JSON数据的书写格式是:名称/值对
    转义概述
        为什么需要转义
            JS中我们使用JS对象进行处理
            但在与后端数据交换的时候
            我们发送规定的JSON格式的字符串 
            所以在给后端发送或接受数据的时候
            需要转义
        JS对象 JSON JSON.stringfy()
        JSON  JS对象 JSON.parse()
    常见问题
        在JSON字符串转换为对象 还有eval_r('('+json字符串+')')方法
        但是在对目标数据进行读取时 可能会出现一些意外的错误
    解决方案
        原因：eval_r获取的json对象的值中，如果有执行代码，也将照样执行！所以若不能保证数据的安全性，不要使用eval_r方法进行转义。
    XML概念
        XML与Access,Oracle和SQL Server等数据库不同，数据库提供了更强有力的数据存储和分析能力，例如：数据索引、排序、查找、相关一致性等，XML的宗旨传输数据的，而与其同属标准通用标记语言的HTML主要用于显示数据。事实上XML与其他数据表现形式最大的不同是：他极其简单。这是一个看上去有点琐细的优点，但正是这点使XML与众不同。
55.正则表达式
    两种使用方式
        1.构造正则表达式(双反斜杠)
            new RegExp(pattern,attributes)
            该对象返回一个新的RegExp对象
            该对象包含知道你过的匹配模式和匹配标志
        2.正则表达式直接量(单反斜杠)
            /pattern/attributes
    三个标志修饰符
        g-global 指定字符串范围内执行所有匹配
        i case-insensitive（大小写不敏感）
        m   multiline（多行）的缩写，定义多行字符串匹配。
    JS exec()方法 执行正则表达式匹配
        regpxp.exec(string)
        regpxp 正则表达式对象
        string  要检索的字符串
        exec()返回一个数组 其中存放匹配的结果 未找到返回null
        除了数组元素和 length 属性之外，exec() 方法还会返回下面两个属性。
            index：匹配文本的第一个字符的下标位置。
            input：存放被检索的原型字符串，即参数 string 自身。
        在非全局模式下，exec() 方法返回的数组与 String.match() 方法返回的数组是相同的。
    JS test()方法 检测一个字符串是否匹配某个正则表达式
        regpxp.test(string)
        regexp 表示正则表达式对象
        参数 string 表示要检测的字符串
        如果字符串 string 中含有与 regexp 正则表达式匹配的文本，则返回 true；否则返回 false。
        全局模式下，test() 等价于 exec() 方法
    JS compile()方法 编译正则表达式
        重新编译正则表达式 在脚本执行过程中可以动态修改正则表达式的匹配模式。
        regexp.compile(regexp, modifier)
    JS RegExp的实例属性(成员属性)和静态属性
        RegExp实例属性
            global
            ignoreCase
            multiline
            lastIndex
            source
        RegExp静态属性
            通过RegExp对象直接访问
            记录了当前脚本中最新正则表达式匹配的详细信息
            这些静态属性大部分有两个名字
                长名(全称)
                短名(简称 以$开头)
    定义:
        正则表达式是一种通用的工具 在JS PHT JAVA Python C++等几乎所有编程语言中都能使用
        不同编程语言对正则表达式语法的支持不尽相同 
        有的编程语言支持所有语法 
        有的仅支持一个自己
    语法：
        体现在字符模式上 字符模式是一组特殊格式的字符串
        由一系列特殊字符和普通字符构成
        其中每个特殊字符都包含一定语义和功能
    描述字符/普通字符(如所有字母数字)
        根据正则表达式语法规则 大部分字符仅能描述自身 
    元字符
        拥有特殊功能的特殊字符 
        大部分需要加反斜杠进行标识 以作区别
        少部分需要加反斜杠以便转译成普通字符使用
        .   查找单个字符 除了换行和行结束符
        \w  查找单词字符
        \W  查找非单词字符
        \d  查找数字
        \D  查找非数字字符
        \s  查找空白字符
        \S  查找非空白字符
        \b  匹配单词边界
        \B  匹配非单词边界
        \0  查找NULL字符
        \n  查找换行符
        \f  查找换页符
        \r  查找回车符
        \t  查找制表符
        \v  查找垂直制表符
        \xxx查找以八进制数 xxxx规定的字符
        \xdd查找以十六进制 dd规定的字符
        \uxxxx查找以十六进制xxxx规定的Unicode字符
        使用十六进制需要添加“\x”前缀，主要是为了避免语义混淆，而八进制则不需要添加前缀
        ASCII 编码只能够匹配有限的单字节字符，使用 Unicode 编码可以表示双字节字符。Unicode 编码方式：“\u”前缀加上 4 位十六进制值。
    描述字符范围
        [abc]：查找方括号内任意一个字符。
        [^abc]：查找不在方括号内的字符。
        [0-9]：查找从 0 至 9 范围内的数字，即查找数字。
        [a-z]：查找从小写 a 到小写 z 范围内的字符，即查找小写字母。
        [A-Z]：查找从大写 A 到大写 Z 范围内的字符，即查找大写字母。
        [A-z]：查找从大写 A 到小写 z 范围内的字符，即所有大小写的字母。
        中括号内不要有空格 否则会误认为还要匹配空格
    选择匹配
        类似于 JavaScript 的逻辑与运算，使用竖线|描述，表示在两个子模式的匹配结果中任选一个
        为了避免歧义，应该为选择操作的多个子模式加上小括号。
    重复匹配
        n+      匹配任何包含至少一个n的字符串
        n*      匹配任何包含零个/多个n的字符串
        n?      匹配任何包含零个/一个n的字符串
        n{x}    匹配包含x个n的序列的字符串
        n{x,y}  匹配包含最少x个 最多y个n的序列的字符串
        n{x,}   匹配包含至少x个n的序列的字符串
    惰性匹配
        重复类量词都具有贪婪性，在条件允许的前提下，会匹配尽可能多的字符。
        ?、{n} 和 {n,m} 重复类具有弱贪婪性，表现为贪婪的有限性。
        *、+ 和 {n,} 重复类具有强贪婪性，表现为贪婪的无限性。
        针对 6 种重复类惰性匹配的简单描述如下：
            {n,m}?：尽量匹配 n 次，但是为了满足限定条件也可能最多重复 m 次。
            {n}?：尽量匹配 n 次。
            {n,}?：尽量匹配 n 次，但是为了满足限定条件也可能匹配任意次。
            ??：尽量匹配，但是为了满足限定条件也可能最多匹配 1 次，相当于 {0,1}?。
            +?：尽量匹配 1 次，但是为了满足限定条件也可能匹配任意次，相当于 {1,}?。
            *? ：尽量不匹配，但是为了满足限定条件也可能匹配任意次，相当于 {0,}?。
    边界量词
        确定匹配模式的位置 如字符串的头部/尾部
        ^   匹配开头 在多行检测中 会匹配一行的开头
        $   匹配结尾 在多行检测中 会匹配一行的结尾
    声明词量
        声明表示条件的意思。声明词量包括正向声明和反向声明两种模式。
    子表达式
    反向引用
    禁止引用
56.JSX
    引入:
        一般情况下写Vue还是比较推荐template写法 
        但有时候需要更灵活做一些功能就要使用到JSX
    JSX:
        JSX是一种JS语法扩展 JSX=Javascript+XML
        即在JavaScript中写XML
        因为JSX
59.函数式编程 面向切面编程
    函数式编程
        引入纯函数的概念来帮助编程
        纯函数对于相同的输入
        永远会得到相同的输出
        且没有任何可观察副作用
        也不依赖外部环境的状态
        它是一种编程范式
        RXJS用到了它

        RxJS是一个库 通过使用observable序列来编写异步和基于事件的程序
        它提供了一个核心类型Observable 
        附属类型(Observer Schedulers Subjects) 和受 [Array#extras] 启发的操作符 (map、filter、reduce、every, 等等)，这些数组操作符可以把异步事件作为集合来处理。)

        可以把RxJS当作用来处理事件的Lodash
    面向切面编程 AOP    
60.多重继承实现
    JS本身不提供多重继承
    可以模拟多重继承 但它会大大增加代码复杂度和维护难度
    可能会出现的数据类型
        图
    导致问题
        查找时出现循环 改成委托行为(数据结构变链表)        
63.JS多重继承怎么实现 可能会出现什么数据结构 从而导致什么问题
    JS本身不提供多重继承
    可以模拟多重继承
    但它会大大增加代码复杂度和维护难度
    可能会出现的数据结构
        图
63.模板字符串
    1.模板字符串中，空格、缩进、换行都会被保留(可用trim函数消除)
    2.支持嵌入变量和任意JS表达式 支持嵌套

64.script标签的defer和async属性
    script标签
    用于加载脚本和执行脚本
    直接使用script脚本 
    HTML会按照顺序加载并执行脚本
    脚本加载&执行过程中
    会阻塞后续的DOM渲染
    
    script标签提供两个属性async&await解决阻塞DOM渲染问题

    script标签存在两个属性 defer和async
    script标签的使用分为三种情况
    1.<script src="example.js"></script>
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
            这样能剩下一部分下载时间)
            资源的下载是在解析过程中进行的
            虽说script脚本会很快加载完毕
            但它前面script2并没有加载&执行
            它只能处于一个挂起状态
            等待script2执行完毕后再执行
            当这两个脚本都执行完毕后 才会继续解析页面
    2.<script async src="example.js"></script>
        有了async属性 
        表示后续文档的加载和渲染与JS脚本的加载和执行是并行进行的 即异步执行
        async
            1.设置
                会使script脚本异步的加载并在允许的情况下执行
            2.执行
                不会按script在页面中的顺序来执行 而是谁先加载完 谁执行
            DOMConetntLoaded事件触发不会受async脚本加载影响
            脚本加载完之前 就已经触发DOMContentLoaded
            如果给async一定事件 有可能在DOMContentLoaded事件之前执行
        PS：async执行是加载完成后就会去执行
            不像defer要等待所有脚本加载完后 按顺序执行
    3.<script async src="example.js"></script>
        有了defer属性
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
    1.defer和async在网络加载过程是一致的，都是异步执行的；  
    2.两者的区别在于脚本加载完成之后何时执行，
        可以看出defer更符合大多数场景对应用脚本加载和执行的要求；
    3.如果存在多个有defer属性的脚本，
        那么它们是按照加载顺序执行脚本的；
        而对于async，它的加载和执行是紧紧挨着的，
        无论声明顺序如何，只要加载完成就立刻执行，
        它对于应用脚本用处不大，因为它完全不考虑依赖。

        
        文档解析
        脚本加载
        脚本执行
        DOMContentLoaded







































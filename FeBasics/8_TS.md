1. TS与JS区别
- TS
    > 一种由微软开发的自由和开源的编程语言 它是js的一个超集 本质上向这个语言添加了可选的静态类型和基于类的面向对象编程
    > TS提供最新的和不断发展的js特性 如异步功能和Decorators 以建立健壮的组件
    1. JS的超集用于解决大型项目的代码复杂性
    2. 可以在编译期间发现并纠正错误
    3. 强类型 支持静态和动态类型
    4. 最终被编译成js代码 使浏览器可以理解
    5. 支持模块 范型和接口
    6. 社区的支持仍在增大 但还不是很大
- JS
    1. 一种脚本语言 用于创建动态网页
    2. 作为一种解释型语言 只能在运行时发现错误
    3. 弱类型 没有静态类型选项
    4. 可以直接在浏览器中使用
    5. 不支持模块 泛型 或接口
    6. 大量的社区支持以及大量文档和解决问题的支持
2. 获取ts
- 命令行的ts编译器可以使用npm包管理器来安装
    1. 安装ts
    ```
    npm install -g typescript
    ```
    2. 验证ts
    ```
    tsc -v
    ```
    3. 编译ts文件
    ```
    tsc hellworld.ts
    ```
3. 典型ts工作流程
- ts文件被ts编译器 根据配置的变异选项编译成js文件 对于大多数使用ts开发的web项目 还会对编译生成的js文件进行打包处理 然后再进行部署
4. ts基础类型
    1. boolean
    ```
    let isDone:boolean = false;
    ``` 
    2. Number
    ```
    let count:number = 10;
    ```
    3. String
    ```
    let name:string = 'se'
    ```
    4. Symbol
    ```
    const sym = Symbol()
    let obj = {
        [sym]:"semlinker"
    }
    ```
    5. Array
    ```
    let list:number[] = [1,2,3]
    let list:Array<number> = [1,2,3]//Array泛型语法
    ```
    6. Enum
    使用枚举可以定义一些带名字的常量 使用枚举可以清晰地表达意图或创建一组有区别的用例 ts支持数字 和基于字符串的枚举
    > 数字枚举
    > 数字枚举类型除了支持从成员名称到成员值的普通映射 还支持从成员值到成员名称的反向映射
    > 数字枚举相对于字符串枚举多了反向映射
    ```
    enum Direction{
        NORTH,
        SOUTH,
        EAST,
        WEST
    }
    let dir:Direction = Direction.NORTH;
    NORTH初始值为0 其余成员从1开始自动增长
    ```
    > 字符串枚举
    > 纯字符串枚举 不能省略任何初始化程序 数字枚举没有显式设置值时 会使用默认规则进行初始化
    ```
    enum Direction{
        NORTH="NORTH",
        SOUTH="SOUTH",
        EAST="EAST",
        WEST="WEST"
    }
    ```
    > 常量枚举
    > 使用const关键字修饰的枚举 常量枚举会使用内联语法 不会为枚举类型编译生成任何js 
    > 异构枚举
    > 成员值是数字和字符串的混合
    7. Any
    ts中 任何类型都可以被归为any类型 这让any类型成为了类型系统的顶级类型(也被称为全局超级类型)
    any类型本质上是类型系统的一个逃逸舱
    8. Unknown
    所有类型可以赋值给unknown 使得unknown成为ts类型系统的另一种顶级类型
    unknown类型只能被赋值给any类型和unknown类型本身
    9. Tuple
    - 数组一般由同种类型的值组成 但有时我们需要在单个变量中存储不同类型的值 这时就可以使用元组 在js中是没有元组的 元组是ts中特有的类型 工作方式类似于数组
    - 元组可用于定义具有有限数量的未命名属性的类型 每个属性都有一个关联的类型 使用元组时 必须提供每个属性的值
    ```
    let tupleType:[string,boolean];
    tupleType=["string",true];
    ```
    10. void
    - 某种意义上和any类型相反 表示没有任何类型 当一个函数没有返回值时 通常会见到其返回值类型是void
    - 声明一个void类型的变量没有什么作用 严格模式下 它的值只能为undefined
    11. Null Undefined
    ts中 undefined和null有各自的类型分别为undefined和null
    ```
    let u:undefined = undefined;
    let n:null = null;
    ```
    12. object Object {}
    - object类型 ts2.2引入的新类型 用于表示非原始类型
    - Object类型 所有Object类的实例的类型 由以下两个接口来定义
        - Object 接口定义Object.proptotype原型对象上的属性
        - ObjectConstructor 接口定义Object类的属性
        - Object类的所有实例都继承了Object接口中的所有属性
    - {}类型 描述一个没有成员的对象 当试图访问这样一个对象的任意属性时 TS会产生一个编译时错误 但仍可使用在Object类型上定义的所有属性和方法 这些属性和方法可通过JS原型链隐式调用
    13. Never类型
    - 表示那些永不存在值的类型 never类型是那些总会抛出异常或根本不会有返回值的函数表达式或尖头函数表达式的返回值类型
    - 返回never的函数必须存在无法达到的终点 在ts中 可以利用never类型的特性实现全面性检查
    - never类型是任何类型的子类型 也可以赋值给任何类型 然而没有类型是never的子类型或可以赋值给never类型(除了never本身之外)即使any也不可以赋值给never
5. TS断言(类似其他语言中的类型转换 但是不进行特殊的数据检查和解构)
    > (类型断言/非空断言/确定赋值断言)
    1. 类型断言 类型断言类似其他语言中的类型转换 但是不进行特殊的数据检查和解构 它没有运行时影响 只是在编译阶段起作用
        > 类型断言有两种形式
        1. 尖括号语法
        ```
        let someValue:any = "string";
        let strLength:number = (<string>someValue).length
        ```
        2. as语法
        ```
        let someValue:any = "string";
        let strLength:number = (someValue as string).length
        ```
    2. 非空断言
        > 上下文中当类型检查器无法判定类型时 一个新的后缀表达式操作符!可以用于断言操作对象是非null和非undefined类型 具体而言 x!将从x值域中排除null和undefined
        1. 忽略undefined和null类型
        2. 调用函数时忽略undefined类型
        > 非空断言操作符会从编译生成的js代码中移除 实际使用中应注意
    3. 确定赋值断言
        > 允许在实例属性和变量声明后放置一个! 告诉ts该属性会被明确赋值
        > 通过let x!:number 确定赋值断言 TS编译器会知道该属性会被明确赋值
6. 类型守卫
    > (in关键字/typeof关键字/instanceof关键字/自定义类型保护的类型谓词)
    - 是可执行运行时检查的一种表达式 用于保证该类型在一定范围内
    - 类型保护可以保证一个字符串是一个字符串 类型保护和特性检测并不是完全不同 其主要思想是常识检测属性 方法或原型 以确定如何处理值
    - 目前主要有四种方式实现类型保护
    1. in关键字
    2. typeof关键字
    3. instanceof关键字
    4. 自定义类型保护的类型谓词
7. 联合类型和类型别名
    >(联合类型/可辨识类型)
    1. 联合类型
    > 联合类型通常和null或undefined一起使用
    > 1 2 click被称为字面量类型
    ```
    let num:1|2=1;
    type EventsNames='click'|'scroll'|'mousemove'
    ```
    ```
    let num:1|2 = 1;
    type EventNames = 'click'|'scroll'|'mousemove'
    ```
    > 以上示例中的1 2 或click被称为字面量类型 用来约束取值只能是某几个值中的一个
    2. 可辩识联合
    - 也称为代数数据类型或标签联合类型 
    - 它包含三个要点 可辨识 联合类型 类型守卫
    - 这种类型的本质是结合联合类型和字面量类型的一种类型保护方法 
    - 如果一个类型是多个类型的联合类型 且多个类型含有一个公共属性 则可以用这个属性 来创建不同的类型保护区块
    1. 可辨识
    > 可辨识要求联合类型中的每个元素都含有一个单例类型属性
    2. 联合类型
    3. 类型守卫
    4. 类型别名 用来给一个类型起新名字
8. 交叉类型
    (&)
    > 将多个类型合并为一个类型 通过&运算符可以将现有的多种类型叠加到一起成为一种类型 它包含了所需的所有类型的特性
    ```
    type PartialPointX = {x:number};
    type Point = PartialPointX & {y:number}
    let point:Point={
        x:1,
        y:1
    }
    ```
    1. 同名基础类型属性的合并
    2. 同名非基础类型属性的合并 混入多个类型 若存在相同成员 且成员类型为非基本数据类型 可以成功合并
    3. string&number never
9. TS函数区别
    - TS-JS函数区别
    1. 含有类型 无类型
    2. 箭头函数 箭头函数(ES2015)
    3. 函数类型 无函数类型
    4. 必填和可选参数 所有参数都是可选的
    5. 默认参数 默认参数
    6. 剩余参数 剩余参数
    7. 函数重载 无函数重载
    - 函数类型
    ```
    let IdGenerator:(chars:string,nums:number)=>string;
    function createUserId(name:string,id:number):string{
        return name+id;
    }
    IdGenerator = createUserId;
    ```
    - 可选参数和默认参数
    - 可选参数 可选参数要放在普通参数后面 不然会导致编译错误
    ```
    function createUserId(name:string,id:number,age?:number):string{
        return name+id;
    }
    ```
    - 默认参数
    ```
    function createUserId(
        name:string = "se",
        id:number,
        age?:number
    ):string{
        return name+id
    }
    ```
    - 函数重载
    - 函数重载或方法重载是使用相同名称和不同参数数量或类型创建多个方法的一种能力
    - ts中除了可以重载普通函数 还可以重载类中的成员方法
    > 方法重载是指在同一个类中方法同名 参数不同(参数类型不同 参数个数不同 或参数个数相同时参数的先后顺序不同) 调用时根据实参的形式 选择与它匹配的方法执行操作的一种技术 
    > 类中成员方法满足重载的条件是:在同一个类中 方法名相同且参数列表不同
    > ts编译器处理函数重载时 它会查找重载列表 尝试使用第一个重载定义 定义重载时 要把最精确的定义放在最前面
10. ts数组 ts对象
    > 数组解构
    ```
    let x:number;let y:number;let z:number;
    let five_array = [0,1,2,3,4];
    [x,y,z] = five_array;
    ```
    > 数组展开运算符
    ```
    let two_array = [0,1];
    let five_array = [...two_array,3,4,5];
    ```
    > 对象解构
    ```
    let person = {
        name:'lisi',
        gender:'male'
    }
    let {name,gender} = person;
    ```
    > 对象展开运算符
    ```
    let person = {
        name:'lisi',
        gender:'male'
    }
    //组装对象
    let personWithAge = {...person,age:23}
    //获取除某些项外的其他项
    let {name,...rest} = person;
    ```
11. ts接口
    (对象的形状/可选?｜只读readonly属性/任意属性any/接口interface 类型别名type)
    - 面向对象语言中 接口是一个很重要的概念 它是对行为的抽象 而具体如何行动需要由类去实现
    - ts中的接口是一个非常灵活的概念 除了可用于对类的一部分行为进行抽象外 也常用于对[对象的形状(Shape)]
    1. 对象的形状
        ```
        interface Person{
            name:string;
            age:number;
        }
        let semlinker:Person = {
            name:"semlinker",
            age:33
        }
        ```
    2. 可选|只读属性
        ```
        interface Person{
            readonly name:string;
            age?:number;
        }
        ```
        只读属性用于限制只能在对象刚刚创建时修改其值 此外ts还提供ReadonlyArray<T>类型 它与Array<T> 只是把所有可变方法去掉了 因此可以确保数组创建后不能被修改
        ```
        let a:number[] = [1,2,3,4];
        let ro:ReadonlyArray<number> = a;
        ro[0] = 12;//error
        ro.push(5);//error
        ro.length = 100; //error
        a = ro;//error
        ```
    3. 任意属性
        一个接口中除了包含必选和可选属性之外 还允许有其他的任意属性 可以使用索引签名的形式满足上述要求
        ```
        interface Person{
            name:string;
            age?:number;
            [propName:string]:any;
        }
        const p1 = {name:"se"};
        const p2 = {name:"lolo",age:5};
        const p3 = {name:"ka",sex:1}
        ```
    4. 接口和类型别名的区别
        1. Objects/Functions
        > 接口和类型别名都可以用来描述对象的形状或函数签名
        > 接口
        ```
        interface Point{
            x:number;
            y:number;
        }
        interface SetPoint{
            (x:number,y:number):void;
        }
        ```
        类型别名
        ```
        type Point = {
            x:number;
            y:number;
        }
        type SetPoint = (x:number,y:number)=>void
        ```
    5. 与类型别名不同 接口可以定义多次 会被子弟哦那个合并为单个接口
12. TS类
    > 面向对象语言中 类是一种面向对象计算机编程语言的构造 是创建对象的蓝图 描述了所创建对象共同的属性和方法
    1. 类的属性与方法
    2. ECMADcript私有字段
    3. 访问器
    4. 类的继承
    5. 抽象类
    6. 类方法重载
13. TS泛型
    - 泛型是指在定义函数接口或类时 不预先指定具体类型 使用时再去指定类型的一种特性 可以把泛型理解为代表类型的参数
    - 希望传入的值是什么类型 返回值就是什么类型 传入值是任意类型 此时可用到泛型 如果是any 失去类型检查的意义
    - 使用时再指定类型 也可不指定类型 TS会自动类型推导
    > 像C#和Java语言中 可以使用泛型来创建可重用的组件 一个组件可以支持多种类型的数据 这样用户可以以自己的数据类型来使用组件
    > 设计泛型的关键目的是在成员之间提供有意义的约束 这些成员可以是：类的实例成员 类的方法 函数参数和函数返回值
    > 泛型是允许同一个函数接受不同类型参数的一种模版 相比于使用any类型 使用泛型来创建可复用的组件更好 因为泛型会保留参数类型
    > T代表Type 在定义泛型时通常用作第一个类型变量名称 实际上T可以用任何有效名称代替 除了T 以下是常见泛型变量代表的意思
    - K(Key) 表示对象中键类型
    - V(Value) 表示对象中值类型
    - E(Element) 表示元素类型
    > 不是只能定义一个类型变量 可以引入希望定义的任何数量的类型变量 如引入一个新的类型变量U 用于跨站定义的identity函数
14. TS装饰器
    > 装饰器 一种特殊类型的声明 本质上就是一个方法 可以注入到类 方法 属性 参数上 扩展其能力 
    - 装饰器在写法上有:普通装饰器(无法传参) 装饰器工厂(可传参) 
    > 装饰器 
    1. 它是一个表达式
    2. 该表达式被执行后返回一个函数
    3. 函数的入参分别为target name 和 descriptor
    4. 执行该函数后 可能返回descriptor对象用于配制target对象
    > 装饰器分类
    1. 类装饰器(Class decorators)
    2. 属性装饰器(Property decorators)
    3. 方法装饰器(Method decorators)
    4. 参数装饰器(Parameter decorators)
    > 若要启用实验性的装饰器特性 必须在命令行或tscofig.json里启动experimentalDecorators

    > 类装饰器
    - 类装饰器在类生命之前被声明 应用于类构造函数 可以监视修改替换类的定义 传入一个参数
    - 类装饰器声明
    ```
    declare type ClassDecorator = <TFunction extends Function>{
        target:TFunction
    }=> TFunction|void
    ```
    - 类装饰器 是用来装饰类的 它接收一个参数
    - target:TFunction - 被装饰的类
    
    > 属性装饰器
    - 会在运行时当作函数被调用 传入两个参数
    1. 对于静态成员来说是类的构造函数 对于实例成员来说是类的原型对象
    2. 成员的名字
    ```
    declare type PropertyDecorator = (target:Object,
        propertyKey: string | symbol)=> void;
    ```
    - 属性装饰器顾名思义 用来装饰类的属性 它接收两个参数
    - target:Object 被装饰的类
    - propertyKey:string|symbol 被装饰类的属性名

    > 方法装饰器
    - 方法装饰器被应用到方法的属性描述符上 可以用来监视修改 替换方法的定义
    - 方法装饰器会在运行时传入3个参数
    1. 对于静态成员来说是类的构造函数 对于实例成员来说是类的原型对象
    2. 成员的名字
    3. 成员的属性描述符
    ```

    ```
    - 方法装饰器 用来装饰类的方法 它接收三个参数
    - target:Object- 被装饰的类
    - propertyKey:string|symbol 方法名
    - descriptor:TypePropertyDescript 属性描述富

    > 参数装饰器
    - 参数装饰器会在运行时调用 可以为类的原型增加一些元素数据 传入三个参数
    1. 对于静态成员来说是类的构造函数 对于实例成员来说是类的原型对象
    2. 方法名称 如果装饰的是构造函数的参数 则值为undefined
    3. 参数在函数参数列表中的索引
    - 参数装饰器智能用来监视一个方法的参数是否被传入
    - 参数装饰器在Angular中被广泛使用 
    - 参数装饰器的返回值会被忽略
    ```
    declare type ParameterDecorator = (target:Object,propertyKey:string|symbol,parameterIndex:number)=>void
    ```
    - 参数装饰器 装饰函数参数 接收三个参数
    - target:Object 被装饰的类
    - propertyKey:string|symbol 方法名
    - paramseterIndex:number 方法中参数的索引值

    > 装饰器的执行顺序
    1. 装饰器组合 TS支持多个装饰器同时装饰到一个声明上 语法支持从左到右 或从上到下书写
    2. TS中 当多个装饰器应用在一个声明上时会进行如下步骤的操作
        1. 由上至下依次对装饰器表达式求值
        2. 求值的结果会被当作函数 由上至下依次调用
    3. 不同装饰器的执行顺序
        - 属性装饰器>方法装饰器>参数装饰器>类装饰器
15. ts4.0新特性
    1. 构造函数的类属性推断
    - 当noImplicitAny配置属性被启用之后 ts4.0可以使用控制流分析来确认类中的属性类型
    ```
    class Person{

    }
    ```
    - 从构造函数推断类属性的类型 该特性给我们带来便利 但是在使用过程中 无法保证对成员属性都进行复制 则该属性会被认为是undefined
    2. 标记的元组类型
    - ts4.0支持为元组类型设置标签
    ```
    function addPerson(...args:[name:string,age:number]):void{
        console.log(`Person info:name:${args[0]},age:${args[1]}`)
    }
    ```
16. 编译上下文
    > tsconfig.json作用
    1. 标识ts项目的根路径
    2. 配置ts编译器
    3. 指定编译的文件
    > tsconfig.json重要字段
    1. files- 设置要编译的文件的名称
    2. include- 设置需要进行编译的文件 支持路径模式匹配
    3. exclude- 设置无需进行编译的文件 支持路径模式匹配
    4. compilerOptions 设置与编译流程相关的选项
17. ts开发辅助工具
    1. TypeScript Playground 在线ts运行环境
    2. TypeScript UML Playground 一款在线ts UML工具 可为指定TS代码生成UML类图
    3. JSON TO TS ts在线工具 为指定的JSON数据生成对应的ts接口定义
    4. Schemats 基于SQL数据库中的schema自动生成TS接口定义
    5. TS AST Viewer ts ast在线工具 可查看指定ts代码对应的AST抽象语法树
    6. TypeDoc 用于将TS源代码中的注释转换成HTML文档或JSON模型 可灵活扩展支持多种配置
    7. TS ESLint 

1. TS1.5版本的改动
    1. TS1.5之前的版本 module关键字既可以称作内部模块 也可以称作外部模块
    2. TS1.5版本 术语名发生变化 内部模块的概念更接近命名空间 自此后称作命名空间 module x{...}相当于现在推荐的写法namespace X{...} 外部模块对于JS来讲是模块(ES6模块系统将每个文件视为一个模块) 所以自此之后简称模块
2. null和undefined是其他类型(包括void)的子类型 可以赋值给其他类型(如数字类型)
    - 默认情况下编译器会提示报错 因为tsconfig.json中有一个配置项默认开启
    - strictNullChecks参数用于新的严格空检查模式 在严格空检查模式下 null和undefined值都不属于任何一个类型 它们只能赋值给自己这种类型或any
3. never和void的区别
    1. void表示没有任何类型(可以被赋值为null和undefined)
    2. never表示一个不包含值的类型 永远不存在的值
    3. 拥有 void 返回值类型的函数能正常运行。拥有 never 返回值类型的函数无法正常返回，无法终止，或会抛出异常。
4. 元祖越界问题
    ```
    let aaa: [string, number] = ['aaa', 5];
    // 添加时不会报错
    aaa.push(6);
    // 打印整个元祖不会报错
    console.log(aaa); // ['aaa',5,6];
    // 打印添加的元素时会报错
    console.log(aaa[2]); // error
    ```
5. 枚举成员的特点
    1. 是只读属性 无法修改
    2. 枚举成员值默认从0开始递增 可以自定义设置初始值
    > 枚举成员值
    1. 可以没有初始值
    2. 可以是一个对常量成员的引用
    3. 可以是一个常量表达式
    4. 可以是一个非常量表达式
6. 常量枚举和普通枚举的区别
    1. 常量枚举会在编译阶段被删除
    2. 枚举成员只能是常量成员
    3. 常量枚举不能包含计算成员 如果包含计算成员 会在编译阶段报错
7. 枚举使用场景
    1. 可读性差：难记住数字的含义
    2. 可维护性差：硬编码 后续修改
8. 什么是
    > 可索引类型接口
    1. 一般用来约束数组和对象
    > 函数类型接口
    2. 对方法传入的参数和返回值进行约束
    > 类类型接口
    1. 如果接口用于一个类 接口会表示行为的抽象
    2. 对类的约束 让类实现接口 类可以实现多个接口
    3. 接口只能约束类的公有成员(实例属性/方法)无法约束私有成员 构造函数 静态属性/方法
    > 混合类型接口
    1. 一个对象可以同时作为函数和对象使用
9. 什么是函数重载
    1. 在Java中的函数重载 指的是两个或两个以上的同名函数 参数类型不同或参数个数不同 函数重载的好处是 不需要为功能相似的函数起不同的名称
    2. 在TS中 表现为给同一个函数提供多个函数类型定义 适用于接收不同的参数和返回不同结果的情况
    3. TS实现函数重载时 要求定义一系列的函数声明 在类型最宽泛的版本中实现重载
        - 前面是函数声明 目的是约束参数类型和个数 最后的函数实现是重载 表示要遵循前面的函数声明 一般在最后的函数实现时用any类型
    4. 函数重载在实际应用中使用的比较少 一般会用联合类型或泛型代替
    5. 函数重载的声明只用于类型检查阶段 编译后会被删除
    6. TS 编译器在处理重载的时候，会去查询函数申明列表，从上至下直到匹配成功为止，所以要把最容易匹配的类型写到最前面
10. 访问控制修饰符
    1. 默认 public 定义的类中 类的实例 子类 子类实例都可以访问
    2. protected 只能在定义的类和子类中访问 不允许通过实例(定义的类的实例和子类实例)访问
    3. private 只能在定义的类中访问 类的实例 子类 子类实例都不可访问

14. 类型谓词 
    1. 类型保护函数: 要自定义一个类型保护 只要简单地为这个类型保护定义一个函数即可 这个函数的返回值是一个类型谓词
    2. 类型谓词的语法为parameterName is Type这种形式 其中parameterName必须是当前函数签名里的一个参数名
15. 可选链运算符的使用
    1. 可选链运算符是一种先检查属性是否存在 再尝试访问该属性的运算符 其符号为?
    2. 如果运算符左侧的操作数?计算为undefined或null 则表达式求值为undefined 否则正常触发目标属性的访问 方法或函数调用
    3. 可选链运算符处于stage3阶段 使用@babel/plugin-proposal-optional-chaining插件可以提前使用 TS3.7版本正式支持使用 以前的版本会报错
    1. a?.b 相当于 a == null?undefined:a.b
        - 如果a是null或者undefined 则返回undefined否则返回a.b的值
    2. a?.[x] 相当于a ===null?undefined:a[x]
        - 如果a是null/undefined 则返回undefined 否则返回a[x]
    3. a?.b() 相当于a === null?undefined:a.b()
        - 如果a是undefined/null 返回undefined
        - 如果a.b不是函数 会抛类型错误异常 否则计算a.b()的结果
16. 非空断言符
    - TS3.7版本正式支持使用
    ```
    let root2:(HTMLElement|null) = document.getElementById('root')
    //非空断言符 这样写只是为了骗过编译器 防止编译时报错 打包后的代码可能还是会报错
    ```
17. 空值合并运算符??的使用
    - TS3.7版本正式支持使用
    - ||运算符的缺点: 当左侧表达式的结果是数字0或空字符串时 会被视为false
    - 空值合并运算符: 只有左侧表达式结果为null/undefined时 才会返回右侧表达式的结果 通过这种方式明确区分undefined null 与false的值
18. typeof class和直接使用class作为类型有什么区别
    - 获取的是实例的类型 该类型可以获取实例对象上的属性/方法
    ```
    let greeter1:Greeter = new Greeter();
    ```
    - 获取的是类的类型 该类型可以获取类上的静态属性/方法
    ```
    let greeterTwo:typeof Greeter = Greeter;
    ```
19. TS中的never类型具体有什么用
    1. 使用联合类型时 类型未确定时 默认只会从中获取共有的部分
        - 使用类型断言
        - 可区分的联合类型(借助never)
            - 如果联合类型中的多个类型 拥有共有的属性 就可以凭借这个属性创建不同的类型保护区块
20. 全局环境中 不能给某些变量声明类型
    ```
    let name:String;
    //加了export后就不会报错
    //export {}
    ```
21. 不必要的命名空间:命名空间和模块不要混在一起使用 不要在一个模块中使用命名空间 命名空间要在一个全局的环境中使用
22. 扩展全局变量的类型
23. export = xxx和import xxx = require('xxx')
24. 如何在Node中使用TS
    1. 安装相关声明文件 如@types/node
    2. 因为node模块遵循CommonJS规范 一些node模块(如express)的声明文件 用export = xxx导出模块声明 TS进行类型推导时 会无法推断导致报错 所以需要使用import xxx from 'xxx'/import xxx = 'xxx'导入Node模块
25. 使用as替代尖括号表示类型断言
    1. TS中可以使用尖括号表示类型断言 但是结合JSX语法时将带上解析上的困难 因此TS在.tsx文件中禁用使用尖括号的类型断言
    2. as操作符在.ts文件和.tsx文件里都可用
26. 如何对JS文件做类型检查
27. 不要使用如下类型 Number String Boolean Object 应该使用类型number string boolean object
28. 如何在解构一个函数function fn({x:number}){}既能给变量声明类型 又能给变量设置默认值
    ```
    function f({x}:{x:number} = {x:0}){
        console.log(x)
    }
    ```
29.  Pick 摘取返回的结果是一个对象（或者说新的接口），里面包含摘取到的属性
30. 无法使用 for of 遍历 map 数据
31.  有时候我们需要复用一个类型，但是又不需要此类型内的全部属性，因此需要剔除某些属性
32. 为什么在 exclude 列表里的模块还会被编译器使用
33. 使用 import xxx= namespace.xxx 创建命名空间别名
34. 交叉类型
    - 交叉类型是将多个类型合并为一个类型 让我们可以把现有的多种类型叠加到一起成为一种类型 它包含了所需的所有类型的·特性 如Person&Serializabel&Loggable同时是Person和Serializable和Loggable 就是说这个类型的对象同时拥有这三种类型的成员
> tsconfig.json配置项问题
1. 三种JSX模式
    - TS中想使用JSX必须做两件事
        1. 给文件一个.tsx扩展名
        2. 启动jsx选项
    - TS有三种JSX模式 preserve react 和react-naice 这些模式只在代码生成阶段起作用 类型检查并不受影响

> ts一些高级操作符
- (keyof/in/infer)
- (partial/required/readonly/pick/record/exclude/exact/omit)
1. keyof
    - keyof与Object.keys略有相似 只是keyof是取interface的键 且keyof取到键后会保存为联合类型
    ```
    interface iUserInfo{
        name:string;
        age:number;
    }
    type keys = keyof iUserInfo;//name|age
    ```
    ```
    function getValue<T extends Object,K extends keyof T>(o:T,key:K):T[k]{
        return o[key]
    }
    ```
2. in
    - in用于取联合类型的值 主要用于数组和对象的构造
    ```
    type name = 'firstName'|'lastName';
    type TName = {
        [key in name]:string
    }
    ```
    - 切记不要用于interface会报错
3. infer关键字
    - 现在在有条件类型的extends子语句中 允许出现infer声明 它会引入一个待推断的类型变量 这个推断的类型变量可以在有条件类型的true分支中被引用 允许出现多个同类型变量的infer
    1. 只能出现在有条件类型的extends子语句中
    2. 出现infer声明会引起一个待推断的类型变量
    3. 推断的类型变量可以在有条件类型的true分支中被引用
    4. 允许出现多个同类型变量的infer
    > infer实例 
    - 使用infer获取函数参数Parameters
    ```
    type TArea = (width:number,height:number)=>number;
    type params = Parameters<TArea>;
    ```
4. 
    > Partial
    - 将某个类型里的属性全部变为可选项?
    type Partial<T> = {
        [P in keyof T]?:T[P];
    }
    > Required
    - 将属性变为必须
    ```
    typpe Required<T> = {
        [P in keyof T]-?:T[P]
    }
    ```
    > Readonly
    - 将属性变为只读
    ```
    type Readonly<T> = {
        readonly [P in keyof T]:T[P]
    }
    ```
    > Pick 
    - 把一些属性挑选出来
    ```
    type Pick<T,K extends keyof T> = {
        [P in K]:T[P]
    }
    ```
    > Record<K extends keyof any,T>
    - Record用于创建一个具有同类型属性值的对象
    ```
    type Record<K extends keyof any,T>={
        [P in K]:T
    }
    ```
    > Excluede<T,U>
    - 从类型T中删除所有可以赋值给U的属性 然后构造一个类型主要用于联合类型
    > Extract<T U>
    - 功能和Exclude相反
    > Omit<T K extends keyof any>
    - 只要用于剔除interface中的部分属性 比如接口iUser包含name age firstName location属性 而接口iUser2不包含location属性
    ```
    type iUser2 = Omit<iUser,'location'>
    ```
5. extends和infer
    > TS2.8引入了条件类型关键字exends
    ```
    T extends U?X:Y
    ```
    - 有时我们定义的泛型不想过于灵活或说想继承某些类 可以通过extends关键字添加泛型约束
    - 这个泛型函数被定义了约束 因此它不再是适用于任何类型
    - 如果T包含的类型是U包含的类型的子集 则取结果X 否则取结果Y
    > 分配式extends
    - 上面的T为联合类型时 会进行拆分
    > extends语句中 支持infer关键字 可以推断一个类型变量 高效地对类型进行模式匹配 但是这个类型变量只能在treu的分支中使用
    - infer X就相当于声明了一个变量 这个变量随后可以使用 类似for循环中的声明语句
    - 不同的是infer X这个位置本应该有一个写死的类型变量 只不过用infer R替换了 更灵活
    - 需要注意infer声明的这个变量只能在true分支中使用
6. implements和extends区别
    1. implements
        - 实现 一个新的类 从父类或者接口实现所有的属性和方法 同时可以重写属性和方法 包含一些新的功能
    2. extends
        - 继承 一个新的接口或类 从父类或接口继承所有的属性和方法 不可以重写属性 但可以重写方法
    > PS
    1. 接口不能实现接口或类 所以实现只能用于类身上 即类可以实现接口或类
    2. 接口可以继承接口或类
    3. 类不可以继承接口 类只能继承类
    4. 可多继承或多实现
7. 构造函数
    - 一种特殊的方法 主要用来在创建对象时初始化对象 即为对象变量赋初始值 总与new运算符一起使用在创建对象的语句中 ts的构造函数用关键字constructor实现 可以通过this关键字来访问类中的属性和方法
8. 实例化
9. 方法重写
    - 子类可继承父类中的方法 而不需要重新编写相同的方法 有时子类并不想原封不动地继承父类的方法 而是想做一些修改 
    - 重写的作用在于子类可以根据需要 定义特定于自己的行为 子类能根据需要实现父类的方法
10. 可索引类型接口
    - (数组索引-约束数组[index:numer]:string/字符串索引-约束对象)
    - 一般用来约束数组和对象
    ```
    //数字索引-约束数组
    //只要index的类型是number 则值的类型必须是string
    interface StringArray{
        //key的类型为number 一般都代表是数组
        //限制value的类型是string
        [index:number]:string
    }
    let arr:StringArray = ['a','b']

    //字符串索引- 约束对象
    //只要index的类型是string 则值的类型必须是string
    interface StringObject{
        //key的类型为string一般都代表是对象
        //限制value的类型是string
        [index:string]:string
    }
    let obj:StringObject = {name:'cc'}
    ```
11. 函数类型接口 类类型接口 混合类型接口
    1. 函数类型接口
        - 对方法传入的参数和返回值进行约束
        ```
        //普通的接口
        interface discount1{
            getNum:(price:number)=>number
        }
        //函数类型接口
        interface discount2{
            // :前面是函数签名 用来约束函数参数
            // :后面是用来约束函数的返回值
            (price:number):number
        }
        ```
    2. 类类型接口
        - 如果接口用于一个类 接口会表示行为的抽象
        - 对类的约束 让类去实现接口 类可以实现多个接口
        - 接口只能约束类的公有成员(实例属性/方法) 无法约束私有成员 构造函数 静态属性/方法
    3. 混合类型接口
        - 一个对象可以同时做为函数和对象使用




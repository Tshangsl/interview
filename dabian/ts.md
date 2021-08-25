1. ts与js区别
- ts
> 一种由微软开发的自由和开源的编程语言 它是js的一个超集 本质上向这个语言添加了可选的静态类型和基于类的面向对象编程
> TS提供最新的和不断发展的js特性 如异步功能和Decorators 以建立健壮的组件
    1. js的超集用于解决大型项目的代码复杂性
    2. 可以在编译期间发现并纠正错误
    3. 强类型 支持静态和动态类型
    4. 最终被编译成js代码 使浏览器可以理解
    5. 支持模块 范性和借口
    6. 社区的支持仍在增大 但还不是很大
- js
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
    tsc hellwoeld.ts
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
    - 返回never的函数必须存在无法达到的终点
    在ts中 可以利用never类型的特性实现全面性检查
5. TS断言
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
    > 是可执行运行时检查的一种表达式 用于保证该类型在一定范围内
    > 类型保护可以保证一个字符串是一个字符串 类型保护和特性检测并不是完全不同 其主要思想是常识检测属性 方法或原型 以确定如何处理值
    > 目前主要有四种方式实现类型保护
    1. in关键字
    2. typeof关键字
    3. instanceof关键字
    4. 自定义类型保护的类型谓词
7. 联合类型和类型别名
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
    > 也称为代数数据类型或标签联合类型 
    > 它包含三个要点 可辨识 联合类型 类型守卫
    > 这种类型的本质是结合联合类型和字面量类型的一种类型保护方法 
    > 如果一个类型是多个类型的联合类型 且多个类型含有一个公共属性 则可以用这个属性 来创建不同的类型保护区块
    1. 可辨识
    > 可辨识要求联合类型中的每个元素都含有一个单例类型属性
    2. 联合类型
    3. 类型守卫
    4. 类型别名 用来给一个类型起新名字
8. 交叉类型
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
9. ts函数区别
    - ts-js函数区别
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
    面向对象语言中 接口是一个很重要的概念 它是对行为的抽象 而具体如何行动需要由类去实现
    ts中的接口是一个非常灵活的概念 除了可用于对类的一部分行为进行抽象外 也常用于对[对象的形状(Shape)]
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
    > 像C#和Java语言中 可以使用泛型来创建可重用的组件 一个组件可以支持多种类型的数据 这样用户可以以自己的数据类型来使用组件
    > 设计泛型的关键目的是在成员之间提供有意义的约束 这些成员可以是：类的实例成员 类的方法 函数参数和函数返回值
    > 泛型是允许同一个函数接受不同类型参数的一种模版 相比于使用any类型 使用泛型来创建可复用的组件更好 因为泛型会保留参数类型
    > T代表Type 在定义泛型时通常用作第一个类型变量名称 实际上T可以用任何有效名称代替 除了T 以下是常见泛型变量代表的意思
    - K(Key) 表示对象中键类型
    - V(Value) 表示对象中值类型
    - E(Element) 表示元素类型
    > 不是只能定义一个类型变量 可以引入希望定义的任何数量的类型变量 如引入一个新的类型变量U 用于跨站定义的identity函数
14. TS装饰器
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
    - 类装饰器声明
    ```
    declare type ClassDecorator = <TFunction extends Function>{
        target:TFunction
    }=> TFunction|void
    ```
    - 类装饰器 是用来装饰类的 它接收一个参数
    - target:TFunction - 被装饰的类
    
    > 属性装饰器
    ```
    declare type PropertyDecorator = (target:Object,
        propertyKey: string | symbol)=> void;
    ```
    - 属性装饰器顾名思义 用来装饰类的属性 它接收两个参数
    - target:Object 被装饰的类
    - propertyKey:string|symbol 被装饰类的属性名

    > 方法装饰器
    ```

    ```
    - 方法装饰器 用来装饰类的方法 它接收三个参数
    - target:Object- 被装饰的类
    - propertyKey:string|symbol 方法名
    - descriptor:TypePropertyDescript 属性描述富

    > 参数装饰器
    ```
    declare type ParameterDecorator = (target:Object,propertyKey:string|symbol,parameterIndex:number)=>void
    ```
    - 参数装饰器 装饰函数参数 接收三个参数
    - target:Object 被装饰的类
    - propertyKey:string|symbol 方法名
    - paramseterIndex:number 方法中参数的索引值
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
    1. tsconfig.json作用
    - 标识ts项目的根路径
    - 配置ts编译器
    - 指定编译的文件
    2. tsconfig.json重要字段
    - files- 设置要编译的文件的名称
    - include- 设置需要进行编译的文件 支持路径模式匹配
    - exclude- 设置无需进行编译的文件 支持路径模式匹配
    - compilerOptions 设置与变异流程相关的选项
17. ts开发辅助工具
    1. TypeScript Playground 在线ts运行环境
    2. TypeScript UML Playground 一款在线ts UML工具 可为指定TS代码生成UML类图
    3. JSON TO TS ts在线工具 为指定的JSON数据生成对应的ts接口定义
    4. Schemats 基于SQL数据库中的schema自动生成TS接口定义
    5. TS AST Viewer ts ast在线工具 可查看指定ts代码对应的AST抽象语法树
    6. TypeDoc 用于将TS源代码中的注释转换成HTML文档或JSON模型 可灵活扩展支持多种配置
    7. TS ESLint 










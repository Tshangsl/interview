1. JSON(JavaScript Object Notation JS对象标记)
    > JSON
    - JSON(JavaScript Object Notation JS对象标记) JS是一种数据格式 具有简介 可读性高 是一种轻量级的数据交换格式 是基于ECMAScript(W3C制定JS规范)的一个子集 在域后端的数据交互中有较为广泛的应用
    - JSON出现之前 用XML传递数据 因为XML是一种纯文本格式 它适合在网络上交换数据 XML本身不算复杂 但是加上DTD XSD XPath XSLT等一大推复杂的规范后
    - 发明JSON这种超轻量级的数据交换格式 几乎所有语言都有解析JSON的库 在JS中 我们可以直接使用JSON 因为JS内置了JSON的解析 把任何JavaScript对象变成JSON 就是把这个对象序列化成一个JSON格式字符串 这样才能通过网络传递给其他计算机 如果我们受到一个JSON格式的字符串 只需要把它反序列化成一个JS对象就可以在JS中直接使用这个对象
    > JSON有以下基本数据类型
    1. object
    ```
    {"key1":"value1","key2":"value2"}
    ```
    2. array
    ```
    ["first","second","third"]
    ```
    3. number
    ```
    42
    ```
    4. string
    ```
    "This is a string"
    ```
    5. boolean
    ```
    true false
    ```
    6. null
    ```
    null
    ```
    > 其他语言中也有类似的内建数据类型 但由于js的广泛应用 JSON作为js原生数据类型 具备更广泛的支持 有了以上列举的基本数据类型 JSON能很灵活的表示任意复杂的数据结构
    ```
    {
        "name":"George Washington",
        "birthday":"February 22,1732",
        "address":"Mount Vernon,Virginia,United Status"
    }
    ```
    - JSON Schema  用于描述JSON 数据
    ```
    {
        "type":"object",
        "properties":{
            "name":{"type":"string"},
            "birthday":{"type":"string","format":"date"},
            "address":{"type":"string"}
        }
    }
    ```
    - 相同的数据 可能有不同的表示
    - 特定的应用场景中 应用程序对数据的结构要求是确定的 出于对数据描述的规范化需求 需要用JSON Schema 规范化 使用JSON Schema可以描述JSON数据所包含的字段 以及字段值的类型 及依赖关系等
    - 相同信息量的数据 采用不同的形式表达 用JSON Schema来描述也是不一样的
    - JSON Schema 可以用来做数据校验 如前后端先把数据接口约定好 写好JSON Schema 等后端输出完毕 直接用JSON Schema来对接口做验收
    > JSON对值的类型和格式有严格的规定
        复合类型的值
            只能是数组或对象不能是函数 正则表达式对象 日期对象
        简单类型的值
            只有四种 字符串 数值(必须以十进制表示) 布尔值 Null(不能使用NaN Infinity -Infinity undefined)
        字符串
            必须使用双引号表示 不能使用单引号
        对象
            键名必须放在双引号里面 数组或对象最后一个成员的后面 不能加逗号
        PS:空数组和空对象都是合格的JSON值 Null本身也是一个合格的JSON值
    
    > JSON语法规则
        
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
2. schema
    > 一个词汇表 允许注释和验证JSON文档
    > 好处
    - 描述现有的数据格式
    - 提供清晰的人工和机器可读文档
    - 验证对以下方面有用的数据
        - 自动化测试
        - 确保客户提交数据的质量
    > 语法
    - 被验证或描述的JSON文档称为实例 包含描述的文档称为架构
    - 最基本的模式是一个空白的JSON对象 它不限制任何东西 允许任何东西 不描述任何东西
    ```
    {}
    ```
    - 可以通过向架构添加验证关键字来对实例应用约束 如type关键字用于将实例限制为对象 数组 字符串 数字 布尔值 或null
    ```
    {"type":"string"}
    ```
    - JSON Schema是超媒体就绪的 非常适合注释现有的基于JSON的HTTP API JSON Schema文档由URI标识 URI可用于HTTP Link 标头 并在JSON Schema文档中允许递归定义
    1. 空schema
    ```
    {}
    ```
    2. type指定JSON数据类型
    - type可能取值 object array string number null boolean
    ```
    {"type":"string"}
    ```
    - type可以包含多个类型
    ```
    {"type":["number","string"]}
    ```
    3. string限制长度
    ```
    {
        "type":"string",
        "minLength":2
        "maxLength":3
    }
    ```
    - string 模式匹配
    ```
    {
        "type":"string",
        "pattern":"^(\\)"
    }
    ```
    - string值的枚举
    ```
    {
        "type":"string",
        "enum":["red","blue","green"]
    }
    ```
    4. integer
    - integer一定是整数类型的number
    ```
    {"type":"integer"}
    ```
    - multipleOf数字倍数
    ```
    {"type":"number","multipleOf":2.0}
    ```
    - number限制范围
    - exclusiveMaximum为true表示包含边界值maximum 类似的还有exclusiveMinimum
    ```
    {
        "type":"number",
        "mininmum":0,
        "maximum":100,
        "exclusiveMaximum":true
    }
    ```
    5. object
    - object不允许有额外的字段 使用"additionalProperties":false
    - object允许有额外的字段 并限定类型"additionalProperties":{"type":"string"}
    - object必填字段 "required":["name","email"]
    - object指定属性个数
    ```
    {
        "type":"object",
        "minProperties":2,
        "maxProperties":3
    }
    ```
    - object属性的模式匹配
    ```
    {
        "type":"object",
        "patternProperties":{
            "^S_":{"type":"string"}
        }
    }
    ```
    6. array数组
    - array指定数组成员类型
    ```
    {
        "type":"array",
        "items":{
            "type":"number"
        }
    }
    ```
    - array指定数组成员类型 逐个指定
    ```
    {
        "type":"array",
        "items":[
            {
                "type":"number"
            },
            {
                "type":"string",
                "enum":["Street","Avenue","Boulevard"]
            }
        ]
    }
    ```
    - array数组长度限制
    ```
    {
        "type":"array",
        "minItems":2,
        "maxItems":3
    }
    ```
    - array element uniqueness数组元素唯一性
    ```
    {
        "type":"array",
        "uniqueItems":true
    }
    ```
    7. boolean
    ```
    {"type":"boolean"}
    ```
    8. null
    ```
    {"type":"null"}
    ```
    9. schema合并
    - string类型 最大长度是5 或number类型 最小值为0 符合任意一条即可
    - anyOf 满足任意一个Schema
    - allOf 满足所有Schema
    - oneOf 满足且只满足一个
    {
        "anyOf":[
            {"type":"string","maxLength":5}
            {"type":"string","minimum":0}
        ]
    }
    - not
    ```
    {"not":{"type":"string"}}
    ```
    > JSON Schema应用1 对数据做验证
    - 验证库jsonschema
    ```
    var Validator = require('jsonschema').Validator
    var v = new Validator();
    var instance = 4;
    var schema = {"type":"number"};
    console.log(v.validate(instance,schema))
    ```
    - 接口数据校验
    - 实际开发中 前端和后端会约定接口 前端根据约定的接口 使用mock数据来开发demo 后端去实现接口 前端和后端可以同步进行 等后端开发完毕后 可以通过预先写好的脚本对返回接口进行批量的数据校验
    
    > JSON schema应用2 根据JSON Schema生成数据采集UI
    - 对数据进行校验是在数据输出端保证数据的正确性 寻找方式在数据输出时保证数据正确性
    - 每一条Schema数据都可以对应一种表单UI的展示 表单的UI逻辑中保证在提交表单前 数据就是符合Schema规则的 表单验证通过后 得到的就是符合Schema约束的JSON数据
    
    > 数据校验
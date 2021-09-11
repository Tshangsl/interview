0. Vue和React区别
    1. Vue的标签如v-model 比react方便 一层封装好的语法糖 绑定input不再写change事件 
    2. React的JSX功能强大，扩展性强
    3. Vue的dom操作很方便 各种方便的for指令 if指令
    4. React思想 各种抽象和模式使得代码更美观
    5. Vue的底层使用Object.defineProperty实现 因此方法不支持数组绑定 Vue源码中重新封装数组的方法 重写了push pop shift unshift splice sort reverse 这七个数组方法

    1. 监听事件变化实现原理不同 Vue getter&setter 函数劫持 React 比较引用    
    2. 数据流不同 Vue默认支持双向绑定 组件和DOM之间可通过v-model双向绑定 React 单向数据流 onchange/setState模式
    3. HOC&MIXINS Vue通过Mixins组合不同的功能 React通过HOC组合不同的功能
    4. 模版渲染方式不同 表面上模版语法不同 React通过JSX渲染模版 Vue通过一种扩展的HTML语法渲染模版 深层上模版原理不同 React组件JS代码中 通过原生JS实现模版中常见语法 Vue中模版使用的数据必须挂在this上中转一次
    5. Vuex和Redux 表面上store注入和使用方法 。。。实现原理上 Redux使用的是不可变数据 Vuex的数据是可变的 Redux通过diff检测数据变化 Vuex同Vue一样通过getter/setter
    6. 组件通信
    7. 构建工具 React采用create-react-app vue使用vue-cli

    1. 监听数据变化实现的原理不同 
        - Vue痛过getter/setter以及一些函数的劫持 能精确知道数据变化 不需要特别的优化就能达到很好的性能 
        - React默认通过比较引用的方式进行 如果不优化(PureComponent/shouldComponent) 可能会导致大量不必要的VDOM重新渲染
    2. 数据流不同
        - Vue中默认支持双向绑定 Vue1.0中可实现两种双向绑定
            - 父子组件之间 props可以双向绑定(Vue2.x去掉了第一种)
            - 组件和DOM之间可以通过v-model双向绑定
        - React从诞生之初就不支持双向绑定 React一直倡导的是单向数据流 称之为onChange/setState()模式 使用Vuex及Redux等单向数据流状态管理框架
    3. Hoc和minxins
        - Vue中组合不同功能的方式是通过mixin
        - React中通过Hoc高阶组件 高阶组件本质上就是高阶函数 React的组件就是一个单纯的函数 所以高阶函数对React来说非常简单
    4. 模版渲染方式不同
        - 表面上模版语法不同
            - React通过JSX渲染模版(只是表面现象 React不必依赖JSX)
            - Vue通过一种扩展的HTML语法进行渲染
        - 深层上 模版的原理不同
            - React在组件JS代码中 通过原生JS实现模版中的常见语法 比如插值 条件 循环等 都是通过JS语法实现
            - Vue中 模版中使用的数据必须挂在this上进行一次中转 import一个组件后还需要在components中再声明
    5. Vuex和Redux区别
        - 表面上 store注入和使用方法
            - Vuex中 $store被直接注入到组件实例 因此比较灵活的使用
                1. 使用dispatch和commit提交更新
                2. 通过mapState或直接通过this.$store读取数据
            - Redux中 每一个组件都需显式用connect把需要的props和dispatch连接起来
        - 实现原理
            1. Redux使用的是不可变数据 Vuex的数据是可变的 Redux每一次都是用新的state替换旧的state Vuex是直接修改
            2. Redux检测数据变化时 是通过diff方式比较差异的 Vuex和Vue原理一样 通过getter和setter比较
    6. 构建工具
        - React采用Create-React-App(webpack&Babel)
        - Vue采用Vue-cli

    > 相同点
    1. 都使用了VDOM
    2. 都提供了响应式和组件化的视图组件
    3. 都将注意力集中保持在核心库 其他功能如路由和全局状态管理交给相关库
    4. 都提供合理的钩子函数 可以让开发者定制化处理需求
    5. 对文件内容都有一些约定 两者都需要编译后使用
    
    > 不同点
    1. React中 当某组件的状态发生变化时 它会以该组件为根 重新渲染整个组件子树 Vue中 组件的依赖是在渲染的过程中自动追踪的 所以系统能准确直销那个组件确实需要被重新渲染
    2. Vue的路由库和状态管理库都由官方维护支持且与核心库同步更新
    React选择把这些交给社区维护 因此生态更丰富
    3. Vue-Cli脚手架可配置
1. Vue事件驱动 响应式原理 双向数据绑定原理
    - 三者使用同一个底层原理 该底层原理由ES5的Object.definedProperty((obj,prop,descriptor))提供
    ----------
    > 事件驱动 /数据驱动 (数据改变->视图改变)
    - 当数据发生改变时 视图也会进行更新 数据驱动视图
    -----------
    > 响应式原理 (数据改变->视图改变)
    - 数据模型仅仅是普通的JS对象 修改它们 视图会进行更新
    - Vue文档中对响应式原理的解释
    - Vue中最独特的特性之一 是其非侵入式的响应式系统 数据模型仅仅是简单的JS对象 当你修改它们时 视图会更新
    ----------
    >  Vue2.x 双向数据绑定原理(数据改变->视图改变 视图改变->数据改变)
    1. 使用v-model指令绑定表单元素时 可以在视图直接获得数据 当数据发生改变时 数据也会进行更新
    2. 利用数据劫持和事件的发布订阅来实现双向数据绑定
    3. 在Vue data选项中定义数据时 Vue会通过观察者对象Observer的getter和setter设置
    4. 通过v-model指令绑定元素时 自动触发getter getter会返回一个初始值 这样在视图中就能看到数据 
    5. 当视图中内容改变时 会触发setter setter会通知Vue 视图已经进行了更新 Vue会重新生成虚拟DOM 继而通过新旧虚拟DOM对比 生成patch对象 再将patch对应渲染到视图
    > 具体
    1. MVVM作为绑定的入口 整合Observer Watcher Compiler三者 通过Observer监听model变化
    2. Compiler解析编译模板指令 最终利用Watcher搭起Observer和Compiler之间的通信桥梁
    3. 从而达到数据变化=>更新视图
        视图交互变化=>数据model变更
        的双向绑定效果
    >     
    1. 通过getter进行依赖收集 
    2. 每个setter方法就是一个观察者 数据变更时 通知Watcher 从而使它关联的组件重新渲染 通知订阅者更新视图
    3. Vue会通过观察者对象(Observer)将data选项中的所有key 
    4. 经过Object.defineProperty的getter和setter设置 通过设置对象属性的setter/getter方法来监听数据 通过getter进行依赖收集
    5. 每个setter方法就是一个观察者 在数据变更时通知订阅者更新视图
    3. Vue重新生成VDOM 新旧VDOM对比使用DOM-diff算法 DOM-patch算法 把patch对象渲染到视图中

    1. 数据=>视图 绑定元素时 触发getter getter返回一个初始值 能在视图中看到数据)
    2. 视图=>数据 视图中内容改变时 触发setter(观察者)通知Watcher Vue视图已更新
        - Vue重新生成虚拟DOM/VDOM 通过新旧DOM对比生成patch对象 将patch对象渲染到视图中 

    > Vue响应式实现步骤
    - 数据更新=>视图变化
        1. 侦测数据变化--数据劫持
        2. 收集视图依赖了哪些数据--依赖收集
            - 得知哪些地方依赖我的数据 做到数据更新时派发更新 getter中收集依赖 
            setter中触发依赖 数据变更时 通知Watcher 从而使它关联的组件重新渲染
        3. 数据变化时 自动通知需要更新的视图 并进行更新--发布订阅模式subscribe&publish
    )

    --------------
    > Dep 订阅收集者和发布者 框架需要处理变量和更新DOM的Watcher的依赖关系
    - (依赖收集 核心思想 事件发布订阅模式)
    - (目的是将观察者Watcher对象存放到当前闭包的订阅者Dep的subs中)
    - (形成这样一个关系 Object->Dep->Watcher1/Watcher2-->视图1/2)

    > Dep - Dependency Dep类 用来做依赖收集的
    1. 定义subs数组 用来收集订阅者Watcher
    2. 当劫持到数据变更时 通知订阅者Watcher进行update操作
    > Watcher
    - Watcher意为观察者 它负责做的事情就是订阅Dep 当Dep发出消息传递(notify)时 所有订阅Dep的Wathers会进行自己的update操作

    ----------------
    > 小结
    1. Dep负责收集所有的订阅者Watcher 通过target指向的计算去收集订阅其消息的Wather即可 然后只需做好消息发布notify即可
    2. Watcher负责订阅Dep 并在订阅时 让Dep进行收集 接收到Dep发布的消息时 做好其update操作即可
    - 两者看似相互依赖 实则却保证了其独立性 保证了模块的单一性

    -------------
    > 依赖收集中两个重要角色(所谓的依赖其实就是Watcher)
    > 订阅者Dep(存储依赖的地方 存放Watcher观察对象)
    - 收集依赖需要为依赖找一个存储依赖的地方为此我们创建了Dep 它用来收集依赖删除依赖/和向依赖发送消息等
    - 实现一个订阅者Dep类 用于解耦属性的依赖收集和派发更新操作 主要作用是用来存放Watcher观察者对象 (可以把Watcher理解成一个中介的角色数据发生变化时通知它 然后它再通知其他地方)

    > 观察者Watcher
    - (抽象出一个能集中处理这些情况的类)
    - (通知只通知它一个/再由它负责通知到其他地方)
    - Vue中定义一个Watcher类来表示观察订阅依赖
    - 当属性发生变化后 我们要通知用到数据的地方 而使用到这个数据的地方有很多 而且类型还不一样 既有可能是模板 也有可能是用户写好的一个watch 此时需要抽象出一个能集中处理这些情况的类
    - 在依赖收集阶段只收集 这个封装好的类的实例进来 通知也只通知它一个 再由它负责通知其他地方
    -------------------
    
    > v-model指令
    1. (数据=>视图 绑定元素时 触发getter getter返回一个初始值 能在视图中看到数据)
    2. (视图=>数据 视图中内容改变时 触发setter(观察者)通知Vue视图已更新 Vue重新生成虚拟DOM/VDOM 通过新旧DO对比生成patch对象 将patch对象渲染到视图中 )
    - 绑定元素时 自动触发getter/视图中内容改变时 自动触发setter
    1. 绑定元素时 自动触发getter getter会返回一个初始值 能在视图中看到数据
    2. 视图中内容改变时 触发setter setter会通知Vue视图已经进行了更新 Vue会重新生成虚拟DOM 通过新旧虚拟DOM对比生成patch对象 将patch对象渲染到视图中

    - 具体实现:(Compiler<->Watcher<->Observer)
        1. 实现一个Compiler(解析指令/初始化视图/订阅数据变更/绑定更新函数) 订阅者
            对指令进行解析 初始化视图 订阅数据变更 绑定更新函数
        2. 实现一个Observer(对数据进行劫持 通知数据变化) 观察者
            对数据进行劫持 通知数据的变化
        3. 实现一个Watcher(以上两者的一个中介点 接收数据变更同时 让Dep添加当前watcher 并即时通知视图进行update)
            将其作为以上两者的一个中介点
            在接受数据变更的同时 
            并及时通知视图进行update
        4. 实现MVVM 整合以上三者 作为一个入口函数

    > 暂时用这个
    - View变化更新Data可以通过事件监听方式实现
    - Vue双向数据绑定的工作主要是如何根据data变化更新view
    > Vue2.x
    - 原理 数据劫持+发布订阅模式 Object.defineProperty()劫持各个属性setter getter/重写data的set和get函数实现 数据变动时发布消息给订阅者 触发相应监听回调
    
    > 简述
    1. 把一个普通的JS对象传入Vue实例作为data选项 Vue将遍历此对象所有的property 并使用Object.defineProperty 将这些property全部转为getter和setter
    2. 这些getter setter对用户来说不可见 但在内部它们能让Vue追踪以来 在property被访问和修改时通知变更
    3. 每个组件都对应一个Watcher实例 它会在组件渲染过程中 把接触过的数据property记录为依赖 之后当依赖项触发时 通知Watcher 使它关联的组件重新渲染
    
    > 步骤：
    1. 实现一个监听器Observer:
        - 对数据对象进行遍历，包括子属性对象的属性，利用 Object.defineProperty() 对属性都加上 setter 和 getter。这样的话，给这个对象的某个值赋值，就会触发 setter，那么就能监听到了数据变化。
    2. 实现一个解析器Compile
        - 解析 Vue 模板指令，将模板中的变量都替换成数据，然后初始化渲染页面视图，并将每个指令对应的节点绑定更新函数，添加监听数据的订阅者，一旦数据有变动，收到通知，调用更新函数进行数据更新。
    3. 实现一个订阅者Watcher
        - Watcher 订阅者是 Observer 和 Compile 之间通信的桥梁 ，主要的任务是订阅 Observer 中的属性值变化的消息，当收到属性值变化的消息时，触发解析器 Compile 中对应的更新函数。
    4. 实现一个订阅器Dep
        订阅器采用 发布-订阅 设计模式，用来收集订阅者 Watcher，对监听器 Observer 和 订阅者 Watcher 进行统一管理。
    > 对IE的兼容
    - 不支持IE8及以下，部分兼容IE9 ，完全兼容10以上，vue的响应式原理基于es5的Object.defineProperty() 这个方法不支持ie8及以下
    
    > Vue 2.x 
    - 使用Object.defineProperty() 把内部解耦为Observer Dep 使用Watcher相连
2. object.defineProperty(obj,prop,descriptor) & proxy
    > Object.defineProperty(obj,prop,descriptor)方法
    - 参数:(三个参数都是必填)
        - obj:要定义属性的对象
        - prop:要定义或修改的属性的名称或Symbol
        - descriptor：要定义或修改的属性描述符
    - 返回值:
        被传递给函数的对象
    - 备注：
        ES6中 由于Symbol类型的特殊性/用Symbol类型的值来做对象的key与常规的定义或修改不同 Object.defineProperty 是定义key为Symbol的属性的方法之一
    - 描述：
        - (默认情况下/使用object.defineProperty()添加的属性值是不可修改的)
        - 该方法允许精确地添加或修改对象的属性 通过赋值操作添加的普通属性是可枚举地 在枚举对象属性时会被枚举到(for ..in object.keys) 可以修改这些属性的值 也可以删除这些属性 这个方法允许修改默认的额外选项/配置
    - 对象里目前存在的属性描述符(descriptor)有两种主要形式(都是对象) 
    (一个描述符只能是两者之一)
    1. 数据描述符(具有值的属性/该值可写/可不写)
        - 具有值的属性 该值可以是可写的 也可以是不可写的
    2. 存取描述符(由getter/setter函数所描述的属性)
        - 由getter函数和setter函数所描述的属性
    - 两种描述符都是对象 它们共享以下可选键值
        - (默认值是指在使用object.defineProperty()定义属性时的默认值)
        1. 共享可选键值：
            1. configurable:
                - (不设置默认为false 第一次设置false后 第二次不可设置 会报错)
                - (表示对象的属性是否可以被删除 除了value writable特性之外的其他特性是否可以被修改)
                - (在非严格模式下，属性配置configurable:false后进行删除操作会发现属性仍然存在严格模式下会抛出错误：)
                - 当且仅当该属性的 configurable 键值为 true 时，该属性的描述符才能够被改变，同时该属性也能从对应的对象上被删除。
            2. enumerable:(默认为false)
                - (定义对象的属性是否可以在for..in和Object.keys()中被枚举)
                - 当且仅当该属性的 enumerable 键值为 true 时，该属性才会出现在对象的枚举属性中。
        2. 数据描述符 可选键值value/writable
            1. value:(默认undefined)
                该属性对应的值。可以是任何有效的 JavaScript 值（数值，对象，函数等）。
            2. writable:(默认为false时为只读)
                (在非严格模式下给name属性再次赋值会静默失败，不会抛出错误；而在严格模式下会抛出异常：)
                当且仅当该属性的 writable 键值为 true 时，属性的值，也就是上面的 value，才能被赋值运算符改变。
        3. 存取描述符 可选键值get/set
            - (get和set函数不是必须成对出现，可以只出现一个；两个函数如果不设置，则默认值为undefined。)
            - (属性b赋值或取值时会分别触发set和get对应函数)
            1. get(属性的getter函数 如果没有getter 默认undefined)
                - 一旦目标属性被访问就会返回此方法 并将此方法的运算结果返回用户
                当访问该属性时，会调用此函数。执行时不传入任何参数，但是会传入 this 对象（由于继承关系，这里的this并不一定是定义该属性的对象）。该函数的返回值会被用作属性的值。
            2. set(属性的setter函数 如果没有setter默认undefined)
                - 一旦目标属性被赋值 就会调回此方法
                当属性值被修改时，会调用此函数。该方法接受一个参数（也就是被赋予的新值），会传入赋值时的 this 对象。 
        4. 描述符默认值汇总
            1. 拥有布尔值的键 configurable、enumerable 和 writable 的默认值都是 false。
                1. 一旦使用Object.defineProperty给对象添加属性，如果不设置属性的特性，那么这些值都是false：
                2. 点运算符给属性赋值时，则默认给三种描述符都赋值true：
            2. 属性值和函数的键 value、get 和 set 字段的默认值为 undefined。
        5. 如果一个描述符 不具有value writable get set中任意一个键 它会被认为是一个数据描述符
        - 一个描述符同时拥有 value 或 writable 和 get 或 set 键，则会产生一个异常。
        - 直接在一个对象上定义一个新属性/修改一个对象的现有属性 并返回此对象
        - 应当在Object构造器对象上调用此方法 而不是在任意一个Object类型的实例上调用
    
    > Proxy与Object.defineProperty
    1. Proxy(代理器 目标对象之前架设一层拦截 外界对该对象的访问 都必须先通过这层拦截)
        - (原意代理 此处表示由它代理某些操作 可译为代理器)
        - 在目标对象之前架设一层“拦截”，外界对该对象的访问，都必须先通过这层拦截，因此提供了一种机制，可以对外界的访问进行过滤和改写。        
        > 语法
        1. var proxy = new Proxy(target, handler);
        2. Proxy本身是一个构造函数，通过new Proxy生成拦截的实例对象，让外界进行访问；构造函数中的target就是我们需要代理的目标对象，可以是对象或者数组；handler和Object.defineProperty中的descriptor描述符有些类似，也是一个对象，用来定制代理规则。
        3. Proxy可以直接代理target整个对象并返回一个新对象 通过监听代理对象上属性的变化来获取目标对象属性的变化
        4. Proxy不仅能够监听到属性的增加 还能监听属性的删除 比Object.defineProperty的功能更为强大。
        - Vue3新特性：(目标让 Vue 核心变得更小、更快、更强大)
            1. 监测机制的改变
            2. 模板
            3. 对象式的组件声明
            4. 其他方面的更改
        - Reflect：   
            - 翻译过来是反射的意思，与Proxy对象一样，也是 ES6 为了操作对象而提供的新 API。有一下几个作用
            1. 将Object对象的一些明显属于语言内部的方法(如Object.defineProperty)放到Reflect对象上
            2. 修改某些Object方法的返回结果，让其变得更合理。
            3. 让Object操作都变成函数行为。某些Object操作是命令式，比如name in obj和delete obj[name]，而Reflect.has(obj, name)和Reflect.deleteProperty(obj, name)让它们变成了函数行为。
            4. Reflect对象的方法与Proxy对象的方法一一对应，只要是Proxy对象的方法，就能在Reflect对象上找到对应的方法。这就让Proxy对象可以方便地调用对应的Reflect方法，完成默认行为，作为修改行为的基础。也就是说，不管Proxy怎么修改默认行为，你总可以在Reflect上获取默认行为。
        > Proxy只会代理对象的第一层 Vue3.0如何处理该问题
        1. 判断当前Refect.get的返回值是否为Object 如果是则再通过reactive方法做代理 实现深度观测
        > 监测数组时可能会触发多次get/set 如何防止触发多次
        1. 判断key是否为当前被代理对象target自身属性 也可以判断旧值和新值是否相等 只有满足以上两个条件之一时 才有可能执行trigger
    2. Object.defineProperty
        - (使用数据劫持 直接在一个对象上定义一个新属性或修改一个对象的现有属性 并返回此对象)
        - 在访问或修改对象的某个属性时 通过一段代码拦截这个行为 进行额外的操作或修改返回结果 
        - 数据劫持最典型的应用 双向的数据绑定 
    3. 比较
        > Proxy
        > 优点:(可以直接监听对象而非属性/可以直接监听数组的变化/
        1. 针对整个对象代理 不同于Object.defineProperty必须遍历对象每个属性 支持代理数组变化
        2. 只需做一层代理 可监听同级结构下所有属性变化
        3. 深层结构 递归还是要进行的
        4. Proxy 有多达 13 种拦截方法,不限于 apply、ownKeys、deleteProperty、has 等等是 Object.defineProperty 不具备的；
        5. Proxy 返回的是一个新对象,我们可以只操作新的对象达到目的,而 Object.defineProperty 只能遍历对象属性直接修改；
        6. Proxy 作为新标准将受到浏览器厂商重点持续的性能优化，也就是传说中的新标准的性能红利；
        > 缺点
        1. 存在兼容性问题 所以在Vue3.x中才重写

        > Object.defineProperty
        > 优点：
        1. 兼容性好，支持 IE9，而 Proxy 的存在浏览器兼容性问题,而且无法用 polyfill 磨平 因此 Vue 的作者才声明需要等到下个大版本( 3.0 )才能用 Proxy 重写。
        > 缺点
        1. 能劫持对象的属性但需对对象每一个属性进行遍历劫持 对象上新增属性 需对新增的属性再次劫持 如果属性是对象 还需深度遍历 Vue给对象新增属性 用$set 原理通过Object.defineProperty对新增属性再次劫持)
        2. 只能监听对象 无法检测到对象属性的添加和删除 不能监听数组的变化 无法触发push pop shift unshift splice sort reverse 需要进行数组方法的重写 无法检测数组的长度修改
        2. 必须遍历对象的每个属性
        3. 只能劫持当前对象属性 如果想深度劫持 必须深层遍历嵌套的对象

        1. 数据劫持 ES5 Object.defineProperties()
        1. push()、pop()、shift()删除、unshift()添加、splice()、sort()、reverse()这些方法会改变被操作的数组；
        2. filter()、concat()、slice()这些方法不会改变被操作的数组，返回一个新的数组；
        
        > 解决
        > Vue2.x实现对象和数组的监听( JavaScript 的限制，Vue 不能检测数组和对象的变化)
        - JavaScript 的限制：
            - object.defineProperty() 只能对属性进行数据劫持，不能对整个对象进行劫持，同理无法对数组进行劫持
        - Vue 检测对象和数组（部分方法的操作）变化
            1. 对象和数组的监听：
                - 通过遍历数组 和递归遍历对象 达到利用 Object.defineProperty() 也能对对象和数组（部分方法的操作）进行监听。
            2. 对象：
                > 不能检测
                1. 对象属性添加删除
                
                > 解决方法
                - 单个property
                1. Vue.set(object,propertyName,value)
                    - 参数1： 要修改的对象
                    - 参数2： 属性
                    - 参数3： 属性的值是啥
                    - 返回值：已经修改好的值
                    - Vue.set(vm.someObject, 'b', 2)
                2. vm.$set(object,propertyName,value)
                - 多个property
                1. 用原对象与要混合进去的对象的property一起创建一个新的对象
                ```
                this.someObject = Object.assign({}, this.someObject, { a: 1, b: 2 })
                代替 `Object.assign(this.someObject, { a: 1, b: 2 })`
                ```

                > vm.$set实现原理:
                1. 如果目标是数组，直接使用数组的 splice 方法触发响应式  
                2. 如果目标是对象，会先判读属性是否存在、对象是否是响应式.
            3. 数组：
                > 不能检测
                1. 利用索引直接设置一个数组项时，例如：vm.items[indexOfItem] = newValue
                2. 修改数组的长度时，例如：vm.items.length = newLength
                > 解决方法
                1. 第一类问题解决方法：
                    1. Vue.set
                    - Vue.set(vm.items, indexOfItem, newValue)
                    - vm.$set(vm.items, indexOfItem, newValue)
                    2. Array.prototype.splice
                    - vm.items.splice(indexOfItem, 1, newValue)
                2. 第二类问题解决方法：
                    1. splice   
                    - vm.items.splice(newLength)

                        1. 对象属性的添加删除        
3. Vue渐进式框架
    - Vue核心功能是一个视图模版引擎
    > 渐进式:Vue.js是一套用于构建用户界面的渐进式框架
    - Vue核心功能是一个视图模板引擎 声明式渲染/视图模板引擎基础上 可以通过添加 组件系统components 客户端路由vue-router 大规模状态管理vuex 构建一个完整的框架
    - Vuejs只提供Vue-Cli生态中最核心的 组件系统+双向数据绑定/数据驱动
    - 这些功能相互独立 可以在核心功能的基础上任意选用其他部件 渐进式 即Vue的使用方式  也体现出Vue设计理念 没有做职责之外的事

    - 虽然没有完全遵循MVVM模型 但Vue的设计也受到它的启发 因此在文档中常会使用vm(viewModel的缩写) 这个变量名表示Vue实例 实例属性/实例方法(数据/事件/生命周期)
    - 所有Vue组件都是Vue实例 并且接受相同的选项对象(一些根实例特有的选项除外)
    - 生命周期钩子的this只想调用它的Vue实例 不要在选项property或回调上使用箭头函数
    > Vue.js两个核心
    1. 组件系统
    2. 数据驱动/双向数据绑定
4. Vue组件通信
    > 需求(组件实例间作用域相互独立/不同组件之间数据无法相互引用)
    > 组件关系
    1. 父子组件之间通信
    2. 非父子组件之间通信(兄弟组件 隔代关系组件)
    > 通信方法
    1. props/$emit
        1. 父组件向子组件传值
        - 父组件通过props方式向子组件传递数据 子组件通过$emit向父组件通信
        - prop只可以从上一级组件传递到下一级组件(父子组件)即所谓单向数据流 prop只读 不可被修改 所有修改都会失效并警告
        2. 子组件向父组件传值
        - $emit绑定一个自定义事件 当这个语句被执行 会将参数arg传递给父组件 父组件通过v-on监听并接收参数
    2. $children/$parent
        - 子实例可以用this.$parent访问父实例 子实例被推进父实例的$children数组中
        > PS:节制地使用$parent和$children 它们的目的主要是作为访问组件的应急方法 更推荐用props和events实现父子组件通信
    3. provide/inject
        - provide/inject是Vue2.2.0新增的API
        - 父组件通过provide提供变量 子组件中通过inject注入变量
        > PS: 不论子组件嵌套有多深 只要调用了inject 就可以注入provide中的数据 而不局限于只能从当前父组件的props属性中获取数据
    4. ref/refs
        > ref
        - 如果在普通的DOM元素上使用 引用指向的就是DOM元素
        - 如果用在子组件上 引用就指向组件实例 可以通过实例直接调用组件的方法或访问数据 
    5. eventBus
        - 又称为事件总线 在Vue中可以使用它来作为沟通桥梁的概念 就像是所有组件共用相同的事件中心 可以向该中心注册发送事件或接收时间 所以组件都可以通知其他组件
        - 当项目较大 就容易造成难以维护的灾难
        > Vue中使用eventBus实现组件之间的数据通信
        1. 初始化 创建一个事件总线并将其导出 以便其他模块可以使用或者监听它
        ```
        // event-bus.js
        import Vue from 'vue'
        export const EventBus = new Vue();
        ```
        2. 发送事件 假设有两个组件 additionNum和showNum 这两个组件可以是兄弟组件也可以是父子组件
        - 下面以兄弟组件为例
        ```
        <template>
            <div>
                <show-num-com></show-num-com>
                <addition-num-com></addition-num-com>
            </div>
        </template>
        <script>
            impport showNumCom from './showNum.vue'
            import additionNumCom from './additionNum.vue'
            export default{
                components:{
                    showNumCom,
                    additionNumCom
                }
            }
        </script>
        ```
        ```
        // addtionNum.vue中发送事件
        <template>
            <div>
                <button @click = "addtionHandle">+加法器</button>
            </div>
        </template>
        <script>
        import {EventBus} from './event-bus.js'
        console.log(EventBus)
        export default{
            data(){
                return{
                    num:1
                }
            }
            methods:{
                additionHandle(){
                    EventBus.$emit('addtion',{
                        num:this.num++;
                    })
                }
            }
        }
        </script>
        ```
        // 接收事件
        ```
        <template>
            <div>计算和:{{count}}</div>
        </template>

        <script>
        import {EventBus} from './event-bus.js'
        export default{
            data(){
                return {
                    count:0
                }
            }
            mounted(){
                EventBus.$on('addition',params=>{
                    this.count = this.count+param.num
                })
            }
        }
        </script>
        ```
        - 这样实现了在组件addtionNum.vue中点击相加按钮 在showNum.vue中利用传递来的num展示求和的结果
        // 移除事件监听者
        ```
        import {eventBus} from 'event-bus.js'
        EventBus.$off('addition',{})
        ```
    6. Vuex
        - 一个专为Vuejs应用程序开发的状态管理模式 
        - 它采用集中式存储管理应用的所有组件的状态
        - 并以相应的规则保证状态以一种可预测的方式发生变化
        - Vuex解决了多个视图以来同一状态和来自不懂视图的行为需要变更到同一状态的问题 
        - 将开发者的经历聚焦在数据的更新而不是数据在组件之间的传递上
        > Vuex各个模块
        1. state：用于数据的存储 是store中的唯一数据源
        2. getters: 如Vue中的计算属性一样 基于state数据的二次包装 常用于数据的筛选和多个数据的相关性计算
        3. mutations:类似函数 改变state数据的唯一途径 且不能用于处理异步事件
        4. actions:类似于mutation 用于提交mutation改变状态而不直接变更状态 可以包含任意异步操作
        5. modules:类似于命名空间 用于项目中将各个模块的状态分开定义和操作 便于维护
    7. localStorage/sessionStorage
        - 这种通信比较简单 缺点是数据和状态比较混乱 不太容易维护
        1. 通过window.localStorage.getItem(key)获取数据
        2. 通过window.localStorage.setItem(key,value) 存储数据
        > PS: 用JSON.parse()/JSON.stringfy()做数据格式转换 localStorage/sessionStorage可以结合Vuex实现数据的持久保存 同时使用Vuex解决数据和状态混乱问题
    8. $attrs&listeners
        - Vue2.4中 为了解决组件隔代通信的需求 引入了$attrs和$listeners 新增了inheritAttrs
        - 版本2.4之前 默认情况下 父作用域中不作为prop被识别(且获取)地特性绑定(class和style除外) 将会回退且作为普通的HTML特性应用在子组件的根元素上

    > Vue中父子组件双向绑定的方法
    1. 通过在父组件上自定义一个监听事件
    ```
    <myComponent @diy="handleDiy"></myComponent>
    ```
    - 在子组件用this.$emit('diy',data)来出发这个diy事件
    - 其中data为子组件向父组件通信的数据 
    - 在父组件中监听diy事件时 可以通过$event访问data这个值
    2. 通过在父组件上用修饰符.sync绑定一个数据
    ```
    <myComponent :show.sync="show"></myComponent>
    ```
    - 在子组件通过this.$emit('update:show',data)改变父组件中show的值
    3. 通过v-model
5. Vue render函数(用来生成VDOM)
    Vue渲染/render函数用来生成VDOM/虚拟DOM
    1. Vue更新渲染render整体流程
        1. 模板编译生成AST/
        2. AST生成Vue的render渲染函数/
        3. render渲染函数结合数据生成VDOM树/
        4. diff和patch后生成新的UI界面 真实DOM渲染)
        
        1. 模板通过编译Compiler生成AST(Abstract Synax Tree)抽象语法树
        2. AST生成Vue的render渲染函数
        3. render渲染函数结合数据生成VNODE(Virtual DOM Node)树
        4. diff和patch后生成新的UI界面(真实DOM渲染)

        - 概念解释：

        > 模板：
        - Vue模板是纯HTML 基于Vue的模板语法 可以比较方便地处理数据和UI界面
        
        > AST：(Abstract Synax Tree)
        - Vue将HTML模板解析为AST 并对AST进行一些优化的标记处理 提取最大的静态树 以使VDOM直接跳过后面的diff
        
        > render渲染函数
        - (Vue推荐使用模板创建HTML构建应用程序 底层实现中Vue最终还是会将模板编译成render渲染函数 若想得到更好的控制 一些场景中 真正需要JS的完全编程能力 可以直接写渲染函数 它比模板更接近编译器) 用来生成VDOM 
        
        > Watcher：
        - (每一个Vue组件都有一个对应的watcher 
        - 它会在 组件render时 收集组件所依赖的数据 并在 依赖更新时 触发组件重新渲染 
        - Vue会自动优化并更新需要更新的DOM)
        
        > render函数可以作为一条分割线
        - (将Vue模板编译成AST生成render函数/
        数据结合render函数生成VDOM树 diff和patch映射到真正的DOM树)
        1. render函数左边可以称为编译期 将Vue模板转换成渲染函数
        2. render函数右边可以称为运行时 将渲染函数生成的VDOM树 进行diff和patch
    2. 虚拟DOM
        1. Vue编译器在编译模板后 会将这些模板编译成渲染函数render 当渲染函数render被调用时 会返回一个虚拟DOM树
        2. 在Vue底层实现上 Vue将模板编译成虚拟DOM渲染函数 结合Vue自带的响应系统 在相应状态改变时 Vue能智能计算出重新渲染组件的最小代价并映射到DOM操作上
        3. Vue支持我们通过data参数传递一个JavaScript对象作为组件数据, Vue将遍历data对象属性, 使用Object.defineProperty方法设置描述对象, 通过gett/setter函数来拦截对该属性的读取和修改.
        4. Vue创建了一层Watcher层, 在组件渲染的过程中把属性记录为依赖, 当依赖项的setter被调用时, 会通知Watcher重新计算, 从而使它关联的组件得以更新.
    3. Vue渲染机制
        - (独立构建   包含模板编译器   渲染过程 HTML字符串->render函数->VNODE->真实DOM)
        - (运行时构建 不包含模板编译器 渲染过程 render函数->VNODE->真实DOM)
        - (运行时构建的包 比独立构建少一个模板编译器(因此速度上会更快))
        - (渲染过程提供三种模板(自定义render/template/el) 这三种模板最终都要得到render函数 )
        - 两个概念
            1. 独立构建
            - 包含模板编译器 渲染过程 HTML字符串=>render函数=>VNODE=>真实DOM
            2. 运行时构建
            - 不包含模板编译器 渲染过程 render函数=>VNODE=>真实DOM
            3. 运行时构建的包 比独立构建少一个模板编译器(因此运行速度上会更快)在$mount函数上也不同 $mount方法是整个渲染过程中的起始点
        - 渲染过程提供三种模板：(这三种模式最终都要得到render函数)
            1. 自定义render函数
            2. template
            3. el
        - Vue渲染
            1. new Vue 执行初始化
            2. 挂载$mount 通过自定义render方法template el等生成render渲染函数
            3. 通过Watcher监听数据的变化
            4. 当数据变化时 render函数执行生成VNODE对象
            5. 通过DOM diff算法 对比新旧VNode对象 通过patch算法 添加/修改/删除真正的DOM元素
        > 初始化
        1. 开始创建
        2. 初始化数据
        3. 编译模版
        4. 挂载DOM- 渲染
        5. 数据变化更新DOM-渲染
        6. 销毁
    4. 理解使用render函数
        1. createElement
            第1个参数: {String | Object | Function }, 必传
            第2个参数: { Object }, 可选
            第3个参数: { String | Array }, 可选
    5. 使用render函数替代模板功能
        - 使用Vue模板时 可在模板中灵活的使用v-if、v-for、v-model和<slot>等模板语法。
        - 但在render函数中是没有提供专用的API。如果在render使用这些，需要使用原生的JavaScript来实现。
6. 虚拟DOM/VDOM(使用JS对象模拟)
    > 核心 VDOM之所以快 因为其是使用JS对象对比的 相比于DOM对象非常多的属性 JS对象无疑比较简洁
    1. 真实DOM 浏览器解析流程 真实DOM在浏览器渲染时遇到的问题引出虚拟DOM
        webkit渲染引擎工作流程
        所有浏览器渲染引擎工作流程大致分为5步
        (DOM树 CSSOM树 Render树 Layout布局 Painting绘制 实际进行时不是独立的会有交叉)
        1. 创建DOM树
            - 用HTML分析器分析HTML元素 构建一颗DOM树
        2. 创建Style Rules
            - 用CSS分析器分析CSS文件和元素上的inline样式 生成页面样式表
        3. 构建Render树
            - 将DOM和样式表关联起来 构建一棵Render树 (Attachment)
            - 每个DOM节点都有attach方法 接受样式信息 返回一个render对象(又名renderer)这些render对象最终会被构建成以可Render树
        4. 布局Layout
            - 确定节点坐标 根据Render树结构 为每个Render树上的节点确定一个在显示屏上出现的精确坐标
        5. 绘制Painting
            - 根据Render树和节点显示坐标 然后调用每个节点的paint方法 将它们绘制出来
        > 注意：
        1. DOM 树的构建不是文档加载完成开始的
            - 构建 DOM 树是一个渐进过程，为达到更好的用户体验，渲染引擎会尽快将内容显示在屏幕上，它不必等到整个 HTML 文档解析完成之后才开始构建 render 树和布局。
        2. Render树/DOM树/CSS样式表 实际进行时不是完全独立的 会有交叉
            - 实际进行的时候并不是完全独立的，而是会有交叉，会一边加载，一边解析，以及一边渲染。
        3. CSS的解析注意点
            - CSS的解析式从右向左逆向解析的 嵌套标签越多 解析越慢
        4. JS操作真实DOM代价
            - 用我们传统的开发模式，原生 JS 或 JQ 操作 DOM 时，浏览器会从构建 DOM 树开始从头到尾执行一遍流程。
            在一次操作中，我需要更新 10 个 DOM 节点，浏览器收到第一个 DOM 请求后并不知道还有 9 次更新操作，因此会马上执行流程，最终执行10 次。例如，第一次计算完，紧接着下一个 DOM 更新请求，这个节点的坐标值就变了，前一次计算为无用功。
            计算 DOM 节点坐标值等都是白白浪费的性能。即使计算机硬件一直在迭代更新，操作 DOM 的代价仍旧是昂贵的，频繁操作还是会出现页面卡顿，影响用户体验
    2. 虚拟DOM(Virtual-DOM)--使用JS对象模拟
        > 存在意义/实现方式：
        - 为了解决浏览器性能设计出来 页面的更新可以先全部反映在JS对象(虚拟DOM)上 操作内存中的JS对象的速度显然更快 等更新完成后 将最终的JS对象映射成真实的DOM 交由浏览器绘制
        - 用JS对象模拟DOM树：
            1. JS对象来表示DOM节点 使用对象的属性记录节点的类型/属性/子节点
            2. 渲染用JS表示的DOM对象
            3. 比较两棵虚拟DOM树的差异-diff算法
                - diff算法：
                - 比较两棵VDOM树的差异 
                1. 如需完全比较 O(n^3)
                2. 由于前端很少会跨级移动DOM元素 
                - VDOM只会对同一个层级的元素进行比较
                O(n)
            4. diff算法具体实现
                1. 深度优先遍历 记录差异
                    每个节点有一个唯一的标记 每遍历到一个节点 把该节点和新的树进行对比 如果有差异就记录到一个对象中
                2. 差异类型(元素节点1/属性节点2/文本节点3)
                    1. 节点替换 如将div换成h1
                    2. 顺序互换 移动/删除/新增子节点
                    3. 属性更改
                    4. 文本改变
                3. 列表对比算法
                4. 实例输出
             5. 将两个虚拟DOM对象的差异应用到真正的DOM树(patch.js)
                1. 深度优先遍历DOM树
                2. 对原有DOM树进行DOM操作     
                    - 根据不同类型数据 对当前节点进行不同的DOM操作
                3. DOM结构改变  
    3. 总结VDOM算法主要实现三步骤
        1. 用JS对象模拟DOM树(VNode定义)
        2. 比较两棵虚拟DOM树的差异 diff.js
        3. 将两个虚拟DOM对象的差异应用到真正的DOM树 patch.js
7. 虚拟DOM&DOM-diff
    > 虚拟DOM存在意义：
    - 虚拟DOM就是为了解决浏览器性能问题而被设计出来的。
    - 如前，若一次操作中有10次更新DOM的动作，虚拟DOM不会立即操作DOM 而是将这10次更新的diff内容保存到本地一个JS对象中，最终将这个JS对象一次性attch到DOM树上，再进行后续操作，避免大量无谓的计算量。
    - 所以，用JS对象模拟DOM节点的好处是，页面的更新可以先全部反映在JS对象(虚拟DOM)上，操作内存中的JS对象的速度显然要更快，等更新完成后，再将最终的JS对象映射成真实的DOM，交由浏览器去绘制。
    - 虚拟DOM/VDOM：
        1. 用JS去按照DOM结构来实现树状结构对象/可叫DOM对象
        2. 是仅存在内存中的DOM 因还未展示到页面中 所以称作VDOM
        3. Virtual DOM其实就是一棵以JavaScript对象(VNode节点)为基础的树 用对象属性来描述节点 实际上它只是对一层真实DOM的抽象 最终可以通过一系列操作使这棵树映射到真实环境上。
        4. JS中虚拟DOM表现为一个Object对象 并且最少包含标签名(tag)属性(attrs)和子元素对象(children)三个属性 不同框架对这三个属性的命名可能会有差异
        5. Virtual DOM 对象的节点跟 DOM Tree 每个位置的属性一一对应的，因为人们创造出虚拟 DOM 就是为了更好地将虚拟节点渲染到视图上，也就是把虚拟DOM变成真实的 DOM 节点，提高视图的渲染性能。
    > 优点：
    1. 减少DOM操作
        两个虚拟DOM对比用到的算法就是DOM diff
        JS层面上 DOM操作并不慢 慢在浏览器渲染的过程里，改变一行数据就要全部重新渲染
        虚拟 DOM 比 DOM 快，
        因为需要更新的 DOM 节点要比原生 DOM 操作更新的节点少，浏览器重绘的时间更短
        虚拟 DOM 的优势不在于单次的操作，
        用对比的算法，它可以将多次操作合并成一次操作，
        在大量、频繁的数据更新下，能够对视图进行合理、高效的更新。
    2. 跨平台
        虚拟DOM是以JS对象作为基础 本质就是一个JS对象 并不依赖真实平台环境 使它具有跨平台能力 
        在浏览器上可以变成DOM 
        其他平台可以变成相应渲染对象
    3. 保证性能下限
    > 缺点：
    1. 无法进行极致优化

    > DOM-diff：(比较两颗虚拟DOM树用到的算法)
    - DIFF算法：
    - (Diff仅在两棵树同级虚拟节点间递归比较 最终实现整颗DOM树更新)
    - (比较分三个层级
    1. 层级比较 Tree Diff/
        1. 对一个父节点下所有子节点比较 判断子节点类型 
        2. 组件则做Component组件比较
        3. 标签/元素 Element比较 
    2. 组件比较 Component Diff/
    3. 元素比较 Element Diff)
        1. Diff仅在两棵树同级虚拟节点间递归比较 最终实现整颗DOM树更新
        2. 是React框架采用的方法 也就是判断DOM是否发生了变化 然后找到这个变化 这样我们才能实现差量更新
    > 三个步骤：
    1. 用 JS 对象的方式来表示 DOM 树的结构，然后根据这个对象构建出真实的 DOM 树，插到文档中。
    2. 当状态变更的时候，重新构造一棵新的对象树。然后用新的树和旧的树进行比较，记录两棵树的差异
    3. 最后把所记录的差异应用到所构建的真正的DOM树上，视图更新
    
    - 比较时分为三个层级:
        层级比较 Tree Diff
        组件比较 Component Diff
        元素比较 Element Diff
        1. Tree Diff（层级比较）
            1.先进行树结构的层级比较，对同一个父节点下的所有子节点进行比较；
            2.接着看节点是什么类型的，是组件就做 Component Diff;
            3.如果节点是标签或者元素，就做 Element Diff;
        2. Component Diff （组件比较）
            1.若组件类型相同，则继续按照层级比较其虚拟 DOM的结构;
            2.如果组件类型不同，则替换整个组件的所有内容
        3. Element Diff (元素比较)
            1.如果节点是原生标签，则看标签名做比较是否相同来决定替换还是更新属性
            2.然后进入标签后代递归 Tree Diff
    > DOM变化主要有三种：
    1. applendChild
    2. replaceChild
    3. removeChild
    > DOM diff算法主要做三件事
    1. 创建节点
    2. 删除节点
    3. 更新节点
    - 给定任意两棵树 采用先序深度优先遍历的算法找到最少的转换步骤
    - DOM-diff比较两个虚拟DOM的区别 也就是在比较两个对象的区别
    > 作用：
    - 根据两个虚拟对象创建出补丁 描述改变的内容 将这个补丁用来更新DOM
    
    > 过程：
    1. 用JS对象模拟DOM(虚拟DOM)
    2. 把此虚拟DOM转成真实DOM并插入页面中(render)
    3. 如果有事件发生修改了虚拟DOM 比较两棵虚拟DOM树的差异 得到差异对象diff
    4. 把差异对象应用到真正的DOM树上(patch)
7. Vue中Dom异步更新&nextTick
    > Dom异步更新：
    - Vue 异步执行 DOM 更新。观察到数据变化 Vue 将开启一个队列 缓冲在同一事件循环中发生的所有数据改变。
    - 同一个 watcher 被多次触发 只会被推入到队列中一次。缓冲时去除重复数据 对于避免不必要的计算和 DOM 操作上非常重要。
    - 下一个事件循环tick中 Vue刷新队列并执行实际(已去重)
    > DOM异步
    - Vue异步执行DOM更新 数据变化 一个队列 缓冲同一事件循环发生所有数据改变 避免不必要的计算和DOM操作

    Vue 在内部尝试对异步队列使用原生的 Promise.then 和MessageChannel，
    如果执行环境不支持，会采用 setTimeout(fn, 0)代替。

    - 为了在数据变化之后等待 Vue 完成更新 DOM 可以在数据变化之后立即使用Vue.nextTick(callback) 这样回调函数在 DOM 更新完成后就会调用。

    > Vue中nextTick机制
    - (Vue中nextTick的实现有用到MutationObserver微任务API)
    - (下次DOM更新循环结束后执行延迟回调 修改数据后立即使用这个方法 可在回调中获取更新后的DOM)
    - (Vue中Created钩子函数执行时 DOM其实未进行任何渲染 所以需要放在nextTick中去获取DOM 与其对应的生命周期钩子函数是mounted)
    - (DOM更新完想做点什么 nextTick回调函数中)
    - (Vue生命周期created钩子函数中进行的DOM操作 一定要放在Vue.$nextTick回调函数中)
    - (修改数据之后立即使用这个方法 获取更新后的DOM)
    
    > 应用场景:(什么时候需要使用Vue.nextTick()函数)
    1. (Vue.nextTick  在DOM更新后做点什么 参数回调函数 DOM更新完调用)
    2. (数据变化后要执行某个操作 这个操作需要使用随数据改变而改变DOM结构 这个操作应该放进Vue.$nextTick()的回调函数中)
    3. (为了在数据变化之后等待Vue完成更新DOM 可以在数据变化之后立即使用Vue.nextTick(callback)这样回调函数在DOM更新完后就会调用)
    4. (主线程的执行过程就是一个tick 而所有的异步操作都是通过任务队列来调度)
      
    > Vue的nextTick方法实现原理
    1. vue 用异步队列的方式来控制 DOM 更新和 nextTick 回调先后执行
    2. microtask 因为其高优先级特性，能确保队列中的微任务在一次事件循环前被执行完毕
    3. 考虑兼容问题,vue 做了 microtask 向 macrotask 的降级方案
    
    > Vue.nextTick实现原理
    - MutationObserver/MO
        - 是H5中的API 是一个用于监听DOM变动的接口 它可以监听一个DOM对象上发生的
        1. 子节点删除 
        2. 属性修改
        3. 文本内容修改等
        - 调用过程
            先给它绑定回调 得到MO实例
            这个回调会在MO实例监听到变动时触发
            这里的MO回调放在microtask中执行
            // 创建MO实例
            const observer = new MutationObserver(callback)
            const textNode = '想要监听的Don节点'
            observer.observe(textNode, {
                characterData: true // 说明监听文本内容的修改
            })
        - 源码
            nextTick的实现单独有一个JS文件来维护它
            在src/core/util/next-tick.js中
            nextTick源码主要分两块
                能力检测
                    由于宏任务耗费时间大于微任务
                    浏览器支持情况下 优先使用微任务
                    浏览器不支持微任务 再使用宏任务
                根据能力检测以不同方式执行回调队列 
                    next-tick.js对外暴露了nextTick这一个参数 所以每次调用Vue.nextTick时会执行:
                    1.把传入的回调函数cb压入callbacks数组
                    2.执行timeFunc函数 延迟调用flushCallbacks函数
                    3.遍历执行callbacks数组中所有函数
                    这里的callbacks没有直接在nextTick中执行回调函数原因是 保证在同一个tick内多次执行nextTick 不会开启多个异步任务 而是把这些异步任务都压成一个同步任务在下一个tick执行完毕
        - 语法
        ```
            Vue.nextTick([callback,context])
            参数:
                {Function}[callback]:
                    回调函数 不传时提供promise调用
                {Object}[context]:
                    回调函数执行的上下文环境 
                    不传默认自动绑定到调用它的实例上
                Vue实例方法vm.$nextTick做了进一步封装
                把context参数设置为当前Vue实例
        ```
        > 使用目的
        - 为了可以获取更新后的DOM
        > 触发时机
        - 同一事件循环中的数据变化后 DOM完成更新 立即执行Vue.nextick()的回调
8. Vue中的component
    1. 可复用的Vue实例且带有一个名字
    2. 每个实例可维护一份被返回对象的独立拷贝

    - (data是函数 每个实例可以维护一份被返回对象的独立的拷贝)
    - (组件是可复用的 Vue 实例，且带有一个名字：)
    - (el是根实例特有的选项)
    
    - 每用一次组件，就会有一个它的新实例被创建。一个组件的 data 选项必须是一个函数

    > 定义组件名的方式(两种):
    1. 使用 kebab-case(短横线分隔命名) 链式命名
    - 须在引用这个自定义元素时使用 kebab-case，例如 <my-component-name>。
    2. 使用 PascalCase(首字母大写命名) 驼峰命名
    <my-component-name> 和 <MyComponentName> 

    > 使用
    1. 在字符串模板中<my-component></my-component> 和 <MyComponent></MyComponent>都可以使用，
    2. 在非字符串模板中最好使用<my-component></my-component>，因为要遵循W3C规范中的自定义组件名
    (字母全小写且必须包含一个连字符)，避免和当前以及未来的 HTML 元素相冲突。
    
    > 原因
    1. HTML 中的 attribute 名是大小写不敏感的，所以浏览器会把所有大写字符解释为小写字符。
    
    > 组件name作用：
    1. 递归组件时，组件调用自身使用；
    2. 用is特殊特性和component内置组件标签时使用；
    3. keep-alive内置组件标签中include 和exclude属性中使用。
    
    > 销毁：
    1. 没有使用keep-alive时的路由切换；
    2. v-if='false'；
    3. 执行vm.$destroy()；
    
    > 组件分类
    1. 全局注册
    - (全局注册的行为必须在根 Vue 实例 (通过 new Vue) 创建之前发生。)
    ```
        Vue.component('my-component-name', {
        // ... options ...
        })
    ```
    > 缺点：
    - 使用一个像 webpack 这样的构建系统，全局注册所有的组件意味着即便你已经不再使用一个组件了，它仍然会被包含在你最终的构建结果中。这造成了用户下载的 JavaScript 的无谓的增加。
    2. 局部注册
    - (局部注册的组件在其子组件中不可用) 
        1. 通过一个普通的 JavaScript 对象来定义组件：
        ```
        var ComponentA = { /* ... */ }
        ```
        2. 在 components 选项中定义你想要使用的组件：
            ```
            new Vue({
                el: '#app',
                components: {
                    'component-a': ComponentA,
                    'component-b': ComponentB
                }
            })
            ```
    3. 模块系统局部注册(使用了诸如 Babel 和 webpack 的模块系统)
        1. 推荐创建一个 components 目录，并将每个组件放置在其各自的文件中。
        2. 局部注册之前导入每个你想使用的组件。
    4. 基础组件自动化全局注册
        - 基础组件，它们会在各个组件中被频繁的用到。
        - 恰好使用了 webpack (或在内部使用了 webpack 的 Vue CLI 3+)，那么就可以使用 require.context 只全局注册这些非常通用的基础组件
8. 如何设计一个组件
    > 前端组件库的设计原则
    1. 细粒度考量
        - 单一职责原则 原则上一个组件只专注一件事情
        1. 优点 最大可能性地复用组件
        2. 缺点 可能会导致过渡抽象 造成组件库的碎片化
    2. 通用性考量
        - 组件的形态(DOM结构)永远是千变万化的 但是其行为(逻辑)是固定的 因此通用组件的秘诀之一就是将DOM结构的控制权交给开发者 组件只负责行为和最基础的DOM结构
    > 技术选型
    1. CSS解决方案
    2. JS解决方案
    
    > 如何快速启动一个组件库项目
    1. 打包工具
    2. 代码检测
    3. commit规范
    4. 测试工具
    5. 其他
    6. 快速启动脚手架

    > 组件化和模块化
    1. 组件化
    - 从UI界面的角度来进行分析的 把一些可复用的UI元素抽离处理
    - 优点: 随着项目规模的增大 手中的组件越来越多 很方便就能把现有的组件拼接成一个完整的页面
    2. 模块化
    - 从代码的角度来进行分析的 把一些可复用的代码 抽离为单个的模块 便于项目的维护和开发
    
    > 组件可如下定义
        1. 有可复用的模块 完成既定功能
        2. 有明确的接口规定
        3. 有上下文依赖 外部依赖资源的定义
        4. 可以独立发布
    > 组件设计原则
        1. 使用单一职责原则
9. location.href与Vue-router路由跳转区别
    > (Vue-router pushState
    1. 进行路由更新 静态跳转 页面不会重新加载/
        - 使用router跳转和使用history.pushState()没有差别
    2. 同一个页面跳转
    3. 异步加载 this.$nextTick(()=>{获取URL})
    4. 使用diff算法 实现按需加载 减少DOM操作/
    > location.href 
    1. 触发浏览器 页面重新加载一次/
    2. 不同页面间跳转
    3. 同步加载)

    1. vue-router使用pushState进行路由更新 静态跳转 页面不会重新加载 location.href会触发浏览器 页面重新加载一次
    (使用router跳转和使用history.pushState()没有差别
    vue-router用了history.pushState()尤其是在history模式下)
    2. vue-router使用diff算法 实现按需加载 减少DOM操作
    3. vue-router是路由跳转或同一个页面跳转 location.href是不同页面间跳转
    4. vue-router是异步加载this.$nextTick(()=>{获取URL}) location.href是同步加载

    > Location href属性
    - href属性是一个可读可写的字符串 可设置或返回当前显示的文档的完整URL
    
    > 语法 location.href
    > 兼容性
    - 所有主要浏览器都支持href属性
    
    >location.href几种用法
    1. 当前页面打开URL
        1. self.location.href
        2. window.location.href
        3. this.location.href
        4. location.href
    2. 父页面打开新页面
        - parent.location.href
    3. 顶层页面打开新页面
        - top.location.href

    1. 使用location.href实现页面div块的快速定位
    2. location.href可直接获取当前路径
    3. parent.location.href跳转到上一层页面
    4. top.location.href跳转到最外层页面
10. Vue路由懒加载(异步加载组件)
    > 路由懒加载
    - 对于SPA单页面应用 当打包构建时 JS包会变得非常大 影响页面加载速度
    - 将不同路由对应的组件分割成不同的代码块 当路由被访问时 才加载对应组件
    1. Vue异步组件
        - Vue允许以一个工厂函数的方式定义组件 这个工厂函数会解析组件定义 Vue只在这个组件需要被渲染时才会触发该工厂函数
        - 且会把结果缓存起来供未来重新渲染 这个工厂函数会收到一个resolve回调 这个回调函数会在你从服务器得到组件定义时被调用
    2. 动态import/ES6的import
        - vue-router在官网提供了一种方法 可以理解也是为通过Promise的resolve机制 因为Promise函数返回的Promise为resolve组件本身 有可以用import导入组件
    3. webpack提供的require.ensure
        - 这种方式可以通过参数中的webpackChunkName将js分开打包
    - resolve
    - 主要使用了resolve异步机制 用require代替import实现按需加载
    
    - 官网方法
    - vue-router在官网提供一种方法 可以理解为通过Promise的resolve机制 因为Promise函数返回的Promise为resolve组件本身 我们可以使用import导入组件

    > 三种方式
    1. Vue异步组件
        - 主要是使用了resolve的异步机制 用require代替了import实现按需加载
        ```
        export default new Router({
            routes:[
                {
                    path:'/home',
                    component:(resolve)=>require(['@/components/home'],resolve)
                },
                {
                    path:'/about',
                    component:(resolve)=>require(['@/components/about'],resolve)
                }
            ]
        })
        ```
    2. ES6的import()
        - vue-router在官网提供了一种方法 可以理解也是为通过Promise的resolve机制 因为Promise函数返回的Promise为resolve组件本身 有可以用import导入组件
        ```
        export default new Router({
            routes:[
                {
                    path:'/home',
                    component:()=>import('@/components/home')
                },
                {
                    path:'/about',
                    component:()=>import('@/components/about')
                },
            ]
        })
        ```
    3. Webpack的require.ensure()
        - 这种方式可以通过参数中的webpackChunkName将js分开打包
        ```
        export default new Router({
            routes:[
                {
                    path:'/home',
                    component:(resolve)=>require.ensure([],()=>resolve(require('@/components/home'))
                },
                {
                    path:'/about',
                    component:(resolve)=>require.ensure([],()=>resolve(require('@/components/about'))
                },
            ]
        })
        ```
11. $route&$router
    1. $route(路由信息对象 包括path params hash query fullPath matched name等路由信息参数) 
    2. $router(vue-router实例对象 包括路由跳转方法/钩子函数)
        - $router(vue-router实例对象 包括路由跳转方法 钩子函数)
            - 为 VueRouter 实例，想要导航到不同 URL，则使用 $router.push
            - 是VueRouter的一个对象，通过Vue.use(VueRouter)和Vu构造函数得到一个router的实例对象，这个对象中是一个全局的对象，他包含了所有的路由，包含了许多关键的对象和属性。
            以history对象来举例：
            - $router.push({path:'home'})，本质是向history栈中添加一个路由，在我们看来是切换路由，但本质是在添加一个history记录 
        - $route(路由信息对象 包括path params hash query fullPath matched name等路由信息参数)
            - $route是一个跳转的路由对象，每一个路由都会有一个$route对象，是一个局部的对象，可以获取对应的name，path，params，query等 
            为当前 router 跳转对象里面可以获取 name 、 path 、 query 、 params 等
            - $route.path 字符串，等于当前路由对象的路径，会被解析为绝对路径，如/home/ews
            - $route.params 对象，含路有种的动态片段和全匹配片段的键值对，不会拼接到路由的url后面
            - $route.query 对象，包含路由中查询参数的键值对。会拼接到路由url后面
            - $route.router 路由规则所属的路由器
            - $route.matchd 数组，包含当前匹配的路径中所包含的所有片段所对象的配置参数对象
            - $route.name 当前路由的名字，如果没有使用具体路径，则名字为空
12. vue-router三种传参方式
    1. meta 路由元信息 写在routes配置文件中
    2. query 
        - path引入 this.$route.query.xxx获取
        - 类似get 参数显示在地址栏
        - 浏览器地址 http://localhost:8036/home?userId=123 
    3. params
        - name引入 this.$route.params.xxx获取
        - 类似post 参数不显示在地址栏
        - 浏览器地址 http://localhost:8036/home/123
    1. meta：路由元信息，写在routes配置文件中。
        {
            path: '/home',
            name: 'home',
            component: load('home'),
            meta: {
                title: '首页'
            },
        },
        获取方式this.$route.meta.title获取
    2. query
        - path引入 this.$route.query.xxx 接参
        - 类似get 参数显示在地址栏
        this.$route.push({
            path:'/home',
            query:{
                userId:123
            }
        })
        浏览器地址：http://localhost:8036/home?userId=123 
        获取方式：this.$route.query.userId
    3. params：这种方式比较麻烦。
        - name引入 this.$route.params.xx
        - 类似post 参数不显示在地址栏
        1. 首先要在地址上做配置
            {
                path: '/home/:userId',
                name: 'home',
                component: load('home'),
                meta: {
                    title: '首页'
                },
            },
        2. 访问传参
        ```
        const userId = '123'
        this.$router.push({ name: 'home', params: { userId } })
        ```
        - 注：用params传参，只能用命名的路由（用name访问），如果用path，params不起作用。 this.$router.push({ path: '/home', params: { userId }})不生效。
        浏览器地址：http://localhost:8036/home/123
        获取方式：this.$route.params.userId
12. vue-router使用
    1. query(path引入 接参 this.$route.query.name 类似get传参 参数地址栏显示 拼接在url后面的参数，没有也没关系 不设置 没关系)
    2. params(name引入 接参 this.$route.params.name 类似post传参 参数地址栏不显示 是路由的一部分 必须要有 不设置 刷新页面或者返回参数会丢失)
    > 传参区别
    1. 用法上(接收参数的时候，已经是$route而不是$router)
        - query要用path来引入，params要用name来引入
        - 接收参数都是类似的，分别是
        1. this.$route.query.name和
        2. this.$route.params.name。
        - 注：接收参数的时候，已经是$route而不是$router
    2. 展示上
        - query更加类似于我们ajax中get传参
        - params则类似于post，说的再简单一点，前者在浏览器地址栏中显示参数，后者则不显示
    3. params是路由的一部分,必须要有。query是拼接在url后面的参数，没有也没关系。
        - params一旦设置在路由，params就是路由的一部分，如果这个路由有params传参，但是在跳转的时候没有传这个参数，会导致跳转失败或者页面会没有内容。
    4. params、query不设置也可以传参，params不设置的时候，刷新页面或者返回参数会丢失 query则不会有这个问题        
12. Vue-router源码
    
    - VueRouter 原型上定义了一系列的函数
    - 我们日常经常会使用到 主要有go/push/replace/back/forward
    - 以及一些导航守护beforeEach/beforeResolve/afterEach 等等
    - html 中使用到的 router-view 
    - 以及经常用到的 router-link 则存在 src/components 目录下。
    
    - Vue-Router是Vue.js官方的路由管理器 它和Vue.js可深度集成 使构建SPA更容易
    > 目录结构
    ```
    vue-router
        components #存放vue-router两个核心组件
            link.js
            view.js
        history     #存放浏览器跳转相关逻辑
            base.js
            hash.js
        create-matcher.js #创建匹配器
        create-route-map.js #创建路由映射表
        index.js        #引用时的入口函数
        install.js      #install方法
    目录结构
        --components 组件
            --link.js route-link的实现
            --view.js route-view的实现
        --create-matcher.js 创建匹配
        --create-route-map.js 创建路由的映射
        --history 操作浏览器记录的一系列内容
            --abstract.js 非浏览器的history
            --base.js   基本的history
            -hash.js hash模式的history
            -html5.js html5模式的history
        --index.js 入口文件
        --install.js 插件安装的方法
        --util 工具类库
            --async.js 异步操作的工具库
            --dom.js dom相关的函数
            --location.js 对location的处理
            --misc.js 一个工具方法
            --params.js 处理参数
            --path.js 处理路径
            --push-state.js 处理html模式的pushState
            --query.js 对query的处理
            --resolve-components.js 异步加载组件
            --route.js 路由
            --scroll.js 处理滚动
            --warn.js 打印一些警告
    ```
    - 使用Vue-router时 主要有以下几步(安装插件 创建router对象 挂载router)
        ```
        <div id="app">
            <!-- 路由匹配到的组件将渲染在这里 -->
            <router-view></router-view>
        </div>    
        ```
        1. 安装 插件
        ```
        Vue.use(VueRouter);
        ```
        2. 创建router对象
        ```
        const router = new VueRouter({
            routes // 路由列表 eg: [{ path: '/foo', component: Foo }]
        });
        ```
        3. 挂载router
        ```
        const app = new Vue({
            router
        }).$mount('#app');
        ```
        - 其中 VueRouter 对象，就在vue-router 的入口文件 src/index.js
13. Vue-router
    - (SPA single page application的路径管理器 WebApp的链接路径管理系统)

    > Vue-router 
    - 实现SPA单页面前端路由
    1. hash模式(浏览器环境) Vue-router模式 原理onhashchange事件 window对象上监听这个事件
    2. history模式 依赖H5 History API&服务器配置
    3. abstract模式(Nodejs环境) 支持所有JS运行环境 如Nodejs服务器端 如果没有发现浏览器API 路由会强制进入这个模式
    - (Vue的单页面应用是基于路由和组件的 路由用于设定访问路径 并将路径和组件映射起来)
    - (传统的页面应用 超链接实现页面切换跳转 vue-router单页面应用/路径/组件的切换)
    - (路由模块本质 建立起URL和页面之间映射关系)
    
    > hash模式 Vue-router默认模式
    1. URL的hash模拟一个完整URL URL改变 页面不重新加载 hash(#)是URL锚点 代表网页中一个位置)
    2. Hash出现在URL中 不会被包含在HTTP中 对后端没有影响 改变Hash不会重新加载页面(原因) 会在浏览器访问历史中增加一个记录)
    3. Hash通过锚点值的改变 根据不同的值 渲染指定DOM位置不同数据)

    > History模式 利用了H5 API新增的pushState()方法和replaceState方法 提供对历史记录修改功能) 
    1. 利用H5 History Interface中新增pushState()和replaceState()方法 用于浏览器记录栈
    在当前已有back() forward() go()基础上 提供对历史记录修改)
    2. 需要后端配置支持 服务器添加一个覆盖所有情况的候选项 URL匹配不到静态资源 则返回一个index.html页面)
    3. 解决Hash模式存在问题 Hash传参基于URL 如要传递复杂数据 会有体积限制 history模式可在UR里传参/可将数据存放到一个特定对象)    

    > $router.push和$router.replace的区别：
    1. $router.push 会向history 栈添加一个新的记录 点击浏览器的返回按钮时可以看到之前的页面。
    2. $router.replace 不会向 history 添加新记录，而是替换掉当前的 history 记录，即当replace跳转到的网页后，‘后退’按钮不能查看之前的页面。

    > vue-router使用路由模块实现页面跳转三种方式
    1. 直接修改地址栏
    2. 编程式的导航 this.$router.push(‘路由地址’)
    3. 声明式的导航 <router-link to="路由地址"></router-link>
    
    > vue-router参数传递
    1. name-params/path-query传递参数
        - 路由文件src/router/index.js里配置name属性
        - 模板里(src/App.vue)用$route.name来接收 比如：<p>{{ $route.name}}</p>
    2. <router-link> 标签中的to传参
        ```
        <router-link :to="{name:xxx,params:{key:value}}">valueString</router-link>
        ```
    3. 利用url传参----在配置文件里以冒号的形式设置参数。   

    > 不能用a标签
    - 用Vue做的都是单页应用
    - 当你的项目准备打包时，运行npm run build时，就会生成dist文件夹，
    - 这里面只有静态资源和一个index.html页面 所以你写的标签是不起作用的，你必须使用vue-router来进行管理。    

    > SPA
    - (SPA核心之一 更新视图而不重新请求页面)
    - (SPA加载页面时 不会加载整个页面 而是只更新某个指定的容器中内容)
    1. hash模式
    2. history模式
    - 单一页面应用程序，只有一个完整的页面；它在加载页面时，不会加载整个页面，而是只更新某个指定的容器中内容。
    
    > 单页面应用(SPA)的核心之一是: 
    - 更新视图而不重新请求页面
     
    > SPA Vue单页面应用 和传统页面应用的区别
    - 路由模式的本质就是建立起URL和页面之间的映射关系
    - Vue的SPA单页面应用是基于路由和组件的 路由用于设定访问路径 并将路径和组件映射起来
    - SPA中通过路径的切换 即组件的切换 实现页面切换和跳转
    - 传统的页面应用 用一些超链接来实现页面切换和跳转的。
    
    > 前端路由(vue-router)
    - vue-router 此处的路由不是指我们平时所说的硬件路由器 是SPA（单页应用）的路径管理器
    - WebApp的链接路径管理系统。
    - 使用Vue+vue-router创建单页应用SPA十分简单
    - router是Vue.js官方的路由插件，它和vue.js是深度集成的，适合用于构建单页面应用。
    - vue-router提供的功能是将组件映射到路由, 然后渲染出来. 
    - (Vue-router两个需求
        1. 记录当前页面的状态
        2. 可以使用浏览器的前进后退功能
    - Vue-router为了满足以上两个需求实现以下三个功能
        1. 改变URL且不让浏览器向服务器发出请求
        2. 检测URL的改变
        3. 截获URL地址, 并解析出需要的信息来匹配路由规则)
    > url组成
    - 协议部分、域名部分、端口部分、虚拟目录部分、文件名部分、参数部分、锚部分
    - url的锚部分是从“#”开始到最后，都是锚部分。锚部分不是url的必需部分。
    - url的参数部分是从“？”开始到“#”为止之间的部分。参数部分也不是url的必需部分。
    
    > Vue-Router
    1. hash模式
        1. 原理 onhashchange事件 可以在window对象上监听这个事件)
        2. 可以通过window.location.hash属性读取hash值 且该属性可读可写
        3. 可使用window.addEventListener('hashchange',fun)监听hash变化
        4. #和后面的URL片段标识符被称为hash 会被浏览器解读为位置标识符 这些字符不会被发送到服务器端 改变只会滚动到相应位置)
        5. 使用URL hash值来做路由 支持所有浏览器 包括不支持HTML5 History API的浏览器)
        6. #/URL锚点/hash 代表网页中一个位置 改变#后数值 浏览器只会滚动到相应位置 不会重新加载网页)
        7. hash出现在URL中 但不会被包含在HTTP请求中 对后端没有影响)
        8. hash改变会触发hashchange事件 浏览器进退也能对其控制 H5之前基本都是使用hash实现前端路由 每一次改变#后的部分 都会在浏览器访问历史中增加一个记录 使用后退按钮 可以回到上一个位置)
        9. Hash模式通过锚点的改变 据不同的值 渲染指定DOM位置的不同数据)
        > 实现原理
        - 早期的前端路由实现就是基于location.hash实现的 location.hash的值就是URL中#后面的内容
        > vue-router源码对/src/history/hash.js的处理
        1. 使用window.addEventListener('hashchange',fun)监听路由的变化 然后使用transitionTo方法更新视图
        2. vue-router 的2个主要API push 和 replace 也是简单处理了下 hash , 然后调用 transitionTo 方法更新视图
    2. history模式(依赖HTML5 History API和服务器配置)
        > HTMLHistory基本知识:
        - (使用back() forward() go()方法完成在用户历史记录中向后和向前的跳转
        - H5中引入了history.pushState()添加历史记录/history.replaceState()修改历史记录
        - 解决hash传参体积问题 不带# 更美观
        - 通过JS操作window.history改变浏览器地址栏参数 没有发起HTTP请求)
        1. History 接口允许操作浏览器的曾经在标签页或者框架里访问的会话历史记录。
        2. 使用 back(),  forward()和  go() 方法来完成在用户历史记录中向后和向前的跳转。
        3. HTML5引入了 history.pushState() 和 history.replaceState() 方法，它们分别可以添加和修改历史记录条目。
        > vue-router源码对/src/history/html5.js处理
        1. 处理逻辑和 hash 相似，使用 window.addEventListener("popstate", fun) 监听路由的变化,
        2. 使用 transitionTo 方法更新视图
        
        1. 利用了HTML5新增的pushState()和replaceState()两个API, 通过这两个api完成URL跳转不会重新加载页面
        2. 同时history模式解决了hash模式存在的问题. hash的传参是基于URL的, 如果要传递复杂的数据, 会有体积限制, 而history模式不仅可以在URL里传参, 也可以将数据存放到一个特定的对象中
        
        > 404问题 
        - history模式下 只是动态的通过JS操作window.history改变浏览器地址栏里的路径
        - 并没有发起HTTP请求 当直接在浏览器里输入这个地址的时候 就一定要对服务器发起http请求 但是该目标在服务器上不存在 所以会返回404
        
        > 解决:
        - 在Ngnix中将所有请求都转发到index.html上就可以了。
    3. abstract
        - (支持所有JavaScript运行环境 如Node.js服务器端 如果发现没有浏览器的API 路由会强制进入这个模式)
        > 对/src/history/abstract.js处理
        1. 首先定义了2个变量，stack 来记录调用的记录， index 记录当前的指针位置
        2. 首先定义了2个变量，stack 来记录调用的记录， index 记录当前的指针位置
    > 小结
    1. hash 和 history 的使用方式差不多，hash 中路由带 # ，但是使用简单，不需要服务端配合，站在技术角度讲，这个是配置最简单的模式，
    2. history 模式需要服务端配合处理404的情况
    (在路由跳转的时候，就会出现访问不到静态资源而出现 404 的情况，这时候就需要服务端增加一个覆盖所有情况的候选资源：如果 URL 匹配不到任何静态资源，则应该返回同一个 index.html 页面) 路由中不带 # ，比 hash 美观一点。
    3. abstract 模式没有使用浏览器api 可以放到node环境或者桌面应用中   
14. Vue-Router导航守卫 
    1. 全局的(beforeEach路由跳转前触发/beforeResolve路由跳转前触发/afterEach路由跳转完成后触发)
    2. 单个路由独享的(beforeEnter 紧随beforeEach后)
    3. 组件内(beforeRouteEnter渲染该组件对应路由被确认前/beforeRouteUpdate组件被复用/beforeRouteLeave导航离开该组件)
    
    > 导航守卫
    - 路由跳转过程中的一些钩子函数 路由跳转是一个大过程 这个大过程分跳转前中后等细小过程 每一个过程都有一个函数 可以让你操作一些其他的事的时机
    
    > 常用的两个路由守卫
    1. router.beforeEach
    2. router.afterEach
    
    > 项目中
    - 一般在beforeEach这个钩子函数中进行路由跳转一些信息判断 判断是否登录 是否拿到对应路由权限

    > 导航守卫全解析
    - 一个钩子函数执行后输出的顺序
        1. 全局前置守卫:beforeEach
        2. 路由beforeEnter守卫
        3. 组件路由守卫beforeRouterEnter 此时this并不指向该组件实例
        4. 全局解析守卫beforeResolve
        5. 全局后置守卫afterEach
        
        组件生命周期beforeCreate
        组件生命周期created
        组件生命周期beforeMount
        组件生命周期mounted
        
        组件路由守卫beforeRouteEnter的next回调
    1. 全局的(beforeEach路由跳转前触发/beforeResolve路由跳转前触发/afterEach路由跳转完成后触发)
        路由实例上直接操作的钩子函数 
        特点:
            所有路由配置的组件都会触发
            即触发路由就会触发这些钩子函数
            钩子函数按执行顺序包括
                beforeEach 全局前置守卫
                    路由跳转前触发
                    参数 to from next
                    主要用作登录验证 
                    即路由还没跳转提前告知
                    免得跳转后再告知晚了
                beforeResolve 全局解析守卫
                    路由跳转前触发
                    参数 to from next
                    区别：
                        导航被确认之前
                        同时再所有组件内守卫和异步路由组件被解析之后 解析守卫被调用
                    在beforeEach和组件内beforeRouteEnter之后 
                    afterEach之前调用
                afterEach 全局后置守卫
                    (afterEach钩子中不可以使用next() 不接受next的参数)
                    与beforeEach相反
                    路由跳转完成后触发
                    参数
                        to from
                    在beforeEach和beforeResolve之后
                    beforeRouteEnter(组件内守卫)之前
    2. 单个路由独享的(beforeEnter 紧随beforeEach后)
        单个路由配置时 也可设置的钩子函数
        目前只有一个钩子函数
            beforeEnter
                和beforeEach完全相同
                如果都设置则在beforeEach之后紧随执行
                参数:
                    to from next
    3. 组件内(beforeRouteEnter渲染该组件对应路由被确认前/beforeRouteUpdate组件被复用/beforeRouteLeave导航离开该组件)
        组件内执行的钩子函数 
        类似于组件内的生命周期
        相当于为配置路由的组件添加的生命周期钩子函数
        钩子函数按执行顺序包括
        beforeRouteEnter
            进入对应路由的组件创建前被调用
            渲染该组件对应路由被comfirm前调用
            不能获取组件实例this
            因为当守卫执行前 组件实例还没被创建
            可以通过传一个回调给next来访问组件实例
            在导航被确认时执行回调 并把组件实例作为回调函数的参数
        beforeRouteUpdate
            重用的组件中被调用 如包含<router-view/>的组件
            在当前路由改变 但是该组件被复用时调用
            举例来说 对于一个带有动态参数的路径
            /foo/:id 在/foo/1和/foo/2之间跳转
            由于会渲染同样的Foo组件
            因此组件实例会被复用
            这个钩子会在这个情况下被调用
            可以访问组件实例的this
        beforeRouteLeave
            导航离开该组件的对应路由调用
            可以访问组件实例this
    > 导航守卫回调参数
    1. to:目标路由对象 即将进入路由对象
    2. from:即将要离开的路由对象 当前导航正要离去路由对象
    3. next:最重要一个参数 单凡涉及到next参数的钩子 必须调用next才能继续往下执行下一个钩子
        next()：进入下一个路由。
        next(false)：中断当前的导航。
        next('/')或next({ path: '/' }) : 跳转到其他路由，当前导航被中断，进行新的一个导航。
    > PS:
    1. 但凡涉及到有next参数的钩子 必须调用next()才能继续往下执行下一个钩子 否则路由跳转会停止
    2. 如果要中断当前的导航要调用next(false)如果浏览器的URL改变了(可能是用户手动或浏览器后退按钮)则URL地址会重置到from路由对应的地址
    (主要用于登录验证不通过的处理)
    3. next可以这样使用 next('/')/next({path:'/'})跳转到一个不同的地址 意思是当前导航被中断 然后进行一个新的导航 可传递的参数和router.push()选项一致
    4. 在beforeRouteEnter钩子中next((vm)=>{})内接受的回调函数参数为当前组件的实例vm 这个回调函数在生命周期mounted之后调用 即它是所有导肮守卫和生命周期函数最后执行的那个钩子
    5. next(errror) 如果传入next的参数是一个Error实例 则导航会被终止且该错误会被传递给router.onError()注册过的回调
    
    > 小结：
    - 路由导航守卫都是在Vue实例生命周期钩子函数之前执行的。
    - 切换路由时：
        beforeRouterLeave->
        beforeEach->
        beforeEnter->
        beforeRouteEnter->
        beforeResolve->
        afterEach->
        beforeCreate->
        created->
        beforeMount->
        mounted->
        beforeRouteEnter的next回调
    - 路由更新时:
        beforeRouteUpdate
    - 完整的导航守卫流程
        导航被触发。
        在失活的组件里调用离开守卫beforeRouteLeave(to,from,next)。
        调用全局的beforeEach( (to,from,next) =>{} )守卫。
        在重用的组件里调用 beforeRouteUpdate(to,from,next) 守卫。
        在路由配置里调用beforeEnter(to,from,next)路由独享的守卫。
        解析异步路由组件。
        在被激活的组件里调用beforeRouteEnter(to,from,next)。
        在所有组件内守卫和异步路由组件被解析之后调用全局的beforeResolve( (to,from,next) =>{} )解析守卫。
        导航被确认。
        调用全局的afterEach( (to,from) =>{} )钩子。
        触发 DOM 更新。
        用创建好的实例调用beforeRouteEnter守卫中传给 next 的回调函数
        beforeRouteEnter(to, from, next) {
            next(vm => {
                //通过vm访问组件实例
            })
        }
15. Router-link(设置路由跳转)和Router-view(根据路由显示组件)
    - router-link和router-view在同一个Vue文件中
    1. router-link
    - 设置路由跳转
    ```
        <router-lonk :to="...">声明式导航
        router.push(...)编程式导航
    ```
    2. router-view
    - 根据路由显示组件
    
    > Vue中这两者相互依存
    - router-link对应HTML中的a标签 与a标签不同的是跳转的时候 不会刷新页面
    - router-view相当于router-link的承载页面 用于显示router-link的内容
    
    > router-link
    - <router-link>是Vue-Router的内置组件，在具有路由功能的应用中作为声明式的导航使用。

    <router-link>8个prop
    1. to：必填，表示目标路由的链接。当被点击后，内部会立刻把to的值传到router.push()，所以这个值可以是一个字符串或者是描述目标位置的对象。
    注意path存在时params不起作用，只能用query
    2. replace：默认值为false，若设置的话，当点击时，会调用router.replace()而不是router.push()，于是导航后不会留下 history 记录。
    3. append：设置 append 属性后，则在当前 (相对) 路径前添加基路径。
    4. tag：让<router-link>渲染成tag设置的标签，如tag:'li,渲染结果为<li>foo</li>。
    5. active-class：默认值为router-link-active,设置链接激活时使用的 CSS 类名。默认值可以通过路由的构造选项 linkActiveClass 来全局配置。
    6. exact-active-class：默认值为router-link-exact-active,设置链接被精确匹配的时候应该激活的 class。默认值可以通过路由构造函数选项 linkExactActiveClass 进行全局配置的。
    7. exact：是否精确匹配，默认为false。
    8. event：声明可以用来触发导航的事件。可以是一个字符串或是一个包含字符串的数组，默认是click。
15. 编程式导航&声明式导航
    > 实现路由跳转的两种方式
    1. 声明式导航：
    - 直接渲染到页面 <router-link to="/url">
    2. 编程式导航：
    - JS中处理逻辑后需要页面进行跳转
    - this.$router其实就是router
    - Vue为方便在组件中使用router 才添加this.$router
    1. this.$router.push();
        - 会进行页面跳转 同时会在历史记录上留下记录
    2. this.$router.replace();
        - 和push功能相同 但是会替换当前页出现在历史记录中
    3. this.$router.go(num);
        - 表示距离当前页的在历史记录上的页数
    4. this.$router.back()
        - 返回到上一页
    5. this.$router.forward()
        前进到下一页
    > 共同点：
    - 都能进行导航 都可以触发路由 实现组件切换
    > 区别：
    - 写法不一样
    - 声明式导航写在组件的template中 通过router-link触发
    - 编程式导航写在JS函数中 通过this.$router.push(xxx)触发            
16. SPA 单页面的理解 优缺点 优化首屏加载速度慢的问题
    > SPA（ single-page application ）
    1. 仅在Web页面初始化时加载
    2. 页面加载完成后 利用路由机制实现HTML内容变换

    - 仅在 Web 页面初始化时加载相应的 HTML、JavaScript 和 CSS。 一旦页面加载完成，SPA 不会因为用户的操作而进行页面的重新加载或跳转； 取而代之的是利用路由机制实现 HTML 内容的变换，UI 与用户的交互，避免页面的重新加载。
    
    > 优点：(良好的用户体验/良好的前后端工作分离模式/减轻服务器压力)
    1. 良好的交互体验
        - 用户体验好、快，内容的改变不需要重新加载整个页面，避免了不必要的跳转和重复渲染；
    2. 良好的前后端工作分离模式
        - 前后端职下·责分离，架构清晰，前端进行交互逻辑，后端负责数据处理；
    3. 减轻服务器压力
        - 基于上面一点，SPA 相对对服务器压力小；
    
    > 缺点：(SEO难度较高/导航不可用/初次加载耗时多 页面复杂度提高很多)
    4. SEO(Search Engine Optimization搜索引擎优化)难度较高
        - 由于所有的内容都在一个页面中动态替换显示，所以在 SEO 上其有着天然的弱势。
    5. 导航不可用
        - 由于单页应用在一个页面中显示所有的内容 所以不能使用浏览器的前进后退功能 所有的页面切换需要自己建立堆栈管理；
    6. 初次加载耗时多 页面复杂度提高很多
        - 为实现单页 Web 应用功能及显示效果，需要在加载页面的时候将 JavaScript、CSS 统一加载，部分页面按需加载；
    
    > 优化：
    1. (将公用的JS库通过script标签引入 (减少app.bundle大小/
    2. 配置路由时页面和组件使用懒加载方式引入)
    3. /加一个首屏loading图提升用户体验)
    
    1. 将公用的JS库通过script标签外部引入，减小app.bundel的大小，让浏览器并行下载资源文件，提高下载速度；
    2. 在配置路由时，页面和组件使用懒加载的方式引入，进一步缩小 app.bundel 的体积，在调用某个组件时再加载对应的js文件；
    3. 加一个首屏 loading 图，提升用户体验；
17. Vuex
    > 定义:
    - 一个专为 Vue.js 应用程序开发的状态管理插件。每一个 Vuex 应用的核心就是 store（仓库）。
    - “store” 基本上就是一个容器，它包含着你的应用中大部分的状态 ( state )。它采用集中式存储管理应用的所有组件的状态 更改状态的唯一方法是提交mutation，
    - 例this.$store.commit('SET_VIDEO_PAUSE', video_pause，SET_VIDEO_PAUSE为mutations属性中定义的方法
    - Vuex 的状态存储是响应式的。当 Vue 组件从 store 中读取状态的时候，若 store 中的状态发生变化，那么相应的组件也会相

    > 包括以下几个模块：
    1. State：
        - 定义了应用状态的数据结构，可以在这里设置默认的初始状态。
    2. Getter：
        - 允许组件从 Store 中获取数据，mapGetters 辅助函数仅仅是将 store 中的 getter 映射到局部计算属性。
    3. Mutation：
        - 是唯一更改 store 中状态的方法，且必须是同步函数。
    4. Action：
        - 用于提交 mutation，而不是直接变更状态，可以包含任意异步操作。
    5. Module：
        - 允许将单一的 Store 拆分为多个 store 且同时保存在单一的状态树中。
    
    > 解决问题:
    1. 多个组件依赖于同一状态时，对于多层嵌套的组件的传参将会非常繁琐，并且对于兄弟组件间的状态传递无能为力。
    2. 来自不同组件的行为需要变更同一状态。以往采用父子组件直接引用或者通过事件来变更和同步状态的多份拷贝。以上的这些模式非常脆弱，通常会导致无法维护的代码。

    > 应用场景:
    1. 多个组件依赖于同一状态时。
    2. 来自不同组件的行为需要变更同一状态。

    > 设计思想
    - Vuex 借鉴了Flux Redux 将数据存放到全局的store
    - 再将store挂载到每个Vue实例组件中 利用Vue.js的细粒度数据响应机制来进行高效的状态更新
    
    > Vuex的store如何挂载注入到组件中
    1. 在Vue项目中先安装Vuex
    2. 利用Vue插件机制 使用Vue.use(vuex) 调用Vuex的install方法 装载Vuex
    3. applyMinxin方法使用Vue混入机制 Vue的生命周期beforeCreate钩子函数混入vuexInit方法
    
    > 分析源码
    1. Vuex利用Vue的mixin混入机制 
    2. 在beforeCreate钩子函数前混入vuexInit方法
    3. vuexInit方法实现了store注入vue组件实例
    4. 并注册了vuex store的引用属性$store
    
    > Vuex的state和getters如何映射到各个组件实例中响应式更新状态 store实现的源码在src/store.js
    1. 源码中找到resetStoreVM核心方法
        - Vuex的state状态是响应式的 借助Vue的data是响应式的 将state存入vue实例组件的data中
        - Vuex的getters借助Vue的计算属性 computed实现数据实时监听

        computed计算属性监听data数据变更主要经历以下几个过程
    > 小结
    - Vuex通过全局注入store对象 来实现组件间状态共享
    - 在大型复杂的项目中(多级组件嵌套) 需要实现一个组件更改某个数据 多个组件自动获取更改后的数据进行业务逻辑处理 此时使用Vuex比较合适
    
    > Vuex辅助函数
    1. computed中对mapState mapGetters解构
        ```
        import {mapState,mapMutations} from "vuex";
        ```
        1. mapState辅助函数 state类似vue中的data
        computed:{
            ...mapState(['nickname','age','gender'])
        },
        2. mapGetters辅助函数 getterr相当于Vue中的computed
        computed:{
        ...mapGetters(['realname','money_us'])
        },
        - getters相当于Vue中的计算属性 通过getters进一步处理得到我们想要的数值 允许穿参 第一个参数是state

    2. methods中对mapMutations mapActions解构
        1. mutations
        - mutations类似vue中的methods 需要通过commit调用其中方法 可传入参数 
        - mutations只能写同步方法不能写异步方法如axios setTimeout 主要作用就修改state
        - 为什么调用mutations中的方法对state中的数值进行修改 而不直接进行修改呢
        - 作者在mutations中做了类似埋点操作如果
        - 从mutations中操作的话， 能被检测到，可以更方便用调试工具调试，调试工具可以检测到实时变化，而直接改变state中的属性，则无法实时监测
        - mutations中写异步，也能够调成功，但是由于是异步的，不能被调试工具追踪到，所有不推荐这样写，不利于调试,这是官方的约定。)
        ```
        methods:{
            ...mapMutations(['changePage'])
        }
        ```
        1. state
        2. 负荷payload -该参数最好写成对象形式 可以传递更多信息
        
        2. mapActions
        - (action类似mutation
        ```
        methods:{
            ...mapActions(['getUserInfo'])
        }
        (this.$store.dispatch(‘getUserInfo’))
        ```
        > 区别：
        1. action可以提交mutation
        2. action不要直接操作state 而是去操作mutation
        3. action包含异步操作 类似axios请求 都可以放在action中写
        4. action默认就是异步 而且返回promise
        > Vuex中action和mutation有什么区别/共同点
        - 区别：
            1. action 提交的是 mutation，而不是直接变更状态。mutation可以直接变更状态。
            2. action 可以包含任意异步操作。mutation只能是同步操作。
            3. 提交方式不同，action 是用this.$store.dispatch('ACTION_NAME',data)来提交。mutation是用this.$store.commit('SET_NUMBER',10)来提交。
            4. 接收参数不同，mutation第一个参数是state，而action第一个参数是context，其包含了
        - 相同：
            1. 第二参数都可以接收外部提交时传来的参数。
            ```
            this.$store.dispatch('ACTION_NAME',data)和
            this.$store.commit('SET_NUMBER',10)
            ```

    > 手动引入:
    1. 先安装依赖nnpm install vuex --save
    2. 在项目目录src中建立store文件夹
    3. 在store文件夹下新建index.js文件,写入
        ```
        import Vue from 'vue';
        import Vuex from 'vuex';
        Vue.use(Vuex);
        //不是在生产环境debug为true
        const debug = process.env.NODE_ENV !== 'production';
        //创建Vuex实例对象
        const store = new Vuex.Store({
            strict:debug,//在不是生产环境下都开启严格模式
            state:{
            },
            getters:{
            },
            mutations:{
            },
            actions:{
            }
        })
        export default store;
        ```
    4. main.js文件中引入Vuex
        ```
        import Vue from 'vue';
        import App from './App.vue';
        import store from './store';
        const vm = new Vue({
            store:store,
            render: h => h(App)
        }).$mount('#app')
        ```

    > Vuex中状态是对象时 使用注意事项
    - 对象是引用类型 复制后改变属性还是会影响原始数据 这样会改变state里面的状态 不允许 先用深度克隆复制对象 再修改。

    > Vuex插件使用
    - Vuex插件就是一个函数 它接受store作为唯一参数 在Vuex.store构造器选项plugins引入
    1. store/plugin.js文件中写入
       ```
        export default function createPlugin(param){
            return store =>{
                //...
            }
        }
        ```
    2. store/index.js文件中写入
        import createPlugin from './plugin.js'
        const myPlugin = createPlugin()
        const store = new Vuex.Store({
        // ...
        plugins: [myPlugin]
        })

    > Vuex严格模式
    - 不是由mutations函数引起的状态变更 抛出错误
    - 开启
    - Vuex.Store构造器选项
    ```
    const store = new Vuex.Store({
        strict:true
    })
    ```
18. vue初始化和生命周期钩子函数
    - (初始化:开始创建、初始化数据、编译模板、挂载Dom、数据变化时更新DOM、卸载)
    - (生命周期:Vue实例从创建到销毁的过程)
    - (Vue实例有一个完整的生命周期 指一个实例从开始创建到销毁这个过程)
    - (生命周期钩子自动绑定this到实例上 可以通过this操作访问到数据和方法)
    - (生命周期钩子函数
    1. beforeCreate
        实例初始化之后 创建之前
        el  undefined
        data undefined
        DOM 未生成
        --el和data未初始化
    2. created
        el undefined
        data [Object Object]
        - el未初始化 data初始化

        实例创建之后 vm.$el未定义 挂载属性el不存在
        能读取到data的值(属性和方法的运算watch/event事件回调)
        模板渲染成HTML DOM未生成

        数据初始化最好在此阶段完成
        完成数据观测，    

        el  undefined
        data [Object Object]
        DOM未生成
    3. beforeMount
        $el挂载前 vm.$el还是未定义
        相关Render函数首次被调用 将模块渲染成HTML
        相关的 render 函数首次被调用
        期间将模块渲染成html
        将编译完成的html挂载到对应的虚拟DOM

        el  [Object HTMLDivElement]
        data [Object Object]
        -- el和data初始化->已完成模版变异->未渲染到页面
        DOM 相关render函数首次被调用 将模块渲染成HTML
        data初始化
        meaasge Vue生命周期
    4. mounted
        $el挂载后被调用 编译好的HTML挂载到页面完成后
        初始化页面完成后调用nextTick方法
        el  [Object HTMLDivElement]
        data [Object Object]
        --挂载渲染完成后调用->初始化页面->对DOM进行操作
        
        此时vm.$el可以调用

        
        不能保证所有的子组件都挂载
        要等视图全部更新完毕用vm.$nextTick();
        编译好的html挂载到页面完成后所执行的事件钩子函数。
        挂载完毕阶段

        此时编译好的HTML已经挂载到了页面上 页面上已经渲染出了数据
        一般会利用这个钩子函数做一些
        ajax请求获取数据进行数据初始化
        el  [Object HTMLDivElement]
        data [Object Object]
        meaasge Vue生命周期
        此阶段中DOM渲染完成
    5. beforeUpadate
        更新渲染视图前 
        界面中数据旧 data中数据已更新
        未同步

        检测到修改数据
        更新渲染视图之前触发

        修改vue实例的data时
        vue就会自动帮我们更新渲染视图
        检测到我们要修改数据 
        更新渲染视图之前触发
    6. updated
        更新渲染视图后
        已同步

        此阶段为更新渲染视图之后触发
        此时再读取视图上的内容，已经是最新的内容。
        PS:
        1.该钩子在服务器端渲染期间不被调用。
        2.应该避免在此期间更改状态，
        因为这可能会导致更新无限循环。
    7. beforeDestory
        实例销毁前触发 实例vm可用
        调用实例的destroy() 
        此时实例仍然完全可用；
        方法可以销毁当前的组件，在销毁前，
        会触发beforeDestroy钩子。
    8. destoryed
        实例销毁后触发 实例vm不可用
        此时该实例与其他实例的关联已经被清除，
        Vue实例指示的所有东西都会解绑定，
        所有的事件监听器会被移除，
        所有的子实例也会被销毁。
    - props methods data 和computed的初始化都是在beforeCreated 和created之前完成的
18. 在哪个生命周期内调用异步请求(created)/什么阶段才能访问操作DOM(mounted)？
    > (created beforeMounted mounted)
        - 这三个钩子函数中data 已创建 可将服务端端返回的数据进行赋值
        - 在 created 钩子函数中调用异步请求 可以更快获取服务端数据
        - 服务器端没有mounted和beforeMount生命周期钩子函数
    > 什么阶段能访问操作DOM
        - 钩子函数 mounted 被调用前 Vue 已经将编译好的模板挂载到页面上 在 mounted 中可以访问操作 DOM
    
    - created和mounted 
    > mounted生命周期钩子中调用优点
    1. created中，页面视图未出现，如果请求信息过多，页面会长时间处于白屏状态，DOM节点没出来，无法操作DOM节点。
    2. 在mounted不会这样
    > created 钩子函数中调用异步请求优点： 
    - (更快获取服务端数据/ssr不支持beforeMount Mounted生命周期钩子)
    1. 能更快获取到服务端数据，减少页面 loading 时间；
    2. ssr(服务端渲染) 不支持 beforeMount 、mounted 钩子函数，所以放在 created 中有助于一致性；
    > 数据获取
    1. 正常获取created
    2. 涉及需页面加载完成后(DOM操作)mounted

    - 请求是异步的 created生命周期中Data才生成 而请求返回的数据需要挂载在data中 所以created里可以初始化请求 但created时候的dom还没有初始化完成
    - mounted生命周期里dom才初始化渲染完成
    - 请求是异步的 所以不会阻塞页面渲染的主线程 如果请求不需要借助/依赖/改变DOM 这时请求可以放在created 反之可以放在mounted

18. Vue 的父组件和子组件生命周期钩子函数执行顺序/
    - 洋葱模型
    - (加载渲染/子组件更新/父组件更新/销毁)
    1. 加载渲染过程 
        父 beforeCreate -> 
        父 created -> 
        父 beforeMount -> 
        子 beforeCreate -> 
        子 created -> 
        子 beforeMount -> 
        子 mounted -> 
        父 mounted  
    2. 子组件更新过程 
        父 beforeUpdate -> 
        子 beforeUpdate -> 
        子 updated -> 
        父 updated  
    3. 父组件更新过程
        父 beforeUpdate -> 
        父 updated  
    4. 销毁过程 
        父 beforeDestroy -> 
        子 beforeDestroy -> 
        子 destroyed -> 
        父 destroyed
19. Vue一些指令(directive)及具体作用
    > 指令 (Directives)：
    - 是带有 v- 前缀的特殊 attribute。指令 attribute 的值预期是单个 JavaScript 表达式 (v-for 是例外情况，稍后我们再讨论)。
    - 指令的职责是，当表达式的值改变时，将其产生的连带影响，响应式地作用于 DOM。
    1. v-html/v-text(可简写为{{}}并支持逻辑运算)
        - v-html:会以html的方式把内容载入页面中浏览器会将其当作html标签解析后输出 会有XSS攻击分析，不要用在用户提交内容上；
        - v-text：(单向绑定 数据对象=>插值) 操作纯文本 浏览器不会再对其进行html解析 会把全部内容转化为字符串 注:vue中有个指令叫做 v-once 可以通过v-once与v-text结合，实现仅执行一次性的插值
    2. v-show/v-if(v-else-if/v-else)
        - v-show:初始化渲染 切换元素的display属性,来控制元素显示隐藏 初始化会渲染，适用频繁显示隐藏的元素,不能用在<template>上；不支持 v-else
        - v-if:初始化不渲染 通过销毁并重建组件，来控制组件显示隐藏，初始化不会渲染，不适用频繁显示隐藏的组件，可以用在<template>上。支持 v-else
    3. v-on(@)/v-bind(:)/v-model
        1. v-on(用于绑定HTML事件 缩写@) 对象同时绑定多个事件时 不能用@代替v-on v-on后面接一个对象，但是不支持事件修饰符。
        2. v-bind(用于设置HTML属性 缩写:) 多标签的页面也可以使用is特性来切换不同的组件 主要用于属性绑定 如class/style/value/href等
        3. v-model(表单控件元素上创建双向数据绑定 作用于表单控件外的标签没有用)
            - 双向绑定(JS中Vue实例中data<=>其渲染DOM元素上内容)
            - 原理：vue 项目中主要使用 v-model 指令在表单 input、textarea、select 等元素上创建双向数据绑定。
            - v-model 本质上不过是语法糖，v-model 在内部为不同的输入元素使用不同的属性并抛出不同的事件：
            1. text 和 textarea 元素使用 value 属性和 input 事件；下
            2. checkbox 和 radio 使用 checked 属性和 change 事件；
            3. select 字段将 value 作为 prop 并将 change 作为事件。
            修饰符
            - v-model.lazy懒监听、
            - v-model.number将值转成有效的数字、v-model.trim过滤首尾空格；
        4. v-bind与v-model区别
            1. v-bind动态绑定指令，默认情况下标签自带属性的值是固定的，在为了能够动态的给这些属性添加值，可以使用v-bind:你要动态变化的值="表达式"
            2. v-bind用于绑定属性和数据 ，其缩写为“ : ” 也就是v-bind:id  === :id  
            3. v-model用在表单控件上的，用于实现双向数据绑定，所以如果你用在除了表单控件以外的标签是没有任何效果的。
    4. v-for
        - key作用：(主要用在 Vue 的虚拟 DOM diff算法) 新旧 nodes 对比时辨识 VNodes。
        - 如果不使用 key，Vue 会使用一种最大限度减少动态元素并且尽可能的尝试就地修改/复用相同类型元素的算法。
        - 而使用 key 时，它会基于 key 的变化重新排列元素顺序，并且会移除 key 不存在的元素。
        - 有相同父元素的子元素必须有独特的 key。重复的 key 会造成渲染错误。
        - 最常见的用例是结合 v-for：
        - key的使用：
            1. 必须指定 
            2. 唯一的字符串string/数字number类型:key 值
            3. 必须使用v-bind属性绑定的形式指定key的值
        1. v-for循环普通数组
        2. v-for循环对象数组
        3. v-for循环对象
        4. v-for迭代数字
    5. v-once
        - 只渲染元素和组件一次。随后的重新渲染，元素/组件及其所有的子节点将被视为静态内容并跳过,用于优化更新性能;
        - 组件中有大量的静态的内容可以使用这个指令。
    6. v-pre
        - 跳过这个元素和它的子元素的编译过程。可以用来显示原始Mustache标签。跳过大量没有指令的节点会加快编译;<span v-pre>{{ this will not be compiled }}</span>
    7. v-slot
    8. v-cloak：
        - 可以解决在页面渲染时把未编译的 Mustache 标签（{{value}}）给显示出来。
    9. v-if和v-for
        - (v-for优先级高于v-if 使用v-for遍历对象时 按Object.keys()的顺序的遍历，转成数组保证顺序)
            1. 处于同一节点，v-for的优先级比v-if更高
            - 这意味着v-if将分别重复运行于每个v-for循环中。当你只想为部分项渲染节点时，这种优先级的机制会十分有用。
            ```
            <ul>
                <li v-for="item in items" v-if="item.show">{{item}}</li>
            </ul>
            ```
            2. 如果你的目的是有条件地跳过循环的执行，那么可以将 v-if 置于外层元素 (或 <template>)上。
            ```
            <ul v-if="items.length">
                <li v-for="item in items">{{item}}</li>
            </ul>
            ```
            - 也可以用 of 替代 in 作为分隔符，因为它更接近 JavaScript 迭代器的语法：
            ```
            <div v-for="item of items"></div>
            ```
            - 使用v-for遍历对象时 按Object.keys()的顺序的遍历，转成数组保证顺序。
20. computed/methods/watch
    > computed & methods
    1. 计算属性computed
    - (计算属性是基于它们的响应式依赖进行缓存的,只在相关响应式依赖发生改变时它们才会重新求值)
    - (不支持异步 当computed内有异步操作时无效 无法监听数据变化)
    2. 事件methods
    - (只要发生重新渲染，method 调用总会执行该函数)
    - methods方法 watch属性 不能用this this会是undefind, 因为箭头函数中的this指向的是定义时的this，而不是执行时的this，所以不会指向Vue实例的上下文。
    
    > computed & watch
    1. computed(缓存结果每次都会重新创建变量/通过return返回)
    - (计算属性/依赖多个属性/缓存结果时每次都会重新创建变量/计算开销比较大(计算次数多或者异步处理)/通过return返回/不支持异步)
    2. watch(直接计算不会创建变量保存结果/不需要return)
    - (侦听器/依赖一个属性/直接计算，不会创建变量保存结果/计算开销比较大(计算次数多或者异步处理)/不需要return/支持异步) 
    - 在选项参数中指定deep: true 可深度监听
    - 在选项参数中指定immediate: true将立即以表达式的当前值触发回调。监听后立即调用
    
    > computed&watch
    1. computed(支持缓存/不支持异步)
        1. 支持缓存 只有依赖数据发生变化 才会重新进行计算
        2. 不支持异步 当computed内有异步操作时无效 无法监听数据变化
        3. computed属性值默认走缓存 计算属性基于它们响应式依赖进行缓存 即基于data中声明过或者父组件传递的props中的数据通过计算得到的值
        4. 一个属性由其他属性计算出来 该属性依赖其他属性 是一个多对一/一对多 一般用computed
        5. 如果computed属性属性值是函数 则默认会走get方法 函数的返回值就是属性的属性值 在computed中 属性都有一个get和set方法 数据变化时 调用set方法
    2. watch侦听属性(不支持缓存/支持异步)
        1. 不支持缓存 数据变化 会触发相应操作
        2. watch支持异步
        3. 监听的函数接收两个参数 第一个参数是最新的值 第二个参数是输入之前的值
        4. 当一个属性发生变化时 需要执行对应的操作 一对多
        5. 监听数据必须是data中声明过或者父组件传递过来的props中的数据 当数据变化时 触发其他操作 函数有两个参数
            - immediate：组件加载立即触发回调函数执行
            - deep:深度监听 为了发现对象内部值的变化 复杂类型的数据时使用
                - PS：监听数组变动不需要这么做 
                    - deep无法监听到数组的变动和对象的新增
                    - 参考Vue数组 只有以响应式方式触发才会被监听到
    - (computed data props methods 都会被挂载在vm实例上，因此这三个都不能同名。)
21. 计算属性computed
    > (避免在模板中放入太多的逻辑，导致模板过重且难以维护。)
    > 特性：
    - (计算属性是基于它们的响应式依赖进行缓存的,只在相关响应式依赖发生改变时它们才会重新求值)
    - 计算属性默认只有 getter，不过在需要时你也可以提供一个 setter：
    > 原理
    - computed 本质是一个惰性求值的观察者。
    - computed 内部实现了一个惰性的 watcher,也就是 computed watcher,
    - computed watcher 不会立刻求值,同时持有一个 dep 实例。
    - 其内部通过 this.dirty 属性标记计算属性是否需要重新求值。
    - 当 computed 的依赖状态发生改变时,就会通知这个惰性的 watcher computed watcher 通过 this.dep.subs.length 判断有没有订阅者
    有的话,会重新计算,然后对比新旧值,如果变化了,会重新渲染。 
    
    - (Vue 想确保不仅仅是计算属性依赖的值发生变化，而是当计算属性最终计算的值发生变化时才会触发渲染 watcher 重新渲染，本质上是一种优化。)
    没有的话,仅仅把 this.dirty = true。
    - (当计算属性依赖于其他数据时，属性并不会立即重新计算，只有之后其他地方需要读取属性的时候，它才会真正计算，即具备 lazy（懒计算）特性。)
22. Vue API 实例属性/实例方法(数据/事件/生命周期)
    > Vue的$(内置的实例方法 属性) 挂载在this上的Vue内部属性 内部API的命名空间
    - 一个特殊标记 增强区分 说明这是内置的实例方法属性
    
    > 全局配置
    - Vue.config是一个对象 包含Vue的全局配置 
    
    > 实例方法
    1. vm.$nextTick(callback) DOM更新后想做点什么 等待视图全部更新后执行 回调函数this自动绑定到调用它的实例
    2. vm.$forceUpdate 强制Vue实例重新渲染 而非重新加载组件 会触发beforeUpdate和update钩子函数 仅影响实例本身和插入插槽内容子组件
    3. vm.$destory() 销毁一个实例 不能清理实例的DOM和data 会触发beforeDestory和destoryed钩子函数
    4. vm.$mount([elementOrSelector]) 返回vm实例本身 可链式调用其他实例对象 不常使用)
        如果 Vue 实例在实例化时没有收到 el 选项，则它处于“未挂载”状态，没有关联的 DOM 元素。可以使用 vm.$mount() 手动地挂载一个未挂载的实例。
        如果没有提供 elementOrSelector 参数，模板将被渲染为文档之外的的元素，并且你必须使用原生 DOM API 把它插入文档中。
        这个方法返回实例自身，因而可以链式调用其它实例方法。
    
    > 全局API 
    > 实例方法
    1. Vue.extend(options)
    使用基础Vue构造器 创建一个子类 参数是一个包含组件选项的对象
    data选项是特例 Vue.extend()中它必须是函数
    其创建的是Vue构造器 不是平常写的组件实例
    不可以通过new Vue({components:testExtend})直接使用
    需要通过new Profile().$mount('#mount-point')挂载到指定元素上
    2. Vue.nextTick([callback,context])
    下次DOM更新循环结束后执行延迟回调
    在修改数据之后立即使用这个方法 获取更新后的DOM
    3. Vue.set(target,propertyName/index,value)/Vue.delete(targets,propertyName/index)) 
    设置响应式对象property/删除响应式对象property
    4. Vue.forceUpdate 更新组件 触发beforeUpdate update生命周期钩子函数
    5. Vue.destory 销毁组件 触发beforeDestory destory生命周期钩子函数
    
    > 实例属性：
    1. vm.$el(element缩写) 获取Vue实例关联的DOM元素
        提供一个在页面上已存在的DOM元素作Vue实例股灾目标 可以是CSS选择器 HTMLElement实例
        实例挂载后 元素可以用vm.$el访问 
        如在实例化时存在这个选项 实例将立即进入编译过程 否则 需要显式调用vm.$mount()手动开启编译
        提供的元素只能作为挂载点 不同于Vue1.x 所有的挂载元素会被Vue生成的DOM替换
    2. vm.$root/vm.$parent/vm.children 当前组件树的根Vue实例 没有则是自己/父实例/当前实例的直接子组件
    3. vm.$options 获取Vue实例的自定义属性 如vm.$options.methods获取Vue自定义属性methods
    4. vm.$data/vm.$props 获取Vue实例的data选项(对象)/获取当前组件接收到的props对象 Vue实例代理对其data/property对象的访问)
    5. vm.$refs 获取页面中所有含有ref属性的DOM元素
    6. vm.$slot 用来访问被插槽分发的内容 
    7. vm.$scopeSlots 用来访问作用域插槽 对于包括默认slot在内的每个插槽 该对象都包含一个返回相应VNODE的函数 可用于使用渲染函数开发一个组件
    8. vm.$isServer 当前Vue实例是否运行于服务器
    9. vm.$attrs 
    10. vm.$listener 

    7.vm.children 当前实例的直接子组件。需要注意 $children 并不保证顺序，也不是响应式的。如果你发现自己正在尝试使用 $children 来进行数据绑定，考虑使用一个数组配合 v-for 来生成子组件，并且使用 Array 作为真正的来源。
    8.vm.$slot 用来访问被插槽分发的内容。每个具名插槽有其相应的 property (例如：v-slot:foo 中的内容将会在 vm.$slots.foo 中被找到)。default property 包括了所有没有被包含在具名插槽中的节点，或 v-slot:default 的内容。
        请注意插槽不是响应性的。如果你需要一个组件可以在被传入的数据发生变化时重渲染，我们建议改变策略，依赖诸如 props 或 data 等响应性实例选项。
    10.vm.$refs 获取页面中所有含有ref属性的DOM元素
            (如vm.$ref.hello 获取页面中含有属性ref=‘hello’
            的DOM元素 如果有多个元素 那么只返回最后一个)
            一个对象，持有注册过 ref attribute 的所有 DOM 元素和组件实例。

    12.vm.$attrs
        包含了父作用域中不作为 prop 被识别 (且获取) 的 attribute 绑定 (class 和 style 除外)。当一个组件没有声明任何 prop 时，这里会包含所有父作用域的绑定 (class 和 style 除外)，并且可以通过 v-bind="$attrs" 传入内部组件——在创建高级别的组件时非常有用。
    13.vm.$listener 包含了父作用域中的 (不含 .native 修饰器的) v-on 事件监听器。它可以通过 v-on="$listeners" 传入内部组件——在创建更高层次的组件时非常有用。
    实例方法/数据：
    1.vm.$watch(expOrFn,callback,[options])
        观察 Vue 实例上的一个表达式或者一个函数计算结果的变化。回调函数得到的参数为新值和旧值。表达式只接受简单的键路径。对于更复杂的表达式，用一个函数取代。
        变更 (不是替换) 对象或数组时，旧值将与新值相同，因为它们的引用指向同一个对象/数组。Vue 不会保留变更之前值的副本。
        vm.$watch 返回一个取消观察函数，用来停止触发回调：
        选项deep:
            为了发现对象内部值的变化，可以在选项参数中指定 deep: true。注意监听数组的变更不需要这么做。
        选项immediate：
            选项参数中指定 immediate: true 将立即以表达式的当前值触发回调：
            在带有 immediate 选项时，你不能在第一次回调时取消侦听给定的 property。
    2.vm.$set(target,propertyName/index,value)
        返回值：设置的值。
        全局Vue.set的一个别名
    3.vm.$delete(target,propertyName/index)
        这是全局 Vue.delete 的别名。
    4.vm.$on(event,callback)
        监听当前实例上的自定义事件。事件可以由 vm.$emit 触发。回调函数会接收所有传入事件触发函数的额外参数。
    5.vm.$once(event,callback)
        监听一个自定义事件，但是只触发一次。一旦触发之后，监听器就会被移除。
    6.vm.$off([event,callback])
        移除自定义事件监听器。
            如果没有提供参数，则移除所有的事件监听器；
            如果只提供了事件，则移除该事件所有的监听器；
            如果同时提供了事件与回调，则只移除这个回调的监听器。
    7.vm.$emit(eventName,[...args])
        触发当前实例上的事件。附加参数都会传给监听器回调。
23. Vue SSR(Service Side Render Vue服务端渲染)
    1. 优点 更好的SEO/首屏加载更快
    2. 缺点 开发条件限制 只支持beforeCreate/created两个钩子函数/服务器负载加重)
    
    > 服务器端渲染的 Vue.js 应用程序目的：
    - 使vue应用既可以在客户端（浏览器）执行，也可以在服务器端执行，我们称之为“同构”或“通用”。
    
    Vue.js 是构建客户端应用程序的框架。
    默认情况下，可以在浏览器中输出 Vue 组件，进行生成 DOM 和操作 DOM。然而，
    也可以将同一个组件渲染为服务端的 HTML 字符串，将它们直接发送到浏览器，最后将这些静态标记"激活"为客户端上完全可交互的应用程序。 
    
    > SSR
    - vue在客户端将标签渲染成的整个html片段的工作在服务端完成
    - 服务端形成html片段直接返回给客户端
    
    >优点：(SEO/首屏加载速度)
    1. 更好的SEO
        SPA页面内容通过Ajax获取
        搜索引擎爬取工具并不会等待Ajax异步完成后再抓取页面内容
        SPA中抓取不到页面通过Ajax获取内容
        SSR直接由服务端返回已经渲染好的页面
        （数据已经包含在页面中）
        搜索引擎爬取工具可抓取渲染好的页面；
    2. 首屏加载更快 
        SPA 会等待所有Vue编译后JS文件都下载完成后
        才开始进行页面的渲染
        文件下载等需要一定的时间等
        首屏渲染需要一定的时间
        SSR 直接由服务端渲染好页面直接返回显示
        无需等待下载js文件再去渲染等
    > 缺点：(开发条件限制/服务器负载加重)
    1. 开发条件限制增多 只支持beforeCreate/created两个钩子函数
        SSR只支持beforCreate/created两个钩子函数
        会导致一些外部扩展库需要特殊处理 
        才能在服务端渲染应用程序中运行
        且与可以部署在任何静态文件服务器上的完全静态单页面应用程序 SPA 不同
        服务端渲染应用程序
        需要处于 Node.js server 运行环境
    2. 服务器负载加重
        在 Node.js  中渲染完整的应用程序，显然会比仅仅提供静态文件的  server 更加大量占用CPU 资源 (CPU-intensive - CPU 密集)，因此如果你预料在高流量环境 ( high traffic ) 下使用，请准备相应的服务器负载，并明智地采用缓存策略。
24. Vue项目优化
    1. 代码层面的优化 
        - v-if 和 v-show 区分使用场景
        - computed 和 watch区分使用场景
        - v-for 遍历必须为 item 添加 key，且避免同时使用 
        v-if
        长列表性能优化事件的销毁图片
        资源懒加载
        路由懒加载
        第三方插件的按需引入
        优化无限列表性能服务端渲染 SSR or 预渲染
    2. Webpack 层面的优化 
        Webpack 对图片进行压缩减少 
        ES6 转为 ES5 的冗余代码提取公共代码模板预编译提取组件的 
        CSS优化 SourceMap构建结果输出分析Vue 项目的编译优化
    3. 基础的 Web 技术的优化  开启 gzip 压缩  浏览器缓存  CDN 的使用  使用 Chrome Performance 查找性能瓶颈
26. ref访问子组件的实例或者子元素
    (this.$refs是一个对象 持有当前组件中注册过ref特性的所有DOM元素和子组件实例)
    三种用法：
    (普通元素 获取DOM元素/
    子组件 获取组件实例/
    v-for&ref 用于元素/组件 引用信息 包含DOM节点/组件实例数组)
        1.普通元素 this.$ref.name 获取DOM元素)
        2.子组件   this.$ref.name 获取组件实例 可以使用组件所有方法)
        3.v-for&ref 用于元素/组件 引用信息 包含DOM节点/组件实例数组)
    PS: ref需要在dom渲染完成后才会有 使用时确保dom已经被渲染完成 初始渲染时 不能访问/不是响应式 不应做数据绑定
        如在生命周期mounted(){}钩子中调用 或者在this.$nextTick(()=>{})中调用
        如果ref是循环出来的 有多个重名 那么ref的值会是一个数组 此时要拿到单个的ref只需要循环就可以
        ref属性为元素/子组件赋予一个ID引用
        元素绑定ref后 直接通过this.$ref即可调用

        ref被用来给元素/子组件注册引用信息
        引用信息被注册在父组件$ref对象上
        普通DOM元素 引用指向 DOM元素
        子组件 引用指向子组件实例

    1.ref特性子组件赋予ID引用
        <base-input ref="myInput"></<base-input>
        子组件focus的方法
            this.$refs.myInput.focus()；
        子组件value的数据
            this.$refs.myInput.value。
    2.ref特性普通DOM 元素赋予ID引用
        <ul ref="mydiv">
            <li class="item">第一个li</li>
            <li class="item">第一个li</li>
        </ul>
        console.log(this.$refs['mydiv'].getElementsByClassName('item')[0].innerHTML)//第一个li
    1. 普通元素上 this.$ref.xxx dom元素
    2. 子组件 this.$ref.xxx 组件实例可以使用组件所有方法
    3. v-for用于元素/组件 引用信息将是包含DOM节点/组件实力数组 可循环拿到耽搁ref
    - ref本身作为渲染结果被创建 DOM未渲染完成之前不允许访问
    - $ref并非响应式 不能在模版中做数据绑定
27. 动态组件 is用法 
    - 有些HTML元素对于哪些元素出现在其内部是有严格限制的
    - 有些HTML元素只能出现在其他某些特定元素的内部 会被作为无效内容提升到外部 并导致最终渲染结果出错
    - HTML元素某些元素只能出现在它某些特定的内部 自定义组件会作为无效内容提升到外部 并导致最终渲染出错
    ```
    <component :is="componentName"></component>
    <ul>
        <li is="cardList"></li>
    </ul>
    ```
28. keep-alive
    - (actived deactived keep-alive专属)
    - (抽象组件 本身不会渲染一个DOM 不会出现在父组件链中)
    - (使用keep-alive包裹动态组件 缓存不活动的组件实例 代替销毁)
    - (组件切换 默认销毁 需求 组件切换后 不进行销毁 保留之前状态 keep-alive实现 被切换到的组件都有自己的名字)
    - 两个属性(字符串或者正则表达式匹配的组件name)
    - (include定义缓存白名单即会缓存的组件
    - exclude定义缓存黑名单即不会缓存的组件)
    - (activted()钩子函数 keep-alive专属 组件激活时调用 可更新组件
    - deactived()钩子函数 keep-alive专属 组件被销毁时调用)
        1. include定义缓存白名单，会缓存的组件；
        2. exclude定义缓存黑名单，不会缓存的组件；
        3. 以上两个参数可以是逗号分隔字符串、正则表达式或一个数组,include="a,b"、:include="/a|b/"、:include="['a', 'b']"
        4. 匹配首先检查组件自身的 name 选项，如果 name 选项不可用，则匹配它的局部注册名称 (父组件 components 选项的键值)。匿名组件不能被匹配；
        5. max最多可以缓存多少组件实例。一旦这个数字达到了，在新实例被创建之前，已缓存组件中最久没有被访问的实例会被销毁掉；
        6. 不会在函数式组件中正常工作，因为它们没有缓存实例；
        7. 当组件在内被切换，它的activated和deactivated这两个生命周期钩子函数将会被对应执行。
    > 服务器渲染期间不被调用
    1. activited()生命周期钩子函数
        keep-alive专属 组件被激活时调用 可更新组件
    2. deactived()生命周期钩子函数
        keep-alive专属 组件被销毁时调用
    - 一般结合路由和动态组件一起使用
29. Vue中的key
    (VDOM DOM diff 新旧VDOM对比做辨识用)
    (使用字符串/数值/布尔/符号等基本数据类型值作key)
    (不适用数组index作key)
    注意：
        1.不要使用对象或数组之类的非基本类型值作为key，请用字符串或数值类型的值；
        2.不要使用数组的index作为key值，因为在删除数组某一项，index也会随之变化，导致key变化，渲染会出错。
        例：在渲染[a,b,c]
        用index 作为 key，
        那么在删除第二项的时候，
        index 就会从 0 1 2 变成 0 1（而不是 0 2)，
        随之第三项的key变成1了，
        会误把第三项删除了。
    作用
        1.v-for中 使用key，会提升性能吗
            主要看v-for渲染的是什么
        2.可以强制替换元素/组件而不是重复使用它。在以下场景可以使用
                1.完整地触发组件的生命周期钩子
                2.触发过渡
            <transition>
            <span :key="text">{{ text }}</span>
            </transition>
    (Vue 的虚拟 DOM 算法，在新旧 nodes 对比时辨识 VNodes)
       预期：number | string | boolean (2.4.2 新增) | symbol (2.5.12 新增)
       key 的特殊 attribute 主要用在 Vue 的虚拟 DOM 算法
       新旧 nodes 对比时辨识 VNodes。
       如果不使用 key，
       Vue 会使用一种最大限度减少动态元素并且尽可能的尝试就地修改/复用相同类型元素的算法。
       而使用 key 时，它会基于 key 的变化重新排列元素顺序，并且会移除 key 不存在的元素。
       有相同父元素的子元素必须有独特的 key。重复的 key 会造成渲染错误。
       最常见的用例是结合 v-for：
       <ul>
        <li v-for="item in items" :key="item.id">...</li>
        </ul>
        用于强制替换元素/组件而不是重复使用它。当你遇到如下场景时它可能会很有用：
            1.完整地触发组件的生命周期钩子
            2.触发过渡
30. 修饰符(表单/事件)
    (修饰符 为更纯粹数据逻辑 Vue提供很多事件修饰符 代替处理一些DOM事件细节 顺序很重要)
    事件修饰符
    (.stop 防止事件冒泡 等同JS中event.stopPropagation)
    (.prevent 防止执行预设的行为 等于JS中的event.preventDefault)
    (.once 只触发一次)
    (给组件绑定自定义事件无效解决 加上修饰词.native)
    表单修饰符
    (.lazy 
    input标签v-model用lazy修饰之后 不会立即监听input的value的改变 会在input失去焦点之后，才会监听input的value的改变)
    修饰符 (modifier) 
        是以半角句号 . 指明的特殊后缀，用于指出一个指令应该以特殊方式绑定
        如.prevent 修饰符告诉 v-on 指令对于触发的事件调用 event.preventDefault()
        以半角句号.指明的特殊后缀 
        用于指出一个指令应该以特殊方式绑定
        为了更纯粹数据逻辑 
        Vue提供很多事件修饰符 
        来代替处理一些DOM事件细节
        PS:事件修饰符顺序很重要
    为了更纯粹的数据逻辑，vue提供了很多事件修饰符，来代替处理一些 DOM 事件细节。
        1 .stop：防止事件冒泡，等同于JavaScript中的event.stopPropagation()
        2 .prevent：防止执行预设的行为，等同于JavaScript中的event.preventDefault()
        3 .capture：捕获冒泡
        4 .self：将事件绑定到自身，只有自身才能触发
        5 .once：只触发一次
        6 .passive：不阻止事件的默认行为
        7 .native 在父组件中给子组件绑定一个原生的事件 就将子组件变成了普通的HTML标签 不加.native 事件是无法触发的
    事件修饰符(要注意顺序很重要，用@click.prevent.self会阻止所有的点击，而@click.self.prevent只会阻止对元素自身的点击。)
        .stop：阻止事件传递；
        .prevent： 阻止默认事件；
        .capture ：在捕获的过程监听，没有capture修饰符时都是默认冒泡过程监听；
        .self：当前绑定事件的元素才能触发；
        .once：事件只会触发一次；
        .passive：默认事件会立即触发，不要把.passive和.prevent一起使用，因为.prevent将不起作用。
    表单修饰符
        .number
        .lazy 
            input标签v-model用lazy修饰之后，并不会立即监听input的value的改变，
            会在input失去焦点之后，才会监听input的value的改变。
        .trim
    Vue监听键盘事件
    使用按键修饰符 
    <input @keyup.enter="submit">
    按下回车键时候触发submit事件。
    .enter
    .tab
    .delete (捕获“删除”和“退格”键)
    .esc
    .space
    .up
    .down
    .left
    .right
31. Vue事件中使用event对象
    ($event.currentTarget 始终指向事件所绑定的元素)
    ($event.target        始终指向事件发生时元素)

    1.@click="handleOpen" 默认第一个参数传入event对象;
    2.@click="handleOpen(0, $event)",如果自己需要传入参数和event对象，则需要使用$event来获取event对象并传入handleOpen。
32. vue中的slot
    (单个插槽/默认插槽/匿名插槽
    具名插槽
    作用域插槽 子组件给父组件传参 父组件决定如何展示)
    插槽使用在子组件中
    目的：将父组件中的子组件模板数据正常显示
    (单个插槽|默认插槽|匿名插槽/具名插槽/作用域插槽(子组件给父组件传参 父组件决定如何展示))
    1. 单个插槽|默认插槽|匿名插槽
        - (不用设置name属性)
        单个插槽可以放置在组件的任意位置 
        一个组件中只能有一个该类插槽。
    2. 具名插槽 <slot name="up"></slot>
        - 父组件通过HTML模版上slot属性关联
        有name属性 
        可以在一个组件中出现N次，出现在不同的位置
        父组件通过html模板上的slot属性关联具名插槽。没有slot属性的html模板默认关联匿名插槽。
    3. 作用域插槽 | 带数据的插槽 slot-scopes
        - 子组件给父组件穿值 父组件决定如何展示

        (作用域插槽就是子组件给父组件传参 父组件决定怎么展示)
        前面两种，都是在组件的template里面写
        作用域插槽要求，在slot上面绑定数据
        父组件只需要提供一套样式（在确实用作用域插槽绑定的数据的前提下）。
        数据使用的都是子组件插槽自己绑定的那个数组
33. scoped
    - (Vue通过在DOM结构以及CSS样式上加上唯一标志 保证唯一 达到样式私有化 不污染全局)
    - (如果一个项目所有style标签都加上scoped属性 相当于实现了样式的模块化)
    - (在公共组件中使用 修改公共组件样式需要用/deep/)
    - (样式穿透 deep 深度作用选择器 >>>别名 
    - 一个选择器能影响子组件 像SASS之类预处理器无法正确解析>>> 使用/deep/操作符代替)
34. Vue中的template
    (template模板占位符
    1. 字符串模板写法/
    2. template标签/
    3. script标签)
    template的作用是模板占位符，可帮助我们包裹元素，但在循环过程当中，template不会被渲染到页面上
    template标签内容天生不可见，设置了display：none；
    要操作template标签内部的dom必须要用下面的方法–content属性：
    > 三种写法：(字符串模板/template标签/script标签)
    1. 字符串模板写法(直接写在vue 构造器中)
    - 这种写法比较直观,适用于html代码不多的场景,但是如果模板里html代码太多,不便于维护,不建议这么写.
    2. 写在template标签里,这种写法跟写html很像.
    3. 写在script标签里,这种写法官方推荐,vue官方推荐script中type属性加上"x-template"        
35. mixin混入
(全局混入 main.js中引入 会影响每一个之后创建的Vue实例组件
局部混入 a.vue中引入 只影响a.vue文件中创建的Vue实例)
    1.全局混入
        1.在main.js中写入
            import Vue from 'vue';
            import mixins from './mixins';
            Vue.mixin(mixins);
            全局混入可以写在mixins文件夹中index.js中，全局混入会影响到每一个之后创建的 Vue 实例（组件）；
    2.局部混入
        1.局部混入的注册，在mixins文件中创建一个a_mixin.js文件，然后再a.vue文件中写入
            <script>
                import aMixin from 'mixins/a_mixin'
                export default{
                    mixins:[aMixin],
                }
            </script>
        2.局部混入只会影响a.vue文件中创建的Vue实例，不会影响到其子组件创建的Vue实例；
    3.组件的选项和混入的选项是怎么合并的
        1.数据对象【data选项】，在内部进行递归合并，并在发生冲突时以组件数据优先；
        2.同名钩子函数将合并为一个数组，因此都将被调用。另外，混入对象的钩子将在组件自身钩子之前调用；
        3.watch对象合并时，相同的key合成一个对象，且混入监听在组件监听之前调用；
        4.值为对象的选项【filters选项、computed选项、methods选项、components选项、directives选项】将被合并为同一个对象。两个对象键名冲突时，取组件对象的键值对。
36. Vue过滤器
    (用途
    1.双花括号插值
    2.v-bind表达式)
    (过滤 一个数据经过过滤之后出来另一样东西
    可以是符合条件的 可以是给该数据添加装饰的)
    (全局注册/局部注册)
        Vue.js 允许你自定义过滤器，可被用于一些常见的文本格式化。
        过滤器可以用在两个地方：双花括号插值和 v-bind 表达式 (后者从 2.1.0+ 开始支持)
        过滤器应该被添加在 JavaScript 表达式的尾部，由“管道”符号指示：
        1.一个插值可以连续使用两个过滤器吗?
        可以，{{ message | filterA | filterB }}
        2.过滤器除了在插值上使用，还可以用在那个地方？
        还可以v-bind 表达式 上，如：<div :id="rawId | formatId"></div>
        Vue 中怎么自定义过滤器(同样接受全局注册和局部注册)
            可以用全局方法 Vue.filter() 注册一个自定义过滤器，它接收两个参数：过滤器 ID 和过滤器函数。过滤器函数以值为参数，返回转换后的值
                Vue.filter('reverse', function (value) {
                return value.split('').reverse().join('')
                })
                <!-- 'abc' => 'cba' -->
                <span v-text="message | reverse"></span>
            过滤器也同样接受全局注册和局部注册
37. Vue如何自定义指令
    Vue提供默认内置指令外
        允许开发人员根据实际情况自定义指令
        作用价值在于当开发人员在某些场景下
        需要对普通DOM元素进行操作的时候
    1.注册自定义指令
    Vue自定义指令和组件一样存在
        全局注册
            Vue.directive(id,[definition])
            id:自定义指令名称 
                指令名称不需要加v-前缀 
                默认自动加上前缀
                使用指令时一定要加上前缀
            [definition]
                对象数据/指令函数
        局部注册
            Vue实例中添加directives对象数据
        钩子函数
            一个指令定义对象可以提供如下几个钩子函数
                (均为可选)
            bind:
                只调用一次 指令第一次绑定到元素时调用 这里可以进行一次性的初始化设置
            inserted:
                被绑定元素插入父节点时调用
                (仅保证父节点存在 但不一定被插入文档中)
            update:
                所在组件的VNode更新时调用
            componentUpdated:
                指令所在组件的VNode及其子VNode全部更新后调用
            unbind:
                只调用一次 指令与元素解绑时调用
        指令钩子函数的参数：
            el：
                指令所绑定的元素 可以用来直接操作DOM 即放置指令的那个元素
            binding:
                一个对象 里面包含了几个属性
            vnode：
                Vue编译生成的虚拟结点
            oldVnode：
                上一个虚拟结点
                仅在update和componentUpdate钩子中可用
38. 动态绑定Class和Style(对象语法/数组语法/对象和数组混合/对象和计算属性)
    将test、active、active-click三个className,绑到div上，渲染成<div class="test active active-click"></div>其中test是固定的，active受data中actived控制，active-click受data中actived和clicked控制，请用4种写法实现。
    4种方法
    1. 对象语法
    ```
    <div class="test" :class="{
  	active: actived ,
  	'active-click': clicked && actived}">
    </div>
    ```
    2. 数组语法
    ```
    <div class="test" :class="[
  	actived? activeClass : '', 
  	clicked && actived ? activeClickClass : '']">
    </div> 
    ```
    3. 对象和数组混合
    ```
    <div :class="[
  	testClass , 
  	{active: actived} , 
   	{'active-click': clicked && actived}
  ]"></div>
    ````
    4. 对象和计算属性(推荐)
40. 
    > Vue强制刷新组件
    1. this.$forceUpdate()。
    2. 组件上加上key，然后变化key的值。
    
    > Vue渲染模板保留模板中的HTML注释
    - 组件中将comments选项设置为true
    <template comments> ... <template>
    
    > Vue中重置data
    - Object.assign(this.$data,this.$options.data())
41. Vue数组中对象删除属性delete和Vue.delete删除数组区别
    1. delete只是被删除的元素变成了 empty/undefined 其他的元素的键值还是不变。
    ```
    delete this.a[1]
    this.$set(this.a)
    ```
    2. Vue.delete直接删除了数组 改变了数组的键值。
    ```
    this.$delete(this.b, 1)
    ```
42. vue-admin-template&Element UI
    vue-admin-template:
    一个极简的vue admin管理后台 只包含 Element UI &axios &iconfont&permission control &init 这些搭建后台必要的东西
    目前版本 v4.0+ 基于Vue-Cli构建
    Element UI:
    基于Vue2.0的组件库
42. Vue-Cli配置功能
    1. ES6代码转换成ES5代码
    2. scss/sass/less/stylus转css
    3. .vue文件转换成js文件
    4. 使用 jpg、png，font等资源文件
    5. 自动添加css各浏览器产商的前缀
    6. 代码热更新
    7. 资源预加载
    8. 每次构建代码清除之前生成的代码
    9. 定义环境变量
    10. 区分开发环境打包跟生产环境打包
44. mixins & extends
    1. mixins
    - 类型 Array<Object>
    - 详细
        - 一种分发Vue组件中可复用功能的非常灵活的方式
        - mixins是一个JS对象 它可以包含组件中script项中任意功能选项 如data components methods created computed等 
        - 只要将公用的功能以对象的方式传入mixins选项中 当组件使用mixins对象时 所有mixins对象的选项都将被混入该组件本身的选项中 提高代码重用性 使代码保持干净和易于维护
        - mixins选项接受一个混合对象的数组 这些混合实例对象可以像正常的实例对象一样包含选项 它们将在Vue.extends()最终选择使用相同的选项合并逻辑 
        - 如果混合包含一个钩子 而创建组件本身也有一个 两个函数将被调用 
        - Mixin钩子按照传入顺序依次调用 并在调用组件自身的钩子之前被调用 
    - 什么时候使用mixins
        - 存在多个组件中的数据或功能相近时 可以利用mixins将公共部分提取出来 通过mixins封装的函数 组件调用它们不会改变函数作用域外
    - 创建mixins
        - src目录下创建一个mixins文件夹 文件夹下新建一个mixins.js
    - 如何使用Mixins 
        - 在需要调用的组件中引入mixins.js文件 在export default中引入需要的对象
    - mixins特点
        1. 方法和参数在各组件中不共享 虽然组件调用了mixins并将其属性合并到自身组件中 但该属性只会被当前组件识别并不会被共享 其他组件无法从当前组件中获取到mixins中的数据和方法
        2. 引入mixins后组件会对其进行合并 将mixins中的数据和方法拓展到当前组件中来 在合并的过程中会出现冲突
    - mixins合并冲突
        1. 值为对象(components methods computed data)的选项 混入组件时选项会被合并 键冲突时优先组件 组件中的键会覆盖混入对象的
        2. 值为函数(created mounted)的选项 混入组件时 选项会被合并调用 混合对象里的钩子函数在组件里的狗子函数之前调用
    - 与Vuex区别
        1. Vuex: 用来做状态管理 里面定义的变量在每个组件中均可以使用和修改 在任一组件中修改此变量的值之后 其他组件中此变量的值也会随之改变
        2. Mixins: 可以定义共用的变量 在每个组件中使用 引入组件中之后 各个变量是相互独立的 值的修改在组件中不会相互影响
    - 与公共组件的区别
        1. 组件：在父组件中引入组件 相当于在父组件中给出一片独立的空间供子组件使用 然后根据props来传值 但本质上两者是相对独立的
        2. Mixins: 在引入组件之后与组件中的对象和方法进行合并 相当于扩展了父组件的对象和方法 可以理解为形成了一个新的组件
    2. extends
    - 类型 Object|Funtion
    - 两个都可以理解为继承 mixins接收对象数组(可理解为多继承) extends接收的是对象或函数(可理解为单继承)
    3. 结论
        - 继承钩子函数
        1. 优先调用mixins和etends继承的父类 extends触发的优先级更改 
        2. push(extend,mixin1,mixin2,本身的钩子函数)
        3. 经过测试 watch的值继承规则一样
        - 继承methods
        1. 子类再次声明 data中的变量都会被重写 以子类的为准
        2. 如果子类不声明 data中的变量将会最后继承的父类为准
        3. 经过测试 props中属性 methods中的方法和computed的值继承规则一样
    4. 关于mixins和extends可以理解为mvc的c(controller)这一层 可见通用的成员方法(包括属性和方法)抽象成为一个父类 提供给子类继承 这可以让子类拥有一些通用成员变量 而子类也可以重写父类的成员变量 这样整个编程思想就很面向对象 
   
    - Vue中的模板语法
        1. Vue.js使用了基于HTML的模板语法 允许开发者声明式的将DOM绑定至底层Vue实例的数据 所有Vue.js的模板都是合法的HTML 所以能被遵循规范的浏览器和HTML解析器解析
        2. 在底层的实现上 Vue将模板编译成虚拟DOM render渲染函数 结合响应系统 Vue能智能计算出最少需要重新渲染多少组件 并把DOM操作次数减到最少
        3. 熟悉VDOM 并偏爱JS原生 可以不用模板 直接写render渲染函数 使用可选的JSX语法 
    - Vue中template编译的理解
        先转化成AST树 将得到的render函数返回VNode(Vue的虚拟DOM节点)
        1. 首先通过compile编译器把template编译成AST语法树
        (abstract syntax tree 源代码的抽象语法结构的树状表现形式)
        complie是createCompiler的返回值 createCompiler是用以创建编译器的 另外compiler还负责合并option
        2. AST经过generate(将AST语法树转化成render function字符串的过程)得到render函数 render的返回值是VNode VNode是Vue的虚拟DOM节点 里面有(标签名/子节点/文本等)        


48.Vue-router
    1.重定向页面
        1.const router = new VueRouter({
            routes: [
                { path: '/a', redirect: '/b' }
            ]
        })
        2.const router = new VueRouter({
            routes: [
                { path: '/a', redirect: { name: 'foo' }}
            ]
        })
        3.const router = new VueRouter({
            routes: [
                { 
                    path: '/a', 
                    redirect: to =>{
                        const { hash, params, query } = to
                        if (query.to === 'foo') {
                            return { path: '/foo', query: null }
                        }else{
                        return '/b' 
                        }
                    }
                    
                }
            ]
        })

1. 模版语法
    - 开发者声明式将DOM绑定到底层Vue实例的数据
    - Vue将模版编译成虚拟DOM渲染函数

25. Vue优点
    1. 轻量级框架：只关注视图层，是一个构建数据的视图集合，大小只有几十kb；
    2. 简单易学：国人开发，中文文档，不存在语言障碍 ，易于理解和学习；
    3. 双向数据绑定：保留了angular的特点，在数据操作方面更为简单；
    组件化：保留了react的优点，实现了html的封装和重用，在构建单页面应用方面有着独特的优势；
    4. 视图，数据，结构分离：使数据的更改更为简单，不需要进行逻辑代码的修改，只需要操作数据就能完成相关操作；
    5. 虚拟DOM：dom操作是非常耗费性能的，不再使用原生的dom操作节点，极大解放dom操作，但具体操作的还是dom不过是换了另一种方式；
    6. 运行速度更快:相比较与react而言，同样是操作虚拟dom，就性能而言，vue存在很大的优势。


    19.路由组件和路由为什么解耦，怎么解耦？
        因为在组件中使用 $route 会使之与其对应路由形成高度耦合，从而使组件只能在某些特定的 URL 上使用，限制了其灵活性，所有要解耦。
        耦合如以下代码所示。Home组件只有在http://localhost:8036/home/123URL上才能使用。
        使用 props 来解耦
        props为true，route.params将会被设置为组件属性。
        props为对象，则按原样设置为组件属性。
        props为函数，http://localhost:8036/home?id=123,会把123传给组件Home的props的id。
    20.active-class是哪个组件的属性？
        <router-link/>组件的属性，设置链接激活时使用的 CSS 类名。默认值可以通过路由的构造选项 linkActiveClass 来全局配置。
    22.怎样动态加载路由？
        使用Router的实例方法addRoutes来实现动态加载路由，一般用来实现菜单权限。
        使用时要注意，静态路由文件中不能有404路由，而要通过addRoutes一起动态添加进去。
    Vue路由怎么跳转打开新窗口？
        const obj = {
            path: xxx,//路由地址
            query: {
            mid: data.id//可以带参数
            }
        };
        const {href} = this.$router.resolve(obj);
        window.open(href, '_blank');


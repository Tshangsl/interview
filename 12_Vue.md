1.object.defineProperty(obj,prop,descriptor)
    参数:(三个参数都是必填)
        obj:要定义属性的对象
        prop:要定义或修改的属性的名称或Symbol
        descriptor：要定义或修改的属性描述符
    返回值:
        被传递给函数的对象
    备注：
        ES6中 由于Symbol类型的特殊性 用Symbol类型的值来做对象的key与常规的定义或修改不同 
        Object.defineProperty是定义key为Symbol的属性的方法之一
    描述：
        (默认情况下/使用object.defineProperty()添加的属性值是不可修改的)
        该方法允许精确地添加或修改对象的属性
        通过赋值操作添加的普通属性是可枚举地 在枚举对象属性时会被枚举到(for ..in object.keys)
        可以修改这些属性的值 也可以删除这些属性
        这个方法允许修改默认的额外选项/配置

        对象里目前存在的属性描述符(descriptor)有两种主要形式(都是对象) 
            (一个描述符只能是两者之一)
            1.数据描述符
                具有值的属性 该值可以是可写的 也可以是不可写的
            2.存取描述符
                由getter函数和setter函数所描述的属性
            3.两种描述符都是对象 它们共享以下可选键值
                (默认值是指在使用object.defineProperty()定义属性时的默认值)
                1.共享可选键值：
                    configurable:(不设置默认为false 第一次设置false后 第二次不可设置 会报错)
                        (表示对象的属性是否可以被删除 除了value writable特性之外的其他特性是否可以被修改)
                        (在非严格模式下，属性配置configurable:false后进行删除操作会发现属性仍然存在严格模式下会抛出错误：)
                        当且仅当该属性的 configurable 键值为 true 时，该属性的描述符才能够被改变，同时该属性也能从对应的对象上被删除。
                    enumerable:(默认为false)
                        (定义对象的属性是否可以在for..in和Object.keys()中被枚举)
                        当且仅当该属性的 enumerable 键值为 true 时，该属性才会出现在对象的枚举属性中。
                2.数据描述符可选键值
                    value:(默认undefined)
                        该属性对应的值。可以是任何有效的 JavaScript 值（数值，对象，函数等）。
                    writable:(默认为false时为只读)
                        (在非严格模式下给name属性再次赋值会静默失败，不会抛出错误；而在严格模式下会抛出异常：)
                        当且仅当该属性的 writable 键值为 true 时，属性的值，也就是上面的 value，才能被赋值运算符改变。
                3.存取描述符可选键值get/set
                    (get和set函数不是必须成对出现，可以只出现一个；两个函数如果不设置，则默认值为undefined。)
                    (属性b赋值或取值时会分别触发set和get对应函数)
                    get(属性的getter函数 如果没有getter 默认undefined)
                        当访问该属性时，会调用此函数。执行时不传入任何参数，但是会传入 this 对象（由于继承关系，这里的this并不一定是定义该属性的对象）。该函数的返回值会被用作属性的值。
                    set(属性的setter函数 如果没有setter默认undefined)
                        当属性值被修改时，会调用此函数。该方法接受一个参数（也就是被赋予的新值），会传入赋值时的 this 对象。 
                4.描述符默认值汇总
                    1.拥有布尔值的键 configurable、enumerable 和 writable 的默认值都是 false。
                        1.一旦使用Object.defineProperty给对象添加属性，如果不设置属性的特性，那么这些值都是false：
                        2.点运算符给属性赋值时，则默认给三种描述符都赋值true：
                    2.属性值和函数的键 value、get 和 set 字段的默认值为 undefined。
                5.如果一个描述符 不具有value writable get set中任意一个键 它会被认为是一个数据描述符
                一个描述符同时拥有 value 或 writable 和 get 或 set 键，则会产生一个异常。
    直接在一个对象上定义一个新属性/修改一个对象的现有属性 并返回此对象
    应当在Object构造器对象上调用此方法 而不是在任意一个Object类型的实例上调用
2.Proxy与Object.defineProperty
    1.Proxy
        (原意代理 此处表示由它代理某些操作 可译为代理器)
        在目标对象之前架设一层“拦截”，外界对该对象的访问，都必须先通过这层拦截，因此提供了一种机制，可以对外界的访问进行过滤和改写。        
    2.Object.defineProperty
        (使用数据劫持 直接在一个对象上定义一个新属性或修改一个对象的现有属性 并返回此对象)
        在访问或修改对象的某个属性时 通过一段代码拦截这个行为 进行额外的操作或修改返回结果 
        数据劫持最典型的应用 双向的数据绑定 
    3.比较
        Proxy优点:
            1.Proxy 可以直接监听对象而非属性；
            2.Proxy 可以直接监听数组的变化；
            3.Proxy 有多达 13 种拦截方法,不限于 apply、ownKeys、deleteProperty、has 等等是 Object.defineProperty 不具备的；
            4.Proxy 返回的是一个新对象,我们可以只操作新的对象达到目的,而 Object.defineProperty 只能遍历对象属性直接修改；
            5.Proxy 作为新标准将受到浏览器厂商重点持续的性能优化，也就是传说中的新标准的性能红利；
        Object.defineProperty优点：
            兼容性好，支持 IE9，而 Proxy 的存在浏览器兼容性问题,而且无法用 polyfill 磨平，因此 Vue 的作者才声明需要等到下个大版本( 3.0 )才能用 Proxy 重写。
    4.Vue 2.x 
        使用Object.defineProperty() 
        把内部解耦为Observer Dep 使用Watcher相连
            缺点:
                (能劫持对象的属性但需对对象每一个属性进行遍历劫持 对象上新增属性 需对新增的属性再次劫持 如果属性是对象 还需深度遍历 Vue给对象新增属性 用$set 原理通过Object.defineProperty对新增属性再次劫持)
            1.只能监听对象 无法检测到对象属性的添加和删除 不能监听数组的变化 无法触发push pop shift unshift splice sort reverse 需要进行数组方法的重写 无法检测数组的长度修改
            2.必须遍历对象的每个属性
            3.只能劫持当前对象属性 如果想深度劫持 必须深层遍历嵌套的对象
    5. Vue 3.x
        使用Proxy进行实现
            1.可以直接监听对象而非属性
            2.可以直接监听数组的变化
            Proxy:
                (相较于Object.defineProperty劫持某个属性，Proxy则更彻底，不在局限某个属性，而是直接对整个对象进行代理)
                (在目标对象之前架设一层“拦截”，外界对该对象的访问，都必须先通过这层拦截，因此提供了一种机制，可以对外界的访问进行过滤和改写)
                语法：
                    1.var proxy = new Proxy(target, handler);
                    2.Proxy本身是一个构造函数，通过new Proxy生成拦截的实例对象，让外界进行访问；构造函数中的target就是我们需要代理的目标对象，可以是对象或者数组；handler和Object.defineProperty中的descriptor描述符有些类似，也是一个对象，用来定制代理规则。
                    3.Proxy可以直接代理target整个对象并返回一个新对象 通过监听代理对象上属性的变化来获取目标对象属性的变化
                    4.Proxy不仅能够监听到属性的增加 还能监听属性的删除 比Object.defineProperty的功能更为强大。
        Reflect：   
            翻译过来是反射的意思，与Proxy对象一样，也是 ES6 为了操作对象而提供的新 API。有一下几个作用
            1.将Object对象的一些明显属于语言内部的方法(如Object.defineProperty)放到Reflect对象上
            2.修改某些Object方法的返回结果，让其变得更合理。
            3.让Object操作都变成函数行为。某些Object操作是命令式，比如name in obj和delete obj[name]，而Reflect.has(obj, name)和Reflect.deleteProperty(obj, name)让它们变成了函数行为。
            4.Reflect对象的方法与Proxy对象的方法一一对应，只要是Proxy对象的方法，就能在Reflect对象上找到对应的方法。这就让Proxy对象可以方便地调用对应的Reflect方法，完成默认行为，作为修改行为的基础。也就是说，不管Proxy怎么修改默认行为，你总可以在Reflect上获取默认行为。
3.Vue的双向绑定(数据<=>视图)数据的原理 Vue2.x Vue3.x双向绑定原理的不同
    (原理 数据劫持+发布者-订阅者模式 
    Object.defineProperty()劫持各个属性setter getter
    数据变动时发布消息给订阅者 
    触发相应监听回调
    )
    Vue2.x Vue3.x
    
    vue 实现数据双向绑定主要是：
        采用数据劫持结合发布者-订阅者模式的方式，通过 Object.defineProperty() 来劫持各个属性的 setter，getter，在数据变动时发布消息给订阅者，触发相应监听回调
    双向绑定:
        数据变化更新视图
        视图变化更新数据
    四个步骤实现数据双向绑定:
        1.实现一个监听器Observer:
            对数据对象进行遍历，包括子属性对象的属性，利用 Object.defineProperty() 对属性都加上 setter 和 getter。这样的话，给这个对象的某个值赋值，就会触发 setter，那么就能监听到了数据变化。
        2.实现一个解析器Compile
            解析 Vue 模板指令，将模板中的变量都替换成数据，然后初始化渲染页面视图，并将每个指令对应的节点绑定更新函数，添加监听数据的订阅者，一旦数据有变动，收到通知，调用更新函数进行数据更新。
        3.实现一个订阅者Watcher
            Watcher 订阅者是 Observer 和 Compile 之间通信的桥梁 ，主要的任务是订阅 Observer 中的属性值变化的消息，当收到属性值变化的消息时，触发解析器 Compile 中对应的更新函数。
        4.实现一个订阅器Dep
            订阅器采用 发布-订阅 设计模式，用来收集订阅者 Watcher，对监听器 Observer 和 订阅者 Watcher 进行统一管理。
4.Vue响应式原理
    1.当一个Vue实例创建时，vue会遍历data选项的属性，用 Object.defineProperty 
    2.将它们转为 getter/setter并且在内部追踪相关依赖，在属性被访问和修改时通知变化。
    3.每个组件实例都有相应的 watcher 程序实例，它会在组件渲染的过程中把属性记录为依赖，
    4.之后当依赖项的 setter 被调用时，会通知 watcher 重新计算，从而致使它关联的组件得以更新。
5.Vue框架怎么实现对象和数组的监听
        数据双向绑定中 Object.defineProperty() 
        只能对属性进行数据劫持，不能对整个对象进行劫持，同理无法对数组进行劫持
        Vue 能检测到对象和数组（部分方法的操作）的变化
        对象和数组的监听：
            通过遍历数组 和递归遍历对象
            达到利用 Object.defineProperty() 也能对对象和数组（部分方法的操作）进行监听。        
4.Vue 怎么用 vm.$set() 解决对象新增属性不能响应的问题 
        受现代 JavaScript 的限制 ，Vue 无法检测到对象属性的添加或删除。
        由于 Vue 会在初始化实例时对属性执行 getter/setter 转化，所以属性必须在 data 对象上存在才能让 Vue 将它转换为响应式的。
        但是 Vue 提供了 Vue.set (object, propertyName, value) / vm.$set (object, propertyName, value) 
         来实现为对象添加响应式属性，那框架本身是如何实现的呢？ 
        我们查看对应的 Vue 源码：vue/src/core/instance/index.js
        vm.$set实现原理:
            1.如果目标是数组，直接使用数组的 splice 方法触发相应式；  
            2.如果目标是对象，会先判读属性是否存在、对象是否是响应式，最终如果要对属性进行响应式处理，则是通过调用   defineReactive 方法进行响应式处理（ defineReactive 方法就是  Vue 在初始化对象时，给对象属性采用 Object.defineProperty 动态添加 getter 和 setter 的功能所调用的方法）
5.怎样理解 Vue 的单向数据流？
        1.所有的 prop 都使得其父子 prop 之间形成了一个单向下行绑定：父级 prop 的更新会向下流动到子组件中，但是反过来则不行。这样会防止从子组件意外改变父级组件的状态，从而导致你的应用的数据流向难以理解。
        2.每次父级组件发生更新时，子组件中所有的 prop 都将会刷新为最新的值。这意味着你不应该在一个子组件内部改变 prop。如果你这样做了，Vue 会在浏览器的控制台中发出警告。子组件想修改时，只能通过 $emit 派发一个自定义事件，父组件接收到后，由父组件修改。 有两种常见的试图改变一个 prop 的情形 : 
        3.这个 prop 用来传递一个初始值；这个子组件接下来希望将其作为一个本地的 prop 数据来使用。 在这种情况下，最好定义一个本地的 data 属性并将这个 prop 用作其初始值：
        4.这个 prop 以一种原始的值传入且需要进行转换。 在这种情况下，最好使用这个 prop 的值来定义一个计算属性
6.解释单向数据流和双向数据绑定
    单向数据流： 
        顾名思义，数据流是单向的。数据流动方向可以跟踪，流动单一，追查问题的时候可以更快捷。
        缺点就是写起来不太方便。要使UI发生变更就必须创建各种 action 来维护对应的 state
    双向数据绑定：
        数据之间是相通的，将数据变更的操作隐藏在框架内部。优点是在表单交互较多的场景下，会简化大量与业务无关的代码。缺点就是无法追踪局部状态的变化，增加了出错时 debug 的难度
7.Vue-rooter中的hash模式(浏览器环境) history模式 abstract模式(Nodejs环境)
    1.url组成
        协议部分、域名部分、端口部分、虚拟目录部分、文件名部分、参数部分、锚部分
        url的锚部分是从“#”开始到最后，都是锚部分。锚部分不是url的必需部分。
        url的参数部分是从“？”开始到“#”为止之间的部分。参数部分也不是url的必需部分。
    1.前端路由
        使用Vue+vue-router创建单页应用十分简单
        vue-router提供的功能是将组件映射到路由, 然后渲染出来. 
        Vue-router两个需求
            1.记录当前页面的状态
            2.可以使用浏览器的前进后退功能
        Vue-router为了满足以上两个需求实现以下三个功能
            1.改变URL且不让浏览器向服务器发出请求
            2.检测URL的改变
            3.截获URL地址, 并解析出需要的信息来匹配路由规则
    2.hash模式(使用URL hash值来做路由 支持所有浏览器 包括不支持HTML5 History API的浏览器)
        1.hash表示的是地址栏URL中#符号(也称作为锚点), hash虽然会出现在URL中, 但是不会被包含在Http请求中, 因此hash值改变不会重新加载页面.
        2.由于hash值变化不会引起浏览器向服务器发出请求, 而且hash改变会触发hashchange事件, 浏览器的进后退也能对其进行控制, 所以在HTML5之前, 基本都是使用hash来实现前端路由.
    3.history模式(依赖HTML5 History API和服务器配置)
        1.利用了HTML5新增的pushState()和replaceState()两个api, 通过这两个api完成URL跳转不会重新加载页面
        2.同时history模式解决了hash模式存在的问题. hash的传参是基于URL的, 如果要传递复杂的数据, 会有体积限制, 而history模式不仅可以在URL里传参, 也可以将数据存放到一个特定的对象中
    4.abstract(支持所有JavaScript运行环境 如Node.js服务器端 如果发现没有浏览器的API 路由会强制进入这个模式)
    5.SPA单页面应用路由
    6.hash模式/history模式实现Vue-router跳转API区别

7.Vue 如何去除url中的 #
    vue-router 默认使用 hash 模式，所以在路由加载的时候，项目中的 url 会自带 #。如果不想使用 #， 可以使用 vue-router 的另一种模式 history

    new Router({
    mode: 'history',
    routes: [ ]
    })

    需要注意的是，当我们启用 history 模式的时候，由于我们的项目是一个单页面应用，所以在路由跳转的时候，就会出现访问不到静态资源而出现 404 的情况，这时候就需要服务端增加一个覆盖所有情况的候选资源：如果 URL 匹配不到任何静态资源，则应该返回同一个 index.html 页面
4. 对 MVC(Model View Controller)、MVVM(ViewModel Model View) MVP的理解 
    MVC:(所有通信都是单向的)
        1.通信方式：
            1.View(视图 用户页面) 传送指令到 Controller
            2.Controller(控制器 业务逻辑) 完成业务逻辑后，要求 Model 改变状态
            3.Model(模型 数据保存) 将新的数据发送到 View，用户得到反馈
        2.互动模式：
            接收用户指令时 MVC可以分成两种方式 
                1.一种是通过View接受指令 传递给Controller
                2.直接通过controller接受指令
        3.实例Backbone
            实际项目往往采用更灵活的方式，以 Backbone.js 为例。
                1. 用户可以向 View 发送指令（DOM 事件），再由 View 直接要求 Model 改变状态。
                2. 用户也可以直接向 Controller 发送指令（改变 URL 触发 hashChange 事件），再由 Controller 发送给 View。
                3. Controller 非常薄，只起到路由的作用，而 View 非常厚，业务逻辑都部署在 View。所以，Backbone 索性取消了 Controller，只保留一个 Router（路由器）
    MVP(将controller改名为Presenter 同时改变了通信方向)：
        1. 各部分之间的通信，都是双向的。
        2. View 与 Model 不发生联系，都通过 Presenter 传递。
        3. View 非常薄，不部署任何业务逻辑，称为"被动视图"（Passive View），即没有任何主动性，而 Presenter非常厚，所有逻辑都部署在那里。
    MVVM:(MVVM 模式将 Presenter 改名为 ViewModel，基本上与 MVP 模式完全一致。)
        Model代表数据模型 数据和业务逻辑都在Model中定义
        View代表UI视图 负责数据的展示
        ViewModel负责监听Model中数据的改变并且控制视图更新 处理用户交互操作
        Model和View并无直接关联 而是通过ViewModel来进行联系的 
        Model和ViewModel之间有着双向数据绑定的联系
        因此当Model中的数据改变时会触发View层刷新
        View中由于用户交互操作而改变的数据也会在Model中同步
        这种模式实现了Model和View的数据自动同步 因此开发者只需要专注对数据的维护操作即可 而不需要自己操作DOM
        唯一区别：
            它采用双向绑定（data-binding）：View的变动，自动反映在 ViewModel，反之亦然。Angular 和 Ember 都采用这种模式。
        1.各部分之间的通信，都是双向的
        2.采用双向绑定：View 的变动，自动反映在 ViewModel，反之亦然
5. 介绍虚拟DOM
    1.为什么需要虚拟DOM
        1.先介绍浏览器加载一个HTML文件需要做哪些事，帮助我们理解为什么我们需要虚拟DOM。webkit引擎的处理流程
        2.所有浏览器的引擎工作流程都差不多，如上图大致分5步：创建DOM tree –> 创建Style Rules -> 构建Render tree -> 布局Layout –> 绘制Painting
        3.虚拟DOM就是为了解决这个浏览器性能问题而被设计出来的。
        例如前面的例子，假如一次操作中有10次更新DOM的动作，虚拟DOM不会立即操作DOM。
        4.而是将这10次更新的diff内容保存到本地的一个js对象中。
        最终将这个js对象一次性attach到DOM树上，通知浏览器去执行绘制工作，这样可以避免大量的无谓的计算量。
        5.用js对象模拟DOM节点的好处是，页面的更新可以先全部反映在js对象上，操作内存中的js对象的速度显然要快多了。等更新完后，再将最终的js对象映射成真实的DOM，交由浏览器去绘制。
        6.第一个参数是节点名（如div），第二个参数是节点的属性（如class），第三个参数是子节点（如ul的li）。除了这三个参数会被保存在对象上外，还保存了key和count。
        7.有了js对象后，最终还需要将其映射成真实的DOM：
        8.上面都是自解释代码，根据DOM名调用源生的createElement创建真实DOM，将DOM的属性全都加到这个DOM元素上，如果有子元素继续递归调用创建子元素，并appendChild挂到该DOM元素上。这样就完成了从创建虚拟DOM到将其映射成真实DOM的全部工作。
        9.Diff算法
        我们已经完成了创建虚拟DOM并将其映射成真实DOM的工作，这样所有的更新都可以先反映到虚拟DOM上，如何反映呢？需要明确一下Diff算法。
        两棵树如果完全比较时间复杂度是O(n^3)，但参照《深入浅出React和Redux》一书中的介绍，React的Diff算法的时间复杂度是O(n)。要实现这么低的时间复杂度，意味着只能平层地比较两棵树的节点，放弃了深度遍历。这样做，似乎牺牲了一定的精确性来换取速度，但考虑到现实中前端页面通常也不会跨层级移动DOM元素，所以这样做是最优的。
        我们新创建一棵树，用于和之前的树进行比较，代码见仓库里的src/secondStep：
        优点:
            保证性能下限
            无需手动操作DOM
            跨平台
        缺点:
            无法进行极致优化
        实现原理：
            1.用 JavaScript 对象模拟真实 DOM 树，对真实 DOM 进行抽象；
            2.diff 算法 — 比较两棵虚拟 DOM 树的差异；
            3.pach 算法 — 将两个虚拟 DOM 对象的差异应用到真正的 DOM 树。

6. vue生命周期的理解
        vue实例有一个完整的生命周期，生命周期也就是指一个实例从开始创建到销毁的这个过程
        1.beforeCreate() 组件实例被创建之初 组件的属性生效之前
        2.created() 组件实例已经完全创建 属性也绑定 但真实dom还没生成 $el还不可用
        3.beforeMount() 虚拟dom已创建完成，在数据渲染前最后一次更改数据 在挂载开始之前被调用 相关的render函数首次被调用
        4.mounted() el被新创建的vm.$el替换 并挂载到实例上去之后调用该钩子 页面、数据渲染完成，真实dom挂载完成
        5.beforeUpadate() 组件数据更新之前调用 发生在虚拟DOM打补丁之前 重新渲染之前触发
        6.updated() 组件数据更新之后 数据已经更改完成，dom 也重新 render 完成,更改数据会陷入死循环
        7.beforeDestory() 销毁前执行（实例仍然完全可用） 
        8.destoryed()销毁后执行
        9.activited() keep-alive专属 组件被激活时调用
        10.deactived() keep-alive专属 组件被销毁时调用
7.Vue 的父组件和子组件生命周期钩子函数执行顺序？
        Vue 的父组件和子组件生命周期钩子函数执行顺序可以归类为以下 4 部分：
            1.加载渲染过程 
                父 beforeCreate -> 父 created -> 父 beforeMount -> 子 beforeCreate -> 子 created -> 子 beforeMount -> 子 mounted -> 父 mounted  
            2.子组件更新过程 
                父 beforeUpdate -> 子 beforeUpdate -> 子 updated -> 父 updated  
            3.父组件更新过程
                 父 beforeUpdate -> 父 updated  
            4.销毁过程 
                父 beforeDestroy -> 子 beforeDestroy -> 子 destroyed -> 父 destroyed
8.在哪个生命周期内调用异步请求？(creted beforeMounted mounted)
    可以在钩子函数 created、beforeMount、mounted 中进行调用，因为在这三个钩子函数中，data 已经创建，可以将服务端端返回的数据进行赋值。
    但是本人推荐在 created 钩子函数中调用异步请求，因为在 created 钩子函数中调用异步请求有以下优点： 
    1.能更快获取到服务端数据，减少页面 loading 时间；
    2.ssr 不支持 beforeMount 、mounted 钩子函数，所以放在 created 中有助于一致性；
9.什么阶段才能访问操作DOM？
    在钩子函数 mounted 被调用前，Vue 已经将编译好的模板挂载到页面上，所以在 mounted 中可以访问操作 DOM。
    vue 具体的生命周期示意图可以参见如下，理解了整个生命周期各个阶段的操作，关于生命周期相关的面试题就难不倒你了。
10.父组件可以监听到子组件的生命周期吗？
    比如有父组件 Parent 和子组件 Child，如果父组件监听到子组件挂载 mounted 就做一些逻辑处理，可以通过以下写法实现：
    以上需要手动通过 $emit 触发父组件的事件，更简单的方式可以在父组件引用子组件时通过 @hook 来监听即可，如下所示：
    当然 @hook 方法不仅仅是可以监听 mounted，其它的生命周期事件，例如：created，updated 等都可以监听。
11. 组件通信
        父组件向子组件通信
            子组件通过 props 属性，绑定父组件数据，实现双方通信
        子组件向父组件通信
            将父组件的事件在子组件中通过 $emit 触发
        非父子组件、兄弟组件之间的数据传递
            /*新建一个Vue实例作为中央事件总嫌*/
            let event = new Vue();

            /*监听事件*/
            event.$on('eventName', (val) => {
                //......do something
            });

            /*触发事件*/
            event.$emit('eventName', 'this is a message.')
8. vue-router 路由实现 路由模式有几种
        路由
            用来跟后端服务器进行交互的一种方式，通过不同的路径，来请求不同的资源，请求不同的页面是路由的其中一种功能
        三种路由模式hash history abstract
            hash：
                使用 URL hash 值来作路由。支持所有浏览器，包括不支持 HTML5 History Api 的浏览器；
                实现原理:
                    早期的前端路由的实现就是基于 location.hash 来实现的。其实现原理很简单，location.hash 的值就是 URL 中 # 后面的内容。比如下面这个网站，它的 location.hash 的值为 '#search'：
            history：
                依赖 HTML5 History API 和服务器配置。具体可以查看 HTML5 History 模式；
                实现原理：
                    
            abstract:
                支持所有 JavaScript 运行环境，如 Node.js 服务器端。如果发现没有浏览器的 API，路由会自动强制进入这个模式.
8.v-model 的原理？
        我们在 vue 项目中主要使用 v-model 指令在表单 input、textarea、select 等元素上创建双向数据绑定，我们知道 v-model 本质上不过是语法糖，v-model 在内部为不同的输入元素使用不同的属性并抛出不同的事件：
            1.text 和 textarea 元素使用 value 属性和 input 事件；
            2.checkbox 和 radio 使用 checked 属性和 change 事件；
            3.select 字段将 value 作为 prop 并将 change 作为事件。

9. v-if 和 v-show 区别
        1.v-if 
            真正的条件渲染，因为它会确保在切换过程中条件块内的事件监听器和子组件适当地被销毁和重建；
            也是惰性的：如果在初始渲染时条件为假，则什么也不做——直到条件第一次变为真时，才会开始渲染条件块。
            
            控制这个 DOM 节点的存在与否。

            使用了 v-if 的时候，如果值为 false ，那么页面将不会有这个 html 标签生成。
        2.v-show
            仅仅控制元素的显示方式，将 display 属性在 block 和 none 来回切换

            就简单得多——不管初始条件是什么，元素总是会被渲染，并且只是简单地基于 CSS 的 “display” 属性进行切换。

            v-show 则是不管值为 true 还是 false ，html 元素都会存在，只是 CSS 中的 display 显示或隐藏
            
        总结： v-if 适用于在运行时很少改变条件，不需要频繁切换条件的场景；v-show 则适用于需要非常频繁切换条件的场景。
10. $route和$router的区别
        $router 为 VueRouter 实例，想要导航到不同 URL，则使用 $router.push 
        方法$route 为当前 router 跳转对象里面可以获取 name 、 path 、 query 、 params 等
11. NextTick 是做什么的 其原理
        $nextTick 是在下次 DOM 更新循环结束之后执行延迟回调，在修改数据之后使用 $nextTick，则可以在回调中获取更新后的 DOM
        JS运行机制
            JS 执行是单线程的，它是基于事件循环(eventLoop)的。事件循环大致分为以下几个步骤:
                1.所有同步任务都在主线程上执行，形成一个执行栈（execution context stack）。
                2.主线程之外，还存在一个"任务队列"（task queue）。只要异步任务有了运行结果，就在"任务队列"之中放置一个事件。
                3.一旦"执行栈"中的所有同步任务执行完毕，系统就会读取"任务队列"，看看里面有哪些事件。那些对应的异步任务，于是结束等待状态，进入执行栈.
                4.开始执行。主线程不断重复上面的第三步。
        主线程的执行过程就是一个 tick，而所有的异步结果都是通过 “任务队列” 来调度。 消
        息队列中存放的是一个个的任务（task）。
        规范中规定 task 分为两大类，分别是 macro task(宏任务) 和 micro task(微任务).
        并且每个 macro task 结束后，都要清空所有的 micro task。
        浏览器中常见宏任务
             setTimeout、MessageChannel、postMessage、setImmediate
        浏览器中常见微任务
            MutationObsever 和 Promise.then
        异步更新队列：
            Vue在更新DOM时是异步执行的 只要监听到数据变化 Vue将开启一个队列 并缓冲在同一事件循环中发生的所有数据变更。
            如果同一个 watcher 被多次触发，只会被推入到队列中一次。这种在缓冲时去除重复数据对于避免不必要的计算和 DOM 操作是非常重要的。
            然后，在下一个的事件循环“tick”中，Vue 刷新队列并执行实际 (已去重的) 工作。
            Vue 在内部对异步队列尝试使用原生的 Promise.then、MutationObserver 和 setImmediate，如果执行环境不支持，则会采用 setTimeout(fn, 0) 代替。
            在 vue2.5 的源码中，macrotask 降级的方案依次是：setImmediate、MessageChannel、setTimeout
        Vue的nextTick方法实现原理
            1.vue 用异步队列的方式来控制 DOM 更新和 nextTick 回调先后执行
            2.microtask 因为其高优先级特性，能确保队列中的微任务在一次事件循环前被执行完毕
            3.考虑兼容问题,vue 做了 microtask 向 macrotask 的降级方案
12. Vue 组件 data 为什么必须是函数
        因为js本身的特性带来的
        如果 data 是一个对象，那么由于对象本身属于引用类型，当我们修改其中的一个属性时，会影响到所有Vue实例的数据。
        如果将 data 作为一个函数返回一个对象，那么每一个实例的 data 属性都是独立的，不会相互影响了
13. computed 的实现原理
        computed 本质是一个惰性求值的观察者。
        computed 内部实现了一个惰性的 watcher,也就是 computed watcher,computed watcher 不会立刻求值,同时持有一个 dep 实例。
        其内部通过 this.dirty 属性标记计算属性是否需要重新求值。
        当 computed 的依赖状态发生改变时,就会通知这个惰性的 watcher
        computed watcher 通过 this.dep.subs.length 判断有没有订阅者
        有的话,会重新计算,然后对比新旧值,如果变化了,会重新渲染。 (Vue 想确保不仅仅是计算属性依赖的值发生变化，而是当计算属性最终计算的值发生变化时才会触发渲染 watcher 重新渲染，本质上是一种优化。)没有的话,仅仅把 this.dirty = true。 (当计算属性依赖于其他数据时，属性并不会立即重新计算，只有之后其他地方需要读取属性的时候，它才会真正计算，即具备 lazy（懒计算）特性。)
13. 计算属性computed 和事件 methods 有什么区别
        相同点:
            我们可以将同一函数定义为一个 method 或者一个计算属性。对于最终的结果，两种方式是相同的
        不同点：
            computed: 计算属性是基于它们的依赖进行缓存的,只有在它的相关依赖发生改变时才会重新求值对于 method ，只要发生重新渲染，method 调用总会执行该函数
14.computed 和 watch 的区别和运用的场景？
        computed： 
            是计算属性，依赖其它属性值，并且 computed 的值有缓存，只有它依赖的属性值发生改变，下一次获取 computed 的值时才会重新计算 computed  的值； 
        watch： 
            更多的是「观察」的作用，类似于某些数据的监听回调 ，每当监听的数据变化时都会执行回调进行后续操作；

14. 对比 jQuery ，Vue 有什么不同
        jQuery 专注视图层，通过操作 DOM 去实现页面的一些逻辑渲染；
        Vue 专注于数据层，通过数据的双向绑定，最终表现在 DOM 层面，减少了 DOM 操作Vue 使用了组件化思想，使得项目子集职责清晰，提高了开发效率，方便重复利用，便于协同开发
15. Vue 中怎么自定义指令
        全局注册
            // 注册一个全局自定义指令 `v-focus`
            Vue.directive('focus', {
            // 当被绑定的元素插入到 DOM 中时……
            inserted: function (el) {
                // 聚焦元素
                el.focus()
            }
            })
        局部注册
            directives: {
                focus: {
                    // 指令的定义
                    inserted: function (el) {
                    el.focus()
                    }
                }
                }
16. Vue 中怎么自定义过滤器(同样接受全局注册和局部注册)
        可以用全局方法 Vue.filter() 注册一个自定义过滤器，它接收两个参数：过滤器 ID 和过滤器函数。过滤器函数以值为参数，返回转换后的值
            Vue.filter('reverse', function (value) {
            return value.split('').reverse().join('')
            })
            <!-- 'abc' => 'cba' -->
            <span v-text="message | reverse"></span>
        过滤器也同样接受全局注册和局部注册
17.对 keep-alive 的了解
        keep-alive 是 Vue 内置的一个组件，可以使被包含的组件保留状态，或避免重新渲染
            特性:
                一般结合路由和动态组件一起使用，用于缓存组件；提供 include 和 exclude 属性，两者都支持字符串或正则表达式， include 表示只有名称匹配的组件会被缓存，exclude 表示任何名称匹配的组件都不会被缓存 ，其中 exclude 的优先级比 include 高；对应两个钩子函数 activated 和 deactivated ，当组件被激活时，触发钩子函数 activated，当组件被移除时，触发钩子函数 deactivated。
            <keep-alive>
            <component>
                <!-- 该组件将被缓存！ -->
            </component>
            </keep-alive>
        可以使用API提供的props，实现组件的动态缓存
18. Vue 中 key 的作用
        key 的特殊属性主要用在 Vue 的虚拟 DOM 算法，在新旧 nodes 对比时辨识 VNodes。
        如果不使用 key，Vue 会使用一种最大限度减少动态元素并且尽可能的尝试修复/再利用相同类型元素的算法。
        使用 key，它会基于 key 的变化重新排列元素顺序，并且会移除 key 不存在的元素。
        有相同父元素的子元素必须有独特的 key。重复的 key 会造成渲染错误
19. Vue 的核心是什么
        数据驱动 组件系统
20. 说说你对 SPA 单页面的理解，它的优缺点分别是什么？ 如何优化首屏加载速度慢的问题
        SPA（ single-page application ）仅在 Web 页面初始化时加载相应的 HTML、JavaScript 和 CSS。
        一旦页面加载完成，SPA 不会因为用户的操作而进行页面的重新加载或跳转；
        取而代之的是利用路由机制实现 HTML 内容的变换，UI 与用户的交互，避免页面的重新加载。
        优点：
            1.良好的交互体验
                用户体验好、快，内容的改变不需要重新加载整个页面，避免了不必要的跳转和重复渲染；
            2.良好的前后端工作分离模式
                前后端职责分离，架构清晰，前端进行交互逻辑，后端负责数据处理；
            3.减轻服务器压力
                基于上面一点，SPA 相对对服务器压力小；
        缺点：
            4.SEO(搜索引擎优化)难度较高
                由于所有的内容都在一个页面中动态替换显示，所以在 SEO 上其有着天然的弱势。
            5.前进、后退管理 
                由于单页应用在一个页面中显示所有的内容，所以不能使用浏览器的前进后退功能，所有的页面切换需要自己建立堆栈管理；
            6.初次加载耗时多 
                为实现单页 Web 应用功能及显示效果，需要在加载页面的时候将 JavaScript、CSS 统一加载，部分页面按需加载；
        优化：
            1.将公用的JS库通过script标签外部引入，减小app.bundel的大小，让浏览器并行下载资源文件，提高下载速度；
            2.在配置 路由时，页面和组件使用懒加载的方式引入，进一步缩小 app.bundel 的体积，在调用某个组件时再加载对应的js文件；
            3.加一个首屏 loading 图，提升用户体验；
21. vue-router 使用params与query传参有什么区别
        
        vue-router 可以通过 params 与 query 进行传参

        // 传递
        this.$router.push({path: './xxx', params: {xx:xxx}})
        this.$router.push({path: './xxx', query: {xx:xxx}})

        // 接收
        this.$route.params
        this.$route.query
        1.params 是路由的一部分,必须要有。query 是拼接在 url 后面的参数，没有也没关系
        2.params 不设置的时候，刷新页面或者返回参数会丢，query 则不会有这个问题
22.Class与Style如何动态绑定
        Class 可以通过对象语法和数组语法进行动态绑定：
        对象语法
        数组语法
        Style 也可以通过对象语法和数组语法进行动态绑定：
        对象语法
        数组语法
23.直接给一个数组项赋值，Vue 能检测到变化吗？
        由于 JavaScript 的限制，Vue 不能检测到以下数组的变动：
            1.当你利用索引直接设置一个数组项时，例如：vm.items[indexOfItem] = newValue
                Vue提供解决方法:
            2.当你修改数组的长度时，例如：vm.items.length = newLength
                Vue提供解决方法：
24.Vuex
    Vuex 是一个专为 Vue.js 应用程序开发的状态管理模式。每一个 Vuex 应用的核心就是 store（仓库）。“store” 基本上就是一个容器，它包含着你的应用中大部分的状态 ( state )。
    （1）Vuex 的状态存储是响应式的。当 Vue 组件从 store 中读取状态的时候，若 store 中的状态发生变化，那么相应的组件也会相应地得到高效更新。 
    （2）改变 store 中的状态的唯一途径就是显式地提交 (commit) mutation。这样使得我们可以方便地跟踪每一个状态的变化。
     主要包括以下几个模块：
        State：
            定义了应用状态的数据结构，可以在这里设置默认的初始状态。
        Getter：
            允许组件从 Store 中获取数据，mapGetters 辅助函数仅仅是将 store 中的 getter 映射到局部计算属性。
        Mutation：
            是唯一更改 store 中状态的方法，且必须是同步函数。
        Action：
            用于提交 mutation，而不是直接变更状态，可以包含任意异步操作。
        Module：
            允许将单一的 Store 拆分为多个 store 且同时保存在单一的状态树中。
25.Vue SSR
    Vue.js 是构建客户端应用程序的框架。
    默认情况下，可以在浏览器中输出 Vue 组件，进行生成 DOM 和操作 DOM。然而，
    也可以将同一个组件渲染为服务端的 HTML 字符串，将它们直接发送到浏览器，最后将这些静态标记"激活"为客户端上完全可交互的应用程序。 
    即：SSR大致的意思就是vue在客户端将标签渲染成的整个 html 片段的工作在服务端完成，服务端形成的html 片段直接返回给客户端这个过程就叫做服务端渲染。
    服务器端SSR优缺点如下:
        1.服务端渲染的优点
            1.更好的SEO
                因为 SPA 页面的内容是通过 Ajax 获取，而搜索引擎爬取工具并不会等待 Ajax 异步完成后再抓取页面内容，所以在 SPA 中是抓取不到页面通过 Ajax 获取到的内容；而 SSR 是直接由服务端返回已经渲染好的页面（数据已经包含在页面中），所以搜索引擎爬取工具可以抓取渲染好的页面；
            2.服务端渲染的缺点
                更快的内容到达时间（首屏加载更快）： SPA 会等待所有 Vue 编译后的 js 文件都下载完成后，才开始进行页面的渲染，文件下载等需要一定的时间等，所以首屏渲染需要一定的时间；SSR 直接由服务端渲染好页面直接返回显示，无需等待下载 js 文件及再去渲染等，所以 SSR 有更快的内容到达时间；
        2.服务端渲染的缺点
            1.更多开发条件限制
                例如服务端渲染只支持 beforCreate 和 created 两个钩子函数，这会导致一些外部扩展库需要特殊处理，才能在服务端渲染应用程序中运行；并且与可以部署在任何静态文件服务器上的完全静态单页面应用程序 SPA 不同，服务端渲染应用程序，需要处于 Node.js server 运行环境；
            2.更多服务器负载
                在 Node.js  中渲染完整的应用程序，显然会比仅仅提供静态文件的  server 更加大量占用CPU 资源 (CPU-intensive - CPU 密集)，因此如果你预料在高流量环境 ( high traffic ) 下使用，请准备相应的服务器负载，并明智地采用缓存策略。
26.Vue中的key有什么作用
        key 是为 Vue 中 vnode 的唯一标记，通过这个 key，我们的 diff 操作可以更准确、更快速。Vue 的 diff 过程可以概括为：oldCh 和 newCh 各有两个头尾的变量 oldStartIndex、oldEndIndex 和 newStartIndex、newEndIndex，它们会新节点和旧节点会进行两两对比，即一共有4种比较方式：newStartIndex 和oldStartIndex 、newEndIndex 和  oldEndIndex 、newStartIndex 和 oldEndIndex 、newEndIndex 和 oldStartIndex，如果以上 4 种比较都没匹配，如果设置了key，就会用 key 再进行比较，在比较的过程中，遍历会往中间靠，一旦 StartIdx > EndIdx 表明 oldCh 和 newCh 至少有一个已经遍历完了，就会结束比较。具体有无 key 的 diff 过程，可以查看作者写的另一篇详解虚拟 DOM 的文章《深入剖析：Vue核心之虚拟DOM》 所以 Vue 中 key 的作用是：key 是为 Vue 中 vnode 的唯一标记，通过这个 key，我们的 diff 操作可以更准确、更快速
        更准确：
            因为带 key 就不是就地复用了，在 sameNode 函数 a.key === b.key 对比中可以避免就地复用的情况。所以会更加准确。
        更快速：
            利用 key 的唯一性生成 map 对象来获取对应节点，比遍历方式更快
27.你有对Vue项目进行过哪些优化
        （1）代码层面的优化 v-if 和 v-show 区分使用场景computed 和 watch  区分使用场景v-for 遍历必须为 item 添加 key，且避免同时使用 v-if长列表性能优化事件的销毁图片资源懒加载路由懒加载第三方插件的按需引入优化无限列表性能服务端渲染 SSR or 预渲染
        （2）Webpack 层面的优化 Webpack 对图片进行压缩减少 ES6 转为 ES5 的冗余代码提取公共代码模板预编译提取组件的 CSS优化 SourceMap构建结果输出分析Vue 项目的编译优化（3）基础的 Web 技术的优化  开启 gzip 压缩  浏览器缓存  CDN 的使用  使用 Chrome Performance 查找性能瓶颈
28.对于即将到来的 vue3.0 特性你有什么了解的吗？
       Vue 3.0 正走在发布的路上，Vue 3.0 的目标是让 Vue 核心变得更小、更快、更强大，因此 Vue 3.0 增加以下这些新特性：
        1.监测机制的改变
        2.模板
        3.对象式的组件声明
        4.其他方面的更改
29.为什么在 Vue3.0 采用了 Proxy,抛弃了 Object.defineProperty？
    Object.defineProperty 本身有一定的监控到数组下标变化的能力,但是在 Vue 中,从性能/体验的性价比考虑,尤大大就弃用了这个特性(Vue 为什么不能检测数组变动 )。为了解决这个问题,经过 vue 内部处理后可以使用以下几种方法来监听数组

29.Vue有哪些指令
        1.v-html
        2.v-show
        3.v-if
        4.v-for
30.delete和Vue.delete删除数组区别
    delete只是被删除的元素变成了 empty/undefined 其他的元素的键值还是不变。
    Vue.delete直接删除了数组 改变了数组的键值。
31.Vue和React区别
    1.数据流
    2.监听数据的变化方式不同
    3.应用场景
    4.渲染方式
        Vue：自动追踪组件依赖关系 不需要重新渲染整个组件
        React：组件状态变化时 会以该组件为根重新计算整个组件
原生实现select
响应式原理Vue文档解释
    Vue最独特的特性之一 是其非侵入式的响应式系统
    数据模型仅仅是简单的JS对象
    当你修改它们时 视图会进行更新
    如何追踪变化--依赖追踪
        1.把一个普通的JS对象传入Vue实例作为data选项
        Vue将遍历此对象所有的property 
        并使用Object.defineProperty
        将这些property全部转成getter/setter
        2.这些getter/setter对用户来说不可见
        但在内部它们让Vue能追踪依赖 在property被访问
        和修改时通知变更
        3.每个组件实例都对应一个watcher实例
        它会在组件渲染过程中把接触过的数据property记录为依赖
        之后当依赖项的setter触发时
        会通知watcher 从而使它关联的组件重新渲染
1.Vue事件驱动
    1.数据驱动(数据改变->视图改变)
        数据发生改变时 视图也会进行更新 数据驱动视图
    2.响应式原理(数据改变-->视图改变)
        数据发生变化后会重新对页面进行渲染
        数据模型仅仅是普通的JS对象 
        修改它们的时候视图会进行更新
    3.双向数据绑定原理(概念:数据改变->视图改变 视图改变->数据改变)
        使用v-model指令绑定表单元素时 
        可以在视图直接获得数据
        视图改变时 数据也会进行更新
    Vue原理
        采用数据劫持配合发布者-订阅者模式
        通过Object.defineProperty()来劫持各个属性的getter和setter
        在数据发生变化时 发布消息给依赖收集器 通知观察者 调用相应回调函数 更新视图
        具体
            1.MVVM作为绑定的入口 整合Observer Compiler Watcher三者 通过Observer监听model变化
            2.Compiler解析编译模板指令 最终利用Watcher搭起Observer和Compiler之间的通信桥梁
            3.从而达到数据变化=>更新视图
              视图交互变化=>数据model变更
              的双向绑定效果
    (数据驱动/响应式原理/双向数据绑定 底层原理 
    ES5的Object.defineProperty/数据劫持(setter&getter)+发布订阅观察者模式)
    (通过getter进行依赖收集 
     每个setter方法就是一个观察者 
     数据变更时 
     通知Watcher 从而使它关联的组件重新渲染
     通知订阅者更新视图
     Vue重新生成VDOM
     新旧VDOM对比使用DOM-diff算法
     DOM-patch算法
     把patch对象渲染到视图中)
    (数据=>视图 绑定元素时 触发getter getter返回一个初始值 能在视图中看到数据)
    (视图=>数据 视图中内容改变时 触发setter(观察者)通知Vue视图已更新
                Vue重新生成虚拟DOM/VDOM 
                通过新旧DOM对比生成patch对象
                将patch对象渲染到视图中 )
    (Vue响应式实现步骤
        数据更新=>视图变化
        1.侦测数据变化--数据劫持
        2.收集视图依赖了哪些数据--依赖收集
            得知哪些地方依赖我的数据 
            做到数据更新时派发更新 
            getter中收集依赖 
            setter中触发依赖       
            数据变更时
            通知Watcher 从而使它关联的组件重新渲染
        3.数据变化时 自动通知需要更新的视图 
        并进行更新--发布订阅模式subscribe&publish
    )
    (双向数据绑定实现
        发布者Publish：发布消息
        订阅者Describer：接收消息
        主题对象Dep:记录所有订阅该消息的人 
            负责把发布的消息通知给订阅消息的人
        每当new一个Vue 主要做两件事
        (监听属性observer/编译HTML nodeToFragment)
            1.监听数据 observe(data)
                监听数据过程中 
                为data中每一个属性生成一个主题对象Dep
            2.编译HTML nodeToFragment(id)
                为每一个与数据绑定相关的节点生成一个订阅者watcher
                watcher会将自己添加到相应属性的dep中
    )
    (JS中侦听数据变化
        1.数据劫持 ES5 Object.defineProperties()
            (设置对象属性的setter/getter方法监听数据变化/
            getter进行依赖收集/
            setter方法是一个观察者 
            数据变更时通知Watcher订阅者更新视图/
            无法监听/
            对象属性的添加删除
                单个property
                1.Vue.set(object,propertyName,value)
                2.vm.$set(object,propertyName,value)
                多个property
                1.用原对象与要混合进去的对象的property一起创建一个新的对象
            数组的变化
                1.利用索引直接设置一个数组项时 
                    如vm.items[indexOfItem]=newValue)
                    解决:
                        1.Vue.set(vm.items,indexOfItem,newValue)
                        2.vm.items.splice(indexOfItem,1,newValue)
                2.修改数组的长度时
                    如vm.items.length = newLength
                    解决:
                        1.vm.items.splice(newLength);     
        2.数据代理 ES6 Proxy
            (针对整个对象代理/
            不同于Object.defineProperty必须遍历对象每个属性/
            只需做一层代理 可监听同级结构下所有属性变化/
            深层结构 递归还是要进行的
            支持代理数组变化/)
    )
    1.data中数据 
        (通过getter进行依赖收集 
        每个setter方法就是一个观察者 
        数据变更时 通知订阅者Watcher更新视图)
        Vue会通过观察者对象(Observer)
        将data选项中的所有key
        经过Object.defineProperty的getter和setter设置
        通过设置对象属性的setter/getter方法来监听数据
        通过getter进行依赖收集
        而每个setter方法就是一个观察者
        在数据变更时通知订阅者更新视图
    2.v-model指令
        (数据=>视图 绑定元素时 触发getter getter返回一个初始值 能在视图中看到数据)
        (视图=>数据 视图中内容改变时 触发setter(观察者)通知Vue视图已更新
                    Vue重新生成虚拟DOM/VDOM 通过新旧DO对比生成patch对象
                    将patch对象渲染到视图中 )
        (绑定元素时 自动触发getter/视图中内容改变时 自动触发setter)
        1.绑定元素时 
            自动触发getter 
            getter会返回一个初始值 能在视图中看到数据
        2.视图中内容改变时 
            触发setter 
            setter会通知Vue视图已经进行了更新 
            Vue会重新生成虚拟DOM 
            通过新旧虚拟DOM对比生成patch对象 
            将patch对象渲染到视图中
2.Vue
(核心功能是一个视图模板引擎 
在此基础上+组件系统components/客户端路由Vue-route/大规模状态管理Vuex->一个完整的框架)
(Vue.js只提供Vue-cli生态中最核心 组件系统+双向数据绑定/数据驱动)
    Vue.js是一套用于构建用户界面的渐进式框架
    渐进式:
        Vue核心功能是一个视图模板引擎
        声明式渲染/视图模板引擎基础上 
        可以通过添加
            组件系统components
            客户端路由vue-router
            大规模状态管理vuex
        构建一个完整的框架
        这些功能相互独立
        可以在核心功能的基础上任意选用其他部件
        渐进式 即Vue的使用方式 
        也体现出Vue设计理念 没有做职责之外的事
    Vue.js只提供Vue-cli生态中最核心的
        组件系统和
        双向数据绑定/数据驱动(视图模板引擎)
    Vue.js两个核心
        组件系统
        数据驱动/双向数据绑定
    双向数据绑定原理
    概括：
        ES5的Object.defineProperty/数据劫持(setter&getter)+发布订阅观察者模式
    具体实现:(Compiler->Observer->Watcher)
        1.实现一个Compiler(解析指令/初始化视图/订阅数据变更/绑定更新函数)
            对指令进行解析 初始化视图 订阅数据变更 绑定更新函数
        2.实现一个Observer(对数据进行劫持 通知数据变化)
            对数据进行劫持 通知数据的变化
        3.实现一个Watcher(以上两者的一个中介点 接收数据变更同时 让Dep添加当前watcher 并即时通知视图进行update)
            将其作为以上两者的一个中介点
            在接受数据变更的同时 让Dep添加当前Watcher
            并及时通知视图进行update
        4.实现MVVM 整合以上三者 作为一个入口函数
    模板编译Compiler
    数据劫持Observer
    观察者Watcher(订阅者)
        创建Watcher观察者
        新/旧数值进行对比 DOM diff 如发生变化 
        调用更新方法 DOM patch 进行视图更新
        一个数据变化 模板中使用这个数据的值都发生了变化
    PS：发布订阅模式/观察者模式(Publish/Subscribe)
        定义一种一对多的关系 
        让多个观察者对象同时监听某一个主题对象
        这个主题对象的状态发生变化就会通知所有的观察者对象
        使它们能够自动更新自己
3.访问子组件的实例或者子元素
    (
        ref属性为元素/子组件赋予一个ID引用
        元素绑定ref后 直接通过this.$ref即可调用
    )
    (
        ref被用来给元素/子组件注册引用信息
        引用信息被注册在父组件$ref对象上
        普通DOM元素 引用指向 DOM元素
        子组件 引用指向子组件实例
    )
    (
        this.$refs是一个对象
        持有当前组件中注册过ref特性的所有DOM元素和子组件实例
        非响应式 不用做数据绑定
    )
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
    三种用法：
        (普通元素DOM元素/子组件组件实例/v-for&ref 用于元素/组件 引用信息 包含DOM节点/组件实例数组)
        (ref需要在DOM渲染完成后才有 使用时确保DOM已经被渲染完成)
        (普通元素 this.$ref.name 获取DOM元素)
        (子组件   this.$ref.name 获取组件实例 可以使用组件所有方法)
        (v-for&ref 用于元素/组件 引用信息 包含DOM节点/组件实例数组)
        (ref本身是作为渲染结果被创建的 初始渲染时 不能访问/不是响应式 不应做数据绑定)
        PS:ref需要在dom渲染完成后才会有 使用时确保dom已经被渲染完成 
           如在生命周期mounted(){}钩子中调用 或者在this.$nextTick(()=>{})中调用
           如果ref是循环出来的 有多个重名 那么ref的值会是一个数组 此时要拿到单个的ref只需要循环就可以
4.Vue组件通信
    需求(组件实例间作用域相互独立/不同组件之间数据无法相互引用)
            组件是Vue.js最强大的功能之一 
            组件实例的作用域是相互独立的
            意味着不同组件之间的数据无法相互引用
    组件间几种关系
            父子
            隔代
            兄弟        
    组件通信几种实现方式
        (1.props/$emit  父子组件通信 二个参数 做对象使用
         2.ref $parent/$children 父子组件通信
         3.$attrs/$listeners 隔代组件通信
         4.provide/inject(成对出现) 隔代组件通信 
            作用：
                父组件向子孙组件传递数据
            使用方法：
                provide在父组件中返回要传给下级的数据
                inject在需要使用这个数据的子辈组件或孙辈等下级组件中注入数据
            使用场景：      
                由于Vue有$parent属性可以让子组件访问父组件
                但孙组件想要访问祖先组件就比较困难
                通过provide/inject可以轻松实现跨级访问父组件数据
            另外一种理解：
                provide/inject 
                    简单来说就是在父组件中通过provide来提供变量
                    然后在子组件中通过inject来注入变量
                PS：这里不论子组件有多深 只要调用inject则可以注入provider中的数据 而不是局限于只能从当前父组件的prop属性来获取数据
                只要在父组件中调用了 在这个父组件生效的生命周期内 所有子组件都可以调用inject来注入父组件的值
         5.EventBus($emit/$on) 父子/兄弟/隔代组件通信         
         6.Vuex 父子/兄弟/隔代转组件通信
        )
        1.props / $emit 适用 父子组件通信
        2.ref 与 $parent / $children 适用 父子组件通信
            ref：
                如果在普通的 DOM 元素上使用，引用指向的就是 DOM 元素；如果用在子组件上，引用就指向组件实例
            $parent / $children：
                访问父 / 子实例
        3.EventBus （$emit / $on） 适用于 父子/隔代/兄弟组件通信
            通过一个空的 Vue 实例作为中央事件总线（事件中心）
            用它来触发事件和监听事件，从而实现任何组件间的通信，包括父子、隔代、兄弟组件。
        4.$attrs/$listeners 适用于 隔代组件通信
            $attrs：
                包含了父作用域中不被 prop 所识别 (且获取) 的特性绑定 ( class 和 style 除外 )。当一个组件没有声明任何 prop 时，这里会包含所有父作用域的绑定 ( class 和 style 除外 )，并且可以通过 v-bind="$attrs" 传入内部组件。通常配合 inheritAttrs 选项一起使用。
            $listeners：
                包含了父作用域中的 (不含 .native 修饰器的) v-on 事件监听器。它可以通过 v-on="$listeners" 传入内部组件
        5.provide / inject 适用于 隔代组件通信
            祖先组件中通过 provider 来提供变量，然后在子孙组件中通过 inject 来注入变量。 provide / inject API 主要解决了跨级组件间的通信问题，不过它的使用场景，主要是子组件获取上级组件的状态，跨级组件间建立了一种主动提供与依赖注入的关系。
        6.Vuex 适用于 父子、隔代、兄弟组件通信
            Vuex 是一个专为 Vue.js 应用程序开发的状态管理模式。每一个 Vuex 应用的核心就是 store（仓库）。“store” 基本上就是一个容器，它包含着你的应用中大部分的状态 ( state )。
                1.Vuex 的状态存储是响应式的。当 Vue 组件从 store 中读取状态的时候，若 store 中的状态发生变化，那么相应的组件也会相应地得到高效更新。
                2.改变 store 中的状态的唯一途径就是显式地提交  (commit) mutation。这样使得我们可以方便地跟踪每一个状态的变化。
5.prop验证类型
    String/Number/Boolean/Symbol Date/Function/Object/Array
    此外还可以是一个自定义的构造函数Personnel，
    并且通过 instanceof 来验证propwokrer的值是否是通过这个自定义的构造函数创建的。
6.is(动态组件 is用法 
        有些HTML元素对于哪些元素出现在其内部是有严格限制的
        有些HTML元素只能出现在其他某些特定元素的内部
        会被作为无效内容提升到外部 并导致最终渲染结果出错
        <component :is="componentName"></component>
        <ul>
            <li is="cardList"></li>
        </ul>
    )
7.在Vue事件中使用event对象
    ($event.currentTarget 始终指向事件所绑定的元素)
    ($event.target        始终指向事件发生时元素)

    1.@click="handleOpen" 默认第一个参数传入event对象;
    2.@click="handleOpen(0, $event)",如果自己需要传入参数和event对象，则需要使用$event来获取event对象并传入handleOpen。

    $event.currentTarget始终指向事件所绑定的元素，
    $event.target指向事件发生时的元素。
8.修饰符(表单/事件)
    (修饰符：Vue提供很多事件修饰符 代替处理一些DOM事件细节 事件修饰符顺序很重要
        以半角句号.指明的特殊后缀 
        用于指出一个指令应该以特殊方式绑定
        为了更纯粹数据逻辑 
        Vue提供很多事件修饰符 
        来代替处理一些DOM事件细节
        PS:事件修饰符顺序很重要
    )
    修饰符 (modifier) 
        是以半角句号 . 指明的特殊后缀，用于指出一个指令应该以特殊方式绑定
        如.prevent 修饰符告诉 v-on 指令对于触发的事件调用 event.preventDefault()：
    为了更纯粹的数据逻辑，vue提供了很多事件修饰符，来代替处理一些 DOM 事件细节。
        1 .stop：防止事件冒泡，等同于JavaScript中的event.stopPropagation()
        2 .prevent：防止执行预设的行为，等同于JavaScript中的event.preventDefault()
        3 .capture：捕获冒泡
        4 .self：将事件绑定到自身，只有自身才能触发
        5 .once：只触发一次
        6 .passive：不阻止事件的默认行为
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
            input标签v-model用lazy修饰之后，并不会立即监听input的value的改变，会在input失去焦点之后，才会监听input的value的改变。
        .trim
9.Vue监听键盘事件
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
10.在style上加scoped属性原理/需要注意哪些？
    (Vue通过在DOM结构以及CSS样式上加上唯一标志 保证唯一 达到样式私有化 不污染全局)
    (如果一个项目所有style标签都加上scoped属性 相当于实现了样式的模块化)
    (在公共组件中使用 修改公共组件样式需要用/deep/)
    (样式穿透 deep 深度作用选择器 >>>别名 
    一个选择器能影响子组件 像SASS之类预处理器无法正确解析>>> 使用/deep/操作符代替)
11.Vue渲染模板保留模板中的HTML注释
    组件中将comments选项设置为true
    <template comments> ... <template>
12.Vue中重置data
    Object.assign(this.$data,this.$options.data())
13.Vue中Dom异步更新&nextTick
Dom异步更新：
    Vue 异步执行 DOM 更新。
    观察到数据变化
    Vue 将开启一个队列
    缓冲在同一事件循环中发生的所有数据改变。
    同一个 watcher 被多次触发
    只会被推入到队列中一次。
    缓冲时
    去除重复数据对于避免不必要的计算和 DOM 操作上非常重要。

    下一个的事件循环“tick”/nextTick中
    Vue 刷新队列并执行实际 (已去重的) 工作。
    Vue 在内部尝试对异步队列使用原生的 Promise.then 和MessageChannel，
    如果执行环境不支持，会采用 setTimeout(fn, 0)代替。
    为了在数据变化之后等待 Vue 完成更新 DOM ，
    可以在数据变化之后立即使用Vue.nextTick(callback) 。
    这样回调函数在 DOM 更新完成后就会调用。
Vue中nextTick机制
    (下次DOM更新循环结束后执行延迟回调
    修改数据后立即使用这个方法
    获取更新后的DOM)
    (Vue中Created钩子函数执行时
    DOM其实未进行任何渲染
    所以需要放在nextTick中去获取DOM
    与其对应的生命周期钩子函数是mounted)
    (DOM更新完想做点什么 nextTick回调函数中)
    (Vue生命周期created钩子函数中进行的DOM操作
    一定要放在Vue.$nextTick回调函数中)
    (Vue中created钩子函数执行时
    DOM并未进行任何渲染
    需要放在nextTick中去获取DOM
    与其对应的生命周期钩子函数是mounted)
    (修改数据之后立即使用这个方法 
    获取更新后的DOM)
    Vue 中for渲染DOM 
    就算是中mounted调用nextTick也不能获取到具体的DOM
    Vue整个nextTick作用
    主线程更新前-->遇到宏任务/微任务-->放入栈-->主线程执行完成-->更新完成-->执行栈-->获取更新后的DOM
    (用于延迟执行一段代码
    接受2个参数（回调函数和执行回调函数的上下文环境）
    没有提供回调函数 则返回promise对象。
    )
    (
    callbacks 用来存储所有需要执行的回调函数
    pending 用来标志是否正在执行回调函数
    timerFunc 用来触发执行回调函数
    )
    vm.$nextTick(() =>{this.handleadd()}),
    将handleadd回调延迟到下次 DOM 更新循环之后执行。
    (Vue.nextTick：在DOM更新后做点什么 参数回调函数 DOM更新完调用)
    应用场景:(什么时候需要使用Vue.nextTick()函数)
        (Vue.nextTick  在DOM更新后做点什么 参数回调函数 DOM更新完调用)
        (数据变化后要执行某个操作 这个操作需要使用随数据改变而改变DOM结构 这个操作应该放进Vue.$nextTick()的回调函数中)
        (为了在数据变化之后等待Vue完成更新DOM 可以在数据变化之后立即使用Vue.nextTick(callback)这样回调函数在DOM更新完后就会调用)
        JS运行机制
            JS 执行是单线程的，它是基于事件循环(eventLoop)的。事件循环大致分为以下几个步骤:
                1.所有同步任务主线程上执行 形成一个执行栈（execution context stack）。
                2.主线程之外 存在一个"任务队列"（task queue）
                    异步任务有了运行结果 就在"任务队列"之中放置一个事件
                3.一旦"执行栈"中的所有同步任务执行完毕
                    系统会读取"任务队列"，看看里面有哪些事件。
                    那些对应的异步任务，于是结束等待状态，进入执行栈.
                4.开始执行。主线程不断重复上面的第三步。
        (主线程的执行过程就是一个tick 而所有的异步操作都是通过任务队列来调度)
        (消息队列中存放的是一个个任务task
            task分
                宏任务macro
                    setTimeout setInterval
                微任务micro
                    Promise.then Promise.catch
        事件轮询：
            决定如何执行宏任务macro微任务micro的机制
        )
        消息队列中存放的是一个个的任务（task）。
        规范中规定 task 分为两大类，分别是 macro task(宏任务) 和 micro task(微任务).
        并且每个 macro task 结束后，都要清空所有的 micro task。
        浏览器中常见宏任务
             setTimeout、MessageChannel、postMessage、setImmediate
        宏任务优先级
            主代码>setImmediate>MessageChanel>setTimeout/setInterval
            大部分浏览器会把DOM事件回调优先处理
            因为要提升用户体验 给用户反馈
            其次是network IO操作的调用
            再然后是UIrender
        浏览器中常见微任务
            MutationObsever 和 Promise.then
        微任务优先级
            process.nextTick>Promise=MutationObserver
        异步更新队列：
            Vue在更新DOM时是异步执行的 只要监听到数据变化 Vue将开启一个队列 并缓冲在同一事件循环中发生的所有数据变更。
            如果同一个 watcher 被多次触发，只会被推入到队列中一次。
            这种在缓冲时去除重复数据对于避免不必要的计算和 DOM 操作是非常重要的。
            然后，在下一个的事件循环“tick”中，Vue 刷新队列并执行实际 (已去重的) 工作。
            Vue 在内部对异步队列尝试使用原生的 Promise.then、MutationObserver 和 setImmediate
            如果执行环境不支持，则会采用 setTimeout(fn, 0) 代替。
            在 vue2.5 的源码中，macrotask 降级的方案依次是：setImmediate、MessageChannel、setTimeout
        Vue的nextTick方法实现原理
            1.vue 用异步队列的方式来控制 DOM 更新和 nextTick 回调先后执行
            2.microtask 因为其高优先级特性，能确保队列中的微任务在一次事件循环前被执行完毕
            3.考虑兼容问题,vue 做了 microtask 向 macrotask 的降级方案
14.Vue render函数(用来生成VDOM)
    Vue渲染/render函数用来生成VDOM/虚拟DOM
    1.Vue更新渲染render整体流程
        1.模板通过编译Compiler生成AST(Abstract Synax Tree)抽象语法树
        2.AST生成Vue的render渲染函数
        3.render渲染函数结合数据生成VNODE(Virtual DOM Node)树
        4.diff和patch后生成新的UI界面(真实DOM渲染)
        概念解释：
        模板：
            Vue模板是纯HTML 
            基于Vue的模板语法 可以比较方便地处理数据和UI界面
        AST：(Abstract Synax Tree)
            Vue将HTML模板解析为AST 
            并对AST进行一些优化的标记处理 
            提取最大的静态树 
            以使VDOM直接跳过后面的diff
        render渲染函数
            (Vue推荐使用模板构建应用程序 
            底层实现中Vue最终还是会将模板编译成render渲染函数 
            若想得到更好的控制 
            可以直接写渲染函数)
            用来生成VDOM 
            Vue推荐使用模板构建应用程序
            底层实现中Vue最终还是会将模板编译成渲染函数
            若我们想要得到更好的控制 可以直接写渲染函数
        Watcher：
            (每一个Vue组件都有一个对应的watcher 
            它会在组件render时收集组件所依赖的数据
            并在依赖更新时触发组件重新渲染 
            Vue会自动优化并更新需要更新的DOM)
        render函数可以作为一条分割线
            (render函数左边编译期 将Vue模板转换成渲染函数)
            (render函数右边运行时 将渲染函数生成的VDOM树 进行diff和patch)
            1.render函数左边可以称为编译期 将Vue模板转换成渲染函数
            2.render函数右边可以称为运行时 将渲染函数生成的VDOM树 进行diff和patch
    2.render
        Vue推荐绝大多数情况下 使用模板创建HTML 
        一些场景中 真正需要JS的完全编程能力
        可以用渲染函数 它比模板更接近编译器
    3.虚拟DOM
        1.Vue编译器在编译模板后 会将这些模板编译成渲染函数render 当渲染函数render被调用时 会返回一个虚拟DOM树
        2.在Vue底层实现上 Vue将模板编译成虚拟DOM渲染函数 结合Vue自带的响应系统 在相应状态改变时 Vue能智能计算出重新渲染组件的最小代价并映射到DOM操作上
        3.Vue支持我们通过data参数传递一个JavaScript对象作为组件数据, Vue将遍历data对象属性, 使用Object.defineProperty方法设置描述对象, 通过gett/setter函数来拦截对该属性的读取和修改.
        4.Vue创建了一层Watcher层, 在组件渲染的过程中把属性记录为依赖, 当依赖项的setter被调用时, 会通知Watcher重新计算, 从而使它关联的组件得以更新.
    4.Vue渲染机制
        (独立构建   包含模板编译器   渲染过程 HTML字符串->render函数->VNODE->真实DOM)
        (运行时构建 不包含模板编译器 渲染过程 render函数->VNODE->真实DOM)
        (运行时构建的包 比独立构建少一个模板编译器(因此速度上会更快))
        (渲染过程提供三种模板(自定义render/template/el) 这三种模板最终都要得到render函数 )
        (渲染具体过程
            1.new Vue执行初始化
            2.挂载$mount 通过自定义render方法 template el 等生成render渲染函数
            3.通过Watcher监听数据的变化
            4.数据变化时 render函数执行生成VNODE虚拟NODE对象
            5.DOM diff算法 对比新旧VNode对象 
                通过patch算法 添加/修改/删除真正的DOM元素
        )
        两个概念
            1.独立构建
                包含模板编译器
                渲染过程 HTML字符串=>render函数=>VNODE=>真实DOM
            2.运行时构建
                不包含模板编译器 
                渲染过程 render函数=>VNODE=>真实DOM
            3.运行时构建的包 比独立构建少一个模板编译器(因此运行速度上会更快)在$mount函数上也不同 $mount方法是整个渲染过程中的起始点
        渲染过程提供三种模板：(这三种模式最终都要得到render函数)
            1.自定义render函数
            2.template
            3.el
        Vue渲染
            1.new Vue 执行初始化
            2.挂载$mount 通过自定义render方法template el等生成render渲染函数
            3.通过Watcher监听数据的变化
            4.当数据变化时 render函数执行生成VNODE对象
            5.通过DOM diff算法 对比新旧VNode对象 通过patch算法 添加/修改/删除真正的DOM元素
    5.理解使用render函数
        1.createElement
            第1个参数: {String | Object | Function }, 必传
            第2个参数: { Object }, 可选
            第3个参数: { String | Array }, 可选
    6.使用render函数替代模板功能
        使用Vue模板时 可在模板中灵活的使用v-if、v-for、v-model和<slot>等模板语法。
        但在render函数中是没有提供专用的API。如果在render使用这些，需要使用原生的JavaScript来实现。
15.虚拟DOM/VDOM
    1.真实DOM 浏览器解析流程 真实DOM在浏览器渲染时遇到的问题引出虚拟DOM
        webkit渲染引擎工作流程
        所有浏览器渲染引擎工作流程大致分为5步
            (DOM树 CSSOM树 Render树 Layout布局 Painting绘制 实际进行时不是独立的会有交叉)
            1.创建DOM树
                用HTML分析器分析HTML元素 构建一颗DOM树
            2.创建Style Rules
                用CSS分析器分析CSS文件和元素上的inline样式 生成页面样式表
            3.构建Render树
                将DOM和样式表关联起来 构建一棵Render树 (Attachment)
                每个DOM节点都有attach方法 接受样式信息 返回一个render对象(又名renderer)这些render对象最终会被构建成以可Render树
            4.布局Layout
                确定节点坐标 根据Render树结构 为每个Render树上的节点确定一个在显示屏上出现的精确坐标
            5.绘制Painting
                根据Render树和节点显示坐标 然后调用每个节点的paint方法 将它们绘制出来
        注意：
            1.DOM 树的构建不是文档加载完成开始的
                构建 DOM 树是一个渐进过程，为达到更好的用户体验，渲染引擎会尽快将内容显示在屏幕上，它不必等到整个 HTML 文档解析完成之后才开始构建 render 树和布局。
            2.Render树/DOM树/CSS样式表
                实际进行的时候并不是完全独立的，而是会有交叉，会一边加载，一边解析，以及一边渲染。
            3.CSS 的解析注意点
                CSS的解析式从右向左逆向解析的 嵌套标签越多 解析越慢
            4.JS操作真实DOM代价
                用我们传统的开发模式，原生 JS 或 JQ 操作 DOM 时，浏览器会从构建 DOM 树开始从头到尾执行一遍流程。
                在一次操作中，我需要更新 10 个 DOM 节点，浏览器收到第一个 DOM 请求后并不知道还有 9 次更新操作，因此会马上执行流程，最终执行10 次。例如，第一次计算完，紧接着下一个 DOM 更新请求，这个节点的坐标值就变了，前一次计算为无用功。
                计算 DOM 节点坐标值等都是白白浪费的性能。即使计算机硬件一直在迭代更新，操作 DOM 的代价仍旧是昂贵的，频繁操作还是会出现页面卡顿，影响用户体验
    2.虚拟DOM(Virtual-DOM)--使用JS对象模拟
        存在意义/实现方式：
        为了解决浏览器性能设计出来
        页面的更新可以先全部反映在JS对象(虚拟DOM)上 
        操作内存中的JS对象的速度显然更快 
        等更新完成后 
        将最终的JS对象映射成真实的DOM 
        交由浏览器绘制
        用JS对象模拟DOM树：
            1.JS对象来表示DOM节点 使用对象的属性记录节点的类型/属性/子节点
            2.渲染用JS表示的DOM对象
            3.比较两棵虚拟DOM树的差异-diff算法
                diff算法：
                    比较两棵VDOM树的差异 
                    1.如需完全比较 O(n^3)
                    2.由于前端很少会跨级移动DOM元素 
                    VDOM只会对同一个层级的元素进行比较
                    O(n)
            4.diff算法具体实现
                1.深度优先遍历 记录差异
                    每个节点有一个唯一的标记 每遍历到一个节点 把该节点和新的树进行对比 如果有差异就记录到一个对象中
                2.差异类型(元素节点1/属性节点2/文本节点3)
                    1.节点替换 如将div换成h1
                    2.顺序互换 移动/删除/新增子节点
                    3.属性更改
                    4.文本改变
                3.列表对比算法
                4.实例输出
             5.将两个虚拟DOM对象的差异应用到真正的DOM树(patch.js)
                1.深度优先遍历DOM树
                2.对原有DOM树进行DOM操作     
                    根据不同类型数据 对当前节点进行不同的DOM操作
                3.DOM结构改变  
    3.总结VDOM算法主要实现三步骤
        1.用JS对象模拟DOM树(VNode定义)
        2.比较两棵虚拟DOM树的差异 diff.js
        3.将两个虚拟DOM对象的差异应用到真正的DOM树 patch.js

        1.用JS对象模拟DOM树(VNode定义)
        2.比较两棵虚拟DOM树差异 diff.js
        3.将两个虚拟DOM对象的差异应用到真正的DOM patch.js
16.虚拟DOM&DOM-diff
    虚拟DOM存在意义：
        虚拟DOM就是为了解决浏览器性能问题而被设计出来的。
        如前，若一次操作中有10次更新DOM的动作，虚拟DOM不会立即操作DOM
        而是将这10次更新的diff内容保存到本地一个JS对象中，
        最终将这个JS对象一次性attch到DOM树上，再进行后续操作，避免大量无谓的计算量。
        所以，用JS对象模拟DOM节点的好处是，页面的更新可以先全部反映在JS对象(虚拟DOM)上，
        操作内存中的JS对象的速度显然要更快，等更新完成后，再将最终的JS对象映射成真实的DOM，交由浏览器去绘制。
    虚拟DOM/VDOM：
        1.用JS去按照DOM结构来实现树状结构对象/可叫DOM对象
        2.是仅存在内存中的DOM 因还未展示到页面中 所以称作VDOM
        3.Virtual DOM其实就是一棵以JavaScript对象(VNode节点)为基础的树 
            用对象属性来描述节点 实际上它只是对一层真实DOM的抽象 最终可以通过一系列操作使这棵树映射到真实环境上。
        4.JS中虚拟DOM表现为一个Object对象 并且最少包含标签名(tag)属性(attrs)和子元素对象(children)三个属性 不同框架对这三个属性的命名可能会有差异
        5.Virtual DOM 对象的节点跟 DOM Tree 每个位置的属性一一对应的，因为人们创造出虚拟 DOM 就是为了更好地将虚拟节点渲染到视图上，也就是把虚拟DOM变成真实的 DOM 节点，提高视图的渲染性能。
    优点：
        1.减少DOM操作
            两个虚拟DOM对比用到的算法就是DOM diff
            JS层面上 DOM操作并不慢 慢在浏览器渲染的过程里，改变一行数据就要全部重新渲染
            虚拟 DOM 比 DOM 快，
            因为需要更新的 DOM 节点要比原生 DOM 操作更新的节点少，浏览器重绘的时间更短
            虚拟 DOM 的优势不在于单次的操作，
            用对比的算法，它可以将多次操作合并成一次操作，
            在大量、频繁的数据更新下，能够对视图进行合理、高效的更新。
        2.跨平台
            虚拟DOM是以JS对象作为基础 本质就是一个JS对象 并不依赖真实平台环境 使它具有跨平台能力 
            在浏览器上可以变成DOM 
            其他平台可以变成相应渲染对象
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
    DOM-diff：(比较两颗虚拟DOM树用到的算法)
        DIFF算法：(层级比较/组件比较/元素比较)
            1.diff算法仅在两个树的同级的虚拟节点之间做比较，递归地进行比较，最终实现整个 DOM 树的更新。
            2.是React框架采用的方法 也就是判断DOM是否发生了变化 然后找到这个变化 这样我们才能实现差量更新
        三个步骤：
            1.用 JS 对象的方式来表示 DOM 树的结构，然后根据这个对象构建出真实的 DOM 树，插到文档中。
            2.当状态变更的时候，重新构造一棵新的对象树。然后用新的树和旧的树进行比较，记录两棵树的差异
            3.最后把所记录的差异应用到所构建的真正的DOM树上，视图更新
        比较时分为三个层级:
            层级比较 Tree Diff
            组件比较 Component Diff
            元素比较 Element Diff
            1.Tree Diff（层级比较）
                1.先进行树结构的层级比较，对同一个父节点下的所有子节点进行比较；
                2.接着看节点是什么类型的，是组件就做 Component Diff;
                3.如果节点是标签或者元素，就做 Element Diff;
            2.Component Diff （组件比较）
                1.若组件类型相同，则继续按照层级比较其虚拟 DOM的结构;
                2.如果组件类型不同，则替换整个组件的所有内容
            3.Element Diff (元素比较)
                1.如果节点是原生标签，则看标签名做比较是否相同来决定替换还是更新属性
                2.然后进入标签后代递归 Tree Diff
        DOM变化主要有三种：
            applendChild
            replaceChild
            removeChild
        DOM diff算法主要做三件事
            创建节点
            删除节点
            更新节点
        给定任意两棵树 采用先序深度优先遍历的算法找到最少的转换步骤
        DOM-diff比较两个虚拟DOM的区别 也就是在比较两个对象的区别
        作用：
            根据两个虚拟对象创建出补丁 描述改变的内容 将这个补丁用来更新DOM
        过程：
            1.用JS对象模拟DOM(虚拟DOM)
            2.把此虚拟DOM转成真实DOM并插入页面中(render)
            3.如果有事件发生修改了虚拟DOM 比较两棵虚拟DOM树的差异 得到差异对象diff
            4.把差异对象应用到真正的DOM树上(patch)
17.Vue一些实例方法
    1.vm.$mount()
        返回vm，可链式调用其它实例方法；(不常用)
    2.vm.$forceUpdate()
        强制Vue实例重新渲染，不是重新加载组件
        会触发beforeUpdate和updated这两个钩子函数
        不会触发其他的钩子函数
        仅仅影响实例本身和插入插槽内容的子组件，
        而不是所有子组件；
    3.vm.$nextTick()
        参数为callback，等待视图全部更新后执行，回调函数的this自动绑定到调用它的实例上；
    4.vm.$destroy()
        销毁一个实例。
        清理它与其它实例的连接，解绑全部指令及事件监听器,
        不能清理实例的DOM和data，
        会触发beforeDestroy和destroyed两个钩子函数。
18.vue初始化和生命周期钩子函数
(初始化:开始创建、初始化数据、编译模板、挂载Dom、数据变化时更新DOM、卸载)
(生命周期:Vue实例从创建到销毁的过程)
(Vue实例有一个完整的生命周期 指一个实例从开始创建到销毁这个过程)
(生命周期钩子自动绑定this到实例上 可以通过this操作访问到数据和方法)
(生命周期钩子函数
beforeCreate(
    实例el创建之前初始化之后
    Data 不能读取
    DOM 未生成

    el  undefined
    data undefined
    DOM 未生成
)
created(
    实例创建之后 
    vm.$el未定义 挂载属性el不存在
    能读取到data的值(属性和方法的运算watch/event事件回调)
    模板渲染成HTML DOM未生成

    数据初始化最好在此阶段完成
    完成数据观测，    

    el  undefined
    data [Object Object]
    DOM未生成
)
beforeMount(
    $el挂载前 vm.$el还是未定义
    相关Render函数首次被调用 将模块渲染成HTML
    相关的 render 函数首次被调用
    期间将模块渲染成html
    将编译完成的html挂载到对应的虚拟DOM

    el  [Object HTMLDivElement]
    data [Object Object]
    DOM 相关render函数首次被调用 将模块渲染成HTML
    meaasge Vue生命周期
) 
mounted(
    $el挂载后被调用
    此时vm.$el可以调用

    编译好的HTML挂载到页面完成后
    不能保证所有的子组件都挂载
    要等视图全部更新完毕用vm.$nextTick();
    编译好的html挂载到页面完成后所执行的事件钩子函数。
    挂载完毕阶段

    此时编译好的HTML已经挂载到了页面上 页面上已经渲染出了数据
    一般会利用这个钩子函数做一些ajax请求获取数据进行数据初始化。
    el  [Object HTMLDivElement]
    data [Object Object]
    meaasge Vue生命周期
    此阶段中DOM渲染完成
) 
beforeUpadate(
    检测到修改数据
    更新渲染视图之前触发

    修改vue实例的data时
    vue就会自动帮我们更新渲染视图
    检测到我们要修改数据 
    更新渲染视图之前触发
)
updated(
    此阶段为更新渲染视图之后触发
    此时再读取视图上的内容，已经是最新的内容。
    PS:
    1.该钩子在服务器端渲染期间不被调用。
    2.应该避免在此期间更改状态，
    因为这可能会导致更新无限循环。
)
beforeDestory(
    实例销毁前触发
    调用实例的destroy() 
    此时实例仍然完全可用；
    方法可以销毁当前的组件，在销毁前，
    会触发beforeDestroy钩子。
)
destoryed(
    实例销毁后触发
    此时该实例与其他实例的关联已经被清除，
    Vue实例指示的所有东西都会解绑定，
    所有的事件监听器会被移除，
    所有的子实例也会被销毁。
)
)
19.keep-alive
(抽象组件 本身不会渲染一个DOM 不会出现在父组件链中)
(使用keep-alive包裹动态组件
缓存不活动的组件实例
代替销毁)
(组件切换 默认销毁
需求 组件切换后 不进行销毁
保留之前状态
keep-alive实现
被切换到的组件都有自己的名字)
两个属性(字符串或者正则表达式匹配的组件name)
(include定义缓存白名单即会缓存的组件
exclude定义缓存黑名单即不会缓存的组件)
(activted() keep-alive专属 组件激活时调用 可更新组件
deactived() keep-alive专属 组件被销毁时调用)
    1.include定义缓存白名单，会缓存的组件；
    2.exclude定义缓存黑名单，不会缓存的组件；
    3.以上两个参数可以是逗号分隔字符串、正则表达式或一个数组,include="a,b"、:include="/a|b/"、:include="['a', 'b']"；
    4.匹配首先检查组件自身的 name 选项，如果 name 选项不可用，则匹配它的局部注册名称 (父组件 components 选项的键值)。匿名组件不能被匹配；
    5.max最多可以缓存多少组件实例。一旦这个数字达到了，在新实例被创建之前，已缓存组件中最久没有被访问的实例会被销毁掉；
    6.不会在函数式组件中正常工作，因为它们没有缓存实例；
    7.当组件在内被切换，它的activated和deactivated这两个生命周期钩子函数将会被对应执行。
    服务器渲染期间不被调用
    activited()生命周期钩子函数
        keep-alive专属 组件被激活时调用 可更新组件
    deactived()生命周期钩子函数
        keep-alive专属 组件被销毁时调用
    一般结合路由和动态组件一起使用
20.Vue中的key
    (VDOM DOM diff 新旧VDOM对比做辨识用)
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
21.Vue 的父组件和子组件生命周期钩子函数执行顺序/
            (加载渲染/子组件更新/父组件更新/销毁)
            1.加载渲染过程 
                父 beforeCreate -> 
                父 created -> 
                父 beforeMount -> 
                子 beforeCreate -> 
                子 created -> 
                子 beforeMount -> 
                子 mounted -> 
                父 mounted  
            2.子组件更新过程 
                父 beforeUpdate -> 
                子 beforeUpdate -> 
                子 updated -> 
                父 updated  
            3.父组件更新过程
                 父 beforeUpdate -> 
                 父 updated  
            4.销毁过程 
                父 beforeDestroy -> 
                子 beforeDestroy -> 
                子 destroyed -> 
                父 destroyed
22.在哪个生命周期内调用异步请求(created)/什么阶段才能访问操作DOM(mounted)？
    1.(created beforeMounted mounted)
        这三个钩子函数中data 已创建
        可将服务端端返回的数据进行赋值
        推荐在 created 钩子函数中调用异步请求
    created 钩子函数中调用异步请求优点： (更快获取服务端数据/ssr不支持beforeMount Mounted生命周期钩子)
        1.能更快获取到服务端数据，减少页面 loading 时间；
        2.ssr(服务端渲染) 不支持 beforeMount 、mounted 钩子函数，所以放在 created 中有助于一致性；
    什么阶段能访问操作DOM
        钩子函数 mounted 被调用前
        Vue 已经将编译好的模板挂载到页面上
        在 mounted 中可以访问操作 DOM。
23.Vue API 实例属性/实例方法(数据/事件/生命周期)
    Vue中的$(内置的实例方法 属性)
        挂载在this上的vue内部属性
        内部api的命名空间
        一个特殊标记 增强区分 说明这是内置的实例方法属性
    核心：
        数据驱动 组件系统
    虽然没有完全遵循 MVVM 模型，但是 Vue 的设计也受到了它的启发。
    因此在文档中经常会使用 vm (ViewModel 的缩写) 这个变量名表示 Vue 实例。
    所有的 Vue 组件都是 Vue 实例，并且接受相同的选项对象 (一些根实例特有的选项除外)。
    生命周期钩子的 this 上下文指向调用它的 Vue 实例。
    不要在选项 property 或回调上使用箭头函数
    vm(ViewModel)是Vue的一个实例
    实例属性/实例方法(数据/事件/生命周期)
  全局配置：
    Vue.config 是一个对象，包含 Vue 的全局配置。可以在启动应用之前修改下列 property：
  全局API：
    1.Vue.extend(options)
        使用基础 Vue 构造器，创建一个“子类”。参数是一个包含组件选项的对象。
        data 选项是特例，需要注意 - 在 Vue.extend() 中它必须是函数
    2.Vue.nextTick([callback,context])
        在下次 DOM 更新循环结束之后执行延迟回调
        在修改数据之后立即使用这个方法，获取更新后的 DOM。
    3.Vue.set(target,propertyName/index,value)
        返回值：设置的值。
        用法：
            向响应式对象中添加一个 property，并确保这个新 property 同样是响应式的，且触发视图更新。
            它必须用于向响应式对象上添加新 property，因为 Vue 无法探测普通的新增 property 
            (比如 this.myObject.newProperty = 'hi')
            对象不能是 Vue 实例，或者 Vue 实例的根数据对象。
    4.Vue.delete(targets,propertyName/index)
        删除对象的 property。如果对象是响应式的，确保删除能触发更新视图。这个方法主要用于避开 Vue 不能检测到 property 被删除的限制，但是你应该很少会使用它。
  实例属性：
    1.vm.$data 获取Vue实例的data选项(对象) 
                Vue 实例观察的数据对象。Vue 实例代理了对其 data 对象 property 的访问。
    2.vm.$props
            当前组件接收到的 props 对象。Vue 实例代理了对其 props 对象 property 的访问。
    3.vm.$el(element缩写) 获取Vue实例关联的DOM元素
            类型：string|HTMLElement|Function
            提供一个在页面上已经存在的DOM元素作为Vue实例挂载目标 可以是CSS选择器 也可以是一个HTMLElement实例
            实例挂载之后 元素可以用vm.$el访问
            如果在实例化时存在这个选项 实例将立即进入编译过程 否则 需要显示调用vm.$mount()手动开启编译
                1.提供的元素只能作为挂载点 不同于Vue1.x 所有的挂载元素会被Vue生成的DOM替换 因此。。。
                2.。。。
    4.vm.$options 获取Vue实例的自定义属性
            (如vm.$options.methods获取Vue的自定义属性methods)
            用于当前 Vue 实例的初始化选项。需要在选项中包含自定义 property 时会有用处：
    5.vm.$parent 父实例，如果当前实例有的话。
    6.vm.$root  当前组件树的根 Vue 实例。如果当前实例没有父实例，此实例将会是其自己。
    7.vm.children 当前实例的直接子组件。需要注意 $children 并不保证顺序，也不是响应式的。如果你发现自己正在尝试使用 $children 来进行数据绑定，考虑使用一个数组配合 v-for 来生成子组件，并且使用 Array 作为真正的来源。
    8.vm.$slot 用来访问被插槽分发的内容。每个具名插槽有其相应的 property (例如：v-slot:foo 中的内容将会在 vm.$slots.foo 中被找到)。default property 包括了所有没有被包含在具名插槽中的节点，或 v-slot:default 的内容。
        请注意插槽不是响应性的。如果你需要一个组件可以在被传入的数据发生变化时重渲染，我们建议改变策略，依赖诸如 props 或 data 等响应性实例选项。
    9.vm.$scopeSlots    
        用来访问作用域插槽。对于包括 默认 slot 在内的每一个插槽，该对象都包含一个返回相应 VNode 的函数。
        vm.$scopedSlots 在使用渲染函数开发一个组件时特别有用。
    10.vm.$refs 获取页面中所有含有ref属性的DOM元素
            (如vm.$ref.hello 获取页面中含有属性ref=‘hello’
            的DOM元素 如果有多个元素 那么只返回最后一个)
            一个对象，持有注册过 ref attribute 的所有 DOM 元素和组件实例。
    11.vm.$isServer
        当前 Vue 实例是否运行于服务器。
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
  实例方法/事件：
    1.vm.$on(event,callback)
        监听当前实例上的自定义事件。事件可以由 vm.$emit 触发。回调函数会接收所有传入事件触发函数的额外参数。
    2.vm.$once(event,callback)
        监听一个自定义事件，但是只触发一次。一旦触发之后，监听器就会被移除。
    3.vm.$off([event,callback])
        移除自定义事件监听器。
            如果没有提供参数，则移除所有的事件监听器；
            如果只提供了事件，则移除该事件所有的监听器；
            如果同时提供了事件与回调，则只移除这个回调的监听器。
    4.vm.$emit(eventName,[...args])
        触发当前实例上的事件。附加参数都会传给监听器回调。
  实例方法/生命周期
    1.vm.$mount([elementOrSelector])
        返回值：vm - 实例自身
        用法：
            如果 Vue 实例在实例化时没有收到 el 选项，则它处于“未挂载”状态，没有关联的 DOM 元素。可以使用 vm.$mount() 手动地挂载一个未挂载的实例。
            如果没有提供 elementOrSelector 参数，模板将被渲染为文档之外的的元素，并且你必须使用原生 DOM API 把它插入文档中。
            这个方法返回实例自身，因而可以链式调用其它实例方法。
    2.vm.$forceUpdate()
        迫使 Vue 实例重新渲染。注意它仅仅影响实例本身和插入插槽内容的子组件，而不是所有子组件。
    3.vm.$nextTick([callback])
        将回调延迟到下次 DOM 更新循环之后执行。在修改数据之后立即使用它，然后等待 DOM 更新。它跟全局方法 Vue.nextTick 一样，不同的是回调的 this 自动绑定到调用它的实例上。
    4.vm.$sdestory()
        完全销毁一个实例。清理它与其它实例的连接，解绑它的全部指令及事件监听器。
        触发 beforeDestroy 和 destroyed 的钩子。
        在大多数场景中你不应该调用这个方法。最好使用 v-if 和 v-for 指令以数据驱动的方式控制子组件的生命周期。
24.模板语法
    1.Vue.js 使用了基于 HTML 的模板语法，允许开发者声明式地将 DOM 绑定至底层 Vue 实例的数据。
        所有 Vue.js 的模板都是合法的 HTML，所以能被遵循规范的浏览器和 HTML 解析器解析。
    2.在底层的实现上，
        Vue 将模板编译成虚拟 DOM 渲染render函数。
        结合响应系统，Vue 能够智能地计算出最少需要重新渲染多少组件，并把 DOM 操作次数减到最少。
    3.如果你熟悉虚拟 DOM 并且偏爱 JavaScript 的原始力量，你也可以不用模板
        直接写渲染 (render) 函数，使用可选的 JSX 语法
25.object.defineProperty(obj,prop,descriptor)
    参数:(三个参数都是必填)
        obj:要定义属性的对象
        prop:要定义或修改的属性的名称或Symbol
        descriptor：要定义或修改的属性描述符
    返回值:
        被传递给函数的对象
    备注：
        ES6中 由于Symbol类型的特殊性
        用Symbol类型的值来做对象的key与常规的定义或修改不同 
        Object.defineProperty
        是定义key为Symbol的属性的方法之一
    描述：
        (默认情况下/使用object.defineProperty()添加的属性值是不可修改的)
        该方法允许精确地添加或修改对象的属性
        通过赋值操作添加的普通属性是可枚举地 
        在枚举对象属性时会被枚举到(for ..in object.keys)
        可以修改这些属性的值 也可以删除这些属性
        这个方法允许修改默认的额外选项/配置

        对象里目前存在的属性描述符(descriptor)有两种主要形式(都是对象) 
            (一个描述符只能是两者之一)
            1.数据描述符(具有值的属性/该值可写/可不写)
                具有值的属性 该值可以是可写的 也可以是不可写的
            2.存取描述符(由getter/setter函数所描述的属性)
                由getter函数和setter函数所描述的属性
            3.两种描述符都是对象 它们共享以下可选键值
                (默认值是指在使用object.defineProperty()定义属性时的默认值)
                1.共享可选键值：
                    configurable:
                        (不设置默认为false 第一次设置false后 第二次不可设置 会报错)
                        (表示对象的属性是否可以被删除 除了value writable特性之外的其他特性是否可以被修改)
                        (在非严格模式下，属性配置configurable:false后进行删除操作会发现属性仍然存在严格模式下会抛出错误：)
                        当且仅当该属性的 configurable 键值为 true 时，该属性的描述符才能够被改变，同时该属性也能从对应的对象上被删除。
                    enumerable:(默认为false)
                        (定义对象的属性是否可以在for..in和Object.keys()中被枚举)
                        当且仅当该属性的 enumerable 键值为 true 时，该属性才会出现在对象的枚举属性中。
                2.数据描述符可选键值value/writable
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
26.Proxy与Object.defineProperty
    1.Proxy(代理器 目标对象之前架设一层拦截 外界对该对象的访问 都必须先通过这层拦截)
        (原意代理 此处表示由它代理某些操作 可译为代理器)
        在目标对象之前架设一层“拦截”，外界对该对象的访问，都必须先通过这层拦截，
        因此提供了一种机制，可以对外界的访问进行过滤和改写。        
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
            兼容性好，支持 IE9，而 Proxy 的存在浏览器兼容性问题,而且无法用 polyfill 磨平
            因此 Vue 的作者才声明需要等到下个大版本( 3.0 )才能用 Proxy 重写。
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
        Vue3新特性：(目标让 Vue 核心变得更小、更快、更强大)
            1.监测机制的改变
            2.模板
            3.对象式的组件声明
            4.其他方面的更改
        Reflect：   
            翻译过来是反射的意思，与Proxy对象一样，也是 ES6 为了操作对象而提供的新 API。有一下几个作用
            1.将Object对象的一些明显属于语言内部的方法(如Object.defineProperty)放到Reflect对象上
            2.修改某些Object方法的返回结果，让其变得更合理。
            3.让Object操作都变成函数行为。某些Object操作是命令式，比如name in obj和delete obj[name]，而Reflect.has(obj, name)和Reflect.deleteProperty(obj, name)让它们变成了函数行为。
            4.Reflect对象的方法与Proxy对象的方法一一对应，只要是Proxy对象的方法，就能在Reflect对象上找到对应的方法。这就让Proxy对象可以方便地调用对应的Reflect方法，完成默认行为，作为修改行为的基础。也就是说，不管Proxy怎么修改默认行为，你总可以在Reflect上获取默认行为。
27.双向绑定
    1.三种实行方法：
        目前几种主流的mvc(vm)框架都实现了单向数据绑定，
        而我所理解的双向数据绑定无非就是在单向绑定的基础上给可输入元素（input、textare等）添加了change(input)事件，来动态修改model和 view，并没有多高深。所以无需太过介怀是实现的单向或双向绑定。
        1.发布者-订阅者模式(backbone.js)
            一般通过sub, pub的方式实现数据和视图的绑定监听，更新数据方式通常做法是 vm.set('property', value)
        2.脏值检查(angular.js)
            angular.js 是通过脏值检测的方式比对数据是否有变更，来决定是否更新视图，最简单的方式就是通过 setInterval() 定时轮询检测数据变动，当然Google不会这么low，angular只有在指定的事件触发时进入脏值检测，大致如下：
                1.DOM事件，譬如用户输入文本，点击按钮等。( ng-click )
                2.XHR响应事件 ( $http )
                3.浏览器Location变更事件 ( $location )
                4.Timer事件( timeout ,interval )
                5.执行 digest() 或apply()
        3.数据劫持(vue.js)
            vue.js 则是采用数据劫持(Object.defineProperty()来劫持)结合发布者-订阅者模式的方式.
            通过Object.defineProperty()来劫持各个属性的setter，getter，在数据变动时发布消息给订阅者，触发相应的监听回调。
    2.Vue中的双向绑定(数据<=>视图)
        1.Vue2.x
            (原理:通过Object对象的defineProperty属性 重写data的set和
            get函数实现)
            (原理 数据劫持+发布者-订阅者模式 
            Object.defineProperty()劫持各个属性setter getter
            数据变动时发布消息给订阅者 
            触发相应监听回调
            )
            步骤：
                1.实现一个监听器Observer:
                    对数据对象进行遍历，包括子属性对象的属性，利用 Object.defineProperty() 对属性都加上 setter 和 getter。这样的话，给这个对象的某个值赋值，就会触发 setter，那么就能监听到了数据变化。
                2.实现一个解析器Compile
                    解析 Vue 模板指令，将模板中的变量都替换成数据，然后初始化渲染页面视图，并将每个指令对应的节点绑定更新函数，添加监听数据的订阅者，一旦数据有变动，收到通知，调用更新函数进行数据更新。
                3.实现一个订阅者Watcher
                    Watcher 订阅者是 Observer 和 Compile 之间通信的桥梁 ，主要的任务是订阅 Observer 中的属性值变化的消息，当收到属性值变化的消息时，触发解析器 Compile 中对应的更新函数。
                4.实现一个订阅器Dep
                    订阅器采用 发布-订阅 设计模式，用来收集订阅者 Watcher，对监听器 Observer 和 订阅者 Watcher 进行统一管理。
            对IE的兼容
                不支持ie8及以下，部分兼容ie9 ，完全兼容10以上，
                因为vue的响应式原理是基于es5的Object.defineProperty()
                而这个方法不支持ie8及以下。
        2.Vue3.x
        (Proxy)
        3.实现对象和数组的监听( JavaScript 的限制，Vue 不能检测数组和对象的变化)
            JavaScript 的限制：
                bject.defineProperty() 
                只能对属性进行数据劫持，不能对整个对象进行劫持，同理无法对数组进行劫持
                Vue 能检测到对象和数组（部分方法的操作）的变化
                对象和数组的监听：
                    通过遍历数组 和递归遍历对象
                    达到利用 Object.defineProperty() 也能对对象和数组（部分方法的操作）进行监听。
            对象：
                1.Vue.set(object, propertyName, value)
                参数1： 要修改的对象
                参数2： 属性
                参数3： 属性的值是啥
                返回值：已经修改好的值
                Vue.set(vm.someObject, 'b', 2)
                2.vm.$set
                    this.$set(this.someObject,'b',2)
                    vm.$set实现原理:
                        1.如果目标是数组，直接使用数组的 splice 方法触发相应式；  
                        2.如果目标是对象，会先判读属性是否存在、对象是否是响应式.
                        最终如果要对属性进行响应式处理，则是通过调用   defineReactive 方法进行响应式处理（ defineReactive 方法就是  Vue 在初始化对象时，给对象属性采用 Object.defineProperty 动态添加 getter 和 setter 的功能所调用的方法）
                3.replace方法
                4.多个新 property
                    原对象与要混合进去的对象的 property 一起创建一个新的对象
                    this.someObject = Object.assign({}, this.someObject, { a: 1, b: 2 })
                    代替 `Object.assign(this.someObject, { a: 1, b: 2 })`
            数组：
                    Vue 不能检测以下数组的变动：
                    1.当你利用索引直接设置一个数组项时，例如：vm.items[indexOfItem] = newValue
                    2.当你修改数组的长度时，例如：vm.items.length = newLength
                第一类问题解决方法：
                    1.Vue.set
                    Vue.set(vm.items, indexOfItem, newValue)
                    vm.$set(vm.items, indexOfItem, newValue)

                    2.Array.prototype.splice
                    vm.items.splice(indexOfItem, 1, newValue)
                第二类问题解决方法：
                    1.splice   
                    vm.items.splice(newLength)
    3.Vue父子组件双向绑定的方法有哪些？
        1.通过在父组件上自定义一个监听事件<myComponent @diy="handleDiy"></myComponent>,在子组件用this.$emit('diy',data)来触发这个diy事件，其中data为子组件向父组件通信的数据,在父组件中监听diy个事件时，可以通过$event访问data这个值。
        2.通过在父组件上用修饰符.sync绑定一个数据<myComponent :show.sync="show"></myComponent>,在子组件用this.$emit('update:show',data)来改变父组件中show的值。
        3.通过v-model。
28.Vue中操作data中数组的方法中哪些可以触发视图更新，哪些不可以，不可以的话有什么解决办法？
    触发视图更新：
    1.push()、pop()、shift()、unshift()、splice()、sort()、reverse()这些方法会改变被操作的数组；
    2.filter()、concat()、slice()这些方法不会改变被操作的数组，返回一个新的数组；
    不触发视图更新：
        1.利用索引直接设置一个数组项，例：this.array[index] = newValue
        2.直接修改数组的长度，例：this.array.length = newLength
    解决方法：
        1.this.$set(this.array,index,newValue)
          this.array.splice(index,1,newValue)解决方法1
        2.this.array.splice(newLength)解决方法2
29.mixin混入
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
30.过滤器
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
31.Vue单向数据流
        单向数据流
        (数据流是单向的/数据流动方向可以跟踪/流动单一/追查问题时可以更快捷)
        (每次父组件发生更新 子组件中所有prop都会刷新为最新的值)
        1.所有的 prop 都使得其父子 prop 之间形成了一个单向下行绑定：
            父级 prop 的更新会向下流动到子组件中，但是反过来则不行。这样会防止从子组件意外改变父级组件的状态，从而导致你的应用的数据流向难以理解。
        2.每次父级组件发生更新时，子组件中所有的 prop 都将会刷新为最新的值。
            这意味着你不应该在一个子组件内部改变 prop。如果你这样做了，Vue 会在浏览器的控制台中发出警告。子组件想修改时，只能通过 $emit 派发一个自定义事件，父组件接收到后，由父组件修改。 
        有两种常见的试图改变一个 prop 的情形 : 
            1.这个 prop 用来传递一个初始值；这个子组件接下来希望将其作为一个本地的 prop 数据来使用。 在这种情况下，最好定义一个本地的 data 属性并将这个 prop 用作其初始值：
            2.这个 prop 以一种原始的值传入且需要进行转换。 在这种情况下，最好使用这个 prop 的值来定义一个计算属性
        缺点：
            写起来不太方便 要使UI发生变更就必须创建各种 action 来维护对应的 state
            
32.Vue一些指令(directive)及具体作用
        指令 (Directives)：
            是带有 v- 前缀的特殊 attribute。
            指令 attribute 的值预期是单个 JavaScript 表达式 (v-for 是例外情况，稍后我们再讨论)。
            指令的职责是，当表达式的值改变时，将其产生的连带影响，响应式地作用于 DOM。
        1.v-html/v-text(可简写为{{}}并支持逻辑运算)
            v-html:
                会以html的方式把内容载入页面中
                浏览器会将其当作html标签解析后输出
                会有XSS攻击分析，不要用在用户提交内容上；
            v-text：(单向绑定 数据对象=>插值)
                操作纯文本 浏览器不会再对其进行html解析
                会把全部内容转化为字符串
                注:vue中有个指令叫做 v-once 可以通过v-once与v-text结合，实现仅执行一次性的插值
        2.v-show/v-if(v-else-if/v-else)
            v-show:
                切换元素的display属性,来控制元素显示隐藏
                初始化会渲染，
                适用频繁显示隐藏的元素,
                不能用在<template>上；
                不支持 v-else
            v-if:
                通过销毁并重建组件，来控制组件显示隐藏，
                初始化不会渲染，
                不适用频繁显示隐藏的组件，
                可以用在<template>上。
                支持 v-else
        3.v-on(@)/v-bind(:)/v-model
            1.v-on(用于绑定HTML事件 缩写@) 
                对象同时绑定多个事件时 不能用@代替v-on
                v-on后面接一个对象，但是不支持事件修饰符。
            2.v-bind(用于设置HTML属性 缩写:)
                多标签的页面也可以使用is特性来切换不同的组件
                主要用于属性绑定 如class/style/value/href等
            3.v-model(表单控件元素上创建双向数据绑定 作用于表单控件外的标签没有用)
                双向绑定(JS中Vue实例中data<=>其渲染DOM元素上内容)
                原理：
                    vue 项目中主要使用 v-model 指令在表单 input、textarea、select 等元素上创建双向数据绑定。v-model 本质上不过是语法糖，v-model 在内部为不同的输入元素使用不同的属性并抛出不同的事件：
                1.text 和 textarea 元素使用 value 属性和 input 事件；下
                2.checkbox 和 radio 使用 checked 属性和 change 事件；
                3.select 字段将 value 作为 prop 并将 change 作为事件。
                修饰符
                    v-model.lazy懒监听、
                    v-model.number将值转成有效的数字、v-model.trim过滤首尾空格；
            4.v-bind与v-model区别
                1:v-bind动态绑定指令，默认情况下标签自带属性的值是固定的，在为了能够动态的给这些属性添加值，可以使用v-bind:你要动态变化的值="表达式"
                2:v-bind用于绑定属性和数据 ，其缩写为“ : ” 也就是v-bind:id  === :id  
                3:v-model用在表单控件上的，用于实现双向数据绑定，所以如果你用在除了表单控件以外的标签是没有任何效果的。
        4.v-for
            key作用：key要为数据中每项特定值比如ID
                (主要用在 Vue 的虚拟 DOM diff算法)
                主要用在 Vue 的虚拟 DOM diff算法 
                新旧 nodes 对比时辨识 VNodes。
                如果不使用 key，Vue 会使用一种最大限度减少动态元素并且尽可能的尝试就地修改/复用相同类型元素的算法。
                而使用 key 时，它会基于 key 的变化重新排列元素顺序，并且会移除 key 不存在的元素。
                有相同父元素的子元素必须有独特的 key。重复的 key 会造成渲染错误。
                最常见的用例是结合 v-for：
            key的使用：
                1.必须指定 
                2.唯一的字符串string/数字number类型:key 值
                3.必须使用v-bind属性绑定的形式指定key的值
            1.v-for循环普通数组
            2.v-for循环对象数组
            3.v-for循环对象
            4.v-for迭代数字
        5.v-once
            只渲染元素和组件一次。
            随后的重新渲染，元素/组件及其所有的子节点将被视为静态内容并跳过,用于优化更新性能;
            组件中有大量的静态的内容可以使用这个指令。
        6.v-per
            跳过这个元素和它的子元素的编译过程。可以用来显示原始Mustache标签。跳过大量没有指令的节点会加快编译;
        7.v-slot
        8.v-cloak：
            可以解决在页面渲染时把未编译的 Mustache 标签（{{value}}）给显示出来。
        9.v-pre：
            跳过这个元素和它的子元素的编译过程。可以用来显示原始Mustache标签。跳过大量没有指令的节点会加快编译。 <span v-pre>{{ this will not be compiled }}</span>
        10.3.v-if和v-for
            (优先级高 使用v-for遍历对象时 按Object.keys()的顺序的遍历，转成数组保证顺序)
                1.处于同一节点，v-for的优先级比v-if更高
                这意味着v-if将分别重复运行于每个v-for循环中。
                当你只想为部分项渲染节点时，这种优先级的机制会十分有用。
                <ul>
                    <li v-for="item in items" v-if="item.show">{{item}}</li>
                </ul>
                2.如果你的目的是有条件地跳过循环的执行，那么可以将 v-if 置于外层元素 (或 <template>)上。
                <ul v-if="items.length">
                    <li v-for="item in items">{{item}}</li>
                </ul>
                你也可以用 of 替代 in 作为分隔符，因为它更接近 JavaScript 迭代器的语法：
                <div v-for="item of items"></div>
                使用v-for遍历对象时 按Object.keys()的顺序的遍历，转成数组保证顺序。
33.Vue中的template
    template的作用是模板占位符，可帮助我们包裹元素，但在循环过程当中，template不会被渲染到页面上
    template标签内容天生不可见，设置了display：none；
    要操作template标签内部的dom必须要用下面的方法–content属性：
    三种写法：(字符串模板/template标签/script标签)
        1.字符串模板写法(直接写在vue 构造器中)
            这种写法比较直观,适用于html代码不多的场景,但是如果模板里html代码太多,不便于维护,不建议这么写.
        2.写在template标签里,这种写法跟写html很像.
        3.写在script标签里,这种写法官方推荐,vue官方推荐script中type属性加上"x-template"        
34.vue中的slot
    插槽使用在子组件中
    目的：将父组件中的子组件模板数据正常显示
    (单个插槽|默认插槽|匿名插槽/具名插槽/作用域插槽(子组件给父组件传参 父组件决定如何展示))
    1.单个插槽|默认插槽|匿名插槽
        (不用设置name属性)
        单个插槽可以放置在组件的任意位置 
        一个组件中只能有一个该类插槽。
    2.具名插槽 <slot name="up"></slot>
        有name属性 
        可以在一个组件中出现N次，出现在不同的位置
        父组件通过html模板上的slot属性关联具名插槽。没有slot属性的html模板默认关联匿名插槽。
    3.作用域插槽 | 带数据的插槽 slot-scopes
        (作用域插槽就是子组件可以给父组件传参，
        父组件决定怎么展示)
        前面两种，都是在组件的template里面写
        作用域插槽要求，在slot上面绑定数据
        父组件只需要提供一套样式（在确实用作用域插槽绑定的数据的前提下）。
        数据使用的都是子组件插槽自己绑定的那个数组
35.Vue中的component
    (组件是可复用的 Vue 实例，且带有一个名字：)
    (el是根实例特有的选项)
    每用一次组件，就会有一个它的新实例被创建。
    一个组件的 data 选项必须是一个函数
    (每个实例可以维护一份被返回对象的独立的拷贝)
    定义组件名的方式(两种):
    1.使用 kebab-case(短横线分隔命名)
        须在引用这个自定义元素时使用 kebab-case，例如 <my-component-name>。
    2.使用 PascalCase(首字母大写命名)
        <my-component-name> 和 <MyComponentName> 
        都是可接受的
        直接在 DOM (即非字符串的模板) 中使用时只有 kebab-case(短横线分隔命名) 是有效的
    name作用：
        1.递归组件时，组件调用自身使用；
        2.用is特殊特性和component内置组件标签时使用；
        3.keep-alive内置组件标签中include 和exclude属性中使用。
    销毁：
        1.没有使用keep-alive时的路由切换；
        2.v-if='false'；
        3.执行vm.$destroy()；
    1.全局注册
    (全局注册的行为必须在根 Vue 实例 (通过 new Vue) 创建之前发生。)
        Vue.component('my-component-name', {
        // ... options ...
        })
        缺点：
            你使用一个像 webpack 这样的构建系统，全局注册所有的组件意味着即便你已经不再使用一个组件了，它仍然会被包含在你最终的构建结果中。这造成了用户下载的 JavaScript 的无谓的增加。
    2.局部注册(局部注册的组件在其子组件中不可用) 
        1.通过一个普通的 JavaScript 对象来定义组件：
        var ComponentA = { /* ... */ }
        2.在 components 选项中定义你想要使用的组件：
            new Vue({
            el: '#app',
            components: {
                'component-a': ComponentA,
                'component-b': ComponentB
            }
            })
    3.模块系统局部注册(使用了诸如 Babel 和 webpack 的模块系统)
        1.推荐创建一个 components 目录，并将每个组件放置在其各自的文件中。
        2.局部注册之前导入每个你想使用的组件。
    4.基础组件自动化全局注册
        基础组件，它们会在各个组件中被频繁的用到。
        恰好使用了 webpack (或在内部使用了 webpack 的 Vue CLI 3+)，那么就可以使用 require.context 只全局注册这些非常通用的基础组件
    组件传值：
        父组件-子组件 props
        子组件-父组件 this.$emit()
    命名规范：
        链式命名my-component 驼峰命名MyComponent
    1.在字符串模板中<my-component></my-component> 和 <MyComponent></MyComponent>都可以使用，
    2.在非字符串模板中最好使用<MyComponent></MyComponent>，因为要遵循W3C规范中的自定义组件名
    (字母全小写且必须包含一个连字符)，避免和当前以及未来的 HTML 元素相冲突。
prop:
    1.Prop 的大小写 (camelCase vs kebab-case)
        HTML 中的 attribute 名是大小写不敏感的，所以浏览器会把所有大写字符解释为小写字符。这意味着当你使用 DOM 中的模板时，camelCase (驼峰命名法) 的 prop 名需要使用其等价的 kebab-case (短横线分隔命名) 命名：
        使用字符串模板，那么这个限制就不存在了。

            一个组件默认可以拥有任意数量的 prop，任何值都可以传递给任何 prop。在上述模板中，你会发现我们能够在组件实例中访问这个值，就像访问 data 中的值一样。
        <input v-model="searchText">等价于
        <input
        v-bind:value="searchText"
        v-on:input="searchText = $event.target.value"
        >
        在不同组件之间进行动态切换是非常有用的，
        上述内容可以通过 Vue 的 <component> 元素加一个特殊的 is attribute 来实现：
    单文件组件
        全局注册遇到的问题:
            全局定义 (Global definitions) 强制要求每个 component 中的命名不得重复
            字符串模板 (String templates) 缺乏语法高亮，在 HTML 有多行的时候，需要用到丑陋的 \
            不支持 CSS (No CSS support) 意味着当 HTML 和 JavaScript 组件化时，CSS 明显被遗漏
            没有构建步骤 (No build step) 限制只能使用 HTML 和 ES5 JavaScript，而不能使用预处理器，如 Pug (formerly Jade) 和 Babel
        文件扩展名为 .vue 的 single-file components (单文件组件) 为以上所有问题提供了解决方法，并且还可以使用 webpack 或 Browserify 等构建工具。     
        获得：
            完整语法高亮
            CommonJS 模块
            组件作用域的 CSS
        Node Package Manager (NPM)：阅读 Getting Started guide 中关于如何从注册地 (registry) 获取包的章节。
    局部注册
36.
$route(路由信息对象 包括path params hash query fullPath matched name等路由信息参数) 
$router(vue-router实例对象 包括路由跳转方法/钩子函数)
的区别
        $router(vue-router实例对象 包括路由跳转方法 钩子函数)
        $router(vue-router实例对象 包括路由跳转方法 钩子函数)
            为 VueRouter 实例，想要导航到不同 URL，则使用 $router.push
            是VueRouter的一个对象，通过Vue.use(VueRouter)和Vu构造函数得到一个router的实例对象，这个对象中是一个全局的对象，他包含了所有的路由，包含了许多关键的对象和属性。
            以history对象来举例：
            $router.push({path:'home'})，本质是向history栈中添加一个路由，在我们看来是切换路由，但本质是在添加一个history记录 
        $route(路由信息对象 包括path params hash query fullPath matched name等路由信息参数) 
        $route(路由信息对象 包括path params hash query fullPath matched name等路由信息参数)
            $route是一个跳转的路由对象，每一个路由都会有一个$route对象，是一个局部的对象，可以获取对应的name，path，params，query等 
            为当前 router 跳转对象里面可以获取 name 、 path 、 query 、 params 等
            $route.path 字符串，等于当前路由对象的路径，会被解析为绝对路径，如/home/ews
            $route.params 对象，含路有种的动态片段和全匹配片段的键值对，不会拼接到路由的url后面
            $route.query 对象，包含路由中查询参数的键值对。会拼接到路由url后面
            $route.router 路由规则所属的路由器
            $route.matchd 数组，包含当前匹配的路径中所包含的所有片段所对象的配置参数对象
            $route.name 当前路由的名字，如果没有使用具体路径，则名字为空
37.vue-router使用
query(path引入 接参 this.$route.query.name 类似get传参 参数地址栏显示 拼接在url后面的参数，没有也没关系 不设置 没关系)
params(name引入 接参 this.$route.params.name 类似post传参 参数地址栏不显示 是路由的一部分 必须要有 不设置 刷新页面或者返回参数会丢失)
传参区别
        1.用法上(接收参数的时候，已经是$route而不是$router)
            query要用path来引入，params要用name来引入
            接收参数都是类似的，分别是
            this.$route.query.name和
            this.$route.params.name。
            注：接收参数的时候，已经是$route而不是$router
        2.展示上
            query更加类似于我们ajax中get传参
            params则类似于post，说的再简单一点，前者在浏览器地址栏中显示参数，后者则不显示
        3.params是路由的一部分,必须要有。
          query是拼接在url后面的参数，没有也没关系。
            params一旦设置在路由，params就是路由的一部分，如果这个路由有params传参，但是在跳转的时候没有传这个参数，会导致跳转失败或者页面会没有内容。
        4.params、query不设置也可以传参，params不设置的时候，刷新页面或者返回参数会丢失 query则不会有这个问题        
38.
Vue-router(SPA single page application的路径管理器 WebApp的链接路径管理系统)

hash模式(浏览器环境) 
history模式 
abstract模式(Nodejs环境)

SPA(hash模式/history模式)
(Vue的单页面应用是基于路由和组件的 
路由用于设定访问路径 
并将路径和组件映射起来)
(SPA核心之一 更新视图而不重新请求页面)
(SPA加载页面时
不会加载整个页面
而是只更新某个指定的容器中内容)
(传统的页面应用 
超链接实现页面切换跳转
vue-router单页面应用/路径/组件的切换)
(路由模块本质 建立起URL和页面之间映射关系)
(vue-router
实现SPA单页面前端路由 
提供两种方式
(mode参数决定)：
(Hash模式 Vue-router模式/
History模式 依赖H5 History API&服务器配置)

(abstract 支持所有JS运行环境 如Node.js服务器端 如果发现没有浏览器API 路由会强制进入这个模式)
(Vue在实现单页面前端路由时 提供两种方式 hash/history)
(Vue-router比SPA多一个模式 abstract)

(Hash模式 原理onhashchange事件 window对象上监听这个事件)
(Vue-router默认模式)
(1.URL的hash模拟一个完整URL URL改变 页面不重新加载 hash(#)是URL锚点 代表网页中一个位置)
(2.Hash出现在URL中 不会被包含在HTTP中 对后端没有影响 改变Hash不会重新加载页面(原因) 会在浏览器访问历史中增加一个记录)
(3.Hash通过锚点值的改变 根据不同的值 渲染指定DOM位置不同数据)

(History模式 利用了H5 API新增的pushState()方法和replaceState方法 提供对历史记录修改功能) 
(1.利用H5 History Interface中新增pushState()和replaceState()方法 用于浏览器记录栈
在当前已有back() forward() go()基础上 提供对历史记录修改)
(2.需要后端配置支持 服务器添加一个覆盖所有情况的候选项 URL匹配不到静态资源 则返回一个index.html页面)
(3.解决Hash模式存在问题 Hash传参基于URL 如要传递复杂数据 会有体积限制 history模式可在UR里传参/可将数据存放到一个特定对象)    

(vue-router使用路由模块实现页面跳转三种方式
    1.直接修改地址栏
    2.编程式的导航 this.$router.push(‘路由地址’)
    3.声明式的导航 <router-link to="路由地址"></router-link>
)
(vue-router参数传递
    1.name-params/path-query传递参数
        路由文件src/router/index.js里配置name属性
        模板里(src/App.vue)用$route.name来接收 比如：<p>{{ $route.name}}</p>
    2.<router-link> 标签中的to传参
        <router-link :to="{name:xxx,params:{key:value}}">valueString</router-link>
        ...
    3.利用url传参----在配置文件里以冒号的形式设置参数。   
)
($router.push和$router.replace的区别：
    会向history 栈添加一个新的记录 点击浏览器的返回按钮时可以看到之前的页面。
    不会向 history 添加新记录，而是替换掉当前的 history 记录，即当replace跳转到的网页后，‘后退’按钮不能查看之前的页面。
)
(abstract 支持所有JavaScript运行环境 如Node.js服务器端 如果发现没有浏览器的API 路由会强制进入这个模式)
(vue-router在实现单页面前端路由时，提供两种方式
Vue路由有三种模式 比SPA多了一个abstract)
(不能用a标签 Vue做的都是单页应用（当你的项目准备打包时，运行npm run build时，就会生成dist文件夹，里面只有静态资源和一个index.html页面），所以你写的标签是不起作用的，你必须使用vue-router来进行管理。)
    1.url组成
        协议部分、域名部分、端口部分、虚拟目录部分、文件名部分、参数部分、锚部分
        url的锚部分是从“#”开始到最后，都是锚部分。锚部分不是url的必需部分。
        url的参数部分是从“？”开始到“#”为止之间的部分。参数部分也不是url的必需部分。
    1.前端路由(vue-router)
        vue-router 此处的路由不是指我们平时所说的硬件路由器 是SPA（单页应用）的路径管理器
        WebApp的链接路径管理系统。
        使用Vue+vue-router创建单页应用SPA十分简单
        router是Vue.js官方的路由插件，它和vue.js是深度集成的，适合用于构建单页面应用。
        vue-router提供的功能是将组件映射到路由, 然后渲染出来. 
        (Vue-router两个需求
            1.记录当前页面的状态
            2.可以使用浏览器的前进后退功能
        Vue-router为了满足以上两个需求实现以下三个功能
            1.改变URL且不让浏览器向服务器发出请求
            2.检测URL的改变
            3.截获URL地址, 并解析出需要的信息来匹配路由规则)
    2.hash模式(使用URL hash值来做路由 支持所有浏览器 包括不支持HTML5 History API的浏览器)
        使用 URL 的 hash 来模拟一个完整的 URL，于是当 URL 改变时，页面不会重新加载。 
        hash（#）是URL 的锚点，代表的是网页中的一个位置，单单改变#后的部分，浏览器只会滚动到相应位置，不会重新加载网页，也就是说hash 出现在 URL 中，但不会被包含在 http 请求中，对后端完全没有影响，因此改变 hash 不会重新加载页面；同时每一次改变#后的部分，都会在浏览器的访问历史中增加一个记录，使用”后退”按钮，就可以回到上一个位置；所以说Hash模式通过锚点值的改变，根据不同的值，渲染指定DOM位置的不同数据。hash 模式的原理是 onhashchange 事件(监测hash值变化)，可以在 window 对象上监听这个事件。

        0.Location接口的hash属性返回一个USVString其中包含 #和后面URL片段标识符被称为hash
        特点：
            1.在第一个#后面出现的任何字符 都会被浏览器解读为位置标识符 即这些字符都不会被发送到服务器端
            2.单单改变#后的部分 浏览指挥滚动到相应位置 不会重新加载网页
            3.每一次改变#后的部分 都会在浏览器的访问历史中增加一个记录 使用后退按钮就可以返回上一个位置
            4.可通过window.location.hash属性读取hash值 并且window.location.hash这个属性可读可写
            5.使用window.addEventListener('hashchange',fun)可以监听hash变化
        vue-router源码对/src/history/hash.js的处理
            1.使用window.addEventListener('hashchange',fun)监听路由的变化 然后使用transitionTo方法更新视图
            2.vue-router 的2个主要API push 和 replace 也是简单处理了下 hash , 然后调用 transitionTo 方法更新视图
        1.hash表示的是地址栏URL中#符号(也称作为锚点), hash虽然会出现在URL中, 但是不会被包含在Http请求中, 因此hash值改变不会重新加载页面.
        2.由于hash值变化不会引起浏览器向服务器发出请求, 而且hash改变会触发hashchange事件, 浏览器的进后退也能对其进行控制, 所以在HTML5之前, 基本都是使用hash来实现前端路由.
        实现原理:
                早期的前端路由的实现就是基于 location.hash 来实现的。其实现原理很简单，location.hash 的值就是 URL 中 # 后面的内容。比如下面这个网站，它的 location.hash 的值为 '#search'：
    3.history模式(依赖HTML5 History API和服务器配置)
        HTMLHistory基本知识:
            1.History 接口允许操作浏览器的曾经在标签页或者框架里访问的会话历史记录。
            2.使用 back(),  forward()和  go() 方法来完成在用户历史记录中向后和向前的跳转。
            3.HTML5引入了 history.pushState() 和 history.replaceState() 方法，它们分别可以添加和修改历史记录条目。
        vue-router源码对/src/history/html5.js处理
            1.处理逻辑和 hash 相似，使用 window.addEventListener("popstate", fun) 监听路由的变化,
            2.使用 transitionTo 方法更新视图
        1.利用了HTML5新增的pushState()和replaceState()两个api, 通过这两个api完成URL跳转不会重新加载页面
        2.同时history模式解决了hash模式存在的问题. hash的传参是基于URL的, 如果要传递复杂的数据, 会有体积限制, 而history模式不仅可以在URL里传参, 也可以将数据存放到一个特定的对象中
    4.abstract(支持所有JavaScript运行环境 如Node.js服务器端 如果发现没有浏览器的API 路由会强制进入这个模式)
        对/src/history/abstract.js处理
        首先定义了2个变量，stack 来记录调用的记录， index 记录当前的指针位置
        首先定义了2个变量，stack 来记录调用的记录， index 记录当前的指针位置
    5.SPA(更新视图但不重新请求页面)单页面应用路由有两种模式 hash和history 
        单一页面应用程序，只有一个完整的页面；它在加载页面时，不会加载整个页面，而是只更新某个指定的容器中内容。
        单页面应用(SPA)的核心之一是: 更新视图而不重新请求页面
        vue-router在实现单页面前端路由时，提供了两种方式：Hash模式和History模式；根据mode参数来决定采用哪一种方式。
        Vue路由有三种模式 比SPA多了一个abstract
        Vue-router中通过mode这个参数修改路由模式
        默认使用的是 hash 模式，当设置为 history 时，如果不支持 history 方法，也会强制使用 hash 模式。 当不在浏览器环境，比如 node 中时，直接强制使用 abstract 模式。
    5.1SPA Vue单页面应用 和传统页面应用的区别
        vue的单页面应用是基于路由和组件的，路由用于设定访问路径，并将路径和组件映射起来。传统的页面应用，是用一些超链接来实现页面切换和跳转的。
        在vue-router单页面应用中，则是路径之间的切换，也就是组件的切换
        路由模块的本质 就是建立起url和页面之间的映射关系。
    6.hash模式/history模式实现Vue-router跳转API区别
    7.总结：
        1.hash 和 history 的使用方式差不多，hash 中路由带 # ，但是使用简单，不需要服务端配合，站在技术角度讲，这个是配置最简单的模式，本人感觉这也是 hash 被设为默认模式的原因
        2.history 模式需要服务端配合处理404的情况(在路由跳转的时候，就会出现访问不到静态资源而出现 404 的情况，这时候就需要服务端增加一个覆盖所有情况的候选资源：如果 URL 匹配不到任何静态资源，则应该返回同一个 index.html 页面)，但是路由中不带 # ，比 hash 美观一点。
        3.abstract 模式没有使用浏览器api，可以放到node环境或者桌面应用中， 本人感觉是对 spa应用 的兜底和能力扩展。
    8.可以使用vue-router的history模式 url不带#
        new Router({
            mode: 'history',
            routes: [ ]
        })    
    9.为啥不能用a标签
        用Vue做的都是单页应用（当你的项目准备打包时，运行npm run build时，就会生成dist文件夹，这里面只有静态资源和一个index.html页面），所以你写的标签是不起作用的，你必须使用vue-router来进行管理。
39.SPA 单页面的理解 优缺点 优化首屏加载速度慢的问题
        SPA（ single-page application ）
            (仅在Web页面初始化时加载/页面加载完成后/利用路由机制实现HTML内容变换)
            仅在 Web 页面初始化时加载相应的 HTML、JavaScript 和 CSS。
            一旦页面加载完成，SPA 不会因为用户的操作而进行页面的重新加载或跳转；
            取而代之的是利用路由机制实现 HTML 内容的变换，UI 与用户的交互，避免页面的重新加载。
        优点：(良好的用户体验/良好的前后端工作分离模式/减轻服务器压力)
            1.良好的交互体验
                用户体验好、快，内容的改变不需要重新加载整个页面，避免了不必要的跳转和重复渲染；
            2.良好的前后端工作分离模式
                前后端职下·责分离，架构清晰，前端进行交互逻辑，后端负责数据处理；
            3.减轻服务器压力
                基于上面一点，SPA 相对对服务器压力小；
        缺点：(SEO难度较高/前进后退管理/初次加载耗时多)
            4.SEO(Search Engine Optimization搜索引擎优化)难度较高
                由于所有的内容都在一个页面中动态替换显示，所以在 SEO 上其有着天然的弱势。
            5.前进、后退管理 
                由于单页应用在一个页面中显示所有的内容
                所以不能使用浏览器的前进后退功能
                所有的页面切换需要自己建立堆栈管理；
            6.初次加载耗时多 
                为实现单页 Web 应用功能及显示效果，需要在加载页面的时候将 JavaScript、CSS 统一加载，部分页面按需加载；
        优化：(减少app.bundle大小
                (将公用的JS库通过script标签引入/
                配置路由时页面和组件使用懒加载方式引入)
              /加一个首屏loading图提升用户体验)
            1.将公用的JS库通过script标签外部引入，减小app.bundel的大小，让浏览器并行下载资源文件，提高下载速度；
            2.在配置路由时，页面和组件使用懒加载的方式引入，进一步缩小 app.bundel 的体积，在调用某个组件时再加载对应的js文件；
            3.加一个首屏 loading 图，提升用户体验；
40.
MVC(Model View Controller)
    View->Controller->Model->View 单向通信
MVP(Model View Presenter) 
    View Model不发生联系 通过Presenter传递 双向通信
    View很薄 不部署任何业务逻辑 称为被动视图
    Presenter很厚 所有业务逻辑都部署于此
MVVM(Model View ViewModel) 
    将Presenter改为ViewModel 其他基本与MVP一致
    View Model不发生联系 通过Presenter传递 双向通信
    (Model数据业务逻辑/View UI数据展示/ViewModel监听Model中数据的改变并控制视图更新处理用户交互操作)
    Model数据模型 数据和业务逻辑在此应用
    View UI视图 负责数据展示
    ViewModel负责监听Model中数据的改变并且控制视图更新 处理用户交互操作

    MVC:(所有通信都是单向的)
        1.通信方式：(单向View->Controller->Model->View)
            1.View(视图 用户页面) 传送指令到 Controller
            2.Controller(控制器 业务逻辑) 完成业务逻辑后，要求 Model 改变状态
            3.Model(模型 数据保存) 将新的数据发送到 View，用户得到反馈
        2.互动模式：(1.View->Controller 2.Controller)
            接收用户指令时 MVC可以分成两种方式 
                1.一种是通过View接受指令 传递给Controller
                2.直接通过controller接受指令
        3.实例Backbone
            (View->Model Controller->View 
            Controller非常薄 路由 Backbone取消Controller 只保留一个router
            View很厚 业务逻辑
            Backbone.js JS的MVC应用框架
            )
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
        MVVM架构下 Model和View并无直接关联 通过ViewModel来进行联系
        Model和ViewModel之间有着双向数据绑定的联系
        因此当Model中的数据改变时会触发View层刷新
        View中由于用户交互操作而改变的数据也会在Model中同步
        这种模式实现了Model和View的数据自动同步 
        因此开发者只需要专注对数据的维护操作即可 而不需要自己操作DOM
        复杂的数据状态维护完全由 MVVM 来统一管理。
        唯一区别：
            它采用双向绑定（data-binding）：View的变动，自动反映在 ViewModel，反之亦然。Angular 和 Ember 都采用这种模式。
        1.各部分之间的通信，都是双向的
        2.采用双向绑定：View 的变动，自动反映在 ViewModel，反之亦然
41.Vue数组中对象删除属性delete和Vue.delete删除数组区别
    delete只是被删除的元素变成了 empty/undefined 其他的元素的键值还是不变。
        delete this.a[1]
        this.$set(this.a)
    Vue.delete直接删除了数组 改变了数组的键值。
        this.$delete(this.b, 1)
42.Vue 组件 data是函数(每个实例可以维护一份被返回对象的独立的拷贝)
43.动态绑定Class和Style(对象语法/数组语法/对象和数组混合/对象和计算属性)
    将test、active、active-click三个className,绑到div上，渲染成<div class="test active active-click"></div>其中test是固定的，active受data中actived控制，active-click受data中actived和clicked控制，请用4种写法实现。
    4种方法
    1.对象语法
    <div class="test" :class="{
  	active: actived ,
  	'active-click': clicked && actived}">
    </div>
    2.数组语法
    <div class="test" :class="[
  	actived? activeClass : '', 
  	clicked && actived ? activeClickClass : '']">
    </div> 
    3.对象和数组混合
    <div :class="[
  	testClass , 
  	{active: actived} , 
   	{'active-click': clicked && actived}
  ]"></div>
    4.对象和计算属性(推荐)
44.computed/methods/watch
    1.
    计算属性computed
    (计算属性是基于它们的响应式依赖进行缓存的,只在相关响应式依赖发生改变时它们才会重新求值)
    (不支持异步 当computed内有异步操作时无效 无法监听数据变化)
    事件methods
    (只要发生重新渲染，method 调用总会执行该函数)
    methods方法 watch属性 不能用this
    this会是undefind,
    因为箭头函数中的this指向的是定义时的this，而不是执行时的this，所以不会指向Vue实例的上下文。
    2.
    computed(缓存结果每次都会重新创建变量/通过return返回)
    (计算属性/依赖多个属性/缓存结果时每次都会重新创建变量/计算开销比较大(计算次数多或者异步处理)/通过return返回)
    watch(直接计算不会创建变量保存结果/不需要return)
    (侦听器/依赖一个属性/直接计算，不会创建变量保存结果/计算开销比较大(计算次数多或者异步处理)/不需要return) 
    在选项参数中指定deep: true 可深度监听
    在选项参数中指定immediate: true将立即以表达式的当前值触发回调。监听后立即调用
    3.computed&watch
    computed(支持缓存/不支持异步)
        1.支持缓存 只有依赖数据发生变化 才会重新进行计算
        2.不支持异步 当computed内有异步操作时无效 无法监听数据变化
        3.computed属性值默认走缓存 计算属性基于它们响应式依赖进行缓存 即基于data中声明过或者父组件传递的props中的数据通过计算得到的值
        4.一个属性由其他属性计算出来 该属性依赖其他属性 是一个多对一/一对多 一般用computed
        5.如果computed属性属性值是函数 则默认会走get方法 函数的返回值就是属性的属性值 在computed中 属性都有一个get和set方法 数据变化时 调用set方法
    watch侦听属性(不支持缓存/支持异步)
        1.不支持缓存 数据变化 会触发相应操作
        2.watch支持异步
        3.监听的函数接收两个参数 第一个参数是最新的值 第二个参数是输入之前的值
        4.当一个属性发生变化时 需要执行对应的操作 一对多
        5.监听数据必须是data中声明过或者父组件传递过来的props中的数据 当数据变化时 触发其他操作 函数有两个参数
            immediate：组件加载立即触发回调函数执行
            deep:深度监听 为了发现对象内部值的变化 复杂类型的数据时使用
                PS：监听数组变动不需要这么做 
                    deep无法监听到数组的变动和对象的新增
                    参考Vue数组 只有以响应式方式触发才会被监听到
44.(computed data props methods 都会被挂载在vm实例上，因此这三个都不能同名。)
45.created和mounted
    1.在created中，页面视图未出现，如果请求信息过多，页面会长时间处于白屏状态，DOM节点没出来，无法操作DOM节点。
    2.在mounted不会这样，比较好。
46.计算属性computed(避免在模板中放入太多的逻辑，导致模板过重且难以维护。)
    特性：
        (计算属性是基于它们的响应式依赖进行缓存的,只在相关响应式依赖发生改变时它们才会重新求值)
    计算属性默认只有 getter，不过在需要时你也可以提供一个 setter：
    原理
        computed 本质是一个惰性求值的观察者。
        computed 内部实现了一个惰性的 watcher,也就是 computed watcher,
        computed watcher 不会立刻求值,同时持有一个 dep 实例。
        其内部通过 this.dirty 属性标记计算属性是否需要重新求值。
        当 computed 的依赖状态发生改变时,就会通知这个惰性的 watcher
        computed watcher 通过 this.dep.subs.length 判断有没有订阅者
        有的话,会重新计算,然后对比新旧值,
        如果变化了,会重新渲染。 
        (Vue 想确保不仅仅是计算属性依赖的值发生变化，而是当计算属性最终计算的值发生变化时才会触发渲染 watcher 重新渲染，本质上是一种优化。)
        没有的话,仅仅把 this.dirty = true。
        (当计算属性依赖于其他数据时，属性并不会立即重新计算，只有之后其他地方需要读取属性的时候，它才会真正计算，即具备 lazy（懒计算）特性。)
47.vue-router源码
    仅展示关键方法 细节处不讨论
    目录结构
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
48.vue原理(手写代码实现数据劫持)
    1.核心点 Object.defineProperty
    2.默认Vue在初始化数据时 
        会给data中的数据使用Object.defineProperty重新定义所有属性 当页面取到对应属性时 会进行依赖收集(收集当前组建的watcher) 如果属性发生变化会通知相关依赖进行更新操作
    3.数组方法的劫持涉及到原型相关知识 
        首先数组实例大部分方法都来源自Array.prototype对象
        这里不能直接篡改Array.prototype对象
        这样会影响所有的数组实例 为避免这种情况
        需要采用原型继承得到一个新的原型对象
49.Vuex(State Getters Mutations Actions Module)
    1.定义:
        一个专为 Vue.js 应用程序开发的状态管理插件。
        每一个 Vuex 应用的核心就是 store（仓库）。
        “store” 基本上就是一个容器，它包含着你的应用中大部分的状态 ( state )。
        它采用集中式存储管理应用的所有组件的状态
        更改状态的唯一方法是提交mutation，
        例this.$store.commit('SET_VIDEO_PAUSE', video_pause，SET_VIDEO_PAUSE为mutations属性中定义的方法
        1.Vuex 的状态存储是响应式的。当 Vue 组件从 store 中读取状态的时候，若 store 中的状态发生变化，那么相应的组件也会相应地得到高效更新。 
    2.改变 store 中的状态的唯一途径就是显式地提交 (commit) mutation。这样使得我们可以方便地跟踪每一个状态的变化。
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
    2.解决问题:
        1.多个组件依赖于同一状态时，对于多层嵌套的组件的传参将会非常繁琐，并且对于兄弟组件间的状态传递无能为力。
        2.来自不同组件的行为需要变更同一状态。以往采用父子组件直接引用或者通过事件来变更和同步状态的多份拷贝。以上的这些模式非常脆弱，通常会导致无法维护的代码。
    3.应用场景:
        1.多个组件依赖于同一状态时。
        2.来自不同组件的行为需要变更同一状态。
    4.如何手动引入:
        1.先安装依赖nnpm install vuex --save
        2.在项目目录src中建立store文件夹
        3.在store文件夹下新建index.js文件,写入
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
        4.main.js文件中引入Vuex
            import Vue from 'vue';
            import App from './App.vue';
            import store from './store';
            const vm = new Vue({
                store:store,
                render: h => h(App)
            }).$mount('#app')
    5.5个核心属性
        1.state、
            状态存储 
            改变Vuex中的状态的唯一途径就是显式地提交 (commit) mutation
            this.$store.commit('SET_NUMBER',10)
        2.getters、
        3.mutations、
        4.actions、
        5.modules 
    6.Vuex中状态是对象时，使用时要注意什么
        对象是引用类型，复制后改变属性还是会影响原始数据，
        这样会改变state里面的状态，是不允许，
        所以先用深度克隆复制对象，再修改。
    7.可以使用mapState辅助函数, 利用对象展开运算符将state混入computed对象中 实现在组件中批量使用Vuex的state状态
        import {mapState} from 'vuex'
        export default{
            computed:{
                ...mapState(['price','number'])
            }
        }
    8.Vuex中要从state派生一些状态出来，且多个组件使用它，该怎么
        1.使用getter属性，相当Vue中的计算属性computed，只有原状态改变派生状态才会改变。
        2.getter接收两个参数，第一个是state，第二个是getters(可以用来访问其他getter)。
        3.组件中可以用计算属性computed通过this.$store.getters.total这样来访问这些派生转态。
    9.怎么通过getter来实现在组件内可以通过特定条件来获取state的状态
        通过让getter返回一个函数，来实现给getter传参。然后通过参数来进行判断从而获取state中满足要求的状态。
        然后在组件中可以用计算属性computed通过this.$store.getters.getTodoById(2)这样来访问这些派生转态。
    10.怎么在组件中批量使用Vuex的getter属性
        使用mapGetters辅助函数, 利用对象展开运算符将getter混入computed 对象中
            import {mapGetters} from 'vuex'
            export default{
                computed:{
                    ...mapGetters(['total','discountTotal'])
                }
            }
    11.怎么在组件中批量给Vuex的getter属性取别名并使用
        使用mapGetters辅助函数, 利用对象展开运算符将getter混入computed 对象中
        import {mapGetters} from 'vuex'
        export default{
            computed:{
                ...mapGetters({
                    myTotal:'total',
                    myDiscountTotal:'discountTotal',
                })
            }
        }
    12.在Vuex的state中有个状态number表示货物数量，在组件怎么改变它。
        1.首先要在mutations中注册一个mutation
        const store = new Vuex.Store({
            state: {
                number: 10,
            },
            mutations: {
                SET_NUMBER(state,data){
                    state.number=data;
                }
            },
        });
        2.在组件中使用this.$store.commit提交mutation，改变number
            this.$store.commit('SET_NUMBER',10)
    14.在组件中多次提交同一个mutation，怎么写使用更方便。
        1.使用mapMutations辅助函数,在组件中这么使用
        import { mapMutations } from 'vuex'
        methods:{
            ...mapMutations({
                setNumber:'SET_NUMBER',
            })
        }
        2.然后调用this.setNumber(10)相当调用this.$store.commit('SET_NUMBER',10)
    15.Vuex中action和mutation有什么区别/共同点
        区别：
            1.action 提交的是 mutation，而不是直接变更状态。mutation可以直接变更状态。
            2.action 可以包含任意异步操作。mutation只能是同步操作。
            3.提交方式不同，action 是用this.$store.dispatch('ACTION_NAME',data)来提交。mutation是用this.$store.commit('SET_NUMBER',10)来提交。
            4.接收参数不同，mutation第一个参数是state，而action第一个参数是context，其包含了
        相同：
            第二参数都可以接收外部提交时传来的参数。
            this.$store.dispatch('ACTION_NAME',data)和
            this.$store.commit('SET_NUMBER',10)
    16.在组件中多次提交同一个action，怎么写使用更方便。
        1.使用mapActions辅助函数,在组件中这么使用
            methods:{
                ...mapActions({
                    setNumber:'SET_NUMBER',
                })
            }
        2.调用this.setNumber(10)相当调用this.$store.dispatch('SET_NUMBER',10)
    17.Vuex中action通常是异步的，那么如何知道action什么时候结束呢？
        1.在action函数中返回Promise，然后再提交时候用then处理
        actions:{
            SET_NUMBER_A({commit},data){
                return new Promise((resolve,reject) =>{
                    setTimeout(() =>{
                        commit('SET_NUMBER',10);
                        resolve();
                    },2000)
                })
            }
        }
        this.$store.dispatch('SET_NUMBER_A').then(() => {
        // ...
        })
    18.Vuex中有两个action，分别是actionA和actionB，其内都是异步操作，在actionB要提交actionA，需在actionA处理结束再处理其它操作，怎么实现？
        1.利用ES6的async和await来实现。
            actions:{
                async actionA({commit}){
                    //...
                },
                async actionB({dispatch}){
                    await dispatch ('actionA')//等待actionA完成
                    // ... 
                }
            }
    19.有用过Vuex模块吗，为什么要使用，怎么使用。
        使用单一状态树，应用的所有状态会集中到一个比较大的对象。当应用变得非常复杂时，store 对象就有可能变得相当臃肿。所以将 store 分割成模块（module）。每个模块拥有自己的 state、mutations、actions、getters，甚至是嵌套子模块，从上至下进行同样方式的分割。
            1.在module文件新建moduleA.js和moduleB.js文件。在文件中写入
                const state={
                    //...
                }
                const getters={
                    //...
                }
                const mutations={
                    //...
                }
                const actions={
                    //...
                }
                export default{
                    state,
                    getters,
                    mutations,
                    actions
                }
            2.index.js引入模块
                import Vue from 'vue';
                import Vuex from 'vuex';
                Vue.use(Vuex);
                import moduleA from './module/moduleA'
                import moduleB from './module/moduleB'
                const store = new Vuex.Store({
                    modules:{
                        moduleA,
                        moduleB
                    }
                })
                export default store
    20.模块中，getter和mutation接收的第一个参数state，是模块的state，也就是局部的state。
    21.模块中，getter和mutation和action中怎么访问全局的state和getter？
        1.在getter中可以通过第三个参数rootState访问到全局的state,可以通过第四个参数rootGetters访问到全局的getter。
        2.在mutation中不可以访问全局的satat和getter，只能访问到局部的state。
        3.在action中第一个参数context中的context.rootState访问到全局的state，context.rootGetters访问到全局的getter。
    22.在组件中怎么访问Vuex模块中的getter和state,怎么提交mutation和action？
        1.直接通过this.$store.getters和this.$store.state来访问模块中的getter和state。
        2.直接通过this.$store.commit('mutationA',data)提交模块中的mutation。
        3.直接通过this.$store.dispatch('actionA,data')提交模块中的action。
    23.用过Vuex模块的命名空间吗？为什么使用，怎么使用。
        1.默认情况下，模块内部的action、mutation和getter是注册在全局命名空间，如果多个模块中action、mutation的命名是一样的，那么提交mutation、action时，将会触发所有模块中命名相同的mutation、action。
        2.这样有太多的耦合，如果要使你的模块具有更高的封装度和复用性，你可以通过添加namespaced: true 的方式使其成为带命名空间的模块。
            export default{
                namespaced: true,
                state,
                getters,
                mutations,
                actions
            }
    24.怎么在带命名空间的模块内提交全局的mutation和action？
        将 { root: true } 作为第三参数传给 dispatch 或 commit 即可。
    this.$store.dispatch('actionA', null, { root: true })
    this.$store.commit('mutationA', null, { root: true })
    25.怎么在带命名空间的模块内注册全局的action？
        actions: {
            actionA: {
                root: true,
                handler (context, data) { ... }
            }
        }
    26.组件中怎么提交modules中的带命名空间的moduleA中的mutationA？
        this.$store.commit('moduleA/mutationA',data)
    27.怎么使用mapState，mapGetters，mapActions和mapMutations这些函数来绑定带命名空间的模块？
        首先使用createNamespacedHelpers创建基于某个命名空间辅助函数
        import { createNamespacedHelpers } from 'vuex';
        const { mapState, mapActions } = createNamespacedHelpers('moduleA');
        export default {
            computed: {
                // 在 `module/moduleA` 中查找
                ...mapState({
                    a: state => state.a,
                    b: state => state.b
                })
            },
            methods: {
                // 在 `module/moduleA` 中查找
                ...mapActions([
                    'actionA',
                    'actionB'
                ])
            }
        }
    28.Vuex插件有用过吗？怎么用简单介绍一下？
        Vuex插件就是一个函数，它接收 store 作为唯一参数。在Vuex.Store构造器选项plugins引入。 
        1.在store/plugin.js文件中写入
            export default function createPlugin(param){
                return store =>{
                    //...
                }
            }
        2.然后在store/index.js文件中写入
            import createPlugin from './plugin.js'
            const myPlugin = createPlugin()
            const store = new Vuex.Store({
            // ...
            plugins: [myPlugin]
            })
    29.Vuex插件中怎么监听组件中提交mutation和action？
        1.用Vuex.Store的实例方法subscribe监听组件中提交mutation
        2.用Vuex.Store的实例方法subscribeAction监听组件中提交action 在store/plugin.js文件中写入
    30.在v-model上怎么用Vuex中state的值？
        需要通过computed计算属性来转换。
        <input v-model="message">
            // ...
            computed: {
                message: {
                    get () {
                        return this.$store.state.message
                    },
                    set (value) {
                        this.$store.commit('updateMessage', value)
                    }
                }
            }
    31.Vuex的严格模式是什么,有什么作用,怎么开启？
        在严格模式下，无论何时发生了状态变更且不是由 mutation函数引起的，将会抛出错误。这能保证所有的状态变更都能被调试工具跟踪到。
        在Vuex.Store 构造器选项中开启,如下
        const store = new Vuex.Store({
            strict:true,
        })
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
    2.配置404页面
        const router = new VueRouter({
            routes: [
                {
                    path: '*', redirect: {path: '/'}
                }
            ]
        })
    3.切换路由时 实现保存草稿的功能
        <keep-alive :include="include">
            <router-view></router-view>
        </keep-alive>
        include可以是个数组，数组内容为路由的name选项的值。
    4.路由有几种模式&区别
        1.hash: 
            兼容所有浏览器，包括不支持 HTML5 History Api 的浏览器，例http://www.abc.com/#/index，hash值为#/index， hash的改变会触发hashchange事件，通过监听hashchange事件来完成操作实现前端路由。hash值变化不会让浏览器向服务器请求
            监听hash变化，点击浏览器的前进后退会触发
        window.addEventListener('hashchange', function(event){ 
            let newURL = event.newURL; // hash 改变后的新 url
            let oldURL = event.oldURL; // hash 改变前的旧 url
        },false)
        复制代码
        2.history: 
            兼容能支持 HTML5 History Api 的浏览器，依赖HTML5 History API来实现前端路由。没有#，路由地址跟正常的url一样，但是初次访问或者刷新都会向服务器请求，如果没有请求到对应的资源就会返回404，所以路由地址匹配不到任何静态资源，则应该返回同一个index.html 页面，需要在nginx中配置。
        3.abstract: 
            支持所有 JavaScript 运行环境，如 Node.js 服务器端。如果发现没有浏览器的 API，路由会自动强制进入这个模式。
48.location.href与Vue-router路由跳转区别
    1.vue-router使用pushState进行路由更新 静态跳转 页面不会重新加载 
    location.href会触发浏览器 页面重新加载一次
    (使用router跳转和使用history.pushState()没有差别
    vue-router用了history.pushState()尤其是在history模式下)
    2.vue-router使用diff算法 实现按需加载 减少DOM操作
    3.vue-router是路由跳转或同一个页面跳转 location.href是不同页面间跳转
    4.vue-router是异步加载this.$nextTick(()=>{获取URL}) location.href是同步加载

    Location href属性
        href属性是一个可读可写的字符串 
        可设置或返回当前显示的文档的完整URL
    语法
        location.href
    兼容性
        所有主要浏览器都支持href属性
    location.href几种用法
        1.当前页面打开URL
            1.self.location.href
            2.window.location.href
            3.this.location.href
            4.location.href
        2.父页面打开新页面
            parent.location.href
        3.顶层页面打开新页面
            top.location.href

        1.使用location.href实现页面div块的快速定位
        2.location.href可直接获取当前路径
        3.parent.location.href跳转到上一层页面
        4.top.location.href跳转到最外层页面
49.Vue路由守卫哪些/如何设置/使用场景
    常用的两个路由守卫
        router.beforeEach/router.afterEach
    每个守卫方法接收三个参数
        to:Route:即将要进入的目标 路由对象
        from:Route:当前导航正要离开的路由
        next:Function:一定要调用该方法来resolve这个钩子
    项目中 
    一般在beforeEach这个钩子函数中进行路由跳转的一些信息判断
    判断是否登录 是否拿到对应的路由权限
49.导航守卫
    定义：
        导航守卫就是路由跳转过程中的一些钩子函数，再直白点路由跳转是一个大的过程，这个大的过程分为跳转前中后等等细小的过程，在每一个过程中都有一函数，这个函数能让你操作一些其他的事儿的时机，这就是导航守卫。
    导航守卫全解析：
        1.全局前置导航守卫 beforeEach
        2.路由beforeEnter守卫
        3.组件路由守卫 beforeRouteEnter 此时this并不指向该组件
        4.全局解析守卫 beforeResolve
        5.全局后置守卫 afterEach
        6.组件生命周期beforeCreate
        7.组件生命周期created
        8.组件生命周期beforeMount
        9.组件生命周期mounted
        10.组件路由守卫beforeRouteEnter的next回调
    分类：
        全局的、
            是指路由实例上直接操作的钩子函数，他的特点是所有路由配置的组件都会触发，直白点就是触发路由就会触发这些钩子函数，如下的写法。钩子函数按执行顺序包括beforeEach、beforeResolve（2.5+）、afterEach三个（以下的钩子函数都是按执行顺序讲解的）：
            const router = new VueRouter({ ... })

            router.beforeEach((to, from, next) => {
            // ...
            })
            [beforeEach]：在路由跳转前触发，参数包括to,from,next（参数会单独介绍）三个，这个钩子作用主要是用于登录验证，也就是路由还没跳转提前告知，以免跳转了再通知就为时已晚。

            [beforeResolve]（2.5+）：这个钩子和beforeEach类似，也是路由跳转前触发，参数也是to,from,next三个，和beforeEach区别官方解释为：

            区别是在导航被确认之前，同时在所有组件内守卫和异步路由组件被解析之后，解析守卫就被调用。
            即在 beforeEach 和 组件内beforeRouteEnter 之后，afterEach之前调用。

            [afterEach]：和beforeEach相反，他是在路由跳转完成后触发，参数包括to,from没有了next（参数会单独介绍）,他发生在beforeEach和beforeResolve之后，beforeRouteEnter（组件内守卫，后讲）之前。
        单个路由独享的、
            是指在单个路由配置的时候也可以设置的钩子函数，其位置就是下面示例中的位置，也就是像Foo这样的组件都存在这样的钩子函数。目前他只有一个钩子函数beforeEnter：

        组件内
    完整的导航守卫流程
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
        },
    6.路由导航守卫都是在Vue实例生命周期钩子函数之前执行的。
    7.讲一下导航守卫的三个参数的含义？
        to：即将要进入的目标 路由对象。
        from：当前导航正要离开的路由对象。
        next：函数，必须调用，不然路由跳转不过去。

        next()：进入下一个路由。
        next(false)：中断当前的导航。
        next('/')或next({ path: '/' }) : 跳转到其他路由，当前导航被中断，进行新的一个导航。
    8.在afterEach钩子中不可以使用next() 不接受next的参数。
    9.全局导航守卫有哪些？怎么使用？
        1.router.beforeEach：全局前置守卫。
        2.router.beforeResolve：全局解析守卫。
        3.router.afterEach：全局后置钩子。
    10.什么是路由独享的守卫，怎么使用？
        什么是路由独享的守卫，怎么使用？
    11.在组件内使用的导航守卫有哪些？怎么使用？
        beforeRouteLeave：在失活的组件里调用离开守卫。
        beforeRouteUpdate：在重用的组件里调用,比如包含<router-view />的组件。
        beforeRouteEnter：在进入对应路由的组件创建前调用。
    12.在beforeRouteEnter导航守卫中不可以用this
        为守卫在导航确认前被调用,因此即将登场的新组件还没被创建。
        可以通过传一个回调给next来访问组件实例。在导航被确认的时候执行回调，并且把组件实例作为回调方法的参数。
        beforeRouteEnter(to, from, next) {
            next(vm => {
                console.log(vm)
            })
        }
    13.router-link
        <router-link>是Vue-Router的内置组件，在具有路由功能的应用中作为声明式的导航使用。
        <router-link>有8个props，其作用是：
            1.to：必填，表示目标路由的链接。当被点击后，内部会立刻把to的值传到router.push()，所以这个值可以是一个字符串或者是描述目标位置的对象。
            注意path存在时params不起作用，只能用query
            2.replace：默认值为false，若设置的话，当点击时，会调用router.replace()而不是router.push()，于是导航后不会留下 history 记录。
            3.append：设置 append 属性后，则在当前 (相对) 路径前添加基路径。
            4.tag：让<router-link>渲染成tag设置的标签，如tag:'li,渲染结果为<li>foo</li>。
            5.active-class：默认值为router-link-active,设置链接激活时使用的 CSS 类名。默认值可以通过路由的构造选项 linkActiveClass 来全局配置。
            6.exact-active-class：默认值为router-link-exact-active,设置链接被精确匹配的时候应该激活的 class。默认值可以通过路由构造函数选项 linkExactActiveClass 进行全局配置的。
            7.exact：是否精确匹配，默认为false。
            8.event：声明可以用来触发导航的事件。可以是一个字符串或是一个包含字符串的数组，默认是click。
    14.怎么在组件中监听路由参数的变化？
        有两种方法可以监听路由参数的变化，但是只能用在包含<router-view />的组件内。
        1.watch: {
                '$route'(to, from) {
                    //这里监听
                },
            },
        2.
            beforeRouteUpdate (to, from, next) {
                //这里监听
            },
    15.切换路由后，新页面要滚动到顶部或保持原先的滚动位置怎么做呢？
        滚动顶部
        const router = new Router({
            mode: 'history',
            base: process.env.BASE_URL,
            routes,
            scrollBehavior(to, from, savedPosition) {
                if (savedPosition) {
                    return savedPosition;
                } else {
                    return { x: 0, y: 0 };
                }
            }
        });
        滚动原先位置
    16.在什么场景下会用到嵌套路由？
        做个管理系统，顶部栏和左侧菜单栏是全局通用的，那就应该放在父路由，而右下的页面内容部分放在子路由。
        。。。
    17.什么是命名视图，举个例子说明一下？
        。。。
    18.如何获取路由传过来的参数？
        路由有三种传参方式，获取方式各不相同。
            1.meta：路由元信息，写在routes配置文件中。
                {
                    path: '/home',
                    name: 'home',
                    component: load('home'),
                    meta: {
                        title: '首页'
                    },
                },
                获取方式this.$route.meta.title获取
            2.query
                this.$route.push({
                    path:'/home',
                    query:{
                        userId:123
                    }
                })
                浏览器地址：http://localhost:8036/home?userId=123 
                获取方式：this.$route.query.userId
            3.params：这种方式比较麻烦。
                1.首先要在地址上做配置
                    {
                        path: '/home/:userId',
                        name: 'home',
                        component: load('home'),
                        meta: {
                            title: '首页'
                        },
                    },
                2.访问传参
                const userId = '123'
                this.$router.push({ name: 'home', params: { userId } })
                注：用params传参，只能用命名的路由（用name访问），如果用path，params不起作用。 this.$router.push({ path: '/home', params: { userId }})不生效。
                浏览器地址：http://localhost:8036/home/123
                获取方式：this.$route.params.userId
    19.路由组件和路由为什么解耦，怎么解耦？
        因为在组件中使用 $route 会使之与其对应路由形成高度耦合，从而使组件只能在某些特定的 URL 上使用，限制了其灵活性，所有要解耦。
        耦合如以下代码所示。Home组件只有在http://localhost:8036/home/123URL上才能使用。
        使用 props 来解耦
        props为true，route.params将会被设置为组件属性。
        props为对象，则按原样设置为组件属性。
        props为函数，http://localhost:8036/home?id=123,会把123传给组件Home的props的id。
    20.active-class是哪个组件的属性？
        <router-link/>组件的属性，设置链接激活时使用的 CSS 类名。默认值可以通过路由的构造选项 linkActiveClass 来全局配置。
    21.在vue组件中通过this.$route获取到当前的路由信息 
    22.怎样动态加载路由？
        使用Router的实例方法addRoutes来实现动态加载路由，一般用来实现菜单权限。
        使用时要注意，静态路由文件中不能有404路由，而要通过addRoutes一起动态添加进去。
    23.怎么实现路由懒加载呢？
        function load(component) {
            //return resolve => require([`views/${component}`], resolve);
            return () => import(`views/${component}`);
        }

        const routes = [
            {
                path: '/home',
                name: 'home',
                component: load('home'),
                meta: {
                    title: '首页'
                },
            },
        ]
    24.路由之间是怎么跳转的？有哪些方式？
        1.声明式  通过使用内置组件<router-link :to="/home">来跳转
        2.编程式  通过调用router实例的push方法router.push({ path: '/home' })或replace方法router.replace({ path: '/home' })
    25.如果vue-router使用history模式，部署时要注意什么？
        要注意404的问题，因为在history模式下，只是动态的通过js操作window.history来改变浏览器地址栏里的路径，并没有发起http请求，当直接在浏览器里输入这个地址的时候，就一定要对服务器发起http请求，但是这个目标在服务器上又不存在，所以会返回404。
        所以要在Ngnix中将所有请求都转发到index.html上就可以了。
    26.Vue路由怎么跳转打开新窗口？
        const obj = {
            path: xxx,//路由地址
            query: {
            mid: data.id//可以带参数
            }
        };
        const {href} = this.$router.resolve(obj);
        window.open(href, '_blank');
50.Vue SSR(Service Side Render Vue服务端渲染)
    服务器端渲染的 Vue.js 应用程序目的：
        使vue应用既可以在客户端（浏览器）执行，也可以在服务器端执行，我们称之为“同构”或“通用”。
    Vue.js 是构建客户端应用程序的框架。
    默认情况下，可以在浏览器中输出 Vue 组件，进行生成 DOM 和操作 DOM。然而，
    也可以将同一个组件渲染为服务端的 HTML 字符串，将它们直接发送到浏览器，最后将这些静态标记"激活"为客户端上完全可交互的应用程序。 
    SSR
        vue在客户端将标签渲染成的整个html片段的工作在服务端完成
        服务端形成html片段直接返回给客户端
    优点：(SEO/首屏加载速度)
        1.更好的SEO
            SPA页面内容通过Ajax获取
            搜索引擎爬取工具并不会等待Ajax异步完成后再抓取页面内容
            SPA中抓取不到页面通过Ajax获取内容
            SSR直接由服务端返回已经渲染好的页面
            （数据已经包含在页面中）
            搜索引擎爬取工具可抓取渲染好的页面；
        2.首屏加载更快 
            SPA 会等待所有Vue编译后JS文件都下载完成后
            才开始进行页面的渲染
            文件下载等需要一定的时间等
            首屏渲染需要一定的时间
            SSR 直接由服务端渲染好页面直接返回显示
            无需等待下载js文件再去渲染等
    缺点：(开发条件限制/服务器负载加重)
        1.开发条件限制增多
            SSR只支持beforCreate/created两个钩子函数
            会导致一些外部扩展库需要特殊处理 
            才能在服务端渲染应用程序中运行
            且与可以部署在任何静态文件服务器上的完全静态单页面应用程序 SPA 不同
            服务端渲染应用程序
            需要处于 Node.js server 运行环境
        2.服务器负载加重
            在 Node.js  中渲染完整的应用程序，显然会比仅仅提供静态文件的  server 更加大量占用CPU 资源 (CPU-intensive - CPU 密集)，因此如果你预料在高流量环境 ( high traffic ) 下使用，请准备相应的服务器负载，并明智地采用缓存策略。
51.Vue项目优化
        1.代码层面的优化 
            v-if 和 v-show 区分使用场景
            computed 和 watch区分使用场景
            v-for 遍历必须为 item 添加 key，且避免同时使用 
            v-if
            长列表性能优化事件的销毁图片
            资源懒加载
            路由懒加载
            第三方插件的按需引入
            优化无限列表性能服务端渲染 SSR or 预渲染
        2.Webpack 层面的优化 
            Webpack 对图片进行压缩减少 
            ES6 转为 ES5 的冗余代码提取公共代码模板预编译提取组件的 
            CSS优化 SourceMap构建结果输出分析Vue 项目的编译优化
        3.基础的 Web 技术的优化  开启 gzip 压缩  浏览器缓存  CDN 的使用  使用 Chrome Performance 查找性能瓶颈
52.Vue优点
    1.轻量级框架：只关注视图层，是一个构建数据的视图集合，大小只有几十kb；
    2.简单易学：国人开发，中文文档，不存在语言障碍 ，易于理解和学习；
    3.双向数据绑定：保留了angular的特点，在数据操作方面更为简单；
    组件化：保留了react的优点，实现了html的封装和重用，在构建单页面应用方面有着独特的优势；
    4.视图，数据，结构分离：使数据的更改更为简单，不需要进行逻辑代码的修改，只需要操作数据就能完成相关操作；
    5.虚拟DOM：dom操作是非常耗费性能的，不再使用原生的dom操作节点，极大解放dom操作，但具体操作的还是dom不过是换了另一种方式；
    6.运行速度更快:相比较与react而言，同样是操作虚拟dom，就性能而言，vue存在很大的优势。
53.Vue和React和jQuery区别
    Vue和React：
        1.数据流
        2.监听数据的变化方式不同
        3.应用场景
        4.渲染方式
            Vue：自动追踪组件依赖关系 不需要重新渲染整个组件
            React：组件状态变化时 会以该组件为根重新计算整个组件
    Vue(专注于数据层 通过数据双向绑定 最终表现在DOM层减少DOM操作)和jQuery(专注视图层 通过操作DOM实现页面的一些逻辑渲染)：
        jQuery 专注视图层，通过操作 DOM 去实现页面的一些逻辑渲染；
        Vue 专注于数据层，通过数据的双向绑定，最终表现在 DOM 层面，减少了 DOM 操作 Vue 使用了组件化思想，使得项目子集职责清晰，提高了开发效率，方便重复利用，便于协同开发
54.Vue与Angular区别
    x
    2.Vue的双向绑定基于ES5中的getter/setter实现
    Angular由自己实现一套模板编译规则 需要进行所谓脏值检查
    Vue则不需要 因此Vue在性能上更高效 代价是对于IE9以下的浏览器无法支持
    3.Vue需要提供一个el对象进行实例化 后续的所有作用范围也是在el对象之下 Angular是整个HTML页面 一个页面可以有多个Vue实例 而Angular不是
55.Vue/Angular/React区别
    Vue/Angular
        相同点：
            1.都支持指令 内置指令和自定义指令
            2.都支持过滤器 内置过滤器和自定义过滤器
            3.都支持双向数据绑定
            4.都不支持低端浏览器
        不同点：
            1.Angular学习成本高 比如增加Dependency Injection特性 Vue.js本身实现的API都比较简单直观
            2.性能上Angular依赖对数据做脏检查 Watcher越多越慢 Vue使用基于依赖追踪的观察并使用异步队列更新 所有数据独立触发
    Vue/React
        相同点:
            1.React采用特殊的JSX语法 Vue在组件开发中也推荐编写.vue特殊文件格式 对文件内容都有一些约定 两者都需要编译后使用
            2.中心思想相同：一切都是组件 组件实例之间可以嵌套
            3.都提供合理的钩子函数 可以让开发者定制化去处理需求
            4.都不内置列数AJAX Route等功能到核心包 而是以插件方式加载
            5.组件开发中都支持mixins的特性
        不同点:
            1.React依赖Vitrual DOM Vue.js使用的是DOM模板
            React采用的VDOM会对渲染出来的结果做脏值检查
            2.Vue在模板中提供了指令 过滤器 可以非常方便快捷操作DOM

54.vue-admin-template&Element UI
    vue-admin-template:
    一个极简的vue admin管理后台 只包含 Element UI &axios &iconfont&permission control &init 这些搭建后台必要的东西
    目前版本 v4.0+ 基于Vue-Cli构建
    Element UI:
    基于Vue2.0的组件库
55.Vue-Cli配置功能
    1.ES6代码转换成ES5代码
    2.scss/sass/less/stylus转css
    3..vue文件转换成js文件
    4.使用 jpg、png，font等资源文件
    5.自动添加css各浏览器产商的前缀
    6.代码热更新
    7.资源预加载
    8.每次构建代码清除之前生成的代码
    9.定义环境变量
    10.区分开发环境打包跟生产环境打包
56.shim()
    shim是一个小型库，可透明地截取API，更改传递的参数，处理操作本身，或将操作重定向到别处。垫片通常在API的行为发生变化时出现，从而导致仍依赖旧功能的旧应用程序出现兼容性问题。在这些情况下，较新的代码之上的较薄的兼容层仍然可以支持较旧的API。垫片也可以用于在不同的软件平台上运行程序，而不是开发它们。
57.Vue中的模板语法
    Vue.js使用了基于HTML的模板语法 
    允许开发者声明式的将DOM绑定至底层Vue实例的数据
    所有Vue.js的模板都是合法的HTML 
    所以能被遵循规范的浏览器和HTML解析器解析

    在底层的实现上
    Vue将模板编译成虚拟DOM渲染函数
    结合响应系统 
    Vue能智能计算出最少需要重新渲染多少组件
58.嵌套路由
59.Vue中template编译的理解
    先转化成AST树 将得到的render函数返回VNode(Vue的虚拟DOM节点)
    1.首先通过compile编译器把template编译成AST语法树
    (abstract syntax tree 源代码的抽象语法结构的树状表现形式)
    complie是createCompiler的返回值 createCompiler是用以创建编译器的 另外compiler还负责合并option
    2.AST经过generate(将AST语法树转化成render function字符串的过程)得到render函数 render的返回值是VNode VNode是Vue的虚拟DOM节点 里面有(标签名/子节点/文本等)

1.强制刷新组件
    1.this.$forceUpdate()。
    2.组件上加上key，然后变化key的值。
2.父组件中的自定义事件
接收子组件的多个参数
    使用this.$emit()函数的第二个参数 做对象使用
    this.$emit('eventName',data)
    data可以是个对象，包含子组件的多个参数，然后传给父组件。
3.给组件绑定自定义事件无效怎么解决？
    加上修饰词.native。

(依赖收集 核心思想 事件发布订阅模式)
(目的是将观察者Watcher对象存放到当前闭包的订阅者Dep的subs中)
(形成这样一个关系 Object->Dep->Watcher1/Watcher2-->视图1/2)

依赖收集中两个重要角色(所谓的依赖其实就是Watcher)
订阅者Dep(存储依赖的地方 存放Watcher观察对象)
    收集依赖需要为依赖找一个存储依赖的地方
    为此我们创建了Dep 
    它用来收集依赖/删除依赖/和向依赖发送消息等
    实现一个订阅者Dep类 
    用于解耦属性的依赖收集和派发更新操作
    主要作用是用来存放Watcher观察者对象
    (可以把Watcher理解成一个中介的角色
    数据发生变化时通知它 然后它再通知其他地方)
观察者Watcher
    (抽象出一个能集中处理这些情况的类)
    (通知只通知它一个/再由它负责通知到其他地方)
    Vue中定义一个Watcher类来表示观察订阅依赖
    当属性发生变化后
    我们要通知用到数据的地方
    而使用到这个数据的地方有很多
    而且类型还不一样
    既有可能是模板
    也有可能是用户写好的一个watch
    此时需要抽象出一个能集中处理这些情况的类
    在依赖收集阶段只收集
    这个封装好的类的实例进来
    通知也只通知它一个
    再由它负责通知其他地方
60.Vue路由懒加载(异步加载组件)
    对于SPA单页面应用 当打包构建时 JS包会变得非常大
    影响页面加载速度
    将不同路由对应的组件分割成不同的代码块
    当路由被访问时 才加载对应组件
    1.Vue异步组件
        Vue允许以一个工厂函数的方式定义你的组件
        这个工厂函数会异步解析你的组件定义
        Vue只在这个组件需要被渲染时才会触发该工厂函数
        且会把结果缓存起来供未来重新渲染
        这个工厂函数会收到一个resolve回调
        这个回调函数会在你从服务器得到组件定义时被调用
    2.动态import
    3.webpack提供的require.ensure
    构建项目比较大时 懒加载可以分割代码
    提高页面初始加载效率
    几种常见Vue中路由懒加载方法
    1.resolve
        主要使用了resolve异步机制 用require代替import实现按需加载
    2.官网方法
        vue-router在官网提供一种方法 
        可以理解为通过Promise的resolve机制
        因为Promise函数返回的Promise为resolve组件本身
        我们可以使用import导入组件
    3.require.ensure
        这种模式可以通过参数中的webpackChunkName将js分开打包
61.Vue如何自定义指令
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
62.Vue-Router源码
    Vue-Router是Vue.js官方的路由管理器 它和Vue.js可信深度集成 使构建SPA更容易
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
    使用Vue-router时 主要有以下几步
        <div id="app">
            <!-- 路由匹配到的组件将渲染在这里 -->
            <router-view></router-view>
        </div>    
        // 1. 安装 插件
        Vue.use(VueRouter);
        // 2. 创建router对象
        const router = new VueRouter({
            routes // 路由列表 eg: [{ path: '/foo', component: Foo }]
        });
        // 3. 挂载router
        const app = new Vue({
            router
        }).$mount('#app');

        其中 VueRouter 对象，就在vue-router 的入口文件 src/index.js

        VueRouter 原型上定义了一系列的函数
        我们日常经常会使用到
        主要有go/push/replace/back/forward
        以及一些导航守护beforeEach/beforeResolve/afterEach 等等
        上面html 中使用到的 router-view ，以及经常用到的 router-link 则存在 src/components 目录下。
62.Router-link和Router-view
    router-link和router-view在同一个Vue文件中
    router-link
        设置路由跳转
        <router-lonk :to="...">声明式导航
        router.push(...)编程式导航
    router-view
        根据路由显示组件
    Vue中这两者相互依存
        router-link对应HTML中的a标签
        与a标签不同的是跳转的时候 
        不会刷新页面
        router-view相当于router-link的承载页面
        用于显示router-link的内容
63.编程式导航&声明式导航
    声明式导航：
        直接渲染到页面
        <router-link to="/url">
    编程式导航：
        JS中处理逻辑后需要页面进行跳转
        this.$router其实就是router
        Vue为方便在组件中使用router 才添加this.$router
        this.$router.push();
            会进行页面跳转 同时会在历史记录上留下记录
        this.$router.replace();
            和push功能相同 但是会替换当前页出现在历史记录中
        this.$router.go(num);
            表示距离当前页的在历史记录上的页数
        this.$router.back()
            返回到上一页
        this.$router.forward()
            前进到下一页
    共同点：
        都能进行导航 都可以触发路由 实现组件切换
    区别：
        写法不一样
        声明式导航写在组件的template中 通过router-link触发
        编程式导航写在JS函数中 通过this.$router.push(xxx)触发

64.Vue-Router导航守卫
    官方
        vue-router提供的导航守卫主要用来通过跳转或取消的方式守卫导航
    实际
        导航守卫就是路由跳转过程中的一些钩子函数
        路由跳转是一个大过程 
        这个大过程分跳转前中后等细小过程
        每一个过程都有一个函数
        可以让你操作一些其他的事的时机
    导航守卫全解析
        一个钩子函数执行后输出的顺序
            全局前置守卫:beforeEach
            路由beforeEnter守卫
            组件路由守卫beforeRouterEnter 此时this并不指向该组件实例
            全局解析守卫beforeResolve
            全局后置守卫afterEach
            组件生命周期beforeCreate
            组件生命周期created
            组件生命周期beforeMount
            组件生命周期mounted
            组件路由守卫beforeRouteEnter的next回调
    导航守卫分三种
        1.全局的
            路由实例上直接操作的钩子函数 
            特点:
                所有路由配置的组件都会触发
                即触发路由就会触发这些钩子函数
                钩子函数按执行顺序包括
                    beforeEach
                        路由跳转前触发
                        参数 to from next
                        主要用作登录验证 
                        即路由还没跳转提前告知
                        免得跳转后再告知晚了
                    beforeResolve
                        路由跳转前触发
                        参数 to from next
                        区别：
                            导航被确认之前
                            同时再所有组件内守卫和异步路由组件被解析之后 解析守卫被调用
                        在beforeEach和组件内beforeRouteEnter之后 
                        afterEach之前调用
                    afterEach
                        与beforeEach相反
                        路由跳转完成后触发
                        参数
                            to from
                        在beforeEach和beforeResolve之后
                        beforeRouteEnter(组件内守卫)之前
        2.单个路由独享的
            单个路由配置时 也可设置的钩子函数
            目前只有一个钩子函数
                beforeEnter
                    和beforeEach完全相同
                    如果都设置则在beforeEach之后紧随执行
                    参数:
                        to from next
        3.组件内
            组件内执行的钩子函数 
            类似于组件内的生命周期
            相当于为配置路由的组件添加的生命周期钩子函数
            钩子函数按执行顺序包括
            beforeRouteEnter
                渲染该组件对应路由被comfirm前调用
                不能获取组件实例this
                因为当守卫执行前 组件实例还没被创建
            beforeRouteUpdate
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
        导航守卫回调参数
            to:目标路由对象
            from:即将要离开的路由对象
            next:最重要一个参数
            PS:
                1.但凡涉及到有next参数的钩子 必须调用next()才能继续往下执行下一个钩子 否则路由跳转会停止
                2.如果要中断当前的导航要调用next(false)如果浏览器的URL改变了(可能是用户手动或浏览器后退按钮)则URL地址会重置到from路由对应的地址
                (主要用于登录验证不通过的处理)
                3.next可以这样使用 next('/')/next({path:'/'})跳转到一个不同的地址 意思是当前导航被中断 然后进行一个新的导航 可传递的参数和router.push()选项一致
                4.在beforeRouteEnter钩子中next((vm)=>{})内接受的回调函数参数为当前组件的实例vm 这个回调函数在生命周期mounted之后调用 即它是所有导肮守卫和生命周期函数最后执行的那个钩子
                5.next(errror) 如果传入next的参数是一个Error实例 则导航会被终止且该错误会被传递给router.onError()注册过的回调
    总结：
        切换路由时：
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
        路由更新时:
            beforeRouteUpdate









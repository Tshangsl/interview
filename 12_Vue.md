1.强制刷新组件
    1.this.$forceUpdate()。
    2.组件上加上key，然后变化key的值。
2.父组件中的自定义事件接收子组件的多个参数
    使用this.$emit()函数的第二个参数 做对象使用
    this.$emit('eventName',data)
    data可以是个对象，包含子组件的多个参数，然后传给父组件。
3.给组件绑定自定义事件无效怎么解决？
    加上修饰词.native。
4.访问子组件的实例或者子元素
    在Vue中，我们不用获取dom节点，元素绑定ref之后，直接通过this.$refs即可调用，这样可以减少获取dom节点的消耗。
    ref特性就是为元素或子组件赋予一个ID引用,通过this.$refs.refName来访问元素或子组件的实例
    ref被用来给元素或子组件注册引用信息。引用信息将会注册在父组件的 $refs对象上。如果在普通的 DOM 元素上使用，引用指向的就是 DOM 元素；如果用在子组件上，引用就指向该子组件实例
    this.$refs是一个对象，持有当前组件中注册过 ref特性的所有 DOM 元素和子组件实例
    $refs只有在组件渲染完成后才填充，在初始渲染的时候不能访问它们，并且它是非响应式的，因此不能用它在模板中做数据绑定
    当ref和v-for一起使用时，获取到的引用将会是一个数组，包含循环数组源
    1.用ref特性为子组件赋予一个ID引用
        <base-input ref="myInput"></<base-input>
        比如子组件有个focus的方法，可以这样调用this.$refs.myInput.focus()；
        比如子组件有个value的数据，可以这样使用this.$refs.myInput.value。
    2.用ref特性为普通的 DOM 元素赋予一个ID引用<ul ref="mydiv">
        <ul ref="mydiv">
            <li class="item">第一个li</li>
            <li class="item">第一个li</li>
        </ul>
        console.log(this.$refs['mydiv'].getElementsByClassName('item')[0].innerHTML)//第一个li
    三种用法：
        1.ref加在普通的元素上 用this.$ref.name获取到的是dom元素
        2.ref加在子组件上 用this.$ref.name获取到的是组件实例 可以使用组件的所有方法
        3.如何利用v-for和ref获取一组数组或dom节点
        当v-for用于元素或组件的时候 引用信息将是包含DOM节点或组件实例的数组
        PS:关于ref注册时间的重要说明 因为ref本身是作为渲染结果被创建的 在初始渲染的时候 你不能访问它们 它们还不存在 $ref也不是响应式的 不应该试图用它在模板中做数据绑定
        注意：
            1.ref需要在dom渲染完成后才会有 在使用的时候确保dom已经被渲染完成 比如在生命周期mounted(){}钩子中调用 或者在this.$nextTic(()=>{})中调用
            2.如果ref是循环出来的 有多个重名 那么ref的值会是一个数组 此时要拿到单个的ref只需要循环就可以
    预期：string
    ref 被用来给元素或子组件注册引用信息。引用信息将会注册在父组件的 $refs 对象上。如果在普通的 DOM 元素上使用，引用指向的就是 DOM 元素；如果用在子组件上，引用就指向组件实例：
    当 v-for 用于元素或组件的时候，引用信息将是包含 DOM 节点或组件实例的数组。
    关于 ref 注册时间的重要说明：因为 ref 本身是作为渲染结果被创建的，在初始渲染的时候你不能访问它们 - 它们还不存在！$refs 也不是响应式的，因此你不应该试图用它在模板中做数据绑定。
4.Vue组件之间的通信都有哪些？
    1.props
    2.this.$emit('input',data)
    3.this.$root.$on('input',function(data){})和this.$root.$emit('emit',data)
    4.this.$refs.tree
    5.this.$parent
    6.provide和inject
    7.vueX
    子组件中访问父组件的实例/组件中访问到根实例？
    this.$parent/this.$root
39.组件通信
        1.props / $emit 适用 父子组件通信
        2.ref 与 $parent / $children 适用 父子组件通信
            ref：
                如果在普通的 DOM 元素上使用，引用指向的就是 DOM 元素；如果用在子组件上，引用就指向组件实例
            $parent / $children：
                访问父 / 子实例
        3.EventBus （$emit / $on） 适用于 父子、隔代、兄弟组件通信
            通过一个空的 Vue 实例作为中央事件总线（事件中心），用它来触发事件和监听事件，从而实现任何组件间的通信，包括父子、隔代、兄弟组件。
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
5.prop验证的type类型
    String、Number、Boolean、Array、Object、Date、Function、Symbol， 
    此外还可以是一个自定义的构造函数Personnel，
    并且通过 instanceof 来验证propwokrer的值是否是通过这个自定义的构造函数创建的。
6.is
    动态组件
        <component :is="componentName"></component>，
        componentName可以是在本页面已经注册的局部组件名和全局组件名,也可以是一个组件的选项对象。
        当控制componentName改变时就可以动态切换选择组件。
    is的用法
        1.有些HTML元素，诸如 <ul>、<ol>、<table>和<select>，对于哪些元素可以出现在其内部是有严格限制的。
        2.而有些HTML元素，诸如 <li>、<tr> 和 <option>，只能出现在其它某些特定的元素内部。
        3.所以上面<card-list></card-list>会被作为无效的内容提升到外部，并导致最终渲染结果出错。应该这么写：
        <ul>
            <li is="cardList"></li>
        </ul>
7.在Vue事件中使用event对象
    1.@click="handleOpen" 默认第一个参数传入event对象;
    2.@click="handleOpen(0, $event)",如果自己需要传入参数和event对象，则需要使用$event来获取event对象并传入handleOpen。

    $event.currentTarget始终指向事件所绑定的元素，
    而$event.target指向事件发生时的元素。
8.表单修饰符和事件修饰符
    修饰符 (modifier) 
        是以半角句号 . 指明的特殊后缀，用于指出一个指令应该以特殊方式绑定。例如，.prevent 修饰符告诉 v-on 指令对于触发的事件调用 event.preventDefault()：
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
    原理：
        vue通过在DOM结构以及css样式上加上唯一的标记`data-v-xxxxxx`，保证唯一，达到样式私有化，不污染全局的作用。
    注意：
        如果在公共组件中使用，修改公共组件的样式需要用/deep/。
11.Vue渲染模板如何保留模板中的HTML注释
    在组件中将comments选项设置为true
    <template comments> ... <template>
12.Vue中怎么重置data
    Object.assign(this.$data,this.$options.data())
13.Vue中Dom异步 nextTick
Dom异步：
    Vue 异步执行 DOM 更新。
    只要观察到数据变化，Vue 将开启一个队列，并缓冲在同一事件循环中发生的所有数据改变。
    如果同一个 watcher 被多次触发，只会被推入到队列中一次。这种在缓冲时去除重复数据对于避免不必要的计算和 DOM 操作上非常重要。
    然后，在下一个的事件循环“tick”中，Vue 刷新队列并执行实际 (已去重的) 工作。
    Vue 在内部尝试对异步队列使用原生的 Promise.then 和MessageChannel，如果执行环境不支持，会采用 setTimeout(fn, 0)代替。
    为了在数据变化之后等待 Vue 完成更新 DOM ，可以在数据变化之后立即使用Vue.nextTick(callback) 。这样回调函数在 DOM 更新完成后就会调用。
nextTick：
    作用：
        Vue.nextTick用于延迟执行一段代码，它接受2个参数（回调函数和执行回调函数的上下文环境），如果没有提供回调函数，那么将返回promise对象。
        callbacks 用来存储所有需要执行的回调函数
        pending 用来标志是否正在执行回调函数
        timerFunc 用来触发执行回调函数

        vm.$nextTick(() =>{this.handleadd()}),
        将handleadd回调延迟到下次 DOM 更新循环之后执行。
    应用场景:
        1.在Vue生命周期的created()钩子函数进行的DOM操作一定要放在Vue.nextTick()的回调函数中
            在created()钩子函数执行的时候DOM 
            其实并未进行任何渲染，而此时进行DOM操作无异于徒劳，所以此处一定要将DOM操作的js代码放进Vue.nextTick()的回调函数中。
            与之对应的就是mounted()钩子函数，因为该钩子函数执行时所有的DOM挂载和渲染都已完成，此时在该钩子函数中进行任何DOM操作都不会有问题 。
        2.在数据变化后要执行的某个操作，而这个操作需要使用随数据改变而改变的DOM结构的时候，这个操作都应该放进Vue.nextTick()的回调函数中。
NextTick 是做什么的 其原理
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
14.虚拟DOM&DOM-diff
    虚拟DOM存在意义：
        虚拟DOM就是为了解决浏览器性能问题而被设计出来的。
        如前，若一次操作中有10次更新DOM的动作，虚拟DOM不会立即操作DOM，而是将这10次更新的diff内容保存到本地一个JS对象中，最终将这个JS对象一次性attch到DOM树上，再进行后续操作，避免大量无谓的计算量。
        所以，用JS对象模拟DOM节点的好处是，页面的更新可以先全部反映在JS对象(虚拟DOM)上，操作内存中的JS对象的速度显然要更快，等更新完成后，再将最终的JS对象映射成真实的DOM，交由浏览器去绘制。
    虚拟DOM/VDOM：
        1.用JS去按照DOM结构来实现树状结构对象/可叫DOM对象
        2.是仅存在内存中的DOM 因还未展示到页面中 所以称作VDOM
        3.Virtual DOM其实就是一棵以JavaScript对象(VNode节点)为基础的树 用对象属性来描述节点 实际上它只是对一层真实DOM的抽象 最终可以通过一系列操作使这棵树映射到真实环境上。
        4.JS中虚拟DOM表现为一个Object对象 并且最少包含标签名(tag)属性(attrs)和子元素对象(children)三个属性 不同框架对这三个属性的命名可能会有差异
        5.，Virtual DOM 对象的节点跟 DOM Tree 每个位置的属性一一对应的，因为人们创造出虚拟 DOM 就是为了更好地将虚拟节点渲染到视图上，也就是把虚拟DOM变成真实的 DOM 节点，提高视图的渲染性能。
    优点：
        1.减少DOM操作
            两个虚拟DOM对比用到的算法就是DOM diff
            JS层面上 DOM操作并不慢 慢在浏览器渲染的过程里，改变一行数据就要全部重新渲染
            虚拟 DOM 比 DOM 快，是因为需要更新的 DOM 节点要比原生 DOM 操作更新的节点少，浏览器重绘的时间更短
            虚拟 DOM 的优势不在于单次的操作，用对比的算法，它可以将多次操作合并成一次操作，在大量、频繁的数据更新下，能够对视图进行合理、高效的更新。
        2.跨平台
            虚拟DOM是以JS对象作为基础 本质就是一个JS对象 并不依赖真实平台环境 使它具有跨平台能力 在浏览器上可以变成DOM 其他平台可以变成相应渲染对象
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
        DIFF算法：
            1.diff算法仅在两个树的同级的虚拟节点之间做比较，递归地进行比较，最终实现整个 DOM 树的更新。
            2.是React框架采用的方法 也就是判断DOM是否发生了变化 然后找到这个变化 这样我们才能实现差量更新
        三个步骤：
            1.用 JS 对象的方式来表示 DOM 树的结构，然后根据这个对象构建出真实的 DOM 树，插到文档中。
            2.当状态变更的时候，重新构造一棵新的对象树。然后用新的树和旧的树进行比较，记录两棵树的差异
            3.最后把所记录的差异应用到所构建的真正的DOM树上，视图更新
        比较时分为三个层级:
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
        给定任意两棵树 采用先序深度优先遍历的算法找到最少的转换步骤d
        DOM-diff比较两个虚拟DOM的区别 也就是在比较两个对象的区别
        作用：
            根据两个虚拟对象创建出补丁 描述改变的内容 将这个补丁用来更新DOM
        过程：
            1.用JS对象模拟DOM(虚拟DOM)
            2.把此虚拟DOM转成真实DOM并插入页面中(render)
            3.如果有事件发生修改了虚拟DOM 比较两棵虚拟DOM树的差异 得到差异对象diff
            4.把差异对象应用到真正的DOM树上(patch)
15.生命周期的实例方法
    1.vm.$mount()，返回vm，可链式调用其它实例方法；(不常用)
    2.vm.$forceUpdate()，强制Vue实例重新渲染，不是重新加载组件,会触发beforeUpdate和updated这两个钩子函数，不会触发其他的钩子函数。它仅仅影响实例本身和插入插槽内容的子组件，而不是所有子组件；
    3.vm.$nextTick()，参数为callback，等待视图全部更新后执行，回调函数的this自动绑定到调用它的实例上；
    4.vm.$destroy()，销毁一个实例。清理它与其它实例的连接，解绑全部指令及事件监听器,但不能清理实例的DOM和data，会触发beforeDestroy和destroyed两个钩子函数。
16.vue初始化和生命周期钩子函数
(初始化:开始创建、初始化数据、编译模板、挂载Dom、数据变化时更新DOM、卸载)
(生命周期:Vue实例从创建到销毁的过程)
(生命周期钩子函数
beforeCreate(
    实例初始化之后 创建之前被调用 
    数据data也没有 DOM也没生成。
    el  undefined
    data undefined
    meaasge undefined
)
created(
    模板渲染成html前（vm.$el未定义）故数据初始化最好在这阶段完成；
    实例创建后被调用 完成数据观测，属性和方法的运算
    watch/event事件回调 
    能读取到数据data的值 DOM还没生成，挂载属性el还不存在。
    el  undefined
    data [Object Object]
    meaasge Vue生命周期
)
beforeMount(
    $el挂载前被调用，相关的 render 函数首次被调用，期间将模块渲染成html,此时vm.$el还是未定义；
    将编译完成的html挂载到对应的虚拟DOM时触发的钩子
    此时页面并没有内容。
    即将挂载 
    此时的el不再是undefined,成功关联到我们指定的dom节点
    此时的{{test}}还没有成功渲染成data中的数据，页面没有内容。
    相关的render函数首次被调用。
    el  [Object HTMLDivElement]
    data [Object Object]
    meaasge Vue生命周期
) 
mounted(
    $el挂载后被调用，此时vm.$el可以调用，不能保证所有的子组件都挂载，要等视图全部更新完毕用vm.$nextTick();
    编译好的html挂载到页面完成后所执行的事件钩子函数。
    挂载完毕阶段
    此时编译好的HTML已经挂载到了页面上，页面上已经渲染出了数据。一般会利用这个钩子函数做一些ajax请求获取数据进行数据初始化。
    el  [Object HTMLDivElement]
    data [Object Object]
    meaasge Vue生命周期
) 
beforeUpadate(
    修改vue实例的data时，vue就会自动帮我们更新渲染视图
    检测到我们要修改数据 更新渲染视图之前触发
)
updated(
    此阶段为更新渲染视图之后，此时再读取视图上的内容，已经是最新的内容。
    PS:
    1.该钩子在服务器端渲染期间不被调用。
    2.应该避免在此期间更改状态，因为这可能会导致更新无限循环。
)
beforeDestory(
    调用实例的destroy() 此时实例仍然完全可用；
    方法可以销毁当前的组件，在销毁前，
    会触发beforeDestroy钩子。
)
destoryed(
    成功销毁之后，会触发destroyed钩子，
    此时该实例与其他实例的关联已经被清除，
    Vue实例指示的所有东西都会解绑定，
    所有的事件监听器会被移除，
    所有的子实例也会被销毁。
)
)
        Vue初始化：
            1.合并配置，初始化生命周期，初始化事件中心，初始化渲染，初始化 data、props、computed、watcher 等等，vue 把不同的功能逻辑拆成一些单独的函数执行。
            2.这个过程中插入钩子函数，提供给开发者调用的机会。在初始化的最后，检测到如果有 el 属性，则调用 vm.$mount 方法挂载 vm，挂载的目标就是把模板渲染成最终的 DOM。
        Vue生命周期:
        1.vue实例有一个完整的生命周期，生命周期也就是指一个实例从开始创建到销毁的这个过程
        2.生命周期钩子自动绑定this到实例上 因此你可以通过this操作访问到数据和方法。
        注意不能使用箭头函数例如下方代码，因为箭头函数绑定外层的this会一直往上找。
17.keep-alive 
    keep-alive是一个抽象组件：
        它自身不会渲染一个DOM元素，也不会出现在父组件链中；
        使用keep-alive包裹动态组件时，会缓存不活动的组件实例，而不是销毁它们。
        一般情况下，组件进行切换的时候，默认会进行销毁，如果有需求，某个组件切换后不进行销毁，而是保存之前的状态，那么就可以利用keep-alive来实现
        要求被切换到的组件都有自己的名字
    两个属性(字符串或者正则表达式匹配的组件name)
        1.include定义缓存白名单，会缓存的组件；
        2.exclude定义缓存黑名单，不会缓存的组件；
        3.以上两个参数可以是逗号分隔字符串、正则表达式或一个数组,include="a,b"、:include="/a|b/"、:include="['a', 'b']"；
        4.匹配首先检查组件自身的 name 选项，如果 name 选项不可用，则匹配它的局部注册名称 (父组件 components 选项的键值)。匿名组件不能被匹配；
        5.max最多可以缓存多少组件实例。一旦这个数字达到了，在新实例被创建之前，已缓存组件中最久没有被访问的实例会被销毁掉；
        6.不会在函数式组件中正常工作，因为它们没有缓存实例；
        7.当组件在内被切换，它的activated和deactivated这两个生命周期钩子函数将会被对应执行。
        服务器渲染期间不被调用
        activited() 
            keep-alive专属 组件被激活时调用 可更新组件
        deactived() 
            keep-alive专属 组件被销毁时调用
        8. 一般结合路由和动态组件一起使用，
18.Vue中的key
    注意：
        1.不要使用对象或数组之类的非基本类型值作为key，请用字符串或数值类型的值；
        2.不要使用数组的index作为key值，因为在删除数组某一项，index也会随之变化，导致key变化，渲染会出错。
        例：在渲染[a,b,c]用 index 作为 key，那么在删除第二项的时候，index 就会从 0 1 2 变成 0 1（而不是 0 2)，随之第三项的key变成1了，就会误把第三项删除了。
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
       key 的特殊 attribute 主要用在 Vue 的虚拟 DOM 算法，在新旧 nodes 对比时辨识 VNodes。
       如果不使用 key，Vue 会使用一种最大限度减少动态元素并且尽可能的尝试就地修改/复用相同类型元素的算法。
       而使用 key 时，它会基于 key 的变化重新排列元素顺序，并且会移除 key 不存在的元素。
       有相同父元素的子元素必须有独特的 key。重复的 key 会造成渲染错误。
       最常见的用例是结合 v-for：
       <ul>
        <li v-for="item in items" :key="item.id">...</li>
        </ul>
        用于强制替换元素/组件而不是重复使用它。当你遇到如下场景时它可能会很有用：
            1.完整地触发组件的生命周期钩子
            2.触发过渡
19.Vue 的父组件和子组件生命周期钩子函数执行顺序/
父组件可以监听到子组件的生命周期吗
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
    比如有父组件 Parent 和子组件 Child，如果父组件监听到子组件挂载 mounted 就做一些逻辑处理，可以通过以下写法实现：
    以上需要手动通过 $emit 触发父组件的事件，更简单的方式可以在父组件引用子组件时通过 @hook 来监听即可，如下所示：
    当然 @hook 方法不仅仅是可以监听 mounted，其它的生命周期事件，例如：created，updated 等都可以监听。
20.在哪个生命周期内调用异步请求/什么阶段才能访问操作DOM？
    1.(created beforeMounted mounted)
    这三个钩子函数中data 已创建
    可将服务端端返回的数据进行赋值。
    推荐在 created 钩子函数中调用异步请求。
    created 钩子函数中调用异步请求优点： 
    1.能更快获取到服务端数据，减少页面 loading 时间；
    2.ssr(服务端渲染) 不支持 beforeMount 、mounted 钩子函数，所以放在 created 中有助于一致性；

    2.在钩子函数 mounted 被调用前，Vue 已经将编译好的模板挂载到页面上，所以在 mounted 中可以访问操作 DOM。
21.Vue API 实例属性/实例方法(数据/事件/生命周期)
    Vue中的$(内置的实例方法 属性)
        挂载在this上的vue内部属性
        内部api的命名空间
        一个特殊标记 增强区分 说明这是内置的实例方法属性
    核心：
        数据驱动 组件系统
    虽然没有完全遵循 MVVM 模型，但是 Vue 的设计也受到了它的启发。因此在文档中经常会使用 vm (ViewModel 的缩写) 这个变量名表示 Vue 实例。
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
        在下次 DOM 更新循环结束之后执行延迟回调。在修改数据之后立即使用这个方法，获取更新后的 DOM。
    3.Vue.set(target,propertyName/index,value)
        返回值：设置的值。
        用法：
            向响应式对象中添加一个 property，并确保这个新 property 同样是响应式的，且触发视图更新。它必须用于向响应式对象上添加新 property，因为 Vue 无法探测普通的新增 property (比如 this.myObject.newProperty = 'hi')
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
22.模板语法
    1.Vue.js 使用了基于 HTML 的模板语法，允许开发者声明式地将 DOM 绑定至底层 Vue 实例的数据。所有 Vue.js 的模板都是合法的 HTML，所以能被遵循规范的浏览器和 HTML 解析器解析。
    2.在底层的实现上，Vue 将模板编译成虚拟 DOM 渲染函数。结合响应系统，Vue 能够智能地计算出最少需要重新渲染多少组件，并把 DOM 操作次数减到最少。
    3.如果你熟悉虚拟 DOM 并且偏爱 JavaScript 的原始力量，你也可以不用模板，直接写渲染 (render) 函数，使用可选的 JSX 语法。
23.object.defineProperty(obj,prop,descriptor)
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
24.Proxy与Object.defineProperty
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
25.双向绑定
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
26.Vue中操作data中数组的方法中哪些可以触发视图更新，哪些不可以，不可以的话有什么解决办法？
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
27.mixin混入
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
28.过滤器
    Vue.js 允许你自定义过滤器，可被用于一些常见的文本格式化。过滤器可以用在两个地方：双花括号插值和 v-bind 表达式 (后者从 2.1.0+ 开始支持)。过滤器应该被添加在 JavaScript 表达式的尾部，由“管道”符号指示：
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
29.Vue单向数据流
        单向数据流(数据流是单向的。数据流动方向可以跟踪，流动单一，追查问题的时候可以更快捷。)
        1.所有的 prop 都使得其父子 prop 之间形成了一个单向下行绑定：
            父级 prop 的更新会向下流动到子组件中，但是反过来则不行。这样会防止从子组件意外改变父级组件的状态，从而导致你的应用的数据流向难以理解。
        2.每次父级组件发生更新时，子组件中所有的 prop 都将会刷新为最新的值。
            这意味着你不应该在一个子组件内部改变 prop。如果你这样做了，Vue 会在浏览器的控制台中发出警告。子组件想修改时，只能通过 $emit 派发一个自定义事件，父组件接收到后，由父组件修改。 
        有两种常见的试图改变一个 prop 的情形 : 
            1.这个 prop 用来传递一个初始值；这个子组件接下来希望将其作为一个本地的 prop 数据来使用。 在这种情况下，最好定义一个本地的 data 属性并将这个 prop 用作其初始值：
            2.这个 prop 以一种原始的值传入且需要进行转换。 在这种情况下，最好使用这个 prop 的值来定义一个计算属性
        缺点：
            写起来不太方便 要使UI发生变更就必须创建各种 action 来维护对应的 state
30.Vue一些指令(directive)及具体作用
        指令 (Directives)：
            是带有 v- 前缀的特殊 attribute。指令 attribute 的值预期是单个 JavaScript 表达式 (v-for 是例外情况，稍后我们再讨论)。指令的职责是，当表达式的值改变时，将其产生的连带影响，响应式地作用于 DOM。
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
                (主要用在 Vue 的虚拟 DOM 算法)
                主要用在 Vue 的虚拟 DOM 算法 
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
31.Vue中的template
    template的作用是模板占位符，可帮助我们包裹元素，但在循环过程当中，template不会被渲染到页面上
    template标签内容天生不可见，设置了display：none；
    要操作template标签内部的dom必须要用下面的方法–content属性：
    三种写法：
        1.字符串模板写法(直接写在vue构造器中)
            这种写法比较直观,适用于html代码不多的场景,但是如果模板里html代码太多,不便于维护,不建议这么写.
        2.写在template标签里,这种写法跟写html很像.
        3.写在script标签里,这种写法官方推荐,vue官方推荐script中type属性加上"x-template"        
32.vue中的slot
    1.单个插槽 | 默认插槽 | 匿名插槽 <slot></slot>
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
33.Vue中的component
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
        直接在 DOM (即非字符串的模板) 中使用时只有 kebab-case 是有效的
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
34.
$route(路由信息对象 包括path params hash query fullPath matched name等路由信息参数) 
$router(vue-router实例对象 包括路由跳转方法 钩子函数)
的区别
        $router(vue-router实例对象 包括路由跳转方法 钩子函数)
            为 VueRouter 实例，想要导航到不同 URL，则使用 $router.push
            是VueRouter的一个对象，通过Vue.use(VueRouter)和Vu构造函数得到一个router的实例对象，这个对象中是一个全局的对象，他包含了所有的路由，包含了许多关键的对象和属性。
            以history对象来举例：
            $router.push({path:'home'})，本质是向history栈中添加一个路由，在我们看来是切换路由，但本质是在添加一个history记录 
        $route(路由信息对象 包括path params hash query fullPath matched name等路由信息参数) 
            $route是一个跳转的路由对象，每一个路由都会有一个$route对象，是一个局部的对象，可以获取对应的name，path，params，query等 
            为当前 router 跳转对象里面可以获取 name 、 path 、 query 、 params 等
            $route.path 字符串，等于当前路由对象的路径，会被解析为绝对路径，如/home/ews
            $route.params 对象，含路有种的动态片段和全匹配片段的键值对，不会拼接到路由的url后面
            $route.query 对象，包含路由中查询参数的键值对。会拼接到路由url后面
            $route.router 路由规则所属的路由器
            $route.matchd 数组，包含当前匹配的路径中所包含的所有片段所对象的配置参数对象
            $route.name 当前路由的名字，如果没有使用具体路径，则名字为空
35.vue-router使用
query(path引入 接参 this.$route.query.name 类似get传参 参数地址栏显示 拼接在url后面的参数，没有也没关系 不设置 没关系)
params(name引入 接参 this.$route.params.name 类似post传参 参数地址栏不显示 是路由的一部分,必须要有 不设置 刷新页面或者返回参数会丢失)
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
36.
Vue-router(SPA single page application的路径管理器 WebApp的链接路径管理系统)
hash模式(浏览器环境) 
history模式 
abstract模式(Nodejs环境)
SPA(Vue的单页面应用是基于路由和组件的 路由用于设定访问路径 并将路径和组件映射起来)
(SPA核心之一 更新视图而不重新请求页面)
(SPA加载页面时，不会加载整个页面，而是只更新某个指定的容器中内容)
(传统的页面应用 超链接实现页面切换跳转
vue-router单页面应用 路径之间的切换 即组件的切换)
(路由模块的本质 就是建立起url和页面之间的映射关系。)
(vue-router实现单页面前端路由 提供两种方式(mode参数决定)：
    Hash模式(vue-router默认 
        1.使用 URL 的 hash 来模拟一个完整的 URL，于是当 URL 改变时，页面不会重新加载 hash（#）是URL 的锚点，代表的是网页中的一个位置，单单改变#后的部分，浏览器只会滚动到相应位置，不会重新加载网页
        2.hash 出现在 URL 中，但不会被包含在 http 请求中，对后端完全没有影响，因此改变 hash 不会重新加载页面；同时每一次改变#后的部分，都会在浏览器的访问历史中增加一个记录，使用”后退”按钮，就可以回到上一个位置；
        3.Hash模式通过锚点值的改变，根据不同的值，渲染指定DOM位置的不同数据。hash 模式的原理是 onhashchange 事件(监测hash值变化)，可以在 window 对象上监听这个事件。)
    History模式(依赖HTML5 History API和服务器配置
        1.这种模式充分利用了html5 history interface 中新增的 pushState() 和 replaceState() 方法。这两个方法应用于浏览器记录栈，在当前已有的 back、forward、go 基础之上，它们提供了对历史记录修改的功能。只是当它们执行修改时，虽然改变了当前的 URL ，但浏览器不会立即向后端发送请求。
        2.需要后台配置支持 要在服务端增加一个覆盖所有情况的候选资源：如果 URL 匹配不到任何静态资源，则应该返回同一个 index.html 页面，这个页面就是你 app 依赖的页面。
        3.解决了hash模式存在的问题. hash的传参是基于URL的, 如果要传递复杂的数据, 会有体积限制, 而history模式不仅可以在URL里传参, 也可以将数据存放到一个特定的对象中
    )
)
(vue-router使用路由模块来实现页面跳转的方式
    1.直接修改地址栏
    2.编程式的导航 this.$router.push(‘路由地址’)
    3.声明式的导航 <router-link to="路由地址"></router-link>
)
(vue-router参数传递
    1.name传递参数
        路由文件src/router/index.js里配置name属性
        模板里(src/App.vue)用$route.name来接收 比如：<p>{{ $route.name}}</p>
    2.<router-link> 标签中的to传参
        <router-link :to="{name:xxx,params:{key:value}}">valueString</router-link>
        ...
    3.利用url传递参数----在配置文件里以冒号的形式设置参数。   
    4. 使用path来匹配路由，然后通过query来传递参数
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
    1.前端路由(vue-rooter)
        vue-rooter 此处的路由不是指我们平时所说的硬件路由器 是SPA（单页应用）的路径管理器
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
        使用 URL 的 hash 来模拟一个完整的 URL，于是当 URL 改变时，页面不会重新加载。 hash（#）是URL 的锚点，代表的是网页中的一个位置，单单改变#后的部分，浏览器只会滚动到相应位置，不会重新加载网页，也就是说hash 出现在 URL 中，但不会被包含在 http 请求中，对后端完全没有影响，因此改变 hash 不会重新加载页面；同时每一次改变#后的部分，都会在浏览器的访问历史中增加一个记录，使用”后退”按钮，就可以回到上一个位置；所以说Hash模式通过锚点值的改变，根据不同的值，渲染指定DOM位置的不同数据。hash 模式的原理是 onhashchange 事件(监测hash值变化)，可以在 window 对象上监听这个事件。

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
37.SPA 单页面的理解 优缺点 优化首屏加载速度慢的问题
        SPA（ single-page application ）
            仅在 Web 页面初始化时加载相应的 HTML、JavaScript 和 CSS。一旦页面加载完成，SPA 不会因为用户的操作而进行页面的重新加载或跳转；
            取而代之的是利用路由机制实现 HTML 内容的变换，UI 与用户的交互，避免页面的重新加载。
        优点：
            1.良好的交互体验
                用户体验好、快，内容的改变不需要重新加载整个页面，避免了不必要的跳转和重复渲染；
            2.良好的前后端工作分离模式
                前后端职下·责分离，架构清晰，前端进行交互逻辑，后端负责数据处理；
            3.减轻服务器压力
                基于上面一点，SPA 相对对服务器压力小；
        缺点：
            4.SEO(Search Engine Optimization搜索引擎优化)难度较高
                由于所有的内容都在一个页面中动态替换显示，所以在 SEO 上其有着天然的弱势。
            5.前进、后退管理 
                由于单页应用在一个页面中显示所有的内容，所以不能使用浏览器的前进后退功能，所有的页面切换需要自己建立堆栈管理；
            6.初次加载耗时多 
                为实现单页 Web 应用功能及显示效果，需要在加载页面的时候将 JavaScript、CSS 统一加载，部分页面按需加载；
        优化：
            1.将公用的JS库通过script标签外部引入，减小app.bundel的大小，让浏览器并行下载资源文件，提高下载速度；
            2.在配置 路由时，页面和组件使用懒加载的方式引入，进一步缩小 app.bundel 的体积，在调用某个组件时再加载对应的js文件；
            3.加一个首屏 loading 图，提升用户体验；
38.MVC(Model View Controller)
MVVM(Model View ViewModel) 
MVP(Model View Presenter) 
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
39.Vue数组中对象删除属性delete和Vue.delete删除数组区别
    delete只是被删除的元素变成了 empty/undefined 其他的元素的键值还是不变。
        delete this.a[1]
        this.$set(this.a)
    Vue.delete直接删除了数组 改变了数组的键值。
        this.$delete(this.b, 1)
40.Vue 组件 data是函数(每个实例可以维护一份被返回对象的独立的拷贝)
41.怎么动态绑定Class和Style
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
42.(computed data props methods 都会被挂载在vm实例上，因此这三个都不能同名。)
43.created和mounted
    1.在created中，页面视图未出现，如果请求信息过多，页面会长时间处于白屏状态，DOM节点没出来，无法操作DOM节点。
    2.在mounted不会这样，比较好。
44.计算属性computed(避免在模板中放入太多的逻辑，导致模板过重且难以维护。)
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
45.
1.
计算属性computed
(计算属性是基于它们的响应式依赖进行缓存的,只在相关响应式依赖发生改变时它们才会重新求值)
事件methods
(只要发生重新渲染，method 调用总会执行该函数)
methods方法 watch属性 不能用this
this会是undefind,
因为箭头函数中的this指向的是定义时的this，而不是执行时的this，所以不会指向Vue实例的上下文。
2.
computed
(计算属性/依赖多个属性/缓存结果时每次都会重新创建变量/计算开销比较大(计算次数多或者异步处理)/通过return返回)
和watch
(侦听器/依赖一个属性/直接计算，不会创建变量保存结果/计算开销比较大(计算次数多或者异步处理)/不需要return) 
在选项参数中指定deep: true 可深度监听
在选项参数中指定immediate: true将立即以表达式的当前值触发回调。监听后立即调用
46. Vue 中自定义指令
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
47.Vuex(State Getters Mutations Actions Module)
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
    13.Vuex中使用mutation需注意必须时同步函数
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
    1.怎么重定向页面？
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
    2.怎么配置404页面？
        const router = new VueRouter({
            routes: [
                {
                    path: '*', redirect: {path: '/'}
                }
            ]
        })
    3.切换路由时，需要保存草稿的功能，怎么实现呢？
        <keep-alive :include="include">
            <router-view></router-view>
        </keep-alive>
        其中include可以是个数组，数组内容为路由的name选项的值。
    4.路由有几种模式？说说它们的区别？
        1.hash: 兼容所有浏览器，包括不支持 HTML5 History Api 的浏览器，例http://www.abc.com/#/index，hash值为#/index， hash的改变会触发hashchange事件，通过监听hashchange事件来完成操作实现前端路由。hash值变化不会让浏览器向服务器请求。// 监听hash变化，点击浏览器的前进后退会触发
        window.addEventListener('hashchange', function(event){ 
            let newURL = event.newURL; // hash 改变后的新 url
            let oldURL = event.oldURL; // hash 改变前的旧 url
        },false)
        复制代码
        2.history: 兼容能支持 HTML5 History Api 的浏览器，依赖HTML5 History API来实现前端路由。没有#，路由地址跟正常的url一样，但是初次访问或者刷新都会向服务器请求，如果没有请求到对应的资源就会返回404，所以路由地址匹配不到任何静态资源，则应该返回同一个index.html 页面，需要在nginx中配置。
        3.abstract: 支持所有 JavaScript 运行环境，如 Node.js 服务器端。如果发现没有浏览器的 API，路由会自动强制进入这个模式。
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
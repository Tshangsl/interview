//template
//组件的定义 全局组件 局部组件
//slot
//scope
1.vue初始化和生命周期钩子函数
(初始化:开始创建、初始化数据、编译模板、挂载Dom、数据变化时更新DOM、卸载)
(生命周期:Vue实例从创建到销毁的过程)
(生命周期钩子函数
beforeCreate(
    实例初始化之后 创建之前 
    数据data也没有 DOM也没生成。
    el  undefined
    data undefined
    meaasge undefined
)
created(
    实例创建完成后
    能读取到数据data的值 DOM还没生成，挂载属性el还不存在。
    el  undefined
    data [Object Object]
    meaasge Vue生命周期
)
beforeMount(
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
    调用实例的destroy( )方法可以销毁当前的组件，在销毁前，
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
        2.生命周期钩子自动绑定this到实例上 因此你可以通过this操作访问到数据和方法。注意不能使用箭头函数例如下方代码，因为箭头函数绑定外层的this会一直往上找。
        Vue生命周期钩子函数：
        1.beforeCreate() 
            组件实例被创建之初 组件的属性生效之前
            初始化了部分参数 如果有相同的参数 做了参数合并 执行beforeCreate
        2.created() 
            组件实例已经完全创建 属性也绑定 但真实dom还没生成 $el还不可用
            初始花了Inject Provide props methods data computed watch执行created
        3.beforeMount() 
            虚拟dom已创建完成，在数据渲染前最后一次更改数据 在挂载开始之前被调用 相关的render函数首次被调用
            检查是否存在el属性 存在的话进行渲染dom操作 执行beforeMount
        4.mounted() 
            el被新创建的vm.$el替换 并挂载到实例上去之后调用该钩子 页面、数据渲染完成，真实dom挂载完成
            实例化watcher 渲染dom 执行mounted
        5.beforeUpadate() 
            组件数据更新之前调用 发生在虚拟DOM打补丁之前 重新渲染之前触发
            渲染dom后 执行了mounted钩子后 在数据更新的时候 执行beforeUpdate
        6.updated() 
            组件数据更新之后 数据已经更改完成，dom 也重新 render 完成,更改数据会陷入死循环
            检查当前的watcher列表中 是否存在当前要更新数据的watcher 如果存在就执行updated
        7.beforeDestory() 
            销毁前执行（实例仍然完全可用）
            检查是否已经被卸载 如果已经被卸载 就直接return出去 否则执行beforeDestory 
        8.destoryed()
            销毁后执行
            把所有有关自己痕迹的地方 都删除掉
        9.activited() 
            keep-alive专属 组件被激活时调用
        10.deactived() 
            keep-alive专属 组件被销毁时调用
2.keep-alive 
        keep-alive:
            Vue 内置的一个组件，可以使被包含的组件保留状态，或避免重新渲染
            特性:
                一般结合路由和动态组件一起使用，用于缓存组件；
                提供 include 和 exclude 属性，两者都支持字符串或正则表达式， 
                include 表示只有名称匹配的组件会被缓存，exclude 表示任何名称匹配的组件都不会被缓存 ，
                其中 exclude 的优先级比 include 高；
                对应两个钩子函数 activated 和 deactivated ，当组件被激活时，触发钩子函数 activated，
                当组件被移除时，触发钩子函数 deactivated。
                <keep-alive>
                <component>
                    <!-- 该组件将被缓存！ -->
                </component>
                </keep-alive>
                可以使用API提供的props，实现组件的动态缓存
3.Vue 的父组件和子组件生命周期钩子函数执行顺序/
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
4.在哪个生命周期内调用异步请求/什么阶段才能访问操作DOM？
    1.(created beforeMounted mounted)
    这三个钩子函数中data 已创建
    可将服务端端返回的数据进行赋值。
    推荐在 created 钩子函数中调用异步请求。
    created 钩子函数中调用异步请求优点： 
    1.能更快获取到服务端数据，减少页面 loading 时间；
    2.ssr(服务端渲染) 不支持 beforeMount 、mounted 钩子函数，所以放在 created 中有助于一致性；

    2.在钩子函数 mounted 被调用前，Vue 已经将编译好的模板挂载到页面上，所以在 mounted 中可以访问操作 DOM。
1.Vue API 实例属性/实例方法(数据/事件/生命周期)
    Vue中的$(内置的实例方法 属性)
        挂载在this上的vue内部属性
        内部api的命名空间
        一个特殊标记 增强区分 说明这是内置的实例方法属性
    核心：
        数据驱动 组件系统
    vm(Virtual Model)是Vue的一个实例
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
2.object.defineProperty(obj,prop,descriptor)
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
2.几种实现双向绑定的做法
    目前几种主流的mvc(vm)框架都实现了单向数据绑定，而我所理解的双向数据绑定无非就是在单向绑定的基础上给可输入元素（input、textare等）添加了change(input)事件，来动态修改model和 view，并没有多高深。所以无需太过介怀是实现的单向或双向绑定。
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
3.Vue的双向绑定(数据<=>视图)数据的原理 Vue2.x Vue3.x双向绑定原理的不同
    Vue2.x
    (原理:通过Object对象的defineProperty属性 重写data的set和
    get函数实现)
    (原理 数据劫持+发布者-订阅者模式 
    Object.defineProperty()劫持各个属性setter getter
    数据变动时发布消息给订阅者 
    触发相应监听回调
    )
    Vue3.x
    (Proxy)
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
4.Vue响应式原理/Vue框架怎么实现对象和数组的监听
    1.当你把一个普通的 JavaScript 对象传入 Vue 实例作为 data 选项，vue会遍历data选项的属性，用 Object.defineProperty把这些 property 全部转为 getter/setter 内部让Vue追踪相关依赖，在property被访问和修改时通知变化。
    2.每个组件实例都有相应的 watcher 程序实例，它会在组件渲染的过程中把接触过的数据Proerty记录为依赖，之后当依赖项的 setter 被调用时，会通知 watcher 重新计算，从而致使它关联的组件得以更新。
    3.检测变化的注意事项
    由于 JavaScript 的限制，Vue 不能检测数组和对象的变化。尽管如此我们还是有一些办法来回避这些限制并保证它们的响应性。
    4.对于对象
        Vue 无法检测 property 的添加或移除 实例创建之后添加新的属性到实例上，它不会触发视图更新
        由于 Vue 会在初始化实例时对 property 执行 getter/setter 转化，所以 property 必须在 data 对象上存在才能让 Vue 将它转换为响应式的。
        对于已经创建的实例，Vue 不允许动态添加根级别的响应式 property。
        解决方法:
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
    5.对于数组
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
    6.声明响应式 property
        由于 Vue 不允许动态添加根级响应式 property，所以你必须在初始化实例前声明所有根级响应式 property，哪怕只是一个空值：
    7.异步更新队列
        Vue 在更新 DOM 时是异步执行的。只要侦听到数据变化，Vue 将开启一个队列，并缓冲在同一事件循环中发生的所有数据变更。如果同一个 watcher 被多次触发，只会被推入到队列中一次。这种在缓冲时去除重复数据对于避免不必要的计算和 DOM 操作是非常重要的。然后，在下一个的事件循环“tick”中，Vue 刷新队列并执行实际 (已去重的) 工作。Vue 在内部对异步队列尝试使用原生的 Promise.then、MutationObserver 和 setImmediate，如果执行环境不支持，则会采用 setTimeout(fn, 0) 代替。
        例如，当你设置 vm.someData = 'new value'，该组件不会立即重新渲染。当刷新队列时，组件会在下一个事件循环“tick”中更新。
        (Vue框架怎么实现对象和数组的监听)
        8.数据双向绑定中 Object.defineProperty() 
        只能对属性进行数据劫持，不能对整个对象进行劫持，同理无法对数组进行劫持
        Vue 能检测到对象和数组（部分方法的操作）的变化
        对象和数组的监听：
            通过遍历数组 和递归遍历对象
            达到利用 Object.defineProperty() 也能对对象和数组（部分方法的操作）进行监听。
7.Vue 的单向数据流 双向数据绑定
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
        双向数据绑定
            数据之间是相通的，将数据变更的操作隐藏在框架内部。优点是在表单交互较多的场景下，会简化大量与业务无关的代码。缺点就是无法追踪局部状态的变化，增加了出错时 debug 的难度
8.Vue中事件修饰符(modifier)
    修饰符 (modifier) 
        是以半角句号 . 指明的特殊后缀，用于指出一个指令应该以特殊方式绑定。例如，.prevent 修饰符告诉 v-on 指令对于触发的事件调用 event.preventDefault()：
    为了更纯粹的数据逻辑，vue提供了很多事件修饰符，来代替处理一些 DOM 事件细节。
        1 .stop：防止事件冒泡，等同于JavaScript中的event.stopPropagation()
        2 .prevent：防止执行预设的行为，等同于JavaScript中的event.preventDefault()
        3 .capture：捕获冒泡
        4 .self：将事件绑定到自身，只有自身才能触发
        5 .once：只触发一次
        6 .passive：不阻止事件的默认行为
9.Vue一些指令(directive)及具体作用
        指令 (Directives)：
            是带有 v- 前缀的特殊 attribute。指令 attribute 的值预期是单个 JavaScript 表达式 (v-for 是例外情况，稍后我们再讨论)。指令的职责是，当表达式的值改变时，将其产生的连带影响，响应式地作用于 DOM。
        1.v-html/v-text(可简写为{{}}并支持逻辑运算)
            v-html:
                会以html的方式把内容载入页面中
                浏览器会将其当作html标签解析后输出
            v-text：(单向绑定 数据对象=>插值)
                操作纯文本 浏览器不会再对其进行html解析
                会把全部内容转化为字符串
                注:vue中有个指令叫做 v-once 可以通过v-once与v-text结合，实现仅执行一次性的插值
        2.v-show/v-if
            v-show
            1.无论初始条件 元素总被渲染 只是简单基于CSS的display属性进行切换
            2.适用需要频繁切换条件的场景
            仅仅控制元素的显示方式，将 display 属性在 block 和 none 来回切换
            就简单得多——不管初始条件是什么，元素总是会被渲染，并且只是简单地基于 CSS 的 “display” 属性进行切换。
            v-show 则是不管值为 true 还是 false ，html 元素都会存在，只是 CSS 中的 display 显示或隐藏
            v-if
            1.真正的条件渲染 惰性
            2.适用不需要频繁切换条件的场景
            会确保在切换过程中条件块内的事件监听器和子组件适当地被销毁和重建；
            如果在初始渲染时条件为假，则什么也不做——直到条件第一次变为真时，才会开始渲染条件块。
            控制这个 DOM 节点的存在与否。
            使用了 v-if 的时候，如果值为 false ，那么页面将不会有这个 html 标签生成。
        3.v-on(@)/v-bind(:)/v-model
            1.v-on(用于绑定HTML事件 缩写@) 
                对象同时绑定多个事件时 不能用@代替v-on
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
            4.v-bind与v-model区别
                1:v-bind动态绑定指令，默认情况下标签自带属性的值是固定的，在为了能够动态的给这些属性添加值，可以使用v-bind:你要动态变化的值="表达式"
                2:v-bind用于绑定属性和数据 ，其缩写为“ : ” 也就是v-bind:id  === :id  
                3:v-model用在表单控件上的，用于实现双向数据绑定，所以如果你用在除了表单控件以外的标签是没有任何效果的。
        4.v-for
            key作用：(主要用在 Vue 的虚拟 DOM 算法)
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
10.Vue中的template
    template标签内容天生不可见，设置了display：none；
    要操作template标签内部的dom必须要用下面的方法–content属性：
    三种写法：
        1.字符串模板写法(直接写在vue构造器中)
            这种写法比较直观,适用于html代码不多的场景,但是如果模板里html代码太多,不便于维护,不建议这么写.
        2.写在template标签里,这种写法跟写html很像.
        3.写在script标签里,这种写法官方推荐,vue官方推荐script中type属性加上"x-template"        
11.vue中的slot
12.Vue中的component(el是根实例特有的选项)
    组件是可复用的 Vue 实例，所以它们与 new Vue 接收相同的选项，例如 data、computed、watch、methods 以及生命周期钩子等。仅有的例外是像 el 这样根实例特有的选项。
    每个组件都会各自独立维护它的 count。因为你每用一次组件，就会有一个它的新实例被创建。
    组件命名规范：
    W3C 规范中的自定义组件名 (字母全小写且必须包含一个连字符这会帮助你避免和当前以及未来的 HTML 元素相冲突。
    全局注册
        Vue.component 全局注册
        Vue.component('my-component-name', {
        // ... options ...
        })
        prop:
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
22.Class与Style如何动态绑定 ？?/
        Class 可以通过对象语法和数组语法进行动态绑定：
        对象语法
        数组语法
        Style 也可以通过对象语法和数组语法进行动态绑定：
        对象语法
        数组语法
8.
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
9.vue-router使用
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
10.
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
8.SPA 单页面的理解 优缺点 优化首屏加载速度慢的问题
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
8.MVC(Model View Controller)
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
        Model和View并无直接关联 而是通过ViewModel来进行联系的 
        Model和ViewModel之间有着双向数据绑定的联系
        因此当Model中的数据改变时会触发View层刷新
        View中由于用户交互操作而改变的数据也会在Model中同步
        这种模式实现了Model和View的数据自动同步 因此开发者只需要专注对数据的维护操作即可 而不需要自己操作DOM
        唯一区别：
            它采用双向绑定（data-binding）：View的变动，自动反映在 ViewModel，反之亦然。Angular 和 Ember 都采用这种模式。
        1.各部分之间的通信，都是双向的
        2.采用双向绑定：View 的变动，自动反映在 ViewModel，反之亦然
9.虚拟DOM&DOM-diff
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
    DOM-diff：(比较两颗虚拟DOM树区别的算法)
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
11. 组件通信
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
11.NextTick 是做什么的 其原理
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
30.Vue数组中对象删除属性delete和Vue.delete删除数组区别
    delete只是被删除的元素变成了 empty/undefined 其他的元素的键值还是不变。
        delete this.a[1]
        this.$set(this.a)
    Vue.delete直接删除了数组 改变了数组的键值。
        this.$delete(this.b, 1)
12. Vue 组件 data 为什么必须是函数
(每个实例可以维护一份被返回对象的独立的拷贝)
(如果 Vue 没有这条规则，点击一个按钮就可能会像如下代码一样影响到其它所有实例：)
        JS本身的特性
        如果 data 是一个对象，那么由于对象本身属于引用类型，当我们修改其中的一个属性时，会影响到所有Vue实例的数据。
        如果将 data 作为一个函数返回一个对象，那么每一个实例的 data 属性都是独立的，不会相互影响了
13. computed 的实现原理
        computed 本质是一个惰性求值的观察者。
        computed 内部实现了一个惰性的 watcher,也就是 computed watcher,computed watcher 不会立刻求值,同时持有一个 dep 实例。
        其内部通过 this.dirty 属性标记计算属性是否需要重新求值。
        当 computed 的依赖状态发生改变时,就会通知这个惰性的 watcher
        computed watcher 通过 this.dep.subs.length 判断有没有订阅者
        有的话,会重新计算,然后对比新旧值,如果变化了,会重新渲染。 (Vue 想确保不仅仅是计算属性依赖的值发生变化，而是当计算属性最终计算的值发生变化时才会触发渲染 watcher 重新渲染，本质上是一种优化。)没有的话,仅仅把 this.dirty = true。 (当计算属性依赖于其他数据时，属性并不会立即重新计算，只有之后其他地方需要读取属性的时候，它才会真正计算，即具备 lazy（懒计算）特性。)
13.计算属性computed 和事件 methods 有什么区别
        相同点:
            我们可以将同一函数定义为一个 method 或者一个计算属性。对于最终的结果，两种方式是相同的
        不同点：
            computed: 计算属性是基于它们的依赖进行缓存的,只有在它的相关依赖发生改变时才会重新求值对于 method ，只要发生重新渲染，method 调用总会执行该函数
14.computed(计算属性)和watch(侦听器/属性) 的区别和运用的场景？
        computed(计算属性/依赖其他属性值/有缓存/依赖值改变下一次获取)
            (计算属性是基于它们的响应式依赖进行缓存的)
            对于任何复杂逻辑，你都应当使用计算属性。
            计算属性默认只有 getter，不过在需要时你也可以提供一个 setter：
            声明了一个计算属性 reversedMessage。我们提供的函数将用作 property vm.reversedMessage 的 getter 函数：
            可以通过在表达式中调用方法来达到同样的效果：
            是计算属性，依赖其它属性值，并且 computed 的值有缓存，只有它依赖的属性值发生改变，下一次获取 computed 的值时才会重新计算 computed  的值； 
        watch:(观察/类似某些数据监听回调/监听数据改变时触发回调)
            更多的是「观察」的作用，类似于某些数据的监听回调 ，每当监听的数据变化时都会执行回调进行后续操作；
        运用场景：
            computed：
            当我们需要进行数值计算，并且依赖于其它数据时，应该使用 computed，因为可以利用 computed 的缓存特性，避免每次获取值时，都要重新计算；
            watch：s
            当我们需要在数据变化时执行异步或开销较大的操作时，应该使用 watch，使用 watch 选项允许我们执行异步操作 ( 访问一个 API )，限制我们执行该操作的频率，并在我们得到最终结果前，设置中间状态。这些都是计算属性无法做到的。
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
18. Vue 中 key 的作用
        key 的特殊属性主要用在 Vue 的虚拟 DOM 算法，在新旧 nodes 对比时辨识 VNodes。
        如果不使用 key，Vue 会使用一种最大限度减少动态元素并且尽可能的尝试修复/再利用相同类型元素的算法。
        使用 key，它会基于 key 的变化重新排列元素顺序，并且会移除 key 不存在的元素。
        有相同父元素的子元素必须有独特的 key。重复的 key 会造成渲染错误

        key 是为 Vue 中 vnode 的唯一标记，通过这个 key，我们的 diff 操作可以更准确、更快速。
        Vue 的 diff 过程可以概括为：
            oldCh 和 newCh 各有两个头尾的变量
            oldStartIndex、oldEndIndex 和 newStartIndex、newEndIndex，
            它们会新节点和旧节点会进行两两对比，
            即一共有4种比较方式：
                newStartIndex 和oldStartIndex 、
                newEndIndex 和  oldEndIndex 、
                newStartIndex 和 oldEndIndex 、
                newEndIndex 和 oldStartIndex，
                如果以上 4 种比较都没匹配，如果设置了key，就会用 key 再进行比较
                在比较的过程中，遍历会往中间靠，一旦 StartIdx > EndIdx 
                表明 oldCh 和 newCh 至少有一个已经遍历完了，就会结束比较。
                具体有无 key 的 diff 过程，可以查看作者写的另一篇详解虚拟 DOM 的文章《深入剖析：Vue核心之虚拟DOM》 所以 Vue 中 key 的作用是：key 是为 Vue 中 vnode 的唯一标记，通过这个 key，我们的 diff 操作可以更准确、更快速
        更准确：
            因为带 key 就不是就地复用了，在 sameNode 函数 a.key === b.key 对比中可以避免就地复用的情况。所以会更加准确。
        更快速：
            利用 key 的唯一性生成 map 对象来获取对应节点，比遍历方式更快
13.Vuex
    1.定义:
        一个专为 Vue.js 应用程序开发的状态管理插件。
        它采用集中式存储管理应用的所有组件的状态
        更改状态的唯一方法是提交mutation，
        例this.$store.commit('SET_VIDEO_PAUSE', video_pause，SET_VIDEO_PAUSE为mutations属性中定义的方法
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
        
24.Vuex()
    定义：
        一个专为 Vue.js 应用程序开发的状态管理模式。
        每一个 Vuex 应用的核心就是 store（仓库）。
        “store” 基本上就是一个容器，它包含着你的应用中大部分的状态 ( state )。
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
25.Vue SSR(Service Side Render Vue服务端渲染)
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
29.Vue项目优化
        1.代码层面的优化 
            v-if 和 v-show 区分使用场景
            computed 和 watch区分使用场景
            v-for 遍历必须为 item 添加 key，且避免同时使用 
            v-if长列表性能优化事件的销毁图片资源懒加载路由懒加载第三方插件的按需引入优化无限列表性能服务端渲染 SSR or 预渲染
        2.Webpack 层面的优化 Webpack 对图片进行压缩减少 ES6 转为 ES5 的冗余代码提取公共代码模板预编译提取组件的 CSS优化 SourceMap构建结果输出分析Vue 项目的编译优化
        3.基础的 Web 技术的优化  开启 gzip 压缩  浏览器缓存  CDN 的使用  使用 Chrome Performance 查找性能瓶颈
30.Vue优点
    1.轻量级框架：只关注视图层，是一个构建数据的视图集合，大小只有几十kb；
    2.简单易学：国人开发，中文文档，不存在语言障碍 ，易于理解和学习；
    3.双向数据绑定：保留了angular的特点，在数据操作方面更为简单；
    组件化：保留了react的优点，实现了html的封装和重用，在构建单页面应用方面有着独特的优势；
    4.视图，数据，结构分离：使数据的更改更为简单，不需要进行逻辑代码的修改，只需要操作数据就能完成相关操作；
    5.虚拟DOM：dom操作是非常耗费性能的，不再使用原生的dom操作节点，极大解放dom操作，但具体操作的还是dom不过是换了另一种方式；
    6.运行速度更快:相比较与react而言，同样是操作虚拟dom，就性能而言，vue存在很大的优势。
31.Vue和React和jQuery区别
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
33.vue-admin-template&Element UI
    vue-admin-template:
    一个极简的vue admin管理后台 只包含 Element UI &axios &iconfont&permission control &init 这些搭建后台必要的东西
    目前版本 v4.0+ 基于Vue-Cli构建
    Element UI:
    基于Vue2.0的组件库
34.Vue-Cli配置功能
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
35.搭建Vue环境
    Webpack:模块打包机 可以分析你的项目依赖以及一些浏览器不能直接运行的语言 jsx vue 等转换成js css文件等 供浏览器使用
        注:JSX是一种JavaScript的语法扩展 适用于React框架中
    1.搭建Webpack基本环境
    1.2.配置功能
        1.新建一个build文件夹 用来存放webpack配置相关的文件
        2.在build文件夹下新建一个webpack.config.js配置webpack基本配置
        3.修改webpack.config.js配置
        4.修改package.json将之前添加的serve修改为
            "serve": "webpack ./src/main.js --config ./build/webpack.config.js"
    2.1配置ES6/7/8转ES5代码
        1.安装相关依赖
        2.修改webpack.config.js配置
        3.在项目根目录添加一个babel.config.js文件
        4.执行 npm run serve 命令，可以看到 ES6代码被转成了ES5代码
    2.1.1 ES6/7/8 Api 转es5
        babel-loader只会将 ES6/7/8语法转换为ES5语法，但是对新api并不会转换。
        1.通过 babel-polyfill 对一些不支持新语法的客户端提供新语法的实现
        2.修改webpack.config.js配置
    2.1.2 按需引入polyfill
        1.安装相关依赖
        2.修改 babel-config.js
    2.2 配置 scss 转 css
        没配置 css 相关的 loader 时，引入scss、css相关文件打包的话，会报错
        1.安装相关依赖
        npm install sass-loader dart-sass css-loader style-loader -D
            1.sass-loader, dart-sass主要是将 scss/sass 语法转为css
            2.css-loader主要是解析 css 文件
            3.style-loader 主要是将 css 解析到 html页面 的 style 上
        2.修改webpack.config.js配置
36.Vue 2.x Vue 3.x
37.shim()
    shim是一个小型库，可透明地截取API，更改传递的参数，处理操作本身，或将操作重定向到别处。垫片通常在API的行为发生变化时出现，从而导致仍依赖旧功能的旧应用程序出现兼容性问题。在这些情况下，较新的代码之上的较薄的兼容层仍然可以支持较旧的API。垫片也可以用于在不同的软件平台上运行程序，而不是开发它们。
### <router-view> Props
>name
- 如果<router-view>设置了name 则会渲染对应的路由配置中components下的相应组件
> route
- 一个路由地址的所有组件都已被解析(如果所有组件都被懒加载)因此可以显示
### vue-router 不同的历史模式

- 在创建路由器实例时 history 配置允许在不同的历史模式中进行选择
  > Hash 模式
- 用 createWebHashHistory()创建

```
import {createRouter,createWebHistory} from  'vue-router'
const router = createRouter({
    history:createWebHashHistory(),
    routes:[]
})
```

> HTML5 模式

- 用 createWebHistory()创建 HTML5 模式 推荐使用这个模式

```
import {createRouter,createWebHistory} from 'vue-router'
const router = createRouter({
    history:createWebHistory(),
    routes:[]
})
```

### router

- 通过调用 app.use(router) 可以在任意组件中以 this.$router的形式访问 并以this.$route 的形式访问当前路由
- this.$router 与直接使用通过 createRouter 创建的 router 实例完全相同
- 使用 this.$router 的原因是不想在每个需要操作路由的组件中都导入路由

> Sensitive 与 strict 路由配置

- 默认情况下 所有路由是不区分大小写的 并且能匹配带有或不带有尾部斜线的路由
- 如/users 将匹配/users /users/ /Users
- 这种行为可以通过 strcit 和 sensitive 选项来修改 可以应用在整个全局路由上和当前路由上

### h createElement

- 将 h 作为 createElement 的别名是 Vue 生态系统中的一个通用管理 实际上也是 JSX 所要求的
- 从 Vue 的 Babel 插件的 3.4.0 版本开始 以 ES2015 语法声明的含有 JSX 的任何方法和 getter 中(不是函数或箭头函数中)自动注入 const h = this.createElemeny 这样就可以去掉(h)参数 对于更早版本的插件 如果 h 在当前作用域中不可用 应用会抛错

### vue 插件

> 插件

- 插件通常用来为 Vue 添加全局功能 插件的功能范围没有严格的限制 一般有以下几种

1. 添加全局方法或者 property 如 vue-custom-element
2. 添加全局资源：指令/过滤器/过渡等 如 vue-touch
3. 通过全局混入来添加一些组件选项 如 vue-router
4. 添加 Vue 实例方法 通过把它们添加到 Vue.prototype 上实现
5. 一个库 提供自己的 API 同时提供上面提到的一个或多个功能

> 使用插件

- 通过全局方法 Vue.use()使用插件 它需要在你调用 new Vue()启动应用之前完成
- 可以传入一个可选的选项对象
- Vue.use 会自动阻止多次注册相同插件 即使多次调用也只会注册一次该插件
- Vue.js 官方提供的一些插件(如 vue-router)在监测到 Vue 是可访问的全局变量时会自动调用 Vue.use() 然而在像 CommonJS 这样的模块环境中 应当始终显式地调用 Vue.use()

### 配置文件 jsconfig.json

> 定义

- 目录中存在 jsconfig.json 文件表示该目录是 Javascript 项目的根目录 jsconfig.json 的配置可以对文件所在目录下所有 JS 代码做出个性化支持
- jsconfig.json 是 tsconfig.json 的子集
  > tsconfig.json
- 如果一个目录下存在一个 tsconfig.json 文件 则意味着这个目录是 Typescript 项目的根目录 tsconfig.json 文件中指定了用来编译这个项目的根文件和编译选项
  > 作用
- 在不使用 typescripy 时也可以对 JS 进行 TS 的类型检查(因为 jsconfig.json 是 tsconfig.json 的子集 所以检查是 ts 的)
- 项目中使用 webpack 别名时 无法跳转到相应文件 此时可以在 jsconfig.json 中配置

### 配置文件 .babelrc babel.config.js

- babel 有两种并行的配置文件格式 可以一起使用也可以分开使用
- baberc 的家在规则是按目录加载的 是只针对自己的代码
- babel.config.js 的配置针对了第三方组件和自己的代码内容 是一个项目级别的配置 一般有了 babel.config.js 就不会再去执行.babelrc 的配置

### 配置文件 vue.config.js

- Vue.js CLI 工具发展到 4.0 时代 没有了 build 文件夹跟 config 文件夹 所有配置都在 Vue.config.js 完成

### Vue 中 ES6 语法引入配置文件

1. import Vue from 'vue' - 完整写法

```
import Vue from '../node_modules/vue/dist/vue.js'
```

2. import App from './App'

```
import App from './App.vue'
```

3. import router from './route'

- 引入和 main.js 同级目录下的 route.js 文件

```
import router from './route.js'
```

4. import axios from 'axios'

- 和引入 vue 文件是一样的原理 都是从 node_modules 中加载相应名称的模块

```
import axios from '..\node_modules\axios\dist\axios.js'
```

> ES6 的 import from 总结

1. import from 的 from 命令后面可以跟很多路径格式 若只给出 vue axios 这样的包名 则会自动到 node_modules 中加载 如果给出相应路径以及文件前缀 则到指定位置寻找
2. 可以加载各种各样的文件 .js .vue .less 等
3. 可以省略 from 直接引入

### Vue.use()

> 作用

- 通常用来为 Vue 添加全局功能 插件的功能没有严格的限制 一般有以下几种

1. 添加全局方法或 property 如 vue-custom-element
2. 添加全局资源 指令 过滤器 过度等 如 vue-touch
3. 通过全局混入来添加一些组件选项 如 vue-router
4. 添加 Vue 实例方法 通过把她们添加到 Vue.prototype 上实现
5. 一个库 提供自己的 API 同时提供上边的一种或几种功能 如 vue-router

- 通过全局方法 Vue.use()使用插件 需要你在调用 new Vue()启动应用之前完成

```
调用 myPlugin.install(Vue)
Vue.use(myPlugin)
new Vue({

})
```

- 可以传入一个可选的选项对象

```
Vue.use(myPlugin,{someOptions:true})
```

- Vue.use 会自动阻止多次注册相同的插件 届时即使多次调用 也只会注册一次该插件
- Vue.js 官方提供一些插件 如 vue-router 在检测到 Vue 是可访问的全局变量时 会自动调用 Vue.use() 然而在像 CommonJS 这样的模块环境 应该始终显式调用 Vue.use()

```
用Browserify或Webpack提供的CommonJS模块环境时
const Vue = require('vue')
const VueRouter = require('vue-router')

Vue.use(VueRouter)
```

> 开发插件

- Vue.js 的插件应该暴露一个 install 方法 这个方法的第一个参数是 Vue 构造器 第二个参数是一个可选的选项对象
- Vue.use 的参数为函数时，这个函数的参数是 Vue 对象
- Vue.use 的参数为对象时 install 方法的参数是 Vue 对象

### 插件和依赖

> 依赖

- 运行时开发时都需要用到的包 比如项目中需要一个包 就要添加一个依赖 这个依赖在项目运行时也需要 因此在项目打包时需要把这些依赖也打包进项目里
  > 插件
- 在项目开发时需要 在项目运行时不需要 因此在项目开发完成后 不需要把插件打包进项目中 比如有个可以自动生成 getter 和 setter 的插件

### Vue 中 mode:history

1. 在未设置 mode:'history' Vue 的路由默认是 hash 模式 地址栏中显示如下

```
localhost:8081/#/
```

> hash

- 在地址栏中显示#符号(这里的 hash 不是密码学的散列运算) 如 localhost:8080/#/index hash 的值为#/index
- hash 虽然出现在路径中 但是不会被包含在 HTTP 请求中 对后端完全没有影响 因此改变 Hash 不会重新加载页面
  > history
- 利用了 H5 history interface 中新增的 pushState()和 replaceState()方法(需要特定浏览器支持)
- 这两个方法应用于浏览器的历史记录栈，在当前已有的 back,forward,go 的基础上
- 它们提供了对历史记录进行修改的功能 只是当它们执行修改时 虽然改变了当前的 Url 但是浏览器不会立即向后端发送请求
  > 总结
- hash 模式和 history 模式都属于浏览器自身的特性
- Vue-Router 只是利用这两个特性(通过调用浏览器提供的接口)来实现前端路由
- 为了使路径更加直观以及美观 需要使用 history 模式 只需要在 router 文件夹下的 index.js 中加入 mode:'history'

### Vue.config.productionTip = true

- 会显示生产模式的消息 所以开发环境下 保持默认设置 false 即可

### base: process.env.BASE_URL,

1.  Vue 事件驱动 响应式原理 双向数据绑定原理

    - 三者使用同一个底层原理 该底层原理由 ES5 的 Object.definedProperty((obj,prop,descriptor))提供

    ***

    > 事件驱动 /数据驱动 (数据改变->视图改变)

    - 当数据发生改变时 视图也会进行更新 数据驱动视图

    ***

    > 响应式原理 (数据改变->视图改变)

    - 数据模型仅仅是普通的 JS 对象 修改它们 视图会进行更新
    - Vue 文档中对响应式原理的解释
    - Vue 中最独特的特性之一 是其非侵入式的响应式系统 数据模型仅仅是简单的 JS 对象 当你修改它们时 视图会更新

    ***

    > Vue2.x 双向数据绑定原理(数据改变->视图改变 视图改变->数据改变)

    1. 使用 v-model 指令绑定表单元素时 可以在视图直接获得数据 当数据发生改变时 视图也会进行更新
    2. 利用数据劫持和事件的发布订阅来实现双向数据绑定
    3. 在 Vue data 选项中定义数据时 Vue 会通过观察者对象 Observer 的 getter 和 setter 设置
    4. 通过 v-model 指令绑定元素时 自动触发 getter getter 会返回一个初始值 这样在视图中就能看到数据
    5. 当视图中内容改变时 会触发 setter setter 会通知 Vue 视图已经进行了更新 Vue 会重新生成虚拟 DOM 继而通过新旧虚拟 DOM 对比 生成 patch 对象 再将 patch 对应渲染到视图
       > 具体
    6. MVVM 作为绑定的入口 整合 Observer Watcher Compiler 三者 通过 Observer 监听 model 变化
    7. Compiler 解析编译模板指令 最终利用 Watcher 搭起 Observer 和 Compiler 之间的通信桥梁
    8. 从而达到数据变化=>更新视图
       视图交互变化=>数据 model 变更
       的双向绑定效果
       >
    9. 通过 getter 进行依赖收集
    10. 每个 setter 方法就是一个观察者 数据变更时 通知 Watcher 从而使它关联的组件重新渲染 通知订阅者更新视图
    11. Vue 会通过观察者对象(Observer)将 data 选项中的所有 key
    12. 经过 Object.defineProperty 的 getter 和 setter 设置 通过设置对象属性的 setter/getter 方法来监听数据 通过 getter 进行依赖收集
    13. 每个 setter 方法就是一个观察者 在数据变更时通知订阅者更新视图
    14. Vue 重新生成 VDOM 新旧 VDOM 对比使用 DOM-diff 算法 DOM-patch 算法 把 patch 对象渲染到视图中

    15. 数据=>视图 绑定元素时 触发 getter getter 返回一个初始值 能在视图中看到数据)
    16. 视图=>数据 视图中内容改变时 触发 setter(观察者)通知 Watcher Vue 视图已更新
        - Vue 重新生成虚拟 DOM/VDOM 通过新旧 DOM 对比生成 patch 对象 将 patch 对象渲染到视图中

    > Vue 响应式实现步骤

    - 数据更新=>视图变化 1. 侦测数据变化--数据劫持 2. 收集视图依赖了哪些数据--依赖收集 - 得知哪些地方依赖我的数据 做到数据更新时派发更新 getter 中收集依赖 setter 中触发依赖 数据变更时 通知 Watcher 从而使它关联的组件重新渲染 3. 数据变化时 自动通知需要更新的视图 并进行更新--发布订阅模式 subscribe&publish
      )

    ***

    > Dep&Watcher
    > Dep 订阅收集者和发布者 框架需要处理变量和更新 DOM 的 Watcher 的依赖关系

    - (依赖收集 核心思想 事件发布订阅模式)
    - (目的是将观察者 Watcher 对象存放到当前闭包的订阅者 Dep 的 subs 中)
    - (形成这样一个关系 Object->Dep->Watcher1/Watcher2-->视图 1/2)

    > Dep - Dependency Dep 类 用来做依赖收集的

    1. 定义 subs 数组 用来收集订阅者 Watcher
    2. 当劫持到数据变更时 通知订阅者 Watcher 进行 update 操作
       > Watcher

    - Watcher 意为观察者 它负责做的事情就是订阅 Dep 当 Dep 发出消息传递(notify)时 所有订阅 Dep 的 Wathers 会进行自己的 update 操作

    > 小结

    1. Dep 负责收集所有的订阅者 Watcher 通过 target 指向的计算去收集订阅其消息的 Wather 即可 然后只需做好消息发布 notify 即可
    2. Watcher 负责订阅 Dep 并在订阅时 让 Dep 进行收集 接收到 Dep 发布的消息时 做好其 update 操作即可

    - 两者看似相互依赖 实则却保证了其独立性 保证了模块的单一性

    ***

    > v-model 指令

    1. (数据=>视图 绑定元素时 触发 getter getter 返回一个初始值 能在视图中看到数据)
    2. (视图=>数据 视图中内容改变时 触发 setter(观察者)通知 Vue 视图已更新 Vue 重新生成虚拟 DOM/VDOM 通过新旧 DO 对比生成 patch 对象 将 patch 对象渲染到视图中 )

    - 绑定元素时 自动触发 getter/视图中内容改变时 自动触发 setter

    1. 绑定元素时 自动触发 getter getter 会返回一个初始值 能在视图中看到数据
    2. 视图中内容改变时 触发 setter setter 会通知 Vue 视图已经进行了更新 Vue 会重新生成虚拟 DOM 通过新旧虚拟 DOM 对比生成 patch 对象 将 patch 对象渲染到视图中

    - 具体实现:(Compiler<->Watcher<->Observer)
      1. 实现一个 Compiler(解析指令/初始化视图/订阅数据变更/绑定更新函数) 订阅者
         对指令进行解析 初始化视图 订阅数据变更 绑定更新函数
      2. 实现一个 Observer(对数据进行劫持 通知数据变化) 观察者
         对数据进行劫持 通知数据的变化
      3. 实现一个 Watcher(以上两者的一个中介点 接收数据变更同时 让 Dep 添加当前 watcher 并即时通知视图进行 update)
         将其作为以上两者的一个中介点
         在接受数据变更的同时
         并及时通知视图进行 update
      4. 实现 MVVM 整合以上三者 作为一个入口函数

    ***

    > 暂时用这个

    - View 变化更新 Data 可以通过事件监听方式实现
    - Vue 双向数据绑定的工作主要是如何根据 data 变化更新 view
      > Vue2.x
    - 原理 数据劫持+发布订阅模式 Object.defineProperty()劫持各个属性 setter getter/重写 data 的 set 和 get 函数实现 数据变动时发布消息给订阅者 触发相应监听回调

    > 简述

    1. 把一个普通的 JS 对象传入 Vue 实例作为 data 选项 Vue 将遍历此对象所有的 property 并使用 Object.defineProperty 将这些 property 全部转为 getter 和 setter
    2. 这些 getter setter 对用户来说不可见 但在内部它们能让 Vue 追踪以来 在 property 被访问和修改时通知变更
    3. 每个组件都对应一个 Watcher 实例 它会在组件渲染过程中 把接触过的数据 property 记录为依赖 之后当依赖项触发时 通知 Watcher 使它关联的组件重新渲染

    > 步骤：Observer<->Watcher<->Compiler

    1. 实现一个监听器 Observer:(发布者/观察者)
       - 对数据对象进行遍历，包括子属性对象的属性，利用 Object.defineProperty() 对属性都加上 setter 和 getter。这样的话，给这个对象的某个值赋值，就会触发 setter，那么就能监听到了数据变化。
    2. 实现一个解析器 Compiler
       - 解析 Vue 模板指令，将模板中的变量都替换成数据，然后初始化渲染页面视图，并将每个指令对应的节点绑定更新函数，添加监听数据的订阅者，一旦数据有变动，收到通知，调用更新函数进行数据更新。
    3. 实现一个订阅者 Watcher
       - Watcher 订阅者是 Observer 和 Compile 之间通信的桥梁 ，主要的任务是订阅 Observer 中的属性值变化的消息，当收到属性值变化的消息时，触发解析器 Compiler 中对应的更新函数。
    4. 实现一个订阅器 Dep
       订阅器采用 发布-订阅 设计模式，用来收集订阅者 Watcher，对监听器 Observer 和 订阅者 Watcher 进行统一管理。
       > 对 IE 的兼容

    - 不支持 IE8 及以下，部分兼容 IE9 ，完全兼容 10 以上，vue 的响应式原理基于 es5 的 Object.defineProperty() 这个方法不支持 ie8 及以下

    > Vue 2.x

    - 使用 Object.defineProperty() 把内部解耦为 Observer Dep 使用 Watcher 相连

2.  object.defineProperty(obj,prop,descriptor) & proxy

    > Object.defineProperty(obj,prop,descriptor)方法

    - 参数:(三个参数都是必填)
      - obj:要定义属性的对象
      - prop:要定义或修改的属性的名称或 Symbol
      - descriptor：要定义或修改的属性描述符
    - 返回值:
      被传递给函数的对象
    - 备注：
      ES6 中 由于 Symbol 类型的特殊性/用 Symbol 类型的值来做对象的 key 与常规的定义或修改不同 Object.defineProperty 是定义 key 为 Symbol 的属性的方法之一
    - 描述：
      - (默认情况下/使用 object.defineProperty()添加的属性值是不可修改的)
      - 该方法允许精确地添加或修改对象的属性 通过赋值操作添加的普通属性是可枚举地 在枚举对象属性时会被枚举到(for ..in object.keys) 可以修改这些属性的值 也可以删除这些属性 这个方法允许修改默认的额外选项/配置
    - 对象里目前存在的属性描述符(descriptor)有两种主要形式(都是对象)
      (一个描述符只能是两者之一)

    1. 数据描述符(具有值的属性/该值可写/可不写)
       - 具有值的属性 该值可以是可写的 也可以是不可写的
    2. 存取描述符(由 getter/setter 函数所描述的属性)
       - 由 getter 函数和 setter 函数所描述的属性

    - 两种描述符都是对象 它们共享以下可选键值
      - (默认值是指在使用 object.defineProperty()定义属性时的默认值)
      1. 共享可选键值：
         1. configurable:
            - (不设置默认为 false 第一次设置 false 后 第二次不可设置 会报错)
            - (表示对象的属性是否可以被删除 除了 value writable 特性之外的其他特性是否可以被修改)
            - (在非严格模式下，属性配置 configurable:false 后进行删除操作会发现属性仍然存在严格模式下会抛出错误：)
            - 当且仅当该属性的 configurable 键值为 true 时，该属性的描述符才能够被改变，同时该属性也能从对应的对象上被删除。
         2. enumerable:(默认为 false)
            - (定义对象的属性是否可以在 for..in 和 Object.keys()中被枚举)
            - 当且仅当该属性的 enumerable 键值为 true 时，该属性才会出现在对象的枚举属性中。
      2. 数据描述符 可选键值 value/writable
         1. value:(默认 undefined)
            该属性对应的值。可以是任何有效的 JavaScript 值（数值，对象，函数等）。
         2. writable:(默认为 false 时为只读)
            (在非严格模式下给 name 属性再次赋值会静默失败，不会抛出错误；而在严格模式下会抛出异常：)
            当且仅当该属性的 writable 键值为 true 时，属性的值，也就是上面的 value，才能被赋值运算符改变。
      3. 存取描述符 可选键值 get/set
         - (get 和 set 函数不是必须成对出现，可以只出现一个；两个函数如果不设置，则默认值为 undefined。)
         - (属性 b 赋值或取值时会分别触发 set 和 get 对应函数)
         1. get(属性的 getter 函数 如果没有 getter 默认 undefined)
            - 一旦目标属性被访问就会返回此方法 并将此方法的运算结果返回用户
              当访问该属性时，会调用此函数。执行时不传入任何参数，但是会传入 this 对象（由于继承关系，这里的 this 并不一定是定义该属性的对象）。该函数的返回值会被用作属性的值。
         2. set(属性的 setter 函数 如果没有 setter 默认 undefined)
            - 一旦目标属性被赋值 就会调回此方法
              当属性值被修改时，会调用此函数。该方法接受一个参数（也就是被赋予的新值），会传入赋值时的 this 对象。
      4. 描述符默认值汇总
         1. 拥有布尔值的键 configurable、enumerable 和 writable 的默认值都是 false。
            1. 一旦使用 Object.defineProperty 给对象添加属性，如果不设置属性的特性，那么这些值都是 false：
            2. 点运算符给属性赋值时，则默认给三种描述符都赋值 true：
         2. 属性值和函数的键 value、get 和 set 字段的默认值为 undefined。
      5. 如果一个描述符 不具有 value writable get set 中任意一个键 它会被认为是一个数据描述符
      - 一个描述符同时拥有 value 或 writable 和 get 或 set 键，则会产生一个异常。
      - 直接在一个对象上定义一个新属性/修改一个对象的现有属性 并返回此对象
      - 应当在 Object 构造器对象上调用此方法 而不是在任意一个 Object 类型的实例上调用

    > Proxy 与 Object.defineProperty

    1. Proxy(代理器 目标对象之前架设一层拦截 外界对该对象的访问 都必须先通过这层拦截)
       - (原意代理 此处表示由它代理某些操作 可译为代理器)
       - 在目标对象之前架设一层“拦截”，外界对该对象的访问，都必须先通过这层拦截，因此提供了一种机制，可以对外界的访问进行过滤和改写。
         > 语法
       1. var proxy = new Proxy(target, handler);
       2. Proxy 本身是一个构造函数，通过 new Proxy 生成拦截的实例对象，让外界进行访问；构造函数中的 target 就是我们需要代理的目标对象，可以是对象或者数组；handler 和 Object.defineProperty 中的 descriptor 描述符有些类似，也是一个对象，用来定制代理规则。
       3. Proxy 可以直接代理 target 整个对象并返回一个新对象 通过监听代理对象上属性的变化来获取目标对象属性的变化
       4. Proxy 不仅能够监听到属性的增加 还能监听属性的删除 比 Object.defineProperty 的功能更为强大。
       - Vue3 新特性：(目标让 Vue 核心变得更小、更快、更强大)
         1. 监测机制的改变
         2. 模板
         3. 对象式的组件声明
         4. 其他方面的更改
       - Reflect：
         - 翻译过来是反射的意思，与 Proxy 对象一样，也是 ES6 为了操作对象而提供的新 API。有一下几个作用 1. 将 Object 对象的一些明显属于语言内部的方法(如 Object.defineProperty)放到 Reflect 对象上 2. 修改某些 Object 方法的返回结果，让其变得更合理。 3. 让 Object 操作都变成函数行为。某些 Object 操作是命令式，比如 name in obj 和 delete obj[name]，而 Reflect.has(obj, name)和 Reflect.deleteProperty(obj, name)让它们变成了函数行为。 4. Reflect 对象的方法与 Proxy 对象的方法一一对应，只要是 Proxy 对象的方法，就能在 Reflect 对象上找到对应的方法。这就让 Proxy 对象可以方便地调用对应的 Reflect 方法，完成默认行为，作为修改行为的基础。也就是说，不管 Proxy 怎么修改默认行为，你总可以在 Reflect 上获取默认行为。
           > Proxy 只会代理对象的第一层 Vue3.0 如何处理该问题
       1. 判断当前 Reflect.get 的返回值是否为 Object 如果是则再通过 reactive 方法做代理 实现深度观测
          > 监测数组时可能会触发多次 get/set 如何防止触发多次
       1. 判断 key 是否为当前被代理对象 target 自身属性 也可以判断旧值和新值是否相等 只有满足以上两个条件之一时 才有可能执行 trigger
    2. Object.defineProperty
       - (使用数据劫持 直接在一个对象上定义一个新属性或修改一个对象的现有属性 并返回此对象)
       - 在访问或修改对象的某个属性时 通过一段代码拦截这个行为 进行额外的操作或修改返回结果
       - 数据劫持最典型的应用 双向的数据绑定
    3. 比较

       > Proxy
       > 优点:(可以直接监听对象而非属性/可以直接监听数组的变化/

       1. 针对整个对象代理 不同于 Object.defineProperty 必须遍历对象每个属性 支持代理数组变化
       2. 只需做一层代理 可监听同级结构下所有属性变化
       3. 深层结构 递归还是要进行的
       4. Proxy 有多达 13 种拦截方法,不限于 apply、ownKeys、deleteProperty、has 等等是 Object.defineProperty 不具备的；
       5. Proxy 返回的是一个新对象,我们可以只操作新的对象达到目的,而 Object.defineProperty 只能遍历对象属性直接修改；
       6. Proxy 作为新标准将受到浏览器厂商重点持续的性能优化，也就是传说中的新标准的性能红利；
          > 缺点
       7. 存在兼容性问题 所以在 Vue3.x 中才重写

       > Object.defineProperty
       > 优点：

       1. 兼容性好，支持 IE9，而 Proxy 的存在浏览器兼容性问题,而且无法用 polyfill 磨平 因此 Vue 的作者才声明需要等到下个大版本( 3.0 )才能用 Proxy 重写。
          > 缺点
       1. 能劫持对象的属性但需对对象每一个属性进行遍历劫持 对象上新增属性 需对新增的属性再次劫持 如果属性是对象 还需深度遍历 Vue 给对象新增属性 用$set 原理通过 Object.defineProperty 对新增属性再次劫持)
       1. 只能监听对象 无法检测到对象属性的添加和删除 不能监听数组的变化 无法触发 push pop shift unshift splice sort reverse 需要进行数组方法的重写 无法检测数组的长度修改
       1. 必须遍历对象的每个属性
       1. 只能劫持当前对象属性 如果想深度劫持 必须深层遍历嵌套的对象

       1. 数据劫持 ES5 Object.defineProperties()
       1. push()、pop()、shift()删除、unshift()添加、splice()、sort()、reverse()这些方法会改变被操作的数组；
       1. filter()、concat()、slice()这些方法不会改变被操作的数组，返回一个新的数组；

       > 解决
       > Vue2.x 实现对象和数组的监听( JavaScript 的限制，Vue 不能检测数组和对象的变化)

       - JavaScript 的限制：
         - object.defineProperty() 只能对属性进行数据劫持，不能对整个对象进行劫持，同理无法对数组进行劫持
       - Vue 检测对象和数组（部分方法的操作）变化

         1. 对象和数组的监听：
            - 通过遍历数组 和递归遍历对象 达到利用 Object.defineProperty() 也能对对象和数组（部分方法的操作）进行监听。
         2. 对象：

            > 不能检测

            1. 对象属性添加删除

            > 解决方法

            - 单个 property

            1. Vue.set(object,propertyName,value)
               - 参数 1： 要修改的对象
               - 参数 2： 属性
               - 参数 3： 属性的值是啥
               - 返回值：已经修改好的值
               - Vue.set(vm.someObject, 'b', 2)
            2. vm.$set(object,propertyName,value)

            - 多个 property

            1. 用原对象与要混合进去的对象的 property 一起创建一个新的对象

            ```
            this.someObject = Object.assign({}, this.someObject, { a: 1, b: 2 })
            代替 `Object.assign(this.someObject, { a: 1, b: 2 })`
            ```

            > vm.$set 实现原理:

            1. 如果目标是数组，直接使用数组的 splice 方法触发响应式
            2. 如果目标是对象，会先判读属性是否存在、对象是否是响应式.

         3. 数组：

            > 不能检测

            1. 利用索引直接设置一个数组项时，例如：vm.items[indexOfItem] = newValue
            2. 修改数组的长度时，例如：vm.items.length = newLength
               > 解决方法
            3. 第一类问题解决方法：
               1. Vue.set
               - Vue.set(vm.items, indexOfItem, newValue)
               - vm.$set(vm.items, indexOfItem, newValue)
               2. Array.prototype.splice
               - vm.items.splice(indexOfItem, 1, newValue)
            4. 第二类问题解决方法：

               1. splice

               - vm.items.splice(newLength)

                 1. 对象属性的添加删除

3.  Vue 渐进式框架

    - Vue 核心功能是一个视图模版引擎
      > 渐进式:Vue.js 是一套用于构建用户界面的渐进式框架
    - Vue 核心功能是一个视图模板引擎 声明式渲染/视图模板引擎基础上 可以通过添加 组件系统 components 客户端路由 vue-router 大规模状态管理 vuex 构建一个完整的框架
    - Vuejs 只提供 Vue-Cli 生态中最核心的 组件系统+双向数据绑定/数据驱动
    - 这些功能相互独立 可以在核心功能的基础上任意选用其他部件 渐进式 即 Vue 的使用方式 也体现出 Vue 设计理念 没有做职责之外的事

    - 虽然没有完全遵循 MVVM 模型 但 Vue 的设计也受到它的启发 因此在文档中常会使用 vm(viewModel 的缩写) 这个变量名表示 Vue 实例 实例属性/实例方法(数据/事件/生命周期)
    - 所有 Vue 组件都是 Vue 实例 并且接受相同的选项对象(一些根实例特有的选项除外)
    - 生命周期钩子的 this 只想调用它的 Vue 实例 不要在选项 property 或回调上使用箭头函数
      > Vue.js 两个核心

    1. 组件系统
    2. 数据驱动/双向数据绑定

4.  Vue 组件通信

    > 需求(组件实例间作用域相互独立/不同组件之间数据无法相互引用)
    > 组件关系

    1. 父子组件之间通信
    2. 非父子组件之间通信(兄弟组件 隔代关系组件)
       > 通信方法
    3. props/$emit
       1. 父组件向子组件传值
       - 父组件通过 props 方式向子组件传递数据 子组件通过$emit 向父组件通信
       - prop 只可以从上一级组件传递到下一级组件(父子组件)即所谓单向数据流 prop 只读 不可被修改 所有修改都会失效并警告
       2. 子组件向父组件传值
       - $emit 绑定一个自定义事件 当这个语句被执行 会将参数 arg 传递给父组件 父组件通过 v-on 监听并接收参数
    4. $children/$parent
       - 子实例可以用 this.$parent访问父实例 子实例被推进父实例的$children 数组中
         > PS:节制地使用$parent和$children 它们的目的主要是作为访问组件的应急方法 更推荐用 props 和 events 实现父子组件通信
    5. provide/inject
       - provide/inject 是 Vue2.2.0 新增的 API
       - 父组件通过 provide 提供变量 子组件中通过 inject 注入变量
         > PS: 不论子组件嵌套有多深 只要调用了 inject 就可以注入 provide 中的数据 而不局限于只能从当前父组件的 props 属性中获取数据
    6. ref/refs
       > ref
       - 如果在普通的 DOM 元素上使用 引用指向的就是 DOM 元素
       - 如果用在子组件上 引用就指向组件实例 可以通过实例直接调用组件的方法或访问数据
    7. eventBus

       - 又称为事件总线 在 Vue 中可以使用它来作为沟通桥梁的概念 就像是所有组件共用相同的事件中心 可以向该中心注册发送事件或接收时间 所以组件都可以通知其他组件
       - 当项目较大 就容易造成难以维护的灾难
         > Vue 中使用 eventBus 实现组件之间的数据通信

       1. 初始化 创建一个事件总线并将其导出 以便其他模块可以使用或者监听它

       ```
       // event-bus.js
       import Vue from 'vue'
       export const EventBus = new Vue();
       ```

       2. 发送事件 假设有两个组件 additionNum 和 showNum 这两个组件可以是兄弟组件也可以是父子组件

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

       - 这样实现了在组件 addtionNum.vue 中点击相加按钮 在 showNum.vue 中利用传递来的 num 展示求和的结果
         // 移除事件监听者

       ```
       import {eventBus} from 'event-bus.js'
       EventBus.$off('addition',{})
       ```

    8. Vuex
       - 一个专为 Vuejs 应用程序开发的状态管理模式
       - 它采用集中式存储管理应用的所有组件的状态
       - 并以相应的规则保证状态以一种可预测的方式发生变化
       - Vuex 解决了多个视图以来同一状态和来自不懂视图的行为需要变更到同一状态的问题
       - 将开发者的经历聚焦在数据的更新而不是数据在组件之间的传递上
         > Vuex 各个模块
       1. state：用于数据的存储 是 store 中的唯一数据源
       2. getters: 如 Vue 中的计算属性一样 基于 state 数据的二次包装 常用于数据的筛选和多个数据的相关性计算
       3. mutations:类似函数 改变 state 数据的唯一途径 且不能用于处理异步事件
       4. actions:类似于 mutation 用于提交 mutation 改变状态而不直接变更状态 可以包含任意异步操作
       5. modules:类似于命名空间 用于项目中将各个模块的状态分开定义和操作 便于维护
    9. localStorage/sessionStorage
       - 这种通信比较简单 缺点是数据和状态比较混乱 不太容易维护
       1. 通过 window.localStorage.getItem(key)获取数据
       2. 通过 window.localStorage.setItem(key,value) 存储数据
          > PS: 用 JSON.parse()/JSON.stringfy()做数据格式转换 localStorage/sessionStorage 可以结合 Vuex 实现数据的持久保存 同时使用 Vuex 解决数据和状态混乱问题
    10. $attrs&listeners
        - Vue2.4 中 为了解决组件隔代通信的需求 引入了$attrs和$listeners 新增了 inheritAttrs
        - 版本 2.4 之前 默认情况下 父作用域中不作为 prop 被识别(且获取)地特性绑定(class 和 style 除外) 将会回退且作为普通的 HTML 特性应用在子组件的根元素上

    > Vue 中父子组件双向绑定的方法

    1. 通过在父组件上自定义一个监听事件

    ```
    <myComponent @diy="handleDiy"></myComponent>
    ```

    - 在子组件用 this.$emit('diy',data)来出发这个 diy 事件
    - 其中 data 为子组件向父组件通信的数据
    - 在父组件中监听 diy 事件时 可以通过$event 访问 data 这个值

    2. 通过在父组件上用修饰符.sync 绑定一个数据

    ```
    <myComponent :show.sync="show"></myComponent>
    ```

    - 在子组件通过 this.$emit('update:show',data)改变父组件中 show 的值

    3. 通过 v-model

5.  Vue render 函数(用来生成 VDOM)
    Vue 渲染/render 函数用来生成 VDOM/虚拟 DOM

    1. Vue 更新渲染 render 整体流程

       1. 模板通过编译 Compiler 生成 AST(Abstract Synax Tree)抽象语法树
       2. AST 生成 Vue 的 render 渲染函数
       3. render 渲染函数结合数据生成 VNODE(Virtual DOM Node)树
       4. diff 和 patch 后生成新的 UI 界面(真实 DOM 渲染)

       - 概念解释：

       > 模板：

       - Vue 模板是纯 HTML 基于 Vue 的模板语法 可以比较方便地处理数据和 UI 界面

       > AST：(Abstract Synax Tree)

       - Vue 将 HTML 模板解析为 AST 并对 AST 进行一些优化的标记处理 提取最大的静态树 以使 VDOM 直接跳过后面的 diff

       > render 渲染函数

       - (Vue 推荐使用模板创建 HTML 构建应用程序 底层实现中 Vue 最终还是会将模板编译成 render 渲染函数 若想得到更好的控制 一些场景中 真正需要 JS 的完全编程能力 可以直接写渲染函数 它比模板更接近编译器) 用来生成 VDOM

       > Watcher：

       - (每一个 Vue 组件都有一个对应的 watcher
       - 它会在 组件 render 时 收集组件所依赖的数据 并在 依赖更新时 触发组件重新渲染
       - Vue 会自动优化并更新需要更新的 DOM)

       > render 函数可以作为一条分割线

       - (将 Vue 模板编译成 AST 生成 render 函数/
         数据结合 render 函数生成 VDOM 树 diff 和 patch 映射到真正的 DOM 树)

       1. render 函数左边可以称为编译期 将 Vue 模板转换成渲染函数
       2. render 函数右边可以称为运行时 将渲染函数生成的 VDOM 树 进行 diff 和 patch

    2. 虚拟 DOM
       1. Vue 编译器在编译模板后 会将这些模板编译成渲染函数 render 当渲染函数 render 被调用时 会返回一个虚拟 DOM 树
       2. 在 Vue 底层实现上 Vue 将模板编译成虚拟 DOM 渲染函数 结合 Vue 自带的响应系统 在相应状态改变时 Vue 能智能计算出重新渲染组件的最小代价并映射到 DOM 操作上
       3. Vue 支持我们通过 data 参数传递一个 JavaScript 对象作为组件数据, Vue 将遍历 data 对象属性, 使用 Object.defineProperty 方法设置描述对象, 通过 gett/setter 函数来拦截对该属性的读取和修改.
       4. Vue 创建了一层 Watcher 层, 在组件渲染的过程中把属性记录为依赖, 当依赖项的 setter 被调用时, 会通知 Watcher 重新计算, 从而使它关联的组件得以更新.
    3. Vue 渲染机制
       - (独立构建 包含模板编译器 渲染过程 HTML 字符串->render 函数->VNODE->真实 DOM)
       - (运行时构建 不包含模板编译器 渲染过程 render 函数->VNODE->真实 DOM)
       - (运行时构建的包 比独立构建少一个模板编译器(因此速度上会更快))
       - (渲染过程提供三种模板(自定义 render/template/el) 这三种模板最终都要得到 render 函数 )
       - 两个概念
         1. 独立构建
         - 包含模板编译器 渲染过程 HTML 字符串=>render 函数=>VNODE=>真实 DOM
         2. 运行时构建
         - 不包含模板编译器 渲染过程 render 函数=>VNODE=>真实 DOM
         3. 运行时构建的包 比独立构建少一个模板编译器(因此运行速度上会更快)在$mount 函数上也不同 $mount 方法是整个渲染过程中的起始点
       - 渲染过程提供三种模板：(这三种模式最终都要得到 render 函数)
         1. 自定义 render 函数
         2. template
         3. el
       - Vue 渲染 1. new Vue 执行初始化 2. 挂载$mount 通过自定义 render 方法 template el 等生成 render 渲染函数 3. 通过 Watcher 监听数据的变化 4. 当数据变化时 render 函数执行生成 VNODE 对象 5. 通过 DOM diff 算法 对比新旧 VNode 对象 通过 patch 算法 添加/修改/删除真正的 DOM 元素
         > 初始化
       1. 开始创建
       2. 初始化数据
       3. 编译模版
       4. 挂载 DOM- 渲染
       5. 数据变化更新 DOM-渲染
       6. 销毁
    4. 理解使用 render 函数
       1. createElement
          第 1 个参数: {String | Object | Function }, 必传
          第 2 个参数: { Object }, 可选
          第 3 个参数: { String | Array }, 可选
    5. 使用 render 函数替代模板功能
       - 使用 Vue 模板时 可在模板中灵活的使用 v-if、v-for、v-model 和<slot>等模板语法。
       - 但在 render 函数中是没有提供专用的 API。如果在 render 使用这些，需要使用原生的 JavaScript 来实现。

6.  虚拟 DOM/VDOM(使用 JS 对象模拟)
    > 核心 VDOM 之所以快 因为其是使用 JS 对象对比的 相比于 DOM 对象非常多的属性 JS 对象无疑比较简洁
    1. 真实 DOM 浏览器解析流程 真实 DOM 在浏览器渲染时遇到的问题引出虚拟 DOM
       webkit 渲染引擎工作流程
       所有浏览器渲染引擎工作流程大致分为 5 步
       (DOM 树 CSSOM 树 Render 树 Layout 布局 Painting 绘制 实际进行时不是独立的会有交叉)
       1. 创建 DOM 树
          - 用 HTML 分析器分析 HTML 元素 构建一颗 DOM 树
       2. 创建 Style Rules
          - 用 CSS 分析器分析 CSS 文件和元素上的 inline 样式 生成页面样式表
       3. 构建 Render 树
          - 将 DOM 和样式表关联起来 构建一棵 Render 树 (Attachment)
          - 每个 DOM 节点都有 attach 方法 接受样式信息 返回一个 render 对象(又名 renderer)这些 render 对象最终会被构建成以可 Render 树
       4. 布局 Layout
          - 确定节点坐标 根据 Render 树结构 为每个 Render 树上的节点确定一个在显示屏上出现的精确坐标
       5. 绘制 Painting - 根据 Render 树和节点显示坐标 然后调用每个节点的 paint 方法 将它们绘制出来
          > 注意：
       6. DOM 树的构建不是文档加载完成开始的
          - 构建 DOM 树是一个渐进过程，为达到更好的用户体验，渲染引擎会尽快将内容显示在屏幕上，它不必等到整个 HTML 文档解析完成之后才开始构建 render 树和布局。
       7. Render 树/DOM 树/CSS 样式表 实际进行时不是完全独立的 会有交叉
          - 实际进行的时候并不是完全独立的，而是会有交叉，会一边加载，一边解析，以及一边渲染。
       8. CSS 的解析注意点
          - CSS 的解析式从右向左逆向解析的 嵌套标签越多 解析越慢
       9. JS 操作真实 DOM 代价
          - 用我们传统的开发模式，原生 JS 或 JQ 操作 DOM 时，浏览器会从构建 DOM 树开始从头到尾执行一遍流程。
            在一次操作中，我需要更新 10 个 DOM 节点，浏览器收到第一个 DOM 请求后并不知道还有 9 次更新操作，因此会马上执行流程，最终执行 10 次。例如，第一次计算完，紧接着下一个 DOM 更新请求，这个节点的坐标值就变了，前一次计算为无用功。
            计算 DOM 节点坐标值等都是白白浪费的性能。即使计算机硬件一直在迭代更新，操作 DOM 的代价仍旧是昂贵的，频繁操作还是会出现页面卡顿，影响用户体验
    2. 虚拟 DOM(Virtual-DOM)--使用 JS 对象模拟
       > 存在意义/实现方式：
       - 为了解决浏览器性能设计出来 页面的更新可以先全部反映在 JS 对象(虚拟 DOM)上 操作内存中的 JS 对象的速度显然更快 等更新完成后 将最终的 JS 对象映射成真实的 DOM 交由浏览器绘制
       - 用 JS 对象模拟 DOM 树：
         1. JS 对象来表示 DOM 节点 使用对象的属性记录节点的类型/属性/子节点
         2. 渲染用 JS 表示的 DOM 对象
         3. 比较两棵虚拟 DOM 树的差异-diff 算法
            - diff 算法：
            - 比较两棵 VDOM 树的差异
            1. 如需完全比较 O(n^3)
            2. 由于前端很少会跨级移动 DOM 元素
            - VDOM 只会对同一个层级的元素进行比较
              O(n)
         4. diff 算法具体实现
            1. 深度优先遍历 记录差异
               每个节点有一个唯一的标记 每遍历到一个节点 把该节点和新的树进行对比 如果有差异就记录到一个对象中
            2. 差异类型(元素节点 1/属性节点 2/文本节点 3)
               1. 节点替换 如将 div 换成 h1
               2. 顺序互换 移动/删除/新增子节点
               3. 属性更改
               4. 文本改变
            3. 列表对比算法
            4. 实例输出
         5. 将两个虚拟 DOM 对象的差异应用到真正的 DOM 树(patch.js)
            1. 深度优先遍历 DOM 树
            2. 对原有 DOM 树进行 DOM 操作
               - 根据不同类型数据 对当前节点进行不同的 DOM 操作
            3. DOM 结构改变
    3. 总结 VDOM 算法主要实现三步骤
       1. 用 JS 对象模拟 DOM 树(VNode 定义)
       2. 比较两棵虚拟 DOM 树的差异 diff.js
       3. 将两个虚拟 DOM 对象的差异应用到真正的 DOM 树 patch.js
7.  虚拟 DOM&DOM-diff

    > 虚拟 DOM 存在意义：

    - 虚拟 DOM 就是为了解决浏览器性能问题而被设计出来的。
    - 如前，若一次操作中有 10 次更新 DOM 的动作，虚拟 DOM 不会立即操作 DOM 而是将这 10 次更新的 diff 内容保存到本地一个 JS 对象中，最终将这个 JS 对象一次性 attch 到 DOM 树上，再进行后续操作，避免大量无谓的计算量。
    - 所以，用 JS 对象模拟 DOM 节点的好处是，页面的更新可以先全部反映在 JS 对象(虚拟 DOM)上，操作内存中的 JS 对象的速度显然要更快，等更新完成后，再将最终的 JS 对象映射成真实的 DOM，交由浏览器去绘制。
    - 虚拟 DOM/VDOM： 1. 用 JS 去按照 DOM 结构来实现树状结构对象/可叫 DOM 对象 2. 是仅存在内存中的 DOM 因还未展示到页面中 所以称作 VDOM 3. Virtual DOM 其实就是一棵以 JavaScript 对象(VNode 节点)为基础的树 用对象属性来描述节点 实际上它只是对一层真实 DOM 的抽象 最终可以通过一系列操作使这棵树映射到真实环境上。 4. JS 中虚拟 DOM 表现为一个 Object 对象 并且最少包含标签名(tag)属性(attrs)和子元素对象(children)三个属性 不同框架对这三个属性的命名可能会有差异 5. Virtual DOM 对象的节点跟 DOM Tree 每个位置的属性一一对应的，因为人们创造出虚拟 DOM 就是为了更好地将虚拟节点渲染到视图上，也就是把虚拟 DOM 变成真实的 DOM 节点，提高视图的渲染性能。
      > 优点：

    1. 减少 DOM 操作
       两个虚拟 DOM 对比用到的算法就是 DOM diff
       JS 层面上 DOM 操作并不慢 慢在浏览器渲染的过程里，改变一行数据就要全部重新渲染
       虚拟 DOM 比 DOM 快，
       因为需要更新的 DOM 节点要比原生 DOM 操作更新的节点少，浏览器重绘的时间更短
       虚拟 DOM 的优势不在于单次的操作，
       用对比的算法，它可以将多次操作合并成一次操作，
       在大量、频繁的数据更新下，能够对视图进行合理、高效的更新。
    2. 跨平台
       虚拟 DOM 是以 JS 对象作为基础 本质就是一个 JS 对象 并不依赖真实平台环境 使它具有跨平台能力
       在浏览器上可以变成 DOM
       其他平台可以变成相应渲染对象
    3. 保证性能下限
       > 缺点：
    4. 无法进行极致优化

    > DOM-diff：(比较两颗虚拟 DOM 树用到的算法)

    - DIFF 算法：
    - (Diff 仅在两棵树同级虚拟节点间递归比较 最终实现整颗 DOM 树更新)
      > 比较时分为三个层级:
      > 层级比较 Tree Diff
      > 组件比较 Component Diff
      > 元素比较 Element Diff

    1. Tree Diff（层级比较）
       1. 先进行树结构的层级比较，对同一个父节点下的所有子节点进行比较；
       2. 接着看节点是什么类型的，是组件就做 Component Diff;
       3. 如果节点是标签或者元素，就做 Element Diff;
    2. Component Diff （组件比较）
       1. 若组件类型相同，则继续按照层级比较其虚拟 DOM 的结构;
       2. 如果组件类型不同，则替换整个组件的所有内容
    3. Element Diff (元素比较) 1. 如果节点是原生标签，则看标签名做比较是否相同来决定替换还是更新属性 2. 然后进入标签后代递归 Tree Diff
       > 三个步骤：
    4. 用 JS 对象的方式来表示 DOM 树的结构，然后根据这个对象构建出真实的 DOM 树，插到文档中。
    5. 当状态变更的时候，重新构造一棵新的对象树。然后用新的树和旧的树进行比较，记录两棵树的差异
    6. 最后把所记录的差异应用到所构建的真正的 DOM 树上，视图更新
       > DOM 变化主要有三种：
    7. applendChild
    8. replaceChild
    9. removeChild
       > DOM diff 算法主要做三件事
    10. 创建节点
    11. 删除节点
    12. 更新节点

    - 给定任意两棵树 采用先序深度优先遍历的算法找到最少的转换步骤
    - DOM-diff 比较两个虚拟 DOM 的区别 也就是在比较两个对象的区别
      > 作用：
    - 根据两个虚拟对象创建出补丁 描述改变的内容 将这个补丁用来更新 DOM

    > 过程：

    1. 用 JS 对象模拟 DOM(虚拟 DOM)
    2. 把此虚拟 DOM 转成真实 DOM 并插入页面中(render)
    3. 如果有事件发生修改了虚拟 DOM 比较两棵虚拟 DOM 树的差异 得到差异对象 diff
    4. 把差异对象应用到真正的 DOM 树上(patch)

8.  Vue 中 Dom 异步更新&nextTick

    > Dom 异步更新：

    - Vue 异步执行 DOM 更新。观察到数据变化 Vue 将开启一个队列 缓冲在同一事件循环中发生的所有数据改变。
    - 同一个 watcher 被多次触发 只会被推入到队列中一次。缓冲时去除重复数据 对于避免不必要的计算和 DOM 操作上非常重要。
    - 下一个事件循环 tick 中 Vue 刷新队列并执行实际(已去重)
      > DOM 异步
    - Vue 异步执行 DOM 更新 数据变化 一个队列 缓冲同一事件循环发生所有数据改变 避免不必要的计算和 DOM 操作
    - Vue 在内部尝试对异步队列使用原生的 Promise.then 和 MessageChannel，如果执行环境不支持，会采用 setTimeout(fn, 0)代替。
    - 为了在数据变化之后等待 Vue 完成更新 DOM 可以在数据变化之后立即使用 Vue.nextTick(callback) 这样回调函数在 DOM 更新完成后就会调用

    > Vue 中 nextTick 机制

    - (Vue 中 nextTick 的实现有用到 MutationObserver 微任务 API)
    - (下次 DOM 更新循环结束后执行延迟回调 修改数据后立即使用这个方法 可在回调中获取更新后的 DOM)
    - (Vue 中 Created 钩子函数执行时 DOM 其实未进行任何渲染 所以需要放在 nextTick 中去获取 DOM 与其对应的生命周期钩子函数是 mounted)
    - (DOM 更新完想做点什么 nextTick 回调函数中)
    - (Vue 生命周期 created 钩子函数中进行的 DOM 操作 一定要放在 Vue.$nextTick 回调函数中)
    - (修改数据之后立即使用这个方法 获取更新后的 DOM)

    > 应用场景:(什么时候需要使用 Vue.nextTick()函数)

    1. (Vue.nextTick 在 DOM 更新后做点什么 参数回调函数 DOM 更新完调用)
    2. (数据变化后要执行某个操作 这个操作需要使用随数据改变而改变 DOM 结构 这个操作应该放进 Vue.$nextTick()的回调函数中)
    3. (为了在数据变化之后等待 Vue 完成更新 DOM 可以在数据变化之后立即使用 Vue.nextTick(callback)这样回调函数在 DOM 更新完后就会调用)
    4. (主线程的执行过程就是一个 tick 而所有的异步操作都是通过任务队列来调度)

    > Vue 的 nextTick 方法实现原理

    1. vue 用异步队列的方式来控制 DOM 更新和 nextTick 回调先后执行
    2. microtask 因为其高优先级特性，能确保队列中的微任务在一次事件循环前被执行完毕
    3. 考虑兼容问题,vue 做了 microtask 向 macrotask 的降级方案

    > Vue.nextTick 实现原理

    - MutationObserver/MO
      - 是 H5 中的 API 是一个用于监听 DOM 变动的接口 它可以监听一个 DOM 对象上发生的
      1. 子节点删除
      2. 属性修改
      3. 文本内容修改等
      - 调用过程
        先给它绑定回调 得到 MO 实例
        这个回调会在 MO 实例监听到变动时触发
        这里的 MO 回调放在 microtask 中执行
        // 创建 MO 实例
        const observer = new MutationObserver(callback)
        const textNode = '想要监听的 Don 节点'
        observer.observe(textNode, {
        characterData: true // 说明监听文本内容的修改
        })
      - 源码
        nextTick 的实现单独有一个 JS 文件来维护它
        在 src/core/util/next-tick.js 中
        nextTick 源码主要分两块
        能力检测
        由于宏任务耗费时间大于微任务
        浏览器支持情况下 优先使用微任务
        浏览器不支持微任务 再使用宏任务
        根据能力检测以不同方式执行回调队列
        next-tick.js 对外暴露了 nextTick 这一个参数 所以每次调用 Vue.nextTick 时会执行: 1.把传入的回调函数 cb 压入 callbacks 数组 2.执行 timeFunc 函数 延迟调用 flushCallbacks 函数 3.遍历执行 callbacks 数组中所有函数
        这里的 callbacks 没有直接在 nextTick 中执行回调函数原因是 保证在同一个 tick 内多次执行 nextTick 不会开启多个异步任务 而是把这些异步任务都压成一个同步任务在下一个 tick 执行完毕
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
      - 为了可以获取更新后的 DOM
        > 触发时机
      - 同一事件循环中的数据变化后 DOM 完成更新 立即执行 Vue.nextick()的回调

9.  Vue 中的 component

    1. 可复用的 Vue 实例且带有一个名字
    2. 每个实例可维护一份被返回对象的独立拷贝

    - (data 是函数 每个实例可以维护一份被返回对象的独立的拷贝)
    - (组件是可复用的 Vue 实例，且带有一个名字：)
    - (el 是根实例特有的选项)

    - 每用一次组件，就会有一个它的新实例被创建。一个组件的 data 选项必须是一个函数

    > 定义组件名的方式(两种):

    1. 使用 kebab-case(短横线分隔命名) 链式命名

    - 须在引用这个自定义元素时使用 kebab-case，例如 <my-component-name>。

    2. 使用 PascalCase(首字母大写命名) 驼峰命名
       <my-component-name> 和 <MyComponentName>

    > 使用

    1. 在字符串模板中<my-component></my-component> 和 <MyComponent></MyComponent>都可以使用，
    2. 在非字符串模板中最好使用<my-component></my-component>，因为要遵循 W3C 规范中的自定义组件名
       (字母全小写且必须包含一个连字符)，避免和当前以及未来的 HTML 元素相冲突。

    > 原因

    1. HTML 中的 attribute 名是大小写不敏感的，所以浏览器会把所有大写字符解释为小写字符。

    > 组件 name 作用：

    1. 递归组件时，组件调用自身使用；
    2. 用 is 特殊特性和 component 内置组件标签时使用；
    3. keep-alive 内置组件标签中 include 和 exclude 属性中使用。

    > 销毁：

    1. 没有使用 keep-alive 时的路由切换；
    2. v-if='false'；
    3. 执行 vm.$destroy()；

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

10. 如何设计一个组件

    > 前端组件库的设计原则

    1. 细粒度考量
       - 单一职责原则 原则上一个组件只专注一件事情
       1. 优点 最大可能性地复用组件
       2. 缺点 可能会导致过渡抽象 造成组件库的碎片化
    2. 通用性考量 - 组件的形态(DOM 结构)永远是千变万化的 但是其行为(逻辑)是固定的 因此通用组件的秘诀之一就是将 DOM 结构的控制权交给开发者 组件只负责行为和最基础的 DOM 结构
       > 技术选型
    3. CSS 解决方案
    4. JS 解决方案

    > 如何快速启动一个组件库项目

    1. 打包工具
    2. 代码检测
    3. commit 规范
    4. 测试工具
    5. 其他
    6. 快速启动脚手架

    > 组件化和模块化

    1. 组件化

    - 从 UI 界面的角度来进行分析的 把一些可复用的 UI 元素抽离处理
    - 优点: 随着项目规模的增大 手中的组件越来越多 很方便就能把现有的组件拼接成一个完整的页面

    2. 模块化

    - 从代码的角度来进行分析的 把一些可复用的代码 抽离为单个的模块 便于项目的维护和开发

    > 组件可如下定义

    1. 有可复用的模块 完成既定功能
    2. 有明确的接口规定
    3. 有上下文依赖 外部依赖资源的定义
    4. 可以独立发布
       > 组件设计原则
    5. 使用单一职责原则

11. location.href 与 Vue-router 路由跳转区别

    > (Vue-router pushState

    1. 进行路由更新 静态跳转 页面不会重新加载/
       - 使用 router 跳转和使用 history.pushState()没有差别
    2. 同一个页面跳转
    3. 异步加载 this.$nextTick(()=>{获取 URL})
    4. 使用 diff 算法 实现按需加载 减少 DOM 操作/
       > location.href
    5. 触发浏览器 页面重新加载一次/
    6. 不同页面间跳转
    7. 同步加载)

    > Location href 属性

    - href 属性是一个可读可写的字符串 可设置或返回当前显示的文档的完整 URL

    > 语法 location.href
    > 兼容性

    - 所有主要浏览器都支持 href 属性

    > location.href 几种用法

    1. 当前页面打开 URL
       1. self.location.href
       2. window.location.href
       3. this.location.href
       4. location.href
    2. 父页面打开新页面
       - parent.location.href
    3. 顶层页面打开新页面

       - top.location.href

    4. 使用 location.href 实现页面 div 块的快速定位
    5. location.href 可直接获取当前路径
    6. parent.location.href 跳转到上一层页面
    7. top.location.href 跳转到最外层页面

12. Vue 路由懒加载(异步加载组件)

    > 路由懒加载

    - 对于 SPA 单页面应用 当打包构建时 JS 包会变得非常大 影响页面加载速度
    - 将不同路由对应的组件分割成不同的代码块 当路由被访问时 才加载对应组件

    1. Vue 异步组件
       - Vue 允许以一个工厂函数的方式定义组件 这个工厂函数会解析组件定义 Vue 只在这个组件需要被渲染时才会触发该工厂函数
       - 且会把结果缓存起来供未来重新渲染 这个工厂函数会收到一个 resolve 回调 这个回调函数会在你从服务器得到组件定义时被调用
    2. 动态 import/ES6 的 import
       - vue-router 在官网提供了一种方法 可以理解也是为通过 Promise 的 resolve 机制 因为 Promise 函数返回的 Promise 为 resolve 组件本身 有可以用 import 导入组件
    3. webpack 提供的 require.ensure
       - 这种方式可以通过参数中的 webpackChunkName 将 js 分开打包

    - resolve
    - 主要使用了 resolve 异步机制 用 require 代替 import 实现按需加载

    - 官网方法
    - vue-router 在官网提供一种方法 可以理解为通过 Promise 的 resolve 机制 因为 Promise 函数返回的 Promise 为 resolve 组件本身 我们可以使用 import 导入组件

    > 三种方式

    1. Vue 异步组件
       - 主要是使用了 resolve 的异步机制 用 require 代替了 import 实现按需加载
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
    2. ES6 的 import()
       - vue-router 在官网提供了一种方法 可以理解也是为通过 Promise 的 resolve 机制 因为 Promise 函数返回的 Promise 为 resolve 组件本身 有可以用 import 导入组件
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
    3. Webpack 的 require.ensure()
       - 这种方式可以通过参数中的 webpackChunkName 将 js 分开打包
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

13. $route&$router
    1. $route(路由信息对象 包括 path params hash query fullPath matched name 等路由信息参数)
    2. $router(vue-router 实例对象 包括路由跳转方法/钩子函数)
       - $router(vue-router 实例对象 包括路由跳转方法 钩子函数)
         - 为 VueRouter 实例，想要导航到不同 URL，则使用 $router.push
         - 是 VueRouter 的一个对象，通过 Vue.use(VueRouter)和 Vu 构造函数得到一个 router 的实例对象，这个对象中是一个全局的对象，他包含了所有的路由，包含了许多关键的对象和属性。
           以 history 对象来举例：
         - $router.push({path:'home'})，本质是向 history 栈中添加一个路由，在我们看来是切换路由，但本质是在添加一个 history 记录
       - $route(路由信息对象 包括 path params hash query fullPath matched name 等路由信息参数)
         - $route是一个跳转的路由对象，每一个路由都会有一个$route 对象，是一个局部的对象，可以获取对应的 name，path，params，query 等
           为当前 router 跳转对象里面可以获取 name 、 path 、 query 、 params 等
         - $route.path 字符串，等于当前路由对象的路径，会被解析为绝对路径，如/home/ews
         - $route.params 对象，含路有种的动态片段和全匹配片段的键值对，不会拼接到路由的 url 后面
         - $route.query 对象，包含路由中查询参数的键值对。会拼接到路由 url 后面
         - $route.router 路由规则所属的路由器
         - $route.matchd 数组，包含当前匹配的路径中所包含的所有片段所对象的配置参数对象
         - $route.name 当前路由的名字，如果没有使用具体路径，则名字为空
14. vue-router 三种传参方式
    1. meta 路由元信息 写在 routes 配置文件中
    2. query
       - path 引入 this.$route.query.xxx 获取
       - 类似 get 参数显示在地址栏
       - 浏览器地址 http://localhost:8036/home?userId=123
    3. params
       - name 引入 this.$route.params.xxx 获取
       - 类似 post 参数不显示在地址栏
       - 浏览器地址 http://localhost:8036/home/123
    4. meta：路由元信息，写在 routes 配置文件中。
       {
       path: '/home',
       name: 'home',
       component: load('home'),
       meta: {
       title: '首页'
       },
       },
       获取方式 this.$route.meta.title 获取
    5. query
       - path 引入 this.$route.query.xxx 接参
       - 类似 get 参数显示在地址栏
         this.$route.push({
            path:'/home',
            query:{
                userId:123
            }
        })
        浏览器地址：http://localhost:8036/home?userId=123 
        获取方式：this.$route.query.userId
    6. params：这种方式比较麻烦。
       - name 引入 this.$route.params.xx
       - 类似 post 参数不显示在地址栏
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
       - 注：用 params 传参，只能用命名的路由（用 name 访问），如果用 path，params 不起作用。 this.$router.push({ path: '/home', params: { userId }})不生效。
        浏览器地址：http://localhost:8036/home/123
        获取方式：this.$route.params.userId
15. vue-router 使用
    1. query(path 引入 接参 this.$route.query.name 类似 get 传参 参数地址栏显示 拼接在 url 后面的参数，没有也没关系 不设置 没关系)
    2. params(name 引入 接参 this.$route.params.name 类似 post 传参 参数地址栏不显示 是路由的一部分 必须要有 不设置 刷新页面或者返回参数会丢失)
       > 传参区别
    3. 用法上(接收参数的时候，已经是$route而不是$router)
       - query 要用 path 来引入，params 要用 name 来引入
       - 接收参数都是类似的，分别是
       1. this.$route.query.name 和
       2. this.$route.params.name。
       - 注：接收参数的时候，已经是$route而不是$router
    4. 展示上
       - query 更加类似于我们 ajax 中 get 传参
       - params 则类似于 post，说的再简单一点，前者在浏览器地址栏中显示参数，后者则不显示
    5. params 是路由的一部分,必须要有。query 是拼接在 url 后面的参数，没有也没关系。
       - params 一旦设置在路由，params 就是路由的一部分，如果这个路由有 params 传参，但是在跳转的时候没有传这个参数，会导致跳转失败或者页面会没有内容。
    6. params、query 不设置也可以传参，params 不设置的时候，刷新页面或者返回参数会丢失 query 则不会有这个问题
16. Vue-router 源码

    - VueRouter 原型上定义了一系列的函数
    - 我们日常经常会使用到 主要有 go/push/replace/back/forward
    - 以及一些导航守护 beforeEach/beforeResolve/afterEach 等等
    - html 中使用到的 router-view
    - 以及经常用到的 router-link 则存在 src/components 目录下。

    - Vue-Router 是 Vue.js 官方的路由管理器 它和 Vue.js 可深度集成 使构建 SPA 更容易
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

    - 使用 Vue-router 时 主要有以下几步(安装插件 创建 router 对象 挂载 router)
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
      2. 创建 router 对象
      ```
      const router = new VueRouter({
          routes // 路由列表 eg: [{ path: '/foo', component: Foo }]
      });
      ```
      3. 挂载 router
      ```
      const app = new Vue({
          router
      }).$mount('#app');
      ```
      - 其中 VueRouter 对象，就在 vue-router 的入口文件 src/index.js

17. Vue-router

    - (SPA single page application 的路径管理器 WebApp 的链接路径管理系统)

    > Vue-router

    - 实现 SPA 单页面前端路由

    1. hash 模式(浏览器环境) Vue-router 模式 原理 onhashchange 事件 window 对象上监听这个事件
    2. history 模式 依赖 H5 History API&服务器配置
    3. abstract 模式(Nodejs 环境) 支持所有 JS 运行环境 如 Nodejs 服务器端 如果没有发现浏览器 API 路由会强制进入这个模式

    - (Vue 的单页面应用是基于路由和组件的 路由用于设定访问路径 并将路径和组件映射起来)
    - (传统的页面应用 超链接实现页面切换跳转 vue-router 单页面应用/路径/组件的切换)
    - (路由模块本质 建立起 URL 和页面之间映射关系)

    > hash 模式 Vue-router 默认模式

    1. URL 的 hash 模拟一个完整 URL URL 改变 页面不重新加载 hash(#)是 URL 锚点 代表网页中一个位置)
    2. Hash 出现在 URL 中 不会被包含在 HTTP 中 对后端没有影响 改变 Hash 不会重新加载页面(原因) 会在浏览器访问历史中增加一个记录)
    3. Hash 通过锚点值的改变 根据不同的值 渲染指定 DOM 位置不同数据)

    > History 模式 利用了 H5 API 新增的 pushState()方法和 replaceState 方法 提供对历史记录修改功能)

    1. 利用 H5 History Interface 中新增 pushState()和 replaceState()方法 用于浏览器记录栈
       在当前已有 back() forward() go()基础上 提供对历史记录修改)
    2. 需要后端配置支持 服务器添加一个覆盖所有情况的候选项 URL 匹配不到静态资源 则返回一个 index.html 页面)
    3. 解决 Hash 模式存在问题 Hash 传参基于 URL 如要传递复杂数据 会有体积限制 history 模式可在 UR 里传参/可将数据存放到一个特定对象)

    > $router.push和$router.replace 的区别：

    1. $router.push 会向 history 栈添加一个新的记录 点击浏览器的返回按钮时可以看到之前的页面。
    2. $router.replace 不会向 history 添加新记录，而是替换掉当前的 history 记录，即当 replace 跳转到的网页后，‘后退’按钮不能查看之前的页面。

    > vue-router 使用路由模块实现页面跳转三种方式

    1. 直接修改地址栏
    2. 编程式的导航 this.$router.push(‘路由地址’)
    3. 声明式的导航 <router-link to="路由地址"></router-link>

    > vue-router 参数传递

    1. name-params/path-query 传递参数
       - 路由文件 src/router/index.js 里配置 name 属性
       - 模板里(src/App.vue)用$route.name 来接收 比如：<p>{{ $route.name}}</p>
    2. <router-link> 标签中的 to 传参
       ```
       <router-link :to="{name:xxx,params:{key:value}}">valueString</router-link>
       ```
    3. 利用 url 传参----在配置文件里以冒号的形式设置参数。

    > 不能用 a 标签

    - 用 Vue 做的都是单页应用
    - 当你的项目准备打包时，运行 npm run build 时，就会生成 dist 文件夹，
    - 这里面只有静态资源和一个 index.html 页面 所以你写的标签是不起作用的，你必须使用 vue-router 来进行管理。

    > SPA

    - (SPA 核心之一 更新视图而不重新请求页面)
    - (SPA 加载页面时 不会加载整个页面 而是只更新某个指定的容器中内容)

    1. hash 模式
    2. history 模式

    - 单一页面应用程序，只有一个完整的页面；它在加载页面时，不会加载整个页面，而是只更新某个指定的容器中内容。

    > 单页面应用(SPA)的核心之一是:

    - 更新视图而不重新请求页面

    > SPA Vue 单页面应用 和传统页面应用的区别

    - 路由模式的本质就是建立起 URL 和页面之间的映射关系
    - Vue 的 SPA 单页面应用是基于路由和组件的 路由用于设定访问路径 并将路径和组件映射起来
    - SPA 中通过路径的切换 即组件的切换 实现页面切换和跳转
    - 传统的页面应用 用一些超链接来实现页面切换和跳转的。

    > 前端路由(vue-router)

    - vue-router 此处的路由不是指我们平时所说的硬件路由器 是 SPA（单页应用）的路径管理器
    - WebApp 的链接路径管理系统。
    - 使用 Vue+vue-router 创建单页应用 SPA 十分简单
    - router 是 Vue.js 官方的路由插件，它和 vue.js 是深度集成的，适合用于构建单页面应用。
    - vue-router 提供的功能是将组件映射到路由, 然后渲染出来.
    - (Vue-router 两个需求
      1. 记录当前页面的状态
      2. 可以使用浏览器的前进后退功能
    - Vue-router 为了满足以上两个需求实现以下三个功能 1. 改变 URL 且不让浏览器向服务器发出请求 2. 检测 URL 的改变 3. 截获 URL 地址, 并解析出需要的信息来匹配路由规则)
      > url 组成
    - 协议部分、域名部分、端口部分、虚拟目录部分、文件名部分、参数部分、锚部分
    - url 的锚部分是从“#”开始到最后，都是锚部分。锚部分不是 url 的必需部分。
    - url 的参数部分是从“？”开始到“#”为止之间的部分。参数部分也不是 url 的必需部分。

    > Vue-Router

    1. hash 模式
       1. 原理 onhashchange 事件 可以在 window 对象上监听这个事件)
       2. 可以通过 window.location.hash 属性读取 hash 值 且该属性可读可写
       3. 可使用 window.addEventListener('hashchange',fun)监听 hash 变化
       4. #和后面的 URL 片段标识符被称为 hash 会被浏览器解读为位置标识符 这些字符不会被发送到服务器端 改变只会滚动到相应位置)
       5. 使用 URL hash 值来做路由 支持所有浏览器 包括不支持 HTML5 History API 的浏览器)
       6. #/URL 锚点/hash 代表网页中一个位置 改变#后数值 浏览器只会滚动到相应位置 不会重新加载网页)
       7. hash 出现在 URL 中 但不会被包含在 HTTP 请求中 对后端没有影响)
       8. hash 改变会触发 hashchange 事件 浏览器进退也能对其控制 H5 之前基本都是使用 hash 实现前端路由 每一次改变#后的部分 都会在浏览器访问历史中增加一个记录 使用后退按钮 可以回到上一个位置)
       9. Hash 模式通过锚点的改变 据不同的值 渲染指定 DOM 位置的不同数据)
          > 实现原理
       - 早期的前端路由实现就是基于 location.hash 实现的 location.hash 的值就是 URL 中#后面的内容
         > vue-router 源码对/src/history/hash.js 的处理
       1. 使用 window.addEventListener('hashchange',fun)监听路由的变化 然后使用 transitionTo 方法更新视图
       2. vue-router 的 2 个主要 API push 和 replace 也是简单处理了下 hash , 然后调用 transitionTo 方法更新视图
    2. history 模式(依赖 HTML5 History API 和服务器配置)

       > HTMLHistory 基本知识:

       - (使用 back() forward() go()方法完成在用户历史记录中向后和向前的跳转
       - H5 中引入了 history.pushState()添加历史记录/history.replaceState()修改历史记录
       - 解决 hash 传参体积问题 不带# 更美观
       - 通过 JS 操作 window.history 改变浏览器地址栏参数 没有发起 HTTP 请求)

       1. History 接口允许操作浏览器的曾经在标签页或者框架里访问的会话历史记录。
       2. 使用 back(), forward()和 go() 方法来完成在用户历史记录中向后和向前的跳转。
       3. HTML5 引入了 history.pushState() 和 history.replaceState() 方法，它们分别可以添加和修改历史记录条目。
          > vue-router 源码对/src/history/html5.js 处理
       4. 处理逻辑和 hash 相似，使用 window.addEventListener("popstate", fun) 监听路由的变化,
       5. 使用 transitionTo 方法更新视图

       6. 利用了 HTML5 新增的 pushState()和 replaceState()两个 API, 通过这两个 api 完成 URL 跳转不会重新加载页面
       7. 同时 history 模式解决了 hash 模式存在的问题. hash 的传参是基于 URL 的, 如果要传递复杂的数据, 会有体积限制, 而 history 模式不仅可以在 URL 里传参, 也可以将数据存放到一个特定的对象中

       > 404 问题

       - history 模式下 只是动态的通过 JS 操作 window.history 改变浏览器地址栏里的路径
       - 并没有发起 HTTP 请求 当直接在浏览器里输入这个地址的时候 就一定要对服务器发起 http 请求 但是该目标在服务器上不存在 所以会返回 404

       > 解决:

       - 在 Ngnix 中将所有请求都转发到 index.html 上就可以了。

    3. abstract - (支持所有 JavaScript 运行环境 如 Node.js 服务器端 如果发现没有浏览器的 API 路由会强制进入这个模式) > 对/src/history/abstract.js 处理 1. 首先定义了 2 个变量，stack 来记录调用的记录， index 记录当前的指针位置 2. 首先定义了 2 个变量，stack 来记录调用的记录， index 记录当前的指针位置
       > 小结
    4. hash 和 history 的使用方式差不多，hash 中路由带 # ，但是使用简单，不需要服务端配合，站在技术角度讲，这个是配置最简单的模式，
    5. history 模式需要服务端配合处理 404 的情况

    - (在路由跳转的时候，就会出现访问不到静态资源而出现 404 的情况，这时候就需要服务端增加一个覆盖所有情况的候选资源：如果 URL 匹配不到任何静态资源，则应该返回同一个 index.html 页面) 路由中不带 # ，比 hash 美观一点。

    3. abstract 模式没有使用浏览器 api 可以放到 node 环境或者桌面应用中

18. Vue-Router 导航守卫

    1. 全局的(beforeEach 路由跳转前触发/beforeResolve 路由跳转前触发/afterEach 路由跳转完成后触发)
    2. 单个路由独享的(beforeEnter 紧随 beforeEach 后)
    3. 组件内(beforeRouteEnter 渲染该组件对应路由被确认前/beforeRouteUpdate 组件被复用/beforeRouteLeave 导航离开该组件)

    > 导航守卫

    - 路由跳转过程中的一些钩子函数 路由跳转是一个大过程 这个大过程分跳转前中后等细小过程 每一个过程都有一个函数 可以让你操作一些其他的事的时机

    > 常用的两个路由守卫

    1. router.beforeEach
    2. router.afterEach

    > 项目中

    - 一般在 beforeEach 这个钩子函数中进行路由跳转一些信息判断 判断是否登录 是否拿到对应路由权限

    > 导航守卫全解析

    - 一个钩子函数执行后输出的顺序
      1. 全局前置守卫:beforeEach
      2. 路由 beforeEnter 守卫
      3. 组件路由守卫 beforeRouterEnter 此时 this 并不指向该组件实例
      4. 全局解析守卫 beforeResolve
      5. 全局后置守卫 afterEach
         组件生命周期 beforeCreate
         组件生命周期 created
         组件生命周期 beforeMount
         组件生命周期 mounted
         组件路由守卫 beforeRouteEnter 的 next 回调

    1. 全局的(beforeEach 路由跳转前触发/beforeResolve 路由跳转前触发/afterEach 路由跳转完成后触发)
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
       在 beforeEach 和组件内 beforeRouteEnter 之后
       afterEach 之前调用
       afterEach 全局后置守卫
       (afterEach 钩子中不可以使用 next() 不接受 next 的参数)
       与 beforeEach 相反
       路由跳转完成后触发
       参数
       to from
       在 beforeEach 和 beforeResolve 之后
       beforeRouteEnter(组件内守卫)之前
    2. 单个路由独享的(beforeEnter 紧随 beforeEach 后)
       单个路由配置时 也可设置的钩子函数
       目前只有一个钩子函数
       beforeEnter
       和 beforeEach 完全相同
       如果都设置则在 beforeEach 之后紧随执行
       参数:
       to from next
    3. 组件内(beforeRouteEnter 渲染该组件对应路由被确认前/beforeRouteUpdate 组件被复用/beforeRouteLeave 导航离开该组件)
       组件内执行的钩子函数
       类似于组件内的生命周期
       相当于为配置路由的组件添加的生命周期钩子函数
       钩子函数按执行顺序包括
       beforeRouteEnter
       进入对应路由的组件创建前被调用
       渲染该组件对应路由被 comfirm 前调用
       不能获取组件实例 this
       因为当守卫执行前 组件实例还没被创建
       可以通过传一个回调给 next 来访问组件实例
       在导航被确认时执行回调 并把组件实例作为回调函数的参数
       beforeRouteUpdate
       重用的组件中被调用 如包含<router-view/>的组件
       在当前路由改变 但是该组件被复用时调用
       举例来说 对于一个带有动态参数的路径
       /foo/:id 在/foo/1 和/foo/2 之间跳转
       由于会渲染同样的 Foo 组件
       因此组件实例会被复用
       这个钩子会在这个情况下被调用
       可以访问组件实例的 this
       beforeRouteLeave
       导航离开该组件的对应路由调用
       可以访问组件实例 this
       > 导航守卫回调参数
    4. to:目标路由对象 即将进入路由对象
    5. from:即将要离开的路由对象 当前导航正要离去路由对象
    6. next:最重要一个参数 单凡涉及到 next 参数的钩子 必须调用 next 才能继续往下执行下一个钩子
       next()：进入下一个路由。
       next(false)：中断当前的导航。
       next('/')或 next({ path: '/' }) : 跳转到其他路由，当前导航被中断，进行新的一个导航。
       > PS:
    7. 但凡涉及到有 next 参数的钩子 必须调用 next()才能继续往下执行下一个钩子 否则路由跳转会停止
    8. 如果要中断当前的导航要调用 next(false)如果浏览器的 URL 改变了(可能是用户手动或浏览器后退按钮)则 URL 地址会重置到 from 路由对应的地址
       (主要用于登录验证不通过的处理)
    9. next 可以这样使用 next('/')/next({path:'/'})跳转到一个不同的地址 意思是当前导航被中断 然后进行一个新的导航 可传递的参数和 router.push()选项一致
    10. 在 beforeRouteEnter 钩子中 next((vm)=>{})内接受的回调函数参数为当前组件的实例 vm 这个回调函数在生命周期 mounted 之后调用 即它是所有导肮守卫和生命周期函数最后执行的那个钩子
    11. next(errror) 如果传入 next 的参数是一个 Error 实例 则导航会被终止且该错误会被传递给 router.onError()注册过的回调

    > 小结：

    - 路由导航守卫都是在 Vue 实例生命周期钩子函数之前执行的。
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
      beforeRouteEnter 的 next 回调
    - 路由更新时:
      beforeRouteUpdate
    - 完整的导航守卫流程
      导航被触发。
      在失活的组件里调用离开守卫 beforeRouteLeave(to,from,next)。
      调用全局的 beforeEach( (to,from,next) =>{} )守卫。
      在重用的组件里调用 beforeRouteUpdate(to,from,next) 守卫。
      在路由配置里调用 beforeEnter(to,from,next)路由独享的守卫。
      解析异步路由组件。
      在被激活的组件里调用 beforeRouteEnter(to,from,next)。
      在所有组件内守卫和异步路由组件被解析之后调用全局的 beforeResolve( (to,from,next) =>{} )解析守卫。
      导航被确认。
      调用全局的 afterEach( (to,from) =>{} )钩子。
      触发 DOM 更新。
      用创建好的实例调用 beforeRouteEnter 守卫中传给 next 的回调函数
      beforeRouteEnter(to, from, next) {
      next(vm => {
      //通过 vm 访问组件实例
      })
      }

19. Router-link(设置路由跳转)和 Router-view(根据路由显示组件)

    - router-link 和 router-view 在同一个 Vue 文件中

    1. router-link

    - 设置路由跳转

    ```
        <router-lonk :to="...">声明式导航
        router.push(...)编程式导航
    ```

    2. router-view

    - 根据路由显示组件

    > Vue 中这两者相互依存

    - router-link 对应 HTML 中的 a 标签 与 a 标签不同的是跳转的时候 不会刷新页面
    - router-view 相当于 router-link 的承载页面 用于显示 router-link 的内容

    > router-link

    - <router-link>是 Vue-Router 的内置组件，在具有路由功能的应用中作为声明式的导航使用。

    <router-link>8 个 prop

    1. to：必填，表示目标路由的链接。当被点击后，内部会立刻把 to 的值传到 router.push()，所以这个值可以是一个字符串或者是描述目标位置的对象。
       注意 path 存在时 params 不起作用，只能用 query
    2. replace：默认值为 false，若设置的话，当点击时，会调用 router.replace()而不是 router.push()，于是导航后不会留下 history 记录。
    3. append：设置 append 属性后，则在当前 (相对) 路径前添加基路径。
    4. tag：让<router-link>渲染成 tag 设置的标签，如 tag:'li,渲染结果为<li>foo</li>。
    5. active-class：默认值为 router-link-active,设置链接激活时使用的 CSS 类名。默认值可以通过路由的构造选项 linkActiveClass 来全局配置。
    6. exact-active-class：默认值为 router-link-exact-active,设置链接被精确匹配的时候应该激活的 class。默认值可以通过路由构造函数选项 linkExactActiveClass 进行全局配置的。
    7. exact：是否精确匹配，默认为 false。
    8. event：声明可以用来触发导航的事件。可以是一个字符串或是一个包含字符串的数组，默认是 click。

20. 编程式导航&声明式导航 > 实现路由跳转的两种方式 1. 声明式导航： - 直接渲染到页面 <router-link to="/url"> - 点击<router-link :to='...'>相当于调用 router.push() 2. 编程式导航：
    `<!-- 字符串路径 --> router.push('/users/de') <!-- 带有路径的对象 --> router.push({path:'/users/de'}) <!-- 命名的路有 并加上参数 让路由建立url --> router.push({name:'user',params:{username:de}}) <!-- 带查询参数 结果是 /register,query:{plan:'private'}--> router.push({path:'/register',query:{plan:'private'}}) <!-- 带hash 结果是/about#team --> router.push({path:'/about',hash:'#team'})` > 如果提供了 path params 会被忽略 上述例子中的 query 并不属于这种情况 需要提供路由的 name 或手写完整的带有参数的 path
    `` const username = 'eduardo' // 我们可以手动建立 url，但我们必须自己处理编码 router.push(`/user/${username}`) // -> /user/eduardo // 同样 router.push({ path: `/user/${username}` }) // -> /user/eduardo // 如果可能的话，使用 `name` 和 `params` 从自动 URL 编码中获益 router.push({ name: 'user', params: { username } }) // -> /user/eduardo // `params` 不能与 `path` 一起使用 router.push({ path: '/user', params: { username } }) // -> /user `` - 该方法会向 history 栈添加一个记录 当用户点击浏览器后退按钮时 会回到之前的 URL - JS 中处理逻辑后需要页面进行跳转 - this.$router 其实就是 router
    - Vue 为方便在组件中使用 router 才添加 this.$router 1. this.$router.push();
      - 会进行页面跳转 同时会在历史记录上留下记录
    2. this.$router.replace(); - 和 push 功能相同 但是会替换当前页出现在历史记录中 3. this.$router.go(num);
       - 表示距离当前页的在历史记录上的页数
    3. this.$router.back() - 返回到上一页 5. this.$router.forward()
       前进到下一页
       > 共同点：
    - 都能进行导航 都可以触发路由 实现组件切换
      > 区别：
    - 写法不一样
    - 声明式导航写在组件的 template 中 通过 router-link 触发
    - 编程式导航写在 JS 函数中 通过 this.$router.push(xxx)触发
21. SPA 单页面的理解 优缺点 优化首屏加载速度慢的问题

    > SPA（ single-page application ）

    1. 仅在 Web 页面初始化时加载
    2. 页面加载完成后 利用路由机制实现 HTML 内容变换

    - 仅在 Web 页面初始化时加载相应的 HTML、JavaScript 和 CSS。 一旦页面加载完成，SPA 不会因为用户的操作而进行页面的重新加载或跳转； 取而代之的是利用路由机制实现 HTML 内容的变换，UI 与用户的交互，避免页面的重新加载。

    > 优点：(良好的用户体验/良好的前后端工作分离模式/减轻服务器压力)

    1. 良好的交互体验
       - 用户体验好、快，内容的改变不需要重新加载整个页面，避免了不必要的跳转和重复渲染；
    2. 良好的前后端工作分离模式
       - 前后端职下·责分离，架构清晰，前端进行交互逻辑，后端负责数据处理；
    3. 减轻服务器压力
       - 基于上面一点，SPA 相对对服务器压力小；

    > 缺点：(SEO 难度较高/导航不可用/初次加载耗时多 页面复杂度提高很多) 4. SEO(Search Engine Optimization 搜索引擎优化)难度较高

        - 由于所有的内容都在一个页面中动态替换显示，所以在 SEO 上其有着天然的弱势。

    5. 导航不可用
       - 由于单页应用在一个页面中显示所有的内容 所以不能使用浏览器的前进后退功能 所有的页面切换需要自己建立堆栈管理；
    6. 初次加载耗时多 页面复杂度提高很多
       - 为实现单页 Web 应用功能及显示效果，需要在加载页面的时候将 JavaScript、CSS 统一加载，部分页面按需加载；

    > 优化：

    1. 将公用的 JS 库通过 script 标签外部引入，减小 app.bundel 的大小，让浏览器并行下载资源文件，提高下载速度；
    2. 在配置路由时，页面和组件使用懒加载的方式引入，进一步缩小 app.bundel 的体积，在调用某个组件时再加载对应的 js 文件；
    3. 加一个首屏 loading 图，提升用户体验；

22. Vuex

    > 定义:

    - 一个专为 Vue.js 应用程序开发的状态管理插件。每一个 Vuex 应用的核心就是 store（仓库）。
    - “store” 基本上就是一个容器，它包含着你的应用中大部分的状态 ( state )。它采用集中式存储管理应用的所有组件的状态 更改状态的唯一方法是提交 mutation，
    - 例 this.$store.commit('SET_VIDEO_PAUSE', video_pause，SET_VIDEO_PAUSE 为 mutations 属性中定义的方法
    - Vuex 的状态存储是响应式的。当 Vue 组件从 store 中读取状态的时候，若 store 中的状态发生变化，那么相应的组件也会相

    > 包括以下几个模块：

    - computed 中解构 Vuex 辅助函数

    1. State：
       - 定义了应用状态的数据结构，可以在这里设置默认的初始状态。
    2. Getter：
       - 允许组件从 Store 中获取数据，mapGetters 辅助函数仅仅是将 store 中的 getter 映射到局部计算属性。

    - methods 中解构 Vuex 辅助函数

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

    - Vuex 借鉴了 Flux Redux 将数据存放到全局的 store
    - 再将 store 挂载到每个 Vue 实例组件中 利用 Vue.js 的细粒度数据响应机制来进行高效的状态更新

    > Vuex 的 store 如何挂载注入到组件中

    1. 在 Vue 项目中先安装 Vuex
    2. 利用 Vue 插件机制 使用 Vue.use(vuex) 调用 Vuex 的 install 方法 装载 Vuex
    3. applyMinxin 方法使用 Vue 混入机制 Vue 的生命周期 beforeCreate 钩子函数混入 vuexInit 方法

    > 分析源码

    1. Vuex 利用 Vue 的 mixin 混入机制
    2. 在 beforeCreate 钩子函数前混入 vuexInit 方法
    3. vuexInit 方法实现了 store 注入 vue 组件实例
    4. 并注册了 vuex store 的引用属性$store

    > Vuex 的 state 和 getters 如何映射到各个组件实例中响应式更新状态 store 实现的源码在 src/store.js

    1.  源码中找到 resetStoreVM 核心方法 - Vuex 的 state 状态是响应式的 借助 Vue 的 data 是响应式的 将 state 存入 vue 实例组件的 data 中 - Vuex 的 getters 借助 Vue 的计算属性 computed 实现数据实时监听

            computed计算属性监听data数据变更主要经历以下几个过程

        > 小结

    - Vuex 通过全局注入 store 对象 来实现组件间状态共享
    - 在大型复杂的项目中(多级组件嵌套) 需要实现一个组件更改某个数据 多个组件自动获取更改后的数据进行业务逻辑处理 此时使用 Vuex 比较合适

    > Vuex 辅助函数

    1. computed 中对 mapState mapGetters 解构

       ```
       import {mapState,mapMutations} from "vuex";
       ```

       1. mapState 辅助函数 state 类似 vue 中的 data
          computed:{
          ...mapState(['nickname','age','gender'])
          },
       2. mapGetters 辅助函数 getterr 相当于 Vue 中的 computed
          computed:{
          ...mapGetters(['realname','money_us'])
          },

       - getters 相当于 Vue 中的计算属性 通过 getters 进一步处理得到我们想要的数值 允许穿参 第一个参数是 state

    2. methods 中对 mapMutations mapActions 解构

       1. mutations

       - mutations 类似 vue 中的 methods 需要通过 commit 调用其中方法 可传入参数
       - mutations 只能写同步方法不能写异步方法如 axios setTimeout 主要作用就修改 state
       - 为什么调用 mutations 中的方法对 state 中的数值进行修改 而不直接进行修改呢
       - 作者在 mutations 中做了类似埋点操作如果
       - 从 mutations 中操作的话， 能被检测到，可以更方便用调试工具调试，调试工具可以检测到实时变化，而直接改变 state 中的属性，则无法实时监测
       - mutations 中写异步，也能够调成功，但是由于是异步的，不能被调试工具追踪到，所有不推荐这样写，不利于调试,这是官方的约定。)

       ```
       methods:{
           ...mapMutations(['changePage'])
       }
       ```

       1. state
       2. 负荷 payload -该参数最好写成对象形式 可以传递更多信息

       3. mapActions

       - (action 类似 mutation

       ```
       methods:{
           ...mapActions(['getUserInfo'])
       }
       (this.$store.dispatch(‘getUserInfo’))
       ```

       > 区别：

       1. action 可以提交 mutation
       2. action 不要直接操作 state 而是去操作 mutation
       3. action 包含异步操作 类似 axios 请求 都可以放在 action 中写
       4. action 默认就是异步 而且返回 promise
          > Vuex 中 action 和 mutation 有什么区别/共同点

       - 区别：
         1. action 提交的是 mutation，而不是直接变更状态。mutation 可以直接变更状态。
         2. action 可以包含任意异步操作。mutation 只能是同步操作。
         3. 提交方式不同，action 是用 this.$store.dispatch('ACTION_NAME',data)来提交。mutation是用this.$store.commit('SET_NUMBER',10)来提交。
         4. 接收参数不同，mutation 第一个参数是 state，而 action 第一个参数是 context，其包含了
       - 相同：
         1. 第二参数都可以接收外部提交时传来的参数。
         ```
         this.$store.dispatch('ACTION_NAME',data)和
         this.$store.commit('SET_NUMBER',10)
         ```

    > 手动引入:

    1. 先安装依赖 nnpm install vuex --save
    2. 在项目目录 src 中建立 store 文件夹
    3. 在 store 文件夹下新建 index.js 文件,写入
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
    4. main.js 文件中引入 Vuex
       ```
       import Vue from 'vue';
       import App from './App.vue';
       import store from './store';
       const vm = new Vue({
           store:store,
           render: h => h(App)
       }).$mount('#app')
       ```

    > Vuex 中状态是对象时 使用注意事项

    - 对象是引用类型 复制后改变属性还是会影响原始数据 这样会改变 state 里面的状态 不允许 先用深度克隆复制对象 再修改。

    > Vuex 插件使用

    - Vuex 插件就是一个函数 它接受 store 作为唯一参数 在 Vuex.store 构造器选项 plugins 引入

    1. store/plugin.js 文件中写入
       ```
        export default function createPlugin(param){
            return store =>{
                //...
            }
        }
       ```
    2. store/index.js 文件中写入
       import createPlugin from './plugin.js'
       const myPlugin = createPlugin()
       const store = new Vuex.Store({
       // ...
       plugins: [myPlugin]
       })

    > Vuex 严格模式

    - 不是由 mutations 函数引起的状态变更 抛出错误
    - 开启
    - Vuex.Store 构造器选项

    ```
    const store = new Vuex.Store({
        strict:true
    })
    ```

23. vue 初始化和生命周期钩子函数

    - (初始化:开始创建、初始化数据、编译模板、挂载 Dom、数据变化时更新 DOM、卸载)
    - (生命周期:Vue 实例从创建到销毁的过程)
    - (Vue 实例有一个完整的生命周期 指一个实例从开始创建到销毁这个过程)
    - (生命周期钩子自动绑定 this 到实例上 可以通过 this 操作访问到数据和方法)
    - (生命周期钩子函数

    1. beforeCreate
       实例初始化之后 创建之前
       el undefined
       data undefined
       DOM 未生成
       --el 和 data 未初始化
    2. created
       el undefined
       data [Object Object]

       - el 未初始化 data 初始化 DOM 未生成

       实例创建之后 vm.$el 未定义 挂载属性 el 不存在
       能读取到 data 的值(属性和方法的运算 watch/event 事件回调)
       模板渲染成 HTML DOM 未生成

    3. beforeMount
       $el挂载前 vm.$el 还是未定义

       - 相关 Render 函数首次被调用 将模块渲染成 HTML
       - 将编译完成的 html 挂载到对应的虚拟 DOM

       el [Object HTMLDivElement]
       data [Object Object]
       -- el 和 data 初始化->已完成模版变异->未渲染到页面
       DOM 相关 render 函数首次被调用 将模块渲染成 HTML
       data 初始化
       meaasge Vue 生命周期

    4. mounted

       - $el 挂载后被调用 编译好的 HTML 挂载到页面完成后 初始化页面完成后调用 nextTick 方法
         el [Object HTMLDivElement]
         data [Object Object]
       - -挂载渲染完成后调用->初始化页面->对 DOM 进行操作

       此时 vm.$el 可以调用

       不能保证所有的子组件都挂载
       要等视图全部更新完毕用 vm.$nextTick();
       编译好的 html 挂载到页面完成后所执行的事件钩子函数。
       挂载完毕阶段

       此时编译好的 HTML 已经挂载到了页面上 页面上已经渲染出了数据
       一般会利用这个钩子函数做一些
       ajax 请求获取数据进行数据初始化
       el [Object HTMLDivElement]
       data [Object Object]
       meaasge Vue 生命周期
       此阶段中 DOM 渲染完成

    5. beforeUpadate
       更新渲染视图前
       界面中数据旧 data 中数据已更新
       未同步

       检测到修改数据
       更新渲染视图之前触发

       修改 vue 实例的 data 时
       vue 就会自动帮我们更新渲染视图
       检测到我们要修改数据
       更新渲染视图之前触发

    6. updated
       更新渲染视图后
       已同步

       此阶段为更新渲染视图之后触发
       此时再读取视图上的内容，已经是最新的内容。
       PS:

       1. 该钩子在服务器端渲染期间不被调用。
       2. 应该避免在此期间更改状态，
          因为这可能会导致更新无限循环。

    7. beforeDestory
       实例销毁前触发 实例 vm 可用
       调用实例的 destroy()
       此时实例仍然完全可用；
       方法可以销毁当前的组件，在销毁前，
       会触发 beforeDestroy 钩子。
    8. destoryed
       实例销毁后触发 实例 vm 不可用
       此时该实例与其他实例的关联已经被清除，
       Vue 实例指示的所有东西都会解绑定，
       所有的事件监听器会被移除，
       所有的子实例也会被销毁。

    - props methods data 和 computed 的初始化都是在 beforeCreated 和 created 之前完成的

24. 在哪个生命周期内调用异步请求(created)/什么阶段才能访问操作 DOM(mounted)？

    > (created beforeMounted mounted)

    - 这三个钩子函数中 data 已创建 可将服务端端返回的数据进行赋值
    - 在 created 钩子函数中调用异步请求 可以更快获取服务端数据
    - 服务器端没有 mounted 和 beforeMount 生命周期钩子函数

    > 什么阶段能访问操作 DOM mounted

    - 钩子函数 mounted 被调用前 Vue 已经将编译好的模板挂载到页面上 在 mounted 中可以访问操作 DOM

    - created 和 mounted
      > mounted 生命周期钩子中调用优点

    1. created 中，页面视图未出现，如果请求信息过多，页面会长时间处于白屏状态，DOM 节点没出来，无法操作 DOM 节点。
    2. 在 mounted 不会这样
       > created 钩子函数中调用异步请求优点：

    - (更快获取服务端数据/ssr 不支持 beforeMount Mounted 生命周期钩子)

    1. 能更快获取到服务端数据，减少页面 loading 时间；
    2. ssr(服务端渲染) 不支持 beforeMount 、mounted 钩子函数，所以放在 created 中有助于一致性；
       > 在哪个生命周期内进行数据获取
    3. 正常获取 created
    4. 涉及需页面加载完成后(DOM 操作)mounted

    - 请求是异步的 created 生命周期中 Data 才生成 而请求返回的数据需要挂载在 data 中 所以 created 里可以初始化请求 但 created 时候的 dom 还没有初始化完成
    - mounted 生命周期里 dom 才初始化渲染完成
    - 请求是异步的 所以不会阻塞页面渲染的主线程 如果请求不需要借助/依赖/改变 DOM 这时请求可以放在 created 反之可以放在 mounted

25. Vue 的父组件和子组件生命周期钩子函数执行顺序/
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
26. Vue 一些指令(directive)及具体作用
    > 指令 (Directives)：
    - 是带有 v- 前缀的特殊 attribute。指令 attribute 的值预期是单个 JavaScript 表达式 (v-for 是例外情况，稍后我们再讨论)。
    - 指令的职责是，当表达式的值改变时，将其产生的连带影响，响应式地作用于 DOM。
    1. v-html/v-text(可简写为{{}}并支持逻辑运算)
       - v-html:会以 html 的方式把内容载入页面中浏览器会将其当作 html 标签解析后输出 会有 XSS 攻击分析，不要用在用户提交内容上；
       - v-text：(单向绑定 数据对象=>插值) 操作纯文本 浏览器不会再对其进行 html 解析 会把全部内容转化为字符串 注:vue 中有个指令叫做 v-once 可以通过 v-once 与 v-text 结合，实现仅执行一次性的插值
    2. v-show/v-if(v-else-if/v-else)
       - v-show:初始化渲染 切换元素的 display 属性,来控制元素显示隐藏 初始化会渲染，适用频繁显示隐藏的元素,不能用在<template>上；不支持 v-else
       - v-if:初始化不渲染 通过销毁并重建组件，来控制组件显示隐藏，初始化不会渲染，不适用频繁显示隐藏的组件，可以用在<template>上。支持 v-else
    3. v-on(@)/v-bind(:)/v-model
       1. v-on(用于绑定 HTML 事件 缩写@) 对象同时绑定多个事件时 不能用@代替 v-on v-on 后面接一个对象，但是不支持事件修饰符。
       2. v-bind(用于设置 HTML 属性 缩写:) 多标签的页面也可以使用 is 特性来切换不同的组件 主要用于属性绑定 如 class/style/value/href 等
       3. v-model(表单控件元素上创建双向数据绑定 作用于表单控件外的标签没有用)
          - 双向绑定(JS 中 Vue 实例中 data<=>其渲染 DOM 元素上内容)
          - 原理：vue 项目中主要使用 v-model 指令在表单 input、textarea、select 等元素上创建双向数据绑定。
          - v-model 本质上不过是语法糖，v-model 在内部为不同的输入元素使用不同的属性并抛出不同的事件：
          1. text 和 textarea 元素使用 value 属性和 input 事件；下
          2. checkbox 和 radio 使用 checked 属性和 change 事件；
          3. select 字段将 value 作为 prop 并将 change 作为事件。
             修饰符
          - v-model.lazy 懒监听、
          - v-model.number 将值转成有效的数字、v-model.trim 过滤首尾空格；
       4. v-bind 与 v-model 区别
          1. v-bind 动态绑定指令，默认情况下标签自带属性的值是固定的，在为了能够动态的给这些属性添加值，可以使用 v-bind:你要动态变化的值="表达式"
          2. v-bind 用于绑定属性和数据 ，其缩写为“ : ” 也就是 v-bind:id === :id
          3. v-model 用在表单控件上的，用于实现双向数据绑定，所以如果你用在除了表单控件以外的标签是没有任何效果的。
    4. v-for
       - key 作用：(主要用在 Vue 的虚拟 DOM diff 算法) 新旧 nodes 对比时辨识 VNodes。
       - 如果不使用 key，Vue 会使用一种最大限度减少动态元素并且尽可能的尝试就地修改/复用相同类型元素的算法。
       - 而使用 key 时，它会基于 key 的变化重新排列元素顺序，并且会移除 key 不存在的元素。
       - 有相同父元素的子元素必须有独特的 key。重复的 key 会造成渲染错误。
       - 最常见的用例是结合 v-for：
       - key 的使用：
         1. 必须指定
         2. 唯一的字符串 string/数字 number 类型:key 值
         3. 必须使用 v-bind 属性绑定的形式指定 key 的值
       1. v-for 循环普通数组
       2. v-for 循环对象数组
       3. v-for 循环对象
       4. v-for 迭代数字
    5. v-once
       - 只渲染元素和组件一次。随后的重新渲染，元素/组件及其所有的子节点将被视为静态内容并跳过,用于优化更新性能;
       - 组件中有大量的静态的内容可以使用这个指令。
    6. v-pre
       - 跳过这个元素和它的子元素的编译过程。可以用来显示原始 Mustache 标签。跳过大量没有指令的节点会加快编译;<span v-pre>{{ this will not be compiled }}</span>
    7. v-slot
    8. v-cloak：
       - 可以解决在页面渲染时把未编译的 Mustache 标签（{{value}}）给显示出来。
    9. v-if 和 v-for
       - (v-for 优先级高于 v-if 使用 v-for 遍历对象时 按 Object.keys()的顺序的遍历，转成数组保证顺序)
         1. 处于同一节点，v-for 的优先级比 v-if 更高
         - 这意味着 v-if 将分别重复运行于每个 v-for 循环中。当你只想为部分项渲染节点时，这种优先级的机制会十分有用。
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
         - 使用 v-for 遍历对象时 按 Object.keys()的顺序的遍历，转成数组保证顺序。
27. computed/methods/watch

    > computed & methods

    1. 计算属性 computed

    - (计算属性是基于它们的响应式依赖进行缓存的,只在相关响应式依赖发生改变时它们才会重新求值)
    - (不支持异步 当 computed 内有异步操作时无效 无法监听数据变化)

    2. 事件 methods

    - (只要发生重新渲染，method 调用总会执行该函数)
    - methods 方法 watch 属性 不能用 this this 会是 undefind, 因为箭头函数中的 this 指向的是定义时的 this，而不是执行时的 this，所以不会指向 Vue 实例的上下文。

    > computed & watch

    1. computed(缓存结果每次都会重新创建变量/通过 return 返回)

    - (计算属性/依赖多个属性/缓存结果时每次都会重新创建变量/计算开销比较大(计算次数多或者异步处理)/通过 return 返回/不支持异步)

    2. watch(直接计算不会创建变量保存结果/不需要 return)

    - (侦听器/依赖一个属性/直接计算，不会创建变量保存结果/计算开销比较大(计算次数多或者异步处理)/不需要 return/支持异步)
    - 在选项参数中指定 deep: true 可深度监听
    - 在选项参数中指定 immediate: true 将立即以表达式的当前值触发回调。监听后立即调用

    3. computed 是计算一个新的属性 并将该属性挂载到 vm(Vue 实例)上 而 watch 是监听已经存在且已挂载到 vm 上的数据 所以用 watch 同样可以监听 computed 计算属性的变化

    > computed&watch

    1. computed(支持缓存/不支持异步)
       1. 支持缓存 只有依赖数据发生变化 才会重新进行计算
       2. 不支持异步 当 computed 内有异步操作时无效 无法监听数据变化
       3. computed 属性值默认走缓存 计算属性基于它们响应式依赖进行缓存 即基于 data 中声明过或者父组件传递的 props 中的数据通过计算得到的值
       4. 一个属性由其他属性计算出来 该属性依赖其他属性 是一个多对一/一对多 一般用 computed
       5. 如果 computed 属性属性值是函数 则默认会走 get 方法 函数的返回值就是属性的属性值 在 computed 中 属性都有一个 get 和 set 方法 数据变化时 调用 set 方法
    2. watch 侦听属性(不支持缓存/支持异步)
       1. 不支持缓存 数据变化 会触发相应操作
       2. watch 支持异步
       3. 监听的函数接收两个参数 第一个参数是最新的值 第二个参数是输入之前的值
       4. 当一个属性发生变化时 需要执行对应的操作 一对多
       5. 监听数据必须是 data 中声明过或者父组件传递过来的 props 中的数据 当数据变化时 触发其他操作 函数有两个参数
          - immediate：组件加载立即触发回调函数执行
          - deep:深度监听 为了发现对象内部值的变化 复杂类型的数据时使用
            - PS：监听数组变动不需要这么做
              - deep 无法监听到数组的变动和对象的新增
              - 参考 Vue 数组 只有以响应式方式触发才会被监听到

    - (computed data props methods 都会被挂载在 vm 实例上，因此这三个都不能同名。)

28. 计算属性 computed

    > (避免在模板中放入太多的逻辑，导致模板过重且难以维护。)
    > 特性：

    - (计算属性是基于它们的响应式依赖进行缓存的,只在相关响应式依赖发生改变时它们才会重新求值)
    - 计算属性默认只有 getter，不过在需要时你也可以提供一个 setter：
      > computed 怎么实现的缓存

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

29. Vue API 实例属性/实例方法(数据/事件/生命周期)

    > Vue 的$(内置的实例方法 属性) 挂载在 this 上的 Vue 内部属性 内部 API 的命名空间

    - 一个特殊标记 增强区分 说明这是内置的实例方法属性

    > 全局配置

    - Vue.config 是一个对象 包含 Vue 的全局配置

    > 实例方法

    1. vm.$nextTick(callback) DOM 更新后想做点什么 等待视图全部更新后执行 回调函数 this 自动绑定到调用它的实例
    2. vm.$forceUpdate 强制 Vue 实例重新渲染 而非重新加载组件 会触发 beforeUpdate 和 update 钩子函数 仅影响实例本身和插入插槽内容子组件
    3. vm.$destory() 销毁一个实例 不能清理实例的 DOM 和 data 会触发 beforeDestory 和 destoryed 钩子函数
    4. vm.$mount([elementOrSelector]) 返回 vm 实例本身 可链式调用其他实例对象 不常使用)
       - 如果 Vue 实例在实例化时没有收到 el 选项，则它处于“未挂载”状态，没有关联的 DOM 元素。可以使用 vm.$mount() 手动地挂载一个未挂载的实例。
         如果没有提供 elementOrSelector 参数，模板将被渲染为文档之外的的元素，并且你必须使用原生 DOM API 把它插入文档中。
         这个方法返回实例自身，因而可以链式调用其它实例方法。
    5. vm.$set() 全局 Vue.set 别名
    6. vm.$delete() 全局 Vue.delete 别名
    7. vm.$watch(expOrFn,callback,[options])
        观察 Vue 实例上的一个表达式或者一个函数计算结果的变化。回调函数得到的参数为新值和旧值。表达式只接受简单的键路径。对于更复杂的表达式，用一个函数取代。
        变更 (不是替换) 对象或数组时，旧值将与新值相同，因为它们的引用指向同一个对象/数组。Vue 不会保留变更之前值的副本。
        vm.$watch 返回一个取消观察函数，用来停止触发回调：
       选项 deep:
       为了发现对象内部值的变化，可以在选项参数中指定 deep: true。注意监听数组的变更不需要这么做。
       选项 immediate：
       选项参数中指定 immediate: true 将立即以表达式的当前值触发回调：
       在带有 immediate 选项时，你不能在第一次回调时取消侦听给定的 property。
       > 全局 API
       > 实例方法
    8. Vue.extend(options)
       使用基础 Vue 构造器 创建一个子类 参数是一个包含组件选项的对象
       data 选项是特例 Vue.extend()中它必须是函数
       其创建的是 Vue 构造器 不是平常写的组件实例
       不可以通过 new Vue({components:testExtend})直接使用
       需要通过 new Profile().$mount('#mount-point')挂载到指定元素上
    9. Vue.nextTick([callback,context])
       - 下次 DOM 更新循环结束后执行延迟回调
       - 在修改数据之后立即使用这个方法 获取更新后的 DOM
    10. Vue.set(target,propertyName/index,value)/Vue.delete(targets,propertyName/index))
        - 设置响应式对象 property/删除响应式对象 property
    11. Vue.forceUpdate
        - 更新组件 触发 beforeUpdate update 生命周期钩子函数
    12. Vue.destory
        - 销毁组件 触发 beforeDestory destory 生命周期钩子函数

    > 实例属性：

    1. vm.$el(element 缩写) 获取 Vue 实例关联的 DOM 元素
       - 提供一个在页面上已存在的 DOM 元素作 Vue 实例股灾目标 可以是 CSS 选择器 HTMLElement 实例
       - 实例挂载后 元素可以用 vm.$el 访问
       - 如在实例化时存在这个选项 实例将立即进入编译过程 否则 需要显式调用 vm.$mount()手动开启编译
       - 提供的元素只能作为挂载点 不同于 Vue1.x 所有的挂载元素会被 Vue 生成的 DOM 替换
    2. vm.$root/vm.$parent/vm.children
       - 当前组件树的根 Vue 实例 没有则是自己/父实例/当前实例的直接子组件
       - 需要注意 $children 并不保证顺序，也不是响应式的。如果你发现自己正在尝试使用 $children 来进行数据绑定，考虑使用一个数组配合 v-for 来生成子组件，并且使用 Array 作为真正的来源。
    3. vm.$options
       - 获取 Vue 实例的自定义属性 如 vm.$options.methods 获取 Vue 自定义属性 methods
    4. vm.$data/vm.$props
       - 获取 Vue 实例的 data 选项(对象)/获取当前组件接收到的 props 对象 Vue 实例代理对其 data/property 对象的访问)
    5. vm.$refs
       - 获取页面中所有含有 ref 属性的 DOM 元素
       - (如 vm.$ref.hello 获取页面中含有属性 ref=‘hello’ 的 DOM 元素 如果有多个元素 那么只返回最后一个)
       - 一个对象，持有注册过 ref attribute 的所有 DOM 元素和组件实例。
    6. vm.$slot
       - 用来访问被插槽分发的内容
       - 每个具名插槽有其相应的 property (例如：v-slot:foo 中的内容将会在 vm.$slots.foo 中被找到)。default property 包括了所有没有被包含在具名插槽中的节点，或 v-slot:default 的内容。
         请注意插槽不是响应性的。如果你需要一个组件可以在被传入的数据发生变化时重渲染，我们建议改变策略，依赖诸如 props 或 data 等响应性实例选项。
    7. vm.$scopeSlots
       - 用来访问作用域插槽 对于包括默认 slot 在内的每个插槽 该对象都包含一个返回相应 VNODE 的函数 可用于使用渲染函数开发一个组件
    8. vm.$isServer
       - 当前 Vue 实例是否运行于服务器
    9. vm.$attrs
       - 包含了父作用域中不作为 prop 被识别 (且获取) 的 attribute 绑定 (class 和 style 除外)。当一个组件没有声明任何 prop 时，这里会包含所有父作用域的绑定 (class 和 style 除外)，并且可以通过 v-bind="$attrs" 传入内部组件——在创建高级别的组件时非常有用。
    10. vm.$listener
        - 包含了父作用域中的 (不含 .native 修饰器的) v-on 事件监听器。它可以通过 v-on="$listeners" 传入内部组件——在创建更高层次的组件时非常有用。

30. Vue SSR(Service Side Render Vue 服务端渲染)

    1. 优点 更好的 SEO/首屏加载更快
    2. 缺点 开发条件限制 只支持 beforeCreate/created 两个钩子函数/服务器负载加重)

    > 服务器端渲染的 Vue.js 应用程序目的：

    - 使 vue 应用既可以在客户端（浏览器）执行，也可以在服务器端执行，我们称之为“同构”或“通用”。

    - Vue.js 是构建客户端应用程序的框架 默认情况下，可以在浏览器中输出 Vue 组件，进行生成 DOM 和操作 DOM。然而，
    - 也可以将同一个组件渲染为服务端的 HTML 字符串，将它们直接发送到浏览器，最后将这些静态标记"激活"为客户端上完全可交互的应用程序。

    > SSR

    - vue 在客户端将标签渲染成的整个 html 片段的工作在服务端完成
    - 服务端形成 html 片段直接返回给客户端

    > 优点：(SEO/首屏加载速度)

    1. 更好的 SEO
       SPA 页面内容通过 Ajax 获取
       搜索引擎爬取工具并不会等待 Ajax 异步完成后再抓取页面内容
       SPA 中抓取不到页面通过 Ajax 获取内容
       SSR 直接由服务端返回已经渲染好的页面
       （数据已经包含在页面中）
       搜索引擎爬取工具可抓取渲染好的页面；
    2. 首屏加载更快
       SPA 会等待所有 Vue 编译后 JS 文件都下载完成后
       才开始进行页面的渲染
       文件下载等需要一定的时间等
       首屏渲染需要一定的时间
       SSR 直接由服务端渲染好页面直接返回显示
       无需等待下载 js 文件再去渲染等
       > 缺点：(开发条件限制/服务器负载加重)
    3. 开发条件限制增多 只支持 beforeCreate/created 两个钩子函数
       SSR 只支持 beforCreate/created 两个钩子函数
       会导致一些外部扩展库需要特殊处理
       才能在服务端渲染应用程序中运行
       且与可以部署在任何静态文件服务器上的完全静态单页面应用程序 SPA 不同
       服务端渲染应用程序
       需要处于 Node.js server 运行环境
    4. 服务器负载加重
       在 Node.js 中渲染完整的应用程序，显然会比仅仅提供静态文件的 server 更加大量占用 CPU 资源 (CPU-intensive - CPU 密集)，因此如果你预料在高流量环境 ( high traffic ) 下使用，请准备相应的服务器负载，并明智地采用缓存策略。

31. ref 访问子组件的实例或者子元素

    - ref 本身作为渲染结果被创建 DOM 未渲染完成之前不允许访问
    - $ref 并非响应式 不能在模版中做数据绑定
    - (this.$refs 是一个对象 持有当前组件中注册过 ref 特性的所有 DOM 元素和子组件实例)
      > 三种用法：

    1. 普通元素 获取 DOM 元素/
    2. 子组件 获取组件实例/
    3. v-for&ref 用于元素/组件 引用信息 包含 DOM 节点/组件实例数组)
       1. 普通元素 this.$ref.name 获取 DOM 元素)
       2. 子组件 this.$ref.name 获取组件实例 可以使用组件所有方法)
       3. v-for&ref 用于元素/组件 引用信息 包含 DOM 节点/组件实例数组)

    - PS: ref 需要在 dom 渲染完成后才会有 使用时确保 dom 已经被渲染完成 初始渲染时 不能访问/不是响应式 不应做数据绑定

      - 如在生命周期 mounted(){}钩子中调用 或者在 this.$nextTick(()=>{})中调用
      - 如果 ref 是循环出来的 有多个重名 那么 ref 的值会是一个数组 此时要拿到单个的 ref 只需要循环就可以
      - ref 属性为元素/子组件赋予一个 ID 引用 元素绑定 ref 后 直接通过 this.$ref 即可调用

      - ref 被用来给元素/子组件注册引用信息
      - 引用信息被注册在父组件$ref 对象上

    1. ref 特性子组件赋予 ID 引用
       <base-input ref="myInput"></<base-input>
       子组件 focus 的方法
       this.$refs.myInput.focus()；
        子组件value的数据
            this.$refs.myInput.value。
    2. ref 特性普通 DOM 元素赋予 ID 引用
    <ul ref="mydiv">
        <li class="item">第一个li</li>
        <li class="item">第一个li</li>
    </ul>
    console.log(this.$refs['mydiv'].getElementsByClassName('item')[0].innerHTML)//第一个li

    3. 普通元素上 this.$ref.xxx dom 元素
    4. 子组件 this.$ref.xxx 组件实例可以使用组件所有方法
    5. v-for 用于元素/组件 引用信息将是包含 DOM 节点/组件实力数组 可循环拿到耽搁 ref

32. 动态组件 is 用法
    - 有些 HTML 元素对于哪些元素出现在其内部是有严格限制的
    - 有些 HTML 元素只能出现在其他某些特定元素的内部 会被作为无效内容提升到外部 并导致最终渲染结果出错
    - HTML 元素某些元素只能出现在它某些特定的内部 自定义组件会作为无效内容提升到外部 并导致最终渲染出错
    ```
    <component :is="componentName"></component>
    <ul>
        <li is="cardList"></li>
    </ul>
    ```
33. keep-alive
    - (actived deactived keep-alive 专属)
    - (抽象组件 本身不会渲染一个 DOM 不会出现在父组件链中)
    - (使用 keep-alive 包裹动态组件 缓存不活动的组件实例 代替销毁)
    - (组件切换 默认销毁 需求 组件切换后 不进行销毁 保留之前状态 keep-alive 实现 被切换到的组件都有自己的名字)
    - 两个属性(字符串或者正则表达式匹配的组件 name)
    - (include 定义缓存白名单即会缓存的组件
    - exclude 定义缓存黑名单即不会缓存的组件)
    - (activted()钩子函数 keep-alive 专属 组件激活时调用 可更新组件
    - deactived()钩子函数 keep-alive 专属 组件被销毁时调用) 1. include 定义缓存白名单，会缓存的组件； 2. exclude 定义缓存黑名单，不会缓存的组件； 3. 以上两个参数可以是逗号分隔字符串、正则表达式或一个数组,include="a,b"、:include="/a|b/"、:include="['a', 'b']" 4. 匹配首先检查组件自身的 name 选项，如果 name 选项不可用，则匹配它的局部注册名称 (父组件 components 选项的键值)。匿名组件不能被匹配； 5. max 最多可以缓存多少组件实例。一旦这个数字达到了，在新实例被创建之前，已缓存组件中最久没有被访问的实例会被销毁掉； 6. 不会在函数式组件中正常工作，因为它们没有缓存实例； 7. 当组件在内被切换，它的 activated 和 deactivated 这两个生命周期钩子函数将会被对应执行。
      > 服务器渲染期间不被调用
    1. activited()生命周期钩子函数
       - keep-alive 专属 组件被激活时调用 可更新组件
    2. deactived()生命周期钩子函数
       - keep-alive 专属 组件被销毁时调用
    - 一般结合路由和动态组件一起使用
34. Vue 中的 key
    - (VDOM DOM diff 新旧 VDOM 对比做辨识用)
    - (使用字符串/数值/布尔/符号等基本数据类型值作 key)
    - (不适用数组 index 作 key)
      > 注意：
    1. 不要使用对象或数组之类的非基本类型值作为 key，请用字符串或数值类型的值；
    2. 不要使用数组的 index 作为 key 值，因为在删除数组某一项，index 也会随之变化，导致 key 变化，渲染会出错。
    ```
    例：在渲染[a,b,c]
    用index 作为 key，
    那么在删除第二项的时候，
    index 就会从 0 1 2 变成 0 1（而不是 0 2)，
    随之第三项的key变成1了，
    会误把第三项删除了。
    ```
    - 作用
    1. v-for 中 使用 key，会提升性能吗
       - 主要看 v-for 渲染的是什么
    2. 可以强制替换元素/组件而不是重复使用它。在以下场景可以使用
       1. 完整地触发组件的生命周期钩子
       2. 触发过渡
       ```
       <transition>
       <span :key="text">{{ text }}</span>
       </transition>
       ```
       - 最常见的用例是结合 v-for：
       ```
       <ul>
            <li v-for="item in items" :key="item.id">...</li>
        </ul>
       ```
35. 修饰符(表单/事件)
    - (修饰符 为更纯粹数据逻辑 Vue 提供很多事件修饰符 代替处理一些 DOM 事件细节 顺序很重要)
      > 事件修饰符
    1. .stop 防止事件冒泡 等同 JS 中 event.stopPropagation)
    2. .prevent 防止执行预设的行为 等于 JS 中的 event.preventDefault)
    3. .once 只触发一次)
    4. 给组件绑定自定义事件无效解决 加上修饰词.native)
       > 表单修饰符
    5. .lazy
    - input 标签 v-model 用 lazy 修饰之后 不会立即监听 input 的 value 的改变 会在 input 失去焦点之后，才会监听 input 的 value 的改变)
      > 修饰符 (modifier)
          是以半角句号 . 指明的特殊后缀，用于指出一个指令应该以特殊方式绑定
          如.prevent 修饰符告诉 v-on 指令对于触发的事件调用 event.preventDefault()
          以半角句号.指明的特殊后缀
          用于指出一个指令应该以特殊方式绑定
          为了更纯粹数据逻辑
          Vue提供很多事件修饰符
          来代替处理一些DOM事件细节
          PS:事件修饰符顺序很重要
    - 为了更纯粹的数据逻辑，vue 提供了很多事件修饰符，来代替处理一些 DOM 事件细节。
      1 .stop：防止事件冒泡，等同于 JavaScript 中的 event.stopPropagation()
      2 .prevent：防止执行预设的行为，等同于 JavaScript 中的 event.preventDefault()
      3 .capture：捕获冒泡
      4 .self：将事件绑定到自身，只有自身才能触发
      5 .once：只触发一次
      6 .passive：不阻止事件的默认行为
      7 .native 在父组件中给子组件绑定一个原生的事件 就将子组件变成了普通的 HTML 标签 不加.native 事件是无法触发的
      事件修饰符(要注意顺序很重要，用@click.prevent.self 会阻止所有的点击，而@click.self.prevent 只会阻止对元素自身的点击。)
      .stop：阻止事件传递；
      .prevent： 阻止默认事件；
      .capture ：在捕获的过程监听，没有 capture 修饰符时都是默认冒泡过程监听；
      .self：当前绑定事件的元素才能触发；
      .once：事件只会触发一次；
      .passive：默认事件会立即触发，不要把.passive 和.prevent 一起使用，因为.prevent 将不起作用。
      表单修饰符
      .number
      .lazy
      input 标签 v-model 用 lazy 修饰之后，并不会立即监听 input 的 value 的改变，
      会在 input 失去焦点之后，才会监听 input 的 value 的改变。
      .trim
      Vue 监听键盘事件
      使用按键修饰符
      <input @keyup.enter="submit">
      按下回车键时候触发 submit 事件。
      .enter
      .tab
      .delete (捕获“删除”和“退格”键)
      .esc
      .space
      .up
      .down
      .left
      .right
36. vue 中的 slot

    1. 单个插槽/默认插槽/匿名插槽
    2. 具名插槽
    3. 作用域插槽 子组件给父组件传参 父组件决定如何展示)

    - 插槽使用在子组件中
      > 目的：将父组件中的子组件模板数据正常显示

    1. 单个插槽|默认插槽|匿名插槽
       - (不用设置 name 属性) 单个插槽可以放置在组件的任意位置 一个组件中只能有一个该类插槽。
    2. 具名插槽 <slot name="up"></slot>
       - 父组件通过 HTML 模版上 slot 属性关联 有 name 属性 可以在一个组件中出现 N 次，出现在不同的位置 父组件通过 html 模板上的 slot 属性关联具名插槽。没有 slot 属性的 html 模板默认关联匿名插槽。
    3. 作用域插槽 | 带数据的插槽 slot-scopes
       - 子组件给父组件传值 父组件决定如何展示

    - 前面两种，都是在组件的 template 里面写
    - 作用域插槽要求，在 slot 上面绑定数据
    - 父组件只需要提供一套样式（在确实用作用域插槽绑定的数据的前提下）。
    - 数据使用的都是子组件插槽自己绑定的那个数组

37. scoped
    - (Vue 通过在 DOM 结构以及 CSS 样式上加上唯一标志 保证唯一 达到样式私有化 不污染全局)
    - (如果一个项目所有 style 标签都加上 scoped 属性 相当于实现了样式的模块化)
    - (在公共组件中使用 修改公共组件样式需要用/deep/)
    - (样式穿透 deep 深度作用选择器 >>>别名
    - 一个选择器能影响子组件 像 SASS 之类预处理器无法正确解析>>> 使用/deep/操作符代替)
38. Vue 中的 template
    (template 模板占位符
    1. 字符串模板写法/
    2. template 标签/
    3. script 标签)
    - template 的作用是模板占位符，可帮助我们包裹元素，但在循环过程当中，template 不会被渲染到页面上
    - template 标签内容天生不可见，设置了 display：none；
    - 要操作 template 标签内部的 dom 必须要用下面的方法–content 属性：
      > 三种写法：(字符串模板/template 标签/script 标签)
    1. 字符串模板写法(直接写在 vue 构造器中)
    - 这种写法比较直观,适用于 html 代码不多的场景,但是如果模板里 html 代码太多,不便于维护,不建议这么写.
    2. 写在 template 标签里,这种写法跟写 html 很像.
    3. 写在 script 标签里,这种写法官方推荐,vue 官方推荐 script 中 type 属性加上"x-template"
39. mixins & extends

    1. mixins

    - 类型 Array<Object>
    - 详细
      - 一种分发 Vue 组件中可复用功能的非常灵活的方式
      - mixins 是一个 JS 对象 它可以包含组件中 script 项中任意功能选项 如 data components methods created computed 等
      - 只要将公用的功能以对象的方式传入 mixins 选项中 当组件使用 mixins 对象时 所有 mixins 对象的选项都将被混入该组件本身的选项中 提高代码重用性 使代码保持干净和易于维护
      - mixins 选项接受一个混合对象的数组 这些混合实例对象可以像正常的实例对象一样包含选项 它们将在 Vue.extends()最终选择使用相同的选项合并逻辑
      - 如果混合包含一个钩子 而创建组件本身也有一个 两个函数将被调用
      - Mixin 钩子按照传入顺序依次调用 并在调用组件自身的钩子之前被调用
    - 什么时候使用 mixins
      - 存在多个组件中的数据或功能相近时 可以利用 mixins 将公共部分提取出来 通过 mixins 封装的函数 组件调用它们不会改变函数作用域外
    - 创建 mixins
      - src 目录下创建一个 mixins 文件夹 文件夹下新建一个 mixins.js
    - 如何使用 Mixins
      - 在需要调用的组件中引入 mixins.js 文件 在 export default 中引入需要的对象
    - mixins 特点
      1. 方法和参数在各组件中不共享 虽然组件调用了 mixins 并将其属性合并到自身组件中 但该属性只会被当前组件识别并不会被共享 其他组件无法从当前组件中获取到 mixins 中的数据和方法
      2. 引入 mixins 后组件会对其进行合并 将 mixins 中的数据和方法拓展到当前组件中来 在合并的过程中会出现冲突
    - mixins 合并冲突
      1. 值为对象(components methods computed data)的选项 混入组件时选项会被合并 键冲突时优先组件 组件中的键会覆盖混入对象的
      2. 值为函数(created mounted)的选项 混入组件时 选项会被合并调用 混合对象里的钩子函数在组件里的狗子函数之前调用
    - 与 Vuex 区别
      1. Vuex: 用来做状态管理 里面定义的变量在每个组件中均可以使用和修改 在任一组件中修改此变量的值之后 其他组件中此变量的值也会随之改变
      2. Mixins: 可以定义共用的变量 在每个组件中使用 引入组件中之后 各个变量是相互独立的 值的修改在组件中不会相互影响
    - 与公共组件的区别
      1. 组件：在父组件中引入组件 相当于在父组件中给出一片独立的空间供子组件使用 然后根据 props 来传值 但本质上两者是相对独立的
      2. Mixins: 在引入组件之后与组件中的对象和方法进行合并 相当于扩展了父组件的对象和方法 可以理解为形成了一个新的组件

    2. extends

    - 类型 Object|Funtion
    - 两个都可以理解为继承 mixins 接收对象数组(可理解为多继承) extends 接收的是对象或函数(可理解为单继承)

    3. 结论
       - 继承钩子函数
       1. 优先调用 mixins 和 etends 继承的父类 extends 触发的优先级更改
       2. push(extend,mixin1,mixin2,本身的钩子函数)
       3. 经过测试 watch 的值继承规则一样
       - 继承 methods
       1. 子类再次声明 data 中的变量都会被重写 以子类的为准
       2. 如果子类不声明 data 中的变量将会最后继承的父类为准
       3. 经过测试 props 中属性 methods 中的方法和 computed 的值继承规则一样
    4. 关于 mixins 和 extends 可以理解为 mvc 的 c(controller)这一层 可见通用的成员方法(包括属性和方法)抽象成为一个父类 提供给子类继承 这可以让子类拥有一些通用成员变量 而子类也可以重写父类的成员变量 这样整个编程思想就很面向对象

    5. 全局混入 1.在 main.js 中写入
       import Vue from 'vue';
       import mixins from './mixins';
       Vue.mixin(mixins);
       全局混入可以写在 mixins 文件夹中 index.js 中，全局混入会影响到每一个之后创建的 Vue 实例（组件）；
    6. 局部混入 1.局部混入的注册，在 mixins 文件中创建一个 a_mixin.js 文件，然后再 a.vue 文件中写入
       <script>
       import aMixin from 'mixins/a_mixin'
       export default{
       mixins:[aMixin],
       }
       </script> 2.局部混入只会影响 a.vue 文件中创建的 Vue 实例，不会影响到其子组件创建的 Vue 实例；
    7. 组件的选项和混入的选项合并
       1. 数据对象【data 选项】，在内部进行递归合并，并在发生冲突时以组件数据优先；
       2. 同名钩子函数将合并为一个数组，因此都将被调用。另外，混入对象的钩子将在组件自身钩子之前调用；
       3. watch 对象合并时，相同的 key 合成一个对象，且混入监听在组件监听之前调用；
       4. 值为对象的选项【filters 选项、computed 选项、methods 选项、components 选项、directives 选项】将被合并为同一个对象。两个对象键名冲突时，取组件对象的键值对。

    - Vue 中的模板语法
      1. Vue.js 使用了基于 HTML 的模板语法 允许开发者声明式的将 DOM 绑定至底层 Vue 实例的数据 所有 Vue.js 的模板都是合法的 HTML 所以能被遵循规范的浏览器和 HTML 解析器解析
      2. 在底层的实现上 Vue 将模板编译成虚拟 DOM render 渲染函数 结合响应系统 Vue 能智能计算出最少需要重新渲染多少组件 并把 DOM 操作次数减到最少
      3. 熟悉 VDOM 并偏爱 JS 原生 可以不用模板 直接写 render 渲染函数 使用可选的 JSX 语法
    - Vue 中 template 编译的理解
      先转化成 AST 树 将得到的 render 函数返回 VNode(Vue 的虚拟 DOM 节点)
      1. 首先通过 compile 编译器把 template 编译成 AST 语法树
         (abstract syntax tree 源代码的抽象语法结构的树状表现形式)
         complie 是 createCompiler 的返回值 createCompiler 是用以创建编译器的 另外 compiler 还负责合并 option
      2. AST 经过 generate(将 AST 语法树转化成 render function 字符串的过程)得到 render 函数 render 的返回值是 VNode VNode 是 Vue 的虚拟 DOM 节点 里面有(标签名/子节点/文本等)

40. Vue 过滤器
    (用途 1.双花括号插值
    2.v-bind 表达式)
    (过滤 一个数据经过过滤之后出来另一样东西
    可以是符合条件的 可以是给该数据添加装饰的)
    (全局注册/局部注册)
    Vue.js 允许你自定义过滤器，可被用于一些常见的文本格式化。
    过滤器可以用在两个地方：双花括号插值和 v-bind 表达式 (后者从 2.1.0+ 开始支持)
    过滤器应该被添加在 JavaScript 表达式的尾部，由“管道”符号指示： 1.一个插值可以连续使用两个过滤器吗?
    可以，{{ message | filterA | filterB }} 2.过滤器除了在插值上使用，还可以用在那个地方？
    还可以 v-bind 表达式 上，如：<div :id="rawId | formatId"></div>
    Vue 中怎么自定义过滤器(同样接受全局注册和局部注册)
    可以用全局方法 Vue.filter() 注册一个自定义过滤器，它接收两个参数：过滤器 ID 和过滤器函数。过滤器函数以值为参数，返回转换后的值
    Vue.filter('reverse', function (value) {
    return value.split('').reverse().join('')
    })
    <!-- 'abc' => 'cba' -->
    <span v-text="message | reverse"></span>
    过滤器也同样接受全局注册和局部注册
41. Vue 如何自定义指令
    Vue 提供默认内置指令外
    允许开发人员根据实际情况自定义指令
    作用价值在于当开发人员在某些场景下
    需要对普通 DOM 元素进行操作的时候 1.注册自定义指令
    Vue 自定义指令和组件一样存在
    全局注册
    Vue.directive(id,[definition])
    id:自定义指令名称
    指令名称不需要加 v-前缀
    默认自动加上前缀
    使用指令时一定要加上前缀
    [definition]
    对象数据/指令函数
    局部注册
    Vue 实例中添加 directives 对象数据
    钩子函数
    一个指令定义对象可以提供如下几个钩子函数
    (均为可选)
    bind:
    只调用一次 指令第一次绑定到元素时调用 这里可以进行一次性的初始化设置
    inserted:
    被绑定元素插入父节点时调用
    (仅保证父节点存在 但不一定被插入文档中)
    update:
    所在组件的 VNode 更新时调用
    componentUpdated:
    指令所在组件的 VNode 及其子 VNode 全部更新后调用
    unbind:
    只调用一次 指令与元素解绑时调用
    指令钩子函数的参数：
    el：
    指令所绑定的元素 可以用来直接操作 DOM 即放置指令的那个元素
    binding:
    一个对象 里面包含了几个属性
    vnode：
    Vue 编译生成的虚拟结点
    oldVnode：
    上一个虚拟结点
    仅在 update 和 componentUpdate 钩子中可用
42. 动态绑定 Class 和 Style(对象语法/数组语法/对象和数组混合/对象和计算属性)
    将 test、active、active-click 三个 className,绑到 div 上，渲染成<div class="test active active-click"></div>其中 test 是固定的，active 受 data 中 actived 控制，active-click 受 data 中 actived 和 clicked 控制，请用 4 种写法实现。
    4 种方法
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
    ```
    4. 对象和计算属性(推荐)
43. > Vue 强制刷新组件

    1. this.$forceUpdate()。
    2. 组件上加上 key，然后变化 key 的值。

    > Vue 渲染模板保留模板中的 HTML 注释

    - 组件中将 comments 选项设置为 true
      <template comments> ... <template>

    > Vue 中重置 data

    - Object.assign(this.$data,this.$options.data())

44. 模版语法
    - 开发者声明式将 DOM 绑定到底层 Vue 实例的数据
    - Vue 将模版编译成虚拟 DOM 渲染函数
45. Vue 项目优化
    1. 代码层面的优化
       1. v-if 和 v-show 区分使用场景
       2. computed 和 watch 区分使用场景
       3. v-for 遍历必须为 item 添加 key，且避免同时使用
       4. v-if
       5. 长列表性能优化事件的销毁图片
       6. 资源懒加载
       7. 路由懒加载
       8. 第三方插件的按需引入
       9. 优化无限列表性能服务端渲染 SSR or 预渲染
    2. Webpack 层面的优化
       1. Webpack 对图片进行压缩减少
       2. ES6 转为 ES5 的冗余代码提取公共代码模板预编译提取组件的
       3. CSS 优化 SourceMap 构建结果输出分析 Vue 项目的编译优化
    3. 基础的 Web 技术的优化 开启 gzip 压缩 浏览器缓存 CDN 的使用 使用 Chrome Performance 查找性能瓶颈
46. Vue 数组中对象删除属性 delete 和 Vue.delete 删除数组区别
    1. delete 只是被删除的元素变成了 empty/undefined 其他的元素的键值还是不变。
    ```
    delete this.a[1]
    this.$set(this.a)
    ```
    2. Vue.delete 直接删除了数组 改变了数组的键值。
    ```
    this.$delete(this.b, 1)
    ```
47. vue-admin-template&Element UI
    > vue-admin-template:
    - 一个极简的 vue admin 管理后台 只包含 Element UI &axios &iconfont&permission control &init 这些搭建后台必要的东西
      目前版本 v4.0+ 基于 Vue-Cli 构建
      > Element UI:
    - 基于 Vue2.0 的组件库
48. Vue 优点
    1. 轻量级框架：只关注视图层，是一个构建数据的视图集合，大小只有几十 kb；
    2. 简单易学：国人开发，中文文档，不存在语言障碍 ，易于理解和学习；
    3. 双向数据绑定：保留了 angular 的特点，在数据操作方面更为简单；组件化：保留了 react 的优点，实现了 html 的封装和重用，在构建单页面应用方面有着独特的优势；
    4. 视图，数据，结构分离：使数据的更改更为简单，不需要进行逻辑代码的修改，只需要操作数据就能完成相关操作；
    5. 虚拟 DOM：dom 操作是非常耗费性能的，不再使用原生的 dom 操作节点，极大解放 dom 操作，但具体操作的还是 dom 不过是换了另一种方式；
    6. 运行速度更快:相比较与 react 而言，同样是操作虚拟 dom，就性能而言，vue 存在很大的优势。
49. Vue-Cli 配置功能
    1. ES6 代码转换成 ES5 代码
    2. scss/sass/less/stylus 转 css
    3. .vue 文件转换成 js 文件
    4. 使用 jpg、png，font 等资源文件
    5. 自动添加 css 各浏览器产商的前缀
    6. 代码热更新
    7. 资源预加载
    8. 每次构建代码清除之前生成的代码
    9. 定义环境变量
    10. 区分开发环境打包跟生产环境打包

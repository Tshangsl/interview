1. react&vue
    1. 监听数据变化实现原理
        - vue通过getter/setter以及一些函数的劫持，能精确知道数据变化，不需要特别的优化就能达到比较好的性能
        - react默认通过比较引用的方式进行，如果不优化(purecomponent/shouldcomponentupdate)可能导致大量不必要的vdom的重新渲染
        > react不精确监听数据变化，是因为vue和react设计理念区别，vue使用可变数据，react更强调数据的不可变性，vue更加简单，react构建大型应用时更加鲁棒
    2. 数据流
        - vue1.0 parent <-props> child <-v-model> dom
            > vue1.0可以实现两种双向绑定
            1. 父子组件之间，props可以双向绑定
            2. 组件和dom之间可以通过v-model双向绑定 
        - vue2.x parent -props> child <-v-model-> dom
            > vue2.0可以实现一种双向绑定
            1. 父子组件之间不能双向绑定(但提供了一个语法糖自动帮助通过事件的方式修改)vue2.0不支持组件对自己的props进行任何修改
        - react parent-props> child -state> dom
            > react诞生之初就不支持双向绑定，react一直提倡单向数据流，称之为onchange/setstate()模式
            > 由于一般都会用vuex以及redux等单项数据流状态管理框架，很多时候感受不到这一点的区别
    3. hoc和mixins
        - vue中组合不同功能的方式是通过mixin
            > vue为何不使用hoc
            1. 高阶组件本质就是高阶函数，react的组件是一个纯粹的函数，所以高阶函数对react来说非常简单
            2. vue中的组件是一个被包装的函数，并不简单就是我们定义组件时传入的对象或函数，如定义的模版如何被编译，声明的props如何接收到，这些是vue创建组件实力时隐式做的事
            3. 文章 vue中如何实现高阶组件 探索Vue高阶组件
        - react中通过hoc实现组合不同的功能
            > react为何不使用mixin Mixins Considered Harmful
    4. 组件通信
        - vue中有三种方式可以实现组件通信
            1. 父组件通过props向子组件传递数据或回调，虽然可以传递回调，但一般只传递数据，而通过时间的机制处理子组件向父组件的通信
            2. 子组件通过时间向父组件发送消息
            3. 通过v2.2.0新增的provide/inject实现父组件向子组件注入数据，可以跨越多个层级
        - react中有对应的三种方式
            1. 父组件通过props向子组件传递数据或回调
            2. 通过context进行跨层级的通信，和provide/inject起到的作用差不多
        > react本身不支持自定义事件 react中都是使用回调函数
        > vue子组件向父组件传递消息有两种方式：事件和回调函数 vue中更倾向于使用事件
    5. 模版渲染方式
        - 表层上模版语法不同
            1. react通过jsx渲染模版 只是表面现象 react并不必须依赖jsx
            2. vue通过一种拓展的html语法进行渲染
        - 深层上模版原理不同 
            1. react是在组件js代码中，通过原生js实现模版中的常见语法，如插值，条件，循环等，都是通过js语法实现的
            > react好处 
            > react中render函数是支持闭包特性的，所以import的组件在render中可以直接调用
            2. vue是在和组件js代码分离的单独的模版中，通过指令来实现的，比如条件语句就需要v-if实现
            > vue中由于模版中使用的数据都必须挂在this上进行一次中转，所以import一个组件后需要在comoponents中再声明
    6. vuex和redux
        - 表面上 store注入和使用方式有区别
        - vuex中 $store被直接注入到组件实例中 因此可以比较灵活的使用
            - 使用dispatch和commit提交更新
            - 通过mapstate或直接通过this.$store读取数据
            - vuex更灵活 组件中既可以dispatch action 也可以commit updates
        - redux中 每一个组件都需要显式地用connect把需要的props和dispatch连接起来
            - redux中只能进行dispatch 并不能直接调用reducer进行修改
        
        - 实现原理上 最大的区别有两点
            1. redux使用不可变数据，vuex数据是可变的，redux每次都是用新的state替换旧的state，而vuex是直接修改
            2. redux在检测数据变化时，是通过difff的方式比较差异的，而vuex和vue原理一样，是通过getter/seter来比较的(其内部直接创建一个vue实例用来跟踪数据变化)
2. 受控组件和非受控组件
    > 受控组件
    - 维持自身状态 根据用户操作更新 由React渲染并控制用户操作后所发生的变化的组件 称为受控组件
    - 每个受控组件都有相对应的处理函数 受控组件用户输入时可根据用户的操作进行判定 能有效控制用户操作的可行性
    - 优点 组件的状态和内容能准确掌握在自己手中 可以在源头上杜绝一些奇怪的操作 如限制输入框智能输入数字

    > 非受控组件
    - 与受控组件相应 组件自己不维护用户的操作 所有的处理交由DOM自行处理 在获取值时可以使用ref操作获取或通过原生JS方法获取
    - 优点 非受控组件中真实数据保存在DOM中 因此在使用时 可更方便集成React和非React代码 且非受控组件能更好的减少代码量

    > react中 所谓受控组件和非受控组件是针对表单而言的
    - 表单受控组件
        - 表单元素依赖于状态，表单元素需要默认值实时映射到状态时，就是受控组件，这个和双向绑定相似
        - 受控组件，表单元素的修改会实时映射到状态值上，此时可以对输入的内容进行校验
        - 受控组件只有继承react.component才会有状态
        - 受控组件必须要在表单上使用onchange事件来绑定对应的事件
        ```
            class control extends react.component{
                <!-- 这样的写法也是声明在实例上的对象 -->
                state = {
                    username:'zf',
                    pwd:'123'
                }
                <!-- e为原生的事件绑定对象 -->
                handlechange = (e) =>{
                    <!-- 获取原生对象上的属性 -->
                    let name = e.target.name;
                    <!-- 根据表单元素的name名称进行匹配 -->
                    this.setState({
                        [name]:e.target.value
                    })
                }
                render(){
                    return(
                        <div>
                            <p>{this.state.username}</p>
                            用户名：<input
                                name="username"
                                type="text"
                                value={this.state.username}
                                onChange={this.handleChange}
                            />
                            <br/>
                            <p>{this.state.pwd}</p>
                            密码：<input
                                name="pwd"
                                type="text"
                                value={this.state.pwd}
                                onChange={
                                    this.handlechange
                                }
                            />
                        </div>
                    )
                }
            }
        ```
    > 受控组件中如果没有给输入框绑定onchange事件 将会收到react的警告
    > 且此时输入框除了默认值，无法输入任何其他参数
    - 非受控组件
        - 非受控组件即不受状态的控制，获取数据就是相当于操作dom
        - 优点在于容易和第三方组件结合
        
        - 获取输入框中值的两种方法
        > ref功能是一样的 只是写法不一样 可以让我们操作dom
        1. 函数
            - 在虚拟dom节点上使用ref 并使用函数 将函数的参数挂载到实例的属性上
            ```
            handleSubmit = (e) = >{
                <!-- 阻止原声默认事件的触发 -->
                e.prevenDefault()
            }
            render(){
                return(
                    <form onSumit = {this.handlesubmit}>
                        <!-- 将真实的dom username是输入框输入的值赋值给组件实例上 这样页面表单提交时 可以通过this.username.value 获取到输入框输入的值-->
                        用户名<input
                            name="username"
                            type="text"
                            ref = {username=>this.username=username}
                        />
                    </form>
                )
            }
            ```
        2. 通过构造函数声明的方式
        > react16.3新语法
        > 实例的构造函数constructor创建一个引用
        > 在虚拟dom节点上声明一个ref属性 并将创建好的引用赋值给这个ref属性
        > react会自动将输入框中输入的值放在实例的second属性上
        ```
        constructor(){
            super();
            <!-- 在构建函数中创建一个引用 -->
            this.second = react.createref()
        }
        handlesubmit = (e)=>{
            <!-- 阻止原生默认事件的触发 -->
            e.preventdefault();
        }
        render(){
            return(
                <form onsubmit={this.handlesubmit}>
                <!-- 自动将输入框中输入的值放在实例的second属性上 -->
                密码<input
                    name="password"
                    type="text"
                    ref={this.second}
                >
                </form>
            )
        }
        ```
        - 受状态控制的组件 必须要有onchange方法 否则不能使用 受控组件可以默认赋予默认值(官方推荐使用受控组件)实现双向数据绑定
        - 非受控 不需要设置它的state属性 通过ref来操作真实的DOM
3. react高阶组件hoc
    > 高阶组件不是组件 是增强函数 可以输入一个元组件 返回一个新的增强组件
    1. 属性代理(Props Proxy) 提取公共的数据和方法到父组件，子组件只负责渲染数据，相当于设计模式中的模版模式，这样组件的重用性更高
    ```
    function proxyHoc(WrappedComponent){
        return class extends React.Component{
            render(){
                const newProps = {
                    count: 1
                }
                return <WrappedComponent {...this.props}{...newProps}>
            }
        }
    }
    ```
    2. 反向继承
    ```
    const MyContainer = (WrappedComponent)=>{
        return class extends WrappedComponent{
            render(){
                return super.render()
            }
        }
    }
    ```
    - 作用 
        实现代码复用和逻辑抽象 对state和props进行抽象和操作 对组件进行细化(如添加生命周期)实现渲染劫持
    > 由于高阶组件的实用性 它被频繁用于大量reactjs相关的第三方库，如react-redux(用于管理react应用的状态) react-loadable用于加载带有动态导入的组建的高阶组件所使用
    - 基本概念 
        高阶组件hoc higher-order components不是组件而是一个函数 它会接收一个组件作为参数并返回一个经过改造的新组件
    ```
    const enhancedComponent = higherOrderComponent(WrappedComponent);
    ```
    > 组件是将props转换成ui 而高阶组件是将组建转换为另一个组件
    > 高阶组件是react中用于复用组件逻辑的一种高级技巧
    - 高阶组件能解决的问题
        - 抽取重复代码 实现组件复用 常见场景：页面复用
        - 条件渲染控制组件的渲染逻辑(渲染劫持) 常见场景：权限控制
        - 捕获/劫持被处理组件的生命周期 常见场景：组件渲染性能追踪日志打点
    - 高阶组件实现
        1. 属性代理
            - 返回一个无状态的函数组件
            - 返回一个class组件
        2. 反向继承
    - 属性代理
        - 最常见的实现方式 本质上是使用组合的方式 通过将组件包装在容器组件中实现
        - 属性代理方式实现的高阶组件和原组件的生命周期关系完全是react父子组件的生命周期关系，所以该方式实现的高阶组件会影响原组件某些生命周期等方法
        > 操作props
        > 最简单的属性代理实现代码如下
        ```
        <!-- 返回一个无状态的函数组件 -->
        function HOC(Wrappedcomponent){
            const newProps = {type:'HOC'}；
            return props=><Wrappedcomponent {...this.props} {...newProps}>
        }
        <!-- 返回一个有状态的class组件 -->
        function HOC(Wrappedcomponent){
            return class extends React.Component{
                render(){
                    const newprops = {type:‘hoc'};
                    return <Wrappedcomponent {...this.props {...newprops}}>
                }
            }
        }
        ```
        > 通过属性代理方式实现的高阶组件包装后的组件可以拦截到父组件传递过来的props 提前对props进行一些操作 比如增加一个type属性

        > 抽象state
        - 通过属性代理方式实现的高阶组件无法直接操作原组件的state 但是可以通过props和回调函数对state进行抽象
        > 常见的例子是实现非受控组件到受控组件的转变
        ```
        func loading
        ```

        > 获取refs引用
        - 为访问dom element(focus事件 动画 使用第三方dom操作库)有时我们会用到组件的ref属性
        - ref属性只能声明在class类型的组件上 而无法声明在函数类型的组件上 因为无状态组件没有实例
        - 通过属性代理方式实现的高阶组件无法直接获取原组件的ref引用 但可以通过在原组件的ref回调函数中调用伏组件传入的ref回调函数来获取元组建的refs引用
        
        > 获取原组件的static方法
        > 通过props实现条件渲染
        > 用其他元素包裹传入的组件
        > 反向继承
        > 劫持原组件生命周期方法
        > 读取/操作原组件的state
        > 渲染劫持
    > 具体实践
        > 页面复用
        > 权限控制
        > 组件渲染性能追踪
4. 依赖注入di 
    > 依赖注入 控制反转 依赖注入是控制反转的一种实现方式 另一种方式叫依赖查找

    > 在控制不反转的情况下 某个类如果依赖另一个类 它会自己来创建依赖
    ```
    class Person{
        eat(){
            const dinner = new Dinner('')
        }
    }
    class Dinner{
        constructor(name){
            this.name = name;
        }
    }
    ```
    > 控制不反转需要自己做 要自己new Dinner

    > 控制反转就不用自己动手

    ```
    class Person{
        eat(dinner){
            console.log(dinner.name);
        }
    }
    ```
    > React中的依赖注入
    - React除了可以在浏览器运行(ReactDOM)也可以制作App在手机端运行(ReactNative) 而两者有大量代码可以共享 这就是依赖注入的使用场景
    > 主要目的 解耦 根据实际的上下文传入不同的依赖对象 优雅的实现代码的抽象和复用
5. jsx Javascript&xml
    > JSX是什么

    > 是React提供的Syntax Sugar 可以在JS中写H5标记语言
    > 表现
    1. 常规的H5标签都可写 可以通过{props}往HTML中注入变量或任意有效的JS表达式 而无需加上$
    2. 可以插入带参数的函数{func(props)}
    ```
    <h1> {getName(props)} </h1>
    ```
    3. JSX被编译后 是一个函数调用 返回值为JS对象 所以JSX也可作为表达式 如if判断
    4. 可以在标签中添加属性 属性值若是字符串 则加上引号 若是对象或表达式 则加上{} "" {} 不能混用 由于JSX更贴近JS 所以属性的key值建议使用驼峰式写法
    ```
    const element = <div tabIndex="0"></div>
    const element = <img src={user.name}></img>
    ```
    5. JSX元素没有子元素/节点 可以单闭合
    6. 可以给HTML添加类 但是class需改写成className 若添加自定义的要渲染的属性 最好以data-开头
    7. jsx支持换行

    - JSX将XML加入到JS中 在JS中写了JSX会被预处理为React Element

    > 它把XML当作变量的值赋给JS变量 JSX是一个JS的语法扩展 但是它具有JS的全部功能
    > React项目中书写JSX
    ```
    const App = <div> test </div>
    ```
    - React通过虚拟DOM渲染页面 babel将JSX语法编译成React.createElement()的形式
    - 不执行App时 它就是一个普通的函数 应该称它为函数数组 -Component 执行完后的返回结果 是虚拟DOM 可以称它为React元素 ReactElement
    - 这个ReactElement对象实例 本质上是以JS对象形式存在的对DOM的描述 即虚拟DOM

    > 写JSX实际做了什么
    - 在普通的JS文件中需引入react reactDOM(若要对DOM进行操作) 以及babel
    - JSX其实是一个对象 这个对象内的值都被进行了转义
    - React将JSX代码分成几块 类型(元素名) 属性值props(包括children和属性参数) key和ref owner和store
    - 没有被{}包住的默认是字符串 会进行转义 {}包住的会被当作表达式 不被转义

    > 关于JSX防范XSS攻击
    1. 尝试通过{html}进行插入html代码时 React会自动将HTML转为字符串 所以React可部分防止XSS攻击
    2. JSX通过传入参数作为事件处理方式 而不是传入字符串 字符串可能包含恶意代码

    > JSX中的{}
    > {}能帮助更好描述一个JSX tag的属性和children
    - 属性
    - 一个JSX tag也能像xml/html标签元素一样拥有很多属性
    ```
    let jsx = <img src="">
    ```
    - 这个属性值可以是一个固定的字符串 也可以是一个动态的JS变量 但是这个JS变量必须利用{}包裹起来(Vue中)
6. refs&dom
    > react通过声明式的渲染机制把复杂的dom操作抽象成为简单的state和props操作
    > 提供ref用来访问在render方法中创建的dom元素或者是react组件实例
    > ref的三驾马车
    - react16.3之前 ref痛殴字符串(string ref)或者回调函数(callback ref)的形式获取 在v16.3中 引入了新的react.createRef api
    > string ref
    ```
    class Mycomponent extends react.component{
        componentDidMount(){
            this.refs.myRef.focus();
        }
        render(){
            return <input ref="myRef">
        }
    }
    ```
    > callback ref
    ```
    class mycomponent extends react.component{
        componentdidmount(){
            this.myref.focus();
        }
        render(){
            return <input ref={(ele)=>{
                this.myref = ele;
            }}>
        }
    }
    ```
    > react.createref
    ```
    class mycomponent extends react.component{
        constructor(props){
            super(props);
            this.myref = react.createref();
        }
        componentdidmount(){
            this.myref.current.focus();
        }
        render(){
            return <input ref={this.myref}>
        }
    }
    ```
    > string ref缺点
    1. 当 ref 定义为 string 时，需要 React 追踪当前正在渲染的组件，在 reconciliation 阶段，React Element 创建和更新的过程中，ref 会被封装为一个闭包函数，等待 commit 阶段被执行，这会对 React 的性能产生一些影响。
    2. 当使用 render callback 模式时，使用 string ref 会造成 ref 挂载位置产生歧义。
    3. string ref 无法被组合，例如一个第三方库的父组件已经给子组件传递了 ref，那么我们就无法再在子组件上添加 ref 了，而 callback ref 可完美解决此问题。
    4. 在根组件上使用无法生效。
    5. 对于静态类型较不友好，当使用 string ref 时，必须显式声明 refs 的类型，无法完成自动推导。
    6. 编译器无法将 string ref 与其 refs 上对应的属性进行混淆，而使用 callback ref，可被混淆。
    >createref
    采用了 object ref
    >callback ref
    - 采用了组件render过程中在闭包函数中分配ref的模式
    loading
7. react数据流
    > react核心思想是ui=render(data) data数据 render是react提供的纯函数
    > 用户界面的展示取决于数据层

    - 状态
    react利用可复用的组件构建洁面，组件本质上是一个有限状态机，它能记住当前所处的状态，并根据不同的状态变化做出相应的操作，在react中把这种状态定义为state，用来描述该组件对应的当前交互界面
    > react通过管理状态来实现对组建的管理 当state发生变更时 react会自动执行相关的操作：绘制页面
    > 接下来提到的状态是针对react component这种有限状态机
    - 数据
    不光是指server层返回给前端的数据 react中的状态也是一种数据 当我们改变数据时 就要通过改变状态去引发界面的变更
    > ui = render(data)
    > react的状态管理其实和数据流管理一样 包括会借助第三方库来帮助react管理状态
    > react自身管理数据流
    - react是自上而下的单向组件数据流 容器组件&展示组件（傻瓜组件&聪明组件）是最常用的react组件设计方案 容器组件负责处理复杂的业务逻辑以及数据 展示组件负责处理ui层 通常会将展示组件抽出来进行服用或者组件库的封装 容器组件自身通过state管理状态 setstate更新状态 从而更新ui 通过props将自身的state传递给展示组件实现通信
    > 如何实现跨组件通信 状态同步以及状态共享
    - react v16.3之前 通过状态提升至最近的共同父组件实现(虽然有官方提供的contextAPI)但是旧版本存在一个问题：看似跨组件 实则还是逐级传递 如果中间组件使用shouldcomponentupdate检测当前state和props没有变化 return false 则context就无法透传 因此context没有被官方推荐使用
    - react v16.3版本以后 新版本context解决了之前的问题 可以轻松实现 但依然存在一个问题 context是将底部子组件的状态控制交给到顶级组件 但是顶级组件状态更新时一定会触发所有子组件的re-render也会带来损耗
    > 如何避免组件臃肿
    > 如何让状态变得可预知 可回溯
    > 如何处理异步数据流
    - react自身并未提供多种处理异步数据流管理方案 仅仅用一个setstate很难满足一些复杂的异步流场景

    > redux提供了那些
    1. store 提供一个全局的store变量 用来存储希望从组件内部抽离出去的那些公用的状态
    2. action 提供了一个普通对象 用来记录每一次状态变更 可日志打印与调试回溯 并且这是唯一的途径
    3. reducer 提供了一个纯函数 用来计算状态的变更

    > redux核心竞争力
    1. 状态持久化：globalstore可以保证组件即使销毁也以来保留之前状态
    2. 状态可回溯： 每个action都会被序列化 reducer不会修改原有状态 总是返回新状态 方便做状态回溯
    3. functional programming:使用纯函数 输出完全依赖输入 没有任何副作用
    4. 中间件 针对异步数据流 提供了类express中间件的模式 社区中一批优秀的第三方插件 能够更精细地控制数据流动 对复杂的业务场景起到缓冲作用

    > redux缺点
    1. 繁重的代码模版：修改一个state可能要动四五个文件
    2. store中状态残留：多组件共用store里某个状态时要注意初始化清空问题
    3. 无脑的发布订阅： 每次dispatch一个action都会遍历所有的reducer 重新计算connnect 这会是一种损耗
    4. 交互频繁时会卡顿：如果store较大且频繁修改store 会明显看到页面卡顿
    5. 不支持ts

    > mobx
    > 优点
    1. redux不允许直接修改state，而mobx可随意修改
    2. redux修改状态必须走一套指定的流程比较麻烦，mobx可在任何地方直接修改(非严格模式下)
    3. redux模版代码文件多，而mobx非常简洁，就一个文件
    4. redux只有一个store，state or store 难以取舍，mobx多store 可以把所有的state都放入store中 完全交给mobx管理 减少顾虑
    5. redux需要对监听的组件做scu优化，减少重复render，而mobx都是smartcomponent 不需要手动做scu

    > 原理
    1. 利用了es6的proxy追踪属性(旧版本使用object.defineproperty实现)通过隐式订阅 自动追踪被监听的对象变化 然后触发组件的ui更新

    > 区别
    - redux把要做的事情都交给用户 保证自己的纯净 mobx把最简易的操作给了用户 其他交给mobx内部实现 用户不必关心该过程 mode和view完全分离 完全可以讲业务逻辑写在action里 用户只需操作observeabledata
    - observalbeview会自动做出响应 此即为mobx主打的响应式设计 但编程风格仍然是传统的面向对象的oo范式(vue即利用数据劫持实现双向绑定 react+mobx就是一个复杂点的vue vue3版本的一个重大改变就是将代理交给了proxy)

    > 优点
    1. 代码量少
    2. 基于数据劫持实现精准定位(真正意义上的局部更新)
    3. 多store抽离业务逻辑(model view分离)
    4. 响应式性能良好(频繁的交互依然可以胜任)
    5. 完全可以替代react自身的状态管理
    6. 支持ts

    > 缺点
    1. 没有状态回溯能力：mobx直接修改对象引用 很难去做状态回溯
    2. 没有中间件：和redux一样 mobx也没有很好的方法处理异步数据流 没办法更精细地控制数据流动(redux虽然自己不做 但它提供了applymiddleware)
    3. store太多： 随store数量增多 维护成本也会增加 且多store之间的数据共享以及相互饮用也会出错
    4. 副作用：mobx直接修改数据 和函数式编程模式强调的纯函数相反 这导致了数据的很多未知性

    > 主流数据流管理分为两大派
    1. 以redux为首的函数式库
    2. 以mobx为首的响应式库
    3. redux和mobx有一个共同的短板 即在处理异步数据流时 没有一个较好的解决方案

    > 处理异步数据流 rxjs

> 前端框架历史
1. 传统命令式编程的代表jquery 过去绘制一个页面 会用jquery提供的一套api 然后手动操作dom进行绘制 精准 完全手动操作 且改动时性能损耗较大 开发者注意力集中在如何绘制
2. 响应式编程的react 开发者不关心界面如何绘制 只要告诉react 希望页面 剩下的交给react react会自动帮助绘制界面 ui = render(data) 只要操作data即可 页面ui会自动做出响应 且一切操作都是基于内存之中 不会有较大的性能损耗 这就是react响应式编程的精髓 也是为何它叫react

> rxjs实现响应式
> 两种强大的设计模式 观察者模式和迭代器模式

1. 观察者模式
- 观察者模式中 有两个重要角色 observable和observer 就是可观察对象和观察者 

1. 可观察对象(observable)是事件发布者 负责产生事件
2. 观察者(observer)是事件响应者 负责对发布的时间做出响应
3. 通过订阅的形式，也就是subscribe方法连接一个发布者和响应者(蕾丝 redux的store.subscribe) 在订阅之前 两者毫无关系 无论observer发出多少时间 observer也不会做出任何响应 订阅关系中断时也不会

2. 迭代器模式
> 拉取pull 推送push
- 拉取和推送是两种不同的协议 用来描述生产者producer如何和消费者consumer进行通信
> 拉取
- 拉取体系中由消费者来决定何时从生产者中接收数据 生产者本身不知道数据何时交付到消费者手中
- 每个js函数都是拉取体系，函数是数据的生产者，调用该函数的代码通过从函数调用中取出一个单个返回值对该函数进行消费
- es2015引入了generator函数和iterators(function*) 这是另外一种类型的拉取体系 调用iterator.next的代码是消费者 它会从iterator中取出多个值
            生产者                  消费者
拉取    被动的：当被请求时产生数据      主动的：决定何时请求数据
推送    主动的：按自己的节奏产生数据    被动的：对收到的数据做出反应
> 推送
- 在推送体系中 由生产者决定何时把数据发送给消费者 消费者本身不知道何时会接收到数据
- 在当今的js世界中 promises是最常见的推送体系类型 promise(生产者)讲一个解析过的值传递给已注册的回调函数(消费者) 不同于回调函数的是 由promise来决定何时把值推送给回调函数 rxjs引入observables 一个新的推送体系 observable是多个值的生产者 并将值推送给观察者(消费者)

> 拉取和推送实际上对于观察者来说就是一个主动和被动的区别 是主动去获取 还是被动接收 rxjs中 作为事件响应者(消费者)的observer对象也有一个next属性(回调函数)用来接受从发布者那推过来的数据

> 开发者角度 消息是被动接收 因为倡导的就是通过操作data数据层 让view层进行一个响应 则这里data数据层一定是事件发布者 view层是事件响应者 每当data数据层发生变化时 都会主动推送一个值给view层 这符合真正意义上的响应式编程

> rxjs只是响应式编程在js中的应用
> 如何配合react 帮助react实现状态管理
- 只需要将组件作为事件响应者 然后在next回调里定义好更新组件状态的动作setstate 当接收到数据推送时 就会自动触发setstate 完成界面更新 这其实类似mobx (很多人在react项目中没有完全只使用rxjs 而是用了redux-observable中间件 利用rxjs的操作符来处理异步action)

> rxjs优点
1. 纯函数：rxjs中数据流动的过程中 不会改变已经存在的observable实例 会返回一个新的observable 没有任何副作用
2. 强大的操作符：rxjs又被称为lodash forasync 和lodash一样 拥有众多强大的操作符来操作数据流 不只是同步数据 针对各种复杂的异步数据流 可以多种事件流组合搭配 汇总到一起处理
3. 更独立：rxjs不依赖任何一个框架 它可以任意搭配 因为它的关注点完全就是在数据流的处理上 并且它更偏低层

> 缺点
1. 学习曲线陡峭
2. 事件流高度抽象

> 总结各类适用场景
1. 项目中复杂程度较低，建议只用react即可
2. 项目中跨组件通信 数据流同步等情况较多时 建议搭配react的新context api
3. 项目复杂度一般时 小规模团队或开发周期较短 mobx
4. 项目复杂度较高，团队规模较大或要求对事件分发处理可监控可回溯时，建议使用redux
5. 项目复杂度较高 且数据流(尤其是异步数据)混杂 建议使用rxjs
8. hook
9. redux react-redux
10. redux-saga
11. redux-thunk
12. saga-duck
13. 虚拟dom &vue中虚拟dom
14. props和state
15. 生命周期
16. 纯函数
17. 组件通信
18. react router
19. react目录结构
20. react性能优化
    > react凭借vdom和diff算法拥有更高效的性能
    1. 使用react.memo来缓存组件
    2. 使用usememo缓存大量计算
    3. 使用react.purecomponent shouldcomponentupdate
        > 父组件状态每次更新 都会导致子组件重新渲染 即使是传入相同props
        > 重新渲染不是指会更新dom 而是每次都会调用diff算法判断是否需要更新dom 这对大型组件如组件树来说是非常消耗性能的
        > 使用react.purecomponent shouldcomponentupdate 生命周期确保只有当组件props状态改变时才会重新渲染
        ```
        export default function ParentComponet(props){
            return(
                <div>
                    <Somecomponent someprop={props.somepropvalue}>
                </div>
                <div>
                    <anothercomponent someotherprop={props.someotherpropvalue}>
                </div>
            )
        }
        export default function somecomponent(props){
            return(
                <div>{props.someprop}</div>
            )
        }
        // 只要props.somePropValue发生变化 不论props.someOtherpropvalue是否变化给组件都会变化
        export default function AnotherComponent(props){
            return(
                <div>{props.someotherprop}</div>
            )
        }
        ```
        > 可以使用react.purecomponent或shouldcomponentupdate进行如下优化
        ```
        class AnotherComponent extends React.PureComponent{
            render(){
                return <div>{this.props.someOtherProp}</div>
            }
        }
        class AnotherComponent extends Component{
            shouldComponentUpdate(nextProps){
                return this.props !== nextProps
            }
            render(){
                return <div>{this.props.someOtherProp}</div>
            }
        }
        ```
        > PureComponent会进行浅比较来判断组件是否应该重新渲染
    4. 避免使用内联对象
    5. 避免使用匿名函数 ...
    6. 延迟加载不是立即需要的组件 使用React.Lazy react.suspense
    7. 调整css而不是强制组件加载和卸载
        > 将不透明度调整为0对浏览器的成本消耗几乎为0(因为它不会导致重排)并且应尽可能
    8. 使用React.Fragment避免添加额外的dom
    > 性能优化
    > React性能优化方向
    1. 减少计算量 - 对应到react就是减少渲染的节点或降低组件渲染的复杂度
    2. 利用缓存 - 对应到react就是如何避免重新渲染 利用函数式编程的memo方式来避免组件重新渲染
    3. 精确重新计算的范围 - 对应到react中就是绑定组件和状态关系 精确判断更新的时机和范围 只重新渲染脏的组件 或降低渲染范围
21. react渲染原理
    > react render 过程
    1. 入口文件中ReactDOM.render 会把我们创建的react组件转换成真实的dom元素
    ```
    ReactDOM.render(
        <App/>,
        document.getElementById('root')
    ```
    2. 编译后会调用createElement方法
    ```
    ReactDOM.render(
        React.createEelement(App),
        document.getElementById('root')
    )
    ```
    > 问题 
    1. ReactDOM.render 方法如何转为真实dom
    2. React.createElement 方法中如何实例化react组件(虚拟dom)
22. react组件构造函数
23. react render方法原理
24. react中如何将参数传递给事件
25. purecomponent
26. 为什么属性使用classname而不是class
27. react核心思想 -组件化 - UI=render(data)
    1. 组件
        - React组件能像原生的HTML标签输出特定的界面元素 且也能包括一些元素相关的逻辑功能的代码
    2. JSX
    3. Props&State
        - <a>标签的href属性 延伸到React中 属性就被称为props(properties的缩写) 组件之间可以通过Props进行交互
        - 组件的state同样能被传入到子组件中作为子组件prop的值 Rwact当中整个数据流都是向下传递的 包括路由 数据层 各个组件等 从整个应用的state中来并汇聚到一起
        - 组件中通过setState方法修改state 一般在事件处理的方法中调用它
        - 一般React应用当中的绝大多数数据都是prop 只有当用户输入内容时才会使用state处理
    4. 组件API
        - render和setState方法 都包含在组件API方法中 还有一个比较有用的方法constructor 一般会在其中初始化state并做一些方法的绑定
        - 除了这三个方法 React还提供一些列按照特定次序触发的生命周期函数
    5. 组件类型
        - 类似自定义一个模版标签一样 函数式组件接收一个props参数并返回特定的HTML内容 函数式组件没有state 可以被称作是无状态组件
        - 不同的组件类型延伸出组件角色的概念 组件分为两种角色 一种关注UI逻辑 用来展示或隐藏内容 另一类关注数据交互 如加载服务器端的数据 这两种组件被称为容器组件和展示组件 分别用来处理不同的业务逻辑
        - 高阶组件 可以把它理解为一个工厂方法 可以传入一个组件并得到一个HOC返回的附加了更多功能的新组件 
    > 小结
    1. React的代码由一个个的组件构成的
    2. 组件采用JSX语法拓展的写法
    3. 数据流总是从父组件到子组件 除state可以通过调用方法修改之外
    4. 组件包含一些特定方法和生命周期函数
    5. 也可以用函数声明只有render方法的无状态组件
    6. 区分处理UI和数据逻辑的组件是一种很好的开发实践
    7. 高阶组件函数可以传入一个组件并为其赋予更多功能
28. react项目结构
29. react的diff原理
    > diff算法的作用
    > 计算VDOM中真正变化的部分 并只针对该部分进行原生DOM操作 而非重新渲染整个页面

    > 传统diff算法
    - 通过循环递归对节点进行依次比较 算法复杂度达到O(n^3) n是树的节点数 

    > React的diff算法
    1. 调和 将VDOM树转换为actual DOM树的最少操作的过程称为调和
    2. 什么是React diff算法
    - diff算法是调和的具体实现

    > diff策略
    > React用三大策略将O(n^3)的复杂度转化为O(n)复杂度

    1. tree diff
    - Web UI中DOM节点跨层级的移动操作特别少 可以忽略不计
        1. React通过updateDepth对VDOM树进行层级控制
        2. 对树分层比较 两棵树只对同一层次节点进行比较 如果该节点不存在时 该节点及其子节点会被完全删除 不会再进一步逼近
        3. 只需遍历一次，就能完成整棵DOM树的比较
        > diff只简单考虑同层级节点位置变换 如果是跨层级 只有创建节点和删除节点的操作
        > 官方建议不要进行DOM节点跨层级操作 可以通过CSS隐藏 显示节点 而不是真正的移除 添加DOM节点
    2. component diff
    - 拥有相同类的两个组件 生成相似的树形结构
    - 拥有不同类的两个组件 生成不同的树形结构
    - React对不同组件间的比较 有三种策略
        1. 同一类型的两个组件，按照原策略(层级比较)继续比较VDOM树即可
        2. 同一类型的两个组件，组件A变化为组件B时 可能VDOM没有任何变化 如果知道变换过程中VDOM没有改变 可节省大量计算时间 所以用户可以通过shouldComponentUpdate()判断是否需要判断计算
        3. 不同类型的组件 将一个将被改变的组件判断为dirty component(脏组件) 从而替换整个组件的所有节点
        > 如果组件D和组件G结构相似 但是React判断是不同类型的组件 则不会比较其结构 而是删除组件D及其子节点 创建组件G及其子节点
    3. element diff
    - 对于同一层级的一组子节点 通过唯一id区分 diff提供三种节点操作：删除 插入 移动
    - 对同一层级的同组子节点 添加唯一key进行区分 移动即可
    - 。。。
    > diff的不足和待优化的地方
    - 开发过程中 尽量减少类似将最后一个节点移动到列表首部的操作 当节点数量过大或更新操作过于频繁时 会影响React的渲染性能
30. react单元测试
    > 一个React组件有两种存在形式 虚拟DOM对象(即React.Component的实例)和真实DOM节点 官方测试工具对这两种形式 都提供测试解决方案
    - Shallow Rendering:测试虚拟DOM的方法(将一个组件渲染成虚拟DOM对象 但只渲染第一层 不渲染所有子组件)
    - DOM Rendering:测试真实DOM的方法
    > Enzyme库：官方测试工具库非封装 它模拟了JQUERY的API非常直观
    ```
    //1.shallow
    import {shallow} from 'enzyme';

    describe('Enzyme Shallow',function(){
        it('App\'s title should be Todos,function(){
            let app = shallow(<App/>);
        expect(app.find('h1').text()).to.equal('Todos')
        })
    })
    //2.render 将React组件渲染成静态的HTML字符串 然后分析这段HTML代码的结构 返回一个对象
    // 适用于依赖类名做测试
    import {render} from 'enzyme'
    ...
    ```
    > Enzyme的常用API
    1. .get(index) 返回指定位置的子组件的DOM节点
    2. .at(index) 返回指定位置的子组件
    3. .first() 返回第一个子组件
    4. .last() 返回最后一个子组件
    5. .type() 返回当前组件的类型
    6. .text() 返回当前组件的文本内容
    7. .html() 返回当前组建的HTML代码形式
    8. .props() 返回根组件的所有属性
    9. .prop(key) 返回根组件的指定属性
    10. .state([key]) 返回根组件的状态
    11. .setState(nextState) 设置根组件的状态
    12. .setProps(nextProps) 设置根组件的属性
31. react的setstate方法
32. jsx和html
33. react的key
34. react事件机制
35. react有状态组件和无状态组件 类组件的缺点
36. react和es5 es6
37. 高阶组件 高阶函数
    - 高阶函数 一种特别的函数 接受的参数为函数 返回值也是函数 
        1. 接受函数类型的参数/函数返回的是函数
    - 常见的高阶函数
        1. 定时器 setTimeout setInterval
        2. Promise
        3. 数组遍历相关方法 forEach filter map find findINdex
        4. fn.bind() 本身是一个函数 bind方法返回一个新的函数方法
        5. Form.create() create函数能够包装组件 生成另外一个组件的新功能函数
        6. getFieldDecorator()
    - 高阶组件
        1. 高阶组件就是接受一个组件作为参数并返回一个新组件的函数
        2. 高阶组件是一个函数 并不是一个组件
    - 解决问题
        1. 随着项目复杂 开发过程中 多个组件需要某个功能 而该功能和页面没有关系 所以不能简单抽取成一个新组件 但如果让同样的逻辑在各个组件中各自实现无疑会造成重复的代码
    - 高阶组件总共分为两大类
        1. 代理方式
            1. 操作prop
            2. 访问ref(不推荐)
            3. 抽取状态
            4. 包装组件
        2. 继承方式
            1. 操纵生命周期
            2. 操纵prop
    - 使用高阶组件
        1. higherOrderComponent(wrappedComponent)
        2. @higherOrderComponent
    - 高阶组件的应用
        1. 代理方式的高阶组件
            - 返回的新组件类 直接继承自React.Component类 新组件扮演的角色传入参数组件的一个代理 在新组件的render函数中 将被包裹组件渲染出来 除了高阶组件自己要做的工作 其余功能全都转手给被包裹的组件
        2. 继承方式的高阶组件
            - 采用集成关联作为参数的组件和返回的组件 假如传入的组件参数是wrappedComponent 则返回的组件就直接继承自WrappedComponent
38. react中元素和组件的区别
    > react元素
        > react中最小基本单位 可以使用jsx语法轻松创建一个react元素
        ```
        const element = <div className="element">element</div>
        ```
        > react元素不是真实的dom元素 它仅仅是js的普通对象(plain objects)无法直接调用dom原生的api 
        > 除了使用jsx语法 还可以使用react.createElement() react.cloneElement()来构建react元素
    > react组件
    > react中有三种构建组件的方式 React.createClass() ES6 class 和无状态函数
    1. react.createClass()
    ```
    var Greeting = React.createClass({
        render:function(){
            return <h1></h1>
        }
    })
    ```
    2. ES6 class
    ```
    class Greeting extends React.Component{
        render:function(){
            return <h1><h1>
        }
    }
    ```
    3. 无状态函数
    > 无状态函数是使用函数构建的无状态组件 无状态组件传入props和context两个参数 它没有state 除了render没有其他生命周期方法
    4. PureComponent
    > 除了提供一个具有浅比较的shouldComponentUpdate方法 PureCompoent和Component基本完全相同

    > 元素和组件的区别
    > 组件是由元素构成的 元素数据结构是普通对象 而组件数据结构是类或纯函数
39. Forwarding Refs作用
    > 父组件用来获取子组件的dom元素
40. 简述vdom如何工作
    1. 数据变化时 如setstate时 会引起组件重新渲染 整个ui都会以vdom的形式重新渲染
    2. 收集差异也就是diff新的vdom和老的vdom的差异
    3. 最后把差异队列里的差异，如增加节点，删除节点，移动节点更新到真实的dom上
41. fiber架构
    > fiber设计思想
    - fiber是对react核心算法的重构 facebook团队使用两年多的时间去重构react的核心算法 在react16以上的版本中引入了fiber架构 

    > 为什么需要fiber
    - js引擎和页面渲染引擎是在同一个渲染线程之内的 两者是互斥关系 如果某个阶段执行任务特别长 如在定时器阶段或begin frame阶段执行时候非常长 事件已经明显超过16ms 就会阻塞页面渲染 从而出现卡顿现象
    - react16引入fiber架构之前 react会采用递归对比虚拟dom树 找出需要变动的节点 然后同步更新它们 这个过程react称为reconcilation[ˌrekənsɪliˈeɪʃn] 在reconcilation期间 react会一直占用浏览器资源 导致用户出发的事件得不到响应
    - 传统的方法存在不能中断和执行栈太深的问题
    - react希望能彻底解决主线程长时间占用问题 于是引入fiber来改变这种不可控的现状 把渲染/更新过程拆分为一个个小块的任务 通过合理的调度机制来调控事件 指定任务执行的时机 从而降低页面卡顿的概率 提升页面交互体验 通过fiber架构 让reconcilation过程变得可被中断 适时让出cpu执行权 让浏览器及时响应用户交互

    > React16中使用了fiber 但是vue没有fiber 原因是两者优化思路不一样
    1. vue是基于template和watcher的组件级更新，把每个更新任务分割得足够小，不需要使用到fiber框架，将任务进行更细粒度的拆分
    2. react不管在哪里调用setstate 都是从根节点开始更新 更新任务较大 需要使用到fiber将大任务分割为多个小任务 可以中断和恢复 不阻塞主进程执行高优先级的任务

    > 什么是fiber
    > 可以理解为是一个执行单元 也可以理解为是一个数据结构

    - 执行单元
        - fiber可以被理解为划分一个个更小的执行单元 它是把一个大任务拆分成很多小任务 一个小任务的执行必须是一次完成 不能出现暂停 但一个小块任务执行后可以移交控制权给浏览器去响应用户 从而不想之前要等大任务执行完再去响应用户

    - 数据结构
        - fiber可以被理解为一种数据结构 react fiber是采用链表实现的 每个vdom都可以表示为一个fiber 每个节点都是一个fiber 一个fiber包括child(第一个子节点)sibling(兄弟节点)return(父节点)等属性 react fiber机制的实现 就是依赖于以下数据结构
        - PS: fiber是react进行重构的核心算法 fiber是指数据结构中每一个节点
        
        > requestAnimationFrame
        - 在Fiber中使用到了requestAnimationFrame 它是浏览器提供的绘制动画的soi 它要求浏览器在下次重绘之前(即下一帧)调用指定的回调函数更新动画

        > requestIdleCallback
        - 是react fiber实现的基础api requestIdleCallback能使开发者在主事件循环上执行后台和低优先级的工作 而不影响延迟关键事件 如动画和输入响应 正常帧任务完成后没超过16ms 说明有多余空闲时间 此时就会执行requestIdleCallback里注册的任务

    - fiber节点设计
        - fiber的拆分单位是fiber(fiber tree上的一个节点) 实际上就是按虚拟dom节点拆 需要根据虚拟dom去生成fiber树

    - fiber节点包括属性
        1. type & key
        2. stateNode
        3. child & sibling & return

    - fiber执行原理
    > 从根节点开始渲染和调用的过程可以分为两个阶段 render阶段 commit阶段
    1. render阶段 这个阶段是可中断的 会找出所有节点的变更
    > 此阶段会找出所有节点的变更 如节点新增 删除 属性变更等 这些变更react统称为副作用effect 此阶段会构建一棵fiber tree 以虚拟dom节点为维度对任务进行拆分 即一个虚拟dom节点对应一个任务 最后产出的结果是effect list 从中知道哪些节点更新 增加 删除
    > 遍历流程
    > react fiber首先将虚拟dom树转化为fiber tree 因此每个节点都有child sibling return属性 遍历fiber tree 时采用的是后序遍历方法
    > 收集effect list
    2. commit阶段 这个阶段是不可中断的 会执行所有的变更
    > commit阶段需要将上阶段计算出来的需要处理的副作用一次执行 此阶段不能暂停 否则会出现UI更新不连续的现象 此阶段需要effect list 将所有更新都commit到DOM树上
42. fiber架构相对于以前的递归更新组件有什么优势
    1. 递归更新组件会让js调用栈占用很长时间
    2. 浏览器是单线程的，它将gui渲染，事件处理，js执行放在一起，只有将其做完才能做下一件事，如果有足够的时间，浏览器会对我们的代码进行编译优化(JIT)及进行热代码优化
    3. Fiber框架正是利用这个原理将组件渲染分段执行，这样浏览器就有时间优化js代码与修正reflow
43. 状态提升
44. 上下文context
    > context通过组件树提供了一个传递数据的方法 从而避免在每一个层级手动传递props属性
    > 用法：在父组件上定义getChildContext方法 返回一个对象 然后它的子组件就可以通过this.context属性获取
45. protal 门户
    > portal提供一种很好的将子节点渲染到伏组件以外的dom节点的方式
    > ReactDOM.createPortal(child,container)
    > 第一个参数(child)是任何可渲染的React子元素 
46. 错误边界
    > 部分UI的js错误不应该破坏整个应用程序 为解决这个问题 react16引入错误边界(Error Boundaries)
47. react16版本的reconciliation阶段和commit阶段是什么
    1. reconciliation阶段包含的主要工作是对current tree和new tree做diff计算 找出变化部分 进行遍历 对比等事可以中断的
    2. commit阶段是对上一阶段获取到的变化部分应用到真实的dom树中 是一系列的dom操作 不仅要维护更复杂的dom状态 而且中断后再继续 会对用户体验造成影响 在普遍的应用场景下 此阶段的耗时比diff计算等耗时相对短
48. react事件机制
    1. 用户在为onclick添加函数时 react并没有将click事件绑定在dom上面
    2. 是在document处监听所有支持的事件，当事件发生并冒泡至document处时 react将事件内容封装交给syntheticevent(负责所有事件合成)
    3. 当事件触发时，对使用统一的分发函数dispatchEvent将指定函数执行
49. 列表循环渲染的key最好不要用index
50. React如何实现Vue的<keep-alive>组件
    1. 通过样式来控制组件的显示(display:none|block)
        - 问题 切换组件时无法使用动画
    2. 使用Mobx Redux这样的数据流管理工具
51. React解决问题
    1. 隔离DOM操作 所有操作全部转换成对数据的操作 通过改变数据来改变页面显示
    2. 数据绑定 单向数据流
    3. 组件化 React天生组件化 每个模块都是一个单独的组件 可以单独使用 也可以和其他模版组合嵌套使用
    4. 可维护性增强 每个组件单独维护 互相不受牵扯
    5. 运行效率 使用虚拟DOM 减少DOM操作
    > 特点 优势
    1. 虚拟DOM
        - 一DOM树转换的JS对象树 每次数据更新后 重新计算生成 然后和上次比较 对发生变化的地方进行批量更新 减少DOM操作
    2. JSX
        - JSX语法是一种在JS代码中书写HTML标签的写法 也是React官方推荐的写法
        - JSX能准确表示出页面结构 具有模版特点
        - 用JS对象表现一个DOM元素的结构 
        - 每个元素都可以使用JS代码表示 每个DOM元素都包含三个部分 标签名 属性 子元素
        - 编译时 编译器会把JSX语法编译成一个个JS对象 然后通过createElement方法生成相应标签
    3. 组件化 模块化
        - React天生支持组件化 每个文件就是一个组件 通过对大页面的拆分形成不同的组件 后续就是对每个组件的拼装 组合 使一个页面的功能分布到不同的功能模块中 便于相同功能模块的统一维护和开发 更便于产生bug时准确定位bug位置 提高调试效率 配合Webpack可以很好的实现ES6或CommonJS的写法实现模块化代码
52. props和state
    > props是组件对外的接口 state是组件对内的接口
    > 根据对外接口props和对内接口state 组件计算出对应界面的UI
    > 主要区别
    - state是可变的 是一组用于反映组件UI变化的状态集合
    - props对于使用它的组件 是可读的 想修改props 只能通过该组件的父组件修改 在组件状态上移的场景中 父组件正是通过子组件的Props 传递给子组件其所需状态
    1. props用来定义外部传进组件的属性 在外部定义 无法在组件中更改
    2. state用来维持组件中状态更新和变化 在内部定义 组件可根据情况自行更改
    > props的使用
    1. props(属性)默认为true 如果没给prop属性传值 默认为true
    2. props扩展 已经有一个object类型的props 并且希望在JSX传入 可以使用扩展操作符...传入整个props对象 这两个组件是等效的 显然下面的方法更方便 因为它将数据进行了包装 且简化了赋值的书写
    ```
    function App1(){
        return <Greeting firstName="Ben" lastName="Hel" />
    }
    function App2(){
        const props = {firstName="Ben" lastName="Hel"};
        return <Greeting {...props}>
    }
    ```
    > state
    - React的核心思想是组件化 组件中最重要的概念是State(状态) State是一个组件的UI数据模型 是组件渲染时的数据依据
    - 状态(state)和属性(props)类似 都是一个组件所需要的一些数据集合 但是state是私有的 可以认为state是组件的私有属性
    - 如何判断是否为state
    - 。。。
    - 并不是组件中用到的所有变量都是组件的状态 当存在多个组件共同依赖一个状态时 一般做法是状态上移 将这个状态放在这几个组件的公共父组件中

    > 正确使用State
    1. 用setState修改State 直接修改state 组件不会重新触发render()
    2. State的更新是异步的
        1. 调用setState后 setState会把要修改的状态放入一个队列中(因而 组件的state并不会立即改变)
        2. 之后React会优化真正的执行时机 来优化性能 所以优化过程中又可能会将多个setState的状态修改合并为一次状态修改 因而state更新可能是异步的
        3. 所以不要依赖当前的State 计算下一个State 当真正执行状态修改时 依赖的this.state并不能保证最新的State 因此React会把多次State的修改合并成一次 这时this.state将还是这几次State修改前的State
        - 同样不能依赖当前的Props计算下一个状态 因为Props一般也是从父组件的State获取 依赖无法确定在组件状态更新时的值
    > this.props和this.state可能是异步更新的 不能依赖它们的值计算下一个state
    > 弥补这个问题 可使用setState()的另一种形式 它接受一个函数而不是一个对象 该函数有两个参数
    1. 第一个参数 当前最新状态的前一个状态(本次组件状态修改前的状态)
    2. 第二个参数 当前最新的属性props
    ```
    //正确
    this.setState((preState,props)=>({
        counter:preState.counter+props.increment
    }))
    //错误
    this.setState((preState,props)=>{// 没将{}用()括起来 所以会解析成代码块
        counter:preState.counter+props.increment
    })
    ```
    > state的更新可能是异步的React会把传入多个setState的多个Object batch起来合成一个
    > 合并成一个就相当于把传入setState的多个Object进行shallow merge
    - 传入多个setState的多个Object会被shallow merge 传入多个setState的多个function会被queue起来 queue中的function接收到state(上面是prev)都是前一个function操作过的state

    > 状态发生变化时 如何创建新的状态 根据状态类型 可分为三种情况
    1. 状态的类型是不可变类型(数字 字符串 布尔值 null undefined)
    2. 状态的类型是数组
        - 数组是一个引用 React执行diff算法时比较的是两个引用 而不是引用的对象 所以修改原对象 引用值不发生变化 React不会重新渲染 因此修改状态的数组或对象时 要返回一个新的数组或对象
        1. 增加 concat方法/ES6的数组扩展语法
        2. 截取 slice方法
        3. 条件过滤 filter方法
        > PS 不要使用push pop shift unshift splice等方法修改数组类型的状态 因为这些方法都是在原数组的基础上修改的 concat slice filter会返回一个新的数组
    3. 状态类型是普通对象(不包含字符串 数组)
        - 对象是一个引用 Raact执行diff算法时比较的是两个引用 而不是引用的对象 所以直接修改原对象 引用值不发生改变 React不会重新渲染 因此修改状态的数组或对象时 要返回一个新的对象
        1. 使用ES6的Object.assign方法
        2. 使用对象扩展语法
        > PS 创建新的状态对象的关键是 避免使用会直接修改原对象的方法 而是使用可以返回一个新对象的方法
    > State向下流动
    - 一个组件可以选择将state向下传递 作为其子组件的props属性
    - 这通常称为一个从上到下 或 单向的数据流 任何state始终由某个特定组件所有 并从该state导出的·任何数据或UI只能影响树下方的组件
    - 把组件树想象成props属性的瀑布 所有组件的state状态 一个额外的水源 汇入主流
53. React事件委派
    - React不会把事件绑定到真实节点上 而是绑定到结果的最外层 使用统一的事件监听器 这个监听器维持一个映射来保存所有组件内部的事件舰艇和处理函数
    - 组件的删除添加 只会在监听器中添加或删除对象即可 简化了事件处理和回收机制
    1. bind方法
    ```
    <button onClick = {this.handleClick.bind(this,'test')}>Test</button>
    ```
    2. 构造器中声明
    ```
    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }
    render(){
        return (
            <button onClick={this.handleClickå}>Test</button>
        )
    }
    ```
    3. 箭头函数
    ```
    const handleClick = ()=>{
        console.log('test')
    }
    render(){
        return (
            <button onClick = {this.handleClick}>Text<button>
        )
    }
    ```
    1. 避免将合成事件和原生事件混用 如果使用应该通过e.target进行判断 避免错误
    2. 事件绑定方式不同
    3. 事件类型不同 React合成事件是JS原生事件的子集
    4. 事件传播方式和阻止方式不同 React合成事件只用使用e.preventDefault()
    5. 事件对象不同 原生DOM事件在不同浏览器存在差异 React合成事件中不存在兼容性问题
54. super(props)有什么意义
55. return ()什么意义
56. React单向数据流 Flux单向数据流
58. 函数式组件和类组件区别
    > React的函数式组件和类组件之间根本区别在 心智模型上
    1. 语法上区别
        - 函数式组件是一个纯函数 它需要接受props参数并返回一个React元素 类组件需要继承React.Component class组件需要创建render并且返回React元素 语法上讲更复杂
    2. 调用方式
        - 函数式组件可以直接调用 返回一个新的React元素 类组件在调用时需要创建一个实例 然后通过调用实例中的render方法返回一个React元素
    3. 状态管理
        - 函数式组件没有状态管理 类组件有状态管理
    4. 使用场景
        - 类组件没有具体的要求 函数式组件一般是用在大型项目中用来分割大组件

    1. 函数组件中的this是undefined 类组件中的this指向当前组件的实例对象
    2. 函数组件是一个纯函数 它接收一个props对象返回一个react元素 类组件要去继承React.Component并且创建render函数返回react元素
    3. 函数式组件没有生命周期和状态state 而类组件有
    4. 不能在函数组件中使用生命周期钩子 原因和不能使用state一样 所有的生命周期狗子都来自于继承的React.Component
    5. 函数组件ReactDOM.render 执行ReactDOM.render(<com>)后
        1. React解析组件标签 找到COM组件
        2. 发现组件是使用函数定义的 随后调用该函数 将返回的虚拟DOM转为真实DOM 随后呈现在页面中
    6. 类组件ReactDOM.render
        1. React解析组件标签 找到com组件
        2. 发现组件是使用类定义的 随后new出来该类的实例 并通过该实例调用到原型上的render方法
        3. 将render返回的虚拟dom转为真实的dom 随后呈现在页面中
59. React类组件的实现和挂载
    > 组件是什么
    1. 多层组件嵌套 就是在父对象的props中增加children字段及对应的描述值 也就是JS对象的多层嵌套
    2. 以上是基于ES6的React开发模式 ES5中通过React.createClass({})方法创建的组件和ES6中是完全一样的 
    3. 可以写extends Component 也可以写extends React.Component 两者不存在区别 Component是React.Component的引用 Component === React.Component 实际项目中写哪个都可以
    > 组件的初始化
    1. 组件类必须拥有render方法输出类似<div>111</div>的结构并挂载到真实DOM上 才能触发组件的生命周期并成为DOM树的一部分
    2. render方法实际上是调用了React.createElement方法(实际上是ReactElement方法)
    3. 每一个组件对象都是通过React.createElement方阿福创建出来的ReactElement类型的对象 ReactElement是一种内部记录组件特征。。。
    4. 通过React.createElement()创建出的ReactElement类型的JS对象 就是React组件 通过class关键字声明React组件 则它们在解析成真实DOM之前一直是ReactElement类型的JS对象
    > 组件的挂载
    1. 可以通过ReactDOM.render(component,mountNode)的形式对自定义组件/原生DOM/字符串进行挂载
    2. ReactDOM.render实际调用了内部的ReactMount.render 进而执行ReactMount._renderSubtreeIntoContainer 从字面意思上 将子DOM插入容器的逻辑
    。。。。。。。
    。。。。。。。
60. React类组件生命周期函数
    > 只有在挂载流程开始后 才会触发组件的生命周期 生成ReactElement类型的JS对象 通过解析组件对象内部携带的信息 获得相应的HTML信息 插入指定的DOM容器中 最终完成组件的渲染

    > ReactDOM.render()方法根据传入的参数不同 在内部通过工厂方法生成四种不同类型的封装组件
    1. ReactEmptyComponent
        - 通过ReactEmptyComponent.create()方法创建 该方法最终调用的是ReactDOMEmptyComponent方法 因为组件为空 所以几乎所有参数设置为null 也无关生命周期 只有组件的挂载和卸载 在关键方法mountComponent中 最终返回的是形如<!-- >的html也就是空 因此插入真实DOM的也是空
    2. ReactTextComponent
        - 通过ReactDOMTextComponent.createInstanceForText()方法创建
        - 通过ReactDOMTextComponent相比
    3. ReactDOMComponent ......
    4. ReactCompositeComponent
    - 执行挂载流程时 通过执行每种封装组件内部的mountComponent方法触发生命周期 显然生命周期只在React自定义组件中存在 也就是ReactCompositeComponent 因为其他三种组件是不存在生命周期的
61. 事务和更新队列
    1. setState相关
    2. transaction事务
62. React事件系统
    1. 原生事件系统
        - 通常监听真实DOM 想监听按钮的点击事件 则在按钮DOM上绑定事件和对应的回调函数即可 若页面复杂且事件处理频率高，对网页性能是个考验
    2. React事件系统
        - React实现了SyntheticEvent层处理事件
        - React并不像原生事件一样将事件和DOM一一对于 而是将所有的事件都绑定在网页的document 通过统一的事件监听器处理或分发 找到对应的回调函数并执行 按照官方文档的说法 事件处理程序将传递SyntheticEvent实例
    3. SyntheticEvent
        1. 事件注册
            - React对事件统一进行处理 肯定要先注册程序员写的事件触发函数 如一个点击事件
            ```
            <Component onclick = {this.handleClick}>
            ```
            - 这个组件挂载时 React就已经开始通过mountComponent内部的_updateDOMProperties方法进行时间处理
        2. 事件存储
            - 写的事件回调函数注册完毕后需要存储起来 以便触发时进行回调 存储的入口是
        3. 事件分发
        4. 事件处理
63. React hook
    1. Hook本质就是一类特殊的函数 它们可以为你的函数式组件注入一些特殊的功能
    > 为什么需要hook
    - React组件冗长且难以复用 官方推荐 渲染属性(Render Props)和高阶组件(Higher-Order Components)
    1. 渲染属性
        - 使用一个值为函数的prop来传递需要动态渲染的nodes或组件
    > hook
    1. useState 

    > 为什么hook记住状态 而不是每次初始化
    > react如何保证多个useState相互独立
    > hook使用限制
    1. react规定我们必须把hooks写在函数的最外层 不能写在if else等条件语句中 来确保hooks的执行顺序一致

    2. useEffect
        1. react首次渲染和之后的每次渲染都会调用一遍传给useEffect的函数 而之前用两个生命周期函数componentDidMount componentDidUpdate
        2. useEffect中定义的副作用函数的执行不会阻碍浏览器更新视图 也就是说这些函数是异步执行的
    3. useReducer
        1. 是hooks提供的一个类似于redux的API 可以通过action的方式来管理context或者state
    4. useContext
    ```
    const context = useContext(Context);
    ```
    - 接受一个context(上下文)对象(从React.createContext返回的值) 并返回当前context值 由最近context提供程序给context 当提供程序更新时 此hook将使用最新的context值触发重新渲染
64. Mixin
    1. 被否定 是因为Mixins机制是让多个Mixins共享一个对象的数据空间 这样很难确保不同Mixins依赖的状态不发生冲突
    2. hook直接用在function 而不是class 另一方面每个hook都是相互独立的 不同组件调用同一个hook也能确保各自状态的独立性 这就是两者的本质区别
65. Redux
66. React-Redux
67. Redux-saga Redux thunk
68. saga-duck
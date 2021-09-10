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
    > 由于高阶组件的实用性 它被频繁用于大量reactjs相关的第三方库，如react-redux(用于管理react应用的状态) react-loadable用于加载带有动态导入的组件的高阶组件所使用
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
    - JSX会被编译成React.createElement()函数的调用 JSX是React.createElement的语法糖
    > createElement(type,config,children)
    - createElement有三个入参 这三个入参囊括了React创建一个元素所需要知道的全部信息
        1. type 标识节点类型 H5标签字符串|React组件类型|React fragment
        2. config 以对象形式传入 组件所有属性都会以键值对形式存储在config对象中
        3. children 以对象形式传入 记录组件标签之间嵌套的东西 即所谓子节点/子元素
    - createElement中并没有复杂的算法和真实DOM的逻辑 
    - createElement像是开发者和ReactElement调用之间的一个转换器 一个数据处理层
    - createElement执行到最后会return一个针对ReactElement的调用
    - 打印出来是一个虚拟DOM 
    - 虚拟DOM->真实DOM 用React.render完成
    > JSX如何变成DOM元素
    - JSX通过babel转换成React.createElement的调用 createElement对数据进行格式化 然后在调用ReactElement变成Element对象 也就是虚拟DOM 最后通过React.render()映射到真实的DOM元素中

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

    > JSX语法规则
    1. 定义VDOM时 不要写引号
    2. 标签中引入JS表达式要用{}
    3. 内联样式 用style={{key:value}}的形式去写
    4. VDOM必须只有一个根标签
    5. JSX标签可以是单标签(标签必须闭合) 可以是双标签 
    6. 标签首字母
        1. 若小写字母开头 则将标签转为HTML中同名元素 若HTML中无该标签对应的同名元素则报错
        2. 若大写字母开头 react就去渲染对应的组件 若组件没有定义 则报错
    7. return后换行 返回的elemnet需要被()包裹
6. refs&dom
    - refs提供了一种访问在render方法中创建的DOM节点或React元素的方法 
    > react通过声明式的渲染机制把复杂的dom操作抽象成为简单的state和props操作
    > 提供ref用来访问在render方法中创建的dom元素或者是react组件实例
    > ref的三驾马车
    - react16.3之前 ref通过字符串(string ref)或者回调函数(callback ref)的形式获取 在v16.3中 引入了新的react.createRef api
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

    > 状态
    - react利用可复用的组件构建界面，组件本质上是一个有限状态机，它能记住当前所处的状态，并根据不同的状态变化做出相应的操作，在react中把这种状态定义为state，用来描述该组件对应的当前交互界面
    > react通过管理状态来实现对组件的管理 当state发生变更时 react会自动执行相关的操作：绘制页面
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
    > 什么是hook
    1. Hook本质就是一类特殊的函数 它们可以为你的函数式组件注入一些特殊的功能
    > 为什么需要hook
    - React组件冗长且难以复用 官方推荐 渲染属性(Render Props)和高阶组件(Higher-Order Components)
    > hook使用规则
    - hook本质就是JS函数 在使用它时需要遵循两条规则
        1. 只在最顶层使用hook
            - 不要在循环 条件或嵌套函数中调用hook
            - 为了确保hook在每一次渲染中都按照相同的顺序被调用
        2. 只在React函数中调用hook
            - 不要在普通的JS函数中调用Hook
            1. 在React的函数组件中调用Hook
            2. 在自定义Hook中调用其他Hook
    1. 渲染属性
        - 使用一个值为函数的prop来传递需要动态渲染的nodes或组件
    > 常见的hook
    1. useState 
        ```
        const {state,setState} = useState(initialState)
        ```
        > usestate的初始值只在第一次有效
        - 返回一个state 以及更新state的函数
        - 初始渲染期间 返回的状态(state)与传入的第一个参数(initialState)值相同
        - setState函数用于更新state 它接受一个新的state值并将组件的一次重新渲染加入队列
    2. useEffect
        ```
        useEffect(()=>{
            return ()=>{};
        },[])
        ```
        1. 只在第一次使用的componentDidMount 可以用来请求异步数据
            - useEffect最后 加了[]表示只第一次执行
        2. 用来代替componentWillUpdate 每次渲染都会执行的生命函数
            - useEffect最后 不加[]表示每一次渲染都执行
        3. useEffect最后加[],[]里面加的字段表示 这个字段更新了 这个effect执行
            - [xx] xx更新渲染执行
        4. 分别name和age
            - 可以写多个useEffect
        5. 之前订阅 最后在componentWillUnMount生命周期中取消订阅
            - effect的return里可以做取消订阅的事
            ```
            useEffect(()=>{
                const subscription = 订阅
                return ()=>{
                    取消订阅
                }
            })
            ```
        6. useEffect一些规则
            1. useEffect里使用到的state值 固定在useEffect内部 不会被改变 除非useEffect刷新 重新固定state的值
            2. useEffect不能被判断包裹
            3. useEffect不能被打断
    3. useRef
        1. 为什么要使用useRef
            - useEffect里使用的state的值 固定在了useEffect内部 不会被改变 除非useEffect刷新 重新固定state的值
            - useEffect里的state的值是固定的 可用useRef解决 可理解为useRef的一个作用 就是相当于全家作用域 一处被修改 其他地方全更新
        2. 使用useRef
            ```
            const countRef = useRef(0)
            ```
        3. 
            1. 相当于全局作用域 一处被修改 其他地方全更新
            2. 普通操作用来操作dom
    4. useMemo - 解决了值的缓存问题
        1. 为什么使用useMemo 
        2. 如何使用useMemo
        ```
        const data = useMemo (()=>{
            return {
                name
            }
        },[name])
        ```
        先根据[name]里面的name值判断一下 因为useMemo作为一个有暂存能力的 暂存上次name结果
        3. 
            1. memo的用法是函数组件里的PureComponent 但如果函数组件被React.memo包裹 且其实现中拥有useState或useContext的Hook 当context发生变化时 它仍会重新渲染
            2. memo是浅比较 对象只比较内存地址 只要内存地址没变 对象内值变化不会出发render
    5. useCallback - 解决函数的缓存问题
    6. useReducer
        - useReducer redux中的reducer
    7. useContext

    > 为什么hook记住状态 而不是每次初始化 hooks工作机制
    - React通过hook调用的顺序 知道哪个state对应哪个useState
    - 使用useState或useEffect这样的hooks后 每次组件在render时都生成了一份本次render的state function effects 这些与之前或之后的render里main的内容没有关系 而对于class component来说 state是一种引用的形式 
    - 根本来说react-hook的作用是一种同步的作用 同步函数hooks函数内的内容和外部的props以及state 所以才会在每次render之后执行useEffect里的函数 此时可以获取到当前render结束后的props和state
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
    > 使用hooks
    1. 若hook类型相同 且依赖数组一致时 应该合并成一个hook 否则会产生更多的开销
    2. 参考原生hooks的设计 自定义hooks的返回值可以直接使用tuple 更易于在外部重命名 但如果返回值的数量超过三个 还是建议返回一个对象
    3. ref不要直接暴露给外部使用 而是提供一个修改值的方法
9. redux react-redux
    - Redux
    1. 设计思想 Web是一个状态机 视图和状态是一一对应的 所有的状态都保存在一个对象里
    2. 基本概念
        1. Store 存储数据的地方 整个应用只能有一个Store Redux提供createStore函数 用来生成store
        2. State 该对象包含所有数据 如果想得到某个时点的数据 就要对store生成快照 这种时点的数据集合就叫state 当前时刻的state可以通过store.getState()拿到 Redux规定 一个State对应一个View 只要state相同 View就相同
        3. Action State的变化 会导致View的变化 用户接触不到State 只能接触到View 所以State的变化必然是View导致的 Action就是view发出的通知 表示State应该要发生变化了 Action是一个对象 其中的type属性是必须的 表示Action的名称 其他属性可以自由设置
        Action描述当前发生的事情 改变State的唯一方法 就是使用Action 它会运送数据到Store
        4. Action Creator 定义的一个函数用来生成Action
        5. Store.dispatch View发出Action的唯一方法
        6. Reducer Store收到Action后 必须给出一个新的State 这样View才会发生变化 这种State的计算过程就叫Redcer
        Reducer是一个纯函数 它接受Action和当前State作为参数 返回一个新的State
    3. 整体流程
        1. 用户发出Action 
        2. store.dispatch(action)
        3. Store自动调用Reducer 并传入两个参数 当前State和收到的Action Reducer返回新的State
        4. State一旦变化 Store调用监听函数
        5. 设置监听函数
        ```
        store.subscribe(listener)
        ```
        6. listener通过store.getState()得到当前状态 如果使用的是React 此时可以触发重新渲染View
    - React Redux
    1. Redux和React Redux
        - 为了方便使用 Redux作者封装了一个React专用的库 React-Redux
    2. 为什么React需要Redux
        - React单向数据流 如果是数据状态很复杂的应用 组件间的交流会很困难 需要一个机制 把所有的state集中到组件顶部 灵活地将所有state各取所需分发给组件
    3. UI组件和容器组件
        - React-Redux将所有组件分为两大类 UI组件和容器组件
        1. UI组件 只负责UI的呈现 不带有任何业务逻辑 没有状态 所有所有数据都由参数(this.props)提供 不使用任何Redux的API
        - 因为不含有状态 UI组件又称为纯组件 它和纯函数一样 纯粹由参数决定它的值
        2. 容器组件 负责管理数据和业务逻辑 不负责UI的呈现 带有内部状态 使用Redux的API
        3. 总结: UI组件负责UI的呈现 容器组件负责管理数据和逻辑
        4. 一个组件既有UI 又有业务逻辑 将其拆分为以下结构 外面是一个容器组件 里面包了一个UI组件 前者负责与外部的通信 将数据传给后者 由后者渲染出视图
        > 提供的API
        1. connect(mapStateToProps,mapDispatchToProps)方法 用于从UI组件生成容器组件 connect将这两种组件连起来
        2. mapStateToProps 负责处理输入逻辑 外部的数据(即state对象)如何转换为UI组件的参数 外部的state映射到UI组件的参数props
        3. mapDispatchToProps 负责处理输出逻辑 用户发出的动作如何变成Action对象 从UI组件传出去 用户对UI组件的操作映射成Action 接受state作为参数 返回一个对象 用来建立UI组件的参数到store.dispatch方法的映射
        > Provider组件
        - connect方法生成容器组件后 要让容器组件拿到state对象 才能生成UI组件的参数 React-Redux提供Provider组件 让容器组件拿到state
10. 中间件 &redux-saga & redux-thunk
    1. 什么是中间件以及为什么要引入中间件
        - Redux的基本做法 用户发出Action Reducer函数计算出新的state View重新渲染
        - Action发出后 Reducer立即算出State 这叫同步 Action发出以后 一段时间再执行Reducer 异步
        - 中间件就是一个函数 对store.dispatch进行了重定义 在发出Action和执行Reducer之间 添加了新功能
    2. 中间件的使用
        - applyMiddlewares 方法是Redux原生方法 作用是将所有中间件组成一个数组 依次执行
        - createStore方法可以接收整个应用的初始状态做参数 则applyMiddleware就是第三个参数
        - 中间件有次序要求 如logger要放在最后 否则输出结果不正确
    3. redux-saga中间件
        - redux-saga是一个用于管理应用程序 Side Effect (副作用 如异步获取数据 访问浏览器缓存等)的library 它的目的是让副作用管理更容易 执行更高效 测试更简单 处理故障时更容易
        - redux使用ES6的Generator功能 让异步的流程更易于读取
        > saga辅助函数
        1. takeEvery 
            - 允许多个fetchData实例同时启动 
        2. takeLatest
            - 任何时刻 takeLatest只允许一个fetchData任务启动 
        > Effect Creator
        1. take(pattern)
        2. put(action)
        3. call(fn,...args)
        4. fork(fn,...args)
        5. select(selector,...args)
        6. delay
    4. redux-thunk中间件
        - redux作者给出的中间件 实现极为简单 十多行代码
    5. redux-saga&redux-thunk区别
        1. 对于redux-thunk整个流程来说 它是等异步任务执行完成之后 再去调用dispatch 然后去store调用reducers
        2. 对于redux-saga整个流程来说 它是等执行完action和reducer之后 判断reducer中有没有这个action
        3. redux-thunk和redux-saga处理异步任务时机不同
11. 副作用 Effect 纯函数
    - 纯函数
        - 纯函数是函数式编程的概念 必须遵循以下约束
        1. 不得改写参数
        2. 不能调用系统I/O的API
        3. 不能调用Date.now或Match.random()等不纯的方法 因为每次会得到不一样的结果
12. saga-duck
    - 传统的集中式状态管理 所有状态管理都放在store文件夹下管理
    - 分布式状态管理
        - 各个模块的状态分布到具体的模块中进行单独管理 再细粒度一年即将各个组件的状态分布到具体的组件中进行单独管理
        - 每个组件包含两个文件 视图UI.tsx 状态Duck.ts
            - Duck.ts 存储组件所用到的状态
            - UI.tsx中消费状态 在视图中派发action也派发到各自reducer中
        - 将各个组件的状态分布到具体的组件中进行单独管理 相当于给每个组件都分配了一个小型的状态仓库
        - duck就是一个小型的状态仓库 视图里所有状态的变更都归拢到duck中 一个组件中duck.ts负责逻辑 ui.tsx负责展示
    > 一个duck.ts包含
    1. quickTypes 类似redux将要派发出的动作类型type types.xxx引用
    2. reducers redux中reducer 指定应用状态的变化如何响应action并提交到store中 解决代码冗余 类型缺失 saga-duck提供工具方法 reduceFromPayload
    3. creators redux中actionCreator 用来生成action对象 createToPayload 
    4. rawSelectors 类似Vue中计算属性computed 本身不是状态 通过某几个状态聚合派生出来
    5. quickDucks 
    6. saga
13. 虚拟dom &vue中虚拟dom
    - 虚拟DOM是真实DOM在内存中的表示 
14. props和state
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
    1. 用setState修改State 直接修改state 组件不会重新触发render() setState()调度对组件state对象的更新 
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
15. 生命周期
    > 生命周期的三个阶段(旧)
    1. 初始化阶段 由ReactDOM.render()触发--初次渲染
        1. constructor()
        2. componentWillMount() 
        3. render()
        4. componentDidMount() 常用 页面一上来做点什么
            一般在这个钩子中做一些初始化的事情 
            例如 开启定时器 发起网络请求 订阅消息
    2. 更新阶段 由组件内部this.setState()或父组件更新render函数
        1. shoudComponentUpdate()
        2. componentWillUpdate()
        3. render() 必要
        4. componentDidUpdate()
    3. 卸载组件 由ReactDOM.unmountComponentAtNode()触发
        1. componentWillUnMount() 常用
            一般在这个钩子中做一些收尾的事
            关闭定时器 取消订阅消息
    > 生命周期的三个阶段(新)
    - 常用的三个生命周期钩子
        - render
        - componentDidMount
        - componentWillUnmount
    - 即将废弃的三个生命周期钩子
        - componentWillMount
        - componentWillWillRecieveProps
        - componentDidUpdate
    1. 初始化阶段 由ReactDOM.render()触发 初次渲染
        1. constructor()
        2. getDerivedStateFromProps()
        3. render()
        4. componentDidMount()
    2. 更新阶段 由组件内部this.setState()或父组件重新render触发
        1. getDerivedStateFromProps()
        2. shouldComponentUpdate()
        3. render()
        4. getSnapshotBeforeUpdate()
        5. componenDidUpdate()
    3. 卸载组件 由ReactDOM.unmountComponentAtNode()触发
        1. componentWillUnmount()
    > 什么时候会用到componentWillreceiveprops
    1. 执行场景
        - 在已经挂载的组件(mounted component)接收到新prop时触发
        - 在除了第一次生命周期(componentWillMount->render->componentDidMount)之后的生命周期中出发
    2. 解释
        - 如果需要在props发生变化(或新传入的props)来更新state 可能需要比较this.prosp和nextProps 然后使用this.setState()方法来该改变this.state
    3. 注意
        1. React可能会在props传入时及时没有发生变化时也发生重新渲染 所以如果想自己处理改变 确保比较props 当前值和下一次值 这可能会造成组件重新渲染
        2. 如果指示调用this.setState()而不是从外部传入props 那么不会触发componentWillReceiveProps(nextprops)函数 

18. react router
    > 声明式路由 函数式路由
    1. 声明式  <NavLink to='/products'/>
    2. 函数式  history.push('/produts')
    - 可以把<Route>组件放在任何想要渲染路由的地方 因为<Route><Link>以及其他的React Router的APIS都只是组件而已
    > React Router不是Facebook开发的官方路由解决方案 它只是一个第三方库 因其设计和简单性而广受欢迎
    
    > React Router库包含三个包 react-router react-router-dom react-router-native 路由操作相关的核心包是react-router web应用会使用到react-router-dom react native使用react-router-native

    > Router组件
    - 将<App>组件包裹在一个<Router>组件中 由于正在建立的是一个基于浏览器的web应用程序 可以使用react router api的两种类型的路由
        1. BrowserRouter http://example.com/about
            - BrowserRouter更受欢迎些 因为它使用的是H5 History API来保持应用的页面和URL同步
        2. HashRouter http://example.com/#/about
            - HashRouter使用的是URL的哈希(window.location.hash)部分 如果代码运行在不支持History API的传统浏览器上 应该使用HashRouter 否则BrowserRouter
        > 区别
        1. BrowserRouter要求服务端对发送不同的URL都要返回对应的HTML 服务端拿到的事完整的URL 切换到的服务端没有走相关处理的页面路由 404
        2. HashRouter在URL中使用哈希符号(#)来使服务端忽略#后面所有的URL内容 服务端拿到的是前面的部分 后面的路由/home 或/about将全部交给客户端(即SPA应用)来处理并渲染对应的页面 所以任意的路由进行页面刷新都不会是404
        > history
        - 这个库可以在js运行的任何地方都能轻松管理会话历史 history对象抽象化了各个环境的差异 并提供最简单易用的API管理历史堆栈 导航 并保持会话之间的持久化状态
        - 每个<Router>组件都会创建一个history对象 它记录当前的位置(history.location)还记录了堆栈中以前的位置 当前位置发生变化时 页面会被重新渲染 此时会有一种导航跳转的感觉
        - 如何做到的导航跳转 history对象暴露了一些方法 如history.push history.replace
        - 点击一个<Link>组件时 history.push会被调用
        - 点击一个<Redirect>组件时 history.replace会被调用
        - 其他方法如hostory.goBack和histort.goForwar可以用来在历史堆中回溯或前进
    > Link&Route组件
    -   
        - <Route>组件是React Router中最重要的组件 如果当前位置和陆游的路径匹配 就会渲染相应的UI 理想情况下 <Route>组件应该有一个名为path的属性 如果路径名称和当前位置匹配 它就会被渲染
        - <Link>组件被用来在页面之间进行导航 它其实就是TML<a>标签的上层封装 在其源码中用event.preventDefault禁止了其默认行为 然后使用history API自己实现了跳转 使用<Link>组件来导航到一个目标URL可以在不刷新页面的情况下重新渲染页面
        - 传入exact实现精确匹配
        ```
        <Route exact path="/">
            <Home/>
        </Route>
        ```
    > 嵌套路由
    - <Route>渲染一个页面/组件的最佳方式是使用子元素方式 还有一些其他的方式 这些方式是为了兼容在没有引入hooks之前早期版本的React Router构建的App
        1. component:当URL匹配时 React Router会使用React.createElement从给定的组件创建一个React元素
        2. render: 
        3. children
    > 路径和匹配
    - 属性path是用于识别路由应该被匹配到的URL部分· 它使用path-to-regexp库将字符串形式的path转换为一个正则表达式 然后将它与当前的位置进行匹配
    - 如果路由的path与当前位置完全匹配时 一个match对象就会被创建 这个对象中有关于URL和路径的更多信息 这些信息可以通过这个对象的属性来访问
        1. match.url 一个字符串 返回URL匹配的部分 这对于构建嵌套的<Link>组件
        2. match.path 一个字符串 返回路由的path 即<Route path=""> 用它构建嵌套的<Route>组件
        3. match.isExact 一个布尔值 如果·匹配精确 即没有任何尾部字符 则返回true
        4. match.params 一个对象object 返回的是从URL中解析出来的键值对
    
    > 属性的隐式传递
    - 当使用component属性渲染路由时 match location 及history这些路由属性是隐式传给被渲染的组件

    > Switch
    - 有了Switch只有第一个与当前URL匹配到的子<Route>才会被渲染
    - path的:id部分用于动态路由 它将匹配斜杠后面的任何东西 且这个匹配到的值在被渲染的组件中是可以拿到的

    > 动态嵌套路由
    > 带路径的嵌套路由
    > 权限路由

    1. 基本的导航路由
    2. 嵌套路由
    3. 带路径参数的嵌套路由
    4. 权限路由

    - React是一个用于构建用户界面的JS库 它是单页面应用SPA
    - 只有一个页面 它是没有路由导航机制的 这时需要一种路由机制 以便在不同视图间切换而不用刷新整个页面
    1. 安装react-router-dom
    ```
    yarn react-router-dom
    ```
    - React Router库中几个不同的npm依赖包 每个包都有不同的用途
        1. react-router: 实现路由的核心功能 用作下面几个包的运行时依赖项(peer dependency)
        2. react-router-dom: 用于React WEB应用的路由以来 
        3. 
        4. 
    2. 配置路由
        - 为了使安装的路由库在React应用中可以使用 首先要从react-router-dom中导入BrowserRouter
        - 如果需要导航到应用中所需要的任意页面 必须使用BrowserRouter作为最顶层组件包裹其他组件
        - Router本身并不能实现页面跳转 因为还没有配置路径和页面组建的映射关系
    3. 渲染路由
        - 为了渲染出路由 需要导入Route组件
        ```
        <Route path = "/" render={()=><h1>11</h1>}/>
        ```
        - Route组件有很多属性
            - path:页面的路径 在上面的代码中 定义了/路径用于导航到首页
            - render:path对应的页面渲染的是什么 上述代码中渲染了一个<h1>标签
            - component: 把render属性替换成component就可以渲染Home组建了
        - 前端页面不止一个 要建立多个页面与路由进行映射 然后进行页面之间的跳转
    4. 使用Link进行页面跳转
    5. 在路由中传递参数
    6. 使用JS代码实现页面跳转
        - 通过Route作为顶层组件包裹其他组件后 页面组件就可以接收到一些路由相关的东西 比如props.history
        - props中接收到的history对象具有一些方便的方法如goBack goForwar push等 代码中使用push方法跳转到主页
    7. 重定向到其他页面
    8. 重定向到404页面
    9. 路由守卫
    10. Router Hooks
        - Router hooks可跟噶容易访问到history location 路由参数等等
        1. useHistory
            - useHistory帮助我们直接访问到history而不需要通过props访问
        2. useParams
            - useParams帮助我们直接访问到路由参数 而不需要通过props访问
        3. useLocation
            - useLocation会返回当前url的location对象
    > 小结
    - React Router可以在一个页面模拟出多页面的情况 并具有很高的可用性(归根结底 它仍然是单页面应用)
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
23. react render方法原理
    - 使用React进行构建应用时 总会有一个步骤将组件或虚拟DOM元素渲染到真实的DOM上 将任务交给浏览器 进而进行layout和paint等步骤 这个函数就是React.render()
    > 该函数接口定义
    ```
    ReactComponent render(ReactElement element,DOMElement container,[function callback])
    ```
    - 接收2-3个参数 并返回ReactComponent类型的对象 当组件被添加到DOM中后 执行毁掉函数 这里涉及到两个React类型 ReactComponent & ReactElement 
    > ReactElement
    - ReactElement类型通过函数React.createElement创建 
    ```
    ReactElement createElement(string/ReactClass type,[object props],[children...])
    ```
    1. 第一个参数可以接受字符串(p div 等HTML的tag)/ReactClass
    2. 第二个参数为传递的参数 第三个为子元素可以为字符串和ReactElement
    - ReactElement有4个属性 type ref key props 且轻量没有状态 是一个虚拟化的DOM元素
    > ReactComponent
    - React的核心是ReactElement类型 但精髓是ReactComponent即组件 
    - 一个组件类必须要实现一个render方法
    - 这个render方法必须返回一个JSX元素
    - 必须要用一个外层的JSX元素把所有内容包裹起来 返回并列多个JSX元素是不合法的
    - JSX中可以插入JS表达式 表达式返回的结果会相应渲染到页面上
25. React性能优化 shouldComponentUpdate PureComponent React.memo
    - shouldComponentUpdate PureComponent是类组件中的优化方法 React.memo是函数组件中的优化方式
    1. shouldComponentUpdate
        - React提供生命周期函数shouldComponent 根据它的返回值(true|false) 判断React组件的输出是否受当前state/props影响 默认行为是state每次发生变化组件都会重新渲染
        - shouldComponentUpdate方法接收两个参数nextProps和nextState 可以将this.props和nextProps以及this.state和netState进行比较 并返回false以告知React可以跳过更新
    2. React.PureComponent
        - React.PureComponent与React.component相似 两者区别在于React.Component并未实现shouldComponentUpdate 而React.pureComponent中以浅层对比prop和state方式来实现了该函数
        - 当组件的props和state均为基本类型时 使用React.PureComponent可起到优化性能的作用 如果对象中包含复杂的数据类型 有可能因为无法检查深层的差别产生错误的对比结果
        - 传递引用类型数据时 shouldComponentUpdate和React.PureComponent存在一定局限性 针对该问题 官方给出两个解决方案
            1. 在深层数据结构发生变化时调用forceUpdate()来确保组件被正确的更新(不推荐使用)
                - 当明确知道父组件Parent修改了引用类型的数据(子组件的渲染依赖于这个数据)此时调用forceUpdate()方法强制更新子组件 forceUpdate()会跳过子组件的shouldComponentUpdate()
            2. 使用immutable对象加速嵌套数据的比较(不同于深拷贝)
                - immutable.js是Facebook在2014年推出的持久性数据结构的库 持久性指数据一旦创建 就不能再被改变 任何修改或添加删除操作都会返回一个新的Immutable对象 更容易去处理缓存 回退 数据变化监测等问题 简化开发 并提供大量类似原生JS方法 还有Lazy Operation的特性 完全的函数式编程
    3. React.memo
        - React.memo为高阶组件 它与React.PureComponent非常相似 但只适用于函数组件 而不适用于类组件
        - React将跳过渲染组件的操作并直接复用最近一次渲染的结果
        - React.memo仅检查props变更 如果函数组件被React.memo包裹 且其实现中拥有useState或useContext的Hook 当context发生变化 它仍会重新渲染
        - 默认情况下其只会对复杂对象做浅层比较 如想控制对比过程 将自定义的比较函数通过第二个参数传入实现
    > 小结
    1. 类组件中:shouldComponent()和React.PureComponent在基本数据类型传递时都可以起到优化作用 当包含引用类型数据传递时 shouldComponentUpdate()更合适一些
    2. 函数组件: 使用React.memo
26. class与className
    > 之前为什么要使用classname
    - class是JS的保留关键字 JSX是JS的扩展 
    > 现在React中可以使用classname
    - React的JSX虽然看着像HTML 但本质还是JS Vue的JSX看着像React中的JSX 但是更接近于template
    - 从React16开始 可以直接使用class 也可以同时使用class和className 但是className优先级高
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
    > setState是同步还是异步的 
    1. 钩子函数和React合成事件中的setState
        1. 调用setState不会立即更新
        2. 所有组件使用的是同一套更新机制 当所有组件didmount后 父组件didmount 然后执行更新 
        3. 更新时会把每个组件的更新合并 每个组件只会触发一次更新的生命周期
    2. 异步函数和原生事件中的setState
        1. 在父组件didmount后执行
        2. 调用setState同步更新
    > 为什么有时连续两次setState只有一次生效
    1. 直接传递对象的setState会被合并成一次
    2. 使用函数传递state不会被合并
    > setState执行过程
    > 小结
    1. 钩子函数和合成事件中
    。。。
    2. 异步函数和原生事件中
    。。。
    3. partialState合并机制
        - 如果传入的是对象 很明显会被合并成一次
        - 如果传入的是函数 函数的参数preState是前一次合并后的结果 所以计算结果是准确的
    4. componentDidMount调用setState
        - 不推荐直接在componentDidMount直接调用setState，由上面的分析：componentDidMount本身处于一次更新中，我们又调用了一次setState，就会在未来再进行一次render，造成不必要的性能浪费，大多数情况可以设置初始值来搞定。
        - 当state初始值依赖dom属性时，在componentDidMount中setState是无法避免的。
    5. componentWillUpdate componentDidUpdate
        - 这两个生命周期中不能调用setState 
        - 其中调用会造成死循环 导致程序崩溃
    6. 推荐的使用方法
        - 在调用setState时使用函数传递state值 在回调函数中获取最新更新后的state
34. react事件机制
    - 为了解决跨浏览器兼容性问题 SyntheticEvent实例将被传递给时间处理函数 SyntheticEvent是React跨浏览器的浏览器原生事件包装器 它拥有和浏览器原生事件相同的接口 包括stopPropagation()和preventDefault()
    - React实际上并不将事件附加到子节点本身 React使用单个事件侦听器侦听定策的所有事件 这对性能有好处 意味React在更新DOM时不需要跟踪事件监听器
    
    1. 用户在为onclick添加函数时 react并没有将click事件绑定在dom上面
    
    2. 是在document处监听所有支持的事件，当事件发生并冒泡至document处时 react将事件内容封装交给synthetic event/合成事件(负责所有事件合成)
    
    3. 当事件触发时，对使用统一的分发函数dispatchEvent将指定函数执行
35. React事件委派
    - React不会把事件绑定到真实节点上 而是绑定到结果的最外层 使用统一的事件监听器 这个监听器维持一个映射来保存所有组件内部的事件监听和处理函数
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
35. react 函数式/无状态组件和类组件/有状态组件区别
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
37. 高阶组件 高阶函数
    - 高阶函数 一种特别的函数 接受的参数为函数 或返回值也是函数 
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
    - React Element 通过React.createElement创建(语法糖:JSX)
    > React节点
    - 专门用于渲染到UI界面的对象 React会通过React元素 创建React节点 ReactDOM一定是通过React节点来渲染的
    - 节点类型
        1. React DOM节点
        2. React组件节点
        3. React文本节点
        4. React空节点
        5. React数组节点
    > 真实DOM
    - 通过document.createElement创建的的dom元素
        > react中最小基本单位 可以使用jsx语法轻松创建一个react元素
        ```
        const element = <div className="element">element</div>
        ```
        > react元素不是真实的dom元素 它仅仅是js的普通对象(plain objects)无法直接调用dom原生的api 
        > 除了使用jsx(是react.createElement语法糖)语法 还可以使用react.createElement() react.cloneElement()来构建react元素
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
41. React Fiber
    - 官方 - React Fiber是对核心算法的一次重新实现
    > 现有React的局限
    1. 同步更新过程中的局限
        - 现有React中 更新过程是同步的 这可能导致性能问题 
        - 现有React版本 组件树很大时 会出现界面卡顿 因为更新过程是同步的一层组件套一层组件 逐渐深入的过程 在更新完所有组件之前不停止 函数的调用栈很深 且很长时间不会返回
        - 因为JS单线程的特点 每个同步任务不能耗时太长 不然就会让程序不会对其他输入做出反应 React更新现存这个问题 React Fiber就是用来改变这个问题
    > React Fiber方式
    - 分片 把更新过程碎片化 每执行完一段更新过程就把控制权交还给React负责任务协调的模块 没有紧急任务则继续更新 有紧急任务做紧急任务
    - 维护每一个分片的数据结构 就是Fiber
    > 为什么叫Fiber
    - 进程(Process) 线程(Thread) 纤维(Fiber) 比线程控制的更精密的并发处理机制
    > Fiber对现有代码的影响
    - 一个更新过程可能会被打断 所以一个React Fiber一个更新过程被分为两个阶段(Phase)
        1. 第一个阶段 Reconciliation/和解 Phase
            - React会找出需要更新哪些DOM 这个阶段是可以被打断的
        2. 第二个阶段 Commit Phase
            - 一鼓作气把DOM更新完 绝不会被打断
    - 与我们相关的就是生命周期
    1. 第一阶段调用
        - componentWillUnmount
        - componentWillReceiveProps
        - shouldComponentUpdate
        - componentWillUpdate
    2. 第二阶段调用
        - componentDidMount
        - componentDidUpdate
        - componentWillUnmount
    - 原有React中 每个生命周期函数 在一个加载或更新过程中绝对只会被调用一次 在React Fiber中 第一阶段的生命周期函数在一次加载和更新过程中可能会被多次调用

    - fiber是React16中新的细条引擎或重新实现核心算法 它的主要目标是支持虚拟DOM的增量渲染
    - React Fiber目标是提高其在动画 布局 手势 暂停 中止 或重用等方面的适用性 并为不同类型的更新分配优先级 以及新的并发原语
    - 主要特性是增量渲染 能够将渲染工作分割成块 并将其分散到多个帧

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
43. 状态提升- Lefting State Up
    - 将两个组件需要共享的数据保存在共同的父组件中 然后子组件通过props获取父组件数据
    - 子组件可以调用父组件的方法去更新父组件
    - 一个组件的state只能由这一组件的方法来改变 且只能通过setState()改变
    - 组件的事件处理程序必须绑定this到该组件的构造函数中
        - 在React的类组件中 当把事件处理函数引用作为回调传递过去 事件处理程序方法会丢失其隐式绑定的上下文 当时间被触发并处理程序被调用时 this的值会退回默认绑定 其值为undefined 这时因为类声明和原型方法是以严格模式运行
    - React的render()只能返回一个节点
    - 状态提升思想其实就是将子组件的state提升到父组件 然后这个父组件的任何子组件就能使用这个state 从而达到多个组件之间共享state的目的
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
54. super(props)有什么意义
    - 如果用到了constructor就必须写super() 是用来初始化this的 可以绑定事件到this上 
    - 如果没用到constructor 是可以不写的 React会默认添加一个空的constructor(虽然是空的constructor 但里面应该有super)

    - 调用super()方法之前 子类构造函数无法使用this引用 ES6字类也是如此 将props参数传递给super()调用的主要原因是在子构造函数中能够通过this.props获取传入的props
    > 为什么调用super()
    - JS中super值的是父类的构造函数 React中 引用的自然就是React.Component
    - 调用父类构造函数之前 不能在构造函数中使用this 这不是React的限制 而是JS的限制
    - JS强制要求 如果想在构造函数中使用this 必须首先调用super 先让父类做完自己的事 这一限制也被应用到React组件
    > 为什么传入props 也可不传
    - 需要给super传入props 否则React.Component无法初始化this.props
    - 不过即使漏传props 直接调用super() 仍然可以在render和其他方法中调用this.props
    - 因为React会在构造函数被调用之后 把props赋值给刚刚创建的实例对象
    - 但是最好还是使用super(props) 而不是super()
    - 虽然React会在构造函数运行之后为this.props赋值 但在super()调用之后与构造函数结束之前 this.props仍然无法使用
55. react中的return 什么时候用小括号 什么时候用大括号
    - JSX转为JS后 JS会在每行自动加';' 如果return后换行了 就会变成return； 如果不加括号 需要右内容和return在同一行
    - 对于return的内容 只能有一个根结点 所有返回的内容必须有一个tag进行包裹 否则不管加不加括号都是不行的
    1. return(
        <div></div>
    )
    2. return(
        <Component/>
    )
    3. return {
        ...
    }
    1. html 
    2. react组件
    3. js对象
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
        - React实现了Synthetic Event层处理事件
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
64. Mixin 为什么在React推荐使用HOC而不是mixins实现组件复用
    > 什么是mixins
    - 混入mixin提供一种非常灵活的方式 来分发Vue组件中的可复用功能 一个混入组件可以包含任意组件选项 当组件使用混入对象时 所有混入对象的选项被混合进入该组件本身的选项
    1. Mixins引入了不清晰的依赖关系
        - 组件采用了mixins的state和方法 mixins采用了组件的方法 或者mixins又依赖了其他的mixins 这样导致组件和mixins有强耦合的关系 这些关系不是存在同一个文件中 修改组件或修改mixins都是非常危险的行为
    2. mixins导致命名冲突
        - mixins中的state和方法和组件或其他的mixins发生冲突
    3. mixins导致滚雪球般的复杂度
        - 由于之前mixins和组件以及mixins高度耦合 导致新需求出现时 管理代码的复杂度会直线上升 

    1. 被否定 是因为Mixins机制是让多个Mixins共享一个对象的数据空间 这样很难确保不同Mixins依赖的状态不发生冲突
    2. hook直接用在function 而不是class 另一方面每个hook都是相互独立的 不同组件调用同一个hook也能确保各自状态的独立性 这就是两者的本质区别
65. React Hooks&class组件对象
    1. React-hook解决的问题
        - hooks通常支持提取和重用多个组件通用的有状态逻辑 而无需承担高阶组件或渲染props的负担 hooks可以轻松操作函数组件的状态 而不需要将它们转换为雷组建
        1. 函数组件中不能拥有自己的状态(state) 在hooks之前函数组件是无状态的 都是通过props来获取父组件的状态 但是hooks提供了useState来维护函数组件内部的状态
        2. 函数组件中不能监听组件的生命周期 useEffect聚合了多个生命周期函数
        3. Class组件中生命周期较为复杂
        4. Class组件逻辑难以复用(HOC render props)
    2. hooks对比class的好处
        1. 写法更简洁
        2. 业务代码更加聚合
        3. 逻辑复用方便
            - class组件的逻辑复用通常用render props以及HOC两种方式 react hooks提供了自定义hooks来复用逻辑
    3. hooks常见的一些API使用
        1. useState
        - 语法
        ```
        const [value,setValue] = useState(0)
        ```
        - 这种语法方式是ES6的数组结构 数组的第一个值是声明的状态 第二个值是状态的改变函数
            - 每一帧都有独立的状态
            - 每一帧独立的状态采用了闭包的方法来实现
            - 当组件的状态或props更新时 该函数会被重新调用渲染 且每一次的渲染都是独立的都有自己独立的props以及state 不影响其他的渲染
        2. useEffect
        - 语法
        ```
        useEffect(()=>{
            return()=>{

            }
        },[dep])
        ```
        - useEffect接收一个回调函数及依赖项 当依赖项发生变化时才会执行里面的回调函数 
        - useEffect类似class组件 componentDidMount componentDidUpdate ComponentWillUnmount的生命周期函数
            > PS:
            1. useEffect是异步的在组件渲染完成后才会执行
            2. useEffect的回调函数只能返回一个清除副作用的处理函数或不反悔
        3. useMemo useCallback
        - useMemo &useCallback主要用于减少组件更新次数 优化组件性能
            1. useMemo接收一个回调函数以及依赖项，只有依赖项变化时才会重新执行回调函数
            2. useCallback接收一个回调函数以及依赖项 并返回该回调函数的memorize版本 只有在依赖项重新变化时才会有新的memorize版本
        - 语法
            ```
            const memoDate = useMemo(()=>data,[dep])
            const memoCb = useCallback(()=>{},[dep])
            ```
        > 优化组件性能时
        - 针对class组件一般使用React.PureComponent PureComponent会在shouldUpdate时进行一次比较 判断是否需要更新
        - 针对函数组件一般使用React.memo但是在使用react hooks时 由于每一次渲染更新都是独立的(生成了新的状态)即使使用了React.memo 也还是会重新渲染
        4. useRef
        - useRef类似React.createRef
        ```
        const node = useRef(initRef)
        ```
        - useRef返回一个可变的ref对象 其current属性被初始化为传入的参数(initRef)
        > 作用在dom上
        ```
        const node = useRef(null);
        <input ref = {node}>
        ```
        - 这样可以通过node.current属性访问到该DOM元素
        - useRef创建的对象在组件的整个生命周期内保持不变 每次重新渲染函数组件时 返回的ref对象都是同一个(使用React.creatRef 每次重新渲染组件都会重新创建ref)
        5. useReducer
        - useReducer类似于redux中的reducer
        - 语法
        ```
        const [state,dispatch] = useReducer(reducer,initstate)
        ```
        - useReducer传入一个计算函数和初始化state 类似redux 通过返回的state可以访问状态 通过dispatch可以对状态作修改
        6. useContext
        - 通过useContext可以更方便的获取上层组件提供的context
        - 。。。。
        7. useLayoutEffect
        - ....
67. Flux和Redux
    - React框架本身只应用于View 如果基于MVC模型开发 还需要Model和Controller层 这样催生了Flux的产生 而Redux是基于Flux理念的一种解决方式
    - Flux
        - Flux框架也是一种MVC框架 不同于传统的MVC 它采用单向数据流 不允许Model和Control互相引用
        - Flux框架大致
        1. Actions: 驱动Dispatcher发起改变
        2. Dispatcher: 负责分发动作(事件)
        3. Store: 存储数据 处理数据
        4. View: 视图部分
        - Dispacther只会暴露一个函数dispatch 接受action为参数 发起动作 如果需要增加新功能 不需要改变或增加接口 只需增加Action类型 - - Dispatch初始化和更新如下
        ```
        // Dispatcher.js
        import {Dispatcher } from 'flux'
        export default 

        //actions
        import AppDispatcher from './Dispatcher.js'
        
        export const increment = (number)=>{
           AppDispatcher.dispatch({
               type:'ADD',
               value:number
           }) 
        }
        ```
        - Store一般会继承EventEmitter 实现事件监听 发布 卸载 需要将store注册到Dispatcher实例上才能发挥作用
        - Store可以直接修改对象 这点和Redux不同
        - view组件中的state应该与Flux store保持一致
        - Flux缺点
            1. 一个应用可以拥有多个store 多个store之间可能有依赖关系(相互引用)
            2. Store封装了数据和处理数据的逻辑
        - 针对Flux的不足 Redux框架出现
    - Redux
        - 相比Flux Redux有以下两个特点
        1. 在整个应用中只提供一个store 它是一个扁平的树形结构 一个节点状态应该只属于一个组件
        2. 不允许修改数据 即不能修改老状态 只能返回新状态
        - 不同于Flux Redux没有dispatcher的概念(Store已经集成了dispatch方法 所有不需要Dispatcher) 它依赖纯函数Reducer来替代事件处理器 
        > 纯函数
        - 计算机编程中 加入满足下面两个句子的约束 一个函数可能被描述为一个纯函数
        1. 给出相同的参数值 该函数总是求出同样的结果 该函数结果值不依赖任何隐藏信息或程序执行处理可能改变的状态在程序的两个不同的执行
    - 组件Context
        - Flux Redux都需要显性地在View里引入store import store from './Store' 一个应用中 只引入一次store 然后所有组件都可以访问到 React提供Context
        - Context就是上下文环境 让一个树状组件上所有组件都能访问一个共有的对象
68. react中的render props
    1. 解决的问题
        - render props和高阶组件HOC一样 是为了给纯函数组件加上state 响应react的生命周期
    2. 基本原理
        - HOC基本原理可以写成这样
        ```
        const HOCFactory = (Component)=>{
            return class HOC extends React.Component{
                render(){
                    return <Component {...this.props}>
                }
            }
        }
        ```
        - HOC最大特点是接受一个组件作为参数 返回一个新的组件
    3. 优劣分析
        > HOC
        - 优点
        1. 支持ES6 
        2. 复用性强 HOC是纯函数且返回值仍为数组 在使用时可以多层嵌套 不同情境下使用特定的HOC方便调试
        3. HOC是纯函数 支持传入多个参数 增强其适用范围
        - 缺点
        1. 多个HOC一起使用时 无法直接判断子组件的props是哪个HOC负责传递的
        2. 重复命名问题 若父子组件有同样名称的props 或使用的多个HOC中存在相同名称的props 则存在覆盖问题 且react不会报错 可以通过规范命名空间的方式避免
        3. react开发者工具中观察HOC返回结构 发现HOC产生许多无用组件 加深了组件层级
        4. HOC使用了静态构建 即当AppWithMouse被创建时 调用了一次withMouse中的静态构建 而在render中调用构造方法才是react所倡导的动态构建 于此同时在render中构建可以更好地利用react的生命周期
        > Render Props
        - Render Props核心思想是 通过一个函数将class组件state作为props传递给纯函数组件
        > 核心分析
        - 新建的Mouse组件的render方法中返回了{this.props.render(this.state)}这个函数 将其state作为参数传入其的props.render方法中 调用时直接取组件所需的state即可
        - 优势
        1. 支持ES6 和HOC一样
        2. 不同担心prop命名问题 在render函数中只取需要的state
        3. 相较于HOC 不会产生无用的空组件加深层级
        4. 这里的构建模型是动态的 所有改变都在render中触发 能更好的利用react的生命周期
        > 选择
        1. render props大多数情况下比HOC更直观也利于调试
        2. 另一方面HOC可传入多个参数的特性简洁代码
69. 几种常见状态管理模式 Flux Redux Vuex Mobx
    > 状态管理
    - 把组件之间需要共享的状态抽取出来 遵循特定的约定 统一来管理 让状态的变化可以预测
    > 为什么需要
    1. 状态共享
        - 需要将共享的状态提升至公共的父组件 若无公共的父组件 往往需要自行构造
        - 状态由父组件自上而下逐层传递 若组件层级过多 数据传递会变得很冗杂
    2. 变化追踪

    > Store模式
    - Store模式是一种相对简单的状态管理模式 一般有以下约定
        1. 状态存储在外部变量store里(也可以是全局变量)
        2. store中的state用于存储数据 由store实例维护
        3. store中的actions封装了改变state的逻辑
        - 如果对state的变更均通过actions 则实现记录变更 保存快照 历史回滚就会很简单 但store模式没有对此进行强制约束

    > Flux模式
    - Flux是一种架构思想 类似于MVC MVVM
    - Flux组成 Flux把一个应用分为四部分
        1. View 视图层
        2. Action 动作 即数据改变的消息对象(可通过事件触发 测试用例触发等)
            - Store的改变只能通过Action
            - 具体Action的处理逻辑一般放在Store里
            - Action对象包含type(类型)与payload(传递参数)
        3. Dispatcher 派发器 接收Actions 发送给所有的store
        4. Store 数据层 存放应用状态和更新状态的方法 一旦发生变动 就提醒Views更新页面
        - PS: Action本质是一个纯声明式的数据结构 仅提供对事件的描述 不提供事件的具体逻辑 通常会给Action的type属性赋值一个大写的字符串表明是常量 增强可维护性
    - Flux特点
        1. 单向数据流 视图时间或外部测试用例发出Action 经由Dispatcher派发给Store Store会触发相应的方法更新数据 更新视图
        2. Store可以有多个
        3. Store不仅存放数据 还封装了处理数据的方法

    > Redux模式
    。。。
    - Redux特点
        1. 单向数据流
        2. 单一数据源 只有一个store
        3. state是只读的 每次状态更新后只能返回一个新的state
        4. 没有Dispatcher 而是在store中集成了dispatch方法 store.dispatch()是View发出Action唯一途径
        5. 支持使用中间件 管理异步数据流

    > Vuex
    - Vuex是Vue的状态管理模式
    - Vuex的核心概念
        1. Store Vuex采用单一状态树 每个应用仅有一个Store实例 该实例包含state actions mutations getters modules
        2. State Vuex为单一数据源
            - 可以通过mapState辅助函数将state作为计算属性访问 或将通过Store将State注入全局后使用this.$store.state访问
            - State更新视图是通过Vue的双向绑定机制实现的
        3. Getter
            - Getter作用和filters有一些相似 可以将State进行过滤后输出
        4. Mutation
            - Mutation是Vuex中改变State的唯一途径(严格模式下)并且只能是同步操作 Vuex中通过store.commit()调用mutation
        5. Action
            - 一些对State的异步操作可以放在Action中 并通过在Action提交Mutation变更状态
                1. Action通过store.dispatch()方法触发
                2. 可以通过mapActions辅助函数将Vue组件的methods映射成store.dispatch调用(需要先在根节点注入store)
        6. Module
            - 当store对象过于庞大 可根据具体业务需求分为多个Module 每个Module具有自己的state mutation action getter
    - Vuex特点
        1. 单向数据流 View通过store.dispatch()调用Action 在Action执行完异步操作之后通过store.commit()调用Mutation更新State 通过Vue的响应式机制进行视图更新
        2. 单一数据源 和Redux一样全局只有一个Store实例
        3. 只能应用于VUex

    > Mobx
    - Mobx背后的哲学是 任何源自应用状态的东西都应该自动地获得 当状态改变时 所有应用到状态的地方都会自动更新
    - Mobx核心概念
        1. State:驱动应用的数据
        2. Computed values:计算值 如果想创建一个基于当前状态的值 使用computed
        3. Reactions:反应 当状态改变时自动发生
        4. Actions:动作 用于改变State
        5. 依赖收集(autoRun):Mobx中的数据以来基于观察者模式 通过autoRun方法添加观察者
    - Mobx特点
        1. 数据流流动不自然 只有用到的数据才会引发绑定 局部精确更新(细粒度控制)
        2. 没有时间回溯能力 因为数据只有一份引用
        3. 基于面向对象
        4. 往往是多个Store
        5. 代码侵入性小
        6. 简单可扩展
        7. 大型项目使用Mobx会使得代码难以维护
    
    > 小结
    1. Flux Redux Vuex均为单向数据流
    2. Redux和Vuex是基于Flux的 Redux较为范用 Vuex只能用于Vue
    3. Flux和Mobx可以有多个Store Redux Vuex全局只有一个Store(单状态树)
    4. Redux Vuex适用于大型项目的状态管理 Mobx在大型项目中应用会使代码可维护性变差
    5. Redux中引入了中间件 主要用来解决异步带来的副作用 可通过约定完成许多复杂工作
    6. Mobx是状态管理库中代码侵入性最小之一 具有细粒度控制 简单可扩展等优势 但是没有时间回溯能力 一般适合应用于中小型项目中
70. React 组件通信的几种方式
    > 需要组件之间进行通信的几种情况
    1. 父->子
        - React数据流动是单向的 父组件向子组件通信也是最常见的 父组件通过props向子组件传递需要的信息
    2. 子->父
        1. 利用回调函数
        2. 利用自定义事件机制
        - 它与传统回调函数实现方法一样 且setState一般与回调函数成对出现 
    3. 跨级组件通信
        1. 层层组件传递props
        2. 使用context
            - context是一个全局变量 像是一个大容器 在任何地方都可以访问到 可以把要通信的信息放在context上 然后在其他组件中可以随意取到
            - React官方不建议使用大量context 尽管它可以减少逐层传递 但是当组件结构复杂时 我们并不知道context是从哪里传过来的 且context是一个全局变量 
    4. 没有嵌套关系组件之间的通信
        1. 使用自定义事件机制
        - 在componentDidMount事件中 如果组件挂载完成 在组件卸载时 在componentWillUnmount事件中取消事件的订阅
    > 小结
    1. 父组件向子组件通信:props
    2. 子组件向父组件通信:回调函数/自定义事件
    3. 跨级组件通信:层层传递props/context
    4. 没有嵌套关系组件之间的通信:自定义事件
    >PS: 进行组件通信时 主要看业务的具体要求 选择最合适的 当业务逻辑复杂到一定程度 就可以考虑引入Mobx Redux等状态管理工具
71. React中的StrictMode(严格模式)
    - React的StrictMode是一种辅助组件 
    1. 验证内部组件是否遵循某些推荐做法 如果没有 会在控制台给出警告
    2. 验证是否使用已经废弃的方法 如果有 会在控制台给出警告
    3. 通过识别潜在的风险预防一些副作用
72. 为什么类方法需要绑定到类实例
    - JS中 this值会根据当前上下文变化 在React类组件方法中 开发人员通常希望this引用组件的当前实例 因此有必要将这些方法绑定到实例
73. 什么是prop drilling 
    - 构建React应用时 在多层嵌套组件来使用另一个嵌套组件提供的数据 最简单的方法是将一个prop从每个组件一层层传递下去 从源组件传递到深层嵌套组件 
    - 缺点 元本不需要数据的组件复杂 难易维护
    - 避免 使用React Context 通过定义提供数据的Provider组件 并允许嵌套的组件通过Consumer组件或useContext hook使用上下文
74. Flux和MVC
    - 在Web应用程序开发中 MVC是客户端和服务器端应用程序的设计模式
    - Flux是Facebook提出的一种新的应用程序体系结构 它与MVC相同 但侧重于单向数据流
    1. MVC
        - MVC设计中 最好将每一层分开 如视图 模型 控制器 
        - 模型: 管理应用程序域的行为和数据
        - 视图: 表示模型在UI中的显示
        - 控制器: 接受用户输入 操纵模型并导致视图更新
        > 优点
        1. 将表示形式与模型分开提高可测试性
        2. 将视图和控制器分离
        > 缺点
        1. 服务器端 MVC是好的 但是在客户端 大多数JS框架都提供了数据绑定支持 该视图直接与模型进行通信
        2. 问题 view1操作model1 model1更新view2 就像系统具有循环依赖关系一样
        1. 不可预测 
        2. 级联修改
        3. 响应顺序
        4. 有条件响应
    2. Flux
        - Facebook用于构建客户端Web应用程序的应用程序体系结构 它通过利用单向数据流来补充React的可组合视图组件 它更像是一种模式 而不是正式的框架
        - Flux是在MVC模式中进行了一些修改的方法
    - MVC设计模式
    - M 就是 model，即数据模型，负责数据相关的任务，包括对数据的增删改查。
    - V 就是 view，即视图层，即用户能看得到的界面。
    - C 就是 Controller,即控制器，负责监听用户事件，然后调用 M 和 V 更新数据和视图。
    - MVC 其实就是将代码变的结构化的一种抽象概念。

    一些建议：
    1. 所有业务代码放在controller中
    2. 所有的数据库操作的代码放在model中
    3. 所有用户可见的页面放在view中
    4. routes路由只是做简单的路由转发
    5. controller和model以及route都可以根据业务复杂度选择是否分拆多个，分拆的原则是数据库中有几张表，对应有几个controller和model
    6. controller中的方法命名规范要和业务相关，比如登录业务，就可以叫signin，注册业务，就可叫signup
    7. model中的方法命名规范就是CRUD，增删改查：查get*, 删除delete*, 改update*, 增save*
    8. mysql数据库操作完的结果results,一般会有以下几种情况
        1. 如果查询不到，results=[], 可以通过results.length是不是>0，来判断查没查到
        2. 如果查询多条，results=[{},{}...]，可以通过results.length是不是>0，来判断查没查到
        3. 如果查询到一条，results=[{}]，只有一个查询结果对象，仍然可以通过results.length是不是>0，来判断查没查到
        4. 如果是添加记录，results返回一个对象，其中有一个insertId属性，用来获取刚刚插入的这条记录的主键值，可以通过这个值是不是>0，来判断插入是否成功
        5. 如果是删除和修改记录，results返回一个对象，其中有一个affectedRows属性，可以通过这个值是不是>0，来判断删除或修改是否成功
75. propType
76. 构造函数和getInitialState区别
77. 有条件地向React组件添加属性
78. React高阶组件 Render props 和hooks 有什么区别 为什么要不断迭代
    1. 区别
        1. React高阶组件
            - 高阶组件(HOC)是React中用于复用组件逻辑的一种技巧
            - 本质是接收一个组件作为参数 返回一个组件的函数
            - 高阶组件采用装饰器模式 在增强原有组件的功能 并不破坏它原有的特性
            > 优点
            1. 逻辑复用
            2. 不影响被包裹的组件的内部逻辑
            > 缺点
            1. 高阶组件传递给被包裹组件的props如果重名的话 会发生覆盖
        2. Render props
            - Render Props通过父组件将可复用逻辑封装起来 并把数据提供给子组件 
            - 子组件拿到数据后如何渲染 完全由子组件决定 灵活性非常高
            - 高阶组件中渲染结果是父组件决定的 Render Props不会产生新的组件 更加直观地体现了父子关系
            - Render Props作为JSX的一部分 可以很方便地利用React生命周期和Props和State进行渲染 在渲染上有非常高的自由度
            - 大多数情况下 高阶组件和Render Props可以相互转换 用高阶组件能实现的 用Render Props也能实现
            - Render props是一种在React组件之间使用一个值为函数的prop共享代码的技术
            - 即 Render prop是一个告知组件需要渲染什么内容的函数prop
            ```
            Class DadaProvider extends React.Components{
                state= {
                    name:"Alice"
                }
                render(){
                    return(
                        <div>
                            <p>共享数据组件自己内部的render</p>
                            {this.props.render(this.state)}
                        </div>
                    )
                }
            }
            <DataProvider render={
                data =>{<p>共享的render{data.name}</p>}
            }/>
            ```
            - 相较于hooks和hoc render props使用场景较少
            > 优点
            1. 数据共享
            2. 逻辑复用
            > 缺点
            1. 无法在return语句外访问数据
            2. 嵌套
        3. Hooks
            - Hooks是React16.8中新增的特性 可以让你在不编写class的情况下使用state lifecycle 等React特性
            - 通过自定义hook 可以很轻松的实现逻辑复用
            > 优点
            1. 使用直观
            2. 不存在HOC的重命名问题
            3. 不存在render props的嵌套问题
            4. 能在return之外访问数据
        > 区别
        - 三者都用来进行逻辑复用 区别在于高阶组件为接收组件 对其进行包装 Render props为在render中渲染共享数据 hooks以函数调用的形式共享数据
        > 小结
        - 没有Hooks之前 高阶组件和Render Props本质上都是将复用逻辑提升至父组件中 Hooks出现后 将复用逻辑提取到组件顶层 而不是强行提升到父组件中 这样就能够避免HOC和Render Props带来的嵌套地域 
        - 但是 像Context的<Provider/>和<Consumer/>这样有父子层级关系(树状结构关系的)还是只能使用Render Props或HOC
    2. 迭代
        > 大部分情况下 高阶组件和Render props都存在1各自的缺陷
        - 重名问题
        - 嵌套问题
        - 无法在return之外访问数据问题
        - 数据来源不清晰
        > 不断迭代是为了解决上述问题 以更简洁的方式实现组件逻辑复用
    3. hooks能替代高阶组件和Render Props吗
        - hooks出现前 有两种方法可以复用组件逻辑 Render Props和高阶组件 但是这两种方法都可能会造成JSX[嵌套地域]问题 
        - Hooks于React 就像async/await 于Promise
        - 官方回答 在高阶组件或Render Props只渲染一个子组件时 Hook提供了一种更简单的方式 
        - Hooks不能完全替代Render Props和高阶组件
79. 如何避免组件重新渲染
80. 调用setState时 React render是如何工作的
    - 可以将render分为两个步骤
    1. 虚拟DOM渲染:当render方法被调用时 它返回一个新的组件的虚拟DOM结构 当调用setState()时 render会被再次调用 因为默认情况下shouldComponentUpdate总是返回true 所以默认情况下 React是没有优化的
    2. 原生DOM渲染:React只会在虚拟DOM中修改真实DOM节点 而且修改的次数非常少 
81. 如何避免在React重新绑定实例
    - 几种常用方法避免在React中绑定方法
    1. 将事件处理程序定义为内联箭头函数
    2. 使用带有hooks的函数组件
82. JSX嵌套地域
    - JSX被React Docs定义为JS扩展或用于调用React.createElement(component,props,...children)语法糖
    - 它不会直接呈现为HTML 而是呈现为Virtual DOM所使用的React类 
    > JSX工作
    - JSX只是具有某些附加功能的JS 使用JSX可以编写HTML/XML非常相似的代码 但是可以将JS方法和变量混合到代码 JSX由Babel之类的编译器进行 并呈现为UI框架
83. 该使用单个state变量还是多个state变量
    1. 将完全不相关的state拆分成多组state
    2. 如果某些state是相互关联/需要一起发生改变 可以把它们合并成一组state
84. deps依赖过多导致hooks难以维护？
    1. 依赖数组依赖的值最好不要超过3个 否则会导致代码难易维护
    2. 如果依赖过多 应该减少
    3. 去掉不必要的依赖
    4. 将hook拆分为更小的单元
    5. 每个hook依赖于各自的依赖数组
    6. 通过合并相关的state 将多个依赖值聚合成一个
    7. 通过setState回调函数获取最新的state 以减少外部依赖
    8. 通过 ref 来读取可变变量的值，不过需要注意控制修改它的途径
85. useMemo
    1. 使用场景
        1. 计算开销很大 需要记住返回值 避免每次render都去重新计算
        2. 由于值的引用发生变化 导致下游组件重新渲染
    > 小结
    1. 如果返回的值是原始值 string boolean null undefined number symbol则不需要使用useMemo
    2. 对于组件内部用到的object array 函数等 如果没有用到其他hook的依赖数组中 或造成子组件re-render可以不使用
    3. 自定义hook中暴露出来的object array 函数等 都应该使用usememo 以确保当值相同时 引用不发生变化
86. useEffect
    - useEffect是专门用来写副作用的 这也是React的核心所在
    - 依赖数组中必须包含在callback内部用到的所有参数和React数据流的值 如state props以及它们的衍生物 如果有遗漏 可能会造成bug 这就是JS闭包问题
87. 什么是副作用
    - 对于数据抓取 注册监听事件 修改DOM元素等马后炮式的操作都属于副作用 因为我们渲染出来的页面是静态的 任何在之后的操作都会对它产生影响 所以才称之为副作用 
88. hook如何保存数据 多个hook如何获取数据
    > render内部调用的hook如何获取到对应数据 如
    1. useState获取state
    2. useRef获取ref
    3. useMemo获取缓存的数据
    - 每个组件有个对应的fiber节点(可以理解为虚拟DOM)用于保存组件相关信息
    - 每次组件render时 全局变量都会被赋值为该组件对应的fiber节点
    - hook内部其实是从currentlyRenderingFiber中获取状态信息的
    > 多个hook如何获取数据
    - 一个FunctionComponent中可能存在多个hook 多个hook如何获取自己的数据
    - currentlyRenderingFiber.memorizedState中保存一条hook对应数据的单向链表
    - 当FuntionComponent render时 每执行到一个hook 都会将指向currentlyRenderingFiber.memoizedState链表的指针往后移动一次 指向当前hook对应数据
    - 这也是为什么React要求hook的调用顺序不能改变（不能在条件语句中使用hook） —— 每次render时都是从一条固定顺序的链表中获取hook对应数据的。
    > useState的状态是怎么存储的
    1. 单向链表 fiber tree就是一个单向链表的树形结构
89. 为什么react的类组件方法需要bind
    1. this指向问题:指向调用者
    2. class类是严格模式 this只在class内部有效
    > 解决方法
    1. 行内的绑定
    ```
    onChange = {this.toggleCheck.bind(this)}
    ```
    2. 箭头函数
    3. 将类的方法改成属性
        - 如果将这个处理器作为该组件的一个属性 这个属性作为事件的处理器以箭头函数的形式存在 执行时能正常获取到上下文
    > 小结
    - React组件中 传递事件处理器 或方法作为回调时 其上下文会丢失 为了修复 需要显式给这个方法绑定上下文 除了常用的在构造器中进行 还可通过箭头函数 公有属性等方式避免冗余的绑定语句
90. React中事件监听
    1. React事件的命名采用小驼峰式 而不是纯小写
    2. 需要通过{}传入一个事件处理函数 这个函数会在事件发生时被执行
91. 自定义的React组件为何必须大写
    - babel在编译时会判断JSX中组件的首字母 当首字母为小写时 其被认定为原生DOM标签 createElment的第一个变量被编译成字符串
    - 当首字母大写时 其被认定为自定义组件 createElement的第一个变量被编译为对象
92. React如何防止XSS
    - ReactElement对象还有一个?typeof属性 它是一个Symbol类型的变量Symbol.for('react.element') 当环境不支持symbol时 ?typeof被赋值为0xeac7
    - 这个变量可以防止XSS。如果你的服务器有一个漏洞，允许用户存储任意JSON对象， 而客户端代码需要一个字符串，这可能为你的应用程序带来风险。JSON中不能存储Symbol类型的变量，而React渲染时会把没有?typeof标识的组件过滤掉。
93. React的diff算法和其他的diff算法有何区别
94. key在React中的作用
95. 如何写出高性能的React组件
96. 跨浏览器兼容
    - React基于VDOM自己实现了一套自己的事件机制 自己模拟了事件冒泡和事件捕获的过程 采用了事件代理 批量更新等方法 抹平了各个浏览器的事件兼容性问题
    - React在渲染虚拟DOM时应用了批处理以及事务机制 以提高渲染性能
97. React事件机制
    1. 为什么要手动绑定this
        - 通过事件触发过程的分析 dispatchEvent调用了invokeGuardCallback方法
        - 回调函数是直接调用的 没有制定调用的组件 所以不进行手动绑定的情况下直接获取到的this是undefined
    2. React事件和原生事件有什么区别
        - React事件采用驼峰命名而不是全部小写
        - 通过JSX 传递一个函数作为事件处理程序 而不是一个字符串
        - React中不能通过返回false来阻止默认行为 必须明确调用preventDefaul
        - React自己实现了一套事件机制 自己模拟了事件冒泡和捕获的过程 采用了事件代理批量更新等方法 并抹平了各个浏览器的兼容性问题
    3. React事件和原生事件的执行顺序 可以混用吗
        - react的所有事件都挂载在document中
        - 当真实dom触发后冒泡到document后才会对react事件进行处理
        - 原声事件会先执行 然后执行react合成事件 最后执行真正在document上挂载的事件
        - react事件和原生事件最好不要混用
        - 原生事件如果执行了stopPropagation方法会导致其他react事件失效 因为所有元素的事件将无法冒泡到document上
    4. React事件如何解决跨浏览器兼容
    5. 什么是合成事件
        ```
        function handleClick(e){
            e.preventDefault();
        }
        ```
        - 这里 e是一个合成事件 
        - React合成的SyntheticEvent采用了事件池，这样做可以大大节省内存，而不会频繁的创建和销毁事件对象。
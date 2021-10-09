1. 受控组件和非受控组件
    > 受控组件(组件维持自身状态 根据用户操作更新)
    - 维持自身状态 根据用户操作更新 由React渲染并控制用户操作后所发生的变化的组件 称为受控组件
    - 每个受控组件都有相对应的处理函数 受控组件用户输入时可根据用户的操作进行判定 能有效控制用户操作的可行性
    > 优点 组件的状态和内容能准确掌握在自己手中 可以在源头上杜绝一些奇怪的操作 如限制输入框智能输入数字

    > 非受控组件(组件自己不维护 用户操作 所有处理交给DOM 获取值时可以使用ref操作获取或通过原生JS获取)
    - 与受控组件相应 组件自己不维护用户的操作 所有的处理交由DOM自行处理 在获取值时可以使用ref操作获取或通过原生JS方法获取
    - 优点 非受控组件中真实数据保存在DOM中 因此在使用时 可更方便集成React和非React代码 且非受控组件能更好的减少代码量

    > react中 所谓受控组件和非受控组件是针对表单而言的
    - 表单受控组件(表单元素修改实时映射到状态值 需要继承react.component 绑定onChange事件)
        - 表单元素依赖于状态，表单元素需要默认值实时映射到状态时，就是受控组件，这个和双向绑定相似
        - 受控组件，表单元素的修改会实时映射到状态值上，此时可以对输入的内容进行校验
        > 受控组件只有继承react.component才会有状态
        > 受控组件必须要在表单上使用onchange事件来绑定对应的事件
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
    > 受控组件缺陷
    1. 表单元素的值都是由React组件进行管理 当有多个输入框 或多个这种组件时 如果想同时获取到全部的值就必须每个都要编写事件处理函数 这会让代码看起来很臃肿 为了解决这种情况 出现了非受控组件

    - 非受控组件(不受状态控制 获取数据相当于操作dom)
        - 优点在于容易和第三方组件结合
        - 非受控组件中可以使用一个ref来从DOM获得表单值 而不是为每个状态更新编写一个事件处理程序

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
        > 小结
        1. 受控组件(官方推荐使用): 必须要有onChange方法 可以赋予默认值 实现双向数据绑定
        2. 非受控组件:不需要设置它的state属性 通过ref操作真实DOM
2. 高阶组件 高阶函数
    > 高阶函数 一种特别的函数 接受的参数为函数 或返回值也是函数 
    1. 接受函数类型的参数/函数返回的是函数
    > 常见的高阶函数
    1. 定时器 setTimeout setInterval
    2. Promise
    3. 数组遍历相关方法 forEach filter map find findINdex
    4. fn.bind() 本身是一个函数 bind方法返回一个新的函数方法
    5. Form.create() create函数能够包装组件 生成另外一个组件的新功能函数
    6. getFieldDecorator()
    > 高阶组件
    1. 高阶组件就是接受一个组件作为参数并返回一个新组件的函数
    2. 高阶组件是一个函数 并不是一个组件
    > 解决问题
    1. 随着项目复杂 开发过程中 多个组件需要某个功能 而该功能和页面没有关系 所以不能简单抽取成一个新组件 但如果让同样的逻辑在各个组件中各自实现无疑会造成重复的代码
    > 高阶组件总共分为两大类
    1. 代理方式
        1. 操作prop
        2. 访问ref(不推荐)
        3. 抽取状态
        4. 包装组件
    2. 继承方式
        1. 操纵生命周期
        2. 操纵prop
    > 使用高阶组件
    1. higherOrderComponent(wrappedComponent)
    2. @higherOrderComponent
    > 高阶组件的应用
    1. 代理方式的高阶组件
        - 返回的新组件类 直接继承自React.Component类 新组件扮演的角色传入参数组件的一个代理 在新组件的render函数中 将被包裹组件渲染出来 除了高阶组件自己要做的工作 其余功能全都转手给被包裹的组件
    2. 继承方式的高阶组件
        - 采用集成关联作为参数的组件和返回的组件 假如传入的组件参数是wrappedComponent 则返回的组件就直接继承自WrappedComponent
2. react高阶组件hoc
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
    > 组件是将props转换成ui 而高阶组件是将组件转换为另一个组件
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
        - 为访问dom elemen t(focus事件 动画 使用第三方dom操作库)有时我们会用到组件的ref属性
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
    - 页面复用
    - 权限控制
    - 组件渲染性能追踪
2. react中的render props
    - 组件不自己定义render函数 而是通过一个名为render的props将外部定义的render函数传入使用
    1. 解决的问题
        - render props和高阶组件HOC一样 是为了给纯函数组件加上state 响应react的生命周期
    2. 基本原理
        > renderProps模式
        - renderProps其实是利用组件的props.children API 将函数当作组件的一种写法
        - 一种在react组件之间使用一个值为函数的prop共享代码的简单技术 通常 这个值为函数的prop拥有相同的一些参数和逻辑

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
2. React高阶组件 Render props 和hooks 有什么区别 为什么要不断迭代
    1. 区别
        1. React高阶组件
            - 高阶组件(HOC)是React中用于复用组件逻辑的一种技巧
            - 本质是接收一个组件作为参数 返回一个组件的函数
            - 高阶组件采用装饰器模式 在增强原有组件的功能 并不破坏它原有的特性
            > 优点
            1. 逻辑复用 不影响被包裹的组件的内部逻辑
            > 缺点
            1. 高阶组件传递给被包裹组件的props如果重名的话 会发生覆盖/hoc传递给被包裹组件的props容易和被包裹后的组件重名 进而被覆盖
        2. Render props
            - 一种在React组件之间使用一个值为函数的prop共享代码的简单技术 render prop是一个用于告知组件需要渲染什么内容的函数prop
            - 具有render prop的组件接受一个返回React元素的函数 将render的渲染逻辑注入到组件内部
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
            1. 数据共享 逻辑复用 将组件内的state作为props传递给被调用者 将渲染逻辑交给调用者
            > 缺点
            1. 无法在return语句外访问数据 嵌套写法不够优雅
        3. Hooks
            - Hooks是React16.8中新增的特性 可以让你在不编写class的情况下使用state lifecycle 等React特性
            - 通过自定义hook 可以很轻松的实现逻辑复用

            - 解决了hoc的prop覆盖问题 解决了render props的嵌套地狱问题
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
3. 依赖注入di 
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
    - 控制不反转需要自己做 要自己new Dinner

    - 控制反转就不用自己动手

    ```
    class Person{
        eat(dinner){
            console.log(dinner.name);
        }
    }
    ```
    > React中的依赖注入
    - React除了可以在浏览器运行(ReactDOM)也可以制作App在手机端运行(ReactNative) 而两者有大量代码可以共享 这就是依赖注入的使用场景
    - 主要目的 解耦 根据实际的上下文传入不同的依赖对象 优雅的实现代码的抽象和复用
4. props和state
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
    > React中的props为什么是只读的
    - React具有浓重的函数式编程思想
    - 函数式编程中有一个概念 纯函数
    1. 给定相同的输入 总是返回相同的输出
    2. 过程没有副作用
    3. 不依赖外部状态
    - this.props就是汲取了纯函数的思想 props的不可变性就保证了同样的输入 页面显示的内容是一样的 且不会产生副作用

    > React组件的props改变时更新组件的方法
    1. componentWillReceiveProps 将新的props更新到组件的state中 这种state被称为派生状态 Derived State 从而实现重新渲染
    2. getDerivedStateFromProps

    > React 16.x中props改变后在getDerivedStateFromProps中进行处理
    - getDerivedStateFromProps 是用来代替componentWillReceiveProps

    > state
    - React的核心思想是组件化 组件中最重要的概念是State(状态) State是一个组件的UI数据模型 是组件渲染时的数据依据
    - 状态(state)和属性(props)类似 都是一个组件所需要的一些数据集合 但是state是私有的 可以认为state是组件的私有属性
    - 如何判断是否为state
    - 。。。
    - 并不是组件中用到的所有变量都是组件的状态 当存在多个组件共同依赖一个状态时 一般做法是状态上移 将这个状态放在这几个组件的公共父组件中

    > 正确使用State
    1. 用setState修改State 直接修改state 组件不会重新触发render() setState()调度对组件state对象的更新 
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
    > 调用setState时 React render是如何工作的
    - 可以将render分为两个步骤
    1. 虚拟DOM渲染:当render方法被调用时 它返回一个新的组件的虚拟DOM结构 当调用setState()时 render会被再次调用 因为默认情况下shouldComponentUpdate总是返回true 所以默认情况下 React是没有优化的
    2. 原生DOM渲染:React只会在虚拟DOM中修改真实DOM节点 而且修改的次数非常少 
5. constructor
    > React 构造函数只有两个目的
    1. 初始化this.state
    2. 函数方法绑定到实例
    ```
    constructor(props){
        super(props);
        this.state = {counter:0};//初始化state
        this.handleClick = this.handleClick.bind(this);//事件绑定
    }
    ```
    > constructor是否有必要
    1. ES5的继承 实质是先创建子类的实例对象this 然后再将父类的方法添加到this上面(Parent.apply(this))
    2. ES6继承机制完全不同 实质先创建父类的实例对象this(所以必须先调用super方法)然后再用子类的构造函数修改this
    - 如果子类没有定义constructor方法 这个方法会被默认添加 
    - 即不管有没有显式定义 任何一个子类都有constructor方法

    > super()是否有必要
    - 子类必须在constructor方法中调用super方法 否则新建实例时会报错 这是因为子类自己的this对象 必须先通过父类的构造函数完成塑造
    - 得到与父类同样的实例属性和方法然后再对其进行加工 加上子类自己的实例属性和方法 如果不调用super方法 子类就得不到this对象

    > super(props)中props是否有必要
    1. 想在constructor中使用this.props时 super需要加入props 此时用props也行 用this.props也行
    2. 如果在constructor生命周期不使用this.props或props时 可不传入props
    3. super中的props是否接收 只能影响constructor生命周期能否使用this.props 其他生命周期已默认存在this.props
6. react的setstate方法
    > React setState调用原理
    1. 首先调用setState入口函数 入口函数在这里就是充当一个分发器的角色 根据入参不同 将其分发到不同的功能函数中
    2. enqueueSetState方法将新的state放进组件的状态队列里 并调用enqueuUpdate来处理将要更新的实例对象
    3. enqueueUpdate
        - 在enqueueUpdate方法中引出了一个关键的对象
        - bacthingStrategy 该对象所具备的isBatchingUpdates属性直接决定了当下是要走更新流程 还是应该排队等待 如果轮到执行 就调用batcheUpdates方法来直接发起更新流程 由此可以推测 batchingStrategy或许正是React内部专门用于管控疲劳更新的对象
    4. IsBatchingUpdates
        - true 组件入队 dirtyComponents
        - false 循环更新 dirtyComponents中的所有组件
    
    > React的setState后发生了什么
    - React会将传入的参数对象和组件当前的状态合并 然后触发调和过程Reconciliation经过调和过程 React会以相对搞笑的方式根据新的状态构建React元素树并着手重新渲染整个UI界面
    - 如果在短时间内频繁setState()React会将state的改变压入栈中 在合适的时机 批量更新state和试图 达到提高性能的效果
    
    > setState同步异步
    - setState不是单纯的同步/异步 它的表现会因调用场景的不同而不同 
    - 在源码中 通过isBatchingUpdate来判断setState是现存入state还是直接更新 如果是true则执行异步操作 为false则直接更新
    1. 异步 在React可以控制的地方 就为true 比如在React生命周期事件和合成事件中 都会走合并操作 延迟更新的策略
    2. 同步 在React无法控制的地方 如原生事件 setTimeout中 就只能同步更新
    - 一般认为 做异步更新是为了性能优化 减少渲染次数

    > React中setState的第二个参数作用
    1. 是一个可选的回调函数 这个回调函数将在组件重新渲染后执行
    2. 等价于在componentDidUpdate生命周期中执行
    3. 通常建议使用componentDidUpdate代替此方法 在这个回调函数中可以拿到更新后state的值

    > React setState和replaceState区别
    1. setState()用于设置状态对象
    ```
    setState(object nextState[, function callback])
    ```
    - nextState将要设置的新状态 该状态会和当前的state合并
    - callback 可选参数 回调函数 该函数会在setState设置成功 且组件重新渲染后调用
    2. replaceState()与setState()类似 但是方法只会保留nextState中状态 原state不在nextState中的状态都会被删除
    - setState只是修改其中的部分状态 相当于Object.assign 只是覆盖 不会减少原来的状态 
    - replaceState是完全替换原来的状态 相当于赋值 将原来的state替换成另一个对象 如果新状态属性减少 state中就没有这个状态

    > this.state this.setState
    - 初始化 
    - 更新state

    > 不同事件中的setState
    1. 合成事件中的setState()
    2. 生命周期函数中的setState()
    3. 原生事件中的setState()
    4. setTimeout中的setState()
    5. setState()中的批量更新
    > 小结
    1. setState只在合成事件和钩子函数中是异步的 在原生事件和setTimeout中都是同步的
    2. setState的异步不是说内部由异步代码实现 其实本身执行的过程和代码都是同步的 只是合成事件和钩子函数的调用顺序在更新之前 导致在合成事件和钩子函数中没法立马拿到更新后的值 形成了所谓的异步 当然可以通过第二个参数setState(partialState callback)中的callback拿到更新后的结果
    3. setState的批量更新优化也是建立在异步(合成事件 钩子函数)之上的 在原生事件和setTimeout中不会批量更新 在异步中 如果对同一个值进行多次setState setState的批量更新策略会对其进行合并批量更新

    > 该使用单个state变量还是多个state变量
    1. 将完全不相关的state拆分成多组state
    2. 如果某些state是相互关联/需要一起发生改变 可以把它们合并成一组state

    4. componentDidMount调用setState
    
        - 不推荐直接在componentDidMount直接调用setState，由上面的分析：componentDidMount本身处于一次更新中，我们又调用了一次setState，就会在未来再进行一次render，造成不必要的性能浪费，大多数情况可以设置初始值来搞定。
        - 当state初始值依赖dom属性时，在componentDidMount中setState是无法避免的。
    5. componentWillUpdate componentDidUpdate
        - 这两个生命周期中不能调用setState 
        - 其中调用会造成死循环 导致程序崩溃
    6. 推荐的使用方法
        - 在调用setState时使用函数传递state值 在回调函数中获取最新更新后的state
    
    > state怎样注入到组件的 从reducer到组件经历了什么样的过程
    - 通过connect和mapStateToProps将state注入到组件中
7. React 组件通信的几种方式
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
8. 生命周期
    > 生命周期的三个阶段(旧)
    1. 初始化阶段 由ReactDOM.render()触发--初次渲染
        1. constructor()
        2. componentWillMount() 
        3. render()
        4. componentDidMount() 常用 页面一上来做点什么
            一般在这个钩子中做一些初始化的事情 
            例如 开启定时器 发起网络请求 订阅消息
    2. 更新阶段 由组件内部this.setState()或父组件更新render函数
        > state
        1. shoudComponentUpdate()
        2. componentWillUpdate()
        3. render() 必要
        4. componentDidUpdate()
        > props
        1. componentWillReceiveProps
        2. shouldComponentUpdate
        3. componentWillUpdate
        4. render
        5. componentDidUpdate
    3. 卸载组件 由ReactDOM.unmountComponentAtNode()触发
        1. componentWillUnMount() 常用
            一般在这个钩子中做一些收尾的事
            关闭定时器 取消订阅消息
    > React16自上而下对生命周期做了另一种维度的解读
    1. render阶段 用来计算一些必要的状态信息 这个阶段可能会被React暂停 这一点和React16引入的Fiber架构是有关的
    2. Pre-commit阶段 这个阶段还没有去更新真实dom 不过dom信息已经可以读取了
    3. commit阶段 这一步 React会完成真实DOM的更新工作 commit阶段可以拿到真实DOM(包括refs)
    - 流程方面 仍然遵循挂载 更新 卸载 这三个广义的划分方式

    > 生命周期(新)
    - 常用的三个生命周期钩子
        1. render
        2. componentDidMount
        3. componentWillUnmount
    - 即将废弃的三个生命周期钩子
        1. componentWillMount
        2. componentWillRecieveProps
        3. componentWillUpdate
    - 新增的两个生命周期钩子
        1. getDerivedStateFromProps()
        2. getSnapshotBeforeUpdate()
    1. 初始化阶段 由ReactDOM.render()触发 初次渲染
        1. constructor()
        2. getDerivedStateFromProps()
        3. render()
        - React更新DOM和refs
        4. componentDidMount()
        - 如果在其中调用setState就会触发一次额外的渲染 多调用了一次render函数 由于它是在浏览器刷新屏幕前执行的 所以用户对此是没有感知的 但是应该避免这样使用 这样会带来一定的性能问题 尽量在constructor中初始化state对象
    2. 更新阶段 由组件内部this.setState()或父组件重新render触发
        1. getDerivedStateFromProps()
        2. shouldComponentUpdate()
        3. render()
        4. getSnapshotBeforeUpdate()
        - React更新DOM和refs
        5. componenDidUpdate()
    3. 卸载组件 由ReactDOM.unmountComponentAtNode()触发
        1. componentWillUnmount()

    > getDerivedStateFromProps
    - static getDerivedStateFromProps(nextProps,prevState) 接收父组件传递过来的props和组件之前的状态 返回一个对象来更新state或返回null来表示接收到的props没有变化 不需要更新state
    - getDerivedStateFromProps是一个静态函数 这个函数不能通过this访问到class的属性 也不推荐直接访问属性 而是通过参数提供的nextProps以及prevState来进行判断 根据新传入的props来映射到state
    - 该函数会在装载时 接收到新的props或调用setState和forceUpdate时被调用 当接收到新的属性想修改state就可以使用
    > 该生命周期钩子作用
    - 将父组件传递过来的props映射到子组件的state上面
    - 这样组件内部就不需要在通过this.props.xxx来获取属性值
    - 统一通过this.state.xxx获取 
    - 映射就相当于拷贝了一份父组件传过来的props
    - 作为子组件自己的状态
    - 子组件通过setState更新自己状态时 不会改变父组件的props
    > 配合componentDidUpdate 可以覆盖componentWillRecevieProps的所有用法

    > getSnapshotBeforeUpdate
    - getSnapshotBeforeUpdate(prevProps,prevState):接收父组件传递过来的props和组件之前的状态 此生命周期勾子必须有返回值
    - 返回值将作为第三个参数传递给componentDidUpdate
    - 必须和componentDidUpdate一起使用 否则会报错
    > 该生命周期钩子作用:在组件更新DOM和refs之前 从DOM捕获一些信息(如滚动位置)
    > 配合componentDidUpdate可以覆盖componentWillUpdate的所有用法
    - demo 每次组件更新时 都去获取之前的滚动位置 让组件保持在之前的滚动位置

    > 什么时候会用到componentWillreceiveprops
    1. 执行场景
        - 在已经挂载的组件(mounted component)接收到新prop时触发
        - 在除了第一次生命周期(componentWillMount->render->componentDidMount)之后的生命周期中出发
    2. 解释
        - 如果需要在props发生变化(或新传入的props)来更新state 可能需要比较this.prosp和nextProps 然后使用this.setState()方法来该改变this.state
    3. 注意
        1. React可能会在props传入时及时没有发生变化时也发生重新渲染 所以如果想自己处理改变 确保比较props 当前值和下一次值 这可能会造成组件重新渲染
        2. 如果指示调用this.setState()而不是从外部传入props 那么不会触发componentWillReceiveProps(nextprops)函数 

    > 组件的生命周期
    - 函数组件是没有生命周期的 React中每个class组件都有生命周期(钩子函数)
        1. render()方法是class组件中唯一必须实现的方法
        2. constructor(props)通过给this.state赋值对象来初始化内部state 为事件处理函数绑定实例
        3. componentDidMount 会在组件挂载后(插入DOM树中)立即调用
        4. componentDidUpdate(prevProps,prevState,snap)在更新后会被立即调用 首次渲染不会执行此方法
        5. shouldComponentUpdate(nextProps,nextState)
        6. componentWillUnmount()会在组件卸载及销毁之前直接调用
        7. static getDerivedStateFromProps()会在调用render方法之前调用 并且在初始挂载及后续更新都会被调用 
            - 它应返回一个对象来更新state 如返回null则不更新任何内容
        8. getSnaphotBeforeUpdate()在最近一次渲染输出(提交的DOM节点)之前调用 
            使得组件能在发生更改之前从DOM中捕获一些信息(如 滚动位置) 此生命周期的任何返回值将作为参数传递给componentDidUpdate()

    > 版本迁移
    1. componentWillMount componentWillReceiveProps componentWillUpdate这三个生命周期因为经常会被误解和滥用 所以被称为不安全生命周期
    - 不是指安全性 而是表示使用这些生命周期的代码 有可能会在未来的React版本存在缺陷 可能会影响未来的异步渲染
    > React17.0版本:推出新的渲染方式-异步渲染
    - 提出一种可被打断的生命周期 而可以被打断的阶段正是实际dom挂载之前的虚拟dom构建阶段 也就是要被去掉的三个生命周期函数
    - componentWillUpdate
    - componentWillReceiveProps
    - componentWillMount

    > 洋葱模型
    1. 父组件先触发
    - componentWillMount
    2. 子组件触发
    3. 孙子组件触发
    - componentWillMount
    4. 孙子组件触发
    - componentDidMount
    5. 子组件触发
    6. 父组件触发
9. jsx Javascript&xml
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
    > react中的return 什么时候用小括号 什么时候用大括号
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
10. react 函数式/无状态组件和类组件/有状态组件区别
    > React的函数式组件和类组件之间根本区别在 心智模型上
    > 心智模型
    - 类组件是基于面向对象编程的 它主打的是继承 生命周期等核心概念 
    - 函数组件内核是函数式编程 主打的是Immutable 没有副作用 引用透明等特点 而函数组件更加契合React框架的设计理念
    - 作为开发者 我们编写的是声明式的代码 React框架的主要工作 就是及时把声明式代码转换成命令式的DOM操作 把数据层面的描述映射到用户可见的UI变化中
    - 这就意味着从原则上讲 React数据应该总是和渲染绑定在一起 而类组件做不到这一点 函数组件就真正地将数据和渲染绑定到一起 函数组件是一个更加匹配其设计理念 也更有利于逻辑拆分和重用的组件表达式
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
10. 副作用 Effect 纯函数
    - 纯函数
        - 纯函数是函数式编程的概念 必须遵循以下约束
        1. 不得改写参数
        2. 不能调用系统I/O的API
        3. 不能调用Date.now或Match.random()等不纯的方法 因为每次会得到不一样的结果
10. react三个文件作用
    1. browser.js用于编译JSX
    2. react.js react核心库 用来管理组件和状态
    3. react-dom.js 用于渲染组件 依赖于react.js 所以必须放在react.js下面
10. react中元素和组件的区别
    > react元素
    - React Element 通过React.createElement创建(语法糖:JSX)
    > React节点
    - 专门用于渲染到UI界面的对象 React会通过React元素 创建React节点 ReactDOM一定是通过React节点来渲染的
    > 节点类型
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
    > react中有三种构建组件的方式 ES5 React.createClass() ES6 extends React.Component 和无状态函数
    1. ES5 react.createClass() RFC
    - 会自动绑定函数方法 导致不必要的性能开销 增加代码过时的可能性
    ```
    var Greeting = React.createClass({
        render:function(){
            return <h1></h1>
        }
    })
    ```
    2. ES6 extends React.Component RCC
    - 目前极为推荐的创建有状态组建的方式 最终会取代React.createClass形式 相对于React.createClass可以更好实现代码复用
    ```
    class Greeting extends React.Component{
        render:function(){
            return <h1><h1>
        }
    }
    ```
    3. 无状态函数
    - 为了创建纯展示组件 这种组件只负责根据传入的props来展示 不涉及到state状态的操作 组件不会被实例化 整体渲染性能得到提升 不能访问this对象 不能访问声明周期方法
    > 无状态函数是使用函数构建的无状态组件 无状态组件传入props和context两个参数 它没有state 除了render没有其他生命周期方法
    > 与无状态组件相比 React.createClass和React.Component都是创建有状态的组件 这些组件是要被实例化的 并可以访问组件的生命周期方法
    
    4. PureComponent
    > 除了提供一个具有浅比较的shouldComponentUpdate方法 PureCompoent和Component基本完全相同

    > React.createClass与React.Component区别
    1. 函数this自绑定
    2. 组件属性类型propTypes及其默认的props属性dedaultProps配置不同
    3. 组建初始状态state的配置不同

    > 元素和组件的区别
    - 组件是由元素构成的 元素数据结构是普通对象 而组件数据结构是类或纯函数
11. refs&dom
    - refs提供了一种访问在render方法中创建的DOM节点或React元素的方法 
    > refs应该谨慎使用 如下场景使用refs较合适
    1. 处理焦点 文件选择或媒体控制
    2. 触发必要的动画
    3. 集成第三方DOM库

    > react通过声明式的渲染机制把复杂的dom操作抽象成为简单的state和props操作

    - 提供ref用来访问在render方法中创建的dom元素或者是react组件实例

    > ref的三驾马车
    - react16.3之前 ref通过字符串(string ref)或者回调函数(callback ref)的形式获取 在v16.3中 引入了新的react.createRef api
    1. string ref
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
    2. callback ref
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
    3. react.createref
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
    > 使用场景
    - 某些情况下 需要在典型数据流之外强制修改子组件 被修改的子组件可能是一个React组件的实例 也有可能是一个DOM元素 如
    1. 管理焦点 文件选择或媒体播放
    2. 触发强制动画
    3. 集成第三方DOM库

    1. string ref
        > 过时API
        > 缺点
        1. 当 ref 定义为 string 时，需要 React 追踪当前正在渲染的组件，在 reconciliation 阶段，React Element 创建和更新的过程中，ref 会被封装为一个闭包函数，等待 commit 阶段被执行，这会对 React 的性能产生一些影响。
        2. 当使用 render callback 模式时，使用 string ref 会造成 ref 挂载位置产生歧义。
        3. string ref 无法被组合，例如一个第三方库的父组件已经给子组件传递了 ref，那么我们就无法再在子组件上添加 ref 了，而 callback ref 可完美解决此问题。
        4. 在根组件上使用无法生效。
        5. 对于静态类型较不友好，当使用 string ref 时，必须显式声明 refs 的类型，无法完成自动推导。
        6. 编译器无法将 string ref 与其 refs 上对应的属性进行混淆，而使用 callback ref，可被混淆。
    
    2. create ref
        > 支持在函数组件和类组件内部使用
        - createRef是在React16.3版本中引入的
        1. 创建Refs
        - 使用React.createRef()创建Refs 并通过ref属性附加到React元素上 通常在构造函数中 将Refs分配给实例属性 以便在整个组件中引用
        2. 访问Refs
        - 当ref被传递给render中的元素时 对该节点的引用可以在ref的current属性中访问
        ```
        import React from 'react'
        export default class MyInput extends React.Component{
            constructor(props){
                super(props);
                // 分配给实例属性
                this.inputRef = React.createRef(null);
            }
            componentDidMount(){
                // 通过this.inputRef.current获取对该节点的引用
                this.inputRef && this.inputRef.current.focus();
            }
            render(){
                return (
                    <input type="text" ref={this.inputRef}>
                )
            }
        }
        ```
        - ref的值根据节点的类型而有所不同
        1. 当ref属性用于HTML元素时 构造函数中使用React.createRef()创建的ref接收底层DOM元素作为其current属性
        2. 当ref属性用于自定义的class组件时 ref对象接收组件的挂载实例作为其current属性
        > 不能在函数组件上使用ref属性 因为函数组件没有实例
        > 小结
        1. 为DOM添加ref 可通过ref获取到对该DOM节点的引用
        2. 给React组件添加ref 可以通过ref获取到该组件的实例
        3. 不能在函数组件上使用ref属性 因为函数组件没有实例
    3. useRef
        > 仅限在函数组件内使用
        1. 创建Refs
        - 使用React.useRef()创建Refs 并通过ref属性附加至React元素上
        ```
        const refConatiner = useRef(initialValue)
        ```
        - useRef返回的ref对象在组件的整个生命周期内保持不变
        2. 访问Refs
        - 当ref被传递给React元素时 对该节点的引用可以在ref的current属性中访问
        ```
        import React from 'react'
        export default function MyInput(props){
            const inputRef = React.useRef(null);
            React.useEffect(()=>{
                inputRef.current.focus();
            })
            return(
                <input type="text" ref={inputRef}>
            )
        }
        ```
    4. callback refs/回调Refs
        > 支持在函数组件和类组件内部使用
        - React支持回调refs的方式设置Refs 这种方式可以帮助更精细控制何时Refs被设置和解除
        - 使用回调Refs需要将回调函数传递给React元素的ref属性 
        - 这个函数接受React组件实例或HTML DOM元素作为参数 将其挂载到实例属性上
        - React会在组件挂载时 调用ref回调函数并传入DOM元素或React实例 当卸载时调用它并传入null
        - 在componentDidMount或componentDidUpdate触发前 React一定会保证Refs一定是最新的
    > Ref传递
    - 在Hook之前 高阶组件HOC和render props是React中复用组件逻辑的主要手段
    - 尽管高阶组件的约定是将所有的props传递给被包装组件 但是refs不会被传递 事实上ref并不是一个prop 和key一样 它由React专门处理
    - 这个问题可以通过React.forwardRef解决 在React.forwardRef之前 这个问题 可以通过给容器组件添加forwardedRef解决
    > 小结
    - 函数组件内部不支持使用字符串refs 支持createRef useRef 回调Ref
    > React.forwardRef
    - 会创建一个React组件 这个组件能够将其接受的ref属性转发到其组件树下的另一个组件中 这种技术并不常见 但在以下两种场景中 特别有用
    1. 转发refs到DOM组件
    2. 在高阶组件中转发refs
12. react数据流
    > react核心思想是UI=render(data) data数据 render是react提供的纯函数 用户界面的展示取决于数据层

    > 状态
    - react利用可复用的组件构建界面，组件本质上是一个有限状态机，它能记住当前所处的状态，并根据不同的状态变化做出相应的操作，在react中把这种状态定义为state，用来描述该组件对应的当前交互界面
    
    > react通过管理状态来实现对组件的管理 当state发生变更时 react会自动执行相关的操作：绘制页面
    - 接下来提到的状态是针对react component这种有限状态机
    - 数据
    - 不光是指server层返回给前端的数据 react中的状态也是一种数据 当我们改变数据时 就要通过改变状态去引发界面的变更
    > UI = render(data)
    > react的状态管理其实和数据流管理一样 包括会借助第三方库来帮助react管理状态
    
    > react自身管理数据流
    - react是自上而下的单向组件数据流 
    - 容器组件&展示组件（傻瓜组件&聪明组件）是最常用的react组件设计方案 
    - 容器组件负责处理复杂的业务逻辑以及数据 
    - 展示组件负责处理ui层 
    - 通常会将展示组件抽出来进行服用或者组件库的封装 
    - 容器组件自身通过state管理状态 setstate更新状态 从而更新ui 通过props将自身的state传递给展示组件实现通信
    
    > 如何实现跨组件通信 状态同步以及状态共享
    - react v16.3之前 通过状态提升至最近的共同父组件实现
    - (虽然有官方提供的contextAPI)但是旧版本存在一个问题：看似跨组件 实则还是逐级传递
    - 如果中间组件使用shouldcomponentupdate检测当前state和props没有变化 return false 则context就无法透传 因此context没有被官方推荐使用
    - react v16.3版本以后 新版本context解决了之前的问题 可以轻松实现 -
    - 但依然存在一个问题 context是将底部子组件的状态控制交给到顶级组件 但是顶级组件状态更新时一定会触发所有子组件的re-render也会带来损耗
    
    > 如何处理异步数据流
    - react自身并未提供多种处理异步数据流管理方案 仅仅用一个setstate很难满足一些复杂的异步流场景
    - React Hooks 在组件内维护一部数据流 更加合理 从开发效率和可维护性角度来看 都比使用状态管理好

    > redux提供了那些
    1. store 提供一个全局的store变量 用来存储希望从组件内部抽离出去的那些公用的状态
    2. action 提供了一个普通对象 用来记录每一次状态变更 可日志打印与调试回溯 并且这是唯一的途径
    3. reducer 提供了一个纯函数 用来计算状态的变更

    > redux核心竞争力
    1. 状态持久化
        - globalstore可以保证组件即使销毁也以来保留之前状态
    2. 状态可回溯
        - 每个action都会被序列化 reducer不会修改原有状态 总是返回新状态 方便做状态回溯
    3. functional programming/函数式编程ƒ
        - 使用纯函数 输出完全依赖输入 没有任何副作用
    4. 中间件 
        - 针对异步数据流 提供了类express中间件的模式 社区中一批优秀的第三方插件 能够更精细地控制数据流动 对复杂的业务场景起到缓冲作用

    > redux缺点
    1. 繁重的代码模版
        - 修改一个state可能要动四五个文件
    2. store中状态残留：多组件共用store里某个状态时要注意初始化清空问题
    3. 无脑的发布订阅： 每次dispatch一个action都会遍历所有的reducer 重新计算connnect 这会是一种损耗
    4. 交互频繁时会卡顿：如果store较大且频繁修改store 会明显看到页面卡顿
    5. 不支持TS
13. react渲染原理
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
14. hook
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
    > 渲染属性
    - 一种在react组件之间使用一个值为函数的prop共享代码的简单技术
    - 一个用于告知组件需要渲染什么内容的函数prop
    - 使用一个值为函数的prop来传递需要动态渲染的nodes或组件
    > React hooks解决了哪些问题
    1. 在组件之间复用状态逻辑很难 过去常用的解决方案是高阶组件 render props 及状态管理框架
    2. 复杂组件变得难以理解 生命周期和业务逻辑耦合太深 导致关联部分难以拆分
    3. 难以理解的class 人和机器都很容易混淆类 常见的有this问题
    > React hooks和生命周期的关系
    - hooks组件(使用了hooks的函数组件)有生命周期 而函数组件(未使用hooks的函数组件)没有生命周期
    - constructor useState
    - getDerivedStateFromProps
    - shouldComponentUpdate React.memo

    > 常见的hook
    1. useState 
        ```
        const {state,setState} = useState(initialState)
        ```
        > usestate的初始值只在第一次有效
        - 返回一个state 以及更新state的函数
        - 初始渲染期间 返回的状态(state)与传入的第一个参数(initialState)值相同
        - setState函数用于更新state 它接受一个新的state值并将组件的一次重新渲染加入队列
        > 为什么useState要使用数组而不是对象
        - 涉及到对象和数组的解构赋值
        - 如果useState返回的是数组 则使用者可以对数组中的元素命名
        - 如果useState返回的是对象 在解构对象的同时必须要和useState内部实现返回的对象同名 想要使用多次的话 必须要设置别名才能使用返回值
        - useState返回的是array而不是object的原因就是为了降低使用的复杂度
        > 使用useState时 使用push pop slice等直接更改数组对象的坑
        1. 使用push直接修改数组无法获取新值 应该采用析构方式 class不会有这个问题
        2. useState设置状态时 只有第一次生效 后期需要更新状态 必须通过useEffect
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
        - useEffect是专门用来写副作用的 这也是React的核心所在
        - 依赖数组中必须包含在callback内部用到的所有参数和React数据流的值 如state props以及它们的衍生物 如果有遗漏 可能会造成bug 这就是JS闭包问题
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
    > 使用场景
    1. 计算开销很大 需要记住返回值 避免每次render都去重新计算
    2. 由于值的引用发生变化 导致下游组件重新渲染
    > 如何使用
        ```
        const data = useMemo (()=>{
            return {
                name
            }
        },[name])
        ```
    - 先根据[name]里面的name值判断一下 因为useMemo作为一个有暂存能力的 暂存上次name结果
    > 小结
    1. memo的用法是函数组件里的PureComponent 但如果函数组件被React.memo包裹 且其实现中拥有useState或useContext的Hook 当context发生变化时 它仍会重新渲染
    2. memo是浅比较 对象只比较内存地址 只要内存地址没变 对象内值变化不会出发render

    5. useCallback - 解决函数的缓存问题
    6. useReducer
        - useReducer redux中的reducer
        - 通过action触发值的修改
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
    
    > hook如何保存数据 多个hook如何获取数据
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
    > hook如何保存数据
    - React在function组件的fiber节点中加入了memorizedState属性用来存储数据 然后在function组件里面通过api来使用这些数据 这些API被叫做Hooks API
    - 因为是使用fiber节点上的数据 就把API命名为useXXX
    - 有两种方式 map和数组 为了简化使用 hooks最终使用了数组的方式 实现起来用的是链表 每个hook API取对应的fiber.mmemoriedState中的数据来用
    > hook API分类
    1. 数据类
    2. 逻辑类
    3. ref转发专用
    > react通过function组件的hook api解决了class组件的逻辑复用方案 
    > fiber是解决性能问题的 而hooks是解决逻辑服用问题的
15. React事件系统
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
15. react事件机制
    - 为了解决跨浏览器兼容性问题 
    - SyntheticEvent实例将被传递给事件处理函数 
    - SyntheticEvent是React跨浏览器的浏览器原生事件包装器 它拥有和浏览器原生事件相同的接口 包括stopPropagation()和preventDefault()
    - React实际上并不将事件附加到子节点本身 React使用单个事件侦听器侦听定策的所有事件 这对性能有好处 意味React在更新DOM时不需要跟踪事件监听器
    
    > React事件机制
    1. 用户在为onclick添加函数时 react并没有将click事件绑定在dom上面
    2. 是在document处监听所有支持的事件，当事件发生并冒泡至document处时 react将事件内容封装交给synthetic event/合成事件(负责所有事件合成)
    3. 当事件触发时，对使用统一的分发函数dispatchEvent将指定函数执行
    - 这样的方式不仅仅减少了内存的消耗 还能在组件挂载销毁时统一订阅和移除事件
    - 冒泡到document上的事件也不是原生的浏览器事件 而是由React自己实现的合成事件(SyntheticEvent)
    - 因此如果不想要时事件冒泡 应该调用event.preventDefault()方法 而不是调用event.stopPropagation()方法
    - JSX上写的事件并没有绑定在对应的真实DOM上 而是通过事件代理的方式 将所有的事件都统一绑定在document上 
    - 减少内存消耗 在组件挂在销毁时统一订阅和移除事件
    > 实现合成事件的目的
    1. 抹平了浏览器之间的兼容性问题 这是一个跨浏览器原生事件包装器 赋予了跨浏览器开发的能力
    2. 对于原生浏览器事件 浏览器会给监听器创建一个事件对象 但是你有很多的事件监听 那么就需要分配很多的事件对象 造成高额的内存分配问题
    - 但是对于合成事件来说 有一个事件池专门管理它们的创建和销毁 
    - 当事件需要被使用时 就会从池子中服用对象 事件回调结束后 就会销毁事件对象上的属性 便于下次复用时间对象
    
    > React事件和普通的HTML事件
    > 区别
    1. 对于事件名称命名方式 原生事件为全小写 react事件采用小驼峰
    2. 对于事件函数处理语法 原生事件为字符串 react事件为函数
    3. react事件不能采用return false方式来阻止浏览器的默认行为 而必须要明确的调用preventDefault()来阻止默认行为
    > 优点
    - 合成事件是react模拟原生DOM事件所有能力的一个事件对象 
    1. 兼容所有浏览器 更好的跨平台
    2. 将事件统一存放在一个数组 避免频繁的新增与删除(垃圾回收)
    3. 方便react统一管理和事务机制
    > 执行顺序
    1. 原生事件先执行 合成事件后执行
    - 合成时事件会冒泡绑定到document上 所以要尽量避免原生事件和合成事件混用 如果原生事件阻止冒泡 可能会导致合成事件不执行 因为需要冒泡到document上合成事件才会执行

    > React组件中怎么做事件代理 原理
    - React基于VDOM实现了一个SyntheticEvent层(合成事件层) 定义的事件处理器会接收到一个合成事件对象的实例 它符合W3C标准 且与原生的浏览器事件拥有同样的接口 支持冒泡机制 所有事件都自动绑定在最外层
    - React底层 主要对合成事件做了两件事
    1. 事件委派 React会把所有事件绑定到结构的最外层 使用统一的事件监听器 这个事件监听器上维持了一个映射来保存所有组件内部事件监听和处理函数
    2. 自动绑定 React组件中 每个方法的上下文都会指向该组件的实例 即自动绑定this为当前组件
 

    1. 为什么要手动绑定this
    - 通过事件触发过程的分析 dispatchEvent调用了invokeGuardedCallback方法
    - 回调函数式直接调用的 没有指定调用的组件 所以不进行手动绑定的情况下直接获取到的this是undefined
    - 可以使用箭头函数避免手动绑定this
    2. 和原生事件有什么区别
        1. React事件使用驼峰命名 而不是全部小写
        2. 通过JSX 传递一个函数作为事件处理程序 而不是一个字符串
        3. React不能通过返回false阻止默认行为 必须明确调用preventDefault
        4. React自己实现了一套事件机制 自己模拟了事件冒泡和捕获的过程 采用了事件代理 批量更新等方法 并且抹平了各个浏览器的兼容性问题
    3. React事件和原生事件执行顺序
        1. react所有事件都挂载在document中 当真实dom触发后冒泡到document后 才会对react事件进行处理
        2. 原生事件会先执行 然后执行react合成事件 最后执行真正在document上挂载的事件
    4. react事件和原生事件可以混用吗
        1. react事件和原生事件最好不要混用
        2. 原生事件如果执行了stopPropagation方法 会导致其他react事件失效 因为所有元素的事件将无法冒泡到document上
        3. 则所有react事件无法被注册
    5. 合成事件 浏览器兼容
        1. 事件处理程序将传递SyntheticEent(合成事件)的实例 这是一个跨浏览器原生事件包装器 它具有与浏览器原生事件相同的接口 包括stopPropagation()和preventDefault() 在所有浏览器中 他们的工作方式都相同
        2. React合成的SyntheticEvent采用了事件池这样做可以大大节省内存 而不会频繁创建和销毁事件对象
15. React事件委派
    > React数据结构
    - React不是将click事件直接绑定在dom上面 而是采用事件冒泡的形式冒泡到document上面
    - 这个思路借鉴事件委托机制 所以React中所有的事件最后都是被委托到了document这个顶级DOM上

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
16. redux react-redux
    - Redux
    1. 设计思想 Web是一个状态机 视图和状态是一一对应的 所有的状态都保存在一个对象里
    2. 基本概念
        1. Store 
            - 存储数据的地方 整个应用只能有一个Store Redux提供createStore函数 用来生成store
        2. State 
            - 该对象包含所有数据 如果想得到某个时点的数据 就要对store生成快照 这种时点的数据集合就叫state 当前时刻的state可以通过store.getState()拿到 Redux规定 一个State对应一个View 只要state相同 View就相同
        3. Action 
            - State的变化 会导致View的变化 用户接触不到State 只能接触到View 所以State的变化必然是View导致的 Action就是view发出的通知 表示State应该要发生变化了 Action是一个对象 其中的type属性是必须的 表示Action的名称 其他属性可以自由设置
            - Action描述当前发生的事情 改变State的唯一方法 就是使用Action 它会运送数据到Store
        4. Action Creator 
            - 定义的一个函数用来生成Action
        5. Store.dispatch 
            - View发出Action的唯一方法
        6. Reducer 
            - Store收到Action后 必须给出一个新的State 这样View才会发生变化 这种State的计算过程就叫Redcer
            - Reducer是一个纯函数 它接受Action和当前State作为参数 返回一个新的State
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
    > Redux原理及工作流程
    - Redux源码主要分为以下几个模块文件
    1. compose.js 提供从右到左进行函数式编程
    2. createStore.js 提供作为生成唯一store的函数
    3. combineReducers.js提供合并多个reducer的函数 保证store的唯一性
    4. bindActionCreators.js可以让开发者在不直接接触dispatch的前提下进行更改state的操作
    5. applyMiddleware.js这个方法通过中间件来增强dispatch的功能

    - React Redux
    1. Redux和React Redux
        - 为了方便使用 Redux作者封装了一个React专用的库 React-Redux
    2. 为什么React需要Redux
        - React单向数据流 如果是数据状态很复杂的应用 组件间的交流会很困难 需要一个机制 把所有的state集中到组件顶部 灵活地将所有state各取所需分发给组件
    3. UI组件/纯组件和容器组件
        - React-Redux将所有组件分为两大类 UI组件和容器组件
        1. UI组件 只负责UI的呈现 不带有任何业务逻辑 没有状态 所有所有数据都由参数(this.props)提供 不使用任何Redux的API
        - 因为不含有状态 UI组件又称为纯组件 它和纯函数一样 纯粹由参数决定它的值
        2. 容器组件 负责管理数据和业务逻辑 不负责UI的呈现 带有内部状态 使用Redux的API
        3. 总结: UI组件负责UI的呈现 容器组件负责管理数据和逻辑
        4. 一个组件既有UI 又有业务逻辑 将其拆分为以下结构 外面是一个容器组件 里面包了一个UI组件 前者负责与外部的通信 将数据传给后者 由后者渲染出视图
        > 提供的API
        1. connect(mapStateToProps,mapDispatchToProps)(MyComponent)方法 用于从UI组件生成容器组件 connect将这两种组件连起来
        2. mapStateToProps 
        - 负责处理输入逻辑 
        - 把Redux中的数据映射到React中的props中
        - 外部的数据(即state对象)如何转换为UI组件的参数 外部的state映射到UI组件的参数props
        3. mapDispatchToProps 
        - 负责处理输出逻辑 
        - 把各种dispatch也变成props让可以直接使用

        - 用户发出的动作如何变成Action对象 从UI组件传出去 用户对UI组件的操作映射成Action 接受state作为参数 返回一个对象 用来建立UI组件的参数到store.dispatch方法的映射
        > Provider组件
        - connect方法生成容器组件后 要让容器组件拿到state对象 才能生成UI组件的参数 React-Redux提供Provider组件 让容器组件拿到state

        - 将顶层组件包裹在Provider组件之中 这样所有组件就都可以在react-redux的控制之下
        - store必须作为参数放到Provider组件中去
        - 这个组件的目的是让所有组件都能够访问到Redux中的数据
    > Redux中的connect作用
    - 负责连接React和Redux
17. 中间件 &redux-saga & redux-thunk
    > 原本 view action reducer store
    > 中间件 view action middleware reducer store
    - 这一环节可以做一些副作用操作 如异步请求 打印日志等
    - redux中间件接收一个对象作为参数
    1. 对象的参数上有两个字段dispatc和getState 分别代表 redux store上的两个同名函数
    2. 柯里化函数两端一个是middlewares 一个是store.dispatch

    > Redux中间件如何拿到store和action 然后怎么处理
    1. redux中间件本质就是一个函数柯里化 redux applyMiddleware API源码中每个middleware接受两个参数 
    - 

    1. 什么是中间件以及为什么要引入中间件
        - Redux的基本做法 用户发出Action Reducer函数计算出新的state View重新渲染
        - Action发出后 Reducer立即算出State 这叫同步 Action发出以后 一段时间再执行Reducer 异步
        - 中间件就是一个函数 对store.dispatch进行了重定义 在发出Action和执行Reducer之间 添加了新功能
    2. 中间件的使用
        - applyMiddlewares 方法是Redux原生方法 作用是将所有中间件组成一个数组 依次执行
        - createStore 方法可以接收整个应用的初始状态做参数 则applyMiddleware就是第三个参数
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
        - redux-saga框架提供了很多创建effect的函数
        1. take(pattern)
        - 监听未来的action 它创建了一个对象命令 告诉middleware等待一个特定的action Generator会暂停 直到一个与pattern匹配的action被发起 才会继续执行下面的语句
        - 一个阻塞的effect
        2. put(action)
        - 发送action的effect 可以简单理解为redux框架中的dispatch函数 当put一个action后 reducer就会计算新的state并返回
        - 一个阻塞的effect
        3. call(fn,...args)
        - 可以调用其他函数的函数 它命令middleware来调用fn函数 args为函数的参数 fn函数可以是一个Generator函数 也可以是一个返回Promise的普通函数 
        - 一个阻塞的effect
        4. fork(fn,...args)
        - 和call函数很像 都是用来调用其他函数的
        - 非阻塞函数
        5. select(selector,...args)
        - redux框架中获取store上的state数据一样的功能
        - store.getState()
        6. delay
        > redux-saga使用小结
        1. 使用createSagaMiddware方法创建saga的Middleware 然后在创建的redux的store时 使用applyMiddleware函数将创建的saga Middleware实例绑定到store上 最后可以调用saga Middleware中的run函数来执行某个或某些Middleware
        2. 在saga的Middware中 可以使用takeEvery或takeLatest等API监听某个action 当某个action触发后 saga可以使用call发起异步操作 操作完成后使用put函数出发action 同步更新state 从而完成整个State的更新
        > 副作用
        - 数据抓取 注册监听事件 修改DOM元素等马后炮式的操作都属于副作用 因渲染出来的页面是静态的 任何在之后的操作都会对它产生影响 所以才称之为副作用 
    4. redux-thunk中间件
        - redux作者给出的中间件 实现极为简单 十多行代码
    5. redux-saga&redux-thunk区别
        - redux-thunk 异步任务执行完再去调用dispatch
        - redux-saga 等执行完action和reducer之后 判断reducer中有没有这个action
        - redux-saga 在redux的action基础上 重新开辟了一个async action的分支 单独处理异步任务

        1. 对于redux-thunk整个流程来说 它是等异步任务执行完成之后 再去调用dispatch 然后去store调用reducers
        2. 对于redux-saga整个流程来说 它是等执行完action和reducer之后 判断reducer中有没有这个action
        3. redux-thunk和redux-saga处理异步任务时机不同
    > redux-thunk优点
    1. 体积小 redux-thunk实现方式很简单 只有不到20行代码
    2. 使用简单 redux-thunk没有引入像redux-saga或redux-observable额外的范式 上手简单
    > redux-thunk缺陷
    1. 样板代码过多 与redux本身一样 通常一个请求需要大量的代码 而且很多都是重复性的
    2. 耦合严重 异步操作与redux的action耦合在一起 不方便管理
    3. 功能孱弱 有一些实际开发中常用到的功能需要自己进行封装
    > redux-saga优点
    1. 异步解耦 异步操作被转移到单独saga.js中 不再掺杂在action.js或component.js中
    2. action摆脱thunk function:dispatch的参数依然是一个纯粹的action(FSA)而不是充满黑魔法的thunk function
    3. 异常处理 受益于generator function的saga实现 代码异常/请求失败 都可以直接通过try/catch语法直接捕获处理
    4. 功能强大 redux-saga提供大量的saga辅助函数和Effect创建器供开发者使用 开发者无需封装或简单封装即可使用
    5. 灵活 redux-saga可以将多个saga串行并行组合起来 形成一个非常实用的异步flow
    6. 易测试 提供各种case的测试方案 包括mock task 分支覆盖等
    > redux-saga缺点
    1. 额外的学习成本
    2. 体积庞大 体积略大 代码近2000行 min版25kb左右
    3. 功能过剩 实际上并发控制等功能很难用到 但我们依然需要引入这些代码
    4. TS支持不友好 yield无法返回TS类型
    - redux-saga可以捕获action 然后执行一个函数 则可以把异步代码放在这个函数中
18. saga-duck
    > saga-duck和redux区别就是分布式状态管理和集中式状态管理
    - 传统的集中式状态管理 所有状态管理都放在store文件夹下管理
    - 分布式状态管理
        - 各个模块的状态分布到具体的模块中进行单独管理 再细粒度一点即将各个组件的状态分布到具体的组件中进行单独管理
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
19. react的diff原理
    > diff算法的作用
    > 计算VDOM中真正变化的部分 并只针对该部分进行原生DOM操作 而非重新渲染整个页面

    > 传统diff算法
    - 通过循环递归对节点进行依次比较 算法复杂度达到O(n^3) n是树的节点数 

    > React的diff算法
    1. 调和reconcilation(调和) 将VDOM树转换为actual DOM树的最少操作的过程称为调和
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
20. React性能优化 
    > shouldComponentUpdate PureComponent React.memo fiber
    - shouldComponentUpdate PureComponent是类组件中的优化方法 React.memo是函数组件中的优化方式
    1. shouldComponentUpdate
        - React提供生命周期函数shouldComponent 根据它的返回值(true|false) 判断React组件的输出是否受当前state/props影响 默认行为是state每次发生变化组件都会重新渲染
        - shouldComponentUpdate方法接收两个参数nextProps和nextState 可以将this.props和nextProps以及this.state和netState进行比较 并返回false以告知React可以跳过更新
        - 浅拷贝
        1. 使用setState改变数据之前，先采用ES6中assgin进行拷贝，但是assgin只深拷贝的数据的第一层，所以说不是最完美的解决办法：
        2. 使用JSON.parse(JSON.stringfy())进行深拷贝，但是遇到数据为undefined和函数时就会错。
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
21. react单元测试
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
22. React Fiber
    - 官方 - React Fiber是对核心算法的一次重新实现 主要目标是实现虚拟DOM的增量渲染
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
    
    > Fiber对现有代码的影响(Reconciliation/Commit Phase)
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

    > 原有React中 每个生命周期函数 在一个加载或更新过程中绝对只会被调用一次 在React Fiber中 第一阶段的生命周期函数在一次加载和更新过程中可能会被多次调用

    - fiber是React16中新的细条引擎或重新实现核心算法 它的主要目标是支持虚拟DOM的增量渲染
    - React Fiber目标是提高其在动画 布局 手势 暂停 中止 或重用等方面的适用性 并为不同类型的更新分配优先级 以及新的并发原语
    - 主要特性是增量渲染 能够将渲染工作分割成块 并将其分散到多个帧

    > fiber设计思想
    - fiber是对react核心算法的重构 facebook团队使用两年多的时间去重构react的核心算法 在react16以上的版本中引入了fiber架构 

    > 为什么需要fiber
    - js引擎和页面渲染引擎是在同一个渲染线程之内的 两者是互斥关系 如果某个阶段执行任务特别长 如在定时器阶段或begin frame阶段执行时候非常长 事件已经明显超过16ms 就会阻塞页面渲染 从而出现卡顿现象
    - react16引入fiber架构之前 react会采用递归对比虚拟dom树 找出需要变动的节点 然后同步更新它们 这个过程react称为reconcilation(协调)[ˌrekənsɪliˈeɪʃn] 在reconcilation期间 react会一直占用浏览器资源 导致用户出发的事件得不到响应
    - 传统的方法存在不能中断和执行栈太深的问题
    - react希望能彻底解决主线程长时间占用问题 于是引入fiber来改变这种不可控的现状 把渲染/更新过程拆分为一个个小块的任务 通过合理的调度机制来调控事件 指定任务执行的时机 从而降低页面卡顿的概率 提升页面交互体验 通过fiber架构 让reconcilation过程变得可被中断 适时让出cpu执行权 让浏览器及时响应用户交互

    > React16中使用了fiber 但是vue没有fiber 原因是两者优化思路不一样
    1. vue是基于template和watcher的组件级更新，把每个更新任务分割得足够小，不需要使用到fiber框架，将任务进行更细粒度的拆分
    2. react不管在哪里调用setstate 都是从根节点开始更新 更新任务较大 需要使用到fiber将大任务分割为多个小任务 可以中断和恢复 不阻塞主进程执行高优先级的任务

    > Fiber
    - 可以理解为是一个执行单元 也可以理解为是一个数据结构

    - 执行单元
        - fiber可以被理解为划分一个个更小的执行单元 它是把一个大任务拆分成很多小任务 一个小任务的执行必须是一次完成 不能出现暂停 但一个小块任务执行后可以移交控制权给浏览器去响应用户 从而不想之前要等大任务执行完再去响应用户

    - 数据结构
        - fiber可以被理解为一种数据结构 react 
        - fiber是采用链表实现的 每个vdom都可以表示为一个fiber 
        - 每个节点都是一个fiber 一个fiber包括child(第一个子节点)sibling(兄弟节点)return(父节点)等属性 react fiber机制的实现 就是依赖于以下数据结构
        - PS: fiber是react进行重构的核心算法 fiber是指数据结构中每一个节点
        
        > requestAnimationFrame
        - 在Fiber中使用到了requestAnimationFrame 它是浏览器提供的绘制动画的soi 
        - 它要求浏览器在下次重绘之前(即下一帧)调用指定的回调函数更新动画

        > requestIdleCallback
        - 是react fiber实现的基础api requestIdleCallback能使开发者在主事件循环上执行后台和低优先级的工作 而不影响延迟关键事件 如动画和输入响应 正常帧任务完成后没超过16ms 说明有多余空闲时间 此时就会执行requestIdleCallback里注册的任务

    - fiber节点设计
        - fiber的拆分单位是fiber(fiber tree上的一个节点) 实际上就是按虚拟dom节点拆 需要根据虚拟dom去生成fiber树
        - *需要根据虚拟DOM生成Fiber树

    - fiber节点包括属性
        1. type & key
        2. stateNode
        3. child & sibling & return

    - fiber执行原理(render commit)
    > 从根节点开始渲染和调用的过程可以分为两个阶段 render阶段 commit阶段
    1. render阶段 这个阶段是可中断的 会找出所有节点的变更
    - 此阶段会找出所有节点的变更 如节点新增 删除 属性变更等 这些变更react统称为副作用effect 此阶段会构建一棵fiber tree 以虚拟dom节点为维度对任务进行拆分 即一个虚拟dom节点对应一个任务 最后产出的结果是effect list 从中知道哪些节点更新 增加 删除
    > 遍历流程
    - react fiber首先将虚拟dom树转化为fiber tree 因此每个节点都有child sibling return属性 遍历fiber tree 时采用的是后序遍历方法
    - 收集effect list
    2. commit阶段 这个阶段是不可中断的 会执行所有的变更
    - commit阶段需要将上阶段计算出来的需要处理的副作用一次执行 此阶段不能暂停 否则会出现UI更新不连续的现象 此阶段需要effect list 将所有更新都commit到DOM树上

    > fiber架构相对于以前的递归更新组件有什么优势
    1. 递归更新组件会让js调用栈占用很长时间
    2. 浏览器是单线程的，它将gui渲染，事件处理，js执行放在一起，只有将其做完才能做下一件事，如果有足够的时间，浏览器会对我们的代码进行编译优化(JIT)及进行热代码优化
    3. Fiber框架正是利用这个原理将组件渲染分段执行，这样浏览器就有时间优化js代码与修正reflow
    
    > react16版本的reconciliation(调和)阶段和commit阶段是什么
    1. reconciliation阶段包含的主要工作是对current tree和new tree做diff计算 找出变化部分 进行遍历 对比等事可以中断的
    2. commit阶段是对上一阶段获取到的变化部分应用到真实的dom树中 是一系列的dom操作 不仅要维护更复杂的dom状态 而且中断后再继续 会对用户体验造成影响 在普遍的应用场景下 此阶段的耗时比diff计算等耗时相对短
    
    > 核心思想
    - Fiber也称协程或纤程 他和线程不一样 协程本身没有并发或并行能力(需要配合线程)它只是一种控制流程的让出机制 
    - 让出CPU的执行权 让CPU能在这段时间执行其他操作 渲染的过程中可以被中断 可以将控制权交回浏览器 让位给高优先级的任务 浏览器空闲后再恢复渲染
23. Mixin 为什么在React推荐使用HOC而不是mixins实现组件复用
    > 什么是mixins
    - 混入mixin提供一种非常灵活的方式 来分发Vue组件中的可复用功能 一个混入组件可以包含任意组件选项 当组件使用混入对象时 所有混入对象的选项被混合进入该组件本身的选项
    
    > 问题
    1. 引入了不清晰的依赖关系
    2. 导致命名冲突
    3. 导致复杂度提升

    1. Mixins引入了不清晰的依赖关系
        - 组件采用了mixins的state和方法 mixins采用了组件的方法 或者mixins又依赖了其他的mixins 这样导致组件和mixins有强耦合的关系 这些关系不是存在同一个文件中 修改组件或修改mixins都是非常危险的行为
    2. mixins导致命名冲突
        - mixins中的state和方法和组件或其他的mixins发生冲突
    3. mixins导致滚雪球般的复杂度
        - 由于之前mixins和组件以及mixins高度耦合 导致新需求出现时 管理代码的复杂度会直线上升 

    1. 被否定 是因为Mixins机制是让多个Mixins共享一个对象的数据空间 这样很难确保不同Mixins依赖的状态不发生冲突
    2. hook直接用在function 而不是class 另一方面每个hook都是相互独立的 不同组件调用同一个hook也能确保各自状态的独立性 这就是两者的本质区别
43. 状态提升- Lefting State Up
    - 将多个组件需要共享的状态提升到它们最近的父组件上 在父组件上改变这个状态 然后通过props分发给子组件
    - 将两个组件需要共享的数据保存在共同的父组件中 然后子组件通过props获取父组件数据
    - 子组件可以调用父组件的方法去更新父组件
    - 一个组件的state只能由这一组件的方法来改变 且只能通过setState()改变
    - 组件的事件处理程序必须绑定this到该组件的构造函数中
        - 在React的类组件中 当把事件处理函数引用作为回调传递过去 事件处理程序方法会丢失其隐式绑定的上下文 当时间被触发并处理程序被调用时 this的值会退回默认绑定 其值为undefined 这时因为类声明和原型方法是以严格模式运行
    - React的render()只能返回一个节点
    - 状态提升思想其实就是将子组件的state提升到父组件 然后这个父组件的任何子组件就能使用这个state 从而达到多个组件之间共享state的目的
44. 上下文context
    - context通过组件树提供了一个传递数据的方法 从而避免在每一个层级手动传递props属性
    - 用法：在父组件上定义getChildContext方法 返回一个对象 然后它的子组件就可以通过this.context属性获取
45. protal 门户
    - portal提供一种很好的将子节点渲染到伏组件以外的dom节点的方式
    - ReactDOM.createPortal(child,container)
    - 第一个参数(child)是任何可渲染的React子元素 
46. 错误边界
    - 部分UI的js错误不应该破坏整个应用程序 为解决这个问题 react16引入错误边界(Error Boundaries)
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
65. React Hooks&class组件对象
    1. React-hook解决的问题
        - hooks通常支持提取和重用多个组件通用的有状态逻辑 而无需承担高阶组件或渲染props的负担 hooks可以轻松操作函数组件的状态 而不需要将它们转换为类组件
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
71. React中的StrictMode(严格模式)
    > StrictMode是一个用来突出显示应用程序中潜在问题的工具
    - 与Fragment一样 StrictMode不会渲染任何可见的UI 
    - 它为其后代元素触发额外的检查和警告 可以为应用程序的任何部分启动严格模式
    
    > StrictMode目前有助于
    1. 识别不安全的生命周期
    2. 关于使用过时字符串ref API的警告
    3. 关于使用废弃的findDOMNode方法的警告
    4. 监测意外的副作用
    5. 监测过时的context API
73. prop drilling钻孔
    - 构建React应用时 在多层嵌套组件来使用另一个嵌套组件提供的数据 最简单的方法是将一个prop从每个组件一层层传递下去 从源组件传递到深层嵌套组件 
    - 缺点 原本不需要数据的组件复杂 难易维护
    - 避免 使用React Context 通过定义提供数据的Provider组件 并允许嵌套的组件通过Consumer组件或useContext hook使用上下文
76. 构造函数constructor和getInitialState区别
    > 两者都是用来初始化state的 前者是ES6中的语法 后者是ES5中的语法 新版本的React已经废弃了该方法
    - getInitialState是ES5中的方法 如果使用createClass方法创建一个Component组件 可以自动调用它的getIntialState方法来获取初始化的State对象
    ```
    var App = React.createClass({
        getInitialState(){
            return {
                userName:'hi',
                userId:0
            }
        }
    })
    ```
    - React在ES6的实现中去掉了getInitialState这个hook函数 规定state在constructor中实现
    ```
    Class App extends React.Component{
        constructor(props){
            super(props);
            this.state={}
        }
    }
    ```
84. deps依赖过多导致hooks难以维护？
    1. 依赖数组依赖的值最好不要超过3个 否则会导致代码难易维护
    2. 如果依赖过多 应该减少
    3. 去掉不必要的依赖
    4. 将hook拆分为更小的单元
    5. 每个hook依赖于各自的依赖数组
    6. 通过合并相关的state 将多个依赖值聚合成一个
    7. 通过setState回调函数获取最新的state 以减少外部依赖
    8. 通过 ref 来读取可变变量的值，不过需要注意控制修改它的途径
89. react的类组件方法需要bind
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
91. 自定义的React组件大写
    - babel在编译时会判断JSX中组件的首字母 当首字母为小写时 其被认定为原生DOM标签 createElment的第一个变量被编译成字符串
    - 当首字母大写时 其被认定为自定义组件 createElement的第一个变量被编译为对象
92. React防止XSS
    - ReactElement对象还有一个?typeof属性 它是一个Symbol类型的变量Symbol.for('react.element') 当环境不支持symbol时 ?typeof被赋值为0xeac7
    - 这个变量可以防止XSS。如果你的服务器有一个漏洞，允许用户存储任意JSON对象， 而客户端代码需要一个字符串，这可能为你的应用程序带来风险。JSON中不能存储Symbol类型的变量，而React渲染时会把没有?typeof标识的组件过滤掉。
94. React生态圈
    1. JSX 
    - 扩展了JS自身的语法 是React的基础 让我们可以在JS中写HTML标记语言 是一门独立的语言
    2. Flux
    - React的数据流组件 可以实现组件间相互通信和数据共享
    3. Redux
    - 比Flux更加简单易用
    4. React-Router
    - 为单文件应用提供了路由功能 用url控制页面显示状态
    5. React-Native(RN)
    - 用React编写原生移动应用 flutter weex(基于Vue)
    6. React-server
    - 服务端渲染React组件
95. 
    1. class与className
    > 之前为什么要使用classname
    - class是JS的保留关键字 JSX是JS的扩展 
    > 现在React中可以使用classname
    - React的JSX虽然看着像HTML 但本质还是JS Vue的JSX看着像React中的JSX 但是更接近于template
    - 从React16开始 可以直接使用class 也可以同时使用class和className 但是className优先级高

    > 
    - React中的HTML代码不是真正的HTML 是一种JSX语法 绝大部分标签同HTML标签一样使用 
    - JSX不会真正创建DOM元素 JSX只是解析模板语法 创建虚拟DOM节点 需经由ReactDOM渲染才会呈现真正的DOM元素

    > JSX
    - 两个特殊属性
        - class->className
        - for->htmlFor
    - 必须要有一个唯一的父元素
    - 单标签必须闭合
    - 表达式/变量要用{} 能被识别成一个变量 不仅可以实现变量替代 可以直接把变量对象写到对应位置

    > State&事件处理
    - State(状态)
        1. 如果组件内的属性需要修改 需要把属性存储在state中 状态一旦变化 组件就会重新渲染
        2. 修改状态时不可以直接修改 需要调用setState()方法
        3. 状态的初始化只能在方法constructor中
    - Props
        - 是只读的不可修改(只能读取 不能写入)
    - 事件
        1. 事件的命名需要采用小驼峰式 而不是纯小写eg:onclick=>onClick onblur=>onBlur
        2. 使用JSX语法时需要传入一个函数作为事件的处理函数而不是一个字符串
        3. 要注意自定义事件中的this指向问题 通过bind()方法修改this
        4. 如果需要阻止浏览器的默认行为 需要使用preventDefault()方法 而不能使用return false
18. react router
    > 声明式路由 函数式路由
    1. 声明式  <NavLink to='/products'/>
    2. 函数式  history.push('/produts')
    - 可以把<Route>组件放在任何想要渲染路由的地方 因为<Route><Link>以及其他的React Router的APIS都只是组件而已
    
    > React Router不是Facebook开发的官方路由解决方案 它只是一个第三方库 因其设计和简单性而广受欢迎
    
    > React Router库包含三个包 
    1. react-router 
    2. react-router-dom 
    3. react-router-native 
    - 路由操作相关的核心包是react-router web应用会使用到react-router-dom react native使用react-router-native

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
        - 其他方法如hostory.goBack和histort.goForward可以用来在历史堆中回溯或前进
    > Link&Route组件
    -   
        - <Route>组件是React Router中最重要的组件 如果当前位置和路由的路径匹配 就会渲染相应的UI 理想情况下 <Route>组件应该有一个名为path的属性 如果路径名称和当前位置匹配 它就会被渲染
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
18. React -Router
    > 实现思想
    - 客户端路由实现思想
    1. 基于hash的路由 通过监听hashchange事件 感知hash的辩护
        - 改变hash可以直接通过location.hash = xxx
    2. 基于H5 history路由
        - 改变url可以通过history,pushState和replaceState等 将URL压入堆栈 同时能够应用history.go()等API
        - 监听url的变化可以通过自定义事件触发实现
    - react-router实现思想
    1. 基于history库来实现上述不同的客户端路由实现思想 并能保存历史记录 磨平浏览器差异 上层无感知
    2. 通过维护的列表 在每次URL发生变化的回收 通过配置的路由路径 匹配到对应的Componennt并且render
    > 配置React-Router实现路由切换
    1. 使用<Route>组件
    - 路由匹配是通过比较<Route>的path属性和当前地址的pathname来实现的 当一个<Route>匹配成功时 它将渲染其内容 当它不匹配时就会渲染null 没有路由的<Route>将始终被匹配
    2. 结合使用<Switch>组件和<Route>组件
    - <Switch>用于将<Route>分组
    - <Switch>不是分组<Route>所必须的 但他通常很有用 一个<Switch>会遍历i去所有的子<Route>元素 并仅渲染与当前地址匹配的第一个元素
    3. 使用<Link><NavLink><Redirect>组件
    - <Link>组件用来在应用程序中创建连接 无论在何处渲染一个<Link>都会在应用程序的HTML中渲染锚<a>
    - 是一种特殊类型 当它的to属性和当前地址匹配时 可将其定义为活跃的
    - 当我们想强制导航时 可以渲染一个<Redirect> 当一个<Redirect>渲染时 它将使用它的to属性进行定向
    
    > React-Router设置重定向
    - 使用<Redirect>组件实现路由重定向
    
    > React-router中Link标签和a标签区别
    - 从最终渲染的DOM来看 这两者都是链接 都是标签 
    - 区别是<Link>是React-router中实现路由跳转的链接 一般配合<Route>使用 react-router接管了其默认的链接跳转行为 
    - 区别于传统的页面跳转 <Link>的跳转行为只会触发相应匹配的<Route>对应的页面内容更新 而不会刷新整个页面
    - <Link>做了三件事
    1. 有onclick就执行onclick
    2. click时组织a标签默认事件
    3. 根据挑战href 用hisory挑战 此时只是链接变了 并没有刷新页面
    - a标签就是普通的超链接了 用于从当前页面跳转到href指向的另一个页面(非锚点情况)

    > React-Router如何获取URL的参数和历史对象
    1. 获取URL的参数
    - get传值
        - this.props.location.search
        - 浏览器提供的API URLSearchParams对象或自己封装的方法解析出id的值
    - 动态路由传值
        - this.props.match.params.id
        - useParams(Hooks)
    - 通过query或state传值
        - this.props.location.state
        - this.props.locationquery
    2. 获取历史对象
        - this.props.history获取历史对象

    > React-Route如何在路由变化时重新渲染同一个组件
    - 当路由变化 即组件的props发生了变化 调用componentWillReceiveProps等生命周期钩子 当路由改变时 根据路由 也去请求数据
    - 利用生命周期componentWillReceiveProps 进行重新render的预处理操作

19. React16渲染流程
    > Stack Reconciler
    - Reacrt16之前的组件渲染方式是递归渲染
    - 渲染父节点 -> 渲染子节点
    - 递归渲染看起来简单 但如果想在子节点的渲染过程中执行优先级更高的操作 只能保留调用栈中子节点的渲染及子节点之前节点的渲染 这样是很复杂的 这种调和/渲染也叫做Stack Reconciler(和解者)

    > Fiber Reconciler(和解着)
    - Fiber使用链表的结构去渲染节点 每一个节点都称之为Fiber Node 每个节点会有三个属性
        1. child指向第一个字节点
        2. sibling指向兄弟节点
        3. return指向父节点
    - Fiber的渲染方式 从父节点开始 向下依次遍历子节点 深度优先渲染完子节点后 再回到其父节点去检查是否有兄弟节点 如果有兄弟节点 则从该兄弟节点开始继续深度优先的渲染 知道回退到根结点结束
    - 重复遍历的节点并不会重复渲染 而是为了取到下一个可能需要渲染的节点
    - 此时每一个节点都是一个渲染任务 从而将整个界面渲染任务拆分成更小的模块 模块可拆分就意味着每次任务执行前都可以去检查是否去执行优先级更高的操作

    > Fiber Node Tree
    - 真实的DOM渲染过程是diff两棵Fiber节点树得到effect list 在commit阶段执行 在React16中 两颗树分别是
    1. current tree
    2. workInProgress tree
    - React并没有实现两棵Fiber Node Tree 实际情况是两颗树上对应的Fiber Node通过alternate属性相互引用

    > React渲染流程
    - 可分为Scheduler Reconcilation Commit三个阶段
    - Scheduler->Reconciliation/Render->Commit->Browser Screen
    1. Scheduler(调度程序)阶段
    - Scheduler阶段主要是创建更新 创建更新的方式
        - ReactDOM.render
        - setState
    - 可以发现React将首次渲染和更新渲染统一了起来
    > ReactDOM.render
    - 调用legacyRenderSubtreeIntoContainer
    > legacyRenderSubtreeIntoContainer
    - 调用root.render root来自调用legacyCreateRootFromDOMContainer
    > legacyCreateRootFromDOMContainer
    1. 清除根节点下的所有子元素
    2. 创建ReactRoot
    > ReactSyncRoot
    > setState
    > enqueueUpdate
    > scheduleWork
    2. Reconciliation阶段
    > workLoop
    - 循环更新 对整颗Fiber树都遍历一遍
    - 循环每渲染完成一个Fiber Node就利用shouldYield来判断是否有优先级更高的任务存在 是则跳出循环 先执行优先级更高的任务 否则继续渲染下一个Fiber Node
    - 判断当前帧是否还有时间更新 如果没有时间更新就将剩余时间去进行其他操作
    > performUnitOfWork
    > beginWork
    > completeWork
    3. commit阶段
    - commit阶段是将调和阶段的更新进行提交 即把更新操作反映到真实的DOM上
    - 同时commit阶段是同步执行的不可被打断

    > Effect
    - 函数式编程经常会看到Effect这个概念 表示副作用 在Fiber架构中 Effect定义了Fiber Node在commit阶段要做的事情 在源码中 也就是EffectTag这个属性
        - 对于组件：更新refs 调用componentDidUpdate
        - 对于DOM：增加 更新 删除DOM
    - Effect组成的链表成为effects list
        - firstEffect:指向第一个更新的节点
        - nextEffect:指向下一个更新的节点

    > commitRoot
    - 使effecs list生效
    1. 第一次遍历effects list(commitBeforeMutationEffects):在更改前读取DOM上的state 这里是getSnapshotBeforeUpdate生命周期调用的地方
    2. 第二次遍历effects list(commitMutationEffects):此阶段是真正改变DOM的阶段
    3. 第三次遍历effects list(commitLayoutEffects):执行生命周期函数componentDidMount componentDidUpdate
20. React16
    - React16后各功能点是多个版本陆陆续续迭代增加的
    > 更新概览
    - React v16.0~React v16.6
    1. Reactv16.0
        1. render支持返回数组和字符串
        2. 支持自定义DOM属性
        3. 减少文件体积
    2. Reactv16.3
        1. createContext
        2. createRef
        3. 生命周期函数的更新
    3. Reactv16.4
        - 更新getDerivedStateFromProps
    4. Reactv16.6
        1. memo
        2. lazy
        3. Suspense
        4. static contextType
        5. static getDerivedStateFromError
    5. Reactv16.7 
        - hooks

    > 新的生命周期函数
    1. 挂载
        1. constructor
            1. 初始化state 
            - 应避免使用props给state赋值 这样state的初始化可以提到constructor外面处理
            2. 给方法绑定this
        2. getDerivedStateFromprops
            - 挂载组件时 该静态方法会在render前执行
            - 更新组件时 该静态方法会在shouldComponentUpdate前执行
            - getDerivedStateFromProps的返回值将作为setState的参数 如果返回null 则不更新state 不能返回object或null以外的值 否则会警告
            - getDerivedStateFromProps是一个静态方法 是拿不到实例this的 所以开发者应该将函数设计成纯函数
        3. render
        4. componentDidMoun
    2. 更新
        1. getDerivedStateFromProps
        2. shouldComponentUpdate
        3. render
        4. getSnapShotBeforeUpdate
            - 在React更新DOM之前调用 此时state已更新 返回值作为componentDidUpdate的第三个参数 一般用于获取render之前的DOM数据
            - getSnapSlotBeforeUpdate的使用场景一般是获取组件更新之前的滚动条位置
        5. componentDidUpdate
    3. 卸载
        - componentWillUnmount
    4. 异常
        - componentDidCatch
        - 此生命周期在后代组件抛出错误后被调用 它接收两个参数
        1. error 抛出的错误
        2. info 带有componentStack key的对象 其中包含有关组件引发错误的栈信息
        - 这个函数是React16新增的 用于捕获组件树的异常 如果render()函数抛出错误 则会触发该函数 可以按照try catch来理解和使用 在可能出现错误的地方 使用封装好的包含componentDidCatch生命周期的组件包裹可能出错的组件
    > getDefaultProps 
    - 这个函数会在组件创建之前被调用一次(有且仅有一次) 它被用来初始化组件的props
    > getInitialState
    - 用于初始化组件的state值
21. Component Element Instance区别和联系
    1. 元素: 一个元素element是一个普通对象(plain object)描述对于一个DOM节点或其他组件component 想让它在屏幕上呈现什么样子 
    - 元素element可以在它的属性props中包含其他元素(用于形成元素树)创建一个React元素element的成本很低 元素element创建之后是不可变的
    2. 组件：一个组件component可以通过多种方式声明 可以是带有一个render()方法的类 简单点也可以定义为一个函数 这两种情况下 它都把属性props作为输入 把返回的一颗元素树作为输出
    3. 实例：一个实例instance是你在所写的组件类component class中使用关键字this所指向的东西(组件实例) 它用来存储本地状态和响应生命周期事件很有用
    - 函数组件没有实例instance 
    - 类组件有实例instance 但是永远也不需要直接创建一个组件的实例 因为react帮我们做了这些
22. React.createClass和extends Component的区别
    1. 语法
    2. propType和getDefaultProps
    3. 状态
    4. this
    5. mixins
23. 哪些方法会触发React重新渲染 重新渲染render会做什么
    > 哪些方法
    1. setState()
    - 执行setState时不一定会重新渲染 当setState传入null时并不会触发render
    2. 父组件重新渲染
    - 父组件重新渲染时 不管传入的props有没有变化都会引起子组件的重新渲染
    > 重新渲染会做什么
    1. Diff
    2. 深度优先遍历
    3. 遍历差异对象 根据差异类型 根据对应规则更新VNODE
24. React中Fragment理解 使用场景
    - React中 组件返回的元素只能有一个根元素 为了不添加多余的DOM节点 可以使用Fragment标签来包裹所有的元素 Fragement标签不会渲染出任何元素 React对Fragement解释
    - React中的一个常见模式是一个组件返回多个元素 Fragments允许你将子列表分组 而无需向DOM添加额外节点
25. React中可以在render访问refs吗
    - 不可以
    - render阶段 DOM还没生成 无法获取DOM DOM的获取需要在pre-commit阶段和commit阶段
26. React的插槽Portals的理解 如何使用 有哪些使用场景
    - Portal提供一种将子节点渲染到存在于父组件以外的DOM节点的优秀方案
    - Portal是React16提供的官方解决方案 使得组件可以脱离父组件层级挂载在DOM树的任何位置
    - render一个组件 但这个组件的DOM结构不在本组件内
    > Portals语法
    ```
    ReactDOM.createPortal(child,container);
    ```
    1. 第一个参数child是可渲染的React子项 比如元素 字符串或片段等
    2. 第二个参数container是一个DOM元素
    - 一般情况下 组件的render函数返回的元素会被挂载在它的父级组件上
    - 然而 有些元素需要被挂载在更高层级的位置 
    - 父组件具有overflow:hidden或z-index的样式设置时 组件有可能被其他元素震荡 这时就可以考虑要不要使用Portal使组件的挂载脱离父组件
    - 如对话框 模拟窗
27. 对React.Intl理解 工作原理
    - React-intl是雅虎的语言国际化开源项目FormatJS的一部分 通过其提供的组件和API可以和ReactJS绑定
    - React-Intl提供两种使用方法
    1. 一种是引用React组件
    2. 一种是直接调取API
    - 官方更加推荐在React项目中使用前者 只有在无法使用React组件的地方 才应该调用框架提供的API 它提供了一系列的React组件 包括数字格式化 字符串格式化 日期格式化等
    - 在React-intl中可以配置不同的语言包 它的工作原理就是根据需要 在语言包之间进行切换
28. React Context理解
    - 不想在组件树木中通过逐层传递props或者state的方式来传递数据时 可以使用Context来实现跨层级的组件数据传递
    - 由于组件的context由其父节点链上所有组件通过getChildContext()返回的Context对象组合而成 所以组件通过Context是可以访问到其父组件链上所有节点组件提供的Context属性
    > React不推荐使用Context
    1. 目前还处于实验阶段
    2. 
    3. 
    4. context的更新需要通过setState()的触发 但这并不是很可靠的 Context支持跨组件访问 但如果中间的子组件通过一些方法不影响 更新 如should返回false 不能保证context的更新一定可以使用Context的子组件 因此Context可靠性需要关注
29. getDefaultProps
    - 通过实现组件的getDefaultProps对属性设置默认值 ES5写法
30. propType
    - 当我们向props传入数据无效(与验证的数据类型不符)就会在控制台发出警告信息
    - 它可以避免随着应用越来越复杂而出现的问题 它可以让程序变得更易读
    - 当然 如果项目中使用了TS 就可以不用proptypes来校验 而使用TS定义接口来校验props
31. React最新版本解决了什么问题 添加了哪些东西
    > React16.x三大新特性 Time Slicing Suspense(悬念) hooks
    1. Time Slicing(解决CPU速度问题)
        - 使得在执行任务时期可以随时暂停(调和阶段) 跑去干别的事情 这个特性使得react能在性能及其差的机器跑时 仍然保持良好的性能
    2. Suspense(解决网络IO问题) 
        - 和lazy配合 实现异步加载组件 能暂停当前组件的渲染 当完成某件事以后 再继续渲染 解决了从react出生到现在都存在的异步副作用问题 而且解决的非常的优雅 使用的是异步但是是同步的写法
        - 提供了一个内置函数ComponentDidCatch 当有错误发生时 可以友好的展示fallback组件 可以捕捉到它的字元素(包括嵌套子元素)抛出的异常 可以复用错误组件
32. React中页面重新加载 如何保留数据
    1. Redux 将页面数据存储在redux中 在重新加载页面时 获取Redux中的数据
    2. data.js 使用Webpack构建的项目 可以建一个文件 data.js 将数据保存data.js中 跳转页面后获取
    3. sessionStorage
    4. history API 的pushState函数可以给历史记录关联一个任意的可序列化state 所以可以在路由push时将当前页面的一些信息存到state中 下次返回到这个页面就能从state里面取出离开前的数据重新渲染 react-router直接可以支持 这个方法适合一些需要临时存储的场景
33. 
    1. react 包含react所必须的核心代码
    2. react-dom react渲染在不同平台所需要的核心代码
    3. babel 将jsx转换成react代码的工具
34. React中必须使用JSX吗
    - React并不强制要求使用JSX 不想在构建环境中配置有关JSX编译时 不在React中使用JSX会更加方便
    - 每个JSX元素只是调用React.createElement(component,props,...children)的语法糖 因此使用JSX可以完成的任何事情 都可以通过纯JS完成
35. React.children.map和js的map区别
    - JS中的map不会对为null或undefined的数据进行处理
    - React.Children.map中的map可以处理React.Children为null或undefined的情况
36. 对React SSR的理解
    - 服务器端渲染是数据和模版组成的HTML 即HTML= 数据+模版 
    - 将组件或页面通过服务器生成html字符串 再发送到浏览器 最后将静态标记混合为客户端上完全交互的应用程序 
    - 页面没使用服务端渲染 当请求耶main时 返回的body里为空 之后执行js将html结构注入到body里 结合css显示出来
37. 引用透明
    - 函数如果不依赖外部变量或状态 只依赖输入的参数 就是引用透明的
    - 我们如果能用唯一的值来替换调用的函数表达式并且不改变程序运行状态 就证明这个函数是引用透明的
    - 引用透明的函数必须是纯函数
38. redux immutablejs mobx性能优化
    1. 页面加载 redux>immutablejs>mobx
    2. 实际渲染速度 mobx>immutablejs>redux
    > mobx用户操作渲染速度快的原因
    1. 本质上是谁能让react做最少的事情 谁就快
38. immutablejs
    - JS中 引用类型的数据 优点在于频繁的操作数据都是在原对象的基础上修改的 不会创建新对象 从而可以有效利用内存 不会浪费内存 这种特性叫做mutable可变 但是太过灵活在复杂数据场景下造成了它的不可控性 
    - 为了解决这种问题 出现immutable对象 每次修改immutable对象都会创建一个新的不可变对象 而老的对象不会改变
    > immutablejs
    - 现今实现immutable数据结构的JS类库有好多 immutablejs是其中比较主流的库之一
    - 出自Facebook 是最流行的不可变数据结构的实现之一 从头开始实现了完全的持久化数据结构 通过tries这样的先进技术来实现结构共享 所有的更新操作都会返回新的值 但是在内部结构是共享的 来见减少内存占用(和垃圾回收的失效)
    > 三大特性
    1. Persistent data structure 持久化数据结构
        - imuttablejs提供十余种不可变的类型 List Map Set Seq Collection Range
        - immutable使用先进的tries(字典树)技术实现结构共享来解决问题 当对一个immutable对象进行操作时 immutableJS只会clone该节点及其祖先节点 其他保持不变 这样可以共享相同的部分 大大提高性能
    2. structural sharing 结构共享
    3. support lazy operation 惰性操作
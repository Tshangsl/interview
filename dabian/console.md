
## 微搭控制台接入

## Step1-为什么要写这篇文档
    内容:主要是作者刚接触控制台，从不熟悉到慢慢熟悉过程中，学习的知识点，遇到的困难以及如何解决
    目的:在于给新接手控制台需求的同学一些帮助，减少接入熟悉成本，能尽快入手并且完成相关需求。
## Step2-开发前
##### 1. 开发控制台要了解哪些技术
Redux 
React Hooks React-Redux Redux-Saga
Saga-Duck
Generator
TS
Whistle
#####2. 为什么要了解这些技术
```
微搭控制台主要技术栈支持为React和TS，其中有使用到saga-duck
学习saga-duck前，作者学习的前置知识有react-redux状态管理机制，redux-saga中间件，扩展学习了一下redux-thunk中间件
学习redux-thunk的目的是为了进一步理解redux-saga异步处理的机制，但是不了解redux-thunk并不影响开发控制台
由于redux-saga是通过generator实现的，如果对generator语法不熟悉的同学可以简单看一下相关文档
代码架构主要基于React框架+TypeScript，Hooks和TS也要做相关了解,现在正在重构控制台代码，将其由duck转为hooks
实际代码开发中调试要用到浏览器代理whistle
以上所有谈及的技术点，作者都会在本文中分享自己的学习笔记，并且贴出网络上该技术点相关。
```
#####3. 控制台代码接入规范
```
团队规范
git commit -m "fix: 这里是你的注释"， 即注释前需要加相应的代表这次提交的类型，统一类型命名如下：

feat:新功能
fix:修复一个bug
docs:只改了文档
style:修改不涉及代码的主要逻辑(如格式化了代码)
refactor:改动了代码，既不是新功能也不是修复bug
perf:优化了代码，提升了性能
test:增加或修改了代码测试
build:更改了构建流程相关的配置文件和包(如glup, npm)
ci:更改了CI配置文件或脚本等(如Travis, Circle, BrowserStack, SauceLabs)
chore:其它不涉及源代码和测试代码的修改
revert: git revert一次提交
GIT创建分支规范
新建一个特性分支：git checkout -b feature/xxxx
新建一个BUG 分支: git checkout -b hotfix/xxx
```
#####4. 控制台代码
https://git.woa.com/QBase/lcap/tea-app-lcap 
#####5. devmode.enter()
```
开发控制台前，应该注意要在控制台console中打印devmode.enter()进入开发者模式，否则调试错误会报到现网，影响项目评分。
```
#####6. 控制台云API接口文档
https://tcloud-dev.oa.com/document/product/1505/59132?!preview&amp;!document=1
#####7. 控制台原接口文档    
http://tapd.oa.com/TCB_new/markdown_wikis/show/#1220422223001745303
#####8. 控制台环境和部署相关
http://tapd.oa.com/TCB_new/markdown_wikis/show/#1220422223001952067
#####9.tcb代码
https://git.woa.com/QBase/tea-app-tcb
#####10.saga-duck补充学习文档,此文档可能有设置文档查看权限。
http://tapd.oa.com/personal_documents/show/1100000000000460312#target:toc43
## Step3-技术分享
##### 如有对文章开始介绍的技术都已有充分了解的同学 可以绕过此部分技术分享 直接看Step4
因为作者是个初学者，所以下方很多技术分享都是搬运我学习过程中，找到的特别好的文档博客，并汇总到这篇文章中，我会在每部分技术分享后面标明该部分引用了哪些文章。
另由于技术点稍多，篇幅限制，此处不会做特别细致的分享。
###  1. Redux
####Redux设计思想
```
Web 应用是一个状态机，视图与状态是一一对应的。
所有的状态，保存在一个对象里面。
```
####基本概念和API
#####Store 
保存数据的地方，整个应用只能有一个 Store。Redux 提供createStore函数，用来生成 Store。
```
import { createStore } from 'redux';
const store = createStore(fn);
```
#####State
Store对象包含所有数据。如果想得到某个时点的数据，就要对 Store 生成快照。这种时点的数据集合，就叫做 State。当前时刻的 State，可以通过store.getState()拿到。Redux 规定， 一个 State 对应一个 View。只要 State 相同，View 就相同。
```
import { createStore } from 'redux';
const store = createStore(fn);
const state = store.getState();
```
#####Action
State 的变化，会导致 View 的变化。但是，用户接触不到 State，只能接触到 View。所以，State 的变化必须是 View 导致的。Action 就是 View 发出的通知，表示 State 应该要发生变化了。
Action 是一个对象。其中的type属性是必须的，表示 Action 的名称。其他属性可以自由设置，社区有一个规范可以参考。
```
const action = {
	type: 'ADD_TODO',
	payload: 'Learn Redux'
};
```
上面代码中，Action 的名称是ADD_TODO，它携带的信息是字符串Learn Redux。
可以这样理解，Action 描述当前发生的事情。改变 State 的唯一办法，就是使用 Action。它会运送数据到 Store。
#####Action Creator
View 要发送多少种消息，就会有多少种 Action。如果都手写，会很麻烦。可以定义一个函数来生成 Action，这个函数就叫 Action Creator。
```
const ADD_TODO = '添加 TODO';

function addTodo(text) {
        return {
            type: ADD_TODO,
            text
        }
}
```
#####store.dispatch()
store.dispatch()是 View 发出 Action 的唯一方法。
```
import { createStore } from 'redux';
const store = createStore(fn);

store.dispatch({
        type: 'ADD_TODO',
        payload: 'Learn Redux'
});
```
上面代码中，store.dispatch接受一个 Action 对象作为参数，将它发送出去。
结合 Action Creator，这段代码可以改写如下。
store.dispatch(addTodo('Learn Redux'));
#####Reducer
Store 收到 Action 以后，必须给出一个新的 State，这样 View 才会发生变化。这种 State 的计算过程就叫做 Reducer。
Reducer 是一个函数，它接受 Action 和当前 State 作为参数，返回一个新的 State。
```
const reducer = function (state, action) {
        // ...
        return new_state;
};

const action = addTodo('Learn Redux');
```
上面代码中，addTodo函数就是一个 Action Creator。
这部分特别推荐看阮一峰老师的这一篇博客，写得非常好，文档链接如下。本文关于Redux的知识分享基本上都是来自这篇文章。
https://www.ruanyifeng.com/blog/2016/09/redux_tutorial_part_one_basic_usages.html
####整体工作流程
![](https://main.qcloudimg.com/raw/cdb0e3680e0e9afe672b0186e4b7e92d.png)
首先，用户发出 Action。
```
store.dispatch(action);
```
然后，Store 自动调用 Reducer，并且传入两个参数：当前 State 和收到的 Action。 Reducer 会返回新的 State 。
```
let nextState = todoApp(previousState, action);
```
State 一旦有变化，Store 就会调用监听函数。
设置监听函数
```
store.subscribe(listener);
``` 
`listener` 可以通过 `store.getState()` 得到当前状态。如果使用的是 React，这时可以触发重新渲染 View。
```
function listerner() {
  	let newState = store.getState();
  	component.setState(newState);   
}
```
#####Redux API
```
createStore(fn,) 用来生成store，该方法还可以接受第二个参数 表示state的最初状态 这通常是服务器给出的 如果提供了这个参数 它会覆盖Reducer函数的默认初始值
store.getState() 获取当前时刻的state
store.dispatch() View发出Action唯一方法
store.subscribe() Store允许使用该方法设置监听函数 一旦State发生变化 就自动执行这个函数，只要把View的更新函数(对于React项目就是组件的render方法或setState方法放入listen就会实现View的自动渲染 store.subscribe方法返回一个函数 调用这个函数就能解除监听)
```
#####关于异步
reducer必须是纯函数不支持异步，但是它支持中间件
###  2.React-Redux
    
####Redux 和 React 之间没有关系。
为了方便使用，Redux 的作者封装了一个 React 专用的库 React-Redux。
这个库是可以选用的。实际项目中，你应该权衡一下，是直接使用 Redux，还是使用 React-Redux。后者虽然提供了便利，但是需要掌握额外的 API，并且要遵守它的组件拆分规范。

####为什么React需要React-Redux
#####React单项数据流
React有props和state:
1.props意味着父级分发下来的属性
2.state意味着组件内部可以自行管理的状态，并且整个React没有数据向上回溯的能力，这就是react的单向数据流
这就意味着如果是一个数据状态非常复杂的应用，更多的时候发现React根本无法让两个组件互相交流，使用对方的数据，react的通过层级传递数据的这种方法是非常难受的，这个时候，迫切需要一个机制，把所有的state集中到组件顶部，能够灵活的将所有state各取所需的分发给所有的组件，这就是redux
####UI 组件
React-Redux 将所有组件分成两大类：UI 组件（presentational component）和容器组件（container component）。
UI 组件有以下几个特征。
        只负责 UI 的呈现，不带有任何业务逻辑
        没有状态（即不使用this.state这个变量）
        所有数据都由参数（this.props）提供
        不使用任何 Redux 的 API
```
const Title =
value =&gt; <h1>{value}</h1>;
```
因为不含有状态，UI 组件又称为"纯组件"，即它和纯函数一样，纯粹由参数决定它的值。
        
####容器组件
容器组件的特征恰恰相反。
负责管理数据和业务逻辑，不负责 UI 的呈现
带有内部状态
使用 Redux 的 API
####一句话总结UI组件和容器组件
UI 组件负责 UI 的呈现，容器组件负责管理数据和逻辑。
####一个组件既有 UI 又有业务逻辑
将它拆分成下面的结构：外面是一个容器组件，里面包了一个UI 组件。前者负责与外部的通信，将数据传给后者，由后者渲染出视图。
React-Redux 规定，所有的 UI 组件都由用户提供，容器组件则是由 React-Redux 自动生成。也就是说，用户负责视觉层，状态管理则是全部交给它。
####connect()
React-Redux 提供connect方法，用于从 UI 组件生成容器组件。connect的意思，就是将这两种组件连起来。
```
import { connect } from 'react-redux'
const VisibleTodoList = connect()(TodoList);
```
上面代码中，TodoList是 UI 组件，VisibleTodoList就是由 React-Redux 通过connect方法自动生成的容器组件。
但是，因为没有定义业务逻辑，上面这个容器组件毫无意义，只是 UI 组件的一个单纯的包装层。为了定义业务逻辑，需要给出下面两方面的信息。
（1）输入逻辑：外部的数据（即state对象）如何转换为 UI 组件的参数
（2）输出逻辑：用户发出的动作如何变为 Action 对象，从 UI 组件传出去。
####connect方法的完整 API 如下。
```
import { connect } from 'react-redux'

const VisibleTodoList = connect(
        mapStateToProps,
        mapDispatchToProps
)(TodoList)
```
上面代码中，connect方法接受两个参数：mapStateToProps和mapDispatchToProps。它们定义了 UI 组件的业务逻辑。前者负责输入逻辑，即将state映射到 UI 组件的参数（props），后者负责输出逻辑，即将用户对 UI 组件的操作映射成 Action。

####mapStateToProps()
mapStateToProps是一个函数。它的作用就是像它的名字那样，建立一个从（外部的）state对象到（UI 组件的）props对象的映射关系。
作为函数，mapStateToProps执行后应该返回一个对象，里面的每一个键值对就是一个映射。
```
const mapStateToProps = (state) =&gt; {
return {
          todos: getVisibleTodos(state.todos, state.visibilityFilter)
        }
}
```
mapStateToProps是一个函数，它接受state作为参数，返回一个对象。这个对象有一个todos属性，代表 UI 组件的同名参数，后面的getVisibleTodos也是一个函数，可以从state算出 todos 的值。
下面是getVisibleTodos的一个例子，用来算出todos。
```
const getVisibleTodos = (todos, filter) =&gt; {
switch (filter) {
    case 'SHOW_ALL':
        return todos
    case 'SHOW_COMPLETED':
        return todos.filter(t =&gt; t.completed)
    case 'SHOW_ACTIVE':
        return todos.filter(t =&gt; !t.completed)
    default:
	    throw new Error('Unknown filter: ' + filter)
    }
}
```
mapStateToProps订阅 Store，当state更新时候，就会自动执行，重新计算 UI 组件的参数，从而触发 UI 组件的重新渲染。

mapStateToProps的第一个参数总是state对象，还可以使用第二个参数，代表容器组件的props对象。
```
// 容器组件的代码
//    &lt;FilterLink filter="SHOW_ALL"&gt;
//      All
//    &lt;/FilterLink&gt;

const mapStateToProps = (state, ownProps) =&gt; {
        return {
            active: ownProps.filter === state.visibilityFilter
        }
}
```
使用ownProps作为参数后，如果容器组件的参数发生变化，也会引发 UI 组件重新渲染。

connect方法可以省略mapStateToProps参数，那样的话，UI 组件就不会订阅Store，即Store 的更新不会引起 UI 组件的更新。
    
####mapDispatchToProps()
mapDispatchToProps是connect函数的第二个参数，用来建立 UI 组件的参数到store.dispatch方法的映射。它定义了哪些用户的操作应该当作 Action，传给 Store。它可以是一个函数，也可以是一个对象。
如果mapDispatchToProps是一个函数，会得到dispatch和ownProps（容器组件的props对象）两个参数。
```
const mapDispatchToProps = (
        dispatch,
        ownProps
) =&gt; {
    return {
            onClick: () =&gt; {
            dispatch({
                type: 'SET_VISIBILITY_FILTER',
                filter: ownProps.filter
            });
     }
    };
}
```
mapDispatchToProps作为函数，应该返回一个对象，该对象的每个键值对都是一个映射，定义了 UI 组件的参数怎样发出 Action。

如果mapDispatchToProps是一个对象，它的每个键名也是对应 UI 组件的同名参数，键值应该是一个函数，会被当作 Action creator ，返回的 Action 会由 Redux 自动发出。举例来说，上面的mapDispatchToProps写成对象就是下面这样。
```
const mapDispatchToProps = {
        onClick: (filter) =&gt; {
            type: 'SET_VISIBILITY_FILTER',
            filter: filter
        };
}
```
####&lt;Provider&gt; 组件
connect方法生成容器组件以后，需要让容器组件拿到state对象，才能生成 UI 组件的参数。
一种解决方法是将state对象作为参数，传入容器组件。但是，这样做比较麻烦，尤其是容器组件可能在很深的层级，一级级将state传下去就很麻烦。
React-Redux 提供Provider组件，可以让容器组件拿到state。
```
        import { Provider } from 'react-redux'
        import { createStore } from 'redux'
        import todoApp from './reducers'
        import App from './components/App'

        let store = createStore(todoApp);

        render(
        &lt;Provider store={store}&gt;
            &lt;App /&gt;
        &lt;/Provider&gt;,
        document.getElementById('root')
        )
```
上面代码中，Provider在根组件外面包了一层，这样一来，App的所有子组件就默认都可以拿到state了。

它的原理是React组件的context属性，源码如下。
```
class Provider extends Component {
        getChildContext() {
            return {
            store: this.props.store
            };
        }
        render() {
            return this.props.children;
        }
        }

        Provider.childContextTypes = {
        store: React.PropTypes.object
}
```
上面代码中，store放在了上下文对象context上面。然后，子组件就可以从context拿到store，代码大致如下。
```
        class VisibleTodoList extends Component {
        componentDidMount() {
            const { store } = this.context;
            this.unsubscribe = store.subscribe(() =&gt;
            this.forceUpdate()
            );
        }

        render() {
            const props = this.props;
            const { store } = this.context;
            const state = store.getState();
            // ...
        }
        }

        VisibleTodoList.contextTypes = {
        store: React.PropTypes.object
        }
```
React-Redux自动生成的容器组件的代码，就类似上面这样，从而拿到store。
####React-Redux&Vuex
https://blog.csdn.net/hyupeng1006/article/details/80755667
####Vue&React
https://juejin.cn/post/6844903668446134286
####React-Redux官方文档 
https://www.redux.org.cn/docs/react-redux/
####阮一峰老师关于React-Redux的使用文档       
https://www.ruanyifeng.com/blog/2016/09/redux_tutorial_part_three_react-redux.html
####相关引用文档
https://juejin.cn/post/6844903846666321934
###   3.Redux-Saga 

####什么是中间件以及为什么要引入中间件
Redux 的基本做法：用户发出 Action，Reducer 函数算出新的 State，View 重新渲染。
一个关键问题没有解决：异步操作怎么办？Action 发出以后，Reducer 立即算出 State，这叫做同步；Action 发出以后，过一段时间再执行 Reducer，这就是异步。
怎么才能 Reducer 在异步操作结束后自动执行呢？这就要用到新的工具：中间件（middleware）。
```
let next = store.dispatch;
store.dispatch = function dispatchAndLog(action) {
        console.log('dispatching', action);
        next(action);
        console.log('next state', store.getState());
}
```
上面代码中，对store.dispatch进行了重定义，在发送 Action 前后添加了打印功能。这就是中间件的雏形。

中间件就是一个函数，对store.dispatch方法进行了改造，在发出 Action 和执行 Reducer 这两步之间，添加了其他功能。
####中间件的使用
applyMiddlewares方法它是Redux的原生方法，作用是将所有中间件组成一个数组，依次执行。
 `createStore` 方法可以接受整个应用的初始状态作为参数，那样的话， `applyMiddleware` 就是第三个参数了。
```
const store = createStore(
  reducer,
  initial_state,
  applyMiddleware(logger)
);
```
中间件的次序有讲究
```

const store = createStore(
  reducer,
  applyMiddleware(thunk, promise, logger)
);
```
上面代码中， `applyMiddleware` 方法的三个参数，就是三个中间件。有的中间件有次序要求，使用前要查一下文档。比如， `logger` 就一定要放在最后，否则输出结果会不正确。

####redux-saga中间件
redux-saga 是一个用于管理应用程序 Side Effect（副作用，例如异步获取数据，访问浏览器缓存等）的 library，它的目标是让副作用管理更容易，执行更高效，测试更简单，在处理故障时更容易。

可以想像为，一个 saga 就像是应用程序中一个单独的线程，它独自负责处理副作用。 redux-saga 是一个 redux 中间件，意味着这个线程可以通过正常的 redux action 从主应用程序启动，暂停和取消，它能访问完整的 redux state，也可以 dispatch redux action。

redux-saga 使用了 ES6 的 Generator 功能，让异步的流程更易于读取，写入和测试。（如果你还不熟悉的话，这里有一些介绍性的链接） 通过这样的方式，这些异步的流程看起来就像是标准同步的 Javascript 代码。（有点像 async/await，但 Generator 还有一些更棒而且我们也需要的功能）。

你可能已经用了 redux-thunk 来处理数据的读取。不同于 redux thunk，你不会再遇到回调地狱了，你可以很容易地测试异步流程并保持你的 action 是干净的。
####Saga辅助函数
#####takeEvery
takeEvery 允许多个 fetchData 实例同时启动。在某个特定时刻，尽管之前还有一个或多个 fetchData 尚未结束，我们还是可以启动一个新的 fetchData 任务，
如果我们只想得到最新那个请求的响应（例如，始终显示最新版本的数据）。我们可以使用 takeLatest 辅助函数。
#####takeLatest  
和 takeEvery 不同，在任何时刻 takeLatest 只允许一个 fetchData 任务在执行。并且这个任务是最后被启动的那个。 如果已经有一个任务在执行的时候启动另一个 fetchData ，那之前的这个任务会被自动取消。

####一个常见的抽象概念：Effect
概括来说，从 Saga 内触发异步操作（Side Effect）总是由 yield 一些声明式的 Effect 来完成的 （你也可以直接 yield Promise，但是这会让测试变得困难，就像我们在第一节中看到的一样）。

一个 Saga 所做的实际上是组合那些所有的 Effect，共同实现所需的控制流。 最简单的例子是直接把 yield 一个接一个地放置来对序列化 yield Effect。你也可以使用熟悉的控制流操作符（if, while, for） 来实现更复杂的控制流。

我们已经看到，使用 Effect 诸如 call 和 put，与高阶 API 如 takeEvery 相结合，让我们实现与 redux-thunk 同样的东西， 但又有额外的易于测试的好处。

但 redux-saga 相比 redux-thunk 还提供了另一种好处。 在「高级」一节，你会遇到一些更强大的 Effect，让你可以表达更复杂的控制流的同时，仍然拥有可测试性的好处。

####Effect Creator
#####1. take(pattern)
监听未来的action 它创建了一个命令对象 告诉middleware等待一个特定的action Generator会暂停 直到一个与pattern匹配的action被发起 才会继续执行下面的语句 
take是一个阻塞的effect
```
function* watchFetchData(){
         while(true){
                    yield take('FETCH_REQUESTED');
                    yield fork(fetchData);
          }
}
```
#####2.put(action)
用来发送action的Effect 可理解为redux框架中的dispatch函数 当put一个action后 reducer中就会计算新的state并返回
put是一个阻塞的effect
```
export function* toggleItemFlow(){
                let list = [];
                //发送一个type为'UPDATE_DATA'的action 用来更新数据 参数为`data:list`
                yield put({
                    type:actionTypes.UPDATE_DATA,
                    data:list
                })
}
```
#####3.call(fn,...args)
可以调用其他函数的函数 它命令middleware来调用fn函数 args为函数的参数 PS:fn函数可以是一个Generator函数 也可以是一个返回Promise的普通函数
call是一个阻塞effect
```
export const delay = ms=&gt;
new Promise(resolve=&gt;setTimeout(resolve,ms))
            export function* removeItem(){
                try{
                    //这里call函数调用了delay函数 delay函数为一个返回promise的函数
                    return yield call(delay,500)
                }catch(err){
                    yield put({type:actionTypes.ERROR})
                }
            }
```
#####4.fork(fn,...args)
和call函数很像 是用来调用其他函数的 程序执行完yield fork(fn,args)这一行代码后 会立即接着执行下一行代码语句 而不会等待fn函数返回结果 
fork是一个非阻塞effect
```
import {fork} from 'redux-saga/effects'
export default function* rootSaga(){
        //下面四个Generator函数会一次执行 不会阻塞执行
         yield fork(addItemFlow);
         yield fork(removeItemFlow);
         yield fork(toggleItemFlow);
         yield fork(modifyItemFlow);
}
```
#####5.select(selector,...args)
用来指示middleware调用提供的选择器获取Store上的state数据 理解为redux框架中获取store上的state数据一样的功能 store.getState()
```
export function* toggleItemFlow(){
//通过select effect来获取全局state上的`getTodoList`的list
      let tmpList = yield select(state=&gt;state.getTodoList.list)
}
```
创建一个Effect 用来命令middleware在当前Store的state上调用指定的选择器(即返回selector(getState(),...args)的结果
selector Function 一个(state,...args)=&gt;args的函数 它接受当前state和一些可选参数 并返回当前Store state上的一部分数据
            
#####6.delay(ms,[val])
返回一个效果描述符以阻止执行ms几毫秒并返回val值
####redux-saga&redux-thunk
#####redux-thunk
是redux作者给出的中间件 实现极为简单 10多行代码
判别action类型,如果action是函数,就调用这个函数,调用步骤action(dispatch,getState,extraArgument)定义action为thunk函数时 一般形参为dispatch和getState
#####redux-saga
redux-saga是控制执行的generator 在redux-saga中action是原始js对象 把所有的异步副作用操作放在了sage函数里面 统一了action的形式 使得异步操作集中可以被集中处理
redux-saga是通过generator实现的，如果不支持generator需要通过插件babel-polyfill转义
和调用redux的其他中间件一样 如果想使用redux-saga中间件 那么只要在applyMiddleware中调用一个createSagaMiddleware的实例 唯一不同的是需要调用run方法使得generator可以开始执行
#####区别
对于redux-thunk的整个流程来说，它是等异步任务执行完成之后，我们再去调用dispatch，然后去store去调用reduces。
对于redux-saga的整个流程来说，它是等执行完action和reducer之后，判断reducer中有没有这个action
redux-thunk和redux-saga处理异步任务的时机不一样。对于redux-saga，相对于在redux的action基础上，重新开辟了一个 async action的分支，单独处理异步任务
#### 官方文档
https://redux-saga.js.org/
####文档引用与推荐-掘金

https://juejin.cn/post/6844903635747340296
https://juejin.cn/post/6844903846666321934
https://juejin.cn/post/6844903503500935176
https://juejin.cn/post/6844903669305966599

### 4. Saga-Duck

####Sags-Duck
是基于ducks/策略模式思想，实现了模块化、可复用、可扩展及可组合特性的redux-saga开发方案。在使用Redux时，我们发现业务逻辑过于分散，没有模块化，于是决定使用ducks模式来管理代码。因为业务交互复杂，使用了redux-saga来管理逻辑，这就需要duck能支持redux-saga，并可以扩展和组合使用。extensible-duck 是个很不错的方案，但是它没有考虑支持redux-saga，并且组合使用不太方便，于是我们便重新造一个轮子。
    
####官方文档
https://cyrilluce.gitbook.io/saga-duck/

####内部补充文档
该文档可能会有权限限制，如不能正常访问，可询问相关同学。由于该文档内已包含了saga-duck的一系列基本使用方法，所以在此不赘述。
http://tapd.oa.com/personal_documents/show/1100000000000460312#target:toc43

###   5.React Hooks
####Hooks官网介绍
React 16.8 中的新增功能。让您无需编写类即可使用状态和其他 React 功能。
#### 规则
Hooks是JS函数，但它们强加了两个额外的规则。
1.只在顶层调用Hooks。不要在循环，条件或嵌套函数中调用Hook
2.只从React函数组件调用Hooks。不要从常规JS函数调用Hook。(只有另一个有效的地方可以调用Hooks--你自己的自定义Hooks)
####什么是钩子
Hook是一个特殊的函数，可以让你挂钩到React的特性。例如，useState是一个Hook，可让您将React状态添加到函数组件。
####常用的Hooks
#####useState
```
const [state, setState] = useState(initialState)
```
返回一个有状态的值和一个更新它的函数。
在初始渲染期间，返回的状态(state)与作为第一个参数(initialState)传递的值相同。
该setState函数用于更新状态，它接受一个新的状态值并将组件的重新渲染排入队列。
```
setState(newState)
```
在随后的重新渲染期间，返回的第一个值useState将始终是应用更新后的最新状态。
React保证setState函数标识是稳定的并且不会在重新渲染时改变，这就是为什么从useEffect or useCallback依赖项列表中省略是最安全的。
#####useEffect
```
 `useEffect(didUpdate);` 

```
#####useContext
```
 `const value = useContext(MyContext);` 
```
接受一个上下文对象(从React.createContext返回的值)并返回该上下文的当前上下文值。当前上下文值由树中调用组件上方value最近的prop确定
当 `` 组件上方最近的更新时，此 Hook 将使用 `value` 传递给该 `MyContext` 提供程序的最新上下文触发重新渲染。即使祖先使用[`React.memo`](https://reactjs.org/docs/react-api.html#reactmemo)或[`shouldComponentUpdate`](https://reactjs.org/docs/react-component.html#shouldcomponentupdate)，仍然会在组件本身使用 `useContext` .
不要忘记参数 `useContext` 必须是 _上下文对象本身_ ：

-  __正确的：__   `useContext(MyContext)` 
-  __不正确：__   `useContext(MyContext.Consumer)` 
-  __不正确：__   `useContext(MyContext.Provider)` 

 `useContext` 当上下文值更改时，组件调用将始终重新渲染。如果重新渲染组件的成本很高，您可以[使用 memoization 对其进行优化](https://github.com/facebook/react/issues/15156#issuecomment-474590693)。

####官方文档
        
    https://reactjs.org/docs/hooks-intro.html
       

### 6. Generator  
####1. JS异步编程之旅
	
``` 
	回调函数-可能会造成回调地狱
	事件监听
	订阅观察者模式
	Promise-回调函数写法的改进
	Generator函数
	async/await函数-Generator函数的语法糖
	(协程-多个线程互相协作，完成异步任务)
``` 

####2. generator函数和普通函数的区别
	generator函数可以使用yield表达式暂停执行，形式上在函数名前加星号与普通函数做区分。generator函数是协程在ES6的实现，最大的特点是可以交出函数的执行权(即暂停执行)。整个generator函数就是一个封装的异步任务，异步操作需要暂停的地方，都用yield语句注明
	generator函数的执行方法
	```
	var g = gen(1);
	g.next() // { value: 3, done: false }
	g.next() // { value: undefined, done: true }
	```
	调用generator函数返回的是内部的指针对象，调用next方法就会移动内部指针，next方法的作用是分阶段执行generator函数，每次执行next方法会返回一个对象，表示当前阶段的信息(value和done属性)。
	value属性是yield语句后面表达式的值，表示当前阶段的值，done属性是一个布尔值，表示generator函数是否执行完毕，即是否还有下一个阶段。        
####3.相关文档-引自掘金 
https://juejin.cn/post/6844903556718264328
###  7. TS
####TS
一种由微软开发的自由和开源的编程语言。它是 JavaScript 的一个超集，而且本质上向这个语言添加了可选的静态类型和基于类的面向对象编程。
TypeScript扩展了JS的预发，所以任何现有的JS程序可以不加改变地在TS下工作，TS是为大型应用开发而设计的，编译它产生JS以确保兼容性。
TS只会在编译阶段对类型进行静态检查，如果发现有错误，编译时就会报错，而在运行时，编译生成的JS与普通的JS文件一样，不会进行类型检查
####TS官方文档
https://www.tslang.cn/
####掘金文档
https://juejin.cn/post/6872111128135073806
###  8. Whistle!! 
####whistle控制台匹配模式
基本匹配
```
匹配域名www.qq.com下的所有请求
www.qq.com operatorURI

匹配域名www.qq.com下的所有http请求
http://www.qq.com operatorURI

匹配域名www.qq.com下的所有https请求
https://www.qq.com operatorURI

限定域名的端口号
www.qq.com:8888 operatorURI # 8888端口

限定具体路径
http://www.qq.com/xxx operatorURI

精确匹配 ， 以$符号开头
$http://www.qq.com/xxx operatorURI
```
正则匹配
 ` /http:\/\/(.*)/  log://` 
通配符匹配
```
通配符匹配，以 ^ 开头(如果需要限制结束位置可以用 $)，* 为通配符
^www.example.com/test/***   operatorURI

通配域名匹配：
匹配二级域名以 .com 结尾的所有url，如: test.com, abc.com，但不包含 *.xxx.com
*.com   operatorURI
//*.com  operatorURI

通配路径匹配：
对所有域名对应的路径 protocol://a.b.c/xxx[/yyy]都生效
*/  operatorURI
*/xxx  operatorURI
```
#####代理协议
file
 `http://www.qq.com/pgg_act/ D:\dev\` 
将此路径的请求都代理到本地D:\dev\目录下

Host
 `10.241.11.111 www.qq.com` 
将www.qq.com的请求都代理到10.241.11.111IP上，实现在本地环境发测试环境的请求
抓取HTTPS
whistle支持抓取https请求
请求替换
在php接口开发中，我们需要将jsonp请求代理到自己的开发机，使用请求替换可达到目的(类似fillder的extention)
 `http://www.qq.com http://www.baidu.com` 
![]()https://main.qcloudimg.com/raw/71b0716a13b2a02950478004d52a3b0f.png
#####whistle使用文档
https://segmentfault.com/a/1190000016058875
#####正则相关文档
https://juejin.cn/post/6844903845227659271
#####官方文档 
https://wproxy.org/whistle/
## Step4-开发与提测
####1.腾讯云 TCB 控制台前端项目
从部署环境到需求提测，大部分的内容步骤都有在tcb控制台的ReadMe.md文件中涉及。
https://git.woa.com/QBase/tea-app-tcb
微搭控制台
https://main.qcloudimg.com/raw/4a9e47c81f2f77b977375cc7437327e6.pdf
####2.Tips
	tea dev命令和npm run dev命令启动，tea dev命令启动项目，项目默认会运行在端口8322，npm run dev命令启动项目，项目按照在package.json配置端口运行
	构建项目可使用`npm build&amp;tea commit -m 'commit'`,或者`yarn &amp; tea commit`
	其他步骤都操作正常，whistle却没有代理成功，这时可以尝试使用无痕浏览器进行调试，有可能不是你的代理没有配对，而是Chrome底层缓存机制的问题。
	部署时，如下图，要替换相关的js入口文件
![](https://main.qcloudimg.com/raw/f6af0de38461eb6ac6ef0159f606a7c3.png)
	

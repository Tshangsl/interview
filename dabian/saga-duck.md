原版链接：http://tapd.oa.com/personal_documents/show/1100000000000460312#target:toc43


# 1. 整体架构

## 1.1 项目目录

介绍项目目录

```bash
├── common
│   ├── components             # 封装的UI组件
│   ├── constants              # 常量
│   ├── cos
│   ├── css
│   ├── duckComponents         # 与ducks文件夹配合的duck UI 组件
│   ├── ducks
│   ├── hooks
│   ├── iaas.ts
│   ├── interface.ts
│   ├── interfaces             # ts接口类型
│   ├── model.ts               # 请求接口
│   ├── models                 # 请求接口
│   ├── sdks
│   └── utils                  # 常用工具
├── routes                     # 页面视图
│   ├── minigamecloud-tcb
│   ├── tcb-alarm              # 监控告警
│   ├── tcb-apps               # 环境
│   ├── tcb-auth               # CLI 工具授权
│   ├── tcb-database           # 数据库
│   ├── tcb-env                # 环境
│   ├── tcb-ext                # 扩展应用
│   ├── tcb-hosting            # 静态网站托管
│   ├── tcb-index                      
│   ├── tcb-log                # 日志管理
│   ├── tcb-repository
│   ├── tcb-scf                # 云函数
│   ├── tcb-service            # 云托管
│   ├── tcb-storage            # 云存储
│   └── tcb-user               # 用户管理
```

## 1.2 redux 状态流转

![img](http://tapd.oa.com/tfl/captures/2021-03/tapd_personalword_1100000000000460312_base64_1615370608_94.png)

如上图所示，该图展示了 `Redux` 的基本工作流程。简单来说，分为以下几步：

1. 首先由视图派发出一个修改状态的 `action` 即 `dispatch(action)`
2. 然后执行对应的 `reducer` 并更新状态到 `store` 中
3. 最终视图会根据 `store` 中状态的改变使用新的状态执行视图的刷新渲染操作



本项目中的状态流转过程也是遵循上述的这一套流转过程。



## 1.3 「集中式」状态管理与「分布式」状态管理

### 1.3.1「集中式」状态管理

传统的「集中式」状态管理，即所有状态都放在 `store` 文件夹下管理，典型的目录结构如下：

```bash
├── store
│   ├── actions
│	│	├── ...     # 各个视图模块的 actionCreator
│   ├── reducers  
│	│	├── ...     # 各个视图模块的 reducer
│   ├── action-types  # 所有的 actionType
```

这样做有好处也有坏处。

好处是所有的状态都被集中管理，方便查找。

坏处是在编码的时候如果需要添加一个新状态我们需要来回的切文件，先切到 `action-types` 里添加新的 `type` 、再到 `actions` 里添加新的 `actionCreator` 、再到 `reducers` 里添加新的 `reducer` ，最后回到视图里调用。另外我们还需要人肉保证 `actionType` 不能重复，这对多人协作开发来说十分不可取。

### 1.3.2 「分布式」状态管理

所谓「分布式」状态管理，即将各个模块的状态分布到具体的模块中进行单独管理，再细粒度一点即将各个组件的状态分布到具体的组件中进行单独管理，典型的目录结构如下：

```bash
├── components
│   ├── components1
│	│	├── UI.tsx      # components1 的视图
│	│	├── Duck.ts     # components1 的状态
│   ├── components2  
│	│	├── UI.tsx      # components2 的视图
│	│	├── Duck.ts     # components2 的状态
```

这样以来，每个组件都包含了两个文件：视图 `UI.tsx` 和状态 `Duck.ts` 。在 `Duck.ts` 中存储组件所用到的状态，在 `UI.tsx` 中消费状态。在视图中派发 `action` 也派发到各自 `reducer` 中。



## 1.4 他强任他强，一切皆状态

所谓「 他强任他强，一切皆状态」，即不管页面上的交互有多么复杂，其所有的交互操作均可看成是对状态的维护，不管是弹窗的显示或隐藏，表单内容的输入，请求的成功或失败等等操作，均可看作是在操作状态——用新的状态去替换旧的状态，同时刷新视图。如果有一些继发串行操作（如 `A` 操作完成后， `B` 操作再执行），从状态维护角度来看的话，其实质上可看作是再监听前一个操作完成的状态，等待前一个操作的状态的到来后再执行下一个操作。



# 2. 什么是 duck

我们口中常说的 `duck` 其实是腾讯内部开发的一套基于 `redux` 和 `redux-saga` 的状态管理方法，它是基于[ducks模式](https://github.com/erikras/ducks-modular-redux)思想，实现了模块化、可复用、可扩展及**可组合**特性的[redux-saga](https://github.com/redux-saga/redux-saga)开发方案。其文档请戳这里 [saga-duck](https://cyrilluce.gitbook.io/saga-duck/) 。

以上，只是官方对 `duck` 的介绍，那么怎么通俗易懂的理解 `duck` 呢？在上文 `1.3.2` 小节中我们说了，我们采用了「分布式」状态管理，将各个组件的状态分布到具体的组件中进行单独管理，这就相当于给每个组件都分配了一个小型的状态仓库，每个组件在维护状态时都只维护自己的那一个小型状态仓库，最后将所有的小型状态仓库组合起来就是整个项目的状态仓库了。

所以，简单通俗易懂的来说，**`duck` 就是一个小型的状态仓库。**视图里所有状态的变更都归拢到 `duck` 里。再进一步来讲：在一个组件中，`duck.ts` 负责逻辑，`UI.tsx` 负责展示。

## 2.1 一个duck文件都包含了哪些部分？都有什么作用？

一个典型的 `duck` 文件形状如下：

```ts
enum Types {}
export default class OneDuck extends Duck {
  get quickTypes() {
    return {
    ...super.quickTypes,
    ...Types,
    };
  }
  get reducers() {
    const { types } = this;
    return {
     ...super.reducers,
     // foo: reduceFromPayload<string>(types.FOO, null),
    };
  }
  get creators() {
    const { types } = this;
    return {
    ...super.creators,
     // foo: createToPayload<string>(types.FOO)
    };
  }
  get rawSelectors() {
    type State = this['State'];
    return {
    ...super.rawSelectors,
    // foo: (state: State)=>state.foo,
    // bar: (state: State)=>this.rawSelectors.foo(state)
    };
  }
  get quickDucks() {
    return {
    ...super.quickDucks,
     // foo: FooDuck
    };
  }
  *saga() {
    yield* super.saga();
  }
}
```

可以看到，一个 `duck.ts` 文件大致包含了这样几个部分：`quickTypes` 、`reducers` 、`creators` 、`rawSelectors` 、`quickDucks` 、`saga` 。关于这几个部分都是什么以及都有什么作用，我们逐一介绍。

### 2.1.1 quickTypes

我们说过，`duck` 就是一个小型的基于 `redux` 的状态仓库。既然如此，那么 `duck` 中就应该有 `redux` 中必不可少的一些东西，如用于表示将要派发出的动作类型 `Type`。而这里的 `quickTypes` 就是我们写所有的动作类型 `Type` 的地方，我们将所有需要用到的动作类型都写在 `quickTypes` ，这样我们在其他地方就可以通过 `types.xxx` 引用，非常方便。

通常组件内可能存在的动作类型都是有限，而且是可枚举的，所以我们一般用一个枚举对象来统一声明，然后将其引入到 `quickTypes` 中，示例代码如下：

```typescript
enum Types {
  ADD_TODO,
  REMOVE_TODO
}
export default class OneDuck extends Duck {
  get quickTypes() {
    return {
    ...super.quickTypes,
    ...Types,
    };
  }
  // ...省略其他部分
}
```

### 2.1.2 reducers

这里的 `reducers` 跟 `redux` 中的 `reducers` 概念和用法都是一模一样的，它指定了应用状态的变化如何响应`action` 并提交到 `store` 的。

一个典型的  `reducers`  示例代码如下：

```typescript
get reducers() {
  const { types } = this;
  return {
    ...super.reducers,
    addTodo: (state = initialState, action) => {
      switch (action.type) {
        case types.ADD_TODO:
          return action.payload;
        default:
          return state;
      }
    },
    removeTodo: (state = initialState, action) => {
      switch (action.type) {
        case types.REMOVE_TODO:
          return action.payload;
        default:
          return state;
      }
    },
  };
}
```

可以看到，`duck` 中 `reducers` 的写法与传统的 `redux` 中的 `reducers` 的写法基本上是一模一样，并没有什么特别之处。

但是在真实代码中我们不会像示例代码所给出的那样去写  `reducers` ，其原因大致有两个：

- 代码冗余，可以看到上面示例代码所给出的两个  `reducers` 在代码形式上几乎是一模一样的，如果数量多的话势必会造成代码冗余。
- 类型缺失，每一个 `reducer` 都对应了一个状态，这个状态可能会参与到后续的逻辑处理中，因此它的类型至关重要。而示例代码中的写法我们很难给状态标明类型。

为了解决以上两个问题，`saga-duck` 给我们提供了一个工具方法: `reduceFromPayload` 。通过这个工具方法我们可以很方便的定义 `reducer` ，代码如下：

```typescript
import { reduceFromPayload } from 'saga-duck';

get reducers() {
  const { types } = this;
  return {
    ...super.reducers,
    addTodo: reduceFromPayload<string>(types.ADD_TODO, null),
  };
}
```

`reduceFromPayload<泛型参数>(参数1，参数2)` 方法接收两个参数和一个泛型参数，其参数含义如下：

- 第一个参数：该 `reducer` 能够处理的 `actionType` ；
- 第二个参数：该 `reducer` 的初始状态值 `initialState` ；
- 泛型参数：该 `reducer` 的状态值类型；

其实 `reduceFromPayload` 方法就是对示例代码中写法的封装，以源码如下：

```typescript
export function reduceFromPayload(actionType, initialState) {
    return (state = initialState, action) => {
        if (action.type === actionType) {
            return action.payload;
        }
        return state;
    };
}
```

### 2.1.3 creators

这里的 `creators` 其实就是传统的 `actionCreator` ，它用来生成一个 `action` 对象。在没有 `actionCreator`之前，当我们需要派发一个动作时，我们往往会这样写：

```typescript
dispatch({
  type:types.ADD_TODO,
  payload:'xxx'
})
```

其中，我们把 `{type:types.ADD_TODO,payload:'xxx'}` 称之为一个 `action` 对象。以这样裸写的方式肯定是不优雅的，极易出错并且无法对 `payload` 的类型进行约束。好一些的做法是定义一个函数，通过函数来生成 `action` 对象，如下：

```typescript
function setAddTodo(payload:string){
  return {
    type:types.ADD_TODO,
  	payload
  }
}
```

这样我们就可以通过调用 `setAddTodo` 来生成对应的  `action` 对象，并且对 `payload` 的类型也进行了明确约束。我们把这样的函数称之为 `actionCreator`，在 `duck` 中简称为 `creator` 。

值得庆幸的是，我们不需要像上面那样繁琐的定义 `creator`，`saga-duck` 给我们提供了一个工具方法: `createToPayload` 。通过这个工具方法我们可以很方便的定义 `creator` ，代码如下：

```typescript
get creators() {
  const { types } = this;
  return {
    ...super.creators,
    setAddTodo: createToPayload<string>(types.ADD_TODO)
  };
}
```

`createToPayload<泛型参数>(参数)` 方法接收一个参数和一个泛型参数，其参数含义如下：

- 函数参数：`action` 对象的 `type` ；
- 泛型参数：`action` 对象的 `payload` 的类型；

`createToPayload` 函数会返回一个 `action` 对象生成函数，我们在派发状态时可以这样做：

```typescript
dispatch(creators.setAddTodo('xxx'))
// => 等同于
dispatch({
  type:types.ADD_TODO,
  payload:'xxx'
})
```

`createToPayload` 函数的源码如下：

```typescript
export function createToPayload(actionType) {
    return (payload) => ({
        type: actionType,
        payload
    });
}
```

### 2.1.4 rawSelectors

我们在 `reducers` 中定义我们在视图中可能用到的所有状态，但是不乏有一些状态它本身不是通过定义得来的，而且把已有的某几个状态通过聚合而得到的。类似于 `Vue` 中的计算属性 `computed` ，本身不是状态，是通过某几个状态聚合派生出来的，那么这样的状态该怎么定义呢？此时就需要使用 `rawSelectors` 了，示例代码如下：

```typescript
get rawSelectors() {
  type State = this['State'];
  return {
    ...super.rawSelectors,
    fullName: (state: State)=> state.firstName + state.lastName,
  };
}
```

假设我们在 `reducers` 中已经定义了 `firstName` 和 `lastName` 这两个状态，而 `fullName` 是通过这两个状态聚合而来的。

### 2.1.5 quickDucks

`duck` 和 `duck` 之间是可以组合的，比如某个组件既涉及到环境又涉及到地域，那么这个组件就需要用到「环境Duck」和「地域Duck」，那么此时我们就需要将这两个 `duck` 包含进来，如下：

```typescript
get quickDucks() {
  return {
    ...super.quickDucks,
    env: EnvDuck,
    region: RegionDuck,
  };
}
```

另外，我们知道，在 `react` 中倡导的是组件化开发，那就避免不了出现组件间父子嵌套的情况，当我们在父组件中要引入子组件的时候，不光要在视图中引入子组件的视图，还要在 `duck` 中引入子组件的 `duck` （除非子组件是一个纯视图组件），如下：

```typescript
// 在父组件视图中引入子组件视图

<Son duck={ducks.son} dispatch={dispatch} store={store}/>
```

```typescript
// 在父组件 duck 中引入子组件 duck

get quickDucks() {
  return {
    ...super.quickDucks,
    son: SonDuck,
  };
}
```

### 2.1.6 saga 方法

在 `saga` 方法里通常会做一些对状态变更的监听。在实际开发中，通常会有这样的场景：当某个状态变更后做点什么、当请求回来后做点什么等等，类似于这样的场景我们就需要对状态进行监听，示例代码如下：

```typescript
export default class OneDuck extends Duck {
  // ...省略其他部分
  
  // 监听 firstName 或 lastName 状态变化
  *watchFirstNameOrLastNameChange() {
    const { ducks, selector, types } = this;
    yield takeLatest([types.SET_FIREST_NAME,types.SET_LAST_NAME], function* () {
      // 取到变化后最新的firstName 或 lastName 值
      const { firstName, lastName } = selector(yield select());
      // 做点什么...
    });
  }
  *saga() {
    yield* super.saga();
    yield fork([this, this.watchFirstNameOrLastNameChange]);
  }
}
```

从上述代码中可以看到，我们在 `duck` 中定义了一个方法 `watchFirstNameOrLastNameChange` ，在该方法内部我们使用`redux-saga` 提供的 `takeLatest` 来监听 `firstName` 或 `lastName` 状态的变化，当 `firstName` 或 `lastName` 有一个状态发生变化，此时便会执行  `takeLatest` 的回调函数，在回调函数内部我们可以取得当前最新的状态值，然后做点你想做的事情。

然后别忘了在 `saga` 方法里使用`redux-saga` 提供的 `fork` 来启动这个监听，你可以理解为 `redux-saga` 帮我们 `fork` 出来一个子进程，不断的在轮询监听你想要监听的状态。

## 2.2 常用的duck都有哪些

上一节我们介绍了一个 `duck` 的组成部分，那么在实际项目中，所有的 `duck` 都需要我们自己从头开始写吗？其实不然，在实际项目中一些常用的 `duck` 都已经封装好了，我们直接用就可以了，那么常用的 `duck` 都有哪些呢？它们的适用场景都是怎样的呢？下面我们就来一一介绍。

### 2.2.1 TcbPageDuck

这是一个主页面级 `duck` ，通常用于左侧导航菜单中每一项点击进来的页面，如下：

![图片描述](/tfl/pictures/202103/tapd_personalword_1100000000000460312_1615549510_100.png)
像这样一个页面对应的 `duck` 就是 `TcbPageDuck` 。`TcbPageDuck` 中除了我们上面已经介绍的那些常规部分之外，它还有一些特有的东西，如 

- 属性`baseUrl`，页面级 `duck` 肯定有其页面对应的路由，那么你需要在 `baseUrl` 中设置该页面的路由，如下：

  ```typescript
  export default class TcbLogIndexDuck extends TcbPageDuck {
    get baseUrl(): string {
      return '/tcb/log/index';
    }
  }
  ```

- 方法`afterSetCurrentEnvId`。在云开发控制台中，环境是一等公民，所有的功能都离不开环境，一旦环境变化那么其所有的数据都要重新获取。而在像上图这种主页面中，顶部有个环境选择下拉，当环境发生变化后，重新获取数据的操作便在该方法中进行。如下：

  ```typescript
  export default class TcbLogIndexDuck extends TcbPageDuck {
    get baseUrl(): string {
      return '/tcb/log/index';
    }
    afterSetCurrentEnvId() {
      // 做点什么。。。
    }
  }
  ```

- 另外，在 `TcbPageDuck` 中还包含了 「环境Duck」和「地域Duck」等等一些必要工具 `duck`，可以方便的取到一些常用的属性，具体可阅读项目代码，此处不一一展开。

### 2.2.2 TcbDetailDuck

这是一个详情页面级 `duck` ，通常用于从主页面点击到详情的页面，如下：

![图片描述](/tfl/pictures/202103/tapd_personalword_1100000000000460312_1615549433_19.png)

像这样一个详情页面对应的 `duck` 就是 `TcbDetailDuck` 。

### 2.2.3 DetailPageTabDuck

这是一个`TAB`切换 `duck` ，通常用于页面有`Tab`栏切换时，如下：

![图片描述](/tfl/pictures/202103/tapd_personalword_1100000000000460312_1615549545_16.png)

建议每个 `Tab` 都独立成一个组件，每个组件的 `duck` 都继承 `DetailPageTabDuck` ，因为在 `DetailPageTabDuck` 里面监听了 `TAB_ACTIVE`  状态，当 `Tab` 被激活时，你可以做点什么，比如发请求拉数据等等事情。如下：

```typescript
export default class TcbScfIndexFunctionDuck extends DetailPageTabDuck {
  afterTabActive() {
    // 做点什么。。。
  }
}
```

### 2.2.4 Fetcher

这是一个专门用于发起请求的 `duck` ，它没有对应的视图，通常作为一个子 `duck` 被包裹在父 `duck` 中，可以说是项目中用的最多的一个`duck` 了。

该 `duck` 的使用也非常简单，你只需定义好请求的出入参类型和请求具体的方法即可，如下：

```typescript
get quickDucks() {
    return {
      ...super.quickDucks,
      operationHistoryList: class OperationHistoryListDuck extends Fetcher {
        Param: any; // 请求参数类型
        Data: any; //请求返回值类型
        async getDataAsync(params: this['Param']) {
      		// 发请求
          return await DescribeCloudBaseRunOperationDetails(params);
        }
      },
    };
  }
```

该 `duck` 内部提供了常用的 `4` 个状态和派发出了 1 个动作，分别为：

4个状态：

- data：请求的返回值，请求前和请求失败为 `null` ，请求成功为请求真实返回值；
- loading：请求loading，请求中为 `true` ，其余均为 `false` ；
- error：请求出错时为错误对象，请求情况为 `null` ；
- filter：上次请求所携带的参数，初始为 `null` ;

1 个 动作：

- FETCH_DONE：可通过监听此状态来做一些请求成功后的事情

其余更多的状态和动作可阅读源码，此处不一一列举。

### 2.2.5 Form

这是一个专门用于表单的 `duck` ，当你的页面如何含有表单的时候，你应该考虑将表单部分封装成单独组件引入，这样以来你就可以对表单部分应用 `FormDuck`，因为 `FoemDuck` 里封装了一些对于表单的常用方法，如表单校验，表单提交，表单字段初始值等，如下：

```ts
export default class FieldConfigDuck extends FormBase {
  Data: IField
  get defaultData(): this['Data'] {
    return {
      
    }
  }
	// 哪些操作需要执行表单验证
  get execValidateMethodType(): string[] {
    const { types } = this
    return [

    ]
  }
	// 表单验证具体方法
 *validate() {
   
 }
// 提交表单的方法
	*submit(): any {}
}
```






## 2.3 duck和UI如何关联起来

我们说过，每个组件都应该是既有视图展示又有状态逻辑的，那么如何将这两者关联起来呢？通常情况下是在引入视图组件时，将其对应的 `duck` 通过 `props` 的形式传入，如下：

```jsx
<HistoryDetailDrawer duck={historyDetailDrawerDuck} store={store} dispatch={dispatch} />
```

这样两者就关联起来了，那么在编写代码的时候，我们如何在 `UI.tsx` 中访问 `duck.ts` 里的状态呢？如下：

```typescript
export default purify(({ duck, store, dispatch }: DuckCmpProps<该组件的duck>) => {
  const { selector, creators } = duck;
  const {
    // 在这里可以取到duck中所有的状态
    firstName,
    lastName
  } = selector(store);
  return <div>{firstName} {lastName}</div>
})
```

可以看到，我们通过解构传入的 `props` ，可以拿到组件对应的 `duck` 对象、状态树 `store` 以及 `dispatch` 方法（用于派发动作）。

### 2.3.1 在UI中如何取到duck中的状态

我们可以通过 `selector(store)` 即可检出当前 `duck` 下所有的状态。如下：

```ts 
const { firstName,secondName } = selector(store)
```

### 2.3.2 在UI中如何派发更改状态

通过`dispatch` 方法可派发出修改状态的方法。如下：

```tsx
<FormInputItem
  label={t('字段名称')}
  required
  status={invalidFieldMap?.title ? 'error' : 'success'}
  message={invalidFieldMap?.title}
  size="full"
  maxLength={COMMON_NAME_LIMIT}
  placeholder={t('请输入字段中文名称')}
  value={title}
  onChange={(value) => dispatch(creators.setTitle(value))}
/>
```

### 2.3.3 在duck中如何取到duck中的状态

```ts
const { firstName,secondName  } = selector(yield select())
```

### 2.4.4 在duck中如何派发更改状态

通过`put` 方法可在 `duck` 中派发出修改状态的方法

```ts
put(creators.setEnumOptions(enumOptions))
```





# 3. 实战

## 3.1 我该如何添加一个请求接口？

当你需要新增一个请求接口的时候，你可以仿照 `src/common/models` 文件夹内的对请求接口定义的写法来新增你的接口，通常情况下，项目中所有的请求接口都收拢的该文件夹内。

一个请求接口大致形状如下：

```typescript
/**
 * 接口功能
 * 接口文档地址
 */
export async function DescribeEnvFreeQuota(
  param: any, // 接口需要的请求参数
  regionId: number,  // 接口需要的地域参数
  opts?: IRequestOpts  // 请求的一些设置
): Promise<{
  QuotaItems: IPostpayEnvQuota[];
  RequestId: string;
}> {
  // 发送请求
  return tcbCapiRequest({ action: 'DescribeEnvFreeQuota', data: param, regionId }, opts);
}
```

可以看到，新增一个接口其实就是新增一个函数，该函数的参数是接口所接收的请求参数，函数的返回值即是请求接口返回的数据，类型为 `Promise`。定义好之后即可在需要的地方引入使用即可。

## 3.2 我该如何添加一个弹窗？

在项目中，所有的弹窗都被看作是一个 `operation` ，它都被收拢在当前模块的 `operations` 文件夹内。添加一个弹窗的具体步骤如下：

1. 在当前模块下查看是否有 `operations` 文件夹，如果没有，则新建该文件夹；

2. 在 `operations` 文件夹内新建一个文件夹用于存放弹窗具体的代码，文件名为你需要添加的弹窗的名称，如创建用户 `CreateUser`；

3. 一个弹窗也是一个组件，它也需要视图 `UI.tsx` 和状态 `duck.ts`，所以在 `CreateUser` 文件夹内创建弹窗的视图文件和状态文件，如 `CreateUser.tsx` 和 `CreateUserDuck.ts` ；

4. 弹窗的视图其实就是一个 `Dialog` 组件，所以弹窗的视图文件一般内容为这个样子：

   ```typescript
   export default purify(function CreateUser({
     duck,
     dispatch,
     store,
   }: DuckCmpProps<CreateUserDuck>) {
     const { selector } = duck
     const {
       data: { selectedItems },
     } = selector(store)
     return (
       <Dialog
         duck={duck}
         store={store}
         dispatch={dispatch}
         title= "弹窗标题"
         defaultSubmitText={t('确定')}
         defaultCancelText={t('取消')}
       >
        // 弹窗的具体内容
       </Dialog>
     )
   })
   ```

5. 弹窗的 `duck` 通常是继承 `TcbOperationBaseDuck` 这个基类，在该 `duck` 中通常会有如下几个常用的属性和方法：

   ```typescript
   export default class CreateUserDuck extends TcbOperationBaseDuck {
     Item:any // 操作选中像的类型
     ExtraData: any; // 操作需要额外的数据的类型
     
     // 哪些动作需要触发校验表单
     get execValidateMethodType(): string[] {
       const { types } = this
       return []
     }
     
     // 表单校验具体方法
     validate() {
       
     }
     
     // 初始化弹窗数据，打开弹窗即执行
     initLoadData(){
       
     }
     // 提交弹窗
     onSubmit() {
       
     }
     *saga() {
       yield* super.saga()
     }
   }
   
   ```

6. 注册弹窗。通常情况下在 `operations` 文件夹根下都会有一个当前模块所有弹窗汇总的 `XxxOperationDuck.ts` 文件，写好弹窗后需要在该文件内注册，如下：

   ```typescript
   get operationMap() {
       return {
         CreateUser: {
           action: 'CreateUser',  // 弹窗action，必须保证在当前模块下唯一
           desc: t('应用部署'),    // 弹窗描述
           duck: CreateUserDuck,   // 写好的弹窗Duck
           component: CreateUser,  // 写好的弹窗组件
         },
       }
   }
   ```

7. 唤起弹窗。经过以上步骤，弹窗创建就已经完成了，那么该如何唤起弹窗呢？

   我们首先需要在唤起弹窗的视图对应的 `duck` 中引入上一步所有的所有弹窗汇总 `duck` 作为子 `duck` ,如下：

   ```typescript
     get quickDucks() {
       return {
         ...super.quickDucks,
         operation: XxxOperationDuck,
       }
     }
   ```

   通常情况下，唤起弹窗是通过点击页面上的按钮来唤起弹窗，如下：

   ```jsx
   <Button
     onClick={() =>
       dispatch(
         ducks.operation.creators.execute({
           operationAction: ducks.operation.operationMap.CreateUser.action,
           params: {
             selectedItems: 'xxx',
           },
         }),
       )
     }
   >
     创建用户
   </Button>
   ```

   通过向 `XxxOperationDuck` 派发 `execute` 动作，并且指定需要唤起的弹窗 `action` 以及唤起弹窗时需要携带的参数 `params` 即可唤起弹窗。

**注意事项：**   

 	通常情况下，唤起弹窗时都默认需要携带一个弹窗里要操作的对象，如删除表格某一行数据时需要携带该行的数据。要操作的对象应该发在唤起弹窗时的 `params` 里的 `selectedItems` ,其对应的类型应是弹窗 `duck` 里的 `Item` 类型。假如该弹窗中不需要携带任何操作对象，那你应该在 `XxxOperationDuck.ts` 中注册弹窗时显示指明该弹窗无需操作数据，如下：

```typescript
get operationMap() {
    return {
      CreateUser: {
        action: 'CreateUser',  // 弹窗action，必须保证在当前模块下唯一
        desc: t('应用部署'),    // 弹窗描述
        duck: CreateUserDuck,   // 写好的弹窗Duck
        component: CreateUser,  // 写好的弹窗组件
        options: {
          isNotNeedSelectedItems: true,  // 不需要携带操作数据
        },
      },
    }
}
```

另外，有时候弹窗内的逻辑除了用到操作对象，还需要用到一些额外的数据，如 `envId`、`regionId` 时，那么这些数据在唤起弹窗也应该传入到 `params` 里，如下：

```typescript
<Button
  onClick={() =>
    dispatch(
      ducks.operation.creators.execute({
        operationAction: ducks.operation.operationMap.CreateUser.action,
        params: {
          selectedItems: 'xxx',
          envId,
          regionId
        },
      }),
    )
  }
>
  创建用户
</Button>
```

这些额外的数据的类型应是弹窗 `duck` 里的 `ExtraData` 属性，如下：

```typescript
ExtraData: {
  envId: string,
  regionId:number
};
```



## 3.3 我该如何添加一个页面？







## 3.4 我该如何添加一个路由？











----

# 4. 最佳实践

1. 文件夹命名使用xiao 驼峰命名
2. 文件命名使用大驼峰命名
3. 所有的弹窗操作都收拢到 `operations` 文件夹内
4. 尽量不要在视图文件中使用 `hooks` ，如 `useState` 、 `useEffect` 等，尽量将所有状态变更及逻辑操作收拢到组件对应的 `duck` 中
5. 尽量不要使用 `any` 类型，除非你能保证这个类型真的不需要关心
6. 尽量将重复的代码进行封装，如封装公共 `duck` 
7. 善用可选链，因为某些状态是异步的

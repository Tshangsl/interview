工作小结
做了些什么
1. `微搭-组件` 移动端组件优化,low-tea-basis组件分类,tea_crm组件库抽成,组件迁移。
2. `微搭-行业应用` 电商交易模板部分内容，hr模板功能新增及优化，企业招聘模板。
3. `微搭-控制台` hr模板上架模板中心,构建日志二期,销毁文案优化,数据源字段新增,批量发布，bug修复。
4. `微搭-应用市场` 应用市场客服二维码支持可配置化。
5. `微搭-文档` 控制台接入文档，hr模板使用文档。
取得的收获
1. `微搭-组件` 了解组件实现和组件文档生成使用，初步了解jest，storybook。
2. `微搭-行业应用` 了解云开发一系列相关概念，学习使用开发者调试工具更多使用方法，性能分析，断点调试，了解CMS相关。
3. `微搭-控制台` 学习React,React-redux,redux-saga,saga-duck,hook,whistle的使用,实际项目中进一步熟悉ts使用与git的使用，了解schema。
4. `微搭-应用市场` 学习nextjs,项目中进一步认识ssr。
5. `微搭-分享` 了解性能优化可以怎么做，storybook快速生成组件文档，云开发网关架构设计，各种node框架优势选型。

MVV和MVVM
M:Model模型
V:View视图
C:Controller控制器
VM:ViewModel视图模型
MVC:展示一个篮球的页面
1.设置一个篮球的模型等待使用
2.写一个需要展示篮球的视图
3.使用控制器让模型和视图交互
MVVM:
vm是vue对象,功能绑定到view上,Model中篮球更新或其他操作，通过vm通知派发至view
Vue和React都是借鉴mvvm思想+工程师自己的想法出现的两个框架
区别
1.Vue的标签如v-moedl,比react方便,一层封装好的语法糖,绑定input不再写change事件
2.react的JSX功能很强大,扩展性很强
3.Vue的DOM操作很方便,各种方便的for指令,if指令
4.React思想,各种抽象和模式使得代码更加美观
5.Vue的底层使用Object.defineProperty实现的,因此方法不支持数组绑定,Vue源码中重新封装数组的方法，
重写了push pop shift unshift splice sort reverse这七个数组方法
区别
1.监听数据变化的实现原理不同
Vue通过getter/setter及一些函数的劫持，能精确知道数据变化，不需要特别的优化就能打到很好的性能
React默认通过比较引用的方式进行,如果不优化(PureComponent/shouldComponentUpdata)可能会导致大量不必要的VDOM的重新渲染
2.数据流不同
Vue中默认支持双向绑定,Vue1.0中可实现两种双向绑定
2.1父子组件之间,props可以双向绑定(Vue2.x去掉了第一种)
2.2组件与DOM之间可以通过v-model双向绑定
React从诞生之初就不支持双向绑定,React一致倡导的是单项数据流,称之为onChange/setState()模式
使用Vuex及Redux等单项数据流的状态管理框架
3.Hoc和mixins
Vue中组合不同功能的方式是通过mixin
React中通过Hoc(高阶组件),高阶组件本质就是高阶函数,React的组件就是一个单纯的函数,所以高阶函数对React来说非常简单
4.模板渲染方式不同
表层上,模板的语法不同
4.1React通过JSX渲染模板(只是表面现象,React不必依赖JSX)
4.2Vue通过一种扩展的HTML语法进行渲染
深层上,模板的原理不同
 React在组件JS代码中,通过原生JS实现模板中的常见语法,比如插值,条件,循环等,都是通过JS语法实现
 Vue是在和组件JS代码分离的单独的模板中,通过指令实现,如条件语句需要用v-if实现
React中的render函数是支持闭包特性的,所以import的组件在render中可以直接调用,
Vue中,模板中使用的数据必须挂在this上进行一次中专,import一个组件后,还需要在components中再声明
5.Vuex和Redux区别
表面,store注入和使用方法
 Vuex中,$store被直接注入到组件实例,因此可以比较灵活的使用
 1.使用dispatch和commit提交更新
 2.通过mapState或直接通过this.$store读取数据
 Redux中,每一个组件都需显式地用connect把需要的props和dispatch连接起来
实现原理
 1.Redux使用的是不可变数据,Vuex的数据是可变的,Redux每次都是用新的state替换旧的state,Vuex是直接修改
 2.Redux检测数据变化时,是通过diff方式比较差异,Vuex和Vue原理一样,通过getter和setter比较

构建工具
 1.React采用Create-React-App(webpack&Babel),Vue采用Vue-Cli(按需创建不同的模板)
受控组件和非受控组件
TS
正则
Webpack
相同点
1.都是使用Virtual DOM
2.都提供了响应式和组件化的视图组件
3.都将注意力集中保持在核心库,而将其他功能如路由和全局状态管理交给相关库
不同点
1.React中,当某组建的状态发生改变时,它会以该组件为根,重新渲染整个组件子树
Vue中,组件的依赖是在渲染的过程中自动追踪的,所以系统能准确知晓哪个组件确实需要被重新渲染
2.Vue的路由库和状态管理库都由官方维护支持且与核心库同步更新
React选择把这些问题交给社区维护,因此生态更丰富
3.Vue-cli脚手架可配置

前端构建工具
1.任务管理工具(task runner)
 通过声明组合构建任务进行整个网站的构建,有自己的一套任务声明语法和任务实现接口,如Grunt和Gulp,
 这两个都是插件式的架构,有大量的插件可用,缺点在于做什么都只能用插件
2.打包工具(package tool)
 通过为每一类文件配置需要的处理方式,实现整个站点的构建,如Webpack和FIS,这两个都是整个站点的整体构建解决方案
3.构建工具(build tool)

关于NPM Script
 NPM是包管理工具
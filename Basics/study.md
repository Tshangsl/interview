用Vue+Vue Router创建单页应用非常简单，通过Vue.js，已经用组件组成了应用
加入Vue Router时，需要做的就是将组件映射到路由上，让Vue Router知道在哪渲染
>router-link
- 使用一个自定义组件router-link来创建链接，而不是使用常规的a标签
使得Vue Router可以在不重新加载页面的情况下更改URL，处理URL的生成以及编码
>router-view
- 将显示与url对应的组件，可以把它放在任何地方

通过调用app.use(router)，会触发第一次导航且可以在任意组件中以this.$router的形式访问它 并且以this.$route的形式访问当前路由


浏览器提供5种Observer来监听非用户直接触发的事件
1.MutationObserver
- 监听一个普通JS对象的变化，会用Object.defineProperty或Proxy
- 监听元素的属性和子节点的变化，可以用MutationObserver
- MutationObserver可以监听对元素的属性的修改，对它的子节点的增删改
2.IntersectionObserver
- 可以监听一个元素和可视区域相交部分的比例，然后在可视比例达到某个阈值时触发回调
3.PerformanceObserver
- 浏览器提供了performance的api用于记录一些时间点，某个时间段，资源加载的耗时等
- PerformanceObserver用于监听记录performance数据的行为，一旦记录就会触发回调，这样可以在回调中将这些数据上报
4.ResizeObserver
- 窗口可以用addEventListener监听resize事件
- 元素可以用ResizeObserver监听大小的改变，当width，height被修改时会触发回调
5.ReportingObserver
- 当浏览器运行到过时(deprecation)的API时，会在控制台打印一个过时的报告
- 浏览器还会在一些情况下对网页行为做一些干预(intervention)，比如会把占用cpu太多的广告的iframe删掉
会在网络较慢时把图片替换为占位图片，点击才会加载
- ReportingObserver可以监听过时的api，浏览器干预等报告等的打印，在回调里上报，
这些事错误监听无法监听到但对了解网页运行情况很有用的数据
>小结
- 监听用户的交互行为，会用addEventListener来监听click,mousedown,keydown,input等事件
但对于元素的变化，performance的记录，浏览器干预行为这些不是用户交互的事件就要用xxxObserver的API




npm
>早期npm
- 最早期的npm版本(npm v2)中，npm的设计非常简单，在安装依赖时会将依赖放到node_modules文件中
- 如果某个直接依赖A依赖于其他的依赖包B，那么依赖B会作为简介依赖，安装到依赖A的文件夹node_modules中
然后可能多个包之间也会有出现相同的依赖递归的，如果项目一旦过大，必然会形成一棵巨大的依赖树，依赖包会重复出现，形成嵌套地狱
>npm安装机制和核心原理
- 核心目标
Bring the best of open source to you,your team and your company.
-npm安装机制
1. npm install执行之后，首先会检查和获取npm的配置 这里的优先级为
项目级的.npmrc文件>用户级的.npmrc文件>全局级的.npmrc>npm内置的.npmrc
2. 检查项目中是否有package-lock.json文件
如果有 检查package-lock.json和package.json声明的依赖是否一致

Yarn
- Yarn是一个由Facebook,Google,Exponent,Tilde构建的新的JS包管理器
它的出现是为了解决历史上npm的某些不足
(如npm对于依赖的完整性和一致性的保证，以及npm安装过程中速度很慢的问题)




offsetTop:当前元素顶部距离最近父元素顶部距离

!!操作符
判断变量是否真正为真(非null/undefined/false/NaN等)的很简明的实现方式 省去了大量的&&运算


less和sass区别
相同点
1.Less和Sass都是css的预处理器，可以拥有变量，运算，继承，嵌套的功能，使用两者可以使代码更便于阅读和维护
2.都可以通过自带的插件，转成相对应的css文件
3.都可以参数混入，可以传递参数的class，就像函数一样
4.嵌套的规则相同，都是class嵌套class
不同点
1.声明和使用变量 Less用@符号，SCSS用$符号
2.变量插值 Less采用@{XXX}的形式 Scss采用${XXX}的形式
3.Scss支持条件语句，Less不支持
4.应用外部css文件方式不同 Scss应用的css文件名必须以_开头(下划线)，
文件名如果以下划线开头，sass会认为该文件是一个应用文件，不会将它转成css文件
5.引用父选择器&符号的使用
Less和Scss都可以使用&符号表示父选择器，但是Scss的&符号只能出现在一个组合选择器的开始位置，Less美誉哦这个限制


Vue用@表示src文件夹
1.在项目根目录下创建一个jsconfig.json/tsconfig.json文件
React用@表示src文件夹
1.这个项目对应的react项目是在 config-overrides.js文件里配置的
@都是在项目配置文件中配置的

vue.config.js
vue-cli3脚手架搭建完成后，项目目录中没有vue.config.js文件，需要手动创建

创建vue.config.js
vue.config.js是一个可选的配置文件，如果项目的(和package.json同级的)根目录中存在这个文件
那么它会被@vue/cli-service自动加载

vue.config.js配置
这个文件应该导出一个包含了选项的对象
1.publicPath
- 部署应用包时的基本URL，用法和webpack本身的output.publicPath一致
-这个值也可以被设置为空字符串""或是相对路径"./"，这样所有的资源都会被链接为相对路径
这样打出来的包可以被部署在任意路径
-其实就是一个公共路径，能帮助为项目中所有资源指定一个基础路径
2.outputDir
- 输出文件目录，当运行vue-cli-service build时生成的生产环境构建文件的目录
3.assetsDir
- 放置生成的静态资源(JS,CSS,IMG,fonts)的目录
4.pages
- 在multi-page(多页)模式下构建应用，每个page应该有一个对应的JS入口文件
- 该值应该是一个对象，对象的key是入口的名字，value是一个指定了entry，template，filename，title和chunks的对象
(除了entry之外都是可选的)，或一个指定其entry的字符串
注：当在多页应用模式下构建时，webpack配置会包含不一样的插件(这时会存在多个html-webpack-plugin和preload-webpack-plugin的实例)
webpack相关配置
1.configureWebpack
Type:Object|Function
如果这个值是一个对象，则会通过webpack-merge合并到最终的配置中
如果这个值是一个函数，则会接受被解析的配置作为参数。该函数及可以修改配置并不返回任何东西，也可以返回一个被克隆或合并过的配置版本。
2.chainWebpack
Type:Function
是一个函数，会接收一个基于webpack-chain的ChainableConfig实例。允许对内部的webpack配置进行更细粒度的修改
3.devServer
port 端口号 如果端口号被占用 会自动加1
host 主机名 指定使用地址，默认localhost,0.0.0.0代表可以被外界访问
https 协议
open 启动服务时自动打开浏览器访问
disableHostCheck 是否关闭用于DNS重绑定的HTTP请求的HOST检查
- 代码中，devServer是系统的保留字，用来配置开发环境，用于本机开发和调试，与发布和打包无关
- 如果前端应用和后端需要跨域，需要在开发环境下将API请求代理到API服务器，可以通过*.config.js中的devServer.proxy选项来配置

.browserlistrc配置
- .browserlistrc是在不同的前端工具之间共用目标浏览器和node版本的配置文件

shims-vue.d.ts文件

组合式API(Composition API)
- 通过组合式API，可以使用导入的API函数来描述组件逻辑。
在单文件组件中，组合式API通常会与<script setup>搭配使用。
这个setup attribute是一个标识，告诉Vue需要在编译时进行一些处理，让我们可以更简洁的使用组合式API。
比如,<script setup>中的导入和顶层变量/函数都能够在模板中直接使用。

声明响应式状态
- 可以使用reactive()函数创建一个响应式对象或数组
import {reactive} from 'vue'
const state = reactive({count:0})
- 响应式对象其实是JS Proxy，其行为表现与一般对象相似。
不同之处在于Vue能够追踪对响应式对象属性的访问与更改操作
- 要在组件模板中使用响应式状态，需要在setup()函数中定义并返回
- 可以在同一个作用域下定义更新响应式状态的函数，并将他们作为方法与状态一起暴露出去 暴露的方法通常会被用作事件监听器
import {reactive} from 'vue'
export default{
  //setup是一个专门用于组合式API的特殊钩子函数
  setup(){
   const state = reactive({count:0})
   //暴露state到模板
   return {
    state
   }
  }
}

<script setup>
- 在setup()函数中手动暴露大量的状态和方法非常繁琐，可以使用构建工具简化该操作。
当使用单文件组件(SFC)时，可以使用<script setup>简化代码

reactive()的局限性
1.仅对对象类型有效(对象，数组和Map,Set这样的集合类型)，而对string，number和boolean这样的原始类型无效
2.Vue的响应式系统是通过属性访问进行追踪的，因此必须始终保持对该响应式对象的引用，不可以随意替换一个响应式对象，这将导致对初始引用的响应性连接丢失

ref()定义响应式变量
- reactive()的种种限制归根结底是因为JS没有可以作用于所有值类型的引用机制。
因为，Vue提供了一个ref()方法来允许创建可以使用任何值类型的响应式ref。
ref()将传入参数的值包装为一个带.value属性的ref对象
import {ref} from 'vue'
const count = ref(0)
和响应式对象的属性类似，ref的.value属性也是响应式的，同样，当值为对象类型时，会用reactive()自动转换它的.value

ref在模板中的解包
- ref在模板中作为顶层属性被访问时，它们会被自动解包，所以不需要使用.value。

ref在响应式对象中的解包
- 当一个ref被嵌套在一个响应式对象中，作为属性被访问或更改时，它会自动解包，因此会表现得和一般的属性一样。

数组和集合类型的ref解包
- 跟响应式对象不同，当ref作为响应式数组或像Map这种原生集合类型的元素被访问时，不会进行解包

计算属性
computed()方法期望接收一个getter函数，返回值为一个计算属性ref
和其他一般的ref类似，可以通过xxx.value访问计算结果。
计算属性ref也会在模板中自动解包，因此在模板表达式中引用时无需添加.value

defineComponent()
在定义Vue组件时提供类型推导的辅助函数
function defineComponent(
 component:ComponentOptions
)
- 对setup函数进行封装 返回options的对象
export function defineComponent(options:unknown){
 return isFunction(options)?{setup:options}:options
}
- defineComponent最重要的是 在TS下 给予组件正确的参数类型推断

setup()函数
- 在setup()函数中返回的对象会暴露给模板和组件实例
- 其他的选项也可以通过组件实例来获取setup()暴露的属性
- 在模板中访问从setup返回的ref时，它会自动浅层解包，无需再在模板中写.value

访问props
- setup函数的第一个参数是组件的props
- 和标准的组件一致 一个setup函数的props是响应式的 并且会在传入新的props时同步更新
export default{
 props:{
  title:String
 },
 setup(props){
  console.log(props.title)
 }
}
- 如果解构props对象 解构出的变量会丢失响应性
- 如果确实需要解构 可以使用toRefs()和toRef()这两个工具函数























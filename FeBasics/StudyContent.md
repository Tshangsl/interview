>Axios
- 一个基于Promise的HTTP库 可以用在浏览器和Node中
>特性
1.从浏览器中创建XMLHttpRequests
2.从Node.js创建HTTP请求
3.支持Promise API
4.拦截请求和响应
5.转换请求数据和响应数据
6.取消请求
7.自动转换JSON数据
8.客户端支持防御XSRF
>执行多个并发请求
axios.all([getUserAccount(),getUserPermissions()])
	.then(axios.spread(function(acct,perms){
}))
>axios API
可以通过向axios传递相关配置来创建请求
axios(config)
axios(url[,config])

创建实例
可以使用自定义配置新建一个axios实例
axios.create([config])

>axios ajax fetch比较
1.Ajax
- Asynchronous Javascript and XML的缩写 异步网络请求 区别于传统web开发中采用的同步方式
- AJAX带来的最大影响是页面可以无刷新的请求数据
- 以前 页面表单提交数据 在用户点击完submit按钮后 页面会强制刷新一下 体验十分不友好
2.Axios
- axios不是一种新的技术
- axios是一个基于Promise用于浏览器和Nodejs的HTTP客户端 本质上也是对原生XHR的封装
只不过他是Promise的实现版本 符合最新的ES规范 有以下特点
	从浏览器中创建XML HttpRequests
	从node.js创建HTTP请求
	支持Promise API
	拦截请求和响应
	转换请求数据和响应数据
	取消请求
	自动转换JSON格式
	客户端支持防御XSRF
浏览器支持
 axios面向现代浏览器设计，所以古老的浏览器并不支持
 axios设计简洁 API简单 支持浏览器和Node 所以大受欢迎 可以很好的和各种前端框架整合
3.fetch
- fetch是前端发展的一种新技术产物
- Fetch API提供了一个JS接口 用于访问和操纵HTTP管道的部分 例如请求和响应
它还提供一个全局fetch()方法 该方法提供了一种简单 合理的方式来跨网络异步获取资源
- 这种功能以前是使用XMLHttpRequest实现的，Fetch提供了一个更好的替代方法，
可以很容易地被其他技术使用，如Service Workers。Fetch还提供了单个逻辑位置来定位其他
HTTP相关概念，例如CORS和HTTP扩展






《ECMAScript 6入门》

RFC Request For Comments
- 一系列以编号排定的文件 
- 文件收集了有关互联网相关信息 以及UNIX和互联网社区的软件文件
- RFC文件是由Internet Society(ISOC)赞助发行
- 基本的互联网通信协议都有在RFC文件内详细说明
- RFC文件还额外加入了许多在标准内的论题 例如对于互联网新开发的协议及发展中所有的记录
- 因此几乎所有的互联网标准都有收录在RFC中

npm源

JS中new Date使用

JS获取当前时间戳方法
let timestamp = Date.parse(new Date())
let timestamp = (new Date()).valueOf()
let timestamp = new Date().getTime()

JS单独调用new Date() 显示时间格式 Mar 31 10:10:43 UTC+0800 2012

date-fns
1.模块化 按需引入
- date-fns库包含多个函数 有200多种功能 适用于几乎所有场合
- 是模块化的 可以根据需要单独导入这些函数
- 适用于webpack Browserify Rollup 支持tree-shaking
- 例如 如果要计算2个日期之间的差值 只需要导入formatDistance和subDays函数
```
import {formatDistance,subDays} from 'date-fns'
formatDistance(subDays(new Date(),3),new Date())
```
2.不可变
- 可变性是momentJS最大的问题之一 date-fns支持不可变性
3.同时支持Flow和TS

Electron









calc
1.该函数用于动态计算长度值 calc()运算符前后都需要保留一格空格
2.任何长度值都可以使用calc函数计算



JS对象delete使用
1.可以从一个对象中彻底删除一个属性(整个键值对key-value都不存在)
2.如果属性是自有属性且不能被删除 delete会返回false 其他情况会返回true
3.delete只能删除自有属性 不会影响原型链上的属性
- delete操作符要谨慎使用 因为大多数现代js引擎会针对构造函数创建的实例进行性能优化 而delete会破坏这种优化


window.frameElement
- 返回嵌入当前window对象的元素(比如<iframe>或<object>) 如果当前window对象已经是顶层窗口 则返回null
var frameEl = window.frameElement
if(frameEl){
	frameEl.src = 'http://mozilla.org/'
}
window.parent
- 返回当前窗口的父窗口 即包含当前窗口所在的frameElement元素的窗口
window.self
- self属性返回指向当前window对象的引用 利用这个属性 可以保证在多个窗口被打开的情况下 
- 正确调用当前窗口内的函数或属性而不会发生混乱


无头CMS
- CMS全称是Content Management System 即内容管理系统
- 无头CMS(headless CMS)是一种没有显示功能的CMS

Post请求四种数据格式
1.HTTP协议是以ASCII码传输 建立在TCP/IP协议之上的应用层规范 规范把HTTP请求分为三个部分 
- 状态行
<method><request-URL><version>
- 请求头
<headers>
- 消息主体
<entity-body>
2.协议规定POST提交的数据必须放在消息主体(entity-body)中 但协议并没有规定数据必须使用什么编码方式
- 实际上开发者完全可以自己决定消息主体的格式 只要最后发送的HTTP请求满足上面的格式
- 但是数据发出去 服务端解析成功才有意义  一般服务端语言如php python java 以及它们的framework 都内置了自动解析常见数据格式的功能
- 服务端通常是根据请求头headers中的Content-Type字段来获知请求中的消息主体是用何种方式编码 再对主体进行解析
>四种方式
1.application/x-www-form-urlencoded
- 传统的这种格式表单通过$('form').serialize()方式将参数序列化变成形如key&value的形式 然后传给后台解析
2.application/json
- 传参直接传json对象
3.multipart/form-data
- 常见的post请求方式 一般用来上传文件图片等 各大服务器支持较好
4.text/xml
- 使用HTTP作为传输协议 XML作为编码方式



- 借助ide 编辑器的功能可以很轻松的看出当前代码在哪个函数中
- 做需求单还是要多考虑一些业务场景 有可能只修改了一个页面 但是没有考虑到相关的关联页面 就是bug

框架---------------------
>单页面
- 服务只有一个index.html静态文件 这个静态文件前端生成后 丢到服务器上
- 用户访问时 就是访问这个静态页面
- 静态页面中所呈现出的所有交互 包括点击跳转 数据渲染等 都是在这个唯一的页面中完成的
> 路由
- 通过一定的机制 监听用户的行为动作 从而做出对应的变化
1.hash模式
- 浏览器暴露hashchange方法 在hash改变时 触发该事件
- 有监听事件 改变hash页面不刷新
- 可以在监听事件的回调函数中 执行展示和隐藏不同UI显示的功能 从而实现前端路由
>结论
	1.hash模式所有的工作都是在前端完成的 不需要后端服务的配合
	2.hash模式的实现方式就是通过监听URL中hash部分的变化 从而做出对应的渲染逻辑
	3.hash模式下 URL中会带有# 不太美观
2.history模式
- 归功于HTML5提供一个history全局对象
- 可理解为其中包含了关于访问网页(历史会话)的一些信息 
- 同时还暴露一些有用的方法
```
window.history.go 跳转到浏览器会话历史中的指定的某一个记录页
window.history.forward 指向浏览器会话历史中的下一页 与浏览器前进按钮功能相同
window.history.back 返回浏览器会话历史中的上一页 与浏览器的回退按钮功能相同
window.history.pushState 可以将给定的数据压入浏览器会话历史栈
window.history.replaceState 将当前的会话页面的url替换成指定的数据
```
- history路由的实现 主要就是依靠于pushState与replaceState实现
>特点
1.都会改变当前页面显示的url 单都不会刷新页面
2.pushState是压入浏览器的会话历史栈 会使得history.length加1 replace是替换当前的这条会话历史 因此不会增加history.length
- 可以通过pushState或replaceState实现改变URL而不刷新页面
- 能够监听到改变URL这个动作 可以实现前端渲染逻辑的处理
>事件处理程序 popstate
1.history.pushState和history.replaceState方法不会触发popstate事件
2.浏览器的某些行为会导致popstate 比如go back forward
3.popstate事件对象中的state属性 可以理解为在通过history.pushState或history.replaceState方法时 传入的指定数据
>point
- hash模式不需要后端服务配合
- history模式下 再跳转路由再刷新会得到404的错误
- 浏览器会把整个地址当成一个可访问的静态资源路径进行访问 然后服务端没有这个文件

- 没刷新时 只是通过pushState改变URL 不刷新页面
- 一旦在某个路由下刷新页面时 相当于去该路径下寻找可访问的静态资源index.html 报错
- 一般情况下 需要配置下nginx 告诉服务器 访问的路径资源不存在时 默认指向静态资源index.html	
> 小结
1.一般路由实现主要有history hash两种方式
2.hash的实现全在前端 不需要后端服务器配合 兼容性好 主要是通过监听hashchange事件 处理前端业务逻辑
2.history的实现 需要服务器做一下简单配置 通过监听pushState和replaceState事件处理前端业务逻辑
Vue中插件和组件的区别
> 组件
- 组件就是把图形 非图形的各种逻辑均抽象为一个统一的概念(组件)来实现开发的模式 在Vue中每一个.vue文件都可以视为一个组件
> 插件
- 插件通常用来为Vue添加全局功能 插件的功能范围没有严格的显示 一般有以下几种
1.添加全局方法或属性 如vue-custom-element
2.添加全局资源 指令/过滤器/过渡等 如vue-touch
3.通过全局混入来添加一些组件选项 如vue-router
4.添加Vue实例方法 通过把他们添加到Vue.prototype上实现
5.一个库 提供自己的API 同时提供上面提到的一个或多个功能 如vue-router
区别
1.编写形式
2.注册形式
- Vue组件注册主要分为全局注册和局部注册
	1.全局注册通过Vue.component方法 第一个参数为组件的名称 第二个参数为传入·的配置项
	2.局部注册只需在用到的地方通过components属性注册一个组件
- 插件注册
	- 通过Vue.use()的方式进行注册(安装) 第一个参数为插件的名字 第二个参数是可选择的配置项
	- 注册插件时 需要在调用new Vue()启动应用之前完成
	- Vue.use会自动阻止多次注册相同插件 只会注册一次
3.使用场景

HTML----------------------
label for属性
定义
- for属性规定label与哪个表单元素绑定
- <label>是专门为<input>元素服务的 为其定义标记
> label和表单控件有两种绑定方式
1.将表单控件作为label的内容 此时不需要for属性 绑定的控件也不需要id属性
<label>Date of Birth:<input type="text" name="DofB"/></label>
2.为label标签下的for属性命名一个目标表单的id 属于显式绑定
<label for="SSN">Social Security Number:</label>
<input type="text" name="SocSecNum" id="SSN">
给label添加for属性的意义
- 给label加了for属性绑定了input控件后 可以提高鼠标用户的用户体验
- 如果在label元素内点击文本 就会触发此空间 即当用户渲染该标签时 浏览器会自动将焦点转到和标签相关的表单控件上
无序列表ul li
有序列表ol li
定义列表
dd(definition description) dl(description title) dt(definition description)
dl 定义了一个列表
dt 定义了列表的标题
dd 定义了描述内容
- dt和dd中可以再加入ol ul li

表格
tr(table row) th(table head) td(table data)
tr 表格行
th 表头
td 表格元素

在HTML中 可以使用带data-前缀的属性来存储信息

VSCODE-----------------------
VSCode工作区
- 配置一个工作环境 更好的针对不同的环境(如JAVA环境 C++环境)设定不同的配置体验更好的VSCode
- 如在JAVA环境 无需使用Python的插件 但是Python插件默认开启 占用很多系统不必要的内存 就可以在不同的工作区进行不同的配置

CSS---------------------------
CSS2引入了媒体类型
- CSS2引入了@media规则 它让为不同媒体类型定义不同样式规则成为可能
CSS3引入了媒体查询
- CSS3中的媒体查询扩展了CSS2媒体类型的概念 它们并不查找设备类型 而是关注设备能力
- 媒体查询可用于检查许多事情 如
	视口的宽度和高度
	设备的宽度和高度
	方向(平板电脑/手机处于横向还是纵向模式)
	分辨率
> 媒体查询语法
- 媒体查询由一种媒体类型组成 并可包含一个或多个表达式 这些表达式可以解析为true或false
CSS3动画

JQUERY----------------
jquery eq()方法
eq()方法返回带有被选元素的指定索引号的元素
索引号从0开头 所以第一个元素的索引是0(不是1)

jqGrid的jsonReader
- jsonReader用于设置如何解析从Server端发回来的json数据

$.fn是指jquery的命名空间 加上fn的方法及属性 会对jquery实例有效
- 如扩展$.fn.abc() 即$.fn.abc()是对Jquery扩展了一个abc()方法
- 在每一个jquery实例都可以引用这个方法 如$("#div").abc()
- 这个和Vue的prototype有些像

Jquery为开发者开发插件提供两个方法
1.jquery.extend(object) 为扩展jquery类本身 为类添加新的方法
2.jquery.fn.extend(object) 给jquery对象添加方法
jquery.fn = jquery.prototype

- jquery本身就是一个封装得很好的类 比如用$("#div")会生成一个jquery类的实例

jquery属性操作 toggleClass()
- 对设置或移除被选元素的一个或多个类进行切换
- 该方法检查每个元素中指定的类 如果不存在则添加类 如果已设置则删除之 这就是所谓切换效果
- 通过使用switch参数 能够规定只删除或只添加类

Jquery实例 对象
- 将Jquery引入后 在全局作用域下会新增$和jQuery两个全局变量 这两个变量引用的是同一个对象 
- 称为jQuery顶级对象
- 在代码中可以使用jQuery代替$ 但一般为了方便 通常都直接使用$

- jQuery顶级对象类似一个构造函数 用来创建jQuery实例对象(简称为jQuery对象)
- 但它不需要使用new进行实例化 它内部会自动进行实例化 返回实例化后的对象

- jQuery的功能很多 但使用方法很简单
1.为构造函数传入不同的参数 来完成不同的功能
2.调用jQuery的静态方法

- 在实际开发中 经常会在jQuery对象和DOM对象之间进行转换
1.DOM对象是用原生JS的DOM操作获取的对象
2.jQuery对象是通过jQuery方式获取到的对象
- 这两种对象的使用方式不同 不能混用

- jQuery对象实际上是对DOM对象进行了包装 也就是将DOM对象保存在jQuery对象中
- 因此通过jQuery可以获取DOM对象 有两种方式
1.$("div")[0]
2.$("div").get(0)
- 取出DOM对象后就可以用DOM方式操作元素
- 由于一个jQuery对象中可以包含多个DOM对象 所以在去除DOM对象时需要加上索引(从0开始) 0表示第一个DOM对象
- DOM对象也可以转换成jQuery对象 其方式是将DOM对象作为$()函数的参数传入 该函数就会返回jQuery对象 
```
var myDiv = document.querySelector("div")
var div = $(myDiv)
div.hide()
```

jqGrid -- 单元格添加回车事件 afterSaveCell(rowid,name,val,iRow,iCol)
- rowid 行id
- name 列名称
- val 修改后的单元格的值
- iRow 编辑单元格行索引
- iCol 编辑单元格列索引
- afterSaveCell可以在该事件中实现单元格回车事件 
- 通过name列名称属性判断到某需要的列
- 然后可以使用$("#gridId").getCol("name",false,'sum') 来实现一列数据求和	

JS---------------
$(window).height()和$(document).height()
1. $(window).height()代表当前可见区域大小
- 当浏览器窗口大小改变时(最大化/拉大窗口) $(window).height()随之变化 $(document).height()不变
2. $(document).height()代表整个文档高度

window.location.reload()刷新当前页面
window.parent.location.reload()刷新父亲页面(用于框架)

history.go(-1)和history.back(-1)区别
1.history.go(-1) 表示后退与刷新 如数据有改变也随之改变
2.history.back()单纯返回上一页

javascript URIs
- 当用户点击一个以javascript:开头的URI时 它会执行URI中的代码 然后用返回的值替换页面内容 除非返回的值是undefined

JSP---------------------
1.JSTL
- 全称为JSP Standard Tag Library即JSP标准标签库 
- JSTL作为最基本的标签库 提供了一系列的JSP标签 实现了基本的功能：集合的遍历 数据的输出 字符串的处理 数据的格式化等
2.EL表达式
- 表达式语言(Expression Language EL)EL表达式是用${}括起来的脚本 用来更方便的读取对象
- EL表达式主要用来读取数据 进行内容的显示
- 使用EL表达式可以方便的读取对象中的属性 提交的参数 JavaBean 甚至集合
- 一般模式
- 在Servlet处理好的数据 转发到JSP JSP只管对小部分的数据处理以及JSP本身写好的页面

- void是JS中非常重要的关键字 该操作符指定要计算一个表达式但是不返回值
语法格式如下
void func()
javascript:void func()
或
void(func())
javascript:void(func())
- void()仅仅是代表不返回任何值 但是括号内的表达式还是要运行

href="#"与href="javascript:void(0)"的区别
- #包含了一个位置信息 默认的锚是#top 也就是网页的上端
- 在页面很长的时候会使用#来定位页面的具体位置 格式为:#+id
- 如果要定义一个死链接 要使用javascript:void(0)
javascript:void(0)

JSP 全名Java Server Pages java服务器页面
- JSP是一种基于文本的程序 其特点就是HTML和Java代码共同存在
- JSP是为了简化Servlet的工作出现的替代品
- Servlet输出HTML非常困难 JSP就是替代Servlet输出HTML的

- Tomcat访问任何的资源都是在访问Servlet
- JSP本身就是一种Servlet
- JSP在第一次被访问时会被编译为HttpJspPage类(该类是HttpServlet的一个子类)

- 说到底 JSP就是封装了Servlet的java程序
- JSP的本质就是Servlet 
- 只是JSP当初设计的目的是为了简化Servlet输出HTML代码
---------正则
正则表达式中的^有两种意义
1. 标识开头
2. 内容取反(中括号内写^才是取反)
- [^x] 匹配除了x以外的任意字符
- [^aeiou] 匹配除了aeiou这几个字母以外的任意字符

正则表达式中的$1 $2
- $1 $2表达的是小括号里的内容 
- $1是第一个小括号里的内容
- $2是第二个·小括号里的内容
- 以此类推

正则表达式 回溯引用 和分组()一起发挥作用

----------GIT
切换分支
- 当你切换分支时 git会用该分支的最后提交的快照替换你的工作目录的内容 所以多个分支不需要多个目录

初始化git仓库
- 当你执行git init时 默认情况下git会为你创建master分支
- 如果要手动创建一个分支 执行git branch <branchname>即可
- 当以此方式在上次提交更新之后创建了新分支 如果后来又有更新提交 然后又切换到testing分支 git将还原你的工作目录到你创建分支时的样子

git push时的-u
- 带上-u参数其实就相当于记录了push到远端分支的默认值 这样下次还想继续push这个远程分支时 推送命令就可以简写成git push

###从远程拉取一条本地不存在的分支并在本地新建分支并与远程分支相关联
git checkout -b xxx origin/xxx

###本地已创建分支 远程没有 将本地分支推到远程 并且在本地远程之间创建关联关系
git push -u origin xxx
git push --set-upstream origin dev
###本地新建一个分支 并于指定的远程分支建立追踪关系
git branch --track [branch][remote-branch]

###删除远程分支
git push origin --delete [branchname]

origin为远程地址别名

### git本地新建分支并提交到远程仓库
1. 建立本地仓库
- 查看当前项目根目录中有没有.git文件(隐藏文件) 如果没有 右键 git bash here 输入git init建立本地仓库
git init
2. 将代码提交到本地仓库
git add .
git commit -m 'new branch commit'
3. 在本地仓库中建立一个与远程仓库的别名 以便之后提交代码 不用每次都要输入远程仓库地址
git remote add origin git代码地址


### 删除分支
1. 删除本地分支
git branch -d +分支名称 
2. 删除远程分支
git branch -r -d origin/branch-name
git push origin :branch-name

git checkout -b feat/max_stock_PRJ-00217883 origin/feat/max_stock_PRJ-00217883

###git拉取远程指定分支代码
1. git clone -b branch-name xxx

###查看本地分支与远程分支的关联
1.git branch -vv
2. git remote show origin
3. cat .git/config

### 将本地分支关联到远程分支
1. 远程新建一个分支 本地没有该分支
git checkout -b branch-name 新建并切换到本地branch-name分支
git pull origin branch-name 本地分支与远程分支相关联
----
git checkout --track origin/branch-name 本地会新建一个分支名叫branch-name 会自动跟踪远程的同名分支branch-name
2. 本地新建一个分支 远程没有该分支
git checkout -b branch-name 新建并切换到本地branch-name分支
git push -u origin branch-name 在远程创建分支并关联 -u表关联
----
此时push和pull指令无法确定跟踪谁 一般来说会使其跟踪远程同名分支 
git push --set-upstream origin branch-name 在远程创建一个branch-name分支 本地track其分支 再push和pull就自动同步
---
git branch --set-upstream debug origin/debug
3. git本地新建分支并提交到远程仓库
<>
4. 本地有branch-name2分支 远程有branch-name分支 分支不同名
git push -u origin branch-name2:branch-name 推送即可
git pull origin branch-name:branch-name2/git pull origin branch-name 远程分支更新拉去

### git remote命令 
- git remote是远程仓库而不是远程分支?
1. git remote -v 显示所有远程仓库
2. git remote show xxx(xxx为远程仓库别名)显示某个远程仓库信息
3. git remote rm name 删除远程仓库
4. git remote rename oldname newname 修改仓库名

### 修改commit内容
1.git commit --amend
2.进入vim操作页面 点击i进入INSERT模式 修改commit内容 点击esc按钮退出INSERT模式 :wq保存退出
3.可以使用git log 查看修改情况

### git log
- 查看commit提交的历史数据
1.git log -pretty=oneline 一行显示 只显示哈希值和提交说明

### 撤销工作区
git commit 后 撤销commit
git reset --soft HEAD^
连着add也撤销
git reset --hard HEAD^git rebase

### git rebase
- rebase 变基 可以直接理解为改变基底 feature分支是基于master分支的B拉出来的分支 feature的基底是B
- 而master在B之后有新的提交 就相当于此时要用master上新的提交来作为feature分支的新基底
- 实际操作为把B之后feature的提交存下来 
>作用
1.合并commit记录 保持分支整洁
2.相比merge 会减少分支合并的记录
1.合并本地的多条提交commit记录
- git push之前可以将几次本地的commit操作合并 这样推到远程的commit操作就只有一个 更有利于项目管理
- 已在本地提交两次
	1.调用git rebase命令合并本地的commit节点
	git rebase -i HEAD~2
2.分支合并
- 冲突解决
- rebase过程中会出现conflict 此时git会停止rebase并让人解决冲突 在解决冲突后 用git add更新这些内容
- 无需执行git commit 只要执行continue
git rebase --continue
- 这样git会继续应用剩下的patch补丁文件
- 任何时候 都可以用--abort参数终止rebase行动 分支会回到rebase开始前的状态
git rebase --abort

### git merge
1.将某个分支合并到当前分支
git merge <localbranch>
2.将多个分支合并到当前分支
git merge <localbranch><otherLocalBranch>
>git自动合并冲突
- 当git能自动合并所有冲突时 git会自动生成一个commit记录 commit记录附带信息是Merge branch into
>git不能解决所有冲突 git做的
1.此时git无法创建提交
2.将无冲突部分的修改添加到暂存区
3.在无法解决的冲突部分查询冲突的标志 即为<<<<<<HEAD
>什么情况下出现git无法自动合并的冲突
- 当对同一个文件的相同部分做出不同修改时
>冲突合并快捷操作
- 完全采用自己的
git checkout --ours<file>
- 完全采用他人的
git checkout --theirs<file>

### git merge --squash
- 不同分支的commit在merge到develop之后会 犬牙交错在一起
- 在merge分支时把分支上所有commit合并为一个commit后再merge到目标分支
- 用上squash merge后 每个被合并的分支在develop上就只有一个commit 回退到哪一个都很方便

### 当多条分支合并到dev上 想要回退某一条分支的merge
- 分支merge进dev会有一条merge记录
- revert掉这一条分支记录 这个merge包含的所有commit都会被回退到
- 最好不要用reset 因为可能会回退到别人的merge

### git cherry-pick
- 代码从一个分支转移到另一个分支
1.需要另一个分支的所有代码改动 采用合并(git merge)
2.只需要部分代码变动(某几个提交) 可以采用cherry pick
> 基本用法
- git cherry-pick命令的作用 就是将指定的提交(commit)应用于其他分支
```
git cherry-pick <commitHash>
```
- 该命令会将指定的提交commitHash应用于当前分支 这会在当前分支产生一个新的提交 当然它们的哈希值会不一样
- git cherry-pick命令的参数 不一定是提交的哈希值 分支名也是可以的 表示转移该分支的最新提交
```
git cherry-pick feature
```
- 上面代码表示将feature分支的最近一次提交 转移到当前分支
>转移多个提交
- cherry-pick支持一次转移多个提交 
git cherry-pick <HashA><HashB>
- 将A和B两个提交应用到当前分支 会在当前分支上生成两个对应的新提交
>转移一系列的连续提交
git cherry-pick A..B
- 可以转移A到B的所有提交 必须按照正确的顺序防止
- 提交A必须早于提交B 否则命令将失败 但是不会报错 
- 上述写法 提交A不会包含在Cherry pick中 如果要包含A可以使用
git cherry-pick A^..B
>配置项
1.-e --edit
- 打开外部编辑器 编辑提交信息
2.-n --no-commit
- 只更新工作区和暂存区 不产生新的提交
3.-x
- 在提交信息的末尾追加一行(cherry picked from commit)方便以后查到这个提交是如何产生的
4.-s --signoff
- 在提交信息的末尾追加一行操作者的签名 表示是谁进行了这个操作
5.-m parent-numver --mainline parent-
- 如果原始提交是一个合并节点 来自于两个分支的合并 那么cherry pick默认将失败 因为它不知道应该采用哪个分支的代码变动
-m配置项告诉Git 应该采用哪个分支的变动 它的参数parent-number是一个从1开始的整数 代表原始提交的父分支编号
git cherry-pick -m 1 <commitHash>
>代码冲突
- 如果操作过程中发生代码冲突 cherry pick会停下来 让用户决定如何继续操作
1.--continue
git cherry-pick --continue
	1.用户解决代码冲突后 第一步将修改的文件重新加入暂存区git add .
	2.使用git cherry-pick --continue 让cherry pick过程继续执行
2.--abort
git cherry-pick --abort
	- 发生代码冲突后 放弃合并 回到操作前的样子
3.--quit
git cherry-pick --quit
	- 发生代码冲突后 退出cherry pick 但是不回到操作前的样子
>转移到另一个代码库
- cherry pick支持转移另一个代码库的提交 方式是先将该库加为远程仓库
git remote add target git://gitUrl
- 该命令添加一个远程仓库target
- 然后将远程代码抓取到本地
	1.git fetch target
	- 上面命令将远程代码仓库抓取到本地
	2.git log target/master
	- 检查一下要从远程仓库转移的提交 获取它的哈希值
	3.git cherry-pick <commitHash>
	- 使用git cherry-pick命令转移提交

### git revert
- git revert之后 如果需要merge需要再次revert掉上一次的revert?

### git以不同分支名将本地分支推送到远程
git push origin local_branch:remote_new_branch

### git reset命令三种方式
1.git reset --mixed
- 默认方式 等同于不带任何参数的git reset
2.git reset --soft
- 回退到某个版本 只回退了commit的信息 
- 如果还要提交 直接commit即可(修改的内容变成未add的状态)
- 索引(暂存区)和工作目录的内容是不变的 在三个命令中对现有版本库改变最小
3.git reset --hard
- 彻底回退到某个版本 本地源码会变成上一个版本的内容
- 所有修改的内容都会丢失(修改的代码 不会变成未add的状态)
- 索引(暂存区)内容和工作目录内容都会变成给定提交时的状态

### git本地分支关联远程分支
1.git push --set-upstream origin 远程分支名
2.git branch --set-upstream-to=origin/远程分支名 本地分支名

###迪米特法则(Law of Demeter)
- 最少知识原则 
- 一个对象应当对其他对象尽可能少了解 不和陌生人说话
- 英文简写 LoD
>目的
- 降低类之间的耦合 由于每个类尽量减少对其他类的以来 因此 很容易使得系统的功能模块功能独立 相互之间不存在(或很少有)依赖关系

### 抓包
- 将网络传输发送与接收的数据包进行截获 重发 编辑 转存等操作 
>通过抓包可以
1.分析网络问题
2.业务分析
3.分析网络信息流通量
4.探测企图入侵网络的攻击
5.探测由内部和外部的用户滥用网络资源
6.探测网络入侵后的影响
7.监测链接互联网宽频流量
8.监测网络使用流量(包括内部用户 外部用户 系统)
9.监测互联网和用户电脑的安全状态
10.渗透与欺骗
- 传输与接收的过程 可以使用抓包工具(sNiffers)进行抓包
- 作为前端开发者 通常是抓取应用层的HTTP/HTTPS的包
>HTTP/HTTPS抓包原理
- HTTP/HTTPS是应用层使用的通信协议 常见的应用层体系结构是客户端-服务器体系
>HTTP抓包原理
- 在HTTP标准中 没有对通信端身份验证的标准
- 对于服务器来说 它接受的HTTP请求报文只要格式符合规范 就发送响应报文


领域驱动设计思想 DDD(Domain-Driven Design)
- 在一定领域内 发现问题 抽象共性不变的流程 从而提供问题解决方案的过程
- 它的方法是通过一个统一语言领域建模 领域划分等一系列手段来降低复杂度 
- 并基于面向对象分析(OOP)技术进行了分层规划
- 对软件开发全生命周期使用语言进行统一 
- 并强调业务与技术相结合的一种过程

>trim函数
- trim()函数移除字符串两侧的空白字符或其他预定义字符
- 函数执行成功时返回删除了string字符串首部和尾部空格的字符串 发生错误时返回空字符串("") 
- 如果任何参数的值为null trim()函数返回null

>axios&jsonp
1.axios
- Vue官方推荐的一个AJAX插件 用于请求后端传递的数据
2.jsonp
- 可用于跨域请求json数据
 1.安装方式 npm install jsonp --save
 2.在所需要使用jsonp的文件中引入jsonp const jsonp = require('jsonp')
 3.通过jsonp请求后端数据 具体代码如下
 ```
 jsonp(url,null,(err,data)=>{
	if(err){
		console.log(err)
	}else{
		console.log(data)
	}
 })
 ```
> href= 'JavaScript:;'
- 伪协议
- 伪协议不同于因特网上所真实存在的协议 如http:// https:// ftp://
- 而是为关联应用程序而使用的 如data:(用base64编码来在浏览器输出二进制文件) 还有就是javascript
- 可以在浏览器地址栏里输入"javascript:alert('JS!')" 实际上是把javascript:后面的代码当JS执行 然后将结果值返回给当前页面
> javascript:void(0)和javacript:;区别
- 两种都是javascript:URL的形式
- 在浏览器打开javascript:URL时 它会先运行URL中的代码 当返回值不为undefined时 前页链接会替换成这段代码的返回值
- javascript:void(0) void运算符会对给定的表达式进行求值 然后直接返回undefined 
- javascript:;也是返回undefined 所以两种方法是等价的

埋点分类
1.代码埋点
- 通过代码的方式在页面中嵌入逻辑 比如捕获一个点击事件 在这个点击事件之前加入代码埋点 上报给后台
2.可视化埋点
- 需要第三方的服务商支持 可视化埋点开发人员除集成采集可视化SDK外 不需要额外去写埋点代码 
- 而是由业务人员或运营人员通过访问分析平台的圈选功能
3.无痕埋点/全埋点
- 针对某一个单一事件 在全局实现监听达到上报 而不是全部事件上报才叫无痕埋点
- 只要有某个事件在全局实现监听 针对这个事件的埋点方式就成为无痕埋点

前端监控
1.数据监控(监控用户行为)
2.性能监控(监控页面性能)
3.异常监控(监控产品 系统异常)

埋点上报方法
1.手动/代码埋点
- 调用埋点sdk函数 在需要埋点的业务逻辑功能位置调用接口 上报埋点数据
- 手动埋点让使用者可以方便的设置自定义属性 自定义事件 
2.可视化埋点
- 可视化交互的手段 代替上述的代码埋点
3.无埋点
- 前端自动采集全部事件 上报埋点数据 由后端过滤计算有用的数据
>使用请求GIF图片的方式上报数据
1.防止跨域
2.防止阻塞页面加载 影响用户体验
3.相比PNG/JPG GIF体积最小


SSR(Server side rendering)
- 服务端渲染把数据的初始请求放在了服务端 服务端收到请求后 把数据填充到模板形成完成的页面 由服务器把渲染的完整的页面返回给客户端
CSR(Client side rendering)
- 客户端渲染 客户端发起HTML网页请求时 服务器不做任何处理 直接返回静态的HTML文件 客户端收到后 执行JS 生成DOM 插入HTML页面 完成最终页面的绘制
> Next
- Next.js不单纯是服务端渲染框架 准确来讲 是同构渲染框架 Next.js具有同类框架中最佳的"开发人员体验"和许多内置功能
> Next两种形式的预渲染
- 这两种方式的不同在于为page(页面)生成HTML页面的时机
1.静态生成(Static Generation)
- 项目构建时生成页面 并在每次页面请求(request)时被重用
- Next.js在构建时使用getStaticProps所返回的包含数据预渲染此页面
2.服务器端渲染(Server-side Rendering)
- 每次页面请求时 重新生成一个页面返回给客户端
- 根据getServerSideProps返回的数据来构建页面

> min.js文件与js文件
- js是源码文件 min.js是压缩版的js文件 两者在功能上完全一致
原理
1.去掉无用的空格 换行符号 注释等 从而压缩js文件大小
2.将原js文件中变量和函数的命名修改为没有实际意义的名称 进行语句的等价替换 如条件判断修改为使用三目运算符

>noscript标签
- noscript元素用来定义在脚本未被执行时的替换内容
>以下情况下会显示出来
1.浏览器不支持脚本
2.浏览器支持脚本 但脚本被禁用

> encodeURI()函数
- 可把字符串作为URI进行编码

### svg
>位图 矢量图
1.位图
- 放大会失真 图像边缘有锯齿 由像素点组成 前端的Canvas就是位图效果
2.矢量图
- 放大不会失真 使用XML描述图形
>SVG
- 矢量图其中一种格式 用XML描述图形 
- SVG是一套新标签
- 可以使用CSS设置样式 可以使用JS对SVG进行操作
>SVG使用方式
1.浏览器直接打开
2.内嵌到HTML中(推荐)
3.CSS背景图
4.使用img标签引入
>SVG默认宽高
- HTML中使用SVG 直接用<svg>标签
- 不给<svg>设置宽高时 它的默认宽度是300px 默认高度是150px 这点和<canvas>一样
>基础图形
- HTML的元素大多数默认都是矩形 SVG在形状上更加丰富
1.矩形 <rect>标签
2.圆形 <circle>标签
3.椭圆 <ellipse>标签
4.直线 <line>
5.折线 <polyline>
6.多边形 <polygon>
7.直线路径 <path>
> 设置样式的方法
- 设置SVG元素样式和CSS差不多 常见的有四种方法
1.属性样式
- 直接在元素属性上设置样式
2.内联样式
- 把所有样式写在style属性里
3.内部样式
- 将样式写在<style>标签里
4.外部样式
- 将样式写在.css文件中 然后在页面中引入该CSS文件
>常用样式设置
1.填充fill
2.填充色不透明度 fill-opacity
3.描边颜色 stroke
4.描边颜色的不透明度 stroke-opacity
5.描边宽度 stroke-width
6.虚线描边 stroke-dasharray
7.虚线偏移量 stroke-dashoffset
8.线帽 stroke-linecap
9.拐角 stroke-linejoin
10.消除锯齿 shape-rendering
>文本元素text
- svg可以使用<text>标签渲染文本 文本有基线概念 和CSS一样
1.设置字号 font-size
2.粗体 font-weight
3.装饰线 font-decoration
4.水平对齐方式 text-anchor
- 多行文本 <tspan>标签
5.垂直对齐方式 dominant-baseline
6.纵向文字 writing-mode
>超链接
1.<a>标签
- 除了可以包裹文本外 还可以包裹各种图形和图片等元素
>图片image
- svg中可以使用<image>标签加载图片 包括位图

### Flv.js
- 一个实现了在H5视频中播放FLV格式视频的JS库
- 工作原理是将FLV文件流转码复用成ISO BMFF(MP4碎片)片段
- 然后通过Media Source Extensions将MP4片段喂进浏览器

###
1.clientX 
- 鼠标事件发生时 鼠标相对于浏览器x轴的位置
2.clientY
- 鼠标事件发生时 鼠标相对于浏览器y轴的位置
3.screenX
- 鼠标事件发生时 鼠标相对于显示器屏幕x轴的位置
4.screenY
- 鼠标事件发生时 鼠标相对于显示器屏幕y轴的位置
5.offsetX
- 鼠标事件发生时 鼠标相对于事件源x轴的位置
6.offsetY
- 鼠标事件发生时 鼠标相对于事件源y轴的位置

### window.onload
- 用于在页面加载完毕后立即执行的操作 即当HTML文档加载完毕后 立即执行某个方法
- 通常用于<body>元素 在页面完全载入后(包括图片 css文件等)执行脚本代码
>使用该方法意义
- JS中的函数方法需要在HTML文档渲染完成后使用
- 如果没有渲染完成 此时DOM树不完整 在调用一些JS代码时可能会报undefined错误
>window.onload与jQuery ready()区别
```
window.onload = function(){} //JS
$(document).ready(function(){}) //Jquery
```
- 以上两种方法都是在HTML文档完毕后再执行DOM操作 但它们还存在一些区别
1.执行时机
- load 必须等网页全部加载完毕(包括图片等) 然后再执行包裹代码
- ready 只需要等到网页中的DOM结构加载完毕 就能执行包裹的代码
2.执行次数
- load 只能执行一次 如果第二次 那么第一次的执行会被覆盖
- ready 可以执行多次 不会被覆盖
3.简写方案
- load 无
- ready $(function(){})

### Vue嵌套路由
- 嵌套路由和嵌套组件之间的匹配 使用vue-router实现
> <router-view></router-view>
- 一个顶级外链 它会渲染一个和顶级路由匹配的组件
- 同样 组件内部也可以包含自己的外链 嵌套的<router-view>
- 为了能在这个嵌套的外链中渲染相应的组件 需要更新路由配置

### getCurrentInstance
- Vue3中 在setup中无法通过this获取组件实例
- getCurrentInstance()可以用来获取当前组件实例
- getCurrentInstance只能在setup或生命周期钩子中使用

### video标签
- 支持三种视频格式 mp4 webM ogg
- <video>标签是H5的新标签
- 可以在<video>和</video>标签之间放置文本内容 这样不支持<video>元素的浏览器可以显示出该标签的信息
-controls 如果出现该属性 则向用户显示控件 比如播放按钮

### track标签
- <track>标签为媒体标签(如<audio> <video>)规定外部文本轨道 也就是字幕
- 这个元素用于规定字幕文件或其他包含文本的文件 当媒体播放时 这些文件是可见的

### charge2
- postMessage消息传递  window.addEventListener
- 实现不同框架之间混用时(iframe) 页面或组件之间相互传值
>window.postMessage()方法允许来自一个文档的脚本可以传递文本消息到另一个文档里的脚本 不管是否跨域
- 一个文档的脚本还是不能调用在其他文档里方法和读取属性
- 但他们可以用window.postMessage结合window.addEventListener这种消息传递安全的通信
```
window.addEventListener('message',(event)=>{})
```
>event属性
1.data 从其他window传递过来的数据副本
2.origin 调用postMessage时 消息发送窗口的origin 如http://www.localhost.8080
3.source 对发送消息的窗口对象的引用 可以使用此来在具有不同origin的两个窗口之间建立双向数据通信
>使用场景
1.不同origin的两个窗口之间建立双向数据通信
2.页面与嵌套的iframe消息传递

### react组件中箭头函数
>概念
- 箭头函数是匿名函数的另一种表达方式 简化写法
```
//普通函数
const fun = function(){}
// 把匿名函数的引用地址赋值给了fun变量
```
```
//箭头函数
const fun =()=>{}
```
>箭头函数的调用(React组件)
1.无参数
- 可以直接使用函数名 这时不要在后面加()
2.有参数
- 必须使用箭头函数的形式调用 因为加括号会直接调用函数
3.在组件中定义的普通函数
- 只能用箭头函数或者绑定this的方式调用 否则它的this会指向window/undefined
4.传递React的事件对象e
- React的事件对象e会被作为第二个参数传递
- 如果通过箭头函数的方式 事件对象必须显式传递
- 通过bind的方式 事件对象以及更多的参数将会被隐式传递

### video标签的一些属性

### shadow DOM
- 常用的input video audio这些元素 也是以组件形式存在的 HTML Web Component
>shadow DOM
- <video>标签中有很多内容 隐藏的shadow-root里的内容就是以上视频播放器控制组件HTML结构所在之处
> shadow DOM概念
- 是HTML的一个规范 它允许浏览器开发者封装自己的HTML标签 CSS样式和特定的JS代码
- 同时也可以让开发人员创建类似<video>这样的自定义一级标签 
- 创建这些新标签内容和相关的API被称为Web Component
>shadow-root
- Shadow DOM的根节点
>shadow-tree
- Shadow DOM包含的子节点树结构
>shadow-host
- Shadow DOM的容器组件 如<video>标签
>自定义Shadow DOM
- 可以通过element.createShadowRoot()来创建目标容器(shadow-host)对应的shadow-root
- shadow-dom和主dom的样式互不影响

### Vue teleport
- <Teleport>是一个内置组件 可以将一个组件内部的一部分模板传送到该组件的DOM结构外层的位置
1.teleport是内置组件 可以直接在模板中使用 无需注册
2.可以被打包工具 tree-shake 只会在被使用时被引入
3.需要直接主动访问它们的场景 可以将他们显性导入
>props
1.to -string 必传
- 挂载目标只能是父级标签 兄弟 子级都会报错
- 挂载目标必须是有效的查询选择器或HTMLElement
- 加载teleport之前 目标元素必须存在
2.disabled -boolean 非必传
- 是否禁用 true挂载到目标节点下 false为当前位置
- 动态变化disabled值 只是位置会变动 内容不会销毁重新渲染

### React useRef
```
const refConatiner = useRef(initialValue)
```
- useRef返回一个可变的ref对象 其.current属性被初始化为传入的参数(initialValue)
- 返回的ref对象在组件的整个生命周期内保持不变

### css global
### css modules
- 不是将CSS改造成编程语言 而是功能很单纯 只加入了局部作用域和模块依赖
- css modules提供各种插件 支持不同的构建工具
1.局部作用域
- 将样式文件App.css输入到style对象 然后引用style.title代表一个class
- 构建工具会将类名style.title编译成一个哈希字符串
- App.css也会同时被编译
- 如此 这个类名变得独一无二 只对App组件有效
2.模块依赖
> 全局作用域
- CSS Modules允许使用:global(.className)的语法 声明一个全局规则 
- 凡是这样声明的class 都不会被编译成哈希字符串
- CSS Modules还提供一种显式的局部作用域语法:local(.className)等同于.className
>定制哈希类名
- css-loader默认的哈希算法是[hash:base64]
- webpack.config.js中可以定制哈希字符串的格式
>Class组合
- CSS Modules中 一个选择器可以继承另一个选择器的规则 这称为组合
>输入其他模块
- 选择器可以继承其他CSS文件里面的规则

### HTML documentElement
- 一个会返回文档对象(document)的根元素的只读属性
```
document.documentElement
```

### selectstart
- 在用户开始一个新的选择时触发

### onselectstart
- 几乎可以用于所有对象 其触发事件为目标对象被开始选中时(即选中动作刚开始 尚未实质性被选中)
- 该事件常使用使目标对象禁止变蓝

### Window getSelection
```
window.getSelection()
```
- 表示用户选择的文本范围或光标的当前位置

### Selection.removeAllRanges()
- 该方法会从当前selection对象中移除所有的range对象 取消所有的选择 
- 只留下anchorNode和focusNode属性并将其设置为null

### e.clientX e.clientY
- 鼠标相对于浏览器窗口可视区域的X Y坐标(窗口坐标)
- 可视区域不包括工具栏和滚动条











parentNode offsetParent
>parentNode
- 父元素 最临近的直接父节点
>offsetParent
- 某个元素相对于谁定位 谁就是他的父元素
- 没有定位父级时 offsetParent 是 body
- 有定位父级时 offsetParent是定位父级
>requestAnimation
- 一般浏览器刷新率为60Hz 也就是说1秒会刷新60次 每过16.6ms浏览器会渲染一帧画面
> 一般希望动画间隔时间为16.6ms 
1.不更快是避免为同样的效果消耗多余的资源
2.更慢会出现掉帧

### css实现水波纹
- 实现一个中心圆向四周有水波纹的效果
- 利用定位添加多个圆 给他们加上动画 使得依次从小变大 形成逐渐外扩的动画效果

### window.location.href&window.location.hash
window.location.href
- 得到使用完整的url
window.location.hash
- 得到锚链接
- 这个属性可以对URL中的#号参数进行修改 基于这个原理 可以在不重载页面的前提下创造一天新的记录

### embed标签
- <embed>标签定义了一个容器 用来嵌入外部应用或互动程序(插件)
- 现在已经不建议使用<embed>标签 可以使用<img> <iframe> <video> <audio>等标签代替

### object标签
- 定义一个嵌入的对象 使用此元素向XHTML页面添加多媒体 
- 此元素允许规定插入HTML文档中的对象的数据和参数 以及可用来显示和操作数据的代码

### Vue自定义渲染器API createRenderer()
- 创建一个自定义渲染器 通过提供平台特定的节点创建以及更改API 可以在非DOM环境中体验到Vue核心运行特性

### 把组件抽离成函数式调用
1.在两个项目中使用postMessage进行通信 子iframe给外面嵌套的壳子发信息 调用其中的组件
2.创建一个div dom 把想要使用的组件挂载到这个div上 这个div不在app dom节点内 不用依赖Vue特性?
3.使用createRenderer()实现?

### Vue createApp()
```
function createApp(rootComponent:Component,rootProps?:object):App
```
1.第一个参数是根组件 第二个参数可选 是要传递给根组件的props
2.可以内联根组件 也可以使用从别处导入的组件

### app.mount()
- 将应用实例挂载在一个容器元素中
1.参数可以是一个实际的DOM元素或一个CSS选择器(使用第一个匹配到的元素) 返回根组件的实例
2.如果该组件有模板或定义了渲染函数 它将替换容器内所有现存的DOM节点 否则在运行时编译器可用的情况下 
- 容器元素的innerHTML将被用作模板
3.对于每个应用实例 mount()仅能调用一次

### app.unmount()
- 卸载一个已挂载的应用实例
- 卸载一个应用会触发该应用组件树内所有组件的卸载生命周期钩子

### 自闭合标签
- HTML中标签分为两种
1.一般标签
 - 由于有开始符号和结束符号 因此可以在内部插入其他标签或文字
2.自闭合标签
 - 由于只有开始符号而没有结束符号 因此不可以在内部插入标签或文字
 - 所谓自闭合 指的是本来要用一个配对的结束符号来关闭 然而它却自己关闭了
 - H5标准中 自闭合标签中的/ 加与不加都可行
> HTML中常见的自闭合标签
<meta /> 定义网页的信息(供搜索引擎查看)
<link /> 引入外部CSS文件
<br /> 换行标签
<hr /> 水平线标签
<img /> 图片标签
<input /> 表单标签

### 线程
- 浏览器内核是多线程的 它们在内核控制下相互配合以保持同步
1.GUI渲染线程
- GUI渲染线程与JS引擎互斥 当JS引擎执行时GUI线程会被挂起
- GUI更新会被保存在一个队列中等到JS引擎空闲时立即被执行
2.javascript引擎线程
- 也可被称为JS内核 主要负责处理JS脚本程序 如V8引擎
- JS引擎线程负责解析JS脚本 运行代码 浏览器什么时候都只有一个JS线程在运行JS程序
3.浏览器事件触发线程
- 一个事件被触发时 该线程会把事件添加到待处理队列的队尾 等待JS引擎的处理
4.定时器触发器线程
- 浏览器定时计数器不由JS引擎计数 JS引擎是单线程 如果阻塞会影响计时的准确
5.异步HTTP请求线程
>JS是单线程的 同一时间只能做一件事
- JS调用栈 call stack：函数被调用时 会被加入到调用栈顶部 执行结束之后 会从调用栈顶部移除该函数
- 这种数据结构的关键在于后进先出LIFO
>任务队列(消息队列)
- 函数分为两种
1.同步
2.异步
- 任务分为两种
1.同步
- 在主线程上排队执行的任务 只有前一个任务执行完毕 才能执行后一个任务
2.异步
- 主线程发起一个异步请求(即执行异步函数)

### 任务(消息)队列
- 一个先进先出的队列 里面存放着各种任务(消息)
### 事件循环(event loop)
- 事件循环是指主线程重复从任务(消息)队列中取任务(消息)执行的过程 取一个任务(消息)并执行的过程叫做一次循环
- 事件循环中有事件两个字的原因:任务(消息)队列中的每条消息实际上都对应一个事件 DOM事件
###任务(消息)
- 注册异步任务时添加的回调函数 如果一个异步函数没有回调 它不会被放到消息队列中
- 异步过程中的回调函数 一定不在当前这一轮事件循环中执行 而是这一轮执行完了 主线程空了 再从任务队列中取

### 一个异步过程
1. 主线程发起一个异步请求
2. 相应的工作线程接收请求并告知主线程已收到(异步函数返回)
3. 主线程可以继续执行后面的代码同时工作线程执行异步任务
4.工作线程完成工作后 通知主线程
5.主线程收到通知后 执行一定的动作(调用回调函数)

### 异步过程中 工作线程在异步操作完成后通知主线程
- 工作线程将消息放到消息队列 主线程通过事件循环过程去取消息
- 主线程只会做一件事情 就是从消息队列中取消息 执行消息 再取消息 再执行
- 异步过程的回调函数 一定不在当前这一轮事件循环中执行

### 队列
- 一个JS运行时包含了一个待处理消息的消息队列 每一个消息都关联着一个用以处理这个消息的回调函数


### JS引擎&JS运行时


### JS setTimeout
- 属于window方法 该方法用于在指定的毫秒数后调用函数或表达式
setTimeout(要执行的代码，等待的毫秒数)
setTimeout(JS函数，等待的毫秒数)
- 函数setTimeout接受两个参数
1.待加入队列的消息
2.一个时间值(可选 默认为0)
- 这个时间值代表消息被实际加入到队列的最小延迟时间
- 如果队列中没有其他消息并且栈为空 在这段延迟时间过去后 消息会被马上处理
- 如果有其他消息 setTimeout消息必须等待其他消息处理完 
- 第二个参数仅仅代表最少延迟时间 而非确切等待时间

### JS运行时
- 访问网站时 可以利用各种浏览器访问
- 每个浏览器都有一个JS运行时环境 
- 开发人员通过访问JS运行时提供的各种WEB API来构建程序

- 由浏览器 JS运行时环境提供的AJAX DOM BOM Event以及其他的WEB API加上ES形成完整的JS(actionScript)

- 在运行时环境 有一个解析代码的JS引擎
- 每个浏览器都有自己版本的JS引擎 Chrome使用 JS V8引擎




### 多个运行时互相通信
- 一个web worker或者一个跨域的iframe都会有自己的栈 堆和消息队列                                                                                                                                                                             
- 两个不同的运行时只能通过postMessage方法进行通信
- 如果另一个运行时侦听message事件 则此方法会向该运行时添加消息

### clearTimeout
- setTimeout方法可以使浏览器不断执行一段代码或一个函数 当一个setTimeout开始循环工作 要它停下来可使用clearTimeout
clearTimeout(timeoutID)
- timeoutID为调用setTimeout函数时所获得的返回值 使用该返回标识符作为参数 可以取消该setTimeout所设定的定时执行操作

### setTimeout(fn,0)作用
- 指定某个任务在主线程最早可得的空闲时间执行
- 它在任务队列的尾部添加一个事件 因此要等到主线程把同步任务和任务队列现有的事情处理完 才会得到执行

### 瀑布模型
### 敏捷开发
### DevOps
### CICDCD
> 持续集成(Continuous Integration) CI
- 重点是将各个开发人员的工作集合到一个代码仓库中
- 通常 每天都要进行几次 主要目的是今早发现集成错误
> 持续交付(Continuous Delivery) CD
- 目的是最小化部署或释放过程中固有的摩擦
- 它的实现通常能够将构建部署的每个步骤自动化 以便任何时刻能够安全完成代码发布
> 持续部署(Continuous Deployment) CD
- 一种更高程度的自动化 无论何时对代码进行重大更改 都会自动进行构建/部署











css overflow 
- 内容溢出时的设置 可以设置对象是否显示滚动条 它是overflow-x和overflow-y的简写属性
- 该属性用于控制内容溢出元素框时显示的方式
- css overflow属性可以控制内容溢出元素框时在对应的元素区间内添加滚动条
>overflow属性的值
1.visible 默认值 内容不会被修剪 会呈现在元素框之外
2.hidden 内容会被修剪 并且其余内容是不可见的
	如果需要 内容将被剪裁以适合填充框 不提供滚动条
3.scroll 内容会被修剪 但是浏览器会显示滚动条以便查看其余的内容
4.auto 如果内容被修剪 则浏览器会显示滚动条以便查看其余的内容
5.inherit 规定应该从父元素继承overflow属性的值
- overflow属性只工作于指定高度的块元素上
- 在OS X Lion(Mac系统)系统上 滚动条默认是隐藏的 使用时才会显示

对象的keys values entries
1.Object.keys() 返回键名的遍历器
2.Object.values() 返回键值的遍历器
3.Object.entries() 返回键值对的遍历器

数组的一些遍历方法
1.Array.find 返回一个对象(第一个满足条件的对象)后停止遍历
2.Array.some 返回是否满足条件的布尔值
3.Array.filter 遍历整个Array返回一个数组(包含所有满足条件的对象)

JS数组方法
1.Array.push(value) 将value添加到数组的最后，返回数组长度(改变原数组)
2.Array.unshift(value) 添加元素到数组的开头 返回数组长度(改变原数组)
3.Array.pop() 删除数组中最后一个元素 返回被删除元素(改变原数组)
4.Array.shift() 删除数组中第一个元素 返回被删除的(改变原数组)
5.Array.join(value) 将数组用value连接为字符串(不改变原数组)
6.Array.reverse() 反转数组(改变原数组)
7.Array.slice(start,end) 返回新数组 包含原数组索引start的值到索引end的值，不包含end(不改变原数组)
8.Array.splice(index,count,value) 从索引为index处删除count个元素 插入value(改变原数组)
9.Array.sort() 对数组元素进行排序(改变原数组)
- sort排序是根据位来进行排序 而非值的大小 实际是比较各个值转化为字符串后的各个位点的unicode位点
10.Array.toString() 将数组中的元素用逗号拼接成字符串(不改变原数组)
11.Array.indexof(value) 从索引为0开始 检查数组是否包含value 有则返回匹配到的第一个索引 没有返回-1(不改变原数组)
12.Array.lastIndexOf(value) 从最后的索引开始 检查数组是否包含value 有则返回匹配到的第一个索引 没有返回-1(不改变原数组)
13.Array.concat(value) 将数组和/或值连接成新数组(不改变原数组)
14.Array.fill(value,start,end) 使用指定value填充数组 从索引start开始end结束 不包含end(改变原数组)
15.Array.flat() 将二维数组变为一维数组(不改变原数组)
16.Array.flatMap() 相当于map与flat的结合(不改变原数组)
17.Array.copyWithin(target,start,end) 将数组从start到end索引的元素(不包含end)复制到target开始的索引位置(改变原数组)

18.Array.entries() 返回一个新的Array迭代器对象 可用for of遍历(不改变原数组)
19.Array.keys() 返回一个新的Array迭代器对象 可用for of遍历(不改变原数组)
20.Array.values() 返回一个新的Array迭代器(不改变原数组)

21.Array.foreach() 遍历数组(不改变原数组)
22.Array.every(fn) 判断数组中是否所有元素都满足fn函数中条件(不改变原数组)
23.Array.filter(fn) 返回数组中满足fn函数中条件的集合(不改变原数组)
24.Array.find(fn) 返回数组中第一个匹配fn函数中条件的值 没有则返回undefined(不改变原数组)
25.Array.findIndex(fn) 返回数组中第一个匹配fn函数中条件的索引 没有则返回undefined(不改变原数组)
 findIndex()方法返回传入一个测试条件(函数)符合条件的数组第一个元素位置
 findIndex()方法为数组中的每个元素都调用一次函数执行
  当数组中的元素在测试条件时返回true时,findIndex()返回符合条件的元素的索引位置，之后的值不会再调用执行函数
  如果没有符合条件的元素返回-1
26.Array.includes() 返回一个布尔值 表示某个数组是否包含给定的值(不改变原数组)
27.Array.map(fn) 以fn函数中返回值组成新的数组返回(不改变原数组)
28.Array.reduce() 累计器(不改变原数组)
arr.reduce((accumulator,currentValue,currentIndex,array))
29.Array.reduceRight() 与reduce功能一样 只是从数组末尾开始进行累计(不改变原数组)
30.Array.some(fn) 检查数组中是否含有满足fn函数条件的值(不改变原数组)
31.Array.toLocalString() 将数组中每个元素使用各自的toLocalString()转换后用,拼接(不改变原数组)


性能指标和优化目标
- 浏览器控制台 NetWork选项卡
- 可以看到各种资源的加载时间 通过Waterfall可以看到每个阶段的用时
- 如 TTFB(Time to first byte)请求发送出去 直到返回响应结果 经历了多久
>TTFB
- 是发出页面请求到接收到应答数据第一个字节的时间总和
- 它包含了DNS解析时间 TCP连接时间 发送HTTP请求时间和获得响应消息第一个字节的时间
>RAIL测量模型
- RAIL 以用户为核心的性能模型
- 谷歌从用户体验触发 制定了性能优化的标准RAIL
1.R Response 响应
网站给用户操作的响应的体验
Response响应 用户操作后100毫秒内要得到响应
2.A Animation 动画
网站动画是否流畅 如果卡顿 需要优化
每一帧的渲染在16毫秒内完成
3.I Idle 空闲
合理应用浏览器空闲时间
4.Load 加载
在5秒内完成内容加载并可以交换

waterfall chart 请求瀑布图
first view 首次访问
repeat view 二次访问

常用的性能测试API
1.计算可交互时间
window.addEventListener('load',function(){
	//可交互时间
	let timing = performance.getEntriesByType('navigation')[0]
	//计算
	let tti = timing.domInteractive - timing.fetchStart
})


渲染优化
浏览器渲染核心概念:关键渲染路径 critical rendering path
JavaScript->Style->Layout->Paint->Composite
1.触发视觉变化 不局限于JS 有可能是CSS样式的变化 animation等
2.浏览器对样式重新进行计算 计算哪些元素的CSS改变
3.布局 把元素绘制到页面上 需要知道元素的大小和位置 几何信息
4.绘制 把元素画到页面上 包括文字 图片 颜色 阴影等
5.合成 浏览器把不同的东西画在不同的层上 然后合成到一起


JS开销以及如何缩短解析时间
>开销
- 加载 解析编译 执行
>解决方案
1.Code splitting 代码拆分 按需加载
2.Tree shaking 代码减重
>减少主线程工作量
1.避免长任务
2.避免超过1kb的行间脚本
3.使用rAF和rlC进行时间调度

V8浏览器引擎做的一些优化
>抽象语法树
源码->抽象语法树->字节码Bytecode->机器码
- 编译过程会进行优化
- 运行时可能发生优化
>V8优化机制
1.脚本流
下载过程中，超过30kb时，单独开一个线程进行解析。
最后，合并所有解析完的内容。
2.字节码缓存
重复使用的片段，缓存起来，就不再需要翻译的过程。
3.懒解析
需要用到时，再解析

>对象优化
1.以相同顺序初始化对象成员，避免隐藏类的调整
2.实例化后避免添加新属性
3.尽量使用Array代替array-like对象
4.V8官方建议，将类数组对象，转换为真实数组，然后进行遍历

>Service Worker实现渐进式应用
>Service Worker作用
1.加速重复访问
2.离线支持
- 使用service-worker可以缓存静态文件

>IconFont
- 通过iconfont字体引入图标
- 从png到iconfont的优点
1.多个图标 => 一套字体，减少获取时的请求数量和体积
2.矢量图形，可伸缩
3.直接通过CSS修改样式(颜色 大小等)
缺点:单色彩

>SVG解决方案
- 从iconfont到SVG的优点
1.保持了图片能力，支持多色彩
2.独立的矢量图形，不像iconfont需要下载整套字体
3.XML语法

>预加载
- 优化资源加载顺序
资源优先级
1.浏览器默认安排，资源加载优先级
先有HTML解析头部，加载JS和样式，然后解析图片等资源
2.使用preload和prefetch调整优先级
>preload优先加载
- 通过link标签可以预加载图片
> prefetch
- 空闲加载，后面会用到的东西

>preload和prefetch使用场景
1.preload提前加载较晚出现，但是对当前页面非常重要的资源，如图片和字体。
2.prefetch加载完当前页面之后，提前加载后面路由需要的资源，优先级低。

>预渲染
1.大型单页应用的性能瓶颈:JS下载+解析+执行
2.SSR主要问题:牺牲TTFB请求过程，来补救首次加载First Paint实现起来，也很复杂
3.Pre-rendering 打包时提前渲染页面，没有服务端参与

mask-image
- 该CSS属性用于设置元素上遮罩层的图像

AJAX
1.XML数据格式
- xml 就是一种数据格式
- 元数据 用来描述数据的数据
- 这种数据的缺点
 1.元数据占用的数据量比较大的 不利于大量数据的网络传输
 2.在其他语言中 如JS 解析内部数据时 方法比较复杂 不便使用
2.JSON
- JavaScript Object Notation JS对象表示法
- 也是一种数据描述手段 类似于JS字面量方式
- 服务端采用JSON格式返回数据 客户端按照JSON格式解析数据

JSON Server
- 写一些数据 通过AJAX获取 需要搭建本地临时服务器
- json-server是一个Node模块 运行Express服务器 可以指定一个JSON文件作为API的数据源

>原生AJAX-GET请求
1.通常在一次GET请求过程中，参数传递都是通过URL地址中的?参数传递
2.一般在GET请求中，无需设置请求头
3.无需设置响应体，可以传null或者不传
var xhr = new XMLHttpRequest();
//发送GET请求
xhr.open('GET',"http://localhost:3000/users?age=19")
xhr.send(null);
xhr.onreadystatechange = function(){
	if(this.readyState === 4){

	}
}

>原生AJAX-POST请求
1.POST请求过程中，都是采用请求体承载需要提交的数据
2.需要设置请求头中的Content-Type 以便于服务端接收数据
3.需要提交到服务端的数据可以通过send方法的参数传递

前端实现文件下载
- 前端下载一般分为两种情况
1.后端直接给一个文件地址 通过浏览器打开就可以下载
2.需要发送请求 后端返回二进制流数据 前端解析流数据 生成URL 实现下载
>
1.location.href
- 对于一些浏览器无法识别的文件格式，可以直接在浏览器地址栏输入url即可触发浏览器的下载功能。
- 对于单文件下载没什么问题，如果下载多文件，点击过快会重置掉前面的请求。
适用场景
1.get请求
2.单文件下载
window.location.href = url
2.window.open
- 与location.href类似
window.open(url)
3.a标签
直接下载仅适用于浏览器无法识别的文件
如果是浏览器支持的文件格式，如html，jpg，png，pdf等，则不会触发文件下载。
而是直接被浏览器解析并展示，这种情况下，可以使用a标签下载文件，download属性可以设置文件名。
适用于单文件下载，如果下载多文件，点击过快就会重置掉前面的请求。
适用场景：
get请求
单文件下载
需要自定义文件名
- 有时候对于浏览器可识别的文件格式，需要直接下载的情况，
可以声明一下文件的header的Content-Disposition信息
告诉浏览器，该链接为下载附件链接，并且可以声明文件名
4.文件流
如果需要使用POST请求，且后端返回是一个文件流形式，那么前端需要自己将文件流转为链接，然后下载
使用场景：
post请求
get请求
多文件


仅使用CSS优化长列表页面渲染性能问题
- 内容可见性(content-visibility)
- content-visibility是CSS新增的属性 主要用来提高页面渲染性能 
它可以控制一个元素是否渲染其内容 并且允许浏览器跳过这些元素的布局与渲染
 visible：默认值 没有效果 元素的内容被正常布局和呈现
 hidden：元素跳过它的内容 跳过的内容不能被用户代理功能访问 例如在页面中查找 标签顺序导航等
	也不能被选择或聚焦 这类似于给内容设置display:none
 auto：该元素打开布局包含，样式包含和绘制包含。如果该元素与用户不相关，它也会跳过其内容。
	与hidden不同，跳过的内容必须仍可正常用于用户代理功能，例如在页面中查找，tab顺序导航等
	并且必须正常可聚焦和可选择
>content-visibility:hidden手动管理可见性
- content-visibility:hidden与display:none区别
 1.content-visibility:hidden只是隐藏了子元素，自身不会被隐藏
 2.content-visibility:hidden隐藏内容的渲染状态会被缓存 ，
 所以当它被移除或设为可见时，浏览器不会重新渲染，
 而是会应用缓存，所以对于需要频繁切换显示隐藏的元素，
 这个属性能够极大的提高渲染性能

>虚拟列表原理
- 首屏加载时，只加载可视区的内容，当页面发生滚动时，
动态通过计算获得可视区的内容，并将非可视区的内容进行删除，
这样就能够大大提高长列表的渲染性能

>content-visibility:auto 跳过渲染工作
- 可以用来跳过屏幕外的内容渲染 
对于这种有大量离屏内容的长列表，
可以大大减少页面渲染时间

可视区外的元素只有出现在了可视区才会被渲染
会导致前后页面高度发生变化，出现滚动条的抖动现象，
这是虚拟列表基本都会存在的问题

当元素接近视口时，浏览器不再添加size容器并开始绘制和命中测试元素的内容
这使得渲染工作能够及时完成以供用户查看

>contain-intrinsic-size
- 为了更好实现content-visibility 
浏览器需要应用size containment以确保内容的渲染结果不会以任何方式影响元素的大小
这意味着元素将像空的一样布局 如果元素没有在常规块布局中指定的高度 那么它将是0
此时可以使用contain-intrinsic-size来指定元素的自然大小 
确保未渲染子元素的div仍然占据空间 同时也保留延迟渲染的好处

>content-visibility
1.不会减小页面占用内存大小
这些元素是真实存在于DOM树中 并且可以通过JS访问到
2.不会影响脚本与图片的加载行为 
并且脚本再加载后能够正常执行
使用了content-visibility:auto的元素影响的只是子元素的渲染
对于内部静态资源的加载还是正常进行
3.屏幕外的内容在文档对象模型中仍然可用
可以在可访问树中访问 可以在页面上搜索并导航到该内容 而无需等待它加载或牺牲渲染性能

前端监控一般分为三大类
1.数据监控(监控用户行为)
2.性能监控(监控页面性能)
3.异常监控(监控产品，系统异常)
虽然大部分异常可以通过try catch的方式捕获
但是比如内存泄漏以及其他偶现的异常难以捕获
常见的需要监控的异常包括
 1.JS异常监控
 2.样式丢失异常监控

p标签自动换行
1.设置p标签的宽度
word-break:break-all;
word-wrap:break-word;

css word-break
该属性指定非CJK脚本的断行规则
CJK脚本是中国，日本和韩国(中日韩)脚本
normal:使用浏览器默认的换行规则
break-all:允许在单词内换行
keep-all:只能在半角空格或连字符处换行

css word-wrap
该属性允许长单词或URL地址换行到下一行

link标签
-HTML外部资源链接元素link 规定了当前文档与外部资源的关系 该元素最常用于链接样式表 此外也可以被用来创建站点图标
(比如PC端的favicon图标和移动设备上用以显示在主屏幕的图标)



>parseFloat函数
- parseFloat()函数解析字符串并返回浮点数
- 此函数确定指定字符串中的第一个字符是否为数字
如果是，它会解析字符串直到到达数字的末尾，
并将数字作为数字而不是字符串返回
- 如果第一个字符不能转换为数字，parseFloat()返回NaN

>outline:none 使轮廓线消失

> JS join()方法
- join()方法用于把数组中所有元素转换一个字符串
array.join(separator)
separator:可选 指定要使用的分隔符 如果省略该参数 则使用逗号作为分隔符
作用
 1.join('')将数组元素无缝拼接
 2.join(' ')将数组元素以空格分割
 3.join()将每个元素都转为字符串 用法等同于toString()
 4.join()将数组转换为页面元素的内容








react-app-env.d.ts
>作用
- 在使用create-react-app xxx --typescript生成一个react typescript项目时
在src目录下会生成一个react-app-env.d.ts类型声明文件
///<reference types="react-scripts" />
-三斜线指令是包含单个XML标签的单行注释 
注释的内容会做为编译器指令使用
-三斜线指令仅可放在包含它的文件的最顶端
一个三斜线指令的前面只能出现单行或多行注释，这包括其他的三斜线指令。
如果它们出现在一个语句或声明之后，它们会被当做普通的单行注释，并且不具有特殊的涵义
- 三斜线引用告诉编译器在编译过程中要引入的额外文件
- 三斜线指令中有两种types和path两种不同的属性
区别是，types用于声明对另一个库的依赖，path用于声明对另一个文件的依赖
- 上面react-app-env.d.ts依赖react-scripts库的类型声明文件
react-scripts下的package.json中types指定了TS的入口文件

.editorconfig文件
该自定义文件是用来定义编辑器的编码格式规范
编辑器的行为会与.editorconfig文件中定义的一直 并且其优先级比编辑器自身的设置要高
.editorconfig一般放在项目的根目录下

.gitattributes
- 一个文本文件 文件中的一行定义一个路径的若干个属性
主要用于定义每种文件的属性 以便git帮助统一管理

config-overrides.js
- 通过react create app创建新项目后 不像以前一样可以进行webpack的配置
- 如果需要在项目中配置一些webpack配置，需要在根目录下新建一个名称为config-overrides.js的文件







### 路由发展阶段
1.后端路由阶段
- 早期网站开发整个HTML页面是由服务器来渲染的 服务器直接生产渲染好对应的HTML页面 返回给客户端展示
- 一个页面有自己对应的网址URL
URL会发送到服务器，服务器会通过正则对该URL进行匹配，并且最后交给一个Controller进行处理
Controller进行各种处理 最终生成HTML或者数据 返回给前端 完成一个IO操作
>优点
- 当页面中需要请求不同的路径内容时，交给服务器来进行处理，服务器渲染好整个页面，并且将页面返回给客户端
- 这种情况下渲染好的页面，不需要单独加载任何的JS和CSS，可以直接交给浏览器展示，有利于SEO优化
>缺点
- 一种情况是整个页面的模块由后端人员来编写和维护
- 另一种情况是前端开发人员如果要开发页面，需要通过PHP和Java等语言来编写页面代码
通常情况下HTML代码和数据以及对应的逻辑会混在一起，编写和维护很糟糕
2.前后端分离阶段
>前端渲染
- 每次请求涉及到的静态资源都会从静态资源服务器获取
- 这些资源包括HTML+CSS+JS，然后在前端对这些请求回来的资源进行渲染
- 需要注意的是，客户端每一次请求，都会从静态资源服务器请求文件
- 同时可以看到，和之前的后端路由不同，这时后端只是负责提供API
>前后端分离阶段
-随着AJAX出现 有了前后端分离的开发模式
- 后端只提供API来返回数据，前端通过AJAX获取数据，并且可以通过JS将数据渲染到页面
- 这样做的最大的优点是前后端责任清晰，后端专注数据，前端专注交互和可视化上
- 且当移动端出现后，后端不需要进行任何处理，依然使用之前的一套API
- 目前很多网站依然采用这种模式开发(jQuery开发模式)
3.单页面应用(SPA single page application)阶段
- 整个Web应用实际上只有一个页面 当URL发生变化时 并不会从服务器请求新的静态资源
而是通过JS监听URL的改变，并且根据URL的不同去渲染新的页面
>前端路由 应用URL和渲染的页面
- 路由可以根据不同的URL,最终让我们的框架(如Vue React Angular)去渲染不同的组件
- 最终在页面上看到的实际就是渲染的一个个组件页面
### 前端路由原理
- 前端路由通过监听URL的改变做到URL和内容的映射
- URL发生变化 同时不引起页面刷新的有两个办法
	1.通过URL的hash改变URL
	2.通过H5的history模式修改URL
- 当监听到URL发生变化时，可以通过自己判断当前的URL决定到底渲染什么样的内容
>URL的hash
- URL的hash也就是锚点(#)本质是改变window.location的href属性
- 可以通过直接赋值location.hash来改变href 但是页面不发生刷新
- hash的优势是兼容性好，在老版的IE中都可以运行 缺点是有一个# 显得不像真实的路径
>H5的history
- history接口是H5新增的，它有六种模式改变URL而不刷新页面
1.replaceState:替换原来的路径
2.pushState:使用新的路径
3.popState:路径的回退
4.go:向前或向后改变路径
5.forward:向前改变路径
6.back:向后改变路径

###框架路由
- 目前前端流行的三大框架，都有自己的路由实现
1.Angular的ngRouter
2.React的react-router
3.Vue的vue-router
>React Router从版本4开始 路由不再集中在一个包中进行管理
- react-router是router的核心部分代码
- react-router-dom是用于浏览器的
- react-router-native是用于原生应用的
- v4的版本和v5的版本差异不大
- 安装react-router
- 安装react-router-dom会自动帮助安装react-router的依赖

>React Router基本使用
1.BrowserRouter HashRouter
- Router中包含了对路径改变的监听，并且会将对应的路径传递给子组件
- BrowserRouter使用history模式
- HashRouter使用hash模式
2.Link和NavLink
- 通常路径的跳转是使用Link组件，最终会被渲染成a元素
- to属性：Link中最重要的属性，用于设置跳转到的路径
- NavLink是在Link基础上增加了一些样式属性，可以设置我们选中元素的样式
- activeStyle:活跃(匹配)时的样式
- activeClassName:活跃时添加的class
- exact精准匹配
3.Route
- Route用于匹配路径
- path属性：用于设置匹配到的路径
- component属性：设置匹配到的路径后渲染的组件
- exact属性：精准匹配 只有精准匹配到完全一致的路径 才会渲染对应的组件
- 所有的Route都只是占位，只有在匹配到的时候才在所占的位置显示
4.Switch
- 默认情况下路由会将匹配到的所有组件都渲染出来
- Switch包裹的路由，只要匹配到了第一个，那么后面的就不会再继续匹配
5.Redirect
- Redirect用于路由的重定向，当这个组件出现时，就会执行跳转到对应的to路径中
6.路由的嵌套
- 在开发中，路由之间是存在嵌套关系的，设置子路由的path时需要带上父路由的path，即path要写全
7.手动路由跳转
- 路由中不止可以通过Link或NavLink进行跳转，也可以通过JS代码进行跳转，通过JS代码跳转的前提1是必须拿到history对象
- 获取history对象有两种方式
 1.如果该组件是通过路由直接跳转过来的，可以通过props直接获取history location match对象 这些属性是路由帮助传进来的
 2.如果该组件不是通过路由直接跳转过来的，就不能通过props获取history等对象，这就需要使用高阶组件withRouter对组件
进行包裹，同时还需要将高阶组件包裹在Router组件之中
8.参数传递
- 路由中传递参数有三种方式
 1.动态路由的方式
 - 动态路由的概念指的是路由中的路径并不会固定
 - 通常情况下，使用动态路由可以为路由传参
 - 动态路由只能传递简单的字符串
 2.search传递参数
 将在路径后面跟上一个?然后在?后面以key=value的形式拼接的字符串的传参方式称为search方式传参
 然后可以通过this.props.location.search取出传递的参数
 3.Link中to传入对象
 Link的to属性可以接收string object func三种类型的数据 当要通过Router传递对象时就可以给to赋值一个对象

>React-router-config库
- 这个库可以将所有的路由配置放到一个地方进行集中管理，而不是使用Route组件写的到处都是 



### React Suspense
- React16.6新增了<Suspense>组件，让可以等待目标代码加载
并且可以直接指定一个加载的界面(像是一个spinner)可以在用户等待时显示
const ProfilePage = React.lazy(()=>import('./xxx'))//懒加载
//在ProfilePage组件处于加载阶段时显示一个spinner
<Suspense fallback={<Spinner />}>
 <ProfilePage />
</Suspense>
- Suspense会为组件包装一层异常Promise 异常结束后重新渲染ProfilePage
在此期间显示fallback组件

>React6
- 相比于React-router5 React-router6由<Routes/>取代了<Switch/> Route组件的component属性替换为element属性
- 使用<Navigate/>替代Route5的<Redirect>

React5&React6
>路由状态和页面跳转
>v6版本的代码
1.v6版本中BrowserRouter和HashRouter还是在整个应用的最顶层，提供了history等核心的对象。
2.在新版的router中，已经没有匹配唯一路由的Switch组件，取而代之是Routes组件
但是不能把Routes作为Switch的代替品，因为在新框架中Routes充当了很重要的角色
v5中可以不用Switch直接用Route，但是在v6中使用Route，外层必须加上Routes组件，也就是Routes->Route的组合
>v6大致和v5的区别
1.新版本中的router没有Switch组件，取而代之的是Routes，但是在功能上Routes是核心的，
起到了不可或缺的作用，老版本的route可以独立使用，新版本的route必须配合Routes使用
2.新版本路由引入Outlet占位功能，可以更方便的配置路由结构，不需要像老版本路由一样，
子路由配置在具体的业务组件中，这样更清晰，灵活

### 动态路由 静态路由
- 在react-router v4之前 react-router使用静态路由
- 静态路由，所有的路由信息都配置在一张静态路由表上
- 动态路由不是作为配置文件存储在外部 而是视路由为一个普通的组件 这样更契合react的一切皆组件的设计

### React StrictMode严格模式
- 使用npx create-react-app my-app创建一个项目
- StrictMode是一个用来检查项目中潜在问题的工具 与Fragment一样,StrictMode不会渲染任何可见的UI
它为其后代元素触发额外的检查和警告
- 严格模式检查仅在开发模式下运行 不会影响生产构建

### React Router 6
>React-router以三个不同的包发布到npm上，分别为
1.react-router 路由的核心库 提供了很多的：组件，钩子
2.react-router-dom 包含react-router所有内容，并添加一些专门用于DOM的组件，如<BrowserRouter>等
3.react-router-native 包含react-router所有内容，并添加一些专门用于ReactNative的API，如<NativeRouter>等

>与React router 5.x版本相比的改变
1.内置组件的变化：移除<Switch/>，新增<Routes>等
2.语法的变化：component={About}变为element={<About/>}等
3.新增多个hook：useParams,useNavigate,useMatch等

><Routes/>与<Route/>
1.v6版本中移出了先前的<Switch>，引入新的替代者<Routes>
2.<Routes>和<Route>要配合使用，且必须要用<Routes>包裹<Route>
3.<Route>相当于一个if语句，如果其路径与当前URL匹配，则呈现其对应的组件
4.<Route caseSensitive>属性用于指定：匹配时是否区分大小写(默认为false)
5.当URL发生变化时，<Routes>都会查看其所有子<Route>元素以找到最佳匹配并呈现组件
6.<Route>也可以嵌套使用，且可配合useRoutes()配置路由表，但需要通过<Outlet>组件来渲染其子路由
7.path属性用于定义路径，element属性用于定义当前路径所对应的组件
- Route也可以不写element属性，这时就是用于展示嵌套的路由，所对应的路径是/users/xxx

> <Link>
1.作用：修改URL且不发送网络请求(路由链接)
2.注意：外侧需要用<BrowserRouter>或<HashRouter>包裹

><NavLink>
1.作用：与<Link>组件类似，且可实现导航的高亮效果

><Navigate>
1.作用：只要<Navigate>组件被渲染，就会修改路径，切换视图
2.replace属性用于控制跳转模式(push或replace 默认是push)

><Outlet>
1.当<Route>产生嵌套时，渲染器对应的后续子路由

>Hooks
1.useRoutes()
- 根据路由表，动态创建<Routes>和<Route>
2.useNavigate()
- 返回一个函数用来实现编程式导航
3.useParams
- 返回当前匹配路由的params参数 类似于5.x中的match.params
4.useSearchParams
- 用于读取和修改当前位置的URL中的查询字符串
- 返回一个包含两个值的数组，内容分别为：当前的search参数，更新search的函数
5.useLocation
- 获取当前location信息，对标5.x中路由组件的location属性
6.useMatch
- 返回当前匹配信息，对标5.x中的路由组件的match属性
7.useInRouterContext
- 如果组件在<Router>的上下文呈现，则useInRouterContext钩子返回true，否则返回false
8.useNavigationType
- 返回当前的导航类型(用户是如何来到当前页面的)
9.useOutlet
- 呈现当前组件中渲染的嵌套路由
10.useResolvedPath
- 给定一个URL值 解析其中的path search hash值

> <Outlet>
- An <Outlet> should be used in parent route elements to render their child route elements.
This allows nested UI to show up when child routes are rendered.
If the parent route matched exactly.It will render a child index route or noting if there is no index route.

### window.location.hash
- window.location.hash这个属性可读可写
- 读取时可以用来判断网页状态是否改变
写入时，则会在不重载页面的前提下，创造一条访问历史记录

location是js里管理地址栏的内置对象
比如location.href就管理页面的url 用location.href = url就可以直接将页面重定向url

项目路由没有用Link实现 使用了给window.location.hash属性直接赋值的方式实现
配合组件切换显示

>Outlet
- 嵌套路由可以保证子路由共享父路由的界面而不会覆盖
为此React提供了Outlet组件 
将其用于父组件中可以为子路由的元素展位 并最终渲染子路由的元素

><Outlet/>
- 自适应渲染组件
- 根据实际路由url自动选择组件


>RouterProvider
- 所有的路由对象都传递给这个组件，以渲染应用程序并启用其余的API

>fallbackElement
- 如果没有在服务器上渲染应用程序DataBrowserRouter将在挂载时启动所有匹配的路由加载器
- 在此期间可以提供一个fallbackElement给客户提示




视差滚动
- 让多层背景以不同的速度移动，形成立体的运动效果，带来非常出色的视觉体验
GSAP(GreenSock)最健全的web动画库之一
- GreenSock动画平台(GSAP)可以对JS可以操作的所有内容进行动画处理(CSS属性 SVG React 画布 通用对象等)
同时解决了不同浏览器上存在的兼容性问题，而且速度极快(比jQuery快20倍)
- 动画其实是每秒多次改变元素属性值，元素看起来就仿佛在动一样，如淡入淡出，旋转，移动等
而GSAP捕捉一个起始值和一个结束值，然后每秒在它们之间插值60次
- 从技术上讲,GSAP应该被称为GreenSock属性操纵器

pointer-events
- pointer-events属性是一个指针属性 是用于控制在什么条件下特定的图形元素可以称为指针事件的目标
- pointer-events属性有很多值 但是对于浏览器来说 适用于HTML元素的只有三个值 其他几个值都是针对SVG元素的
属性值介绍
pointer-events属性值
auto|none|inherit	HTML
1.none 该元素永远不会成为鼠标事件的target 但是 当其后代元素的pointer-events属性指定其他值时，
鼠标事件可以指向后代元素，这种情况下，鼠标时间将在捕获或冒泡阶段触发父元素的时间侦听器

input autoFocus
- autoFocus属性规定当页面加载时 <input>元素应自动获得焦点

Number.isFinite()
- 该函数用于检查其参数是否是无穷大，也可以理解为是否为一个有限数值
- 如果参数是NaN 正无穷大或者负无穷大 会返回false 其他返回true



### eslint prettier
- 都是用来做代码格式化的，分为npm包和vscode插件
- 顺序 先有npm包 后有vscode插件

### css hsla()函数
- hsla函数使用色相，饱和度，亮度，透明度来定义颜色
- 色相 Hue 定义色相(0到360) 0/360为红色 120为绿色 240为蓝色
- 饱和度 Saturation 定义饱和度 0%为灰色 100%全色
- 亮度 Lightness  亮度0%为暗 50%为普通 100%为白
- 透明度 Alpha 取值0-1之间，代表透明度 0(完全透明)-1(完全不透明)

### Element.getBoundingClientRect()
- The Element.getBoundingClientRect() method returns a DOMRect object providing information about
the size of an element and its position relative to the viewport

### css clip rect
- css clip是一个极少使用，但确实存在的属性，且在CSS2时代就有了
- clip属性剪裁绝对定位元素 也就是说 只有position:absolute时才生效
img{
 position:absolute;
 clip:rect(A,B,C,D)
}
感觉 A B C D就是 上 右 下 左
A：剪裁矩形距离父元素顶部的长度
B：剪裁矩形距离父元素左边的长度+矩形宽度
C：剪裁矩形距离父元素顶部的长度+矩形高度
D：剪裁矩形距离父元素左边的高度

### CSS white-space属性
- 该属性设置如何处理元素内的空白
normal：默认 空白会被浏览器忽略
pre：空白会被浏览器保留 其行为方式类似HTML中的<pre>标签
nowrap：文本不会换行，文本会在同一行上继续，直到遇到<br>标签为止
pre-wrap：保留空白符序列，但是正常的进行换行
pre-line：合并空白符序列，但是保留换行符
inherit：规定应该从父元素继承white-space属性的值

### CSS gap属性
- 设置网格行与列之间的间隙
- 该属性是row-gap column-gap的简写形式
- CSS网格布局起初是用grid-gap属性来定义的，目前逐渐被gap替代

### CSS list-style属性

### CSS content属性
- content属性与:before及:after伪元素配合使用 来插入内容






###虚拟列表
- 按需显示的一种实现，即只对可见区域进行渲染，对非可见区域中的数据不渲染或部分渲染的技术，从而达到较高的渲染性能


文件流数据处理


前端文件上传

前端文件下载

### 下载文件的方式
1.a标签配置download属性(适用于下载一些静态资源)
 <a href="test.zip" download="test.zip">download</a>
 download用来命名下载文件，以及防止txt,jpg,pdf等浏览器支持直接打开的文件不能下载
 (需要注意的是，href地址不能写完整的域名，否则只能预览也不能下载
 另外，下载的地址域名和访问网站的域名必须是同源的，否则download设置无效)
2.window.location.href(适用于下载一些静态资源)/window.open
 - 这种方式比较常见，在一些网站上下载电子书，安装包之类的，一般都是使用这种方式或a标签方式下载
3.a标签+Blob方式
 - 使用a标签加blob的方式，这种方式适用于下载响应比较耗时的情况。
 - 它会提前将文件下载完成后，再由前端进行下载
4.使用form表单提交

### Blob
- Blob对象表示一个不可变，原始数据的类文件对象
- 它的数据可以按文本或二进制的格式进行读取，也可以转换成ReadableStream来用于数据操作
- Blob表示的不一定是JS原生格式的数据，File接口基于Blob，继承了blob的功能并将其扩展以支持用户系统上的文件

### FileReader
- FileReader是一种异步读取文件机制
- FileReader提供了如下方法
1.readAsArrayBuffer(file)：按字节读取文件内容，结果用ArrayBuffer对象表示
- 该方法读取文件后，会在内存中创建一个ArrayBuffer对象(二进制缓存区)
将二进制数据存放在其中，通过此方式，可以直接在网络中传输二进制内容
-----------------------------------------------------------------
2.readAsBinaryString(file): 按字节读取文件内容，结果为文件的二进制串
- 该方法会读取指定的Blob或File对象，当读取完成时，readyState状态会变成DONE(已完成)
并触发loadend事件，同时result属性将包含所读取文件原始二进制格式
------------------------------------------------------------------
3.readAsDataURL(file): 读取文件内容，结果用data:url的字符串形式表示
- 读取指定的Blob或File对象，并生成data URL(base64编码)
--------------------------
4.readAsText(file,encoding)：按字符读取文件内容，结果用字符串形式表示
- 该方法可以用来读取文本文件，这个文件有两个参数
第一个参数用来读取File对象或Blob对象
第二个参数是用来指定文件的编码，这是个可选参数，默认值为国际通用的UTF-8编码格式
5.abort():终止文件读取操作
- abort方法可以终止任何操作，在读取大文件时，这个方法可以使用
reader.abort()

>FileReader事件
1.onloadstart:读取文件开始时触发
2.onprogress:读取过程中触发，会返还本次读取文件的最大字节数和已经读取完毕的字节数，可以用来做进度条
3.onabort:在读取中断时触发
4.onerror:在读取文件失败时触发
5.onload:在读取完成时触发
6.onloadend：读取结束后触发，不论成功还是失败都会触发，触发时机在onload之后’

因为fileReader的操作都是异步的 所以对有些需要同步获取数据的不能实现


###文件流
- 使用post请求，调用后端导出文件的接口，返回内容是文件流
- 这种接口不能以常规的方式去处理，因为返回的不是application/json，而是application/force-download		


### 宝塔面板
一款服务器管理软件 支持windows和linux系统 可以通过Web端管理服务器 提升运维效率

### dumi 一款为组件开发场景而生的静态站点框架 与father一起为开发者提供一站式的组件开发体验
father负责组件源码构建 而dumi负责组建开发及组件文档生成

### father 一款NPM包研发工具 能够帮助开发者更高效 高质量的研发NPM包 生成构建产物 再完成发布

### VuePress
VuePress由两部分组成
1.一个极简静态网站生成器 包含由Vue驱动的主题系统与插件API
2.为书写技术文档而优化的默认主题






outline:none
表示使outline属性无效 使绘制于元素周围的一条线无效



CSS Modules
- 不是将CSS改造成编程语言 而是只加入了局部作用域和模块依赖
- 规则少 有用 可以保证某个组件的样式 不会影响到其他组件
- CSS Modules提供各种插件 支持不同的构建工具
>全局作用域
- CSS Modules允许使用:global(.className)的语法 声明一个全局规则
凡是这样声明的class 都不会被编译成哈希字符串
>显式的局部作用域语法
- :local(.className) 等同于.className
>定制哈希类名
- css-loader默认的哈希算法是[hash:base64] 这回将.title编译成 字符串
- webpack.config.js里面可以定制哈希字符串的格式
>输入其他模块
- 选择器可以继承其他CSS文件里面的规则
.title{
	composes:className from './another.css'
	color:red
}
>输入变量
- CSS Modules支持使用变量 不过需要安装PostCSS和postcss-modules-values


animation
>基本使用
1.定义动画
- keyframes定义动画(类似定义类选择器)
2.元素使用动画
>动画序列
1.0%是动画的开始 100%是动画的完成 这样的规则是动画序列
1.可以做多个状态的变化 keyframe关键帧
2.里面的百分比是整数 是总的时间的划分
3.关键字from和to等同于0%和100%  
0%的内容可以不写 也可以直接不写0%

transition
>产生动画条件
- transition设置的property发生变化 这种动画的特点是需要一个驱动力去触发
>
1.需要事件触发 没法在网页加载时自动发生
2.一次性的 不能重复发生 除非一再触发
3.只能定义开始结束状态 不能定义中间状态 
4.一条transition规则只能定义一个属性的变化 不能涉及多个属性

transform
1.rotate旋转
2.skew扭曲
3.scale缩放
4.translate移动


transform-origin
- 没有设置过transform-origin属性时 CSS变形进行的旋转 移位 缩放等操作都是以元素自己中心(变形原点/中心点)位置进行变形的
- transform-origin属性用于设置旋转元素的基点位置 
- 语法
```
transform-origin:x-axis y-axis z-axis
```
- 默认值
```
transform-origin:50% 50% 0
```
- 单位
- 属性值可以是百分比 em px top right bottom left center
>animation-timing-function 动画速度曲线
>animation-fill-mode 动画填充模式 动画播放完给出的状态
### animation-delay属性
- 定义动画什么时候开始
- 单位可以是秒s 或毫秒ms

JS实现动画
- setInterval setTimeout常被用于创建JS动画
1.动的元素是定位来设置 如绝对定位
2.元素移动时 通过改变定位的top/left值操作

CSS文件引入方式有两种
1.HTML中使用link标签
<link rel="stylesheet" href="style.css" />
2.CSS中@import
@import "style.css"
>语法
1.@import "style.css"
2.@import url("style.css")
- import规则一定要先于除了@charset的其他任何CSS规则
>媒体查询
- @import和link一样 同样可以定义媒体查询
- 不论是link还是import方式 会下载所有css文件 然后根据媒体去应用css样式 而不是根据媒体去选择性下载css文件
>使用@import影响页面性能
1.影响浏览器的并行下载
2.多个@import导致下载顺序紊乱

CSS In JS
- 将应用的CSS样式写在JS文件里面 而不是独立为一些.css .scss 或less之类的文件
- 这样就可以在CSS中使用一些属于JS的 诸如模块声明 变量定义 函数调用 和条件判断等语言特性来提供灵活的可扩展的样式定义

- 使用这个技术写的库有很多 react中火的是styled-components
Vue中css scope也是这个思想 
- 每个组件都有它的scoped 样式进行绑定 css modules也是同样的

>styled-components
>优点
1.没有类名错误 styled-components为样式生成唯一的类名 永远不必担心重复 重叠或拼写错误
2.更容易删除
3.简单的动态样式
4.轻松维护

classnames库
1.react原生动态添加多个className会报错

React引入样式的五种方式
1.引入外联样式
优点：方便 简洁
缺点：样式一经加载将全局生效 类名相同时样式之间会互相影响
解决方式：一般使用组件名作为最外层的类名 这样能防止类名全局污染
2.内联样式
缺点：性能上不太好 组件每次渲染都会创建新的对象
3.声明内联样式
4.CSS Modules模块化
这种方案是webpack的方案 需要配置webpack配置文件中的modules:true
如果使用create-react-app来开发项目 那么默认是支持的
test.module.less
引入模块化样式的类名不会全局污染 所以可以根据当前引入的组件定义合适的类名即可使用
ModuleCss.js
这里的引入方式和模块化样式文件命名为.module.less /.module.scss /.module.css结尾
css样式仅在当前引入的组件生效
优点：
将css文件作为一个模块引入 这个模块中的所有css 只作用于当前组件
不会影响当前组件的后代组件 样式之间不会有冲突
缺点：
所有的className都必须使用{style.className}的形式来编写
不方便动态来修改某些样式 依然需要使用内联样式的方式
5.CSS-in-JS模式(styled-component)
- css-in-js是指一种模式 其中css由JS生成而不是在外部文件中定义
- 此功能不是React的一部分 而是由第三方库提供如
 styled-components
 emotion
 glamorous
本质上是通过函数的调用 最终创建出一个组件 所以变量名首字母要大写


三种浏览器的私有属性
1.-moz代表firefox浏览器私有属性
2.-ms代表ie浏览器私有属性(360浏览器是IE内核)
3.-webkit代表safari，chrome私有属性
4.-o代表opera私有属性

CSS中的选择器
1.兄弟选择器~ 又称匹配选择器
查找某一个指定元素的后面的所有兄弟结点
+选择器表示某元素后相邻的兄弟元素 也就是紧挨着的 是单个的(特殊情况:循环多个)
~选择器表示某元素后所有同级的指定元素，强调所有的
2.相邻兄弟选择器+
- 选择紧跟在另一个元素后的元素且两者有相同的父元素
3.子选择器>
只能选择作为某元素儿子元素的元素(直接子元素)，不包括孙元素，曾孙元素
- 是CSS3特有的选择器
- A>B 表示选择A元素的所有子B元素
- 与 A B的区别在于，A B选择所有后代元素，而A>B只选择一代
4.:first-child
用于选取属于其父元素的首个子元素的指定选择器
5.:nth-child(n)
该选择器选择父元素的第N个子元素，与类型无关
6.:nth-of-type(n)
选择器匹配属于父元素的特定类型的第N个子元素的每个元素，与元素类型有关
7.属性选择器
可以为拥有指定属性的HTML元素设置样式，而不仅限于class和id属性

伪类&伪元素
- 核心区别在于，是否创造了新的元素
1.伪类表示被选择元素的某种状态 例如:hover
- 以冒号:开头 用于选择处于特定状态的元素
- 用于向某些已经存在的选择器添加特殊效果(当状态改变时)
- 伪类的本质还是类(class) 作用于标签本身 只不过限定了状态条件
2.伪元素表示的是被选择元素的某个部分，这个部分看起来像一个独立的元素，但是是假元素
只存在于css中，所以叫伪的元素，例如:before和:after
- 以双冒号::开头 用于在文档中插入虚构的元素
- 用于将特殊效果添加到不存在的虚拟元素中(浏览器自动创建)
- 伪元素的本质是元素(element) 作用于该虚拟元素的内容本身
- 伪元素最常用的技巧就是利用::before和::after伪元素给某个元素添加前缀或后缀
注意：创建::before和::after的元素时 必须要设置content属性 否则就不存在了
另外宿主元素的position要设置成relative或absolute 否则布局可能会乱掉
伪元素：pseudo element
1.css3之前
	1、:before/::before表示元素内容区域的前面
	2、:after/::after后面
	3、:first-letter/::first-letter 第一个字
	4、:first-line/::first-line 第一行		
2.css3之后
	1、::section选中的部分
	2、::placeholder占位而文本
伪类：pseudo class
	1.状态类伪类
	 1、:link 正常的链接，未点击时
	 2、:visited 点击后
	 3、hover 悬浮时
	 4、active 被激活时
	 5、focus 聚焦时
	2.结构类伪类
	 1、not(s) 不是s
	 2、first-child 第一个
	 3、last-child 最后一个
	 4、only-child 只有一个
	 5、nth-child(n) 第n个
	 6、nth-last-child(n) 倒数第n个
	 7、first-of-type 特定类型第一个
	 8、last-of-type 特定类型的最后一个
	 9、only-of-type 特定类型仅一个
	 10、nth-of-type(n) 特定类型第n个
	 11、nth-last-of-type(n) 特定类型倒数第n个
	 12、target 当前活动的目标
	3.表单相关伪类
	 1、checked 选中
	 2、disabled 禁用
	 3、enabled 启用
	 4、empty 空
	 5、required 必填
	 6、read-only 只读
	 7、valid 验证成功
	 8、invalid 验证失败
	 9、optional非必填
	 10、default 默认的
	 11、in-range 在范围内的
	 12、out-of-range 超过范围的
	 13、indeterminate 不确定状态的
	4.其他伪类
	 1、root 根元素
	 2、fullscreen 全屏显示的
	 3、dir 匹配特定文字方向的元素
	 5、lang 匹配特定语言


1.装饰器
ES2016提出来的一个提案
是一种与类相关的语法糖 用来包装或者修改类或者类的方法的行为
装饰器其实就是设计模式中装饰器模式的一种实现方式
2.装饰器分类
- 按照装饰器被装饰的特性来分 一共可以分为以下五种类
 1.类装饰器
 2.方法装饰器
 3.属性装饰器
 4.参数装饰器
 5.访问符装饰器

装饰器
函数，提供了某种特定的功能，用于描述类，方法，属性，参数，为其添加更加强大的功能
同时与原有逻辑进行解耦 算是AOP编程的一种实现


AOP Aspect Oriented Programming 面向切面编程
通过预编译方式和运行期间动态代理实现程序功能的统一维护的一种技术
AOP是OOP的延续

### dumi 一款为组件开发场景而生的静态站点框架 与father一起为开发者提供一站式的组件开发体验
father负责组件源码构建 而dumi负责组建开发及组件文档生成

### father 一款NPM包研发工具 能够帮助开发者更高效 高质量的研发NPM包 生成构建产物 再完成发布








REPL Read-Eval-Print Loop
- 读取-求值-输出-循环
- 一个简单的交互式的编程环境


ES6
- Node.js是JS的服务器运行环境(runtime)
- 它对ES6的支持度更高 除了哪些默认打开的功能 还有一些语法功能已经实现了 但是默认没有打开
- 使用下面命令 可以查看Node.js默认没有打开的ES6实验语法
```
//Linux&Mac
node --v8-options | grep harmony
//Windows
node --v8-options|findstr harmony
```
Babel
- polyfill
- Babel默认只转换新的JS句法(syntax) 而不转换新的API
- 比如Iterator Generator Set Map Proxy Reflect Symbol Promise等全局对象
- 以及一些定义在全局对象上的方法(比如Object.assign)都不会转码
>let
- JS引擎内部会记住上一轮循环的值 初始化本轮的变量i时 就在上一轮循环的基础上进行计算
- for循环 设置循环变量的那部分是一个父作用域 循环体内部是一个单独的子作用域
 -暂时性死区temporal dead zone TDZ
- ES6明确规定 如果区块中存在let和const命令 
 >定义
- 这个区块对这些命令声明的变量 从一开始就形成了封闭作用域
- 凡是在声明之前就使用这些变量 就会报错 在代码块内 使用let命令声明变量之前 该变量都是不可用的 语法上 称为暂时性死区
 >本质
- 一进入当前作用域 所要使用的变量就已经存在了 但是不可获取 只有等到生命变量的那一行代码出现 才可以获取和使用该变量
 -块级作用
- ES6允许块级作用域的任意嵌套
- 内层作用域可以定义外层作用域的同名变量
- 块级作用域 使得获得广泛应用的匿名立即执行函数表达式(匿名IIFE)不再必要
 -块级作用域与函数声明
- ES6的块级作用域必须有大括号 如果没有大括号 JS引擎就认为不存在块级作用域
 -const
- 如果真的想将对象冻结 应该使用Object.freeze方法
- 将对象本身冻结 对象的属性也应该冻结
>ES6声明变量的六种方法
- ES5只有两种声明变量的方法 var命令和function命令
- ES6除了添加let和const命令 还有import和class命令
- ES6一共有6中声明变量的方法
> 顶层对象的属性
- 顶层对象 浏览器环境中指的是window对象 Node指的是global对象
- ES5中 顶层对象的属性和全局变量是等价的
- 顶层对象的属性和全局变量挂钩 被认为是JS语言最大的设计败笔之一
 >带来的问题
1.无法在编译时报出变量未声明的错误 只有运行时才知道
(因为全局变量可能是顶层对象的属性创造的 而属性的创造是动态的)
 >ES6做出的改动
1.var命令和function命令声明的全局变量 仍旧是顶层对象的属性
2.let命令 const命令 class命令声明的全局变量 不属于顶层对象的属性
- 从ES6开始 全局变量将逐步与顶层对象的属性脱钩
>globalThis对象
- JS语言存在一个顶层对象 它提供全局环境(即全局作用域) 所有代码都是在这个环境中运行的 但是 顶层对象在各种实现中是不统一的
1.浏览器中 顶层对象是window 但Node和Web Worker没有window
2.浏览器和Web Worker里 self也指向顶层对象 但是Node没有self
3.Node中 顶层对象是global 其他环境都不支持
- 同一段代码为了能够在各种环境 都能取到顶层对象 现在一般用this关键字 但有局限性
1.全局环境中 this会返回顶层对象 但是Node.js模块中this返回的是当前魔偶快 ES6模块中this返回的是undefined
2.函数里面的this 如果函数不是作为对象的方式运行 而是单纯作为函数运行 this会指向顶层对象 严格模式下 this返回undefined
3.不管是严格模式 还是普通模式 new Function('return this')()总是会返回全局对象 但是 如果浏览器用了CSP(Content Security Policy内容安全策略)
- eval new Function这些方法都可能无法使用
- ES2020在语言标准的层面 引入globalThis作为顶层对象 任何环境下 globalThis都是存在的 都可以从它拿到顶层对象 指向全局环境下的this







jQuery中的val方法
- 主要用来处理表单元素的值 比如input select和textarea


jQuery closest方法
- jquery中 closest方法用于返回被选元素的第一个祖先元素 

jQuery.isEmptyObject()方法
- $.isEmptyObject()函数用于检查对象是否为空(不包含任何属性)
jQuery插件中常见的结构
1.立即执行函数:(function(){})()
- 这是一个自调函数 函数定义好之后自动执行
- (function(){})表示一个匿名函数 而后紧跟着的()表示立即调用此函数 且()也是向函数传递参数的地方
- 使用此函数的好处是 不会产生任何全局变量
- 缺点是无法重复执行
- 对于插件来说 非常合适 不会产生任何全局变量 同时一次引用
2.传递参数(jQuery,window,document)
- $ 实参 $是jQuery的缩写 很多方法和类库也都使用$ 这里表示接受jQuery对象 避免冲突
- window,document实参 分别接受window document对象
- window document对象都是全局环境下的
- 而在函数体内的window document对象是局部的
- 这样做可以提高性能 减少作用域链的查询时间
- 如果函数体内需要多次调用window或document对象
- 这样把window或document对象当作参数传进去 很有必要
- 如果插件用不到这两个对象 不用传递这两个参数
3.undefined形参
- undefined在老一辈的浏览器是不被支持的 直接使用会报错 js框架要考虑到兼容性问题 所以增加一个形参undefined
4.;分号作用
- 防止多个文件压缩合并以为其他文件最后一行语句没加分号 而引起合并后的语法错误
5.$.fn用法
- $.fn是指jQuery的命名空间 加上fn的方法及属性 会对jQuery实例有效
- 如扩展$.fn.abc()即$.fn.abc()是对jQuery扩展了一个abc()方法
- 在每一个jquery实例都可以引用这个方法
- 如$("#div").abc()
6. jQuery为开发者开发插件提供了两个方法
   1.jquery.extend(object);为扩展jquery类本身 为类添加新方法
   2.jquery.fn.extend(object);给jquery对象添加方法
- jquery.fn = jquery.prototype
- jquery本身就是一个封装的很好的类 比如使用语句$("div")会生成一个jquery类的实例
- jquery.extend(object)为jquery类添加类方法 可以理解为添加静态方法

1.prop方法
- prop()方法设置或返回被选元素的属性和值
- 当该方法用于返回属性值时 则返回第一个匹配元素的值
- 当该方法用于设置属性值时 则为匹配元素集合设置一个或多个属性/值对
2.prop和attr区别
- prop()函数的结果
1.如果有相应的属性 返回指定属性值
2.如果没有相应的属性 返回值是空字符串
-attr()函数的结果
1.如果有相应的属性 返回执行属性值
2.如果没有相应的属性 返回值是undefined
>使用场景
1.对于HTML元素本身就带有的固定属性 在处理时 使用prop方法
2.对于HTML元素自己定义的DOM属性 在处理时 使用attr方法
3.具有true 和false两个属性的属性 如checked selected 或disabled使用prop()
>checked
1.使用prop('checked') 返回值为true 表示复选框此时处于选中状态 false没有选中
2.使用attr('checked') 返回值为 checked 表示复选框此时处于选中状态 
- undefined只能表明该复选框没有设置checked属性 并不能代表当前复选款所处的状态
>jQuery.data()方法
- data()方法向被选元素附加数据 或者从被选元素获取数据
>jQuery closest()方法
- 返回被选元素的第一个祖先元素

### jQuery中的$()
-$是Jquery类的一个别称 $()构造了一个jquery对象 所以$()可以叫做jQuery的构造函数
1.$(expression) 即css选择器 Xpath或html元素 
2.$(element) 一个特定的DOM元素 

### jQuery中$符号的作用
1.作为jQuery包装器 利用选择器选择DOM元素
2.实用工具函数 作为几个通用的实用工具函数的命名空间的前缀
3.文档就绪处理程序 相当于$(document).ready()
- $(function(){})里面的函数会在DOM树加载完之后执行
4.创建DOM元素
5.扩展jQuery
6.使用jQuery和其他库

### IIFE
- (function(){statements})()
- 一个被称为自执行匿名函数的设计模式 主要包含两部分
1.第一部分 包裹在圆括号运算符()里的一个匿名函数 这个匿名函数拥有独立的此法作用域
- 避免外界访问此IIFE中的变量 且不会污染全局作用域
2.第二部分 再次使用()创建了一个立即执行函数作用域 JS引擎到此将直接执行函数

### window.onload document.onload
1.window.onload 页面上所有的DOM 样式表 脚本 图片 flash都已经加载完成
2.document.onload DOM加载完成 不包括样式表 图片 flash

### _编码风格
变量名以_开头 代表是一些内部变量 不想暴露给外界

### jquery使用$符号作为关键符号
- $符号是jq的关键符号 可以用来获取dom信息 内部传入一些选择器




JS函数的几种写法
1.函数声明
- 会有函数声明提升 可以把函数声明放在调用它的语句后面
function foo(){}
foo()
2.函数表达式
- 函数表达式没有函数提升
- function后面没有跟函数名 称为匿名函数或拉姆达函数
var foo = function(){}
foo()
3.箭头函数
const fn1 = ()=>{}

箭头函数
- 如果箭头函数的代码块部分多于一条语句 就要使用大括号将它们括起来 并使用return语句返回
var sum = (num1,num2)=>{return num1+num2}
- 由于大括号被解释为代码块 所以如果箭头函数直接返回一个对象 必须在对象外面加上括号 否则会报错
let getTempItem = id =>({id:id,name:'Temp'})
- 箭头函数的一个用处是简化回调函数
- 箭头函数实际上可以让this指向固定化 绑定this使得它不再可变 这种特性有利于封装回调函数




### 应用程序
- Koa应用程序是一个包含一组中间件函数的对象 是按照类似堆栈的方式组织和执行的
### 设置
- 应用程序设置是app实例上的属性 目前支持
1.app.env默认是NODE_ENV或development
2.app.keys签名的cookie密钥数组
3.app.proxy当真正的代理头字段将被信任时
### app.listen
- Koa应用程序不是HTTP服务器的1对1展现 可以将一个或多个Koa应用程序安装在一起以形成具有单个HTTP服务器的更大应用程序
- 创建并返回HTTP服务器 将给定的参数传递给Server#listen()
- 可以将同一个应用程序同时作为HTTP和HTTPS或多个地址
### app.callback
- 返回适用于http.createServer()方法的回调函数来处理请求
- 可以使用此回调函数将Koa应用程序挂载到Connect/Express应用程序中
### app.use(function)
- 将给定的中间件方法添加到此应用程序 app.use()返回this 因此可以链式调用
### app.keys=
- 设置签名的Cookie密钥
### app.context
- app.context是从其创建ctx的原型 可以通过编辑app.context为ctx添加其他属性
- 这对于将ctx添加到整个应用程序中使用的属性或方法非常有用
- 不需要中间件 和/更简单(更少的require)
- ctx上的许多属性都是使用getter setter和Object.defineProperty()定义的
- 只能通过在app.context上使用Object.defineProperty()来编辑这些属性
- 安装的应用程序目前使用其父级的ctx和设置 因此安装的应用程序只是一组中间件
### 错误处理
- 默认情况下 将所有错误输出到stderr 除非app.silent为true
- 当err status是404或err.expose是true时 默认错误处理程序也不会输出错误
- 要执行自定义错误处理逻辑 如集中式日志记录 可以添加一个error事件侦听器
### 上下文Context
- Koa Context将node的request和response对象封装到单个对象中 为编写Web应用程序和API提供了许多有用的方法
- 这些操作在HTTP服务器开发中频繁使用 它们被添加到此级别而不是更高级别的框架 这将强制中间件重新实现此通用功能
- 每个请求都将创建一个Context 并在中间件中作为接收器引用 或者ctx标识符
- 为方便起见 许多上下文的访问器和方法直接委托给它们的ctx.request或ctx.response
### API
- Context具体方法和访问器
### ctx.req
- Node的request对象
### ctx.res
- Node的response对象
- 绕过Koa的response处理是不被支持的
### ctx.request
- Koa的Request对象
### ctx.response
- Koa的Resposne对象
### ctx.state
- 推荐的命名空间 用于通过中间件传递信息和前端视图
### ctx.app
- 应用程序实例引用
### ctx.cookies.get(name,[options])
### ctx.respond
### 请求
Koa Request对象是在node的原生请求对象之上的抽象 提供了许多对HTTP服务器开发有用的功能



运行Lighthouse的两种方式
1.作为Chrome扩展程序运行
2.作为命令行工具运行
Metrics指标
1.First Contentful Paint(FCP)
该指标衡量从页面开始加载到页面内容的任何部分呈现在屏幕上的时间
对于该指标 内容指的是文本 图像(包括背景图像) 元素或非白色元素
LCP的目的是衡量页面的主要内容 何时完成加载
在JS中测量FCP 可以使用Paint Timing API
2.Speed Index
速度指数衡量的是内容在页面加载过程中的视觉显示速度
Lighthouse首先会在浏览器中捕获一段页面加载的视频 并计算出各帧之间的视觉进度
然后 Lighthouse使用Speedline Node.js模块来生成速度指数得分
3.Largest Contentful Paint(LCP)
最大内容画(LCP)指标报告了在视口中可见的最大图像或文本块的渲染时间 相对于页面首次开始加载的时间
4.Cumulative Layout Shift(CLS)
一种视觉稳定性的测量方式 量化了页面内容在视觉上的移动程度 它量化了一个页面的内容在视觉上移动的程度
CLS测量的是整个页面生命周期内发生的每一次意外布局转变的所有单个布局转变得分的总和
布局偏移发生在可见元素从一个渲染帧到下一个渲染帧改变其位置的任何时候
5.Total Blocking Time(TBT)
总阻塞时间(Total Blocking Time,TBT)量化了负载相应能力 
测量了主线程被阻塞的时间长到足以阻止输入响应的总时间
TBT衡量的是第一次有内容的绘画(FCP)和交互时间(TTI)之间的总时间
它是TTI的配套指标 它为量化主线程活动带来了更多的细微差别 这些活动阻碍了用户与你的页面进行交互的能力
TBT与核心网络生命力的现场指标First Input Delay(FID)有很好的相关性


## Next基本特性
###页面(Pages)
- 在Next.js中，一个page(页面)就是一个从`.js`、`jsx`、`.ts`、`.tsx`文件导出(export)的React组件
这些文件存放在`pages`目录下。每个page(页面)都使用其文件名作为路由(route)
>具有动态路由的页面
- Next.js支持具有动态路由的pages(页面)
>预渲染
- 默认情况下,Next.js将预渲染每个page(页面)。这意味着Next.js会预先为每个页面生成HTML文件，
而不是由客户端JS完成，预渲染可以带来更好的性能和SEO效果
- 每个生成的HTML文件都与该页面所需的最少JS代码相关联。当浏览器加载一个page(页面)时，
其JS代码将运行并使页面完全具有交互性。(此过程称为水合(hydration))
>两种形式的预渲染
- Next.js具有两种形式的预渲染：静态生成(Static Generation)和服务器端渲染(Server-side Rendering)
这两种方式的不同之处在于为page(页面)生成HTML页面的时机
 1.静态生成:HTML在构建时生成，并在每次页面请求时重用
 2.服务器端渲染：在每次页面请求(request)时重新生成HTML
>静态生成
- 如果一个页面使用了静态生成，在构建时(build time)将生成此页面对应的HTML文件
这意味着在生产环境中，运行next build时将生成该页面对应的HTML文件。
然后，此HTML文件将在每个页面请求时被重用，还可以被CDN缓存。
- 在Next.js中可以静态生成带有或不带有数据的页面
 1.生成不带数据的静态页面
 - 默认情况下，Next.js使用静态生成来预渲染页面但不涉及获取数据
 2.需要获取数据的静态生成
 - 某些页面需要获取外部数据以进行预渲染
  1.页面内容取决于外部数据 使用getStaticProps
   -在预渲染时获取此数据，Next.js允许从同一文件export一个名为getStaticProps的async(异步函数)
    该函数在构建时被调用，并允许在预渲染时将获取的数据作为props参数传递给页面
  2.页面paths路径取决于外部数据 使用getStaticPaths(通常还要同时使用getStaticProps)
   - Next.js允许从动态页面(pages/posts/[id].js)中export一个名为getStaticPaths的async(异步)函数
   该函数在构建时被调用，并允许指定要预渲染的路径
>何时使用静态生成
- 使用静态生成，则所有page(页面)都可以只构建一次并托管到CDN上，这比让服务器根据每个页面请求渲染页面快
>服务器端渲染/SSR/动态渲染
- 如果page(页面)使用的是服务器端渲染，则会在每次页面请求时重新生成页面的HTML
- 要对page(页面)使用服务器端渲染，需要export一个名为getServerSideProps的async函数
服务器将在每次页面请求时调用此函数
- getServerSideProps类似于getStaticProps，两者区别在于getServerSideProps在每次页面请求时都会运行，而在构建时不运行
>Next.js的两种预渲染形式
1.静态生成
2.服务器端渲染

### Data Fetching
>getStaticProps(Static Generation)
export async function getStaticProps(context){
	return {
		props:{}
	}
}
- The context parameter is an object containing the following keys
1.`params` contains the route parameters for pages using dynamic routes.
For example,if the page name is `[id].js` then params will look like {id:..}.
2.`preivew` is true if the page is in the preview mode and undefined
3.`previewData` contains the preview data set by `setPreviewData`
4.`locale`contains the active locale
5.`defaultLocale` contains the configured default locale
- getStaticProps should return an object with
 `props` -An optional object with the props that will be received by the page component.It should be a serializable object
 `revalidate` -An optional amount in seconds after which a page re-generation can occur.Defaults to false.
	When revalidate is false it means that there is no revalidation,so the page will be cached as built
	util your next build
 `notFound` -An optional boolean value to allow the page to return a 404 status and page
 `redirect` -An optional redirect value to allow redirecting to internal and external resources.
	It should match the shape of {destination:string,permanent:boolean}
	In some rare cases, you might need to assign a custom status code for older HTTP Clients to properly redirect.
	In these cases,you can use the `statusCode` property instead of the permanent property,but not both
- You can import modules in top-level scope for use in `getStaticProps`.
Imports used in getStaticProps will not be bundled for the client-side
You can write server-side code directly in getStaticProps.
This includes reading from the filesystem or a database
### 内置对CSS的支持
- Next.js允许在JS文件中导入(import)CSS文件，因为Next.js扩展了JS中的import概念
>添加全局样式表



页面Pages
- Next.js中 一个page页面就是一个从`.js` `jsx` '.ts' '.tsx'文件导出的React组件
- 这些文件存放在pages目录下 
- 每个page(页面)都是用其文件名作为路由route
>具有动态路由的页面
- Next.js支持具有动态路由的pages页面
>预渲染
- 默认情况下Next.js将预渲染每个page页面
- Next.js会预先为每个页面生成HTML文件 而不是由客户端JS完成
- 预渲染会带来更好的性能和SEO效果

- 每个生成的HTML文件都与该文件所需的最少JS代码相关联
- 当浏览器加载一个page(页面) 其JS代码将运行并使页面完全具有交互性(此过程为水合hydration)

>两种形式的预渲染
- 两种方式的不同在于为page生成HTML页面的时机
- Next.js允许你为每个页面选择预渲染的方式 可以创建一个混合渲染的Next.js应用程序
1.静态生成(推荐) Static Generation
- HTML在构建时生成 并在每次页面请求时重用
- 如果一个页面使用静态生成 在构建时(build time)将生成此页面对应的HTML文件
- 即在生产环境中 运行next build时将生成该页面对应的HTML文件 然后此HTML文件将在每个页面请求时被重用 还可以被CDN缓存
	1.生成不带数据的静态页面
	- 默认情况下 Next.js使用静态生成来预渲染页面但不设计获取数据
	2.需要获取数据的静态生成
	- 某些页面需要获取外部数据以进行预渲染
		1.页面内容取决于外部数据 使用getStaticProps
		- 要在预渲染时获取此数据 Next.js允许从同一文件export一个名为getStaticProps的异步函数
		- 该函数在构建时被调用 允许预渲染时将获取的数据作为props参数传递给页面
		2.页面paths(路径)取决于外部数据 使用getStaticPaths(通常还要同时使用getStaticProps)
		- Next.js允许创建具有动态路由的页面
		- Next.js允许从动态页面中export一个名为getStaticPaths的async异步函数
		- 该函数在构建时被调用 允许指定要渲染的路径
>静态生成的优势
- 尽可能使用静态生成(带有或不带数据) 因为所有page页面都可以只构建一次并托管到CDN 这比让服务器根据每个页面请求来渲染页面快
2.服务器端渲染 Server-side Rendering
- 在每次页面请求时重新生成HTML
- 也被称为SSR或动态渲染
- 如果page页面使用服务器端渲染 则会在每次页面请求时重新生成页面的HTML
- 需要export一个名为getServerSideProps获取该数据并将其传递给Page
>getServerSideProps类似于getStaticProps 
- 但两者区别在于getServerSideProps在每次页面请求时都会运行 而在构建时不运行

>什么时候使用getStaticProps
1.呈现页面所需的数据在用户请求之前的构建时可用
2.数据来自无头CMS
3.数据可以公开缓存(非用户特定)
4.该页面必须预渲染(用于SEO)并且速度非常快 getStaticProps生成HTML和JSON文件 这两种文件都可以由CDN缓存以提高性能

> TS GetStaticProps
import {GetStaticProps} from 'next'
export const getStaticProps:GetStaticProps = async(context)=>{}

>Next.js的默认静态生成超时为60秒 如果超时没有新的页面生成 它会再尝试生成三次 如果第四次构建失败 则构建失败

### 增量静态再生
- Next.js允许在构建网站后创建或更新静态页面
- 增量静态重新生成ISR 能在每页的基础上使用静态生成 而无需重建整个站点
- 使用ISR 可以在扩展到数百万页的同时保留静态的优势

### 读取文件 使用process.cwd()
- 文件可以直接从文件系统中读取getStaticProps

### 静态生成HTML和JSON
- 当一个页面getStaticProps在构建时被预渲染时 除了页面HTML之外 Next.js还会生成一个JSON文件来保存运行的结果
- 此JSON文件将用作通过next/link或next/router的客户端路由 
- 客户端页面转换不会调用getStaticProps 因为仅使用导出的JSON

### 只允许出现在一个页面中
- getStaticProps只能从页面导出 不能从非页面文件导出它
- 这种限制的原因之一是React需要在页面呈现之前拥有所有必需的数据

### 什么时候使用getServerSideProps
- 仅当您需要预呈现其数据必须在请求时获取的页面才应使用
>仅在服务器端运行 从不在浏览器上运行
>只允许出现在一个页面中

### 内置对CSS的支持
- Next.js允许在JS文件中导入CSS文件 因为Next.js扩展了JS中的import概念
1.添加全局样式表
2.从node_modules目录导入样式
3.添加组件级CSS
- Next.js通过[name].module.css文件命名约定来支持CSS模块
4.对Sass支持
- Next.js允许导入具有.scss和.sass扩展名的Sass文件





### assert模块提供断言测试的函数 用于测试不变式
### async_hooks模块提供一个API来注册回调 跟踪在Node.js应用程序中创建的异步资源的生命周期
const async_hooks = require('async_hooks')
### Buffer 在ES6引入TypedArray之前 JS语言没有读取或操作二进制数据流的机制
- Buffer类被引入作为Node.js API的一部分 使其可以在TCP流或文件系统操作等场景中处理二进制数据流
- Buffer类的实例类似于整数数组 但Buffer的大小是固定的 且在V8堆外分配物理内存 
- Buffer的大小在被创建时确定 且无法调整
- Buffer类在Node.js中是一个全局变量 因此无需使用require('buffer').Buffer

Client Side Routing
- Client side routing allows your app to update the URL from a link click without
making another request for another document from the server
- Client side routing is enabled by creating a `Router` and linking/submitting to pages with `Link` and `<Form>`

Nested Routes

Dynamic Segments
- Segments of the URL can be dynamic placeholders that are parsed and provided to various apis
<Route path="projects/:projectId/tasks/:taskId">
- The two segments with : are dynamic,and provided to the following APIs

Ranked Route Matching

Active Links

<NavLink>
Styling the active navigation items so the user knows where they are(`isActive`) or where they're going(isPending)
in the app is done easily with <NavLink>

>useMatch
useMatch can be used for any other "active" indication outside of links

>Relative Links
Like HTML <a href> <Link to> and <NavLink to>can take relative paths,with enhanced behavior with nested routes

>Data Loading
- Because URL segments usually map to your app's persistent data,React Router provides conventional data loading
hooks to initiate data loading during a navigation.
- Combined with nested routes,all of the data for multiple layouts at a specific URL can ben loaded in parallel
Data is made available to your components through 'useLoaderData'
- When the user visits or clicks links to http://example.com/real-salt-lake/45sd,all three route loaders will be called and
loaded in parallel.before the UI for that URL renders

>Redirects
While loading or changing data,it's common to redirect the user to a different route

>Pending Navigation UI
When users navigate around the app,the data for the next page is loaded before the page is renderd.It's important to
provide user feedback during this time so the app doesn't feel like it's unresponsive
```
const navigation = useNavigation()
```

>Skeleton UI with <Suspense>
Instead of waiting for the data for the next page,you can `defer` data so the UI flips over to the next screen with palceholder
UI immediately while the data loads

>Data Mutations
HTML forms are navigation events,just like links.React Router supports HTML form workflows with client side routing

>Data Revalidation
Decades old web conventions indicate that when a form is posted to the server,data is changing and a new page is
rendered.That convention is followed in React Router's HTML-based data mutation APIs.
After route actions are called,the loaders for all of the data on the page is called again to ensure the UI stays up-to-date
with the data automatically.
No cache keys to expire,no context providers to reload.

>Busy Indicators
When forms are being submitted to route actions,you have access to the navigation state to display busy indicators,
disable fieldsets.


> React-Route Error
Anytime your app throws an error while rendering,loading date,or performing data mutations,React Router will catch
it and render an error screen.

>useRouteError
It provides the error that was thrown

>Outlet
We need to tell the root route where we want it to render its child routes.
We do that with <Outlet>

> Client Side Routing
Client side routing allows our app to update the URL without requesting another document from the server.
Instead,the app can immediately render new UI,We can make it happen with <Link>

> Loading Data
There are two APIs we'll be using to load data,`loader` and `useLoaderData`.
First we'll create and export a loader function in the root module
Then we'll hook it up to the route.
Finally,we'll access and render the data





### react双缓冲机制
- 在内存中构建并直接替换的技术叫做双缓冲
- React使用双缓存来完成Fiber树的构建与替换 对应DOM树的创建与更新
双缓存Fiber树
- 在React中最多会同时存在两棵Fiber树
- 当前屏幕上显示内容对应的Fiber树称为current Fiber树 该树中的Fiber节点被称为current fiber
- 正在内存中构建的Fiber树成为workInProgress Fiber树 该树中的Fiber节点被称为workInProgress fiber 
- 他们通过alternate属性连接
-
- React应用的根节点通过使current指针在不同Fiber树的rootFiber间切换来完成current Fiber树指向的切换
- 每次状态更新都会产生新的WorkInProgress Fiber树 通过current与workInProgress的替换 完成DOM更新
- 
- mount时的构建/替换流程
1. 首次执行ReactDOM.render会创建fiberRootNode(源码中叫fiberRoot)和rootFiber
其中fiberRootNode是整个应用的根节点 rootFiber是<App/>所在组件树的根节点
- 之所以要区分fiberRootNode与rootFiber 是因为应用中可以多次调用ReactDOM.render渲染不同的组件树
他们会拥有不同的rootFiber 但是整个应用的根节点只有一个 那就是fiberRootNode
- fiberRootNode的current会指向当前页面上已渲染内容对应Fiber树 即current Fiber树
- 由于是首屏渲染 页面中还没有挂载任何DOM 所以fiberRootNode.current指向的rootFiber没有任何子Fiber节点
2.接下来进入render阶段 根据组件返回的JSX在内存中依次创建Fiber节点并连接在一起构建Fiber树
被称为workInProgress Fiber树
3.图中右侧已构建玩的workInProgress Fiber树在commit阶段渲染到页面 	
此时DOM更新到右侧树对应的样子 fiberRootNode的current指针指向WorkInProgress Fiber树 使其变为current Fiber树
- update时
1.点击p节点触发状态改变 这回开启一次新的render阶段并构建一棵新的workInProgress Fiber树
和mount时一样 workInProgress fiber的创建可以复用current Fiber树对应的节点数据 这个决定是否复用的过程就是Diff算法
2.workInProgress Fiber树在render阶段完成构建后进入commit阶段渲染到页面上 渲染完成后 
workInProgress Fiber树变为current Fiber树

- Renderer渲染器
- 由于React支持跨平台 所以不同平台有不同的Renderer 前端最熟悉的是负责在浏览器环境渲染的Renderer ReactDOM
- 除此之外 还有
- ReactNative渲染器 渲染App原生组件
- ReactTest渲染器 渲染出纯JS对象用于测试
- ReactArt渲染器 渲染到Canvas SVG 或VML(IE8)
- 每次更新发生时 Renderer接到Reconciler通知 将变化的组件渲染在当前宿主环境

- React16架构可以分为三层
1.Scheduler(调度器)	调度任务的优先级 高优任务优先进入Reconciler
2.Reconciler(协调器)	负责找出变化的数组
3.Renderer(渲染器)	负责将变化的组件渲染到页面上
- 相较于React15 React16中新增了Scheduler(调度器)
- Scheduler是独立于React的库

- React16中 Reconciler与Render不再是交替工作 当Scheduler将任务交给Reconciler后 Reconciler会为变化的虚拟DOM打上代表增/删/更新的标记
- 整个Scheduler与Reconciler的工作都在内存中进行 只有当所有组件都完成Reconciler的工作 才会统一交给Renderer

- 实际上 由于Scheduler和Reconciler都是平台无关的 所以React为他们单独发了一个包react-Reconciler 可以用这个包自己实现一个ReactDOM

代数效应
- 是函数式编程中的一个概念 用于将副作用从函数调用中分离
- 代数效应能够将副作用从函数逻辑中分离 使函数关注点保持纯粹

代数效应在React中的应用 Hooks
- 对于类似useState useReducer useRef这样的Hook 不需要关注FunctionComponent的state在Hook中如何保存 React会处理

代数效应与Generator
- 浏览器原生就支持类似的实现 Generator
- 但是Generator的一些缺陷使React团队放弃了他
1.类似async Generator也是传染性的 使用了Generator则上下文的其他函数也需要做出改变 这样心智负担比较重
2.Generator执行的中间状态是上下文关联的
- 基于这些原因 React没有采用Generator实现协调器

代数效应与Fiber
- Fiber不是计算机术语中的新名词 他的中文翻译叫纤程(Fiber) 与进程(Process) 线程(Thread) 协程(Coroutine)同为程序执行过程

React Fiber
- React内部实现的一套状态更新机制 支持任务不同优先级 可中断与恢复 并且恢复后可以复用之前的中间状态
- 其中每个任务更新单元为React Element对应的Fiber节点

Fiber的含义
- Fiber包含三层含义
1.作为架构来说 之前React15的Reconciler采用递归的方式执行 数据保存在递归调用栈中 所以被称为stack Reconciler
React16的Reconciler基于Fiber节点实现 被称为Fiber Reconciler
2.作为静态的数据结构来说 每一个Fiber节点对应一个React element 保存了该组件的类型(函数/类/原生组件) 对应DOM节点等信息
3.作为动态的工作单元来说 每个Fiber节点保存了本次更新中该组件改变的状态 要执行的工作(需要被删除/被插入页面/被更新)


1.Reconciler工作的阶段被称为render阶段 因为在该阶段会调用组件的render方法
2.Renderer工作的阶段被称为commit阶段 commit阶段会把render阶段提交的信息渲染在页面上
3.render与commit阶段统称为work 即React在工作中 相对应的 如果任务正在Scheduler内调度 就不属于work

React Component
- React中 常使用Classcomponent与FunctionComponent构建组件
- Classcomponent对应的Element的type字段为AppClass自身
- FunctionComponent对应的Element的type字段为AppFunc自身
- 无法通过引用类型区分Classcomponent和Functioncomponent 
React通过Classcomponent实例原型上的isReactComponent变量判断是否是ClassComponent

JSX与Fiber节点
- JSX是一种描述当前组件内容的数据结构 他不包含组件schedule reconcile render所需的相关信息
1.组件在更新中的优先级
2.组件的state
3.组件被打上的用于Renderer的标记
- 这些内容都包含在Fiber节点中
所以在组件mount时Reconciler根据JSX描述的组件内容生成组件对应的Fiber节点
在update时 Reconciler将JSX与Fiber节点保存的数据对比 生成组件对应的Fiber节点 并根据对比结果为Fiber节点打上标记

Fiber节点如何被创建并构建Fiber树
- render阶段开始于performSyncWorkOnRoot或performConcurrentWorkOnRoot的调用 这取决于本次更新是同步更新还是异步更新
- performSyncWorkOnRoot会调用workLoopSync
- performConcurrentWorkOnRoot会调用workLoopConcurrent
他们唯一的区别是是否调用shouldYield
- Fiber Reconciler是从Stack Reconciler重构而来的 通过遍历的方式实现可中断的递归
- render阶段的工作可以分为递阶段和归阶段 																																																								
其中递阶段会执行beginWork 归阶段会执行completeWork

beginWork工作 传入当前Fiber节点 创建子Fiber节点
beginWork的工作可以分为两部分
1.update时 如果current存在 在满足一定条件时可以复用current节点 
这样能克隆current.child作为workInProgress.child 而不需要新建workInProgress.child
2.mount时 除fiberRootNode以外 current === null 会根据fiber.tag不同创建不同类型的子fiber节点
对于常见的组件类型 如FunctionComponent/ClassComponent/HostComponent最终会进入reconcileChildren

reconcileChildren是Reconciler模块的核心部分
1.对于mount的组件 他会创建新的子fiber节点
2.对于update的组件 他会将当前组件与该组件在上次更新时对应的fiber节点比较(也就是俗称的diff算法) 将比较的结果生成新的Fiber节点
不论走哪个逻辑 最终他会生成新的子Fiber节点并赋值给workInProgress.child 作为本次beginWork返回值
并作为下次performUnitOfWork执行时workInProgress的传参

effectTag
render阶段的工作是在内存中进行的 当工作结束后会通知Renderer需要执行的DOM操作
要执行DOM操作的具体类型就保存在fiber.effectTag中

在mount时只有rootFiber会赋值Placement effectTag 在commit阶段只会执行一次插入操作

completeWork
类似beginWork completeWork也是针对不同fiber.tag调用不同的处理逻辑
1.update时 Fiber节点已经存在对应DOM节点 所以不需要生成DOM节点 需要做的主要是处理props 比如
onClick onChange等回调函数的注册
处理style prop
处理DANGEROUSLY_SET_INNER_HTML prop
处理children prop
最主要的逻辑是调用updateHostComponent方法
在updateHostComponent内部 被处理完的props会被赋值给workInProgress.updateQueue 并最终会在commit阶段被渲染在页面上

effectList
- 作为DOM操作的依据 commit阶段需要找到所有有effectTag的fiber节点并依次执行effectTag对应操作
为了避免在commit阶段再遍历一次Fiber树寻找effectTag!==null的Fiber节点
在completeWork的上层函数completeUnitOfWork中 
每个执行完completeWork且存在effectTag的Fiber节点会被保存在一条被称为effectList的单向链表中
effectList中第一个Fiber节点保存在fiber.firstEffect最后一个元素保存在fiber.lastEffect
形成一条以rootFiber.firstEffect为起点的单向链表
这样在commit阶段 只需要遍历effectList就能执行所有effect
effectList相较于Fiber树就像圣诞树上挂的一串彩灯

至此render阶段全部工作完成 在performSyncWorkOnRoot函数中fiberRootNode
被传递给commitRoot方法 开启commit阶段工作流程
commitRoot(root)

commit阶段
commitRoot方法是commit阶段工作的起点 fiberRootNode会作为传参
在rootFiber.firstEffect上保存了一条需要执行副作用的Fiber节点的单向链表effectList
这些Fiber节点的updateQueue中保存了变化的props
这些副作用对应的DOM操作在commit阶段执行
除此之外 一些生命周期钩子(比如componentDidXXX) hook(比如useEffect)需要在commit阶段执行
commit阶段的主要工作(即Renderer的工作流程)分为三部分
1.before mutation阶段(执行DOM操作前)
2.mutation阶段(执行DOM操作)
3.layout阶段(执行DOM操作后)
在before mutation阶段之前和layout阶段之后还有一些额外的工作
涉及到比如useEffect的出发 优先级相关的重置 ref的绑定和解绑

before mutation之前主要做一些变量赋值 状态重置的工作
beforeMutation阶段的主函数commitBeforeMutationEffects
React提供替代的生命周期钩子getSnapshotBeforeUpdate
这个函数是在commit阶段内的before mutation阶段调用的 由于commit阶段是同步的 所以不会遇到多次调用的问题

useEffect异步调度
- 当一个FunctionComponent含有useEffect或useLayoutEffect 他对应的Fiber节点也会被赋值effectFlag

整个useEffect异步调度分为三步
1.before mutation阶段在scheduleCallback中调度flushPassiveEffects
2.layout阶段之后将effectList赋值给rootWithPendingPassiveEffects
3.scheduleCallback触发flushPassiveEffects flushPassiveEffects内部遍历rootWithPendingPassiveEffects

useEffect为什么需要异步调用
- 主要是防止同步执行时阻塞浏览器渲染

类似before mutation阶段 mutation阶段也是遍历effectList 执行函数 这里执行的是commitMutationEffects
commitMutationEffects会遍历effectList对每个Fiber节点执行如下三个操作
1.根据ContentReset effectTag重置文字节点
2.更新ref
3.根据effectTag分别处理 其中effectTag包括(Placement|Update|Deletion|Hydrating)

Placement effect
- 当Fiber节点含有Placement effectTag 意味着该Fiber节点对应的DOM节点需要插入到页面中
调用方法为commitPlacement

在before mutation阶段 会遍历effectList 依次执行
1.处理DOM节点 渲染/删除后的autoFocus blur逻辑
2.调用getSnapshotBeforeUpdate生命周期钩子
3.调度useEffect

执行DOM操作的mutation阶段
类似于before mutation阶段 mutation阶段也是遍历effectList 执行函数 这里执行的是commitMutationEffects
commitMutationEffects会遍历effectList 对每个Fiber节点执行如下三个操作
1.根据ContentReset effectTag 重置文字节点
2.更新ref
3.根据effectTag分别处理 其中effectTag包括(Placement|Update|Deletion|Hydrating)
>Placement effect
当Fiber节点含有Placement effectTag 意味着该Fiber节点对应的DOM节点需要插入到页面中 调用的方法为commitPlacement
>Update effect
当Fiber节点含有Update effectTag 意味着该Fiber节点需要更新 调用的方法为commitWork 会根据Fiber.tag分别处理
>Deletion effect
当Fiber节点含有Deletion effectTag 意味着该Fiber节点对应的DOM节点需要从页面中删除 调用的方法为commitDeletion
>总结
mutation阶段会遍历effectList 依次执行commitMutationEffects
该方法的主要工作为根据effectTag调用不同的处理函数处理Fiber

### layout阶段
该阶段之所以称为layout 是因为该阶段的代码都是在DOM渲染完成(mutation阶段完成)后执行的
该阶段触发的生命周期钩子和hook可以直接访问到已经改变后的DOM 即该阶段是可以参与DOM layout的阶段
>概览
与前两个阶段类似 layout阶段也是遍历effectList 执行函数 具体执行的函数是commitLayoutEffects
>commitLayoutEffects一共做了两件事
1.commitLayoutEffectOnFiber(调用生命周期钩子和hook相关操作)
2.commitAttachRef(赋值ref)
>commitLayoutEffectOnFiber
- 该方法会根据fiber.tag对不同类型的节点分别处理
1.对于classComponent 他会通过current===null区分是mount还是update 
调用componentDidMount或componentDidUpdate
2.对于FunctionComponent及相关类型
会调用useLayoutEffect hook的回调函数 调用useEffect的销毁和回调函数
>commitAttachRef
- 获取DOM实例 更新ref
>current Fiber树切换
root.current = finishedWork
这行代码在mutation阶段结束后 layout阶段开始前
componentWillUnmount会在mutation阶段执行 此时current Fiber树还指向前一次更新的Fiber树 在生命周期钩子内获取的DOM还是更新前的
componentDidMount和componentDidUpdate会在layout阶段执行 此时current Fiber树已经只想更新后的Fiber树 在生命周期钩子内获取的DOM就是更新后的
>总结
layout阶段会遍历effectList 依次执行commitLayoutEffects 该方法主要工作为 根据effectTag调用不同的处理函数处理Fiber并更新ref

### Diff算法
- render阶段beginWork中 对于update的组件 他会将当前组件在上次更新时对应的Fiber节点比较(也就是俗称的Diff算法)
将比较的结果生成新Fiber节点
>一个DOM节点在某一时刻最多会有4个节点与他相关
1.current Fiber 如果该DOM节点已在页面中 current Fiber代表该DOM节点对应的Fiber节点
2.workInProgress Fiber 如果该DOM节点将在本次更新中渲染到页面中 workInProgress Fiber代表该DOM节点对应的Fiber节点
3.DOM节点本身
4.JSX对象 即Classcomponent的render方法的返回结果 或FunctionComponent的调用结果 JSX对象中包含描述DOM节点的信息
- DOM算法的本质是对比1和4生成2
>Diff的瓶颈以及React如何应对
- 最前沿的算法 将前后两颗树完全比对的算法复杂度是O(n3)
- 为了降低算法复杂度 React的diff会预设三个限制
1.只对同级元素进行Diff
2.两个不同类型的元素会产生出不同的树
3.开发者可以通过key prop暗示哪些子元素在不同的渲染下能保持稳定
### 单节点Diff
- 会进入reconcileSingleElement
### 多节点Diff

### 状态更新
### 几个关键节点 即几个关键函数的调用
1.render阶段的开始
render阶段开始于performSyncWorkOnRoot或performConcurrentWorkOnRoot方法的调用
这取决于本次更新是同步更新还是异步更新
2.commit阶段的开始
commit阶段开始于commitRoot方法的调用 其中rootFiber会作为传参
render阶段完成后会进入commit阶段 
>触发状态更新到render阶段的路径
>创建Update对象
- 在React中 有以下方法可以触发状态更新(排除SSR相关)
 1.ReactDOM.render
 2.this.setState
 3.this.forceUpdate
 4.useState
 5.useReducer
- 这些方法调用的场景各不相同 如何接入同一套状态更新机制
- 每次状态更新都会创建一个保存更新状态相关内容的对象 Update
在render阶段的beginWork中会根据Update计算新的state
>从Fiber到root
- 触发状态更新的fiber上已经包含Update对象
render阶段是从rootFiber开始向下遍历 如何从触发状态更新的fiber得到rootFiber
通过调用makeUpdateLaneFromFiberToRoot方法
该方法做的工作概括为 从触发状态更新的fiber一直向上遍历到rootFiber 并返回rootFiber
>调度更新
现在拥有一个rootFiber 该rootFiber对应的Fiber树中某个Fiber节点包含一个Update
接下来通知Scheduler根据更新的优先级 决定以同步还是异步的方式调度本次更新
状态更新和render阶段连接上

### 更新的心智模型
1.同步更新的React
- 更新机制类比代码版本控制 没有代码版本控制之前 在代码中逐步叠加功能
- React中 所有通过ReactDOM.render创建的应用都是通过类似的方式更新状态
即没有优先级概念 高优更新需要排在其他更新后面执行
2.并发更新的React
- React中 通过ReactDOM.createBlockingRoot和ReactDOM.createRoot创建的应用会采用并发的方式更新状态
高优更新中断正在进行中的低优更新 先完成render-commit流程
待高优更新完成后 低优更新基于高优更新的结果重新更新

###Update
>Update的分类
一共有三种组件(HostRoot|ClassComponent|FunctionComponent)可以触发更新
由于不同类型组件工作方式不同 所以存在两种不同结构的Update
ClassComponent与HostRoot共用一套Update结构
FunctionComponent单独使用一种Update结构
>Update与Fiber的联系
类似Fiber节点组成Fiber树 Fiber节点上的多个Update会组成链表并被包含在fiber.updateQueue中
- Fiber节点最多同时存在两个updateQueue
1.current fiber保存的updateQueue即current updateQueue
2.workInProgress fiber保存的updateQueue即workInProgress updateQueue
-state的变化在render阶段产生与上次更新不同的JSX对象 通过Diff算法产生effectTag 在commit阶段渲染在页面上
### 优先级
>如何调度优先级
- React调用Scheduler提供的方法runWithPriority
该方法接收一个优先级常量与一个回调函数作为参数
回调函数会以优先级高低为顺序排列在一个定时器中并在合适的时间触发
优先级最终会反映到update.lane变量上

### ReactDOM.render完成页面渲染
1.创建fiber
- 首次执行ReactDOM.render会创建fiberRootNode和rootFiber
fiberRootNode是整个应用的根节点 rootFiber是要渲染组件所在组件树的根节点
2.创建update

### React其他入口函数
- 当前React共有三种模式
1.legacy 当前React使用的方式
2.blocking 开启部分concurrent模式特性的中间模式
3.concurrent 面向未来的开发模式 任务中断/任务优先级都是针对concurrent模式
- 模式的变化影响整个应用的工作方式 所以无法针对某个组件开启不同模式
可以通过不同的入口函数开启不同模式
legacy	ReactDOM.render(<App />,rootNode)
blocking	ReactDOM.createBlockingRoot(rootNode).render(<App />)
concurrent ReactDOM.createRoot(rootNode).render(<App />)
- 不同模式的入口函数不同 但是他们仅对fiber.mode变量产生影响 

### this.setState
this.setState内会调用this.updater.enqueueSetState方法
在enqueueSetState方法中是从创建update到调度update的流程

### useState hook
>更新
- 通过一些途径产生更新 更新会造成组件render
>update数据结构
- 多个update会形成环状单向链表
>状态如何保存
- 更新产生的update对象会保存在queue中
- 不同于ClassComponent的实例可以存储数据 对于FunctionComponent queue存在FunctionComponent对应的fiber中
>hook数据结构
- fiber.memoizedState中保存的Hook的数据结构
Hook和update类似 都通过链表连接 不过Hook是无环的单向链表
>update与hook的所属关系
- 每个useState对应一个hook对象
- 调用const [num,updateNum] = useState(0)时updateNum产生的update保存在useState对应的hook.queue中

### Hooks数据结构
>dispatcher
- 真实的Hooks中 组件mount时的hook与update时的hook来源于不同的对象 这类对象在源码中被称为dispatcher
- mount时调用的hook和update时调用的hook其实是两个不同的函数

### useState&useReducer
- 本质来说 useState只是预置了reducer的useReducer

### Concurrent Mode
Concurrent模式是一组React的新功能 可帮助应用保持响应 并根据用户的设备性能和网速进行适当的调整
Concurrent Mode是React过去2年重构Fiber架构的源动力 也是React未来的发展方向
>底层架构 Fiber架构
Fiber架构的意义在于 他将单个组件作为工作单元 使以组件为粒度的异步可中断的更新成为可能
>架构的驱动力 Scheduler
如果同步运行Fiber架构(通过ReactDOM.render 则Fiber架构与重构前并无区别)
如果配合时间切片 就能根据宿主环境性能 为每个工作单元分配一个可运行时间 实现异步可中断的更新
>架构运行策略 lane模型
一个模型控制不同优先级之间的关系与行为
>上层实现
从源码层面讲 Concurrent Mode是一套可控的多优先级更新架构
>基于该架构实现的功能
1.batchedUpdates
如果在一次事件回调中触发多次更新 他们会被合并为一次更新进行处理
这种合并多个更新的优化方式被称为batchedUpdates
在Concurrent Mode中 是以优先级为依据对更新进行合并的
2.Suspense
Suspense可以在组件请求数据时展示一个pending状态 请求成功后渲染数据
本质上讲Suspense内的组件子树比组件树的其他部分拥有更低的优先级
3.useDeferredValue
返回一个延迟相应的值 该值可能延后的最长时间为timeoutMs
### Scheduler
包含两个功能
1.时间切片
2.优先级调度
>时间切片原理
时间切片的本质是是模拟实现requestIdleCallback
除去浏览器重排/重绘 下面是浏览器一帧中可以用于执行JS的时机
一个task(宏任务)--队列中全部job(微任务)--requestAnimationFrame--浏览器重排/重绘--requestIdleCallback
requestIdleCallback是在浏览器重排/重绘后 如果当前帧还有空余时间时被调用的
浏览器并没有提供其他API能够在同样的时机(浏览器重排/重绘后)调用以模拟其实现
唯一能精准控制调用时机的API是requestAnimationFrame 能让我们在浏览器重排/重绘之前执行JS
这也是为什么通常用这个API实现JS动画 这是浏览器渲染前的最后时机 所有动画能快速被渲染
所以 退而求其次 Scheduler的时间切片功能是通过task(宏任务)实现的
最常见的task当属setTimeout 但是有个task比setTimeout执行时机更靠前 那就是MessageChannel
所以Scheduler将需要被执行的回调函数作为MessageChannel的回调执行
如果当前宿主环境不支持MessageChannel 则使用setTimeout
在React的render阶段 开启Concurrent Mode时 每次遍历前 都会通过Scheduler提供的shouldYield方法判断是否需要
中断遍历 使浏览器有时间渲染
是否中断的依据 最重要的一点便是每个任务的剩余时间是否用完
在Scheduler中 为任务分配的初始剩余时间为5ms 
随着应用运行 会通过fps动态调整分配给任务的可执行时间
>优先级调度
Scheduler是独立于React的包 所以他的优先级也是独立于React的优先级的
Scheduler对外暴露一个方法unstable_runWithPriority
这个方法接受一个优先级和一个回调函数 在回调函数内部调用获取优先级的方法都会取第一个参数对应的优先级
不同优先级意味着不同时长的任务过期时间

### lane模型
Scheduler与React是两套优先级机制 在React中 存在多种使用不同优先级的情况
React需要设计一套满足以下需求的优先级机制
1.可以表示优先级的不同
2.可能同时存在几个同优先级的更新 能表示批的概念
3.方便进行优先级相关计算
- 为满足如上需求 React设计了lane模型


### store
1.useDispatch 
- 得到redux store的dispatch方法引用 用于手动dispatch action																																																												
```
const dispatch = useDispatch()
```
2.useSelector
- 组件可以通过useSelector访问store中释放的state数据
>selector这个概念与hooks无关 
1.selector是函数
2.selector的作用是根据redux的state查找 筛选 处理后获得一个或多个派生的数值
- useSelector这个hook 参数是selector并返回selector计算结果
- 这个hook会订阅redux store 每次redux state有更新 useSelector中的selector会重新计算一次 返回新的结果 重新渲染
3.useStore
- 直接获取Redux store的引用 可以使用到更底层的API

### React.FC
- 函数式组件 TS使用的一个泛型 FC是Function Component的缩写
- React.FC可以直接写成React.FunctionComponent

### createRoot
- 在React18中使用createRoot代替render
- root是指向React渲染dom树的一个最上层数据结构
- 旧的API中 root是不透明的 因为将它连接到DOM元素 并通过DOM节点访问它 不暴露给用户

### useEffect与useLayEffect
1.在浏览器完成布局与绘制之后 传给useEffect的函数会延迟调用
- useEffect会在浏览器绘制后延迟执行 但会保证在任何新的渲染前执行
- React将在组件更新前刷新上一轮渲染的effect

### useContext
- 上下文 就是运行一段代码 所要知道的所有变量
>用法
1.创建createContext
- 使用createContext创建并初始化
const C = createContext(null)
2.Provider指定适用范围
- 在圈定的范围内 传入读操作和写操作对象 然后可以使用上下文
3.使用useContext
- 使用useContext接受上下文 因为传入的是对象 接受的也应该是对象


```
const value = useContext(MyContext)
```
- 接收一个context对象(React.createContext的返回值)并返回该context的当前值
- 当前context值由上层组件中距离当前组件最近的<MyContext.Provider>的value prop决定
- useContext的参数必须是context对象本身
- useContext(MyContext)只是能够读取context的值以及订阅context的变化
- 仍然需要在上层组件树中使用<MyContext.Provider>为下层组件提供context

### useReducer
- 一个用于状态管理的hook api 是useState的替代方案
- useState使用useReducer构建
- useReducer(reducer,initialState)接受2个参数 分别是reducer函数和初始状态

### useReducer & useContext
1.使用useReducer在根节点创建一个counter方法
2.通过useContext为子组件提供和消费context

### useCallback
- 返回一个memoized回调函数
const memoizedCallback = useCallback(
	()=>{
		afunction(a,b)
	},
	[a,b]
)
- 把内联回调函数及依赖项数组作为参数传入useCallback 
- 它将返回该回调函数的memoized版本
- 该回调函数仅在某个依赖项改变时才更新
- useCallback(fn,deps)相当于useMemo(()=>fn,deps)
- 不要把所有方法都包上useCallback
- useCallback要配合子组件的shouldComponentUpdate或React.memo一起使用 否则就是反向优化

### useMemo
- 返回一个memoized值
- 传入useMemo的函数会在渲染期间执行
- 不要在这个函数内部执行与渲染无关的操作
- 如果没有提供依赖项数组 useMemo在每次渲染时都会计算新的值

### useCallback&useMemo
- useCallback 缓存函数
- useMemo 缓存函数的返回值

### useRef
const refContainer = useRef(initialValue)
- useRef返回一个可变的ref对象 其.current属性被初始化为传入的参数(initialValue)
- 返回的ref对象在组件的整个生命周期内保持不变

### useImperativeHandle
- 可以在使用ref时自定义暴露给父组件的实例值
- 大多数情况下 应当避免使用ref这样的命令式代码 
- useImperativeHandle应当与forwardRef一起使用

### useLayoutEffect
- 会在所有的DOM变更之后同步调用effect
- 可以使用它读取DOM布局并同步触发重渲染

### document.cookie使用

### encodeURIComponent
- 可把字符串作为URI组件进行编码 其返回值URIstring的副本 其中某些字符将被十六进制的转义序列替换

### React classnames库
- react原生动态添加多个className会报错
- classnames库支持在react中直接在classname内部传入动态class并进行条件判断

### React suspense
- 通过使用Suspense标签将要进行lazy(懒加载)的组件进行包裹
- 然后在callback函数中给出加载过程中处理方式 也就是加载过程中的行为
- fallback属性接受任何在组件加载过程中想要展示的React于是怒 
- 可以将Suspense置于懒加载组件之上的任何位置 可以用一个Suspense组件包裹多个懒加载组件
>startTransition
- 告诉React 将标签切换为comments不会标记为紧急更新 而是标记为需要一些准备时间的transition
- React会保留旧的UI并进行交互 当它准备好时 会切换为<Comments/>
>异常捕获边界(Error boundaries)
- 如果模块加载失败(如网络问题) 会触发一个错误 可以通过MyErrorBoundary处理
>基于路由的代码分割
>命名导出
- React.lazy目前只支持默认导出

### React-Redux hook
>useSelector
- 使得React组件可以从Redux store中读取数据
- useSelector接收一个selector函数 selector函数接收Redux store的state作为其参数 然后从state中取值并返回
- selector函数可以直接返回Redux state 也可以基于该state返回派生值
- useSelector会自动订阅Redux Store
- 这样 任何时候dispatch action 它都会立即再次调用对应的selector函数
- 如果selector返回的值与上次运行时相比发生变化 useSelector将强制组件使用新值重新渲染
- note useSelector使用严格的===来比较结果 因此只要selector函数返回的结果是新地址引用 组件就会重新渲染
- useSelector可以将比较函数作为它的第二个参数 相同返回true 组件不会被重新渲染
>useDispatch
- 这个hook会返回store的dispatch方法
>使用Provider透传Store
- 必须明确告诉React-Redux当前组件需要的store
- 使用<Provider>组件包裹<App>组件 并将Redux store作为prop传递给<Provider>组件
- 之后 应用程序中每个组件都可以在需要时访问到Redux store
### React-Redux模式
>全局State 组件State 表单
- 整个应用程序所需的全局state应该放在Redux store中 只在一个组件内使用的state应该放在组件state中
>在组件中使用多个Selectors
- 可以在一个组件中多次使用useSelector 每次调用useSelector都应该尽可能返回尽可能少的state

###shallowEqual
- React-Redux有一个shallowEqual比较函数

### Redux Middleware和副作用
- Redux store本身无法处理异步逻辑 任何异步都必须在store之外发生
- Redux middleware用来放这些副作用逻辑代码
>使用Redux Thunk Middleware
- thunk middleware允许我们编写以dispatch和getState作为参数的函数
- thunk函数可以包含我们想要的任何异步逻辑 并且该逻辑可以根据需要dispatch action以及读取store state
- Redux thunk函数接收dispatch和getState作为参数 并且可以dispatch相关action

### 使用Redux Toolkit的现代Redux
>使用configureStore
- Redux Tookit的configureStore API可简化store的设置过程
- configureStore包裹Redux核心createStore api并自动处理大部分store设置逻辑
>使用createSlice
- 简化Redux reducer逻辑和actions
 1.可以将case reducer编写为对象内部的函数 而不必编写switch/case语句
 2.reducer将能够编写更短的不可变更新逻辑
 3.所有action creators将根据提供的reducer函数自动生成
-createSlice接收一个包含三个主要选项字段的对象
 1.name 一个字符串 将用作生成的action types的前缀
 2.initialState reducer的初始state
 3.reducers 一个对象 其中键是字符串 值是处理特定actions的case reducer函数
- 生成的action creators将作为slice.actions.todoAdded提供
- 通常像之前编写的action creators一样单独解构和导出
- 完整的reducer函数可以作为slice.reducer使用
- createSlice通过将slice的name字段与reducer函数的名称结合 生成action type字符串
- 默认情况下 action creator接收一个参数 并将其作为action.payload放入action对象
- note 只能在Redux Toolkit的createSlice和createReducer中编写突变mutation逻辑
>creatAsyncThunk
- 该函数接收两个参数
 1.一个字符串 用作生成的action types的前缀
 2.一个payload creator回调函数 应该返回一个Promise 这通常使用async/await语法编写 因为async函数会自动返回一个Promise
- 该函数接收一个叫extraReducers的选项 可以让同一个slice reducer监听其他action types
- 这个字段应该是一个带有builder参数的回调函数 可以调用builder.addCase(actionCreator,caseReducer)来监听其他actions

### reducers只能复制原始值 然后改变副本


React-router-dom
>React路由使用基本
1.安装包 npm i react-router-dom@5.3.0 这个包提供三个核心组件 HashRouter Route Link
2.导入包 并使用 import {HashRouter,Route,Link} from 'react-router-dom' 用HashRouter包裹整个应用 一个项目中只会有一个Router
3.使用Link指定导航链接 用Route指定路由规则(哪个路径展示哪个组件)
>React路由三大对象 Router Link Route
>Router组件 包裹整个应用 一个React应用只需要使用一次
 - 两种常见路由
 1.HashRouter:hash模式
 - 使用url的hash 监听window的hashchange事件实现
 2.BrowserRouter:history模式(推荐使用)
 - 使用h5的history.pushState()API 监听window的popstate实现
>Link或NavLink 最终会渲染成a标签 用于指定路由导航
 1.Link组件
 -to属性 将来会渲染成a标签的href属性
 -Link组件无法展示哪个link处于选中的效果
 2.NavLink 一个更特殊的Link组件 可以用于指定当前导航高亮
 -to属性 用于指定地址 会渲染成a标签的href属性
 -activeClassName 用于指定高亮的类名 默认active 一般不去修改
 -exact 精确匹配 表示必须地址栏和to的属性值 精确匹配类名才生效
>Route 决定路由匹配规则
 -格式 <Route path='/xx/xx' component={组件}></Route>
 -匹配规则
  -名词规定
  1.path:Route组件中path属性的值
  2.pathname:Link组件中to的属性值 地址栏中的地址
  -模糊匹配规则
  1.只要pathname以path开头就算匹配成功
  2.匹配成功就加载对应组件
  3.整个匹配过程是逐一匹配 一个匹配成功 不会停止匹配
  -模糊与精确匹配
  -默认模糊匹配 补充exact可以设置为精确匹配
>Switch与404
 - 用Switch组件包裹多个Route组件
 - 在Switch组件下 不管有多少个Route的路由规则匹配成功 都只会渲染第一个匹配的组件
 404
 -不设置path属性 将404页对应的路由放在switch内部的最后位置

### declare module语法
https://pangyu_yanyan.gitee.io/know/qa/detail/ts_declare_module.html


### hook工作原理
>Fiber上的hook
- Fiber节点中有两个相关属性
1.type 指向Component 可能是函数组件/类组件 对于函数组件 就是一个具体的render函数
2.memorizedState 指向自身状态 
- 在Class Fiber下是构造函数声明的state
- 在Function Fiber下是一个Hook池
- Hook池中维护着组件调用useXXX产生的所有Hook
- Hook中又分别记着各自的状态 这样实现了Hook和Fiber的绑定
> Hook池与Fiber绑定的意义
- 当某个Function Component的Fiber开始render 它能根据状态池定位到上一次render的Hook状态
- 为本地render执行的所有useXXX提供行为依据 一次性函数就有了延续的状态
>任意一个Function Component Fiber更新时都会走到renderWithHooks方法




https://zhuanlan.zhihu.com/p/567534059




### useMemo useCallback
使用场景
1.缓存useEffect的引用类型依赖
2.缓存子组件props中的引用类型

> 缓存子组件props中的引用类型
- 防止组件非必要的重新渲染造成的性能消耗
>组件重新渲染的情况
1.组件的props或state变化
2.父组件的重新渲染会引起子组件的重新渲染
>优化的目的
- 在父组件中跟子组件中没有关系的状态比昂导致的重新渲染可以不渲染子组件 造成不必要的浪费

### useContext
>useContext作用
1.帮助跨越组件层级直接传递变量 实现数据共享
2.对它所包含的组件树提供全局共享数据的一种技术
>使用context
1.引入React内置的React Context API
2.创建provider
3.创建consumer 使用hook可以不用创建consumer
>
- useContext()钩子函数用来引入Context对象
- useContext的参数必须是context对象本身
- useContext()与createContext()函数配套使用

- useContext(MyContext)相当于class组件中的static contextType = MyContext/<MyContext.Consumer>
- useContext(MyContext)只是让能够读取context的值以及订阅context的变化
仍然需要在上层组件树中使用<MyContext.Provider>为下层组件提供context

useCallback
- 返回一个memorized回调函数
- 把内联回调函数及依赖项数组作为参数传入useCallback
它将返回该回调函数的memoized版本
该回调函数仅在某个依赖项改变时才会更新
- useCallback(fn,deps)相当于useMemo(()=>fn,deps)
- 依赖项不会作为参数传递给回调函数
>作用
1.配合memo用于优化子组件的渲染次数
>useCallback依赖的第二个参数为一个空的数组
- 即这个方法没有依赖值 将不会被更新
>useCallback要配合子组件的shouldComponentUpdate或React.memo一起使用 否则就是反向优化


useMemo
- 返回一个memorized值
- 把创建函数和依赖项数组作为参数传入useMemo它仅会在某个依赖项改变时才重新计算memoized值
这种优化有助于避免每次渲染时都进行高开销的计算
- 传入useMemo的函数会在渲染期间执行 不要在这个函数内部执行不应该在渲染期间内执行的操作
- 如果没有提供依赖项数组 useMemo在每次渲染时都会计算新的值
>作用
1.优化针对于当前组件高开销的计算 具有记忆功能
- 可以把一些昂贵的计算逻辑放到useMemo中 只有当依赖值发生改变时才去更新

useMemo&useCallback
- 这两个钩子都会在组件第一次渲染时执行
之后会在其依赖的变量发生改变时再次执行
并且两个hook都返回缓存的值
useMemo返回缓存的变量
useCallback返回缓存的函数
- useCallback缓存函数 useMemo缓存函数的返回值 用来优化子组件 防止子组件重复渲染
- useMemo 可以优化当前组件也可以优化子组件
优化当前组件主要是通过memoize将一些复杂的计算逻辑进行缓存 如果只是一些简单的计算没必要使用useMemo
- 本质上 useMemo和useCallback都是用来帮助 优化 重新渲染 的工具 它们通过以下两种方式实现优化的效果
1.减少在一次渲染中需要完成的工作量
2.减少一个组件需要重新渲染的次数

memo&useMemo
>React.memo是一个高阶组件
- 如果组件在给定相同的props情况下呈现相同的结果 可以将它包装在对React.memo的调用中
以便在某些情况下通过记住结果来提高性能 这意味着React将跳过渲染组件 并重用上次渲染的结果
- React.memo只检查prop的变化 如果用React.memo包装的函数组件中实现的有useState useReducer hook
当状态或上下文发生变化时 它仍然会重新呈现
- 默认情况下 它只会浅比较props对象中的复杂对象 如果要控制比较 可以提供自定义比较函数作为第二个参数

useRef
- useRef返回一个可变的ref对象 其.current属性被初始化为传入的参数initialValue
返回的ref对象在组件的整个生命周期内保持不变
- 本质上 useRef就像是在其.current属性中保存一个可变值的盒子	
- 返回一个生命周期内不会改变指向的对象 类似类组件的实例属性 useRef不会触发组件的重新渲染


useLayoutEffect
- 函数签名与useEffect相同 它会在所有的DOM变更之后同步调用effect
-


render需要满足的条件
- React创建Fiber树时 每个组件对应的fiber都是通过以下两个逻辑之一创建的
1.render 即调用render函数 根据返回的JSX创建新的fiber
2.bailout 即满足一定条件时 React判断组件在更新前后没有发生变化 则服用该组件在上一次更新的fiber作为本次更新的fiber


组件render会返回JSX JSX是React.createElement的语法糖
render的返回结果实际上是React.createElement的执行结果 即一个包含props属性的对象

react触发render https://juejin.cn/post/6886766652667461646


react render的原理和触发时机
1.原理
- 类组件和函数组件中 render函数的形式是不同的
类组件中render函数指的是render方法 函数组件中 指的是整个函数组件
- 在render函数中的jsx语句会被编译成js代码
- 在render过程中 React将新调用的render函数返回的树与旧版本的树进行比较 这一句是决定如何更新DOM的必要步骤
然后进行diff比较 更新dom树
2.执行时机
3.总结
 1.React中 类组件只要执行了setState方法 就一定会触发render函数执行
函数组件使用useState更改状态不一定导致重新render

react render则fiber一定绕不过去


JS单线程 避免一个进程卡死CPU 影响用户体验
前端框架 对此问题有三个解决方向
1.优化每个任务 挤压CPU运算量
- Vue选择的是此种 使用模板让它有很多优化空间 配合响应式机制可以让Vue更精确的进行节点更新
- 模板对于JSX缺点是不灵活 优点是利于优化 如在模板中v-if节点 只有存在不存在两种状态
并且只依赖于v-if里面写的表达式 v-for是循环 只有表达式里的变量变化才会变 vue2.x setter getter 
- jsx其实就是js 可以随便写 对代码的预分析非常困难
2.快速响应用户 让用户觉得够快 不能阻塞用户交互
- React选择的此种 
- React会递归比对VirtualDOM树 找出需要变动的节点 然后同步更新它们 这个过程React称为Reconcilation协调
在Reconcilation期间 React会霸占浏览器资源 一则导致用户触发的事件得不到相应 二则导致掉帧使得用户感知
- React的Reconcilation是CPU密集型的操作 相当于长进程 不能让长进程长期霸占资源
React通过Fiber架构 让自己的Reconcilation过程变得可被中断 适时让出CPU执行权 让浏览器及时响应用户交互
给浏览器一些喘息机会 它会对代码进行编译优化 JIT及进行热代码优化 或对reflow进行修正
3.尝试Worker多线程

Fiber 协程 纤维
1.一种流程控制原语
协程和线程不一样 协程本身没有并发或并行的能力(需要配合线程) 只是一种控制流程的让出机制
React Fiber的思想和协程的概念是契合的
React渲染的过程可以被中断 可以将控制权交回浏览器 让位给高优先级的任务 浏览器空闲后再恢复渲染
2.一个执行单元
一种数据结构或者说执行单元 将它视为一个执行单元 每次执行完一个执行单元 React会检查现在还剩多少时间 
没有时间就将控制权让出去

React的Fiber改造
- 每次渲染有两个阶段 
1.Reconciliation(协调阶段) 
- 可以认为是diff阶段 这个阶段可以被中断 这个阶段会找出所有节点变更
因为协调阶段可能被中断 恢复甚至重做 React协调阶段的生命周期钩子可能会被调用多次
2.Commit(提交阶段)
- 将上一个阶段计算出来的需要处理的副作用Effects一次性执行 这个阶段必须同步执行 不能被打断

React渲染流程
- 知道React的内部运行机制 实际上就是要探索React如何将组件映射UI
以及组件中的状态发生变化后 React如何将这些变化更新到屏幕上
- 首次渲染 React的主要功能就是将React.render接收到的VNode转化为Fiber树 
并根据Fiber树的层级管理 构建生成DOM树并渲染至屏幕中
- 更新渲染时 Fiber树已经存在于内存里 所以React更关心的是计算出Fiber树中各个节点的差异
并将变化更新到屏幕中

render需要满足的条件
React创建Fiber树时 每个组件对应的fiber都是通过如下两个逻辑之一创建的
1.render 即调用render函数 根据返回的JSX创建新的fiber
2.bailout 即满足一定条件时 React判断该组件在更新前后没有发生变化 则复用该组件在上一次更新的fiber作为本次更新的fiber
当命中bailout逻辑时 是不会调用render函数的

bailout逻辑进入 需要同时满足以下4个条件
1.oldProps === new Props
- 如果使用了PureComponent或Memo 那么在判断是进入render还是bailout时不会判断oldProps是否与newProps全等
而是对props内每个属性进行浅比较
2.context没有变化
- 即context的value没有变化
3.workInProgress.type === current.type
- 更新前后fiber.type是否变化 比如div是否变为p
4.!includesSomeLane(renderLanes,updateLanes)
- 当前fiber上是否存在更新 如果存在 那么更新的优先级是否和本次整棵fiber树调度的优先级一只





react中新增的reportWebVitals.js文件
- 这个webVital是Google提出的 检测用户体验的标准 
这些指标包含三个关键指标(CLS FID LCP)
和两个辅助指标(FCP,TTFB)
> LCP Largest Contentful Paint 最大内容渲染时间
> FID First Input 首次输入延迟
> CLS Cumulative Layout Shift 累计布局偏移
> FCP First Contentful Paint 首次内容绘制
> TTFB Time to First Byte 首字节到达的时间点




React应用宏观包结构
>基础包结构
1.react
- react基础包 只提供定义react组件(ReactElement)的必要函数 一般来说需要和渲染器(react-dom react-native)一同使用
在编写react应用的代码时 大部分都是调用此包的API
2.react-dom
- react渲染器之一 是react与web平台连接的桥梁(可以在浏览器和nodejs环境中使用)将react-reconciler中的运行结果输出到
web界面上 编写react应用的代码时 大多场景下 能用到此包的就是一个入口函数
ReactDOM.render(<App/>,document.getElementByID('root')) 其余使用的api 基本是react包提供的
3.react-reconciler
- react得以运行的核心包(综合协调react-dom react scheduler各包之间的调用与配合)
管理react应用状态的输入和结果的输出 将输入信号最终转换为输出信号传递给渲染器
 1.接受输入(scheduleUpdateOnFiber)将fiber树生成逻辑封装到一个回调函数中(涉及fiber树形结构 fiber.updateQueue队列调和算法)
 2.把此回调函数(performSyncWorkOnRoot或performConcurrentWorkOnRoot)送入scheduler进行调度
 3.scheduler会控制回调函数执行的时机 回调函数执行完后得到全新的fiber树
 4.再调用渲染器(如react-dom react-native等)将fiber树形结构最终反映到界面上
4.scheduler
- 调度机制的核心实现 控制由react-reconciler送入的回调函数的执行时机
在concurrent模式下可以实现任务分片 在编写react应用的代码时 同样几乎不会直接用到此包提供的api
 - 核心任务就是执行回调(回调函数由react-reconciler提供)
 - 通过控制回调函数的执行机制 达到任务分片的目的 实现可中断渲染(concurrent模式下才有此特性)



> 宏观总览
- 架构分层
- 为了便于理解 可将react应用整体结构分为接口层api和内核层core2个部分
1.接口层api
- react包 平时在开发过程中使用的绝大部分api均来自此包(不是所有)
在react启动之后 正常可以改变渲染的基本操作有3个
 1.class组件中使用setState()
 2.function组件中使用Hook 并发起dispatchAction去改变hook对象
 3.改变context(其实也需要setState或dispatchAction的辅助才能改变)
- 以上setState和dispatchAction都由react包直接暴露 所以想要react工作 基本上是调用react包的api与其他包交互
2.内核层core
- 整个内核部分 由3个部分组成
 1.调度器scheduler包 核心职责只有1个 就是执行回调
 - 把react-reconciler提供的回调函数 包装到一个任务对象中
 - 在内部维护一个任务队列 优先级高的排在最前面
 - 循环消费任务队列 直到队列清空
 2.构造器react-reconciler包 有3个核心职责
  1.装载渲染器 渲染器必须实现HostConfig协议(如react-dom) 保证在需要的时候 能够正常调用渲染器的API 生成实际节点(如dom节点)
  2.接收react-dom包(初次render)和react包(后续更新setState)发起的更新请求
  3.将fiber树的构造过程包装在一个回调函数中 并将此回调函数传入到scheduler包等待调度
 3.渲染器react-dom包 有2个核心职责
  1.引导react应用的启动(通过ReactDOM.render)
  2.实现HostConfig 能够将react-reconciler包构造出来的fiber树表现出来 生成dom节点(浏览器中) 生成字符串ssr


> React工作循环
- 两大循环 分别位于sheduler和react-reconciler
1.任务调度循环 scheduler调度机制
- 源码位于Scheduler.js 是react应用得以运行的保证 需要循环调用 控制所有任务的调度
2.fiber构造循环 fiber树构造
- 源码位于ReactFiberWorkLoop.js 控制fiber树的构造 整个过程是一个深度优先遍历
>主干逻辑
- 两大循环的分工可以总结为
- react运行的主干逻辑 即将输入转换为输出的核心步骤 实际上就是围绕这两大工作循环进行展开
1.大循环(任务调度循环) 
- 负责调度task
2.小循环(fiber构造循环)
- 负责实现task

> react运行的主干逻辑
1.输入 将每一次更新(如 新增 删除 修改节点之后)视为一次更新需求(目的是要更新DOM节点)
2.注册调度任务 react-reconciler收到更新需求之后 并不会立即构造fiber树
而是去调度中心schduler注册一个新任务task 即把更新需求转换为一个task
3.执行调度任务(输出) 调度中心scheduler通过任务调度循环来执行task(task的执行过程又回到react-reconciler包中)
 - fiber构造循环时task的实现环节之一 循环完成之后会构造出最新的fiber树
 - commitRoot是task的实现环节之二 把最新的fiber树最终渲染到页面上 task完成


### react应用中的高频对象
>react包
- 此包定义react组件(ReactElement)的必要函数 提供一些操作ReactElement对象的api
>ReactElement对象
- 其type定义在shared包中
- 所有采用jsx语法书写的节点 都会被编译器转换 最终以React.createElement()的方式 创建出来一个与之对应的ReactElement对象
>ReactComponent对象
- 对于ReactElement来讲 ReactComponent仅仅是诸多type类型中的一种
>function类型和class类型的组件一样 是诸多ReactElement形式中的一种
>Fiber对象
- 一个Fiber对象代表一个即将渲染或者已经渲染的组件(ReactElement) 
- 一个组件可能对应两个Fiber(current和WorkInProgress)





### Redux
- Store收到Action后 必须给出一个新的state 这样view才会发生变化 这种state的计算过程就叫reducer
- reducer是一个函数 它接受action和当前state作为参数 返回一个新的state
- reducer函数不用手动调用 store.dispatch方法会触发Reducer的自动执行
- 为此store需要知道reducer函数 做法就是在生成store时 将reducer穿入createStore方法
- 这个函数之所以叫reducer 是因为它可以作为数组的reduce方法的参数 
- 数组reduce方法接受Reducer函数作为参数 可以直接得到最终的状态
- Reducer函数最重要的特征是 它是一个纯函数 即相同的输入 必然得到相同的输出
- 因为Reducer是纯函数 可以保证相同的State 必然得到相同的View 因此Reducer函数不能改变State必须返回一个全新的对象
>Reducer的拆分
- Reducer函数负责生成State
- 由于整个应用只有一个State对象 包含所有数据 对于大型应用来说 这个State十分庞大 导致Reducer函数也十分庞大
- 这种拆分与React应用的结构相吻合 一个React根组件由很多子组件构成 子组件与子Reducer完全可以对应
- Redux提供一个combineReducers方法
- 该函数会产生一个整体的Reducer函数 该函数 根据state的key执行相应的子reducer 并将返回结果合并成一个大的state对象
### Redux Toolkit
- Redux Toolkit简化了编写Redux逻辑和设置store的过程 
- Redux Toolkit允许在reducers中编写mutating逻辑
- 实际上并没有改变state 因为使用的是Immer库 检测到草稿state的变化并产生一个新的
- Redux Toolkit是官方推荐的编写Redux逻辑的方法
- 该@reduxjs/tookit包包裹着核心redux包
- 官方创建Redux Toolkit消除手写Redux逻辑中的样板 防止常见错误 并提供简化标准Redux任务的API
### Redux Toolkit两个关键API
> createSlice
- 允许编写使用Immer库的化简器 以便使用变异的JS语法 编写不可变更新 
- 为每个reducer自动生成action creator函数
- 并根据reducer的名称在内部生成action类型字符串
> configureStore
- 使用单个函数调用设置一个配置良好的Redux存储 包括组合reducer 添加thunk中间件以及设置Redux Devtools继承 
- 因为采用命名选项参数 所以更容易配置createStore
###React Redux
- Redux官方React UI绑定库 使React组件能够从Redux store中读取到数据 可以通过dispatch actions更新store中的state
>API
1.Provider
- 使得Redux store能够在应用的其他地方使用
2.Hooks
- React Redux提供一对自定义的React hooks使得React组件能够与Redux store通信
1.useSelector
- 从store state中读取一个值 并且可以订阅和更新
2.useDispatch
- 返回store中的dispatch方法可以去dispatch actions
> Redux Slice
- slice是应用中单个功能的Redux reducer逻辑和action的集合  通常一起定义在一个文件中
- 该名称来自于将根Redux状态对象拆分为多个状态slice
>createSlice
- Redux Toolkit有一个名为createSlice的函数 负责生成action类型字符串 action creator函数和action对象的工作




状态管理
Redux&Mobx
1.统一维护管理应用状态
2.某一状态只有一个可信数据来源(通常命名为store 指状态容器)
3.操作更新状态方式统一 并且可控(通常以action方式提供更新状态的途径)
4.支持将store与React组件连接，如react-redux mobx-react
通常使用状态管理库后 将React组件从业务上划分为两类
 1.容器组件(Container Components)：负责处理具体业务和状态数据，将业务或状态处理函数传入展示型组件
 2.展示性组件(Presentation Components)：负责展示视图，视图交互回调内调用传入的处理函数

Mobx和Redux都是JS应用状态管理库 都适用于React Angular VueJS等框架或库 而不是局限于某一特定UI库

Mobx
Mobx是一个透明函数响应式编程(Transparently Functional Reactive Programming TFRP)的状态管理库 使状态管理简单可伸缩
1.Action：定义改变状态的动作函数 包括如何变更状态
2.Store:集中管理模块状态(State)和动作（action）
3.Derivation(衍生)：从应用状态中派生而出，且没有任何其他影响的数据，称为derivation(衍生)
衍生在以下情况下存在
 1.用户界面
 2.衍生数据
  1.Computed Values(计算值)：计算值总是可以使用纯函数(pure function)从当前可观察状态中获取
  2.Reactions(反应)：反应指状态变更时需要自动发生的副作用，这种情况下需要实现其读写操作

1.函数式和面向对象
Redux更多的是遵循函数式编程(Functional Programming,FP)思想，而Mobx更多是从面向对象角度考虑
Redux提倡编写函数式代码 如reducer就是一个纯函数 
Mobx设计更多偏向于面向对象编程(OOP)和响应式编程(Reactive Programming)
通常将状态包转成可观察对象 就可以使用可观察对象的所有能力 一旦状态对象变更 就能自动获得更新
2.单一store和多store
store是应用管理数据的地方 在Redux应用中 总是将所有共享的应用数据集中在一个大的store中
Mobx通常按模块将应用状态划分 在多个独立的store中管理
3.Javascript对象和可观察对象
Redux默认以JS原生对象形式存储数据 而Mobx使用可观察对象
 1.Redux需要手动追踪所有状态对象的变更
 2.Mobx中可以监听可观察对象，当其变更时将自动触发监听
4.不可变(Immutable)和可变(Mutable)
Redux状态对象通常是不可变的(Immutable)
Mobx可以直接使用新值更新状态对象
5.mobx-react和react-redux
- 使用Redux和React应用连接时 需要使用react-redux提供的Provider和connect
 1.Provider：负责将Store注入React应用
 2.connect：负责将store state注入容器组件 并选择特定状态作为容器组件props传递






1.判断一个div是否在视图中
getBoundingClientRect()
用法:元素对象.getBoundingClientRect()
例子:div.getBoundingClientRect()
- 该方法返回的是矩形的集合 表示了当前盒子在浏览器中的位置以及自身占据的空间的大小
除了width和height之外 其他属性是相对于视图窗口的左上角来计算的
- bottom是盒子底部边框距离视口顶部的位置
- right是盒子右侧边框距离视图左侧的距离
2.node程序中断如何重新启用
- nodemon
nodemon是一个基于Node.js开发的第三方命令行工具 使用时需要独立安装
启动方法:nodemon app.js
只要是通过 nodemon app.js启动的服务 它会监视你的文件变化 当文件发生变化时 自动帮助重启服务器
- 添加auto.js
https://www.cnblogs.com/lliule/p/7943365.html
3.一键换肤
 1.CSS样式覆盖实现
 -通过切换css选择器的方式实现主题样式的切换
  1.在组件中保留不变的样式，将需要变化的样式进行抽离
  2.提供多种样式，给不同的主题定义一个对应的CSS选择器
  3.根据不同主题设置不同的样式
 2.实现多套CSS主题样式
  1.实现多套CSS主题样式，根据用户切换操作，通过link标签动态加载不同的主题样式，主要解决了多个主题色被编译到一个文件中导致单个文件过大
 3.CSS变量实现
  1.通过body.style.setProperty(key,value)动态修改body上的CSS变量，使得页面上的其他部分可以应用最新的CSS变量对应的样式
4.koa中间件 compose
普通函数
在函数式编程中有一个重要的概念是函数组合
实际上就是把处理数据的函数像管道一样连接起来 然后让数据穿过管道得到最终的结果
多层函数嵌套的运行结果 即把前一个函数的运行结果赋值给后一个函数
如果需要嵌套多层函数 类似f(g(h(x)))的写法可读性太差 compose()函数实现(f,g,h)(x)这种简单的形式
>compose函数的概念
- 概念：将需要嵌套执行的函数扁平化处理 嵌套执行指的是 一个函数的返回值作为另一个函数的参数
- 作用：实现函数式编程中的pointfree风格(无参数)，使我们专注于【转换】而不是【数据】
- 实现：接收多个函数作为参数，从右到左，一个函数的输入为另一个函数的输出
- 意义：编程更精炼 算法更清晰 无参数干扰
- 威力：【任意组合】
- 缺点：不能直观看到参数

5.webpack针对一些图片资源加载 错误加载应对
6.v-model父子组件传参实现
7.为什么要使用node中间层
8.webpack实现一个插件
9.react实现vue中的keep-alive功能
10.vue函数式组件调用 挂载方式
11.css变量引入 vue 模块化引入
12.预编译器 saas classnames



this在任何情况下都不指向函数的词法作用域

>this的定义
1.this是在运行时绑定的 不是在编写时绑定
2.this的绑定与函数的声明和位置没有任何关系
3.函数在调用时，会创建一个执行上下文，this就是这个执行上下文中的一个属性，
在函数执行的时候可以用到this。所以this是在函数调用时确定绑定关系的，也就是运行时
4.this就是一个对象，this是在函数被调用时发生的绑定，它指向什么完全取决于函数在哪里被调用

>this绑定规则
- this永远指向最后调用它的那个对象
- 有些情况下，函数的调用位置可以直接观察出来，
但是有些情况稍显复杂，就需要借助调用栈来分析出函数的实际调用位置
- 可以通过浏览器来查看调用栈，调用栈相当于函数的调用链，和作用域链
1.默认绑定 默认绑定规则下的this指向全局对象
当函数不带任何修饰进行调用时，此时this的绑定就是默认绑定规则，this指向全局对象
- let变量声明不会绑定在window上面，只有var声明的才会
- 严格模式下 this的绑定与函数调用位置无关
2.隐式绑定
- 隐式绑定规则中，谁调用了函数，this就绑定谁
- 隐式绑定中this丢失 定时器是比较常见的场景
setTimeout(obj.foo,100)
3.显式绑定
- apply
- call
- bind
4.new绑定 使用new关键字绑定到当前函数对象



改变this的指向
1.使用ES6的箭头函数
- 箭头函数的this始终指向函数定义时的this 而非执行时
- 箭头函数没有this绑定 必须通过查找作用域链来决定其值
如果箭头函数被非箭头函数包含 则this绑定的最近一层非箭头函数的this
否则this为undefined
2.在函数内部使用_this=this
3.使用apply call bind
>apply方法
- 调用一个函数，其具有一个指定的this值，以及作为一个数组(或类似数组的对象)提供的参数
- fun.apply(thisArg,[argsArray])
- thisArg
在fun函数运行时指定的this值，指定的this值并不一定是该函数执行时真正的this值
如果这个函数处于非严格模式下 则指定为null或undefined时会自动指向全局对象(浏览器中就是window对象)
同时值为原始值(数字，字符串，布尔值)的this会指向该原始值的自动包装对象
-argsArray
一个数组或类数组对象，其中的数组元素将作为单独的参数传给fun函数
如果该参数的值为null或undefined 则表示不需要传入任何参数
>call方法
- fun.call(thisArg[,arg1[,args[,...]]])
- apply和call的区别是call方法接受的是若干个参数列表 而apply接收的是一个包含多个参数的数组
>bind方法
- bind方法创建一个新的函数，当被调用时，将其this关键字设置为提供的值
在调用新函数时在任何提供之前提供一个给定的参数序列
bind是创建一个新的函数 必须要手动调用
4.new实例化一个对象


>函数调用的方法
1.作为一个函数调用
- 一个最简单的函数 不属于任何一个对象 就是一个函数
这样的情况在JS浏览器中非严格模式默认是属于全局对象window的
严格模式 就是undefined
但是是一个全局函数 很容易产生命名冲突 
2.函数作为方法调用
- 更多的情况是将函数作为对象的方法使用
3.使用构造函数调用函数
- 如果函数调用前使用了new关键字 则是调用了构造函数
这看起来就像创建了新的函数 实际上JS函数是重新创建的对象
```
//构造函数
function myFunction(arg1,arg2){
	this.firstName = arg1;
	this.lastName = arg2;
}
var a = new myFunction('LI','LI')
a.lastName
```
4.作为函数方法调用函数(call,apply)
- 在JS中 函数是对象
- JS函数有它的属性和方法
- call()和apply()是预定义的函数方法 两个方法可用于调用函数
两个方法的第一个参数必须是对象本身
- 在JS严格模式下 在调用函数时第一个参数会成为this的值 即使该参数不是一个对象
- 在JS非严格模式下 如果第一个参数的值是null或undefined 它将使用全局对象替代

new的过程
1.创建一个空对象obj
2.将新创建的空对象的隐式原型指向其构造函数的显示原型
3.使用call改变this的指向
4.如果无返回值或返回一个非对象值，则将obj返回作为新对象
如果返回值是一个新对象的话那么直接返回该对象


JS中的new
1.new通过构造函数Test创建出来的实例可以访问到构造函数中的属性
2.new通过构造函数Test创建出来的实例可以访问到构造函数原型链中的属性
通过new操作符 实例与构造函数通过原型链连接起来
3.构造函数如果返回原始值，那么这个返回值毫无意义
4.构造函数如果返回值为对象，那么这个返回值会被正常使用
- 构造函数尽量不要返回值 返回原始值不会生效 返回对象会导致new操作符没有作用

new操作符的几个作用
1.new操作符会返回一个对象，所以需要在内部创建一个对象
2.这个对象，也就是构造函数中的this，可以访问到挂载在this上的任意属性
3.这个对象可以访问到构造函数原型上的属性，所以需要将对象与构造函数链接起来
4.返回原始值需要忽略，返回对象需要正常处理

1.function xxx语法可以看成new Function的等价形式
2.用户自定义的函数通常既可以作为普通函数使用
又可以作为构造函数来制造对象
ES6新增的class语法定义的函数只能作为构造函数
ES6新增的=>语法定义的箭头函数只能作为普通函数

_proto_ prototype 原型 原型链
>_proto
- 每个JS对象一定对应一个原型对象，并从原型对象继承属性和方法
- 对象_proto_属性的值就是它所对应的原型对象
>prototype
- 只有函数才有prototype属性
- 当你创建函数时，JS会为这个函数自动添加prototype属性，值是一个有constructor属性的对象
- 一旦把这个函数当作构造函数(constructor)调用(即通过new关键字调用)
JS就会帮你创建该构造函数的实例 实例继承构造函数prototype的所有属性和方法
实例通过设置自己的_proto_指向构造函数的prototype来实现这种继承
```
function a(){}//构造函数a可以通过prototype来存储要共享的属性和方法
var b = new a()//b是实例对象
b.__proto__ === a.prototype//对象通过__proto__指向自己的构造函数prototype
```
- JS是单继承的，Object.prototype是原型链的顶端，所有对象从它继承了包括toString等方法和属性

引用类型的四个规则
1.引用类型，都具有对象特性，即可自由扩展属性
2.引用类型，都有一个隐式原型__proto__属性，属性值是一个普通的对象
3.引用类型，隐式原型__proto__的属性值指向它的构造函数的显式原型prototype属性值
4.试图找到一个对象的某个属性时，如果这个对象本身没有这个属性
它回去它的__proto__也就是它的构造函数的显式原型prototype中寻找

引用类型
Object Array Function Date RegExp

instanceof运算符
用于测试构造函数的prototype属性是否出现在对象原型链的任何位置		

Object.__proto__ === Function.prototype
Function.prototype.__proto__ === Object.prototype
Object.prototype.__proto__ === null

函数
1.构造函数(首字母大写)
创建类的Function叫做构造函数(通常面向对象)
2.普通函数(首字母小写)
创建动作类的Function叫做普通函数(通常面向过程)

call方法是存在于Function中的

所有构造函数都是Function的实例 所有原型对象都是Object的实例除了Object.prototype

构造函数
- 在很多编程语言中，如Java，c++等，都存在类的概念，
类中有私有属性，私有方法等，通过类来实现面对对象的继承
但是ES5以及以前中不像这几门语言，有严格的类的概念
JS通过构造函数以及原型链实现继承

特点
1.首字母必须为大写，用来区分普通函数
2.内部使用的this对象，来指向即将要生成的实例对象
3.使用new关键字来生成实例对象
```
var obj = new Date()
//可以分解为
var obj = {}
obj.__proto__ = Date.prototype
Base.call(obj)
```

缺点
1.所有的实例对象都可以继承构造器函数中的属性和方法，但是同一个对象实例之间，无法共享属性
2.如果方法在构造函数内部，每次new一个实例对象时，都会创建内部的这些方法，
并且不同的实例对象之间，不能共享这些方法，造成资源的浪费，于是有了原型的概念


Class详解
- 基本上，ES6的class可以看作只是一个语法糖，它的绝大部分功能，ES5都能做到
新的class写法只是让对象原型的写法更加清晰，更像面向对象编程的语法
```
//ES5
function Point(x,y){
	this.x = x;
	this.y = y;
}
Point.prototype.toString = function(){
	return '('+this.x
}
//ES6
//定义类
class Point{
	constructor(x,y){
		this.x = x;
		this.y = y;
	}
	toString(){
		return '('+this.x
	}
}
```

类中的原型链关系
- 每一个对象都有__proto__属性 指向对应的构造函数的prototype属性
Class作为构造函数的语法糖，同时有prototype属性和__proto__属性 因此同时存在两条继承链
1.子类的__proto__属性，表示构造函数的继承，总是指向父类
2.子类prototype属性的__proto__属性，表示实例方法的继承，总是指向父类的prototype属性

ES5与ES6实现继承的区别
1.在ES5中，继承实质上是子类先创建属于自己的this，再将父类的方法添加到this(也就是使用Parent.apply(this)的方式)
2.ES6中，则是先创建父类的实例对象this，然后再用子类的构造函数修改this

ES6的类 完全可以看作构造函数的另一种写法
```
class Point{}
typeof Point //function
Point === Point.prototype.constructor //true
```
类的数据类型就是函数，类本身就指向构造函数
使用的时候，也是直接对类使用new命令，跟构造函数的用法完全一致
构造函数的prototype属性 在ES6的类上继续存在 类的所有方法都定义在类的prototype属性上
在类的实例上调用方法，其实就是调用原型上的方法
由于类的方法都定义在prototype对象上
所以类的新方法可以添加在prototype对象上
Object.assign()方法可以很方便的一次向类添加多个方法
```
class Point{
	constructor(){}
}
Object.assign(Point.prototype,{
	toString(){},
	toValue(){}
})
```

constructor()方法
- construcor()方法是类的默认方法，通过new命令生成对象实例时，自动调用该方法
一个类必须有constructor()方法，如果没有显式定义，一个空的constructor()方法会被默认添加
- 类必须使用new调用，否则会报错
这是它跟普通构造函数的一个主要区别
后者不用new也可以执行

类的实例
类的属性和方法，除非显式定义在其本身(即定义在this对象上)，否则都是定义在原型上(即定义在class上)
__proto__并不是语言本身的特性，这是各大厂商具体实现时添加的私有属性，
虽然目前很多现代浏览器的JS引擎中都提供了这个私有属性，但依旧不建议在生产中使用该属性，
避免对环境产生依赖。
生产环境中，我们可以使用Object.getPropertype



TS作为JS的超集 体现在两方面
1.TS为JS引入一套类型系统
2.TS支持一些非ECMAScript正式标准的语法，如装饰器

类型断言
- 类型断言就是你告诉编译器，某个值具备某种类型，有两种不同的方式可以添加类型断言
1.<string>someValue
2.someValue as string

interface和type
- 都可以用来定义一些复杂的类型结构 很多情况下可以通用
区别
1.interface创建了一种新的类型，而type仅仅是别名，是一种引用
2.如果type使用了union operator(|)操作符，则不能将type implements到class上
3.如果type使用了union(|)操作符，则不能被用于extends interface
4.type不能像interface那样合并，其在作用域内唯一







### project/inject
1. 这对选项需要一起使用 以允许一个祖先组件向其所有子孙后代注入一个依赖 不论组件层次有多深 并在上下游关系成立的时间里始终有效
2.provide和inject绑定不是可响应性的 但是如果传入一个可监听的对象 那么其对象的属性还是可响应的
3.Vuex和provide/inject最大区别是 Vuex的全局状态的每次修改是可以追踪回溯的 provide/inject中变量的修改是无法控制的
### EventBus
1.初始化
- 创建事件总线并将其导出 以便其他模块可以使用或监听它
- 可以通过两种方式处理
1.新创建一个.js文件 比如event-bus.js
import Vue from 'vue'
export const EventBus = new Vue()

1.scoped css原理
>无设置scoped
- 打包后的结果和代码一样
>设置scoped
- 打包后多了一个data-v-hash属性
- 加了scoped PostCSS给一个组件中的所有dom添加了一个独一无二的动态属性
- 给css选择器额外添加了一个对应的属性选择器来选择该组件中的dom
- 这种做法使得样式只作用与含有该属性的dom 组件内部dom 可以使得组件之间的样式不互相污染
2.>>> /deep/ ::v-deep深度选择器原理
- 希望scoped样式中的一个选择器能够选择到子组件或后代组件中的元素 可以使用深度选择器

https://zhuanlan.zhihu.com/p/72777951/
### Event Bus
- 两个页面没有任何引入和被引入关系 通信
- EventBus又称为事件总线 在Vue中可以使用EventBus来作为沟通桥梁的概念
- 就像是所有组件共用相同的事件中心 可以向该中心注册发送事件或接收事件
- 所有组件都可以上下平行的通知其他组件
1.创建事件总线并导出
import Vue from 'vue'
export const EventBus = new Vue()
2.在组件中加载 并调用同一个方法
- 主要用到的方法
//发送消息
EventBus.$emit(channel:string,callback(payload1))
//监听接收消息
EventBus.$on(channel:string,callback(payload1))
- 如果使用不善 EventBus会是一种灾难
- Vue是单页应用 如果某一个页面刷新后 与之相关的EventBus会被移除
- 业务反复操作的页面 Eventbus监听时会触发很多次
- 在Vue页面销毁时 同时移除EventBus事件监听
3.移除事件监听
import {
 eventBus
}from './event-bus.js'
EventBus.$off('aMsg',{})
- 可以使用EventBus.$off('aMsg')来移除应用内所有对此某个事件的监听
- 或者直接调用EventBus.$off()移除所有事件频道 不需要添加任何参数

### 全局EventBus
- 工作原理是发布/订阅方法 通常称为Pub/Sub

### provide&inject
- Vue在2.2.0版本中新增的API
- 这对选项需要一起使用 以允许一个祖先组件向其所有子孙后代注入一个依赖
不论组件层次有多深 并且在上下游关系成立的时间始终生效
- react createContext(Provider)&useContext
- provide和inject绑定并不是可响应的 这是刻意为之的
但是如果传入了一个可监听的对象 那么其对象的属性还是可响应的
- 慎用provide/inject
- Vuex和provide/inject最大的区别在于 Vuex中的全局状态的每次修改是可以追踪回溯的
- 而provide/inject中变量的修改时无法控制的 破坏了单向数据流原则






sourceMap
是什么
- sourceMap本质上是一个信息文件 里面存储着代码转换前后的对应位置关系
它记录着转换压缩后的代码所对应的转换前的源代码位置 是源代码和生产代码的映射
sourceMap解决了在打包过程中 代码经过压缩 去空格以及babel编译转化后
由于代码之间差异性过大 造成无法debug的问题
作用
- sourceMap构建了处理前以及处理后的代码之间的一座桥梁 方便定位生产环境中出现bug的位置
因为现在的前端开发都是模块化 组件化的方式
在上线前对js和css文件进行合并压缩容易造成混淆
对这样的线上代码进行调试 不切实际
sourceMap的作用是能够让浏览器的调试面板将生成后的代码映射到源码文件中
开发者可以在源码文件中debug
用法
- sourcemap的种类有很多




链表种类
1.单向链表
2.双向链表
3.单向循环链表
4.双向循环链表

头节点
由于链表的起始点的确认比较麻烦 因此很多链表的实现都会在链表的最前面添加一个特殊的节点 成为头节点 表示链表的头部




function和this和class





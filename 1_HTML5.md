1.项目相关，担任角色，亮点，技术栈

HTML5
1.什么是标签语义化，它的意义
    合理的标签做合适的事情
        语义化：
        1.机器在需要更少的人类干预的情况下能够研究和收集信息，让网页能被机器理解，最终让人类受益
        2.让大家直观地认识标签和属性的用途
        意义：
        1.对搜索引擎友好，有了良好的结构和语义，网内内容可以更好的被搜索引擎抓取
        2.有助于利用基于开放标准的技术
2. <!DOCTYPE html>
    作用：指示web浏览器关于页面使用那个HTML版本进行编写的指令
3.HTML5有什么新特性
    HTML的新标准
    1.语义标签化
    2.增强型表单
    3.新增视频vider和音频audio标签
    4.Canvas绘图
    5.SVG绘图
    6.地理位置
    7.拖放API
    8.Web Worker
    9.Web Storage
    10.WebSocket
4.标签分为哪几种，分别有什么特点，如何进行转换
    根据标签特性
    1.块状标签 div p h1-h6 ul li ol li header footer nav article table form
            1.默认情况下独占一行，宽度为父级的100%
            2.支持设置宽高
            3.支持上下左右的margin、padding值
    2.行内(内联)标签 a b em i  label span strong
            1.与其他元素并列在一行
            2.不支持设置宽高，宽度随内容撑开
            3.支持左右方向的margin、padding
    3.行内块状标签 img input textarea
            1.与其他元素并列在一行
            2.支持设置宽高
            3.支持上下左右的margin、padding值
    转换方法：   dispaly:block;
                dispaly:inline;
                dispaly:inline-block;  
5.两个行内块元素同行显示时，会出现3px间隙
        问题产生原因： 
            由于换行符，tab(制表符)，空格等不可见字符引起
        解决方法：
            1.删除元素之间的换行空格
            2.父元素设置:font-size:0
            设置行内元素自身的font-size的值
6.H5中websocket作用

css三列布局，中间自适应，水平方向垂直方向都说
跨域问题与解决方法
说说jsonP跨域和CORS跨域怎样实现的
http状态码
https握手过程
说说weabpack原理
weabpack常用插件有哪些
vue中用过vue.$nextTick和keep-alive吗
vue key的作用和双向数据绑定原理
vue 和 React设计模式的区别
css九宫格如何实现，说思路。
css用过哪些布局方式
rem和em区别
常用的http请求头，响应头，通用头
TCP三次握手，四次挥手过程，尽量详细
说说Virtual DOM
React diff算法
React技术栈会哪些（会hooks加分）
React生命周期都做了哪些事
React setState 是同步还是异步的
Redux流程
React hooks相关api询问
输入jingdong.com 后，会发生什么。从服务端，客户端两方面说
css三列布局，中间自适应
css清除浮动方式
BFC,IFC
html文档中head标签里有哪些标签，说说他们的作用
浏览器渲染流程
For of 和 for in 的区别，for of 和 Interator关系
React技术栈
React生命周期
React hooks 性能优化知道那些
React和Vue区别
实现一个快排
用 栈 实现 队列
情景应用题，如何实现一个 表单 现在放在页面的底部，当页面滚动到底部的时候，在网上滚动，表单跟着你的视口一起滚动
情景应用题----额，记不起来了。。。。没答上来，没明白题意，反正最后面试官说用的是Promise.race
情景应用题---扫描一个微信登陆二维码后发生了什么.
闭包是什么，做了哪些事
commonJS和ES6 Moudle区别
js继承方式有哪些，说说每一个的优缺点
前端路由
React diff算法
React hooks 如何实现一个定时器，为什么
微信小程序生命周期
weabpack热更新原理
常用到的webpack插件
什么是babel
手写一个bind，说清为什么
手写一个new，说清为什么
什么是Promise.finally，手写他
如何实现一个 对象数组，转化为一个树形结构，即Virtual Dom树怎么实现的，说思路
有哪些想问的吗
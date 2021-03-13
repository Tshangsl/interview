HTML(结构层)：定义结构
CSS(表示层):定义样式
JavaScript(行为层)：定义行为
ECMAScript

1.浏览器渲染过程
2.浏览器缓存
HTML
    1.<!DOCTYPE html>
        作用：指示web浏览器关于页面使用那个HTML版本进行编写的指令

CSS
    1.什么是标签语义化，它的意义
        合理的标签做合适的事情
        语义化：
        1.机器在需要更少的人类干预的情况下能够研究和收集信息，让网页能被机器理解，最终让人类受益
        2.让大家直观地认识标签和属性的用途
        意义：
        1.对搜索引擎友好，有了良好的结构和语义，网内内容可以更好的被搜索引擎抓取
        2.有助于利用基于开放标准的技术
    2.都有哪些标签，都是什么意思
        1.块状标签 div p h1-h6 ul li ol li header footer nav article table form
            特点：
        2.行内标签 a b em i  label span strong
            特点：
        3.行内块状标签 img input textarea
            特点：
    3.如何转换
        dispaly:block;
        dispaly:inline;
        dispaly:inline-block;
    4.display除了这几个值还有哪些
        dispaly:flex;
    5.display:none
        让元素隐藏
        display:none和visibility:hidden的区别
            1.visibility:hidden 
                将元素隐藏，空间不释放
                使用后仅仅视觉上看不见 所占据空间仍然存在
            2.display:none 
                将元素显示设为无 空间释放
                各种属性丢失
        opacity的兼容处理
            opacity:设置元素的不透明级别 0-1 完全透明->完全不透明
                IE: filter:alpha(opacity)
                Mozilla: -moz-opacity
                Safari: -khtml-opacity
        filter可以做哪些事
    6.display:flex
        项目中都有什么地方用到了flex
        除了这种方式能居中还有哪些
        响应式布局还可以怎么做
        都有哪些盒子模型
几道前端经典的面试题
    1.盒子水平垂直居中五大方案
        1.正常
        2.top:0;....
        3.css3新功能 transform:translate(-50%,-50%);
        4.flex
            display: flex; /* 设置为flex布局 */
            justify-content: center; /* 设置为水平居中 */
            align-items: center; /* 设置为垂直居中 */
        5.javascript
    2.关于CSS3中盒模型几道面试题
        标准盒模型
        怪异盒模型
        flex弹性盒模型
    3.几种经典布局方案
        左右固定 中间自适应
    4.移动端响应式开发的三大方案
        media pc端和app端应用的是一套项目
        rem pc端和移动端
        flex
        vh/vw
    5.使用css 让一个div不可视
        1.display:none;
        2.  z-index:-10s;
            position:relative;
        3.opacity:0;
        4.绝对定位移出可视区
        5.visibility:hidden;
    6.z-index工作原理 适用范围
        1.z-index一般只对定位元素有作用
        文档流
        定位
    7.对HTML5理解
        HTML5是新一代的html，与之前的版本相比，做了如下改动
        。。。
    8.如何使一个div里面的文字垂直居中，且该文字的的大小根据屏幕大小自适应
    9.单位rem 。。。
    10.两个行内块元素同行显示时，会出现3px间隙
        问题产生原因： 
            由于换行符，tab(制表符)，空格等不可见字符引起
        解决方法：
            1.删除元素之间的换行空格
            2.父元素设置:font-size:0
                设置行内元素自身的font-size的值
    11.父元素高度塌陷 清除浮动
        目的：为了解决，父元素因为子元素浮动引起的内部高度为0的问题
        解决方法：
            1. 额外标签法，在最后一个浮动标签后，新加一个标签，给其设置clear:both     
                本质:闭合浮动，让父盒子闭合出口和入口，不让子盒子出来
                优点：通俗易懂，方便
                缺点：添加无意义标签，语义化差
                不建议使用。
            2.父级添加overflow属性（父元素添加overflow:hidden）
                优点：代码简洁
                缺点：内容增多的时候容易造成不会自动换行导致内容被隐藏掉，无法显示要溢出的元素
                不推荐使用
            3.使用after伪元素清除浮动（推荐使用）
             .clearfix:after{/*伪元素是行内元素 正常浏览器清除浮动方法*/
                content: "";
                display: block;
                height: 0;
                clear:both;
                visibility: hidden;
                }
                .clearfix{
                    *zoom: 1;/*ie6清除浮动的方式 *号只有IE6-IE7执行，其他浏览器不执行*/
                }
            4.使用before和after双为元素清除浮动
        12.外边距塌陷
        13.动画transform
        14.css动画特性可以用js实现，为什么还要用css实现
            让你的页面动画在移动设备上运行的更快一些
            JavaScript效率低的两大原因：操作DOM和使用页面动画
            通常我们会通过频繁的操作 DOM的CSS来实现视觉上的动画效果
            频繁的操作DOM和CSS时，浏览器会不停的执行重排（reflow）和重绘（repaint）
            移动设备分配给浏览器(指内置浏览器)的内存可没有PC版本的浏览器内存可观
            优点:
            1. 不占用JS主线程；
　　        2. 可以利用硬件加速；
　　        3. 浏览器可对动画做优化（元素不可见时不动画，减少z             FPS--每秒传输帧数的影响）。
            缺点：浏览器对渲染的批量异步化处理让动画难以控制
        15.轮播图如何实现 js
        16.H5的新特性 CSS3
        17.rem为什么可以实现自适应布局 在不同的手机端表现是什么
        18.css选择器优先级
            !important
            内联-1000
            id-100
            class-10
            伪类/属性
            tag-1
            通配符
JS
    1.给dom元素绑定事件有哪几种方法 3

    2.数组中常用的遍历方法有哪些
    3.堆栈
    4.JS的三大事件
    5.原型链理解
        1.构造函数，原型和实例的关系
            1.1构造函数都有一个属性prototype,这个属性是一个对象(Object实例)
            1.2原型对象prototype里面有一个constructor属性，该属性指向原型对象所属的构造函数
            1.3实例对象都有一个_proto_属性，该属性也指向构造函数的原型对象，它是一个非标准属性，不可以用于编程，它是用于浏览器自己使用的
        2.prototype和_proto_的关系
            2.1prototype是构造函数的属性
            2.2_proto_是实例对象的属性
            2.3这两者都是指向同一个对象
        总结：
            1.函数也是对象，对象不一定是函数
            2.对象的本质：无序的键值对集合，键值对当中的值可以是任意数据类型的值
            3.对象就是一个容器，这个容器当中放的是(属性和方法)
        3.属性搜索
            1.在访问对象的某个成员的时候会先在对象中找是否存在
            2.如果当前对象中没有就在构造函数的原型对象中找
            3.如果原型对象中没有找到就到原型对象的原型上找
            4.直到Obeject的原型对象的原型是null为止
        Function:
            所有函数都是Function实例
            1.本地对象：独立于宿主环境(浏览器)的对象--包括Object，Array，Date，RegExp，Function，Error，Number，String，Boolean
            2.内置对象...
            3.宿主对象...
    6.js怎么实现继承
    7.闭包的理解
ES6
    1.ES6有哪些新特性
    2.const定义对象能否改变 能
    3.this的指向问题 怎么改变普通函数里面的this指向 三个有什么区别
    4.promise和async，await有什么区别
    5.let var const 区别
HTTP
    1.get和post区别
    2.三次握手，四次挥手
    3.常见状态码
    4.跨域是什么，限制了什么，不同源的化会进行什么策略




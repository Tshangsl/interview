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
    3.几种经典布局方案
        左右固定 中间自适应
    4.移动端响应式开发的三大方案
        media pc端和app端应用的是一套项目
        rem pc端和移动端
        flex
        vh/vw
    6.z-index工作原理 适用范围
        1.z-index一般只对定位元素有作用
        文档流
        定位
    8.如何使一个div里面的文字垂直居中，且该文字的的大小根据屏幕大小自适应
    9.单位rem 。。。
    
    
        15.轮播图如何实现 js
        16.H5的新特性 CSS3
        17.rem为什么可以实现自适应布局 在不同的手机端表现是什么
        
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




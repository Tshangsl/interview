HTML(结构层)：定义结构
CSS(表示层):定义样式
JavaScript(行为层)：定义行为
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


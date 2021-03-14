CSS3
1.CSS3有什么新特性
    CSS3最新的CSS标准

2.css水平垂直居中
    五种方法，前三种定位，一种flex，弹性盒子实现，一种用javascript实现。
        该方法需要知道子元素具体宽高
    1.父元素相对定位，子元素绝对定位，top:-50%,left:-50%,margin-left:-width/2,margin-top:-height/2;
        该方法需要子元素有宽高
    2.父元素相对定位，子元素绝对定位，top:0,right:0,bottom:0,left:0,margin:auto;
        该方法不需要子元素有宽高，但是不兼容
    3.父元素相对定位，子元素绝对定位，使用CSS中transform:translate(-50%,-50%)
    4.Flex 父元素display:flex; justify-content:center; align-columns:center;
    5.JavaScript
3.CSS3清除浮动方式
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
            5.给浮动元素腹肌设置高度
            6.父级同时浮动(需要给父级同级元素添加浮动)
4.css三列布局，中间自适应，水平方向垂直方向都说
    两列布局：
    BFC+float float + 负 margin flex 实现两栏布局
    三列布局
5.外边距塌陷及形成原因
    定义：也称为外边距合并，是指两个在正常流中相邻（兄弟或父子关系）的块级元素的外边距
        组合在一起变成单个外边距，不过只有上下外边距才会有塌陷，左右外边距不会出现这种问题。
        1.当上下相邻的两个块级元素相遇，上面的元素有下边距margin-bottom，下面的元素有上边距margin-top，则它们之间的垂直距离取两个值中的较大者。
            尽量只给一个盒子添加margin值
        2.对于两个嵌套关系的块元素，如果父元素没有上内边距及边框，父元素的上外边距会与子元素的上外边距发生合并，合并后的外边距为两者中的较大者。
            ①给父元素定义上边框
            ②给父元素定义上内边距
            ③给父元素添加 overflow：hidden；
            ④添加浮动
            ⑤添加绝对定位
        3.如果存在一个空的块级元素，border、padding、inline content、height、min-height都不存在，那么上下边距中间将没有任何阻隔，上下外边距将会合并。
        
    当外边距塌陷时，外边距之间的计算方式是怎样的？
        1.两个都是正数，取较大的值
        2.两个都是负数，取绝对值较大的值
        3.一正一负，取两个值得和
    原因：由块级格式上下文决定的，BFC，元素在 BFC 中会进行上下排列，然后垂直距离由 margin 决定，并且会发生重叠，具体表现为同正取最大的，同负取绝对值最大的，一正一负，相加BFC 是页面中一个独立的隔离容器，内部的子元素不会影响到外部的元素。
6.CSS动画有哪些
    animation transition transform translate 
    animation:用于设置动画属性，他是一个简写的属性，包含6个属性
    transition:用于设置元素的样式过度，和animation有着类似的效果，但细节上有很大的不同
    transform:用于元素进行旋转、缩放、移动或倾斜，和设置样式的动画并没有什么关系
    translate:translate只是transform的一个属性值，即移动，除此之外还有 scale 等
7.CSS动画特性可以用JS实现，为什么还要用CSS实现
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
8.css选择器优先级
            !important
            内联-1000
            id-100
            class-10
            伪类/属性
            tag-1
            通配符
    权重相同，写在后面的覆盖前面的
    使用 !important 达到最大优先级，都使用 !important 时，权重大的优先级高
9.rem em vw vh
10.Flex是什么,Flex是什么属性的缩写
    flex:弹性盒布局，CSS3的新属性，用于方便布局，比如垂直居中
    flex属性:flex-grow,flex-shrink,flex-basis缩写

11.使用CSS 让一个div不可视,visibility display opacity(可以设置过渡效果)区别
        1.display:none;
        2.  z-index:-10s;
            position:relative;
        3.opacity:0;
        4.绝对定位移出可视区
        5.visibility:hidden;
        visibility 设置 hidden 会隐藏元素，但是其位置还存在与页面文档流中，不会被删除，所以会触发浏览器渲染引擎的重绘
        display 设置了 none 属性会隐藏元素，且其位置也不会被保留下来，所以会触发浏览器渲染引擎的回流和重绘。
        opacity 会将元素设置为透明，但是其位置也在页面文档流中，不会被删除，所以会触发浏览器渲染引擎的重绘
12.CSS中盒模型是什么，都由什么组成，有哪几种,转换方法是什么
    定义:网页中，每一个元素都占有一定的空间 无论是div h1-h6 还是p 都可以看成是盒子
    组成:content padding border margin
    1.W3C标准盒子/内容盒子/标准模式(content-box):盒子总宽度 = width+padding+border+margin
            盒子的大小会以内容有限 自动扩展 子元素可以撑开父元素
    2.IE盒子/怪异盒模型/怪异模式(border-box):盒子总宽度 = width(包含padding和border)+margin
            一般在IE中默认为这种怪异盒模型 但由于其自身特殊性 手机页面中也有使用怪异盒模型
            怪异盒模型中，父元素的盒模型确定，子元素无法撑开父元素的盒模型 大小不能被内容所改变
    3.Flex弹性盒子
    转换:box-sizing:content-box;
        box-sizing:border-box;
        上下左右
        上下 左右
        上 左右 下
        上右下左
13.z-index
    1.没有开启定位的元素不可以使用z-index
    2.父元素的层级再高也不会盖住子元素
14.CSS的三种定位方式
     1.相对定位：
        相对自己的初始位置定位，
        原有空间不释放
        相对定位不会改变元素的性质(块(行)元素仍是块(行)元素)
        position:relative;
        left:200px;
        top:30px;
    2. 绝对定位:
        相对于最近已定位的祖先元素
        如果没有最近的定位的父元素 会相对于body
        原有空间释放
        绝对定位会改变元素的性质，行内元素会变成块级元素
    3.固定定位:
        相对于浏览器窗口偏移
        原有空间释放
        会转化成行级块
15.什么是BFC其形成条件和特性,BFC和IFC的区别，BFC会和float元素相互覆盖吗
    BFC（Block Formatting Context）格式化上下文，是 Web 页面中盒模型布局的 CSS 渲染模式，指一个独立的渲染区域或者说是一个隔离的独立容器。
    BFC 是块级格式上下文，IFC 是行内格式上下文：
    内部的 Box 会水平放置
    水平的间距由 margin，padding，border 决定
    。。。
16.position属性都有哪些特点
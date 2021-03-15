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
        1.基于float实现 使左右两个aside分别浮动到左右两侧
        2.基于position:absolute实现
        3.基于display:flex实现
        4.基于display:table实现
        5.基于display:grid实现
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
    CSS3中由三个关于动画的样式属性 
        transform transition animation
    transform：
        可以用来设置元素的形状改变
            rotate(旋转)
            scale(缩放)
            skew（扭曲）
            translate（移动）
            matrix（矩阵变形）
            none(不做变换)
            <transform-function>表示一个或多个变化函数，变化函数由函数名和参数组成，参数包含在()里面，用空格分开
    transform-origin基点
        所有的变形都是基于基点，基点默认为元素的中心法
        用法transform-origin:(x,y)
            x,y可以 百分比 rem px或
            x:left center right
            y:top center bottom
    transition：
        用来设置样式的属性值如何从一种状态变平滑过渡到另一种状态 它有四个属性值
            transition-property(变换的属性，即那种形式的变换：大小、位置、扭曲等)
            transition-duration（变换延续的时间）
            transition-timing-function（变换的速率）
            transition-delay（变换的延时）
    animation:类似于 flash 中的逐帧动画，逐帧动画就像电影的播放 一样，表现非常细腻并且有非常大的灵活性。然而transition只是指定了开始和结束态，整个动画的过程也是由特定的函数控制。
    animation-name 设置动画的名称，可以同时赋值多个动画名称，用,隔开：
    animation-duration 设置动画的持续时间，单位为s，默认值为0：
    animation-timing-function 和transition-timing-function类似：
    animation-delay 设置动画的开始时间
    animation-iteration-count 它是来设置动画循环的次数，默认为1，infinite为无限次数的循环：
    animation-direction 
    animation：
        animation-name、animation-duration、animation-timing-function、animation-delay、animation-iteration-count、animation-direction的简写
========
    transform我们可以理解为元素的几何变形，它是有规律可寻的，这种变形并不会产生动画效果仅仅是原有形状的改变；transition和animation它们很像 flash 中的补间动画和逐帧动画；transition是从一个状态变化到另外一种状态，当变化有了平滑的效果后就产生了动画，它是一个公式化的变化，在比较规则的动画效果中我们可以使用，例如：旋转的风车、行驶的汽车、颜色的渐变等等；animation的动画效果更加灵活，可以实现像影片一样的复杂无规则的动画。
========
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
9.px rem em vw vh
    1.px像素：相对长度单位，像素px是相对于显示器屏幕分辨率而言的
            利用px设置字体大小及元素狂高等比较稳定和精确,px的缺点是其不能适应浏览器缩放时产生的变化，因此一般不用于响应式网站
    2.em：相对长度单位，相对于当前对象的内文本的字体尺寸，如当前对行内字体尺寸未人为设置，则相对于浏览器的默认字体尺寸(一般16px)
        em除了可以用来指定font-size，还可以用来设置margin和padding大小
    3.rem：(font size of the root element)
        CSS3新增的一个相对单位(root em 根em)
        与em区别在于使用rem为字体设定大小时，仍然是相对大小，但相对的只是HTML根元素
    4.vh vw
        根据窗口的宽高 分成100等份 100vh代表满高
        vh 和 vw与百分比的区别
            百分比是基于父元素的设置而言的，如果父元素为100px，那么子元素100%也就是100px。而 vh 和 vw 始终是针对窗口的宽高。
10.Flex基础概念，父级容器属性，子级容器属性
    布局的传统解决方案基于盒装模型依赖display属性+position属性+float属性
    flex:弹性盒布局，CSS3的新属性，用于方便布局，比如垂直居中
    基础概念：
        1.采用Flex布局的元素，称为Flex容器(flex container)简称容器，它的所有子元素自动成为容器成员，称为Flex项目(flex item)简称项目
        2.容器默认存在两根轴：水平的主轴(main axis)和垂直的交叉轴(cross axis)，主轴的开始位置(与边框的交叉点)叫做mian start 结束位置叫做mian end 交叉轴的开始位置叫cross start 结束位置叫 cross end
        3.项目默认沿主轴排列，单个项目占据的主轴空间叫main size 占据的交叉空间叫cross size
        总结：弹性布局由父级容器，子级容器构成，通过设置主轴和交叉轴来控制子元素的排序方式
    父级容器属性:
        1.flex-direction:row|row-reverse|column|column-reverse
        该属性定义了子元素排列方向
        2.flex-wrap：**nowrap | wrap | wrap-reverse;  该属性称"轴线",该属性定义如果一条轴线排不下，如何换行。
        3.flex-flow： || ; flex-direction和flex-wrap的简写形式，默认值为row nowrap
        4.justify-content: flex-start | flex-end | center | space-between | space-around;  该属性定义了子元素在主轴上的对齐方式。
        5.align-items:  flex-start | flex-end | center | baseline | stretch;  定义项目在交叉轴上如何对齐。
        6.align-content: ** flex-start | flex-end | center | space-between | space-around | stretch; 属性定义了多根轴线的对齐方式。如果项目只有一根轴线，该属性不起作用
    子级容器属性：
        1.order属性 定义子元素或子容器的排列顺序，数值越小，排列越靠前，默认为0
        2.flex-grow属性 定义子元素或者子容器的放大比例，默认为0，即如果存在剩余空间也不放大
            如果所有项目flex-grow属性为1 它们将等分剩余空间(如果有的话)
            如果一个项目2 其他1 前者占据的剩余空间将比其他项多一倍。
        3.flex-shrink(负值对该属性无效) 定义了项目的缩小比例 默认为1 如果空间不足 该项目将缩小
            都为1，当空间不足时，都将等比例缩小
            一个项目的flex-shrink属性为0，其他项目都为1，则空间不足时，前者不缩小。
        4.flex-basis属性 定义了在分配多余空间之前，项目占据的主轴空间（main size）。浏览器根据这个属性，计算主轴是否有多余空间。它的默认值为auto，即项目的本来大小。
        5.flex属性 是flex-grow, flex-shrink 和 flex-basis的简写，默认值为0 1 auto。后两个属性可选。
            该属性有三个快捷值：auto (1 1 auto) 和 none (0 0 auto)和 initial(0 1 auto)。
            建议优先使用这个属性，而不是单独写三个分离的属性，因为浏览器会推算相关值。
        6.align-self属性 允许单个项目有与其他项目不一样的对齐方式，可覆盖align-items属性。默认值为auto，表示继承父元素的align-items属性，如果没有父元素，则等同于stretch。        
11.使用CSS 让一个div不可视,visibility display opacity(可以设置过渡效果)区别
            rgba和opacity 0-1 完全透明-完全不透明
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
        该属性只有在设置了position定位之后才会生效
    2.父元素的层级再高也不会盖住子元素
        正常情况下即使设置了子元素的z-index为负值，依然无法实现这个效果，其实这里只要将a元素的z-index设置为auto，即可实现上述效果。
    3.同级下，z-index的值越大，堆叠顺序越靠前，相同的z-index值的时候，后面的会在前面的层级之上。z-index的值是可以设置0和负数的。
    4.z-index:0和z-index:auto的区别，当一个定位元素不设置z-index的时候，默认值就是auto
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
15.Formatting context 
        定义：
        是W3C CSS2.1规范中的一个概念，它是页面中的一块渲染区域，并且有一套渲染规则，它决定了其子元素将如何定位，以及和其他元素的关系和相互作用
        包括：
            BFC
                BFC是一个独立的布局环境，其中的元素布局是不受外界的影响，并且在一个BFC中，块盒与行盒（行盒由一行中所有的内联元素所组成）都会垂直的沿着其父元素的边框排列。
                BFC(Block formatting context)直译为"块级格式化上下文"。它是一个独立的渲染区域，只有Block-level box参与， 它规定了内部的Block-level Box如何布局，并且与这个区域外部毫不相干。
                布局规则：
                    1.内部的Box会在垂直方向，一个接一个地放置。
                    2.Box垂直方向的距离由margin决定。属于同一个BFC的两个相邻Box的margin会发生重叠。
                    3.每个盒子（块盒与行盒）的margin box的左边，与包含块border box的左边相接触(对于从左往右的格式化，否则相反)。即使存在浮动也是如此。
                    4.BFC的区域不会与float box重叠。
                    5.BFC就是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素。反之也如此。
                    6.计算BFC的高度时，浮动元素也参与计算。
                如何创建：
                    float的值不是none。
                    position的值不是static或者relative。
                    display的值是inline-block、table-cell、flex、table-caption或者inline-flex
                    overflow的值不是visible
                作用：利用BFC避免margin重叠
            IFC(Inline Formatting Contexts)
                内联格式化上下文
            FFC
            GFC
16.什么是BFC，其形成条件和特性,BFC和IFC的区别，BFC会和float元素相互覆盖吗
    BFC（Block Formatting Context）格式化上下文。
    是 Web 页面中盒模型布局的 CSS 渲染模式，指一个独立的渲染区域或者说是一个隔离的独立容器。
    BFC 是块级格式上下文，IFC 是行内格式上下文：
    内部的 Box 会水平放置
    水平的间距由 margin，padding，border 决定
    。。。
17.position属性都有哪些特点
    1.inhert：规定应该从父元素继承 position 属性的值。
    2.static：默认值。没有定位，元素出现在正常的流中（忽略 top, bottom, left, right 或者 z-index 声明）。
    3.relative:生成相对定位的元素，相对于元素本身正常位置进行定位。因此，"left:20" 会向元素的 LEFT 位置添加 20 像素。
    4.absolute:生成绝对定位的元素，相对于 static 定位以外的第一个祖先元素进行定位。元素的位置通过 "left", "top", "right" 以及 "bottom" 属性进行规定。
    5.fixed:生成绝对定位的元素，相对于浏览器窗口进行定位。元素的位置通过 "left", "top", "right" 以及 "bottom" 属性进行规定。
18.CSS三种基本定位机制 普通流 浮动 绝对定位
19.CSS九宫格如何实现
20.伪类和伪类选择器

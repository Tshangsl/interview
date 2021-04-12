0.CSS CSS3是什么
    CSS: 
        层叠样式表 Cascading Style Sheets 一种用来表现HTML或XML等文件样式的计算机语言
    CSS3:
        最新的CSS标准
1.BFC(块级格式化上下文规则)和IFC(行级格式化上下文) BFC是什么 有哪几种实现方式 分别适用于哪些场景
    FC:(formatting context)
        格式化上下文
    BFC:
        BFC(Block formatting context)直译为“块级格式化上下文”，
        它是一个独立的渲染区域。
        只有Block-level box参与 
        它规定了内部的Block-level Box如何布局 
        并且和这个区域外部毫不相干
    Box：css布局基本单位
        Box是CSS布局的对象和基本单位 直观点来说 一个页面是由很多个 Box 组成的。
        元素的类型和 display 属性，决定了这个 Box 的类型。
        (不同类型的 Box， 会参与不同的 Formatting Context)(格式化上下文)
        （一个决定如何渲染文档的容器）
        因此Box内的元素会以不同的方式渲染。让我们看看有哪些盒子：
            1.block-level 
                box:display 属性为 block, list-item, table 的元素，
                    会生成 block-level box。并且参与 block fomatting context；
            2.inline-level 
                box:display 属性为 inline, inline-block, inline-table 的元素，
                    会生成 inline-level box。并且参与 inline formatting context；
            3.run-in box: css3 中才有
    Formatting Context(格式化上下文)：
        -页面中的一块渲染区域 并有一套渲染规则 
        决定了其子元素将如何定位 以及和其他元素的关系和相互作用
        是W3C CSS2.1规范中的一个概念 
        它是页面中的一块渲染区域 
        并且有一套渲染规则 
        它决定了其子元素将如何定位 
        以及和其他元素的关系和相互作用
        最常见的Formatting Context有
            1.Block Fromatting Context BFC 块级格式化上下文
                BFC是一个独立的布局环境，其中的元素布局是不受外界的影响.
                并且在一个BFC中，块盒与行盒（行盒由一行中所有的内联元素所组成）都会垂直的沿着其父元素的边框排列。
            2.Inline Formatting Context IFC 行级格式化上下文
    BFC布局规则：(BFC的区域不会和float box重叠)
        1.内部的Box会在垂直方向 一个接一个地放置
        2.Box垂直方向的距离由margin决定 属于同一个BFC的两个相邻Box的margin会发生重叠
        3.每个盒子（块盒与行盒）的margin box的左边，
            与包含块border box的左边相接触
            (对于从左往右的格式化，否则相反)。
            即使存在浮动也是如此。
        4.BFC的区域不会与float box重叠，
            计算BFC的高度时，浮动元素也参与计算
        5.BFC是页面上的一个隔离的独立容器，
            容器里面的子元素不会影响到外面的元素。
            反之也如此。
    如何创建BFC：
        1.float的值不是none。
        2.position的值不是static或者relative。
        3.display的值是inline-block、inline-flex flex table-cell、table-caption 或者
        4.overflow的值不是visible
    BFC作用：
        1.利用BFC避免margin重叠。
            根据：属于同一个BFC的两个相邻的Box会发生 触发该容器生成一个新的BFC p外面包裹一层容器 overflow:hidden
        2.自适应两栏布局
            根据：
                1.每个盒子的margin box的左边，与包含块border box的左边相接触(对于从左往右的格式化，否则相反)。即使存在浮动也是如此。
                2.BFC的区域不会与float box重叠。overflow:hidden 触发main生成BFC
                3.清除浮动……
    总结：
        BFC就是页面上的一个隔离的独立容器 容器里面的子元素不会影响到外面的元素 反之也是如此

        因为BFC内部的元素和外部的元素绝对不会互相影响，因此， 当BFC外部存在浮动时，它不应该影响BFC内部Box的布局，BFC会通过变窄，而不与浮动有重叠。
        同样的，当BFC内部有浮动时，为了不影响外部元素的布局，BFC计算高度时会包括浮动的高度。避免margin重叠也是这样的一个道理。

        当一个元素具备了触发新块格式化上下文的条件，并且挨着一个浮动元素时，它就会忽略自己的边界必须接触自己的包含块边界的规则此时这个元素会收缩到适当大小 不仅行盒子如此 所有盒子都如此
2.CSS水平垂直居中 div充满整个屏幕 css九宫格实现
    五种方法，前三种定位，一种flex，弹性盒子实现，一种用javascript实现。
        该方法需要知道子元素具体宽高
    1.父元素相对定位，子元素绝对定位，top:-50%,left:-50%,margin-left:-width/2,margin-top:-height/2;
        该方法需要子元素有宽高
    2.父元素相对定位，子元素绝对定位，top:0,right:0,bottom:0,left:0,margin:auto;
        该方法不需要子元素有宽高，但是不兼容
    3.父元素相对定位，子元素绝对定位，使用CSS中transform:translate(-50%,-50%)
    4.Flex 父元素display:flex; justify-content:center; align-columns:center;
    5.JavaScript 

    1.margin:0 相对100%
    2.margin 绝对定位 top right bottom left

    ul标签+li标签+calc函数 利用flex布局实现
    具体设置
        ul width:100% display:flex flex-wrap:wrap
        li calc(calc(100%/3)-10px) box-sizing:border-box 将content-box转化成border-box
            设置height margin border
    
3.CSS3清除浮动方式
目的：为了解决，父元素因为子元素浮动引起的内部高度为0的问题
        解决方法：
            1. 额外标签法(最后一个标签后/新加一个标签/给其设置clear:both) 不推荐使用
                在最后一个浮动标签后，新加一个标签，给其设置clear:both     
                本质:闭合浮动，让父盒子闭合出口和入口，不让子盒子出来
                优点：通俗易懂，方便
                缺点：添加无意义标签，语义化差
            2.父级添加overflow属性（父元素添加overflow:hidden）不推荐使用
                优点：代码简洁
                缺点：内容增多的时候容易造成不会自动换行导致内容被隐藏掉，无法显示要溢出的元素
                不推荐使用
            3.使用after伪元素清除浮动 推荐使用
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
            4.给浮动元素父级设置高度
            5.父级同时浮动(需要给父级同级元素添加浮动)
            6.使用before和after双伪元素清除浮动
4.css三列布局，中间自适应，水平方向垂直方向都说
    两列布局：
    BFC+float float + 负 margin flex 实现两栏布局
    左側固定，右侧自适应的几种方法
        第一类宽度已知
            1.左边浮动或者定位：右侧margin-left:宽度
            2.左右侧都浮动 左侧固定给宽度 右侧calc(100%-宽)
            3.flex布局 父级display:flex 左侧flex:0 0 200px 右侧flex：1

            3.table布局
        第二类宽度未知：
            1.BFC方法 左侧浮动 右侧overflow:hidden

            3.grid布局
    三列布局(左右两侧宽度固定 中间自适应)
        1.浮动 左右浮动 中间100% 设置margin-left margin-right
            左右两边浮动
            中间设置margin-left margin-right
        2.定位 左右两侧绝对定位 中间设置margin-left margin-right值
            左右两侧使用绝对定位，
            中间设置margin-left margin-right值
        3.flex弹性盒模型 父元素容器设置display：子级项目 flex/左右两侧 flex-basis 元素本身大小/中间flex-grow 占满剩余空间
            父元素设置为弹性盒子
            左右两侧使用flex-basis设置元素本身大小
            中间使用flex-grow:1设置占满剩余空间
            
        1.基于float实现 使左右两个aside分别浮动到左右两侧
        2.基于position:absolute实现
        3.基于display:flex实现
        4.基于display:table实现
        5.基于display:grid实现
5.外边距塌陷/外边距合并 及形成原因(由BFC决定)
    父元素(由BFC决定 定义边框/内边距/overflow:hidden/使用BFC)
    定义：也称为外边距合并
        指两个在正常流中相邻（兄弟或父子关系）的块级元素外边距
        组合在一起变成单个外边距
        1.当上下相邻的两个块级元素相遇，
            上面的元素有下边距margin-bottom，下面的元素有上边距margin-top，则它们之间的垂直距离取两个值中的较大者。
            尽量只给一个盒子添加margin值
        2.对于两个嵌套关系的块元素，如
            果父元素没有上内边距及边框，父元素的上外边距会与子元素的上外边距发生合并，合并后的外边距为两者中的较大者。
            1.给父元素定义上边框/内边距/overflow:hidden
            2.添加浮动/绝对定位/BFC
        3.如果存在一个空的块级元素，
            border、padding、inline content、height、min-height都不存在，那么上下边距中间将没有任何阻隔，上下外边距将会合并。
    当外边距塌陷时，外边距之间的计算方式是怎样的 
    由BFC决定
        1.两个都是正数，取较大的值
        2.两个都是负数，取绝对值较大的值
        3.一正一负，取两个值得和
    原因：由块级格式上下文决定的，BFC，元素在 BFC 中会进行上下排列，然后垂直距离由 margin 决定，并且会发生重叠，具体表现为同正取最大的，同负取绝对值最大的，一正一负，相加BFC 是页面中一个独立的隔离容器，内部的子元素不会影响到外部的元素。
6.CSS动画有哪些
    CSS3中由三个关于动画的样式属性 
        transform(变形) transition(过渡) animation(动画)
    transform(变形)：(不会产生动画 仅是原有形态的改变)(translate是transform一个属性)
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
    transition(过渡)：
        用来设置样式的属性值如何从一种状态变平滑过渡到另一种状态 它有四个属性值
            transition-property(变换的属性，即那种形式的变换：大小、位置、扭曲等)
            transition-duration（变换延续的时间）
            transition-timing-function（变换的速率）
            transition-delay（变换的延时）
    animation(动画):
        类似于 flash 中的逐帧动画，逐帧动画就像电影的播放 一样，表现非常细腻并且有非常大的灵活性。然而transition只是指定了开始和结束态，整个动画的过程也是由特定的函数控制。
        animation-name 设置动画的名称，可以同时赋值多个动画名称，用,隔开：
        animation-duration 设置动画的持续时间，单位为s，默认值为0：
        animation-timing-function 和transition-timing-function类似：
        animation-delay 设置动画的开始时间
        animation-iteration-count 它是来设置动画循环的次数，默认为1，infinite为无限次数的循环：
        animation-direction 
        animation：以下六个元素的简写
        animation-name、animation-duration、animation-timing-function、animation-delay、animation-iteration-count、animation-direction
    transition和animation:
        它们很像 flash 中的补间动画和逐帧动画；transition是从一个状态变化到另外一种状态，当变化有了平滑的效果后就产生了动画，它是一个公式化的变化，在比较规则的动画效果中我们可以使用，例如：旋转的风车、行驶的汽车、颜色的渐变等等；animation的动画效果更加灵活，可以实现像影片一样的复杂无规则的动画。
7.CSS动画特性可以用JS实现，为什么还要用CSS实现(页面动画在移动设备上运行更快)
        让你的页面动画在移动设备上运行的更快一些
        JavaScript效率低的两大原因：
            操作DOM和使用页面动画
            通过频繁的操作 DOM的CSS来实现视觉上的动画效果
            频繁的操作DOM和CSS时，浏览器会不停的执行重排（reflow）和重绘（repaint）
            对于pc端设备还好 移动设备分配给浏览器(指内置浏览器)的内存可没有PC版本的浏览器内存可观 会造成卡顿延迟等现象 影响用户体验
        优点:
            1. 不占用JS主线程；
　　        2. 可以利用硬件加速；
　　        3. 浏览器可对动画做优化（元素不可见时不动画，减少FPS--每秒传输帧数的影响）。
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
9.px(相对于显示器屏幕分辨率) rem em vw vh
    1.px像素：相对长度单位，像素px是相对于显示器屏幕分辨率而言的
            利用px设置字体大小及元素宽高等比较稳定和精确,
            px的缺点是其不能适应浏览器缩放时产生的变化，因此一般不用于响应式网站
    2.em：(font size of the element)
        相对长度单位，相对于当前对象的内文本的字体尺寸，如当前对行内字体尺寸未人为设置，则相对于浏览器的默认字体尺寸(一般16px)
        em除了可以用来指定font-size，还可以用来设置margin和padding大小
    3.rem：(font size of the root element)
        CSS3新增的一个相对单位(root em 根em)
        与em区别在于使用rem为字体设定大小时，仍然是相对大小，但相对的只是HTML根元素
    4.vh vw
        根据窗口的宽高 分成100等份 100vh代表满高
        vh 和 vw与百分比的区别
            百分比是基于父元素的设置而言的，如果父元素为100px，那么子元素100%也就是100px。而 vh 和 vw 始终是针对窗口的宽高。
10.rem移动端适配
    PC 端浏览器下（以谷歌浏览器为主），字体的默认大小是16px，字体最小为12px 。 
    但是在移动端下字体没有默认大小。
    iphone5下 1rem=16px
    1.获取html的宽
        let htmlwidth=document.documentElement.clientWidth || document.body.clientWidth;
        有些浏览器documentElement获取不到,那就使用后面的body
    2.获取htmlDom元素
        var docEl = doc.documentElement
        let htmlDom=document.getElementByTagName('html')[0]
    3.设置html样式/即HTML根元素的font-size
        htmlDom.style.fontSize=htmlwidth/20+'px';
        这里的20不是固定的 是把屏幕等分成20份
        Chorme浏览器字体最小只能为12px，所以这里的最后结果（document.documentElement.offsetWidth / 20 = ？）最好别小于12。
        (尝试让一个div不管在什么屏幕下都占据一半，这里使用20均分所以这里div宽度只需要定位10rem就可以在任何屏幕下都占据一半。)
    dpr：window.devicePixelRatio pixel像素 ratio比率
    等于物理像素 / dips。其实就是一个比例
    iphone4开始，iphone就是dpr就等于2了。所以其实就是把UI图/2，就是你应该在css写多少px。
    1.100%布局适配
    2.rem做适配
12.Flex基础概念，父级容器属性(Flex容器)，子级容器属性(Flex项目)
    布局的传统解决方案基于盒装模型依赖display属性+position属性+float属性
    flex:弹性盒布局，CSS3的新属性，用于方便布局，比如垂直居中
    基础概念：(1.Flex容器/项目|主轴 交叉轴|项目默认沿主轴排列)
        1.采用Flex布局的元素，称为Flex容器(flex container)简称容器，它的所有子元素自动成为容器成员，称为Flex项目(flex item)简称项目
        2.容器默认存在两根轴：水平的主轴(main axis)和垂直的交叉轴(cross axis)，主轴的开始位置(与边框的交叉点)叫做mian start 结束位置叫做mian end 交叉轴的开始位置叫cross start 结束位置叫 cross end
        3.项目默认沿主轴排列，单个项目占据的主轴空间叫main size 占据的交叉空间叫cross size
        总结：弹性布局由父级容器，子级容器构成，通过设置主轴和交叉轴来控制子元素的排序方式
    父级容器属性:flex-flow(flex-direction flex-wrap)
        (2.flex-direction子元素排列方向/flex-wrap换行/justify-content(主轴)/align-items(交叉轴)/align-content(多根轴线))
        1.flex-direction:row|row-reverse|column|column-reverse
            该属性定义了子元素排列方向
        2.flex-wrap：**nowrap | wrap | wrap-reverse;  该属性称"轴线",该属性定义如果一条轴线排不下，如何换行。
        3.flex-flow： || ; flex-direction和flex-wrap的简写形式，默认值为row nowrap
        4.justify-content: flex-start | flex-end | center | space-between | space-around;  该属性定义了子元素在主轴上的对齐方式。
        5.align-items:  flex-start | flex-end | center | baseline | stretch;  定义项目在交叉轴上如何对齐。
        6.align-content: ** flex-start | flex-end | center | space-between | space-around | stretch; 属性定义了多根轴线的对齐方式。如果项目只有一根轴线，该属性不起作用
    子级容器属性：(3.flex flex-grow flex-shrink1s flex-basis)
        (order子元素排列顺序 flex align-self )
        1.order属性 定义子元素或子容器的排列顺序，数值越小，排列越靠前，默认为0
        2.flex-grow属性 定义子元素或者子容器的放大比例，默认为0，即如果存在剩余空间也不放大
            如果所有项目flex-grow属性为1 它们将等分剩余空间(如果有的话)
            如果一个项目2 其他1 前者占据的剩余空间将比其他项多一倍。
        3.flex-shrink(负值对该属性无效) 定义了项目的缩小比例 默认为1 如果空间不足 该项目将缩小
            都为1，当空间不足时，都将等比例缩小
            一个项目的flex-shrink属性为0，其他项目都为1，则空间不足时，前者不缩小。
        4.flex-basis属性
        分配弹性项目的长度 是width属性的替代品 优先级比width高
         定义了在分配多余空间之前，项目占据的主轴空间（main size）。浏览器根据这个属性，计算主轴是否有多余空间。它的默认值为auto，即项目的本来大小。
        5.flex属性 是flex-grow, flex-shrink 和 flex-basis的简写，默认值为0 1 auto。后两个属性可选。
            该属性有三个快捷值：auto (1 1 auto) 和 none (0 0 auto)和 initial(0 1 auto)。
            建议优先使用这个属性，而不是单独写三个分离的属性，因为浏览器会推算相关值。
        6.align-self属性 允许单个项目有与其他项目不一样的对齐方式，可覆盖align-items属性。默认值为auto，表示继承父元素的align-items属性，如果没有父元素，则等同于stretch。        
13.使用CSS 让一个div不可视,visibility/hidden display/none opacity/0(可以设置过渡效果)区别
            rgba和opacity 0-1 完全透明-完全不透明
        1.display:none;(不在文档流)
        2.  z-index:-10s;
            position:relative;
        3.opacity:0;(在文档流)
        4.绝对定位移出可视区
        5.visibility:hidden;(在文档流)

        1.visibility:hidden
            位置在文档流 不被删除 触发浏览器渲染引擎的重绘
        2.display:none 
            隐藏元素 位置不被保留，触发浏览器渲染引擎的回流和重绘。
        3.opacity:0
            元素设置为透明，位置不被保留，所以会触发浏览器渲染引擎的重绘
14.CSS中盒模型是什么，都由什么组成，有哪几种,转换方法是什么
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
15.position属性都有哪些特点
    1.inhert：从父元素继承 position 属性的值。
    2.static：默认值 没有定位 元素出现在正常的流中（忽略 top, bottom, left, right 或者 z-index 声明）。
    3.relative:生成相对定位的元素，相对于元素本身正常位置进行定位。因此，"left:20" 会向元素的 LEFT 位置添加 20 像素。
    4.absolute:生成绝对定位的元素，相对于 static 定位以外的第一个祖先元素进行定位。元素的位置通过 "left", "top", "right" 以及 "bottom" 属性进行规定。
    5.fixed:生成绝对定位的元素，相对于浏览器窗口进行定位。元素的位置通过 "left", "top", "right" 以及 "bottom" 属性进行规定。
16.CSS的三种定位方式
     1.相对定位：(不会改变元素性质)
        相对自己的初始位置定位，
        原有空间不释放
        相对定位不会改变元素的性质(块(行)元素仍是块(行)元素)
        position:relative;
        left:200px;
        top:30px;
    2. 绝对定位:(会改变元素性质 行=>块)
        相对于最近已定位的祖先元素
        如果没有最近的定位的父元素 会相对于body
        原有空间释放
        绝对定位会改变元素的性质，行内元素会变成块级元素
    3.固定定位:(会改变元素性质 转换成行级块)
        相对于浏览器窗口偏移
        原有空间释放
        会转化成行级块
17.z-index
    1.没有开启定位的元素不可以使用z-index
        该属性只有在设置了position定位之后才会生效
    2.父元素的层级再高也不会盖住子元素
        正常情况下即使设置了子元素的z-index为负值，依然无法实现这个效果，其实这里只要将a元素的z-index设置为auto，即可实现上述效果。
    3.同级下，z-index的值越大，堆叠顺序越靠前，相同的z-index值的时候，后面的会在前面的层级之上。
        z-index值可以设置0和负数的。
    4.z-index:0和z-index:auto的区别，当一个定位元素不设置z-index的时候，默认值就是auto
18.CSS伪类 伪元素(区别:有没有创建一个文档流外的元素)
    伪类：
        (添加到选择器的关键字，指定要选择的元素的特殊状态 通过选择器，格式化DOM树以外的信息以及不能被常规CSS选择器获取到的信息。)
        是添加到选择器的关键字，指定要选择的元素的特殊状态。 例如，:hover 可被用于在用户将鼠标悬停在按钮上时改变按钮的颜色。
    存在意义：
        为了通过选择器，格式化DOM树以外的信息以及不能被常规CSS选择器获取到的信息。
    伪元素：
        伪元素是一个附加至选择器末的关键词，允许你对被选择元素的特定部分修改样式。 下例中的 ::first-line 伪元素可改变段落首行文字的样式。
    伪类和伪元素的作用：
        伪类连同伪元素一起，
        允许不仅仅根据文档 DOM 树中的内容对元素应用样式，
        允许根据诸如像导航历史这样的外部因素来应用样式（例如 :visited）
        同样 根据内容的状态（例如在一些表单元素上的 :checked），或者鼠标的位置（例如 :hover 让你知道是否鼠标在一个元素上悬浮）应用样式。
    分类：
        伪类：
            :active，将样式添加到被激活的元素。
            :focus，将样式添加到被选中的元素。
            :hover，当鼠标悬浮在元素上方是，向元素添加样式。
            :link，将特殊的样式添加到未被访问过的链接。
            :visited，将特殊的样式添加到被访问的链接。
            :first-child，将特殊的样式添加到元素的第一个子元素。
            :lang，允许创作者来定义指定的元素中使用的语言。
        伪元素：
            :first-letter，将特殊的样式添加到文本的首字母。
            :first-line，将特殊的样式添加到文本的首行。
            :before，在某元素之前插入某些内容。
            :after，在某元素之后插入某些内容。
    伪类(已有) 伪元素(创建)区别：(有没有创建一个文档树之外的元素)
        伪类的操作对象是文档树中已有的元素
        伪元素创建了一个文档树外的元素。
        伪类与伪元素的区别在于：有没有创建一个文档树之外的元素。
    总结：(伪类：弥补常规CSS选择器的不足 可以使用多个 文档数中已有/
            伪元素：创建一个有内容的虚拟容器 只能同时使用一个 文档树中新建)
        伪类本质上是为了弥补常规CSS选择器的不足，以便获取到更多信息；
        伪元素本质上是创建了一个有内容的虚拟容器；  
        CSS3中伪类和伪元素的语法不同；
        可以同时使用多个伪类，而只能同时使用一个伪元素；
19.CSS三种基本定位机制 
    普通流 
    浮动 
    绝对定位
20.CSS常用布局
    弹性布局 flex
    容器属性
    item属性
    网格布局 grid
    容器属性
    item属性
21.
Height
    clientHeight content+padding
    offsetHeight content+padding+border
    scrollHeight 有滚动条有意义 clientHieght+scrollTop
Top
    offsetTop 当前元素顶部距离最近父元素顶部距离
    scrollTop 有滚动条有意义 元素顶部被遮住部分高度

    1.网页可见区域高:document.body.clientHeight
    2.网页正文全文高：document.body.scrollHeight
    3.网页可见区域高(包括边线的高):document.body.offsetHeight
    4.网页被卷去的高:document.body.scrollTop
    5.屏幕分辨率高:window.screen.height
    每个HTML元素都具有clientHeight offsetHeight scrollHeight offsetTop scrollTop这五个和元素高度 滚动 位置相关的属性
    clientHeight和offsetHeight属性和元素的滚动，位置没有关系 它们代表元素的高度
    clientHeight:
        包括padding但不包括border 水品滚动条 margin的元素高度 
        对于inline的元素这个属性一直是0 单位px 只读元素
    offsetHeight：
        包括padding border 水平滚动条 但不包括margin的元素的高度
        对于inline的元素 这个属性一直是0 单位px 只读元素
    scrollHeight 有滚动条的情况下 (包括可见和不可见)才有意义
        (没有滚动条的情况下scrollHeigh == clientHeight恒成立)
        scrollHeight>=clientHeight
        当本元素的子元素比本元素高且overflow=scroll时 本元素会scroll 
        单位px 只读元素
    scrollTop 元素顶部被遮住部分的高度 
        有滚动条时 滚动条向下滚动的距离 
        没有滚动条的时候 scrollTop == 0恒成立 
        单位px 可读可设置
    offsetTop:当前元素顶部距离最近父元素顶部的距离 和有没有滚动条没有关系 单位px 只读元素        
22.CSS响应式设计适配多种设备
    1. <meta name="viewport" content="width=device-width, initial-scale=1" />
    2. 不要使用绝对宽度
    3. 字体大小和长宽边距属性不要用”px”,应该用相对大小的“rem”
    4. 使用流动布局 - 如果宽度太小，放不下两个元素，后面的元素会自动滚动到前面元素的下方，不会在水平方向overflow（溢出），避免了水平滚动条的出现
    5. link标签的media属性- <link rel="stylesheet" type="text/css" media="screen and (min-width: 600px) and (max-device-width: 980px)"  href="css600-980.css" />  
    6. Media Query
    7. 图片的自适应（自动缩放）
        - img{max-width: 100%;}     
        - 最好还是根据不同大小的屏幕，加载不同分辨率的图片
23.雪碧图(CSS Sprites)/CSS精灵
    background-position属性使用频率非常高
    大量网站为了减少HTTP请求
    会将大量图片合成一章雪碧图使用
    使用方法：
        雪碧图的使用就是通过控制background-position属性值来确定图片呈现的位置
24.CSS三大特性
    层叠性
        1.给一个标签设置的样式发生冲突的时候即样式的覆盖
        2.浏览器的渲染机制是从上到下的，当有冲突的时候就采用最后的那个样式
    继承性
        1，发生的前提是：标签之间属于一种嵌套关系
        2，文字颜色可以之间继承
        3，字体大小可以继承
        4，字体可以继承
        5，行高也可以实现继承
        与文字有关的属性都可以，实现继承
        特殊点：
        a标签超链接不能实现字体颜色的继承，字体大小可以继承
        h1不可以继承文字的大小，继承过来还会做一个计算
    优先级
        1，默认样式<标签选择器 <类选择器 <id选择器 <行内样式 <！important
        0 1 10 100 1000 1000以上




















1. 什么是标签语义化，它的意义
    > 合理的标签做合适的事情
    > 语义化意义：(被机器理解有利于搜索引擎爬取有效信息 也算是SEO搜索引擎优化的一部分/编程人员获得直观认识)
    1. 机器在需要更少的人类干预的情况下能够研究和收集信息，让网页能被机器理解，最终让人类受益
    2. 让大家直观地认识标签和属性的用途
    > 意义：(搜索引擎抓取网页内容)
    1. 对搜索引擎友好，有了良好的结构和语义，网内内容可以更好的被搜索引擎抓取
    2. 有助于利用基于开放标准的技术
2. <!DOCTYPE html>
    > (告诉Web浏览器该页面使用哪个HTML版本进行指令编写)
    1. 声明不是HTML标签 它是只是Web浏览器关于页面使用哪个HTML版本进行编写的指令
    2. 标签是一种标准通用标记语言的文档类型声明 它的目的是告诉标准通用标记语言解析器 应该使用什么样的文档类型定义DTD来解析文档
    3. 声明必须是HTML文档的第一行 位于HTML之前
3. HTML5新特性
    > (标签语义化/video&audio标签/Canvas绘图SVG绘图/WebSocket/WebStorage/Web Worker)
    1. 语义标签化
    2. 增强型表单
    3. 新增视频video和音频audio标签
    4. SVG绘图 XML
    5. Canvas绘图 JS
    > (都允许在浏览器中创建图形但根本上并不相同)        
    
    > SVG(适合大型渲染区域的应用程序 如Google地图 不适合游戏应用)
    1. 基于XML绘制2D图形/
    2. SVG DOM每个元素都是可用 可以为某个元素附加JS事件处理器/
    3. 每个被绘制的图形均被视为对象/
    4. SVG对象属性发生变化浏览器自动重现图形
    5. 不依赖分辨率/支持事件处理器/最适合带有大型渲染区域的应用程序（比如谷歌地图）
    /复杂度高会减慢渲染速度（任何过度使用 DOM 的应用都不快/不适合游戏应用
    
    > Canvas(适合图像密集型游戏 其中许多对象会被频繁重绘)
    1. 基于JS绘制2D图形/
    2. 逐像素进行渲染/
    3. 一旦图形被绘制完成 浏览器不再关注/
    4. 位置发生变化 整个场景需要重绘
    5. 依赖分辨率/不支持事件处理器/弱的文本渲染能力
    6. 能够以 .png 或 .jpg 格式保存结果图像/
    7. 最适合图像密集型的游戏，其中的许多对象会被频繁重绘
    
    6. 地理位置
    7. 拖放API
    8. Web Worker
    9. Web Storage
    10. WebSocket
4. 标签分为哪几种，分别有什么特点，如何进行转换
    > 根据标签特性
    1. 块状标签 div p h1-h6 ul li ol li header footer nav article table form
        1. 默认情况下独占一行，宽度为父级的100%
        2. 支持设置宽高
        3. 支持上下左右的margin、padding值
    2. 行内(内联)标签 a b em i  label span strong
        1. 与其他元素并列在一行
        2. 不支持设置宽高，宽度随内容撑开
        3. 支持左右方向的margin、padding
    3. 行内块状标签 img input textarea
        1. 与其他元素并列在一行
        2. 支持设置宽高
        3. 支持上下左右的margin、padding值
    > 转换方法：   
    1. dispaly:block;
    2. dispaly:inline;
    3. dispaly:inline-block;  
5. 两个行内块元素同行显示时，出现3px间隙
    > 问题产生原因： 由于换行符/tab(制表符)/空格等不可见字符引起
    - 解决方法：
    1. 删除元素之间的换行空格
    2. 父元素设置:font-size:0 设置行内元素自身的font-size的值
6. HTML文档中head标签里有哪些标签 他们的作用
    <!-- <base>网页默认打开方式, 
    <link>, <meta>网页关键字, <script>, <style>, 以及 <title>。 -->
    1. <title> (文档标题)
        定义文档的标题  
        <title> 标签是 <head> 标签中唯一要求包含的东西
        浏览器会以特殊的方式来使用标题，并且通常把它放置在浏览器窗口的标题栏或状态栏上。
        同样，当把文档加入用户的链接列表或者收藏夹或书签列表时，标题将成为该文档链接的默认名称。
    2. <link> 链接外部样式表。
        link 元素是空元素，它仅包含属性。此元素只能存在于 head 部分，不过它可出现任何次数。
    3. <style>
        HTML 文档定义样式信息。
        type 属性是必需的，定义 style 元素的内容。唯一可能的值是 "text/css"。
    4. <script> => 
        定义客户端脚本，
            比如 JavaScript。script 元素既可以包含脚本语句，也可以通过 src 属性指向外部脚本文件。
    5. <meta> => (网页关键词)
        网页关键词 网页描述 作者 网页编码 自动跳转等说明性标签 包含广泛的内容标签
    6. <base> => (网页默认打开方式)
        网页默认打开方式声明
7. HTML中title属性和alt属性的区别
    > (图片不输出信息时/会显示alt信息/鼠标放上去会出现title信息)
    1. <img src="#" alt="alt信息" />
        当图片不输出信息的时候，会显示alt信息 鼠标放上去没有信息，当图片正常读取，不会出现alt信息
    2. <img src="#" alt="alt信息" title="title信息" />
        当图片不输出信息的时候，会显示alt信息 鼠标放上去会出现title信息
        当图片正常输出的时候，不会出现alt信息，鼠标放上去会出现title信息
    1. title属性可以用在除了base，basefont，head，html，meta，param，script和title之外的所有标签
    2. title属性的功能是提示。额外的说明信息和非本质的信息请使用title属性。title属性值可以比alt属性值设置的更长
    3. title属性有一个很好的用途，即为链接添加描述性文字，特别是当连接本身并不是十分清楚的表达了链接的目
8. HTML全局属性(global attribute)
    > 全局属性兼容性特别不好 几乎各个浏览器很少支持
    - id: 元素id，文档内唯一
    - lang: 元素内容的语言
    - spellcheck: 是否启动拼写和语法检查
    - style: 行内css样式
    - tabindex: 设置元素可以获得焦点，通过tab可以导航
    - title: 元素相关的建议信息
    - translate: 元素和子孙节点内容是否需要本地化
9. 超链接target取值和作用
    > 规定何处打开链接文档
    > 属性值:
    - _black:点击一次打开一个新窗口
    - _new:始终在同一个新窗口打开
    - _slef:默认 在当前窗口打开
    - _parent:在父级窗口打开
    - _top:在当前的整个浏览器中打开所链接文档 即在顶级窗口中打开
    - framename:在指定的框架中打开被链接的文档
10. H5中data-*属性作用
    > data-* 属性
    1. 用于存储页面或应用程序的私有自定义数据。
    2. 赋予我们在所有 HTML 元素上嵌入自定义 data 属性的能力。
    3. 存储的（自定义）数据能够被页面的 JavaScript 中利用，以创建更好的用户体验（不进行 Ajax 调用或服务器端数据库查询）。
    > 包括两部分
    1. 属性名不应该包含任何大写字母，并且在前缀 "data-" 之后必须有至少一个字符
    2. 属性值可以是任意字符串
    PS:用户代理会完全忽略前缀为 "data-" 的自定义属性
11. 浏览器在加载一个网页时，通过哪些信息来决定显示该页面时所使用的字符集
    在请求头或meta标签中有Content-Type、charset
    可以直接提取其中的charset,否则使用默认的字符编码
12. iframe使用(提供一个简单方式 把一个网站内容嵌入到另一个网站) 优/缺点
    > 创建包含另外一个文档的内联框架(即行内框架)
    > 提供一个简单方式 把一个网站内容嵌入到另一个网站
    > 优点:
    1. 程序调入静态页面比较方便
    2. 页面和程序分离
    > 缺点：
    1. 样式/脚本需外链 会增加请求
    2. 放在首页 对搜索引擎不友好
    3. 构建慢
    4. 框架结构滚动条 链接导航
    > 为什么少用iframe
    - iframe创建比其他包括script和css的DOM元素创建慢1-2个数量级
13. href与src区别
    (请求资源类型不同/结果不同/浏览器解析方式不同)
    > href:
        > 标识超文本引用 用在link和a等元素上 href是引用和页面关联 是在当前元素和引用资源之间建立联系
    1. 请求资源类型不同
        - href是Hypertext Refrence缩写 表示超文本引用 用来建立当前元素和文档之间的链接 常用的有link a
        - src 在请求src资源时会将其指向资源下载并应用到文档中 常见的有script img iframe
    2. 作用结果不同
        - href用于在当前文档和引用资源之间建立联系
        - src用于替换当前内容
    3. 浏览器解析方式不同
        > href 
        - 若在文档中添加href 浏览器会识别该文档为CSS文件 会并行下载资源并且不会停止对当前文档的处理
        > src 
        - 浏览器解析到src 会暂停其他资源的下载和处理 直到将该资源加载 编译 执行完毕 图片和框架等也如此 类似于将所指向资源应用到当前内容 这也是为什么建立把js脚本放在底部而不是头部的原因
14. viewpoint/H5移动端meta标签中viewpoint简洁
    - width: 控制viewport的大小 pixel_value标识可以指定一个值或特殊的值 device-width为设备的宽度(单位为缩放为100%时的CSS像素)
    - height: 和width相对应 指定高度
    - target-densitydpi
        一个屏幕像素密度由屏幕分辨率决定 通常定义为每英寸点的数量 
        Android支持三种屏幕像素密度
            1.低像素密度
            2.中像素密度
            3.高像素密度
    value  
        指定一个具体的API值为target dpi 这个值范围在70-400之间
    initial-scale
        初始缩放 页面初始缩放程度 是一个浮点数 页面大小的一个乘数
        如设置缩放为1.0 web页面显示时 会以target density分辨率1:1展示
        设置缩放为2.0 这个也买你会放大为2倍
    user-scalable
        用户调整缩放 即用户是否能改变也买你缩放程度 yes允许 no不允许 默认值yes 将其设置为no minimum-scale和maximum-scale根本不可能缩放
    (设置屏幕宽度为设备宽度，禁止用户手动调整缩放)

     <meta name="viewport" content="width=device-width,user-scalable=no" />

    (设置屏幕密度为高频，中频，低频自动缩放，禁止用户手动调整缩放)

    <meta name="viewport" content="width=device-width,target-densitydpi=high-dpi,initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no"/>
15. input和textarea区别
    <input type="text">标签
    > 单行文本框 不会换行
    > size属性指定显示字符的长度 PS:当使用CSS限定宽高 则size属性不再起作用
    > value属性 指定初始值 
    > Maxlength属性 指定文本框可以输入的最长长度 可以通过width和height设置宽高 但是也不会增加行数
    <textarea>标签
    > 多行文本输入框 文本区中可容纳无限数量的文本
    > 文本的默认字体是等宽字体
    > cols和rows属性规定textarea的尺寸
    > 最好使用css的width和height属性
16. 移动设备忽略将页面中的数字识别为电话号码的方法
    (format-dection/telephone/email/address)
    H5 IOS中
    1. 标准的电话号码格式 <a href="tel:1-408-555-5555">1-408-555-5555</a>点击后会自动打开电话功能
    2. 有时不是电话号码的数字也会被浏览器自动解析为电话号码 并把数字的颜色和样式都进行改变
    3. 忽略 页面中数字识别为电话号码 把这个默认行为关闭
        <meta name="format-detection" content="telephone=no">
    4. 这个关闭不影响真正电话号码的识别

    - format-dectection
        >格式检测 用来检测HTML中的一些格式 关于meta的format-dection属性主要有以下几个设置
        <meta name="format-detection" content="telephone=no">
        <meta name="format-detection" content="email=no">
        <meta name="format-detection" content="address=no">
        <meta name="format-detection" content="telephone=no,email=no,address=no">
    - telephone
        > telephone=no 禁止把数字转化为拨号链接
        > telephone=yes 开启把数字转化为拨号链接 默认开启
    - email
        > 告诉设备不识别邮箱 点击之后不主动发送
        > email=no 禁止作为邮箱地址
        > email=yes 开启把文字默认为邮箱地址 默认开启
    - address
        > adress=no 禁止跳转到地图
        > adress=yes 开启点击地址直接跳转至地图的功能 默认开启
17. WebGL-Web Graphics Library 
    一种3D绘图协议
19. 递归和迭代区别 优缺点 尾调用
    递归
        函数调用自己
    迭代
        循环调用别的函数
    尾调用
        在return的地方执行递归
19. 严格模式和混杂模式如何区分 有何意义
    1. 严格模式的排版和JS运行模式是以该浏览器支持的最高标准运行
    2. 在混杂模式中，页面以宽松的向后兼容的方式显示 模拟老式浏览器的腥味以防止站点无法正确工作
    3. DCOTYPE不存在或格式不正确会导致文档以混杂模式呈现
20. HTML和XHTML区别
    - XML和HTML都是用来操作数据或数据结构的 在结构上大致相同 但在本质上存在明显区别
    1. 语法要求不同
    - html中不区分大小 xml中严格区分
    - 
    2. 标记不同
    - html使用固有的标记 xml没有固有的标记
    - html标签是预定义的 xml标签是免费的 自定义的 可扩展的
    3. 作用不同
    - html是用来显示数据的 xml是用来描述数据 存放数据的 可以作为持久化介质
    - html将数据和显示结合在一起 在页面中吧数据展示出来
    - xml将数据和显示分开
    
    - xml不是html的替代品 xml和html是两种不同用途的语言 xml不是要替换html xml可以视为对html的补充

    - xml和html的目标不同 html的设计目标是显示数据并集中于数据外观 xml设计目标是描述数据并集中于数据的内容
    - 没有任何行为的xml和html相似 xml不进行任何操作

    - 对于xml最好形容 xml是一种跨平台的 与软硬件无关的处理与传输信息的工具
    - xml未来会无所不在 xml将成为最普遍的数据处理和数据传输的工具
21. attribute和property区别
    1. 含义
        - Attribute Property 分别为特性和属性 作为区别
    1. attribute是dom元素在文档中作为H5标签拥有的属性
    2. property是dom元素在js中作为对象拥有的属性






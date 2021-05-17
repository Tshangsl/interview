HTML(结构层)：定义结构
CSS(表示层):定义样式
JavaScript(行为层)：定义行为

HTML5
1.什么是标签语义化，它的意义
    合理的标签做合适的事情
        语义化意义：
        (被机器理解有利于搜索引擎爬取有效信息 也算是SEO搜索引擎优化的一部分/编程人员获得直观认识)
        1.机器在需要更少的人类干预的情况下能够研究和收集信息，让网页能被机器理解，最终让人类受益
        2.让大家直观地认识标签和属性的用途
        意义：(搜索引擎抓取网页内容)
        1.对搜索引擎友好，有了良好的结构和语义，网内内容可以更好的被搜索引擎抓取
        2.有助于利用基于开放标准的技术
2. <!DOCTYPE html>
    (告诉Web浏览器该页面使用哪个HTML版本进行指令编写)
    1.声明不是HTML标签 它是只是Web浏览器关于页面使用哪个HTML版本进行编写的指令
    2.标签是一种标准通用标记语言的文档类型声明
        它的目的是告诉标准通用标记语言解析器
        应该使用什么样的文档类型定义DTD来解析文档
    3.声明必须是HTML文档的第一行 位于HTML之前
3.HTML5有新特性
    (标签语义化/video&audio标签/Canvas绘图SVG绘图/WebSocket/WebStorage/Web Worker)
    HTML的新标准
    1.语义标签化
    2.增强型表单
    3.新增视频video和音频audio标签
    4.Canvas绘图 JS
    5.SVG绘图 XML
    (都允许在浏览器中创建图形但根本上并不相同)        
    SVG(适合大型渲染区域的应用程序 如Google地图 不适合游戏应用)
        基于XML绘制2D图形/
        SVG DOM每个元素都是可用 可以为某个元素附加JS事件处理器/
        每个被绘制的图形均被视为对象/
        SVG对象属性发生变化浏览器自动重现图形
        不依赖分辨率/支持事件处理器/最适合带有大型渲染区域的应用程序（比如谷歌地图）
        /复杂度高会减慢渲染速度（任何过度使用 DOM 的应用都不快/不适合游戏应用
    Canvas(适合图像密集型游戏 其中许多对象会被频繁重绘)
        基于JS绘制2D图形/
        逐像素进行渲染/
        一旦图形被绘制完成 浏览器关注不再关注/
        位置发生变化 整个场景需要重绘
        依赖分辨率/不支持事件处理器/弱的文本渲染能力
        能够以 .png 或 .jpg 格式保存结果图像/
        最适合图像密集型的游戏，其中的许多对象会被频繁重绘
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
            由于换行符/tab(制表符)/空格等不可见字符引起
        解决方法：
            1.删除元素之间的换行空格
            2.父元素设置:font-size:0
            设置行内元素自身的font-size的值
6.H5中websocket(H5的一种新协议 被用做即时通讯 以代替轮询)
    定义：(H5一种新协议 实现浏览器和服务器全双工通信 一开始握手需借助HTTP请求完成)
        WebSocket protocol(应用层协议)是HTML5一种新的协议
        它实现了浏览器与服务器全双工通信(full-duplex)。
        一开始的握手需要借助HTTP(非持久化单向)请求完成
        单独建立一条TCP的通信信道进行数据传送 被用作即时通信代替轮询
    用途：
        网站上的即时通讯是很常见的，比如网页的QQ 微信等 按照以往的技术能力通常是采用轮询等技术解决。
    原理：
        (HTTP协议是非持久化的，单向的网络协议，在建立连接后只允许浏览器向服务器发出请求后，服务器才能返回相应的数据 浪费流量和服务器端资源)
        (连接之后服务器和浏览器都可以主动向对方发出请求 保持连接+心跳ping pong)
        当需要即时通讯时，通过轮询在特定的时间间隔（如1秒），
        由浏览器向服务器发送Request请求，然后将最新的数据返回给浏览器。
        缺点：会导致过多不必要的请求，浪费流量和服务器资源，每一次请求、应答，都浪费了一定流量在相同的头部信息上
        WebSocket中，只需要服务器和浏览器通过HTTP协议进行一个握手的动作，然后单独建立一条TCP的通信通道进行数据的传送。
        WebSocket同HTTP一样也是应用层的协议，但是它是一种双向通信协议，是建立在TCP之上的 广泛被用来做即时通讯，以替代轮询。
    机制：
        WebSocket是HTML5的新的协议。它实现了浏览器与服务器全双工通信，能更好的节省服务器资源和带宽并达到实时通讯，它建立在TCP之上，同HTTP一样通过 TCP 来传输数据，但是
    与HTTP不同：
        1.WebSocket 是一种双向通信协议，在建立连接后，WebSocket 服务器和Browser/Client Agent 都能主动的向对方发送或接收数据，就像 Socket 一样。
        2.WebSocket 需要类似TCP的客户端和服务器端通过握手连接，连接成功后
        WebSocket是类似Socket的TCP长连接的通讯模式，一旦 WebSocket 连接建立后，后续数据都以帧序列的形式传输。
        在客户端断开 WebSocket 连接或 Server 端断掉连接前，不需要客户端和服务端重新发起连接请求。
        在海量并发及客户端与服务器交互负载流量大的情况下，极大的节省了网络带宽资源的消耗，有明显的性能优势，且客户端发送和接受消息是在同一个持久连接上发起，实时性优势明显。
    连接过程&特点：
        连接过程：(TCP三次握手建立TCP连接 HTTP握手 HTTP回馈 TCP通道)
            1.浏览器、服务器建立TCP连接，三次握手。这是通信的基础，传输控制层，若失败后续都不执行。
            2.TCP连接成功后，浏览器通过HTTP协议向服务器传送WebSocket支持的版本号等信息。
            （开始前的HTTP握手）
            3.服务器收到客户端的握手请求后，同样采用HTTP协议回馈数据。
            4.当收到了连接成功的消息后，通过TCP通道进行传输通信。
        特点：
            1.建立在 TCP 协议之上，服务器端的实现比较容易。
            2.与 HTTP 协议有着良好的兼容性。默认端口也是80和443，并且握手阶段采用 HTTP 协议，因此握手时不容易屏蔽，能通过各种 HTTP 代理服务器。
            3.数据格式比较轻量，性能开销小，通信高效。
            4.可以发送文本，也可以发送二进制数据。
            5.没有同源限制，客户端可以与任意服务器通信。
            6.协议标识符是ws（如果加密，则为wss），服务器网址就是 URL
    保持连接+心跳(客户端和服务器端长时间没有数据往来 但仍需要保持连接 此时 可以采用ping+pong心跳实现)
        WebSocket为了保持客户端、服务端的实时双向通信，需要确保客户端、服务端之间的TCP通道保持连接没有断开。然而，对于长时间没有数据往来的连接，如果依旧长时间保持着，可能会浪费包括的连接资源。
        但不排除有些场景，客户端、服务端虽然长时间没有数据往来，但仍需要保持连接。这个时候，可以采用心跳来实现。
        发送方->接收方：ping
        接收方->发送方：pong
        ping、pong的操作，对应的是WebSocket的两个控制帧，opcode分别是0x9、0xA。
        举例，We
    主要API
        1.构造函数
            WebSocket 对象作为一个构造函数，用于新建 WebSocket 实例。
            const ws = new WebSocket('ws://localhost:80');
        2.webSocket.readyState
            readyState属性返回实例对象的当前状态
                CONNECTING：值为0，表示正在连接。
                OPEN：值为1，表示连接成功，可以通信了。
                CLOSING：值为2，表示连接正在关闭。
                CLOSED：值为3，表示连接已经关闭，或者打开连接失败。
        3.webSocket.onopen
            实例对象的onopen属性，用于指定连接成功后的回调函数。
        4.webSocket.onclose
            实例对象的onclose属性，用于指定连接关闭后的回调函数。
        5.webSocket.onmessage
            实例对象的onmessage属性，用于指定收到服务器数据后的回调函数。
        6.webSocket.send
            实例对象的send()方法用于向服务器发送数据。
        7.webSocket.onerror
            实例对象的onerror属性，用于指定报错时的回调函数。
7.HTML文档中head标签里有哪些标签，说说他们的作用
    <base>, <link>, <meta>, <script>, <style>, 以及 <title>。
    1.<title> (文档标题)
        定义文档的标题  
        <title> 标签是 <head> 标签中唯一要求包含的东西
        浏览器会以特殊的方式来使用标题，并且通常把它放置在浏览器窗口的标题栏或状态栏上。
        同样，当把文档加入用户的链接列表或者收藏夹或书签列表时，标题将成为该文档链接的默认名称。
    2.<link> 
        链接外部样式表。
        link 元素是空元素，它仅包含属性。此元素只能存在于 head 部分，不过它可出现任何次数。
    3.<style>
        为 HTML 文档定义样式信息。
        type 属性是必需的，定义 style 元素的内容。唯一可能的值是 "text/css"。
    4. <script> => 
        定义客户端脚本，
            比如 JavaScript。script 元素既可以包含脚本语句，也可以通过 src 属性指向外部脚本文件。
    5. <meta> => (网页关键词)
        网页关键词 网页描述 作者 网页编码 自动跳转等说明性标签 包含广泛的内容标签
    6. <base> => (网页默认打开方式)
        网页默认打开方式声明
8.HTML中title属性和alt属性的区别
        (图片不输出信息时/会显示alt信息/鼠标放上去会出现title信息)
    1.<img src="#" alt="alt信息" />
        当图片不输出信息的时候，会显示alt信息 鼠标放上去没有信息，当图片正常读取，不会出现alt信息
    2.<img src="#" alt="alt信息" title="title信息" />
        当图片不输出信息的时候，会显示alt信息 鼠标放上去会出现title信息
        当图片正常输出的时候，不会出现alt信息，鼠标放上去会出现title信息
    1.title属性可以用在除了base，basefont，head，html，meta，param，script和title之外的所有标签
    2.title属性的功能是提示。额外的说明信息和非本质的信息请使用title属性。title属性值可以比alt属性值设置的更长
    3.title属性有一个很好的用途，即为链接添加描述性文字，特别是当连接本身并不是十分清楚的表达了链接的目
9.HTML全局属性(global attribute)
    全局属性兼容性特别不好 几乎各个浏览器很少支持
    id: 元素id，文档内唯一
    lang: 元素内容的语言
    spellcheck: 是否启动拼写和语法检查
    style: 行内css样式
    tabindex: 设置元素可以获得焦点，通过tab可以导航
    title: 元素相关的建议信息
    translate: 元素和子孙节点内容是否需要本地化
10.超链接target取值和作用
    规定何处打开链接文档
    属性值:
        _black:点击一次打开一个新窗口
        _new:始终在同一个新窗口打开
        _slef:默认 在当前窗口打开
        _parent:在父级窗口打开
        _top:在当前的整个浏览器中打开所链接文档 即在顶级窗口中打开
        framename:在指定的框架中打开被链接的文档
11.H5中data-*属性作用
    data-* 属性
        1.用于存储页面或应用程序的私有自定义数据。
        2.赋予我们在所有 HTML 元素上嵌入自定义 data 属性的能力。
        3.存储的（自定义）数据能够被页面的 JavaScript 中利用，以创建更好的用户体验（不进行 Ajax 调用或服务器端数据库查询）。
    包括两部分
        1.属性名不应该包含任何大写字母，并且在前缀 "data-" 之后必须有至少一个字符
        2.属性值可以是任意字符串
    PS:用户代理会完全忽略前缀为 "data-" 的自定义属性
12.浏览器在加载一个网页时，通过哪些信息来决定显示该页面时所使用的字符集
    在请求头或meta标签中有Content-Type、charset
    可以直接提取其中的charset,否则使用默认的字符编码
13.iframe使用 优/缺点
    创建包含另外一个文档的内联框架(即行内框架)
    提供一个简单方式 把一个网站内容嵌入到另一个网站
    优点:
        1.程序调入静态页面比较方便
        2.页面和程序分离
    缺点：
        1.样式/脚本需外链 会增加请求
        2.放在首页 对搜索引擎不友好
        3.框架结构滚动条
        4.链接导航
    为什么少用iframe
        iframe创建比其他包括script和css的DOM元素创建慢1-2个数量级
14.href与src区别
    href:
        标识超文本引用 用在link和a等元素上
        href是引用和页面关联 
        是在当前元素和引用资源之间建立联系
    1.请求资源类型不同
        href是Hypertext Refrence缩写 表示超文本引用
            用来建立当前元素和文档之间的链接 常用的有link a
        src 在请求src资源时会将其指向资源下载并应用到文档中
            常见的有script img iframe
    2.作用结果不同
        href用于在当前文档和引用资源之间建立联系
        src用于替换当前内容
    3.浏览器解析方式不同
        href 若在文档中添加href 浏览器会识别该文档为CSS文件
            会并行下载资源并且不会停止对当前文档的处理
        src 浏览器解析到src 会暂停其他资源的下载和处理
            直到将该资源加载 编译 执行完毕 图片和框架等也如此
            类似于将所指向资源应用到当前内容
            这也是为什么建立把js脚本放在底部而不是头部的原因
15.viewpoint/H5移动端meta标签中viewpoint简洁
    width:
        控制viewport的大小 pixel_value标识可以指定一个值或特殊的值 device-width为设备的宽度(单位为缩放为100%时的CSS像素)
    height:
        和width相对应 指定高度
    target-densitydpi
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
16.input和textarea区别
    <input type="text">标签
        单行文本框 不会换行
        size属性指定显示字符的长度
        PS:当使用CSS限定宽高 则size属性不再起作用
        value属性 指定初始值 
        Maxlength属性 指定文本框可以输入的最长长度
        可以通过width和height设置宽高
        但是也不会增加行数
    <textarea>标签
        多行文本输入框 文本区中可容纳无限数量的文本
        文本的默认字体是等宽字体
        cols和rows属性规定textarea的尺寸
        最好使用css的width和height属性
17.移动设备忽略将页面中的数字识别为电话号码的方法
    H5 IOS中
    1.标准的电话号码格式 <a href="tel:1-408-555-5555">1-408-555-5555</a>
    点击后会自动打开电话功能
    2.有时不是电话号码的数字也会被浏览器自动解析为电话号码
    并把数字的颜色和样式都进行改变
    3.忽略 页面中数字识别为电话号码 把这个默认行为关闭
        <meta name="format-detection" content="telephone=no">
    4.这个关闭不影响真正电话号码的识别

    format-dectection
        格式检测 用来检测HTML中的一些格式 关于meta的format-dection属性主要有以下几个设置
        <meta name="format-detection" content="telephone=no">
        <meta name="format-detection" content="email=no">
        <meta name="format-detection" content="address=no">
        <meta name="format-detection" content="telephone=no,email=no,address=no">
    telephone
        telephone=no 禁止把数字转化为拨号链接
        telephone=yes 开启把数字转化为拨号链接 默认开启
    email
        告诉设备不识别邮箱 点击之后不主动发送
        email=no 禁止作为邮箱地址
        email=yes 开启把文字默认为邮箱地址 默认开启
    address
        adress=no 禁止跳转到地图
        adress=yes 开启点击地址直接跳转至地图的功能 默认开启









1.1xx中间状态|
2xx请求成功|
3xx重定位重新请求|
4xx请求报文错误|
5xx服务器端错误
(H5一种新协议 实现浏览器和服务器全双工通信 一开始握手需借助HTTP请求完成)
        WebSocket protocol(应用层协议)是HTML5一种新的协议。它实现了浏览器与服务器全双工通信(full-duplex)。
        一开始的握手需要借助HTTP(非持久化单向)请求完成，单独建立一条TCP的通信信道进行数据传送 被用作即时通信代替轮询。
2.(get获取数据|参数有长度限制|url之后?分割url传输数据|多个参数用&连接|因读取数据 被浏览器主动缓存|参数被保存在浏览器中|产生一个TCP数据包
post提交数据|参数无长度限制|数据放在http请求体|不会被浏览器主动缓存|参数不会被保存在浏览器中|产生一个TCP数据包)
3.(HTTP 无CA证书 明文传输 默认80端口 |HTTPS 有CA证书 (SSL安全套接字协议 身份验证|加密|完整)有SSL加密传输协议 默认443端口)
4.(HTTP无状态协议 浏览器不会保存任何会话信息 服务器端无法确定访问者 用于客户端和服务器端进行会话验证的凭证 )
        (Cookie 存储在客户端 只能存储字符串数据 可设置任意时间有效 不超过4k
        |Session(基于Cookie实现) 存储在服务器端 SessionId存储在Cookie中 任意类型数据 失效时间短 存储容量大)
        (Session认证过程 客户端请求 服务端创建返回 客户端收到存储 再次访问带上 服务端从Cookie中找SessionId找对应Session
            1.客户端第一次发送请求到服务端，服务端根据信息创建对应的Session，并在响应头返回SessionID(Set-Cookie)
            2.客户端接收到服务器端返回的SessionID后，会将此信息存储在Cookie上，同时会记录这个SessionID属于哪个域名
            3.当客户端再次访问服务器端时，请求会自动判断该域名下是否存在Cookie信息，如果有则发给服务器端，服务器端会从Cookie中拿到SessionID，再根据SessionID找到对应的Session，如果有对应的Session则通过，继续执行请求，否则就中断
        )
        (Token 访问API所需资源凭证 不需存储服务端 服务端只需根据客户端传来的token进行合法验证)
        (JWT:基于token实现 流程 客户端收到后会存储在cookie/loacalStorage
            1.客户端发送用户信息给服务端请求登录
            2.服务端验证用户信息，验证通过后签发一个 Token 返回给客户端，客户端收到后会存储在 Cookie 或 localStorage 中
            3.客户端继续第二次业务请求，请求头的 Authorization 字段携带这个 Token或者直接放在 Cookie(但是这样就不能跨域了)
            4.服务端根据 headers 中的 Token 进行验证，验证通过后返回业务请求的数据
        )
        (Session和Token Session 
         是一种记录服务器和客户端会话状态的机制，使服务端有状态化，可以记录会话信息。
         Token 是令牌，访问资源接口（API）时所需要的资源凭证。Token 使服务端无状态化，不会存储会话信息。)
         (JWT:存放在cookie/localStorage中)
         (服务端验证客户端发来的token信息要进行数据的查询操作；
         JWT验证客户端发来的token信息就不用， 
         在服务端使用密钥校验就可以，
         不用数据库的查询。)
5.localStorage
(Document源对象 本地存储 除非手动清除否则一直有效)和 
sessionStorage
(session Storage对象 会话存储 会话结束时清除 浏览器关闭前有效)---解决了cookie存储空间不足问题 与cookie对比
(5M|同源策略跨域无法访问|仅存储在客户端|以key和value形式存储数据)
cookie(在浏览器和服务器间来回传递) sessionStorage localStorage(不会自动把数据发给服务器，仅在本地保存)
6.( 1.JSONP:(需服务器端配合|利用script标签没有限制跨域的漏洞|兼容性好实现简单|只支持get请求|容易受到XSS攻击)
    2.CORS(主要依靠后端配置|前端设置Access-Control-Allow-Origin即可开启CORS|前端分简单请求和非简单请求|存在兼容问题 支持post请求)
    3.Node中间件代理(跨域问题限制的是浏览器 搭建中间件服务器转发请求和响应)
    4.nginx反向代理 类似Node中间件服务器，通过nginx代理服务器实现。 实现方法：下载安装nginx，修改配置。
    5.postMessage(H5新增) 使用它来向其它的window对象发送消息，无论这个window对象是属于同源或不同源)
7.(TCP:面向连接 可靠 打电话 大部分情况下|UDP:面向非连接 不可靠 广播 实时性要求高)
    (TCP三次握手 建立可靠通信信道 确认双方发送接收机能正常)
    (TCP三次握手：
        1.客户端向服务端发送SYN
        2.服务端返回SYN,ACK
        3.客户端发送ACK    
    )
    (TCP两次握手 无法确认客户端的接收能力。
    |TCP四次握手 可以 会降低传输效率)
    (TCP四次挥手 传输层协议断开连接的过程 确定数据全部传输完毕)
    (TCP四次挥手：
8.(Socket 长连接 客户端和服务器端互相连接 一旦建立不会主动挂掉 一个Socket由一个IP地址和一个端口号唯一确定。)
9.(TCP拥塞控制 慢启动阈值 + 拥塞避免 快速重传 快速回复)
10.Ajax一种能够实现局部网页刷新的技术 使网页异步刷新
    实现(创建XMLhttpRequest核心对象|open方法打开与服务器连接|send方法发送请求|监听服务器响应 接收返回值)
        （1）创建核心对象XMLhttpRequest；
        （2）利用open方法打开与服务器的连接；
        （3）利用send方法发送请求；（"POST"请求时，还需额外设置请求头）
        （4）监听服务器响应，接收返回值。
1.HTTP(无状态)常见状态码 及 常用的请求方式，区别和用途
101切换请求协议 301永久重定向 302临时重定向 304协商缓存命中 400参数校验失败 401未登录或token验证失败 
402用户已禁用   403禁止用户访问 404资源未找到 500服务端错误 503服务器正在忙
101     切换请求协议 从HTTP切换到WebSocket(H5新增)
200	 	操作成功	
204     请求被受理但没有资源可以返回
206     客户端只是请求资源的一部分，服务器只对请求的部分资源执GET方法，相应报文中通过Content-Range指定范围的资源。
301     永久重定向 会缓存
        301 类似，都会跳转到一个新的网站，但是 301 代表访问的地址的资源被永久移除了，以后都不应该访问这个地址，搜索引擎抓取的时候也会用新的地址替换这个老的。可以在返回的响应的 location 首部去获取到返回的地址。
302     临时重定向  不会缓存
        这个资源只是暂时不能被访问了，但是之后过一段时间还是可以继续访问，一般是访问某个网站的资源需要权限时，会需要用户去登录，跳转到登录页面之后登录之后，还可以继续访问。
303     与302状态码有相似功能，只是它希望客户端在请求一个URI的时候，能通过GET方法重定向到另一个URI上
304     协商缓存命中
307     临时重定向 与302相似 只是强制要求使用POST请求
400		参数校验失败	|
401 	未登录或token已过期	|
402		用户已禁用	|
403		禁止用户访问	|
404		资源未找到	|
500		服务器端发生错误	|
503     服务器正在忙 服务器不能处理客户端请求，一段时间后可能恢复正常
1xx：目前是协议的中间状态 还需要后续请求
2xx：请求成功
3xx：重定向/需重新请求
4xx：请求报文错误
5xx：服务器端错误
1xx中间状态|2xx请求成功|3xx重定位重新请求|4xx请求报文错误|5xx服务器端错误
HTTP常见请求方式区别用途
    GET：通用获取数据
    HEAD：获取资源的元信息
    POST：提交数据
    PUT：修改数据
    DELETE：删除数据
    CONNECT：建立连接隧道，用于代理服务器
    OPTIONS：列出可对资源实行的请求方法，常用于跨域    
2.get和post区别
    最直观的就是语义上的区别：
        (get获取数据|参数有长度限制|url之后?分割url传输数据...|多个参数用&连接|queryString|被浏览器主动缓存|参数被保存在浏览器中|
        post提交数据|参数无长度限制|数据放在http请求体|formData|不会被浏览器主动缓存|参数不会被保存在浏览器中|)
        get和post两者在TCP传输中并无不同
        1.get用来获取数据 post用来提交数据
        2.get参数有长度限制(受限于url长度 具体的数值取决于浏览器和服务器限制 最长2048字节 而post无限制)
        3.get请求的数据会附加在url之后 以 " ？ "分割url和传输数据，多个参数用 "&"连接，而post请求会把请求的数据放在http请求体中。
        4.get是明文传输，post是放在请求体中，但是开发者可以通过抓包工具看到，也相当于是明文的。
        5.get请求会保存在浏览器历史记录中，还可能保存在web服务器的日志中
        6.get方式 服务器端用Request.QueryString获取变量的值 对于post方式 服务器端用Request.Form获取提交的数据
    真相：
        1.首先get和post在本质上都是tcp链接。
        2.但由于http协议和浏览器或者服务器的限制。
        3.从而使它们在应用过程中产生了差别。
        4.但是它们中还有一个较大的区别：
        5.get方式的请求 浏览器会把HTTP Header和data一并发送出去 服务端响应200 请求成功
        6.post方式的请求 浏览器会先发送Http Header给服务端 服务端响应100 continue 告诉浏览器我已准备好接受数据 浏览器再post发送一个data给服务端 服务端响应200 请求成功
        7.post会比get多一个TCP包其实不太严谨 
         多发的那个expect 100 continue header报文
         是由客户端对HTTP的post和get的请求策略决定的
         目的是为了避免浪费资源 避免浪费资源/取决于客户端实现策略
         是否再发送一个包取决于客户端实现策略 和get/post没有什么关系 有的客户端比如fireFox就只发一个包
        8.一层一层的把get和post剖析到底，你会发现他们的本质就是tcp连接，没有啥区别，只是由于http协议规定和浏览器或者服务器的限制，导致他们在应用过程中体现形式不同。
    RFC(Request For Comments):是一系列以编号排定的文件。文件收集了有关互联网相关信息，以及UNIX和互联网社区的软件文件。（来自百度百科）
    RFC就是互联网的规范，我们通常所说的协议就是RFC的方式存在，

    
    　　严格的说：对于GET方式的请求，浏览器会把http header和data一并发送出去，服务器响应200（返回数据）；
    　　而对于POST请求。浏览器先发送header，服务器响应100 continue，浏览器再发送data，服务器响应200 ok（返回数据）
    GET请求的参数是放在请求的URL中，而POST方法是放在请求体中
    GET请求在URL中传递参数时会有长度限制，而POST无限制（不是绝对的，只是相对来说）
    GET请求会被浏览器主动缓存，而POST不会
    GET请求的参数会保存在浏览器中，而POST的参数不会保存在浏览器中
3.HTTP(80端口)和https(443端口)的区别，https有哪些新特性,SSL协议解决了什么，其依靠的算法有哪些
    (HTTP 无CA证书 明文传输 默认80端口 |HTTPS(SSLs 身份验证|加密|完整) 有CA证书 有SSL加密传输协议 默认443端口)
    HTTP定义(Hypertext transfer protocol)超文本传输协议，
        通过浏览器和服务器进行数据交互，进行超文本（文本、图片、视频等）传输的规定。也就是说，HTTP协议规定了超文本传输所要遵守的规则。
    HTTP
        1.灵活可扩展，除了规定空格分隔单词，换行分隔字段以外，其他都没有限制，不仅仅可以传输文本，还可以传输图片、视频等任意资源
        2.可靠传输，基于 TCP/IP 所以继承了这一特性
        3.请求-应答，有来有回
        4.无状态，每次 HTTP 请求都是独立的，无关的、默认不需要保存上下文信息
    缺点：
        1.明文传输不安全
        2.复用一个 TCP 链接，会发生对头拥塞
        3.无状态在长连接场景中，需要保存大量上下文，以避免传输大量重复的信息、
    HTTP 2 改进
        改进性能：
            头部压缩
            多路信道复用
            Server Push
    HTTP与HTTPS区别：
    (HTTP 无CA证书 明文传输 默认80端口 |
    HTTPS(SSLs 身份验证|加密|完整) 有CA证书 有SSL加密传输协议 默认443端口)
    HTTPS = HTTP + SSL/TLS(Secure Socket Layer安全套接层)
        TLS(Transport Layer Security 继任者传输层安全)
            TLS和SSL在传输层对网络连接进行加密
　　1、https有CA证书，http一般没有
　　2、http是超文本传输协议，信息是明文传输。https则是具有安全性的SSL加密传输协议
　　3、http默认80端口，https默认443端口。
    HTTPS新特性:
        1.TLS/SSL内容加密
        2.数字证书(CA)验明身份：防范中间人攻击
        3.MD5,SHA-1等散列值方法防止信息篡改
    HTTPS安全性：
        1.服务器身份验证，通过服务器身份验证，用户可以明确当前它正在与对应的服务器进行通信
        2.数据机密性，其他方无法理解发送的数据内容，因为提交的数据是加密的
        3.数据完整性，传输会携带Message Authentication(MAC)用作验证，因此传输的数据不会被另一方更改
    HTTPS与HTTP比较
        HTTPS 相对于 HTTP 性能上差点，因为多了 SSL/TLS 的几次握手和加密解密的运算处理，但是加密解密的运算处理已经可以通过特有的硬件来加速处理。
    HTTPS优点缺点
        优点：
            1.最大限度地提高 Web 上数据和事务的安全性；
            2.加密用户敏感或者机密信息；
            3.提高搜索引擎中的排名
            4.避免在浏览器中出现“不安全”的提示；
            5.提升用户对网站的信赖。
        缺点：
            1.HTTPS 协议在握手阶段耗时相对较大，会影响页面整体加载速度；
            2.在浏览器和服务器上会更多的 CPU 周期来加密/解密数据；
            3.SSL 证书一般都需要支付一定费用来获取，并且费用往往不低；
            4.并不是绝对意义上的安全，在网站遭受攻击，服务器被劫持时，HTTPS 基本起不到任何安全防护作用。
    原有风险 现有优势
        1.信息窃听  信息加密
        2.信息篡改  完整性校验
        3.信息劫持  身份验证
    SSL协议提供的安全通道有以下三个特性：
        1.机密性：SSL协议使用密钥加密通信数据。
        2.可靠性：服务器和客户都会被认证，客户的认证是可选的。
        3.完整性：SSL协议会对传送的数据进行完整性检查。
    主要包含两部分
        1.Record记录协议
            使用对称加密短发来解决通讯消息加密的部分
        2.Handshake握手协议
            为了完成对称加密，需要通过握手协议来传递密匙  
    加密算法分为两大类：
        1.对称加密算法
            数据加解密使用同一份密钥，加解密速度快，效率高，缺点是密钥的管理难度大，一旦密钥传输泄露，那就没啥用处了。
        2.非对称加密算法
            数据加解密使用公钥和私钥，公钥用于传输，私钥自己保存，安全性较高，但加解密速度偏慢。
    公钥和私钥的概念
        1.私钥（放在服务器上，用于公钥加密过的数据），不会放在互联网上传输；
        2.公钥（放在互联网上，所有人都能拿到的一串加密的字符串，这个加密的字符串是来加密我们的字符信息的。当加密的数据传到服务器上，只有服务器通过私钥解密，才能把公钥加密的数据拿出来）
    握手阶段分为五步
4.Cookie Session 和Token JWT(基于token实现)(客户端和服务器端进行会话验证的凭证)
    Cookie Session Token 存在的意义
        (HTTP无状态协议 浏览器不会保留任何会话信息 服务端无法确定访问者 用于客户端和服务端进行会话验证的凭证)

        (Cookie里可以存储JSON格式的数据 JSON格式数据其实就是符合key-value键值对的字符串格式数据)
        (HTTP无状态协议 浏览器不会保存任何会话信息 服务器端无法确定访问者 用于客户端和服务器端进行会话验证的凭证 )
        (Cookie 存储在客户端 只能存储字符串数据 可设置任意时间有效 不超过4k
        |Session(基于Cookie实现) 存储在服务器端 SessionId存储在Cookie中 任意类型数据 失效时间短 存储容量大)
        (Session认证过程 客户端请求 服务端创建返回 客户端收到存储 再次访问带上 服务端从Cookie中找SessionId找对应Session
            1.客户端第一次发送请求到服务端，服务端根据信息创建对应的Session，并在响应头返回SessionID(Set-Cookie)
            2.客户端接收到服务器端返回的SessionID后，会将此信息存储在Cookie上，同时会记录这个SessionID属于哪个域名
        )
            3.当客户端再次访问服务器端时，请求会自动判断该域名下是否存在Cookie信息，如果有则发给服务器端，服务器端会从Cookie中拿到SessionID，再根据SessionID找到对应的Session，如果有对应的Session则通过，继续执行请求，否则就中断
        (Token 访问API所需资源凭证 不需存储服务端 服务端只需根据客户端传来的token进行合法验证)
        (JWT:基于token实现 流程
            1.客户端发送用户信息给服务端请求登录
            2.服务端验证用户信息，验证通过后签发一个 Token 返回给客户端，客户端收到后会存储在 Cookie/localStorage 中
            3.客户端继续第二次业务请求，请求头的 Authorization 字段携带这个 Token或者直接放在 Cookie(但是这样就不能跨域了)
            4.服务端根据 headers 中的 Token 进行验证，验证通过后返回业务请求的数据
                JWT机制和/Session机制十分相似
        )
        (Session和Token Session 是一种记录服务器和客户端会话状态的机制，使服务端有状态化，可以记录会话信息。
         Token 是令牌，访问资源接口（API）时所需要的资源凭证。Token 使服务端无状态化，不会存储会话信息。)
         (JWT:存放在cookie中 存放在localStorage中)
         (服务端验证客户端发来的token信息要进行数据的查询操作；JWT验证客户端发来的token信息就不用， 在服务端使用密钥校验就可以，不用数据库的查询。)
        HTTP是一种无状态协议 无法确保每一次会话是否为同一个用户发出 浏览器不会保留任何会话信息 所以服务器端也就无法确定访问者信息，因此浏览器和服务端会进行一个会话跟踪，在进行一些特殊用户权限才有的操作时，将用户状态用Cookie或Session保存起来
    Cookie Session ：将用户状态用cookie和session保存起来 主要用于客户端和服务端进行会话验证的凭证
    Cookie：(存储在客户端)
        一种主要用于客户端和服务端进行会话验证的凭证
        属性表：
            1.name=value String 键值对,字符串类型，用于设置Cookie 的名称和值        
            2.expires 符合 HTTP-date 规范的时间戳 指定Cookie 的生存期，用于设置Cookie的过期时间
            3.max-age non-zero-digit 在 cookie 失效之前需要经过的秒数,与expires功能相似
            4.domain 域名String 指定Cookie 所属的域名，默认为当前域名
            5.path URL 路径 指定 cookie 在哪个路径（路由）下生效，默认是 '/'
        创建方式:
            1.客户端通过js设置，举例，用一个js-cookies库 已封装好document.cookie方法
            2.服务器端通过在HTTP响应头设置Set-Cookie
                服务器端设置后，客户端再次同一服务端发起请求时，就会携带这个Cookie并发到服务端上
                在域名相同(端口号不同的跨域)的情况下，Cookie是可以共享的，而其他跨域情况则无法共享
    Session：(session存储在服务器端 SessionId存储在客户端的Cookie中 安全性比cookie高)
        1.基于Cookie实现的另一种记录服务器端和客户端会话状态的机制
        2.Session存储在服务端，而SessionId会被存储在客户端的Cookie中
        认证过程：
            1.客户端第一次发送请求到服务端，服务端根据信息创建对应的Session，并在响应头返回SessionID(也就是Set-Cookie)
            2.客户端接收到服务器端返回的SessionID后，会将此信息存储在Cookie上，同时会记录这个SessionID属于哪个域名
            3.当客户端再次访问服务器端时，请求会自动判断该域名下是否存在Cookie信息，如果有则发给服务器端，服务器端会从Cookie中拿到SessionID，再根据SessionID找到对应的Session，如果有对应的Session则通过，继续执行请求，否则就中断
        缺点及解决方案：
            扩展性不好，Session面对服务器集群是无法共享Session的。
            Session是存储在Tomcat容器中的，所以如果后端机器是多台的话，多个机器间是无法共享Session的，此时可以使用Spring提供的分布式Session的解决方案，将Session放在Redis中
    Cookie和Session区别：
        1.安全性:因为Cookie可以通过刻划断修改，而Session只能在服务器端设置，所以安全性比Cookie高，一般会用于验证用户登陆状态
        2.适用性：Cookie只能存储字符串数据，而Session可以存储任意类型数据
        3.有效性 Cookie可以设置任意时间有效，而Session一般失效事件短
        4.继承性 一般客户端设置Cookie，如果要用于验证就需要服务器端创建Session
    Token：(访问API所需资源凭证 不需存储服务端 服务端只需根据客户端传来的token进行合法验证)
        访问资源接口(API-Application Programming Interface)时所需要的资源凭证，与Session相比，token的优点时不需要存储数据在服务端，服务端只需要根据客户端传来的token进行合法验证，通过后则返回请求资源即可，减轻了服务器端的资源占用压力，目前最流行的JWT(JSON WEB TOKEN)就是基于token实现，以下以JWT标准介绍token
    JWT认证流程：
        1.客户端发送用户信息给服务端请求登录
        2.服务端验证用户信息，验证通过后签发一个 Token 返回给客户端，客户端收到后会存储在 Cookie 或 localStorage 中
        3.客户端继续第二次业务请求，请求头的 Authorization 字段携带这个 Token或者直接放在 Cookie(但是这样就不能跨域了)
        4.服务端根据 headers 中的 Token 进行验证，验证通过后返回业务请求的数据
    JWT优点：
        1.可用于应用管理，避开同源策略
        2.避免 CSRF(Cross Site Request Forgery) 跨站请求伪造 攻击
        3.实现无状态服务端，能够在多个服务间使用，可扩展性好
5.cookie session token JWT
    Cookie Session ：将用户状态用cookie和session保存起来 主要用于客户端和服务端进行会话验证的凭证
    1.Cookie(存储在客户端Client)
        定义：
            指某些网站为了辨别用户身份而储存在用户本地终端（Client Side）上的数据（通常经过加密）。
        Cookie的工作原理：
            (服务器单从网络连接上无从知道客户身份)
            HTTP是一种无状态传输协议，它不能以状态来区分和管理请求和响应。
            服务器单从网络连接上无从知道客户身份。于是给客户端发布一个通行证—cookie来区
        1.服务器通过response的set-cookie告诉客户端去写入cookie，后面的请求都会携带该cookie。
            cookie有以下重要参数：
                name=value
                domain
                path
                maxAge
                expires
                secure
                httpOnly
    2.Session(存储在服务器端Server)
        (使服务端有状态化 可以记录会话信息)
        使服务端有状态化，可以记录会话信息。
        定义：
            另一种记录服务器和客户端会话状态的机制。
            session存储在服务器端，该会话对应的key即sessionId会被存储到客户端的cookie中。
            session通过cookie来传递sessionId，达到用户鉴权的目的。
            除此之外，sessionId也可以不通过cookie传递，比如通过response返回客户端，再当作请求的参数传递给服务器去验证。
    Cookie 和 Session 对比
        1.安全性： 
            Session 比 Cookie 安全，Session 是存储在服务器端的，Cookie 是存储在客户端的。
        2.存取值的类型：
            Cookie只支持存字符串数据，想要设置其他类型的数据，需要将其转换成字符串，Session 可以存任意数据类型。
        3.有效期：
             Cookie可设置为长时间保持，比如我们经常使用的默认登录功能，
             Session 一般失效时间较短，客户端关闭（默认情况下）或者 Session 超时都会失效。
        4.存储大小：
             单个 Cookie 保存的数据不能超过 4K，Session 可存储数据远高于 Cookie，但是当访问量过多，会占用过多的服务器资源。
    session缺点：
        1.占资源： 每个经过认证的用户都要存放session到内存中，而随着认证用户的增多，服务端的开销较大。
        2.CSRF攻击：基于cookie来进行用户识别时,用户cookie如果被截获，就容易受到跨站请求伪造的攻击。
    3.Token(令牌)
        定义：
            token(令牌) 是一串字符串，通常作为鉴权凭据，最常用的使用场景是 API 鉴权。
         token 主要有三种：
            1.自定义的 token：开发者根据业务逻辑自定义的 token
            2.JWT：JSON Web Token，定义在 RFC 7519 中的一种 token 规范
            3.Oauth2.0：定义在 RFC 6750 中的一种授权规范，其实并不是一种 token，只是其中也有用到 token。
        token特点：
            1.服务端无状态化、可扩展性好
            2.支持移动端设备
            3.安全性高
            4.支持跨程序调用
        token鉴权流程：
            。。。
        Refresh Token：
            专用于刷新 access token 的 token。Access Token的有效期比较 短，当 Acesss Token 由于过期而失效时，使用 Refresh Token 就可以获取到新的 Token，如果 Refresh Token过期就只能重新登陆了。
        Token 和 Session 的区别：
            1.Session 是一种记录服务器和客户端会话状态的机制，使服务端有状态化，可以记录会话信息。
            Token 是令牌，访问资源接口（API）时所需要的资源凭证。Token 使服务端无状态化，不会存储会话信息。
            2.Session 和 Token 并不矛盾，作为身份认证 Token 安全性比 Session 好，因为每一个请求都有签名还能防止监听以及重放攻击
            3.而 Session 就必须依赖链路层来保障通讯安全了。如果你需要实现有状态的会话，仍然可以增加 Session 来在服务器端保存一些状态。
            4.所谓 Session 认证只是简单的把 User 信息存储到 Session 里，因为 SessionID 的不可预测性，暂且认为是安全的。而 Token ，如果指的是 OAuth Token 或类似的机制的话，提供的是 认证 和 授权 ，认证是针对用户，授权是针对 App 。其目的是让某 App 有权利访问某用户的信息。
    4.JWT
        JSON Web Token（简称JWT）是目前最流行的跨域认证解决方案，是一种认证授权机制，是一种基于 JSON 的开放标准。
        组成：
            一个 JWT token 是一个字符串，它由头部、载荷与签名三部分组成，中间用 . 分隔，形式如下：
            base64(header).base64(json payload).signature
        认证流程：
            1.用户输入用户名/密码登录，服务端认证成功后，会返回给客户端一个 JWT。
            2.客户端将 jwt 保存到本地，当用户希望访问一个受保护的路由或者资源的时候，需要请求头的 Authorization 字段中使用 Bearer 模式添加 JWT 。
            3.服务端的保护路由将会检查请求头 Authorization 中的 JWT 信息，如果合法，则允许访问。因为 JWT 内部包含了一些用户信息，因此减少了需要查询数据库的需要。
        使用方式：
            1、存放在cookie中
            当用户希望访问一个受保护的路由或者资源的时候，可以把它放在 Cookie 里面自动发送，但是这样不能跨域。
            2、存放在localstorage中，添加到header中发送
            请求时放在 HTTP 请求头信息的 Authorization 字段里，使用 Bearer 模式添加 JWT。
            Authorization: Bearer <token>
            3、通过接口参数
            可以把 JWT 放在 POST 请求的数据体里，或者通过 URL 的 queryString 传输。
    自定义Token 和 JWT 的关系：
        相同点： 
            都是访问资源的令牌，都可以记录用户的信息，都是使服务端无状态化，都是只有验证成功后，客户端才能访问服务端上受保护的资源
        区别：
            服务端验证客户端发来的token信息要进行数据的查询操作；
            JWT验证客户端发来的token信息就不用， 在服务端使用密钥校验就可以，不用数据库的查询。
    5、各种鉴权方式注意点
        使用 cookie 注意点
            1.因为存储在客户端，容易被客户端篡改，使用前需要验证合法性
            2.不要存储敏感数据，比如用户密码，账户余额
            3.使用 httpOnly 在一定程度上提高安全性
            4.尽量减少 cookie 的体积，能存储的数据量不能超过 4kb
            设置正确的 domain 和 path，减少数据传输
            5.cookie 无法跨域，子域名可以访问父域名
            6.一个浏览器针对一个网站最多存 20 个Cookie，浏览器一般只允许存放 300 个Cookie
            7.移动端对 cookie 的支持不是很好，而 session 一般基于 cookie 实现，所以移动端常用的是 token
        使用 session 注意点
            1.用户同时在线量较多时，session 存储在服务器会占据较多内存，需要定期清理过期 的 session
            2.当网站采用集群部署的时候，会遇到多台 web 服务器之间如何做 session 共享的问题。因为 session是由单个服务器创建的，处理用户请求的服务器不一定是 那个创建 session 的服务器，那么该服务器就无法拿到之前已经放入到 session 中的登录凭证之类的信息了。
            3.当多个应用要共享 session时，因为不同的应用可能部署的主机不一样需要在各个应用做好 cookie 跨域的处理。
            4.sessionId 是存储在 cookie 中的，假如浏览器禁止 cookie 或不支持 cookie ，一般会把 sessionId 跟在 url 参数后面即重写 url，所以 session 不一定非得需要靠 cookie 实现
        使用 token 注意点
            1.如果你认为用数据库来存储 token会导致查询时间太长，可以选择放在 内存当中，比如 redis 很适合你对 token 查询的需求。
            2.token 完全由应用管理，所以它可以避开同源策略
            3.token 可以避免 CSRF 攻击(因为不需要 cookie 了)
            4.移动端对 cookie 的支持不是很好，而 session 需要基于 cookie 实现，所以移动端常用的是 token
        使用 JWT 时需要考虑的问题
            1.JWT 默认是不加密，但也是可以加密的。生成原始 Token 以后，可以用密钥再加密一次。
            2.JWT 不加密的情况下，不能将秘密数据写入 JWT。
            3.JWT 不仅可以用于认证，也可以用于交换信息。有效使用 JWT，可以降低服务器查询数据库的次数。
            4.JWT 最大的优势是服务器不再需要存储Session，使得服务器认证鉴权业务可以方便扩展。
                但这也是 JWT 最大的缺点：由于服务器不需要存储 Session 状态，因此使用过程中无法废弃某个 Token 或者更改 Token 的权限。也就是说一旦 JWT 签发了，到期之前就会始终有效，除非服务器部署额外的逻辑。
            5.JWT 本身包含了认证信息，一旦泄露，任何人都可以获得该令牌的所有权限。为了减少盗用，JWT的有效期应该设置得比较短。对于一些比较重要的权限，使用时应该再次对用户进行认证。
            6.JWT 适合一次性的命令认证，颁发一个有效期极短的JWT，即使暴露了危险也很小由 于每次操作都会生成新的 JWT，因此也没必要保存 JWT，真正实现无状态。
            7.为了减少盗用，JWT 不应该使用 HTTP 协议明码传输，要使用 HTTPS 协议传输。
6.localStorage(Document源对象 本地存储 除非手动清除否则一直有效)和 
    sessionStorage(session Storage对象 会话存储 会话结束时清除 浏览器关闭前有效)---解决了cookie存储空间不足问题 与cookie对比
    (5M|同源策略跨域无法访问|仅存储在客户端|以key和value形式存储数据)
    1.简介
        1.sessionStorage 和 localStorage 是 HTML5 新增的两个特性，这两个特性主要是用来作为会话存储和本地存储来使用的，解决了 cookie 存储空间不足的问题；
        2.sessionStorage 属性允许你访问一个 session Storage 对象，用于存储当前会话的数据，存储在 sessionStorage 里面的数据在页面会话结束时会被清除。页面会话在浏览器打开期间一直保持，并且重新加载或恢复页面仍会保持原来的页面会话。
        3.localStorage 属性允许你访问一个 Document 源(origin)的对象 Storage 用于存储当前源的数据，除非用户人为清除(调用 localStorage api 或则清除浏览器数据)， 否则存储在 localStorage 的数据将被长期保留。
    2. 相同点
        1.存储大小一般均为5M左右
        2.都有同源策略限制，跨域无法访问
        3.数据仅在客户端中保进行存储，并不参与和服务器的通信(不会随着 http 请求发送到服务器)
        4.以 key 和 value 的形式进行存储数据， value 值必须为字符串，不为字符串会自动转型( value 如果是对象则需要转为 json 进行存储)
    3.不同点
        1.生命周期
            1.localStorage 存储的数据是永久性的，除非用户人为删除否则会一直存在(调用 localStorage api 或则清除浏览器数据)。
            2.sessionStorage 存储的数据在当前会话结束时会被清除，一旦窗口或者标签页被关闭，那么所有通过 sessionStorage 存储的数据也会被删除。
        2.作用域
            1.localStorage: 在同一个浏览器内，同源文档之间共享 localStorage 数据，可以互相读取、覆盖、清除(同浏览器限制、同源限制)
            2.sessionStorage: 与 localStorage 一样需要同一浏览器同源文档这一条件。除此之外 sessionStorage 的作用域还被限定在了窗口中，也就是说，只有同一浏览器、同一窗口的同源文档才能共享数据(同浏览器限制、同源限制、同标签页限制)
    4.操作
        sessionStorage localStorage 在操作上没什么区别，下面以 sessionStorage 为例：
            1. 新增、修改
                1.通过 setItem 添加、修改数据
                2.通过对象的形式添加、修改数据
                3.通过浏览器(chrome)控制台查看数据:
            2.获取数据
                1.通过 getItem 获取数据
                2.通过对象的形式获取数据
                3.通过 length 属性存储数量
            3.移除数据
                1.通过 removeItem 移除指定数据
                2.通过对象的形式移除指定数据
                3.移除当前作用域下所有数据  
                6.Cookie、sessionStorage、localStorage区别
    5.cookie(在浏览器和服务器间来回传递) sessionStorage localStorage(不会自动把数据发给服务器，仅在本地保存)对比
    共同点：
        都是保存在浏览器端，且同源的。 
    区别：
        （1）cookie数据始终在同源的http请求中携带，即cookie在浏览器和服务器间来回传递。
            sessionStorage和localStorage不会自动把数据发给服务器，仅在本地保存。
        （2）cookie数据不能超过4k(适合保存小数据)。 
        sessionStorage和localStorage容量较大，
        （3）数据有效期不同。
            sessionStorage：仅在当前浏览器窗口关闭前有效。
            localStorage：始终有效，窗口或浏览器关闭也一直保存，需手动清除；
            cookie只在设置的cookie过期时间之前一直有效，即使窗口或浏览器关闭。
        （4）作用域不同。
            sessionStorage不在不同的浏览器窗口中共享；
            localStorage 在所有同源窗口中都是共享的；
            cookie也是在所有同源窗口中都是共享的。
    应用场景：
        localStorage：
            常用于长期登录（+判断用户是否已登录），适合长期保存在本地的数据。
        sessionStorage ：
            敏感账号一次性登录；
        cookies：
            与服务器交互。
7.前端鉴权方案
    常见的前端解决方案
        1.HTTP Basic Authentication、
            概念：
                HTTP Basic Authentication授权方式是浏览器遵守http协议实现的基本授权方式，HTTP协议进行通信的过程中，HTTP协议定义了允许HTTP服务器对客户端进行用户身份验证的方法。
            认证过程
                第一步：客户端向服务器请求数据，请求的内容可能是一个网页或者是一个ajax异步请求，此时，假设客户端尚未被验证；
                  第二步：服务器向客户端发送验证请求代码401，然后弹出用户登录界面；
                  第三步：用户输入用户信息和密码，浏览器会自动以base64形式进行加密；
                  第四步：服务器收到请求之后，将信息解密，将其与数据库中的用户信息进行对比，一直的话返回用户需要的请求内容。
                  登录失效的方案：在注销操作的时候，专门在服务器设置一个专门的注销账号，当接收到的Authentication信息为注销用户名密码的时候便注销成功了，而客户端在注销操作的时候，手动的去修改请求头的Authentication，将它设置为服务器默认的注销账号和密码。
        2.session-cookie、
            概念：
                利用服务器端的session（会话）和浏览器端的cookie来实现前后端的认证，由于http请求时是无状态的，需要在服务器端创建一个会话(seesion),将同一个客户端的请求都维护在各自得会会话中，每当请求到达服务器端的时候，先去查一下该客户端有没有在服务器端创建seesion，如果有则已经认证成功了，否则就没有认证。
            认证过程：
                1.服务器在接受客户端首次访问时在服务器端创建seesion，然后保存seesion到内存当中，然后给这个session生成一个唯一的标识字符串,然后在响应头中种下这个唯一标识字符串。
                 2.浏览器中收到请求响应的时候会解析响应头，然后将session_id保存在本地cookie中，浏览器在下次http请求时请求头中会带上该域名下的cookie信息
                 3.服务器在接受客户端请求时会去解析请求头cookie中的session_id，然后根据这个session_id去找服务器端保存的该客户端的session，然后判断该请求是否合法.
        3.Token 验证、
            认证过程：
                1.客户端使用用户名跟密码请求登录；
                2.服务端收到请求，去验证用户名与密码；
                3.验证成功后，服务端会签发一个 Token，再把这个 Token 发送给客户端；
                4.客户端收到Token以后可以把它存储起来，比如放在Cookie 里或者Local Storage里；
                5.客户端每次向服务端请求资源的时候需要带着服务端签发的Token；
                6.服务端收到请求，然后去验证客户端请求里面带着的 Token，如果验证成功，就向客户端返回请求的数据。
            token验证方案JWT：
                一、JWT概念
                      JWT是Auth0提出的通过对JSON进行加密签名来实现授权验证的方案，就是登陆成功后将相关信息组成json对象，然后对这个对象进行某种方式的加密，返回给客户端，客户端在下次请求时带上这个token，服务端再收到请求时校验token合法性，其实也就是在校验请求的合法性。
                    二、JWT组成
                     Headers： 包括类别（typ）、加密算法（alg）；
                     Claims ：包括需要传递的用户信息；
                     Signature： 根据alg算法与私有秘钥进行加密得到的签名字串，这一段是最重要的敏感信息，只能在服务端解密；
        4.OAuth(开放授权)、
            概念：
                OAuth（开放授权）是一个开放标准，允许用户授权第三方网站访问他们存储在另外的服务提供者上的信息，而不需要将用户名和密码提供给第三方网站或分享他们数据的所有内容，为了保护用户数据的安全和隐私，第三方网站访问用户数据前都需要显式的向用户征求授权。我们常见的提供OAuth认证服务的厂商有支付宝，QQ,微信。
            OAuth认证过程
                第一步：向用户请求授权，而当我们点击等第三方入口时，第三方授权服务会引导我们进入第三方登陆授权页面；
                  第二步：当用户点击授权并登陆后，授权服务器将生成一个用户凭证（code）。这个用户凭证会附加在重定向的地址redirect_uri的后面；
                  第三步：用户再去请求时携带用户凭证（code），验证服务器返回一个访问令牌（Access Token）；
                  第四步：再去拿着令牌请求资源时，就会得到受保护的资源信息。
8.JSON和JSONP
    JSON(JavaScript Object Notation)
        一种轻量级的数据交换格式
    JSONP(JavaScript With Padding) 被包裹的JSON
        一个非官方的协议 它允许在服务器端集成Scripttags返回至客户端 通过JavaScript callback形式实现跨域访问
9.跨域相关
    (无论怎样的跨域资源获取方案 本质上都需要服务器端的支持)
    (JSONP CORS Node中间件代理 nginx反向代理 postMessage)
    1.为什么会出现跨域问题？
        出于浏览器的同源策略限制，浏览器会拒绝跨域请求。
        (严格的说，浏览器并不是拒绝所有的跨域请求，实际上拒绝的是跨域的读操作。浏览器的同源限制策略是这样执行的：)
        跨域并不是请求发不出去，请求能发出去，服务端能收到请求并正常返回结果，只是结果被浏览器拦截了。
        目的：
            主要是用来防止 CSRF(Cross-site Request forgery跨站请求伪造) 攻击的。简单点说，CSRF 攻击是利用用户的登录态发起恶意请求。
    2.什么情况才算作跨域？
        非同源请求，均为跨域。
    3.同源
        源(origin) = 协议(protocol)+端口(port)+主机/域名(host)
    4.为什么有跨域需求
        场景 —— 工程服务化后，不同职责的服务分散在不同的工程中，往往这些工程的域名是不同的，但一个需求可能需要对应到多个服务，这时便需要调用不同服务的接口，因此会出现跨域。

       ( 1.JSONP:(需服务器端配合|利用script标签没有限制跨域的漏洞|兼容性好实现简单|只支持get请求|容易受到XSS攻击)
        2.CORS(主要依靠后端配置|前端设置Access-Control-Allow-Origin即可开启CORS|前端分简单请求和非简单请求|存在兼容问题 支持post请求)
        3.Node中间件代理(跨域问题限制的是浏览器 搭建中间件服务器转发请求和响应)
        4.nginx反向代理 类似Node中间件服务器，通过nginx代理服务器实现。 实现方法：下载安装nginx，修改配置。
        5.postMessage(H5新增) 使用它来向其它的window对象发送消息，无论这个window对象是属于同源或不同源)

    5.五种跨域方法 JSONP CORS Node中间件代理 nginx反向代理 postMessage(H5新增)
        1.JSONP(JSON with padding)--需要服务器端配合

            JSONP:(需服务器端配合|利用script标签没有限制跨域的漏洞|兼容性好实现简单|只支持get请求|容易受到XSS攻击)
                应用JSON的一种新方法，JSONP看起来和JSON差不多，只不过是被包含在函数调用的JSON，像这样：callback({name: 'nany'})。
            实现原理：
                虽然因为同源策略的影响，不能通过XMLHttpRequest请求不同域上的数据（Cross-origin reads）。
                但是，在页面上引入不同域上的js脚本文件却是可以的（Cross-origin embedding）。因此在js文件载入完毕之后，触发回调，可以将需要的data作为参数传入。
                利用script标签没有跨域限制的漏洞，使得网页可以得到从其他来源动态产生的JSON数据（前提是服务器支持）。
            实现方式(需前后端配合):
            优点:兼容性好（兼容低版本IE）,实现简单
            缺点：
                1.JSONP只支持GET请求；
                2.XMLHttpRequest相对于JSONP有着更好的错误处理机制       
                3.容易受到XSS(跨站脚本)攻击 
        2.CORS Cross-origin resource sharing 跨域资源共享
        (主要依靠后端配置|前端设置Access-Control-Allow-Origin即可开启CORS|前端分简单请求和非简单请求|存在兼容问题 支持post请求)  
            (异步请求 
                前端分：
                    简单请求 
                    非简单请求
                        会先发送一次预检请求)
            1.浏览器会自动进行 CORS 通信，实现 CORS 通信的关键是后端。只要后端实现了 CORS，就实现了跨域。
            2.服务端设置 Access-Control-Allow-Origin 就可以开启 CORS。
            3.该属性表示哪些域名可以访问资源，如果设置通配符则表示所有网站都可以访问资源。
            4.虽然设置 CORS 和前端没什么关系，但是通过这种方式解决跨域问题的话，会在发送请求时出现两种情况，分别为简单请求和复杂请求。
            原理：
                服务器端设置Access-Control-Allow-Origin以开启CORS。该属性表示哪些域名可以访问资源，如设置通配符则表示所有网站均可访问。
            CORS 是W3C 推荐的一种新的官方方案，能使服务器支持 XMLHttpRequest 的跨域请求。CORS 实现起来非常方便，只需要增加一些 HTTP 头，让服务器能声明允许的访问来源。
            值得注意的是，通常使用CORS时，
            异步请求会被分为
                1.简单请求
                    仅当POST方法的Content-Type值等于下列之一才算作简单请求
                        1.text/plain
                        2.multipart/form-data
                        3.application/x-www-form-urlencoded
                        请求中的任意 XMLHttpRequestUpload 对象均没有注册任何事件监听器； XMLHttpRequestUpload 对象可以使用 XMLHttpRequest.upload 属性访问。
                2.非简单/复杂请求 会先发一次预检请求。
                    对于复杂请求来说，首先会发起一个预检请求，该请求是option方法的，通过该请求来知道服务端是否允许跨域请求。
                    1.使用了下面任一 HTTP 方法：
                        PUT
                        DELETE
                        CONNECT
                        OPTIONS
                        TRACE
                        PATCH 
                    2.人为设置了对 CORS 安全的首部字段集合之外的其他首部字段。该集合为：
                        Accept
                        Accept-Language
                        Content-Language
                        Content-Type (but note the additional requirements below)
                        DPR
                        Downlink
                        Save-Data
                        Viewport-Width
                        Width 
                    3.Content-Type 的值不属于下列之一:
                        application/x-www-form-urlencoded
                        multipart/form-data
                        text/plain
                    请求流程：
                        发送真正请求前会先发送预检请求
                        1.第一条OPTIONS为预检请求，中同时携带了下面两个首部字段：
                            Access-Control-Request-Method: POST
                                告诉服务器，之后的实际请求将使用POST方式。
                            Access-Control-Request-Headers:X-PINGOTHER
                                告诉服务器，实际请求将携带两个自定义请求首部字段：X-PINGOTHER 与 Content-Type。服务器据此决定，该实际请求是否被允许
            优缺点
                1.使用简单方便，更为安全
                2.支持 POST 请求方式，
                3.CORS是一种新型的跨域问题的解决方案，存在兼容问题，仅支持IE 10以上
        3.Node中间件代理(跨域问题限制的是浏览器 搭建中间件服务器转发请求和响应)
            原理：同源策略仅是浏览器需要遵循的策略，故搭建中间件服务器转发请求与响应，达到跨域目的。
            类似于将跨域请求交给第三方，第三方去访问指定的网络，获取数据然后返回
        4.nginx反向代理 类似Node中间件服务器，通过nginx代理服务器实现。 实现方法：下载安装nginx，修改配置。
                正向代理：隐藏了客户端
                反向代理：隐藏了服务端(如VPN)
            原理：
            类似Node中间件服务器，通过nginx代理服务器实现。
            实现方法：下载安装nginx，修改配置。
        5.postMessage(H5新增) 使用它来向其它的window对象发送消息，无论这个window对象是属于同源或不同源
            1.window.postMessage(message,targetOrigin) 方法是html5新引进的特性
            2.可以使用它来向其它的window对象发送消息，无论这个window对象是属于同源或不同源
            3.目前IE8+、FireFox、Chrome、Opera等浏览器都已经支持window.postMessage方法。
            调用postMessage方法的window对象是指要接收消息的那一个window对象，该方法的第一个参数message为要发送的消息，类型只能为字符串；第二个参数targetOrigin用来限定接收消息的那个window对象所在的域，如果不想限定域，可以使用通配符* 。
            需要接收消息的window对象，可是通过监听自身的message事件来获取传过来的消息，消息内容储存在该事件对象的data属性中。
        6.Web Sockets
            原理：
                JS创建了web socket之后，会有一个HTTP请求发送到浏览器以发起连接。取得服务器响应后，建立的连接会使用HTTP升级从HTTP协议交换为web sockt协议。
        

9.multipart/form-data&
application/json&
application/www-form-urlencoded区别
        1.application/json
        application/x-www-form-urlencoded
        都是表单数据发送时的编码类型
        2.EncType
            EncType属性规定在发送到服务器之前应该如何对表单数据进行编码
            默认的 表单数据会编码为"application/www-form-urlencoded"即发送到服务器之前 所有字符都会进行编码
        3.application/x-www-form-urlencoded编码类型的发送和接收
            窗体数据编码为名称/值对
            客户端：
                发送"test=I'm Egret"浏览器按F12 NetWork中查看发送数据   
            服务端：
                接收test数据
                echo $_POST["test"]
        4.application/json的发送和接收
            序列化后的JSON字符串
            客户端：
                发送JSON格式字符串'{"test":"I'm Client"}'
            服务端:
                1.用file_get_contents拿到post数据 $_POST['test']取不到数据
                2.然后使用json_decode解码 
                3. php中json访问方式 $json->test。php中没有{test:"I'm Client"}这种格式的，$json = {test:"I'm Client"}会报错。
                4. 返回数据时将数组json_encode编码。php中json格式没有，用数组代替。
                使用json格式，php头部需要加上如下代码，否则会报错。
                header('Access-Control-Allow-Headers:x-requested-with,content-type');
        5.application/x-www-form-urlencoded
            窗体数据被编码为名称/值对 标准的编码格式
        multipart/form-data
            窗体数据被编码为一条信息 页面上每个控件对应消息的一个部分
        text/plain
            窗体数据以纯文本形式进行编码 其中不包含任何控件或格式字符
        6.
        form的enctype属性为编码方式
            常用有两种：application/x-www-form-urlencoded
                        multipart/form-data
                   默认为application/x-www-form-urlencoded
        当action为get时
            浏览器用x-www-form-urlencoded编码方式把form数据转换成一个字符串(name1=value&name2=value2)然后把这个字串 append到url后面 用?分割 加载这个新的url
        当action为post时
            浏览器把form数据封装到http body中 然后发送到server
        如果没有type=file的控价 
            用默认的application/x-www-form-urlencoded即可
        如果有type=file
            用到multipart/form-data 浏览器会把整个表单以控件为单位分割 并为每个部分都加上Content-Disposition
            (form-data/file) Content-Type(默认为text/plain) name(控件name)等信息 并加上分隔符(boundary)
        7.application/x-www-form-urlencoded与multipart/form-data区别(提交数据时编码格式)
            1.form元素的enctype属性指定了表单数据向服务器提交时所采用的编码类型 默认缺省值是application/x-www-form-urlencoded
            2.向服务器发送大量文本 包含非ASCII字符的文本/二进制数据时这种编码方式效率很低
            3.文件上载时 所使用的编码类型 应当 是 multipart/form-data 它既可以发送文本数据yy也支持二进制数据上传
            4.Browser端<form>表单的ENCTYPE属性值为multipart/form-data 它告诉我们传输的数据要用到多媒体传输协议 由于多媒体传输的都是大量数据 所以规定上传文件必须是post方法<input>的type属性必须是file

            在Form元素的语法中 EncType表明提交数据的格式用Enctype属性指定将数据回发到服务器时浏览器使用的编码类型
            下面是说明:
                application/x-www-form-urlencoded
                    窗体数据被编码成名称/值对 这是标准的编码格式
                multipart/form-data
                    窗体数据以纯文本形式机型编码 其中不含任何控件或格式字符
                text/plain：
                    窗口数据以纯文本形式进行编码 其中不含任何控件或格式字符
            补充:
                form的ENCTYPE属性为编码方式 
                常用的有两种         
                    application/x-www-form-urlencoded(默认)
                    multipart/form-data
                当action为get时
                    浏览器用x-www-form-urlencoded编码方式把form数据转化成一个字符串(name1=value1&name2=value2&name3=value3)然后把这个字符串append到url后面 用?分割加载这个新的url
                当action为post时
                    浏览器把form数据封装到http body中 然后发送到server 
                        1.如果没有type=file的控件 用默认的的application/x-www-form-urlencoded即可
                        2.如果有type=file 要用到multipart/form-data浏览器会把整个表单以控件为单位分割 并为每个部分加上Content-Disposition(form-data/file)Content-Type(默认为text/plain)name(控件name)等信息 并加上分割符(boundary)
10.四种常见的POST提交数据方式
    HTTP/1.1协议 规定的HTTP请求方法有OPTIONS GET HEAD POST PUT DELETE TRACE CONNECT 这几种
    其中POST一般用来向服务端提交数据

    HTTP协议是以ASCII码传输 建立在TCP/IP协议之上的应用层规范
    规范把HTTP请求分为三部分
        1.状态行    <method><request-URL><version>
        2.请求头    <header>
        3.消息主体  <entity-body>
    
    协议规定POST提交数据必须放在消息主体(entity-body)中
    但协议并没有规定数据必须使用什么编码格式
    实际上开发者完全可以自己决定消息主体的格式 只要最后发送的HTTP请求满足上面格式即可

    数据发送出去还要服务端解析成功才有意义
    一般服务器语言如php python等 以及它们的framework都内置了自动解析常见数据格式的功能
    服务器端通常是根据请求头(headers)中Content-Type字段来获知请求中的消息主体是用何种方式编码 再对主体进行解析
    
    所以说到POST提交数据方案 包含Content-Type和消息主题编码方式两部分

    具体介绍
        1.application/x-www-form-urlencoded
            最常见的post提交数据方式
            浏览器原生form表单 不设置ENCTYPE属性最终会以application/x-www-form-urlencoded方式提交数据
                很多时候 我们用AJAX提交数据时也是使用这种方式
            例如JQuery和QWrap的Ajax Content-Type默认值都是
            application/x-www-form-urlencoded
        2.multipart/form-data
            一个常见的POST数据提交方式
            使用表单上传文件时 必须让form的ENCTYPE等于这个值
            这种方式一般用来上传文件 各大服务端语言对它也有良好的支持
        PS:上面提到的这两种post数据的方式 都是浏览器原生支持的 而且现阶段原生form表单也只支持这两种方式 
        但是随着越来越多的Web站点 尤其是WebApp全部使用AJAX进行数据交互之后 我们完全可以定义新的数据提交方式 
        3.application/json
            把它当作请求头 用来告诉服务端消息主体是序列化后的JSON字符串 由于JSON规范的流行 除了低版本IE之外的各大浏览器都原生支持JSON.stringfy 服务端语言也都有处理JSON的函数使用JSON不会遇上什么麻烦
            JSON格式支持比键值对复杂得多的结构化数据   
        4.text/xml
            XML-RPC(XML Remote Procedure Call)
            它是一种使用HTTP作为传输协议
            XML作为编码方式的远程调用规范
            XML-RPC协议简单 功能够用 各种语言的实现都有 它的使用也很广泛
            如WordPress的XML-RPC API 搜索引擎的ping服务等
            JS中 也有现成的库支持这种方式进行数据交互 能很好的支持已有的XML-RPC服务
            个人觉得XML结构还是过于臃肿 一般场景用JSON会更灵活方便  
11.GET
    application/json
    queryString    
10.计算机网络体系结构
    OSI(Open System Interconnection 开放式系统互连)七层协议
        应用层：允许访问OSI环境的手段
    　　表示层：对数据进行翻译、加密和压缩
    　　会话层：建立、管理和终止会话
    　　传输层：提供端到端的可靠报文传递和错误恢复
    　　网络层：负责数据包从源到宿的传递和网际互连
        数据链路层
    　　物理层：通过媒介传输比特,确定机械及电气规范
    TCP/IP四层协议(现在广泛使用的)
        应用层(HTTP HTTPS各种应用层协议和TELNET FTP SMTP)
        运输层(TCP/UDP)
        网际层(IP)
        网络接口层
    五层协议(并不存在 讲课用)
        应用层
        传输层
        网络层
        数据链路层
        物理层
11.TCP和UDP(传输层)是什么 区别 应用场景TCP三次握手四次挥手
    (TCP:面向连接 可靠 打电话 大部分情况下|UDP:面向非连接 不可靠 广播 实时性要求高)
    (TCP三次握手 建立可靠通信信道 确认双方发送接收机能正常)
    (TCP三次握手：
        1.客户端向服务端发送SYN
        2.服务端返回SYN,ACK
        3.客户端发送ACK    
    )
    (TCP两次握手 无法确认客户端的接收能力。
    |TCP四次握手 可以 会降低传输效率)
    (TCP四次挥手 传输层协议断开连接的过程 确定数据全部传输完毕)
    (TCP四次挥手：
    )
    TCP（Transmission Control Protocol，传输控制协议）
        TCP/IP即传输控制/网络协议，是面向连接的协议，发送数据前要先建立连接(发送方和接收方的成对的两个之间必须建 立连接)，TCP提供可靠的服务，也就是说，通过TCP连接传输的数据不会丢失，没有重复，并且按顺序到达 一个TCP连接需要三次挥手才能建立起来
    UDP（User Data Protocol，用户数据报协议）
        是与TCP相对应的协议。它是面向非连接的协议，它不与对方建立连接，而是直接就把数据包发送过去 UDP适用于一次只传送少量数据、对可靠性要求不高的应用环境
    TCP与UDP区别：
        1.TCP是面向连接的协议，发送数据前要先建立连接，TCP提供可靠的服务，也就是说，通过TCP连接传输的数据不会丢失，没有重复，并且按顺序到达；
        2.UDP是无连接的协议，发送数据前不需要建立连接，是没有可靠性；
        3.TCP通信类似于于要打个电话，接通了，确认身份后，才开始进行通行；
        4.UDP通信类似于学校广播，靠着广播播报直接进行通信。
        5.TCP只支持点对点通信，UDP支持一对一、一对多、多对一、多对多；
        6.TCP是面向字节流的，UDP是面向报文的；面向字节流是指发送数据时以字节为单位，一个数据包可以拆分成若干组进行发送，而UDP一个报文只能一次发完。
        7.TCP首部开销（20字节）比UDP首部开销（8字节）要大
        8.UDP 的主机不需要维持复杂的连接状态表
    TCP和UDP(实时性要求较高)的应用场景：
        1.UDP 对某些实时性要求比较高的情况使用UDP，比如游戏，媒体通信，实时直播，即使出现传输错误也可以容忍；
        2.TCP 其它大部分情况下，HTTP都是用TCP，因为要求传输的内容可靠，不出现丢失的情况
    形容一下TCP和UDP：
        1.TCP通信可看作打电话：
            李三(拨了个号码)：喂，是王五吗？ 王五：哎，您谁啊？ 李三：我是李三，我想给你说点事儿，你现在方便吗？ 王五：哦，我现在方便，你说吧。 甲：那我说了啊？ 乙：你说吧。 (连接建立了，接下来就是说正事了…)
        2.UDP通信可看为学校里的广播：
            播音室：喂喂喂！全体操场集合
    运行在TCP 或UDP的应用层协议分析。
        1.运行在TCP协议上的协议：
            HTTP（Hypertext Transfer Protocol，超文本传输协议），主要用于普通浏览。
            HTTPS（HTTP over SSL，安全超文本传输协议）,HTTP协议的安全版本。
            FTP（File Transfer Protocol，文件传输协议），用于文件传输。
            POP3（Post Office Protocol, version 3，邮局协议），收邮件用。
            SMTP（Simple Mail Transfer Protocol，简单邮件传输协议），用来发送电子邮件。
            TELNET（Teletype over the Network，网络电传），通过一个终端（terminal）登陆到网络。
            SSH（Secure Shell，用于替代安全性差的TELNET），用于加密安全登陆用。
        2.运行在UDP协议上的协议：
            BOOTP（Boot Protocol，启动协议），应用于无盘设备。
            NTP（Network Time Protocol，网络时间协议），用于网络同步。
            DHCP（Dynamic Host Configuration Protocol，动态主机配置协议），动态配置IP地址。
        3.运行在TCP和UDP协议上：
            DNS（Domain Name Service，域名服务），用于完成地址查找，邮件转发等工作。
            ECHO（Echo Protocol，回绕协议），用于查错及测量应答时间（运行在TCP和UDP协议上）。
            SNMP（Simple Network Management Protocol，简单网络管理协议），用于网络信息的收集和网络管理。
            DHCP（Dynamic Host Configuration Protocol，动态主机配置协议），动态配置IP地址。
            ARP（Address Resolution Protocol，地址解析协议），用于动态解析以太网硬件的地址。
                完成了IP地址与物理地址的映射。
    TCP三次握手 建立可靠通信信道 确认双方发送接收机能正常
        在网络数据传输中，传输层协议TCP是要建立连接的可靠传输，
        目的是建立可靠的通信信道，主要的目的就是双方确认自己与对方的发送与接收机能正常。
        TCP建立连接的过程，我们称为三次握手。
            1.第一次握手：Client将SYN置1，随机产生一个初始序列号seq发送给Server，进入SYN_SENT状态；
            2.第二次握手：Server收到Client的SYN=1之后，知道客户端请求建立连接，将自己的SYN置1，ACK置1，产生一个acknowledge number=sequence number+1，并随机产生一个自己的初始序列号，发送给客户端；进入SYN_RCVD状态；
            3.第三次握手：客户端检查acknowledge number是否为序列号+1，ACK是否为1，检查正确之后将自己的ACK置为1，产生一个acknowledge number=服务器发的序列号+1，发送给服务器；进入ESTABLISHED状态；服务器检查ACK为1和acknowledge number为序列号+1之后，也进入ESTABLISHED状态；完成三次握手，连接建立。
    TCP三次握手简单来说：
        1.客户端向服务端发送SYN
        2.服务端返回SYN,ACK
        3.客户端发送ACK
    TCP为什么不能两次握手
    TCP可以四次握手吗
        这个肯定可以。三次握手都可以保证连接成功了，何况是四次，但是会降低传输的效率。
    第三次握手中，如果客户端的ACK未送达服务器，会怎样？
        Server端：由于Server没有收到ACK确认，因此会每隔 3秒 重发之前的SYN+ACK（默认重发五次，之后自动关闭连接进入CLOSED状态），Client收到后会重新传ACK给Server。
        Client端，会出现两种情况：

            1.在Server进行超时重发的过程中，如果Client向服务器发送数据，数据头部的ACK是为1的，所以服务器收到数据之后会读取 ACK number，进入 establish 状态
            2.在Server进入CLOSED状态之后，如果Client向服务器发送数据，服务器会以RST包应答。
    如果已经建立了连接，但客户端出现了故障怎么办？
        服务器每收到一次客户端的请求后都会重新复位一个计时器，时间通常是设置为2小时，若两小时还没有收到客户端的任何数据，服务器就会发送一个探测报文段，以后每隔75秒钟发送一次。若一连发送10个探测报文仍然没反应，服务器就认为客户端出了故障，接着就关闭连接。
    TCP四次挥手 传输层协议断开连接的过程 确定数据全部传输完毕
        定义：
            在网络数据传输中，传输层协议断开连接的过程我们称为四次挥手
            四次挥手断开连接是因为要确定数据全部传输完毕
        四次挥手：
            1.第一次挥手：Client将FIN置为1，发送一个序列号seq给Server；进入FIN_WAIT_1状态；
            2.第二次挥手：Server收到FIN之后，发送一个ACK=1，acknowledge number=收到的序列号+1；进入CLOSE_WAIT状态。此时客户端已经没有要发送的数据了，但仍可以接受服务器发来的数据。
            3.第三次挥手：Server将FIN置1，发送一个序列号给Client；进入LAST_ACK状态；
            4.第四次挥手：Client收到服务器的FIN后，进入TIME_WAIT状态；接着将ACK置1，发送一个acknowledge number=序列号+1给服务器；服务器收到后，确认acknowledge number后，变为CLOSED状态，不再向客户端发送数据。客户端等待2*MSL（报文段最长寿命）时间后，也进入CLOSED状态。完成四次挥手。
        为什么不能把服务器发送的ACK和FIN合并起来，变成三次挥手（CLOSE_WAIT状态意义是什么）？
            因为服务器收到客户端断开连接的请求时，可能还有一些数据没有发完，这时先回复ACK，表示接收到了断开连接的请求。等到数据发完之后再发FIN，断开服务器到客户端的数据传送。
        如果第二次挥手时服务器的ACK没有送达客户端，会怎样？
            客户端没有收到ACK确认，会重新发送FIN请求。
        客户端TIME_WAIT状态的意义是什么？
            第四次挥手时，客户端发送给服务器的ACK有可能丢失，TIME_WAIT状态就是用来重发可能丢失的ACK报文。如果Server没有收到ACK，就会重发FIN，如果Client在2*MSL的时间内收到了FIN，就会重新发送ACK并再次等待2MSL，防止Server没有收到ACK而不断重发FIN。 MSL(Maximum Segment Lifetime)，指一个片段在网络中最大的存活时间，2MSL就是一个发送和一个回复所需的最大时间。如果直到2MSL，Client都没有再次收到FIN，那么Client推断ACK已经被成功接收，则结束TCP连接。
12.WebSocket Socket HTTP HTTPS
    WebSocket
        通常应用层协议都是完全基于网络层协议TCP/UDP实现 例如HTTP SMTP POP3 
        而WebSocket是同时基于HTTP与TCP实现
            先用带有 Upgrade:Websocket头Header的特殊HTTP request来实现与服务端握手HandShake;
            握手成功后，协议升级成Websocket，进行长连接通讯；
            整个过程可理解为：小锤抠缝，大锤搞定。
    (Socket 长连接 客户端和服务器端互相连接 一旦建立不会主动挂掉 一个Socket由一个IP地址和一个端口号唯一确定。)
        1.网络上的两个程序通过一个双向的通讯连接实现数据的交换，这个双向链路的一端称为一个Socket。Socket通常用来实现客户方和服务方的连接。Socket是TCP/IP协议的一个十分流行的编程界面，一个Socket由一个IP地址和一个端口号唯一确定。
        2.但是，Socket所支持的协议种类也不光TCP/IP、UDP，因此两者之间是没有必然联系的。在Java环境下，Socket编程主要是指基于TCP/IP协议的网络编程。
        3.socket连接就是所谓的长连接，客户端和服务器需要互相连接，理论上客户端和服务器端一旦建立起连接将不会主动断掉的，但是有时候网络波动还是有可能的
        4.Socket偏向于底层。一般很少直接使用Socket来编程，框架底层使用Socket比较多，
    Socket和WebSocket关系
        Socket是传输控制层协议
        WebSocket是应用层协议
        Socket其实不是一个协议 而是为了方便使用TCP/UDP而抽象出来的一层 是位于应用层和传输控制层之间的一组接口      
    HTTP(应用层)
        Http协议是对客户端和服务器端之间数据之间实现可靠性的传输文字、图片、音频、视频等超文本数据的规范，格式简称为“超文本传输协议”
    Socket和http的区别和应用场景
        1.Socket连接就是所谓的长连接，理论上客户端和服务器端一旦建立起连接将不会主动断掉；
        2.Socket适用场景：网络游戏，银行持续交互，直播，在线视屏等。
        3.http连接就是所谓的短连接，即客户端向服务器端发送一次请求，服务器端响应后连接即会断开等待下次连接
        4.http适用场景：公司OA服务，互联网服务，电商，办公，网站等等等等
    HTTP请求体
        1.HTTP请求体是我们请求数据时先发送给服务器的数据，毕竟我向服务器那数据，先要表明我要什么吧
        2.HTTP请求体由：请求行 、请求头、请求数据组成的，
        3.注意：GIT请求是没有请求体的
    HTTP和HTTPS区别
        1.https需要拿到ca证书，需要钱的
        2.端口不一样，http是80，https443
        3.http是超文本传输协议，信息是明文传输，https则是具有安全性的ssl加密传输协议。
        4.http和https使用的是完全不同的连接方式（http的连接很简单，是无状态的；HTTPS 协议是由SSL+HTTP协议构建的可进行加密传输、身份认证的网络协议，比http协议安全。）
    HTTPS工作原理
        1.首先HTTP请求服务端生成证书，客户端对证书的有效期、合法性、域名是否与请求的域名一致、证书的公钥（RSA加密）等进行校验；
        2.客户端如果校验通过后，就根据证书的公钥的有效， 生成随机数，随机数使用公钥进行加密（RSA加密）；
        3.消息体产生的后，对它的摘要进行MD5（或者SHA1）算法加密，此时就得到了RSA签名；
        4.发送给服务端，此时只有服务端（RSA私钥）能解密。
        5.解密得到的随机数，再用AES加密，作为密钥（此时的密钥只有客户端和服务端知道）。
    一次完整的HTTP请求分为哪几个步骤
        一次完整的HTTP通信过程中 Web浏览器和Web服务器将完成下列7个步骤
        1.建立TCP连接
        2.Web浏览器向Web服务器发送请求行
            一旦建立了TCP连接，Web浏览器就会向Web服务器发送请求命令。例如：GET /sample/hello.jsp HTTP/1.1。
        3.Web浏览器发送请求头
            浏览器发送其请求命令之后，还要以头信息的形式向Web服务器发送一些别的信息，之后浏览器发送了一空白行来通知服务器，它已经结束了该头信息的发送。
        4.Web服务器应答
            客户机向服务器发出请求后，服务器会客户机回送应答， HTTP/1.1 200 OK ，应答的第一部分是协议的版本号和应答状态码。
        5.Web服务器发送应答头
            正如客户端会随同请求发送关于自身的信息一样，服务器也会随同应答向用户发送关于它自己的数据及被请求的文档。
        6.Web服务器向浏览器发送数据
            Web服务器向浏览器发送头信息后，它会发送一个空白行来表示头信息的发送到此为结束，接着，它就以Content-Type应答头信息所描述的格式发送用户所请求的实际数据。
        7.Web服务器关闭TCP连接
        
        为什么不使用HTTP长连接来实现即时通讯？事实上，在Websocket之前就是使用HTTP长连接这种方式，如Comet。但是它有如下弊端：

        HTTP 1.1 规范中规定，客户端不应该与服务器端建立超过两个的 HTTP 连接， 新的连接会被阻塞。
        对于服务端来说，每个长连接都占有一个用户线程，在NIO或者异步编程之前，服务端开销太大。


        为什么不直接使用Socket编程，基于TCP直接保持长连接，实现即时通讯？

        Socket编程针对C/S模式的，而浏览器是B/S模式，浏览器没法发起Socket请求，正因如此， W3C最后还是给出了浏览器的Socket----Websocket。
13.WebSocket
    WebSocket协议本质上是一个基于TCP的协议
    WebSocket 是 HTML5 开始提供的一种在单个 TCP 连接上进行全双工通讯的协议。
    使得客户端和服务器之间的数据交换变得更加简单，允许服务端主动向客户端推送数据。
    在 WebSocket API 中，浏览器和服务器只需要完成一次握手，两者之间就直接可以创建持久性的连接，并进行双向数据传输。
    在 WebSocket API 中，浏览器和服务器只需要做一个握手的动作，然后，浏览器和服务器之间就形成了一条快速通道。两者之间就直接可以数据互相传送。
    长轮询和短轮询，WebSocket 是长轮询。
        具体比如在一个电商场景，商品的库存可能会变化，所以需要及时反映给用户，所以客户端会不停的发请求，然后服务器端会不停的去查变化，不管变不变，都返回，这个是短轮询。
        而长轮询则表现为如果没有变，就不返回，而是等待变或者超时（一般是十几秒）才返回，如果没有返回，客户端也不需要一直发请求，所以减少了双方的压力。
14.WebSocket与Ajax的区别
    本质不同
        Ajax（Asynchronous Javascript And XML） 即异步 JavaScript 和 XML。是一种创建交互式网页的应用的网页开发技术
        websocket 是 HTML5 的一种新协议，实现了浏览器和服务器的实时通信
    生命周期不同：
        websocket 是长连接，会话一直保持
        ajax 发送接收之后就会断开
    适用范围：
        websocket 用于前后端实时交互数据    
        ajax 非实时
    发起人：
        AJAX 客户端发起 
        WebSocket 服务器端和客户端相互推送
15.什么是AJAX，如何实现 ajax请求时，如何解释json数据
    ajax是一种能够实现局部网页刷新的技术，可以使网页异步刷新。
        ajax的实现主要包括四个步骤：
            （1）创建核心对象XMLhttpRequest；
            （2）利用open方法打开与服务器的连接；
            （3）利用send方法发送请求；（"POST"请求时，还需额外设置请求头）
            （4）监听服务器响应，接收返回值。
    ajax请求时，如何解释json数据
    如果是字符串形式的json：eval("("+ajax.response+")")
    如果是本地的json文件：JSON.parse(data)

16.TCP 如何保证有效传输及拥塞控制原理。
    (TCP拥塞控制 慢启动阈值 + 拥塞避免 快速重传 快速回复)
    tcp 是面向连接的、可靠的、传输层通信协议
    可靠体现在：
        有状态：
            有状态是指 TCP 会确认发送了哪些报文，接收方受到了哪些报文，哪些没有收到，保证数据包按序到达，不允许有差错
        可控制：
            可控制的是指，如果出现丢包或者网络状况不佳，则会跳转自己的行为，减少发送的速度或者重发
    拥塞控制原理:(慢启动阀门+拥塞避免/快速重传/快速回复)
        原因是有可能整个网络环境特别差，容易丢包，那么发送端就应该注意了。
        主要用三种方法：
            1.慢启动阈值 + 拥塞避免
                对于拥塞控制来说，TCP 主要维护两个核心状态：
                    拥塞窗口（cwnd）
                    慢启动阈值（ssthresh）
                    （在发送端使用拥塞窗口来控制发送窗口的大小。）
            2.快速重传
                。。。。
            3.快速回复
                。。。
17.TCP三次握手和四次挥手，为什么不是2/4次
    三次握手
        1.一开始双方处于 CLOSED 状态，然后服务端开始监听某个端口进入 LISTEN 状态
        2.然后客户端主动发起连接，发送 SYN，然后自己变为 SYN-SENT，seq = x
        3.服务端收到之后，返回 SYN seq = y 和 ACK ack = x + 1（对于客户端发来的 SYN），自己变成 SYN-REVD
        4.之后客户端再次发送 ACK seq = x + 1, ack = y + 1给服务端，自己变成 EASTABLISHED 状态，服务端收到 ACK，也进入 ESTABLISHED
    为什么不是两次
        无法确认客户端的接收能力。
    为什么不是4次
        四次以上都可以，只不过 三次就够了
    四次挥手
        一开始都处于 ESTABLISH 状态，然后客户端发送 FIN 报文，带上 seq = p，状态变为 FIN-WAIT-1
        服务端收到之后，发送 ACK 确认，ack = p + 1，然后进入 CLOSE-WAIT 状态    
        客户端收到之后进入 FIN-WAIT-2  状态
        过了一会等数据处理完，再次发送 FIN、ACK，seq = q，ack = p + 1，进入 LAST-ACK 阶段
        客户端收到 FIN 之后，客户端收到之后进入 TIME_WAIT（等待 2MSL），然后发送 ACK 给服务端 ack = 1 + 1
        服务端收到之后进入 CLOSED 状态
    客户端这个时候还需要等待两次 MSL 之后，如果没有收到服务端的重发请求，就表明 ACK 成功到达，挥手结束，客户端变为 CLOSED 状态，否则进行 ACK 重发
    。。。。

18.SSL有几次握手，具体过程|HTTPS握手过程
    1.客户端先生成一个随机数，然后传输到服务端，并且会带上客户端这边支持的所有加密套件
    2.服务端拿到这个随机数之后先存的，服务端也生成一个随机数，这个随机数会伴随着服务端的证书，也就是我们之前说到的公钥，一起传输给客户端
    3.客户端拿到了服务端的随机数之后也先存着，通过服务端传给他的公钥生成一个预主秘钥，生成过程当中会产生一个新的随机数，所以总共是有三个随机数，客户端生成的这个随机数用公钥加密后传输给服务器这边，这个过程就是没有办法被中间人解析的一个过程，因为它使用的是公钥进行加密，只有服务端这边的私钥可以对其解密
    4.这个数据传输到服务器之后，服务器通过私钥解密，拿到了预主秘钥也就是我们说的那个随机字符串
    5.最终服务端会选择一个客户端这边支持的加密套件，然后两边确定同时使用这同一个加密套件，对这三个随机数进行一个算法的操作，生成一个主秘钥，因为最后一个随机数只有客户端和服务端知道，中间人根本拿不到，所以他们生成的这个主秘钥也是中间人根本没有办法破解的，后期传输的数据就全部是通过这个主秘钥进行加密的，因为两边主秘钥是一样的，所以两边都能够对数据加密之后进行解密，中间人因为没有办法知道这个主秘钥，所以他没有办法对数据进行解密，所以这中间的数据传输就变成了安全的传输

    总体来说TLS握手就是通过交换三个随机数，然后计算出主会话密钥；由于安全性，会继续扩展出更多的临时密钥。保证通讯过程的绝对安全。
19.axios是什么
        是一个基于promise的HTTP库 可以用在浏览器和node.js中
        特点：
            1.从浏览器中创建XMLHttpRequests
            2.从node.js创建http请求
            3.支持Promsie API
            4.拦截请求和响应
            5.转换请求数据和响应数据
            6.取消请求
            7.自动转换JSON数据
            8.客户端支持防御XSRF
        安装：
            使用npm
                npm install axios
20.HTTP缓存
    1.强缓存
    2.协商缓存

    首先通过 Cache-Control 验证强缓存是否可用，如果强缓存可用，那么直接读取缓存
    如果不可以，那么进入协商缓存阶段，发起 HTTP 请求，服务器通过请求头中是否带上 If-Modified-Since 和 If-None-Match 这些条件请求字段检查资源是否更新：

        若资源更新，那么返回资源和 200 状态码
        如果资源未更新，那么告诉浏览器直接使用缓存获取资源
21.在交互过程中如果数据传送完了，还不想断开连接怎么办，怎么维持？
    keep-alive标签的原理 有什么功能
    在 HTTP 中响应体的 Connection 字段指定为 keep-alive
22.TCP 滑动窗口(分两种 发送窗口 接收窗口)
    在 TCP 链接中，对于发送端和接收端而言，TCP 需要把发送的数据放到发送缓存区, 将接收的数据放到接收缓存区。
    而经常会存在发送端发送过多，而接收端无法消化的情况，所以就需要流量控制，就是在通过接收缓存区的大小，控制发送端的发送。
    如果对方的接收缓存区满了，就不能再继续发送了。而这种流量控制的过程就需要在发送端维护一个发送窗口，在接收端维持一个接收窗口。
    TCP 滑动窗口分为两种: 发送窗口和接收窗口。
23.HTTP 如何实现长连接？在什么时候会超时？
    通过在头部（请求和响应头）设置 Connection: keep-alive，HTTP1.0协议支持，但是默认关闭，从HTTP1.1协议以后，连接默认都是长连接
        。。。
    实际上 HTTP 没有长短链接，只有 TCP 有，TCP 长连接可以复用一个 TCP 链接来发起多次 HTTP 请求，这样可以减少资源消耗，比如一次请求 HTML，可能还需要请求后续的 JS/CSS/图片等
24.Fetch API与传统Request的区别
    1.fetch 符合关注点分离，使用 Promise，API 更加丰富，支持 Async/Await 
    2.语意简单，更加语意化
    3.可以使用 isomorphic-fetch ，同构方便
    传统AJAX时代 进行API等网络请求都是通过XMLHttpRequest或者封装后的框架进行网络请求 然而配置和调用方式混乱 对新手不友好
    Fetch优点
        1.语法简介 更加语义化 业务逻辑更清晰
        2.基于标准Promise实现 支持async/await
        3.同构方便 使用isomorphic-fetch
    Promise简介
        Fetch API是基于Promise设计的
    fetch方法返回一个Promise对象 根据Promise API特性 
        Fetch可以方便地使用then方法将各个处理逻辑串起来
        使用Promise.resolve()/Promise.reject()方法
        将分别返回肯定结果的Promise或否定结果地Promise
        从而调用下一个then/catch 一旦then中的语句出现错误
        也将跳到catch中
    fetch请求常见数据格式
        1.fetch请求本地文本数据
        2.fetch请求本地JSON数据
        3.fetch请求网络接口
25.OPTION是干啥的？举个用到OPTION的例子？
    1.旨在发送一种探测请求，以确定针对某个目标地址的请求必须具有怎么样的约束，然后根据约束发送真正的请求。
    2.比如针对跨域资源的预检，就是采用 HTTP 的 OPTIONS 方法先发送的。用来处理跨域请求
12.JWT Session Cookie
    1.jwttoken是无状态的 不在服务器端做任何存储
    2.jwt 适合做多端登录 session 可以做单点登录
    3.解决鉴权问题时 jwttoken只是解决方案中的一个 而不是唯一一个
    4.传统方式 session+cookie 服务器端会生成session的一个id 存储在cookie中
    cookie是最早出现的 服务器端可以在客户端存信息的一个文件
    windows系统中 cookie文件被存储在c盘用户名下appdata下一个隐藏文件夹
    cookie文件夹 txt文本文件
    cookie存储信息空间有限制
    session启动时会生成一个id 每一个用户都会有一个session
    服务器端 保存用户的状态
    两者差别 jwt 分散在客户端 无状态 
13.get方式
    点击超链接/地址栏输入地址跳转页面 都是get方式
        get方式 传参 两种
        1.？+键值对(?blogid=3)
        3.命名传参 (:blogId)
14.TCP、HTTP、Socket、Socket连接池
15.XSS(反射型XSS/存储型XSS/DOM型XSS)
    1.定义
        跨站脚本攻击 
            是指恶意攻击者往Web页面里插入恶意Script代码，当用户浏览该页之时，嵌入其中Web里面的Script代码会被执行，从而达到恶意攻击用户的目的。
            xss漏洞通常是通过php的输出函数将javascript代码输出到html页面中，通过用户本地浏览器执行的，所以xss漏洞关键就是寻找参数未过滤的输出函数。
            常见的输出函数有： echo printf print print_r sprintf die var-dump var_export.
    2.三类
        1.反射型XSS(非持久化)
            攻击者事先制作好攻击链接, 需要欺骗用户自己去点击链接才能触发XSS代码（服务器中没有这样的页面和内容），一般容易出现在搜索页面。
            原理：
                黑盒测试中，这种类型比较容易通过漏洞扫描器直接发现，我们只需要按照扫描结果进行相应的验证就可以了。
                相对的在白盒审计中， 我们首先要寻找带参数的输出函数，接下来通过输出内容回溯到输入参数，观察是否过滤即可。
                通过它我们知道输入javascript代码是可以被执行的，当我们输入一些其他函数，比如document.cookie就可以成功盗取用户的cookie信息，或者读取用户浏览器信息等，为我们进一步深入攻击做铺垫。
            防范：
                htmlentities()函数对用户输入的<>做了转义处理,恶意代码当然也就没法执行了。
                还有其他过滤函数
        2.存储型XSS(持久化)(一次提交之后，每当有用户访问这个页面都会受到XSS攻击，危害巨大。)
            代码是存储在服务器中的，如在个人信息或发表文章等地方，加入代码，如果没有过滤或过滤不严，那么这些代码将储存到服务器中，每当有用户访问该页面的时候都会触发代码执行，这种XSS非常危险，容易造成蠕虫，大量盗窃cookie（虽然还有种DOM型XSS，但是也还是包括在存储型XSS内）。
                原理：
                    和反射性XSS的即时响应相比，存储型XSS则需要先把利用代码保存在比如数据库或文件中，当web程序读取利用代码时再输出在页面上执行利用代码。但存储型XSS不用考虑绕过浏览器的过滤问题，屏蔽性也要好很多。
                    1.攻击者发送恶意脚本请求
                    2.恶意脚本被保存到数据库中
                    3.用户正常浏览页面
                    4.从数据库读取恶意脚本
                    5.将恶意脚本返回用户 构造页面
                    6.浏览器解析 执行恶意脚本 发起攻击
                防范：
                    存储型XSS对用户的输入进行过滤的方式和反射型XSS相同，这里我们使用htmlspecialchars()函数进行演示：
                    htmlentities() :把预定义的字符 "<" （小于）和 ">" （大于）转换为 HTML 实体
                    htmlspecialchars和htmlentities的区别：
                        htmlspecialchars 只转义 & 、" 、' 、< 、> 这几个html代码，而 htmlentities 却会转化所有的html代码，连同里面的它无法识别的中文字符也会转化。
        3.DOM型XSS(该种XSS用的相对较少 由于其特殊性 常见的漏扫工具都无法检测出来)
            基于文档对象模型Document Objeet Model，DOM)的一种漏洞。DOM是一个与平台、编程语言无关的接口，它允许程序或脚本动态地访问和更新文档内容、结构和样式，处理后的结果能够成为显示页面的一部分。DOM中有很多对象，其中一些是用户可以操纵的，如uRI ，location，refelTer等。客户端的脚本程序可以通过DOM动态地检查和修改页面内容，它不依赖于提交数据到服务器端，而从客户端获得DOM中的数据在本地执行，如果DOM中的数据没有经过严格确认，就会产生DOM XSS漏洞。
        总结：
            XSS漏洞原理和相关函数 eval() assert() preg_replace() 回调函数 动态执行函数
            XSS漏洞的防范
16.CSRF(Cross Site Request Forgery(伪造))
    原理和XSS正好相反
        XSS(Cross Site Script 跨站脚本攻击)利用合法用户获取其信息
        CRSF(Cross Site Request Forgery跨站请求伪造)伪装成合法用户发起请求
    如何防范：
        1.使用post 不使用get修改信息
        2. 验证码，所有表单的提交需要验证码，但是貌似用起来很麻烦，所以一些关键的操作可以
        3. 在表单中预先植入一些加密信息，验证请求是此表单发送
17.MITM(Man-in-the-MiddleAttck-中间人攻击)攻击
        服务器向客户端发送公钥。
        攻击者截获公钥，保留在自己手上。
        然后攻击者自己生成一个【伪造的】公钥，发给客户端。
        客户端收到伪造的公钥后，生成加密hash值发给服务器。
        攻击者获得加密hash值，用自己的私钥解密获得真秘钥。
        同时生成假的加密hash值，发给服务器。
        服务器用私钥解密获得假秘钥。
        服务器用加秘钥加密传输信息
17.http1.1 和 http1.0 之间有哪些区别？
    1.连接方面 
        http1.1 默认使用持久连接 
        http1.0 默认使用非持久连接 
        http1.1 通过使用持久连接来使多个http请求复用同一个 TCP连接 
        避免使用非持久连接时每次需要建立连接的时延。
    2.资源请求方面  
        http1.0 中 存在一些浪费带宽的现象 如客户端只是需要某个对象的一部分 服务器却将整个对象送过来了，不支持断点续传功能
        http1.1 则在请求头引入了 range 头域
        它允许只请求资源的某个部分，即返回码是 206（Partial Content），这样就方便了开发者自由的选择以便于充分利用带宽和连接。
    3.缓存方面 
        http1.0 中主要使用 header 里的 If-Modified-Since,Expires 来做为缓存判断的标准，http1.1 则引入了更多的缓存控制策略例如 Etag、
        If-Unmodified-Since、If-Match、If-None-Match 等更多可供选择的缓存头来控制缓存策略。
    4.http1.1 中新增 host 字段用来指定服务器的域名
        http1.0 中认为每台服务器都绑定一个唯一的 IP 地址，因此，请求消息中的 URL 并没有传递主机名（hostname）。
        随着虚拟主机技术的发展，在一台物理服务器上可以存在多个虚拟主机，并且它们共享一个IP地址。因此有了 host 字段，就可以将请求发往同一台服务器上的不同网站。
    5.http1.1 相对于 http1.0 还新增了很多方法，如 PUT、HEAD、OPTIONS 等。
18.即时通讯的实现 
短轮询/长轮询(基于HTTP协议) 
SSE 和
WebSocket(基于TCP协议 典型的应用层协议)
区别
    (目的都是实现客户端/服务器端一个即时通讯)
    1.短轮询的基本思路(基于HTTP协议)
        实现原理：
            浏览器每隔一段时间向浏览器发送 http 请求，
            服务器端在收到请求后，不论是否有数据更新，都直接进行响应。
            这种方式实现的即时通信，本质上还是浏览器发送请求，服务器接受请求的一个过程，
            通过让客户端不断的进行请求，使得客户端能够模拟实时地收到服务器端的数据的变化。
        优点：
            比较简单，易于理解。
        缺点：
            该方式由于需要不断的建立 http 连接，严重浪费了服务器端和客户端的资源。当用户增加时，服务器端的压力就会变大，这是很不合理的。
    2.长轮询的基本思路(基于HTTP协议)
        实现原理:
            首先由客户端向服务器发起请求，当服务器收到客户端发来的请求后，服务器端不会直接进行响应，而是先将这个请求挂起，然后判断服务器端数据是否有更新。如果有更新，则进行响应，如果一直没有数据，则到达一定的时间限制才返回。客户端 JavaScript 响应处理函数会在处理完服务器返回的信息后，再次发出请求，重新建立连接。
        长轮询和短轮询比起来，它的
        优点：
            明显减少了很多不必要的 http 请求次数，相比之下节约了资源。
        缺点：
            连接挂起也会导致资源的浪费。
    4.SSE(基于HTTP协议 单向 服务端=>客户端)
        实现原理:
            服务器使用流信息向服务器推送信息。严格地说，http 协议无法做到服务器主动推送信息。
            但是，有一种变通方法，就是服务器向客户端声明，接下来要发送的是流信息。
            也就是说，发送的不是一次性的数据包，而是一个数据流，会连续不断地发送过来。
            这时，客户端不会关闭连接，会一直等着服务器发过来的新的数据流，视频播放就是这样的例子。
            SSE 就是利用这种机 制，使用流信息向浏览器推送信息。它基于 http 协议，目前除了 IE/Edge，其他浏览器都支持。
        优点:   
            它相对于前面两种方式来说，不 需要建立过多的 http 请求，相比之下节约了资源。
        5.Socket和WebSocket

    5.WebSocket(基于WebSocket协议 全双工 双向)
            上面三种方式本质上都是基于 http 协议的.
            我们还可以使用 WebSocket 协议来实现。
            WebSocket 是 Html5 定义的一个新协议，与传统的 http 协议不同，该协议允许由服务器主动的向客户端推送信息。
        缺点：
            服务器端的配置比较复杂。
        WebSocket与SSE区别：    
            WebSocket 是一个全双工的协议，也就是通信双方是平等的，可以相互发送消息
            而 SSE 的方式是单向通信的，只能由服务器端向客户端推送信息，如果客户端需要发送信息就是属于下一个 http 请求了。
    6.WebSocket和HTTP
        相同点：
            1.都是一样基于TCP都是可靠性传输协议
            2.都是应用层协议
        不同点:
            1.Websocket是双向通信协议 模拟Socket协议 可以双向发送或接受请求 HTTP是单向的
            2.WebSocket需要握手进行建立连接
        联系:
            1.WebSocket协议在建立握手时 数据是通过HTTP传输的
            但是建立后真正传输时不需要HTTP协议
    7.WebSocket和Socket关系
        Socket：
            其实不是一个协议 而是为了方便使用TCP/UDP而抽象出来的一层是位于应用层和传输控制层之间的一组接口
            Sockets是应用层和TCP/IP协议族通信的中间软件抽象层 它是一组接口 
            在设计模式中Socket其实就是一个门面模式 它把复杂的TCP/IP协议族隐藏在Socket接口后面
            对用户来说 一组简单的接口就是全部 让Socket去组织数据以符合指定的标准
            当两台主机通信时 必须通过Socket连接
            Socket则利用TCP/IP协议建立TCP连接 
            TCP连接更依赖于底层的IP协议 
            IP协议的连接则依赖于链路层等更低层次
        WebSocket协议:
            WebSocket是一个典型的应用层协议
        总结：
            Socket是传输控制层协议
            WebSocket是引用层协议
    8.HTML5和WebSocket的关系
        WebSocket API是HTML5标准的一部分 
        但这不代表WebSocket一定要用在HTML中
        或者只能在基于浏览器中的应用程序中使用
        实际上许多语言 框架 服务器都提供了WebSocket支持
19.queryString&formData&json
    (前端向后端发送HTTP请求时三种数据交换格式 )
    Get请求参数是被存放在QueryString中的(可以通过request.getParameter()获取请求参数)
    Post请求参数的存放位置与Content-Type有关
        1.表单提交和Jquery异步请求
            POST请求参数被存放在Form Data中(可以通过request.getParameter()获取请求参数)
        2.JS原生异步请求XMLHttpRequedt
            默认Content-Type:text/plain;charset=UTF-8参数Request PayLoad(无法通过request.getParameter()请求获取参数)        
        3.文件上传
            默认的Content-Type:multipart/form-data 参数存放在Request Payload
        4.指定参数格式为JSON的POST请求
            默认的Content-Type:application/json 参数存放在Request PayLoad(无法通过request.getParameter()获取请求参数)
        基本的POST请求就是上述四种情况
        最常用的就是表单的POST请求&Jquery的post异步请求
        这种POST请求默认的
        Content-Type:application/x-www-form-urlencoded也就是键值对的提交方式
        剩下的三种方式都无法通过requedt.getParamter()/框架字段映射获取参数(这三种方式的Content-Type都不为application/x-www-form-urlencoded)
        原因：
            只有不是文件上传且Content-Type:'application/x-www-form-urlencoded'时
            我们会将参数存放在Map中 
            request.getParameter正是从此Map中取值            
        如何接受上述2 3 4方式传参
            1.文件上传我们需要框架的支持
            2.可以设置Content-Type"application/x-www-form-urlencoded" (通用)
            3.ContentType为"application/json" 是以Json格式传输数据,我们后台可以使用@RequestBody 注解接受
            4.ContentType为"text/plain" 的,我们可以使用流进行读取
        总结：
            HTTP POST表单请求提交时：Content-Typeapplication/x-www-form-urlencoded，而使用原生AJAX的POST请求如果不指定请求头RequestHeader，默认使用的Content-Type是text/plain;charset=UTF-8。

            表单提交数据是名值对的方式，而文件上传服务器需要特殊处理，普通的post请求数据格式不固定，不一定是名值对的方式，所以服务器无法知道具体的处理方式，所以只能通过获取原始数据流的方式来进行解析。jquery在执行post请求时，会设置Content-Type为application/x-www-form-urlencoded，所以服务器能够正确解析，而使用原生ajax请求时，如果不显示的设置Content-Type，那么默认是text/plain，这时不能用request.getParameter(name)的形式获取，所以才只能通过获取原始数据流的方式来进行解析请求数据。
20.XML与JSON
    XML定义
        扩展标记语言 EXtensible Markup Language XML
        用于标记电子文件使其具有结构性的标记语言 可以用来标记数据 定义数据类型 是一种允许用户对自己的标记语言进行定义的源语言
        XML使用DTD文档类型定义来组织数据 格式统一 跨平台和语言 称为业界公认的标准
        XML是标准通用标记语言SGML的子集 非常适合Web传输 
        XML提供统一的方法来描述和交换独立于应用程序或供应商的结构化数据
    JSON JavaSript Object Notation
        一种轻量级数据交换格式
        具有良好的可读和便于快速编写的特性
        可在不同平台之间进行数据交换
    XML优点:
        1.格式统一 符合标准
        2.容易与其他系统进行远程交互 数据共享比较简单
    XML缺点:
        1.XML文件庞大 文件格式复杂 传输占带宽
        2.服务端和客户端都需要花费大量代码解析XML 导致服务器端和客户端代码变得异常复杂且不易维护
        3.客户端不同 浏览器之间解析XML方式不同 需要重复编写很多代码
    JSON优点：
        1.数据格式比较简单 易于读写 格式都是压缩的 占用带宽小
        2.
21.HTTP1.0&HTTP1.1&HTTP2.0区别
22.AJAX
    1.AJAX概述 AJAX是什么
        AJAX是'Asyncchronous JavaScript And XML'缩写
        (即异步的JS和XML)
        一种实现无页面刷新获取服务器数据的混合技术
        概念：
            XML 
                Extensible Markup Language缩写(即:可扩展标记语言)
                一种特征类似HTML 用来描述 数据是什么 并承载数据的标记语言
                一种用来承载数据的语言
                JSON只是一种数据格式 JSON发明之前 人们大量用XML作为数据传输的载体 而如今情况发生了些变化
                JSON这种类似字符串对象的轻量级的数据格式越来越受开发者的青睐 几乎变成了AJAX技术的标准数据格式 
                PS:JSON不是XML的替代品两者各自有其适应的场景
            无页面刷新
                互联网最重要功能在于资源交换
                有没有办法在页面数据变动时 只向服务器请求新的数据 并且在阻止页面刷新的情况下动态替换页面中展示的数据呢 --AJAX
                AJAX技术的问世，不仅通过阻止浏览器接受响应时刷新页面提升了互联网用户的使用体验，还使开发者能够以更加微观的视角重新思考互联网应用的构建，从此，开发者将在“数据”层面而不是“资源”层面以更高的自由度构建网站和Web应用。
            混合技术
                AJAX技术不只是操作XMLHttpRequest对象发起异步请求 而是为了实现无页面刷新的资源获取的一些列技术的统称
                这些技术包括
                    1.JS：用来获取数据后 通过操作DOM或其他方式达到目的
                    2.客户端(即浏览器)提供的实现异步服务器通信的XMLHttpRequest对象
                    3.服务器端允许浏览器向其发起AJAX请求的相关设置
                PS:明白AJAX并不只是操作XMLHttpRequest对象 对初学者而言十分必要
            DRY
                Don't Repeat Yourself
        AJAX意义：
            1.它能够使浏览器在不刷新页面的情况下获取服务器响应
            2.这将大大提升互联网用户的使用体验
            3.由于AJAX请求获取的是数据而不是HTML文档，因此它也节省了网络带宽，让互联网用户的网络冲浪体验变得更加顺畅。
        AJAX获取数据
            通常使用API与各式各样的数据库交互 服务器
            AJAX技术核心--XMLHttpRequest对象
                XMLHttpRequest对象是浏览器提供的一个API 用来顺畅地向服务器发送请求并解析服务器响应 整个过程中 浏览器页面不会被刷新
                1.XMLHttpRequest只是一个JS对象 确切地说是一个构造函数 特殊之处只在于它是由客户端(即浏览器)提供的(而不是JavaScript原生的)除此之外它有属性 方法 需要通过new关键字进行实例化
                2.XMLHttpRequest对象是不断被扩展的随着XML对象被广泛接收 W3C也开始着手指定相应地标准来规范其行为 目前XMLHttpRequest有两个级别1级提供了XML对象的实现细节 2级进一步发展了XML对象 额外添加了一些方法 属性和数据结构 但不是所有浏览器都实现了XML对象2级地内容
                从剖析XMLHttpRequest实例属性和方法开始 
                const xhr = new XMLHttpRequest()
                属性。。。
                方法。。。











1. DOM怎么添加移除移动复制创建和查找节点
    - 获取子节点
        父节点.children
        父节点.childNodes
    - 获取子节点
        子节点.parentNode
        子节点.offsetParent
    - 创建
        document.createElement(‘标签名’)
        document.createTextNode(‘文本内容’)
    - 添加
        父节点.appendChild(子节点)
        父节点.insertBefore(newChild，refChild)
    - 复制
        被复制的节点.cloneNode(true)
    - 删除：
        节点.remove()
        父节点.removeChild（子节点）
    - 替换
        父节点.replaceChild（newChild，refChild）
2. 操作DOM为什么是昂贵的
    > 操作DOM对象时 会触发浏览器的布局和绘制行为 会导致DOM卡慢 占用内存较高
    > 优化:
    1. 使用虚拟DOM(VDOM)映射成实际DOM来进行DOM操作 
    2. 使用CSS动画来替代DOM动画 减少页面重绘，使得性能更加完善
3. 三行的表格 删除第一行几种方案
    1. 使用原生的removeChild(子节点)
    2. 使用deleteRow(行数)传入第几行
    3. 使用jQuery得到这个结点 使用remove() detach()删除该节点
    4. 使用css样式 display:none; 隐藏这一行
4. 获取DOM元素方式 获取元素标签名
    1. getElementById:通过元素的id获取该元素对象 oBtn一个此对象 任何浏览器无兼容性问题 此只有用document. 因为id文档中是唯一的
    2. getElementsByTagName(htmlCollection):通过元素的标签名称获取元素 
        - oLi一个li的数组 任何浏览器无兼容性问题 返回一个htmlCollection aLi是一个伪数组  
        - 没有push方法 只有可以往里存东西的 和获取长度的方法
    3. getElementsByClassname:通过元素的class获取元素
        - 早期IE可能有兼容性问题 IE8及以下
        - 封装自己的getElementsByClassName方法
    4. querySelector css选择器就是selector 查询出来一个元素
        - 是元素 不是数组 只能找到第一个
    5. querySelectorAll
    6. 获取元素标签名 element.tagName
    7. oH1.nextSibling ie8及ie8之前都不支持
    8. oH1.nextElementSibling
    - 封装next方法 在所有浏览器中都能返回下一个兄弟7u元素节点
    ```
        function next(elem){
            do{
                elem = elem.nextSibling;
            }while(elem && elem.nodeType != 1);
            return elem;
        }
    ```
5. 节点
    1. 元素节点 1 每个HTML标签是一个元素节点
        - 元素节点可以拥有类型属性节点、文本节点、注释节点的子节点。
    2. 属性节点 2 每一个HTML属性是一个属性节点
        - (属性节点是另一个层面的理解，在浏览器后台打印的时候，不存在属性节点)
        - 属性节点与文本节点不是一个层面（角度）上的，
        因为：在旧 DOM 规范中，属性继承自 Node，是一种特殊的节点。但是DOM4 中已废弃这一条，属性不再是节点。 
    3. 文本节点 3 包含在HTML元素中的文本是文本节点
    4. 注释节点 8 注释属于注释节点
    5. 文档节点 9 整个文档是一个文档节点
    
    >
        nodeName（节点名称） 
        nodeValue（节点值） 
        nodeType（节点类型）
6. 
   1. appendChild
   2. removeChild
   3. replaceChild 
        1. var oLi = document.createElement('li');
         oLi.innerHTML = 'replaceChild';
         oUl1.replaceChild(oLi,oUl1.firstElementChild); 
        2. 只替换文本节点 元素--html 节点--xml
         var textNode = document.createTextNode('hahaha'
         var oLi = oUl1.firstElementChild;
         oLi.replaceChild(textNode,oLi.firstChild);
         3. var oLi = oUl1.firstElementChild;
         oLi.innerHTML = 'hahaha';
    4. cloneNode
    5. setAttribute getAttribute
        此方法设置的自定义的dom属性
        dom属性 自定义的dom属性 对象属性
        对象属性 和自定义的dom属性 是不通的
        对象属性不能在dom中看到
        自定义dom属性 不饿能通过对象属性的方式获取到
7. DOM自定义属性
    - 自定义属性:
        1. 标签原本没有这个属性,为了存储数据,程序员自己添加的属性
        2. 自定义属性无法直接通过DOM对象的方式获取或者设置
    - 自定义属性的操作：
        1. 对象.getAttribute(“自定义属性名字”);获取自定义属性的值
        2. 对象.setAttribute(“属性名字”,“值”);设置自定义属性及值
        3. 对象.removeAttribute(“属性的名字”); 移除自定义属性
8. 事件(事件源|事件处理函数|事件对象)
    - 事件源：事件由哪个元素触发的
    - 事件处理函数：如何处理这个事件的函数（当你触发这个事件后具体要做什么）
    - 事件对象：该对象包含了跟这个事件有关的所有信息 包括属性和方法
    > 所有事件绑定都是异步的
    
    > e是浏览器传的参数 约定俗成 e|event

    > 事件如何实现
    - 基于发布订阅模式 浏览器加载时 会读取事件相关的代码 只有实际等到具体的事件触发时才会执行
    - Web端 最常见的就是DOM事件
    1. DOM0级事件 直接在html元素上绑定on-event 比如onclick 取消则dom.onclick = null 同一个时间只能有一个处理程序 后面的会覆盖前面的
    2. DOM2级事件 通过addEventListener注册事件 通过removeEventListner删除事件 一个事件可以有多个事件处理程序 按照顺序执行 捕获事件和冒泡事件
    3. DOM3级事件 增加了事件类型 如UI事件 焦点事件 鼠标事件
9. 事件绑定三种方法
    (普通方式   元素标签内直接写事件+相应事件触发后的方法调用
    /动态绑定方式 先获取DOM元素再绑定事件 存在内存泄漏 务必注意回收
    /监听方式   addEventListener(事件类型 监听函数 事件冒泡false捕获true控制)方法
    )
    1. 普通方式(元素标签内 直接写事件+相应事件触发后的方法调用)
        元素标签内直接写事件+相应事件触发后的方法调用 这里的事件前面需要加上“on”。
    2. 动态绑定方式(先获取dom元素再绑定事件 存在内存泄漏 要注意时回收)
        动态事件绑定，需要先获取dom元素再绑定事件，获取dom元素可以参看原生js获取dom对象
        动态事件绑定存在内存泄露，所以务必要注意回收。
    3. 监听方式(addEventListener)
        使用addEventListener方法，
        该方法有三个参数：
            事件的类型
            监听的函数
            事件的冒泡和捕获控制（true/false）
        注：addEventListener方法的第三个参数默认值为false。
10. 常见事件 
    1. 用户界面事件
    2. 焦点事件
    3. 鼠标事件
    4. 坐标事件
    5. 滚轮事件
    6. 文本事件
    7. 键盘事件
    8. 移动端小程序事件


    1. 事件focus|blur(on)
    2. change事件就是用于表单的
    3. keydown keyup
    4. mouseover | mouseout | mousemove |mousedown | mouseup
    5. submit
11. 几个常用的事件(e)属性
    1. 触发时距离浏览器距离
    ```
    var oDiv1 = document.getElementById('div1');
        oDiv1.onclick = function(e){
            console.log(e.clientX);
            console.log(e.clientY);
    }
    ```
    2. 当处于聚焦 键盘按下 显示出相应键盘的码
    ```
    document.onkeydown = function(e){
            //2当处于聚焦 键盘按下 显示出相应键盘的码
            console.log(e.keyCode);
    }
    ```
    3. 阻止默认发生的事情 如使链接失效？
    ```
    var oA = document.getElementById('go');
        oA.onclick = function(e){
            e.preventDefault();
    }
    ```
12. 事件流 事件冒泡和捕获 事件委托
    - 事件：(文档和浏览器窗口特定的交互瞬间)
        - 是文档和浏览器窗口发生的特定的交互瞬间
        - javascript应用跳动的心脏
        - 把所有东西黏在一起的胶水
        - 当与浏览器中web页面进行某些类型的交互时，事件发生
    - 事件流：(从页面中接受事件的顺序)
        - 描述从页面中接受事件的顺序
        - 微软(IE)和网景(Netscape)开发团队提出了两个截然相反的事件流概念
            - PS:火狐同时支持冒泡流和捕获流
            - IE事件流 冒泡(从里向外触发)
            - Netscape事件流 捕获(从外向里触发)
    - 事件冒泡:(从里向外 具体的节点=> 不太具体的节点)
        会将事件一直冒泡到window对象
        防止事件冒泡的一种方法是使用 
            event.stopPropagation()或 
            event.cancelBubble （低于 IE 9）。
    - 事件捕获:(从外向里 不太具体的节点=>具体的节点)
        事件捕获的用意在于事件到达预定目标之前捕获它。
    - 绑定事件时通过addEventListener函数
        它有三个参数 第三个参数
            true 事件捕获
            false 事件冒泡(不提供参数 默认冒泡)
    - 事件委托：
        - (原理是DOM元素的事件冒泡 
        将元素相应事件的函数委托到另外的元素
        - 分类：
            1. 捕获阶段的事件委托
            2. 冒泡阶段的事件委托
        - 优点：
            1. 节省大量内存空间 减少事件注册
            2. 新增子元素无需对其进行再次绑定
        )
        (e.target 当前受到点击的真实元素
        e.currentTarget 被触发这个函数所属元素
        IE event对象有srcElement属性 没有target属性
        Firefox event对象有target属性 没有srcElement属性)
        JS中常用绑定事件技巧
        把原本需要绑定在子元素的响应事件 委托给父元素
        让父元素担当事件监听的职责
        事件代理的原理是DOM元素的事件冒泡
        将元素相应事件的函数委托到另外的元素
            1.捕获阶段的事件委托
            2.冒泡阶段的事件委托
                事件对象e中有两个元素 
                e.target和e.currentTarget 
                e.target表示当前受到点击的真实元素 
                e.currentTarget()表示被触发的这个函数所属的元素   
        - 优点:
            1. 可以节省大量内存占用 减少事件注册
                比如在ul上代理所有li的click事件
            2. 可以实现当新增子元素无需对其再次进行绑定
        IE event对象有srcElement属性 没有target属性
        Firefox event对象有target属性 没有srcElement属性
13. 不能直接给数组绑定事件 只能对具体元素绑定事件
    执行时间和事件触发时间
    e有兼容性问题 
    兼容标准浏览器e和IE浏览器window.event 按顺序
    e = e || window.event;
    target事件源中的一个属性 知道是哪一个元素触发了该事件
    target也有兼容性问题 标准浏览器 IE浏览器
    var target = e.target||e.srcElement;
14. dom中e.target和this的区别
    e.target 返回的是触发事件的对象（元素）  
    this返回的是绑定事件的对象（元素）
    区别
        e.target 点击了那个元素，就返回那个元素 
        this 那个元素绑定了这个点击事件，那么就返回谁
15. 简述document.write和innerHTML区别
    1.document.write会重绘整个页面
    innerHTML可以指定重绘页面中的指定DOM元素的一部分
    2.document.write是直接写入页面的内容流中
    如果在写之前没有显示调用document.open方法
    浏览器会自动调用document.open方法来打开内容流
    每次写完关闭之后重新调用该函数来打开内容流 会导致页面被重写
16. 如何在一个DOM节点前插入DOM节点
    insertBefore
        后面
            找该元素的父元素
            判断该元素是否是最后一个元素
            如果是最后一个元素
            直接在父元素上appendChild
        不是最后
            找到该元素的下一个元素
            在它下一个元素之前用insertBefore插入
17. JS中的textContent/innerText/innerHTML用法及区别
    innerText和innerHTML区别
    innerText属性
        将文本内容设置或返回为指定节点及其所有子节点的纯文本
    innerHTML属性
        将获取和设置元素中的纯文本或HTML内容
        与InnerText不同 InnerHTML允许使用HTML格式文本
        且不会自动对文本进行编码和解码
18. client浏览器窗口 page文档 offset事件源对象srcElement screen显示器屏幕
/e.clientX e.clientY  鼠标  相对于 浏览器窗口
/e.pageX e.pageY      鼠标  相对于 文档
/e.offsetX e.offsetY  鼠标  相对于 事件源对象srcElement 只IE有
/e.screenX e.screenY  鼠标  相对于 显示器屏幕

- e.clientX e.clientY
    鼠标相对于浏览器窗口可视区域的X Y坐标
    窗口坐标 可视区域不包括工具栏和滚动条
    IE事件和标准事件都定义了这两个属性
- e.pageX e.pageY
    类似于e.clientX e.clientY
    它们使用的是文档坐标而非窗口坐标
    这两个属性不是标准属性 但是得到了广泛支持
    IE事件中没有这两个属性
- e.offsetX e.offsetY
    鼠标相对于事件源对象srcElement的X Y坐标
    只有IE事件有这两个属性 标准事件没有对应的属性
- e.screenX e.screenY
    鼠标相对于用户显示器屏幕左上角的X,Y坐标。标准事件和IE事件都定义了这2个属性
19. DOM0 DOM1 DOM2 DOM3
    - DOM0
        JS在早期版本中提供了查询和操作Web文档的内容API(如 图像和表单) 在JS中定义了images forms 因此可以
        document.images[0]
        document.forms['user']
        这实际上是未形成标准的试验性质的初级阶段的DOM 现在习惯上被称为DOM0 即第0代DOM 由于DOM0在W3C进行标准备化之前出现，还处于未形成标准的初期阶段 这时Netscape和Microsoft各自推出自己的第四代浏览器，自此DOM开始出各种问题。
    - DOM0和DHTML
        Netscape Navigator 4和IE4分别发布于1997年的6月和10月，这两种浏览器都大幅扩展了DOM，使JavaScript的功能大大增加，而此时也开始出现一个新名词：DHTML。
        DHTML是Dynamic HTML（动态HTML）的简称。DHTML并不是一项新技术，而是将HTML、CSS、JavaScript技术组合的一种描述即：
            利用HTML把网页标记为各种元素
            利用CSS设置元素样式及其显示位置
            利用JavaScript操控页面元素和样式
        利用DHTML，看起来可以很容易的控制页面元素，并实现一此原本很复杂的效果（如：通过改变元素位置实现动画）。
        但事实并非如此，因为没有规范和标准，两种浏览器对相同功能的实现确完全不一样。
        为了保持程序的兼容性，程序员必须写一些探查代码以检测JavaScript是运行于哪种浏览器之下，并提供与之对应的脚本。
        JavaScript陷入了前所未有的混乱，DHTML也因此在人们心中留下了很差的印象。
    - DOM1的出现
        在浏览器厂商进行浏览器大站的同时，W3C结合大家的优点推出了一个标准化的DOM，并于1998年10月完成了第一级 DOM，即：DOM1。W3C将DOM定义为一个与平台和编程语言无关的接口，通过这个接口程序和脚本可以动态的访问和修改文档的内容、结构和样式。
        DOM1级主要定义了HTML和XML文档的底层结构。
        在DOM1中，DOM由两个模块组成：DOM Core（DOM核心）和DOM HTML。
        其中，DOM Core规定了基于XML的文档结构标准，通过这个标准简化了对文档中任意部分的访问和操作。
        DOM HTML则在DOM核心的基础上加以扩展，添加了针对HTML的对象和方法，如：JavaScript中的Document对象
    - DOM2与DOM3
        在DOM1的基础上DOM2和DOM3引入了更多的交互能力，也支持了更高级的XML特性。DOM2和DOM3将DOM分为更多具有联系的模块。DOM2级在原来DOM的基础上又扩充了鼠标、用户界面事件、范围、遍历等细分模块，而且通过对象接口增加了对CSS的支持。DOM1级中的DOM核心模块也经过扩展开始支持XML命名空间。在DOM2中引入了下列模块，在模块包含了众多新类型和新接口：
            DOM视图（DOM Views）：定义了跟踪不同文档视图的接口
            DOM事件（DOM Events）：定义了事件和事件处理的接口
            DOM样式（DOM Style）：定义了基于CSS为元素应用样式的接口
            DOM遍历和范围（DOM Traversal and Range）：定义了遍历和操作文档树的接口
        DOM3进一步扩展了DOM，在DOM3中引入了以下模块：
            DOM加载和保存模块（DOM Load and Save）：引入了以统一方式加载和保存文档的方法
            DOM验证模块（DOM Validation）：定义了验证文档的方法
            DOM核心的扩展（DOM Style）：支持XML 1.0规范，涉及XML Infoset、XPath和XML Base
20. 事件与事件流 事件模型 事件对象
    - 观察者模式/发布订阅者模式(Publish/Subscribe)
        可以让多个观察者对象同时监听某一个主题对象
        这个主题对象的状态变化时会通知所有的订阅者
        使得他们能做出反应
        JS的事件模型就是一种观察者模式的体现
        当对应事件被触发时 监听该事件的所有监听函数都会被调用
    - 事件与事件流
        - 事件:
            与浏览器或文档交互的瞬间 如点击按钮 填写表格等 它是JS与HTML之间交互的桥梁
        - 事件流:(描述页面中接受事件的顺序)
            描述页面中接受事件的顺序
            DOM是树形结构 如果同时给父子节点都绑定事件时
            当触发子节点时 这两个事件的发生顺序如何决定
        - 事件流分两种
            事件冒泡
            事件捕获
    - 事件模型
        (JS事件模型就是一种观察者模式的体现)
        DOM0级模型
            又称原始事件模型 在该模型中 事件不会传播
            即没有事件流的概念
            事件绑定监听函数比较简单 
            有两种方式
            HTML代码中直接绑定
                <input type="button" onclick="fun()">
            通过JS代码指定属性值
                var btn = document.getElementById('.btn');
                btn.onclick = fun;
            移除监听函数
                btn.onclick = null;
        - IE事件模型
            有两个过程
            1. 事件处理阶段(target phase)
                事件到达目标元素 触发目标元素的监听函数
            2. 事件冒泡阶段(bubbling phase)
                事件从目标元素冒泡到document
                依次检查经过的节点是否绑定了事件监听函数
                如果有则执行
            事件绑定监听函数的方式如下:
                attachEvent(eventType, handler)
            事件移除监听函数的方式如下:
                detachEvent(eventType, handler)
            参数说明
                eventType指定事件类型(注意加on)
                handler是事件处理函数
        DOM2级模型
            属于W3C标准模型 现代浏览器(除IE6-8之外的浏览器)都支持该模型 在该事件模型中 一次事件共有三个过程
            1.事件捕获阶段(capturing phase)
                事件从document一直向下传播到目标元素 依次检查经过的节点是否绑定了事件监听函数 如果有则执行
            2.事件处理函数(target phase)
                事件到达目标元素 触发目标元素的监听函数
            3.事件冒泡阶段(bubbling phase)
                事件从目标元素冒泡到document 依次检查经过的节点是否绑定了事件监听函数 如果有则执行
            事件绑定监听函数的方式如下:
                addEventListener(eventType, handler, useCapture)
            事件移除监听函数的方式如下:
                removeEventListener(eventType, handler, useCapture)
            参数说明
                eventType指定事件类型(不要加on)
                handler是事件处理函数
                useCapture是一个boolean用于指定是否在捕获阶段进行处理，一般设置为false与IE浏览器保持一致。
    事件对象
        当一个事件被触发时 会创建一个事件对象(Event Object) 
        这个对象里面包含了与该事件相关的属性或方法 
        该对象会作为第一个参数传递给监听函数
        DOM事件模型中事件对象常用属性
            type    用于获取事件类型
            target  获取事件目标
            stopPropagation 阻止事件冒泡
            preventDefault 阻止事件默认行为
        IE事件模型中事件对象续航用属性:
            type    用于获取事件类型
            srcElement  获取事件目标
            cancelBubble  阻止事件冒泡
            returnValue  阻止事件默认行为
    Event Wrapper
        由于事件模型的差异以及Event对象的不同
        为了达到兼容各个浏览器的目的
        我们可以增加一个Event Wrapper
        它对各个浏览器应当提供一致的事件操作接口
    自定义事件
        JS中已经内置了很多事件，如click, mouseover等等
        但是内置事件毕竟有限，有时候我们想自己定义一些事件
        例如三连击，threeclick 实现
        1.创建一个事件 可以使用以下方式
            var event = new Event('threeclick', {"bubbles":true, "cancelable":false});
        2.为事件注册监听函数
            target.addEventListener('threeclick', hello, false);
        3.最后我们要在合适的时机触发该事件
        可以使用dispatchEvent函数
        该方法在当前节点触发指定事件 从而触发监听函数执行
        该方法返回一个布尔值 只要有一个监听函数调用了Event.preventDefault(), 则返回false, 否则返回true。
            target.dispatchEvent(event);
21. document.write和document.innerHTML
- innerHTML&innerText

21. 事件绑定(不会被覆盖)和普通事件(会被覆盖)有什么区别。
    - 标签.事件：如果给同一个元素添加同一个事件，后面的会覆盖前面
    - 事件绑定：可以给同一个元素添加同一个事件，不会被覆盖
21. 拖拽效果中有几种事件？
    按下onmousedown，拖拽onmousemove，弹起onmouseup











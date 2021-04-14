1.所有事件绑定都是异步的
2.DOM怎么添加移除移动复制创建和查找节点
    获取子节点
    父节点.children
    父节点.childNodes
    获取父节点
    子节点.parentNode
    子节点.offsetParent
    创建
    document.createElement(‘标签名’)
    document.createTextNode(‘文本内容’)
    添加
    父节点.appendChild(子节点)
    父节点.insertBefore(newChild，refChild)
    复制
    被复制的节点.cloneNode(true)
    删除：
    节点.remove()
    父节点.removeChild（子节点）
    替换
    父节点.replaceChild（newChild，refChild）
3.DOM和css如何解析 如何渲染出元素
4.操作DOM为什么是昂贵的
    操作dom对象时，会触发浏览器的布局和绘制行为，会导致DOM卡慢，占用内存较高
    使用虚拟DOM(VDOM)映射成实际DOM来进行DOM操作 或使用CSS动画来替代DOM动画，会大大减少页面重绘，使得性能更加完善
6.给出一个三行的表格 删除第一行有几种方案
    1.使用原生的removeChild(子节点)
    2.使用deleteRow(行数)传入第几行
    3.使用jQuery得到这个结点 使用remove() detach()删除该节点
    4.使用css样式 display:none; 隐藏这一行
7.获取DOM元素方式 获取元素标签名
    1.getElementById:通过元素的id获取该元素对象 oBtn一个此对象 
        任何浏览器无兼容性问题
        此只有用document. 因为id文档中是唯一的
    2.getElementsByTagName(htmlCollection):通过元素的标签名称获取元素 oLi一个li的数组
        任何浏览器无兼容性问题 返回一个htmlCollection
        aLi是一个伪数组  没有push方法 只有可以往里存东西的 和获取长度的方法
    3.getElementsByClassname:通过元素的class获取元素
        早期ie可能有兼容性问题 ie8及以下
        封装自己的getElementsByClassName方法
    4.querySelector css选择器就是selector 查询出来一个元素
        是元素 不是数组 只能找到第一个
    5.querySelectorAll
    6.获取元素标签名 element.tagName
8.
    1.oH1.nextSibling ie8及ie8之前都不支持
    2.oH1.nextElementSibling
    封装next方法 在所有浏览器中都能返回下一个兄弟7u元素节点
        function next(elem){
            do{
                elem = elem.nextSibling;
            }while(elem && elem.nodeType != 1);
            return elem;
        }
9.节点
    元素节点 1
    属性节点 2
    文本节点 3
    注释节点 8
    文档节点 9
    nodeName（节点名称） 
    nodeValue（节点值） 
    nodeType（节点类型）
    整个文档是一个文档节点
    每个HTML标签是一个元素节点
    包含在HTML元素中的文本是文本节点
    每一个HTML属性是一个属性节点（属性节点是另一个层面的理解，在浏览器后台打印的时候，不存在属性节点）
    元素节点可以拥有类型属性节点、文本节点、注释节点的子节点。
    属性节点与文本节点不是一个层面（角度）上的，
        {
            因为：在旧 DOM 规范中，属性继承自 Node，是一种特殊的节点。但是DOM4 中已废弃这一条，属性不再是节点。
        }
注释属于注释节点 
10.
   1.appendChild
   2.removeChild
   3.replaceChild
        1
         var oLi = document.createElement('li');
         oLi.innerHTML = 'replaceChild';
         oUl1.replaceChild(oLi,oUl1.firstElementChild);
        2
        只替换文本节点 元素--html 节点--xml
         var textNode = document.createTextNode('hahaha'
         var oLi = oUl1.firstElementChild;
         oLi.replaceChild(textNode,oLi.firstChild);
        3
         var oLi = oUl1.firstElementChild;
         oLi.innerHTML = 'hahaha';
    4 cloneNode
    5.setAttribute getAttribute
        此方法设置的自定义的dom属性

        dom属性 自定义的dom属性 对象属性
        对象属性 和自定义的dom属性 是不通的
        对象属性不能在dom中看到
        自定义dom属性 不饿能通过对象属性的方式获取到
11.DOM自定义属性
    自定义属性:
        1.标签原本没有这个属性,为了存储数据,程序员自己添加的属性
        2.自定义属性无法直接通过DOM对象的方式获取或者设置
    自定义属性的操作：
        1.对象.getAttribute(“自定义属性名字”);获取自定义属性的值
        2.对象.setAttribute(“属性名字”,“值”);设置自定义属性及值
        3.对象.removeAttribute(“属性的名字”); 移除自定义属性
11.事件(事件源|事件处理函数|事件对象)
    事件源：事件由哪个元素触发的
    事件处理函数：如何处理这个事件的函数（当你触发这个事件后具体要做什么）
    事件对象：该对象包含了跟这个事件有关的所有信息
    e是浏览器传的参数 约定俗成 e|event
12.事件绑定三种方法
    (普通方式   元素标签内直接写事件+相应事件触发后的方法调用
    /动态绑定方式 先获取DOM元素再绑定事件 存在内存泄漏 务必注意回收
    /监听方式   addEventListener(事件类型 监听函数 事件冒泡false捕获true控制)方法
    )
    1.普通方式
        元素标签内直接写事件+相应事件触发后的方法调用 这里的事件前面需要加上“on”。
    2.动态绑定方式
        动态事件绑定，需要先获取dom元素再绑定事件，获取dom元素可以参看原生js获取dom对象
        动态事件绑定存在内存泄露，所以务必要注意回收。
    3.监听方式
        使用addEventListener方法，该方法有三个参数：事件的类型、监听的函数、事件的冒泡和捕获控制（true/false）
        注：addEventListener方法的第三个参数默认值为false。
13.常见事件
    1.用户界面事件
    2.焦点事件
    3.鼠标事件
    4.坐标事件
    5.滚轮事件
    6.文本事件
    7.键盘事件
    8.移动端小程序事件


    1.事件focus|blur(on)
    2.change事件就是用于表单的
    3.keydown keyup
    4.mouseover | mouseout | mousemove |mousedown | mouseup
    5.submit
14.几个常用的事件(e)属性
    1.触发时距离浏览器距离
    var oDiv1 = document.getElementById('div1');
        oDiv1.onclick = function(e){
            console.log(e.clientX);
            console.log(e.clientY);
        }
    2当处于聚焦 键盘按下 显示出相应键盘的码
    document.onkeydown = function(e){
            //2当处于聚焦 键盘按下 显示出相应键盘的码
            console.log(e.keyCode);
        }
    3.阻止默认发生的事情 如使链接失效？
    var oA = document.getElementById('go');
        oA.onclick = function(e){
            e.preventDefault();
        }
15.事件流 事件冒泡和捕获 事件委托
    事件：
        是文档和浏览器窗口发生的特定的交互瞬间
        是javascript应用跳动的心脏，也是把所有东西黏在一起的胶水
        当我们与浏览器中web页面进行某些类型的交互时，事件就发生了
    事件流：
        描述的是从页面中接受事件的顺序
        微软(IE)和网景(Netscape)开发团队提出了两个截然相反的事件流概念
            PS:火狐同时支持冒泡流和捕获流
            IE事件流 冒泡(从里向外触发)
            Netscape事件流 捕获(从外向里触发)
    事件冒泡:(从里向外 具体的节点=> 不太具体的节点)
        会将事件一直冒泡到window对象
        防止事件冒泡的一种方法是使用 
            event.stopPropagation()或 
            event.cancelBubble （低于 IE 9）。
    事件捕获:(从外向里 不太具体的节点=>具体的节点)
        事件捕获的用意在于事件到达预定目标之前捕获它。
    绑定事件时通过addEventListener函数
        它有三个参数 第三个参数
            true 事件捕获
            false 事件冒泡(不提供参数 默认冒泡)
    事件委托：
        就是将元素响应事件的函数委托到另外的元素。
            1.捕获阶段的事件委托
            2.冒泡阶段的事件委托
                事件对象e中有两个元素 
                e.target和e.currentTarget 
                e.target表示当前受到点击的真实元素 
                e.currentTarget()表示被触发的这个函数所属的元素   
16.不能直接给数组绑定事件 只能对具体元素绑定事件
    执行时间和事件触发时间
    e有兼容性问题 兼容标准浏览器和IE浏览器 按顺序
    e = e || window.event;
    target事件源中的一个属性 知道是哪一个元素触发了该事件
    target也有兼容性问题 标准浏览器 IE浏览器
    var target = e.target||e.srcElement;
17.dom中e.target和this的区别
    e.target 返回的是触发事件的对象（元素）  
    this 返回的是绑定事件的对象（元素）
    区别 ： e.target 点击了那个元素，就返回那个元素 。this 那个元素绑定了这个点击事件，那么就返回谁
18.选项卡实现
    事件委托实现选项卡
    自定义dom属性实现选项卡
19.轮播图
        实现思路
    滑动轮播图
    拖拽
        onmouseup onmousedown onmousemove
        event.clientX event.clientY
            鼠标相对于浏览器窗口可视区域的X，Y坐标（窗口坐标）
            口坐标），
    放大镜
        。。。
20.简述document.write和innerHTML区别
    1.document.write会重绘整个页面
    innerHTML可以指定重绘页面中的指定DOM元素的一部分
    2.document.write是直接写入页面的内容流中
    如果在写之前没有显示调用document.open方法
    浏览器会自动调用document.open方法来打开内容流
    每次写完关闭之后重新调用该函数来打开内容流 会导致页面被重写



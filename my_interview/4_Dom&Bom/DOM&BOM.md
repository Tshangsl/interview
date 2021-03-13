1.什么是DOM
2.DOM查找
    1. getElementById: 通过元素的id获取该元素对象
    2. getElementsByTagName: 通过元素的标签名称获取元素
    3.getElementsByClassName: 通过元素的class获取元素，该方法在IE8和之前的浏览器中不支持
    ( 封装自己的getElementsByClassName方法)
    4.querySelector
    5.querySelectorAll
3.节点
4.DOM遍历
5.DOM操纵
    1.appendChild
    2.removeChild
    3.replaceChild
    4.cloneNode
    5.setAttribute
    6.getAttribute
6.
对象属性：对象属性不能在dom看到
自定义dom属性：不能通过对象属性的方式获取到
7.事件
    事件源：该事件是由哪个元素触发的
    事件处理函数：如何处理这个事件的函数（当你触发了这个事件以后具体要做什么）
    事件对象：该对象包含了跟这个事件有关的所有信息
8.绑定事件的方法
    on+事件名  , addEventListener
9.常用事件
    focus|blur
    change
    keydown keyup
    mouseover|mouseout|mousemove
    mousedown  |  mouseup  |   click 
10.事件属性
    clientX | clientY
    keyCode
    preventDefault
11.
    事件冒泡：从里往外触发 ，  3  2  1   false
    事件捕获：从外往里触发 ，  1  2  3   true
12.事件委托
13.选项卡
14.轮播图
15.推拽
16.放大镜



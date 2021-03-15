1.虚拟DOM
2.所有事件绑定都是异步的
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
5.给DOM元素绑定事件有哪几种方法
    1.普通方式
        元素标签内直接写事件+相应事件触发后的方法调用 这里的事件前面需要加上“on”。
    2.动态绑定方式
        动态事件绑定，需要先获取dom元素再绑定事件，获取dom元素可以参看原生js获取dom对象
        动态事件绑定存在内存泄露，所以务必要注意回收。
    3.监听方式
        使用addEventListener方法，该方法有三个参数：事件的类型、监听的函数、事件的冒泡和捕获控制（true/false）
        注：addEventListener方法的第三个参数默认值为false。
6.给出一个三行的表格 删除第一行有几种方案
    1.使用原生的removeChild(子节点)
    2.使用deleteRow(行数)传入第几行
    3.使用jQuery得到这个结点 使用remove() detach()删除该节点
    4.使用css样式 display:none; 隐藏这一行
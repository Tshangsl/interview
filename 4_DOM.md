1.虚拟DOM
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
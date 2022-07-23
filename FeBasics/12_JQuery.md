### attr 和 prop
> 区别
- 对于 HTML 元素本身就带有的固有属性 在处理时 使用 prop 方法
- 对于 HTML 元素自定义的 DOM 属性 在处理时 使用 attr 方法
- 具有true和false两个属性的属性 如checked selected 或disabled
> prop()函数的结果
1. 如果有相应的属性 返回指定属性值
2. 如果没有相应的属性 返回值是空字符串
>attr()函数的结果
1. 如果有相应的属性 返回指定属性值
2. 如果没有相应的属性 返回值是undefined

### jquery on()方法
```
$(document).ready(function(){
    $('p').on('click',function(){
        alert('被惦记')
    })
})
```
- on()方法在被选元素及子元素上添加一个或多个事件处理程序
- 自jquery版本1.7起 on()方法是bind() live() delegate()方法的新的替代品
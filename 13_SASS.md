css预处理器有很多种 常用的两种 sass/less
css预处理器定义了一种新的语言
其基本思想是 用一种专门的编程语言
为css新增加一些编程的特性
将css作为目标生成文件
然后开发者就只要使用这种语言进行编码工作

css预处理器用一种专门的编程语言
进行Web网页样式设计 然后再编译成正常的css文件
以供项目使用

css预处理器为css增加了一些编程的特性
无需考虑浏览器的兼容性问题
例如你可以在css中使用变量 简单的逻辑程序 函数
等等在编程语言中的一些基本特性
可以让你的css更加简洁 适应性更强 可读性更加
更易于代码的维护等诸多好处

查看ruby是否安装成功
ruby-v
安装sass
gem install sass

查看sass是否安装成功
sass -v查看版本号

更新:gem update sass
卸载:gem uninstall sass

sass编译成css
文件编译
sass<要编译的Sass文件路径>/style.scss:<要输出css文件路径>/style.css预处理器为css增加了一些编程的特性
实时
sass--watch<要编译的Sass文件路径>/style.scss:<要输出的css文件路径>/style.css预处理器为css增加了一些编程的特性
sass --watch style:css
Sass VS SCSS
Sass和SCSS其实是同一种东西，我们平时都称之为Sass
两者之间的不同之处有以下两点
文件扩展名不同 
Sass是以.sass后缀为扩展名
SCSS是以.scss后缀为扩展名
语法书写方式不同 
Sass是以严格的缩进式语法规则来书写的
不带大括号({})和分号(;)
SCSS的语法书写和我们的CSS语法书写方式非常类似

编译
sass 文件目录


sass可以定义变量
$变量名:;(不用加"")
$color:#fff;
#container{
    background-color:$color;
}

-w是--watch的缩写

css输出格式
1.嵌套输出方式 nested 默认
2.展开输出方式 expanded 正常css文件格式
3.紧凑输出方式 compact 每个选择器的属性都放在一行
4.压缩输出方式 compressed 都在一行 以压缩的方式输出css文件

输出格式的转化
sass src:dist -w --style expanded
sass src:dist -w
sass基本功能 
1.文件的引入
2.变量的使用和选择器嵌套
3.输出格式
4.注释
css中只有/**/注释方式
sass中有//和/**/注释
sass中使用//注释 注释内容不会在css中显示
/**/注释内容会在css中显示
5.&符号 对当前元素的引用
引用父选择器
6.属性嵌套
7.特殊变量
复杂的选择器定义成一个变量
在三个地方都可以使用
属性的值
属性
选择器
注释中也可以使用
8.默认变量

三种变量 普通变量 默认变量 特殊变量
9.mixin混合 可传参 可设置默认值
一旦变量设置默认值 则所有的变量都要设置默认值
传实参的时候 参数不传完全 则参数需指定
后面的的参数要指定
定义
@mixnin name($color:#ccc,$back){}
引用
Selector{
    @include name(#fff,#ccc);
}
10.继承
@extend #div1
11.数字
+ - *
/：1.()2.除数不能有单位
百分比：percentage
12.字符串运算
拼字符串
content下面的方法
转换大小写 
to-upper-case
to-lower-case
返回字符串长度
str-length

str-index
13.颜色
color下面的方法
14.列表
15.map键值对的方式
16.布尔
17.interpolation
18.Data_type
sass -i
type-of()
数字 
字符串 分有引号的字符串 和没有引号的字符串
 颜色 布尔值 空值 值列表 
 map +()
19.控制命令
if else if else
each用来循环列表
while
20.函数
@function
@warn
@error
定义变量的方式都一样
引用的方式不一样
css中索引都是从1开始数的
js中索引从0开始
1. Babel(一个JS编辑器/一个工具链/将ECMAScript 2015+版本的代码转换为向后兼容的JavaScript语法)
- Babel原理 (解析 代码->AST抽象语法树/转换 AST->新的AST/生成 新的AST->代码)

4. ( Git是目前世界上最先进的分布式版本控制系统（没有之一）。
   - GitHub是一个面向开源及私有软件项目的托管平台，因为只支持Git作为唯一的版本库格式进行托管，故名GitHub。
   - 四个关键点：
        1. 工作区：
            本地电脑存放项目文件的地方
        2. 暂存区(Index/Stage):
            使用git管理项目文件时 其本地项目文件会多出一个.git文件夹 将这个.git文件夹称之为版本库 
            其中.git文件夹包含了两部分 
            一个是暂存区(Index/Stage) 暂时存放文件的地方
            通常使用add命令将工作区的文件添加到暂存区里
        3. 本地仓库：
            .git文件夹中还包含git自动创建的master分支 并将head指针指向master分支 使用commit命令可以将暂存区中文件添加到本地仓库
        4. 远程仓库
            不是在本地仓库中 项目代码在远程git服务器上
            比如项目放在github上 就是一个远程仓库
            通常使用clone命令将远程仓库拷贝到本地仓库中
            开发后推送到远程仓库
    )
6.
1.什么是Babel(一个JS编辑器/一个工具链/将ECMAScript 2015+版本的代码转换为向后兼容的JavaScript语法)
Babel原理
(解析 代码->AST抽象语法树/转换 AST->新的AST/生成 新的AST->代码)
7.(Webpack模块打包机：它做的事情是，分析你的项目结构，找到JavaScript模块以及其它的一些浏览器不能直接运行的拓展语言（Scss，TypeScript等），并将其打包为合适的格式以供浏览器使用。)
    Babel：
        一个JavaScript编译器
        Babel是一个工具链 
        主要用于将ECMAScript 2015+版本的代码
        转换为向后兼容的JavaScript语法
        以便能够运行在当前和旧版本的浏览器或其他环境中
        通过语法转换器来支持新版本的javascript
    原理：
        大多数JavaScript Parser遵循estree规范 Babel最初基于acorn项目(轻量级现代JavaScript解析器)Babel大概分为三大部分
            1.解析 将代码转换成AST
                词法分析：将代码(字符串)分割为token流 即语法单元组成的数组
                语法分析：分析token流(上面生成的数组)并生成 AST
            2.转换 访问AST的节点进行变换操作生产新的AST
                Taro就是利用 babel 完成的小程序语法转换
            3.生成 以新的AST为基础生成代码
    扩展AST：抽象语法树(AST)->转换->编译

1. Git Github
    - Git 目前世界上最先进的分布式版本控制系统（没有之一）。
    - GitHub 一个面向开源及私有软件项目的托管平台，因为只支持Git作为唯一的版本库格式进行托管，故名GitHub。







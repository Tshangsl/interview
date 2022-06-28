### npm
> 定义
- npm是Node的模块管理器 功能极其强大 是Node获得成功的重要原因之一 正是因为有npm 只要一行命令 就能安装好别人写的模块
> npm install
- 用来安装模块到node_modules目录
```
npm install <packageName>
--save-dev -D 本地
--save -S 生产
-g 全局
npm uninstall <packageName>
```
- 安装前 npm install会先检查 node_modules目录之中是否已经存在指定模块
- 如果存在 就不再重新安装 即使远程仓库已经有了一个新版本也是如此
- 如果希望 一个模块是否安装过 npm都要强制安装 可以使用-f或--force参数
```
npm install <packageName> --force
```
> npm update
- 更新已安装模块 要用到npm update命令
```
npm update <packageName>
```
- 它会先到远程仓库查询最新版本 然后查询本地版本 如果本地版本不存在 或远程版本较新就会安装
> 模块安装过程
1. 发出npm install命令
2. npm向register查询模块压缩包的网址
3. 下载压缩包 存放在~/.npm目录
4. 解压压缩包到当前项目的node_modules目录
> npm常用指令
```
npm init --yes 初始化配置 -y
npm i(会根据package.json里面的键dependencies devDependencies来安装相对应的包)
npm i 包(默认安装一个最新的包 这个包在node_modules文件夹中 并且会更新在package.json文件)
npm i 包@3.0.0(安装一个指定版本的包 会更新在package.json文件)
npm i 包 --save-dev(安装一个开发环境所需要的包 会更新在你的package.json文件) -D
npm i 包 --save(安装一个生产环境所需要的包 会更新在你的package.json文件) -S
npm uninstall 包(卸载一个包 会更新在package.json文件)
npm update 包(更新此包版本为最新版本 会更新在package.json文件)
npm run 脚本键(会根据package.json里面的scripts里的脚本键自动执行相对应的值)
npm publish(根据package.json的name发布一个包)发布到npm仓库
npm unpublish 包名 --force(卸载npm网站上自己上传的包)
```
> 更改npm默认的下载路径和缓存路径
- npm config ls命令可查看npm安装信息以及默认的下载路径
```
更改npm默认的缓存路径
npm config set cache 
更改npm默认的下载路径
npm config set prefix
```
> 创建第一个node模块
- Node.js模块就是发布到npm的代码包
- 创建一个新模块的第一步就是创建一个package.json文件 可以用npm init创建package.json文件 这个过程中命令行会逐步提示你输入这个模块的信息 其中模块的名字和版本号是必填项
- 还需要一个入口文件 如果使用默认值的话就是index.js 创建完package.json文件后 要开始写代码包里的内容 在默认的index.js里写一个要导出的函数 这个函数就是别人的代码里可以import或者require的
> 发布到npm服务器上
1. 注册一个npm账号
2. 首次需要登录 npm login存储证书到本地 后面就不需要每次都登录
3. 开始发布
- npm publish 发布包
> 更新npm包
1. npm version <update_type>自动更新package.json里的版本号
2. 重新npm publish
> 删除npm包
```
npm unpublish kk-a-test --force
```
> 查看当前登录的npm账号
```
npm whoami
```

### package.json package.lock.json
> package.json
1. 管理包
- package.json用来描述项目及项目所依赖的模块信息 帮助管理项目中的依赖包
- 通过npm管理 使用一些简单的命令 自动生成package.json 安装包依赖关系都由package.json管理
2. 语义版本控制
- 依赖包的版本号由三部分组成 major.minor.patch 主版本号.次版本号.修复版本号
- 补丁中的更改表示不会破坏任何内容的错误修复
- 次要版本的更改表示不会破坏任何内容的新功能
- 主要版本的更新代表了一个破坏兼容性的大变化 如果用户不使用主要版本的更改 则内容将无法正常工作
3. 安装依赖包的版本如何指定
- ~会匹配最近的小版本依赖包 比如~1.2.3会匹配所有1.2.x版本 但是不包含1.3.0
- ^会匹配最新的大版本以来包 比如^1.2.3会匹配所有1.x.x的包 包括1.3.0 不包括2.0.0
- *安装最新版本的依赖包 如*1.2.3会匹配x.x.x
4. 多人开发时依赖包安装的问题
- 使用~ ^来控制依赖包版本号时 多人开发 可能存在大家安装的依赖包版本不同 项目运行结果不同的情况
> package.lock.json
- 解决不同人电脑安装的所有依赖版本都是一致的 确保项目代码在安装所执行的运行结果都一样 对整个依赖树进行版本固定 在npm(^5.x.x.x)后才有 中途有几次修改
- package-lock.json 会在npm更改node_modules目录树或者package.json时自动生成 它准确描述了当前项目npm包的依赖树 并在随后的安装中会根据package-lock.json安装 确保是相同的一个依赖树 不考虑这个过程中是否某个以来有小版本的更新
- 使用cmp install时 并不会生成package-lock.json文件 也不会根据package-lock.json来安装依赖包 还是会使用package.json安装
> package-lock.json被意外修改的原因
1. package.json文件修改了
2. 挪动了包的位置
- 将部分包的位置从dependencies移动到devDependencies 虽然包未变 但是也会影响package-lock.json 会将部分包的dev字段设置为true

### dependencies devDependencies
> npm install作用
- 把前端项目中始于dependencies和devDependencies的依赖 递归安装到node_modules目录
- 安装之前 npm install 会先检查 node_modules目录之中是否已经存在制定模块 如果存在 就不再重新安装 即使远程仓库已经有了一个新版本也是如此
- 如果希望 一个模块不论是否安装过 npm都要强制重新安装 可以使用-f或--force参数
```
npm install <packageName> --force
```
- npm install默认会安装dependencies字段和devDependencies字段中的所有模块 如果软件包具有package-lock或shrinkwrap文件 则依赖项的安装将由此驱动 如果两个文件都粗在 则npm-shrinkwrap.json优先
> 具体区别
- 使用--production参数 可以只安装dependencies字段的模块
```
npm install --production
NODE_ENV=production npm install
```
1. dependencies
- npm核心一项内容 依赖管理 这个对象里面的内容就是我们这个项目所依赖的JS模块包
2. devDependencies
- 在开发时会用到的一些包 只是在开发环境中需要用到 但是在别人引用我们包时 不会用到这些内容 放在devDependencies的包 在别人引用时不会被npm下载

### 运行npm run xxx时
1. npm先在当前目录的node_modules/.bin查找要执行的程序 如果找到则运行
2. 没有找到则从全局的node_modules/.bin中查找 npm i -g xxx 就是安装到全局目录
3. 如果全局目录还没找到 就从path环境变量中查找有没有其他同名的可执行程序

### npm init
1. 新建一个空的文件夹 用来存放后续所有代码
```
mkdir antd-course
cd antd-course
```
2. 调用npm init初始化package.json 它是Nodejs约定的用来存放项目的信息和配置等信息的文件
```
y 代表yes 省去默认选项点击
npm init -y 
```
3. 安装所需模块的依赖名称
```
npm install xxx --save-dev (-S)
```
- 安装完发现package.json中多出一项devDependencies的配置
- 上述命令中 参数 --save让依赖信息保存到package.json中
- 这样其他开发者下载代码后就只需要执行npm install就会自动安装项目依赖的包

### NPM全局安装和局部安装
> 全局安装
1. 安装位置
- 将npm包安装在本地node安装目录下的node_modules文件夹中
- 在windows和mac中全局安装的默认路径是不同的
- 在mac中默认安装到/usr/local/lib
- 在windows默认安装目录是C:\Program Files\nodejs
- 可以通过命令查看全局安装路径
```
查看全局安装路径
npm root -g
查看npm的基础设置
npm config ls
查看安装目录路径
npm config get prefix
```
> 本地安装
- 在特定项目中执行npm install xxx 这个包会被安装在这个项目的node_modules目录下

### npm audit fix --force
- npm@5.10.0 and npm@5才有npm audit这个命令 该命令用于执行项目依赖关系树的即时安全性审查
- 检测项目依赖中的漏洞并自动安装需要更新的有漏洞的依赖 而不必开发人员自己进行跟踪和修复
```
扫描项目漏洞吧不安全的依赖项自动更新到兼容版本
npm audit fix
强制执行audit fix 安装最新的依赖项 toplevel
npm audit fix --force
```
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

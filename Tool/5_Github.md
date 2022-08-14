### 分布式版本控制系统(Distributed Version Control System简称DVCS)
- 这类系统中像Git Mercurial Bazaar Darcs等 客户端并不只提取最新版本的文件快照 而是把代码仓库完整地镜像下来 这样以来 任何一处协同工作用的服务器发生故障 事后都可以用任何一个镜像出来的本地仓库恢复 因为每一次克隆操作 实际上都是一次对代码仓库的完整备份
- 更进一步 许多这类系统都可以和若干不同的远端代码仓库进行交互 借此 可以在同一个项目中 分别和不同工作小组的人相互协作 可以根据需要设定不同的协作流程 比如层次模型式的工作流 这是以前的集中式系统无法实现的
### Git SVN Github Gitee Gitlab
> Git
- 一种版本控制系统 一种工具 用于代码存储和版本控制
> Github
- 一个基于Git实现的在线代码仓库 是目前全球最大的代码托管平台 可以帮助程序员之间互相交流和学习
> GitLab
- 一个基于Git实现的在线代码仓库软件 由GitLabInc.开发 可以用GitLab自己搭建一个类似于Github一样的仓库 但GitLab有完善的管理界面和权限控制 一般用于在企业 学校等内部网络 搭建Git私服
> Github和GitLab
- 两个都是基于Web的Git远程仓库 它们都提供分享开源项目的平台 为开发团队提供了存储 分享 发布和合作开发项目的中心化云存储的场所
- Github如说使用私有仓库 是要付款的 Gitlab可以在上面搭建私人的免费仓库
- GitLab让开发团队对他们的代码仓库拥有更多的控制 相对于Github它有不少的特色
1. 允许免费设置仓库权限
2. 允许用户选择分享一个project的部分代码
3. 允许用户设置project的获取权限 进一步提升安全性
4. 可以设置获取到团队整体的改进进度
5. 通过innersourcing让不在权限范围内的人访问不到该资源
> Gitee.com(码云)
- 是OSCHINA.NET推出的代码托管平台 支持Git和SVN提供免费的私有仓库托管
> SVN
- github和svn都属于开源版本控制系统(version control system,VCS)
- SVN是Subversion的简称 是一个开放源代码的集中式版本控制系统 支持大多数常见的操作系统 比Git早些出来 TortoiseSVN
> SVN特点
1. 部署比较方便 拥有一个服务器主仓库 开发人员都相当于是客户端 设计理念上比较简洁 容易让人理解和接受 适合中小型代码项目
2. 使用时 首先...
### Git协议
- 为了可以实现协作功能 需要一个远程的Git仓库
- 与远程的git公共仓库通信 需要遵循一定的协议
- Git可以使用四种不同的协议来传输资料 本地协议Local HTTP协议 SSH(Secure Shell)协议 以及Git协议
### Git&Github
> git定义
- Git 目前世界上最先进的分布式版本控制系统（没有之一）。
> github定义
- GitHub 一个面向开源及私有软件项目的托管平台，因为只支持 Git 作为唯一的版本库格式进行托管，故名 GitHub。
> 四个关键点：
1. 工作区：
   - 本地电脑存放项目文件的地方
2. 暂存区(Index/Stage):
   - 使用 git 管理项目文件时 其本地项目文件会多出一个.git 文件夹 将这个.git 文件夹称之为版本库 其中.git 文件夹包含了两部分 一个是暂存区(Index/Stage) 暂时存放文件的地方 通常使用 add 命令将工作区的文件添加到暂存区里
3. 本地仓库：
   - .git 文件夹中还包含 git 自动创建的 master 分支 并将 head 指针指向 master 分支 使用 commit 命令可以将暂存区中文件添加到本地仓库
4. 远程仓库
   - 不是在本地仓库中 项目代码在远程 git 服务器上 比如项目放在 github 上 就是一个远程仓库 通常使用 clone 命令将远程仓库拷贝到本地仓库中 开发后推送到远程仓库
### git 工作原理
> 定义
- Git 是一个开源的分布式版本控制系统，可以有效，高速地处理从很小到非常大的项目版本管理。Git 是[Linus Torvalds]为了帮助管理 Linux 内核开发而开发的一个开放源码的版本控制软件
- Torvalds 开始着手开发 Git 是为了作为一种过渡方案来代替 BitKe
- Git 保存的不是文件的变化或差异，而是一系列不同时刻的文件快照。在进行提交操作时，Git 会保存一个提交对象(commit object)。该提交对象会包含一个指向暂存内容快照的指针，该提交对象还包含了作者的姓名和邮箱，提交时输入的信息以及指向它的父对象的指针。
> MAC 系统安装 git
1. 安装 homebrew,通过 homebrew 安装 git
2. 安装 Xcode,Xcode 集成 git，运行 Xcode,选择 Perferences->Downloads->Command Line Tools
> git 存储
- git 存储分为四个部分
1. workspace 工作空间(开发代码目录)
2. index 暂存区 .git 目录下的 index 文件
3. Repository 本地仓库 通过 git clone 将远程的代码下载到本地 代码库的元数据信息在根目录下的.git 目录下
4. Remote 远程仓库(如 GitHub 就是一个远程仓库)
- 使用过程
1. 工作区 workspace->git add->暂存区 index->git commit->本地仓库 Repository->git push->远程仓库
2. 远程仓库区->git fetch->使用 refs/remotes 下对应分支文件记录远程分支末端 commit_id 和本地仓库区->git merge->工作区
3. 远程仓库区->git pull->使用 refs/remotes 下对应分支文件记录远程分支末端 commit_id and 本地仓库区 and 工作区
### git中的HEAD head 和master
> 概念
- HEAD是当前活跃分支的游标
- HEAD并非只能指向分支的最顶端(时间节点距今最近的那个)实际上它可以指向任何一个节点 它就是Git内部用来追踪当前位置的存在
> HEAD和head
- HEAD是current branch(当下的分支) 当使用git checkout切换分支时 HEAD修订版本重新指向新的分支 有时HEAD会指向一个没有分支名字的修订版 这种情况叫detached HEAD
- head是commit对象的引用 每个head都有一个名字(分支名字或者标签名字等)但是默认情况下 每个叫master的repository都会有一个head 一个repository可以包含任意数量的head 一个repository可以包含任意数量的head 任意时候 只要这个head被选择成为current head 那么这个head就成了HEAD总是大写
### 本地 git 项目中.git 目录下的文件
1. refs:存储 git 各种引用的目录，包含分支，远程分支和标签。
2. objects:是存储 git 各种对象及备用的对象库，包含正常的压缩和压缩后的。
3. info:存储 git 信息的目录 如判处特定后缀的文件
4. index:暂存区
5. hooks:存储 git 钩子的目录，钩子只在特定事件发生时触发脚本如提交之前 提交之后
6. description:项目描述
7. config:代码库几倍的配置文件
8. ORIG_HEAD:针对某些危险操作,git 通过记录 Head 指针的上次所在的位置，提供了会退功能，当发现某系操作驶入，如错误 reset 到很早的一个版本，可以使用 git reset --hard ORIG_HEAD 回退到上一次 reset 之前
9. HEAD:代码库当前分支的志向
10. FETCH_HEAD:是一个版本链接，记录在本地的一个文件中，指向目前已经从远程仓库取下来的分支的末端版本。
11. COMMIT_EDITMSG:commit 编辑
### ssh
### git fetch
1. git fetch <远程主机名> 这个命令将某个远程主机的全部更新全部取回本地
2. git fetch <远程主机名> <分支名> 只想取回特定分支的更新
- 最常见的命令如取回origin主机的master分支 git fetch origin master
- 取回更新后 会返回一个FETCH_HEAD 指的是某个branch在服务器上的最新状态 可以在本地通过它查看刚取回的更新信息 git log -p FETCH_HEAD
### git pull
> 过程可以理解为
1. git fetch origin master 从远程主机的master分支拉取最新内容
2. git merge FETCH_HEAD 将拉取下来的最新内容合并到当前所在的分支中

1. 基于本地的FETCH_HEAD记录 对比本地的FETCH_HEAD记录与远程仓库的版本号 然后git fetch获得当前指向的远程分支的后续版本的数据
2. 利用git merge将其与本地的当前分支合并
- git pull后不加参数时 跟git push一样 默认是git pull origin 当前分支名 
- 远程仓库没有跟本地当前分支名一样的分支 肯定会报错
- 本地master分支执行git pull 时就是git pull origin master
### git fetch 和 git pull 区别
1. git fetch:将远程主机的最新内容拉到本地，用户在检查了以后决定是否合并到工作本机分支中，具体操作如下。
```
git fetch origin master:temp
// 本地新建一个temp分支 并将远程origin仓库的master分支代码下载到本地temp分支
git diff temp
// 比较远程代码和本地代码的区别
git merge temp
// 将temp分支合并到本地master分支
git branch -d temp
// 如果不想保留分支 可以将其删除
```
2. git pull:给予本地的 FETCH_HEAD 记录，对比本地的 FETCH_HEAD 与远程仓库的版本号，然后 git fetch 获得当前的远程分支的后续版本的数据，然后利用 git merge 将其与本地的分支合并，可以认为是 git pull 是 git fetch 和 git merge 两个步骤的合并，git pull 过程可以理解为下。
```
git fetch origin master // 将远端的master分支拉取最新内容
git merge FETCH_HEAD //将拉去的最新内容和当前分支合并
```
- git pull 用法
```
git pull 远程主机名 远程分支名:本地分支名
// 将远程主机的某个分支 与本地的指定分支合并
```
- git pull 合并后可能会出现冲突 需要手动解决冲突
```
error:Your local changes to the following files would be overwritten by merge
Please commit your changes or stash them before you merge
// 更改的代码与本地的修改代码有冲突 先提交你的改变或现将本地修改缓存起来
```
- git stash 解决冲突

```
git stash //现将本地修改暂存起来
git stash list // 查看保存信息
git pull //拉取内容
git stash pop //还原暂存的内容
```
### git status
> 用途
- git status命令用于显示工作目录和暂存区的状态 使用此命令能看到哪些修改被暂存 哪些没有 哪些文件没有被git tracked到
- git status命令可以列出当前目录中所有还没有被git管理的文件和被git管理且被修改但还未提交(git commit)的文件
- 通过git status -uno可以只列出所有已经被git管理的且被修改但没提交的文件
- git status不显示已经commit到项目历史中去的信息 看项目历史的信息要使用git log
> git status相对来说是一个简单的命令 它简单的展示状态信息 输出的内容分为3个分类/组
1. Changes to be committed:代表被 add 的文件 被加载到了暂存区
2. Changes not staged for commit:代表在当前分支中被修改的文件 还没有背 add 暂存在工作区
3. Untracked files:没有tracked过的文件 即从没有add过的文件
> 忽略文件(untracked文件)
- 没有tracked的文件分两类 
1. 已经被放在工作目录下但还是没有执行git add的
2. 一些编译了的程序文件(如 .pyc .obj .exe)
- Git在.gitignore中把要忽略的文件放在其中 每一个想忽略的文件应当独占一行 *这个符号可以作为通配符使用 如在项目根目录下的.gitignore文件中加入下面内容能阻止.pyc和.tmp文件出现在git status中
```
*.pyc
*.tmp
```
### git log
> 用途
- 用来查看历史提交记录 如果不指定分支或master 默认情况下git log显示的是目前你Head位置的git提交日志
```
git log [] [..] [[-]...]
```
1. git log
- commit 哈希id
- 提交的Author信息
- 提交的日期和时间
- commit info信息
- 不带任何参数 它会列出所有历史记录 最近的排在最上方 显示提交对象的哈希值 作者 提交日期 和提交说明 如果记录过多 则按Page Up,Page Down,来控制显示
- 按q退出历史记录列表
2. git log -p 
- 与--stat类似 但更详细 可以看到每个文件更为详细的修改内容 控制输入每个commit具体修改的内容 输入的形式以diff的形式给出
- 按补丁显示每个更新间的差异 比git log -stat命令信息更全
3. git log --stat
- 使用--stat参数主要可以在git log的基础上输入文件增删改的统计数据
- 显示每次更新的修改文件的统计信息 每个提交都列出了修改过的文件 以及其中添加和移除的行数 并在最后列出所有增减行数小计
4. git log --shortstat
- 只显示--stat中最后的行数添加修改删除统计
5. git --name-only
- 仅在已修改的提交信息后显示文件清单
6. git --name-status
- 显示新增 修改 和删除的文件清单
7. git --abbrev-commit
- 仅显示SHA-1的前几个字符 而非所有的40个字符
8. git --relative-date
- 使用较短的相对事件显示(如 two weeks ago)
9. git --graph
- 显示ASCII图形表示的分支合并历史 类似一个树形结构
10. git log --oneline
- 只显示提交的SHA1值和提交信息 SHA1还是缩短显示前几位 一般为前七位
11. git log --author="xxx"
- 用来过滤commit 限定输出给定的用户 有利于查找团队某个人的提交历史
12. git log --after/git log --before
- 限定指定日期范围的log 即按照日期查找
13. git log --decorate
- 用来控制log输出时 显示对应commit所属的branch和tag信息
### git branch
> 常见命令
1. git branch 查看本地所有分支
2. git branch -r 查看远程所有分支
3. git branch -a 查看本地和远程的所有分支
4. git branch <branchname>新建分支
5. git branch -d <branchname> 删除本地分支
6. git branch -d -r<branchname> 删除远程分支 删除后还需推送到服务器
   git push origin:<branchname>
7. git branch -m <oldbranch> <newbranch> 重新命名本地分支
> 使用git branch删除分支
1. 删除本地分支
git branch -d +分支名称 
2. 删除远程分支
git branch -r -d origin/branch-name
git push origin :branch-name
-----
- git checkout -b feat/max_stock_PRJ-00217883 origin/feat/
### git tag
1. 定义 创建时间
- 项目的版本管理中 每当一个release版本发布时 需要做一个记录 以便以后需要的时候能查找特定的版本 这时候就用到tag这个功能
- git中的tag指向一个commit的id 通常用来给开发分支做一个标记 如标记一个版本号
2. tag和branch区别
- branch是一个分支 tag是分支上的一个里程碑 一个点
- tag就是一个只读的branch 一般为每一个可发布的里程碑版本打一个tag
- 如branch有1.0 1.1等 其中1.0分支里可以有1.0.1 1.0.2这些tag
- tag就像是一个里程碑 一个标志 一个点 branch是一个新的征程一条线
- tag是静态的 branch要往前走
- 稳定版本备份用tag 新功能多人开发用branch(开发完成后merge到master)
3. 相关操作命令
   1. 打标签
   ```
   git tag -a 0.1.3 -m 'Release version 0.1.3'
   ```
   - -a 0.1.3是增加名为0.1.3的标签
   - -m后跟着的是标签分备注
   - 打标签的操作发生在我们commit修改到本地仓库后
   2. 提交
   ```
   git add .
   git commit -m 'fixed some bugs'
   git tag -a 0.1.3 -m 'Release version 0.1.3'
   ```
   3. 提交标签到远程服务器上
   ```
   git push origin master
   git push origin -tags
   ```
   - tags参数表示提交所有tag至服务器端 普通的git push origin master操作不会推送标签到服务器端
   - 如果指定特性的tag git push origin [tagname]
   4. 删除标签
   ```
   git tag -d 0.1.3
   ```
   5. 删除远端服务器的标签
   ```
   git push origin :refs/tags/0.1.3
   ```
### git checkout
1. git checkout <branchname> 切换到某个分支
2. git checkout --force <branchname> 强制切换到某个分支 会丢失当前已修改的内容
3. git checkout -b <branchname> 创建并切换到新分支
   - 相当于
   1. git branch <branchname>
   2. git checkout <branchname>
- 当本地存在修改时 切换分支这个操作很大可能会被拒绝
1. 先提交修改
2. 使用stash命名暂存 之后使用stash pop恢复
- origin为远程地址别名
### git remote命令
1. git remote -v 显示所有远程仓库
2. git remote show xxx(xxx为远程仓库别名)显示某个远程仓库信息
3. git remote rm name 删除远程仓库
4. git remote rename oldname newname 修改仓库名
### git stash命令
> 原理
- 将本地没提交的内容(git commit的内容不会被缓存 git add的内容会被缓存)进行缓存并从当前分支移除 缓存的数据结构为堆栈 先进后出
> 参数
1. git stash & git stash save 相同 将没有提交的内容缓存并移除 这条缓存名称为最新一次提交的commit -m的内容 如果没有本地提交则是远程仓库是commit内容
- git stash save ‘xxx’  加上自己的注解进行缓存
- stash只会操作被git追踪的文件
- stash后新增的文件并没有进入缓存 这是因为git还没有追踪这个新增的文件 所以需要进行git add [文件名] 让git追踪该文件 再进行stash就可以对新文件进行操作
2. git stash list
- 返回缓存的列表
3. git stash pop
- 将堆栈中最新的内容pop出来应用到当前分支上 且删除堆中的记录
4. git stash apply
- 与pop相似 但他不会在堆栈中删除这条缓存 适合在多个分支中进行缓存应用
5. git stash drop [名]
- 删除单个缓存
6. git stash clear
- 全清
7. git stash branch
- 指定或最新缓存创建分支
### git rebase
> 用法
1. 合并当前分支的多个commit记录
   1. 找到想要合并的commit 使用rebase -i
   ```
   git rebase -i [startPoint endPoint]
   git rebase -i 4cb600e
   ```
   - 前开后闭 区间 [startPoint]是指需要合并的commit的前一个commit(即当前示例的'4cb600e':feat:modify a) 因为 三个commit肯定要基于上一个commit合并成新的commit
   - 谨慎使用[endPoint]省略 即默认表示从起始commit一直到最后一个 但是一旦填写了 则表示p[endPoint]后面的commit全部不要
   2. 进入Interact交互界面
   - 终端会进入选择交互界面 让你进行变基选择操作
   3. 使用s命令 合并到上一个commit
      1. 按i进入操作 将第二 三个commit的pick改成s
      2. 按Esc退出操作
      3. 输入:wq保存并退出
   4. 修改commit记录
   - 接下来会弹出第二个页面 分别展示三个commit的提交信息
   5. 查看最新合并情况
   - 最发现原三个一样的提交现在合并成了一个新的commit
   6. rebase的其他用法
   - pick p 保留该commit
   - reword r 保留该commit 但需要修改该commit的注释
   - edit e 保留该commit 但要停下来修改改提交(不仅仅修改注释)
   - squash s 将该commit合并到前一个commit
   - fixup f 将该commit合并到前一个commit 但不要保留该提交的注释信息
   - exec x 执行shell命令
   - drop d 丢弃该commit
2. 避免出现分叉合并
> 前提
1. 有两个分支:develop(主分支)rebase_new(feature分支)
2. 新需求按时间顺序叫 a b 等(a需求最早 b其次 以此类推)
3. 原commit a 变基之后(hashId改变)叫a
> 场景1
1. 没有冲突
2. 没有多余的commit提交
- 该情况下rebase和merge效果是一样的
> 场景2
- 各分支都有自己新的commit 
- develop新增需求a feat:a
- feat新增需求b feat:b
### git restore
### git config
### mac电脑下查看.git文件
- git使用git.config指令来指定与git相关的配置
- config配置有system级别 global(用户级别) local(当前仓库)三个级别 三个设置范围system>global>local 底层配置会覆盖顶层设置 分别使用--system/global/local可以定位到配置文件
1. git config --list 查看git的配置列表
2. 命令行配置
```
git config --global user.name 'username'
git config --global user.email 'email'
```
- --global表示全局 即当前用户都有效 该配置会出现在～/.gitconfig文件中 ~表示当前用户的目录
- 不加 --global 是局部的 局部只对当前仓库生效 它的配置信息会在当前仓库根目录/.git/config文件下
- 局部变量覆盖全局变量和编程语言中的变量关系是一致的
3. 命令行修改
```
git config --replace-all user.name 'name'
git config --replace-all user.email 'email'
```
### git本地新建分支并提交到远程仓库
1. 建立本地仓库
- 查看当前项目根目录中有没有.git文件(隐藏文件) 如果没有 右键 git bash here 输入git init建立本地仓库
git init
2. 将代码提交到本地仓库
git add .
git commit -m 'new branch commit'
3. 在本地仓库中建立一个与远程仓库的别名 以便之后提交代码 不用每次都要输入远程仓库地址
git remote add origin git代码地址
### git拉取远程指定分支代码
1. git clone -b branch-name xxx
### 查看本地分支与远程分支的关联
1. git branch -vv
2. git remote show origin
3. cat .git/config
### 将本地分支关联到远程分支
1. 远程新建一个分支 本地没有该分支
git checkout -b branch-name 新建并切换到本地branch-name分支
git pull origin branch-name 本地分支与远程分支相关联
----
git checkout --track origin/branch-name 本地会新建一个分支名叫branch-name 会自动跟踪远程的同名分支branch-name
2. 本地新建一个分支 远程没有该分支
git checkout -b branch-name 新建并切换到本地branch-name分支
git push -u origin branch-name 在远程创建分支并关联 -u表关联
----
此时push和pull指令无法确定跟踪谁 一般来说会使其跟踪远程同名分支 
git push --set-upstream origin branch-name 在远程创建一个branch-name分支 本地track其分支 再push和pull就自动同步
---
git branch --set-upstream debug origin/debug
3. git本地新建分支并提交到远程仓库
<>
4. 本地有branch-name2分支 远程有branch-name分支 分支不同名
git push -u origin branch-name2:branch-name 推送即可
git pull origin branch-name:branch-name2/git pull origin branch-name 远程分支更新拉去
1. 本地有分枝 远程也有对应分支
```
git checkout dev
git push --set-upstream origin dev
```
2. 本地有分枝 远程没有分支
### 本地项目搭建完毕 想和远程仓库做关联
```
echo "# NO.1" >> README.md //该命令是创建readme文件
git init
git add .
git commit -m 'first commit'
git remote add origin http://www.git_xxx.git
git push -u origin master
```
### 推 push 到指定仓库时
```
git remote add origin git@github.com:
git push -u origin master
```
### 拉取远程分支到本地
1. 从远程仓库里拉取一条本地不存在的分支
- 该命令将会自动创建一个新的本地分支 并与指定的远程分支关联起来
```
git checkout -b 本地分支名 origin/远程分支名
```
- 如果出现提示 fatal:Cannot update paths and switch to branch 'offline' at the same time
- 如果执行失败 就需要执行
```
git fetch
```
- 然后再执行 
```
git checkout -b 本地分支名 origin/远程分支名
```
### 常见 git 命令
> 创建仓库
1. 创建

```
git init
```
2. 配置用户名和邮箱
```
git config --global user.name 'mingzi'
git config --global user.email '邮箱'
```
3. 创建钥匙
```
ssh-keygen -t rsa -C 'youxiang'
```
4. 验证钥匙

```
ssh -T git@github.com
```

5. 关联远程仓库

```
git remote add origin 远程仓库地址
```

6. 删除关联

```
git remote rm origin
```

7. 初次拉取远程到本地

```
git pull origin master --allow-unrelated-histories
git clone 远程地址
```

> 提交与拉取命令

1. 添加文件

```
git add '文件名'
git add .
```

2. 提交文件

```
git commit -m '备注'
```

3. 本地推到远程

```
git push origin master
```

4. 忽略提交的文件名写入此文件中

```
touch .gitignore
```

5. 拉取远程到本地

```
git pull origin master
```

> 查看相关命令

1. 查看仓库状态

```
git status
```

2. 查看提交日志(比较全面的信息)

```
git log
```

3. 查看版本号与备注

```
git log --pretty=online
```

4. 查看操作记录

```
git reflog
```

5. 查看文件的修改内容

```
git diff
```

> 返回某个版本(需要提交到仓库的文件)

1. 回到上一个版本

```
git reset --hard HEAD^
```

2. 回到前 100 个版本

```
git reset --hard HEAD~100
```

3. 回到具体版本号

```
git reset --hard 具体版本号
```

4. 回到最后一次 git commit 或者 git add 状态

```
git checkout --文件名
```

> 分支相关命令

1. 查看分支

```
git branch
```

2. 创建分支

```
git branch 分支名
```

3. 切换分支

```
git checkout 分支名
```

4. 创建切换同时进行

```
git checkout -b 分支名
```

5. 删除分支

```
git branch -D 分支名
```

6. 删除远程分支

```
git push origin --delete 分支名
```

7. 把 a 合并到 b 分支 先切换到 b 分支

```
git merge a分支名
```

8. 查看分支合并图

```
git log --graph
```

> 标签管理

1. 打标签

```
git tag 标签名
```

2. 查看所有标签

```
git tag
```

3. 切换到指定的标签名

```
git checkout 标签名
```

4. 推送标签到远程

```
git push origin 标签名
```

5. 拉取远程到本地 分支名称要为新的

```
git checkout -b [分支名称][tagit g标签名称]
```

6. 删除本地标签

```
git tag -d 标签名
```

7. 删除远程标签

```
git push origin:refs/tags/标签名
```


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
### Git工作原理
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
### Git中的HEAD head 和master
> 概念
- HEAD是当前活跃分支的游标
- HEAD并非只能指向分支的最顶端(时间节点距今最近的那个)实际上它可以指向任何一个节点 它就是Git内部用来追踪当前位置的存在
> HEAD和head
- HEAD是current branch(当下的分支) 当使用git checkout切换分支时 HEAD修订版本重新指向新的分支 有时HEAD会指向一个没有分支名字的修订版 这种情况叫detached HEAD
- head是commit对象的引用 每个head都有一个名字(分支名字或者标签名字等)但是默认情况下 每个叫master的repository都会有一个head 一个repository可以包含任意数量的head 一个repository可以包含任意数量的head 任意时候 只要这个head被选择成为current head 那么这个head就成了HEAD总是大写
### HEAD是什么
- .git/HEAD文件 它存储着当前working directory所处的某次commit 打开文件内容为
```
ref:refs/heads/master
```
- refs目录下存储的是仓库和tags 每个仓库下又有分枝 每个tags下又有tag 一个tag对应某次commit
```
存储local master分支的最新commit对象的SHA-1
refs/heads/master

存储远程仓库 master分支的最新commit对象的SHA-1
refs/remotes/origin/master

存储tag的SAH-1
tags/xxx
```
> HEAD是当前分支引用的指针 它总是指向某次commit 默认是上一次的commit 这表示HEAD将是下一次提交的父节点
- 通常可以把HEAD看作上一次提交的快照 HEAD的指向是可以改变的 比如提交了commit 切换了仓库 分支 或者回滚了版本 切换了tag
> 用Git对项目进行版本管理时
1. 用HEAD表示当前版本
2. HEAD^表示上一个版本 同HEAD~1
3. HEAD^^表示上上个版本 HEAD~2
4. HEAD~100表示上100个版本
> 查看HEAD指向
```
cat .git/HEAD
```
- 存储当前分支 如ref:refs/heads/master
- 如果HEAD指向一个引用 可以用
```
git symbolic-ref HEAD
```
### commit id
- commit id是用来唯一标识每一个commit的 使用git log命令可以看到一大堆hash化的commit-id
- git的原子粒度最细就到commit id 
- 同一次commit里有两个文件改动 想分别进行处理 是没有办法的 git管理的粒度不到这里
> Head
- git操作时要有Head的概念 Head就是一个指针 指向一个commit id 
- 你以为head指向的是一个branch 实际底层也是指向这个branch的最后 也就是最新的那一个commit id
- Head并非只能指向一个branch最新的commit id 它可以指向该分支上的任何一个commit id
### git获取commit id
```
获取完整的commit id
git rev-parse HEAD
获取short commit id
git rev-parse --short HEAD
```
### 本地 Git 项目中.git 目录下的文件
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
### 远端主机
> 添加远端主机(git remote add/git clone)
- git中有两种方式添加远端主机
1. 隐式添加
- git clone <远端地址> 指令
- 克隆远端仓库的同时 会自动添加该远端主机到当前目录 并默认主机名为origin
2. 显式添加
- git remote add <主机别名><远端地址>
- 指令中 主机别名参数为自定义指定 远端地址即远端服务器上的访问地址
- 可以为任一目录指定任意数量远端主机

## Git 命令

### git fetch
```
将某个远程主机的全部更新取回本地
git fetch <远程主机名>
只取回特定分支的更新
git fetch <远程主机名> <分支名>
查看刚取回的更新信息
git log -p FETCH_HEAD
```

### git pull
```
使用rebase模式进行合并
git pull --rebase <远程主机名><远程分支名>:<本地分支名>
```

### git status
- git status命令用于显示工作目录和暂存区的状态 使用此命令能看到哪些修改被暂存 哪些没有 哪些文件没有被git tracked到
- 通过git status -uno可以只列出所有已经被git管理的且被修改但没提交的文件
- git status不显示已经commit到项目历史中去的信息 看项目历史的信息要使用git log
-å git status相对来说是一个简单的命令 它简单的展示状态信息 输出的内容分为3个分类/组
1. Changes to be committed:代表被 add 的文件 被加载到了暂存区
2. Changes not staged for commit:代表在当前分支中被修改的文件 还没有背 add 暂存在工作区
3. Untracked files:没有tracked过的文件 即从没有add过的文件
- 忽略文件(untracked文件)
- 没有tracked的文件分两类 
1. 已经被放在工作目录下但还是没有执行git add的
2. 一些编译了的程序文件(如 .pyc .obj .exe)
- Git在.gitignore中把要忽略的文件放在其中 每一个想忽略的文件应当独占一行 *这个符号可以作为通配符使用 如在项目根目录下的.gitignore文件中加入下面内容能阻止.pyc和.tmp文件出现在git status中

### git log
- 查看历史提交记录 不指定分支或master 默认情况下git log显示的是目前你Head位置的git提交日志
```
不带任何参数 会列出所有历史记录 最近的排在最上方 显示提交对象的哈希值 作者 提交日期 提交说明
git log
查看版本号与备注
git log --pretty=online
图形化显示log
git log --graph
git log -p
显示每次更新的修改文件的统计信息
git log --stat
```

### git branch
```
查看本地所有分支
git branch|git branch -l
查看远程所有分支
git branch -r
查看本地和远程的所有分支
git branch -a
新建分支但不切换到新建的分支上
git branch xxx
删除本地分支
git branch -d xxx
删除本地分支 然后推送到服务器
git branch -d -r origin/xxx
git push origin :xxx
重命名本地分支
git branch -m oldname newname
查看所有分支并带上最新的提交信息
git branch -av
查看本地分支对应的远程分支
git branch -vv
查看哪些分支已经合并到当前分支
git branch --merged
查看其他分支
git branch --no-merged
```

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
```
直接列出所有的标签 标签不是按时间顺序列出 而是按字母排序
git tag
可以根据xxx进行标签的筛选
git tag -l xxx
查看标签的信息 (轻量标签和附注标签的信息是不一样的)
git show 标签名
给当前的提交版本创建一个轻量标签
git tag 标签名
给指定的提交版本创建一个轻量标签
git tag 标签名 提交版本号
直接给当前的提交版本创建一个[附注标签]
git tag -a 标签名 -m 附注信息
给指定的提交版本创建一个[附注标签]
git tag -a 标签名称 提交版本号 -m 附注信息
删除标签
git tag -d 标签名称
将指定的标签上传到远程仓库
git push origin 标签名称
将所有不在远程仓库中的标签上传到远程仓库
git push origin --tags
删除远程仓库的标签
git push origin --delete 标签名称
git push origin :refs/tags/<tagname>
以标签指定的版本为基础版本 新建一个分支 继续其他的操作
git checkout -b 分支名称 标签名称
```

### git checkout
```
切换到某个分支
git checkout <branchname>
强制切换到某个分支 会丢失当前已修改的内容
git checkout --force <branchname>
创建并切换到新分支
git checkout -b <branchname>
从远程仓库拉取一条本地不存在的分支并与指定分支关联
git checkout -b 本地分支名 origin/远程分支名
```

### git stash
- 将本地没提交的内容(git commit的内容不会被缓存 git add的内容会被缓存)进行缓存并从当前分支移除 缓存的数据结构为堆栈 先进后出
- 能够将所有未提交的修改保存至堆栈中 用于后续恢复当前工作内容
- 如果文件没有提交到暂存区(使用git add .追踪新的文件) 使用该命令会提示No local changed to save 无法将修改保存到堆栈中
```
缓存
git stash save 'xxx'
返回缓存的列表
git stash list
将堆栈中最新的内容pop出来应用到当前分支上 且删除堆中的记录
git stash pop
与pop相似 但他不会在堆栈中删除这条缓存 适合在多个分支中进行缓存应用
git stash apply stash@{index}
恢复的同时把stash记录也删除
git stash drop stash@{index}
全清
git stash clear
指定或最新缓存创建分支
git stash branch
存储未追踪的文件
git stash -u
查看当前记录中修改了哪些文件
git stash show stash@{index}
查看当前记录中修改了哪些文件的内容
git stash show -p stash@{index}
```

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
- 针对暂存区的恢复 已经在本地仓库的文件 使用git restore --staged不能恢复到工作区 restore命令只针对暂存区
```
将不在缓存区的文件撤销更改
git restore [file]
将提交到暂存区的文件恢复到工作区
git restore --staged [file]
```

### git reflog
- 显示的是一个HEAD指向发生改变的时间列表
- 显示可引用的历史版本记录
- 使用git log命令只可以查看到HEAD指针以及其之前的版本信息
- git reflog可以查看到所有历史版本信息 
- reflog不是git仓库的一部分 它单独存储 是本地的(git reflog命令显示的内容 应该是存储在.git/logs/HEAD文件中 或.git/logs/refs目录中的文件)
- git reflog 保留从clone仓库开始 用户所有在本地库中的操作

### git config
> config文件分类
- Git中有三层config文件 系统，全局，本地
- 对于同一配置项 三个配置文件的优先级是1<2<3
- Git的配置文件是纯文本的 可以直接手动编辑这些配置文件
- git使用git.config指令来指定与git相关的配置
- config配置有system级别 global(用户级别) local(当前仓库)三个级别 三个设置范围system>global>local 底层配置会覆盖顶层设置 分别使用--system/global/local可以定位到配置文件
```
查看系统config
git config --system --list
- /etc/gitconfig 包含了适用于系统所有用户和所有选项的值 git的安装目录 --system系统

查看当前用户(global)配置
git config --global --list
- ~/.gitconfig 只适用于当前登陆用户的配置 --glocal全局

查看当前仓库配置信息
git config --local --list
- 位于git项目目录中的.git/config 适用于特定git项目的配置 --local当前项目
```
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
4. 编辑配置文件
```
git config --global --edit
```
5. 删除全局配置项
- 删除了user.name这个配置
```
git config --global --unset user.name
```
6. 配置别名
```
git config --global alias.co checkout
```

### git diff
```
查看工作区和暂存区单个文件的对比
git diff filename
查看工作区和暂存区所有文件的对比
git diff
查看工作区和暂存区所有文件的对比 并显示出所有有差异的文件列表
git diff --stat
查看暂存区与上次提交到本地仓库的快照(即最新提交到本地仓库的快照)的对比
git diff --cached/--staged [file]
查看工作区与上次提交到本地仓库的快照(即最新提交到本地仓库的快照)的对比
git diff branchname
查看工作区与HEAD指向(默认当前分支最新的提交)的对比
git diff HEAD
查看两个本地分支中某一个文件的对比
git diff branchname..branchname filename
查看两个本地分支所有的对比
git diff branchname..branchname
查看远程分支和本地分支的对比
git diff origin/branchname..branchname
查看远程分支与远程分支的对比
git diff origin/branchname..origin/branchname
查看两个commit的对比
git diff commit1..commit2
```

### git remote
```
查看所有远程主机
git remote
查看关联的远程仓库的详细信息
git remote -v
显示某个远程仓库的信息
git remote show 远程地址别名
添加远程仓库
git remote add [仓库名称][地址]
git remote add origin http://www.git_xxx.git
删除远程仓库的关联
git remote rm/remove projectname
设置远程仓库的关联
git remote set-url origin <newurl>
重命名远程仓库名
git remote rename oldname newname
```

### git add
```
添加一个或多个文件到暂存区
git add [file1] [file2]
把当前目录下所有文件改动都添加到暂存区
git add .
把当前仓库内所有文件改动都添加到暂存区
git add -A
add和commit的合并 便捷写法(未追踪的文件无法直接提交到暂存区/本地仓库)
git commit -am
```

### git rm
```
删除暂存区和工作区的文件
git rm filename
只删除暂存区的文件 不删除工作区的文件
git rm --cached filename
```
1. git rm .env
- 执行完这个命令就表示.env文件从git仓库中删除了 配合.gitignore就能保证以后所有的.env文件变更都不用担心被提交到远程仓库
2. git rm -r dist
- 删除dist目录
```
删除工作区/暂存区的文件
git rm [file1][file2]
停止追踪指定文件 但该文件会保留在工作区
git rm --cached [file]
```

### git reset
```
git reset [--soft|--mixed|--hard][HEAD]
```
> 参数
1. --soft
- 重置最新一次提交版本 不会修改暂存区和工作区
2. --mixed
- 默认参数 用于重置暂存区的文件与上一次的提交保持一致 工作区文件内容保持不变
3. --hard
- 重置所有提交到上一个版本 并修改工作去 会彻底回到上一个提交版本 在代码中看不到当前提交的代码 工作区改动被重置

### git revert
```
只会反做commitid对应的内容 然后重新commit一个信息 不会影响其他的commit内容
git revert -n commitid
反做commita到commitb之间的所有commit
git revert -n commitida..commitb
```
> 两种commit
1. 常规commit
- 使用git commit提交的commit
2. merge commit
- 使用git merge合并两个分支之后 会得到一个新的merge commit
> 两种commit的不同
- merge commit包含两个parent commit 代表该merge commit是从哪两个commit合并过来的
> revert常规commit
- 使用git revert <commit id>即可 git会生成一个新的commit 将指定的commit内容从当前分支上撤除
> revert merge commit
- 需要添加-m选项代表这次revert的是一个merge commit
- 如果直接使用git revert <commitid> git不知道到底撤除哪一条分支上的内容 需要指定一个parent number标识出主线 主线的内容将会保留 而另一条分支的内容将被revert
- -m选项接收的参数是一个数字 数字取值为1和2 也就是merge行里面列出来的第一个还是第二个 其含义用来保留某个分支
- 要revert will-be-revert分支上的内容 即保留主分支 应该设置主分支为主线
```
git revert -m 1 bd86846
```

### git show
- 可以用于显示提交日志的相关信息
1. git show 默认显示HEAD 想显示某个提交信息 git show后带上某个提交的hash
```
查看单个标签具体信息
git show <tagname>
```

### git commit
1. git commit -amend
- 对最近一次的提交的信息进行修改 此操作会修改commit的hash值
- git commit -amend
- 编辑器会弹出上一次提交的信息 可以在这里修改提交信息
```
git commit -amend -m '本次提交的说明'
加入--no-edit标记会修复提交但不修改提交信息 编辑器不会弹出上一次提交的信息
git commit --amend --no-edit
```
- git commit -amend既可以修改上次提交的文件内容 也可以修改上次提交的说明 会用一个新的commit更新并替换最近一次提交的commit 
- 如果暂存区有内容 这个新的commit会把任何修改内容和上一个commit的内容结合起来 如果暂存区没有内容 那么这个操作就只会把上次的commit消息重写一遍
- 永远不要修复一个已经推送到公共仓库中的提交 会拒绝推送到仓库

### git push
```
推送分支并创建关联关系
git push --set-upstream origin branch1

将本地仓库的文件推送到远程分支
如果远程仓库没有这个分支 会新建一个同名的远程分支
如果省略远程分支名 则表示两者同名
git push <远程主机名> <本地分支名>:<远程分支名>
git push origin branchname

如果省略本地分支名 则表示删除指定的远程分支
因为这等同于推送一个空的本地分支到远程分支
git push origin :master
等同于
git push origin --delete master

建立当前分支和远程分支的追踪关系
git push -u origin master
如果当前分支与远程分支之间存在追踪关系 
则可以省略分支和-u
git push
也可以使用以下命令建立当前分支和远程分支的追踪关系
git push --set-upstream origin master

不管是否存在对应的远程分支 将本地的所有分支都推送到远程主机
git push --all origin
```

### git clone
```
拉取远程指定分支代码
git clone -b branch-name xxx
```

### git alias

### git cherry pick
- 将代码从一个分支转移到另一个分支
1. 需要另一个分支的所有代码变动 采用合并git merge
2. 需要部分代码变动(某几个提交) 采用cherry pick
> 基本用法
- git cherry-pick命令的作用 是将指定的提交commit应用于其他分支
```
git cherry-pick <commitHash>
```
- 该命令会将指定的提交commitHash 应用于当前分支 这会在当前分枝产生一个新的提交 当然它们的哈希值会不一样
- git cherry-pick命令的参数 不一定是提交的哈希值 分支名也是可以的 表示转移该分支的最新提交
> 转移多个提交
- cherry pick 支持一次转移多个提交
```
git cherry-pick <hashA><hashB>
```
- 该命令将A B两个提交应用到当前分支 会在当前分支生成两个对应的新提交
```
git cherry-pick A..B
```
- 该命令可以转移从A到B的所有提交 它们必须按照正确的顺序放置 提交A必须早于提交B 否则命令将失败 但不会报错 该命令 提交A将不会包含在Cherry pick
```
git cherry-pick A^..B
```
- 该语法包含commit A
> 代码冲突
- 如果操作过程中发生代码冲突 Cherry pick会停下来 让用户决定如何继续操作
1. --continue
```
git cherry-pick --continue
```
2. --abort
- 发生代码冲突后 放弃合并 回到操作前的样子
3. --quit
- 发生代码冲突后 退出Cherry pick 但是不回到操作前的样子

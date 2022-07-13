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

- git fetch 和 git pull 区别

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

3. git status

- Changes to be committed:代表被 add 的文件 被加载到了暂存区
- Changes not staged for commit:代表在当前分支中被修改的文件 还没有背 add 暂存在工作区
  > 本地 git 项目中.git 目录下的文件

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

### 本地项目搭建完毕 想和远程仓库做关联

```
echo "# NO.1" >> README.md //该命令是创建readme文件
git init
git add .
git commit -m 'first commit'
git remote add origin http://www.git_xxx.git
git push -u origin master
```

### 一些步骤的昨晚 推 push 到指定仓库时

```
git remote add origin git@github.com:
git push -u origin master
```

1. Git Github
   - Git 目前世界上最先进的分布式版本控制系统（没有之一）。
   - GitHub 一个面向开源及私有软件项目的托管平台，因为只支持 Git 作为唯一的版本库格式进行托管，故名 GitHub。
   - 四个关键点：
   1. 工作区：
      本地电脑存放项目文件的地方
   2. 暂存区(Index/Stage):
      使用 git 管理项目文件时 其本地项目文件会多出一个.git 文件夹 将这个.git 文件夹称之为版本库
      其中.git 文件夹包含了两部分
      一个是暂存区(Index/Stage) 暂时存放文件的地方
      通常使用 add 命令将工作区的文件添加到暂存区里
   3. 本地仓库：
      .git 文件夹中还包含 git 自动创建的 master 分支 并将 head 指针指向 master 分支 使用 commit 命令可以将暂存区中文件添加到本地仓库
   4. 远程仓库
      不是在本地仓库中 项目代码在远程 git 服务器上
      比如项目放在 github 上 就是一个远程仓库
      通常使用 clone 命令将远程仓库拷贝到本地仓库中
      开发后推送到远程仓库
2. 1. 之前的 git 工作流
   2. rebase 做什么 一般解决什么问题
      - 可以对某一段先行提交历史 进行编辑 删除 复制 粘贴 因此 合理使用 rebase 命令可以使我们的提交历史干净简洁
      - 不要通过 rebase 对任何已提交到公共仓库的 commit 进行修改
      - 使用 git log 可以按 s 向下翻 log
      - git log -oneline 可以一行展现
   3. 如何合并多个 commit
   4. 具体操作
      - 本地仓库提交多次 在把本地提交 push 进公共仓库之前 为了让提交记录更简洁明了 把如下分支 B C D 三个提交记录合并成一个完整的提交 然后 push 到公共仓库
      ```
      git rebase -i [startpoint] [endpoint]
      ```
      - -i 的意思是--interactive 即弹出交互式的界面让用户编辑完成合并操作 [startpoint][endpoint]指定一个编辑区间 如果不指定[endpoint]则该区间的终点默认是当前分支 HEAD 所指向的 commmit(该区间指定的是一个前开后闭的区间) 在查看到了 log 日志后 运行以下命令
      ```
      git rebase -i 36224db
      ```
      ```
      git rebase -i HEAD-3
      ```

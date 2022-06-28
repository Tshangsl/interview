### git工作原理
> 定义
- Git是一个开源的分布式版本控制系统，可以有效，高速地处理从很小到非常大的项目版本管理。Git是[Linus Torvalds]为了帮助管理Linux内核开发而开发的一个开放源码的版本控制软件
- Torvalds开始着手开发Git是为了作为一种过渡方案来代替BitKe
- Git保存的不是文件的变化或差异，而是一系列不同时刻的文件快照。在进行提交操作时，Git会保存一个提交对象(commit object)。该提交对象会包含一个指向暂存内容快照的指针，该提交对象还包含了作者的姓名和邮箱，提交时输入的信息以及指向它的父对象的指针。
> MAC系统安装git
1. 安装homebrew,通过homebrew安装git
2. 安装Xcode,Xcode集成git，运行Xcode,选择Perferences->Downloads->Command Line Tools
> git存储
- git存储分为四个部分
1. workspace 工作空间(开发代码目录)
2. index 暂存区 .git目录下的index文件
3. Repository 本地仓库 通过git clone将远程的代码下载到本地 代码库的元数据信息在根目录下的.git目录下
4. Remote 远程仓库(如GitHub就是一个远程仓库)
- 使用过程
1. 工作区workspace->git add->暂存区index->git commit->本地仓库Repository->git push->远程仓库
2. 远程仓库区->git fetch->使用refs/remotes下对应分支文件记录远程分支末端commit_id和本地仓库区->git merge->工作区
3. 远程仓库区->git pull->使用refs/remotes下对应分支文件记录远程分支末端commit_id and 本地仓库区 and 工作区
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
2. git pull:给予本地的FETCH_HEAD记录，对比本地的FETCH_HEAD与远程仓库的版本号，然后git fetch获得当前的远程分支的后续版本的数据，然后利用git merge将其与本地的分支合并，可以认为是git pull是git fetch和git merge两个步骤的合并，git pull过程可以理解为下。
```
git fetch origin master // 将远端的master分支拉取最新内容
git merge FETCH_HEAD //将拉去的最新内容和当前分支合并
```
- git pull用法
```
git pull 远程主机名 远程分支名:本地分支名
// 将远程主机的某个分支 与本地的指定分支合并
```
- git pull合并后可能会出现冲突 需要手动解决冲突
```
error:Your local changes to the following files would be overwritten by merge
Please commit your changes or stash them before you merge
// 更改的代码与本地的修改代码有冲突 先提交你的改变或现将本地修改缓存起来
```
- git stash解决冲突
```
git stash //现将本地修改暂存起来
git stash list // 查看保存信息
git pull //拉取内容
git stash pop //还原暂存的内容
```
3. git status
- Changes to be committed:代表被add的文件 被加载到了暂存区
- Changes not staged for commit:代表在当前分支中被修改的文件 还没有背add 暂存在工作区
> 本地git项目中.git目录下的文件
1. refs:存储git各种引用的目录，包含分支，远程分支和标签。
2. objects:是存储git各种对象及备用的对象库，包含正常的压缩和压缩后的。
3. info:存储git信息的目录 如判处特定后缀的文件
4. index:暂存区
5. hooks:存储git钩子的目录，钩子只在特定事件发生时触发脚本如提交之前 提交之后
6. description:项目描述
7. config:代码库几倍的配置文件
8. ORIG_HEAD:针对某些危险操作,git通过记录Head指针的上次所在的位置，提供了会退功能，当发现某系操作驶入，如错误reset到很早的一个版本，可以使用git reset --hard ORIG_HEAD回退到上一次reset之前
9. HEAD:代码库当前分支的志向
10. FETCH_HEAD:是一个版本链接，记录在本地的一个文件中，指向目前已经从远程仓库取下来的分支的末端版本。
11. COMMIT_EDITMSG:commit编辑
### 常见git命令
>创建仓库
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
2. 回到前100个版本
```
git reset --hard HEAD~100
```
3. 回到具体版本号
```
git reset --hard 具体版本号
```
4. 回到最后一次git commit或者git add状态
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
7. 把a合并到b分支 先切换到b分支
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
### 一些步骤的昨晚 推push到指定仓库时
```
git remote add origin git@github.com:
git push -u origin master
```
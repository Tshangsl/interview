CSIG云与智慧产业事业群/云产品一部/云开发产品中心/前端研发组

- 微搭应用市场前端方案

- 前端整体设计方案
- 用户 -> Request weda.cloud.tencent.com 云开发静态托管(CDN+COS) ->Request Node接入层 -> Request 云市场后台服务
                                            部署
                                            Next预渲染          Request
                                            定时触发/手动触发+审批
- 渲染方案
    - 考虑到微搭应用市场需要优先考虑SEO和访问性能 内容更新相对不频繁
    - 采用Next静态导出 需要实时更新的内容采用前端获取数据
- 域名
    - https://weda.cloud.tencent.com/

- 部署方式
    - 采用云开发静态托管部署 部署在云梯账号(主账号 438167613)的云开发环境
    - 地域 上海
    - 环境ID weda-0gnknt90ebfe91b4

- 部署方案
    - 基于内网Coding CI部署

- 官网公共导航和底部接入
    - 为了保持和官网整体设计风格保持统一 需要接入官网的标准导航和底部等
        - 顶部导航(topNav)
        - 底部(footer)                            
        - 浮动条(floatBar) 主要承载[活动运营]和[我们]

- 应用市场开发/部署/发布流程
- 技术栈 NextJS
- Git规范
    1. 任何改动都要从master上开出新分支 分之命名规范{分枝类型}/{日期}-${分枝简称} 如feature/2021-01-01-free-page
    2. 不可直接修改master分枝 直接推到线上(会影响现网构建)
    3. 新分支走Merge Request合入master 合入前 需邀请至少一名其他团队成员进行CR
    4. 走Merge Request合并后 会自动触发Coding CI流水线构建 发到线上
- UI样式
    - 走官网重构侧 不需要开发样式和界面

- 本地开发
    - yarn 
    - npm run dev
    - http://localhost:3000
- 如何获取腾讯云登录态
    - 本地访问http://localhost:3000后 界面右上角有腾讯云登录 腾讯云登录态存储在*.cloud.tencent.com域名下的cookies中 所以需要挂代理
    - 使用whistle挂浏览器代理
    ```
    weda.cloud.tencent.com localhost:3000
    ```
    - 此时访问weda.cloud.tencent.com 域名 即可看到本地代码渲染效果
- 测试环境
    - 和后端再测试环境联调 分为2步
    1. 配置测试代理
        - 将腾讯云测试配置导入whistle中(浏览器代理) 同时将测试代理导入SwitchHosts(系统代理)
    2. 修改本地数据
        - NextJS中 在编译时用到的获取数据的接口在测试环境代理下 无法正常返回
        - mock的假数据会放到./src/data中 可以根据改动或实际需要 让后端同学导出合适的数据
- 预发/体验
    - 和后端在预发或体验环境联调 分为两步 预发和体验环境的云API代理的ip是同一个 后端根据regionId地域 来区分是体验环境 还是语法环境
    1. 配置体验环境
        - 后端会给一个云API代理地址 如134.175.75.45 /.+[^=]\/CGI/CAPI\?i=lowcode\/.*$/这个代理可直接放到whistle中
        - 系统代理针对iaas.cloud.tencent.com 域名进行代理 代理ip: 134.175.75.45 iaas.cloud.tencent.com
    2. 切换地域
        - 预发环境的地域是上海(regionId=4)体验环境地域每个后端同学都不一样
        - 前端切换地域 在控制台Console中 执行sessionStorage.setItem('DEFAULT_TCB_REGION_ID',你的地域信息)后 刷新页面
        - NextJS服务切换地域 在本地node请求云API的统一方法中 将地域信息传给regionId
- 预览
    1. 本地构建
    ```
    npm run build
    ```
    2. 构建后的结果在./out 文件夹中 需要将它部署到自己的云开发环境中的静态托管上
    ```
    tcb hosting deploy ./out -e{你的云开发环境id}
    ```
    3. 假设将out部署到weda-test-ddsdfsfrwtre环境中 访问代理是
    ```
    weda.cloud.tencent.com weda-test-ddsdfsfrwtre-132434.tcloudbaseapp.com
    ```
- 发布
    - 走Merge Request合并后 会自动触发Coding CI流水线构建 发布到线上


- 微搭控制台前端设计
    1. 项目背景 
        - 为低码用户提供管理微搭的能力 作为产品入口供腾讯云用户使用 作为低码编辑器入口 内嵌低码编辑器
    2. 方案选型
        - 前端UI: 腾讯云tea组件库
        - 前端框架: ReactJS+Tea
        - React写法: 支持hooks sagaduck
    3. 架构
        1. 开发工具 @Tea/UI UI组件 ，React Hooks开发语言 ，Saga Duck状态管理 Prettier开发规范 Monaco内置编辑器 CommitLint git提交规范
        2. 开发环境 测试环境 体验环境 预发环境 正式环境
        3. 构建工具 Yarn Webpack @Tea/Cli
        4. 灰度策略 腾讯云白名单系统 野鹤灰度发布
        5. 部署平台 ARS部署 星云发布单 野鹤发布
        6. 监控体系 野鹤体验评估系统 野鹤异常分析系统
        ./src
        ├── common # 公共模块
        │   ├── adapters # 数据聚合层，包装 models 中的接口
        │   ├── components #  React 组件
        │   ├── constants
        │   ├── contexts # Hooks创建的上下文状态
        │   ├── css
        │   ├── duckComponents # SagaDuck组件对应的React样式
        │   ├── ducks # SagaDuck组件
        │   ├── hocs # 高阶函数组件
        │   ├── hooks # hooks组件
        │   ├── interfaces # 类型声明
        │   ├── models # models中的每个函数，对应一个云API
        │   └── utils # 单元函数
        └── routes # 每个模块对应不同的页面
            ├── lcap-app # 应用管理
            ├── lcap-auth # 小程序认证
            ├── lcap-datasource # 数据源管理
            ├── lcap-element # 组件库管理
            ├── lcap-index
            ├── lcap-price # 套餐包管理
            └── lcap-template # 模板管理
        - 目录规范
            - src/app.ts 入口文件 主要进行业务路由定义
            - src/routes 存放业务路由实现
            - src/configs 存放css和菜单配置
            - src/components 存放公共业务组件
            - src/utils 存放公共工具方法
        - CI/CD流水线
            1. 针对特性分支/修复分支
            2. 当提交更新 或提交MR时 触发流水线
            3. 流水线人工确认是否云端构建发布
            - 确认：云端构建 发布ars和Buffet
            - 结束: 不进行云端构建
        - 地域切换
            - 后端的预发环境和现网环境在上海地域 体验在广州地域 体验中 资源的开通都是在上海中
        - 
            - 通过设置session的DEFAULT_TCB_REGION_ID 和DEFAULT_TCB_ZONE_ID等字段 可以实现切换地域 其中DEFAULT_TCB_REGION_ID上海对应4 广州对应1 DEFAULT_TCB_ZONE_ID上海对应200001 广州100001
            - 上述session标记 只针对低吗和计费的云API生效 除此之外 其他云API均将regionID设为4 因为其他资源是在上海
    - 请求调用链路
        - 腾讯云控制台中 无法直接调用云API后台 需要经过qcbase中间层 整体调用链路
        - 前端- qcbase中间层 云API后端
    4. 详细设计
        1. 源码模块设计
        2. 接口设计
            - 目前tcb的后端有两个大服务 分别是
            来源        维护人  是否遵循云API规范   前端封装的调用方法          涉及范围
            node中间层  guobin        否                  lcapRequest             数据源 应用等项目早期需求涉及的数据
            云API后台    子昂       是                  lowcodeCapiRequest          计费信息 底层资源等数据
        - node中间层逻辑会逐步迁移到云API后台
        - 除了低码业务后方API 控制台前端会调用其他遵循云API规范的服务方 如scf的InvokeFunction
    5. 存储设计 可用性/安全性设计
        - 无特殊的存储设计
        - 在腾讯云的大架构下 符合tea规范
- 控制台环境和部署相关
    1. 低码目前有四个环境 分别是测试 体验 预发 现网
    2. 接入层指tcb-lcap-service 目前部署在tkex 体验环境和语法环境 部署的项目是 现网环境部署的项目是
    - 后台
        - guobin部署的后台服务
    环境    控制台登录态    接入层代理  后台环境    数据库环境
    测试    测试环境        测试接入ip  测试        测试数据库 9.142.169.50 lc_dev
    体验    现网环境        体验接入ip  预发-广州       体验数据库 9.142.169.50 tcblacp
    预发    现网环境        预发接入ip  预发-上海       现网数据库
    现网    现网环境        现网接入ip  现网-上海       现网数据库
- 服务商三类
    1. 低码成为服务商
    2. TCB基础服务商
    3. 第三方服务商


- cms无感登录优化
    1. 现网 兼容问题
        1. 当前使用iframe内嵌的方式进行无感登录 存在浏览器兼容问题 现网主要集中在safari上
        2. 对于部分使用无感登录的用户来说 需要手动前往setting 手动设置跨越storage和cookies支持
    2. 优化方案
        1. 去掉iframe 使用token机制来登录
        2. 具体流程
            1. 调用cmsinfo接口 获取cms账密 如未安装 提示安装 轮训检测
            2. 使用账密 模拟js-sdk调用 换取refreshToken
            3. 携带refreshToken跳转至cms页面 cms直接登录

- cms架构设计
    1. 模块 
        - cms项目源码中主要包含了cms主体和短信营销相关代码
    - Node Service鉴权流程
        1. 校验是否为CMS用户
        2. 获取用户角色 校验角色
        3. 获取用的权限 校验权限
        4. 特定服务校验是否有访问资源的权限
- crm
    客户关系管理(Customer Relationship Management CRM)是一种管理企业现有及潜在客户之间关系和胡定的系统 通过对客户数据的历史积累和分析 crm可增进企业和客户之间的关系 从而最大化企业销售收入和提高客户留存率


- 配置whistle代理环境
    - 本地启动whistle之后 打开http://127.0.0.1:8899/ 按README.md提示输入代理规则 通常包括以下几种
    1. 本地代理 前端代理到tea启动的8323端口 后端代理到后台的预发环境
    2. 预发环境 前端代理到预发地址 后端代理到后台的预发环境 且通过野鹤生成的预览链接访问语法环境
    - 代理访问的路径
    - 正常访问腾讯云 - SwitchOmega代理到8899端口 - 访问whistle -根据匹配规则代转发到端口8322 tea编译后的本地文件

- 云控制台开发指南
    1. 
        - 控制台 console.cloud.tencent.com/tcb 
        - 修改host 代理连接服务器 使用debug模式切换region
    2. Qcbase BFF转发层
        - 测试转发机器
        - 预发转发机器
        - Qcbase服务有独立的预发 测试机器 Qcbase BFF转发层
    3. 云API
        - 测试环境
        - 预发环境
        - 现网
    4. TCB后台
        - 测试环境
        - TCB联调环境 Region成都    测试数据库
        - TCB测试环境 Region上海    测试数据库
        
        - 预发环境
        - TCB体验环境 Region广州    体验数据库
        - TCB预发环境 Region上海    现网数据库

        - 现网
        - Region 上海 TCB现网环境   现网数据库

- 组件
    - 组件是组成低码应用前端的基础单元 组件可对接数据源变量来变成动态逻辑组件 平台提供的源码组件具备跨多端能力 通过适配平台组件的协议(属性 事件等)可以替换平台的组件来实现自己的组件行为或风格 通过对源码组件的封装可以实现高阶的复合组件 同时用户也可以实现自己的自定义组件
    - 低码组件从机制上可分为源码组件和低码组件
        1. 源码组件 是指直接通过代码编写实现各平台的一类组件 源码组件是低码组件的原子结构
        2. 低码组件 是指由其他组件组装而成的组件 低码组件的运行平台取决于所直接或间接依赖的源码组件的平台兼容性

每个模块都有router文件用来集成模块下路由 然后统一放在appjs入口文件中
1. 使用Whistle步骤
    1. 
        ```
        npm i whistle -g 全局安装
        w2 start 启动服务
        w2 stop 停止服务
        ```
    2. chrome浏览器安装SwitchyOmega插件
    3. 配置代理
    - 插件菜单->选项->新建情景模式->...
    4. 启动服务
    - whistle默认端口是8899
    ```
    w2 start
    ```
    5. 安装证书
    - 访问127.0.0.1:8899进到配置界面 安装证书后电脑可以进行抓包
    6. 配置规则和结果
    - 在配置界面Rules中可以配置很多规则(代理的核心)
2. 匹配模式
    1. 基本匹配
    ```
    #匹配域名www.qq.com下所有请求
    www.qq.com operatorURI

    # 匹配域名www.qq.com下的所有http请求
    http://www.qq.com operatorURI

    # 匹配域名www.qq.com下的所有https请求
    https://www.qq.com operatorURI

    # 限定域名的端口号
    www.qq.com:8888 operatorURI # 8888端口

    #限定具体路径
    http://www.qq.com/xxx operatorURI

    # 精确匹配 ， 以$符号开头
    $http://www.qq.com/xxx operatorURI
    ```
    2. 正则匹配
    ```
     /http:\/\/(.*)/  log://
    ```
    3. 通配符匹配
    ```
    // 通配符匹配 以^开头(如果需要限制结束位置可以用$) *为通配符
    ^www.example.com/test/***   operatorURI

    # 通配域名匹配：
    # 匹配二级域名以 .com 结尾的所有url，如: test.com, abc.com，但不包含 *.xxx.com
    *.com   operatorURI
    //*.com  operatorURI


    # 通配路径匹配：
    # 对所有域名对应的路径 protocol://a.b.c/xxx[/yyy]都生效
    */  operatorURI
    */xxx  operatorURI
    ```
3. 代理协议
    1. file
    ```
    http://www.qq.com/pgg_act/  D:\dev\  
    ```
    - 将此路径的请求都代理到本地Dev目录下
    2. host
    ```
    10.241.11.111  www.qq.com
    ```
    - 将www.qq.com请求都代理到10.241.11.111上 实现在本地环境发测试环境请求
    3. 
4. 使用体会
    - Whistle是基于Node实现的阔平台web调试工具
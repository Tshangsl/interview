1. 匹配模式
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
2. 代理协议
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
3. 使用体会
    - Whistle是基于Node实现的阔平台web调试工具
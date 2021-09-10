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
// 通过createXHR()函数创建一个XHR对象
function createXHR(){
    if(window.XMLHttpRequest){
        // IE7+ FireFox Opera Chrome Safari
        return new XMLHttpRequest();
    }else if(window.ActiveXObject){
        // IE6及以下
        var versions = ['MSXML2.XMLHttp','Microsoft.XMLHTTP'];
        for(var i = 0;len=versions.length,i<len;i++){
            try{
                return new ActiveXObject(versions[i]);
                break;
            }catch(e){
                // 跳过
            }
        }
    }else{
        throw new Error('浏览器不支持XHR对象');
    }
}
// 封装AJAX 参数为一个对象
function ajax(obj){
    // 创建XHR对象
    var xhr = createXHR();
    // 通过使用JS随机字符串解决IE浏览器第二次默认获取缓存问题
    obj.url = obj.url+'?rand='+Math.random();
    // 通过params()将名值对转换成字符串 
    obj.data = params(obj.data);
    // 若是GET请求 则将数据加到url后面
    if(obj.method === 'get'){
        obj.url += obj.url.indexOf('?') == -1?'?'+obj.data:'&'+obj.data;
    }
    //true表示异步 false表示同步
    if(obj.async === true){
        // 使用异步调用时 需触发readystatechange事件
        xhr.onreadystatechange = function(){
            // 判断对象的状态是否交互完成
            if(xhr.readySstate == 4){
                // 回调
                callback();
            }
        }
    }
    // 使用xhr对象时 必须先调用open()方法
    // 它接收三个参数 请求类型get/post 请求的URL 表示是否异步
    xhr.open(obj.method,obj.url,obj.async);
    if(obj.method === 'post'){
        // post方式需要自己设置HTTP的请求头 模仿表单提交
        // 放在open方法之后 send方法之前
        xhr.setReuqestHeader('Content-Type','application/x-www-form-urlencoded');
        xhr.send(obj.data);//post方式将数据放在send()方法里
    }else{
        xhr.send(null);//get方式则填null
    }
    if(obj.async === false){
        // 同步
        callback();
    }
    function callback(){
        if(xhr.status == 200){
            // 判断HTTP的交互是否成功 200表示成功
            obj.success(xhr.responseText);//回调传递函数
        }else{
            alert('获取数据错误 错误代号:'+xhr.status+'错误信息:'+xhr.statusText);
        }
    }
}
// 名值对转换成字符串
function params(data){
    var arr = [];
    for(var i in data){
        //特殊字符传参产生的问题可以使用encodeURIComponent进行编码处理
        arr.push(encodeURIComponent(i)+'='+encodeURIComponent(data[i]));
    }
    return arr.join('&');
}

// 示例
var jr = document.getElementById('btn');
var pwd = document.getElementById('btn');

ajax({
    method:'post',
    url:'demo.php',
    data:{
        name:jr,
        pwd:pwd
    },
    success:function(message){
        alert(message);
    },
    async:true
})


// AJAX
/*
0 未初始化  还没有调用send()方法
1 载入      已调用send()方法 正在发送请求
2 载入完成  send()方法执行完成 已经接收到全部响应内容
3 交互      正在解析响应内容
4 完成      响应内容解析完成 可以在客户端调用
*/

const getJson = (url)=>{
    return new Promise((resolve,reject)=>{
        const xhr = new XMLHttpRequest();
        xhr.open('GET',url,false);
        xhr.setRequestHeader('Accept','application/json');
        xhr.onreadystatechange = function(){
            if(xhr.readyState !=4) return
            if(xhr.status === 200 || xhr.status === 304){
                resolve(xhr.responseText);
            }else{
                reject(xhr.responseText);
            }
        }
        xhr.send();
    })
}
/*
错误码设计：
第1位：定义错误提示等级
1：给用户的普通提示
2：给前端开发人员的提示
3.给用户的隐藏卖萌提示
第2-4位 具体的错误编码

*/
// 1.创建XMLHttpRequest对象
var xmlhttp;
if (window.XMLHttpRequest) {
    // code for IE7+, Firefox, Chrome, Opera, Safari
    xmlhttp = new XMLHttpRequest();
} else {
    // code for IE5 IE6
    xmlhttp = new ActiveXObject('Microsoft.XMLHTTP');
}
// 2.发送请求 (get ,post)
// get 
var baseUrl = 'http://www.qingmengtech.com:8085/';
xmlhttp.open('GET', baseUrl + '/interviewer/guidance?pageNum=' + 1 + '&pageSize=' + 5, true);
xmlhttp.secnd();

// post


















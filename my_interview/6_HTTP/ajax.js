/*
错误码设计：
第1位：定义错误提示等级
1：给用户的普通提示
2：给前端开发人员的提示
3.给用户的隐藏卖萌提示
第2-4位 具体的错误编码

常见状态码错误	
200	|	操作成功	|
301     永久重定向
302     临时重定向
304     缓存
400	|	参数校验失败	|
401 |	未登录或token已过期	|
402	|	用户已禁用	|
403	|	禁止用户访问	|
404	|	用户名或密码错误	|
500	|	服务器端发生错误	|
*/
// 1.创建XMLHttpRequest对象
var xmlhttp;
if(window.XMLHttpRequest){
    // code for IE7+, Firefox, Chrome, Opera, Safari
    xmlhttp = new XMLHttpRequest();
}else{
    // code for IE5 IE6
    xmlhttp = new ActiveXObject('Microsoft.XMLHTTP');
}
// 2.发送请求 (get ,post)
// get 
var baseUrl = 'http://www.qingmengtech.com:8085/';
xmlhttp.open('GET',baseUrl+'/interviewer/guidance?pageNum='+1+'&pageSize='+5,true);
xmlhttp.secnd();

// post

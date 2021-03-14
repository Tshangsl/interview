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
// 1. 获取url参数
function getUrlParam(sUrl, sKey) {
    // 取出每个参数的键值对放入数组
    let paramArr = sUrl.split('?')[1].split('#')[0].split('&');   
    const obj = {};
    paramArr.forEach(element=>{
        // 取出数组中每一项的键和值
        const [key,value] = element.split('=');
        if(key in obj){
            obj[key] = [].concat(obj[key],value);
        }else{
            obj[key] = value;
        }
    })
    return sKey?obj[sKey]||"":obj
}
// 2. 二进制转换
function valueAtBit(num, bit) {
    let Num2Str = num.toString(2)
    return Num2Str[Num2Str.length-bit]
}
function valueAtBit(num, bit) {
    return (num>>(bit-1))&1;
}
// 3. 修改this指向
function bindThis(f, oTarget) {
    return function(){
        return f.apply(oTarget,arguments);
    }
}
function bindThis(f,oTarget){
    return function(){
        return f.call(oTarget,...arguments);
    }
}
function bindThis(f,oTarget){
    return f.bind(oTarget);
}
// 4. dom节点查找
// 查找两个节点的最近的一个共同父节点 可以包含节点自身
function commonParentNode(oNode1, oNode2) {
    let p1 = oNode1.parentNode;
    let p2 = oNode2.parentNode;
    if(p1 === p2){
        return p1;
    }else{
        commonParentNode(p1,p2);
    }
}
// 5. 根据包名在指定空间中创建对象
// 6. 数组去重
Array.prototype.uniq = function () {
    return Array.from(new Set(this));   
}
// 7. 斐波那契数列
function fibonacci(n){
    if(n<=2){
        return 1
    }else{
        return fibonacci(n-1)+fibonacci(n-2);
    }
}
// 8. 时间格式化输出
function formatDate(date,format){
    let addZero = function(data){
        if(data <10){
            return '0'+data
        }
        return data;
    }
    let obj = {
        'yyyy':date.getFullYear(),
        'yy':date.getFullYear()%100,
        'MM':addZero(date.getMonth()+1),
        'M': date.getMonth() + 1,
        'dd': addZero(date.getDate()),
        'd': date.getDate(),
        'HH': addZero(date.getHours()),
        'H': date.getHours(),
        'hh': addZero(date.getHours() % 12),
        'h': date.getHours() % 12,
        'mm': addZero(date.getMinutes()),
        'm': date.getMinutes(),
        'ss': addZero(date.getSeconds()),
        's': date.getSeconds(),
        'w': function () {
            arr = ['日', '一', '二', '三', '四', '五', '六']
            return arr[date.getDay()]
        }()
    }
    for (let i in obj) {
        format = format.replace(i, obj[i])
    }
    return format
}
// 9. 获取字符串长度
function strLength(s, bUnicode255For1) {
    let length = s.length;
    if(!bUnicode255For1){
        for(let i in s){
            if(s.charCodeAt(i)>255){
                length++;
            }
        }
    }
    return length;
}
//10. 邮箱字符串判断
function isAvailableEmail(sEmail) {
    var reg = /^[0-9a-zA-Z_.]{1,}@[a-zA-Z0-9_.]{1,}[a-zA-Z0-9]{2,4}$/;     // 正解
    return reg.test(sEmail);
}
// 11. 颜色字符串转换
// 定义一个新的rgb函数 然后用eval执行字符串
function rgb2hex(sRGB) {
    if (!/^rgb\((\d{1,3},\s*){2}\d{1,3}\)$/.test(sRGB)) return sRGB;
    let  color = '#';
    sRGB.replace(/\d+/g, n => color += ('0' + (+n).toString(16)).slice(-2));
    return color;
}
// 12. 将字符串转换为驼峰格式
function cssStyle2DomStyle(sName) {
    let res = [];
    let arr = sName.split('-');
    arr.map((item,index)=>{
        console.log(index,item);
        item = item.substring(0,1).toUpperCase()+item.substring(1);
        res.push(item);
    })    
    return res.join('').substring(0,1).toLowerCase()+res.join('').substring(1);
}
// 13. 字符串字符统计
function count(str) {
    str = str.replace(/\s*/g,"");
    let arr = str.split("");
    let obj = {};
    arr.map((item,index)=>{
      if(item in obj){
          obj[item]++;
      }else{
          obj[item] = 1;
      }
    })
    return obj
}
// 14. 加粗文字
(function(w,d){
    let p = document.querySelector('p')
    p.innerHTML = `<strong>牛客网</strong>${p.innerText.replace(/牛客网/, '')}`
})(window,document)
// 15. reduce详解
// arr.reduce(callback,[initialValue]) callback- prev cur index arr
// 如果没有提供initialValue reduce会从索引1的地方开始执行callback方法 跳过第一个索引 如果提供initialValue从索引0开始
// 1. 数组求和求乘积
let arr = [1,2,3,4];
let sum = arr.reduce((prev,item,index,arr)=>{
    return prev+item;
},0)
console.log(sum);
// 2. 计算数组中每个元素出现的次数
let nums = [1,2,3,4,5,6,5];
let numsNum = nums.reduce((ini,item)=>{
    if(item in ini){
        ini[item]++;
    }else{
        ini[item] = 1;
    }
    return ini;
},{})
console.log(numsNum);
// 3. 数组去重
let nums = [1,2,2,3,1,2,3];
let newArr = nums.reduce((prev,item)=>{
    if(!prev.includes(item)){
        return prev.concat(item);
    }else{
        return prev;
    }
},[])
console.log(newArr);
// 4. 二维数组转化成一维数组
let arr = [[0,1],[2,3],[4,5]];
let newArr = arr.reduce((prev,cur)=>{
    return prev.concat(cur);
},[])
console.log(newArr);
// 5. 对象中属性求和
let res = [
    {
        name:'lisi',
        age:23
    },
    {
        name:'lisi',
        age:33
    },
]
let sum = res.reduce((prev,item)=>{
    return prev+item.age;
},0)
console.log(sum);
// 6. 查找重复的元素
function duplicates(arr) {
    let res = [];
    arr.forEach((elem)=>{
        if(arr.indexOf(elem)!==arr.lastIndexOf(elem)&&res.indexOf(elem===-1)){
            res.push(elem);
        }
    })
    return res;
}
// 7. 使用闭包
// 实现函数makeClosures 调用之后满足如下条件
// 1. 返回一个函数数组result 长度与arr相同
// 2. 运行result中第i个函数 即result[i]()结果与fn(arr[i])相同
function makeClosures(arr,fn){
    let res = [];
    for(let i = 0;i<arr.length;i++){
        res[i] = fn.bind(this,arr[i]);
    }
    return res;
}
// 8. 找出对象obj不在原型链上的属性
// 1. 返回数组 格式为key:value
// 2. 结果数组不要求顺序
function iterate(obj) {
    let arr = [];
    Object.keys(obj).forEach(key=>{
        arr.push(key+": "+obj[key])
    })
    return arr;
}
// 9. 检查重复字符串
function contains(str){
    const reg = /([a-z])\1/gi
    return reg.test(str);
}
//10. 
function isUSD(str) {
    let reg = /^\$\d{1,3}(,\d{3})*(\.\d{2})*$/;
    if(reg.test(str)){
        return true;
    }
    return false;
}
function get(obj,){
    if(!obj){
        return
    }
    let len = obj.length;
    // obj作为第一个参数传入 
    // 首先判断obj是否为空
    // 为空直接返回
    // 如果不为空 对obj内部数据类型进行判断
}
const obj = {
    selector:{
        to:{toutiao:'FE coder'},
        target:[1,2,{name:'byted'}]
    }
}
// 运行代码
get(obj,'selector to toutiao','target[0]','target[2].name')
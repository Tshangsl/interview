/**
 set
    类数组没有数组的方法 不允许成员重复
    方法:
        1.add有返回值 返回操作后的set
        2.delete
        3.has
    属性:
        1.size
    索引和value都是一样的
        for (let [index, value] of s1.entries()) {
            console.log(index, value);
        }
 WeakSet
        只能以对象作为成员
        let w1 = new WeakSet();
 */
/*
 map
    方法：
        1.set
        2.get
    属性：
        1.size
 WeakMap：只能用对象作为key
*/
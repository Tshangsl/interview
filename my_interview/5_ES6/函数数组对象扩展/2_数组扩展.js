/*
数组的扩展
        1.创建数组的方式
            let arr1 = [1, 2, 3];
            let arr2 = new Array(5, 5, 4, 3, 1);
            let arr3 = new Array(5);
        2.类数组=>数组
            Array.from(aLi)
            copyWithin
        3.将一组值转换成数组
            Array.of(2, 4, 6)
        4.数组的遍历
             4.1 for ...of
             4.2 values()
             4.3 keys()
             4.4 entries()
             4.5 foreach 只是循环数组，不会改变原数组
             4.6 list.forEach(function(value, index, arr) {
                    value += 1;
                })
             4.7 map  有返回值
             4.8 filter
*/
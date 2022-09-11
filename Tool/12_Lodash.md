### Lodash
> 定义
- 一个一致性 模块化 高性能的JS实用工具库
> 作用
- Lodash通过降低array number objects string等等的使用难度而让JS变得更简单 
- Lodash的模块化方法非常适用于
1. 遍历array object 和string
2. 对值进行操作和检测
3. 创建符合功能的函数
### _.chunk(array,[size=1])
- 将数组拆分为多个size长度的区块 并将这些区块组成一个新数组 如果array无法被分割成全部等长的区块 那么最后剩余的元素将组成一个区块
- 返回一个包含拆分区块的新数组(想当于一个二维数组)
### _.compact(array)
- 创建一个新数组 包含原数组中所有的非假值元素 例如false null 0 “” undefined和NaN都是被认为是假值
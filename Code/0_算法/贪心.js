// 跳跃游戏
/*
贪心的本质是选择每一阶段的局部最优 从而达到全局最优
*/
//贪心算法局部最优解 每次取最大跳跃步数(取最大覆盖范围)
// 整体最优解 最后得到整体最大覆盖范围 看是否能到终点
var canJump = function(nums) {
    if(nums.length === 1) return true
    let cover = 0
    for(let i = 0; i <= cover; i++) {
        cover = Math.max(cover, i + nums[i])
        if(cover >= nums.length - 1) {
            return true
        }
    }
    return false
};
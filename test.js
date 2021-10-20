function getCurrentWeek(year,month,date){
    // 1 3 5 7 8 10 12 为31天
    //  闰年2月29天 平年二月28天
    // 4 6 9 11 30天
    let week = 0;
    let num = 0;
    function getTotalDay(){
        switch(month){
            case 11:num+=30;
            case 10:num+=31;
            case 9:num+=30;
            case 8:num+=31;
            case 7:num+=31;
            case 6:num+=30;
            case 5:num+=31;
            case 4:num+=30;
            case 3:num+=31;
            case 2:{
                if(isRunNian(year)){
                    num+=29;
                }else{
                    num+=28;
                }
            }
            case 1:num+=31;
        }
    }
    getTotalDay();
    num += date;
    week = Math.floor(num/7);
    // if(num%7!==0){
    //     week =  Math.floor(num/7)+1;   
    // }else{
    //     week = num/7;
    // }
    return week-3;
}
function isRunNian(year){
    if((year %4==0 &&year%100!=0)||year%400==0){
        return true;
    }
    return false;
}

console.log(getCurrentWeek(2020,10,1));
console.log(getCurrentWeek(2021,10,8));
console.log(getCurrentWeek(2021,10,11));
console.log(getCurrentWeek(2021,10,19));
console.log(31+28+31+30+31+30+31+31+30);
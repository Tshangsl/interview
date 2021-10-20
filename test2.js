let o1 = {a:[1]};
let o2 = {a:[2]};
const combineObj = function(o1,o2){
    for(key in o2){
        // console.log(key);
        if(o1.hasOwnProperty(key)!==true){
            o1[key] = o2[key]
        }else{
            if(typeof(o1[key]) !== Array){
                let temp = o1[key];
                o1[key] = [];
                o1[key].push(temp);
                o1[key].push(o2[key]);
                o1[key] = o1[key].flatten(Infinity);
            }else{
                o1[key].push(...o2[key]);
            }
        }
    }
    return o1;
}
console.log(combineObj(o1,o2));
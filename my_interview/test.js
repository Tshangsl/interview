console.log('111');
function cssStyle2DomStyle(sName) {
    let arr = sName.split('-');
    arr.map((item,index)=>{
        item = item.splice(0,1).toUpperCase+item.splice(1);
    })    
    return arr.join('');
}
console.log(cssStyle2DomStyle('font-size'));
console.log('111');
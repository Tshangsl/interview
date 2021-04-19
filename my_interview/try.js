var name = 'W';
(function(){
    if(typeof name === 'undefined'){
        var name = 'J';
        console.log('GOO'+name);
    }else{
        console.log('Hello'+name);
    }
})()
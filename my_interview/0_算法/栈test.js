const MinStack = function(){
    this.stack = [];
}
MinStack.prototype.push = function(x){
    this.stack.push(x);
}
MinStack.prototype.pop = function(){
    this.stack.pop();
}
MinStack.prototype.top = function(){
    if(!this.stack||!this.stack.length){
        return
    }
    return this.stack[this.stack.length-1];
}

MinStack.prototype.minValue = function(){
    let minStack = Infinity;
    const {stack} = this;
    for(let i = 0;i<stack.length;i++){
        if(stack[i]<minStack){
            minStack = stack[i];
        }
    }   
    return minStack;
}
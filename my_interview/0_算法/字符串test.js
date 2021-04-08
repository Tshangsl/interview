const WordDictionary = function() {
    this.words={}
}
WordDictionary.prototype.addWord = function(word){
    if(!this.words[word.length]){
        this.words[word.length] = [word];
    }else{
        this.words[word.length].push(word);
    }
}
WordDictionary.prototype.search = function(word){
    if(!this.words[word.length]){
        return false;
    }
    const len = word.length;
    if(!word.includes('.')){
        return this.words[len].includes(word)
    }
    // 正则表达式 要先创建正则表达式对象
    const reg = new RegExp(word);
    // 只要数组中有一个匹配的就进行返回
    return  this.words[len].some(item=>{
        return reg.test(item);
    })
}

let w1 = new WordDictionary();
w1.addWord('hello');
w1.addWord('world');
console.log(w1.search('hel..'));
console.log(w1.search('world'));
function captureThreeNumbers(str) {
    let reg = /[0-9]{3}/;
    let num = str.match(reg);
    
}
console.log(captureThreeNumbers('9876543'));
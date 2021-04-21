function Sub() {
    console.log(this);
}
Sub();
const [a,...b]=[1,2,3,4];
const [c,...d]=[1];
console.log(a);
console.log(b);
console.log(c);
console.log(d);
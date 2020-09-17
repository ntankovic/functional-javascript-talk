let inc = (x) => x + 1;
let state = 0;

let _0 = (f) => (x) => x;
let _1 = (f) => (x) => f(x);
// ...

let plus = (m) => (n) => (f) => (x) => m(f)(n(f)(x));
// let mul = (m) => (n) => (f) => (x) => m(n(f))(x);
let mul = (m) => (n) => (f) => m(n(f));
// let pow = (m) => (n) => (f) => (x) => m(n)(f)(x);
let pow = (m) => (n) => m(n);

let _2 = plus(_1)(_1);
let _4 = plus(_2)(_2);
let _8 = plus(_4)(_4);
let _64 = mul(_8)(_8);
let _16 = pow(_2)(_4);

console.log(_8(inc)(state));
console.log(_64(inc)(state));
console.log(_16(inc)(state));

console.log(_4(_4)(inc)(state));

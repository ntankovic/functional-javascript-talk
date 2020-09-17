const { deflate } = require('zlib');

let delay = (t) => (x) =>
    new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(x);
        }, t * 1000);
    });

let log = (msg) => (x) => {
    console.log(msg, ': ', x);
    return x;
};

// lets define a chain function
let chain = (...fns) => (x) => {
    fns.reduce((prev, cur) => prev.then(cur), Promise.resolve(x));
};

let w = chain(
    log('The answer for x'), //
    delay(1), //
    log('Wait for it...'), //
    delay(2), //
    (x) => x + 1, //
    log('The answer is')
);

w(42);

// an existing old-school function
fabc = (a, b, c) => a + b + c;

// we cannot do it like this (LEXICAL SCOPING)
let fabc_new = (a) => (b) => (c) => fabc();
fabc_new(1)(2)(3); //?

let fabc2 = (a) => (b) => (c) => a + b + c;

fabc2(1)(2)(3); //?

// currying: make f(a, b, c) callable as f(a)(b)(c)
// use me to curry any function!

let curry = (fn) => {
    let curried = (...args) => {
        if (args.length >= fn.length) {
            // we have the arguments, return result!
            return fn.apply(null, args);
        } else {
            // we have "some" arguments, return a new function that will capture the rest!
            return (...args2) => curried(...args.concat(args2));
        }
    };

    return curried;
};

fabc_ = curry(fabc);

fabc_(1, 2, 3); //?
fabc_(1)(2)(3); //?
fabc_(1, 2)(3); //?
fabc_(1)(2, 3); //?

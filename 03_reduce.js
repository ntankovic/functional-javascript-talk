let input = ['abc', 'd', 'e', 'fghi'];
let fn = (x) => x.length;

fn('abc'); //?

let result = 0;
for (let x of input) {
    console.log(x);
    let y = fn(x); // transformation, "doing something"
    result = result + y; // accumulation
    console.log(result);
}

console.log(result);

// not lets make this pattern shorter with "reduce"

let output_2 = input.reduce((result, x) => fn(x) + result, 0);
console.log(output_2);

let input = ['abc', 'd', 'e', 'fghi'];
let fn = (x) => x.length;

fn('abc'); //?

let output = [];
for (let x of input) {
    console.log(x);
    let y = fn(x); // transformation, "doing something"
    output.push(y);
}

console.log(output);

// not lets make this pattern shorter with "map"
input.map(fn); //?

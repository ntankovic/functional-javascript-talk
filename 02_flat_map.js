let input = ['a,b', 'cd', 'e,f', 'gh,i'];
let fn = (x) => x.split(',');

fn('a,b'); //?
fn(''); //?

let output = [];
for (let x of input) {
    console.log(x);
    let y = fn(x); // transformation
    console.log(y);
    // output.push(y);
    output = output.concat(y);
}

console.log(output);

// not lets make this pattern shorter with "flat map"
input.flatMap(fn); //?

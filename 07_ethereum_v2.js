const fetch = require('node-fetch');
const { objOf } = require('ramda');

// util function
function roundTo(n, digits) {
    let negative = false;
    if (digits === undefined) {
        digits = 0;
    }
    if (n < 0) {
        negative = true;
        n = n * -1;
    }
    let multiplicator = Math.pow(10, digits);
    n = parseFloat((n * multiplicator).toFixed(11));
    n = (Math.round(n) / multiplicator).toFixed(digits);
    if (negative) {
        n = (n * -1).toFixed(digits);
    }
    return n;
}

let round = (d) => (x) => roundTo(x, d);

let api_call = (base) => (query) => (endpoint) => `${base}/${endpoint}?${query}`;
let price_url = (first) => (second) =>
    api_call(`http://localhost:9000/price?fsym=ETH&tsyms=USD'`)(`fsym=${first}&tsyms=${second}`)('data/price');
let eth_call = api_call('http://localhost:9000')('token=65975fb6e4304d17a684a5f7cb1c9634');
let tx_call = (id) => eth_call(`txs/${id}`);
let block_call = (block) => eth_call(`blocks/${block}`);

let fetch_json = (url) =>
    fetch(url)
        .then((data) => data.json())
        .catch((e) => {
            console.log(e);
        });

let chain = (...fns) => (x) => fns.reduce((flast, fcur) => flast.then(fcur), Promise.resolve(x));
let log = (message) => (x) => {
    console.log(`${message}:`, x);
    return x;
};
let filter = (n) => (l) => l.filter((_, i) => i < n);
let map = (fn) => (l) => l.map(fn);
let fmap = (fn) => (l) => l.flatMap(fn);
let reduce = (fn) => (start) => (l) => l.reduce(fn, start);
let parallel = (...fn) => Promise.all(fn.map((f) => f()));
let prop = (p) => (o) => o[p];

get_eth_volume = chain(
    () => eth_call('info'), // url
    fetch_json, // object
    prop('height'), //
    (x) => x - 1,
    log('height is'), // number
    block_call, //url
    fetch_json,
    (data) => (data.txids ? data.txids : []),
    filter(5), // list > filtered list ..... []
    map(tx_call),
    log('url'),
    map(fetch_json),
    (l) => Promise.all(l), // [ {}, {}, {}, ]
    fmap((tx) => tx.outputs), // [ o1, o2, o3, ]
    map(prop('value')),
    reduce((prev, cur) => prev + cur / 1e18)(0)
);

get_price = chain(
    () => price_url('ETH')('USD'),
    fetch_json,
    (data) => data.USD
);

get_volume = chain(
    () => parallel(get_eth_volume, get_price),
    ([a, b]) => a * b,
    round(2),
    (x) => `$${x}`,
    log('Total ETH volume in USD for last 2 minutes')
);

get_volume();

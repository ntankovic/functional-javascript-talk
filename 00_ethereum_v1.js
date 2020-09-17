const fetch = require('node-fetch');

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

let txs = [];
fetch(`http://localhost:9000/info?token=65975fb6e4304d17a684a5f7cb1c9634`)
    .then((response) => {
        response
            .json()
            .then((data) => {
                fetch(`http://localhost:9000/blocks/${data.height - 1}?token=65975fb6e4304d17a684a5f7cb1c9634`).then(
                    (response) => {
                        response
                            .json()
                            .then((data) => {
                                let tx_urls = [];

                                if (data.txids) {
                                    let counter = 0;
                                    for (let tx_id of data.txids) {
                                        if (counter >= 5) {
                                            break;
                                        }
                                        counter++;
                                        let tx_url = `http://localhost:9000/txs/${tx_id}?token=65975fb6e4304d17a684a5f7cb1c9634`;
                                        tx_urls.push(tx_url);
                                    }
                                } else {
                                    finish(0);
                                }

                                another_counter = 0;
                                for (let tx_url of tx_urls) {
                                    fetch(tx_url).then((response) => {
                                        response.json().then((data) => {
                                            txs.push(data);
                                            another_counter++;
                                            if (another_counter >= tx_urls.length) {
                                                determine_volume(txs);
                                            }
                                        });
                                    });
                                }
                            })
                            .catch((e) => {
                                console.log('There was an error', e);
                            });
                    }
                );
            })
            .catch((e) => {
                console.log('There was an error', e);
            });
    })
    .catch((e) => {
        console.log('There was an error', e);
        finish(null);
    });

let volume = 0; // wei
let determine_volume = (txs) => {
    for (tx of txs) {
        if (tx.outputs) {
            for (o of tx.outputs) {
                volume += o.value / 1e18;
            }
        }
    }
    fetch('http://localhost:9000/price?fsym=ETH&tsyms=USD').then((response) => {
        response.json().then((data) => {
            finish(volume * data.USD);
        });
    });
};

let finish = (volume) => {
    console.log('Total ETH volume in USD for last 2 minutes: $' + roundTo(volume, 2));
};

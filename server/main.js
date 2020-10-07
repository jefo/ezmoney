const express = require('express');
const Binance = require('node-binance-api')
const cors = require('cors');
const { BehaviorSubject } = require('rxjs');
const uniqueId = require('lodash.uniqueid');
const OrdersRepository = require('./OrdersRepository');
const { id } = require('date-fns/locale');

const app = express();
const binance = new Binance().options({
    APIKEY: 'Coq8bgVLtdYb50m54yi030kkyTLoJL00uUlzwjqy3bJG6qEQj20AEOW4xadWD2Wx',
    APISECRET: 'dV1wMfMZBv8naMszKmtGoWxHynIWS2Jbg3Vak0DSpmCwI0jjgcCAS30Lu5oi5bvP',
});

app.use(express.json());
app.use(cors());

const rubToBtc = (val = 0, btcPrice) => Math.round(1e8 * val * (1 / btcPrice)) / 1e8;
const btcToRub = (val = 0, btcPrice) => val > 0 ? Math.round(btcPrice / (1 / val)) : 0;

let currentBtcPrice$ = new BehaviorSubject(0);

const updateBtcPrice = () => {
    binance.prices('BTCRUB', (err, ticker) => {
        if (!err) {
            currentBtcPrice$.next(Number(ticker.BTCRUB));
        }
    });
};

updateBtcPrice();

setInterval(() => {
    updateBtcPrice();
}, 60000 * 10);

app.get('/price', async (req, res) => {
    let calcPrice;
    if (!req.query.currency) {
        res.json(0);
    }
    const currency = req.query.currency.toLowerCase();
    switch (currency) {
        case 'rub':
            calcPrice = rubToBtc;
            break;
        case 'btc':
            calcPrice = btcToRub;
            break;
        default:
            calcPrice = val => val;
    }
    const currentPrice = currentBtcPrice$.getValue();
    const price = calcPrice(req.query[currency], currentPrice);
    const fee = req.query.rub * 2.5 / 100;
    res.json({
        price,
        fee,
        currentPrice: currentPrice,
    });
});

const orders = new OrdersRepository();
app.post('/processing', (req, res) => {
    const order = {
        publicId: uniqueId(),
        btc: req.body.btc,
        rub: req.body.rub,
        rate: req.body.rate,
        address: req.body.address,
    };
    const created = { ...orders.create(order) };
    delete created.id;
    res.json(created);
});

app.listen(8080);

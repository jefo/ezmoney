import express from 'express';
import Binance from 'node-binance-api';

const app = express();
const binance = new Binance().options({
    APIKEY: 'Coq8bgVLtdYb50m54yi030kkyTLoJL00uUlzwjqy3bJG6qEQj20AEOW4xadWD2Wx',
    APISECRET: 'dV1wMfMZBv8naMszKmtGoWxHynIWS2Jbg3Vak0DSpmCwI0jjgcCAS30Lu5oi5bvP',
});

app.use(express.json());

const rubToBtc = (val = 0, btcPrice) => Math.round(1e8 * val * (1 / btcPrice)) / 1e8;
const btcToRub = (val = 0, btcPrice) => val > 0 ? Math.round(1e3 * btcPrice / (1 / val)) / 1e3 : 0;

app.get('/price', (req, res) => {
    let calcPrice;
    switch (req.query.currency.toLowerCase()) {
        case 'rub':
            calcPrice = rubToBtc;
            break;
        case 'btc':
            calcPrice = btcToRub;
            break;
        default:
            calcPrice = val => val;
    }
    binance.prices('BTCRUB', (resp, ticker) => {
        if (resp) {
            res.sendStatus(500);
        } else {
            const price = calcPrice(req.query.value, ticker.BTCRUB)
            res.json(price);
        }
    });
});

app.listen(3000);

import express from 'express';
import Binance from 'node-binance-api';

const app = express();
const binance = new Binance().options({
    APIKEY: 'Coq8bgVLtdYb50m54yi030kkyTLoJL00uUlzwjqy3bJG6qEQj20AEOW4xadWD2Wx',
    APISECRET: 'dV1wMfMZBv8naMszKmtGoWxHynIWS2Jbg3Vak0DSpmCwI0jjgcCAS30Lu5oi5bvP',
});

app.use(express.json());

const rubToBtc = (val = 0, btcPrice) => {
    return Math.round(1e8 * val * (1 / btcPrice)) / 1e8;
};

app.get('/btc/price', (req, res) => {
    binance.prices('BTCRUB', (resp, ticker) => {
        if (resp) {
            res.sendStatus(500);
        } else {
            res.json(rubToBtc(req.query.amount  , ticker.BTCRUB));
        }
    });
});

app.get('/qiwi/price', (req, res) => {
    binance.prices('BTCRUB', (resp, ticker) => {
        if (resp) {
            res.sendStatus(500);
        } else {
            res.json(rubToBtc(req.query.amount  , ticker.BTCRUB));
        }
    });
});

app.listen(3000);

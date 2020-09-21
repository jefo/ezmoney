import QuwiMonitor from './QiwiMonitor';
import Mailer from './Mailer';

const monitor = new QuwiMonitor();
const mailer = new Mailer({
    sender: 'payments@moicrypto.com',
    receiver: 'operator@moicrypto.com',
});

monitor.start();

monitor.on('ORDER_CRETE', (order = {}) => {
    const { id, price } = order;
    // TODO: send email ORDER CREATED (price, timestamp, comment)
    mailer.send({
        subject: `Order #${id}`,
        html: `
            <p>ID: ${id}</p>,
            <p>PRICE: ${price}</p>,
            <p>STATUS: CREATED</p>,
        `,
    });
});

monitor.on('PAYMENT_RECEIVE', (order = {}) => {
    const { id, price } = order;
    // TODO: send email PAYMENT_RECEIVE (price, timestamp, payment_comment)
    mailer.send({
        subject: `Order #${id}`,
        html: `
            <p>ID: ${id}</p>,
            <p>PRICE: ${price}</p>,
            <p>STATUS: PAYED</p>,
        `,
    });
});

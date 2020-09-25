import QuwiMonitor from './QiwiMonitor.js';
import Mailer from './Mailer.js';

export default class MonitoringService {
    constructor() {

        this.monitor = new QuwiMonitor();
        const mailer = new Mailer({
            sender: 'payments@moicrypto.com',
            receiver: 'operator@moicrypto.com',
        });

        this.monitor.on('PAYMENT_RECEIVE', (transactions = []) => {
            transactions.forEach(t => {
                const { txnId, account, comment, sum, total } = order;
                mailer.send({
                    subject: `Transaction #${txnId}`,
                    html: `
                <p>ID: ${txnId}</p>,
                <p>account: ${account}</p>,
                <p>sum.amount: ${sum.amount}</p>,
                <p>total.amount: ${total.amount}</p>,
                <p>comment: ${comment}</p>,
                <p>status: SUCCESS</p>,
            `,
                });
            });
        });
    }

    start() {
        monitor.start();
    }
}
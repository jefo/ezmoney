import axios from 'axios';
import EventEmitter from 'eventemitter3';

export default class QiwiMonitor extends EventEmitter {
    constructor() {
        super();
        this.inProgress = false;
        this.checkedTransactions = [];
    }

    start() {
        this.interval = setInterval(() => {
            this.check();
        }, 10000);
    }

    async check() {
        try {
            console.log('checking...');
            this.inProgress = true;
            const { data } = await axios.get('https://edge.qiwi.com/payment-history/v2/persons/79175169925/payments?rows=50&operation=IN', {
                headers: {
                    Authorization: `Bearer ccda664ba8224575ccb6ab7ac06d2da6`,
                }
            });
            const transactions = data.data.filter(
                t => t.status === 'SUCCESS'
                && !this.checkedTransactions.includes(t.txnId)
            );
            // todo: write to db
            this.checkedTransactions.push(...transactions.map(t => t.txnId));
            this.inProgress = false;
            if (transactions.length > 0) {
                this.emit('PAYMENT_RECEIVE', transactions);
            }
            console.log(`check done, we received ${transactions.length} new transactions`, );
            console.log('------------------------------------');
        }
        catch (e) {
            console.log('-----------CHECK ERROR:')
            console.error(e.response);
        }
    }

    stop() {
        clearInterval(this.interval);
    }
}

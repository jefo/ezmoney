const { v4: uuid } = require('uuid');

class OrdersRepository {
    constructor() {
        this._orders = new Map();
    }

    create(order) {
        const orderCopy = {
            id: uuid(),
            createAt: new Date(),
            updateAt: new Date(),
            ...order,
        };
        this._orders.set(orderCopy.id, order);
        return orderCopy;
    }
}

module.exports = OrdersRepository;
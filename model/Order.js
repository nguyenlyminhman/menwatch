const queryDB = require('../utils/DatabaseConnection');

class Order {
    constructor(idbill, idCustomer, idPayment, orderdate, deliverydate, total, orderphone, orderaddress) {
        this.id = id;
        this.idCustomer = idCustomer;
        this.idPayment = idPayment;
        this.orderdate = orderdate;
        this.deliverydate = deliverydate;
        this.total = total;
        this.orderphone = orderphone;
        this.orderaddress = orderaddress;
    }

    addNewOrder() {
        const sql = 'INSERT INTO public.Order(id, idCustomer, idPayment, orderdate, deliverydate, total, orderphone, orderaddress)' +
            'VALUES ($1, $2, $3, $4, $5, $6, $7, $8);'
        return queryDB(sql, [this.id, this.idCustomer, this.idPayment, this.orderdate, this.deliverydate, this.total, this.orderphone, this.orderaddress]);
    }

    getOrderById() {
        const sql = 'SELECT *	FROM public."Order" where id=$1'
        return queryDB(sql, [this.id])
            .then(results => results.rows);
    }

    getOrderInfoByCustomerId() {
        const sql = 'SELECT *	FROM public."Order" where idCustomer=$1'
        return queryDB(sql, [this.idCustomer])
            .then(results => results.rows);
    }
}

module.exports = Order;

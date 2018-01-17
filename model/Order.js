const queryDB = require('../utils/DatabaseConnection');

class Order {
    constructor(idbill, idCustomer, idPayment, orderdate, receivedate, total, orderphone, orderaddress, ordername) {
        this.id = id;
        this.idCustomer = idCustomer;
        this.idPayment = idPayment;
        this.orderdate = orderdate;
        this.receivedate = receivedate;
        this.total = total;
        this.orderphone = orderphone;
        this.orderaddress = orderaddress;
        this.ordername = ordername;
    }

    addNewOrder() {
        const sql = 'INSERT INTO public.Order(id, idCustomer, idPayment, orderdate, receivedate, total, orderphone, orderaddress)' +
            'VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9);'
        return queryDB(sql, [this.id, this.idCustomer, this.idPayment, this.orderdate, this.receivedate, this.total, this.orderphone, this.orderaddress, this.ordername]);
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

const queryDB = require('../utils/DatabaseConnection');

class Order {
    constructor(id, idCustomer, orderdate, receivedate, total, orderphone, orderaddress, payment, status, receiver) {
        this.id = id;
        this.idCustomer = idCustomer;
        this.orderdate = orderdate;
        this.receivedate = receivedate;
        this.total = total;
        this.orderphone = orderphone;
        this.orderaddress = orderaddress;
        this.payment = payment;
        this.status = status;
        this.receiver = receiver;
    }

    addNewOrder() {
        const sql = 'INSERT INTO public."Order"(id, "idCustomer", orderdate, receivedate, total, orderphone, orderaddress, payment, status, receiver)' +
            'VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10);'
        return queryDB(sql, [this.id, this.idCustomer, this.orderdate, this.receivedate, this.total, this.orderphone, this.orderaddress, this.payment, this.status, this.receiver]);
    }

    static getAllOrder() {
        const sql = `SELECT a."id" as id, a.orderdate, a.total, b.fistname, b.lastname, b.email, a.status FROM public."Order" a, public."Customer" b 
        WHERE b."id" = a."idCustomer"
        Order by a."id" DESC`;
        return queryDB(sql, [])
    }

    getOrderById() {
        const sql = 'SELECT *	FROM public."Order" where id=$1'
        return queryDB(sql, [this.id])
            .then(results => results.rows);
    }

    getOrderInfoByCustomerId() {
        const sql = 'SELECT *	FROM public."Order" where "idCustomer"=$1'
        return queryDB(sql, [this.idCustomer])
            // .then(results => results.rows);
    }
}

module.exports = Order;

// var order = new Order(1, 12, '01-01-2011', '02-02-2012', 123, '12222', 'okok', '12121212');
// order.addNewOrder()

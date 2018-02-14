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
    //using for admin
    static getAllOrder() {
        const sql = `SELECT a."id" as id, a.orderdate, a.total, b.fistname, b.lastname, b.email, a.status FROM public."Order" a, public."Customer" b 
        WHERE b."id" = a."idCustomer"
        Order by a."id" DESC`;
        return queryDB(sql, [])
    }
    //using for admin
    static getPendingOrder() {
        const sql = `SELECT a."id" as id, a.orderdate, a.total, b.fistname, b.lastname, b.email, a.status FROM public."Order" a, public."Customer" b 
    WHERE b."id" = a."idCustomer" AND a.status = 'Pending' AND a."id" NOT IN (select "idOrder" from public."StaffOrder")
    Order by a.orderdate ASC LIMIT 3`;
        return queryDB(sql, []);
    }

    static getProccessingOrder(idStaff) {
        const sql = `SELECT b."id" as id, b.orderdate, b.total, a.fistname, a.lastname, a.email, b.status 
        FROM public."Customer" a, public."Order" b, public."StaffOrder" c, public."Staff" d 
        WHERE a."id" = b."idCustomer"
        AND b."id" = c."idOrder"
        and d."id" = c."idStaff"
        AND b.status = 'Proccessing'
        AND d."id" = $1
        Order by b."id" ASC`;
        return queryDB(sql, [idStaff]);
    }
    static getFinishOrder(idStaff) {
        const sql = `SELECT b."id" as id, b.orderdate, b.total, a.fistname, a.lastname, a.email, b.status 
        FROM public."Customer" a, public."Order" b, public."StaffOrder" c, public."Staff" d 
        WHERE a."id" = b."idCustomer"
        AND b."id" = c."idOrder"
        and d."id" = c."idStaff"
        AND b.status = 'Finish'
        AND d."id" = $1
        Order by b."id" ASC`;
        return queryDB(sql, [idStaff]);
    }
    //SELECT a."id" as id, a.orderdate, a.total, b.fistname, b.lastname, b.email, a.status FROM public."Order" a, public."Customer" b 
    // WHERE b."id" = a."idCustomer" AND a.status = 'Pending' AND a."id" not in (select "idOrder" from public."StaffOrder")
    // Order by a.orderdate ASC  

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
    //update order status. staff using.
    updateFinishStatus() {
        const sql = `UPDATE public."Order" SET status = 'Finish' where id=$1`;
        return queryDB(sql, [this.id])
    }
    //update order status. staff using.
    updateProccessingStatus() {
        const sql = `UPDATE public."Order" SET status = 'Proccessing' where id=$1`;
        return queryDB(sql, [this.id])
    }
    //update order status. staff using.
    updateReceiverInfo() {
        const sql = `UPDATE public."Order" SET orderphone=$1, orderaddress=$2, receiver=$3 where id=$4`;
        return queryDB(sql, [this.orderphone, this.orderaddress, this.receiver, this.id]);
    }
}

module.exports = Order;

// var order = new Order(1, 12, '01-01-2011', '02-02-2012', 123, '12222', 'okok', '12121212');
// order.addNewOrder()

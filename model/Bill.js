const queryDB = require('../utils/Database');

class Bill {
    constructor(idbill, idcustomer, bill_address, bill_date, bill_delivery_date, bill_phone, bill_status, bill_total) {
        this.idbill = idbill;
        this.idcustomer = idcustomer;
        this.bill_address = bill_address;
        this.bill_date = bill_date;
        this.bill_delivery_date = bill_delivery_date;
        this.bill_phone = bill_phone;
        this.bill_status = bill_status;
        this.bill_total = bill_total;
    }

    insertBill() {
        const sql = 'INSERT INTO public.bill(idbill, idcustomer, bill_address, bill_date, bill_delivery_date, bill_phone, bill_status, bill_total)' +
            'VALUES ($1, $2, $3, $4, $5, $6, $7, $8);'
        return queryDB(sql, ['default', this.idcustomer, this.bill_address, this.bill_date, this.bill_delivery_date, this.bill_phone, this.bill_status, this.bill_total]);
    }

    getBilById() {
        const sql = 'SELECT *	FROM public."bill" where idbill=$1'
        return queryDB(sql, [this.idbill])
            .then(results => results.rows);
    }

    getBilByCustomerId() {
        const sql = 'SELECT *	FROM public."bill" where idcustomer=$1'
        return queryDB(sql, [this.idcustomer])
            .then(results => results.rows);
    }
}

const queryDB = require('../utils/Database');

class BillDetails {
    constructor(idbill, idproduct, quantity) {
        this.idbill = idbill;
        this.idproduct = idproduct;
        this.quantity = quantity;
    }

    insertBillDetails() {
        const sql = 'INSERT INTO public."bill_details"(idbill, idproduct, quantity)VALUES ($1, $2, $3)'
        return queryDB(sql, [this.idbill, this.idproduct, this.quantity]);
    }

    getBillDetailsByIdBill() {
        const sql = 'SELECT *	FROM public."bill_details" where idbill=$1'
        return queryDB(sql, [this.idbill])
            .then(results => results.rows)
    }
}
module.exports = BillDetails;

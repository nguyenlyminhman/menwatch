const queryDB = require('../utils/DatabaseConnection');

class BillDetails {
    constructor(id, idOrder, idProduct, quantity) {
        this.id = id;
        this.idOrder = idOrder;
        this.idProduct = idProduct;
        this.quantity = quantity;
    }

    addNewOrderDetails() {
        const sql = 'INSERT INTO public."OrderDetails" (id, idOrder, idProduct, quantity) VALUES ($1, $2, $3, $4)';
        return queryDB(sql, ['default', this.idOrder, this.idProduct, this.quantity]);
    }

    getBillDetailsByOrderId() {
        const sql = 'SELECT * FROM public."OrderDetails" where idOrder=$1';
        return queryDB(sql, [this.idbill])
            .then(results => results.rows)
    }
}
module.exports = BillDetails;

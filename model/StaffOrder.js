const queryDB = require('../utils/DatabaseConnection');

class StaffOrder {
    constructor(id, idStaff, idOrder, status, handlingdate) {
        this.id = id;
        this.idStaff = idStaff;
        this.idOrder = idOrder;
        this.status = status;
        this.handlingdate = handlingdate;
    }
    addHandlingOrder() {
        const sql = 'INSERT INTO public."StaffOrder"("idStaff", "idOrder", status, handlingdate)' +
            'VALUES ($1, $2, $3, $4)';
        return queryDB(sql, [this.idStaff, this.idOrder, this.status, this.handlingdate]);
    }

    checkOrderId() {
        const sql = 'SELECT * FROM public."StaffOrder" where "idOrder"=$1;'
        return queryDB(sql, [this.idOrder]);
    }
    updateContact() {
        const sql = 'SELECT * FROM public."Customer" where id=$1;'
        // return queryDB(sql, [this.id])
        //     .then(results => results.rows);
    }
}
module.exports = StaffOrder;

// let a = new StaffOrder(undefined, 1, 3, 'ok', '09-02-2019');
// a.addNewOrder().then(aaa=>{
//     console.log(aaa)
// })

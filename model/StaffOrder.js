const queryDB = require('../utils/DatabaseConnection');

class StaffOrder {
    //contructor of StaffOrder class.
    constructor(id, idStaff, idOrder, handlingdate) {
        this.id = id;
        this.idStaff = idStaff;
        this.idOrder = idOrder;
        this.handlingdate = handlingdate;
    }
    //add to StaffOrder table.
    addHandlingOrder() {
        const sql = 'INSERT INTO public."StaffOrder"("idStaff", "idOrder", handlingdate)' +
            'VALUES ($1, $2, $3)';
        return queryDB(sql, [this.idStaff, this.idOrder, this.handlingdate]);
    }
    //this method use to check order id is existed or not.
    checkOrderId() {
        const sql = 'SELECT * FROM public."StaffOrder" where "idOrder"=$1;'
        return queryDB(sql, [this.idOrder]);
    }
    //this method use to check order id is existed or not.
    getStaffNameOnOrder(){
        
    }
}
module.exports = StaffOrder;

// let a = new StaffOrder(undefined, 1, 3, 'ok', '09-02-2019');
// a.addNewOrder().then(aaa=>{
//     console.log(aaa)
// })

const queryDB = require('../utils/DatabaseConnection');

class Payment {
    constructor(id, paymentname) {
        this.id = id;
        this.paymentname = paymentname;
    }

    static getPayment() {
        const sql = 'select * from public."Payment" ORDER BY id ASC';
        return queryDB(sql, [])
            .then(result => result.rows);
    }

    addNewPayment(){
        let sql = 'INSERT INTO public."Payment"(id, paymentname) VALUES(default, $1)';
        return queryDB(sql,[this.paymentname]);
    }
}
module.exports = Payment;

let payment = new Payment(undefined, "Pay COD");
payment.addNewPayment()
.then(() => console.log('ok man'))
.catch(err=> console.log(err));

// Payment.getPayment()
// .then(data =>console.log(data))
// .catch(err=>console.log(err))

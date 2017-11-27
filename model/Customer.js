const queryDB = require('../utils/Database');

class Customer {
    constructor(idcustomer, cus_code, cus_email, cus_password, cus_fname, cus_lname, cus_phone, cus_address) {
        this.idcustomer = idcustomer;
        this.cus_code = cus_code;
        this.cus_email = cus_email;
        this.cus_password = cus_password;
        this.cus_fname = cus_fname;
        this.cus_lname = cus_lname;
        this.cus_phone = cus_phone;
        this.cus_address = cus_address;
    }
    insertCustomer() {
        const sql = 'INSERT INTO public."customer"(idcustomer, cus_code, cus_email, cus_password, cus_fname, cus_lname, cus_phone, cus_address)' +
            'VALUES ($1, $2, $3, $4, $5, $6, $7, $8)';
        return queryDB(sql, [this.idcustomer, this.cus_code, this.cus_email, this.cus_password, this.cus_fname, this.cus_lname, this.cus_phone, this.cus_address]);
    }

    getCustomerById() {
        const sql = 'SELECT * FROM public."customer" where idcustomer=$1;'
        return queryDB(sql, [this.idcustomer])
            .then(results => results.rows);
    }

    getCustomerByCode() {
        const sql = 'SELECT * FROM public."customer" where cus_code=$1;'
        return queryDB(sql, [this.cus_code])
            .then(results => results.rows);
    }

    updateCustomer() {
        const sql = 'UPDATE public."customer" SET  cus_email=$1, cus_password=$2, cus_fname=$3, cus_lname=$4, cus_phone=$5, cus_address=$6'
            + 'WHERE idcustomer= $7';
        return queryDB(sql, [this.cus_email, this.cus_password, this.cus_fname, this.cus_lname, this.cus_phone, this.cus_address, this.idcustomer]);
    }
}
module.exports = Customer;

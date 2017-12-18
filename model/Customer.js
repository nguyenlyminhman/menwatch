const queryDB = require('../utils/DatabaseConnection');

class Customer {
    constructor(id, fistname, lastname, email, password, address, phone) {
        this.id = id;
        this.fistname = fistname;
        this.lastname = lastname;
        this.email = email;
        this.password = password;
        this.address = address;
        this.phone = phone;
    }
    insertCustomer() {
        const sql = 'INSERT INTO public."Customer"(id, fistname, lastname, email, password, address, phone)' +
            'VALUES (default, $1, $2, $3, $4, $5, $6)';
        return queryDB(sql, [this.fistname, this.lastname, this.email, this.password, this.address, this.phone]);
    }

    logginCustomer() {
        const sql = 'SELECT * FROM public."Customer" where email=$1 AND password=$2;'
        return queryDB(sql, [this.email, this.password])
            .then(results => results.rows);
    }

    getCustomerInfoById() {
        const sql = 'SELECT * FROM public."Customer" where id=$1;'
        return queryDB(sql, [this.id])
            .then(results => results.rows);
    }

    getCustomerInfoByEmail() {
        const sql = 'SELECT * FROM public."Customer" where email=$1;'
        return queryDB(sql, [this.email])
            .then(results => results.rows);
    }

    updateCustomerInfo() {
        const sql = 'UPDATE public."customer" SET  firstname=$1, lastname=$2, address=$3, phone=$4'
            + 'WHERE id= $5';
        return queryDB(sql, [this.fistname, this.lastname, this.address, this.phone, this.id]);
    }
}
module.exports = Customer;

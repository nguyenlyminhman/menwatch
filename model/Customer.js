const queryDB = require('../utils/Database');

class Customer {
    constructor(id, firstname, lastname, email, password, address, phone) {
        this.id = id;
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.password = password;
        this.address = address;
        this.phone = phone;
    }
    addNewCustomer() {
        const sql = 'INSERT INTO public."customer"(id, firstname, lastname, email, password, address, phone)' +
            'VALUES ($1, $2, $3, $4, $5, $6, $7, $8)';
        return queryDB(sql, ['default', this.firstname, this.lastname, this.email, this.password, this.address, this.phone]);
    }

    getCustomerById() {
        const sql = 'SELECT * FROM public."customer" where id=$1;'
        return queryDB(sql, [this.idcustomer])
            .then(results => results.rows);
    }

    getCustomerByEmail() {
        const sql = 'SELECT * FROM public."customer" where email=$1;'
        return queryDB(sql, [this.email])
            .then(results => results.rows);
    }

    updateCustomerInfo() {
        const sql = 'UPDATE public."Customer" SET  firstname=$1, lastname=$2, address=$3, phone=$4 WHERE id= $5';
        return queryDB(sql, [this.firstname, this.lastname, this.address, this.phone, this.id]);
    }

    updateCustomerPassword() {
        const sql = 'UPDATE public."Customer" SET  password=$1 WHERE id= $2';
        return queryDB(sql, [this.password, this.id]);
    }
}
module.exports = Customer;

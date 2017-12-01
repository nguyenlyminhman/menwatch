const queryDB = require('../utils/DatabaseConnection');

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
        const sql = 'INSERT INTO public."Customer"(id, firstname, lastname, email, password, address, phone)' +
            'VALUES ($1, $2, $3, $4, $5, $6, $7)';
        return queryDB(sql, ['default', this.firstname, this.lastname, this.email, this.password, this.address, this.phone]);
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
        const sql = 'UPDATE public."Customer" SET  firstname=$1, lastname=$2, address=$3, phone=$4 WHERE id= $5';
        return queryDB(sql, [this.firstname, this.lastname, this.address, this.phone, this.id]);
    }

    updateCustomerPassword() {
        const sql = 'UPDATE public."Customer" SET  password=$1 WHERE id= $2';
        return queryDB(sql, [this.password, this.id]);
    }
}

module.exports = Customer;

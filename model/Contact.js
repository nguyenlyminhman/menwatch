const queryDB = require('../utils/DatabaseConnection');
const { hash, compare } = require('bcrypt');

class Contact {
    constructor(email, fullname, phone, message, status, contact_date, idStaff) {
        this.email = email;
        this.fullname = fullname;
        this.phone = phone;
        this.message = message;
        this.status = status;
        this.contact_date = contact_date;
        this.idStaff = idStaff;
    }
    addNewContact() {
        const sql = 'INSERT INTO public."Contact"(email, fullname, phone, message, status, "contact-date")' +
            'VALUES ($1, $2, $3, $4, $5, $6)';
        return queryDB(sql, [this.email, this.fullname, this.phone, this.message, this.status, this.contact_date]);
    }

    getContact() {
        // const sql = 'SELECT * FROM public."Customer" where email=$1;'
        // return queryDB(sql, [this.email])
    }

    updateContact() {
        const sql = 'SELECT * FROM public."Customer" where id=$1;'
        // return queryDB(sql, [this.id])
        //     .then(results => results.rows);
    }
}
module.exports = Contact;

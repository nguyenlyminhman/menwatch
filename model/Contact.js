const queryDB = require('../utils/DatabaseConnection');
const { hash, compare } = require('bcrypt');

class Contact {
    //contructor for Contact model.
    constructor(id, email, fullname, phone, message, status, contact_date, idStaff) {
        this.id = id;
        this.email = email;
        this.fullname = fullname;
        this.phone = phone;
        this.message = message;
        this.status = status;
        this.contact_date = contact_date;
        this.idStaff = idStaff;
    }
    //this method using for add new contact to db
    addNewContact() {
        const sql = 'INSERT INTO public."Contact"(email, fullname, phone, message, status, "contact_date")' +
            'VALUES ($1, $2, $3, $4, $5, $6)';
        return queryDB(sql, [this.email, this.fullname, this.phone, this.message, this.status, this.contact_date]);
    }
    //this method using for get all contact from db.
    static getAllContact() {
        const sql = 'SELECT * FROM public."Contact"'
        return queryDB(sql, [])
    }
    //this method using for get contact by id.
    getContactById() {
        const sql = 'SELECT * FROM public."Contact" where id=$1;'
        return queryDB(sql, [this.id]);
    }
    //this method using for delete contact by id.
    deleteContact() {
        const sql = 'DELETE FROM public."Contact" where id=$1;'
        return queryDB(sql, [this.id])
        //     .then(results => results.rows);
    }
}
module.exports = Contact;

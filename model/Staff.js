const queryDB = require('../utils/DatabaseConnection');

class Staff {
    constructor(id, firstname, lastname, email, password) {
        this.id = id;
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.password = password;
    }

    loginAdmin() { //eslint-disable-line
        const sql = 'select * from public."Staff" where email=$1 and password=$2';
        return queryDB(sql, [this.email, this.password])
            .then(result => result.rows);
    }

    getAdminInfoByEmail() {
        const sql = 'select * from public."Staff" where email=$1';
        return queryDB(sql, [this.email])
            .then(result => result.rows);
    }

    addNewAdmin() {
        const sql = 'INSERT INTO public."Staff" (idadmin, fname, lname, email, password) values ($1, $2, $3, $4, $5)';
        return queryDB(sql, ['default', this.fname, this.lname, this.email, this.password]);
    }
}

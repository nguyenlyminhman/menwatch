const queryDB = require('../utils/DatabaseConnection');
const { hash, compare } = require('bcrypt');


class Staff {
    constructor(firstname, lastname, email, password, role, address, phone) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.password = password;
        this.role = role;
        this.address = address;
        this.phone = phone;
    }

    signupStaff() {
        return new Promise((resolve, reject) => {
            hash(this.password, 8, (err, encryptedPassword) => {
                if (err) return reject(err);
                const sql = 'INSERT INTO public."Staff"(firstname, lastname, email, password,role, address, phone)' +
                    'VALUES ($1, $2, $3, $4, $5, $6, $7)';
                queryDB(sql, [this.firstname, this.lastname, this.email, encryptedPassword, this.role, this.address, this.phone])
                resolve();
            })
        })
    }


    async signinStaff() {
        const sql = 'SELECT * FROM public."Staff" where email=$1'
        const result = await queryDB(sql, [this.email]);
        if (!result.rows[0]) throw new Error('Email is not exist...')
        const hashPassword = result.rows[0].password;
        const isValid = await compare(this.password, hashPassword);
        if (!isValid) throw new Error('Password is wrong...');
        return { id: result.rows[0].id }
    }

    loginStaff() { //eslint-disable-line
        const sql = 'select * from public."Staff" where email=$1 and password=$2';
        return queryDB(sql, [this.email, this.password])
            .then(result => result.rows);
    }

    checkExistStaff() {
        const sql = 'select * from public."Staff" where email=$1';
        return queryDB(sql, [this.email])
    }
    static getAllStaff() {
        const sql = 'select * from public."Staff"';
        return queryDB(sql, [])
    }
}

module.exports = Staff

// let staff = new Staff(undefined, undefined, 'email', undefined, undefined, undefined, undefined);
// staff.checkExistStaff().then(aa=>{
//     console.log(aa.rowCount)
// })
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
    //get staff list in database
    static getAllStaff() {
        const sql = 'select * from public."Staff"';
        return queryDB(sql, [])
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

    // async signinStaff() {
    //     const sql = 'SELECT * FROM public."Staff" where email=$1'
    //     const result = await queryDB(sql, [this.email]);
    //     if (!result.rows[0]) throw new Error('Email is not exist...')
    //     const hashPassword = result.rows[0].password;
    //     const isValid = await compare(this.password, hashPassword);
    //     if (!isValid) throw new Error('Password is wrong...');
    //     return { id: result.rows[0].id }
    // }
    //using method to check exist staff in database.
    checkExistStaff() {
        const sql = 'SELECT * from public."Staff" where email=$1';
        return queryDB(sql, [this.email])
    }
    //get staff information by Id. Using for update information function.
    getStaffInfoById(idStaff) {
        const sql = 'select * from public."Staff" where id=$1';
        return queryDB(sql, [idStaff])
    }
    //update password for staff.
    updatePassword(idStaff) {
        return new Promise((resolve, reject) => {
            hash(this.password, 8, (err, encryptedPassword) => {
                if (err) return reject(err);
                const sql = 'UPDATE public."Staff" SET password=$1 WHERE id=$2';
                queryDB(sql, [encryptedPassword, idStaff])
                resolve();
            })
        })
    }
    //update staff information.
    updateInformation(idStaff) {
        const sql = 'UPDATE public."Staff" SET firstname=$1, lastname=$2, address=$3, phone=$4 where id=$5';
        return queryDB(sql, [this.firstname, this.lastname, this.phone, this.address, idStaff])
    }
}

module.exports = Staff

// let staff = new Staff(undefined, undefined, 'nlmman@cusc.ctu.edu.vn', 'Vub0ZXjUs', undefined, undefined, undefined);
// staff.signinStaff().then(aa=>{
//     console.log(aa.rowCount)
// })
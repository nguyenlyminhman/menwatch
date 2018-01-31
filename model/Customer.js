const queryDB = require('../utils/DatabaseConnection');
const { hash, compare } = require('bcrypt');

class Customer {
    constructor(fistname, lastname, email, password, address, phone) {
        this.fistname = fistname;
        this.lastname = lastname;
        this.email = email;
        this.password = password;
        this.address = address;
        this.phone = phone;
    }
    // async signup() {
    //     const sql = 'INSERT INTO public."Customer"(fistname, lastname, email, password, address, phone)' +
    //         'VALUES ($1, $2, $3, $4, $5, $6)';
    //     const encryptedPassword = await hash(this.password, 8);
    //     return queryDB(sql, [this.fistname, this.lastname, this.email, encryptedPassword, this.address, this.phone]);
    // }

    signup() {
        return new Promise((resolve, reject) => {
            hash(this.password, 8, (err, encryptedPassword) => {
                if (err) return reject(err);
                const sql = 'INSERT INTO public."Customer"(fistname, lastname, email, password, address, phone)' +
                    'VALUES ($1, $2, $3, $4, $5, $6)';
                queryDB(sql, [this.fistname, this.lastname, this.email, encryptedPassword, this.address, this.phone])
                resolve();
            })
        })
    }


    async signin() {
        const sql = 'SELECT * FROM public."Customer" where email=$1'
        const result = await queryDB(sql, [this.email]);
        if (!result.rows[0]) throw new Error('Email is not exist...')
        const hashPassword = result.rows[0].password;
        const isValid = await compare(this.password, hashPassword);
        if (!isValid) throw new Error('Password is wrong...');
        return { id: result.rows[0].id }
    }

    //using for facebook login
    insertNewCustomer() {
        const sql = 'INSERT INTO public."Customer"(fistname, lastname, email)' +
            'VALUES ($1, $2, $3)';
      return queryDB(sql, [this.fistname, this.lastname, this.email])
    }

    checkExistEmail() {
        const sql = 'SELECT * FROM public."Customer" where email=$1';
        return queryDB(sql, [this.email])
    }

    getCustomerInfoById() {
        const sql = 'SELECT * FROM public."Customer" where id=$1;'
        return queryDB(sql, [this.id])
            .then(results => results.rows);
    }

    getCustomerInfoByEmail() {
        const sql = 'SELECT * FROM public."Customer" where email=$1'
        return queryDB(sql, [this.email]);
    }

    updateCustomerInfo() {
        const sql = 'UPDATE public."Customer" SET  fistname=$1, lastname=$2'
            + 'WHERE email= $3';
        return queryDB(sql, [this.fistname, this.lastname, this.email]);
    }

    updateCustomerShippingAddress() {
        const sql = 'UPDATE public."Customer" SET  address=$1, phone=$2'
            + 'WHERE email= $3';
        return queryDB(sql, [this.address, this.phone, this.email]);
    }
    updateCustomerPassword() {
        return new Promise((resolve, reject) => {
            hash(this.password, 8, (err, encryptedPassword) => {
                if (err) return reject(err);
                const sql = 'UPDATE public."Customer" SET password=$1 WHERE email=$2';
                queryDB(sql, [encryptedPassword, this.email])
                resolve();
            })
        })
    }
}
module.exports = Customer;

// let cus = new Customer(undefined,undefined, 'man@gmail.com', undefined,undefined,undefined);
// cus.checkExistEmail()
// .then(resu=>console.log(resu.rows[0]))
// .catch(er=>console.log(er))

// let cus = new Customer(undefined, undefined, 'man@gmail.com', undefined , undefined, undefined);
// cus.getCustomerInfoByEmail()
// .then(result=>{
//     compare('man',result.rows[0].password )
//     .then(kq=>console.log(kq))
//     .catch(err=>console.log(' ' + err))}
//     //console.log(result.rows[0].password)
// )
// .catch(er=>console.log(er))
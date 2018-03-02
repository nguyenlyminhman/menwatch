const queryDB = require('../utils/DatabaseConnection');
const { hash, compare } = require('bcrypt');

class Customer {
    //contructor for Customer.
    constructor(fistname, lastname, email, password, address, phone) {
        this.fistname = fistname;
        this.lastname = lastname;
        this.email = email;
        this.password = password;
        this.address = address;
        this.phone = phone;
    }
    //this method using for registering new customer.
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


    // async signin() {
    //     const sql = 'SELECT * FROM public."Staff" where email=$1'
    //     const result = await queryDB(sql, [this.email]);
    //     if (!result.rows[0]) throw new Error('Email is not exist...')
    //     const hashPassword = result.rows[0].password;
    //     const isValid = await compare(this.password, hashPassword);
    //     if (!isValid) throw new Error('Password is wrong...');
    //     return { id: result.rows[0].id }
    // }

    //this method using for facebook login
    insertNewCustomer() {
        const sql = 'INSERT INTO public."Customer"(fistname, lastname, email)' +
            'VALUES ($1, $2, $3)';
        return queryDB(sql, [this.fistname, this.lastname, this.email])
    }
    //this method using for get all customer.
    static getAllCustomer() {
        const sql = 'SELECT * FROM public."Customer" ORDER BY id DESC';
        return queryDB(sql, [])
    }
    //this method using for get popular customer
    static getPopularCustomer() {
        const sql = `SELECT ct."id", ct."fistname", ct."lastname", ct."email",
        COUNT("Order"."id") AS "total_order"
        FROM public."Customer" ct
        INNER JOIN public."Order" 
        ON ct."id" = "Order"."idCustomer"
        GROUP BY  ct."id",ct."fistname", ct."lastname", ct."email"
        Order by "total_order" DESC`;
        return queryDB(sql, [])
    }
    //this method using for check email.
    checkExistEmail() {
        const sql = 'SELECT * FROM public."Customer" where email=$1';
        return queryDB(sql, [this.email])
    }
    //this method using for get customer information by customer id.
    getCustomerInfoById(id) {
        const sql = 'SELECT * FROM public."Customer" where id=$1;'
        return queryDB(sql, [id])
    }
//this method using to get customer information by email.
    getCustomerInfoByEmail() {
        const sql = 'SELECT * FROM public."Customer" where email=$1'
        return queryDB(sql, [this.email]);
    }

    //this method using for update customer firstname, lastname.
    updateCustomerInfo() {
        const sql = 'UPDATE public."Customer" SET  fistname=$1, lastname=$2'
            + 'WHERE email= $3';
        return queryDB(sql, [this.fistname, this.lastname, this.email]);
    }
    //this method using for update customer address, phone.
    updateCustomerShippingAddress() {
        const sql = 'UPDATE public."Customer" SET  address=$1, phone=$2'
            + 'WHERE email= $3';
        return queryDB(sql, [this.address, this.phone, this.email]);
    }
    //this method using for update customer password.
    //using bcrypt to hash password.
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

// let cus = new Customer(undefined,undefined, 'nlmman@cusc.ctu.edu.vn', 'nam',undefined,undefined);
// cus.signin()
// .then(resu=>console.log(resu))
// .catch(er=>console.log(er))

// let cus = new Customer(undefined, undefined, 'nlmman@cusc.ctu.edu.vn', undefined , undefined, undefined);
// cus.getCustomerInfoByEmail()
// .then(result=>{
//     compare('man',result.rows[0].password )
//     .then(kq=>console.log(kq))
//     .catch(err=>console.log(' ' + err))}
//     //console.log(result.rows[0].password)
// )
// .catch(er=>console.log(er))
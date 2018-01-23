const Customer = require('../model/Customer');

module.exports = async (req, res, next) => {
    let { email, password, firstname, lastname, address, phone } = req.body;
    let customer = new Customer(firstname, lastname, email, password, address, phone);
    customer.checkExistEmail()
        .then(result => {
            if (result.rowCount) {
                res.redirect('/register')
            } else {
                customer.signup()
                    .then(res.redirect('/account'))
            }
        })
        .catch(() => res.redirect('/register'));
}
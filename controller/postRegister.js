const Customer = require('../model/Customer');
let {removeSpace } = require('../utils/Tools');

module.exports = async (req, res, next) => {
    let { email, password, firstname, lastname, address, phone } = req.body;
    let customer = new Customer(removeSpace(firstname), removeSpace(lastname), email, password, removeSpace(address), phone);
    customer.checkExistEmail()
        .then(result => {
            if (result.rowCount) {
                req.flash('info', email + ' is already in use.')
                res.redirect('/register')
            } else {
                customer.signup()
                    .then(
                    res.redirect('/thank-register')
                    )
            }
        })
        .catch(() => res.redirect('/register'));
}
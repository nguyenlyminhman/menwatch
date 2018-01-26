const Customer = require('../model/Customer');

module.exports = async (req, res, next) => {
    let { address, phone } = req.body;
    let email = req.user.email;
    let customer = new Customer(undefined, undefined, email, undefined, address, phone);
    customer.updateCustomerShippingAddress()
        .then(
        req.flash('info', 'Your shipping address has updated.'),
        res.redirect('/profile')
        )
        .catch(() => res.redirect('/profile'));
}
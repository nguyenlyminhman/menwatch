const Customer = require('../model/Customer');

module.exports = async (req, res, next) => {
    let { password } = req.body;
    let email = req.user.email;
    let customer = new Customer(undefined, undefined, email, password, undefined, undefined);

    customer.updateCustomerPassword()
        .then(
        req.flash('info', 'Your password has updated.'),
        res.redirect('/profile')
        )
        .catch(() => res.redirect('/profile'));
}
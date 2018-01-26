const Customer = require('../model/Customer');

module.exports = async (req, res, next) => {
    let { firstname, lastname } = req.body;
    let email = req.user.email;
    let customer = new Customer(firstname, lastname, email, undefined, undefined, undefined);
    customer.updateCustomerInfo()
        .then(
        req.flash('info', 'Your information has updated.'),
        res.redirect('/profile')
        )
        .catch(() => res.redirect('/profile'));
}
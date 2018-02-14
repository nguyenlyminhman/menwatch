const Customer = require('../model/Customer');

module.exports = async (req, res, next) => {
    //get password value.
    let { password } = req.body;
    //get customer email address after authenticated with Passport.js
    let email = req.user.email;
    //init Customer model with customer email and password.
    let customer = new Customer(undefined, undefined, email, password, undefined, undefined);
    //using updateCustomerPassword() method to change password.
    customer.updateCustomerPassword().then(result => {
        //result.rowCount > 0, that's mean, the password was updated.
        if (result.rowCount > 0) {
            req.flash('info', 'Your password has updated.'),
                res.redirect('/profile')
        } else {
            res.send('postChangePassword err: can not update password.')
        }
    }).catch(() => res.send('postChangePassword err: can not update password.'));
}
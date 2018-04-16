const Customer = require('../model/Customer');
let {removeSpace } = require('../utils/Tools');


module.exports = async (req, res, next) => {
    //get firstname, lastname value from customer form.
    let { firstname, lastname } = req.body;
    //get customer email address after authenticated with Passport.js
    let email = req.user.email;
    //init Customer model.
    let customer = new Customer(removeSpace(firstname), removeSpace(lastname), email, undefined, undefined, undefined);
    //using updateCustomerInfo() to save new customer information.
    customer.updateCustomerInfo().then(result => {
        //result.rowCount > 0, that's mean, the customer information was successfully updated.
        if (result.rowCount > 0) {
            //send the message to customer.
            req.flash('info', 'Your information was updated.'),
                //redirect to profile link.
                res.redirect('/profile')
        } else {
            //send the message to customer.
            req.flash('info', 'Your information was not updated.'),
                //redirect to profile link.
                res.redirect('/profile')
        }
    })
}
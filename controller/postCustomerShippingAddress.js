const Customer = require('../model/Customer');
let {removeSpace } = require('../utils/Tools');

module.exports = async (req, res, next) => {
    // get address, phone value from shipping address form.
    let { address, phone } = req.body;
    //get customer email address after authenticated with passportjs
    let email = req.user.email;
    //init Customer model
    let customer = new Customer(undefined, undefined, email, undefined, removeSpace(address), phone);
    //Using updateCustomerShippingAddress() to save new information.
    customer.updateCustomerShippingAddress()
        .then(result => {
            //result.rowCount > 0, that's mean, the shipping address  was successfully updated.
            if (result.rowCount > 0) {
                //send the message to customer.
                req.flash('info', 'Your shipping address was updated.'),
                    //redirect to profile link.
                    res.redirect('/profile')
            } else {
                //send the message to customer.
                req.flash('info', 'Your shipping address was not updated.'),
                    //redirect to profile link.
                    res.redirect('/profile')
            }
        })
}
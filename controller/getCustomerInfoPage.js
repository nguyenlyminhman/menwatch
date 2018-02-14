const Brand = require('../model/Brand');
const Style = require('../model/Style');
const Customer = require('../model/Customer')

module.exports = async (req, res) => {
    //get all brand and style. Using for navigation bar
    let brand = await Brand.getAllBrand();
    let style = await Style.getAllStyle();
    //get customer email address after authenticated with passportjs
    let email = req.user.email;
    // init Customer model with email.
    let customer = new Customer(undefined, undefined, email, undefined, undefined, undefined);
    //Using try...catche, if the error occur.
    try {
        //Using checkExistEmail() method to check user email.
        customer.checkExistEmail().then(result => {
            if (result.rowCount > 0) { //result.rowCount > 0, that's mean, the user email exist.
                res.render('customer_info', { //render customer_info ejs page.
                    message: req.flash('info'),
                    brand,
                    style,
                    user: req.user,
                    customer: result.rows[0],
                    title: 'My information'
                });
            }else{//send notificate that, user email is not found.
                res.send('getCustomerInfoPage error: the ' + email + ' is not found.');
            }
        })
    } catch (err) { //catching and sending the error when it is occuring.
        res.send('getCustomerInfoPage error : ' + err);
    }
}


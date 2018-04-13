const Brand = require('../model/Brand');
const Style = require('../model/Style');
const Customer = require('../model/Customer');
const Order = require('../model/Order');

module.exports = async (req, res) => {
    //get user email address after authenticated with passportjs
    let email = req.user.email;
    //get all brand and style. Using for navigation bar
    let brand = await Brand.getAllBrand();
    let style = await Style.getAllStyle();
    //init Customer model with customer email.
    let customer = new Customer(undefined, undefined, email, undefined, undefined, undefined);
    //Using try...catche, if the error occur.
    try {
        //Using checkExistEmail() method to check user email.
        customer.checkExistEmail().then(result => {
            if (result.rowCount > 0) { //result.rowCount > 0, that's mean, the user email exist.
                //init Order model with Customer id which get from customer.checkExistEmail() method.
                let order = new Order(undefined, result.rows[0].id, undefined, undefined, undefined, undefined, undefined, undefined, );
                //get Order Information base on customer id.
                order.getOrderInfoByCustomerId().then(orderResult => {
                    res.render('profile', { //render profile ejs page.
                        message: req.flash('info'),
                        brand,
                        style,
                        user: req.user,
                        customer: result.rows[0],
                        order: orderResult.rows,
                        title: 'My profile'
                    });
                });
            } else {//send notificate that, user email is not found.
                res.send('getProfilePage error : The ' + email + ' is not found.');
            }
        })
    } catch (err) { //catching and sending the error when it is occuring.
        res.send('getProfilePage error : ' + err);
    }
}

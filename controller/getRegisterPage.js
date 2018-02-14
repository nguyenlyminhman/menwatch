const Brand = require('../model/Brand');
const Style = require('../model/Style');

module.exports = async (req, res) => {
    //get all brand and style. Using for navigation bar
    let brand = await Brand.getAllBrand();
    let style = await Style.getAllStyle();
    //declare messages to show notification for customer.
    let messages = req.flash('error');
    //Using try...catche, if the error occur.
    try {
        res.render('register', { //render register ejs page.
            csrfToken: req.csrfToken(),
            brand,
            style,
            user: req.user,
            title: 'Register',
            message: req.flash('info'),
            messages: messages,
            hasErrors: messages.length > 0
        })
    } catch (err) { //catching and sending the error when it is occuring.
        res.send('getRegisterPage error : ' + err);
    }
}

const Brand = require('../model/Brand');
const Style = require('../model/Style');

module.exports = async (req, res) => {
    var messages = req.flash('error');
    //get all brand and style. Using for navigation bar
    let brand = await Brand.getAllBrand();
    let style = await Style.getAllStyle();
    try {//Using try...catche, if the error occur.
        res.render('login', { //render login ejs page
            csrfToken: req.csrfToken(),
            message: req.flash('info'),
            messages: messages,
            hasErrors: messages.length > 0,
            brand,
            style,
            user: req.user,
            title: 'Login'
        });
    } catch (err) {//catching and sending the error when it is occuring.
        res.send('getLoginPage error : ' + err);
    }
}

const Brand = require('../model/Brand');
const Style = require('../model/Style');


module.exports = async (req, res, next) => {
    //get all brand and style. Using for navigation bar
    let brand = await Brand.getAllBrand();
    let style = await Style.getAllStyle();
    //Using try...catche, if the error occur.
    try {
        res.render('thank_register', { //render thank_register ejs page
            brand,
            style,
            user: req.user,
            title: 'Thank for your registering'
        })
    } catch (err) { //catching and sending the error when it is occuring.
        res.send('getThankRegister error: ' + err);
    }
}

const Style = require('../model/Style');
const Brand = require('../model/Brand');

module.exports = async (req, res, next) => {
    //get all brand and style. Using for navigation bar
    let brand = await Brand.getAllBrand();
    let style = await Style.getAllStyle();
    //Using try...catche, if the error occur.
    try {
        res.render('thank_purchase', { //rendering  error ejs page.
            style,
            brand,
            user: req.user,
            title: 'Thank for your purchasing'
        })
    } catch (err) {//catching and sending the error when it is occuring.
        res.send('getErrorPage error : ' + err);
    }
}
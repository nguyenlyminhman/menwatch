const Brand = require('../model/Brand');
const Style = require('../model/Style');


module.exports = async (req, res) => {
    //get all brand and style. Using for navigation bar
    let brand = await Brand.getAllBrand();
    let style = await Style.getAllStyle();
    try { //Using try...catche, if the error occur.
        res.render('contact', {
            csrfToken: req.csrfToken(),
            message: req.flash('info'),
            brand,
            style,
            user: req.user,
            title: 'Contact'
        })
    } catch (err) { //catching and sending the error when it is occuring.
        res.send('getContactPage error :' + err);
    }
}

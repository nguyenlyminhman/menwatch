const Style = require('../model/Style');
const Brand = require('../model/Brand');

module.exports = async (req, res, next) => {

    try {
        let brand = await Brand.getAllBrand();
        let style = await Style.getAllStyle();
        res.render('error', {
            // csrfToken: req.csrfToken(),
            style,
            brand,
            user: req.user,
            title: 'Error - Page not found'
        })
    } catch (err) {
        res.send('getErrorPage error : ' + err);
    }
}
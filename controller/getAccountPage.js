const Brand = require('../model/Brand');
const Style = require('../model/Style');

module.exports = async (req, res) => {
    try {
        let brand = await Brand.getAllBrand();
        let style = await Style.getAllStyle();
        res.render('account', {
            // csrfToken: req.csrfToken(),
            message: req.flash('info'),
            brand,
            style,
            user: req.user,
            title: 'MenWatch-Account page...'
            
        });
    } catch (err) {
        res.send('Account page navigation error : ' + err);
    }
}

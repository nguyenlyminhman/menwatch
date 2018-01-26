const Brand = require('../model/Brand');
const Style = require('../model/Style');

module.exports = async (req, res) => {
    try {
        let brand = await Brand.getAllBrand();
        let style = await Style.getAllStyle();
        res.render('login', {
            csrfToken: req.csrfToken(),
            message: req.flash('info'),
            brand,
            style,
            user: req.user,
            title: 'Login'
            
        });
    } catch (err) {
        res.send('getLoginPage error : ' + err);
    }
}

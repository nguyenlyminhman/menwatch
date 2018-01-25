const Brand = require('../model/Brand');
const Style = require('../model/Style');

module.exports = async (req, res) => {
    try {
        let brand = await Brand.getAllBrand();
        let style = await Style.getAllStyle();
        res.render('profile', {
            message: req.flash('info'),
            brand,
            style,
            user: req.user,
            title: 'Profile page...'
            
        });
    } catch (err) {
        res.send('Account page navigation error : ' + err);
    }
}

const Brand = require('../../model/Brand');
const Style = require('../../model/Style');



module.exports = async (req, res, next) => {
    try {
        let style = await Style.getAllStyle();
        let brand = await Brand.getAllBrand();
        res.render('ad_productAddNew', {
            csrfToken: req.csrfToken(),
            // user: req.user,
            brand,
            style,
            message: req.flash('info'),
            title: 'Add new product ',
            breadcrumb: 'Add new product',

        })
    } catch (err) {
        res.send('getAd_BrandAddNew error : ' + err);
    }
}

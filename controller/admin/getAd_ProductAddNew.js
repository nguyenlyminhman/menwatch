const Brand = require('../../model/Brand');
const Style = require('../../model/Style');



module.exports = async (req, res, next) => {

    let style = await Style.getAllStyle();
    let brand = await Brand.getAllBrand();
    //Check user role. If user is not admin role, redirect to access denied page.
    if (req.user.role !== 'Admin') {
        res.redirect('/admin/access-denied');
        return;
    }
    try {
        res.render('ad_productAddNew', {
            csrfToken: req.csrfToken(),
            user: req.user,
            brand,
            style,
            message: req.flash('info'),
            title: 'Add new product ',
            breadcrumb: 'Add New Product',

        })
    } catch (err) {
        res.send('getAd_BrandAddNew error : ' + err);
    }
}

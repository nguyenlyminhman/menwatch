const Brand = require('../../model/Brand');

module.exports = async (req, res, next) => {

    let brand = await Brand.getAllBrand();
    //Check user role. If user is not admin role, redirect to access denied page.
    if (req.user.role !== 'Admin') {
        res.redirect('/admin/access-denied');
        return;
    }
    try {
        res.render('ad_brandViewAll', {
            brand,
            user: req.user,
            message: req.flash('info'),
            title: 'Brand',
            breadcrumb: 'The Brand List',
        })
    } catch (err) {
        res.send('getAdHomePage error : ' + err);
    }
}

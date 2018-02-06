const Brand = require('../../model/Brand');

module.exports = async (req, res, next) => {
    try {
        let brand = await Brand.getAllBrand();

        res.render('ad_brandViewAll', {
            brand,
            // user: req.user,
            message: req.flash('info'),
            title: 'View all brand',
            breadcrumb: 'All brand',
        })
    } catch (err) {
        res.send('getAdHomePage error : ' + err);
    }
}

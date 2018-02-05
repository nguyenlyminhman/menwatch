const Brand = require('../../model/Brand');
// const Style = require('../model/Style');

module.exports = async (req, res, next) => {
    try {
        let brand = await Brand.getAllBrand();

        res.render('ad_brandViewAll', {
            brand,
            // user: req.user,
            title: 'View all brand',
            breadcrumb: 'All brand',
        })
    } catch (err) {
        res.send('getAdHomePage error : ' + err);
    }
}

let Brand = require('../../model/Brand');
module.exports = async (req, res, next) => {
    try {
        const { id } = req.params;
        let brand = new Brand(id);
        brand.getBrandById().then(result => {
            res.render('ad_brandEdit', {
                csrfToken: req.csrfToken(),
                // user: req.user,
                id:id,
                brandname: result.rows[0].brandname,
                message: req.flash('info'),
                title: 'Brand ',
                breadcrumb: 'Edit brand',
                // pages
            })
        })

    } catch (err) {
        res.send('getAd_BrandAddNew error : ' + err);
    }
}

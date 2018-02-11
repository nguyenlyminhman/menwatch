let Brand = require('../../model/Brand');
module.exports = async (req, res, next) => {
    const { id } = req.params;
    //Check user role. If user is not admin role, redirect to access denied page.
    if (req.user.role !== 'Admin') {
        res.redirect('/admin/access-denied');
        return;
    }
    try {
        let brand = new Brand(id);

        brand.getBrandById().then(result => {
            res.render('ad_brandEdit', {
                csrfToken: req.csrfToken(),
                user: req.user,
                id: id,
                brandname: result,
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

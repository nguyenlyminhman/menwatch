let Product = require('../../model/Product');
module.exports = async (req, res, next) => {

    const { id } = req.params;
    //Check user role. If user is not admin role, redirect to access denied page.
    if (req.user.role !== 'Admin') {
        res.redirect('/admin/access-denied');
        return;
    }
    try {
        let product = new Product(id);
        product.getProductById().then(result => {
            res.render('ad_productEdit', {
                csrfToken: req.csrfToken(),
                user: req.user,
                id: id,
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

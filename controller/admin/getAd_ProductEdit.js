let Product = require('../../model/Product');
let Brand = require('../../model/Brand');
let Style = require('../../model/Style');

module.exports = async (req, res, next) => {

    const { id } = req.params;

    //Check user role. If user is not admin role, redirect to access denied page.
    if (req.user.role !== 'Admin') {
        res.redirect('/admin/access-denied');
        return;
    }
    try {
        let style = await Style.getAllStyle();
        let brand = await Brand.getAllBrand();
        let product = new Product(id);
        product.getProductById().then(result => {
            res.render('ad_productEdit', {
                style,
                brand,
                csrfToken: req.csrfToken(),
                user: req.user,
                id: id,
                product: result.rows[0],
                message: req.flash('info'),
                title: 'Edit product details ',
                breadcrumb: 'Update product details',
                // pages
            })
        })

    } catch (err) {
        res.send('getAd_BrandAddNew error : ' + err);
    }
}

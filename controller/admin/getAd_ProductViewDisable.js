const Product = require('../../model/Product');

module.exports = async (req, res, next) => {

    
    //Check user role. If user is not admin role, redirect to access denied page.
    if (req.user.role !== 'Admin') {
        res.redirect('/admin/access-denied');
        return;
    }
    let product = await Product.getBrandStyleDisableProduct();
    try {
        res.render('ad_productViewDisable', {
            message: req.flash('info'),
            product: product.rows,
            user: req.user,
            title: 'Product ',
            breadcrumb: 'The Disabled Product List',
            // pages
        })
    } catch (err) {
        res.send('getAdHomePage error : ' + err);
    }
}

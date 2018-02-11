const Product = require('../../model/Product');

module.exports = async (req, res, next) => {

    
    //Check user role. If user is not admin role, redirect to access denied page.
    if (req.user.role !== 'Admin') {
        res.redirect('/admin/access-denied');
        return;
    }
    let product = await Product.getBrandStyleProduct();
    try {
        res.render('ad_productViewAll', {
            message: req.flash('info'),
            product: product.rows,
            user: req.user,
            title: 'View all product ',
            breadcrumb: 'View all product ',
            // pages
        })
    } catch (err) {
        res.send('getAdHomePage error : ' + err);
    }
}

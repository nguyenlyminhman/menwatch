const Product = require('../../model/Product');

module.exports = async (req, res, next) => {

    
    //Check user role. If user is not admin role, redirect to access denied page.
    if (req.user.role !== 'Admin') {
        res.redirect('/admin/access-denied');
        return;
    }
    let product = await Product.getBrandStyleActiveProduct();
    try {
        res.render('ad_productViewActive', {
            message: req.flash('info'),
            product: product.rows,
            user: req.user,
            title: 'The active product ',
            breadcrumb: 'The Active Product List',
            // pages
        })
    } catch (err) {
        res.send('getAdHomePage error : ' + err);
    }
}

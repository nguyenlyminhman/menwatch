const Product = require('../../model/Product');

module.exports = async (req, res, next) => {
    //Check user role. If user is not admin role, redirect to access denied page.
    let bestProduct = await Product.getBestSellProduct(10);

    if (req.user.role !== 'Admin') {
        res.redirect('/admin/access-denied');
        return;
    }
    try {
        res.render('ad_productReport', {
            user: req.user,
            product: bestProduct.rows,
            title: 'Report',
            breadcrumb: 'The Product Report',
        })
    } catch (err) {
        res.send('getAd_OrderReport error : ' + err);
    }
}

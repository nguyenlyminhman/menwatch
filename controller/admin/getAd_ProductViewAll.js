const Product = require('../../model/Product');

module.exports = async (req, res, next) => {
    try {
        let product = await Product.getBrandStyleProduct();

        res.render('ad_productViewAll', {
            message: req.flash('info'),
            product: product.rows,
            // user: req.user,
            title: 'View all product ',
            breadcrumb: 'View all product ',
            // pages
        })
    } catch (err) {
        res.send('getAdHomePage error : ' + err);
    }
}

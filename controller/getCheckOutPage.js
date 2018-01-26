const Brand = require('../model/Brand');
const Style = require('../model/Style');
const Product = require('../model/Product');


module.exports = async (req, res) => {
    try {
        let brand = await Brand.getAllBrand();
        let style = await Style.getAllStyle();
        let product = await Product.getAllProduct();
        res.render('checkout', {
            // csrfToken: req.csrfToken(),
            brand,
            style,
            product,
            user: req.user,
            title: 'MenWatch-Checkout page...'
        })
    } catch (err) {
        res.send('getCheckOutPage error :' + err);
    }
}

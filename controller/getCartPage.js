const Style = require('../model/Style');
const Brand = require('../model/Brand');
const Product = require('../model/Product');

module.exports = async (req, res) => {
    const { idStyle } = req.params;
    const products = new Product(undefined, idStyle, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined);

    try {
        let brand = await Brand.getAllBrand();
        let style = await Style.getAllStyle();
        let product = await products.getProductByStyle();
        res.render('products', {
            // csrfToken: req.csrfToken(),
            style,
            brand,
            product,
            user: req.user,
            title: 'Shopping cart'
        })
    } catch (err) {
        res.send('getCartPage : ' + err);
    }
}
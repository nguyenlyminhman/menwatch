const Brand = require('../model/Brand');
const Style = require('../model/Style');
const Product = require('../model/Product');
const Cart = require('../model/Cart');


module.exports = async (req, res, next) => {
    try {
        let brand = await Brand.getAllBrand();
        let style = await Style.getAllStyle();
        let product = await Product.getAllProduct();
        let cart = new Cart(req.session.cart);
        res.render('shopping_cart', {
            brand,
            style,
            product,
            totalP: cart.totalPrice,
            user: req.user,
            title: 'My shopping bag...'
        })
    } catch (err) {
        res.send('My shopping cart navigation error :' + err);
    }
}

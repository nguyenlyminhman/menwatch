const Product = require('../model/Product');
const Cart = require('../model/Cart');

module.exports = async (req, res, next) => {
    const id = req.params.id;
    const cart = new Cart(req.session.cart ? req.session.cart : {});
    const product = new Product(id, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined);
    product.getProductById().then(
        result => {
            cart.removeItem(result.rows[0].id);
            req.session.cart = cart;
            // console.log(result.rows[0].name);
            // console.log(Object.keys(cart.items));
            res.redirect('/shopping-cart');
        })
}
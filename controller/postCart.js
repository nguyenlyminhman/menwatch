const Car = require('../model/Cart');
const Product = require('../model/Product');

module.exports = async (req, res, next) => {
    const { id, qty } = req.params;
    const cart = new Car(req.session.cart ? req.session.cart : {});
    const product = new Product(id, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined);
    product.getProductById().then(
        result => {
            cart.add(result, result.rows[0].id, parseInt(qty));
            req.session.cart = cart;
            // console.log(result.rows[0].name);
            // console.log(Object.keys(cart.items))
            // console.log(cart)
            res.redirect('/shopping-cart');
        })
// console.log(cart);
}
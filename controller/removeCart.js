const Product = require('../model/Product');
const Cart = require('../model/Cart');

module.exports = async (req, res, next) => {
    //get product id.
    let id = req.params.id;
    //init Cart model.
    let cart = new Cart(req.session.cart ? req.session.cart : {});
    //init Product model
    let product = new Product(id, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined);
    //using getProductById() method to check product is exist or not.
    product.getProductById().then(result => {
        //result.rowCount > 0, that's mean, the product is exist.
        if (result.rowCount > 0) {
            //remove product from cart
            cart.removeItem(result.rows[0].id);
            //update cart and add to cart session.
            req.session.cart = cart;
            //redirect to shopping-cart link.
            res.setHeader("Content-Type", "text/html");
            res.redirect('/shopping-cart');
            res.end();
        }
    })
}
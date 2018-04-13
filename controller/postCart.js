const Car = require('../model/Cart');
const Product = require('../model/Product');

module.exports = async (req, res, next) => {
    //get product id and quantity.
    let { id, qty } = req.params;
    //init cart model.
    let cart = new Car(req.session.cart ? req.session.cart : {});
    //init Product model with product id.
    let product = new Product(id, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined);
    //get product information by its id.
    product.getProductById().then(result => {
        //result.rowCount > 0, that's mean, the product details is existing.
        if (result.rowCount > 0) {
            //add to cart throught add() method.
            cart.add(result, result.rows[0].id, parseInt(qty),parseInt(result.rows[0].price), result.rows[0].name );
            //add cart to cart session.
            req.session.cart = cart;
            //redirect to shopping-cart link.
            res.redirect('/shopping-cart');
        } else {//send the message.
            res.send('postCart err: Can not post product to cart');
        }
    })
}
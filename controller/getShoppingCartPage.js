const Brand = require('../model/Brand');
const Style = require('../model/Style');
const Product = require('../model/Product');
const Cart = require('../model/Cart');

module.exports = async (req, res, next) => {
    //get all brand and style. Using for navigation bar
    let brand = await Brand.getAllBrand();
    let style = await Style.getAllStyle();
    //get all product
    let product = await Product.getAllProduct();
    //declare messages to show notification for customer.
    let messages = req.flash('error');
    // checking cart session. 
    // If it is null, render shopping_cart ejs page with empty cartItem
    if (!req.session.cart) {
        res.setHeader("Content-Type", "text/html");
        return res.render('shopping_cart', {
            brand,
            style,
            product,
            cartItem: null,
            title: 'My shopping bag...',
            user: req.user,
            message: req.flash('info'),
            messages: messages,
            hasErrors: messages.length > 0
        });
        res.end();
    } else { //If it is not null, render shopping_cart ejs page with cartItem.
        //init Cart model.
        var cart = new Cart(req.session.cart);
        try { //Using try...catche, if the error occur.
            res.setHeader("Content-Type", "text/html");
            return res.render('shopping_cart', { //render shopping_cart ejs page
                message: req.flash('info'),
                messages: messages,
                hasErrors: messages.length > 0,
                brand,
                style,
                product,
                cartItem: cart.getItems(),
                title: 'My shopping bag',
                user: req.user
            });
            res.end();
        } catch (err) { //catching and sending the error when it is occuring.
            res.send('getShoppingCartPage error : ' + err);
        }
    }
}

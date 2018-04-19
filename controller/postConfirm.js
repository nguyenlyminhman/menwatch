const Customer = require('../model/Customer')
const Order = require('../model/Order');
const OrderDetails = require('../model/OrderDetails');
const Product = require('../model/Product');
const Brand = require('../model/Brand');
const Style = require('../model/Style');
const Cart = require('../model/Cart');
let { sendEmail } = require('../utils/Mailer');
let { check } = require('../utils/Tools')


module.exports = async (req, res) => {
    //init Cart model
    let cart = new Cart(req.session.cart);
    //check cart
    if (!req.session.cart || req.session.cart == null) {
        return res.redirect('/shopping-cart');
    } else {
        await cart.getItems().forEach(product => {
            let _product = new Product(product.item.rows[0].id);
            _product.getProductById().then(resId => {
                //checking the quantity before checkout
                if (parseInt(product.quantity) > parseInt(resId.rows[0].quantity)) {
                    res.setHeader("Content-Type", "text/html");
                    req.flash('info', `The ${resId.rows[0].name}  only has ${resId.rows[0].quantity} item(s).`);
                    res.redirect('/shopping-cart');
                    res.end();
                    return false;
                     //checking the price before checkout
                } else if (parseInt(product.pprice) !== parseInt(resId.rows[0].price)) {
                    res.setHeader("Content-Type", "text/html");
                    req.flash('info', `The ${resId.rows[0].name} has changed the price.
                    Would you like to buy this product?
                    Please, remove it from your cart, then update your cart again.`);
                    res.redirect('/shopping-cart');
                    res.end();
                    return false;
                } else {
                    res.setHeader("Content-Type", "text/html");
                    res.redirect('/shopping-cart/checkout');
                    res.end();
                }
            })
        });
    }
}

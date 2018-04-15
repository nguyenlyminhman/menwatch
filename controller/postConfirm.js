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
    //get value from checkout page
    const { receiver, orderaddress, orderphone } = req.body;
    if (!req.session.cart || req.session.cart == null) {
        return res.redirect('/shopping-cart');
    } else {
        'use strict';
        cart.getItems().forEach(product => {
            let _product = new Product(product.item.rows[0].id);
            'use strict';
            _product.getProductById().then(resId => {
                if (parseInt(product.quantity) > parseInt(resId.rows[0].quantity)) {
                    res.setHeader("Content-Type", "text/html");
                    req.flash('info', `The ${resId.rows[0].name}  only has ${resId.rows[0].quantity} item(s) at this time.
                                    Maybe, there is someone else check-out quicker than you.
                                    Please, update your cart again, then check out as soon as possible.`);
                    res.redirect('/shopping-cart');
                    res.end();
                    return;
                } else if (parseInt(product.pprice) !== parseInt(resId.rows[0].price)) {
                    res.setHeader("Content-Type", "text/html");
                    req.flash('info', `The ${resId.rows[0].name} has changed the price.
                    Would you like to buy this product?
                    Please, remove it from your cart, then update your cart again.`);
                    res.end();
                    return res.redirect('/shopping-cart');
                } else {
                    res.setHeader("Content-Type", "text/html");
                    res.redirect('/shopping-cart/checkout');
                    res.end();
                    return;
                }

            });
        });

    }
}

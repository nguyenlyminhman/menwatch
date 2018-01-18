const express = require('express');
const router = express.Router();
const passport = require('passport');
const notLoggedIn = require('connect-ensure-login').ensureLoggedIn();
const Customer = require('../model/Customer');
const Car = require('../model/Cart');
const Product = require('../model/Product');
const Order = require('../model/Order');
const OrderDetails = require('../model/OrderDetails');

require('../utils/Passport')(passport);
// express()
//define the home page router
router.get('/', require('../controller/showHomePage'));
router.get('/login', require('../controller/showAccountPage'));
router.post('/login', passport.authenticate('local', { successRedirect: '/', failureRedirect: '/account' }));
router.get('/register', require('../controller/showRegisterPage'));
router.post('/register', (req, res) => {
    let { email, password, firstname, lastname, address, phone } = req.body;
    let customer = new Customer(firstname, lastname, email, password, address, phone);
    customer.checkExistEmail()
        .then(result => {
            if (result.rowCount) {
                res.redirect('/register')
            } else {
                customer.signup()
                    .then(res.redirect('/account'))
            }
        })
        .catch(() => res.redirect('/register'));
});
router.get('/profile', notLoggedIn, (req, res) => { res.render('profile') })

router.get('/contact', require('../controller/showContactPage'));
router.get('/about', require('../controller/showAboutPage'));

router.get('/style', require('../controller/showHomePage'));
router.get('/brand', require('../controller/showHomePage'));
router.get('/style/:idStyle', require('../controller/showProductsByStylePage'));
router.get('/brand/:idBrand', require('../controller/showProductsByBrandPage'));
// router.get('/category/:cate_seolink/:idcategory', require('./showProductsPage'));
router.get('/product-details/:id', require('../controller/showSinglePage'));
router.get('/shopping-cart', require('../controller/showShoppingCartPage'));
router.get('/addtocart/:id', (req, res) => {
    const id = req.params.id;
    const cart = new Car(req.session.cart ? req.session.cart : {});
    const product = new Product(id, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined);
    product.getProductById().then(
        result => {
            cart.add(result, result.rows[0].id);
            req.session.cart = cart;
            // console.log(result.rows[0].name);
            // console.log(Object.keys(cart.items));
            res.redirect('/shopping-cart');
        })
})
router.get('/removebyone/:id', (req, res) => {
    const id = req.params.id;
    const cart = new Car(req.session.cart ? req.session.cart : {});
    const product = new Product(id, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined);
    product.getProductById().then(
        result => {
            cart.reduceOneItem(result.rows[0].id);
            req.session.cart = cart;
            // console.log(result.rows[0].name);
            // console.log(Object.keys(cart.items));
            res.redirect('/shopping-cart');
        })
})

router.get('/remove/:id', (req, res) => {
    const id = req.params.id;
    const cart = new Car(req.session.cart ? req.session.cart : {});
    const product = new Product(id, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined);
    product.getProductById().then(
        result => {
            cart.removeItem(result.rows[0].id);
            req.session.cart = cart;
            // console.log(result.rows[0].name);
            // console.log(Object.keys(cart.items));
            res.redirect('/shopping-cart');
        })
})

router.get('/checkout', require('../controller/showCheckOutPage'));
router.post('/checkout', function (req, res, next) {
    if (!req.session.cart) {
        return res.redirect('/shopping-cart');
    }
    var cart = new Car(req.session.cart);

    var stripe = require("stripe")("sk_test_WS82X0y5C4q3y6X3eCTlCuRo");

    stripe.charges.create({
        amount: cart.totalPrice * 100,
        currency: "usd",
        source: req.body.stripeToken, // obtained with Stripe.js
        description: "Test Charge"
    }, function (err, charge) {
        if (err) {
            console.log(err)
            return res.redirect('/checkout');
        }
        //id, idCustomer, orderdate, receivedate, total, orderphone, orderaddress, payment)' +
        var order = new Order(2, 12, '01-01-2011', '02-02-2012', 123, '12222', 'okok', charge.id);
        order.addNewOrder()
        .then(
            req.session.cart = null,
            res.redirect('/')
        );

        // [user].forEach(a=>{
        //     idcustomer = a.id;
        // })
        // var order = new Order({
        //     user: req.user,
        //     cart: cart,
        //     address: req.body.address,
        //     name: req.body.name,
        //     paymentId: charge.id
        // });
        // order.save(function (err, result) {

        //     req.session.cart = null;
        //     res.redirect('/');
        // });
    });
});

router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});
module.exports = router;

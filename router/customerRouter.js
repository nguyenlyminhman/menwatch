const express = require('express');
const router = express.Router();
const passport = require('passport');
const notLoggedIn = require('connect-ensure-login').ensureLoggedIn();
const Customer = require('../model/Customer');
const Car = require('../model/Cart');
const Product = require('../model/Product');

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
            res.redirect('/');
        })
})
router.get('/shopping-cart', require('../controller/showShoppingCartPage'));
router.get('/checkout', require('../controller/showCheckOutPage'));
router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});
module.exports = router;

const express = require('express');
const router = express.Router();
const passport = require('passport');
const checkLoggedIn = require('connect-ensure-login').ensureLoggedIn();


const Customer = require('../model/Customer');
const Car = require('../model/Cart');
const csurf = require('csurf');
const csurfProtection = csurf();

const Product = require('../model/Product');
const Order = require('../model/Order');
const OrderDetails = require('../model/OrderDetails');

require('../utils/Passport')(passport);
// express()

// router.use(csurfProtection);
//define the home page router
router.get('/:page', require('../controller/getHomePage'));

router.get('/login',csurfProtection, require('../controller/getAccountPage'));
router.post('/login', passport.authenticate('local', { successRedirect: '/', failureRedirect: '/login' }));

router.get('/register', csurfProtection, require('../controller/getRegisterPage'));
router.post('/register', require('../controller/postRegister'));
router.get('/profile', checkLoggedIn, (req, res) => { res.render('profile') });

router.get('/contact', csurfProtection, require('../controller/getContactPage'));
router.post('/contact', csurfProtection, require('../controller/postContact'));
router.get('/about', require('../controller/getAboutPage'));

router.get('/style', require('../controller/getHomePage'));
router.get('/brand', require('../controller/getHomePage'));

router.get('/style/:idStyle', require('../controller/getProductsByStylePage'));
router.get('/brand/:idBrand', require('../controller/getProductsByBrandPage'));

router.get('/product-details/:id', require('../controller/getSinglePage'));

router.get('/shopping-cart', require('../controller/getShoppingCartPage'));
router.get('/addtocart/:id/:qty', require('../controller/postCart'));
router.get('/remove/:id',require('../controller/removeCart'));

router.get('/checkout', checkLoggedIn, require('../controller/getCheckOutPage'));
router.post('/checkout', require('../controller/postCheckOut'));

router.post('/search', require('../controller/postSearch'));
router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

router.use(require('../controller/getErrorPage'));
module.exports = router;

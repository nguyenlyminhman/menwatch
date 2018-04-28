const express = require('express');
const router = express.Router();
const passport = require('passport');
const requireLogin = require('connect-ensure-login').ensureLoggedIn();

const Customer = require('../model/Customer');
const Cart = require('../model/Cart');
const Product = require('../model/Product');
const Order = require('../model/Order');
const OrderDetails = require('../model/OrderDetails');

const csurf = require('csurf');
const csurfProtection = csurf();

require('../utils/Passport')(passport);
//get home page
router.get('/', returnOldUrl, require('../controller/getHomePage'));
//get login page
router.get('/login', csurfProtection, require('../controller/getLoginPage'));
//post to login. using passport local
router.post('/login', passport.authenticate('local_customer',
    { failureRedirect: '/login', failureFlash: true }),
    function (req, res, next) {
        if (req.session.oldUrl) {
            var oldUrl = req.session.oldUrl;
            req.session.oldUrl = null;
            res.redirect(oldUrl);
        } else {
            res.redirect('/');
        }
    });
//get facefook login page
router.get('/auth/fb', passport.authenticate('facebook', { scope: ['email'] }));
//get facebook login page. 
router.get('/auth/fb/cb', passport.authenticate('facebook',
    { failureRedirect: '/login', failureFlash: true }),
    function (req, res, next) {
        if (req.session.oldUrl) {
            var oldUrl = req.session.oldUrl;
            req.session.oldUrl = null;
            res.redirect(oldUrl);
        } else {
            res.redirect('/');
        }
    });
//get register page
router.get('/register', csurfProtection, require('../controller/getRegisterPage'));
router.post('/register', require('../controller/postRegister'));
router.get('/thank-register', require('../controller/getThankRegister'));
router.get('/profile', requireLogin, require('../controller/getProfilePage'));

router.post('/change-password', require('../controller/postChangePassword'));
router.get('/reset-password', csurfProtection, require('../controller/getResetPassword'));
router.post('/reset-password', require('../controller/postResetPassword'))

router.get('/profile/information', requireLogin, require('../controller/getCustomerInfoPage'));
router.post('/profile/information', requireLogin, require('../controller/postCustomerInfoPage'));

router.get('/profile/shipping-address', requireLogin, require('../controller/getCustomerShippingAddress'));
router.post('/profile/shipping-address', requireLogin, require('../controller/postCustomerShippingAddress'));

router.get('/tracking-order/:id', requireLogin, require('../controller/getTrackingOrder'));

router.get('/contact', returnOldUrl, csurfProtection, require('../controller/getContactPage'));
router.post('/contact', csurfProtection, require('../controller/postContact'));
router.get('/about', returnOldUrl, require('../controller/getAboutPage'));

router.get('/style', require('../controller/getHomePage'));
router.get('/brand', require('../controller/getHomePage'));

router.get('/style/:idStyle/:page', returnOldUrl, require('../controller/getProductsByStylePage'));
router.get('/brand/:idBrand/:page', returnOldUrl, require('../controller/getProductsByBrandPage'));

router.get('/product-details/:id', returnOldUrl, require('../controller/getProductDetails'));

router.get('/shopping-cart', returnOldUrl, require('../controller/getShoppingCartPage'));
router.get('/addtocart/:id/:qty', require('../controller/postCart'));
router.get('/remove/:id', require('../controller/removeCart'));

router.post('/shopping-cart/confirm', requireLogin, require('../controller/postConfirm'));
router.get('/shopping-cart/checkout', requireLogin, csurfProtection, require('../controller/getCheckOutPage'));
router.post('/shopping-cart/checkout', require('../controller/postCheckOut'));
router.get('/shopping-cart/checkout/thankpurchase', csurfProtection, require('../controller/getThankPurchase'));
router.post('/search/results', require('../controller/postSearch'));

router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

// router.get('/admin/login', require('../controller/admin/agetLoginPage'));

router.use(require('../controller/getErrorPage'));

module.exports = router;
function returnOldUrl(req, res, next) {
    req.session.oldUrl = req.url;
    return next();
}

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
router.get('/',returnOldUrl, require('../controller/getHomePage'));

router.get('/login', csurfProtection, require('../controller/getLoginPage'));
router.post('/login', passport.authenticate('local',
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
router.get('/auth/fb', passport.authenticate('facebook', { scope: ['email'] }));
router.get('/auth/fb/cb', passport.authenticate('facebook', { failureRedirect: '/login', failureFlash: true }),
function (req, res, next) {
    if (req.session.oldUrl) {
        var oldUrl = req.session.oldUrl;
        req.session.oldUrl = null;
        res.redirect(oldUrl);
    } else {
        res.redirect('/');
    }
});
router.get('/register', csurfProtection, require('../controller/getRegisterPage'));
router.post('/register', require('../controller/postRegister'));
router.get('/profile', checkLoggedIn, require('../controller/getProfilePage'));

router.post('/change-password', require('../controller/postChangePassword'));
router.get('/reset-password', csurfProtection, require('../controller/getResetPassword'));
router.post('/reset-password', require('../controller/postResetPassword'))

router.get('/profile/information', checkLoggedIn, require('../controller/getCustomerInfoPage'));
router.post('/profile/information', require('../controller/postCustomerInfoPage'));

router.get('/profile/shipping-address', checkLoggedIn, require('../controller/getCustomerShippingAddress'));
router.post('/profile/shipping-address', require('../controller/postCustomerShippingAddress'));

router.get('/tracking-order/:id', checkLoggedIn, require('../controller/getTrackingOrder'));

router.get('/contact', returnOldUrl, csurfProtection, require('../controller/getContactPage'));
router.post('/contact', csurfProtection, require('../controller/postContact'));
router.get('/about',returnOldUrl, require('../controller/getAboutPage'));

router.get('/style', require('../controller/getHomePage'));
router.get('/brand', require('../controller/getHomePage'));

router.get('/style/:idStyle/:page', returnOldUrl, require('../controller/getProductsByStylePage'));
router.get('/brand/:idBrand/:page', returnOldUrl,require('../controller/getProductsByBrandPage'));

router.get('/product-details/:id', returnOldUrl, require('../controller/getProductDetails'));

router.get('/shopping-cart', returnOldUrl, require('../controller/getShoppingCartPage'));
router.get('/addtocart/:id/:qty', require('../controller/postCart'));
router.get('/remove/:id', require('../controller/removeCart'));

router.get('/shopping-cart/checkout', checkLoggedIn, csurfProtection, require('../controller/getCheckOutPage'));
router.post('/shopping-cart/checkout', require('../controller/postCheckOut'));

router.post('/search/results', require('../controller/postSearch'));

router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

// router.get('/admin/login', require('../controller/admin/agetLoginPage'));

// router.use(require('../controller/getErrorPage'));



module.exports = router;
function returnOldUrl(req, res, next) {
    req.session.oldUrl = req.url;
    return next();
}

const express = require('express');
const router = express.Router();
const passport = require('passport');
const checkLoggedIn = require('connect-ensure-login').ensureLoggedIn();

const csurf = require('csurf');
const csurfProtection = csurf();

const Product = require('../model/Product');
const Order = require('../model/Order');
const OrderDetails = require('../model/OrderDetails');

require('../utils/Passport')(passport);
// express()

// router.use(csurfProtection);
//define the home page router
router.get('/login', require('../controller/admin/getAdLoginPage'));
router.post('/login', passport.authenticate('local_staff', { successRedirect: '/admin/home', failureRedirect: '/admin/login' }));

router.get('/home', require('../controller/admin/getAdHomePage'));

router.get('/brand/view-all', require('../controller/admin/getAd_BrandViewAll'));
router.get('/brand/add-new', csurfProtection, require('../controller/admin/getAd_BrandAddNew'));
router.post('/brand/add-new', require('../controller/admin/postAd_BrandAddNew'));
router.get('/brand/edit/:id', csurfProtection, require('../controller/admin/getAd_BrandEdit'));
router.post('/brand/edit/:id', require('../controller/admin/postAd_BrandEdit'));
router.get('/brand/delete/:id', require('../controller/admin/deleteAd_Brand'));

router.get('/style/view-all', require('../controller/admin/getAd_StyleViewAll'));
router.get('/style/add-new',csurfProtection, require('../controller/admin/getAd_StyleAddNew'));
router.post('/style/add-new', require('../controller/admin/postAd_StyleAddNew'));
router.get('/style/edit/:id', csurfProtection, require('../controller/admin/getAd_StyleEdit'));
router.post('/style/edit/:id', require('../controller/admin/postAd_StyleEdit'));
router.get('/style/delete/:id', require('../controller/admin/deleteAd_Style'));

router.get('/product/view-all', require('../controller/admin/getAd_ProductViewAll'));
router.get('/product/add-new', csurfProtection,require('../controller/admin/getAd_ProductAddNew'));
router.post('/product/add-new', require('../controller/admin/postAd_ProductAddNew'));
// router.get('/product/edit/:id', csurfProtection, require('../controller/admin/getAd_ProductEdit'));
// router.post('/product/edit/:id', require('../controller/admin/postAd_StyleEdit'));
router.get('/product/delete/:id', require('../controller/admin/deleteAd_Product'));


router.get('/customer/view-all', require('../controller/admin/getAd_CustomerViewAll'));
router.get('/customer/popular', require('../controller/admin/getAd_CustomerPopular'));
router.get('/customer/view-details/:id', require('../controller/admin/getAd_CustomerDetails'));

router.get('/order/view-all', require('../controller/admin/getAd_OrderViewAll'));
router.get('/order/view-details/:id', require('../controller/admin/getAd_OrderDetails'));

router.get('/contact/view-all', require('../controller/admin/getAd_ContactViewAll'));
router.get('/contact/view-details/:id', require('../controller/admin/getAd_ContactDetails'));

router.get('/staff/view-all', require('../controller/admin/getAd_StaffViewAll'));
router.get('/staff/add-new',csurfProtection, require('../controller/admin/getAd_StaffAddNew'));
router.post('/staff/add-new', require('../controller/admin/postAd_StaffAddNew'));

router.get('/staff/handling-order/view-all', require('../controller/admin/getStaff_OrderViewAll'));
router.get('/staff/handling-order/view-details/:id', require('../controller/admin/getStaff_OrderDetails'));
router.post('/staff/handling-order/view-details/:id', require('../controller/admin/postStaff_OrderDetails'));

// router.get('/profile', checkLoggedIn, require('../controller/getProfilePage'));
// router.post('/change-password', require('../controller/postChangePassword'));

// router.get('/profile/information', checkLoggedIn, require('../controller/getCustomerInfoPage'));
// router.post('/profile/information', require('../controller/postCustomerInfoPage'));

// router.post('/search/results', require('../controller/postSearch'));
router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/admin/login');
});

router.use(require('../controller/getErrorPage'));

module.exports = router;

function returnOldUrl(req, res, next) {
    req.session.role = req.user.role;
    return next();
}

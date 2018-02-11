const express = require('express');
const router = express.Router();
const passport = require('passport');

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

router.get('/home', requireLogin, require('../controller/admin/getAdHomePage'));

router.get('/brand/view-all', requireLogin, require('../controller/admin/getAd_BrandViewAll'));
router.get('/brand/add-new', requireLogin, csurfProtection, require('../controller/admin/getAd_BrandAddNew'));
router.post('/brand/add-new', require('../controller/admin/postAd_BrandAddNew'));
router.get('/brand/edit/:id', requireLogin, csurfProtection, require('../controller/admin/getAd_BrandEdit'));
router.post('/brand/edit/:id', requireLogin, require('../controller/admin/postAd_BrandEdit'));
router.get('/brand/delete/:id', requireLogin, require('../controller/admin/deleteAd_Brand'));

router.get('/style/view-all', requireLogin, require('../controller/admin/getAd_StyleViewAll'));
router.get('/style/add-new', requireLogin, csurfProtection, require('../controller/admin/getAd_StyleAddNew'));
router.post('/style/add-new', requireLogin, require('../controller/admin/postAd_StyleAddNew'));
router.get('/style/edit/:id', requireLogin, csurfProtection, require('../controller/admin/getAd_StyleEdit'));
router.post('/style/edit/:id', requireLogin, require('../controller/admin/postAd_StyleEdit'));
router.get('/style/delete/:id', requireLogin, require('../controller/admin/deleteAd_Style'));

router.get('/product/view-all', requireLogin, require('../controller/admin/getAd_ProductViewAll'));
router.get('/product/add-new', requireLogin, csurfProtection, require('../controller/admin/getAd_ProductAddNew'));
router.post('/product/add-new', requireLogin, require('../controller/admin/postAd_ProductAddNew'));
// router.get('/product/edit/:id', csurfProtection, require('../controller/admin/getAd_ProductEdit'));
// router.post('/product/edit/:id', require('../controller/admin/postAd_StyleEdit'));
router.get('/product/delete/:id', requireLogin, require('../controller/admin/deleteAd_Product'));


router.get('/customer/view-all', requireLogin, require('../controller/admin/getAd_CustomerViewAll'));
router.get('/customer/popular', requireLogin, require('../controller/admin/getAd_CustomerPopular'));
router.get('/customer/view-details/:id', requireLogin, require('../controller/admin/getAd_CustomerDetails'));

router.get('/order/view-all', requireLogin, require('../controller/admin/getAd_OrderViewAll'));
router.get('/order/view-details/:id', requireLogin, require('../controller/admin/getAd_OrderDetails'));

router.get('/contact/view-all', requireLogin, require('../controller/admin/getAd_ContactViewAll'));
router.get('/contact/view-details/:id', requireLogin, require('../controller/admin/getAd_ContactDetails'));

router.get('/staff/view-all', requireLogin, require('../controller/admin/getAd_StaffViewAll'));
router.get('/staff/add-new', requireLogin, csurfProtection, require('../controller/admin/getAd_StaffAddNew'));
router.post('/staff/add-new', requireLogin, require('../controller/admin/postAd_StaffAddNew'));

router.get('/staff/handling-order/view-all', requireLogin, require('../controller/admin/getStaff_OrderViewAll'));
router.get('/staff/handling-order/view-details/:id', requireLogin, require('../controller/admin/getStaff_OrderDetails'));
router.post('/staff/handling-order/view-details/:id', requireLogin, require('../controller/admin/postStaff_OrderDetails'));

// router.get('/profile', checkLoggedIn, require('../controller/getProfilePage'));
// router.post('/change-password', require('../controller/postChangePassword'));

// router.get('/profile/information', checkLoggedIn, require('../controller/getCustomerInfoPage'));
// router.post('/profile/information', require('../controller/postCustomerInfoPage'));

// router.post('/search/results', require('../controller/postSearch'));
router.get('/access-denied', require('../controller/admin/getAd_AccessDenied'))
router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/admin/login');
});

router.use(require('../controller/getErrorPage'));

module.exports = router;

// function requireAdmin(req, res, next) {
//     if (req.user.role !== 'Admin')
//         return res.redirect('/admin/access-denied');

// }
function requireLogin(req, res, next) {
    if (!req.user)
        return res.redirect('/admin/login');
    next();
}

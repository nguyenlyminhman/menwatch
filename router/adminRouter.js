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
router.get('/product/view-active', requireLogin, require('../controller/admin/getAd_ProductViewActive'));
router.get('/product/view-disable', requireLogin, require('../controller/admin/getAd_ProductViewDisable'));
router.get('/product/add-new', requireLogin, csurfProtection, require('../controller/admin/getAd_ProductAddNew'));
router.post('/product/add-new', requireLogin, require('../controller/admin/postAd_ProductAddNew'));
router.get('/product/edit/:id', csurfProtection, require('../controller/admin/getAd_ProductEdit'));
router.post('/product/edit/:id', requireLogin, require('../controller/admin/postAd_ProductUpdate'));

// router.get('/product/disable/:id', csurfProtection, require('../controller/admin/getAd_ProductEdit'));
// router.post('/product/disable/:id', requireLogin, require('../controller/admin/postAd_ProductUpdate'));

router.get('/product/delete/:id', requireLogin, require('../controller/admin/deleteAd_Product'));


router.get('/customer/view-all', requireLogin, require('../controller/admin/getAd_CustomerViewAll'));
router.get('/customer/popular', requireLogin, require('../controller/admin/getAd_CustomerPopular'));
router.get('/customer/view-details/:id', requireLogin, require('../controller/admin/getAd_CustomerDetails'));

router.get('/order/view-all', requireLogin, require('../controller/admin/getAd_OrderViewAll'));
router.get('/order/view-pending', requireLogin, require('../controller/admin/getAd_OrderViewPending'));
router.get('/order/view-finish', requireLogin, require('../controller/admin/getAd_OrderViewFinish'));
router.get('/order/view-details/:id', requireLogin, require('../controller/admin/getAd_OrderDetails'));

router.get('/contact/view-all', requireLogin, require('../controller/admin/getAd_ContactViewAll'));
router.get('/contact/view-details/:id', requireLogin, require('../controller/admin/getAd_ContactDetails'));
router.post('/contact/view-details/:id', requireLogin, require('../controller/admin/postAd_ContactReply'));

router.get('/staff/view-all', requireLogin, require('../controller/admin/getAd_StaffViewAll'));
router.get('/staff/add-new', requireLogin, csurfProtection, require('../controller/admin/getAd_StaffAddNew'));
router.post('/staff/add-new', requireLogin, require('../controller/admin/postAd_StaffAddNew'));

router.get('/staff/process-order/view-all', requireLogin, require('../controller/admin/getStaff_ProcessingOrderViewAll'));
router.get('/staff/handling-order/view-all', requireLogin, require('../controller/admin/getStaff_OrderViewAll'));
router.get('/staff/handling-order/view-details/:id', requireLogin, require('../controller/admin/getStaff_OrderDetails'));
router.post('/staff/handling-order/view-details/:id', require('../controller/admin/postStaff_OrderDetails'));
router.post('/staff/handling-order/update/:id', requireLogin, require('../controller/admin/postStaff_UpdateOrder'));
router.get('/staff/finish-order/view-all', requireLogin, require('../controller/admin/getStaff_FinishOrderViewAll'));
router.get('/staff/finish-order/view-details/:id', requireLogin, require('../controller/admin/getStaff_FinishOrderDetails'));

router.get('/change-password-staff/:id', requireLogin, csurfProtection, require('../controller/admin/getAd_StaffPassword'));
router.post('/change-password-staff/:id', requireLogin, require('../controller/admin/postAd_StaffPassword'));

router.get('/profile-staff/:id', requireLogin, csurfProtection, require('../controller/admin/getAd_StaffProfile'));
router.post('/profile-staff/:id', require('../controller/admin/postAd_StaffProfile'));

router.get('/change-password-admin/:id', requireLogin, csurfProtection, require('../controller/admin/getAd_AdminPassword'));
router.post('/change-password-admin/:id', require('../controller/admin/postAd_AdminPassword'));

router.get('/profile-admin/:id', requireLogin, csurfProtection, require('../controller/admin/getAd_AdminProfile'));
router.post('/profile-admin/:id', require('../controller/admin/postAd_AdminProfile'));

router.get('/access-denied', require('../controller/admin/getAd_AccessDenied'))
router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/admin/login');
});

router.use(require('../controller/admin/getAdErrorPage'));

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

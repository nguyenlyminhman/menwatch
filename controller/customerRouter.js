const express = require('express');
const router = express.Router();

//define the home page router
router.get('/', require('./showHomePage'));
router.get('/contact', require('./showContactPage'));
router.get('/checkout', require('./showCheckOutPage'));
router.get('/single', require('./showSinglePage'));
router.get('/account', require('./showAccountPage'));
router.get('/register', require('./showRegisterPage'));
router.get('/products', require('./showProductsPage'));

router.get('/category/:cate_seolink/:idcategory', require('./showProductsPage'));
router.get('/product-details/:idproduct', require('./showSinglePage'));

module.exports = router;

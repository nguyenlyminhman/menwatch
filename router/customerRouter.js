const express = require('express');
const router = express.Router();

//define the home page router
router.get('/', require('../controller/showHomePage'));
router.get('/contact', require('../controller/showContactPage'));
router.get('/about', require('../controller/showAboutPage'));
router.get('/checkout', require('../controller/showCheckOutPage'));

router.get('/account', require('../controller/showAccountPage'));
router.post('/account', (req,res)=>{res.redirect('/')})
router.get('/register', require('../controller/showRegisterPage'));
router.get('/style', require('../controller/showHomePage'));
router.get('/brand', require('../controller/showHomePage'));
router.get('/style/:idStyle', require('../controller/showProductsByStylePage'));
router.get('/brand/:idBrand', require('../controller/showProductsByBrandPage'));

// router.get('/category/:cate_seolink/:idcategory', require('./showProductsPage'));
router.get('/product-details/:id', require('../controller/showSinglePage'));

module.exports = router;


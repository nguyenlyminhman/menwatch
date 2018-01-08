const express = require('express');
const router = express.Router();
const passport = require('passport');
const Customer = require('../model/Customer');

require('../utils/Passport')(passport);


//define the home page router
router.get('/', require('../controller/showHomePage'));
router.get('/contact', require('../controller/showContactPage'));
router.get('/about', require('../controller/showAboutPage'));
router.get('/checkout', require('../controller/showCheckOutPage'));
router.get('/account', require('../controller/showAccountPage'));
//router.post('/account',passport.authenticate('local', { successRedirect: '/', failureRedirect: '/account' }));
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
router.get('/style', require('../controller/showHomePage'));
router.get('/brand', require('../controller/showHomePage'));
router.get('/style/:idStyle', require('../controller/showProductsByStylePage'));
router.get('/brand/:idBrand', require('../controller/showProductsByBrandPage'));
// router.get('/category/:cate_seolink/:idcategory', require('./showProductsPage'));
router.get('/product-details/:id', require('../controller/showSinglePage'));

module.exports = router;


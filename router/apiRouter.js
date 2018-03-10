const express = require('express');
const router = express.Router();
const { hash, compare } = require('bcrypt');
const Brand = require('../model/Brand');
const Style = require('../model/Style');
const Product = require('../model/Product');
const Customer = require('../model/Customer');

router.get('/brand', (req, res) => {
    Brand.getAllBrand().then(result => {
        res.status(200).json({
            status: 'success',
            data: result,
            messages: 'get all style'
        })
    }).catch()
});

router.get('/style', (req, res) => {
    Style.getAllStyle().then(result => {
        res.status(200).json({
            status: 'success',
            data: result,
            messages: 'get all style'
        })
    }).catch()
});

router.get('/product/brand/:brandid', (req, res) => {
    let idBrand = req.params.brandid;
    // console.log("idbrand " + idBrand + " page " + page)
    let product = new Product(undefined, undefined, idBrand);
    product.getProductByBrandApi().then(result => {
        res.status(200).json({
            status: 'success',
            data: result,
            messages: 'get product by brand'
        })
    }).catch()
})

router.get('/product/style/:styleid', (req, res) => {
    let idStyle = req.params.styleid;
    let product = new Product(undefined, idStyle);
    product.getProductByStyleApi().then(result => {
        res.status(200).json({
            status: 'success',
            data: result,
            messages: 'get product by style'
        })
    }).catch()
})

router.get('/product/all', (req, res) => {
    Product.getAllProduct().then(result => {
        res.status(200).json({
            status: 'success',
            data: result.rows,
            messages: 'get product by style'
        })
    }).catch()
})

router.post('/customer/login/', (req,res)=>{
    //let {email, password} = req.body;
    var email = req.body.email;
    var password = req.body.password;
    // var email = 'man@gmail.com'; 
    // var pass = 'nam'
    // console.log(email);
    // console.log(password);
    var cus = new Customer(undefined, undefined, email, password);
    cus.signIn().then(result=>{
        res.status(200).json({
            sta:'okman',
            data:result,
            sms: 'get login'

        })
    })

})
module.exports = router;

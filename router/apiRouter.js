const express = require('express');
const router = express.Router();
const Brand = require('../model/Brand');
const Style = require('../model/Style');
const Product = require('../model/Product');

router.get('/brand', (req, res) => {
    Brand.getAllBrand().then(result => {
        res.status(200).json({
            status: 'success',
            data:  result,
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

router.get('/product/best-seller', (req, res) => {
    Product.getBestSellProduct().then(result => {
        res.status(200).json({
            status: 'success',
            data: result.rows,
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

router.get('/product/details/:id', (req, res) => {
    let id = req.params.id;
    let product = new Product(id);
    product.getProductDetailsById().then(result => {
        res.status(200).json({
            status: 'success',
            data: result,
            messages: 'get product by id'
        })
    }).catch()
})
module.exports = router;

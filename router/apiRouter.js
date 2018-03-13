const express = require('express');
const router = express.Router();
const { hash, compare } = require('bcrypt');
const Brand = require('../model/Brand');
const Style = require('../model/Style');
const Product = require('../model/Product');
const Customer = require('../model/Customer');
const Order = require('../model/Order');
const OrderDetails = require('../model/OrderDetails');

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

router.post('/customer/login/', (req, res) => {
    //let {email, password} = req.body;
    var email = req.body.email;
    var password = req.body.password;
    // var email = 'man@gmail.com'; 
    // var pass = 'nam'
    // console.log(email);
    // console.log(password);
    var cus = new Customer(undefined, undefined, email, password);
    cus.signIn().then(result => {
        res.status(200).json({
            sta: 'okman',
            data: result,
            sms: 'get login'
        })
    })
})

router.post('/customer/checkout', (req, res) => {

    var { ReceiverName, ReceiverAddress, ReceiverEmail } = req.body;
    var { CustomerId, OrderDetail, totalPrice, StripeId } = req.body;

    // console.log("ReceiverName " + ReceiverName);
    // console.log("ReceiverAddress " + ReceiverAddress);
    // console.log("ReceiverEmail " + ReceiverEmail);
    // console.log("CardNumber " + CardNumber);
    // console.log("CardCVC " + CardCVC);
    // console.log("CardName " + CardName);
    // console.log("CardYear " + CardYear);
    // console.log("Stripe id " + StripeId)

    // console.log("CustomerId " + CustomerId);
    // // console.log("OrderDetails " + OrderDetail);
    // console.log("totalPrice " + totalPrice);

    // JSON.parse(OrderDetail) .forEach(element => {
    //         console.log("product_id " + element[Object.keys(element)[0]]);
    //         console.log("product_qty " + element[Object.keys(element)[1]]);
    //     }); 
    //  using stripe key. data.details[Object.keys(data.details)[0]]
    var stripe = require("stripe")("sk_test_WS82X0y5C4q3y6X3eCTlCuRo");
    var d = new Date();
    //using year, month, date, hour, minute and second to create order id.
    const OrderNo = d.getFullYear() + "" + parseInt(d.getMonth() + 1) + "" + d.getDate() + "" + d.getHours() + "" + d.getMinutes() + "" + d.getSeconds() + d.getMilliseconds()
    //get current date
    const currentDate = d.getFullYear() + "-" + parseInt(d.getMonth() + 1) + "-" + d.getDate()
    //using stripe get information from card payment
    stripe.charges.create({
        amount: parseInt(totalPrice) * 100, //get total price store in stripe account
        currency: "usd", // currency unit is USD 
        source: StripeId, // obtained with Stripe.js
        description: OrderNo + ""
    }, function (err, charge) {
        // init Customer model to contact with database.
        var order = new Order(OrderNo, CustomerId, currentDate, '2019-12-31', totalPrice,
            '123445566', ReceiverAddress, 'charge.id', 'Pending', ReceiverName);
        //using addNewOrder() to insert order info into database
        order.addNewOrder().then(resultOrder => {
            //loop throught cart product to get value of cart
            JSON.parse(OrderDetail).forEach(product => {
                //init OrderDetails model to contact with database.
                var orderDetails = new OrderDetails(undefined, OrderNo, product[Object.keys(product)[0]], product[Object.keys(product)[1]]);
                // Using addNewOrderDetails() method to insert into database.
                orderDetails.addNewOrderDetails();
                //update product quantity.
                let _product = new Product(product[Object.keys(product)[0]], undefined, undefined, undefined, undefined, product[Object.keys(product)[1]], undefined, undefined, undefined);
                _product.updateProductQuantity();
            })
            res.status(200).json({
                sta: 'okman',
                data: resultOrder.rowCount,
                sms: 'get checkout'
            })
        })
    });
})
module.exports = router;

const Customer = require('../model/Customer')
const Order = require('../model/Order');
const OrderDetails = require('../model/OrderDetails');
const Product = require('../model/Product');
const Cart = require('../model/Cart');
let { sendEmail } = require('../utils/Mailer');
let { check } = require('../utils/Tools')


module.exports = async (req, res) => {
    //init Cart model
    let cart = new Cart(req.session.cart);
    //get value from checkout page
    const { receiver, orderaddress, orderphone } = req.body;

    if (!req.session.cart || req.session.cart == null) {
        return res.redirect('/shopping-cart');
    } else {
        // cart.getItems().forEach(product => {
        //     let _product = new Product(product.item.rows[0].id);
        //     _product.getProductById().then(resId => {
        //         if (parseInt(product.quantity) > parseInt(resId.rows[0].quantity)) {
        //             res.setHeader("Content-Type", "text/html");
        //             req.flash('info', `The ${resId.rows[0].name}  only has ${resId.rows[0].quantity} item(s) at this time.
        //                             Maybe, there is someone else check-out quicker than you.
        //                             Please, update your cart again, then check out as soon as possible.`);
        //             res.redirect('/shopping-cart');
        //             res.end();
        //             return;
        //         } else if (parseInt(product.pprice) !== parseInt(resId.rows[0].price)) {
        //             res.setHeader("Content-Type", "text/html");
        //             req.flash('info', `The ${resId.rows[0].name} has changed the price.
        //             Would you like to buy this product?
        //             Please, remove it from your cart, then update your cart again.`);
        //             res.redirect('/shopping-cart');
        //             res.end();
        //             return;
        //         } 
        //         // else {
        //         //     res.setHeader("Content-Type", "text/html");
        //         //     res.redirect('/shopping-cart/checkout');
        //         //     res.end();
        //         // }
        //     });
        // });
        //using stripe key.
        var stripe = require("stripe")("sk_test_WS82X0y5C4q3y6X3eCTlCuRo");
        var d = new Date();
        //using year, month, date, hour, minute and second to create order id.
        const OrderNo = d.getFullYear() + "" + parseInt(d.getMonth() + 1) + "" + d.getDate() + "" + d.getHours() + "" + d.getMinutes() + "" + d.getSeconds() + d.getMilliseconds()
        //get current date
        const currentDate = d.getFullYear() + "-" + parseInt(d.getMonth() + 1) + "-" + d.getDate()
        //using stripe get information from card payment
        stripe.charges.create({
            amount: cart.totalPrice * 100, //get total price store in stripe account
            currency: "usd", // currency unit is USD 
            source: req.body.stripeToken, // obtained with Stripe.js
            description: "mw"
        }, function (err, charge) {
            if (err) { //if have error redirect to check out page
                res.redirect('/shopping-cart/checkout'); //redirect to check out page
            }
            //init Customer model to contact with database.
            let _customer = new Customer(undefined, undefined, req.user.email, undefined, undefined, undefined);
            // using checkExistEmail()method to get customer id, then insert into Order
            _customer.checkExistEmail().then(customer => {

                //init Customer model to contact with database.
                var order = new Order(OrderNo, customer.rows[0].id, currentDate, undefined, cart.totalPrice,
                    orderphone, orderaddress, charge.id, 'Pending', receiver);
                //using addNewOrder() to insert order info into database
                order.addNewOrder().then(rs => {
                    //loop throught cart product to get value of cart
                    cart.getItems().forEach(product => {
                        //init OrderDetails model to contact with database.
                        var orderDetails = new OrderDetails(undefined, OrderNo, product.item.rows[0].id, product.quantity, product.pprice);
                        // Using addNewOrderDetails() method to insert into database.
                        orderDetails.addNewOrderDetails();
                        //update product quantity.
                        let _product = new Product(product.item.rows[0].id, undefined, undefined, undefined, undefined, product.quantity, undefined, undefined, undefined);
                        _product.updateProductQuantity();
                    })
                })
                //content email which will be sent to customer
                let content = `
                            <h3>Men Watch, </h3>
                            <p>Hello, ${customer.rows[0].fistname} ${customer.rows[0].lastname} </p>
                            <h3>Thank for your visit and buy the Luxury Watch products. </ h3>
                            <h3>The order number: ${OrderNo}</h3>
                            <h3>Total: $ ${cart.totalPrice}</h3>
                            <h3>The receiver information</h3>
                            <ul>
                                <li> Name: ${receiver}</li>
                                <br/>
                                <li> Address: ${orderaddress}</li>
                                <br/>
                                <li> Phone: ${orderphone}</li>
                            </ul>
                            <h4>This is an automated email. You do not need to respond to this email. </ h4>
                            <h4>Have nice day !</h4>
                            <h4><strong>Best regard - Men Watches</strong></h4>`;
                // send email to customer.
                sendEmail(req.user.email, content);
            });
            //After finished, set session cart to null.
            req.session.cart = null;
            //redirect to home page
            res.redirect('/shopping-cart/checkout/thankpurchase');
        });
    }
}

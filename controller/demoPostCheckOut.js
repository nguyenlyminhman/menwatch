const Order = require('../model/Order');
const OrderDetails = require('../model/OrderDetails');
const Cart = require('../model/Cart');


module.exports = async (req, res) => {
    if (!req.session.cart || req.session.cart == null) {
        return res.redirect('/shopping-cart');
    }
    var cart = new Cart(req.session.cart);
    var stripe = require("stripe")("sk_test_WS82X0y5C4q3y6X3eCTlCuRo");
    //get value from checkout page
    const { receiver, orderaddress, orderphone, receivedate } = req.body;
    var d = new Date();
    //using year, month, date, hour, minute and second to create order id.
    const OrderNo = d.getFullYear() + "" + d.getMonth() + 1 + "" + d.getDate() + "" + d.getHours() + "" + d.getMinutes() + "" + d.getSeconds()
    //get current date
    const currentDate = d.getFullYear() + "-" + d.getMonth() + 1 + "-" + d.getDate() 
    //using stripe get information from card payment
    stripe.charges.create({
        amount: cart.totalPrice * 100,
        currency: "usd",
        source: req.body.stripeToken, // obtained with Stripe.js
        description: ""
    }, function (err, charge) {
        if (err) {
            console.log(err)
            return res.redirect('/checkout');
        }
        var order = new Order(OrderNo, 12, currentDate, receivedate , req.session.totalPrice, orderphone, orderaddress, charge.id, 'Pending', receiver);
        // var orderDetails = new OrderDetails();
        order.addNewOrder()
            .then(
            req.session.cart = null,
            res.redirect('/')
            );
           var idcustomer = 0;
        

        // var order = new Order({
        //     user: req.user,
        //     cart: cart,
        //     address: req.body.address,
        //     name: req.body.name,
        //     paymentId: charge.id
        // });
        // order.save(function (err, result) {

        //     req.session.cart = null;
        //     res.redirect('/');
        // });
    });
}
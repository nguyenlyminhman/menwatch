const Order = require('../model/Order');
const Cart = require('../model/Cart');


module.exports = async (req, res) => {
    if (!req.session.cart || req.session.cart == null) {
        return res.redirect('/shopping-cart');
    }
    var cart = new Cart(req.session.cart);
    var stripe = require("stripe")("sk_test_WS82X0y5C4q3y6X3eCTlCuRo");
    // const { }
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
        var order = new Order(3, 12, '01-01-2011', '02-02-2012', 123, '12222', 'okok', charge.id);
        order.addNewOrder()
            .then(
            req.session.cart = null,
            res.redirect('/')
            );

        // [user].forEach(a=>{
        //     idcustomer = a.id;
        // })
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
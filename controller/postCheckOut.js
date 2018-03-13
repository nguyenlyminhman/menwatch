const Customer = require('../model/Customer')
const Order = require('../model/Order');
const OrderDetails = require('../model/OrderDetails');
const Product = require('../model/Product');
const Cart = require('../model/Cart');


module.exports = async (req, res) => {
    if (!req.session.cart || req.session.cart == null) {
        return res.redirect('/shopping-cart');
    }
    //init Cart model
    var cart = new Cart(req.session.cart);
    //using stripe key.
    var stripe = require("stripe")("sk_test_WS82X0y5C4q3y6X3eCTlCuRo");
    //get value from checkout page
    const { receiver, orderaddress, orderphone, receivedate } = req.body;
    var d = new Date();
    //using year, month, date, hour, minute and second to create order id.
    const OrderNo = d.getFullYear() + "" + parseInt(d.getMonth()+ 1) + "" + d.getDate() + "" + d.getHours() + "" + d.getMinutes() + "" + d.getSeconds()+d.getMilliseconds()
    //get current date
    const currentDate = d.getFullYear() + "-" + parseInt(d.getMonth()+ 1) + "-" + d.getDate()
    //using stripe get information from card payment
    stripe.charges.create({
        amount: cart.totalPrice * 100, //get total price store in stripe account
        currency: "usd", // currency unit is USD 
        source: req.body.stripeToken, // obtained with Stripe.js
        description: OrderNo+"_"
    }, function (err, charge) {
        if (err) { //if have error redirect to check out page
            return res.redirect('/shopping-cart/checkout'); //redirect to check out page
        }
        //init Customer model to contact with database.
        let _customer = new Customer(undefined, undefined, req.user.email, undefined, undefined, undefined);
        // using checkExistEmail()method to get customer id, then insert into Order
        _customer.checkExistEmail().then(customer => {
            //init Customer model to contact with database.
            var order = new Order(OrderNo, customer.rows[0].id, currentDate, receivedate, cart.totalPrice,
                orderphone, orderaddress, charge.id, 'Pending', receiver);
            //using addNewOrder() to insert order info into database
            order.addNewOrder().then(resultOrder => {
                //loop throught cart product to get value of cart
                cart.getItems().forEach(product => {
                    //init OrderDetails model to contact with database.
                    var orderDetails = new OrderDetails(undefined, OrderNo, product.item.rows[0].id, product.quantity);
                    // Using addNewOrderDetails() method to insert into database.
                    orderDetails.addNewOrderDetails();
                    //update product quantity.
                    let _product = new Product(product.item.rows[0].id, undefined, undefined, undefined, undefined, product.quantity, undefined, undefined, undefined);
                    _product.updateProductQuantity();
                })
            })
        });
        //After finished, set session cart to null.
        req.session.cart = null;
        //redirect to home page
        res.redirect('/');
    });
}

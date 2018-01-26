const Brand = require('../model/Brand');
const Style = require('../model/Style');
const OrderDetails = require('../model/OrderDetails');
const Product = require('../model/Product');

module.exports = async (req, res) => {
    let { id } = req.params;

    try {
        let brand = await Brand.getAllBrand();
        let style = await Style.getAllStyle();
        let orderDetails = new OrderDetails(undefined, id, undefined, undefined);

        orderDetails.getOrderDetailsByOrderId().then(rs => {
            let a = null;
            a = rs;
            rs.forEach(element => {
                qty: element.quantity;
                let _product = new Product(element.idProduct, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined);
                _product.getProductById().then()
            })
            res.render('tracking_order', {
                brand,
                style,
                user: req.user,
                quantity: qty,
                product: _product.getProductById(),
                title: 'Order details'
            });
        });


    } catch (err) {
        res.send('getTrackingOrder error : ' + err);
    }
}

// res.render('profile', {
//     message: req.flash('info'),
//     brand,
//     style,
//     user: req.user,
//     customer: result.rows[0],
//     order: orderResult.rows,
//     title: 'My profile'
// });
const Order = require('../../model/Order');

module.exports = async (req, res, next) => {
    try {
        let order = await Order.getAllOrder();

        res.render('ad_orderViewAll', {
            order: order.rows,
            // user: req.user,
            title: 'Order',
            breadcrumb: 'View all order ',
            // pages
        })
    } catch (err) {
        res.send('getAd_OrderViewAll error : ' + err);
    }
}

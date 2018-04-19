const Order = require('../../model/Order');

module.exports = async (req, res, next) => {
    try {
        let order = await Order.getPendingOrder();

        res.render('staff_orderViewAll', {
            message: req.flash('info'),
            order: order.rows,
            user: req.user,
            title: 'Order',
            breadcrumb: 'View all order ',
        })
    } catch (err) {
        res.send('getAd_OrderViewAll error : ' + err);
    }
}

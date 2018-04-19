const Order = require('../../model/Order');

module.exports = async (req, res, next) => {
    let id = req.user.id;
    try {
        let order = await Order.getFinishOrder(id);
        res.render('staff_finishOrderViewAll', {
            order: order.rows,
            user: req.user,
            title: 'Order',
            breadcrumb: 'The Finish Order List ',
        })
    } catch (err) {
        res.send('getAd_OrderViewAll error : ' + err);
    }
}

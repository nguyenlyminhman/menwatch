const Order = require('../../model/Order');

module.exports = async (req, res, next) => {
    let id = req.user.id;
    try {
        let order = await Order.getProccessingOrder(id);
        res.render('staff_processingorderViewAll', {
            order: order.rows,
            user: req.user,
            title: 'Order',
            breadcrumb: 'The Processing Order List ',
        })
    } catch (err) {
        res.send('getAd_OrderViewAll error : ' + err);
    }
}

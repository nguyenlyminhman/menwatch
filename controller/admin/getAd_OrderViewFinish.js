const Order = require('../../model/Order');

module.exports = async (req, res, next) => {
    let order = await Order.getFinishOrder();
    //Check user role. If user is not admin role, redirect to access denied page.
    if (req.user.role !== 'Admin') {
        res.redirect('/admin/access-denied');
        return;
    }
    try {
        res.render('ad_orderViewFinish', {
            order: order.rows,
            user: req.user,
            title: 'Order',
            breadcrumb: 'View finish order ',
        })
    } catch (err) {
        res.send('ad_orderViewFinish error : ' + err);
    }
}
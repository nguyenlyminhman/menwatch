const Order = require('../../model/Order');

module.exports = async (req, res) => {
    let order = await Order.getPendingOrderAd();
    //Check user role. If user is not admin role, redirect to access denied page.
    if (req.user.role !== 'Admin') {
        res.redirect('/admin/access-denied');
        return;
    }
    try {
        res.render('ad_orderViewPending', {
            order: order.rows,
            user: req.user,
            title: 'Order',
            breadcrumb: 'View pending order ',
        })
    } catch (err) {
        res.send('ad_orderViewPending error : ' + err);
    }
}

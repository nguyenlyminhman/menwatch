const Order = require('../../model/Order');

module.exports = async (req, res, next) => {
    //Check user role. If user is not admin role, redirect to access denied page.
    let orderMonth = await Order.getReportAllOrderInMonth();

    if (req.user.role !== 'Admin') {
        res.redirect('/admin/access-denied');
        return;
    }
    try {
        res.render('ad_orderReport', {
            user: req.user,
            product: orderMonth.rows,
            title: 'Report',
            breadcrumb: '',
        })
    } catch (err) {
        res.send('getAd_OrderReport error : ' + err);
    }
}

const Customer = require('../../model/Customer');
const Order = require('../../model/Order');

module.exports = async (req, res) => {
    let { id } = req.params;
    //Check user role. If user is not admin role, redirect to access denied page.
    if (req.user.role !== 'Admin') {
        res.redirect('/admin/access-denied');
        return;
    }
    try {
        let customer = new Customer();
        let order = new Order(undefined, id, undefined, undefined, undefined, undefined, undefined, undefined, );
        customer.getCustomerInfoById(id).then(result => {
            order.getOrderInfoByCustomerId().then(orderResult => {
                res.render('ad_CustomerDetails', {
                    user : req.user,
                    order: orderResult.rows,
                    customer: result.rows,
                    title: 'Customer details',
                    breadcrumb: 'Customer details'
                });
            });
        });
    } catch (err) {
        res.send('getAd_CustomerDetails error : ' + err);
    }
}

const Customer = require('../../model/Customer');
const Order = require('../../model/Order');

module.exports = async (req, res) => {
    let { id } = req.params;
    try {
        let customer = new Customer();
        let order = new Order(undefined, id, undefined, undefined, undefined, undefined, undefined, undefined, );
        customer.getCustomerInfoById(id).then(result => {
            order.getOrderInfoByCustomerId().then(orderResult => {
                res.render('ad_CustomerDetails', {
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

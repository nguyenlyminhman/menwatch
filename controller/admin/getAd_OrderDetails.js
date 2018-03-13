const OrderDetails = require('../../model/OrderDetails');
const Product = require('../../model/Product');

module.exports = async (req, res) => {
    let { id } = req.params;
    //Check user role. If user is not admin role, redirect to access denied page.
    if (req.user.role !== 'Admin') {
        res.redirect('/admin/access-denied');
        return;
    }
    try {
        let orderDetails = new OrderDetails(undefined, id, undefined, undefined);
        orderDetails.getOrderDetailsByOrderId().then(odetails => {
            console.log(odetails.rows)
            res.render('ad_orderDetails', {
                user: req.user,
                product: odetails.rows,
                idOrder: id,
                status: odetails.rows[0].status,
                orderDate: odetails.rows[0].orderdate,
                total: odetails.rows[0].total,
                receiver: odetails.rows[0].receiver,
                orderaddress: odetails.rows[0].orderaddress,
                orderphone: odetails.rows[0].orderphone,
                title: 'Order details',
                breadcrumb: 'Order No. ' + id
            });
        });


    } catch (err) {
        res.send('getTrackingOrder error : ' + err);
    }
}

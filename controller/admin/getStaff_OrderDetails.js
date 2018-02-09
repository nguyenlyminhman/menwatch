const OrderDetails = require('../../model/OrderDetails');
const StaffOrder = require('../../model/StaffOrder');
const Product = require('../../model/Product');

module.exports = async (req, res) => {
    let { id } = req.params;
    var d = new Date();
    const currentDate = d.getFullYear() + "-" + d.getMonth() + 1 + "-" + d.getDate()
    try {
        let staffOrder = new StaffOrder(undefined, 1, id, "Proccessing", currentDate);
        let orderDetails = new OrderDetails(undefined, id, undefined, undefined);

        staffOrder.addHandlingOrder().then(result => {
            if (result.rowCount > 0) {
                orderDetails.getOrderDetailsByOrderId().then(odetails => {
                    res.render('staff_OrderDetails', {
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
            }
        })
    } catch (err) {
        res.send('getTrackingOrder error : ' + err);
    }
}

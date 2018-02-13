const OrderDetails = require('../../model/OrderDetails');
const StaffOrder = require('../../model/StaffOrder');
const Product = require('../../model/Product');

module.exports = async (req, res) => {
    let { id } = req.params;
    let idStaff = req.user.id;
    var d = new Date();
    const currentDate = d.getFullYear() + "-" + d.getMonth() + 1 + "-" + d.getDate()
    try {
        let staffOrder = new StaffOrder(undefined, idStaff, id, "Proccessing", currentDate);
        let orderDetails = new OrderDetails(undefined, id, undefined, undefined);
        staffOrder.checkOrderId().then(result => {
            if (result.rowCount < 1) {
                staffOrder.addHandlingOrder().then(result => {
                    if (result.rowCount > 0) {
                        orderDetails.getOrderDetailsByOrderId().then(odetails => {
                            req.session.product = odetails.rows,
                                res.render('staff_OrderDetails', {
                                    user: req.user,
                                    product: odetails.rows,
                                    idOrder: id,
                                    status: odetails.rows[0].status,
                                    orderDate: odetails.rows[0].orderdate,
                                    total: odetails.rows[0].total,
                                    receiver: odetails.rows[0].receiver,
                                    orderaddress: odetails.rows[0].orderaddress,
                                    orderphone: odetails.rows[0].orderphone,
                                    fistname: odetails.rows[0].fistname,
                                    lastname: odetails.rows[0].lastname,
                                    address: odetails.rows[0].address,
                                    phone: odetails.rows[0].phone,
                                    title: 'Order details',
                                    breadcrumb: 'Order No. ' + id
                                });
                        });
                    }
                })
            } else {
                orderDetails.getOrderDetailsByOrderId().then(odetails => {
                    req.session.product = odetails.rows,
                        res.render('staff_OrderDetails', {
                            user: req.user,
                            product: odetails.rows,
                            idOrder: id,
                            status: odetails.rows[0].status,
                            orderDate: odetails.rows[0].orderdate,
                            total: odetails.rows[0].total,
                            receiver: odetails.rows[0].receiver,
                            orderaddress: odetails.rows[0].orderaddress,
                            orderphone: odetails.rows[0].orderphone,
                            fistname: odetails.rows[0].fistname,
                            lastname: odetails.rows[0].lastname,
                            address: odetails.rows[0].address,
                            phone: odetails.rows[0].phone,
                            title: 'Order details',
                            breadcrumb: 'Order No. ' + id
                        });
                });
            }
        })

    } catch (err) {
        res.send('getStaff_OrderDetails error : ' + err);
    }
}

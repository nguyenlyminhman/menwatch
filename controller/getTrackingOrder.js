const Brand = require('../model/Brand');
const Style = require('../model/Style');
const OrderDetails = require('../model/OrderDetails');
const Product = require('../model/Product');

module.exports = async (req, res, next) => {
    //get order id
    let { id } = req.params;
    //get all brand and style. Using for navigation bar
    let brand = await Brand.getAllBrand();
    let style = await Style.getAllStyle();
    //init OrderDetails model with order id.
    let orderDetails = new OrderDetails(undefined, id, undefined, undefined, undefined);
    try { //Using try...catche, if the error occur. 
        orderDetails.getOrderDetailsByOrderId().then(result => {
            //result.rowCount > 0, that's mean, the order details is existing.
            if (result.rowCount > 0) {
                res.render('tracking_order', {
                    brand,
                    style,
                    user: req.user,
                    product: result.rows,
                    idOrder: id,

                    status: result.rows[0].status,
                    orderDate: result.rows[0].orderdate,
                    total: result.rows[0].total,
                    receiver: result.rows[0].receiver,
                    orderaddress: result.rows[0].orderaddress,
                    orderphone: result.rows[0].orderphone,
                    title: 'Order details'
                });
            } else {//send the messages that, order id is not found.
                res.send('getTrackingOrder error : order id is not found.');
            }
        });
    } catch (err) { //catching and sending the error when it is occuring.
        res.send('getTrackingOrder error : ' + err);
    }
}

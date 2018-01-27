const Brand = require('../model/Brand');
const Style = require('../model/Style');
const OrderDetails = require('../model/OrderDetails');
const Product = require('../model/Product');

module.exports = async (req, res) => {
    let { id } = req.params;

    try {
        let brand = await Brand.getAllBrand();
        let style = await Style.getAllStyle();
        let orderDetails = new OrderDetails(undefined, id, undefined, undefined);

        orderDetails.getOrderDetailsByOrderId().then(odetails => {
            
            res.render('tracking_order', {
                brand,
                style,
                user: req.user,
                product: odetails.rows,
                idOrder: id,

                status: odetails.rows[0].status,
                orderDate: odetails.rows[0].orderdate,
                total: odetails.rows[0].total,
                receiver: odetails.rows[0].receiver,
                orderaddress: odetails.rows[0].orderaddress,
                orderphone: odetails.rows[0].orderphone,
                title: 'Order details'
            });
        });


    } catch (err) {
        res.send('getTrackingOrder error : ' + err);
    }
}

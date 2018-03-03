const Product = require('../../model/Product');
const Order = require('../../model/Order');
const StaffOrder = require('../../model/StaffOrder');

module.exports = async (req, res, next) => {
    let { idOrder } = req.body;
    let order = new Order(idOrder, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined);
    let staffOrder = new StaffOrder(undefined, undefined, idOrder, undefined, undefined);
    let product = req.session.product;

    order.updateFinishStatus() //update order status
        .then(resultOd => {
            if (resultOd.rowCount > 0) {
                //checking Order status was updated yet? 
                req.session.product = null; //set product session to null;
                //redirect to order list. Getting the next order.
                res.redirect('/admin/staff/handling-order/view-all')
            } else {
                res.redirect('/admin/staff/handling-order/view-details/' + idOrder)
            }

        })
        .catch(() => res.redirect('/admin/staff/handling-order/view-details/' + idOrder));
}
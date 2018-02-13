const Product = require('../../model/Product');
const Order = require('../../model/Order');
const StaffOrder = require('../../model/StaffOrder');

module.exports = async (req, res, next) => {
    let { idOrder, receiver, orderaddress, orderphone } = req.body;
    let order = new Order(idOrder, undefined, undefined, undefined, undefined, orderphone, orderaddress, undefined, undefined, receiver);
    let product = req.session.product;
    order.updateReceiverInfo()
        .then(result => {
            if (result.rowCount > 0 ) {
                res.redirect('/admin/staff/handling-order/view-details/' + idOrder)
            } else {
                res.redirect('/admin/staff/handling-order/view-details/' + idOrder)
            }
        }).catch(() => res.redirect('/admin/brand/edit/' + id));
}

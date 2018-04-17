const Product = require('../../model/Product');
const Order = require('../../model/Order');
const StaffOrder = require('../../model/StaffOrder');
let { removeSpace } = require('../../utils/Tools');

module.exports = async (req, res, next) => {
    let { idOrder, receiver, orderaddress, orderphone, receivedate } = req.body;
    let order = new Order(idOrder, undefined, undefined, receivedate, undefined, orderphone, removeSpace(orderaddress), undefined, undefined,  removeSpace(receiver));
    let product = req.session.product;
    order.updateReceiverInfo()
        .then(result => {
            if (result.rowCount > 0) {
                res.redirect('/admin/staff/handling-order/view-details/' + idOrder)
            } else {
                res.redirect('/admin/staff/handling-order/view-details/' + idOrder)
            }
        }).catch(() => res.redirect('/admin/brand/edit/' + id));
}

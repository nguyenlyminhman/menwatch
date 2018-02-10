const Product = require('../../model/Product');
const Order = require('../../model/Order');
const StaffOrder = require('../../model/StaffOrder');

module.exports = async (req, res, next) => {
    let { idOrder } = req.body;
    let order = new Order(idOrder,undefined, undefined,undefined, undefined,undefined, undefined,undefined, undefined,undefined );
    let staffOrder = new StaffOrder(undefined, undefined, idOrder, undefined, undefined);
    let product = req.session.product;
    // console.log(product)
    // product.forEach(element => {
    // });
    order.updateOrderStatus()
        .then(resultOd => {
            staffOrder.updateStaffOrderStatus().then(resultSt => {
                product.forEach(element => {
                    let _product = new Product( element.idproduct, undefined, undefined, undefined, undefined, element.quantity, undefined, undefined, undefined);
                        _product.updateProductQuantity();
                });
                if (resultOd.rowCount > 0 && resultSt.rowCount > 0) {
                    res.redirect('/admin/staff/handling-order/view-all')
                }else{
                    res.redirect('/admin/staff/handling-order/view-details/' + idOrder)
                }
            });
        })
        .catch(() => res.redirect('/admin/brand/edit/' + id));
}
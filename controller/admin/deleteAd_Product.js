const Product = require('../../model/Product');
const OrderDetails = require('../../model/OrderDetails');

module.exports = async (req, res, next) => {
    let { id } = req.params;
    let product = new Product(parseInt(id));
    let orderDetails = new OrderDetails(undefined, undefined, parseInt(id), undefined);

    orderDetails.checkExistProduct().then(rs => {
        if (rs.rowCount > 0) {
            req.flash('info', 'Can not delete this product. Because, It is belongs to customers order.'),
                res.redirect('/admin/product/view-all');
        } else {
            product.deleteProduct()
                .then(result => {
                    if (result.rowCount > 0) {
                        req.flash('info', 'Deleted successfully.'),
                            res.redirect('/admin/product/view-all');
                    }
                })
                .catch(() => res.redirect('/admin/product/view-all'));
        }
    })



}
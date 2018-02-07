const Product = require('../../model/Product');

module.exports = async (req, res, next) => {
    let { id } = req.params;
    let product = new Product(parseInt(id));
    product.deleteProduct()
        .then(result => {
            if (result.rowCount > 0) {
                req.flash('info', 'Deleted successfully.'),
                    res.redirect('/admin/product/view-all');
            }
        })
        .catch(() => res.redirect('/admin/product/view-all'));
}
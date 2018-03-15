const Style = require('../../model/Style');
const Product = require('../../model/Product');

module.exports = async (req, res, next) => {
    let { id } = req.params;
    let style = new Style(parseInt(id), undefined);
    let product = new Product();
    product.getProductByStyle(parseInt(id)).then(resCount => {
        if (resCount.rowCount > 0) {
            req.flash('info', 'Can not delete this style, there are some products belong to this style.'),
                res.redirect('/admin/style/view-all');
        } else {
            style.deleteStyle()
                .then(result => {
                    req.flash('info', 'Deleted successfully.'),
                        res.redirect('/admin/style/view-all');
                })
                .catch(() => res.redirect('/admin/style/view-all'));
        }
    })

}
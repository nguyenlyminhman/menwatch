const Brand = require('../../model/Brand');
const Product = require('../../model/Product');

module.exports = async (req, res, next) => {
    let { id } = req.params;
    let brand = new Brand(parseInt(id), undefined);
    let product = new Product();
    product.getProductByBrand(parseInt(id)).then(
        results => {
            if (results.rowCount > 0) {
                req.flash('info', 'Can not delete this brand, there are some products belong to this brand.'),
                    res.redirect('/admin/brand/view-all');
            }else{
                brand.deleteBrand()
                .then(result => {
                    req.flash('info', 'Deleted successfully.'),
                        res.redirect('/admin/brand/view-all');
                })
                .catch(() => res.redirect('/admin/brand/view-all'));
            }
        })
}
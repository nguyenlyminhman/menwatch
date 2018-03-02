let Product = require('../../model/Product');

module.exports = (req, res, next) => {
    let { id } = req.params;
    let { idBrand, idStyle, name, price, quantity, description, cs, mt, wr, sm } = req.body;
    let details = '{"cs":"' + cs + '","mt":"' + mt + '","wr":"' + wr + '","sm":"' + sm + '"}';
    let product = new Product(id, idStyle, idBrand, name, price, quantity, description, undefined, details);
    product.updateProductInfo().
        then(result => {
            if(result.rowCount>0){
                req.flash('info', 'This product information was successfully updated.'),
                res.redirect('/admin/product/edit/'+id);
            }else{
                req.flash('info', 'Updating product information was failed.'),
                res.redirect('/admin/product/edit/'+id);
            }
            
        })
}

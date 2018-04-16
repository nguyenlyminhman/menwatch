let Product = require('../../model/Product');
let { removeSpace } = require('../../utils/Tools');

module.exports = (req, res, next) => {
    let { id } = req.params;
    let { idBrand, idStyle, name, price, quantity, description, cs, mt, wr, sm, status } = req.body;
    let details = '{"cs":"' + removeSpace(cs) + '","mt":"' + removeSpace(mt) + '","wr":"' + removeSpace(wr) + '","sm":"' + removeSpace(sm) + '"}';
    let product = new Product(id, idStyle, idBrand, removeSpace(name), price, quantity, removeSpace(description), undefined, details, status);
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

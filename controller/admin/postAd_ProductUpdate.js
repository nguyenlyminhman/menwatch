var fs = require('fs');
let Product = require('../../model/Product');
let { removeSpace } = require('../../utils/Tools');
let { getManyFieldnameUpload } = require('../../utils/ImageUpload');




let upload = getManyFieldnameUpload('image1', 'image2', 'image3');

module.exports = (req, res, next) => {

    upload(req, res, err => {
        if (err) return res.send('Error upload product img: ' + err);
        let { id } = req.params;
        let { idBrand, idStyle, name, price, quantity, description, cs, mt, wr, sm, status, hdimg01, hdimg02, hdimg03 } = req.body;
        let img1 = req.files['image1'] ? req.files['image1'][0].filename : hdimg01;
        let img2 = req.files['image2'] ? req.files['image2'][0].filename : hdimg02;
        let img3 = req.files['image3'] ? req.files['image3'][0].filename : hdimg03;
        let image = '{"img3":"' + img3 + '","img2":"' + img2 + '","img1":"' + img1 + '"}';

        let details = '{"cs":"' + removeSpace(cs) + '","mt":"' + removeSpace(mt) + '","wr":"' + removeSpace(wr) + '","sm":"' + removeSpace(sm) + '"}';

        let product = new Product(id, idStyle, idBrand, removeSpace(name), price, quantity, removeSpace(description), image, details, status);
        product.updateProductInfo().
            then(result => {
                if (result.rowCount > 0) {
                    req.flash('info', 'This product information was successfully updated.'),
                        res.redirect('/admin/product/edit/' + id);
                } else {
                    req.flash('info', 'Updating product information was failed.'),
                        res.redirect('/admin/product/edit/' + id);
                }

            })






    })

    // let { id } = req.params;
    // let { idBrand, idStyle, name, price, quantity, description, cs, mt, wr, sm, status, image1, image2, image3,hdimg01, hdimg02, hdimg03 } = req.body;
    // let details = '{"cs":"' + removeSpace(cs) + '","mt":"' + removeSpace(mt) + '","wr":"' + removeSpace(wr) + '","sm":"' + removeSpace(sm) + '"}';
    // let product = new Product(id, idStyle, idBrand, removeSpace(name), price, quantity, removeSpace(description), undefined, details, status);
    // product.updateProductInfo().
    //     then(result => {
    //         if(result.rowCount>0){
    //             req.flash('info', 'This product information was successfully updated.'),
    //             res.redirect('/admin/product/edit/'+id);
    //         }else{
    //             req.flash('info', 'Updating product information was failed.'),
    //             res.redirect('/admin/product/edit/'+id);
    //         }

    //     })
}

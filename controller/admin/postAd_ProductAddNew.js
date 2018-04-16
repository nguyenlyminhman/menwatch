let Product = require('../../model/Product');
let { getManyFieldnameUpload } = require('../../utils/ImageUpload');
let { removeSpace } = require('../../utils/Tools');

let upload = getManyFieldnameUpload('image1', 'image2', 'image3');
module.exports = (req, res, next) => {
    upload(req, res, err => {
        if (err) return res.send('Error upload product img: ' + err);
        let { idBrand, idStyle, name, price, quantity, description, cs, mt, wr, sm } = req.body;
        let img1 = req.files['image1'] ? req.files['image1'][0].filename : "null";
        let img2 = req.files['image2'] ? req.files['image2'][0].filename : "null";
        let img3 = req.files['image3'] ? req.files['image3'][0].filename : "null";
        let image = '{"img3":"' + img3 + '","img2":"' + img2 + '","img1":"' + img1 + '"}';
        //'{"img3":"FS5380_3.jpg","img2":"FS5380_2.jpg","img1":"FS5380_1.jpg"}'
        let details = '{"cs":"' + cs + '","mt":"' + mt + '","wr":"' + wr + '","sm":"' + sm + '"}';
        //{"cs":"42mm","mt":"Quartz Chronograph","wr":"5 ATM","sm":"Leather"}
        let product = new Product(undefined, idStyle, idBrand, name, price, quantity, description, image, details);
        product.checkExistProduct().then(result => {
            if (result.rowCount > 0) {
                req.flash('info', 'This product name was existed.'),
                    res.redirect('/admin/product/add-new');
            } else {
                product.insertNewProduct().
                    then(result => {
                        req.flash('info', 'This product was added.'),
                            res.redirect('/admin/product/add-new');
                    })
            }
        })
    });
}

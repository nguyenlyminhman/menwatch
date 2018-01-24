const Style = require('../model/Style');
const Brand = require('../model/Brand');
const Product = require('../model/Product');

module.exports = async (req, res) => {
    const { idBrand } = req.params;
    const bname = new Brand(idBrand, undefined);
    const products = new Product(undefined, undefined, idBrand, undefined, undefined, undefined, undefined, undefined, undefined, undefined);

    try {
        let brand = await Brand.getAllBrand();
        let style = await Style.getAllStyle();
        let product = await products.getProductByBrand();
        let brandname = await bname.getBrandById();
        res.render('products', {
            csrfToken: req.csrfToken(),
            style,
            brand,
            product,
            user: req.user,
            breadcrumb: 'Brand',
            breadcrumb_name : brandname,
            title: 'MenWatch-Product page...'
        })
    } catch (err) {
        res.send('Brand page navigation error > ' + err);
    }
}
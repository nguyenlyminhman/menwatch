const Style = require('../model/Style');
const Brand = require('../model/Brand');
const Product = require('../model/Product');

module.exports = async (req, res) => {
    let id = req.params.idBrand;
    let page = req.params.page || 1;
    
    let bname = new Brand(id, undefined);
    let _product = new Product();
    
    let perPage = 16;
    try {
        let brand = await Brand.getAllBrand();
        let style = await Style.getAllStyle();
        let brandname = await bname.getBrandById();
        let product = await _product.getProductByBrand(id, perPage, (page - 1) * perPage);
        let countProduct = await _product.getCountProductByBrand(id);
        let pages = Math.floor(countProduct.rows[0].count / perPage) + 1;
        res.render('products', {
            // csrfToken: req.csrfToken(),
            style,
            brand,
            product: product.rows,
            user: req.user,
            breadcrumb: 'Brand',
            breadcrumb_name: brandname,
            title: brandname + ' Watches',
            //using for pagination
            current: page,
            pages,
            id,
            link: 'brand'

        })
    } catch (err) {
        res.send('getProductsByBrandPage error : ' + err);
    }
}
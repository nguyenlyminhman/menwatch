const Style = require('../model/Style');
const Brand = require('../model/Brand');
const Product = require('../model/Product');

module.exports = async (req, res) => {
    const { id } = req.params;
    const products = new Product(id, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined);
    // console.log(id)
    try {
        let brand = await Brand.getAllBrand();
        let style = await Style.getAllStyle();
        let product = await products.getProductDetailsById();
        let hotProduct = await Product.getBestSellProduct();
        let latestProduct = await Product.getLatestProduct();

        res.render('product_details', {
            // csrfToken: req.csrfToken(),
            style,
            brand,
            product,
            hotProduct: hotProduct.rows,
            latestProduct: latestProduct.rows,
            user: req.user,
            title: 'Product details'
        })
    } catch (err) {
        res.send('getProductDetails error : ' + err);
    }
}

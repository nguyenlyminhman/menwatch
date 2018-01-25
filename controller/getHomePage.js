const Brand = require('../model/Brand');
const Style = require('../model/Style');
const Product = require('../model/Product');


module.exports = async (req, res, next) => {
    try {
        let _product = new Product();
        let page = req.params.page || 1;
        let perPage = 16;

        let brand = await Brand.getAllBrand();
        let style = await Style.getAllStyle();

        let product = await Product.getAllProduct(perPage, (page-1)* perPage);
        let countProduct = await _product.getCountAllProduct();

        let pages = Math.floor(countProduct.rows[0].count / perPage)+1;

        res.render('index', {
            // csrfToken: req.csrfToken(),
            brand,
            style,
            product: product.rows,
            user: req.user,
            title: 'MenWatch-Home page...',
            current: page,
            pages
        })
    } catch (err) {
        res.send('Home page navigation error > ' + err);
    }
}

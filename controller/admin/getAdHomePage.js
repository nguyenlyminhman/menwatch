// const Brand = require('../model/Brand');
// const Style = require('../model/Style');

module.exports = async (req, res, next) => {
    try {
        // let _product = new Product();
        // let page = req.params.page || 1;
        // let perPage = 16;

        // let brand = await Brand.getAllBrand();
        // let style = await Style.getAllStyle();
        // let product = await Product.getAllProduct();
        // let hotProduct = await Product.getBestSellProduct();

        res.render('ad_index', {
            // csrfToken: req.csrfToken(),
            // brand,
            // style,
            // product: product.rows,
            // hotProduct: hotProduct.rows,
            // user: req.user,
            title: 'Home ',
            breadcrumb: 'Dashboard' + req.session.role,
            // pages
        })
    } catch (err) {
        res.send('getAdHomePage error : ' + err);
    }
}

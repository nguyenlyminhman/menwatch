const Product = require('../model/Product');
const Brand = require('../model/Brand');
const Style = require('../model/Style');

module.exports = async (req, res, next) => {
    try {
        let { keywords } = req.body;
        let prod = new Product();
        let brand = await Brand.getAllBrand();
        let style = await Style.getAllStyle();
        let product = await prod.getProductByKeyword(keywords);
        res.render('products', {
            csrfToken: req.csrfToken(),
            brand,
            style,
            product,
            user: req.user,
            breadcrumb: 'Search',
            breadcrumb_name : 'Results for ' + keywords,
            title: 'Search results'
        });

    } catch (err) {
        res.send('Search page error > ' + err);
    }
}
const Product = require('../model/Product');
const Brand = require('../model/Brand');
const Style = require('../model/Style');

module.exports = async (req, res, next) => {
    try {
        let { keywords } = req.body;
        let page = req.params.page || 1;
        let perPage = 20;

        let _product = new Product();

        let brand = await Brand.getAllBrand();
        let style = await Style.getAllStyle();
        let product = await _product.getProductByKeyword(keywords, perPage, (parseInt(page) - 1) * perPage);
        let countProduct = await _product.getCountProductByKeyword(keywords);
        let pages = Math.floor(countProduct.rows[0].count / perPage) + 1;
        res.render('products', {
            // csrfToken: req.csrfToken(),
            brand,
            style,
            product: product.rows,
            user: req.user,
            breadcrumb: 'Search',
            breadcrumb_name : 'Results for ' + keywords,
            title: 'Search results',
            //using for pagination
            current: parseInt(page) ,
            pages,
            id:'results',
            link: 'search'
        });

    } catch (err) {
        res.send('Search page error > ' + err);
    }
}
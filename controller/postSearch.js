const Product = require('../model/Product');
const Brand = require('../model/Brand');
const Style = require('../model/Style');
let {removeSpace } = require('../utils/Tools');


module.exports = async (req, res, next) => {
    //get keywords value from search form.
    let { keywords } = req.body;
    let page = req.params.page || 1; //get page number.
    let perPage = 20; //perPage = 20 is a product number for every page.
    //init product model.
    let product = new Product();
    //get all brand and style. Using for navigation bar
    let brand = await Brand.getAllBrand();
    let style = await Style.getAllStyle();
    //remove space format 
    let _keyword = keywords;
    //get product by entered keywords.
    let _product = await product.getProductByKeyword(_keywords, perPage, (parseInt(page) - 1) * perPage);
    //count selected product by entered keywords.
    let countProduct = await product.getCountProductByKeyword(_keywords);
    //page number.
    let pages = Math.floor(countProduct.rows[0].count / perPage) + 1;
    try { //Using try...catche, if the error occur.
        res.render('products', { //render products ejs page.
            brand,
            style,
            product: _product.rows,
            user: req.user,
            breadcrumb: 'Search',
            breadcrumb_name: 'Results for ' + _keywords,
            title: 'Search results',
            //using for pagination
            current: parseInt(page),
            pages,
            id: 'results',
            link: 'search'
        });

    } catch (err) {
        res.send('postSearch error: ' + err);
    }
}
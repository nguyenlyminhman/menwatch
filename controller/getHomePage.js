const Brand = require('../model/Brand');
const Style = require('../model/Style');
const Product = require('../model/Product');

module.exports = async (req, res, next) => {
    //get all brand and style. Using for navigation bar
    let brand = await Brand.getAllBrand();
    let style = await Style.getAllStyle();
    //get the latest product
    let product = await Product.getAllProduct();
    //get best deller product.
    let hotProduct = await Product.getBestSellProduct();
    try {
        res.render('index', { // render index ejs page
            brand,
            style,
            product: product.rows,
            hotProduct: hotProduct.rows,
            user: req.user,
            title: 'Home ',
        })
    } catch (err) {//catching the error when it is occuring.
        res.send('getHomePage error : ' + err);
    }
}

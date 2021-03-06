const Style = require('../model/Style');
const Brand = require('../model/Brand');
const Product = require('../model/Product');

module.exports = async (req, res) => {
    //get product id
    const { id } = req.params;

    //init Product model with product id
    const products = new Product(id, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined);
    //get all brand and style. Using for navigation bar
    let brand = await Brand.getAllBrand();
    let style = await Style.getAllStyle();
    //Redirect to error page when id is not a number.
    if (isNaN(id)) {
        res.render('error', { //rendering  error ejs page.
            style,
            brand,
            user: req.user,
            title: 'Error - Page not found'
        })
        return;
    }
    //get product details by product id.
    let product = await products.getActiveProductDetailsById();
    //get hot product which is best seller.
    let hotProduct = await Product.getBestSellProduct();
    //get latest product
    let latestProduct = await Product.getLatestProduct();
    let check = await products.checkActiveProduct();
    //Check the exist product
    if (check.rowCount > 0) {
        try {//Using try...catche, if the error occur.
            res.render('product_details', { //render product_details ejs page.
                style,
                brand,
                product,
                hotProduct: hotProduct.rows,
                latestProduct: latestProduct.rows,
                user: req.user,
                title: 'Product details'
            })
        } catch (err) {//catching and sending the error when it is occuring.
            res.send('getProductDetails error : ' + err);
        }
    } else {
        res.render('error', { //rendering  error ejs page.
            style,
            brand,
            user: req.user,
            title: 'Error - Page not found'
        })
    }
}

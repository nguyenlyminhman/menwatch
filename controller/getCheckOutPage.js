const Brand = require('../model/Brand');
const Style = require('../model/Style');
const Product = require('../model/Product');


module.exports = async (req, res) => {
    //get all brand and style. Using for navigation bar
    let brand = await Brand.getAllBrand();
    let style = await Style.getAllStyle();
    //get all product
    let product = await Product.getAllProduct();
    try {//Using try...catche, if the error occur.
        res.render('checkout', {
            csrfToken: req.csrfToken(),
            brand,
            style,
            product,
            user: req.user,
            title: 'Checkout'
        })
    } catch (err) {//catching and sending the error when it is occuring.
        res.send('getCheckOutPage err :' + err);
    }
}

const Style = require('../model/Style');
const Brand = require('../model/Brand');
const Product = require('../model/Product');

module.exports = async (req, res) => {
    const { idStyle } = req.params; //get idstyle parameter
    //init Product model
    const products = new Product(undefined, idStyle, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined);
    //get all brand style. Using for navigation bar.
    let brand = await Brand.getAllBrand();
    let style = await Style.getAllStyle();
    //get product which belongs to idStyle.
    let product = await products.getProductByStyle();
    try { //Using try...catche, if the error occur.
        res.render('products', { //render about product ejs page
            style,
            brand,
            product,
            user: req.user,
            title: 'Shopping cart'
        })
    } catch (err) { //catching and sending the error when it is occuring.
        res.send('getCartPage err: ' + err);
    }
}
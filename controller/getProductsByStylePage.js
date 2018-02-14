const Style = require('../model/Style');
const Brand = require('../model/Brand');
const Product = require('../model/Product');

module.exports = async (req, res) => {
    let id = req.params.idStyle; // get style id.
    let page = req.params.page || 1; //get page number.
    let sname = new Style(id, undefined); //init Brand model with style id.
    let _product = new Product();  //init Product model.
    let perPage = 16; //perPage = 16 is a product number for every page.
    //get all brand and style. Using for navigation bar
    let brand = await Brand.getAllBrand();
    let style = await Style.getAllStyle();
    //get style information by its id.
    let stylename = await sname.getStyleById();
    //get product by style.
    let product = await _product.getProductByStyle(id, perPage, (page - 1) * perPage);
    //count number of product which belongs to style id.
    let countProduct = await _product.getCountProductByStyle(id);
    //page number.
    let pages = Math.floor(countProduct.rows[0].count / perPage) + 1;
    try {//Using try...catche, if the error occur. 
        res.render('products', { //render products ejs page.
            style,
            brand,
            product: product.rows,
            user: req.user,
            breadcrumb: 'Style',
            breadcrumb_name: stylename.rows[0].stylename,
            title: stylename.rows[0].stylename,
            //using for pagination
            current: page,
            pages,
            id,
            link: 'style'
        })
    } catch (err) {//catching and sending the error when it is occuring.
        res.send('getProductsByStylePage erorr : ' + err);
    }
}
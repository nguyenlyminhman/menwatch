const Style = require('../model/Style');
const Brand = require('../model/Brand');
const Product = require('../model/Product');

module.exports = async (req, res) => {
    let id = req.params.idBrand; // get brand id.
    let page = req.params.page || 1; //get page number.
    //get all brand and style. Using for navigation bar
    let brand = await Brand.getAllBrand();
    let style = await Style.getAllStyle();
    //Redirect to error page when brand id or page number is not a number.
    if (isNaN(id)||isNaN(page) || page <= 0 || id <= 0) {
        res.render('error', { //rendering  error ejs page.
            style,
            brand,
            user: req.user,
            title: 'Error - Page not found'
        })
        return;
    }
    
    let bname = new Brand(id, undefined);//init Brand model with brand.
    let _product = new Product(); //init Product model.
    let perPage = 16; //perPage = 16 is a product number for every page.
    //get brand information base on its id.
    let _brand = await bname.getBrandById();
    //Redirect to error page when id is not a number.
    if (_brand.rowCount < 1) {
        res.render('error', { //rendering  error ejs page.
            style,
            brand,
            user: req.user,
            title: 'Error - Page not found'
        })
        return;
    }
    //get product by brand.
    let product = await _product.getProductByBrand(id, perPage, (page - 1) * perPage);
    //count number of product which belongs to brand id.
    let countProduct = await _product.getCountProductByBrand(id);
    //page number.
    let pages = Math.floor(countProduct.rows[0].count / perPage) + 1;

    try { //Using try...catche, if the error occur. 
        res.render('products', { //render products ejs page.
            style,
            brand,
            product: product.rows,
            user: req.user,
            breadcrumb: 'Brand',
            breadcrumb_name: _brand.rows[0].brandname,
            title: _brand.rows[0].brandname + ' Watches',
            //using for pagination
            current: page,
            pages,
            id,
            link: 'brand'
        })
    } catch (err) { //catching and sending the error when it is occuring.
        res.send('getProductsByBrandPage error : ' + err);
    }
}
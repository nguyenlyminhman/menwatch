const Style = require('../model/Style');
const Brand = require('../model/Brand');
const Product = require('../model/Product');

module.exports = async (req, res) => {
    let id = req.params.idBrand; // get brand id.
    let page = req.params.page || 1; //get page number.
    let bname = new Brand(id, undefined);//init Brand model with brand.
    let _product = new Product(); //init Product model.
    let perPage = 16; //perPage = 16 is a product number for every page.
    //get all brand and style. Using for navigation bar
    let brand = await Brand.getAllBrand();
    let style = await Style.getAllStyle();
    //get brand information by its id.
    let brandname = await bname.getBrandById();
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
            breadcrumb_name: brandname,
            title: brandname + ' Watches',
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
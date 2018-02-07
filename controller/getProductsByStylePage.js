const Style = require('../model/Style');
const Brand = require('../model/Brand');
const Product = require('../model/Product');

module.exports = async (req, res) => {
    let  id  = req.params.idStyle;
    let page = req.params.page || 1;

    let sname = new Style(id, undefined);
    let _product = new Product();
    
    let perPage = 16;

    try {
        let brand = await Brand.getAllBrand();
        let style = await Style.getAllStyle();
        let stylename = await sname.getStyleById();
        let product = await _product.getProductByStyle(id, perPage, (page - 1) * perPage);
        let countProduct = await _product.getCountProductByStyle(id);
        let pages = Math.floor(countProduct.rows[0].count / perPage) + 1;

        res.render('products', {
            // csrfToken: req.csrfToken(),
            style,
            brand,
            product: product.rows,
            user: req.user,
            breadcrumb: 'Style',
            breadcrumb_name : stylename.rows[0].stylename,
            title: stylename.rows[0].stylename,
            //using for pagination
            current: page,
            pages,
            id,
            link: 'style'
        })
    } catch (err) {
        res.send('getProductsByStylePage erorr : ' + err);
    }
}
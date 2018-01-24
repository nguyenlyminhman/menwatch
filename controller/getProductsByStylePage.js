const Style = require('../model/Style');
const Brand = require('../model/Brand');
const Product = require('../model/Product');

module.exports = async (req, res) => {
    const { idStyle } = req.params;
    const sname = new Style(idStyle, undefined);
    const products = new Product(undefined, idStyle, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined);

    try {
        let brand = await Brand.getAllBrand();
        let style = await Style.getAllStyle();
        let product = await products.getProductByStyle();
        let stylename = await sname.getStyleById();

        res.render('products', {
            csrfToken: req.csrfToken(),
            style,
            brand,
            product,
            user: req.user,
            breadcrumb: 'Style',
            breadcrumb_name : stylename,
            title: 'MenWatch-Product page...'
        })
    } catch (err) {
        res.send('Style page navigation erorr > ' + err);
    }
}
const Style = require('../model/Style');
const Brand = require('../model/Brand');
const Product = require('../model/Product');

module.exports = async (req, res) => {
    const { id } = req.params;
    const products= new Product(id, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined);

    try {
        let brand = await Brand.getAllBrand();
        let style = await Style.getAllStyle();
        let product = await products.getProductById()
        res.render('single', { style, brand, product })
    } catch (err) {
        res.send('Navigation menu erorr :' + err);
    }
}
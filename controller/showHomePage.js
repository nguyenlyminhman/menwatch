const Brand = require('../model/Brand');
const Style = require('../model/Style');
const Product = require('../model/Product');


module.exports = async (req, res) => {
    try {
        let brand = await Brand.getAllBrand();
        let style = await Style.getAllStyle();
        let product = await Product.getAllProduct();
        
        res.render('index', { brand, style, product, title:'MenWatch-Home page...' })
    } catch (err) {
        res.send('Home page navigation error > ' + err);
    }
}
